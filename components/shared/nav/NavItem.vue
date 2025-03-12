<script setup lang="ts">

import { defineProps } from 'vue'


const homeDashboard = defineProps<{
    name: string
    iconPath: string
    isExpanded: boolean
    url: string
    active?: boolean
    caution?: boolean
    mobileWidthManual?: boolean
}>()

const navigateLink = () => {
    if (!homeDashboard.isExpanded) return

    navigateTo(homeDashboard.url)
}


const classToogle = !homeDashboard.caution ? ([homeDashboard.isExpanded ? 'group-hover:bg-[#0075FF]' : 'hover:bg-[#0075ff]', homeDashboard.active ? '!bg-[#0075ff]' : '']) : ([homeDashboard.isExpanded ? 'group-hover:bg-[#FF6467]' : 'hover:bg-[#FF6467]', homeDashboard.active ? '!bg-[#FF6467]' : ''])

</script>


<template>

    <NuxtLink :to="isExpanded ? url : url"
        class="shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] rounded-[15px] w-[14.5rem] h-[3.375rem] duration-200 flex justify-start items-center"
        :class="[isExpanded ? 'hover:bg-[#1a1f37] group cursor-pointer pl-2' : 'cursor-default', active ? 'bg-[#1a1f37]' : '', mobileWidthManual ? '' : 'max-[443px]:!w-auto']">
        <div class="w-full h-auto flex justify-start items-center gap-3"
            :class="isExpanded ? 'px-1 cursor-pointer' : '!px-1 cursor-default'">
            <div @click="navigateLink"
                class="h-9 w-9 flex justify-center items-center bg-[#1A1F37] rounded-[10px] duration-200 min-w-9"
                :class="classToogle">
                <NuxtImg :src="iconPath" class="w-5 h-5" />
            </div>
            <p class="text-[#FFFFFF] text-[1rem] font-sans" :class="isExpanded ? 'opacity-100' : 'opacity-0'">{{ name }}
            </p>
        </div>
    </NuxtLink>

</template>