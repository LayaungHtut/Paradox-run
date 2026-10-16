/**
 * Versioned localStorage wrapper. Every read is defensive: storage can be unavailable (private
 * mode, quota, disabled) and stored data can be from an older schema — the game must still start.
 */
const PREFIX = 'paradox-run:';

export function loadJson<T>(key: string, version: number, fallback: T): T {
	try {
		const raw = localStorage.getItem(PREFIX + key);
		if (!raw) return fallback;
		const parsed = JSON.parse(raw) as { v: number; data: T };
		if (parsed?.v !== version || parsed.data === undefined) return fallback;
		return parsed.data;
	} catch {
		return fallback;
	}
}

export function saveJson<T>(key: string, version: number, data: T): boolean {
	try {
		localStorage.setItem(PREFIX + key, JSON.stringify({ v: version, data }));
		return true;
	} catch {
		return false;
	}
}

/*
 * Save backup: every game key (profile, progress, settings) packed into one copy-pasteable code, so
 * players can move to a new device or survive clearing browser data. The pending-submission queue is
 * left out on purpose: those runs belong to the old device's session.
 */
const BACKUP_KEYS = ['profile', 'progress', 'settings'];
const BACKUP_TAG = 'PRX1:';

const toBase64 = (s: string) => {
	let bin = '';
	for (const b of new TextEncoder().encode(s)) bin += String.fromCharCode(b);
	return btoa(bin);
};
const fromBase64 = (s: string) =>
	new TextDecoder().decode(Uint8Array.from(atob(s), (c) => c.charCodeAt(0)));

export function exportBackup(): string {
	const out: Record<string, unknown> = {};
	for (const k of BACKUP_KEYS) {
		try {
			const raw = localStorage.getItem(PREFIX + k);
			if (raw) out[k] = JSON.parse(raw);
		} catch {
			/* skip unreadable keys */
		}
	}
	return BACKUP_TAG + toBase64(JSON.stringify(out));
}

/**
 * Restore a code from exportBackup. Only shape is checked here: each stored blob is sanitised field by
 * field when the game loads it, so the caller should reload the page after a successful import.
 */
export function importBackup(code: string): boolean {
	try {
		const clean = code.trim().replace(/\s+/g, '');
		if (!clean.startsWith(BACKUP_TAG)) return false;
		const data = JSON.parse(fromBase64(clean.slice(BACKUP_TAG.length))) as Record<string, unknown>;
		const entries = BACKUP_KEYS.filter((k) => k in data).map((k) => [k, data[k]] as const);
		const valid = (b: unknown) =>
			!!b && typeof b === 'object' && typeof (b as { v?: unknown }).v === 'number';
		if (!entries.some(([k]) => k === 'progress') || !entries.every(([, b]) => valid(b)))
			return false;
		for (const [k, b] of entries) localStorage.setItem(PREFIX + k, JSON.stringify(b));
		return true;
	} catch {
		return false;
	}
}
