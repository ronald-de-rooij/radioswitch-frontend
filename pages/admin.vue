<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})

const { apiFetch } = useAPI()
const title = ref('')
const imageUrl = ref('')
const streamUrl = ref('')
const userId = ref('')
const config = useRuntimeConfig()

function createStream() {
  apiFetch(`${config.public.BASE_URL}/streams`, {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      image_url: imageUrl.value,
      stream_url: streamUrl.value,
    }),
  })
}
</script>

<template>
  <div>
    <form @submit.prevent="createStream">
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
          Create Stream
        </Button>
      </div>
    </form>
  </div>
</template>
