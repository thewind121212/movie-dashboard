<script setup lang="ts">
import { ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate';

defineProps({
    htmlFor: String,
    fieldName: String,
    type: String,
    label: String,
    placeholder: String,
    fieldType: String as PropType<'text' | 'password' | 'email' | 'number' | 'tel' | 'url'>,
    isDark: Boolean,
    blockError: Boolean
})




const showPassword = ref(false);
</script>


<template>

    <div class="w-full h-auto flex flex-col gap-2">
        <label :for="htmlFor" class="text-[1rem] leading-[1.5rem]" :class="isDark ? 'text-white' : 'text-[#121212]'">{{
            label }} </label>
        <Field :name="fieldName!" v-slot="{ field }">
            <div class="w-full h-auto relative">
                <input :type="showPassword ? 'text' : 'password'" v-bind="field" autocomplete="on"
                    class="bg-[#F5F7FA] w-full aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                    :class="isDark ? 'dark:bg-[#2f2f2f]' : 'bg-[#F5F7FA]'" placeholder="Enter Your Password" />
                <div @click="showPassword = !showPassword" type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2">
                    <NuxtImg src="/icons/eye.svg" width="24" height="24" alt="eye-icon" v-if="!showPassword" />
                    <NuxtImg src="/icons/eye-slash.svg" width="24" height="24" alt="eye-icon" v-else />
                </div>
            </div>
        </Field>

        <div class="w-full h-2 relative flex justify-start items-center" v-if="blockError">
            <ErrorMessage :name="fieldName!" class="text-red-400 text-[0.75rem] leading-[0.75rem] absolute left-0" />
        </div>
        <ErrorMessage :name="fieldName!" class="text-red-400 text-[0.75rem] leading-[0.75rem]" v-else />
    </div>

</template>