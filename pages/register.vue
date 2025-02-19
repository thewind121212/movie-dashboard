<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
  ],
});


import RegisterWrap from '~/components/core/register/RegisterContainer.vue';




</script>

<template>
    <NuxtLayout name="auth-layout">
        <RegisterWrap />
    </NuxtLayout>
</template>