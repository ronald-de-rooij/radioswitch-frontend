export interface Stream {
  description: string
  id: string
  imageUrl: string
  streamUrl: string
  title: string
}

export interface StreamCreate {
  description?: string
  image_url?: string
  stream_url: string
  title: string
}

export interface StreamResponse {
  data: Stream[]
}
