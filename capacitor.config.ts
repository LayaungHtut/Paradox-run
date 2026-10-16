import type { CapacitorConfig } from '@capacitor/cli';

// Android shell around the static build (npm run android:build). Everything is bundled in the APK,
// so the game plays fully offline; leaderboards use VITE_API_URL when it was set at build time.
const config: CapacitorConfig = {
	appId: 'org.youths.paradoxrun',
	appName: 'Paradox Run',
	webDir: 'build',
	backgroundColor: '#070a12',
	android: {
		// release builds must not be debuggable over chrome://inspect
		webContentsDebuggingEnabled: false,
		allowMixedContent: false
	}
};

export default config;
