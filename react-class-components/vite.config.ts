/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        !process.env.VITEST &&
            remix({
                ignoredRouteFiles: ['**/*.css'],
            }),
        tsconfigPaths(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        env: loadEnv('test', process.cwd(), ''),
        setupFiles: ['./src/setupTests.ts'],
        coverage: {
            provider: 'v8',
            exclude: ['**/.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', 'dist'],
        },
    },
});
