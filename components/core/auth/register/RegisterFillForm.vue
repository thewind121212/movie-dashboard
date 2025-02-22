<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { register } from '~/actions/auth.action'
import { useAuthLoading } from '~/store/authLoading';
import CommonField from '~/components/shared/input/CommonInput.vue';
import PasswordField from '~/components/shared/input/PasswordInput.vue';


defineProps({
    email: String
})


const authLoading = useAuthLoading()
const route = useRoute()


const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
        fullname: zod.string({ message: '*Full names is required' }).min(3, { message: 'This is required' }),
        password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
        repeatPassword: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
    }).refine(data => data.password === data.repeatPassword, {
        message: 'Passwords do not match',
        path: ['repeatPassword'],
    })
);


const emit = defineEmits(['setPhase'])



const onSubmitFillRegister = async (values) => {
    const { email, fullname, password } = values
    const token = route.query.p

    authLoading.setLoading(true)
    const result = await register(email, token, fullname, password)
    emit('setPhase', 'SIGN_UP_RESPONSE')

    authLoading.setLoading(false)
}

</script>



<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center">
        <div class="login-header text-center flex flex-col gap-[0.75rem] items-center">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Welcome Aboard</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center">To proceed with
                your registration, please provide the information requested below.
            </p>
        </div>
        <Form :validation-schema="validationSchema" @submit="onSubmitFillRegister"
            class="w-[60%] h-auto flex flex-col gap-[2.5rem] font-shatoshi">
            <div class="w-full h-auto flex flex-col gap-[1rem]">
                <!-- email field -->
                <div class="w-full h-auto flex flex-col gap-2">
                    <label for="email" class="text-[#121212] text-[1rem] leading-[1.5rem]">Email</label>
                    <Field name="email" type="email" v-slot="{ field }" :value="email">
                        <input type="email" v-bind="field" readonly disabled
                            class="bg-[#d1d1d1] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                            placeholder="Enter Your Email" />
                    </Field>
                    <ErrorMessage name="email" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
                </div>
                <!-- fullname field -->
                <CommonField htmlFor="fullname" fieldName="fullname" type="text" label="Full Name"
                    placeholder="Enter Your Name" fieldType="text" />
                <!-- password field -->
                <PasswordField htmlFor="password" fieldName="password" type="password" label="Password"
                    placeholder="Enter Your Password" fieldType="password" />
                <!-- confirm password -->
                <CommonField htmlFor="repeatPassword" fieldName="repeatPassword" type="password"
                    label="Confirm Password" placeholder="Confirm Password" fieldType="password" />
            </div>
            <div class="submit-action w-full flex flex-col gap-[0.75rem]">
                <button
                    class="bg-[#121212] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Submit</button>
            </div>
        </Form>
    </div>
</template>
