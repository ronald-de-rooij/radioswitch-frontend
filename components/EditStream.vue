<script lang="ts" setup>
import type { Stream } from '~/models'

const props = defineProps<{
  stream: Stream | null
}>()

const emit = defineEmits(['update'])
const { apiClient } = useApiClient()
const title = ref('')
const imageUrl = ref('')
const streamUrl = ref('')
const config = useRuntimeConfig()

onMounted(() => {
  if (props.stream) {
    title.value = props.stream.title
    imageUrl.value = props.stream.imageUrl
    streamUrl.value = props.stream.streamUrl
  }
})

async function updateStream() {
  try {
    await apiClient(`${config.public.BASE_URL}/streams/${props.stream?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title.value,
        imageUrl: imageUrl.value,
        streamUrl: streamUrl.value,
      }),
    })

    emit('update')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="updateStream">
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <label for="title">Title</label>
        <InputText id="title" v-model="title" type="text" aria-describedby="stream-title" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="image-url">Image URL</label>
        <InputText id="image-url" v-model="imageUrl" type="text" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="stream-url">Stream URL</label>
        <InputText id="stream-url" v-model="streamUrl" type="text" />
      </div>
      <div v-if="streamUrl" class="flex items-end">
        <AudioPlayer :stream-url="streamUrl" />
      </div>
    </div>

    <div class="flex justify-center mt-8">
      <Button type="submit">
        Update Stream
      </Button>
    </div>
  </form>
</template>
