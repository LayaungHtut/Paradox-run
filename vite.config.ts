import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import nodeAdapter from '@sveltejs/adapter-node';
import staticAdapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => {
	// .env files + real environment (real environment wins), same as import.meta.env sees
	const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env };
	const ANDROID = env.VITE_TARGET === 'android';
	const API_ORIGIN = env.VITE_API_URL ? new URL(env.VITE_API_URL).origin : '';

	return {
		plugins: [
			tailwindcss(),
			sveltekit({
				compilerOptions: {
					// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
					runes: ({ filename }) =>
						filename.split(/[/\\]/).includes('node_modules') ? undefined : true
				},

				// adapter-node: the leaderboard needs a long-lived server with a writable data directory
				// (see docs/ARCHITECTURE.md D6 and docs/DEPLOYMENT.md). VITE_STATIC_BUILD=1 builds a static
				// SPA instead (Netlify & co.): the game fully works, the online layer reports itself off.
				adapter: env.VITE_STATIC_BUILD ? staticAdapter({ fallback: 'index.html' }) : nodeAdapter(),

				// the Android app bundles every file locally, so it needs no offline cache
				serviceWorker: { register: !ANDROID },

				// Capacitor injects its bridge as an inline <script> into the page, which a hash-based CSP
				// would block, so the policy only applies to web builds
				csp: ANDROID
					? undefined
					: {
							mode: 'auto',
							directives: {
								'default-src': ['self'],
								'script-src': ['self'],
								'style-src': ['self', 'unsafe-inline'],
								'img-src': ['self', 'data:', 'blob:'],
								'font-src': ['self'],
								'connect-src': [
									'self',
									...(API_ORIGIN ? [API_ORIGIN as `https://${string}.${string}`] : [])
								],
								'worker-src': ['self'],
								'manifest-src': ['self'],
								'object-src': ['none'],
								'base-uri': ['self'],
								'form-action': ['self']
							}
						}
			})
		],
		test: {
			expect: { requireAssertions: true },
			projects: [
				{
					extends: './vite.config.ts',
					test: {
						name: 'client',
						browser: {
							enabled: true,
							provider: playwright(),
							// bind to IPv4 explicitly: on Windows "localhost" can resolve to ::1 and time out
							api: { host: '127.0.0.1' },
							instances: [{ browser: 'chromium', headless: true }]
						},
						include: [
							'src/**/*.svelte.{test,spec}.{js,ts}',
							'src/**/*.browser.{test,spec}.{js,ts}'
						],
						exclude: ['src/lib/server/**']
					}
				},

				{
					extends: './vite.config.ts',
					test: {
						name: 'server',
						environment: 'node',
						// level-solver specs replay whole months of runs; 5s default flakes when all files run in parallel
						testTimeout: 30_000,
						include: ['src/**/*.{test,spec}.{js,ts}'],
						exclude: ['src/**/*.svelte.{test,spec}.{js,ts}', 'src/**/*.browser.{test,spec}.{js,ts}']
					}
				}
			]
		}
	};
});
