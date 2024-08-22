<script lang="ts" setup>
type InputType = 'text' | 'email' | 'password'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    error?: string
    disabled?: boolean
    type?: InputType
    autocomplete?: string
    required?: boolean
    autofocus?: boolean
  }>(),
  {
    type: 'text',
  },
)

const modelValue = defineModel<string | undefined>()
const labelWithRequired = computed(() => {
  if (props.required)
    return `${props.label} *`
  return props.label
})
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <CCFormLabel :label="labelWithRequired" :name="name" />
    <InputText
      v-if="type === 'text' || type === 'email'"
      :id="name"
      v-model="modelValue"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :invalid="error !== undefined"
      :name="name"
      :required="required"
      :type="type"
      :autofocus="autofocus"
    />
    <Password
      v-else-if="type === 'password'"
      :id="name"
      v-model="modelValue"
      :feedback="false"
      :invalid="error !== undefined"
      :autofocus="autofocus"
      :name="name"
      :pt="{
        input: {
          root: {
            class: 'w-full',
            autocomplete,
          },
        },
      }"
      :pt-options="{ mergeProps: true }"
      :required="required"
      class="w-full"
      toggle-mask
    />
    <CCFormError :error="error" />
  </div>
</template>
