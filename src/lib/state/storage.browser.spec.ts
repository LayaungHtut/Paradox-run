import { beforeEach, describe, expect, it } from 'vitest';
import { exportBackup, importBackup, loadJson, saveJson } from './storage';

describe('save backup', () => {
	beforeEach(() => localStorage.clear());

	it('round-trips every save key, including non-ASCII names', () => {
		saveJson('profile', 1, { id: 'a'.repeat(32), name: 'Rünner ☆' });
		saveJson('progress', 1, { levels: { l1: { stars: 3 } } });
		saveJson('settings', 1, { muted: true });
		saveJson('queue', 1, [{ x: 1 }]);
		const code = exportBackup();

		localStorage.clear();
		expect(importBackup(`  ${code}\n`)).toBe(true);
		expect(loadJson('profile', 1, null)).toEqual({ id: 'a'.repeat(32), name: 'Rünner ☆' });
		expect(loadJson('progress', 1, null)).toEqual({ levels: { l1: { stars: 3 } } });
		expect(loadJson('settings', 1, null)).toEqual({ muted: true });
		expect(loadJson('queue', 1, null)).toBeNull();
	});

	it('rejects garbage without touching the current save', () => {
		saveJson('progress', 1, { keep: true });
		for (const bad of ['', 'hello', 'PRX1:!!!', 'PRX1:' + btoa('{"settings":{"v":1}}')])
			expect(importBackup(bad)).toBe(false);
		expect(loadJson('progress', 1, null)).toEqual({ keep: true });
	});
});
