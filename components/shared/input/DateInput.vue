<script setup lang="ts">

import { Field, ErrorMessage } from 'vee-validate';
import { Calendar } from 'vanilla-calendar-pro';

import { ref } from 'vue';


const props = defineProps<{
    htmlFor: string;
    fieldName: string;
    type: string;
    label: string;
    placeholder: string
    fieldType: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date'
    setFieldValue: Function,
    value: string | undefined,
}>()

const dropDown = ref<boolean>(false);

onMounted(() => {
    const calendar = new Calendar('#calendar', {
        onClickDate: (date) => {
            if (!dropDown.value) return;
            const pickDate = date.context.selectedDates[0];
            props.setFieldValue('birthdate', pickDate);
        },
    });
    calendar.init();
});



const handerClickOutside = (e: MouseEvent) => {
    const container = document.getElementById('date-input-user');
    if (dropDown.value) {
        const target = e.target as HTMLElement;
        if (!container?.contains(target)) {
            dropDown.value = false;
        }
    }
}

onMounted(() => {
    document.addEventListener('click', handerClickOutside);
})

onUnmounted(() => {
    document.removeEventListener('click', handerClickOutside);
})




</script>





<template>
    <div class="h-auto flex flex-col gap-2 flex-1" id="date-input-user">
        <label :for="htmlFor" class="text-white text-[1rem] leading-[1.5rem]">{{ label }}</label>
        <Field :name="fieldName!" :type="fieldType" v-slot="{ field }">

            <div class="w-full h-auto relative flex justify-end items-center min-w-[17rem]">
                <input type="date" v-bind="field" ref="birthDateField"
                    class="w-full bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] dark:text-white dark:bg-[#2f2f2f] relative z-20" />

                <NuxtImg src="/icons/calendar.svg" width="24" height="24" class="absolute mr-4 z-30"
                    @click="dropDown = !dropDown" />

                <div class="absolute w-full h-auto top-0 left-0 z-10 opacity-0 duration-200"
                    :class="[dropDown ? 'top-[100%] !opacity-100' : 'opacity-0 pointer-events-none invisible']">
                    <div id="calendar"></div>
                </div>
            </div>
        </Field>
        <div class="w-full h-2 relative flex justify-start items-center">
            <ErrorMessage :name="fieldName" class="text-red-400 text-[0.75rem] leading-[0.75rem] absolute left-0" />
        </div>
    </div>

</template>
