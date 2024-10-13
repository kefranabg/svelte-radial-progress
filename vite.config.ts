import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		// Jest like globals
		globals: true,
		environment: 'jsdom',
		// Extend jest-dom matchers
		setupFiles: ['./setupTest.js']
	}
});
