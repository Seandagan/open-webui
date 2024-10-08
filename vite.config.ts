//vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
export default defineConfig({
	plugins: [sveltekit()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
		APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build')
	},
	build: {
		sourcemap: true,
		// Cache directory for faster builds
		cacheDir: 'node_modules/.vite-cache',
		// Specify the same directory for build output (if you have one in mind)
		outDir: 'build' // Set this to your preferred build output directory
	},
	worker: {
		format: 'es'
	}
});
