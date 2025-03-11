


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

        const { email, password } = await readBody(event)



        const res = await fetch(`${runtimeConfig.apiUrl}/user/auth/2FA/requestEnableTOTP`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data: {
            message: string
            data: {
                recoveryCodes: string[],
                serect: string,
                qrCodeImageURL: string
            }
        } = await res.json()

        event.node.res.statusCode = res.status
        return {
            message: data.message,
            data: data.data
        }

    } catch (error: any) {
        return error
    }

})