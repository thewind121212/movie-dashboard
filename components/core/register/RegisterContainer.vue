<script setup lang="ts">
import RegisterRequest from './RegisterRequestForm.vue';
import RegisterFillForm from './RegisterFillForm.vue';
import RegisterResponse from './RegisterResponse.vue';
import { userRegisterTokenError } from '~/composables/useRegisterTokenError';

const RegisterReview = defineAsyncComponent(() => import('./RegisterReview.vue'))
type RegisterPhase = 'INIT' | 'REGISTER' | 'EMAIL_REVIEW' | 'SIGN_UP_PROCESSING' | 'SIGN_UP_RESPONSE'

const { validState } = userRegisterTokenError()


const router = useRouter()
const route = useRoute()
const registerPhase = ref<RegisterPhase>('INIT')

const changeRegisterPhase = (phase: RegisterPhase) => {
    registerPhase.value = phase
}


onMounted(() => {
    if (validState.value.error && route.query.p && !validState.value.email) {
        registerPhase.value = 'SIGN_UP_RESPONSE'
        return
    }
    if (!validState.value.error && route.query.p && validState.value.email) {
        registerPhase.value = 'SIGN_UP_PROCESSING'
        return
    }
    
    registerPhase.value = 'REGISTER'
})


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
            <div class="w-[400%] flex justify-center items-center duration-300 relative" :class="{
                'translate-x-0': registerPhase === 'REGISTER',
                '-translate-x-[25%]': registerPhase === 'EMAIL_REVIEW',
                'transform -translate-x-[50%]': registerPhase === 'SIGN_UP_PROCESSING',
                'transform -translate-x-[75%]': registerPhase === 'SIGN_UP_RESPONSE',
            }">
                <div class="w-[25%] h-full absolute left-0 flex justify-center items-center z-10">
                    <NuxtImg src="/icons/loading.svg" alt="logo" class="w-[3rem] h-auto" />
                </div>
                <RegisterRequest @setPhase="changeRegisterPhase"
                    v-bind:class="registerPhase !== 'REGISTER' && 'opacity-0'" />
                <RegisterReview @setPhase="changeRegisterPhase"
                    v-bind:class="registerPhase !== 'EMAIL_REVIEW' && 'opacity-0'" />
                <RegisterFillForm @setPhase="changeRegisterPhase"
                    v-bind:class="registerPhase !== 'SIGN_UP_PROCESSING' && 'opacity-0'" :email="validState.email" />
                <RegisterResponse @setPhase="changeRegisterPhase" status="FAILED" :message="validState.message"
                    v-bind:class="registerPhase !== 'SIGN_UP_RESPONSE' && 'opacity-0'" />
            </div>
        </div>
        <div class="footer-auth">
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi cursor-default">Already have an account?
                <span class="font-medium cursor-pointer" v-on:click="() => router.push('/login')">Sign In</span>
            </p>
        </div>
    </div>

</template>