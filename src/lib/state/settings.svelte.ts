import { audio } from '$lib/game/audio/audio';
import { DEFAULT_KEYS, KEY_ACTIONS, KEY_SLOTS, type KeyBindings } from '$lib/game/input/input';
import { loadJson, saveJson } from './storage';

export interface SettingsData {
	sfx: number;
	music: number;
	screenShake: boolean;
	haptics: boolean;
	reducedEffects: boolean;
	showFps: boolean;
	muted: boolean;
	reducedFlashing: boolean;
	/** race your own fastest run as a gold ghost */
	bestGhost: boolean;
	keys: KeyBindings;
}

const DEFAULTS: SettingsData = {
	sfx: 0.8,
	music: 0.5,
	screenShake: true,
	haptics: true,
	reducedEffects: false,
	showFps: false,
	muted: false,
	reducedFlashing: false,
	bestGhost: true,
	keys: DEFAULT_KEYS
};
const VERSION = 1;

class Settings {
	data = $state<SettingsData>({ ...DEFAULTS });

	load(): void {
		const prefersReduced =
			typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
		const stored = loadJson<Partial<SettingsData>>('settings', VERSION, {});
		this.data = sanitize({ ...DEFAULTS, screenShake: !prefersReduced }, stored);
		this.applyAudio();
	}

	private applyAudio(): void {
		const m = this.data.muted ? 0 : 1;
		audio.setVolumes(this.data.sfx * m, this.data.music * m);
	}

	update(patch: Partial<SettingsData>): void {
		this.data = { ...this.data, ...patch };
		saveJson('settings', VERSION, this.data);
		this.applyAudio();
	}
}

export const settings = new Settings();

/** Take each stored field only if it has the right type (and range); otherwise keep the default. */
export function sanitize(defaults: SettingsData, stored: unknown): SettingsData {
	const out = { ...defaults };
	if (!stored || typeof stored !== 'object') return out;
	const s = stored as Record<string, unknown>;
	for (const key of Object.keys(defaults) as (keyof SettingsData)[]) {
		const v = s[key];
		const d = defaults[key];
		if (typeof d === 'number' && typeof v === 'number' && Number.isFinite(v))
			(out[key] as number) = Math.min(1, Math.max(0, v));
		else if (typeof d === 'boolean' && typeof v === 'boolean') (out[key] as boolean) = v;
	}
	out.keys = sanitizeKeys(defaults.keys, s.keys);
	return out;
}

/** Each action keeps up to KEY_SLOTS key codes; a code bound twice stays only on its first action. */
function sanitizeKeys(defaults: KeyBindings, stored: unknown): KeyBindings {
	if (!stored || typeof stored !== 'object') return defaults;
	const s = stored as Record<string, unknown>;
	const seen: string[] = [];
	const out = { ...defaults };
	for (const a of KEY_ACTIONS) {
		const v = s[a];
		if (!Array.isArray(v)) continue;
		out[a] = [];
		for (const c of v) {
			if (typeof c !== 'string' || !/^[A-Za-z0-9]{1,24}$/.test(c) || seen.includes(c)) continue;
			if (out[a].length === KEY_SLOTS) break;
			out[a].push(c);
			seen.push(c);
		}
	}
	return out;
}
