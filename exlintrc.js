module.exports = {
   parser: '@typescript-eslint/parser',
   extends: [
     'plugin:react/recommended',
     'plugin:@typescript-eslint/recommended',
   ],
   parserOptions: {
     ecmaVersion: 2020,
     sourceType: 'module',
     ecmaFeatures: {
       jsx: true,
     },
   },
   rules: {},
   settings: {
     react: {
       version: 'detect',
     },
   },
 };
 