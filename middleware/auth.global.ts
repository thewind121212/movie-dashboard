import { HttpStatusCode } from "axios"




export default defineNuxtRouteMiddleware(async (to) => {

    const runtimeConfig = useRuntimeConfig()
    const exclude = ['/login', '/register', '/forgot-password', '/reset-password']

    if (import.meta.server) {
        if (exclude.includes(to.path)) return


        const access_token = useCookie('access_token', { secure: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 })
        const refresh_token = useCookie('refresh_token', { secure: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true })


        try {
            if (!access_token.value) {
                throw new Error('Unauthorized Access Token Not Found')
            }

            // do validate access token 
            const response = await fetch(`${runtimeConfig.apiUrl}/user/auth/token/verifyAccessToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${access_token.value}`
                },
                body: JSON.stringify({
                    token: to.query.p
                })
            })

            const validateToken = await response.json()

            if (response.status === HttpStatusCode.Accepted) {
                return
            } else if (response.status === HttpStatusCode.Unauthorized) {
                //check the refresh token is exist
                if (!refresh_token.value) {
                    throw new Error('Unauthorized Refresh Token Not Found')
                }

                //do request refresh token
                const refreshTokenResponse = await fetch(`${runtimeConfig.apiUrl}/user/auth/token/refreshAccessToken`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${refresh_token.value}`
                    },
                    body: JSON.stringify({
                        token: to.query.p
                    })
                })

                if (refreshTokenResponse.status !== HttpStatusCode.Created) {
                    throw new Error('Unauthorized Refresh Token Invalid')
                }

                const { data }: { data: { newAccessToken: string } } = await refreshTokenResponse.json()

                //set new access token
                access_token.value = data.newAccessToken
                return
            } else {
                throw new Error(validateToken.message)
            }
        } catch (errorMessage: any) {
            //clear the cookie
            access_token.value = ''
            refresh_token.value = ''
            return navigateTo('/login')
        }

    }
    if (import.meta.client) return
    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})