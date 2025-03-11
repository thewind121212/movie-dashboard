<script setup lang="ts">
import copy from 'copy-to-clipboard'


const props = defineProps<{
    item: string
    iscopiedAll: boolean
}>()

const copied = ref<boolean>(false)
const timer = ref<ReturnType<typeof setTimeout> | null>(null)

const copyHander = (item: string) => {
    if (item === 'XXXXXXXX') {
        return
    }
    if (timer.value) {
        clearTimeout(timer.value)
    }
    copy(item)
    copied.value = true
    timer.value = setTimeout(() => {
        copied.value = false
    }, 210)
}

</script>




<template>
    <div class="flex justify-center">
        <div @click="copied ? null : copyHander(item)"
            :class="copied || props.iscopiedAll ? '!bg-black text-white' : 'bg-gray-50'"
            class="bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-center text-[0.875rem] font-medium text-blue-400 transition duration-300 font-mono cursor-pointer hover:bg-gray-200">
            {{ item }}
        </div>
    </div>
</template>