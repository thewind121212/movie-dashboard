export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const body: {
    email: string
  } = await readBody(event)

  // Send the request to the API
  try {

    const response = await fetch(`${runtimeConfig.apiUrl}/user/auth/registerRequest/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
      }),
    })
    const { message } = await response.json()

    if (response.status !== 201) {
      event.node.res.statusCode = response.status
      event.node.res.statusMessage = message
      return
    } else {
      event.node.res.statusCode = 201
      return {
        message
      }
    }

  } catch (error: any) {
    console.error('Internal BE Server Error:', error)
    event.node.res.statusCode = 500
    event.node.res.statusMessage = 'Internal Server Error'
    return
  }

})