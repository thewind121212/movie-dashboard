import { defineStore } from 'pinia'
import { set } from 'zod'


interface State {
    isShow: boolean
    type: 'ENABLE_TOTP' | 'NONE'
}

export const useModalStore = defineStore('modalDisplay', {
    state: (): State => {
        return {
            isShow: false,
            type: 'NONE'
        }
    },
    actions: {
        hideModal() {
            this.isShow = false
            this.type = 'NONE'
        },
        setModalType(type: 'ENABLE_TOTP' | 'NONE') {
            this.type = type
            this.isShow = true
        }
    }
})