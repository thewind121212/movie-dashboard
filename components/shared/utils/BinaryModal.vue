<script setup lang="ts">
import { useModalStore } from '~/store/modal';

const { header, content, hideModal } = useModalStore();

const props = defineProps<{
    cancelContent: string,
    approveContent: string,
    handerFunction: () => void
}>()



const handerConfirm = () => {
    props.handerFunction()
    hideModal()
}


</script>


<template>
    <div
        class="shadow-[20px_20px_20px_0px_rgba(0,0,0,0.08)] rounded-2xl border border-black p-8 flex flex-col gap-10 justify-center items-center self-stretch relative w-[440px] bg-white h-auto m-auto z-20">
        <h1 class="font-shatoshi text-center text-[1.25rem] font-semibold">
            {{ header }}
        </h1>

        
        <p class="text-[#3D3D3D] text-[0.875rem] leading-[1.25rem] text-center" v-if="content">
            {{ content }}
        </p>

    <div class="submit-action w-full flex gap-[0.75rem]">
        <div class="bg-[#DDDDDD] w-full rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] leading-[1.25rem] text-center cursor-pointer"
            @click="hideModal()">
            {{ cancelContent }}
        </div>
        <button
            class="bg-[#060b26] w-full  rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]"
            @click="handerConfirm()">
            {{ approveContent }}
        </button>
    </div>
    </div>
</template>