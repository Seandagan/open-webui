import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
		APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build')
	},
	build: {
		sourcemap: false, // Disable sourcemaps for faster builds
		minify: 'esbuild', // Use esbuild for faster minification
		target: 'esnext', // Limit to modern JavaScript for faster transformation
		cacheDir: 'node_modules/.vite-cache', // Cache directory for faster builds
		outDir: 'build', // Output directory
		emptyOutDir: false, // Prevent emptying output directory every time for faster builds
		rollupOptions: {
			output: {
				manualChunks: {
					// Split vendor libraries for faster caching and incremental builds
					vendor: ['svelte', '@sveltejs/kit']
				}
			}
		}
	},
	optimizeDeps: {
		entries: ['./src/**/*.{js,ts,svelte}'], // Optimize dependency scanning paths
		esbuildOptions: {
			keepNames: true // Keeps function and class names for better caching
		}
	},
	ssr: {
		noExternal: ['@sveltejs/kit'] // Prevents SSR externalization for faster builds
	},
	worker: {
		format: 'es' // Ensures modern JavaScript syntax for worker builds
	},
	server: {
		hmr: {
			overlay: false // Disable the full-screen error overlay for faster dev refresh
		}
	}
});
