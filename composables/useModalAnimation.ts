import { ref } from 'vue';

export const useModalAnimation = () => {
    const mountedRef = ref<boolean>(false);
    const zoomOutRef = ref<boolean>(false);
    const displayDone = ref<boolean>(false);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const animateModal = async () => {
        mountedRef.value = true;
        await delay(550);
        zoomOutRef.value = true;
        await delay(350);
        mountedRef.value = false;
        displayDone.value = true;
    };

    return {
        mountedRef,
        zoomOutRef,
        displayDone,
        animateModal
    };
};
