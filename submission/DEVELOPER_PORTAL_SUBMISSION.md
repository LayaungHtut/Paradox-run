# DEVELOPER PORTAL SUBMISSION GUIDE & FIELD DATA PACK

**Competition:** Digit7 Jam 2026 (HTML Arcade Game Tournament)  
**Portal URL:** `https://gamejam.digit7s.com/`  
**Portal Opening:** 1 October 2026 (Official Kickoff)  
**Deadline:** 31 October 2026, 23:59:59 Myanmar Time (UTC+06:30)  
**Compliance Reference:** Digit7 Jam Submission Format & Technical Guide §3, §15

---

> [!TIP]
> Review the fields and complete placeholders before copying into the **Digit7 Jam Developer Portal**. Review/device checks are owner-reported; detailed evidence is tracked in [validation record](../docs/VALIDATION_RECORD.md).

---

## SECTION 1: TEAM INFORMATION (Guide §3.1)

| Portal Field | Value / Form Input |
| :--- | :--- |
| **Team Name** | `YOUTHs Org` |
| **Main Contact Person** | `[Insert Lead Representative / Contact Name]` |
| **Email Address** | `contact@youths.org` *(or registered email)* |
| **Phone Number** | **TODO: team lead's real phone number** |
| **Telegram Username** | `@youths_admin` *(registered Telegram account)* |
| **Number of Team Members** | `3` *(team lead and two members, as reported by the owner)* |
| **Team Member Names** | `1. [Team Lead Name]`, `2. [Member 2 Name]`, `3. [Member 3 Name]` |
| **Team Member Roles** | `[Confirm each member's role; review and testing were shared by the three members]` |
| **Institution / Company / Independent / Student** | `Independent / Student` |
| **Registration ID** | `D7J-2026-REG-XXXX` *(issued during registration)* |

---

## SECTION 2: GAME INFORMATION (Guide §3.2)

| Portal Field | Exact Value to Enter / Copy-Paste |
| :--- | :--- |
| **Game Title** | `PARADOX RUN` |
| **Short Game Description** | `A mobile-first HTML5 arcade platformer where every run you lose becomes an echo that runs with you. Player ghosts replay past inputs from tick zero, holding switches, tripping timed relays, riding lifts, and acting as decoys against lethal turrets. Win by turning your failed attempts into cooperative teammates.` |
| **Game Genre** | `Time-Loop Arcade Platformer / Action-Puzzle` |
| **Gameplay Instructions** | `Touch (Mobile): Slide left thumb to run; tap right screen to jump (hold for variable height); flick right thumb or tap [DASH] to dash; tap [⟲] to rewind early and bank your ghost.<br>Keyboard (Desktop): A/D or Left/Right arrows to run; Space/W/Up to jump; Shift/X to dash; R to rewind; Esc/P to pause.<br>Objective: Reach the exit portal within par time. Use echoes to solve multi-switch puzzles and block turret lasers.` |
| **Responsive Layout** | `Yes (Dynamic auto-scaling canvas with aspect-ratio preservation; responsive viewport support from 360x640 mobile to 1920x1080+ desktop)` |
| **Supported Browsers and Versions** | `Targets: Chrome, Safari, Edge and Firefox. Historical Chromium automation and owner-reported Android/iPhone checks; tested versions still to be recorded.` |
| **Estimated Play Duration** | `15 to 25 minutes (Full 9-level campaign; 30–90 seconds per level loop + Daily Paradox challenge)` |
| **Main Game Mechanics** | `Deterministic 60Hz input-recording loop, cooperative echo playback, coyote-time jump physics, mid-air dash, pressure plates, timed relays, kinetic lifts, nearest-target Warden turrets, collectible shards, and par-time scoring.` |
| **Retention / Engagement Feature** | `1. Daily Paradox: date-seeded daily remixed level with unique modifiers (e.g., Mirrored, Short Fuse) and local win-streaks.<br>2. Personal Best Ghost: races beside the player in gold on replayed levels.<br>3. Star Progression & 13 In-Game Achievements.` |
| **Known Bugs or Limitations** | `Team review, device/audio checks and playtesting are reported complete with positive feedback. Detailed findings, tested versions, hardware performance measurements and five unfamiliar-player session records are not yet supplied. Portrait gameplay uses a rotate prompt.` |
| **Recommended Orientation** | `Landscape` |
| **Target Devices / Operating Systems** | `Windows 10/11, macOS, Android 10 or later, iOS 16 or later` |
| **Recommended Resolution / Aspect Ratio** | `640 x 360 base logical resolution; 16:9 aspect ratio (dynamically scales to 16:10, 19:9, 20:9)` |
| **External Network or API Use** | `None` *(Declare explicitly as 'None' — 0 network requests, 0 external APIs, 100% offline self-contained)* |
| **AI Tools Used and Purpose** | `Claude Code (Anthropic; model recorded as Claude Opus 5.5) assisted with implementation, tests, planning and documentation. Codex (OpenAI) assisted with review, date corrections and validation documentation. Procedural rendering/audio code is AI-assisted; no image-, music- or voice-generation-model output is recorded. The owner reports completed review and testing by the three-member team; reviewer/device details and individual results remain to be recorded.` |

---

## SECTION 3: SUBMISSION MATERIALS UPLOAD & LINKS (Guide §3.3)

| Portal Item | File to Upload or Link to Provide | Verification Check |
| :--- | :--- | :--- |
| **Playable Game Link** | `https://gamejam.digit7s.com/teams/youths-org/` *(or assigned Digit7s hosting URL)* | Must open directly over HTTPS with zero login |
| **Playable Build ZIP File** | `Digit7Jam_YOUTHsOrg_ParadoxRun.zip` | Must be ≤ 200 MB (Actual: ~2 MB); runtime files only |
| **Source Code / Repository Link** | `https://github.com/LayaungHtut/Paradox-run` | Private repo; reviewer access granted; tagged `submission-v1.0.0` |
| **Screenshots Upload** | Upload 4 PNG images:<br>1. `YOUTHsOrg_ParadoxRun_Screenshot01.png` (Title / Start)<br>2. `YOUTHsOrg_ParadoxRun_Screenshot02.png` (Gameplay Action)<br>3. `YOUTHsOrg_ParadoxRun_Screenshot03.png` (Results / Score)<br>4. `YOUTHsOrg_ParadoxRun_Screenshot04.png` (Echo / Decoy Feature) | Clean 16:9 PNG files from `store/screenshots/` |
| **Demo Video Link** | `https://youtu.be/xxxxxxxxxxx` *(or direct MP4 upload: `Digit7Jam_YOUTHsOrg_ParadoxRun_Demo.mp4`)* | 1 to 3 minutes duration; contains all 7 required segments |
| **README File** | Upload `README_YOUTHsOrg_ParadoxRun.md` | Contains all 17 required technical items from Guide §6 |
| **Asset Credit List** | Upload `ASSET_CREDIT_LIST.md` | Full credit matrix across art, audio, fonts, and open-source code |
| **License Proof** | Upload `LICENSE_PROOF.md` | Verifies MIT & Apache-2.0 compliance for all libraries |
| **Originality Declaration** | Upload `ORIGINALITY_DECLARATION.md` | Contains all 8 confirmed statements from Guide §10 |
| **Technical Notes** | Upload `TECHNICAL_NOTES.md` | Explains 60Hz determinism, memory budget, and compatibility |
| **AI Use Declaration** | Upload `AI_USE_DECLARATION.md` | Discloses Claude Code and Codex assistance, procedural-media code, and reported versus documented verification |
| **Team Profile** | Upload `TEAM_PROFILE.md` | Contains member roles, contact info, and background |

---

## SECTION 4: STEP-BY-STEP FINAL SUBMIT WORKFLOW (Guide §15)

1. **Sign In:** Log in to the Digit7 Jam Developer Portal using team registration credentials.
2. **Open Workspace:** Navigate to the registered team workspace for **YOUTHs Org**.
3. **Fill Form Data:** Copy and paste the exact strings from Sections 1 and 2 above.
4. **Upload Materials:** Attach the ZIP file, screenshots, README, and markdown compliance documents.
5. **Provide Links:** Paste the deployed game URL, private GitHub repository URL, and demo video link.
6. **Save Draft & Review:** Click **Save Draft** to validate all required fields, file formats, and file-size constraints.
7. **Perform Final Submit:** Click **Final Submit**.
   > [!IMPORTANT]
   > Merely saving a draft or uploading files does **NOT** count as an official submission! You must click **Final Submit** to complete the entry.
8. **Record Submission Reference:** When the portal displays the success confirmation dialog, immediately copy and screenshot the generated **Submission Reference ID** and timestamp for your official records.
9. **Lockdown Awareness:** The portal automatically locks at **31 October 2026, 23:59:59 MMT**. (Resubmissions are permitted before this timestamp if updates are required).

