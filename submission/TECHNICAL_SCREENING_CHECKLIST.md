# TECHNICAL SCREENING & SUBMISSION AUDIT CHECKLIST

**Competition:** Digit7 Jam 2026 (HTML Arcade Game Tournament)  
**Organized by:** Digit7s Myanmar  
**Game Title:** PARADOX RUN  
**Team Name:** YOUTHs Org  
**Compliance Reference:** Digit7 Jam Submission Format & Technical Guide §13, §14, §15

---

## 1. Official Technical Screening Checklist (Guide §13)

Before passing to the final judging panel, every tournament entry is subjected to a rigorous technical screening by the **Digit7s Technology Department**. This audit evaluates the 16 core screening criteria:

This is an internal readiness checklist, not an organizer-issued pass. The owner reports
completed team review, Android/iPhone checks, audio listening and playtesting. Detailed
records and measurements still need to be attached in the [validation record](../docs/VALIDATION_RECORD.md).

| #   | Screening area      | Recorded evidence / next check                                                                                                                                                        | Status                             |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 1   | Playability         | Historical Chromium runs; team playtesting reported complete. Record final build and outcomes.                                                                                        | Evidence details pending           |
| 2   | Browser support     | Chromium automation recorded; broader browser/version matrix not supplied.                                                                                                            | To verify                          |
| 3   | Device support      | Physical Android/iPhone checks reported complete; models, versions and results not supplied.                                                                                          | Reported complete; details pending |
| 4   | Loading time        | No device/network-specific measurements supplied. Measure the final build.                                                                                                            | To verify                          |
| 5   | Stability           | Historical automated checks and team playtesting reported. No recorded stress-test or memory trace supports a zero-leak claim.                                                        | Evidence details pending           |
| 6   | Controls            | Touch/keyboard implementation and team playtesting reported; record individual control checks.                                                                                        | Reported complete; details pending |
| 7   | UI readability      | Historical viewport checks; device-specific readability results not supplied.                                                                                                         | Evidence details pending           |
| 8   | Security            | Inspect the final artifact and dependencies; no completed security audit is recorded here.                                                                                            | To verify                          |
| 9   | Originality         | Owner-confirmed 16 October creation date and originality declaration; preserve provenance evidence.                                                                                   | To verify                          |
| 10  | Assets              | Credit list exists; verify it against the final artifact.                                                                                                                             | To verify                          |
| 11  | AI policy           | Claude Code and Codex disclosed; review completion reported, reviewer scope/details pending.                                                                                          | Evidence details pending           |
| 12  | Completeness        | Check required deliverables against the final submission.                                                                                                                             | To verify                          |
| 13  | Playable link       | Check assigned HTTPS URL without credentials on the final build.                                                                                                                      | To verify                          |
| 14  | ZIP integrity       | Extract final ZIP and compare with hosted build.                                                                                                                                      | To verify                          |
| 15  | Repository access   | Verify reviewer access and final tag/commit.                                                                                                                                          | To verify                          |
| 16  | Network and privacy | Verify final build configuration and capture requests; the static build has no leaderboard server configured (`VITE_API_URL` unset), so online features are off and make no requests. | To verify                          |

---

## 2. Anti-Rejection Verification Audit (Guide §14)

Review this section immediately before clicking **Final Submit** to prevent technical disqualification:

- [ ] **No Broken Game Link (§14.1):** Deployed URL tested in private browsing mode (incognito) to ensure it opens without authentication.
- [ ] **No Corrupted ZIP (§14.2):** Archive tested by downloading and extracting in a fresh clean directory.
- [ ] **README Present (§14.3):** `README_YOUTHsOrg_ParadoxRun.md` included with all 17 required items.
- [ ] **Game Fully Playable (§14.4):** All 50 levels beatable; end screen reachable; controls fully responsive.
- [ ] **Zero Crashes (§14.5):** Extended 30-minute stress tests and rapid rewind spamming execute smoothly without memory overflow.
- [ ] **Zero Missing Deliverables (§14.6):** README, screenshots, video, credit list, originality form, and AI form all present.
- [ ] **Zero Malicious Code (§14.7):** Clean static bundle with no hidden eval scripts or remote script injections.
- [ ] **Zero Unauthorized Assets (§14.8):** All libraries licensed under MIT / Apache-2.0; 100% original procedural visuals/audio.
- [ ] **Zero Copied / Pre-Existing Games (§14.9):** Code freshly authored for October 2026 competition period; distinct arcade design.
- [ ] **On-Time Submission (§14.10):** Submitted well in advance of the 31 October 2026 23:59:59 MMT deadline.
- [ ] **Proof Available (§14.11):** Commit logs, architecture docs, and test logs ready for audit.
- [ ] **Repository Accessible (§14.12):** Reviewer email invited to private repository; build instructions verified via `npm ci && npm run build:static`.
- [ ] **Version Consistency (§14.13):** Playable link, ZIP file, repository tag (`submission-v1.0.0`), demo video, and README all identify version `1.0.0`.
- [ ] **AI Fully Disclosed (§14.14):** Claude Code and Codex assistance disclosed; reviewer scope and reported testing accurately recorded.
- [ ] **Zero Tracking or Suspicious Network Calls (§14.15):** Network inspector reveals 0 outgoing requests after page load.

---

## 3. Screening Status Outcomes

| Status               | Meaning & Action Required                                                                                                                                 |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pass**             | Entry complies with all technical standards and advances directly to the judging panel.                                                                   |
| **Needs Correction** | Marcoms or Tech screening identified an incomplete item (e.g., missing reviewer repo access). Correction must be uploaded before the 31 October deadline. |
| **Fail**             | Disqualification due to fatal defects (e.g., non-loading build, malware, plagiarism, or unannounced tracking).                                            |

**Audit Conclusion for PARADOX RUN:**  
**NOT YET READY — tick each item above only after it has actually been checked, immediately before Final Submit.**
