import { storeToRefs } from 'pinia'
import type { UseFetchOptions } from '#app'
import { useUserStore } from '@/stores/user'

export function useApiClient() {
  const config = useRuntimeConfig()
  const { user } = storeToRefs(useUserStore())

  function apiClient<T>(url: string, options: UseFetchOptions<T> = {}): Promise<T> {
    const api = $fetch.create({
      baseURL: config.public.BASE_URL as string,

      onRequest({ options }) {
        const defaultOptions = {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          } as Record<string, string>,
        }

        if (user.value?.token) {
          defaultOptions.headers.Authorization = `Bearer ${user.value?.token}`
        }

        options.headers = Object.assign({}, defaultOptions.headers, options.headers)
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          navigateTo('/login')
        }
      },
    })
    return api(url, options)
  }

  return {
    apiClient,
  }
}
