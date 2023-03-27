module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:json/recommended'],
  overrides: [],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    requireConfigFile: false,
  },
  rules: {
    'comma-dangle': 0,
    semi: 0,
  },
};
