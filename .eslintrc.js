module.exports = {
  extends: ['next', 'prettier', 'plugin:react/jsx-runtime'],
  plugins: ['unicorn'],
  rules: {
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all'
      }
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-uses-react': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase'
      }
    ]
  }
};
