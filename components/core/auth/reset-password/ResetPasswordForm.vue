<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthLoading } from '~/store/authLoading';
import { forgotSubmit } from '~/actions/auth.action';
import * as zod from 'zod';


const showPassword = ref(false);
const authLoading = useAuthLoading()
const route = useRoute()
const { validState } = useVerifyLinkState()

const emits = defineEmits(['setPhase'])

const validationSchema = toTypedSchema(
    zod.object({
        password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
        repeatPassword: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
    }).refine(data => data.password === data.repeatPassword, {
        message: 'Passwords do not match',
        path: ['repeatPassword'],
    })
);
async function onSubmit(values) {
    authLoading.setLoading(true);
    const isChangePassSuccess = await forgotSubmit(route.query.p, values.password);
    if (isChangePassSuccess) {
        validState.value = true
        emits('setPhase', 'RESET_RESULT')
    }

    authLoading.setLoading(false);
}
</script>



<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center relative bg-white z-20">
        <div class="login-header text-center flex flex-col gap-[0.75rem]">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Reset Password</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center m-auto">
                Please enter a new password for your account below. For security, make sure it's strong and unique.</p>
        </div>

        <Form :validation-schema="validationSchema" @submit="onSubmit"
            class="w-[60%] h-auto flex flex-col gap-[2rem] font-shatoshi">
            <!-- password field -->
            <div class="w-full h-auto flex flex-col gap-2">
                <label for="password" class="text-[#121212] text-[1rem] leading-[1.5rem]">Password</label>
                <Field name="password" v-slot="{ field }">
                    <div class="w-full h-auto relative">
                        <input name="password" :type="showPassword ? 'text' : 'password'" v-bind="field"
                            autocomplete="on"
                            class="bg-[#F5F7FA] w-full aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                            placeholder="Enter Your Password" />
                        <button @click="showPassword = !showPassword" type="button"
                            class="absolute right-4 top-1/2 -translate-y-1/2">
                            <NuxtImg src="/icons/eye.svg" width="24" height="24" alt="eye-icon" v-if="!showPassword" />
                            <NuxtImg src="/icons/eye-slash.svg" width="24" height="24" alt="eye-icon" v-else />
                        </button>
                    </div>
                </Field>
                <ErrorMessage name="password" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
            </div>
            <!-- confirm password -->
            <div class="w-full h-auto flex flex-col gap-2">
                <label for="repeatPassword" class="text-[#121212] text-[1rem] leading-[1.5rem]">Confirm
                    Password</label>
                <Field name="repeatPassword" type="password" v-slot="{ field }">
                    <input type="password" v-bind="field"
                        class="bg-[#F5F7FA] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                        placeholder="Confirm Password" />
                </Field>
                <ErrorMessage name="repeatPassword" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
            </div>
            <div class="submit-action w-full flex flex-col gap-[0.75rem]">
                <button
                    class="bg-[#121212] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Reset
                    Now</button>
            </div>
        </Form>
    </div>
</template>
