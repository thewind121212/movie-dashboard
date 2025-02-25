
import { HttpStatusCode } from "axios"
import { fetchWithProtect } from "~/actions/auth.action"




export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()




    try {


        const cookies = parseCookies(event)

        const result = await fetchWithProtect(
            event,
            cookies.refresh_token,
            async () => {
                return await fetch(`${runtimeConfig.apiUrl}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${cookies.access_token}`
                    },
                })
            },
        )

        if (!result.isAuthorized) {
            event.node.res.statusCode = HttpStatusCode.Unauthorized
            return {
                message: 'Unauthorized'
            }
        }

        const { message } = await result.res.json()


        return message
    } catch (error: any) {
        return 'error'
    }

})