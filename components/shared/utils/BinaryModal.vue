<script setup lang="ts">
import { useModalStore } from '~/store/modal';

const { header, content, hideModal } = useModalStore();



</script>


<template>
    <div
        class="shadow-[20px_20px_20px_0px_rgba(0,0,0,0.08)] rounded-2xl border border-black p-8 flex flex-col gap-10 justify-center items-center self-stretch relative w-[440px] bg-white h-auto m-auto z-20">
        <h1 class="font-shatoshi text-center text-[1.25rem] font-semibold">
            {{ header }}
        </h1>
        <slot />
    </div>
</template>