import { env } from '$env/dynamic/private';
import { LeaderboardStore } from './store';
import { RateLimiter } from './validate';

/** Process-wide singletons. DATA_DIR controls where the leaderboard file lives (default ./data). */
let store: LeaderboardStore | null = null;

export function getStore(): LeaderboardStore {
	if (!store) {
		store = new LeaderboardStore(env.DATA_DIR || 'data');
		// writes are debounced; don't lose the last 250 ms of submissions on deploy/restart
		// (adapter-node emits sveltekit:shutdown after SIGTERM/SIGINT once requests drain)
		process.once('sveltekit:shutdown' as 'exit', () => store?.flush());
	}
	return store;
}

export const submitLimiter = new RateLimiter(12, 60_000);
export const readLimiter = new RateLimiter(120, 60_000);
