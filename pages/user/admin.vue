<script setup lang="tsx">
import AppLayout from '~/layouts/App.layout.vue'
import ShowUser from '~/components/core/user/admin/ShowUser.vue';
import UserTabLayout from '~/layouts/UserTab.layout.vue';
import { getAllUser } from '../../actions/user.action'
import type { GetAllUserResponse } from '~/server/api/user/getAll';


const { data, error, status, refresh } = useAsyncData<GetAllUserResponse | null>('allUser', async () => {
        const res = await getAllUser();
        return res
},
        {
                lazy: true,
                server: false,
        }
);





</script>


<template>
        <AppLayout>
                <UserTabLayout currentTab="Admin User">
                        <div class="w-full h-[28.125rem] flex justify-center items-center"
                                v-if="(status === 'pending' || status === 'idle')">
                                <NuxtImg src="/icons/loading.svg" alt="logo" class="w-[3rem] h-auto" />
                        </div>
                        <div class="w-full h-[28.125rem] flex justify-center items-center"
                                v-if="(status === 'error' || error)">
                                <p class="text-white
                                text-[1rem] font-sans">
                                        Something went wrong
                                </p>
                        </div>
                        <div class="w-full h-full" v-if="status === 'success' && data">
                                <ShowUser :usersRes="data" />
                        </div>
                </UserTabLayout>
        </AppLayout>


</template>