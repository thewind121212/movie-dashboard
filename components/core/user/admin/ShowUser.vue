<script setup lang="ts">
import type { GetAllUserResponse } from '~/server/api/user/getAll';
import UserMobileRow from '~/components/shared/ui/UserMobileRow.vue';
import { useSearch } from '#imports';
import UserCol from '~/components/shared/ui/UserCol.vue';
import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';


const props = defineProps<{
    usersRes: GetAllUserResponse
}>()



const users = computed(() => {
    return [...props.usersRes.data.users, ...props.usersRes.data.users]
})


const { searchValue, toggleSearch, isSearchVisible, closeSearch } = useSearch()




</script>





<template>
    <div
        class="relative w-full lg:w-[calc(100vw-7.5rem)] h-full flex flex-col gap-2 md:gap-4 justify-center items-center z-50">
        <!-- desktop -->
        <div
            class="Header w-full h-auto justify-between items-center bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] p-4 px-6 rounded-lg hidden lg:flex">
            <div class="flex-1 h-8 relative min-w-8 select-none" id="admin-user-search"
                :class="isSearchVisible ? 'min-w-8' : 'min-w-[17rem]'">
                <div class="top-0 left-0 size-8 absolute bg-white rounded-md flex justify-center items-center"
                    @click="() => toggleSearch('admin-user-search')">
                    <NuxtImg src="/icons/search.svg" width="22" height="22" />
                </div>

                <input type="text"
                    class="w-[17rem] h-8 rounded-md bg-white text-[#121212] py-2 max-w-[17rem] pl-8 duration-300 outline-none border-none ease-out"
                    v-model="searchValue" :class="isSearchVisible ? 'w-1/2' : '!w-0'" placeholder="Search" />
                <Teleport to="#modal-render-entrypoint" v-if="isSearchVisible">
                    <ModalContainer :handler-close-modal="closeSearch" class="lg:hidden">
                        <div class="w-full h-auto flex justify-center items-center gap-2 z-20">
                            <input type="text"
                                class="w-[80%] h-12 rounded-md bg-white text-[#121212] p-2 duration-300 outline-none border-none ease-out max-w-[25.9375rem]"
                                v-model="searchValue" />
                        </div>
                    </ModalContainer>
                </Teleport>
            </div>
            <div class="controller flex justify-start items-center gap-2">
                <div class="size-8 bg-white rounded-lg flex justify-center items-center">
                    <NuxtImg src="/icons/filter.svg" width="22" height="22" />
                </div>
                <div class="size-8 bg-[#2574ff] rounded-lg flex justify-center items-center text-white font-noto">
                    <NuxtImg src="/icons/add.svg" width="24" height="24" />
                </div>
                <h1 class="text-[#121212] h-8 px-2 flex justify-end items-center bg-white rounded-md">Total: {{
                    usersRes.data.total }}</h1>
            </div>
        </div>
        <!-- mobile -->
        <div
            class="Header w-full h-auto flex justify-between items-center bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] p-4 px-6 rounded-lg lg:hidden">

            <div class="controller flex justify-start items-center gap-2">
                <h1 class="text-[#121212] h-8 px-2 flex justify-end items-center bg-white rounded-md">Total: {{
                    usersRes.data.total }}</h1>
                <div class="size-8 bg-white rounded-lg flex justify-center items-center">
                    <NuxtImg src="/icons/filter.svg" width="22" height="22" />
                </div>
                <div class="size-8 bg-white rounded-lg flex justify-center items-center" @click="() => toggleSearch()">
                    <NuxtImg src="/icons/search.svg" width="22" height="22" />
                </div>
            </div>
            <div class="size-8 bg-[#2574ff] rounded-lg flex justify-center items-center text-white font-noto">
                <NuxtImg src="/icons/add.svg" width="24" height="24" />
            </div>
        </div>
        <div class="w-full text-white bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] rounded-lg p-6 lg:py-4">
            <table class="w-full table-auto lg:border-separate lg:border-spacing-2 relative">
                <thead>
                    <UserCol :cols="['Avatar', 'Email', 'Name', 'Created At', 'Updated At', 'Time Zone', 'Country']"
                        class="hidden lg:table-row" />
                </thead>
                <tbody class="mt-4">
                    <!-- this is content -->
                    <!-- <UserMobileRow v-for="user in users" :key="user.id" :user="user" class="lg:hidden"/> -->
                    <tr v-for="user in users" :key="user.id" class="hidden lg:table-row py-4">
                        <td>
                            <NuxtImg
                                :src="user.avatarUrl ? `${$config.public.beServerUrl}/s3/avatar/${user.id}` : '/images/no-avatar.png'"
                                loading="lazy" width="200" height="200" id="user-avatar"
                                class="size-8 rounded-full object-covert object-top overflow-hidden aspect-square relative z-20" />
                        </td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.createdAt.split('T')[0] }}</td>
                        <td>{{ user.updatedAt.split('T')[0] }}</td>
                        <td>{{ user.timeZone || 'Not Fill' }}</td>
                        <td>{{ user.country || 'Not Fill' }}</td>
                    </tr>
                    <!-- this end of block item -->
                </tbody>
            </table> 


        </div>
    </div>
</template>