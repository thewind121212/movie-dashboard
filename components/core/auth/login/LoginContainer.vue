<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import TwoFaTOTPForm from './LoginTwoFATOTP.vue';
const router = useRouter()


const loginPhase = ref<'LOGIN' | '2FA'>('LOGIN')
const payload2FATOTP = reactive<{
    nonce: string,
    email: string
    remember: boolean
}>({
    nonce: '',
    email: '',
    remember: false
})

const setPayLoad2FATOTP = (data: { email: string, nonce: string, remember: boolean }) => {
    payload2FATOTP.nonce = data.nonce
    payload2FATOTP.email = data.email
    payload2FATOTP.remember = data.remember
}


</script>


<template>
    <div class="w-full h-full min-h-[48.5rem] lg:min-h-auto flex flex-col justify-between items-center py-6 relative overflow-hidden">
        <div class="w-full h-auto flex justify-center items-center"
        >
            <NuxtLink to="/">
                <NuxtImg src="/icons/logo-dark.webp" width="48" height="48" alt="logo" class="w-[3rem] h-auto" />
            </NuxtLink>
            <h2 class="font-[400] font-shatoshi text-[1.375rem] leading-[1.5rem] text-[#121212]">Wliafdew</h2>
        </div>
        <div class="w-full max-w-[48rem] lg:max-w-auto  h-auto relative flex justify-center items-center">
            <div class="w-[200%] flex justify-center items-center absolute left-0 duration-300"
                :class="loginPhase === 'LOGIN' ? 'translate-x-0' : '-translate-x-1/2'">
                <div class="w-1/2 h-auto">
                    <LoginForm @setPhase="loginPhase = $event" @setPayloadTOTP="setPayLoad2FATOTP" />
                </div>
                <div class="w-1/2 h-auto">
                    <TwoFaTOTPForm :payload="payload2FATOTP" />
                </div>
            </div>

        </div>
        <div class="footer-auth mt-6">
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi cursor-default">Don’t have an account?
                <span class="font-medium cursor-pointer" v-on:click="() => router.push('/register')">Sign Up</span>
            </p>
        </div>
    </div>

</template>