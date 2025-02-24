
export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()

    try {


        const cookies = parseCookies(event)
        const response = await fetch(`${runtimeConfig.apiUrl}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'cookie': event.node.req.headers.cookie?.toString() || '',
                'Content-Type': 'application/json',
                'Authorization': `${cookies.access_token}`
            },
        })


        const { message } = await response.json()


        return message
    } catch (error: any) {
        return 'error'
    }

})