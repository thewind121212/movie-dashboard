import { defineStore } from 'pinia'


interface State {
    isLoading: boolean
}

export const useAuthLoading = defineStore('authLoading', {
    state: (): State => {
        return {
            isLoading: false,
        }
    },
    actions: {
        setLoading(loading: boolean) {
            this.isLoading = loading
        }
    }
})