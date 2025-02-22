<script setup lang="ts">
import { ref } from 'vue';

const otps = ref<string[]>(['', '', '', '', '', '']);
const isSelectAll = ref<boolean>(false);
const previousKey = ref<string>('');

const allowedKeyNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const validKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', 'Meta'];

// Helper function to focus the next or previous input
const focusInput = (index: number, direction: 'next' | 'prev') => {
    const targetIndex = direction === 'next' ? index + 1 : index - 1;
    const target = document.getElementById(`otp${targetIndex}`) as HTMLInputElement;
    if (target) target.focus();
};

// Main typing handler
const onType = (e: KeyboardEvent, index: number) => {
    const key = e.key;

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
const preventVAndA = (e: any, index: number) => {
    if (!e.target) return;
    if (!allowedKeyNumbers.includes(e.target.value)) {
        e.target.value = '';
        otps.value[index] = '';
    }
};



</script>

<template>
    <div class="w-full h-auto flex justify-start items-center gap-2">
        <input v-for="(index) in Array.from({ length: 6 }, (_, index) => index)" :key="'otp-' + index" type="text"
            inputmode="numeric" role="textbox" aria-label="OTP Digit"
            class="w-[50px] h-[50px] rounded-lg border-[#DDDDDD] border text-center outline-none focus:border-[#5445f4]"
            :value="otps[index]" maxlength="1" :class="[
                otps[index] === '' ? '' : 'border-green-400',
                isSelectAll ? '!border-[#5445f4]' : ''
            ]" v-on:input="(e: Event) => preventVAndA(e, index)" @paste="handlerPast" @blur="isSelectAll = false"
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
    </div>
</template>

<style lang="css" scoped>
.shake {
    animation: shaking 0.2s cubic-bezier(.36, .07, .19, .97) both;
    transform-origin: center center;
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
