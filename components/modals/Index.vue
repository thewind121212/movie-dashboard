<script setup lang="ts">
import { LoadingTwoFaEnableTOTPLoading } from '#components';
import { useModalStore } from '~/store/modal';
import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';
import Drawer from '../shared/utils/Drawer.vue';
import AppSetting from './Settings/AppSetting.vue';
import TwoFaGetRecovery from './auth/TwoFaGetRecovery.vue';


const modalStore = useModalStore();

const isShow = computed(() => modalStore.isShow);
const modalType = computed(() => modalStore.type);
const eventESCref = ref<null | ((e: KeyboardEvent) => void)>(null);


onMounted(() => {
    eventESCref.value = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (modalType.value === 'SETTINGS') {
                return
            }
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
        <Teleport to="#modal-render-entrypoint" v-if="isShow && modalType === 'ENABLE_TOTP'">
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
        <Teleport to="#modal-render-entrypoint" v-if="isShow && modalType === 'REGISTER_TOTP'">
            <ModalContainer>
                <ModalsAuthTwoFaRequest />
            </ModalContainer>
        </Teleport>
        <!--modal show recovery pass  -->
        <Teleport to="#modal-render-entrypoint" v-if="isShow && modalType === 'RECOVERY_PASS'">
            <ModalContainer>
                <Suspense>
                    <template #fallback>
                        <LoadingTwoFaEnableTOTPLoading />
                    </template>
                    <template #default>
                        <TwoFaGetRecovery />
                    </template>
                </Suspense>
            </ModalContainer>
        </Teleport>
        <!-- drawer setting -->
        <Teleport to="#modal-render-entrypoint" v-if="isShow && modalType === 'SETTINGS'">
            <ModalContainer>
                <Drawer>
                    <AppSetting />
                </Drawer>
            </ModalContainer>
        </Teleport>
    </ClientOnly>
</template>