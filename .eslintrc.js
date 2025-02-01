module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint-config-airbnb-base",
    "eslint-config-prettier"
  ],
  plugins: [
    "eslint-plugin-prettier"
  ],

  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
  },
};
