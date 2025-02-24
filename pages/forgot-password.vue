
<script setup lang="ts">
import ForgotPasswordContainer from '~/components/core/auth/forgot-password/ForgotPasswordContainer.vue';


</script>

<template>
    <NuxtLayout name="auth-layout" :currentAuthPath="'forgotPassword'">
        <ForgotPasswordContainer/>
    </NuxtLayout>
</template>