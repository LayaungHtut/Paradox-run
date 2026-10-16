/*
 * Build-time deployment settings. All come from VITE_* env vars (see .env.example) so the same code
 * ships as a Node server, a static site, or the bundled Android app.
 */

const trimSlash = (s: string | undefined) => (s ?? '').trim().replace(/\/+$/, '');

/** Static builds (VITE_STATIC_BUILD) ship without their own /api server. */
export const STATIC_BUILD = !!import.meta.env.VITE_STATIC_BUILD;

/**
 * Absolute origin of a leaderboard server, e.g. https://paradoxrun.fly.dev. Empty = same origin.
 * Lets a static site or the Android app use a Node server hosted elsewhere (the server sends CORS).
 */
export const API_BASE = trimSlash(import.meta.env.VITE_API_URL);

/** Online features exist when this build has its own server or points at one. */
export const ONLINE_ENABLED = !STATIC_BUILD || API_BASE !== '';

/** Built for the Capacitor Android shell (VITE_TARGET=android). */
export const NATIVE_APP = import.meta.env.VITE_TARGET === 'android';

/**
 * Public web address used in share links. Inside the Android app location.origin is
 * https://localhost, which nobody else can open, so fall back to the leaderboard server (which also
 * serves the web game).
 */
export function publicUrl(): string {
	const configured = trimSlash(import.meta.env.VITE_PUBLIC_URL) || (NATIVE_APP ? API_BASE : '');
	return configured || location.origin;
}

/** Shown on the privacy page and store listing. */
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'CHANGE-ME@example.com';
