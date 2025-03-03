

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
            event.node.res.statusCode = HttpStatusCode.Ok
            return {
                message: 'Logout Successfully'
            }
        }

        const newAccessToken = protectResult.newAccessToken ? protectResult.newAccessToken : cookies.access_token

        deleteCookie(event, 'access_token')
        deleteCookie(event, 'refresh_token')
        event.node.res.setHeader('Content-Type', 'application/json')


        const res = await fetch(`${runtimeConfig.apiUrl}/user/auth/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${newAccessToken}`,
            },
        })

        const data = await res.json()
        if (res.status === HttpStatusCode.Ok) {
            event.node.res.statusCode = res.status
            return {
                message: data
            }
        }


        event.node.res.statusCode = res.status
        return {
            message: data.message
        }

    } catch (error: any) {
        return error
    }

})