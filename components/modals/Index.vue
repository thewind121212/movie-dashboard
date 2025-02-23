<script setup lang="ts">
import { LoadingTwoFaEnableTOTPLoading } from '#components';
import { useModalStore } from '~/store/modal';
import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';
import TwoFaRequest from './auth/TwoFaRequest.vue';


const modalStore = useModalStore();

const isShowRetrieved = computed(() => modalStore.isShow);
const modalType = computed(() => modalStore.type);
const eventESCref = ref<null | ((e: KeyboardEvent) => void)>(null);


onMounted(() => {
    eventESCref.value = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            modalStore.hideModal();
        }
    }
    window.addEventListener('keydown', eventESCref.value);
});


onUnmounted(() => {
    if (eventESCref.value) {
        window.removeEventListener('keydown', eventESCref.value);
    }
});

</script>


<template>
    <ClientOnly>
        <!-- modal enable totp teleport -->
        <Teleport to="#modal-render-entrypoint" v-if="isShowRetrieved && modalType === 'ENABLE_TOTP'">
            <ModalContainer>
                <Suspense>
                    <template #fallback>
                        <LoadingTwoFaEnableTOTPLoading />
                    </template>
                    <template #default>
                        <ModalsAuthTwoFaEnableTOTP />
                    </template>
                </Suspense>
            </ModalContainer>
        </Teleport>
        <!-- modal request auth two factor -->
        <Teleport to="#modal-render-entrypoint" v-if="isShowRetrieved && modalType === 'REGISTER_TOTP'">
            <ModalContainer>
                <ModalsAuthTwoFaRequest />
            </ModalContainer>
        </Teleport>
    </ClientOnly>
</template>