<script setup lang="ts">
import LoginWrap from '~/components/core/login/loginWrap.vue';
const message = 'Hello, World!'
</script>

<template>
    <NuxtLayout name="auth">
        <LoginWrap />
    </NuxtLayout>
</template>