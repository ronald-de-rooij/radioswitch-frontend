<template>
  <Button label="Submit" />
  <Divider />
  <div class="card flex justify-center">
    <AutoComplete
      v-model="value"
      :suggestions="items"
      @complete="search"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const items = ref([])

function search(event) {
  items.value = [...Array.from({ length: 10 }).keys()].map(item => `${event.query}-${item}`)
}
</script>
