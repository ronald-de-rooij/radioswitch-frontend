import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    formatters: true,
    files: ["app/**/*.{ts,vue}"],
    ignores: ["app/**/*.config.ts"],
    rules: {
      'n/prefer-global/process': 0,

      // Vue
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
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
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc' },
        },
      ],
    },
  },
  {
    ignores: ['presets'],
  },

  // Sort Tailwind classes
  [...tailwind.configs['flat/recommended']],
)
