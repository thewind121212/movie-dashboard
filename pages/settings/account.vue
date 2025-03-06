<script setup lang="ts">

import AppLayout from '~/layouts/App.layout.vue';
import UserSettingsLayout from '~/layouts/UserSettings.layout.vue';
import ProfileSetting from '~/components/core/auth/ProfileSetting.vue';
import { useAuthState } from '#imports';

const nuxtApp = useNuxtApp();


const { error, data, status } = await useAsyncData<any>('profile-settings', async () => {
    const data: {
        countries: any[],
        timezones: any,
    } = await $fetch('/api/vendor/geo')


    const getUserData = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: useAuthState().userAuthState.value.userId
        }) 
    })

    if (getUserData.status === 401) {
        navigateTo('/login')
        return
    }
    if (!getUserData.ok) {
        throw new Error('Failed to fetch user data')
    }
    const userData: {
        message: string,
        data: {
            id: string,
            name: string,
            email: string,
            birthdate: string | null,
            country: string | null,
            timezone: string | null,
            bio: string | null,
            gender: string | null,
            createdAt: string,
            updatedAt: string,
        }
    } = await getUserData.json()

    return {
        countries: data.countries,
        tz: data.timezones.zones,
        userData: userData,
        fetchedAt: Date.now()
    }
}, {
    lazy: true,
    server: false,
});






</script>


<template>
    <AppLayout>
        <UserSettingsLayout>
            <div class="w-full h-full flex justify-center items-center relative" v-if="status === 'error' || error">
                <p class="text-white text-[1rem] font-sans">
                    Something went wrong
                </p>

            </div>
            <ClientOnly>
                <div class="w-full h-full flex justify-center items-center relative" v-if="status === 'pending'">
                    <div
                        class="w-full h-full bg-[#121212] opacity-60 rounded-[1.25rem] absolute top-0 left-0 z-20 flex justify-center items-center">
                        <NuxtImg src="/icons/loading.svg" alt="logo" class="w-[3rem] h-auto" />
                    </div>
                </div>
                <ProfileSetting :countries="data.countries" :timezones="data.tz" v-if="status === 'success'"
                    :user-data="data.userData.data" />
            </ClientOnly>
        </UserSettingsLayout>

    </AppLayout>
</template>