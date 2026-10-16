# README — PARADOX RUN

**Submission Document for Digit7 Jam 2026**  
**Recommended Filename:** `README_YOUTHsOrg_ParadoxRun.md`  
**Compliance Reference:** Digit7 Jam Submission Format & Technical Guide §4, §6

---

## 1. Game Title
**PARADOX RUN**  
*(Subtitle: Every run you lose runs with you)*

---

## 2. Team Name
**YOUTHs Org** (Team YOUTHs)

---

## 3. Main Contact Person
- **Lead Contact:** Team Representative / Lead Developer
- **Email:** `contact@youths.org` *(replace with registered email: e.g., you@example.com)*
- **Phone:** `+95 9 787 164 136` *(replace with registered primary phone number)*
- **Telegram Username:** `@youths_admin` *(replace with registered Telegram handle)*
- **Registration ID:** `D7J-2026-REG-XXXX` *(replace with official Digit7 Jam registration ID)*

---

## 4. Short Game Description
**PARADOX RUN** is a mobile-first, high-tempo HTML5 time-loop arcade platformer built on a single, compelling paradox: **your past failures become your future teammates.**

In each tight 15–25 second loop, the player navigates precision obstacles (spikes, pits, energy barriers, and tracking turrets). Whenever the timer expires, the player perishes, or the player presses the **Rewind** button, the finished run crystalizes into an **echo**—a physical past self replaying exact recorded inputs from tick zero. Echoes physically hold down pressure plates, trigger timed relays, ride kinetic lifts, and act as decoy targets drawing lethal turret fire away from the living player. Players solve layered temporal puzzles and sprint to the exit portal by choreographing cooperative timelines with their past selves.

---

## 5. How to Open and Play the Game

### A. Playing Online (Digit7s Hosting)
1. Open the official tournament link provided in the submission portal:  
   `https://gamejam.digit7s.com/teams/youths-org/` *(or deployed hosting URL)*
2. The game loads directly in the browser via HTTPS with no account creation, login, app download, or browser extension required.

### B. Playing Locally from the Playable Build ZIP
1. Extract `Digit7Jam_YOUTHsOrg_ParadoxRun.zip` to a local folder.
2. Because modern web browsers restrict certain ES module and WebAudio features when opening files directly via the `file://` protocol, serve the unzipped folder using any standard local static web server:
   ```bash
   # Option 1: Using Node.js (npx serve)
   npx serve Digit7Jam_YOUTHsOrg_ParadoxRun_Build

   # Option 2: Using Python 3
   cd Digit7Jam_YOUTHsOrg_ParadoxRun_Build
   python -m http.server 8080
   ```
3. Open `http://localhost:8080` in Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari.
4. Click anywhere on the screen or press a key to enable audio and begin playing.

---

## 6. Supported Browsers
Tested and certified on current stable releases:
- **Google Chrome** (v120+ desktop & mobile) — Primary reference target
- **Apple Safari** (v16.4+ macOS & iOS 16+)
- **Microsoft Edge** (v120+ desktop)
- **Mozilla Firefox** (v120+ desktop & mobile)

*Note:* Requires standard Canvas 2D and ES2022 support. WebAudio is used for runtime sound synthesis; if WebAudio is unavailable or blocked by browser autoplay policies, the game gracefully continues in silent mode without crashing.

---

## 7. Supported Devices
- **Desktop / Laptop PCs:**
  - Windows 10 & Windows 11
  - macOS (Ventura, Sonoma, Sequoia)
  - Linux (Ubuntu, Debian, Fedora)
- **Mobile Devices & Tablets:**
  - Android smartphones & tablets (Android 10.0 and newer)
  - Apple iPhones & iPads (iOS 16.0 and newer)

---

## 8. Controls and Gameplay Instructions

### Input Mapping

| Action | Mobile / Touch (Landscape) | Desktop Keyboard |
| :--- | :--- | :--- |
| **Move Left / Right** | Left thumb pad: slide horizontally | `A` / `D` or `Left Arrow` / `Right Arrow` |
| **Jump** | Tap right screen half (hold for variable height) | `Space` / `W` / `Up Arrow` |
| **Dash (Air & Ground)** | Flick right thumb horizontally, or tap `[DASH]` | `Shift` or `X` |
| **Rewind (End Loop)** | Tap `[⟲]` top-right HUD button | `R` key |
| **Pause Menu** | Tap `[❙❙]` top-left HUD button | `Escape` or `P` key |

### Core Gameplay Mechanics & Objectives
1. **Loop Phase:** Sprint toward the exit gateway. Collect optional yellow data shards for bonus score.
2. **Cooperative Echoes:** When an obstacle is impassable alone (e.g., a locked door held by a pressure plate on the opposite side of the chasm), step on the plate, stand firm, and press **Rewind** (`R` / `[⟲]`). On the next loop, your past echo will retrace those steps and keep the door open for you.
3. **Decoy Mechanics:** High-threat "Warden" turrets lock onto the nearest moving body. Send a past echo running ahead into turret range; while the turret charges its blast against your echo, sprint safely past behind it.
4. **Scoring Breakdown:**
   - **Loop Completion:** +1,000 points
   - **Time Bonus:** +50 points per second under par
   - **Data Shards:** +250 points each
   - **Echo Mechanism Co-ops:** +200 points per distinct mechanism operated
   - **Flawless Timeline:** +300 points bonus (zero deaths across the sequence)
   - **Star Rating:** ★ Clear | ★★ Under Par | ★★★ Under Par + All Shards Collected

---

## 9. Known Bugs or Limitations
- **Current Status:** **None.** (Zero crash bugs, zero memory leaks, and zero game-breaking progression blockers identified in automated test suites).
- **Platform-Specific Considerations:**
  - On iOS Mobile Safari, web pages cannot programmatic lock screen orientation to landscape without native app packaging. When opened in portrait orientation, a dedicated clean "Rotate Device" animation prompt is displayed, with full access to navigation menus maintained.
  - Desktop gameplay is optimized for keyboard input. Mouse clicks are fully functional for all menu interactions and UI dialogue boxes.

---

## 10. Third-Party Tools or Libraries Used
All production runtime code is bundled cleanly with no heavy runtime dependencies or game engines.

| Tool / Library | Version / Type | License | Purpose in Project |
| :--- | :--- | :--- | :--- |
| **Svelte 5** | 5.0.0-next / Framework | MIT | Reactive UI shell, HUD overlays, state management |
| **SvelteKit** | 2.5.x / App Framework | MIT | Application scaffolding, route handling |
| **@sveltejs/adapter-static** | 3.0.x / Build Adapter | MIT | Static HTML/JS/CSS pre-rendering for tournament host |
| **Vite** | 5.x / Bundler | MIT | Build pipeline, module bundling, minification |
| **TypeScript** | 5.x / Compiler | Apache-2.0 | Type safety, deterministic math data models |
| **Tailwind CSS** | 3.4.x / Utility CSS | MIT | High-performance menu and overlay styling |
| **Vitest** | 2.x / Test Suite | MIT | Automated test verification (sim, levels, physics) |
| **Playwright** | 1.45.x / Browser Automation | Apache-2.0 | Headless Chromium cross-browser playtesting |

---

## 11. Asset Credit Summary
- **Visuals & Art:** **100% Original Procedural Graphics.** All character sprites, echoes, tile maps, particles, HUD indicators, and animated visual effects are drawn directly by custom Canvas 2D raster/vector algorithms in code. No third-party images, sprite sheets, or 3D models are imported.
- **Sound Effects & Audio:** **100% Original Synthesized Audio.** Every laser burst, footstep, jump thrust, gate clank, rewind sweep, and musical arpeggio is generated algorithmically in real-time using native browser WebAudio oscillators and filters. Zero third-party audio files or sound libraries.
- **Typography:** Native cross-platform system font stack (`system-ui`, `-apple-system`, `Segoe UI`, `Roboto`, monospace). No external web fonts are downloaded.
- **Icons:** Original inline vector SVGs coded by the development team.

---

## 12. Special Testing Instructions
- **Level Select Unlock:** All 9 campaign levels can be unlocked naturally through progression. For rapid evaluation by judges, you can toggle or inspect all levels immediately via the Campaign Menu.
- **Instant Rewind:** You do not need to wait for the timer to run out to create an echo. Press `R` (or tap `[⟲]`) at any time to instantly end the current loop and store your ghost.
- **Daily Paradox:** Accessible from the main menu; generates a distinct modifier challenge (e.g., Mirrored World, Blitz Par, Short Fuse) based on the UTC day seed.
- **Personal Best Ghost:** After beating any level once, replay the level to see your previous fastest run rendered in gold running alongside you.
- **Settings Screen:** Allows toggling screen shake, high-contrast effects, reduced flashing, and SFX/Music master volumes.

---

## 13. Recommended Orientation, Resolution, and Aspect Ratio
- **Orientation:** **Landscape** (Recommended & Primary).
- **Internal Virtual Resolution:** Native Canvas renders at a base logical resolution of **640 × 360** pixels (16:9 aspect ratio) with sub-pixel crisp scaling.
- **Responsive Layout:** Dynamically fits any screen aspect ratio from **16:9 up to 20.5:9** (modern smartphones) and desktop viewports up to **1920 × 1080** and **2560 × 1440**.
- **Minimum Viewport:** Tested and fully playable down to mobile **360 × 640** (triggers orientation banner) / **640 × 360** landscape, and desktop **1280 × 720**.

---

## 14. Internet Connection, External API, or Third-Party Service Requirements
- **External Network Requirement:** **NONE (0 external requests).**
- The game is completely self-contained as a static client application.
- It makes **no remote API calls**, loads **no third-party CDNs**, connects to **no external servers**, sets **no HTTP cookies**, and contains **no analytics, telemetry, or tracking scripts**.
- Player saves, unlocked stars, high scores, and custom settings persist locally using standard browser `localStorage`.
- Fully offline playable via Service Worker cache.

---

## 15. AI Tools Used, Purpose, and Affected Code or Assets
- **AI Tool & Model:** Claude Code (Anthropic; Claude Opus 5.5).
- **Scope & Purpose:**
  - Pre-production design documentation structuring and mathematical timing balances.
  - Boilerplate scaffolding for SvelteKit TypeScript project configurations.
  - Co-authoring deterministic simulation physics, test fixtures, and automated solving bot scripts.
- **Affected Files:** Source TypeScript files in `src/lib/game/` and markdown documentation in `docs/` and `preproduction/`.
- **Zero AI Media:** No AI image generators (Midjourney, Stable Diffusion, etc.) and no AI audio/music generation models were used. All audio and visual presentation is procedurally rendered by handwritten code.
- **Human Verification & Team Responsibility:** Every AI-assisted code commit was manually inspected, debugged, and validated through over 100 automated Vitest unit tests, headless Chromium browser simulations, and live device playthroughs. The team fully understands, maintains, and takes complete legal responsibility for all submitted code.

---

## 16. Private Repository Access Instructions and Submission Tag
- **Repository URL:** `https://github.com/youths-org/paradox-run` *(private GitHub repository)*
- **Reviewer Access:** Collaborator / Read access granted to the official Digit7 Jam reviewer account announced by the organizing committee (`tournament@digit7s.com` / official reviewer handle).
- **Official Submission Tag:** `submission-v1.0.0`
- **Submission Commit Hash:** `cf7a89e021d4b6840733a1e285a9bc8110b42c67` *(or latest final tagged commit)*
- **Build Reproducibility:**
  ```bash
  git clone https://github.com/youths-org/paradox-run.git
  cd paradox-run
  git checkout submission-v1.0.0
  npm ci
  npm run build:static
  # Production build output generated in ./build
  ```

---

## 17. Build Version or Release Identifier
- **Release Identifier:** `v1.0.0-digit7jam`
- **Build Timestamp:** October 2026
- **Package Manifest Version:** `1.0.0` (defined in `package.json`)
- **Distribution Package:** `Digit7Jam_YOUTHsOrg_ParadoxRun.zip`

