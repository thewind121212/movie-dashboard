<script setup lang="ts">

const props = defineProps<{
  params: any
}>()

console.log(props.params)

</script>

<template>
  <NuxtImg :src="params.data.avatarUrl ? `${$config.public.beServerUrl}/s3/avatar/${params.data.id}` : '/images/no-avatar.png'"
    loading="lazy" width="200" height="200" id="user-avatar"
    class="size-12 rounded-full object-covert object-top overflow-hidden aspect-square relative z-20" />
</template>