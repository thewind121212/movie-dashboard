<script setup lang="tsx">
import NavItem from '~/components/shared/nav/NavItem.vue'

import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';
import BinaryModal from '~/components/shared/utils/BinaryModal.vue';
import { logout } from '~/actions/auth.action';
import { useToogleBinaryModal } from '#imports';
import { useModalStore } from '~/store/modal';

const { isShow, modalType, showModalChange } = useToogleBinaryModal('BINARY', 'Are you sure you want to log out?', '')


const { setModalType } = useModalStore()


const expanedSidebar = ref(false)



const handerToogleExpanedSidebar = () => {
    expanedSidebar.value = !expanedSidebar.value
    //save to local storage
    localStorage.setItem('expanedSidebar', JSON.stringify(expanedSidebar.value))
}


onMounted(() => {
    // const expanedSidebarLocal = localStorage.getItem('expanedSidebar')

    // if (expanedSidebarLocal) {
    //     const linh = JSON.parse(expanedSidebarLocal)
    //     if (linh === expanedSidebar.value) {
    //         return
    //     } else {
    //         setTimeout(() => {
    //             expanedSidebar.value = JSON.parse(expanedSidebarLocal)
    //         }, 400);
    //     }
    // }
})



const homeDashboard: {
    id: number,
    name: string
    iconPath: string
    url: string
    group: "HOME" | "MOVIE" | "USER"
}[] = [{
    id: 1,
    name: 'Dashboard',
    iconPath: '/icons/home.svg',
    url: '/',
    group: 'HOME'
}]


const userDashboard: {
    id: number,
    name: string
    iconPath: string
    url: string
    group: "HOME" | "MOVIE" | "USER"
}[] = [
        {
            id: 1,
            name: 'Admin User',
            iconPath: '/icons/adminUser.svg',
            url: '/',
            group: 'USER'
        },
        {
            id: 1,
            name: 'Client User',
            iconPath: '/icons/clientUser.svg',
            url: '/',
            group: 'USER'
        },
        {
            id: 1,
            name: 'Admin Request',
            iconPath: '/icons/adminRequest.svg',
            url: '/',
            group: 'USER'
        },
        {
            id: 1,
            name: 'Admin Mailer',
            iconPath: '/icons/adminMailer.svg',
            url: '/',
            group: 'USER'
        }
    ]


const movieDashboard: {
    id: number,
    name: string
    iconPath: string
    url: string
    group: "HOME" | "MOVIE" | "USER"
}[] = [
        {
            id: 1,
            name: 'Movie Genere',
            iconPath: '/icons/movieGenere.svg',
            url: '/',
            group: 'USER'
        },
        {
            id: 1,
            name: 'Movie',
            iconPath: '/icons/movieSingle.svg',
            url: '/',
            group: 'USER'
        },
        {
            id: 1,
            name: 'TV Show',
            iconPath: '/icons/tvShow.svg',
            url: '/',
            group: 'USER'
        },
    ]

</script>


<template>

    <div
        class="w-screen min-h-screen h-auto flex justify-start items-start bg-[url('/images/background.png')] bg-cover bg-center relative pl-4 py-4 pr-4">
        <div class="w-full h-full absolute backdrop-blur-md top-0 left-0 z-10"></div>
        <div class="backdrop-blur-[120px] rounded-[20px] w-[16.5rem] overflow-hidden min-h-[46.25rem] md:h-[calc(100vh-3rem)] bg-gradient-to-br from-[#060b26] to-[#1a1f37] bg-[linear-gradient(21.837897884493334deg, #060b26 0.00%, #1a1f37 100.00%)] px-1 py-4 md:p-4
          flex flex-col justify-start items-start gap-1 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] z-50 md:z-20  duration-300 min-w-[3.2rem] md:min-w-[4.5rem] fixed left-0 top-20 md:static"
            :class="expanedSidebar ? 'w-[16.5rem]' : 'w-[3.2rem] md:w-[4.5rem]'">
            <!-- logo  -->
            <div class="w-full h-auto justify-start items-center gap-3 relative hidden md:flex">
                <NuxtLink to="/" class=" bg-white rounded-md duration-300">
                    <NuxtImg src="/icons/logo-dark.webp" width="48" height="48" alt="logo"
                        class="w-[3rem] h-auto duration-300" />
                </NuxtLink>
                <h2 class="font-[500] font-shatoshi text-[18px] text-[#FFFFFF] overflow-hidden"
                    :class="!expanedSidebar ? '!w-0 absolute' : 'w-auto'">Movie <br />
                    Dashboard</h2>
            </div>
            <!-- sperate -->
            <div class="w-full h-[1px] bg-[#c8c8c8] my-4 hidden md:block"></div>
            <!-- home -->
            <h1 class=" text-[14px] lg:text-[1rem] text-white font-sans hidden md:block">Home</h1>

            <NavItem v-for="(item, index) in homeDashboard" :key="index" :icon-path="item.iconPath" :name="item.name"
                :is-expanded="expanedSidebar" :url="item.url" />
            <!-- user -->
            <h1 class="text-[12px] ml-1 lg:ml-0 lg:text-[1rem] text-white font-sans">Users</h1>
            <NavItem v-for="(item, index) in userDashboard" :key="index" :icon-path="item.iconPath" :name="item.name"
                :is-expanded="expanedSidebar" :url="item.url" />
            <!-- movie -->
            <h1 class="text-[12px] ml-1 lg:ml-0 lg:text-[1rem] text-white font-sans">Movie</h1>
            <NavItem v-for="(item, index) in movieDashboard" :key="index" :icon-path="item.iconPath" :name="item.name"
                :is-expanded="expanedSidebar" :url="item.url" />
            <!-- logout  + user setting -->
            <div class="w-full h-auto mt-auto flex justify-between items-center px-2 gap-3">
                <div class="w-10 h-10 rounded-full bg-white flex justify-center items-center overflow-hidden"
                    :class="!expanedSidebar ? '!w-0 absolute hidden' : 'w-10'">
                    <NuxtImg src="/images/avatar.webp" width="200" height="200"
                        class="w-9 h-9 rounded-full object-cover object-top overflow-hidden" />
                </div>
                <NuxtImg src="/icons/logout.svg" class="w-6 h-6" v-on:click="showModalChange" />
            </div>

        </div>
        <div class="h-full rounded-[20px] md:ml-4 flex flex-col justify-start items-start gap-4 flex-1">
            <!-- header -->
            <div class="w-full h-[3rem] flex justify-center items-center z-[51] ">
                <div
                    class="w-full h-[3rem] flex justify-between md:justify-end items-center fixed md:static md:pl-0 pl-[0.2rem] pr-4 md:px-0 z-[51] left-0">
                    <NuxtLink to="/" class=" bg-white rounded-md duration-300 md:hidden">
                        <NuxtImg src="/icons/logo-dark.webp" width="48" height="48" alt="logo"
                            class="size-3rem h-auto duration-300" />
                    </NuxtLink>
                    <div class="w-auto h-full bg-[#060b26] flex justify-center items-center px-4 rounded-lg gap-6">
                        <div class="w-6 h-6" v-on:click="setModalType('SETTINGS', 'Settings')">
                            <NuxtImg src="/icons/settings.svg"
                                class="w-6 h-6 rounded-full object-cover object-top overflow-hidden" />
                        </div>
                        <div class="w-6 h-6">
                            <NuxtImg src="/icons/bell.svg"
                                class="w-6 h-6 rounded-full object-cover object-top overflow-hidden" />
                        </div>
                    </div>

                </div>

            </div>
            <!-- content render herer -->
            <div class="w-full h-full rounded-lg pl-[3.2rem] md:pl-0">
                <slot />
            </div>
        </div>
        <!-- log out -->
        <Teleport to="#modal-render-entrypoint" v-if="isShow && modalType === 'BINARY'">
            <ModalContainer>
                <BinaryModal :cancelContent="'Cancel'" :approveContent="'Log Out'" :handerFunction="() => logout()" />
            </ModalContainer>
        </Teleport>
    </div>

</template>