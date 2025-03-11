




import { HttpStatusCode } from "axios"
import { protectionGuard } from "~/actions/auth.action"




export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()

    try {


        const cookies = parseCookies(event)

        const protectResult = await protectionGuard(
            event,
            cookies.access_token,
            cookies.refresh_token,
        )



        if (!protectResult.isAuthorized) {
            event.node.res.statusCode = HttpStatusCode.Unauthorized
            return {
                message: 'Unauthorized Access'
            }
        }


        event.node.res.setHeader('Content-Type', 'application/json')

        const { userId, token, removeMethod } = await readBody(event)



        const res = await fetch(`${runtimeConfig.apiUrl}/user/auth/2FA/disableTOTP`, {
            method: 'POST',
            body: JSON.stringify({
                userId,
                token,
                removeMethod,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data: {
            message: string
            data: null
        } = await res.json()

        event.node.res.statusCode = res.status
        return {
            message: data.message,
        }

    } catch (error: any) {
        return error
    }

})