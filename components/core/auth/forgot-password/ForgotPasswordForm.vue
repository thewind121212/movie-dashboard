<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthLoading } from '~/store/authLoading';
import { forgotPassword } from '~/actions/auth.action';
import * as zod from 'zod';
import CommonField from '~/components/shared/input/CommonInput.vue';


const authLoading = useAuthLoading()


const emits = defineEmits(['setPhase'])



const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).email({ message: '*Must be a valid email' }),
    })
);
async function onSubmit(values) {
    authLoading.setLoading(true);
    const isValid = await forgotPassword(values.email);
    if (isValid) {
        emits('setPhase')
    }
    authLoading.setLoading(false);
}
</script>



<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center">
        <div class="login-header text-center flex flex-col gap-[0.75rem]">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Forgot Password</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center m-auto">No
                worries! Just enter your email
                address below, and we'll send you a link to reset your password</p>
        </div>

        <Form :validation-schema="validationSchema" @submit="onSubmit"
            class="max-[450px]:w-[90%] w-[80%] min-[1379px]:w-[60%]  h-auto flex flex-col gap-[2rem] font-shatoshi">
            <div class="w-full h-auto flex flex-col gap-[1rem]">
                <!-- email field -->
                <CommonField htmlFor="email" fieldName="email" type="email" label="Email" placeholder="Enter Your Email"
                    fieldType="email" />
            </div>
            <div class="submit-action w-full flex flex-col gap-[0.75rem]">
                <button
                    class="bg-[#121212] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Send
                    Email</button>
            </div>
        </Form>
    </div>
</template>
