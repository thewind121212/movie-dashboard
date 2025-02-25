<script setup lang="ts">
import { useModalStore } from '~/store/modal';
import { handerAuthorizeDetect } from '~/actions/auth.action';


const { setModalType } = useModalStore()


onMounted(async () => {
    setTimeout(async () => {

        try {
            const linh = await $fetch('/api/test/test', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            console.log('ok', linh)

        } catch (error: any) {
            handerAuthorizeDetect(error)
        }
    }, 1000)
})

</script>


<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="w-20 h-20 bg-green-200" @click="setModalType('REGISTER_TOTP')"></div>
    </div>
</template>