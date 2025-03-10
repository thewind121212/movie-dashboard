<script setup lang="ts">

import AppLayout from '~/layouts/App.layout.vue';
import UserSettingsLayout from '~/layouts/UserSettings.layout.vue';
import SecuritySetting from '~/components/core/auth/SecuritySetting.vue';


const { error, data, status, refresh } = await useAsyncData<any>('security-settings', async () => {


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
            avatarUrl: string,
            updatedAt: string,
            twoFaStatus: 'DISABLED' | 'ENABLED',
        }
    } = await getUserData.json()


    const isHave2Fa = userData.data.twoFaStatus === 'ENABLED' ? 'enabled' : 'disabled'

    return {
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

            <SecuritySetting :is2FaEnabled="data.userData !== undefined ? data.userData.data.twoFaStatus.toLowerCase() : 'fetching' " 
            v-if="status === 'success' && data.userData !== undefined" 
            />
        </UserSettingsLayout>
    </AppLayout>
</template>