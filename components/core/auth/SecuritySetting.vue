<script setup lang="ts">
import { Form, type GenericObject } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { changePasword } from '~/actions/auth.action';
import PasswordField from '~/components/shared/input/PasswordInput.vue';
import { useAuthState } from '#imports';
import * as zod from 'zod';
import { useModalStore } from '~/store/modal';


const { setModalType } = useModalStore();



const props = defineProps<{
    is2FaEnabled: "fetching" | "enabled" | "disabled"
}>()


// validation schema
const validationSchema = toTypedSchema(
    zod.object({
        currentPassword: zod.string().min(1, { message: 'This is required*' }),
        newPassword: zod.string().min(1, { message: 'This is required*' }).min(8, { message: 'Too short' }),
        repeatNewPassword: zod.string().min(1, { message: 'This is required*' }).min(8, { message: 'Too short' }),
    }).refine(data => data.newPassword === data.repeatNewPassword, {
        message: 'Passwords do not match',
        path: ['repeatNewPassword'],
    })
);

//submit function
async function onSubmit(values: GenericObject) {
    await changePasword(values.currentPassword, values.newPassword, useAuthState().userAuthState.value.userId)
}
</script>



<template>
    <div class="w-full flex justify-start items-start gap-10">
        <div class="w-full  h-auto flex flex-col justify-start items-start relative z-20 p-6 dark">
            <div class="w-full flex justify-between items-start gap-12 flex-wrap md:flex-nowrap">
                <div class="flex-auto max-w-[calc(32.5rem)]">
                    <h1 class="text-white font-bold mb-4 font-sans">Password</h1>

                    <Form :validation-schema="validationSchema" @submit="onSubmit"
                        class="w-full h-auto flex flex-col justify-start items-start font-shatoshi md:min-w-[17rem] gap-3">
                        <!--current password field -->
                        <PasswordField htmlFor="currentPassword" fieldName="currentPassword" label="Current Password"
                            :isDark="true" :block-error="true" placeholder="Your Current Password"
                            fieldType="password" />

                        <!-- password field -->
                        <PasswordField htmlFor="newPassword" fieldName="newPassword" label="New Password"
                            placeholder="New Password" :isDark="true" :block-error="true" fieldType="password" />
                        <!-- confirm password -->
                        <PasswordField htmlFor="repeatNewPassword" fieldName="repeatNewPassword" type="password"
                            :isDark="true" :block-error="true" label="Confirm New Password"
                            placeholder="Confirm New Password" fieldType="password" />

                        <div class="submit-action w-[10rem] flex flex-col gap-[0.75rem]">
                            <button class="bg-[#0075ff] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem] disabled:bg-[#d1d1d1] disabled:text-[#6B6B6B] 
                    ">Change</button>
                        </div>
                    </Form>

                </div>
                <div class="w-auto h-auto flex flex-col justify-start items-start max-w-[41.0625rem]">
                    <h1 class="text-white font-bold mb-4 font-sans">Please Note When Enable TOTP</h1>
                    <ul className="list-none pl-0">
                        <li className="mb-3 text-white">
                            <strong className="text-teal-500">TOTP Activation/Deactivation:</strong> TOTP can only be
                            disabled using the provided token or recovery password.
                        </li>
                        <li className="mb-3 text-white">
                            <strong className="text-teal-500">Recovery Password:</strong> You are given 5 recovery
                            passwords when enabling TOTP. Store them securely, as they are necessary if you lose access
                            to your TOTP device.
                        </li>
                        <li className="mb-3 text-white">
                            <strong className="text-teal-500">TOTP Request:</strong> Access to one of the 5 recovery
                            passwords is required when requesting TOTP, in case of any issues.
                        </li>
                    </ul>
                </div>

            </div>

            <div class="w-full h-auto flex flex-col justify-start items-start my-4 mt-6">
                <div class="w-auto h-auto flex justify-start items-center gap-2">
                    <h1 class="text-white font-bold font-sans">2Fa Method With TOTP</h1>
                    <div class="size-3 rounded-full animate-pulse"
                        :class="props.is2FaEnabled === 'fetching' ? 'bg-yellow-400' : props.is2FaEnabled === 'enabled' ? 'bg-green-400' : 'bg-red-400'">
                    </div>
                </div>

                <div class="w-auto flex justify-start items-center gap-4 mt-8 flex-wrap">
                    <!-- enable TOTP -->
                    <div class="submit-action w-auto lg:w-[10rem] flex flex-col gap-[0.75rem]">
                        <button
                            class="bg-[#0075ff] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem] disabled:bg-[#d1d1d1] disabled:text-[#6B6B6B]"
                            :disabled="is2FaEnabled === 'fetching' || is2FaEnabled === 'enabled'"
                            :class="props.is2FaEnabled === 'fetching' ? 'cursor-not-allowed' : props.is2FaEnabled === 'enabled' ? 'cursor-not-allowed' : 'cursor-pointer'"
                            @click="setModalType('REGISTER_TOTP')">Enable
                            TOTP</button>
                    </div>
                    <!-- disable TOTP -->
                    <div class="submit-action lg:w-[10rem] flex flex-col gap-[0.75rem]">
                        <button @click="setModalType('DISABLE_TOTP')"
                            class="bg-red-400 rounded-[0.75rem] px-[1rem] py-[0.875rem] text-white text-[0.875rem] leading-[1.25rem] disabled:bg-[#d1d1d1] disabled:text-[#6B6B6B]"
                            :disabled="is2FaEnabled === 'fetching' || is2FaEnabled === 'disabled'"
                            :class="props.is2FaEnabled === 'fetching' ? 'cursor-not-allowed' : props.is2FaEnabled === 'disabled' ? 'cursor-not-allowed' : 'cursor-pointer'">Disable
                            TOTP</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
