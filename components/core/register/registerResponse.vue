<script setup lang="ts">

defineProps({
    status: String as PropType<'SUCCESSED' | 'FAILED' | 'INTERNAL_ERROR'>,
    message: String
})

</script>

<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center">
        <div class="login-header text-center flex flex-col gap-[0.75rem] items-center">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Account Create Error</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center">
                this is error
            </p>
        </div>
        <div class="w-[120px] h-[120px] flex justify-center items-center relative -mt-4">
            <client-only>
                <!-- <Vue3Lottie animationLink="/animations/InternalError.json" :height="120" :width="120" class="absolute" /> -->
                <!-- <Vue3Lottie animationLink="/animations/successed.json" :height="90" :width="90" class="absolute" :loop="false" /> -->
                <Vue3Lottie animationLink="/animations/fail.json" :height="90" :width="90" class="absolute" :loop="true" />
            </client-only>
        </div>

    </div>
</template>