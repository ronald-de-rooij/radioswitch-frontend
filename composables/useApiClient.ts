import { defu } from 'defu'

export function useApiClient() {
  const config = useRuntimeConfig()
  // const { user } = storeToRefs(useUserStore())

  function apiClient<T>(url: string, options = {}): Promise<T> {
    const api = $fetch.create({
      baseURL: config.public.BASE_URL as string,

      onRequest({ options }) {
        const defaultOptions = {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          } as Record<string, string>,
        }

        // if (user.value?.token)
        //   defaultOptions.headers.Authorization = `Bearer ${user.value?.token}`

        const params = defu(options, defaultOptions)

        Object.assign(options, params)
      },
      onResponseError({ response }) {
        if (response.status === 401)
          return navigateTo('/login')
      },
    })
    return api(url, options)
  }


  return {
    apiClient,
  }
}
