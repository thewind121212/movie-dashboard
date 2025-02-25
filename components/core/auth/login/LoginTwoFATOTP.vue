<script setup lang="ts">
import OTPInput from '~/components/shared/input/OTPInput.vue';
import { pushErrorToast } from '#imports';
import { useAuthLoading } from '~/store/authLoading';
import { loginWith2FaTOTP } from '~/actions/auth.action';

const props = defineProps({
    payload: {
        type: Object as PropType<{ email: string, nonce: string, remember: boolean }>,
    }
})

const emit = defineEmits(['submitOTP'])

const authLoading = useAuthLoading()


const submitTOTP = async (otp: string) => {
    console.log(props.payload?.remember)
    if (otp.length !== 6 || !props.payload?.email || !props.payload?.nonce) {
        pushErrorToast('Missing OTP, email or nonce')
        return
    }
    authLoading.setLoading(true);
    const isLoginSuccess = await loginWith2FaTOTP( otp, props.payload.email, props.payload.nonce, props.payload.remember);

    authLoading.setLoading(false);
    if (isLoginSuccess) {
        //redirect to dashboard
        await navigateTo('/')
    }


}

</script>


<template>
    <div class="login-header text-center flex flex-col justify-center items-center gap-[0.75rem]">
        <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Verify Your Identity</h1>
        <div
            class="w-[70%] aspect-[659/420] flex justify-center items-center gap-4 relative !min-w-[37.5rem] ml-[5%] z-10">
            <client-only>
                <Vue3Lottie animationLink="/animations/otp-2fa.json" :loop="false" class="!w-full !h-auto absolute" />
            </client-only>
        </div>
        <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi mb-4">Enter the One-Time Password (OTP) to
            access
            your account.</p>
        <div class="w-auto h-auto relative z-20">
            <OTPInput @getOTP="submitTOTP" />
        </div>
    </div>

</template>