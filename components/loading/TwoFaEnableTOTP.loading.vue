<script lang="ts">


</script>


<template>

    <div class="w-[20%] h-auto aspect-square shadow-md flex justify-end items-center flex-col gap-4 relative p-6 rounded-full bg-white">
        <client-only>
            <Vue3Lottie animationLink="/animations/security.json" :loop="true" class="!w-[60%] h-auto absolute" />
        </client-only>
        <div class="w-auto h-auto left-0 flex justify-center items-center z-10">
            <NuxtImg src="/icons/loading.svg" alt="logo" class="w-[3rem] h-auto" />
        </div>
    </div>


</template>