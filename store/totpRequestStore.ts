import { defineStore } from 'pinia'
import { set } from 'zod'


export type requestTOTPStep = 'INIT' | 'REQUEST' | 'RECOVERY_CODE' | 'VERIFY' | 'NONE'
interface State {
    step: requestTOTPStep
    recoveryCode: string[]
    serect: string
    qrImagebase64: string
}

export const useRequestTotpStore = defineStore('totpRequest', {
    state: (): State => {
        return {
            step: "INIT",
            recoveryCode: [],
            serect: '',
        qrImagebase64: ''
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
        },
        setQrImagebase64(qrImagebase64: string) {
            this.qrImagebase64 = qrImagebase64
        },
        clearAllInfo() {
            this.step = 'INIT'
            this.recoveryCode = []
            this.serect = ''
            this.qrImagebase64 = ''
        }
    }
})