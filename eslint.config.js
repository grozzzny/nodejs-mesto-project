const js = require('@eslint/js')
const ts = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const { FlatCompat } = require('@eslint/eslintrc')
const airbnbBase = require('eslint-config-airbnb-base')
const prettierPlugin = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

const compat = new FlatCompat()

module.exports = [
  js.configs.recommended,
  ...compat.config(airbnbBase),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier: prettierPlugin
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.js', '.json']
        }
      },
      'import/extensions': ['.js', '.ts']
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
      'no-console': 0,
      'import/prefer-default-export': 0,
      'no-underscore-dangle': ['error', { allow: ['_id'] }]
    }
  },
  prettierConfig
]
