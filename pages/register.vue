<script setup lang="ts">
definePageMeta({
  middleware: [
    'verify-register-link',
  ],
});


import RegisterWrap from '~/components/core/auth/register/RegisterContainer.vue';




</script>

<template>
    <NuxtLayout name="auth-layout" :currentAuthPath="'register'">
        <RegisterWrap />
    </NuxtLayout>
</template>