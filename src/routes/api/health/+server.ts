import { json } from '@sveltejs/kit';
import { SIM_VERSION } from '$lib/game/core/constants';
import type { RequestHandler } from './$types';

/** Liveness probe for load balancers and container platforms. */
export const GET: RequestHandler = () =>
	json({ ok: true, sim: SIM_VERSION }, { headers: { 'cache-control': 'no-store' } });
