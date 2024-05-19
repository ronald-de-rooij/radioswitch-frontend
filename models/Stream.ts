export interface Stream {
  description: string
  id: string
  image_url: string
  stream_url: string
  title: string
}
export interface StreamResponse {
  data: Stream[]
}
