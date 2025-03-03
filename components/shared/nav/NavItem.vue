<script setup lang="ts">

import { defineProps } from 'vue'


const homeDashboard = defineProps<{
    name: string
    iconPath: string
    isExpanded: boolean
    url: string
}>()

</script>


<template>

    <div class="shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] rounded-[15px] w-[14.5rem] h-[3.375rem] duration-200"
        :class="isExpanded ? 'hover:bg-[#1a1f37] group cursor-pointer' : 'cursor-default'">
        <div class="w-full h-full flex justify-start items-center gap-3"
            :class="isExpanded ? 'px-3 cursor-pointer' : '!px-1 cursor-default'">
            <NuxtLink :to="url"
                class="h-9 w-9 flex justify-center items-center bg-[#1A1F37] rounded-[10px] duration-200"
                :class="isExpanded ? 'group-hover:bg-[#0075FF] ' : 'hover:bg-[#0075ff]'">
                <NuxtImg :src="iconPath" class="w-5 h-5" />
            </NuxtLink>
            <p class="text-[#FFFFFF] text-[1rem] font-sans" :class="isExpanded ? 'opacity-100' : 'opacity-0'">{{ name }}
            </p>
        </div>
    </div>

</template>