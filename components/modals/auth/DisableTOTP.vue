<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useModalAnimation } from '#imports';
import { LoadingTwoFaEnableTOTPLoading } from '#components';
import OTPInput from '~/components/shared/input/OTPInput.vue';
import { useModalStore } from '~/store/modal';
import PasswordInput from '~/components/shared/input/PasswordInput.vue';
import { disableTOTP } from '~/actions/auth.action';
import zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { Form, useForm } from 'vee-validate';



const { mountedRef, zoomOutRef, displayDone, animateModal } = useModalAnimation();
const modalRef = ref<HTMLElement | null>(null);

const method = ref<'init' | 'token' | 'recoveryPass'>('init');

const modalStore = useModalStore();


onMounted(() => {
    animateModal()
});




const validationSchema = toTypedSchema(
    zod.object({
        recoveryPass: zod.string({ message: '*Recovery code is required' }).min(1, { message: 'This is required' }),
    })
);


const { setFieldValue, setFieldError, values, isFieldDirty } = useForm({
    validationSchema: validationSchema,
});

async function onSubmit(externalPayload?: string) {
    if (method.value === 'init') {
        return;
    }

    const payload = method.value === 'token' ? externalPayload : values.recoveryPass;

    if (method.value === 'token' && !payload) {
        return;
    }

    if (method.value === 'recoveryPass' && !values.recoveryPass) {
        return;
    }


    const result = await disableTOTP(useAuthState().userAuthState.value.userId, payload!, method.value);
    if (result) {
        useAuthState().sendRefeshTrigger();
        useModalStore().hideModal();
        setTimeout(() => {
            pushSuccessToast('2FA with TOTP successfully disable to your account');
        }, 300)
    }
}



async function handerDisableOnOTP(otp: string) {
    if (otp.length !== 6) {
        return;
    }
    onSubmit(otp);
}

</script>

<template>
    <LoadingTwoFaEnableTOTPLoading
        v-bind:class="[{ '!opacity-100': mountedRef }, { 'w-[20%] rounded-xl': zoomOutRef }, { 'opacity-0': displayDone }, 'z-20 duration-300 min-w-[21.875rem]']"
        v-bind:style="{ aspectRatio: zoomOutRef ? modalRef?.getBoundingClientRect().width! / modalRef?.getBoundingClientRect().height! : '1/1' }" />

    <div class="w-[20%] h-auto bg-white border shadow-md rounded-xl p-6 flex flex-col justify-start items-center gap-4 pb-4 absolute opacity-0 duration-500 min-w-[21.875rem] font-shatoshi"
        ref="modalRef"
        :class="[{ 'opacity-100 z-30 !duration-0': displayDone }, { 'w-[40%] !duration-0': method !== 'init' }]">
        <h1 class="font-shatoshi text-center text-[1.5rem]">
            Disable Two-Factor TOTP
        </h1>
        <p class="text-center text-gray-500">
            You can disable TOTP (Time-Based One-Time Password) using either the recovery code or TOTP itself. Please
            choose your preferred method.
        </p>

        <div class="w-full flex flex-col items-start gap-4 mt-4">
            <label for="use-totp" class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="use-totp" class="checkbox" :checked="method === 'token' ? true : false"
                    @change="() => method === 'token' ? method = 'init' : method = 'token'" />
                <span class="text-gray-600">Use TOTP</span>
            </label>

            <label for="use-recovery-code" class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="use-recovery-code" class="checkbox"
                    :checked="method === 'recoveryPass' ? true : false"
                    @change="() => method === 'recoveryPass' ? method = 'init' : method = 'recoveryPass'" />
                <span class="text-gray-600">Use Recovery Code</span>
            </label>
        </div>


        <div class="w-full flex justify-start items-center relative overflow-hidden duration-200"
            :class="method === 'init' ? '!h-0 !duration-0' : 'h-[7.5rem] !duration-0'">
            <div class="w-[200%] h-[7.5rem] absolute top-0 left-0 flex justify-start items-center duration-200"
                :class="method === 'token' ? 'translate-x-0' : 'translate-x-[-50%]'">
                <div class="w-1/2">
                    <label class="text-[1rem] leading-[1.5rem] mb-1 block font-shatoshi">TOTP</label>
                    <OTPInput @getOTP="handerDisableOnOTP" />
                </div>
                <form @submit.prevent="onSubmit()" class="w-1/2 h-auto flex gap-[1rem] font-shatoshi items-end">
                    <div class="w-full h-auto flex justify-center items-center gap-[1rem]">
                        <PasswordInput htmlFor="recoveryPass" fieldName="recoveryPass" type="password"
                            label="Recovery Code" placeholder="Enter Your Code" fieldType="password" />
                    </div>
                </form>

            </div>
        </div>

        <button
            class="bg-[#060b26] w-full aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]"
            @click="onSubmit()" v-if="method === 'recoveryPass'" :disabled="method !== 'recoveryPass'">Disable
            TOTP</button>
        <div class="submit-action w-full flex flex-col gap-[0.75rem]">
            <div class="bg-[#DDDDDD] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] leading-[1.25rem] text-center cursor-pointer"
                @click="modalStore.hideModal()">
                Cancel</div>
        </div>
    </div>
</template>
