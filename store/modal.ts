import { defineStore } from 'pinia'


export type ModalType = 'ENABLE_TOTP' | 'NONE' | 'REGISTER_TOTP' | 'LOGOUT' | 'SETTINGS'
interface State {
    isShow: boolean
    type: ModalType
    content?: string
    header?: string
}

export const useModalStore = defineStore('modalDisplay', {
    state: (): State => {
        return {
            isShow: false,
            type: 'NONE',
            header: '',
            content: '',
        }
    },
    actions: {
        hideModal() {
            this.isShow = false
            this.type = 'NONE'
            this.header = ''
            this.content = ''
        },
        setModalType(type: ModalType, header?: string, content?: string) {
            this.type = type
            this.isShow = true
            this.header = header || ''
            this.content = content || ''
        },
    }
})