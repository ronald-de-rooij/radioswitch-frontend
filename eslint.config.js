import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: { 'n/prefer-global/process': 0 },
})
