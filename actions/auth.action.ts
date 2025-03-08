

import { HttpStatusCode } from "axios"
import { pushSuccessToast } from "../utils/toastNotification"
import { type EventHandlerRequest, H3Event, use } from 'h3'



export const sendRegisterRequest = async (email: string): Promise<boolean> => {
    try {
        await $fetch('/api/auth/registerRequest',
            {
                method: 'POST',
                body: {
                    email,
                }
            }
        )

        pushSuccessToast('Register request created successfully!')
        return true
    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return false
    }

}


export const register = async (email: string, token: string, name: string, password: string): Promise<boolean> => {
    try {
        await $fetch('/api/auth/register',
            {
                method: 'POST',
                credentials: 'include',
                body: {
                    email,
                    token,
                    name,
                    password
                }
            }
        )

        return true
    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return false
    }

}


export const logout = async (): Promise<boolean> => {
    try {
        await $fetch('/api/auth/logout',
            {
                method: 'POST',
                credentials: 'include',
            }
        )
        navigateTo('/login')
        setTimeout(() => {
            pushSuccessToast('Log out successfully!')
        }, 300)
        return true
    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return false
    }

}


export const login = async (email: string, password: string, remember: Boolean): Promise<{
    valid: boolean,
    isTwoFaEnabled?: boolean
    nonce?: string
}> => {
    try {
        const res: {
            token?: string, isTwoFaEnabled: boolean, nonce: string, data: {
                userId: string
            }
        } = await $fetch('/api/auth/login',
            {
                method: 'POST',
                body: {
                    email,
                    password,
                    remember
                }
            }
        )


        if (res && res.isTwoFaEnabled) {
            if (!res.nonce) {
                throw new Error('Nonce not found')
            }

            return {
                valid: true,
                isTwoFaEnabled: true,
                nonce: res.nonce
            }
        }

        useAuthState().setUserAuth(true, res.token!, email, res.data.userId)

        return {
            valid: true,
            isTwoFaEnabled: false
        }

    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return {
            valid: false,
        }
    }

}



export const forgotPassword = async (email: string): Promise<boolean> => {
    try {
        await $fetch('/api/auth/forgotPassword',
            {
                method: 'POST',
                body: {
                    email,
                }
            }
        )
        return true
    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return false
    }

}

export const forgotSubmit = async (token: string, password: string): Promise<boolean> => {
    try {
        await $fetch('/api/auth/forgotSubmit',
            {
                method: 'POST',
                body: {
                    token,
                    password
                }
            }
        )
        return true
    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return false
    }
}


export const loginWith2FaTOTP = async (token: string, email: string, nonce: string, remember: boolean): Promise<boolean> => {
    try {
        const res: {
            token: string, data: {
                userId: string
            }
        } = await $fetch('/api/auth/loginWith2FaTOTP',
            {
                method: 'POST',
                body: {
                    token,
                    email,
                    nonce,
                    remember
                }
            }
        )

        useAuthState().setUserAuth(true, res.token, email, res.data.userId)
        return true


    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return false
    }
}


export const verifyAccessToken = async (accessToken: string, url: string) => {
    const response = await fetch(`${url}/user/auth/token/verifyAccessToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`,
        },
        body: JSON.stringify({})
    })
    return response
}

export const refreshAccessToken = async (refreshToken: string, url: string) => {
    const response = await fetch(`${url}/user/auth/token/refreshAccessToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${refreshToken}`,
        },
        body: JSON.stringify({})
    })
    return response
}

export const clearCookies = () => {
    useCookie('access_token').value = null
    useCookie('refresh_token').value = null
}


export const handerAuthorizeDetect = (error: { statusCode: HttpStatusCode }) => {
    if (error.statusCode === HttpStatusCode.Unauthorized) {
        navigateTo('/login')
        setTimeout(() => {
            pushErrorToast('Unauthorized Access')
        }, 300)
    }
}



export const protectionGuard = async (event: H3Event<EventHandlerRequest>, access_token: string, refeshToken: string): Promise<{
    isAuthorized: boolean
    newAccessToken?: string
}> => {
    try {

        const verifyToken = (await verifyAccessToken(access_token, useRuntimeConfig().apiUrl))


        if (verifyToken.status !== HttpStatusCode.Accepted) {
            //try to refresh token
            if (!refeshToken) {
                throw new Error('Unauthorized')
            }
            const refeshTokenResponse = await refreshAccessToken(refeshToken, useRuntimeConfig().apiUrl)
            if (refeshTokenResponse.status !== HttpStatusCode.Created) {
                throw new Error('Unauthorized')
            }

            const { data }: { data: { newAccessToken: string } } = await refeshTokenResponse.json()
            //set new access token
            setCookie(event, 'access_token', data.newAccessToken, { secure: true, sameSite: 'strict', maxAge: 60 * 60 });
            //fetch again
            return {
                isAuthorized: true,
                newAccessToken: data.newAccessToken
            }

        }


        return {
            isAuthorized: true
        }

    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            deleteCookie(event, 'access_token')
            deleteCookie(event, 'refresh_token')
            return {
                isAuthorized: false
            }
        }
        return {
            isAuthorized: false
        }
    }
}


export const editUser = async (dto: { userId: string, name: string, birthDate: string, gender: string, country: string, timeZone: string, bio: string }): Promise<boolean> => {
    const { userId, name, birthDate, country, gender, timeZone, bio } = dto

    try {
        await $fetch('/api/user/editProfile',
            {
                method: 'PUT',
                credentials: 'include',
                body: {
                    userId,
                    name,
                    birthDate,
                    country,
                    gender,
                    timeZone,
                    bio
                }
            }
        )

        pushSuccessToast('Profile updated successfully!')

        return true
    } catch (error: any) {
        if (error.statusCode === HttpStatusCode.Unauthorized) {
            navigateTo('/login')
            setTimeout(() => {
                pushErrorToast('Unauthorized Access')
            }
                , 300)
            return false
        } else {
            pushErrorToast(getErrorMessage(error))
            return false
        }

    }

}
