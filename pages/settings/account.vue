<script setup lang="ts">

import AppLayout from '~/layouts/App.layout.vue';
import UserSettingsLayout from '~/layouts/UserSettings.layout.vue';
import ProfileSetting from '~/components/core/auth/ProfileSetting.vue';

const nuxtApp = useNuxtApp();

const { error, data, status } = await useAsyncData<any>('profile-settings', async () => {
    const [tz, country] = await Promise.all([
        $fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=7GIMV3FRPN65&format=json',),
        $fetch('https://restcountries.com/v3.1/all')
    ]);
    return {
        tz,
        country,
        fetchedAt: Date.now()
    }
}, {
    lazy: true,
    server: true,
    getCachedData: () => {
        const data = nuxtApp.payload.data['profile-settings'] || nuxtApp.static.data['profile-settings'];
        if (!data) {
            return
        }

        const fetchedDate = new Date(data.fetchedAt);

        const expiryDate = fetchedDate.setTime(fetchedDate.getTime() + 1000 * 60 * 60 * 24);
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

            <div class="w-full h-full flex justify-center items-center relative" v-if="status !== 'success'">
                <div
                    class="w-full h-full bg-[#121212] opacity-60 rounded-[1.25rem] absolute top-0 left-0 z-20 flex justify-center items-center">
                    <NuxtImg src="/icons/loading.svg" alt="logo" class="w-[3rem] h-auto" />
                </div>
            </div>
            <KeepAlive>
                <ProfileSetting :countries="data.country" :timezones="data.tz.zones" v-if="status === 'success'" />
            </KeepAlive>
        </UserSettingsLayout>
    </AppLayout>
</template>