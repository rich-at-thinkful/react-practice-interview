module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "quotes": 0,
    "implicit-arrow-linebreak": 0,
    "function-paren-newline": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-wrap-multilines": 0,
    "react/jsx-one-expression-per-line": 0,
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "object-curly-newline": 0,
    "no-unused-vars": 1,
    "array-bracket-spacing": 0,
    "arrow-parens": 0,
    "comma-dangle": 0,
    "quote-props": 0,
  },
};
