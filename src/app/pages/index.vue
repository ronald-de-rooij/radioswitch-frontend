<template>
  <div class="h-screen w-full text-center">
    <AppHeader />

    <div class="mx-auto my-8 flex min-h-24 w-96 items-center rounded-full bg-sky-500 p-6 ">
      <AudioPlayer
        v-if="activeStream"
        :stream-url="activeStream?.streamUrl"
        auto-play
        icons
      />
      <h2 class="w-full text-xl font-bold text-white">
        <template v-if="activeStream">
          {{ activeStream.title }}
        </template>
        <template v-else>
          Select a stream to start listening
        </template>
      </h2>
    </div>

    <div class="mx-auto grid max-w-7xl grid-cols-4 gap-4 sm:px-4 lg:px-8">
      <div
        v-for="stream in streams"
        :key="stream.id"
        class="max-w-md cursor-pointer rounded-lg p-0.5"
        @click="activeStream = stream"
      >
        <button class="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-md p-0.5 font-bold">
          <span
            class="absolute size-full w-full bg-gradient-to-br from-primary via-primary-active-color to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-primary-active-color group-hover:to-primary"
          />
          <span
            class="duration-400 relative w-full rounded-md bg-gray-900 px-6 py-5 transition-all ease-out group-hover:bg-opacity-0"
            :class="{ 'bg-gradient-to-br from-primary via-primary-active-color to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-primary-active-color group-hover:to-primary': isActiveStream(stream) }"
          >
            <span class="relative text-white">
              {{ stream.title }}
            </span>
          </span>
        </button>
      </div>
    </div>

    <Button
      class="mt-8 rounded-lg bg-sky-500 px-4 py-2"
      @click="randomStation"
    >
      I'm feeling lucky (random)
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { Stream, StreamResponse } from '~/app/models'

const { apiClient } = useApiClient()

const streams = ref<Stream[]>([])

onMounted(async () => {
  try {
    const { data } = await apiClient<StreamResponse>('/streams')

    streams.value = data
  }
  catch (error) {
    console.error(error)
  }
})

const activeStream = ref<Stream | null>()

function isActiveStream(stream: Stream) {
  return activeStream.value?.streamUrl === stream.streamUrl
}

function randomStation() {
  const randomIndex = Math.floor(Math.random() * streams.value.length)
  activeStream.value = streams.value[randomIndex]
}
</script>
