<script setup lang="ts">

const props = defineProps<
    {
        cols: string[]
    }
>()
</script>


<template>
    <tr>
        <th scope="col" class="text-left" v-for="(item, index) in cols" :key="index + 'user-col'">{{ item }}</th>
    </tr>
</template>
