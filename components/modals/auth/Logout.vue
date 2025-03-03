<script setup lang="ts">

import { useModalStore } from '~/store/modal';
import { logout } from '~/actions/auth.action';

const { hideModal } = useModalStore();

const handleLogout = async () => {
    await logout();
    hideModal();
}

</script>


<template>
    <div class="submit-action w-full flex gap-[0.75rem]">
        <div class="bg-[#DDDDDD] w-full rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] leading-[1.25rem] text-center cursor-pointer"
            @click="hideModal()">
            Reject</div>
        <button
            class="bg-[#060b26] w-full  rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]"
            @click="handleLogout()">Log
            Out</button>
    </div>

</template>