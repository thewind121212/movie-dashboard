
         
export const pushSuccessToast = (message: string) => {
         useNuxtApp().$toast.success(message, {
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
}

export const pushErrorToast = (message: string) => {
        useNuxtApp().$toast.error(message, {
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
    }


export const pushInfoToast = (message: string) => {
        useNuxtApp().$toast.error(message, {
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
    }