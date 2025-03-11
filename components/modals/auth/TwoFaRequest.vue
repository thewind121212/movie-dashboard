<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useModalAnimation } from '#imports';
import { LoadingTwoFaEnableTOTPLoading } from '#components';
import { useModalStore } from '~/store/modal';
import PasswordInput from '~/components/shared/input/PasswordInput.vue';
import zod from 'zod';
import { requestEnableTOTP } from '~/actions/auth.action';
import { pushSuccessToast } from '#imports';
import { toTypedSchema } from '@vee-validate/zod';
import { Form } from 'vee-validate';
import { useRequestTotpStore } from '~/store/totpRequestStore';



const { mountedRef, zoomOutRef, displayDone, animateModal } = useModalAnimation();
const modalRef = ref<HTMLElement | null>(null);

const modalStore = useModalStore();
const requestTOTPStore = useRequestTotpStore();


onMounted(() => {
    animateModal()
});

const validationSchema = toTypedSchema(
    zod.object({
        password: zod.string({ message: '*Password is required' }).min(1, { message: 'This is required' }),
    })
);

async function onSubmit(values: any) {
    const result = await requestEnableTOTP(useAuthState().userAuthState.value.email, values.password);
    console.log(result.serect)
    if (result.isSuccess && result.recoveryCodes && result.qrCodeImageURL && result.serect) {
        requestTOTPStore.setRecoveryCode(result.recoveryCodes);
        requestTOTPStore.setSerect(result.serect);
        requestTOTPStore.setQrImagebase64(result.qrCodeImageURL);
        modalStore.setModalType('RECOVERY_PASS');
        setTimeout(() => {
            pushSuccessToast('Get Your Recovery Codes');
        }, 300)
    }

}


</script>

<template>
    <LoadingTwoFaEnableTOTPLoading
        v-bind:class="[{ '!opacity-100': mountedRef }, { 'w-[20%] rounded-xl': zoomOutRef }, { 'opacity-0': displayDone }, 'z-20 duration-300 min-w-[21.875rem]']"
        v-bind:style="{ aspectRatio: zoomOutRef ? modalRef?.getBoundingClientRect().width! / modalRef?.getBoundingClientRect().height! : '1/1' }" />

    <div class="w-[20%] h-auto bg-white border shadow-md rounded-xl p-6 flex flex-col justify-start items-center gap-4 pb-4 absolute opacity-0 duration-500 min-w-[21.875rem]"
        ref="modalRef" :class="[{ 'opacity-100 z-30': displayDone }]">
        <h1 class="font-shatoshi text-center text-[1.5rem]">
            Setup Two-Factor
        </h1>
        <div class="w-full aspect-square flex justify-center items-center gap-4 relative min-w-[15.625rem] -my-5">
            <client-only>
                <Vue3Lottie animationLink="/animations/twofactor.json" :loop="true" class="!w-full !h-auto absolute" />
            </client-only>
        </div>
        <Form :validation-schema="validationSchema" @submit="onSubmit"
            class="w-full h-auto flex flex-col gap-[1rem] font-shatoshi">
            <div class="w-full h-auto flex flex-col gap-[1rem]">
                <PasswordInput htmlFor="password" fieldName="password" type="password" label="Password"
                    placeholder="Enter Your Password" fieldType="password" />
            </div>
            <div class="submit-action w-full flex flex-col gap-[0.75rem]">
                <button
                    class="bg-[#060b26] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Next</button>
                <div class="bg-[#DDDDDD] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] leading-[1.25rem] text-center cursor-pointer"
                    @click="modalStore.hideModal()">
                    Cancel</div>
            </div>

        </Form>
    </div>
</template>
