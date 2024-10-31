<template>
  <header class="py-10">
    <div class="mx-auto flex max-w-7xl justify-between px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-white">
        Streams
      </h1>

      <Button @click="showCreateDialog = true">
        Create Stream <i class="pi pi-plus ml-2" />
      </Button>
    </div>
  </header>

  <CreateStream v-model:visible="showCreateDialog" />

  <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
    <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
      <Toast position="top-right" />

      <DataTable
        :value="streams"
        :table-style="{ 'min-width': '50rem' }"
      >
        <Column
          field="title"
          header="Title"
          sortable
        />
        <Column
          field="streamUrl"
          header="Stream"
        >
          <template #body="{ data: { streamUrl } }">
            <AudioPlayer :stream-url="streamUrl" />
          </template>
        </Column>
        <Column field="action">
          <template #body="{ data }">
            <div class="flex-end flex justify-end gap-4">
              <i
                v-tooltip.top="'Edit stream'"
                class="pi pi-pencil hover:cursor-pointer hover:text-primary-500"
                @click="editStream(data)"
              />
              <i
                v-tooltip.top="'Delete stream'"
                class="pi pi-trash hover:cursor-pointer hover:text-red-500"
                @click="deleteStream($event, data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>

      <ConfirmPopup />

      <Dialog
        v-model:visible="dialogVisible"
        modal
        header="Edit Stream"
      >
        <EditStream
          :stream="selectedStream"
          @update="updatedStream"
        />
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import type { Stream, StreamResponse } from '~/models'

const { apiClient } = useApiClient()
const apiStream = useApiStream()
const config = useRuntimeConfig()

const confirm = useConfirm()

definePageMeta({
  layout: 'admin',
})

const streams = ref<Stream[]>([])
onMounted(() => {
  getStreams()
})

const showCreateDialog = ref(false)

async function getStreams() {
  const response: StreamResponse = await apiClient(`${config.public.BASE_URL}/streams`)

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

const toast = useToast()

async function deleteStream(event: any, stream: Stream): Promise<void> {
  confirm.require({
    target: event.currentTarget,
    message: `Are you sure you want to delete ${stream.title}?`,
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600',
    acceptClass: '',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: async () => {
      const result = await apiStream.deleteStream(stream.id)

      if (result.success) {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: `${stream.title} has been deleted`,
        })

        await getStreams()
      }
    },
  })
}
</script>
