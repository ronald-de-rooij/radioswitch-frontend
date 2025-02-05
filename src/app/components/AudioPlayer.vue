<template>
  <audio
    ref="audioRef"
    controls
    class="w-full"
    :class="{ hidden: icons }"
    :src="streamUrl"
  >
    Your browser does not support the audio tag.
  </audio>

  <div class="flex items-center justify-center">
    <template
      v-if="icons"
    >
      <Button
        :icon="audioPlaying ? 'pi pi-pause' : 'pi pi-play'"
        rounded
        class="!size-10 bg-white text-center text-xl text-sky-500 hover:bg-sky-700 hover:text-white"
        :pt="{
          icon: audioPlaying ? '' : 'ml-1',
        }"
        @click="toggleAudioPlaying"
      />

      <Slider
        v-model="volume"
        class="ml-4 w-32"
        @change="updateVolume"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  streamUrl?: string
  autoPlay?: boolean
  icons?: boolean
}>()

const audioPlaying = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)
const volume = ref(100)

watch(
  () => props.streamUrl,
  (newVal) => {
    if (newVal && props.autoPlay) {
      audioRef.value?.pause()
      audioRef.value?.load()
      setTimeout(() => {
        audioPlaying.value = true
        audioRef.value?.play()
      }, 1000)
    }

    if (!newVal) {
      audioRef.value?.pause()
      audioPlaying.value = false
    }
  },
  { immediate: true },
)

function toggleAudioPlaying() {
  if (audioPlaying.value) {
    audioRef.value?.pause()
    audioPlaying.value = false
  }
  else {
    audioRef.value?.play()
    audioPlaying.value = true
  }
}

function updateVolume() {
  if (audioRef.value) {
    audioRef.value.volume = volume.value / 100
  }
}
</script>
