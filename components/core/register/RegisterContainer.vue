<script setup lang="ts">
import RegisterForm from './RegisterRequestForm.vue';
import RegisterFillForm from './RegisterFillForm.vue';
import RegisterResponse from './RegisterResponse.vue';

const RegisterReview = defineAsyncComponent(() => import('./RegisterReview.vue'))
type RegisterPhase = 'REGISTER' | 'EMAIL_REVIEW' | 'SIGN_UP_PROCESSING' | 'SIGN_UP_RESPONSE'

const router = useRouter()


const registerPhase = ref<RegisterPhase>('REGISTER')

const toggleRegisterPhase = (phase: RegisterPhase) => {

    if (registerPhase.value === 'REGISTER') {
        registerPhase.value = 'EMAIL_REVIEW'
    } else if (registerPhase.value === 'EMAIL_REVIEW') {
        registerPhase.value = 'SIGN_UP_PROCESSING'
    } else if (registerPhase.value === 'SIGN_UP_PROCESSING') {
        registerPhase.value = 'SIGN_UP_RESPONSE'
    } else if (registerPhase.value === 'SIGN_UP_RESPONSE') {
        registerPhase.value = 'REGISTER'
    }
}


</script>


<template>
    <div
        class="w-full h-full flex flex-col justify-between items-center py-6 relative overflow-hidden rounded-[1.25rem]">
        <div class="w-full h-auto flex justify-center items-center">
            <NuxtLink to="/">
                <NuxtImg src="/icons/logo-dark.webp" width="48" height="48" alt="logo" class="w-[3rem] h-auto" />
            </NuxtLink>
            <h2 class="font-[400] font-shatoshi text-[1.375rem] leading-[1.5rem] text-[#121212]">Wliafdew</h2>
        </div>
        <div class="relative w-full h-auto overflow-hidden">
            <div class="w-[400%] flex justify-center items-center duration-300" :class="{
                'translate-x-0': registerPhase === 'REGISTER',
                '-translate-x-[25%]': registerPhase === 'EMAIL_REVIEW',
                'transform -translate-x-[50%]': registerPhase === 'SIGN_UP_PROCESSING',
                'transform -translate-x-[75%]': registerPhase === 'SIGN_UP_RESPONSE',
            }">
                <RegisterForm />
                <RegisterReview />
                <RegisterFillForm />
                <RegisterResponse status="INTERNAL_ERROR" />
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