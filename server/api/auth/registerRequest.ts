export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()

    const body : {
      email: string
    } = await readBody(event)

    // Send the request to the API
    try {

      const response = await $fetch(`${runtimeConfig.apiUrl}`)
      console.log(body.email)
      
    } catch (error) {
      
    }
    



    return 'ok' 

  })