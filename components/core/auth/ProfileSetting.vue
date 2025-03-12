<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useAuthState } from "~/composables/useAuthStore"
import OptionSelectorInput from '~/components/shared/input/OptionSelectorInput.vue';
import DateInput from '~/components/shared/input/DateInput.client.vue';
import { editUser } from '~/actions/auth.action';
import 'vanilla-calendar-pro/styles/index.css';
import ModalContainer from '~/components/shared/utils/ModalContainer.utils.vue';
import BinaryModal from '~/components/shared/utils/BinaryModal.vue';
import { useToogleBinaryModal } from '#imports';

const { isShow, modalType, showModalChange } = useToogleBinaryModal('BINARY', 'Change Profile Info', 'Are you sure you want to change your profile info?')

const allowGender = ["Female", "Male", "Other", "Prefer Not To Say"];

const props = defineProps<{
    countries: any[] | null;
    refresh: () => void;
    timezones: any[] | null;
    userData: {
        id: string,
        name: string,
        email: string,
        birthDate: string | null,
        country: string | null,
        timeZone: string | null,
        bio: string | null,
        gender: string | null,
        createdAt: string,
        updatedAt: string,
    } | null;
}>()


const { email, isAuthenticated, userId } = useAuthState().userAuthState.value


const userProfileRef = ref<
    {
        fullname: string,
        birthdate: string | null,
        country: string | null,
        timezone: string | null,
        gender: string | null,
        bio: string
    }
>({
    fullname: props.userData?.name || '',
    birthdate: props.userData?.birthDate ? new Date(props.userData?.birthDate).toISOString().split('T')[0] : '',
    country: props.userData?.country || '',
    gender: props.userData?.gender || '',
    timezone: props.userData?.timeZone || '',
    bio: props.userData?.bio || ''
});







const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
        fullname: zod.string({ message: '*Full names is required' }).min(3, { message: 'This is required' }),
        birthdate: zod.string({ message: '*Birthdate is required' }).refine((value) => {
            const date = new Date(value);
            return date instanceof Date && !isNaN(date.getTime())
        }, { message: 'Invalid date' }).optional(),
        country: zod.string({ message: '*Country is required' }).optional(),
        timezone: zod.string({ message: '*Timezone is required' }).optional(),
        bio: zod.string({ message: '*Bio is required' }).optional(),
        gender: zod.enum(["Male", "Female", "Other", "Prefer Not To Say"]).optional()
    })
);


const { setFieldValue, setFieldError, values, isFieldDirty } = useForm({
    validationSchema: validationSchema,
});

const isDataDirty = computed(() => {
    let isDirty = false
    Object.keys(userProfileRef.value).forEach((key) => {
        if (userProfileRef.value[key as keyof typeof userProfileRef.value] !== values[key as keyof typeof values]) {
            isDirty = true
        }
    })
    return isDirty
})



const onSubmitFillRegister = async () => {
    // data need be dirty and valid
    if (!isDataDirty.value) {
        return
    }

    if (values.bio && values.bio?.length < 10) {
        setFieldError('bio', 'Bio must be at least 10 characters')
        return
    }


    await editUser({
        userId,
        name: values.fullname || '',
        birthDate: values.birthdate || '',
        country: values.country || '',
        gender: values.gender || '',
        timeZone: values.timezone || '',
        bio: values.bio || '',
    })

    props.refresh()

}

onMounted(() => {
    if (isAuthenticated) {
        setFieldValue('email', email)
    }
    if (props.userData) {
        props.userData.name && setFieldValue('fullname', props.userData.name)
        props.userData.birthDate && setFieldValue('birthdate', new Date(props.userData.birthDate).toISOString().split('T')[0])
        props.userData.timeZone && setFieldValue('timezone', props.userData.timeZone)
        props.userData.country && setFieldValue('country', props.userData.country)
        props.userData.gender && setFieldValue('gender', props.userData.gender as any)
        props.userData.bio && setFieldValue('bio', props.userData.bio as any)
    }
})


</script>


<template>
    <form @submit.prevent="showModalChange"
        class="w-full md:w-[70%] h-full flex flex-col gap-[2.5rem] font-shatoshi p-6 dark max-w-[64rem]">
        <div class="h-full flex flex-col gap-[1rem] flex-wrap">
            <div class="w-full h-auto flex gap-2 md:gap-[2rem] flex-wrap md:flex-nowrap">
                <!-- email field -->
                <div class="h-auto flex flex-col gap-2 flex-1 w-full">
                    <label for="email" class="text-white text-[1rem] leading-[1.5rem]">Email</label>
                    <Field name="email" type="email" v-slot="{ field }">
                        <input type="email" v-bind="field" readonly disabled
                            class="bg-[#d1d1d1] dark:bg-[#2f2f2f] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] md:min-w-[17rem] text-[0.875rem] leading-[1.25rem] select-none" />
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
                            class="bg-white rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem] md:min-w-[17rem] dark:text-white dark:bg-[#2f2f2f]" />
                    </Field>
                    <div class="w-full h-2 relative flex justify-start items-center">
                        <ErrorMessage name="fullname"
                            class="text-red-400 text-[0.75rem] leading-[0.75rem] absolute left-0" />
                    </div>
                </div>
            </div>

            <!-- row 2 -->
            <div class="w-full h-auto flex  gap-2 md:gap-[2rem] z-30 flex-wrap md:flex-nowrap">
                <!-- birdate  filed -->
                <DateInput htmlFor="birthdate" fieldName="birthdate" type="date" label="Birth Date"  class="z-20 min-w-[17rem]"
                    placeholder="Select Your Birthdate" fieldType="date" :setFieldValue="setFieldValue"
                    :value="values.birthdate" />
                <!-- gender field -->
                <OptionSelectorInput htmlFor="gender" fieldName="gender" type="text" label="Gender"  class="z-10 min-w-[17rem]"
                    placeholder="Select Your Gender" fieldType="text" :optionsData="allowGender"
                    :setFieldValue="setFieldValue" :value="values.gender" :retrive-path="[]" />
            </div>


            <!-- row 3 -->
            <div class="w-full h-auto relative flex gap-2 md:gap-[2rem] z-20 flex-wrap md:flex-nowrap" id="country-timezone">
                <!-- countries  filed -->
                <div class="w-fullh-auto flex flex-col gap-2 flex-1 relative z-10">
                    <OptionSelectorInput htmlFor="country" fieldName="country" type="text" label="Country"
                        placeholder="Select Country" fieldType="text" :optionsData="countries"
                        :setFieldValue="setFieldValue" :value="values.country" :retrive-path="['name', 'common']"
                        drop-down-icon="/icons/language.svg" :is-search-enabled="true" :is-image-enabled="true"
                        :retrive-image-path="['flags', 'svg']" />
                </div>
                <!-- timezone field -->

                <div class="w-full h-auto flex flex-col gap-2 md:gap-[2rem] flex-1 z-[5]">
                    <OptionSelectorInput htmlFor="timezone" fieldName="timezone" type="text" label="Timezone"
                        placeholder="Select Timezone" fieldType="text" :optionsData="timezones"
                        :is-search-enabled="true" :setFieldValue="setFieldValue" :value="values.timezone"
                        drop-down-icon="/icons/timezone.svg" :retrive-path="['zoneName']" />
                </div>
            </div>
            <!-- row 4 -->
            <div class="w-full h-auto flex gap-[2rem] z-5 md:flex-nowrap">
                <div class="h-auto flex flex-col gap-2 flex-1">
                    <label for="bio" class="text-white text-[1rem] leading-[1.5rem]">Your Bio</label>
                    <Field name="bio" type="text" v-slot="{ field }">
                        <textarea v-bind="field" rows="4"
                            class="bg-[#d1d1d1] dark:bg-[#2f2f2f] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-white min-w-[15rem] md:min-w-[17rem] text-[0.875rem] leading-[1.25rem] resize-none"
                            placeholder="Write something about yourself" />
                    </Field>
                    <div class="w-full h-2 relative flex justify-start items-center">
                        <ErrorMessage name="bio"
                            class="text-red-400 text-[0.75rem] leading-[0.75rem] absolute left-0" />
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-action w-[10rem] flex flex-col gap-[0.75rem]">
            <button :disabled="!isDataDirty" class="bg-[#0075ff] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem] disabled:bg-[#d1d1d1] disabled:text-[#6B6B6B] 
                ">Change
                Profile Info</button>
        </div>
        <!-- render modal header -->
        <Teleport to="#modal-render-entrypoint" v-if="isShow && modalType === 'BINARY'">
            <ModalContainer>
                <BinaryModal cancel-content="Cancel" approve-content="Confirm"
                    :hander-function="() => onSubmitFillRegister()" />
            </ModalContainer>
        </Teleport>

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