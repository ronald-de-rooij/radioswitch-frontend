<script setup lang="ts">
import type { Stream, StreamResponse } from '~/models'

const { apiFetch } = useAPI()

const streams = ref<Stream[]>([])

onMounted(async () => {
  try {
    const { data } = await apiFetch<StreamResponse>('/streams')

    streams.value = data
  }
  catch (error) {
    console.error(error)
  }
})

const activeStream = ref<Stream | null>()

function isActiveStream(stream: Stream) {
  return activeStream.value?.stream_url === stream.stream_url
}
</script>

<template>
  <div class="w-full h-screen text-center py-8 bg-surface-ground">
    <h1
      class="bg-gradient-to-r from-teal-400 to-yellow-200 inline-block text-transparent bg-clip-text text-6xl font-bold"
    >
      RadioSwitch
    </h1>
    <AudioPlayer :stream-url="activeStream?.stream_url" />

    <h2 class="text-3xl font-bold my-8 text-white">
      <template v-if="activeStream">
        {{ activeStream.title }}
      </template>

      <template v-else>
        Select a stream to listen to
      </template>
    </h2>

    <a href="http://local.radioswit.ch/api/auth/google">GOOGLE</a>

    <div class="grid grid-cols-4 max-w-6xl mx-auto gap-4">
      <div
        v-for="stream in streams"
        :key="stream.id"
        class="max-w-md rounded-lg p-0.5 cursor-pointer animate-border bg-[length:200%_200%] hover:bg-gradient-to-r hover:from-teal-400 hover:to-yellow-200"
        @click="activeStream = stream"
      >
        <div
          class="bg-surface-card px-4 py-5 rounded-lg animate-background"
          :class="{ 'bg-gradient-to-r from-teal-400 to-yellow-200': isActiveStream(stream) }"
        >
          <p class="font-bold" :class="isActiveStream(stream) ? 'text-black' : 'text-white'">
            {{ stream.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
