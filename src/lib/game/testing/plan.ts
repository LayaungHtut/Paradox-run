import type { RunSession } from '../run/session';
import { runTo, waitFor, waitUntil, type LoopScript } from './bot';

/*
 * Data-driven solutions for the expansion levels. A plan is one list of steps per loop; steps name
 * mechanisms by channel or by logical tile column (never by array index), so the same plan also
 * solves the mirrored daily variant.
 */

export type Step =
	/** run to logical x, jumping/dashing as the player passes each listed x */
	| ['run', number, number[]?, number[]?]
	/** wait for the gate on channel `ch` to open */
	| ['gate', number]
	/** wait for the lift/ferry on channel `ch` to finish its powered travel */
	| ['lift', number]
	/** wait for the relay on channel `ch` to be powered */
	| ['relay', number]
	/** wait until the beam in tile column `col` is off */
	| ['off', number]
	/** wait at a pulsing beam in tile column `col` for the start of its off phase */
	| ['pulse', number]
	/** stand still until `tick`, then rewind (the loop becomes an echo) */
	| ['hold', number];

const byCh = <T extends { ch: number }>(list: T[], ch: number): number =>
	list.findIndex((m) => m.ch === ch);

/** index of the vertical beam whose logical left edge is in tile column `col` */
function beamAt(s: RunSession, col: number): number {
	const { lasers, mirrored, width } = s.level;
	return lasers.findIndex((l) => {
		const x = mirrored ? width - l.x - l.w : l.x;
		return Math.abs(x - (col * 16 + 6)) < 1;
	});
}

function liftArrived(s: RunSession, ch: number): boolean {
	const i = byCh(s.level.lifts, ch);
	const d = s.level.lifts[i];
	const w = s.world.lifts[i];
	return Math.abs(w.x - (d.x + d.dx)) < 0.5 && Math.abs(w.y - (d.y + d.dy)) < 0.5;
}

function* step(s: RunSession, st: Step): Generator<number, 'rewind' | void, void> {
	switch (st[0]) {
		case 'run':
			yield* runTo(s, st[1], { jumps: st[2], dashes: st[3] });
			return;
		case 'gate': {
			const i = byCh(s.level.doors, st[1]);
			yield* waitFor(s, () => s.world.doors[i].open);
			return;
		}
		case 'lift':
			yield* waitFor(s, () => liftArrived(s, st[1]));
			return;
		case 'relay': {
			const i = byCh(s.level.relays, st[1]);
			yield* waitFor(s, () => s.world.relayTimer[i] !== 0);
			return;
		}
		case 'off': {
			const i = beamAt(s, st[1]);
			yield* waitFor(s, () => !s.world.laserOn[i]);
			return;
		}
		case 'pulse': {
			const l = s.level.lasers[beamAt(s, st[1])];
			yield* waitFor(s, () => {
				const t = (s.world.tick + l.phase) % l.period;
				return t >= l.on + 2 && t <= l.on + 12;
			});
			return;
		}
		case 'hold':
			yield* waitUntil(s, st[1]);
			return 'rewind';
	}
}

export function planScripts(loops: Step[][]): LoopScript[] {
	return loops.map(
		(steps) =>
			function* (s: RunSession) {
				for (const st of steps) if ((yield* step(s, st)) === 'rewind') return 'rewind';
			}
	);
}
