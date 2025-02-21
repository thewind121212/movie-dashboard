<script setup lang="ts">
import ResetPasswordContainer from '~/components/core/auth/reset-password/ResetPasswordContainer.vue';

</script>

<template>
    <NuxtLayout name="auth-layout" :currentAuthPath="'resetPassword'">
        <ResetPasswordContainer />
    </NuxtLayout>
</template>