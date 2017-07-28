module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  plugins: [
    'ember'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/no-old-shims': 'error'
  }
};
