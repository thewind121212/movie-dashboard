import Vue3Toastify, { toast, type IconProps } from 'vue3-toastify';
import ErrorToastNotification from '~/components/shared/toast/ErrorToastNotification.vue';
import SuccessToastNotification from '~/components/shared/toast/SuccessToastNotification.vue';
import InfoToastNotification from '~/components/shared/toast/InfoToastNotification.vue';
import 'vue3-toastify/dist/index.css';

const ResolveCustomIcon = (props: IconProps) => {
    switch (props.type) {
        case 'default':
            return '👌';
        case 'loading':
            return '⏳';
        case 'info':
            return InfoToastNotification
        case 'success':
            return SuccessToastNotification
        case 'error':
            return ErrorToastNotification
        case 'warning':
            return '😢';
        default:
            return undefined;
    }
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toastify, {
        autoClose: 1000,
        icon : ResolveCustomIcon,
    });
    return {
        provide: {
            toast,
        },
    };
});
