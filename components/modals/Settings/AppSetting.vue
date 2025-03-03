<script setup lang="ts">
import NavItem from '~/components/shared/nav/NavItem.vue';

</script>



<template>
    <ClientOnly>
        <div class="w-full h-auto flex flex-col justify-start items-start gap-1">
            <NavItem icon-path="/icons/userSetting.svg" :name="'Account'" :url="'/settings/account'"
                :is-expanded="true" />
            <NavItem icon-path="/icons/language.svg" :name="'Language'" :url="'/settings/language'"
                :is-expanded="true" />
        </div>
    </ClientOnly>

</template>