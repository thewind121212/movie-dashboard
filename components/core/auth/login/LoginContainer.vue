<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import OTPFill from '../2fa/OTPFill.vue';
const router = useRouter()

</script>


<template>
    <div class="w-full h-full flex flex-col justify-between items-center py-6">
        <div class="w-full h-auto flex justify-center items-center">
            <NuxtLink to="/">
                <NuxtImg src="/icons/logo-dark.webp" width="48" height="48" alt="logo" class="w-[3rem] h-auto" />
            </NuxtLink>
            <h2 class="font-[400] font-shatoshi text-[1.375rem] leading-[1.5rem] text-[#121212]">Wliafdew</h2>
        </div>
        <LoginForm />
        <!-- <OTPFill /> -->
        <div class="footer-auth">
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi cursor-default">Don’t have an account?
                <span class="font-medium cursor-pointer" v-on:click="() => router.push('/register')">Sign Up</span>
            </p>
        </div>
    </div>

</template>