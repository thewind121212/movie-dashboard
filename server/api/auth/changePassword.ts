

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

        const { userId, currentPassword, newPassword } = await readBody(event)



        const res = await fetch(`${runtimeConfig.apiUrl}/user/auth/changePassword`, {
            method: 'PUT',
            body: JSON.stringify({
                userId: userId,
                currentPassword: currentPassword,
                newPassword: newPassword,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data: {
            message: string
        } = await res.json()

        event.node.res.statusCode = res.status
        return {
            message: data.message,
            data: null
        }

    } catch (error: any) {
        return error
    }

})