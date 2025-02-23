<script setup lang="ts">
import { useModalStore } from '~/store/modal';


const { setModalType } = useModalStore()


</script>


<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="w-20 h-20 bg-green-200" @click="setModalType('REGISTER_TOTP')"></div>
    </div>
</template>