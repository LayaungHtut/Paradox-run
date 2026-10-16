import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LeaderboardStore } from './store';

const run = (playerId: string, score: number) => ({
	board: 'level:test' as const,
	playerId,
	name: 'Tester',
	score,
	ticks: 600,
	loops: 1,
	shards: 0,
	timeline: [] as never
});

describe('LeaderboardStore persistence', () => {
	it('survives a restart', () => {
		const dir = mkdtempSync(join(tmpdir(), 'prx-'));
		const a = new LeaderboardStore(dir);
		a.submit(run('p1', 100));
		a.submit(run('p2', 200));
		a.flush();
		const b = new LeaderboardStore(dir);
		expect(b.top('level:test', 10).map((e) => e.playerId)).toEqual(['p2', 'p1']);
	});

	it('moves a corrupt file aside and starts empty instead of failing', () => {
		const dir = mkdtempSync(join(tmpdir(), 'prx-'));
		writeFileSync(join(dir, 'leaderboard.json'), '{"v":1,"entries":[{"trunc');
		const s = new LeaderboardStore(dir);
		expect(s.count('level:test')).toBe(0);
		const aside = readdirSync(dir).find((f) => f.includes('.corrupt-'));
		expect(aside).toBeDefined();
		expect(readFileSync(join(dir, aside!), 'utf8')).toContain('trunc');
		s.submit(run('p1', 1));
		s.flush();
		expect(new LeaderboardStore(dir).count('level:test')).toBe(1);
	});
});
