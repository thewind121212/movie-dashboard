<script setup lang="ts">

</script>


<template>
    <section class="w-screen h-screen flex justify-start items-start p-[12px]">
        <div class="rounded-[20px] overflow-hidden h-full min-w-[43.75rem] w-1/2 relative">
            <NuxtImg src="/images/login-image.jpg" alt="login" class="w-full h-full object-cover" />
            <div class="absolute w-full h-full bg-[#000] left-0 top-0 opacity-[0.35] z-10"></div>
            <div class="w-full h-full z-20 absolute top-0 left-0 flex flex-col">
                <div
                    class="w-full h-[1.5rem] flex justify-start items-center space-y-4 pl-[3rem] pt-[3rem] gap-[0.5rem]">
                    <h1 class="text-[#ffffff] font-shatoshi font-[500] text-[1rem] opacity-80 uppercase">MOVIE UPLOAD
                        DASHBOARD
                    </h1>
                    <div class="bg-[#ffffff] h-[0.0625rem] w-1/5 opacity-80"></div>
                </div>
                <div class="pl-[3rem] pb-[3rem] mt-auto flex flex-col gap-[1rem]">
                    <div class="font-noto text-white text-[4.5rem] leading-[4.5rem] font-[400]">
                        <h1 class="w-full h-auto">Upload</h1>
                        <h1 class="w-full h-auto">Every Movie</h1>
                        <h1 class="w-full h-auto">Your Want</h1>
                    </div>
                    <div class="w-3/5">
                        <p class="font-shatoshi text-[#ffffff] opacity-[0.88] text-[1rem] leading-[1.625rem]">As we
                            continue to grow, our movie upload process needs to be robust and efficient. Our movie
                            uploader offers the scalability we need to handle future expansion.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-full w-1/2">
            <slot />
        </div>
    </section>

</template>