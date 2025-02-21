<script setup lang="ts">

import ResetPasswordForm from './ResetPasswordForm.vue';

import AuthResponse from '~/components/shared/utils/authResponse.utils.vue';

const router = useRouter()
const resetPasswordPhase = ref<'RESET_FORM' | 'RESET_COMPLETED'>('RESET_FORM')


</script>


<template>
    <div class="w-full h-full flex flex-col justify-between items-center py-6">
        <div class="w-full h-auto flex justify-center items-center">
            <NuxtLink to="/">
                <NuxtImg src="/icons/logo-dark.webp" width="48" height="48" alt="logo" class="w-[3rem] h-auto" />
            </NuxtLink>
            <h2 class="font-[400] font-shatoshi text-[1.375rem] leading-[1.5rem] text-[#121212]">Wliafdew</h2>
        </div>
        <div class="w-full h-auto flex flex-col gap-[2.5rem] items-center">
            <div class="relative w-full h-auto overflow-hidden">
                <div class="w-[200%] flex justify-center items-center duration-300 relative" :class="{
                    'translate-x-0': resetPasswordPhase === 'RESET_FORM',
                    '-translate-x-1/2': resetPasswordPhase === 'RESET_COMPLETED',
                }">
                    <ResetPasswordForm />
                    <AuthResponse :heading="'Reset Password Completed'"
                        :content="'Password reset successfully. You may now access your account using your new credentials.'"
                        :animationConfig="{ url: '/animations/successed.json', heigh: 90, width: 90 }" />
                </div>
            </div>
        </div>
        <div class="footer-auth">
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi cursor-default">Don’t have an account?
                <span class="font-medium cursor-pointer" v-on:click="() => router.push('/register')">Sign Up</span>
            </p>
        </div>
    </div>

</template>