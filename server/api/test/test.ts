
import { HttpStatusCode } from "axios"
import { protectionGuard } from "~/actions/auth.action"




export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()




    try {


        const cookies = parseCookies(event)

        const result = await protectionGuard(
            event,
            cookies.access_token,
            cookies.refresh_token,
        )

        if (!result) {
            event.node.res.statusCode = HttpStatusCode.Unauthorized
            return {
                message: 'Unauthorized'
            }
        }


        return 'linh'
    } catch (error: any) {
        return 'error'
    }

})