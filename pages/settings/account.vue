<script setup lang="ts">

import AppLayout from '~/layouts/App.layout.vue';
import UserSettingsLayout from '~/layouts/UserSettings.layout.vue';
import ProfileSetting from '~/components/core/auth/ProfileSetting.vue';

const nuxtApp = useNuxtApp();


const { error, data, status } = await useAsyncData<any>('profile-settings', async () => {
    const data: {
        countries: any[],
        timezones: any,
    } = await $fetch('/api/vendor/geo')

    return {
        countries: data.countries,
        tz: data.timezones.zones,
        fetchedAt: Date.now()
    }
}, {
    lazy: true,
    server: false,
    getCachedData: (key) => {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (!data) {
            return
        }

        const fetchedDate = new Date(data.fetchedAt);

        const expiryDate = fetchedDate.setTime(fetchedDate.getTime() + 1000 * 60 * 10);
        if (Date.now() > expiryDate) {
            return
        }
        return data
    }
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
                <ProfileSetting :countries="data.countries" :timezones="data.tz" v-if="status === 'success'" />
            </ClientOnly>
        </UserSettingsLayout>

    </AppLayout>
</template>