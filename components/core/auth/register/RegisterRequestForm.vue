<script setup>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useAuthLoading } from '~/store/authLoading';
import { sendRegisterRequest } from '~/actions/auth.action'
import CommonField from '~/components/shared/input/CommonInput.vue';

const authLoading = useAuthLoading()


const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    })
);
const emit = defineEmits(['setPhase'])


async function onSubmit(values) {
    const { email } = values

    authLoading.setLoading(true)
    const result = await sendRegisterRequest(email)
    if (result) {
        emit('setPhase', 'EMAIL_REVIEW')
    }
    authLoading.setLoading(false)
}
</script>



<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center bg-white relative z-20">
        <div class="login-header text-center flex flex-col gap-[0.75rem] items-center">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Get started</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center">To begin, please
                enter your email
                address. We will then send a verification email to ensure its accuracy.</p>
        </div>
        <VeeForm :validation-schema="validationSchema" @submit="onSubmit"
            class="w-[80%] min-[1379px]:w-[60%] h-auto flex flex-col gap-[2.5rem] font-shatoshi">
            <CommonField htmlFor="email" fieldName="email" type="email" label="Email" placeholder="Enter Your Email"
                fieldType="email" />
            <div class="submit-action w-full flex flex-col gap-[0.75rem]">
                <button
                    class="bg-[#121212] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Sign
                    Up</button>
                <button
                    class="bg-[#fffff] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] border leading-[1.25rem] border-[#EDEDED]  flex justify-center items-center gap-[0.625rem]">
                    <span class="w-auto h-auto">
                        <NuxtImg src="/icons/google.svg" width="24" height="24" alt="google-icon" class="!w-6 !h-6" />
                    </span>
                    Sign Up With Google
                </button>
            </div>
        </VeeForm>
    </div>
</template>
