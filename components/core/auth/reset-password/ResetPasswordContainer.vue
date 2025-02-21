<script setup lang="ts">

import ResetPasswordForm from './ResetPasswordForm.vue';

import AuthResponse from '~/components/shared/utils/authResponse.utils.vue';
import { useVerifyLinkState } from '#imports';

const router = useRouter()
const route = useRoute()
const resetPasswordPhase = ref<'INIT' | 'RESET_FORM' | 'RESET_RESULT'>('INIT')
const { validState, resetDefault } = useVerifyLinkState()


onMounted(() => {
    if (validState.value.error && route.query.p) {
        resetPasswordPhase.value = 'RESET_RESULT'
        return
    }
    if (!validState.value.error && route.query.p) {
        resetPasswordPhase.value = 'RESET_FORM'
        return
    }

    resetPasswordPhase.value = 'RESET_FORM'

})


onUnmounted(() => {
    resetPasswordPhase.value = 'INIT'
    resetDefault()
})


const changePhase = (phase: 'INIT' | 'RESET_FORM' | 'RESET_RESULT') => {
    resetPasswordPhase.value = phase
}

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
                    '-translate-x-1/2': resetPasswordPhase === 'RESET_RESULT',
                }">

                    <div class="w-1/2 h-full absolute left-0 flex justify-center items-center z-10">
                        <NuxtImg src="/icons/loading.svg" alt="logo" class="w-[3rem] h-auto" />
                    </div>
                    <ResetPasswordForm v-bind:class="resetPasswordPhase !== 'RESET_FORM' && 'opacity-0'"
                        @setPhase="changePhase" />
                    <AuthResponse :heading="validState.error ? 'Password Reset Error' : 'Password Reset Success'"
                        :content="validState.error
                            ? validState.message
                            : 'Your password has been successfully reset. Please login with your new password!'
                            "
                        :animationConfig="{ url: validState.error ? '/animations/fail.json' : '/animations/successed.json', heigh: 90, width: 90 }"
                        v-bind:class="resetPasswordPhase !== 'RESET_RESULT' && 'opacity-0'" />

                </div>
            </div>
        </div>
        <div class="footer-auth">
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi cursor-default">Change pass already?
                <span class="font-medium cursor-pointer" v-on:click="() => router.push('/login')">Sign In</span>
            </p>
        </div>
    </div>

</template>