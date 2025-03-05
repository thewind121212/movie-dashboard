import { HttpStatusCode } from "axios";




const cachedFunction = defineCachedFunction(async () => {
    const countries = await $fetch('https://restcountries.com/v3.1/all')
    const timezones = await $fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=7GIMV3FRPN65&format=json')
    return {
        countries,
        timezones
    }
}, {
    maxAge: 3600 * 24
});


export default defineEventHandler(async (event) => {

    try {

        const geoData = await cachedFunction()

        if (geoData) {
            event.node.res.statusCode = HttpStatusCode.Ok
            return {
                countries: geoData.countries,
                timezones: geoData.timezones
            }
        }

        event.node.res.statusCode = HttpStatusCode.InternalServerError
        return {
            message: 'Internal Server Error'
        }

    } catch (error: any) {
        event.node.res.statusCode = HttpStatusCode.InternalServerError
        return {
            message: 'Internal Server Error'
        }

    }

})
