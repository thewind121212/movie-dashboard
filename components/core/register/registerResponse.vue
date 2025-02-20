<script setup lang="ts">
import { userRegisterTokenError } from '#imports';


defineProps({
    status: String as PropType<'SUCCESSED' | 'FAILED' | 'INTERNAL_ERROR'>,
    message: String
})


const { validState } = userRegisterTokenError()

</script>

<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center">
        <div class="login-header text-center flex flex-col gap-[0.75rem] items-center">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">{{ validState.error ? 'Account Create Error' : 'Account Create Success' }}</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center">
                {{ validState.message === 'Register request is valid' ? 
                'Your account have been create successfully wellcome aboard!' : validState.message }}
            </p>
        </div>
        <div class="w-[120px] h-[120px] flex justify-center items-center relative -mt-4">
            <client-only>
                <Vue3Lottie animationLink="/animations/successed.json" :height="90" :width="90" class="absolute" :loop="false" v-if="!validState.error" />
                <Vue3Lottie animationLink="/animations/fail.json" :height="90" :width="90" class="absolute" :loop="true" v-if="validState.error" />
            </client-only>
        </div>

    </div>
</template>