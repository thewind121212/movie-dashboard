


import { HttpStatusCode } from "axios"
import { protectionGuard } from "~/actions/auth.action"

export interface GetAllUserResponse {
    message: string
    data: {
        users: {
            id: string
            email: string
            name: string | null
            avatarUrl: string | null
            createdAt: string
            updatedAt: string
            timeZone: string | null
            country: string | null
            bio: string | null
        }[]
        total: number
    }
}


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


        const res = await fetch(`${runtimeConfig.apiUrl}/user/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data: GetAllUserResponse = await res.json()

        event.node.res.statusCode = res.status
        return {
            message: data.message,
            data: data.data
        }

    } catch (error: any) {
        return error
    }

})