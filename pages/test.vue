<script setup lang="ts">
import { ModalsAuthTwoFaEnableTOTP } from '#components';



</script>


<template>
    <div class="w-screen h-screen flex justify-center items-center" id="app">
        <ClientOnly>
            <Teleport to="#app">
                <Suspense>
                    <template #fallback>
                        <LoadingTwoFaEnableTOTPLoading />
                    </template>
                    <template #default>
                        <ModalsAuthTwoFaEnableTOTP />
                    </template>
                </Suspense>
            </Teleport>
        </ClientOnly>
    </div>
</template>