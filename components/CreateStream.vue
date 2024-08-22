<script lang="ts" setup>
const apiStream = useApiStream()

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
function submitForm() {
  apiStream.createStream({
    title: title.value,
    imageUrl: imageUrl.value,
    streamUrl: streamUrl.value,
    description: description.value,
  })
}
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Create Stream">
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-4">
        <!-- TODO: Create Input Component -->
        <CCTextField v-model="title" label="Title" name="title" required />
        <CCTextField v-model="imageUrl" label="Image URL" name="imageURL" required />
        <div>
          <CCTextField v-model="streamUrl" label="Stream URL" name="streamURL" required />
          <AudioPlayer v-if="streamUrl" :stream-url="streamUrl" class="mt-4" />
        </div>
        <div>
          <CCFormLabel label="Description" />
          <Textarea v-model="description" rows="5" cols="30" />
        </div>
        <!-- <CCTextField v-model="description" label="Description" name="description" required /> -->
      </div>

      <div class="flex justify-end gap-2 mt-8">
        <Button label="Cancel" severity="secondary" @click="visible = false" />
        <Button type="submit" label="Create" />
      </div>
    </form>
  </Dialog>
</template>
