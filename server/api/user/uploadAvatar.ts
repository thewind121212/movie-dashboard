

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

        const multipartData = await readMultipartFormData(event)

        const formData = new FormData()
        // Create a FormData object for the fetch API
        multipartData?.forEach((value) => {
            if (value.name && value.data) {
                if ((value.name === 'file')) {
                    const blob = new Blob([value.data], { type: value.type });
                    const file = new File([blob], value.filename!, { type: value.type });
                    formData.append(value.name, file)
                } else {
                    formData.append(value.name, value.data.toString())
                }
            }
        })

        const res = await fetch(`${runtimeConfig.apiUrl}/user/uploadAvatar`, {
            method: 'POST',
            body: formData,
        })

        const data = await res.json()

        event.node.res.setHeader('Content-Type', 'application/json')


        return {
            message: data.message,
            data: null,
        }

    } catch (error: any) {
        return error
    }

})