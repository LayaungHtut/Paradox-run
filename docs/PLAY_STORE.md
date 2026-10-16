# Publishing on Google Play

The Android app is a [Capacitor](https://capacitorjs.com) shell (`android/`) around the static build.
Every game file is bundled in the app, so it plays fully offline. Leaderboards work when the app was
built with `VITE_API_URL` pointing at a running leaderboard server (see [DEPLOYMENT.md](DEPLOYMENT.md)).

|                  |                                         |
| ---------------- | --------------------------------------- |
| Application ID   | `org.youths.paradoxrun` (permanent)     |
| Min / target SDK | 24 (Android 7.0) / 36                   |
| Version          | from `package.json` (`1.0.0` → `10000`) |
| Orientation      | landscape, immersive fullscreen         |
| Permissions      | `INTERNET` only                         |

## Before the first upload (checklist)

1. **Set a real contact email.** Create `.env.local` with `VITE_CONTACT_EMAIL=you@example.com`. It is
   shown on the in-app privacy page, and Play requires a working contact address.
2. **Leaderboards (optional).** Deploy the server first, then put `VITE_API_URL=https://your-server` in
   `.env.android.local`. Without it the app ships with online features off, which is fine for a first
   release.
3. **Host the privacy policy.** Play needs a public URL. Any deployment of the web game serves it at
   `/privacy` (for example `https://your-server/privacy` or your Netlify site).
4. **Back up the upload key.** Copy `android/paradoxrun-upload.jks` and `android/keystore.properties`
   (which holds its password) to a password manager or other safe place. Both are git-ignored. If you
   lose them, Play support can reset the upload key, but that takes days.
5. **Build:** `npm run android:bundle` → `android/app/build/outputs/bundle/release/app-release.aab`.

## Build commands

```sh
npm run android:bundle   # signed .aab for Play (web build + cap sync + Gradle)
npm run android:apk      # signed .apk for installing directly (adb install …)
npm run android:open     # open the project in Android Studio
npm run icons            # re-render launcher, PWA and store icons from the vector design
```

`scripts/gradle.mjs` finds a JDK 21+ (JAVA_HOME, Android Studio's bundled JBR, `~/.jdks`) and the
Android SDK automatically. Requirements: Node 22+, Android SDK (install Android Studio), JDK 21+.

**Every update:** bump the version first (`npm version patch`, or `minor` or `major`), then build. Play
rejects a versionCode it has already seen.

**Test on a phone before release:** enable USB debugging, then run
`npm run android:apk && adb install -r android/app/build/outputs/apk/release/app-release.apk`.

## Play Console steps

1. Create the app: name **Paradox Run**, type **Game**, **Free**. Accept the declarations.
2. **Personal developer accounts created after Nov 2023:** Google requires a **closed test with at
   least 12 testers for 14 continuous days** before you can apply for production access. Upload the
   same `.aab` to the Closed testing track first. Organisation accounts can skip this.
3. Upload `app-release.aab` and let Google manage the app signing key (Play App Signing, the default).
4. Fill in the store listing and policy forms using the answers below.

## Store listing

Graphics are in `store/`:

| Asset                       | File                        |
| --------------------------- | --------------------------- |
| App icon 512×512            | `store/icon-512.png`        |
| Feature graphic 1024×500    | `store/feature-graphic.png` |
| Phone screenshots 1920×1080 | `store/screenshots/*.png`   |

Regenerate screenshots from a running build with `npm run screenshots -- http://127.0.0.1:3000`.
7" and 10" tablet screenshots are optional; the phone set can be reused.

**Short description (80 chars max):**

> Every run you lose runs with you. A time-loop platformer where you team up with your past self.

**Full description:**

> PARADOX RUN is a time-loop arcade platformer. Every loop you finish — by dying, running out of time
> or pressing Rewind — becomes an echo: a ghost that replays your exact moves in the next loop.
>
> Echoes hold pressure plates, trip timed relays, ride lifts and draw turret fire. You win by building
> a successful run out of your own failed attempts.
>
> • 9 hand-built levels, each teaching a new way to cooperate with yourself
> • Daily Paradox: a fresh remixed challenge every day
> • Race your personal-best ghost in gold
> • 13 achievements, 3 stars per level
> • Plays fully offline. No ads, no accounts, no tracking
> • Touch controls designed for phones: slide to run, tap to jump, flick to dash

Category: **Games → Arcade** (or Puzzle). Tags: platformer, puzzle, time loop.

## Data safety form

Answers that match what the app does (see `src/routes/privacy/+page.svelte`):

- **Does your app collect or share user data?**
  - Online features **off** (no `VITE_API_URL`): **No.** Nothing leaves the device.
  - Online features **on**: **Yes, collected; not shared.**
    - _App activity → Other user-generated content_: the run's recorded inputs, score and runner name.
      Purpose: **App functionality** (leaderboards). Not optional to the leaderboard feature itself;
      the game is fully playable without it.
    - _Device or other IDs_: the random anonymous player id. Purpose: **App functionality**.
- **Is data encrypted in transit?** Yes, when the server is served over HTTPS (it must be).
- **Can users request deletion?** Yes, by email (the privacy page explains how).
- **Ads:** No. **Target audience:** 13+ is the simplest choice; the game has no mature content, but
  "designed for children" brings extra Families-policy requirements.

## Content rating (IARC questionnaire)

Category: **Game**. Violence: cartoon/fantasy only (the runner is hit by spikes and turrets and
respawns; no blood, no humans). No sexual content, profanity, drugs, gambling or user-to-user
communication. Runner names are shown on leaderboards: answer **yes** to "shares user-generated
content" only if online features are on (names are limited to 2–16 letters, numbers and `. _ -`).
Expected result: **Everyone / PEGI 3**.

## App access

No login is needed. Choose "All functionality is available without special access".
