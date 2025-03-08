
import { ref } from 'vue';
import { useModalStore, type ModalType } from '@/store/modal';

export const useToogleBinaryModal = (modalName: ModalType, header: string, content: string) => {

    const modalStore = useModalStore();

    const isShow = computed(() => modalStore.isShow);
    const modalType = computed(() => modalStore.type);

    const showModalChange = () => {
        modalStore.setModalType(modalName, header, content);
        modalStore.isShow = true
    }

    return {
        isShow,
        modalType,
        showModalChange
    }

};
