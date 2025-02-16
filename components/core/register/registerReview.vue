<script setup lang="ts">

</script>


<template>
    <div class="w-full h-auto flex flex-col gap-[2rem] items-center">
        <div class="login-header text-center flex flex-col gap-[0.75rem] items-center">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Email Submitted</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi w-[70%] text-center">
                Your email has been duly noted. We appreciate your submission and will respond via email as soon as
                possible.
            </p>
        </div>
        <div class="w-[120px] h-[120px] flex justify-center items-center relative -mt-4">
            <client-only>
                <Vue3Lottie animationLink="/animations/waiting.json" :height="200" :width="200" class="absolute" />
            </client-only>
        </div>

    </div>
</template>