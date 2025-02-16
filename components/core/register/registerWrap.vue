<script setup lang="ts">
import RegisterForm from './registerInitForm.vue';
import RegisterFillForm from './registerFillForm.vue';

const RegisterReview = defineAsyncComponent(() => import('./registerReview.vue'))

const router = useRouter()

type RegisterPhase = 'REGISTER' | 'EMAIL_REVIEW' | 'SIGN_UP_PROCESSING' | 'SIGN_UP_SUCCESS' | 'SIGN_UP_FAILURE'

const registerPhase = ref<RegisterPhase>('REGISTER')

const toggleRegisterPhase = (phase: RegisterPhase) => {
    if (registerPhase.value === 'REGISTER') {
        registerPhase.value = 'EMAIL_REVIEW'
    } else {
        registerPhase.value = 'REGISTER'
    }
}

</script>


<template>
    <div class="w-full h-full flex flex-col justify-between items-center py-6 relative overflow-hidden rounded-[1.25rem]">
        <div class="w-full h-auto flex justify-center items-center">
            <NuxtLink to="/">
                <NuxtImg src="/icons/logo-dark.webp" width="48" height="48" alt="logo" class="w-[3rem] h-auto" />
            </NuxtLink>
            <h2 class="font-[400] font-shatoshi text-[1.375rem] leading-[1.5rem] text-[#121212]">Wliafdew</h2>
        </div>
        <div class="relative w-full h-auto overflow-hidden">
            <div class="w-[200%] flex justify-center items-center duration-300" :class="{
                'translate-x-0': registerPhase === 'REGISTER',
                '-translate-x-[50%]': registerPhase === 'EMAIL_REVIEW',
                // 'transform -translate-x-100%': registerPhase === 'SIGN_UP_PROCESSING',
                // 'transform -translate-x-150%': registerPhase === 'SIGN_UP_SUCCESS',
                // 'transform -translate-x-200%': registerPhase === 'SIGN_UP_FAILURE',
            }">
                <!-- <RegisterForm /> -->
                <RegisterFillForm />
                <RegisterReview />
            </div>
        </div>
        <div class="footer-auth">
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi cursor-default"
                v-on:click="toggleRegisterPhase('EMAIL_REVIEW')">Already have an account?
                <span class="font-medium cursor-pointer" v-on:click="() => router.push('/login')">Sign In</span>
            </p>
        </div>
    </div>

</template>