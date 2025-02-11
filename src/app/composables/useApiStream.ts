import type { Stream, StreamCreate } from '~/app/models'

export function useApiStream() {
  const { apiClient } = useApiClient()
  const { toastAdd } = useToastPrime()

  interface Response {
    data: any
    message: string
    success: boolean
  }

  interface ApiResponse<T> {
    data?: T
    success?: boolean
    error?: boolean
  }

  async function createStream(stream: StreamCreate): Promise<ApiResponse<Stream>> {
    try {
      const response = await apiClient<Response>('/streams', {
        method: 'POST',
        body: JSON.stringify(stream),
      })

      if (!response.success && !response.data)
        throw new Error(response.message)

      return {
        data: response.data,
        success: true,
      }
    }
    catch (error) {
      return errorResponse(error)
    }
  }

  async function deleteStream(streamId: string): Promise<ApiResponse<void>> {
    try {
      await apiClient(`/streams/${streamId}`, {
        method: 'DELETE',
      })

      return {
        success: true,
      }
    }
    catch (error) {
      return errorResponse(error)
    }
  }

  function errorResponse(error: any): ApiResponse<any> {
    toastAdd({
      severity: 'error',
      summary: 'Error',
      detail: `Something went wrong ${error}`,
    })
    return {
      error,
    }
  }

  return {
    createStream,
    deleteStream,
  }
}
