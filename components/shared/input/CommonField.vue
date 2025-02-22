<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import type { PropType } from 'vue';


defineProps({
    htmlFor: String,
    fieldName: String,
    type: String,
    label: String,
    placeholder: String,
    fieldType: String as PropType<'text' | 'password' | 'email' | 'number' | 'tel' | 'url'>,
})

</script>


<template>
    <div class="w-full h-auto flex flex-col gap-2">
        <label :for="htmlFor" class="text-[#121212] text-[1rem] leading-[1.5rem]">{{ label }}</label>
        <Field :name="fieldName!" :type="fieldType" v-slot="{ field }">
            <input :type="fieldType" v-bind="field"
                class="bg-[#F5F7FA] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                :placeholder="placeholder" />
        </Field>
        <ErrorMessage :name="fieldName!" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
    </div>
</template>