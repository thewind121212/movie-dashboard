<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useAuthState } from "~/composables/useAuthStore"
import OptionSelectorInput from '~/components/shared/input/OptionSelectorInput.vue';
import DateInput from '~/components/shared/input/DateInput.vue';
import 'vanilla-calendar-pro/styles/index.css';


const allowGender = ["Female", "Male", "Other", "Prefer Not To Say"];

const props = defineProps<{
    countries: any[] | null;
    timezones: any[] | null;
}>()





const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
        fullname: zod.string({ message: '*Full names is required' }).min(3, { message: 'This is required' }),
        birthdate: zod.string({ message: '*Birthdate is required' }).refine((value) => {
            const date = new Date(value);
            return date instanceof Date && !isNaN(date.getTime());
        }, { message: 'Invalid date' }),
        country: zod.string({ message: '*Country is required' }).min(1, { message: 'This is required' }),
        timezone: zod.string({ message: '*Timezone is required' }).min(1, { message: 'This is required' }),
        // bio: zod.string({ message: '*Bio is required' }),
        gender: zod.enum(["Male", "Female", "Other", "Prefer Not To Say"]),
    })
);


const { handleSubmit, setFieldValue, errors, values, isFieldTouched } = useForm({
    validationSchema: validationSchema,
});


const onSubmitFillRegister = async () => {
    // const { email, fullname, password } = values
    console.log(values.email)
}

onMounted(() => {
    console.log(useAuthState().userAuthState.value)
})



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
                    <div class="w-full h-2 relative flex justify-start items-center">
                        <ErrorMessage name="email"
                            class="text-red-400 text-[0.75rem] leading-[0.75rem] absolute left-0" />
                    </div>
                </div>
                <!-- fullname  filed -->
                <div class="w-auto h-auto flex flex-col gap-2 flex-1">
                    <label for="fullname" class="text-white text-[1rem] leading-[1.5rem]">Full Name</label>
                    <Field name="fullname" type="string" v-slot="{ field }">
                        <input type="text" v-bind="field"
                            class="bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] min-w-[17rem] dark:text-white dark:bg-[#2f2f2f]" />
                    </Field>
                    <div class="w-full h-2 relative flex justify-start items-center">
                        <ErrorMessage name="fullname"
                            class="text-red-400 text-[0.75rem] leading-[0.75rem] absolute left-0" />
                    </div>
                </div>
            </div>

            <!-- row 2 -->
            <div class="w-full h-auto flex gap-[2rem] z-30">
                <!-- birdate  filed -->
                <DateInput htmlFor="birthdate" fieldName="birthdate" type="date" label="Birth Date"
                    placeholder="Select Your Birthdate" fieldType="date" :setFieldValue="setFieldValue"
                    :value="values.birthdate" />
                <!-- gender field -->
                <OptionSelectorInput htmlFor="gender" fieldName="gender" type="text" label="Gender"
                    placeholder="Select Your Gender" fieldType="text" :optionsData="allowGender"
                    :setFieldValue="setFieldValue" :value="values.gender" :retrive-path="[]" />
            </div>


            <!-- row 3 -->
            <div class="w-full h-auto flex gap-[2rem] z-20" id="country-timezone">
                <!-- countries  filed -->
                <div class="w-auto h-auto flex flex-col gap-2 flex-1">
                    <OptionSelectorInput htmlFor="country" fieldName="country" type="text" label="Country"
                        placeholder="Select Country" fieldType="text" :optionsData="countries"
                        :setFieldValue="setFieldValue" :value="values.country" :retrive-path="['name', 'common']"
                        drop-down-icon="/icons/language.svg" :is-search-enabled="true" :is-image-enabled="true"
                        :retrive-image-path="['flags', 'svg']" />
                </div>
                <!-- timezone field -->

                <div class="w-auto h-auto flex flex-col gap-2 flex-1">
                    <OptionSelectorInput htmlFor="timezone" fieldName="timezone" type="text" label="Timezone"
                        placeholder="Select Timezone" fieldType="text" :optionsData="timezones"
                        :is-search-enabled="true" :setFieldValue="setFieldValue" :value="values.timezone"
                        drop-down-icon="/icons/timezone.svg" :retrive-path="['zoneName']" />
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