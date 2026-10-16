# ORIGINALITY & OWNERSHIP DECLARATION

**Competition:** Digit7 Jam 2026 (HTML Arcade Game Tournament)  
**Organized by:** Digit7s Myanmar  
**Game Title:** PARADOX RUN  
**Team Name:** YOUTHs Org  
**Date of Declaration:** October 2026  
**Compliance Standard:** Digit7 Jam Official Participation Rules §6, §10, §13, §14 & Technical Guide §10

---

## 1. Formal Confirmation of Official Requirements

In accordance with Section 10 of the *Digit7 Jam Submission Format & Technical Guide*, the development team of **PARADOX RUN** formally declares and affirms each of the following eight (8) mandatory statements:

1. **Newly Developed:** The submitted game, including its code architecture, level layouts, physics routines, and visual systems, was developed for the Digit7 Jam competition period (1–31 October 2026).
2. **Not Copied:** The game is an original creation and is not copied, cloned, or plagiarized from any existing game.
3. **Not Commercially Available:** The game is not already published publicly on any commercial app stores, digital game markets, or web portals.
4. **Lawful Right of Use:** The team possesses the full legal right and authorization to utilize all software libraries, tools, and code comprising the submission.
5. **No Third-Party Infringement:** The game does not infringe upon any third-party intellectual property rights, trademarks, patents, copyrights, or trade secrets.
6. **Proof of Originality:** The team is fully prepared and able to provide verifiable proof of originality, design documentation, and commit histories upon request by the organizing committee or judges.
7. **Complete AI Disclosure:** The team has fully disclosed all AI-assisted and AI-generated code, documentation, and tooling in the accompanying *AI Use Declaration* (§9).
8. **Accurate Repository History:** The submitted private GitHub repository and its sequential commit history accurately represent the progressive work completed during the competition period.

---

## 2. Transparent Pre-Production & Development Disclosure

To maintain absolute integrity, honesty, and full compliance with Rule §6 (Originality) and Rule §14 (Originality Review), the team provides the following detailed disclosures:

### A. Pre-Competition Conceptual Ideation (September 2026)
Prior to the official kickoff date of 1 October 2026, the team drafted high-level conceptual documents, mathematical timing curves, and game-feel notes (documented in `preproduction/`). A preliminary, throwaway exploratory prototype was evaluated in late September to test whether a deterministic 60 Hz input-recording loop was technically viable in pure HTML5 Canvas.

**Quarantine & Fresh Implementation Policy:**
- In strict adherence to Rule §6 forbidding pre-existing code, the exploratory spike was completely quarantined.
- The official competition codebase and private GitHub repository were created fresh during October 2026.
- All game levels, tile collision routines, WebAudio procedural instruments, player state machines, and HUD components were implemented from scratch during the active competition development window.
- The commit log reflects this clean, step-by-step engineering progression.

---

## 3. Prior Art Analysis & Independent Creative Expression

The temporal mechanic of "recording player inputs and replaying them as a cooperative ghost" has an established history in the puzzle-platforming genre (notably games like *Chronotron* [2008] and *The Company of Myself* [2009]). Game mechanics themselves are foundational concepts, but **PARADOX RUN** is distinct and original in design, execution, mechanics, and art direction:

| Comparison Dimension | Classic Genre Precedents (Chronotron, etc.) | PARADOX RUN (Digit7 Jam Entry) |
| :--- | :--- | :--- |
| **Genre & Pace** | Slow, untimed, cerebral puzzle-solving | **High-tempo arcade action** with tight 15–25s countdown timers, par times, and multiplier chasing |
| **Echo Interaction** | Static switch holding and platform stacking | **Dynamic Decoy System:** Enemy turrets track the nearest physical body; past selves absorb lethal bullets to clear living paths |
| **Mobility & Feel** | Standard 4-direction grid or stiff jumping | **Fluid arcade mobility:** Air-dash maneuvers, coyote-time jumping, variable-height leaps, and momentum slides |
| **Visual Architecture** | Static pixel tile sheets or imported bitmaps | **100% Procedural Canvas 2D:** Real-time geometric vector rendering, chromatic temporal trails, dynamic camera zoom |
| **Audio Design** | Pre-recorded MP3/WAV tracks and sample packs | **Live WebAudio Synthesis:** Real-time synthesized audio whose tension and tempo dynamically scale with remaining loop time |
| **Asset Origin** | Commercial or third-party asset packs | **Zero Third-Party Media:** No imported art, no imported audio samples, no downloaded font files |

No code, art assets, levels, dialogue, audio samples, or proprietary files were referenced, extracted, or duplicated from any other work.

---

## 4. Code & Asset Provenance Summary

- **Source Code:** Authored in TypeScript and Svelte 5 by the team, using modern modular architecture.
- **Audio Synthesis:** Authored through custom WebAudio oscillator graphs (`OscillatorNode`, `GainNode`, `BiquadFilterNode`).
- **Visuals & Animation:** Authored through native Canvas 2D rendering methods (`arc`, `lineTo`, `stroke`, `fill`).
- **External Dependencies:** Limited strictly to standard, permissive open-source development frameworks (MIT / Apache-2.0 licenses).

---

## 5. Affirmation & Verification Contact

The team acknowledges that providing false, misleading, or plagiarized information constitutes grounds for immediate disqualification under Rule §13. The team stands ready to participate in technical screening, code walkthroughs, or live Q&A with the Digit7 Jam judging committee.

**Signed on behalf of Team YOUTHs Org:**

- **Team Representative / Lead Developer:** Lead Developer, YOUTHs Org  
- **Technical Contact Email:** `tournament@digit7s.com` / `contact@youths.org`  
- **Official Telegram Support Contact:** `@youths_admin`  
- **Date:** October 2026

