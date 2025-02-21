
<script setup lang="ts">
import ForgotPasswordContainer from '~/components/core/auth/forgot-password/ForgotPasswordContainer.vue';

const message = 'Hello, World!'



</script>

<template>
    <NuxtLayout name="auth-layout" :currentAuthPath="'forgotPassword'">
        <ForgotPasswordContainer/>
    </NuxtLayout>
</template>