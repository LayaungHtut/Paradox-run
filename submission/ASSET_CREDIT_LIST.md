# ASSET CREDIT LIST

**Competition:** Digit7 Jam 2026 (HTML Arcade Game Tournament)  
**Organized by:** Digit7s Myanmar  
**Game Title:** PARADOX RUN  
**Team Name:** YOUTHs Org  
**Date of Submission:** October 2026  
**Compliance Reference:** Digit7 Jam Submission Format & Technical Guide §2, §8

---

## 1. Asset Strategy & Overview

The primary engineering philosophy of **PARADOX RUN** was to achieve zero external media baggage.

- **Graphics:** 100% original, procedurally rendered at runtime using native HTML5 Canvas 2D methods.
- **Audio:** 100% original, synthesized in real-time via the browser's native WebAudio API.
- **Typography:** 100% native system fonts.
- **File Footprint:** Because no heavy image PNGs/JPGs, 3D models, or WAV/MP3 files are bundled, the total production build is extremely lightweight (~410 KB uncompressed, ~160 KB zipped), far below the tournament's 200 MB maximum threshold.

---

## 2. Comprehensive Asset & Dependency Credit Matrix

In accordance with Section 8 of the _Digit7 Jam Submission Format & Technical Guide_, the table below itemizes every asset category, runtime library, development tool, and procedural system utilized in the game:

| Asset Category               | Asset / Item Name                 | Source & Creator                                              | License Type                        | Description & Usage in Project                                                                                                                                                                                               |
| :--------------------------- | :-------------------------------- | :------------------------------------------------------------ | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Art / Graphics**           | Procedural Vector Sprites & Tiles | Original work by YOUTHs Org                                   | Proprietary (Digit7 Jam Submission) | Player runner, echoes, pressure plates, gates, timed relays, lifts, turrets, projectile bolts, exit portals, particles, and backgrounds. Drawn via custom Canvas 2D math (`arc`, `stroke`, `fill`). No external image files. |
| **Music**                    | Generative Adaptive Soundtrack    | Original work by YOUTHs Org                                   | Proprietary (Digit7 Jam Submission) | Dynamic background synth score generated in real-time by code using WebAudio oscillators. Musical intensity and chord progression escalate dynamically as loop time expires. Zero audio recordings.                          |
| **Sound Effects**            | Procedural Sound Effects Engine   | Original work by YOUTHs Org                                   | Proprietary (Digit7 Jam Submission) | Custom WebAudio frequency modulation synthesis producing all game sounds: jump thrusts, landing thuds, air dashes, rewind sweeps, button clicks, laser discharges, door openings, and death bursts.                          |
| **Fonts**                    | Modern System Font Stack          | Native Operating System (Apple, Microsoft, Google)            | System Native / Standard OS Fonts   | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` for UI; `ui-monospace, monospace` for timers and numbers. Zero external web font files downloaded.                          |
| **Code Libraries (Runtime)** | Svelte 5                          | Svelte Core Team / Open Source (`github.com/sveltejs/svelte`) | MIT License                         | Declarative UI framework powering screen navigation, HUD overlays, dialog boxes, and settings panels.                                                                                                                        |
| **Code Libraries (Runtime)** | SvelteKit 2                       | Svelte Core Team / Open Source (`github.com/sveltejs/kit`)    | MIT License                         | Application router and static asset coordinator.                                                                                                                                                                             |
| **Code Libraries (Build)**   | @sveltejs/adapter-static          | Svelte Core Team / Open Source                                | MIT License                         | Pre-renders the entire application into pure static HTML, JavaScript, and CSS for zero-dependency hosting.                                                                                                                   |
| **Code Libraries (Build)**   | Vite 5                            | Evan You & Vite Contributors (`vitejs.dev`)                   | MIT License                         | Fast build bundler, ES module minifier, and code splitting engine.                                                                                                                                                           |
| **Code Libraries (Build)**   | TypeScript 5                      | Microsoft Corporation (`typescriptlang.org`)                  | Apache License 2.0                  | Static type safety, interface enforcement, and mathematical compilation.                                                                                                                                                     |
| **Code Libraries (Build)**   | Tailwind CSS 3                    | Tailwind Labs Inc. (`tailwindcss.com`)                        | MIT License                         | Utility CSS framework used to style responsive menus, buttons, overlays, and modal views.                                                                                                                                    |
| **Plugins**                  | None                              | N/A                                                           | N/A                                 | No third-party game engine plugins, analytics plugins, ad-network SDKs, or external trackers are included.                                                                                                                   |
| **Templates**                | SvelteKit Minimal Starter         | Svelte Team (`create-svelte`)                                 | MIT License                         | Official minimal project scaffold. All game loops, level engines, and physics were written from scratch.                                                                                                                     |
| **AI-Generated Assets**      | None (Media)                      | N/A                                                           | N/A                                 | No AI-generated images, illustrations, audio files, sound samples, voiceovers, or 3D meshes were used. (See _AI Use Declaration_ for code assistance disclosure).                                                            |

---

## 3. License Compliance & Legal Usability Statement

1. **Permissive Open-Source Terms:** All third-party libraries used in the build pipeline operate under highly permissive, standard commercial-friendly open-source licenses (**MIT** and **Apache 2.0**).
2. **Attribution & Rights Retention:** Standard copyright notices and license text from open-source contributors are preserved in the build distribution per legal requirements.
3. **No Commercial Conflicts:** No proprietary third-party assets, royalty-encumbered sound libraries, copyrighted character designs, or trademarked visual assets are present in any part of this submission.
4. **Originality Guarantee:** All game mechanics, level maps, art styling, and musical synthesis formulas are the original creative property and expression of Team YOUTHs Org.

---

**Signed by Team YOUTHs Org:**

- **Lead Developer & Representative:** Lead Developer, YOUTHs Org
- **Date:** October 2026
