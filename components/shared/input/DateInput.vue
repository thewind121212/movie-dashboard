<template>
    <div class="w-80 flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
        <!-- Calendar -->
        <div class="p-3 space-y-0.5">
            <!-- Months -->
            <div class="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                <!-- Prev Button -->
                <div class="col-span-1">
                    <button @click="changeMonth(-1)"
                        class="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full">
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                </div>
                <!-- End Prev Button -->

                <!-- Month / Year -->
                <div class="col-span-3 flex justify-center items-center gap-x-1 font-shatoshi">
                    <p>
                        {{ months[currentMonth] }}
                    </p>
                    <span class="text-gray-800">-</span>
                    <p>{{ currentYear }}</p>
                </div>
                <!-- End Month / Year -->

                <!-- Next Button -->
                <div class="col-span-1 flex justify-end">
                    <button @click="changeMonth(1)"
                        class="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full">
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
                <!-- End Next Button -->
            </div>
            <!-- Months -->

            <!-- Weeks -->
            <div class="flex pb-1.5">
                <span class="m-px w-10 block text-center text-sm text-gray-500">Mo</span>
                <span class="m-px w-10 block text-center text-sm text-gray-500">Tu</span>
                <span class="m-px w-10 block text-center text-sm text-gray-500">We</span>
                <span class="m-px w-10 block text-center text-sm text-gray-500">Th</span>
                <span class="m-px w-10 block text-center text-sm text-gray-500">Fr</span>
                <span class="m-px w-10 block text-center text-sm text-gray-500">Sa</span>
                <span class="m-px w-10 block text-center text-sm text-gray-500">Su</span>
            </div>
            <!-- Weeks -->

            <!-- Days -->
            <div class="flex flex-wrap">
                <div v-for="(day, index) in days" :key="index" class="m-px size-10 flex justify-center items-center">
                    <button
                        class="border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 w-full h-full"
                        :class="{ 'bg-blue-600 text-white': day === currentDay }">
                        {{ day }}
                    </button>
                </div>
            </div>
            <!-- End Days -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = [2023, 2024, 2025, 2026, 2027];

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

const days = ref<any>([]);
const currentDay = ref(new Date().getDate()); // Current day to highlight

function renderCalendar() {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1);
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
    const firstDayOfWeek = firstDay.getDay(); // Starting day of the week (0 = Sunday)
    const lastDate = lastDay.getDate();

    days.value = [];
    // Fill in empty days for the first week of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.value.push(null);
    }

    // Add actual days of the month
    for (let i = 1; i <= lastDate; i++) {
        days.value.push(i);
    }
}

function changeMonth(direction: any) {
    currentMonth.value += direction;
    if (currentMonth.value < 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else if (currentMonth.value > 11) {
        currentMonth.value = 0;
        currentYear.value++;
    }
    renderCalendar();
}

watch([currentMonth, currentYear], renderCalendar);

onMounted(() => {
    renderCalendar();
});
</script>

<style scoped>
.no-arrow {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: 1px solid #ccc;
    /* Optional, add border for styling */
    padding-right: 0;
}
</style>