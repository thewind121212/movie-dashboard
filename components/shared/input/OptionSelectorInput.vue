<script setup lang="ts">

import { Field, ErrorMessage } from 'vee-validate';

import { ref } from 'vue';


const props = defineProps<{
    htmlFor: string;
    fieldName: string;
    type: string;
    label: string;
    placeholder: string
    fieldType: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
    optionsData: any[] | null,
    setFieldValue: Function,
    value: string | undefined,
    isImageEnabled?: boolean
}>()




const dropDown = ref<boolean>(false);

const optionsFilter = ref<string>('')

const options = computed(() => {
    if (props.optionsData === undefined) return []
    return props.optionsData
})


const handlerChooseOptions = (option: string) => {
    console.log(props.value)
    if (props.setFieldValue === undefined) return
    props.setFieldValue('timezone', option)
    dropDown.value = false
}



// <div class="relative flex justify-start items-center gap-2"
//     v-for="(item, index) in options" :key="index"
//     @click="() => handlerChooseOptions(item?.zoneName)">
//     <p class="cursor-pointer"> {{ item?.zoneName }}</p>
//     <div class="size-2 bg-green-400 rounded-full ml-auto"
//         v-if="value === item.zoneName">
//     </div>
// </div>






</script>


<template>

    <div class="w-full h-auto flex gap-[2rem]">
        <!-- countries  filed -->
        <div class="w-1/2 h-auto flex flex-col gap-2 flex-1">
            <label :for="htmlFor" class="text-white text-[1rem] leading-[1.5rem]">{{ label }}</label>
            <Field :name="fieldName!" :type="fieldType" v-slot="{ field }">
                <div class="w-full h-auto relative flex justify-end items-center min-w-[17rem]">
                    <input :placeholder="placeholder" readonly @focus="dropDown = true" :type="fieldType" v-bind="field"
                        class=" w-full bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] min-w-[17rem] dark:text-white dark:bg-[#2f2f2f] cursor-default relative z-20" />
                    <NuxtImg src="/icons/arrowDown.svg" width="24" height="24" class="absolute mr-4 z-30 duration-200"
                        :class="[!dropDown ? 'transform rotate-180' : '']" @click="dropDown = !dropDown" />
                    <div class="absolute w-full h-auto top-0 left-0 z-10 opacity-0 duration-200 mt-[0.125rem]"
                        :class="[dropDown ? 'top-[100%] !opacity-100' : 'opacity-0 pointer-events-none invisible']">
                        <div class="w-full p-6 bg-[#0f172a] rounded-md shadow-lg text-[#94A3B8] flex flex-col gap-1">
                            <input type="text" v-model="optionsFilter"
                                class="w-full h-[2.5rem] bg-[#0f172a] text-[#94A3B8] border-b border-[#94A3B8] border-opacity-50 outline-none"
                                placeholder="Search country" />
                            <div class="w-full max-h-[18.75rem] overflow-scroll mt-4">

                                <div class="relative flex justify-start items-center gap-2"
                                    v-for="(item, index) in options" :key="index"
                                    @click="() => handlerChooseOptions(item?.zoneName)">
                                    <p class="cursor-pointer"> {{ item?.zoneName }}</p>
                                    <div class="size-2 bg-green-400 rounded-full ml-auto"
                                        v-if="value === item.zoneName">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Field>
            <ErrorMessage name="gender" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
        </div>
    </div>

</template>