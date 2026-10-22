# AI USE DECLARATION

**Competition:** Digit7 Jam 2026 (HTML Arcade Game Tournament)  
**Game Title:** PARADOX RUN  
**Team Name:** YOUTHs Org  
**Updated:** 22 October 2026

## 1. Disclosure and review status

AI tools assisted with code, tests, planning and documentation. On 22 October 2026, the
project owner confirmed that they and two other team members completed human code review,
physical Android/iPhone checks, audio listening checks and playtesting. The owner also
reported that testers said it was a "good game".

This is a team-reported completion statement. Reviewer names, review scope, test dates,
device/browser versions and individual findings have not yet been entered in the
[validation record](../docs/VALIDATION_RECORD.md). We do not claim that every line or every
commit received a documented review, or that testing proves the absence of bugs or leaks.
The team is responsible for the submitted work and for explaining and maintaining it.

## 2. Tools and affected work

| Tool | Period | Assistance and affected files |
| --- | --- | --- |
| Claude Code (Anthropic; model recorded in the development log as Claude Opus 5.5) | From 16 October 2026 | Initial implementation and revisions across source, tests, build scripts and documentation: simulation, rendering, procedural audio, UI, replay validation and deployment. See the [AI use log](../docs/AI_USE_LOG.md). |
| Codex (OpenAI) | 22 October 2026 | Project assessment, date corrections, verification-claim reconciliation and playtest-record preparation. Affected submission/planning documents, the AI use log, game design and validation record, date fixtures in `src/lib/state/progress-logic.spec.ts`, and the privacy-page update date in `src/routes/privacy/+page.svelte`. |

The recorded Claude model name is carried forward from the development log, not independently
verified by this documentation update.

## 3. Media and code assistance

| Category | Disclosure |
| --- | --- |
| Code and documentation | AI-assisted. Scope includes rendering and audio-synthesis code as well as gameplay, tests and documentation. |
| Images and visual assets | No image-generation-model output is recorded. Visuals are drawn procedurally by Canvas/SVG code; that code is within the disclosed AI-assisted scope. |
| Music and sound effects | No music-, voice- or audio-generation-model output is recorded. Audio is synthesized by WebAudio code; that code is within the disclosed AI-assisted scope. |
| Other generated media | No pre-rendered AI textures, fonts, 3D models or voice recordings are recorded. |

## 4. Verification and its limits

- **Historical automated checks:** The AI use log records Vitest, type/lint checks, Chromium
  browser runs, replay validation and build checks performed during development. Counts such
  as 107 refer to those historical runs, not a new full-suite result for this submission.
- **Recent targeted check:** Nine progression tests passed during the 22 October date
  corrections; the Svelte autofixer reported no issues or suggestions for the privacy page.
- **Human review and device/audio testing:** Completion is reported by the owner for the
  three-member team. Detailed evidence is being recorded separately; automated checks do not
  establish human understanding, sound quality or hardware performance.
- **Gameplay tests:** Scripted solutions exercise known routes. A route failing without echoes
  does not mathematically prove that every possible solo route is impossible.
- **Audio and memory:** Signal tests check the sampled sound outputs. They do not prove the
  quality of the mix or the absence of all memory leaks. No hardware-wide 60 FPS claim is made.
- **Unfamiliar-player feedback:** Positive feedback has been reported. The count, prior
  familiarity and observed outcomes of five independent sessions are not yet documented.

The [validation record](../docs/VALIDATION_RECORD.md) tracks reported completion, missing
details and follow-up observations. New edits, including this declaration, still need team
review; the owner's earlier confirmation does not automatically cover later changes.

## 5. Portal disclosure text

> Claude Code (Anthropic; model recorded as Claude Opus 5.5) assisted with implementation,
> tests, planning and documentation from 16 October 2026. Codex (OpenAI) assisted with project
> review, date corrections and validation documentation on 22 October 2026. AI assistance
> includes procedural rendering and audio code; no image-, music- or voice-generation-model
> output is recorded. The owner reports completed human code review, Android/iPhone checks,
> audio listening checks and playtesting by the three-member team, with positive tester
> feedback. Reviewer details, device versions and individual results remain to be entered in
> the validation record. Historical automated checks are listed separately in the AI use log.

**Team representative:** Name/signature to be supplied after review of this updated declaration.

**Signature date:** To be supplied.

