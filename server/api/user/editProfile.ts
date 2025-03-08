

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

        const { userId, name, birthDate, gender, country, timeZone, bio } = await readBody(event)



        const res = await fetch(`${runtimeConfig.apiUrl}/user/editUser`, {
            method: 'PUT',
            body: JSON.stringify({
                userId,
                name,
                birthDate,
                gender,
                country,
                timeZone,
                bio
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data: {
            message: string
            data?: {} | null
        } = await res.json()


        if (res.status !== 200) {
            event.node.res.statusCode = res.status
            return {
                message: data.message
            }
        }

        event.node.res.statusCode = res.status
        return {
            message: data.message,
            data: data.data
        }

    } catch (error: any) {
        console.log(error)
        return error
    }

})