<script setup lang="ts">
import type { GetAllUserResponse } from '~/server/api/user/getAll';
import UserMobileRow from '~/components/shared/ui/UserMobileRow.vue';
import { useSearch } from '#imports';
import UserCol from '~/components/shared/ui/UserCol.vue';
import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';
import { type Theme } from 'ag-grid-community';
import AvatarRowAgrid from '~/components/shared/ui/argird/AvatarRowAgrid.vue';
import { myTheme } from '~/components/shared/ui/argird/config';
import { AgGridVue } from "ag-grid-vue3";


const props = defineProps<{
    usersRes: GetAllUserResponse
}>()

const theme = ref<Theme | "legacy">(myTheme);



const users = computed(() => {
    return props.usersRes.data.users
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



        <div class="w-full text-white bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] rounded-lg p-6 lg:p-0">

            <table class="w-full table-auto lg:border-separate lg:border-spacing-2 relative lg:hidden">
                <thead>
                    <UserCol :cols="['Admin User']" class="lg:hidden" />
                </thead>
                <tbody class="mt-4">
                    <tr class="block mt-4"></tr>
                    <UserMobileRow v-for="user in users" :key="user.id" :user="user" class="lg:hidden" />
                </tbody>
            </table>


            <ag-grid-vue :rowData="users" :columnDefs="[
                {
                    headerName: 'Avatar',
                    field: 'id',
                    cellRenderer: AvatarRowAgrid,
                    minWidth: 50,
                    width: 100,
                },
                {
                    field: 'email',
                    cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
                },
                {
                    field: 'name',
                    cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
                },
                {
                    field: 'timeZone',
                    cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
                },
                {
                    field: 'country',
                    cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
                },
                {
                    field: 'createdAt',
                    cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
                },
                {
                    field: 'updatedAt',
                    cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' },
                },
            ]" style="height: calc(100vh - 15.75rem)" :row-height="54" class="hidden lg:block"
                :row-style="{ 'color': 'white' }" :theme="theme">
            </ag-grid-vue>
        </div>
    </div>
</template>

<style lang="css" scoped>
.ag-cell {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
</style>