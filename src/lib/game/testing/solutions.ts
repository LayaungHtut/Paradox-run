import { IN_JUMP, IN_LEFT, IN_RIGHT } from '../core/constants';
import type { RunSession } from '../run/session';
import { EXPANSION_PLANS } from './expansion-plans';
import { planScripts } from './plan';
import { idle, logicalX, runTo, wait, waitFor, waitUntil, type LoopScript } from './bot';

/** the ferry has finished sailing (works mirrored: dx flips with the level) */
const ferryDocked = (s: RunSession) =>
	Math.abs(s.world.lifts[0].x - (s.level.lifts[0].x + s.level.lifts[0].dx)) < 0.5;
const liftTop = (s: RunSession, i: number) =>
	s.world.lifts[i].y <= s.level.lifts[i].y + s.level.lifts[i].dy;
const [LIFT_B, LIFT_A] = [0, 1];
/** is the gate on channel `ch` open (gates swap order in mirrored levels, channels don't) */
const gateOpen = (s: RunSession, ch: number) =>
	s.world.doors[s.level.doors.findIndex((d) => d.ch === ch)].open;
/** relay-race: echo 2 trips relay B once loop 3 is waiting at gate B */
const RELAY_B_AT = 330;
/** ferry left edge in logical (unmirrored) coordinates */
const ferryX = (s: RunSession) =>
	s.level.mirrored ? s.level.width - s.world.lifts[0].x - s.level.lifts[0].w : s.world.lifts[0].x;
/** steer to stay over the middle of the moving ferry */
const steer = (s: RunSession) => {
	const d = ferryX(s) + 19 - logicalX(s);
	return d > 2 ? IN_RIGHT : d < -2 ? IN_LEFT : 0;
};

/** levels 16–50 are solved by data plans (their three-star route is the same plan) */
const EXPANSION_SCRIPTS: Record<string, LoopScript[]> = Object.fromEntries(
	Object.entries(EXPANSION_PLANS).map(([id, plan]) => [id, planScripts(plan)])
);

/**
 * A known-good timeline for every campaign level, expressed as closed-loop scripts (one per loop).
 * Coordinates are world units (16 per tile) in unmirrored level space.
 */
export const SOLUTIONS: Record<string, LoopScript[]> = {
	'first-echo': [
		// loop 1: reach the plate and stand on it until the loop collapses
		function* (s) {
			yield* runTo(s, 540, { jumps: [120, 215, 340] });
			yield* idle();
		},
		// loop 2: the echo holds the plate; walk through the open gate
		function* (s) {
			yield* runTo(s, 900, { jumps: [120, 215, 340] });
		}
	],
	relay: [
		// loop 1: jump the gap, climb to the relay, trip it, rewind
		function* (s) {
			yield* runTo(s, 52, { jumps: [372, 222, 192, 142] });
			return 'rewind';
		},
		// loop 2: go straight to the gate; the echo trips the relay while we wait there
		function* (s) {
			yield* runTo(s, 620, { jumps: [455] });
			yield* waitUntil(s, 1);
			while (!s.world.doors[0].open) yield 0;
			yield* runTo(s, 830);
		}
	],
	overdrive: [
		// loop 1: stand on the plate that raises the stepping stone, then rewind
		function* (s) {
			yield* runTo(s, 168);
			yield* waitUntil(s, 400);
			return 'rewind';
		},
		// loop 2: jump-dash onto the stone the echo raised, then jump-dash to the far side
		function* (s) {
			yield* waitFor(s, () => s.world.lifts[0].y <= s.level.lifts[0].y - 48, IN_RIGHT);
			yield* runTo(s, 660, { jumps: [304, 434], dashes: [332, 462] });
		}
	],
	counterweight: [
		// loop 1: walk to the plate, hold it a while, rewind
		function* (s) {
			yield* runTo(s, 70);
			yield* waitUntil(s, 420);
			return 'rewind';
		},
		// loop 2: wait on the lift while the echo weighs the plate, ride up, run to the exit
		function* (s) {
			yield* runTo(s, 395);
			while (s.world.lifts[0].y > s.level.lifts[0].y - 112) yield 0;
			yield* runTo(s, 710, { jumps: [505] });
		}
	],
	decoy: [
		// loop 1: sprint into the Warden's room and get shot — this loop becomes the decoy
		function* (s) {
			yield* runTo(s, 780, { jumps: [270] });
		},
		// loop 2: let the echo walk in first, then cross while the Warden reloads
		function* (s) {
			yield* wait(40);
			yield* runTo(s, 755, { jumps: [270] });
		}
	],
	'two-of-me': [
		// loop 1: hold the lift plate
		function* (s) {
			yield* runTo(s, 55);
			yield* waitUntil(s, 600);
			return 'rewind';
		},
		// loop 2: ride the lift, then hold the gate plate
		function* (s) {
			yield* runTo(s, 395);
			while (s.world.lifts[0].y > s.level.lifts[0].y - 128) yield 0;
			yield* runTo(s, 485);
			yield* waitUntil(s, 480);
			return 'rewind';
		},
		// loop 3: ride with echo 2, walk through the gate it holds open
		function* (s) {
			yield* runTo(s, 395);
			while (s.world.lifts[0].y > s.level.lifts[0].y - 128) yield 0;
			yield* runTo(s, 730);
		}
	],
	crossfire: [
		// loop 1: die in the first Warden room (decoy #1)
		function* (s) {
			yield* runTo(s, 1150, { jumps: [225, 500, 810] });
		},
		// loop 2: trail echo 1 through room 1, die in room 2 (decoy #2)
		function* (s) {
			yield* wait(30);
			yield* runTo(s, 1150, { jumps: [225, 500, 810] });
		},
		// loop 3: trail both echoes through both rooms
		function* (s) {
			yield* wait(55);
			yield* runTo(s, 1170, { jumps: [225, 500, 810] });
		}
	],
	synchrony: [
		// loop 1: climb, cross the bridge (jumping the gap), trip the relay
		function* (s) {
			yield* runTo(s, 740, { jumps: [110, 140, 185, 225, 470] });
			return 'rewind';
		},
		// loop 2: floor route, waiting out each pulsing beam, then wait at the curtain
		function* (s) {
			yield* runTo(s, 322, { jumps: [110, 140, 185] });
			yield* waitFor(s, () => !s.world.laserOn[0] && (s.world.tick + 0) % 150 >= 80);
			yield* runTo(s, 510);
			yield* waitFor(s, () => !s.world.laserOn[1] && (s.world.tick + 40) % 150 >= 80);
			yield* runTo(s, 720);
			yield* waitFor(s, () => !s.world.laserOn[2]);
			yield* runTo(s, 935);
		}
	],
	'paradox-engine': (() => {
		const liftUp = (s: RunSession) => s.world.lifts[0].y <= s.level.lifts[0].y - 128;
		return [
			// loop 1: weigh the lift plate for most of the loop
			function* (s) {
				yield* runTo(s, 55);
				yield* waitUntil(s, 500);
				return 'rewind';
			},
			// loop 2: ride up, walk into the Warden's room — decoy
			function* (s) {
				yield* runTo(s, 290);
				yield* waitFor(s, () => liftUp(s));
				yield* runTo(s, 1300);
			},
			// loop 3: ride, trail the decoy, drop into the sealed chamber and trip the relay
			function* (s) {
				yield* runTo(s, 290);
				yield* waitFor(s, () => liftUp(s));
				yield* wait(30);
				yield* runTo(s, 946);
				return 'rewind';
			},
			// loop 4: ride, trail both, jump the hole, pass the curtain while the trapped echo holds it open
			function* (s) {
				yield* runTo(s, 290);
				yield* waitFor(s, () => liftUp(s));
				yield* wait(50);
				yield* runTo(s, 1350, { jumps: [812] });
			}
		] satisfies LoopScript[];
	})(),
	ferry: [
		// loop 1: hold the plate while the ferry sails
		function* (s) {
			yield* runTo(s, 40);
			yield* waitUntil(s, 260);
			return 'rewind';
		},
		// loop 2: board the ferry, ride it across, walk to the exit
		function* (s) {
			yield* runTo(s, 175);
			yield* waitFor(s, () => ferryDocked(s));
			yield* runTo(s, 770);
		}
	],
	blackout: [
		// loop 1: plate A cuts beam A
		function* (s) {
			yield* runTo(s, 100);
			yield* waitUntil(s, 200);
			return 'rewind';
		},
		// loop 2: through beam A, hold plate B
		function* (s) {
			yield* runTo(s, 290);
			yield* waitUntil(s, 300);
			return 'rewind';
		},
		// loop 3: both beams down
		function* (s) {
			yield* runTo(s, 580);
		}
	],
	'point-of-no-return': [
		// loop 1: drop down the well and latch the relay
		function* (s) {
			yield* runTo(s, 24);
			yield* waitFor(s, () => s.world.relayTimer[0] !== 0);
			return 'rewind';
		},
		// loop 2: jump-dash the spikes; the gate is already latched open
		function* (s) {
			yield* runTo(s, 500, { jumps: [272], dashes: [300] });
			yield* waitFor(s, () => s.world.doors[0].open);
			yield* runTo(s, 660);
		}
	],
	stairway: [
		// (lifts are indexed in map order: B's row comes first)
		// loop 1: hold plate A (lift A up)
		function* (s) {
			yield* runTo(s, 55);
			yield* waitUntil(s, 200);
			return 'rewind';
		},
		// loop 2: ride lift A, wait beside plate B, step on once loop 3 will be aboard lift B
		function* (s) {
			yield* runTo(s, 238);
			yield* waitFor(s, () => liftTop(s, LIFT_A));
			yield* runTo(s, 360);
			yield* waitUntil(s, 330);
			yield* runTo(s, 388);
			yield* waitUntil(s, 480);
			return 'rewind';
		},
		// loop 3: ride lift A, hop plate B, board lift B, ride to the top
		function* (s) {
			yield* runTo(s, 238);
			yield* waitFor(s, () => liftTop(s, LIFT_A));
			yield* runTo(s, 558, { jumps: [360] });
			yield* waitFor(s, () => liftTop(s, LIFT_B));
			yield* runTo(s, 660);
		}
	],
	'relay-race': [
		// loop 1: climb to relay A and trip it
		function* (s) {
			yield* runTo(s, 22, { jumps: [110, 62] });
			yield* waitFor(s, () => s.world.relayTimer[0] !== 0);
			return 'rewind';
		},
		// loop 2: through gate A with echo 1, drop into the pit, trip relay B late
		function* (s) {
			yield* runTo(s, 245);
			yield* waitFor(s, () => gateOpen(s, 0));
			yield* runTo(s, 386);
			yield* waitUntil(s, RELAY_B_AT);
			yield* runTo(s, 452);
			yield* waitFor(s, () => s.world.relayTimer[1] !== 0);
			return 'rewind';
		},
		// loop 3: through gate A, jump the pit, wait at gate B for echo 2
		function* (s) {
			yield* runTo(s, 245);
			yield* waitFor(s, () => gateOpen(s, 0));
			yield* runTo(s, 690, { jumps: [366], dashes: [392] });
			yield* waitFor(s, () => gateOpen(s, 1));
			yield* runTo(s, 835);
		}
	],
	'full-circle': [
		// loop 1: hold the ferry plate
		function* (s) {
			yield* runTo(s, 40);
			yield* waitUntil(s, 270);
			return 'rewind';
		},
		// loop 2: ride, then drop down the well onto the latch
		function* (s) {
			yield* runTo(s, 175);
			yield* waitFor(s, () => ferryDocked(s));
			yield* runTo(s, 548);
			yield* waitFor(s, () => s.world.relayTimer[0] !== 0);
			return 'rewind';
		},
		// loop 3: ride, jump the well, hold the beam plate
		function* (s) {
			yield* runTo(s, 175);
			yield* waitFor(s, () => ferryDocked(s));
			yield* runTo(s, 676, { jumps: [490] });
			yield* waitUntil(s, 520);
			return 'rewind';
		},
		// loop 4: ride, jump the well, walk through the dead beam and the latched gate
		function* (s) {
			yield* runTo(s, 175);
			yield* waitFor(s, () => ferryDocked(s));
			yield* runTo(s, 1060, { jumps: [490] });
		}
	],
	...EXPANSION_SCRIPTS
};

const liftUp = (s: RunSession, i = 0) =>
	s.world.lifts[i].y <= s.level.lifts[i].y + s.level.lifts[i].dy;

/**
 * Three-star routes: every shard collected and the whole timeline under par. CI replays these so no
 * level ever ships with an unreachable shard or an unbeatable par.
 */
export const PERFECT_SOLUTIONS: Record<string, LoopScript[]> = {
	'first-echo': [
		// detour over the ledge for the shard, then hold the plate
		function* (s) {
			yield* runTo(s, 540, { jumps: [120, 215, 340, 386] });
			yield* waitUntil(s, 560);
			return 'rewind';
		},
		SOLUTIONS['first-echo'][1]
	],
	relay: [
		function* (s) {
			yield* runTo(s, 52, { jumps: [372, 222, 192, 142] });
			yield* runTo(s, 115, { jumps: [76] }); // double back for the shard above the relay
			return 'rewind';
		},
		SOLUTIONS.relay[1]
	],
	overdrive: [
		SOLUTIONS.overdrive[0],
		function* (s) {
			yield* waitFor(s, () => liftUp(s));
			// jump early off the stone so the rise passes through the shard, dash late
			yield* runTo(s, 660, { jumps: [304, 418], dashes: [332, 456] });
		}
	],
	counterweight: SOLUTIONS.counterweight,
	decoy: [
		SOLUTIONS.decoy[0],
		function* (s) {
			yield* wait(40);
			yield* runTo(s, 755, { jumps: [270, 432] });
		}
	],
	'two-of-me': [
		SOLUTIONS['two-of-me'][0],
		SOLUTIONS['two-of-me'][1],
		function* (s) {
			yield* runTo(s, 395);
			yield* waitFor(s, () => liftUp(s));
			yield* runTo(s, 318, { jumps: [392] }); // hop onto the shard ledge from the raised lift
			yield* runTo(s, 730, { jumps: [505] });
		}
	],
	crossfire: [
		SOLUTIONS.crossfire[0],
		SOLUTIONS.crossfire[1],
		function* (s) {
			yield* wait(55);
			yield* runTo(s, 1170, { jumps: [225, 366, 500, 672, 810] });
		}
	],
	synchrony: [
		function* (s) {
			yield* runTo(s, 740, { jumps: [110, 140, 185, 225, 354, 470] });
			return 'rewind';
		},
		SOLUTIONS.synchrony[1]
	],
	'paradox-engine': [
		SOLUTIONS['paradox-engine'][0],
		SOLUTIONS['paradox-engine'][1],
		SOLUTIONS['paradox-engine'][2],
		function* (s) {
			yield* runTo(s, 290);
			yield* waitFor(s, () => liftUp(s));
			yield* wait(50);
			yield* runTo(s, 1350, { jumps: [641, 809] });
		}
	],
	ferry: [
		SOLUTIONS.ferry[0],
		// jump off the moving ferry under the shard and land back on it
		function* (s) {
			yield* runTo(s, 175);
			yield* waitFor(s, () => logicalX(s) >= 280);
			for (let i = 0; i < 14; i++) yield IN_JUMP | steer(s);
			yield* waitFor(s, () => s.world.player.onGround);
			yield* waitFor(s, () => ferryDocked(s), 0);
			yield* runTo(s, 770);
		}
	],
	blackout: [
		SOLUTIONS.blackout[0],
		SOLUTIONS.blackout[1],
		function* (s) {
			yield* runTo(s, 580, { jumps: [150, 448] });
		}
	],
	'point-of-no-return': [
		SOLUTIONS['point-of-no-return'][0],
		function* (s) {
			yield* runTo(s, 500, { jumps: [160, 272], dashes: [300] });
			yield* runTo(s, 660);
		}
	],
	stairway: [
		function* (s) {
			yield* runTo(s, 55, { jumps: [145] });
			yield* waitUntil(s, 200);
			return 'rewind';
		},
		SOLUTIONS.stairway[1],
		function* (s) {
			yield* runTo(s, 238);
			yield* waitFor(s, () => liftTop(s, LIFT_A));
			yield* runTo(s, 558, { jumps: [360, 430] });
			yield* waitFor(s, () => liftTop(s, LIFT_B));
			yield* runTo(s, 660);
		}
	],
	'relay-race': [
		// trip relay A, then hop off the top step for the shard above it
		function* (s) {
			yield* runTo(s, 22, { jumps: [110, 62] });
			yield* waitFor(s, () => s.world.relayTimer[0] !== 0);
			yield* runTo(s, 70, { jumps: [26] });
			return 'rewind';
		},
		SOLUTIONS['relay-race'][1],
		// take off late so the arc crosses the shard over the pit
		function* (s) {
			yield* runTo(s, 245);
			yield* waitFor(s, () => gateOpen(s, 0));
			yield* runTo(s, 690, { jumps: [380], dashes: [404] });
			yield* waitFor(s, () => gateOpen(s, 1));
			yield* runTo(s, 835);
		}
	],
	'full-circle': [
		SOLUTIONS['full-circle'][0],
		SOLUTIONS['full-circle'][1],
		SOLUTIONS['full-circle'][2],
		function* (s) {
			yield* runTo(s, 175);
			yield* waitFor(s, () => ferryDocked(s));
			yield* runTo(s, 1060, { jumps: [490, 965] });
		}
	],
	...EXPANSION_SCRIPTS
};
