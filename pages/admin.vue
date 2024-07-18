<script lang="ts" setup>
import type { Stream, StreamResponse } from '~/models'

const { apiFetch } = useAPI()
const config = useRuntimeConfig()

definePageMeta({
  layout: 'admin',
})

const streams = ref<Stream[]>([])
onMounted(() => {
  getStreams()
})

async function getStreams() {
  const response: StreamResponse = await apiFetch(`${config.public.BASE_URL}/streams`)

  streams.value = response.data
}

const dialogVisible = ref(false)
const selectedStream = ref<Stream | null>(null)
function editStream(stream: Stream): void {
  dialogVisible.value = true
  selectedStream.value = stream
}

function updatedStream() {
  dialogVisible.value = false
  getStreams()
}
</script>

<template>
  <DataTable :value="streams" table-style="min-width: 50rem">
    <Column field="title" header="Title" sortable />
    <Column field="stream_url" header="Stream">
      <template #body="{ data: { stream_url } }">
        <AudioPlayer :stream-url="stream_url" />
      </template>
    </Column>
    <Column field="action" header="">
      <template #body="{ data }">
        <i class="pi pi-pencil float-right hover:text-primary-500 hover:cursor-pointer" @click="editStream(data)" />
      </template>
    </Column>
  </DataTable>

  <Dialog v-model:visible="dialogVisible" modal header="Edit Stream">
    <EditStream :stream="selectedStream" @update="updatedStream" />
  </Dialog>
</template>
