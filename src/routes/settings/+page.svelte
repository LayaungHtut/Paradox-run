<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { ACHIEVEMENTS } from '$lib/state/achievements';
	import { profile } from '$lib/state/profile.svelte';
	import { progress } from '$lib/state/progress.svelte';
	import { settings, type SettingsData } from '$lib/state/settings.svelte';
	import { audio } from '$lib/game/audio/audio';
	import { exportBackup, importBackup } from '$lib/state/storage';
	import {
		DEFAULT_KEYS,
		KEY_SLOTS,
		keyLabel,
		type KeyAction,
		type KeyBindings
	} from '$lib/game/input/input';

	let name = $state(profile.data.name);
	let nameMsg = $state<string | null>(null);

	function saveName(e: SubmitEvent) {
		e.preventDefault();
		nameMsg = profile.rename(name)
			? 'Saved. New runs will use this name.'
			: '2–16 letters, numbers, spaces, . _ -';
	}

	const toggles: { key: keyof SettingsData; label: string; hint: string }[] = [
		{ key: 'screenShake', label: 'Screen shake', hint: 'Impact feedback on landings and deaths' },
		{ key: 'haptics', label: 'Vibration', hint: 'Android phones only' },
		{
			key: 'reducedEffects',
			label: 'Reduced effects',
			hint: 'Fewer particles — helps older phones'
		},
		{
			key: 'reducedFlashing',
			label: 'Reduced flashing',
			hint: 'Dims full-screen flashes on death and completion'
		},
		{
			key: 'bestGhost',
			label: 'Race your best ghost',
			hint: 'Your fastest run replays beside you in gold'
		},
		{ key: 'showFps', label: 'Show FPS', hint: 'Performance overlay in the HUD' }
	];

	let confirmReset = $state(false);
	function resetProgress() {
		if (!confirmReset) {
			confirmReset = true;
			return;
		}
		progress.reset();
		confirmReset = false;
	}

	let backupCode = $state('');
	let backupMsg = $state<string | null>(null);
	let restoreCode = $state('');

	async function makeBackup() {
		backupCode = exportBackup();
		try {
			await navigator.clipboard.writeText(backupCode);
			backupMsg = 'Backup code copied. Keep it somewhere safe (notes app, email to yourself).';
		} catch {
			backupMsg = 'Copy the code below and keep it somewhere safe.';
		}
	}

	function restore(e: SubmitEvent) {
		e.preventDefault();
		if (!importBackup(restoreCode)) {
			backupMsg = "That doesn't look like a PARADOX RUN backup code.";
			return;
		}
		// state modules sanitise the restored data on load
		location.reload();
	}

	const keyRows: { action: KeyAction; label: string }[] = [
		{ action: 'left', label: 'Run left' },
		{ action: 'right', label: 'Run right' },
		{ action: 'jump', label: 'Jump' },
		{ action: 'dash', label: 'Dash' },
		{ action: 'rewind', label: 'Rewind' },
		{ action: 'pause', label: 'Pause' }
	];
	/** the key slot waiting for a key press */
	let listening = $state<{ action: KeyAction; slot: number } | null>(null);

	function bindKey(e: KeyboardEvent) {
		if (!listening) return;
		e.preventDefault();
		// Space/Enter would otherwise re-click the focused key button on keyup
		(document.activeElement as HTMLElement | null)?.blur();
		const { action, slot } = listening;
		listening = null;
		if (e.code === 'Escape' || !e.code) return; // cancel
		const clear = e.code === 'Backspace' || e.code === 'Delete';
		// a key can only do one thing: take it away from wherever it was bound
		const keys = Object.fromEntries(
			Object.entries(settings.data.keys).map(([a, codes]) => [a, codes.filter((c) => c !== e.code)])
		) as KeyBindings;
		const codes = settings.data.keys[action].map((c) => (c === e.code ? '' : c));
		codes[slot] = clear ? '' : e.code;
		keys[action] = codes.filter(Boolean);
		settings.update({ keys });
	}

	let unlocked = $derived(Object.keys(progress.data.achievements).length);
</script>

<svelte:window onkeydown={bindKey} />

<svelte:head><title>Profile & settings · PARADOX RUN</title></svelte:head>

<PageShell title="Profile & settings">
	<section class="panel block">
		<h2 class="eyebrow">Runner name</h2>
		<form onsubmit={saveName} class="name">
			<input bind:value={name} maxlength="16" autocomplete="nickname" aria-label="Runner name" />
			<button class="btn" type="submit">Save</button>
		</form>
		{#if nameMsg}<p class="msg">{nameMsg}</p>{/if}
		<p class="fine">
			No account needed. Your progress lives on this device; leaderboard entries use this name and
			an anonymous id.
		</p>
		<p class="fine">Player id: <code class="pid">{profile.data.id}</code></p>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Audio</h2>
		<label class="toggle">
			<span><b>Mute all</b><small>Silences music and sound effects</small></span>
			<input
				type="checkbox"
				checked={settings.data.muted}
				onchange={(e) => settings.update({ muted: e.currentTarget.checked })}
			/>
		</label>
		<label class="slider">
			<span>Music</span>
			<input
				type="range"
				min="0"
				max="1"
				step="0.05"
				value={settings.data.music}
				oninput={(e) => settings.update({ music: +e.currentTarget.value })}
			/>
		</label>
		<label class="slider">
			<span>Sound effects</span>
			<input
				type="range"
				min="0"
				max="1"
				step="0.05"
				value={settings.data.sfx}
				oninput={(e) => settings.update({ sfx: +e.currentTarget.value })}
				onchange={() => audio.play('shard')}
			/>
		</label>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Feel & performance</h2>
		{#each toggles as t (t.key)}
			<label class="toggle">
				<span><b>{t.label}</b><small>{t.hint}</small></span>
				<input
					type="checkbox"
					checked={settings.data[t.key] as boolean}
					onchange={(e) => settings.update({ [t.key]: e.currentTarget.checked })}
				/>
			</label>
		{/each}
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Achievements · {unlocked}/{ACHIEVEMENTS.length}</h2>
		<ul class="ach">
			{#each ACHIEVEMENTS as a (a.id)}
				<li class:got={progress.data.achievements[a.id]}>
					<b>{a.name}</b>
					<span>{a.desc}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Save data</h2>
		<p class="fine">
			Progress, best times, ghosts and achievements are stored only on this device. Make a backup
			code to move them to another device or keep them safe if app data is cleared.
		</p>
		<div class="reset">
			<button class="btn" onclick={makeBackup}>Make backup code</button>
		</div>
		{#if backupCode}
			<textarea class="code" readonly rows="3" aria-label="Backup code" value={backupCode}
			></textarea>
		{/if}
		<form class="name" onsubmit={restore}>
			<input
				bind:value={restoreCode}
				placeholder="Paste a backup code to restore"
				aria-label="Backup code to restore"
				autocomplete="off"
				spellcheck="false"
			/>
			<button class="btn" type="submit" disabled={!restoreCode.trim()}>Restore</button>
		</form>
		{#if backupMsg}<p class="msg">{backupMsg}</p>{/if}
		<div class="reset">
			<button class="btn" class:danger={confirmReset} onclick={resetProgress}>
				{confirmReset ? 'Tap again to erase everything' : 'Reset progress'}
			</button>
			{#if confirmReset}<button class="btn" onclick={() => (confirmReset = false)}>Cancel</button
				>{/if}
		</div>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Controls</h2>
		<p class="fine">Click a key, then press the new key. Esc cancels, Backspace clears the slot.</p>
		<div class="binds">
			{#each keyRows as row (row.action)}
				<span class="bind-label">{row.label}</span>
				{#each Array.from({ length: KEY_SLOTS }, (_, i) => i) as slot (slot)}
					{@const code = settings.data.keys[row.action][slot]}
					{@const active = listening?.action === row.action && listening.slot === slot}
					<button
						class="key"
						class:active
						class:empty={!code}
						aria-label={`${row.label} key ${slot + 1}: ${code ? keyLabel(code) : 'unbound'}`}
						onclick={() => (listening = active ? null : { action: row.action, slot })}
					>
						{active ? 'Press a key…' : code ? keyLabel(code) : '—'}
					</button>
				{/each}
			{/each}
		</div>
		<div class="reset">
			<button class="btn" onclick={() => settings.update({ keys: DEFAULT_KEYS })}>
				Reset keys to default
			</button>
		</div>
		<dl class="controls">
			<dt>Touch</dt>
			<dd>
				Left thumb: slide to run · Right side: tap to jump (hold for height), flick to dash · ⟲ ends
				the loop early
			</dd>
		</dl>
	</section>

	<p class="links"><a href="/privacy">Privacy policy</a> · <a href="/credits">Credits</a></p>
</PageShell>

<style>
	.block {
		padding: 16px 18px;
		margin-bottom: 14px;
		display: grid;
		gap: 10px;
	}
	.name {
		display: flex;
		gap: 10px;
	}
	.name input {
		flex: 1;
		min-height: 48px;
		border-radius: 12px;
		background: var(--color-ink);
		border: 1px solid var(--color-line);
		padding: 0 14px;
		color: var(--color-text);
		font-weight: 600;
	}
	.msg {
		font-size: 0.82rem;
		color: var(--color-echo);
	}
	.fine {
		font-size: 0.78rem;
		color: var(--color-dim);
	}
	.slider {
		display: grid;
		grid-template-columns: 120px 1fr;
		align-items: center;
		gap: 12px;
		font-size: 0.9rem;
	}
	input[type='range'] {
		accent-color: var(--color-echo);
	}
	.toggle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		min-height: 48px;
		cursor: pointer;
	}
	.toggle span {
		display: grid;
	}
	.toggle small {
		font-size: 0.76rem;
		color: var(--color-dim);
	}
	.toggle input {
		width: 22px;
		height: 22px;
		accent-color: var(--color-echo);
	}
	.ach {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 8px;
	}
	.ach li {
		padding: 10px 12px;
		border-radius: 12px;
		border: 1px solid var(--color-line);
		display: grid;
		opacity: 0.45;
		font-size: 0.82rem;
	}
	.ach li.got {
		opacity: 1;
		border-color: rgba(185, 155, 255, 0.45);
		background: rgba(185, 155, 255, 0.07);
	}
	.ach span {
		color: var(--color-dim);
	}
	.controls {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 6px 14px;
		font-size: 0.84rem;
	}
	.reset {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.danger {
		border-color: var(--color-danger);
		color: var(--color-danger);
	}
	.code {
		width: 100%;
		border-radius: 12px;
		background: var(--color-ink);
		border: 1px solid var(--color-line);
		padding: 10px 12px;
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		word-break: break-all;
		resize: none;
	}
	.pid {
		font-family: var(--font-mono);
		word-break: break-all;
		user-select: all;
	}
	.links {
		text-align: center;
		font-size: 0.82rem;
		color: var(--color-dim);
	}
	.links a {
		text-decoration: underline;
	}
	.binds {
		display: grid;
		grid-template-columns: minmax(80px, auto) repeat(3, minmax(0, 1fr));
		gap: 6px 8px;
		align-items: center;
		font-size: 0.86rem;
	}
	.key {
		min-height: 40px;
		border-radius: 10px;
		border: 1px solid var(--color-line);
		background: var(--color-ink);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	.key.empty {
		color: var(--color-dim);
	}
	.key.active {
		border-color: var(--color-echo);
		color: var(--color-echo);
	}
	.controls dt {
		color: var(--color-dim);
	}
</style>
