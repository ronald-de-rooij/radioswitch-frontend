<script setup lang="ts">
const props = defineProps<{
  streamUrl?: string
  autoPlay?: boolean
  icons?: boolean
}>()

const audioPlaying = ref(false)

const audioRef = ref<HTMLAudioElement | null>(null)
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
    console.log(newVal)
    if (!newVal) {
      audioRef.value?.pause()
      audioPlaying.value = false
    }
  },
  { immediate: true },
)

function toggleAudioPlaying() {
  if (audioPlaying.value)
    audioRef.value?.pause()
  else
    audioRef.value?.play()

  audioPlaying.value = !audioPlaying.value
}
</script>

<template>
  <audio ref="audioRef" controls class="w-full" :class="{ hidden: icons }" :src="streamUrl">
    Your browser does not support the audio tag.
  </audio>

  <Button
    v-if="icons"
    :icon="audioPlaying ? 'pi pi-pause' : 'pi pi-play'" rounded class="size-12 text-center text-xl bg-white text-sky-500" :pt="{
      icon: audioPlaying ? '' : 'ml-1',
    }"
    @click="toggleAudioPlaying"
  />
</template>
