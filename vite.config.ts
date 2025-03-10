import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { BASE_URL } from './config';

export default defineConfig({
	base: BASE_URL,
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@config': fileURLToPath(new URL('./config', import.meta.url)),
		},
	},
});
