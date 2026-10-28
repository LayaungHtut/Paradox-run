# TECHNICAL NOTES & ARCHITECTURAL SPECIFICATION

**Competition:** Digit7 Jam 2026 (HTML Arcade Game Tournament)  
**Organized by:** Digit7s Myanmar  
**Game Title:** PARADOX RUN  
**Team Name:** Zenith  
**Date of Submission:** October 2026  
**Compliance Reference:** Digit7 Jam Submission Format & Technical Guide §2, §7, §13, §15

---

## 1. System Overview & Technology Stack

**PARADOX RUN** is engineered as a zero-dependency, ultra-lightweight client-side web application. It combines high-performance native HTML5 graphics and audio APIs with modern reactive frontend primitives:

- **Core Game Loop & Simulation:** Custom fixed-step 60 Hz physics engine written in pure TypeScript.
- **Rendering Pipeline:** Hardware-accelerated HTML5 Canvas 2D with procedural vector generation.
- **Audio Synthesizer:** Native WebAudio API oscillator graphs generating dynamic SFX and music.
- **UI Shell & Menus:** Svelte 5 with fine-grained reactivity (runes) compiled to minimal JavaScript.
- **Application Bundle:** Pre-rendered static distribution generated via `@sveltejs/adapter-static` and Vite 8.

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER RUNTIME ENVIRONMENT                 │
├────────────────────────────────┬────────────────────────────────┤
│       SVELTE 5 UI SHELL        │      CANVAS 2D GAME ENGINE     │
│   (Menus, HUD, Dialogs, Store) │  (60Hz Fixed-Step Loop, Euler) │
├────────────────────────────────┴────────────────────────────────┤
│                    CORE GAME SERVICES LAYER                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │  Replay Bitmask  │  │ Dynamic WebAudio │  │  Local Storage │ │
│  │   Input Codec    │  │  Live Synthesizer│  │  State Manager │ │
│  └──────────────────┘  └──────────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Deterministic 60 Hz Simulation & Replay Engine

### A. Fixed-Step Physics Loop

To keep recorded past runs (echoes) consistent across rendering frame rates, the simulation uses an accumulator-based fixed time step. This design is not a substitute for cross-device replay testing:

- **Tick Rate:** Fixed at exactly **60 ticks per second** (`Δt = 16.666 ms`).
- **Input Sampling:** Inputs are gathered once per physics tick and packed into a compact 8-bit mask:
  - Bit 0: Move Left
  - Bit 1: Move Right
  - Bit 2: Jump
  - Bit 3: Dash
  - Bit 4: Rewind
- **Collision Detection:** Continuous Axis-Aligned Bounding Box (AABB) sweeps against a discrete tile grid, with corner-rounding correction for responsive platforming.

### B. Echo Storage & Deterministic Playback

- When a loop ends (via death, timer expiry, or manual rewind), the array of recorded input bitmasks is stored in memory.
- When the next loop begins, the game world resets, and active echoes re-execute the exact bitmask sequence starting at tick 0.
- Echoes interact with the world physically (triggering pressure plates, tripping timed relays, and intercepting turret bullets) but do not collide with each other or the living player.

---

## 3. Responsive Display, Resolution, and Viewport Handling

### A. Virtual Resolution & Scaling

- **Native Logical Resolution:** **640 × 360** (16:9 aspect ratio).
- **Auto-Scaling Algorithm:** The canvas dynamically scales using CSS integer scaling / high-DPI device-pixel-ratio scaling. It letterboxes / pillarboxes gracefully to maintain proper aspect ratio without distortion.
- **Recorded viewport coverage:** Historical Chromium checks covered 360 × 640, 640 × 360 and 1280 × 720. Physical-device readability results have not been documented individually.
- **Intended mobile behaviour (device checks reported complete; detailed results pending):**
  - **Landscape Mode (Target):** Controls automatically map to thumb regions (left 40% for directional steering, right 60% for jumps and dashes) keeping the action unobscured.
  - **Portrait Mode:** Fully playable when held vertically: the HUD drops the loop bar to a second row, the touch controls restack, and the level intro shows a "turn sideways for a wider view" tip. Rotating mid-run re-lays out without pausing.

---

## 4. Performance, Memory, and Asset Budgets

Performance figures must be tied to a tested build, device and measurement method. The earlier
load-time, memory and mobile-FPS numbers had no supporting measurement record and are withdrawn.

| Metric          | Target                      | Recorded evidence                                                 |
| --------------- | --------------------------- | ----------------------------------------------------------------- |
| Initial load    | ≤ 10 seconds                | No device/network-specific timing supplied                        |
| Playable ZIP    | ≤ 200 MB                    | Measure the final archive; no verified current size recorded here |
| Runtime memory  | Stable during extended play | No heap trace or leak investigation supplied                      |
| Frame pacing    | 60 FPS target               | Team reports device testing; no hardware frame trace supplied     |
| Startup latency | Prompt interaction          | No measured time-to-interactive supplied                          |

### Memory Management & Garbage Collection:

- **Object Pooling:** Particle effects, projectile bolts, and timeline link lines are allocated from fixed reusable object pools to eliminate runtime garbage collection stutter.
- **Audio Context Recycling:** A single shared `AudioContext` is maintained throughout the game session, avoiding resource exhaustion on mobile browsers.

---

## 5. Security, Privacy, and Network Disclosures

In compliance with **Guide §7.7 (Security Requirement)** and **Guide §7.8 (API Requirement)**:

1. **External Network Requests:** **Declared as "None" (0 requests).**
   - No external REST/GraphQL APIs are called.
   - No remote web services, multiplayer sockets, or backend databases are queried during gameplay.
   - Zero third-party telemetry, Google Analytics, Facebook Pixel, or tracking scripts are loaded.
   - Zero advertisements or monetization SDKs.
2. **Local Storage Usage:**
   - Campaign progress, star counts, unlocked achievements, custom settings, and personal best ghost recordings are saved in the browser's native `localStorage` under isolated key names (`paradox_run_progress`, `paradox_run_settings`).
   - All saved data includes schema validation and automated corrupted-save fallback routines to prevent crashes if local storage is modified or corrupted.
3. **Malware & Script Safety:**
   - Contains no obfuscated code, cryptominers, background workers, or executable binaries.
   - Clean, standard ES module build verified via static analysis.

---

## 6. Browser & Device Compatibility Matrix

| Environment                                | Evidence                                                         | Details still required                                                              |
| ------------------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Desktop Chromium                           | Historical automated browser checks recorded in the AI use log   | Exact submission-build result and browser version                                   |
| Other desktop browsers / operating systems | Broad compatibility previously claimed without a detailed matrix | Named OS/browser versions and individual test results                               |
| Physical Android                           | Owner reports completed team checks                              | Model, OS/browser version, build, scenarios, findings and performance measurements  |
| Physical iPhone                            | Owner reports completed team checks                              | Model, iOS/browser version, build, scenarios, findings and performance measurements |
| Installed Android app                      | Historical build/signature verification recorded                 | Confirm whether reported device checks included the native app                      |

The owner's 22 October confirmation covers the three-member team's review, device/audio checks
and playtesting, with positive tester feedback. It does not identify every tested platform.
See [validation record](../docs/VALIDATION_RECORD.md).

---

## 7. Known Limitations and Edge Cases

- **Evidence gaps:** Reviewer names, device versions, measured hardware performance and detailed findings remain to be recorded. Five unfamiliar-player sessions have not been documented. The report of completed checks does not establish zero crashes, leaks or audio errors.

- **WebAudio Autoplay Policies:** Modern browsers block audio output until the user interacts with the page. PARADOX RUN detects this standard browser restriction and seamlessly unlocks the WebAudio context upon the player's very first tap or keypress, subject to device-specific verification.
- **Keyboard vs. Mouse Gameplay:** In-game character movement requires touch on mobile or keyboard on desktop. Desktop mouse control is intentionally dedicated to navigating menus, settings, and dialogue buttons.

---

**Signed by Team Zenith:**

- **Lead Developer & Technical Contact:** La Yaung Htut, Zenith
- **Date:** October 2026
