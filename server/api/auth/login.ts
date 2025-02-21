


export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const { email, password, remember }: {
    email: string
    password: string,
    remember: boolean,
  } = await readBody(event)

  // Send the login to the API
  try {
    const response = await fetch(`${runtimeConfig.apiUrl}/user/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        remember,
      }),
    })
    const { message, data } = await response.json()

    if (response.status !== 200) {
      event.node.res.statusCode = response.status
      event.node.res.statusMessage = message
      return
    } else {
      event.node.res.statusCode = 200
      setCookie(event, 'access_token', data.token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 3, sameSite: 'strict' });
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