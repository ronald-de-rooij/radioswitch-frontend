<script setup lang="ts">
const props = defineProps<{
  streamUrl?: string
  autoPlay?: boolean
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
watch(
  () => props.streamUrl,
  (newVal) => {
    if (newVal && props.autoPlay) {
      audioRef.value?.pause()
      audioRef.value?.load()
      setTimeout(() => {
        audioRef.value?.play()
      }, 1000)
    }
  },
)
</script>

<template>
  <div class="w-72">
    <audio ref="audioRef" controls class="w-full" :src="streamUrl">
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>
