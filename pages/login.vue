<script setup lang="ts">
import LoginWrap from '~/components/core/auth/login/LoginContainer.vue';
import { useModalStore } from '~/store/modal';


const { hideModal, isShow } = useModalStore();




onMounted(() => {
    if (isShow) {
        hideModal()
    }
})

</script>

<template>
    <NuxtLayout name="auth-layout" :currentAuthPath="'login'">
        <LoginWrap />
    </NuxtLayout>
</template>
