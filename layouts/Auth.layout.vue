

<script setup lang="ts">
const route = useRoute()
import { useAuthLoading } from '~/store/authLoading';
import { computed } from 'vue';

defineProps({
    currentAuthPath: String as PropType<'login' | 'register' | 'forgotPassword' | 'resetPassword'>
})

const authLoadingStore = useAuthLoading()
const isLoading = computed(() => authLoadingStore.isLoading)

const images = {
    login: '/images/login-image.jpg',
    register: '/images/register-image.png',
    forgotPassword: '/images/forgot-password.png',
    resetPassword: '/images/reset-password.png'
}

const header: Record<'login' | 'register' | 'forgotPassword' | 'resetPassword', {
    id: string,
    textArray: string[]
}> = {
    login: {
        id: 'login',
        textArray: ['MOVIE', 'EVERY MOVIE', 'YOUR WANT'],
    }, 
     register:
    {
        id: 'register',
        textArray: ['EASY', 'CREATE HLS', 'STREAMING'],
    },
    forgotPassword: {
        id: 'forgotPassword',
        textArray: ['SUPPORT', 'MULTI-DEVICE'],
    },
    resetPassword: {
        id: 'resetPassword',
        textArray: ['ENJOY', 'YOU MOVIE', 'TODAY'],
    }
}


</script>


<template>
    <section class="w-screen h-screen flex justify-start items-start p-[0.75rem] select-none gap-[0.75rem]">
        <div class="rounded-[1.25rem] overflow-hidden h-full min-w-[550px] w-1/2 relative">
            <NuxtImg :src="images[currentAuthPath!]"
                alt="login" class="w-full h-full object-cover" />
            <div class="absolute w-full h-full bg-[#000] left-0 top-0 opacity-[0.35] z-10"></div>
            <div class="w-full h-full z-20 absolute top-0 left-0 flex flex-col">
                <div
                    class="w-full h-[1.5rem] flex justify-start items-center space-y-4 pl-[3rem] pt-[3rem] gap-[0.5rem]">
                    <h1 class="text-[#ffffff] font-shatoshi font-[500] text-[1rem] opacity-80 uppercase">
                        {{ currentAuthPath === 'login' ? 'MOVIE UPLOAD DASHBOARD' : 'JOIN US TODAY' }} </h1>
                    <div class="bg-[#ffffff] h-[0.0625rem] w-1/5 opacity-80"></div>
                </div>
                <div class="pl-[3rem] pb-[3rem] mt-auto flex flex-col gap-[1rem]">
                    <div class="font-noto text-white text-[4.5rem] leading-[4.5rem] font-[400]">
                        <h1 class="w-full h-auto" v-for="(item, index) in header[currentAuthPath!].textArray" :key="index + currentAuthPath!">{{ item }}</h1>
                    </div>
                    <div class="w-3/5">
                        <p class="font-shatoshi text-[#ffffff] opacity-[0.88] text-[1rem] leading-[1.625rem]">As we
                            continue to grow, our movie upload process needs to be robust and efficient. Our movie
                            uploader offers the scalability we need to handle future expansion.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-full w-1/2 relative">
            <client-only>
                <div v-if="isLoading"
                    class="w-full h-full bg-[#121212] opacity-60 rounded-[1.25rem] absolute top-0 left-0 z-20 flex justify-center items-center">
                    <NuxtImg src="/icons/loading.svg" alt="logo" class="w-[3rem] h-auto" />
                </div>
            </client-only>
            <slot />
        </div>
    </section>

</template>