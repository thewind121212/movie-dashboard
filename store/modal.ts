import { defineStore } from 'pinia'


export type ModalType  = 'ENABLE_TOTP' | 'NONE' | 'REGISTER_TOTP'
interface State {
    isShow: boolean
    type: ModalType
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
        setModalType(type: ModalType) {
            this.type = type
            this.isShow = true
        }
    }
})