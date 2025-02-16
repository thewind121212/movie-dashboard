<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';


const showPassword = ref(false);


const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).email({ message: '*Must be a valid email' }),
        password: zod.string().min(1, { message: '*Password is required' }).min(8, { message: '*Password is too short' }),
        remember: zod.boolean().default(false),
    })
);
function onSubmit(values) {
    console.log(JSON.stringify(values));
}
</script>



<template>
    <Form :validation-schema="validationSchema" @submit="onSubmit"
        class="w-[60%] h-auto flex flex-col gap-[2rem] font-shatoshi">
        <div class="w-full h-auto flex flex-col gap-[1rem]">
            <div class="w-full h-auto flex flex-col gap-2">
                <label for="email" class="text-[#121212] text-[1rem] leading-[1.5rem]">Email</label>
                <Field name="email" type="email" v-slot="{ field }">
                    <input type="email" v-bind="field"
                        class="bg-[#F5F7FA] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                        placeholder="Enter Your Email" />
                </Field>
                <ErrorMessage name="email" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
            </div>
            <div class="w-full h-auto flex flex-col gap-2">
                <label for="password" class="text-[#121212] text-[1rem] leading-[1.5rem]">Password</label>
                <Field name="password" v-slot="{ field }">
                    <div class="w-full h-auto relative">
                        <input name="password" :type="showPassword ? 'text' : 'password'" v-bind="field"
                            autocomplete="on"
                            class="bg-[#F5F7FA] w-full aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                            placeholder="Enter Your Password" />
                        <button @click="showPassword = !showPassword" type="button"
                            class="absolute right-4 top-1/2 -translate-y-1/2">
                            <NuxtImg src="/icons/eye.svg" width="24" height="24" alt="eye-icon" v-if="!showPassword" />
                            <NuxtImg src="/icons/eye-slash.svg" width="24" height="24" alt="eye-icon" v-else />
                        </button>
                    </div>
                </Field>
                <ErrorMessage name="password" class="text-red-400 text-[0.75rem] leading-[0.75rem]" />
            </div>
            <div class="h-auto w-full flex justify-between items-center">
                <div class="w-full h-auto flex justify-start items-center gap-[0.625rem]">
                    <Field name="remember" type="checkbox" v-slot="{ field }" :value="true" :unchecked-value="false">
                        <input type="checkbox" name="remember" v-bind="field" :value="true" ref="" />
                        <label for="remember"
                            class="text-[#3D3D3D] text-[0.875rem] leading-[1.25rem] cursor-pointer">Remember
                            Me</label>
                    </Field>
                </div>
                <p class="text-[0.875rem] leading-[1.25rem] text-[#3D3D3D] text-nowrap cursor-pointer">Forgot Password
                </p>
            </div>
        </div>
        <div class="submit-action w-full flex flex-col gap-[0.75rem]">
            <button
                class="bg-[#121212] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Sign
                In</button>
            <button
                class="bg-[#fffff] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] border leading-[1.25rem] border-[#EDEDED]  flex justify-center items-center gap-[0.625rem]">
                <span class="w-auto h-auto">
                    <NuxtImg src="/icons/google.svg" width="24" height="24" alt="google-icon" class="!w-6 !h-6" />
                </span>
                Sign In Google
            </button>
        </div>
    </Form>
</template>
