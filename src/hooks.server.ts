import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

/*
 * CORS for /api: the Android app (https://localhost) and static web builds call this server from
 * another origin. The API is public and uses no cookies, so allowing any origin by default is safe;
 * CORS_ORIGINS=https://a.example,https://b.example narrows it.
 */
const allowed = (env.CORS_ORIGINS ?? '*')
	.split(',')
	.map((s) => s.trim())
	.filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
	if (!origin) return {};
	const ok = allowed.includes('*') || allowed.includes(origin);
	if (!ok) return {};
	return {
		'access-control-allow-origin': allowed.includes('*') ? '*' : origin,
		'access-control-allow-methods': 'GET, POST, OPTIONS',
		'access-control-allow-headers': 'content-type',
		'access-control-max-age': '86400',
		vary: 'Origin'
	};
}

const SECURITY_HEADERS: Record<string, string> = {
	'x-content-type-options': 'nosniff',
	'referrer-policy': 'strict-origin-when-cross-origin',
	'x-frame-options': 'DENY',
	'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=()'
};

export const handle: Handle = async ({ event, resolve }) => {
	const isApi = event.url.pathname.startsWith('/api/');
	const cors = isApi ? corsHeaders(event.request.headers.get('origin')) : {};

	if (isApi && event.request.method === 'OPTIONS')
		return new Response(null, { status: 204, headers: cors });

	const response = await resolve(event);
	for (const [k, v] of Object.entries({ ...SECURITY_HEADERS, ...cors }))
		if (!response.headers.has(k)) response.headers.set(k, v);
	return response;
};
