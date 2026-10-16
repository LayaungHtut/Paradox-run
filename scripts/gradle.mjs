/*
 * Runs an Android Gradle task (`node scripts/gradle.mjs bundleRelease`) with the right toolchain:
 * Capacitor 8 needs JDK 21+, and many machines have an older `java` first on PATH. Looks for a JDK
 * in JAVA_HOME, Android Studio's bundled JBR and ~/.jdks, and writes android/local.properties with
 * the SDK location when it is missing.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const win = process.platform === 'win32';
const task = process.argv.slice(2);
if (!task.length) {
	console.error('usage: node scripts/gradle.mjs <task...>');
	process.exit(2);
}

/** `java -version` prints to stderr; spawnSync captures both streams. */
function version(home) {
	const bin = join(home, 'bin', win ? 'java.exe' : 'java');
	if (!existsSync(bin)) return 0;
	const r = spawnSync(bin, ['-version'], { encoding: 'utf8' });
	const m = /version "(\d+)(?:\.(\d+))?/.exec(`${r.stderr}${r.stdout}`);
	if (!m) return 0;
	return m[1] === '1' ? Number(m[2]) : Number(m[1]);
}

function candidates() {
	const list = [];
	if (process.env.JAVA_HOME) list.push(process.env.JAVA_HOME);
	const studio = win
		? [
				'C:/Program Files/Android/Android Studio/jbr',
				join(process.env.LOCALAPPDATA ?? '', 'Programs/Android Studio/jbr')
			]
		: [
				'/Applications/Android Studio.app/Contents/jbr/Contents/Home',
				'/opt/android-studio/jbr',
				join(homedir(), 'android-studio/jbr')
			];
	list.push(...studio);
	for (const dir of [join(homedir(), '.jdks'), win ? 'C:/Program Files/Java' : '/usr/lib/jvm']) {
		try {
			for (const d of readdirSync(dir)) list.push(join(dir, d));
		} catch {
			/* not present */
		}
	}
	return list;
}

const jdk = candidates()
	.map((home) => ({ home, v: version(home) }))
	.filter((j) => j.v >= 21)
	.sort((a, b) => a.v - b.v)[0];
if (!jdk) {
	console.error(
		'No JDK 21+ found. Install Android Studio (bundles one) or set JAVA_HOME to a JDK 21+.'
	);
	process.exit(1);
}

const local = 'android/local.properties';
if (!existsSync(local)) {
	const sdk =
		process.env.ANDROID_HOME ||
		process.env.ANDROID_SDK_ROOT ||
		(win
			? join(process.env.LOCALAPPDATA ?? '', 'Android/Sdk')
			: join(homedir(), process.platform === 'darwin' ? 'Library/Android/sdk' : 'Android/Sdk'));
	if (!existsSync(sdk)) {
		console.error('Android SDK not found. Install Android Studio, or set ANDROID_HOME.');
		process.exit(1);
	}
	writeFileSync(local, `sdk.dir=${sdk.replace(/\\/g, '/')}\n`);
}

console.log(`Using JDK ${jdk.v} at ${jdk.home}`);
const r = spawnSync(join(process.cwd(), 'android', win ? 'gradlew.bat' : 'gradlew'), task, {
	cwd: 'android',
	stdio: 'inherit',
	shell: win,
	env: { ...process.env, JAVA_HOME: jdk.home }
});
process.exit(r.status ?? 1);
