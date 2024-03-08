module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "vue/singleline-html-element-content-newline": 0,
    "tailwindcss/no-custom-classname": "off",
    curly: ["error", "multi-line", "consistent"],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "vue/script-setup-no-uses-vars": "off",
    "vue/max-attributes-per-line": "off",
  },
}
