<template>
  <div class="h-screen w-full text-center">
    <AppHeader />

    <div class="mx-auto my-8 flex w-96 items-center rounded-full bg-sky-500 p-6">
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

    <!-- <a href="https://api.radio-switch.nl/auth/google" class="text-white">GOOGLE</a> -->
    <span
      class="text-white"
      @click="windowOpen()"
    >
      GOOGLE {{ user?.email }}
    </span>

    <span class="text-white">{{ user }}</span>

    <div class="mx-auto grid max-w-7xl grid-cols-4 gap-4 sm:px-4 lg:px-8">
      <div
        v-for="stream in streams"
        :key="stream.id"
        class="max-w-md cursor-pointer rounded-lg p-0.5"
        @click="activeStream = stream"
      >
        <div
          class="rounded-lg border-2 border-transparent bg-surface-card p-2 px-4 py-5 hover:border-sky-400"
          :class="{ '!border-sky-400': isActiveStream(stream) }"
        >
          <p class="font-bold text-white">
            {{ stream.title }}
          </p>
        </div>
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
import type { Stream, StreamResponse } from '~/models'

const { apiClient } = useApiClient()
const { user } = storeToRefs(useUserStore())

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

function windowOpen() {
  window.open('http://api.local.radio-switch.nl/auth/google', 'targetWindow', `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=SomeSize,
                                    height=SomeSize`)
}
</script>
