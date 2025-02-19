import { userRegisterTokenError } from '~/composables/useRegisterTokenError'

export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) {
        const { setValid } = userRegisterTokenError()
        const runtimeConfig = useRuntimeConfig()
        //this is a server side middleware for valide register token 
        if (!to.query.p) {
            return
        }
        try {
            const response = await fetch(`${runtimeConfig.apiUrl}/user/auth/registerRequest/vaildate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: to.query.p
                })
            })

            const validateToken = await response.json()

            if (response.status !== 200) {
                throw new Error(validateToken.message)
            }

            setValid(false, validateToken.message, validateToken.data.email)
        } catch (errorCatch: any) {
            setValid(true, errorCatch.message)
        }
        return
    }
    if (import.meta.client) return
    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})