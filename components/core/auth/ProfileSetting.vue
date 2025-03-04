<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';


const allowGender = ["Female", "Male", "Other", "Prefer Not To Say"];

type genderTypes = "Female" | "Male" | "Other" | "Prefer Not To Say" | undefined







const isCalendarMount = ref<boolean>(false);

const genderDropdown = ref<boolean>(false);


const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
        fullname: zod.string({ message: '*Full names is required' }).min(3, { message: 'This is required' }),
        birthdate: zod.string({ message: '*Birthdate is required' }).refine((value) => {
            const date = new Date(value);
            return date instanceof Date && !isNaN(date.getTime());
        }, { message: 'Invalid date' }),
        // country: zod.string({ message: '*Country is required' }).min(1, { message: 'This is required' }),
        // timezone: zod.string({ message: '*Timezone is required' }).min(1, { message: 'This is required' }),
        // bio: zod.string({ message: '*Bio is required' }),
        gender: zod.enum(["Male", "Female", "Other", "Prefer Not To Say"]),
    })
);


const { handleSubmit, setFieldValue, errors, values } = useForm({
    validationSchema: validationSchema,
});

const calenderRef = ref<HTMLElement | null>(null);


const onSubmitFillRegister = async () => {
    // const { email, fullname, password } = values
    console.log(values.email)
}




onMounted(() => {
    const calendar = new Calendar('#calendar', {
        onClickDate: (date) => {
            if (!isCalendarMount.value) return;
            const pickDate = date.context.selectedDates[0];
            setFieldValue('birthdate', pickDate);
        },
    });
    calendar.init();
});

const handlerChooseGender = (gender: genderTypes) => {
    genderDropdown.value = false
    setFieldValue('gender', gender)
}

</script>


<template>
    <form @submit.prevent="onSubmitFillRegister"
        class="w-[70%] h-full flex flex-col gap-[2.5rem] font-shatoshi p-6 dark">
        <div class="w-full h-full flex flex-col gap-[1rem] flex-wrap">
            <div class="w-full h-auto flex gap-[2rem]">
                <!-- email field -->
                <div class="h-auto flex flex-col gap-2 flex-1">
                    <label for="email" class="text-white text-[1rem] leading-[1.5rem]">Email</label>
                    <Field name="email" type="email" v-slot="{ field }">
                        <input type="email" v-bind="field"
                            class="bg-[#d1d1d1] dark:bg-[#2f2f2f] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] min-w-[17rem] text-[0.875rem] leading-[1.25rem]" />
                    </Field>
                    <ErrorMessage name="email" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
                </div>
                <!-- fullname  filed -->
                <div class="w-auto h-auto flex flex-col gap-2 flex-1">
                    <label for="fullname" class="text-white text-[1rem] leading-[1.5rem]">Full Name</label>
                    <Field name="fullname" type="string" v-slot="{ field }">
                        <input type="text" v-bind="field"
                            class="bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] min-w-[17rem] dark:text-white dark:bg-[#2f2f2f]" />
                    </Field>
                    <ErrorMessage name="fullname" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
                </div>
            </div>

            <!-- row 2 -->
            <div class="w-full h-auto flex gap-[2rem]">
                <!-- birdate  filed -->
                <div class="h-auto flex flex-col gap-2 flex-1">
                    <label for="birthdate" class="text-white text-[1rem] leading-[1.5rem]">Birth Date</label>
                    <Field name="birthdate" type="date" v-slot="{ field }">

                        <div class="w-full h-auto relative flex justify-end items-center min-w-[17rem]">
                            <input type="date" v-bind="field" ref="birthDateField"
                                class="w-full bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] dark:text-white dark:bg-[#2f2f2f] relative z-20" />

                            <NuxtImg src="/icons/calendar.svg" width="24" height="24" class="absolute mr-4 z-30"
                                @click="isCalendarMount = !isCalendarMount" />

                            <div class="absolute w-full h-auto top-0 left-0 z-10 opacity-0 duration-200"
                                :class="[isCalendarMount ? 'top-[100%] !opacity-100' : 'opacity-0 pointer-events-none invisible']">
                                <div id="calendar"></div>
                            </div>
                        </div>
                    </Field>
                    <ErrorMessage name="birthdate" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
                </div>
                <!-- gender field -->
                <div class="w-auto h-auto flex flex-col gap-2 flex-1">
                    <label for="gender" class="text-white text-[1rem] leading-[1.5rem]">Gender</label>
                    <Field name="gender" type="string" v-slot="{ field, handleBlur }">
                        <div class="w-full h-auto relative flex justify-end items-center min-w-[17rem]">
                            <input type="text" v-bind="field" placeholder="Gender" readonly
                                @focus="genderDropdown = true"
                                class=" w-full bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] min-w-[17rem] dark:text-white dark:bg-[#2f2f2f] cursor-default relative z-20" />
                            <NuxtImg src="/icons/arrowDown.svg" width="24" height="24"
                                class="absolute mr-4 z-30 duration-200"
                                :class="[!genderDropdown ? 'transform rotate-180' : '']"
                                @click="genderDropdown = !genderDropdown" />
                            <div class="absolute w-full h-auto top-0 left-0 z-10 opacity-0 duration-200 mt-[0.125rem]"
                                :class="[genderDropdown ? 'top-[100%] !opacity-100' : 'opacity-0 pointer-events-none invisible']">
                                <div
                                    class="w-full h-auto p-6 bg-[#0f172a] rounded-md shadow-lg text-[#94A3B8] flex flex-col gap-1">
                                    <div class="relative flex justify-between items-center"
                                        v-for="(item, index) in allowGender" :key="index"
                                        @click="() => handlerChooseGender(item as genderTypes)">
                                        <p class="cursor-pointer"> {{ item }}</p>
                                        <div class="size-2 bg-green-400 rounded-full" v-if="values.gender === item">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Field>
                    <ErrorMessage name="gender" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
                </div>
            </div>


            <!-- row 3 -->
            <div class="w-full h-auto flex gap-[2rem]">
                <!-- countries  filed -->
                <div class="h-auto flex flex-col gap-2 flex-1">
                    <label for="birthdate" class="text-white text-[1rem] leading-[1.5rem]">Birthdate</label>
                    <Field name="birthdate" type="date" v-slot="{ field }">

                        <div class="w-full h-auto relative flex justify-end items-center min-w-[17rem]">
                            <input type="date" v-bind="field" ref="birthDateField"
                                class="w-full bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] dark:text-white dark:bg-[#2f2f2f] relative z-20" />

                            <NuxtImg src="/icons/calendar.svg" width="24" height="24" class="absolute mr-4 z-30"
                                @click="isCalendarMount = !isCalendarMount" />

                            <div class="absolute w-full h-auto top-0 left-0 z-10 opacity-0 duration-200"
                                :class="[isCalendarMount ? 'top-[100%] !opacity-100' : 'opacity-0 pointer-events-none invisible']">
                                <div id="calendar"></div>
                            </div>
                        </div>
                    </Field>
                    <ErrorMessage name="birthdate" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
                </div>
                <!-- gender field -->
                <div class="w-auto h-auto flex flex-col gap-2 flex-1">
                    <label for="gender" class="text-white text-[1rem] leading-[1.5rem]">Gender</label>
                    <Field name="gender" type="string" v-slot="{ field, handleBlur }">
                        <div class="w-full h-auto relative flex justify-end items-center min-w-[17rem]">
                            <input type="text" v-bind="field" placeholder="Gender" readonly
                                @focus="genderDropdown = true"
                                class=" w-full bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] min-w-[17rem] dark:text-white dark:bg-[#2f2f2f] cursor-default relative z-20" />
                            <NuxtImg src="/icons/arrowDown.svg" width="24" height="24"
                                class="absolute mr-4 z-30 duration-200"
                                :class="[!genderDropdown ? 'transform rotate-180' : '']"
                                @click="genderDropdown = !genderDropdown" />
                            <div class="absolute w-full h-auto top-0 left-0 z-10 opacity-0 duration-200 mt-[0.125rem]"
                                :class="[genderDropdown ? 'top-[100%] !opacity-100' : 'opacity-0 pointer-events-none invisible']">
                                <div
                                    class="w-full h-auto p-6 bg-[#0f172a] rounded-md shadow-lg text-[#94A3B8] flex flex-col gap-1">
                                    <div class="relative flex justify-between items-center"
                                        v-for="(item, index) in allowGender" :key="index"
                                        @click="() => handlerChooseGender(item as genderTypes)">
                                        <p class="cursor-pointer"> {{ item }}</p>
                                        <div class="size-2 bg-green-400 rounded-full" v-if="values.gender === item">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Field>
                    <ErrorMessage name="gender" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
                </div>
            </div>

            <!-- country  filed -->

            <!-- timezone  filed -->

            <!-- bio  filed -->

        </div>
        <div class="submit-action w-[10rem] flex flex-col gap-[0.75rem]">
            <button
                class="bg-[#0075ff] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Change
                Profile Info</button>
        </div>
    </form>

</template>

<style lang="css" scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
}

input[type="date"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>