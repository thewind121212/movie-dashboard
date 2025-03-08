import { HttpStatusCode } from "axios"
import { verifyAccessToken, refreshAccessToken, clearCookies } from "~/actions/auth.action"
import { useAuthState } from "~/composables/useAuthStore"






const excludeAuth = ['/login', '/register', '/forgot-password', '/reset-password']


export default defineNuxtRouteMiddleware(async (to) => {


    if (import.meta.server) {

        const access_token = useCookie('access_token', { secure: true, sameSite: 'strict', maxAge: 60 * 60 })
        const refresh_token = useCookie('refresh_token', { secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, httpOnly: true })

        const { setUserAuth, userAuthState } = useAuthState()
        const { isAuthenticated } = userAuthState.value


        try {
            if (!access_token.value) {
                throw new Error('Unauthorized Access Token Not Found')
            }


            // do validate access token 
            const response = await verifyAccessToken(access_token.value, useRuntimeConfig().apiUrl)
            const validateToken: {
                message: string,
                data: {
                    userId: string,
                    email: string
                }
            } = await response.json()




            if (response.status === HttpStatusCode.Accepted) {
                if (!isAuthenticated) {
                    setUserAuth(true, access_token.value, validateToken.data.email, validateToken.data.userId)
                }
                if (excludeAuth.includes(to.path)) {
                    return navigateTo('/')
                }
                return
            } else if (response.status === HttpStatusCode.Unauthorized) {
                //check the refresh token is exist
                if (!refresh_token.value) {
                    throw new Error('Unauthorized Refresh Token Not Found')
                }
                //do request refresh token
                const refreshTokenResponse = await refreshAccessToken(refresh_token.value, useRuntimeConfig().apiUrl)
                if (refreshTokenResponse.status !== HttpStatusCode.Created) {
                    throw new Error('Unauthorized Refresh Token Invalid')
                }

                const { data }: { data: { newAccessToken: string, email: string, userId: string } } = await refreshTokenResponse.json()


                //set new access token
                access_token.value = data.newAccessToken
                setUserAuth(true, data.newAccessToken, data.email, data.userId)
                //do validate access token
                if (excludeAuth.includes(to.path)) {
                    navigateTo('/')
                }
                return
            } else {
                throw new Error(validateToken.message)
            }
        } catch (errorMessage: any) {
            //clear the cookie
            clearCookies()
            if (!excludeAuth.includes(to.path)) {
                return navigateTo('/login')
            }

        }

    }
    if (import.meta.client) return

    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})