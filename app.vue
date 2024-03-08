<template>
  <div class="w-full h-screen text-center py-8 bg-zinc-950">
    <h1
      class="bg-gradient-to-r from-teal-400 to-yellow-200 inline-block text-transparent bg-clip-text text-6xl font-bold"
    >
      RadioSwitch
    </h1>
    <AudioPlayer :stream-url="activeStream?.streamUrl" />

    <h2 class="text-3xl font-bold my-8">
      <template v-if="activeStream">
        {{ activeStream.title }}
      </template>

      <template v-else> Select a stream to listen to </template>
    </h2>

    <div class="grid grid-cols-4 max-w-6xl mx-auto gap-4">
      <div
        v-for="stream in streams"
        :key="stream.id"
        class="max-w-md rounded-lg p-0.5 cursor-pointer animate-border bg-[length:200%_200%]"
        :class="
          activeStream?.streamUrl === stream.streamUrl
            ? 'bg-gradient-to-r from-teal-400 to-yellow-200'
            : 'hover:bg-gradient-to-r hover:from-teal-400 hover:to-yellow-200'
        "
        @click="activeStream = stream"
      >
        <div class="bg-zinc-900 px-4 py-5 rounded-lg">
          {{ stream.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Response, Stream, StreamResponse } from "~/models"
  const { customFetch } = useCustomFetch()

  const streams = ref<Stream[]>([])

  onMounted(async () => {
    const { data } = await customFetch("/streams")
    const response = data as Response

    streams.value = response.value.data.map((stream: StreamResponse) => {
      return {
        description: stream.description,
        id: stream.id,
        imageUrl: stream.image_url,
        streamUrl: stream.stream_url,
        title: stream.title,
      }
    })
  })

  const activeStream = ref<Stream | null>()
</script>
