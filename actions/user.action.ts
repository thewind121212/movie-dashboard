import { HttpStatusCode } from "axios"
import type { GetAllUserResponse } from "~/server/api/user/getAll"



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



export const uploadAvatar = async (formData: FormData) => {

    try {
        const response = await $fetch(`/api/user/uploadAvatar`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })



        pushSuccessToast('updated avatar successfully!')

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


export const getAllUser = async (): Promise<GetAllUserResponse | null> => {

    try {
        const data =  await $fetch('/api/user/getAll',
            {
                method: 'GET',
                credentials: 'include',
            }
        )


        return data
    } catch (error: any) {
        if (error.statusCode === HttpStatusCode.Unauthorized) {
            navigateTo('/login')
            setTimeout(() => {
                pushErrorToast('Unauthorized Access')
            }
                , 300)
            return null
        } else {
            pushErrorToast(getErrorMessage(error))
            return null
        }

    }

}