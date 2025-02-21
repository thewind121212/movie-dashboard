
<script setup lang="ts">


defineProps<{
    heading: string;
    content: string;
    animationConfig: {
        url: string,
        heigh: number,
        width: number,
    }
}>()

</script>


<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center">
        <div class="login-header text-center flex flex-col gap-[0.75rem] items-center">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">{{ heading }}</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center">
                {{  content }}
            </p>
        </div>
        <div class="w-[120px] h-[120px] flex justify-center items-center relative -mt-4">
            <client-only>
                <Vue3Lottie :animationLink="animationConfig.url" :height="animationConfig.heigh" :width="animationConfig.width" class="absolute"
                    :loop="false" />
            </client-only>
        </div>

    </div>
</template>