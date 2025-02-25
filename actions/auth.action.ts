

import { getErrorMessage } from "#imports"
import { pushSuccessToast } from "../utils/toastNotification"



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


export const login = async (email: string, password: string, remember: Boolean): Promise<{
    valid: boolean,
    isTwoFaEnabled?: boolean
    nonce?: string
}> => {
    try {
        const res: { token?: string, isTwoFaEnabled: boolean, nonce: string } = await $fetch('/api/auth/login',
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


        if (res && !remember && res.token) {
            sessionStorage.setItem('token', res.token)
        }


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
        const res : {token : string} = await $fetch('/api/auth/loginWith2FaTOTP',
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


        if (res && !remember && res.token) {
            sessionStorage.setItem('token', res.token)
        }


        return true


    } catch (error: any) {
        pushErrorToast(getErrorMessage(error))
        return false
    }
}