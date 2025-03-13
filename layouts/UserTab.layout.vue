<script setup lang="ts">

const props = defineProps<{
    currentTab: 'Admin User' | 'Edit Admin User' | 'Show Client' | 'Edit Client User' | 'Request Admin' | 'Mailer User'
}>()

</script>

<template>
    <div class="w-full h-full relative rounded-lg overflow-hidden flex flex-col justify-start items-start gap-2 md:gap-4">
        <div class="absolute opacity-80 bg-[#121212] rounded-lg z-10"></div>
        <div
            class="h-[3.75rem] w-full bg-gradient-to-r from-[#060b28f1] to-[#0a0e2393] relative z-20 rounded-lg px-6 flex justify-start items-center">
            <p class="text-white font-bold">{{ props.currentTab ? props.currentTab : '' }}</p>
        </div>
        <div class="w-full lg:w-auto flex-1 h-full rounded-lg z-20">
            <slot />
        </div>
    </div>

</template>