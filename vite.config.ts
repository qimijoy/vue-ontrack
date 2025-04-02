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
	test: {
		reporters: ['verbose', 'json', 'junit', 'html'],
		outputFile: {
			json: 'test-reports/test-report.json',
			junit: 'test-reports/test-report.xml',
			html: 'test-reports/test-report.html',
		},
		coverage: {
			enabled: true,
			reporter: ['html', 'text'],
		},
	},
});
