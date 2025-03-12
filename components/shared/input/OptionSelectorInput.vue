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
    isSearchEnabled?: boolean
    isImageEnabled?: boolean
    retrivePath: string[]
    retriveImagePath?: string[]
    maxDropdownHeight?: string
    dropDownIcon?: string
}>()




const dropDown = ref<boolean>(false);

const optionsFilter = ref<string>('')

const options = computed(() => {
    if (optionsFilter.value === '') return props.optionsData
    return props.optionsData?.filter((item) => {
        return getNestedValue(item, props.retrivePath).toLowerCase().includes(optionsFilter.value.toLowerCase())
    })
})


const handlerChooseOptions = (option: string) => {
    if (props.setFieldValue === undefined) return
    props.setFieldValue(props.fieldName, option)
    dropDown.value = false
}






function getNestedValue(item: any[], keys: string[]) {
    let result: Record<string, any> = item as unknown as Record<string, string>;
    if (keys.length === 0) return result;

    // Loop through each key in the keys array
    for (let i = 0; i < keys.length; i++) {
        if (result && result[keys[i]] !== undefined) {
            result = result[keys[i]];
        } else {
            return result;
        }
    }

    return result;
}

const handerClickOutside = (e: MouseEvent) => {
    const container = document.getElementById(`${props.fieldName}-options-selector`);
    if (dropDown.value) {
        const target = e.target as HTMLElement;
        if (!container?.contains(target)) {
            dropDown.value = false;
        }
    }
}


onMounted(() => {
    window.addEventListener('click', handerClickOutside)
})

onUnmounted(() => {
    window.removeEventListener('click', handerClickOutside)
})


</script>


<template>

    <!-- countries  filed -->
    <div class="w-full h-auto flex flex-col gap-2 flex-1" :id="`${fieldName}-options-selector`">
        <label :for="htmlFor" class="text-white text-[1rem] leading-[1.5rem]">{{ label }}</label>
        <Field :name="fieldName!" :type="fieldType" v-slot="{ field }">
            <div class="w-full h-auto relative flex justify-end items-center md:min-w-[17rem]">
                <input :placeholder="placeholder" readonly v-on:click="dropDown = !dropDown" :type="fieldType"
                    v-bind="field"
                    class=" w-full bg-white aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] md:min-w-[17rem] dark:text-white dark:bg-[#2f2f2f] cursor-default relative z-20" />
                <NuxtImg :src="dropDownIcon ? dropDownIcon : '/icons/arrowDown.svg'" width="24" height="24"
                    class="absolute mr-4 z-30 duration-200" :class="[!dropDown ? 'transform rotate-180' : '']"
                    @click="dropDown = !dropDown" />
                <div class="absolute w-full h-auto top-0 left-0 z-10 opacity-0 duration-200 mt-[0.125rem]"
                    :class="[dropDown ? 'top-[100%] !opacity-100' : 'opacity-0 pointer-events-none invisible']">
                    <div class="w-full p-6 bg-[#0f172a] rounded-md shadow-lg text-[#94A3B8] flex flex-col gap-1">
                        <input type="text" v-model="optionsFilter" v-if="isSearchEnabled"
                            class="w-full h-[2.5rem] bg-[#0f172a] text-[#94A3B8] border-b border-[#94A3B8] border-opacity-50 outline-none mb-4"
                            placeholder="Search country" />
                        <div class="w-full overflow-scroll"
                            :class="[maxDropdownHeight ? 'max-h-[' + maxDropdownHeight + ']' : 'max-h-[10rem]']">

                            <div class="relative flex justify-start items-center gap-2" v-for="(item, index) in options"
                                :key="index"
                                @click="() => handlerChooseOptions(getNestedValue(item, retrivePath) as unknown as string)">
                                <NuxtImg :src="getNestedValue(item, retriveImagePath) as unknown as string" width="32"
                                    height="32" class="size-6" loading="lazy"
                                    v-if="isImageEnabled && retriveImagePath" />
                                <p class="cursor-pointer"> {{ getNestedValue(item, retrivePath) }}</p>
                                <div class="size-2 bg-green-400 rounded-full ml-auto"
                                    v-if="value === (getNestedValue(item, retrivePath) as unknown as string)">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Field>
        <div class="w-full h-2 relative flex justify-start items-center">
            <ErrorMessage :name="fieldName" class="text-red-400 text-[0.75rem] leading-[0.75rem] absolute left-0" />
        </div>
    </div>

</template>