<template>
    <div v-if="isDrawerVisible" class="w-full h-full inset-0 z-40 relative" v-on:click="closeDrawer">
        <div class="w-full h-full absolute z-30" v-on:click="closeDrawer"></div>
        <div class="absolute top-0 right-0 w-auto p-6 h-full shadow-lg transform transition-transform duration-200 ease-in-out backdrop-blur-[120px] bg-gradient-to-b from-[#060b2893] to-[#0a0e23] bg-[linear-gradient(37.09088086894281deg, #060b28 0.00%, #0a0e23 100.00%)] z-50"
            :class="drawerClass">
            <!-- Drawer Header -->
            <div class="p-4 text-white font-shatoshi">
                <h2 class="text-lg font-semibold">{{ useModalStore().header }}</h2>
                <p class="text-[#bcbcbc]">Movie Dashboard Configurator</p>
            </div>
            <div class="mt-6 w-full h-auto">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useModalStore } from '~/store/modal';

const isDrawerVisible = ref(false);
const drawerClass = ref('translate-x-full');

const eventESCref = ref<null | ((e: KeyboardEvent) => void)>(null);

const openDrawer = () => {
    isDrawerVisible.value = true;
    setTimeout(() => {
        drawerClass.value = 'translate-x-0';
    }, 10);
};

const closeDrawer = () => {
    drawerClass.value = 'translate-x-full';
    setTimeout(() => {
        isDrawerVisible.value = false;
        useModalStore().hideModal();
    }, 200);
};


onUnmounted(() => {
    if (eventESCref.value) {
        window.removeEventListener('keydown', eventESCref.value);
    }
});


onMounted(() => {
    eventESCref.value = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (useModalStore().type === 'SETTINGS') {
                closeDrawer()
            }
        }
    }
    window.addEventListener('keydown', eventESCref.value);
    openDrawer();
});
</script>

<style scoped>
/* Optionally, add more custom styles for the drawer */
</style>