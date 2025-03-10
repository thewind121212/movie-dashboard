import { defineStore } from 'pinia'
import { set } from 'zod'


export type requestTOTPStep = 'INIT' | 'REQUEST' | 'RECOVERY_CODE' | 'VERIFY' | 'NONE'
interface State {
    step: requestTOTPStep
    recoveryCode: string[]
    serect: string
}

export const useRequestTotpStore = defineStore('totpRequest', {
    state: (): State => {
        return {
            step: "INIT",
            recoveryCode: [],
            serect: '',
        }
    },
    actions: {
        setStep(step: requestTOTPStep) {
            this.step = step
        },
        setRecoveryCode(recoveryCode: string[]) {
            this.recoveryCode = recoveryCode
        },
        setSerect(serect: string) {
            this.serect = serect
        }
    }
})