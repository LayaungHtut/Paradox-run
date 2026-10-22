# Review and playtest record

Updated: 22 October 2026. This records the evidence available for submission claims.

## Team confirmation

On 22 October 2026, the project owner confirmed that they and two other team members
completed human code review, physical Android/iPhone checks, audio listening checks and
playtesting. In a follow-up, the owner reported that the testers said it was a "good game".
These are owner-reported results; the assistant did not observe the sessions.

The confirmation establishes three participating team members. It does not identify the
reviewers, tested build, test dates, device models, OS/browser versions, measurements or
individual findings. The number of unfamiliar players and their prior exposure to the game
have not been specified. Positive feedback is recorded without inferring completion rates,
retention, bug-free operation or a successful test on every supported device.

| Check | Current evidence | Details still to record |
| --- | --- | --- |
| Human code review | Owner reports completion by the three-member team | Reviewer names/initials, modules or commits reviewed, findings and fixes |
| Physical Android and iPhone checks | Owner reports completion | Device models, OS/browser versions, tested build, scenarios and outcomes; browser vs native Android build |
| Audio listening | Owner reports completion | Speakers/headphones, mix observations, changes and retest results |
| Team playtesting | Owner reports completion and positive feedback | Individual sessions, levels reached, assistance, problems and changes |
| Five unfamiliar players | Positive tester feedback reported; count and familiarity unspecified | Five distinct session records confirming no prior exposure to the game |
| Device performance | No measured hardware results supplied | Load times, frame-rate observations/traces, test duration and conditions |
| Automated checks | Historical results in [AI use log](AI_USE_LOG.md); nine progression tests passed during the 22 October date-correction work | Attach output for the exact submission commit when running final checks |

## Human review details

Fill these from the completed reviews. Automated or AI review does not replace human sign-off.

| Reviewer | Review date | Build/commit and modules | Findings, changes and retest | Sign-off |
| --- | --- | --- | --- | --- |
| Team lead — name/initials to supply | Not supplied | Not supplied | Not supplied | Reported complete; details pending |
| Member 2 — name/initials to supply | Not supplied | Not supplied | Not supplied | Reported complete; details pending |
| Member 3 — name/initials to supply | Not supplied | Not supplied | Not supplied | Reported complete; details pending |

## Physical-device results

Use one row per device/browser combination. Record the build URL or commit and the test date.
Mark a check as passed only for a scenario that actually worked on the named device.

| Platform | Model / OS / browser version | Build / date / tester | Controls, rotation, pause/resume, saves, audio | Load time / frame pacing / duration | Issues and retest |
| --- | --- | --- | --- | --- | --- |
| Android | Not supplied | Not supplied | Completion reported; individual outcomes not supplied | No measurements supplied | Not supplied |
| iPhone | Not supplied | Not supplied | Completion reported; individual outcomes not supplied | No measurements supplied | Not supplied |

For any missing checks, open the intended submission URL with fresh game progress. Play the
opening levels using simultaneous move/jump/dash inputs, create and rewind echoes, rotate
the device, pause/resume after backgrounding, and reload to check saves. Listen through both
speaker and headphones for balance and harshness; check volume/mute and audio after resume.
Run a later level with multiple echoes for at least ten minutes and record stalls, input
problems, temperature-related slowdown and crashes, including when none were observed.
Keep browser tests separate from the installed Android app.

Measure cold loading with the network/cache conditions recorded. If frame timing is measured,
record the tool, sample duration and median/95th-percentile frame interval. Without a trace,
label smoothness as a subjective observation rather than a measured 60 FPS result.

## Five unfamiliar-player sessions

Use existing session details if available; otherwise run the missing sessions with five people
who have not seen or helped develop the game. Use anonymous participant IDs. Reset progress
between sessions, keep the build fixed and allow up to ten minutes for the opening three
levels. Start with: "Play this game as you normally would." Observe without explaining the
echo mechanic. If help is requested, record it before intervening.

These blank rows are a recording template, not evidence that five sessions happened.

| Player | No prior exposure? | Device / build / date | Time to understand echo | Level reached / time | Help, deaths, confusion | Wants another run? / feedback |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded |
| P2 | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded |
| P3 | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded |
| P4 | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded |
| P5 | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded | Not recorded |

After each session ask what the echo does, what confused the player, how the controls and audio
felt, and whether they want another run. Record the answer without coaching. Summarize the
number who explain the mechanic and finish level one without help, repeated frustrations,
and voluntary replay interest. Five sessions reveal usability problems; they do not establish
long-term retention or a representative satisfaction score.

## Follow-up issues

| Issue / source session | Reproduction | Impact | Change / commit | Retest result |
| --- | --- | --- | --- | --- |
| No detailed findings supplied yet | — | — | — | — |

When details arrive, update this record first, then align the AI declaration, README, technical
notes and screening checklist. Keep historical automated results dated and distinguish team
reports from attached measurements. Never turn missing findings into a claim of zero bugs.
