module.exports = {
  overrides: [
    {
      files: ['*.jsx', '*.js'],
    },
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'never'],
    'global-require': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-trailing-spaces': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
  },
}
