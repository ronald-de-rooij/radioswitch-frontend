import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    formatters: true,
    rules: {
      'n/prefer-global/process': 0,

      // Vue
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
    },
  },
  {
    ignores: ['presets'],
  },

  // Sort Tailwind classes
  [...tailwind.configs['flat/recommended']],
)
