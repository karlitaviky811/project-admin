module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: 'vuetify',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "comma-dangle": ["error", "never"],
    "linebreak-style": "off",
    "vue/max-attributes-per-line": "off"
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
