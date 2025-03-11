<script setup lang="ts">
import NavItem from '~/components/shared/nav/NavItem.vue';
import { useRoute } from 'vue-router';
import ImageCrop from '~/components/modals/avatarUpload/ImageCrop.vue';
import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';
import { useModalStore } from '~/store/modal';
import LoadingSpinner from '~/components/shared/ui/LoadingSpinner.vue';
import { useAuthState } from '#imports';


const modalStore = useModalStore();

const { userAuthState } = useAuthState();



const isModalShow = computed(() => modalStore.isShow);
const modalType = computed(() => modalStore.type);

const path = useRoute().path;

const userCurrentPath = computed(() => {
    return path.split('/')[2];
});



</script>

<template>
    <div class="w-full h-full relative rounded-lg overflow-hidden flex flex-col justify-start items-start gap-4">
        <div class="w-full h-full absolute opacity-20 bg-[#121212] rounded-lg z-10"></div>
        <div
            class="h-[3.75rem] w-full bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] relative z-20 rounded-lg px-6 flex justify-start items-center">
            <p class="text-white font-bold">Account Settings</p>
        </div>
        <div class="w-full h-auto flex-1  relative z-20 rounded-lg flex justify-start items-center gap-4">
            <div
                class="w-[16.5rem] h-full bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] rounded-lg p-4 text-white flex flex-col min-w-[16.5rem] py-6">
                <div
                    class="rounded-full bg-white flex justify-center items-center w-20 h-20 aspect-square mx-auto mb-6 relative">
                    <div
                        class="absolute w-full h-full rounded-full z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                        <LoadingSpinner />
                    </div>
                    <NuxtImg :src="`${$config.public.beServerUrl}/s3/avatar/${userAuthState.userId}`" loading="lazy"
                        width="200" height="200"
                        id="user-avatar"
                        class="w-[4.5rem] h-[4.5rem] rounded-full object-covert object-top overflow-hidden aspect-square relative z-20" />
                    <div class="size-6 bg-white absolute bottom-0 right-0 rounded-md cursor-pointer flex justify-center items-center z-30"
                        v-on:click="modalStore.setModalType('CROP', 'Crop Image')">
                        <NuxtImg src="/icons/edit.svg" width="200" height="200" class="size-5 rounded-full" />
                    </div>
                </div>

                <NavItem icon-path="/icons/profile.svg" :name="'Profile'" :url="'/settings/account'" :is-expanded="true"
                    :active="userCurrentPath === 'account'" />

                <NavItem icon-path="/icons/security.svg" :name="'Security'" :url="'/settings/security'"
                    :is-expanded="true" :active="userCurrentPath === 'security'" />

                <NavItem icon-path="/icons/deleteAccount.svg" :name="'Delete Account'" :url="'/settings/delete-account'"
                    :is-expanded="true" :active="userCurrentPath === 'delete-account'" :caution="true" />
            </div>
            <div class="flex-1 h-full bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] rounded-lg">
                <slot />
            </div>
        </div>
        <!-- upload avatar-->
        <Teleport to="#modal-render-entrypoint" v-if="isModalShow && modalType === 'CROP'">
            <ModalContainer>
                <ImageCrop />
            </ModalContainer>
        </Teleport>
    </div>

</template>