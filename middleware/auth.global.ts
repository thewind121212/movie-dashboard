import { HttpStatusCode } from "axios"

const clearCookies = () => {
    useCookie('access_token').value = null
    useCookie('refresh_token').value = null
}

const verifyAccessToken = async (accessToken: string, tokenParam: string) => {
    const response = await fetch(`${useRuntimeConfig().apiUrl}/user/auth/token/verifyAccessToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`,
        },
        body: JSON.stringify({ token: tokenParam })
    })
    return response
}

const refreshAccessToken = async (refreshToken: string, tokenParam: string) => {
    const response = await fetch(`${useRuntimeConfig().apiUrl}/user/auth/token/refreshAccessToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${refreshToken}`,
        },
        body: JSON.stringify({ token: tokenParam })
    })
    return response
}


const excludeAuth = ['/login', '/register', '/forgot-password', '/reset-password']


export default defineNuxtRouteMiddleware(async (to) => {


    if (import.meta.server) {

        const access_token = useCookie('access_token', { secure: true, sameSite: 'strict', maxAge: 60 * 60 })
        const refresh_token = useCookie('refresh_token', { secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, httpOnly: true })

        try {
            if (!access_token.value) {
                throw new Error('Unauthorized Access Token Not Found')
            }

            // do validate access token 
            const response = await verifyAccessToken(access_token.value, to.query.p as string)
            const validateToken = await response.json()

            if (response.status === HttpStatusCode.Accepted) {
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
                const refreshTokenResponse = await refreshAccessToken(refresh_token.value, to.query.p as string)
                if (refreshTokenResponse.status !== HttpStatusCode.Created) {
                    throw new Error('Unauthorized Refresh Token Invalid')
                }


                const { data }: { data: { newAccessToken: string } } = await refreshTokenResponse.json()

                //set new access token
                access_token.value = data.newAccessToken

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