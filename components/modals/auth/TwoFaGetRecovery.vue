<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useModalAnimation } from '#imports';
import { LoadingTwoFaEnableTOTPLoading } from '#components';
import { useModalStore } from '~/store/modal';
import RecoveryCodeItem from '~/components/shared/ui/RecoveryCodeItem.vue';
import copy from 'copy-to-clipboard'
import { useRequestTotpStore } from '~/store/totpRequestStore';
import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';
import BinaryModal from '~/components/shared/utils/BinaryModal.vue';



const { mountedRef, zoomOutRef, displayDone, animateModal } = useModalAnimation();
const modalRef = ref<HTMLElement | null>(null);

const totpRequest = useRequestTotpStore();
const doubleCheck = ref<boolean>(false);

const modalStore = useModalStore();
const copiesAll = ref(false);
const timerCopyRef = ref<ReturnType<typeof setTimeout> | null>(null);

const isGotCodes = ref<boolean>(false);


const recoveryCode = computed(() => totpRequest.recoveryCode);





onMounted(() => {
    animateModal()
});

async function onSubmit(values: any) {
    modalStore.setModalType('ENABLE_TOTP');
}

const dummyCodes = [
    "XXXXXXXX",
    "XXXXXXXX",
    "XXXXXXXX",
    "XXXXXXXX",
    "XXXXXXXX",
    "XXXXXXXX"
]


const handerGetCodes = (type: 'get' | 'next') => {
    if (type === 'get') {
        isGotCodes.value = true;
        return;
    }
    if (type === 'next') {
        doubleCheck.value = true;
    }
}

const handerCopiesAll = () => {
    if (!isGotCodes.value) {
        return
    }
    if (timerCopyRef.value) {
        clearTimeout(timerCopyRef.value);
    }

    copiesAll.value = true;
    copy(recoveryCode.value.join('\n'));
    timerCopyRef.value = setTimeout(() => {
        copiesAll.value = false;
    }, 210);
}


</script>

<template>
    <LoadingTwoFaEnableTOTPLoading
        v-bind:class="[{ '!opacity-100': mountedRef }, { 'w-[20%] rounded-xl': zoomOutRef }, { 'opacity-0': displayDone }, 'z-20 duration-300 min-w-[21.875rem]']"
        v-bind:style="{ aspectRatio: zoomOutRef ? modalRef?.getBoundingClientRect().width! / modalRef?.getBoundingClientRect().height! : '1/1' }" />

    <div class="w-[20%] h-auto bg-white border shadow-lg rounded-xl p-6 flex flex-col justify-start items-center gap-4 pb-4 absolute opacity-0 duration-500 min-w-[21.875rem] max-h-screen
   overflow-y-scroll 
    "
        ref="modalRef" :class="[{ 'opacity-100 z-30': displayDone }]">
        <h1 class="font-shatoshi text-center text-[1.5rem]">
            Recovery Codes
        </h1>
        <div class="rounded-lg  w-full">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Important Reminder:</h2>
            <p class="text-gray-700 mb-4">You have <span class="font-bold text-blue-600">6 recovery codes</span>
                available. Each code can be used <span class="font-bold">once</span> in case you forget your TOTP.</p>
            <p class="text-gray-700 mb-4"> <span class="font-bold">Store them securely</span>, and once used, they will
                no longer be valid. After using any, make sure to generate new ones to keep your account accessible!</p>
        </div>


        <div class="w-full h-auto flex justify-start">
            <p class="text-left text-xs text-gray-500">{{ !isGotCodes ? 'Click to get the codes below' :
                'You can click code to copy each code copy all' }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap bg-gray-200 w-full p-4 rounded-lg gap-2">
            <RecoveryCodeItem v-for="code in (isGotCodes ? recoveryCode : dummyCodes)" :key="code + 'recoveryCode'"
                :item="code" :iscopied-all="copiesAll" />
        </div>
        <div class="w-full h-auto flex justify-end items-center">
            <div class="h-8 p-2 bg-slate-200 rounded-lg flex justify-center items-center cursor-pointer gap-2 py-4"
                @click="handerCopiesAll">
                <p class="font-shatoshi divide-purple-200">{{ copiesAll ? 'Copied' : 'Copy' }}</p>
                <NuxtImg src="/icons/copy-v2.svg" width="22" height="22" alt="copy-icon" @click="handerCopiesAll"
                    v-if="!copiesAll" />
                <NuxtImg src="/icons/copied-v2.svg" width="22" height="22" alt="copy-icon" @click="handerCopiesAll"
                    v-if="copiesAll" />
            </div>
        </div>


        <div class="submit-action w-full flex flex-col gap-[0.75rem]">
            <button
                class="bg-[#060b26] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]"
                @click="handerGetCodes(!isGotCodes ? 'get' : 'next')"> {{ !isGotCodes ? 'Get The Code' : 'Next' }}
            </button>

            <div class="bg-[#DDDDDD] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] leading-[1.25rem] text-center cursor-pointer"
                @click="modalStore.hideModal()">
                Cancel</div>
        </div>

        <!-- confirm get the code for sure-->
        <Teleport to="#modal-render-entrypoint" v-if="doubleCheck && isGotCodes">
            <ModalContainer>
                <BinaryModal :cancelContent="'Wait I Need Get It'" :approveContent="'I Had Codes'"
                    :handerFunction="() => modalStore.setModalType('ENABLE_TOTP')" class="z-[999]"
                    header="Confrim you get all codes" :cancel-function="() => doubleCheck = false"
                    :hide-modal-manual="true"
                    content="Get the codes and keep it serect for future use" />
            </ModalContainer>
        </Teleport>

    </div>
</template>
