


export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()

    const { token, email, nonce, remember }: {
        token: string
        email: string,
        nonce: boolean,
        remember: boolean,
    } = await readBody(event)
    

    // Send the login to the API
    try {
        const response = await fetch(`${runtimeConfig.apiUrl}/user/auth/2FA/verifyTOTP`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                token,
                nonce,
            }),
        })
        const { message, data } = await response.json()


        switch (response.status) {
            // if the login is with no two factor auth
            case 200:
                event.node.res.statusCode = 200
                if (remember) {
                    setCookie(event, 'access_token', data.token, { secure: true, maxAge: 60 * 60, sameSite: 'strict' });
                    setCookie(event, 'refresh_token', data.refreshToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7, sameSite: 'strict' });
                } else {
                    return {
                        message,
                        token: data.token
                    }
                }
                return {
                    message
                }
            // if the rest of the status code
            default:
                event.node.res.statusCode = response.status
                event.node.res.statusMessage = message
                return

        }



    } catch (error: any) {
        console.error('Internal BE Server Error:', error)
        event.node.res.statusCode = 500
        event.node.res.statusMessage = 'Internal Server Error'
        return
    }

})