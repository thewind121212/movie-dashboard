<script setup lang="ts">
import LoginWrap from '~/components/core/auth/login/LoginContainer.vue';



</script>

<template>
    <NuxtLayout name="auth-layout" :currentAuthPath="'login'">
        <LoginWrap />
    </NuxtLayout>
</template>