import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintReactCompiler from 'eslint-plugin-react-compiler';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        plugins: {
            ts: tsEslint.plugin,
            'react-hooks': eslintReactHooks,
            react: pluginReact,
            'react-refresh': eslintReactRefresh,
            'react-compiler': eslintReactCompiler,
            prettier: prettierPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        rules: {
            ...eslintConfigPrettier.rules,
            ...prettierPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 0,
            '@typescript-eslint/no-explicit-any': 2,
            'react-compiler/react-compiler': 'error',
        },
    },
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
            },
            globals: {
                ...globals.browser,
                ...globals.es2022,
            },
        },
    },
    { ignores: ['node_modules', 'dist', 'coverage', 'eslint.config.js'] },

    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
];
