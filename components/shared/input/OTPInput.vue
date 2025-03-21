<script setup lang="ts">
import { ref } from 'vue';

const otps = ref<string[]>(['', '', '', '', '', '']);
const isSelectAll = ref<boolean>(false);
const previousKey = ref<string>('');

const allowedKeyNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const validKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', 'Meta'];

const props = defineProps<{
    isShowSubmit?: boolean
}>();

const emit = defineEmits(['getOTP']);

// Helper function to focus the next or previous input
const focusInput = (index: number, direction: 'next' | 'prev') => {
    const targetIndex = direction === 'next' ? index + 1 : index - 1;
    const target = document.getElementById(`otp${targetIndex}`) as HTMLInputElement;
    if (target) target.focus();
};


// Main typing handler
const onType = (e: KeyboardEvent, index: number) => {
    const key = e.key;
    if (otps.value.join('').length === 6 && key === 'Enter') {
        handerSubmit();
        return;

    };

    if (key === 'a' && previousKey.value === 'Meta') {
        isSelectAll.value = true;
        previousKey.value = '';
        return;
    }


    if ((key === 'Backspace' || key === 'Delete') && previousKey.value === 'Meta') {
        clearAllInput();
        previousKey.value = '';
        return;
    }

    if (key === 'Meta') {
        previousKey.value = key;
    } else {
        previousKey.value = '';
    }

    const target = e.target as HTMLInputElement;
    target.classList.remove('shake');

    // Handle number input
    if (allowedKeyNumbers.includes(key)) {
        target.value = key;
        otps.value[index] = key;
        if (index + 1 < 6) focusInput(index, 'next');
    } else if (!validKeys.includes(key)) {
        setTimeout(() => {
            target.classList.add('shake');
        }, 10);
    }

    // Handle Backspace/Delete logic
    if ((key === 'Backspace' || key === 'Delete') && index >= 0) {
        if (isSelectAll.value) {
            clearAllInput();
            return;
        }
        if (index == 0 && key === 'Backspace') {
            setTimeout(() => {
                target.classList.add('shake');
            }, 10);
        }

        if (otps.value[index] !== '') {
            e.preventDefault();
            target.value = '';
            otps.value[index] = '';
            return;
        }
        if (index - 1 >= 0) {
            const prevInput = document.getElementById(`otp${index - 1}`) as HTMLInputElement;
            prevInput?.focus();
            prevInput.value = '';
            otps.value[index - 1] = '';
        }
    }

    // Handle ArrowLeft/ArrowRight/Tab for navigation
    if (key === 'ArrowLeft' && index > 0) {
        focusInput(index, 'prev');
    }

    if ((key === 'ArrowRight' || key === 'Tab') && index < 5) {
        focusInput(index, 'next');
    }
};


// handler fille and callback to parent 

const handerSubmit = () => {
    //scan otp if any dont have value add shake class
    const remaining = otps.value.filter((otp) => otp === '');

    for (let i = 0; i < remaining.length; i++) {
        const target = document.getElementById(`otp${5 - i}`) as HTMLInputElement;
        if (target.value === '') {
            target.classList.add('shake');
            target.classList.add('invalid');
            setTimeout(() => {
                target.classList.remove('shake');
                target.classList.remove('invalid');
            }, 210);
        }


    }



    const otp = otps.value.join('');
    if (otp.length !== 6) {
        return;
    }
    // callback to parent
    emit('getOTP', otp);
};

// Clear all input fields
const clearAllInput = () => {
    otps.value = ['', '', '', '', '', ''];
    for (let i = 0; i < otps.value.length; i++) {
        const target = document.getElementById(`otp${i}`) as HTMLInputElement;
        target.value = '';
    }
    const firstInput = document.getElementById('otp0') as HTMLInputElement;
    firstInput?.focus();
};

// Handle paste event
const handlerPast = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text') || '';
    if (pastedData.length !== 6 || isNaN(Number(pastedData))) return;

    for (let i = 0; i < pastedData.length; i++) {
        const target = document.getElementById(`otp${i}`) as HTMLInputElement;
        target.value = pastedData[i];
        otps.value[i] = pastedData[i];
    }
};

//Prevent v and a key
const preventAndKey = (e: any, index: number) => {
    if (!e.target) return;
    if (!allowedKeyNumbers.includes(e.target.value)) {
        e.target.value = '';
        otps.value[index] = '';
    }
};



</script>

<template>
    <div class="w-auto h-auto flex items-center gap-2">
        <input v-for="(index) in Array.from({ length: 6 }, (_, index) => index)" :key="'otp-' + index" type="text"
            inputmode="numeric" role="textbox" aria-label="OTP Digit"
            class="max-[385px]:size-[2rem] size-[2.5rem] sm:w-[3.125rem] sm:h-[3.125rem] rounded-lg border-[#DDDDDD] border text-center outline-none focus:border-[#5445f4]"
            :value="otps[index]" maxlength="1" :class="[
                otps[index] === '' ? '' : 'border-green-400',
                isSelectAll ? '!border-[#5445f4]' : ''
            ]" v-on:input="(e: Event) => preventAndKey(e, index)" @paste="handlerPast" @blur="isSelectAll = false"
            @keydown="(e) => {
                if (
                    e.key !== 'Backspace' &&
                    e.key !== 'Delete' &&
                    e.key !== 'Meta' &&
                    e.key !== 'v' &&
                    e.key !== 'a'
                ) {
                    e.preventDefault();
                }
                onType(e, index);
            }" :id="'otp' + index" />
        <div class="max-[385px]:size-[2rem] size-[2.5rem] sm:size-[3.125rem] rounded-lg bg-[#0075ff] opacity-85 justify-center items-center flex cursor-pointer"
            @click="handerSubmit">
            <NuxtImg src="/icons/arrowNext.svg" width="200" height="200" class="size-6 sm:size-8" />
        </div>
    </div>
</template>

<style lang="css" scoped>
.shake {
    animation: shaking 0.2s cubic-bezier(.36, .07, .19, .97) both;
    transform-origin: center center;
}

.invalid {
    border-color: oklch(0.704 0.191 22.216);
}

@keyframes shaking {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(10deg);
    }

    50% {
        transform: rotate(0deg);
    }

    75% {
        transform: rotate(-10deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>
