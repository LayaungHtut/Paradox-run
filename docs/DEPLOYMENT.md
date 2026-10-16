# Deployment

PARADOX RUN is a SvelteKit app built with `@sveltejs/adapter-node`. The output in `build/` is a
standalone Node server that serves the game and the leaderboard API.

## Build and run

```sh
npm ci
npm run build
DATA_DIR=/var/lib/paradox-run HOST=0.0.0.0 PORT=3000 node build
```

| Variable         | Default   | Purpose                                                                       |
| ---------------- | --------- | ----------------------------------------------------------------------------- |
| `DATA_DIR`       | `./data`  | Directory for `leaderboard.json`. Must be writable and persistent.            |
| `PORT`           | `3000`    | HTTP port (adapter-node).                                                     |
| `HOST`           | `0.0.0.0` | Bind address (adapter-node).                                                  |
| `ORIGIN`         | —         | Set to the public URL when behind a proxy (adapter-node).                     |
| `ADDRESS_HEADER` | —         | e.g. `X-Forwarded-For` behind a proxy, so rate limiting sees real client IPs. |
| `CORS_ORIGINS`   | `*`       | Comma-separated origins allowed to call `/api` from other sites.              |

Put it behind HTTPS (Caddy, nginx, a platform load balancer). The service worker and
`navigator.share` require a secure origin. `GET /api/health` is a liveness probe.

## Quickest: Docker

```sh
docker build -t paradox-run .
docker run -d -p 3000:3000 -v paradox-data:/data --restart unless-stopped paradox-run
curl http://localhost:3000/api/health     # {"ok":true,"sim":2}
```

The image runs as an unprivileged user, keeps its data in the `/data` volume and has a health check.
Put HTTPS in front of it (Caddy: `caddy reverse-proxy --from game.example.com --to :3000`).

### Fly.io (`fly.toml` included)

```sh
fly launch --copy-config --no-deploy     # pick a unique app name when asked
fly volumes create paradox_data --size 1
fly deploy
```

The game and API are then at `https://<app>.fly.dev`. Keep one machine: the leaderboard file lives on
its volume.

### Render (`render.yaml` included)

New → Blueprint → select the repo. The persistent disk needs a paid instance type; on the free tier
the leaderboard would reset on every deploy.

## Where it can run

Any host that runs **one long-lived Node process with a persistent disk**: a VPS, Fly.io, Railway with
a volume, Render with a disk, any Docker host.

Serverless platforms (Vercel, Netlify functions, Cloudflare Workers) have no persistent writable disk,
so they cannot host the leaderboard itself. They can host the **static game** and point it at a
leaderboard server running elsewhere (next section).

## Static build (Netlify, any file host) and the Android app

`npm run build:static` (used by `netlify.toml`) builds a static SPA with adapter-static. The whole game
works, including local progress, the daily puzzle and your best ghost.

Online features (leaderboards, verified ranks, ghost challenge links) need a leaderboard server:

- **With** `VITE_API_URL=https://your-server` at build time (Netlify: Site settings → Environment
  variables; locally: `.env.static.local` or `.env.android.local`), the static site or Android app
  calls that server. The server allows cross-origin requests (CORS) by default; set
  `CORS_ORIGINS=https://your-site.netlify.app,https://localhost` on the server to restrict it
  (`https://localhost` is the Android app's origin).
- **Without** it, online screens say "online features are off in this build".

Share links from the Android app use `VITE_PUBLIC_URL`, falling back to `VITE_API_URL` (the Node
server also serves the web game, so challenge links open there).

See [PLAY_STORE.md](PLAY_STORE.md) for building and publishing the Android app.

## Security

- The Node server sends `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
  `Permissions-Policy` and a nonce-based Content-Security-Policy. The static build puts a hash-based
  CSP in the page; `netlify.toml` adds the other headers.
- `/api/*` accepts no cookies and only JSON, so open CORS doesn't expose anything.

## Data and limits

- One JSON file, written atomically (temp file + rename), debounced 250 ms and flushed on shutdown
  (SIGTERM). A corrupt file is moved aside (`leaderboard.json.corrupt-<time>`) and the board starts
  fresh instead of failing. Each board keeps the best
  entry per player, capped at 1000 entries.
- Submissions: 128 KB max body, 12 per minute per IP and per player. Reads: 120 per minute per IP.
  The limits are in memory and reset on restart.
- Every submission is re-simulated. A run takes a few milliseconds to verify.
- Daily boards accept submissions for today and yesterday (UTC), so runs finished just after midnight
  still count.

## Backups

Copy `$DATA_DIR/leaderboard.json`. It is the only state on the server; everything else lives on players'
devices.

## Changing physics

Any change to `src/lib/game/sim` or `PHYS` constants must bump `SIM_VERSION` in
`src/lib/game/core/constants.ts`. Old replays are then rejected rather than mis-verified, so start a
fresh `leaderboard.json` (or archive the old one) when you deploy it.
