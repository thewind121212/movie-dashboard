<script setup lang="ts">

import AppLayout from '~/layouts/App.layout.vue';
import UserSettingsLayout from '~/layouts/UserSettings.layout.vue';
import ProfileSetting from '~/components/core/auth/ProfileSetting.vue';

const fetchUser = async () => {
    const data = await $fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=7GIMV3FRPN65&format=json');
    console.log(data)
}

fetchUser()

</script>


<template>
    <AppLayout>
        <UserSettingsLayout>
            <ProfileSetting />
        </UserSettingsLayout>

    </AppLayout>
</template>