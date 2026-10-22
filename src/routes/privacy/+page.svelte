<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { CONTACT_EMAIL, ONLINE_ENABLED } from '$lib/config';

	const UPDATED = '2026-10-22';
</script>

<svelte:head><title>Privacy policy · PARADOX RUN</title></svelte:head>

<PageShell title="Privacy policy" back="/settings">
	<section class="panel block">
		<p class="lead">
			PARADOX RUN has no accounts, no ads, no analytics and no tracking. It never asks for your
			email, location, contacts, camera or microphone.
		</p>
		<p class="fine">Last updated {UPDATED}.</p>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Stored on your device</h2>
		<p>
			Your runner name, a random anonymous player id, your settings, level progress, best times,
			ghost replays and achievements are saved in the app's local storage on your device. They are
			not sent anywhere unless you submit a leaderboard run (below). Uninstalling the app or
			clearing its data deletes them. You can export them yourself with a backup code in Settings.
		</p>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Leaderboards</h2>
		{#if !ONLINE_ENABLED}
			<p>This build has online features turned off and sends no data at all.</p>
		{/if}
		<p>
			When you finish a level with online features available, the game sends the leaderboard server
			your runner name, your anonymous player id, and the recorded button presses of the run (so the
			server can replay and verify it). Your name, score, time and run replay are then shown
			publicly on the leaderboard and can be raced as a ghost by other players.
		</p>
		<p>
			The server sees your IP address, as every web server does. It is used only in memory to limit
			request rates and is not stored or logged with your run. Leaderboard entries are kept until
			the leaderboard is reset.
		</p>
		<p>
			To remove your leaderboard entries, email us your player id (shown in Settings) and runner
			name.
		</p>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Children</h2>
		<p>
			The game does not knowingly collect personal information from anyone, including children under
			13. Runner names are free text, so please don't use your real name.
		</p>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Third parties</h2>
		<p>
			None. The game uses no third-party SDKs, advertising networks or analytics services, and it
			sells or shares no data.
		</p>
	</section>

	<section class="panel block">
		<h2 class="eyebrow">Contact</h2>
		<p>Questions or deletion requests: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
	</section>
</PageShell>

<style>
	.block {
		padding: 16px 18px;
		margin-bottom: 14px;
		display: grid;
		gap: 8px;
		font-size: 0.9rem;
		color: #c3cbe0;
	}
	.lead {
		font-size: 1rem;
		color: var(--color-text);
	}
	.fine {
		font-size: 0.78rem;
		color: var(--color-dim);
	}
	a {
		color: var(--color-echo);
		text-decoration: underline;
	}
</style>
