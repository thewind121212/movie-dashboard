<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useModalAnimation } from '#imports';
import OTPField from '~/components/shared/input/OTPInput.vue';
import { LoadingTwoFaEnableTOTPLoading } from '#components';
import { useModalStore } from '~/store/modal';


const { mountedRef, zoomOutRef, displayDone, animateModal } = useModalAnimation();
const modalRef = ref<HTMLElement | null>(null);

const modalStore = useModalStore();

const fetchLinh = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
};

await fetchLinh();



onMounted(() => {
    animateModal()
});



</script>

<template>
    <LoadingTwoFaEnableTOTPLoading
        v-bind:class="[{ '!opacity-100': mountedRef }, { 'w-[40%] rounded-xl': zoomOutRef }, { 'opacity-0': displayDone }, 'z-20 duration-300 max-w-[38.75rem]']"
        v-bind:style="{ aspectRatio: zoomOutRef ? modalRef?.getBoundingClientRect().width! / modalRef?.getBoundingClientRect().height! : '1/1' }" />

    <div class="w-[40%] h-auto bg-white border shadow-md rounded-xl p-6 flex flex-col gap-6 pb-4 absolute opacity-0 duration-500 max-w-[38.75rem]"
        ref="modalRef" :class="[{ 'opacity-100 z-30': displayDone }]">
        <div class="heading font-sans flex flex-col gap-2">
            <h1 class="font-bold text-[24px] font-shatoshi">Setup Authenticator TOTP</h1>
            <p class="font-light">The login procedure necessitates the entry of a (TOTP), which will be required
                alongside your password for each access attempt</p>
        </div>
        <div class="step1 flex flex-col gap-1">
            <div class="flex justify-start items-center gap-2">
                <h2
                    class="w-[64px] h-[22px] bg-white border rounded-[45px] flex justify-center items-center text-[15px] font-sans border-[#342d86] text-[#342d86]">
                    Step 1
                </h2>
                <p class="font-bold">Scan QR Code</p>
            </div>
            <p class="font-shatoshi text-[#4D4D4D]">Scan the QR code below or manually enter the secret key into your
                authenticator app</p>
        </div>

        <div class="qr-block bg-[#F6F4F5] p-3 rounded-lg flex justify-start items-start gap-6">
            <NuxtImg src="https://admin.wliafdew.dev/api/media/file/Untitled%201.png" width="160" height="160"
                alt="qr-code" />
            <div class="w-full flex flex-col justify-start items-start gap-2">
                <h3 class="font-semibold text-[19px]">Can't scan qr code?</h3>
                <p class="text-[15px] text-[#716F70]">Enter this secret instead:</p>
                <div class="w-full h-auto py-2 pl-2 rounded-lg bg-[#E9E4E3] font-medium text-[15px]">
                    <p>JBSWY3DPEHPK3PXP</p>
                </div>
                <div
                    class="border-[#DDDDDD] bg-white w-fit h-auto flex justify-start items-center gap-2 p-2 rounded-lg border mt-1 cursor-pointer">
                    <NuxtImg src="/icons/copy.svg" width="18" height="18" alt="copy-icon" />
                    <p class="font-medium text-[12px]">Copy Code</p>
                </div>
            </div>
        </div>

        <div class="step2 flex flex-col gap-1">
            <div class="flex justify-start items-center gap-2">
                <h2
                    class="w-[64px] h-[22px] bg-white border rounded-[45px] flex justify-center items-center text-[15px] font-sans border-[#342d86] text-[#342d86]">
                    Step 2
                </h2>
                <p class="font-bold">Get Verification Code</p>
            </div>
            <p class="font-shatoshi text-[#4D4D4D]">Enter the 6-digit code you see in your authenticator app</p>
        </div>

        <div class="otp-block flex flex-col justify-start items-start gap-2 -mt-2">
            <p>Enter verification code</p>
            <OTPField />
        </div>

        <div class="w-full h-auto border-t border-[#DDDDDD] flex justify-end items-center gap-4 pt-4">
            <button
                class="font-medium text-[14px] text-black font-shatoshi px-4 py-2 bg-white border rounded-lg border-[#DDDDDD]"
                @click="modalStore.hideModal()">Cancel</button>
            <button
                class="font-medium text-[14px] text-white font-shatoshi px-4 py-2 bg-[#5445F4] border rounded-lg border-[#5445f4]">Confirm</button>
        </div>
    </div>
</template>
