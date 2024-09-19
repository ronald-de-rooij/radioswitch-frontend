<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Create Stream"
  >
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-4">
        <CCTextField
          v-model="title"
          label="Title"
          name="title"
          required
        />
        <CCTextField
          v-model="imageUrl"
          label="Image URL"
          name="imageURL"
        />
        <div>
          <CCTextField
            v-model="streamUrl"
            label="Stream URL"
            name="streamURL"
            required
            class="mb-4"
          />
          <AudioPlayer
            v-if="streamUrl"
            :stream-url="streamUrl"
          />
        </div>
        <div>
          <CCFormLabel label="Description" />
          <Textarea
            v-model="description"
            rows="5"
            cols="30"
            class="w-full"
          />
        </div>
        <!-- <CCTextField v-model="description" label="Description" name="description" required /> -->
      </div>

      <div class="mt-8 flex justify-end gap-2">
        <Button
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        />
        <Button
          type="submit"
          label="Create"
        />
      </div>
    </form>
  </Dialog>
</template>

<script lang="ts" setup>
const apiStream = useApiStream()
const { toastAdd } = useToastPrime()

const visible = defineModel<boolean>('visible', { required: true })

const title = ref('')
const imageUrl = ref('')
const streamUrl = ref('')
const description = ref('')

watch(visible, (value) => {
  if (value) {
    title.value = ''
    imageUrl.value = ''
    streamUrl.value = ''
    description.value = ''
  }
})

// TODO: Form validation
async function submitForm() {
  const response = await apiStream.createStream({
    title: title.value,
    image_url: imageUrl.value,
    stream_url: streamUrl.value,
    description: description.value,
  })

  if (response.error)
    return

  toastAdd({
    severity: 'success',
    summary: 'Stream created',
    detail: 'The stream has been created successfully',
  })
  visible.value = false
}
</script>
