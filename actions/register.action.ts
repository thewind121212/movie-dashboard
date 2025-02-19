
import { getErrorMessage } from "#imports"

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

        useNuxtApp().$toast.success('Register request created successfully!', {
            dangerouslyHTMLString: true,
            autoClose: 2000,
            progressStyle: {
                background: '#3AAA78',
            },
            toastStyle: {
                background: 'linear-gradient(90deg, hsla(150, 55%, 96%, 1) 0%, hsla(0, 0%, 100%, 1) 100%, hsla(0, 0%, 100%, 1) 100%)',
                FontFace: 'Shatoshi',
            },
        })

        return true

    } catch (error: any) {
        useNuxtApp().$toast.info(getErrorMessage(error), {
            dangerouslyHTMLString: true,
            autoClose: 2000,
            progressStyle: {
                background: '#F67280',
            },
            toastStyle: {
                background: 'linear-gradient(90deg, hsla(356, 100%, 97%, 1) 0%, hsla(0, 0%, 100%, 1) 100%, hsla(0, 0%, 100%, 1) 100%)',
                FontFace: 'Shatoshi',
            },
        })
        return false
    }

}