<script setup lang="ts">
import { useModalStore } from '~/store/modal';

const { hideModal, type } = useModalStore();

const typeModal = computed(() => type);


const props = defineProps<{
    handlerCloseModal?: () => void
}>()


const handerCloseModal = () => {
    if (typeModal.value === 'BINARY') {
        hideModal()
    }
    if (props.handlerCloseModal) {
        props.handlerCloseModal()
    }
}

</script>


<template>
    <div class="w-screen h-screen fixed top-0 left-0 z-[80]">
        <div class="w-full h-full relative justify-center items-center flex">
            <div class="w-full h-full flex justify-center items-center bg-[#121212] opacity-30 z-10 absolute"
                @click="handerCloseModal" />
            <slot />
        </div>
    </div>
</template>