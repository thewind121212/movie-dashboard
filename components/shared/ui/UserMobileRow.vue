<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue';

const props = defineProps<{
    user: any
}>()

const showInfo = ref<boolean>(false)

</script>


<template>

    <tr>
        <th scope="row">
            <div class="w-full h-auto flex flex-col justify-start items-center gap-4 mb-4 select-none">
                <div class="w-full h-auto flex justify-between items-center gap-4 font-light">
                    <h1>{{ user.email }}</h1>
                    <div class="!size-7 rounded-md bg-[#121212] flex justify-center items-center duration-300"
                    :class="showInfo ? '!bg-red-400  ' : ''"
                        v-on:click="showInfo = !showInfo">
                        <NuxtImg src="/icons/arrowDown.svg" width="16" height="16"  class="duration-300"
                        :class="showInfo ? 'transform rotate-180' : ''" 
                        />
                    </div>
                </div>
                <div class="w-full max-h-[240px] overflow-hidden relative duration-300"
                    :class="showInfo ? 'h-[240px] md:h-[176px] max-h-[240px]' : 'max-h-0 h-0'">
                    <div
                        class="w-full bg-[#242424] rounded-lg flex flex-col justify-start items-start duration-300 p-2 absolute top-0 left-0 md:flex-row md:items-center">
                        <div
                            class="size-14 md:size-20 rounded-full bg-white flex justify-center items-center aspect-square mx-auto mb-1 relative">
                            <div
                                class="absolute w-full h-full rounded-full z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                                <LoadingSpinner />
                            </div>
                            <NuxtImg :src="user.avatarUrl ? `${$config.public.beServerUrl}/s3/avatar/${user.id}` : '/images/no-avatar.png'" loading="lazy" width="200" height="200"
                                id="user-avatar"
                                class="size-13 md:size-[4.5rem] rounded-full object-covert object-top overflow-hidden aspect-square relative z-20" />
                        </div>

                        <div class="">
                            <div class="flex justify-start items-center gap-1" v-for="(item, index) in user"
                                :key="index + 'admin-user'">
                                <p class="text-gray-300 text-sm font-light"> <strong class="text-white font-bold">{{ index }}: </strong>{{ item ? item : 'Not Fill' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </th>
    </tr>


</template>