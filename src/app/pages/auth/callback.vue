<template>
  <div />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'

const { user } = storeToRefs(useUserStore())
const route = useRoute()

const { apiClient } = useApiClient()

try {
  user.value.token = route.query.token
  const response: any = await apiClient('/user')
  user.value = response
  user.value.token = route.query.token

  window.close()
}
catch (error) {
  console.error(error)
}
</script>
