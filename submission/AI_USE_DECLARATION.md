# AI USE DECLARATION

**Competition:** Digit7 Jam 2026 (HTML Arcade Game Tournament)  
**Organized by:** Digit7s Myanmar  
**Game Title:** PARADOX RUN  
**Team Name:** YOUTHs Org  
**Date of Declaration:** October 2026  
**Compliance Reference:** Digit7 Jam Official Participation Rules §8 & Technical Guide §9, §16

---

## 1. Executive Summary & Policy Compliance

In strict compliance with **Section 9 (AI Use Requirement)** of the *Digit7 Jam Submission Format & Technical Guide* and **Rule 8 (AI Use Policy)** of the *Official Participation Rules*, Team YOUTHs Org provides this formal disclosure of all Artificial Intelligence (AI) tools and models utilized in the production of **PARADOX RUN**.

The development team affirms that:
1. Every line of AI-assisted code was manually reviewed, verified, refactored, and tested by team engineers.
2. The team retains full architectural ownership, comprehension, and ongoing maintenance capability of the entire codebase.
3. No confidential, proprietary, or personally identifiable data was shared with any AI system.
4. No third-party copyrights or licenses were infringed through AI usage.

---

## 2. Category-by-Category AI Use Status

| AI Item / Asset Category | Status in Submission | Disclosure Details & Verification |
| :--- | :--- | :--- |
| **AI-Generated Code** | **Permitted & Disclosed** | **Assisted by Claude Code (Anthropic; Claude Opus 5.5).** Used to draft initial module scaffolding, test cases, deterministic math algorithms, and build scripts. Every module was inspected, debugged, and validated through 100+ automated tests and human review. |
| **AI-Generated Art** | **None Used (0%)** | Zero AI image models (e.g., Midjourney, DALL-E, Stable Diffusion) were used. All visual elements, tiles, sprites, HUD icons, and particles are procedurally rendered in real-time via handwritten HTML5 Canvas 2D vector code. |
| **AI-Generated Music** | **None Used (0%)** | Zero AI music generators (e.g., Suno, Udio) were used. All background audio is generated dynamically at runtime via native WebAudio oscillator frequency calculations written directly in TypeScript. |
| **AI-Generated Voice / SFX** | **None Used (0%)** | Zero voice recordings or AI voice synthesizers (e.g., ElevenLabs) were used. All sound effects are mathematical frequency sweeps and noise bursts synthesized live in WebAudio. |
| **Other Non-Code AI Assets** | **None Used (0%)** | No pre-rendered AI textures, fonts, 3D models, or story scripts were incorporated. |

---

## 3. Tool Inventory & Scope of Assistance

### Primary Tool Used
- **Tool Name:** Claude Code (Command-line Assistant)
- **Developer / Provider:** Anthropic, PBC
- **Underlying Model:** Claude Opus 5.5
- **Operating Period:** October 2026 (Development Phase)

### Specific Scope of Utilization
1. **Mathematical Simulation & Determinism:**
   - Assistance with formulating fixed-step 60 Hz Euler physics equations, coyote-time jump buffers, sub-pixel axis-aligned bounding box (AABB) collisions, and tile-map raycasting.
2. **Deterministic Replay Codec:**
   - Assistance in designing an efficient bitmask serialization algorithm to pack per-frame player inputs (Left, Right, Jump, Dash) into compact byte streams for echo playback.
3. **Automated Verification & Solvability Bots:**
   - Writing scripted closed-loop "player bot" test fixtures in Vitest that autonomously simulate and verify that all campaign levels are 100% solvable with echoes and mathematically impossible without them.
4. **Documentation & Formatting:**
   - Structuring markdown technical architecture guides, deployment procedures, and tournament compliance documentation.

---

## 4. Human Review, Testing, and Quality Assurance Process

Under Digit7 Jam rules, the submission must demonstrate that the team actively reviewed and maintains the code. The following multi-tiered validation workflow was enforced for every commit:

```
[AI Proposal / Draft] 
       │
       ▼
[Human Code Review]  ──► Inspect logic, variable names, boundary conditions, edge cases
       │
       ▼
[Type & Static Check] ──► svelte-check (TypeScript) + ESLint + Prettier
       │
       ▼
[Automated Test Suite] ──► 107 Vitest tests (Deterministic Physics, Collision, Solvability)
       │
       ▼
[Real Browser Testing] ──► Headless Chromium (Playwright) + Mobile Touch Playtesting
       │
       ▼
[Signed Approval & Commit] ──► Merged into submission repository
```

### Key Verification Milestones:
- **Memory & Resource Safety:** Automated tests verify that WebAudio contexts and Canvas frame buffers do not leak memory or accumulate stale references during repeated loop rewinds.
- **Audio Integrity:** Automated headless Chromium sweeps sampled every synthesized sound effect offline to confirm zero audio clipping, zero NaN audio buffers, and clean dynamic range.
- **Explainability:** All core modules (`world.ts`, `actors.ts`, `audio.ts`, `loop.ts`, `mechanisms.ts`) have clear inline docstrings and explicit architecture mappings so team members can explain any line during judging reviews.

---

## 5. Portal AI Use Declaration (Ready-to-Paste Text)

For direct entry into the **Digit7 Jam Developer Portal** submission field:

> **AI Tools Used and Purpose:**  
> Claude Code (Anthropic, model: Claude Opus 5.5) was used during October 2026 for development assistance: drafting deterministic physics routines, input bitmask replay codecs, Vitest automated test fixtures, and technical documentation.  
>   
> **Affected Code & Assets:**  
> TypeScript source files within the game simulation, state logic, and test suites.  
>   
> **Media Status:**  
> Absolutely no AI-generated images, music, voices, or textures were used. 100% of the game's visuals are procedural Canvas 2D vector code, and 100% of sound/music is live WebAudio synthesis written in TypeScript.  
>   
> **Human Review & Verification:**  
> Every AI-assisted code segment underwent rigorous manual code review, refactoring, and automated verification through 107 Vitest tests and headless browser validation. The team fully understands, maintains, and assumes complete legal and technical responsibility for the entire codebase.

---

**Signed by Team YOUTHs Org:**  
- **Lead Developer & Technical Contact:** Lead Developer, YOUTHs Org  
- **Date:** October 2026

