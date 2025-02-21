


export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()

    const { password, token }: {
        password: string,
        token: boolean,
    } = await readBody(event)

    // Send the forgot submit to the API
    try {
        const response = await fetch(`${runtimeConfig.apiUrl}/user/auth/forgot/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                token,
            }),
        })
        const { message} = await response.json()

        if (response.status !== 200) {
            event.node.res.statusCode = response.status
            event.node.res.statusMessage = message
            return
        } else {
            event.node.res.statusCode = 200
            return {
                message
            }
        }

    } catch (error: any) {
        console.error('Internal BE Server Error:', error)
        event.node.res.statusCode = 500
        event.node.res.statusMessage = 'Internal Server Error'
        return
    }

})