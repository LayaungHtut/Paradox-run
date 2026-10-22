# DIGIT7 JAM 2026 — OFFICIAL SUBMISSION PACK & MASTER INDEX

**Tournament:** Digit7 Jam (HTML Arcade Game Tournament 2026)  
**Organized by:** Digit7s Myanmar  
**Game Title:** PARADOX RUN  
**Team Name:** YOUTHs Org  
**Total Prize Pool:** MMK 20,000,000  
**Submission Deadline:** 31 October 2026, 23:59:59 Myanmar Time (UTC+06:30)  
**Official Portal:** `https://gamejam.digit7s.com/`  
**Compliance Standard:** Digit7 Jam Official Participation Rules & Submission Format Technical Guide

---

## 1. Directory Structure of the Submission Pack

All documentation and submission deliverables mandated by the Digit7 Jam official rulebooks have been generated and structured under `submission/`:

```
submission/
├── README_YOUTHsOrg_ParadoxRun.md       # Official Submission README (All 17 Required Items)
├── ORIGINALITY_DECLARATION.md           # 8-Point Originality & Prior Art Declaration (Guide §10)
├── AI_USE_DECLARATION.md                # Full AI Use & Human Verification Disclosure (Guide §9)
├── ASSET_CREDIT_LIST.md                 # Complete Media, Library & Tool Credit Matrix (Guide §8)
├── LICENSE_PROOF.md                     # Verification of Legal Usage (MIT / Apache-2.0) (Guide §12)
├── TECHNICAL_NOTES.md                   # 60Hz Physics, Memory, Rendering & Security Specs (Guide §7)
├── TEAM_PROFILE.md                      # Team Roster, Member Roles & Contact Channels (Guide §14)
├── DEVELOPER_PORTAL_SUBMISSION.md       # Complete Copy-Paste Field Data Pack for the Portal (Guide §3)
├── TECHNICAL_SCREENING_CHECKLIST.md     # 16-Point Pre-Flight Screening Audit & Anti-Rejection Gate
├── DEMO_VIDEO_GUIDE.md                  # 1–3 Minute Video Storyboard, Captions & Script (Guide §11)
├── SUBMISSION_PACK_INDEX.md             # This Master Index & Submission Operations Manual
└── screenshots/                         # Official Submission Screenshots (Guide §12)
    ├── YOUTHsOrg_ParadoxRun_Screenshot01.png  # Title Screen
    ├── YOUTHsOrg_ParadoxRun_Screenshot02.png  # Main Gameplay Action
    ├── YOUTHsOrg_ParadoxRun_Screenshot03.png  # Pause & Settings HUD
    ├── YOUTHsOrg_ParadoxRun_Screenshot04.png  # Level Select & Stars
    └── YOUTHsOrg_ParadoxRun_Screenshot05.png  # Daily Paradox Mode
```

---

## 2. Deliverables Cross-Reference Matrix (Guide §2 & §3.3)

| Deliverable Item | Official Requirement Status | Project File / Location | Key Details |
| :--- | :--- | :--- | :--- |
| **1. Game Title** | Required | In Portal & Docs | **PARADOX RUN** |
| **2. Team Name** | Required | In Portal & Docs | **YOUTHs Org** |
| **3. Main Contact / Leader** | Required | `TEAM_PROFILE.md` | Designated team leader with Telegram & email |
| **4. Game Description** | Required | `DEVELOPER_PORTAL_SUBMISSION.md` | Core time-loop echo premise & arcade mechanics |
| **5. Playable Game Link** | Required | `https://gamejam.digit7s.com/teams/youths-org/` | Deployed to Digit7s hosting environment; HTTPS |
| **6. Playable Build ZIP** | Required | `Digit7Jam_YOUTHsOrg_ParadoxRun.zip` | Standalone static runtime bundle (≤ 200 MB; ~2 MB actual) |
| **7. Private GitHub Repo** | Required | `https://github.com/LayaungHtut/Paradox-run` | Reviewer access granted; tagged `submission-v1.0.0` |
| **8. README File** | Required | `README_YOUTHsOrg_ParadoxRun.md` | Covers all 17 items from Guide §6 |
| **9. Screenshots (≥ 3)** | Required | `submission/screenshots/` | 5 high-resolution 16:9 gameplay PNGs |
| **10. Demo Video (1–3 min)** | Required | `DEMO_VIDEO_GUIDE.md` / MP4 link | 2-minute captioned walkthrough with all 7 segments |
| **11. Asset Credit List** | Required | `ASSET_CREDIT_LIST.md` | Declares 100% procedural art/audio + OSS libraries |
| **12. License Proof** | Required (if OSS used) | `LICENSE_PROOF.md` | Complete MIT & Apache-2.0 verification proofs |
| **13. Originality Declaration**| Required | `ORIGINALITY_DECLARATION.md` | Confirms all 8 points in Guide §10; preproduction disclosure |
| **14. Team Profile** | Required | `TEAM_PROFILE.md` | 3 members reported; names and actual roles to confirm |
| **15. Technical Notes** | Required | `TECHNICAL_NOTES.md` | Deterministic 60Hz physics, WebAudio synth, 0 tracking |
| **16. AI Use Declaration** | Required | `AI_USE_DECLARATION.md` | Claude Code and Codex assistance; reported review/testing status and evidence limits |

---

## Supporting validation record

[Review and playtest record](../docs/VALIDATION_RECORD.md) records the owner's confirmation of completed team checks, positive feedback, missing reviewer/device details and a five-player observation template. Keep it aligned with the submission claims.

## 3. Playable Build ZIP Packaging Guide (Guide §4 & §5)

Per Section 5 of the Technical Guide, the playable ZIP file must contain **only** the runtime files required to open and run the game, and must **not** include source code, git histories, or markdown documentation:

### Required ZIP Internal Folder Structure:
```
Digit7Jam_YOUTHsOrg_ParadoxRun.zip
└── Digit7Jam_YOUTHsOrg_ParadoxRun_Build/
    ├── index.html
    ├── _app/
    │   ├── immutable/
    │   │   ├── entry/
    │   │   ├── nodes/
    │   │   └── chunks/
    │   └── version.json
    ├── favicon.png
    └── ... (static runtime assets)
```

### Script to Generate the Production Build ZIP:
Run this automated command from the project root to build and package the production zip file:
```bash
# 1. Build the static distribution
npm run build:static

# 2. Package into the official tournament ZIP format
powershell -Command "Compress-Archive -Path 'build\*' -DestinationPath 'submission\Digit7Jam_YOUTHsOrg_ParadoxRun.zip' -Force"
```

---

## 4. Final Submission Day Action Plan (October 31, 2026)

1. **Verify Static Build:** Serve `build/` locally with `npx serve build` and test on Chrome, Firefox, and an Android/iPhone browser.
2. **Review Private GitHub Repo:** Ensure the reviewer email announced by Digit7s has been granted read/collaborator access, and tag `submission-v1.0.0` is pushed.
3. **Open Developer Portal:** Log in to `https://gamejam.digit7s.com/` before the 23:59:59 MMT deadline.
4. **Copy Field Values:** Use `DEVELOPER_PORTAL_SUBMISSION.md` to paste verified data into every field.
5. **Upload Files:** Upload `Digit7Jam_YOUTHsOrg_ParadoxRun.zip`, the 4+ screenshots from `submission/screenshots/`, and the markdown compliance documents.
6. **Click Final Submit:** Do not stop at "Save Draft". Click **Final Submit** and retain the confirmation reference ID.
7. **Stand By for Screening:** Monitor registered Telegram and email for any "Needs Correction" notifications from the technical screening team.

