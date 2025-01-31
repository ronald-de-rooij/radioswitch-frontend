<template>
  <form @submit.prevent="updateStream">
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <label for="title">Title</label>
        <InputText
          id="title"
          v-model="title"
          type="text"
          aria-describedby="stream-title"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="image-url">Image URL</label>
        <InputText
          id="image-url"
          v-model="imageUrl"
          type="text"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="stream-url">Stream URL</label>
        <InputText
          id="stream-url"
          v-model="streamUrl"
          type="text"
        />
      </div>
      <div
        v-if="streamUrl"
        class="mt-2 flex items-end"
      >
        <AudioPlayer :stream-url="streamUrl" />
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <Button type="submit">
        Update Stream
      </Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Stream } from '~/app/models'

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
        image_url: imageUrl.value,
        stream_url: streamUrl.value,
      }),
    })

    emit('update')
  }
  catch (error) {
    console.error(error)
  }
}
</script>
