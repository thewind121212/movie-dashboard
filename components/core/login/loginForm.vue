<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
        password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
    })
);
function onSubmit(values) {
    alert(JSON.stringify(values, null, 2));
}
</script>


<template>
    <Form :validation-schema="validationSchema" @submit="onSubmit" class="w-[60%] h-auto flex flex-col gap-[2.5rem] font-shatoshi">
        <div class="w-full h-auto flex flex-col gap-[1rem]">
            <div class="w-full h-auto flex flex-col gap-2">
                <label for="email" class="text-[#121212] text-[1rem] leading-[1.5rem]">Email</label>
                <Field name="email" type="email">
                    <input type="email"
                        class="bg-[#F5F7FA] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                        placeholder="Enter Your Email" />
                </Field>
                <ErrorMessage name="email" />
            </div>
            <div class="w-full h-auto flex flex-col gap-2">
                <label for="password" class="text-[#121212] text-[1rem] leading-[1.5rem]">Password</label>
                <Field name="password" type="password">
                    <input type="password"
                        class="bg-[#F5F7FA] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#6B6B6B] text-[0.875rem] leading-[1.25rem]"
                        placeholder="Enter Your Password" />
                </Field>
            </div>
            <div class="h-auto w-full flex justify-between items-center">
                <div class="w-full h-auto flex justify-start items-center gap-[0.625rem]">
                    <Field name="remember" type="checkbox">
                        <input type="checkbox"/>
                        <label for="remember" class="text-[#3D3D3D] text-[0.875rem] leading-[1.25rem]">Remember
                            Me</label>
                    </Field>
                </div>
                <p class="text-[0.875rem] leading-[1.25rem] text-[#3D3D3D] text-nowrap">Forgot Password</p>
            </div>
        </div>
        <div class="submit-action w-full flex flex-col gap-[0.75rem]">
            <button
                class="bg-[#121212] aspect-[430/48] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#fff] text-[0.875rem] leading-[1.25rem]">Sign
                In</button>
            <button
                class="bg-[#fffff] aspect-[430/48] h-[3rem] rounded-[0.75rem] px-[1rem] py-[0.875rem] text-[#121212] text-[0.875rem] leading-[1.25rem] border-[#EDEDED] border flex justify-center items-center gap-[0.625rem]">
                <span>
                    <NuxtImg src="/icons/google.svg" width="24" height="24" alt="google-icon" />
                </span>
                Sign
                In with Google</button>
        </div>
    </Form>
</template>