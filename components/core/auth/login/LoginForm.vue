<script setup>
import { Form, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthLoading } from '~/store/authLoading';
import { login } from '~/actions/auth.action';
import CommonInput from '~/components/shared/input/CommonInput.vue';
import PasswordField from '~/components/shared/input/PasswordInput.vue';
import * as zod from 'zod';


const authLoading = useAuthLoading()
const rememberMe = ref(false);
const router = useRouter()


const emit = defineEmits(['setPhase', 'setPayloadTOTP'])

const toogleRememberMe = () => {
    rememberMe.value = !rememberMe.value
}


const validationSchema = toTypedSchema(
    zod.object({
        email: zod.string({ message: '*Email is required' }).email({ message: '*Must be a valid email' }),
        password: zod.string().min(1, { message: '*Password is required' }).min(8, { message: '*Password is too short' }),
        remember: zod.boolean().default(false),
    })
);


async function onSubmit(values) {
    authLoading.setLoading(true);
    const isLoginSuccess = await login(values.email, values.password, rememberMe.value);
    if (isLoginSuccess.isTwoFaEnabled && isLoginSuccess.valid) {
        emit('setPhase', '2FA')
        emit('setPayloadTOTP', {
            email: values.email,
            nonce: isLoginSuccess.nonce,
            remember: rememberMe.value
        })
    }

    authLoading.setLoading(false);
    if (isLoginSuccess.valid && !isLoginSuccess.isTwoFaEnabled) {
        //redirect to dashboard
        await navigateTo('/', {replace: true})
    }
}
</script>



<template>
    <div class="w-full h-auto flex flex-col gap-[2.5rem] items-center">
        <div class="login-header text-center flex flex-col gap-[0.75rem]">
            <h1 class="text-[#121212] text-[3rem] leading-[3rem] font-noto">Welcome Back</h1>
            <p class="text-[#3D3D3D] text-[1rem] leading-[1.5rem] font-shatoshi">Enter your email and password to
                access your account</p>
        </div>
        <Form :validation-schema="validationSchema" @submit="onSubmit"
            class="w-[60%] h-auto flex flex-col gap-[2rem] font-shatoshi">
            <div class="w-full h-auto flex flex-col gap-[1rem]">
                <CommonInput htmlFor="email" fieldName="email" type="email" label="Email" placeholder="Enter Your Email"
                    fieldType="email" />
                <PasswordField htmlFor="password" fieldName="password" type="password" label="Password"
                    placeholder="Enter Your Password" fieldType="password" />
                <div class="h-auto w-full flex justify-between items-center">
                    <div class="w-full h-auto flex justify-start items-center gap-[0.625rem]">
                        <Field name="remember" type="checkbox" v-slot="{ field }" :value="true"
                            :unchecked-value="false">
                            <input type="checkbox" name="remember" v-bind="field" :checked="rememberMe"
                                @change="toogleRememberMe" />
                            <label for="remember" v-on:click="toogleRememberMe"
                                class="text-[#3D3D3D] text-[0.875rem] leading-[1.25rem] cursor-pointer">Remember
                                Me</label>
                        </Field>
                    </div>
                    <h3 @click="router.push('/forgot-password')"
                        class="text-[0.875rem] leading-[1.25rem] text-[#3D3D3D] text-nowrap cursor-pointer">Forgot
                        Password
                    </h3>
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
    </div>
</template>
