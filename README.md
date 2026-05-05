# Torque Rush: Service Lane Sprint

Torque Rush: Service Lane Sprint is a fast, school-appropriate lane-based arcade learning game for ASE G1 / maintenance fundamentals. Students pick the correct service lane card before the vehicle reaches the decision zone.

## Run locally
1. Download or clone this repository.
2. Open `index.html` directly in a browser (no server required).
3. Select mode and start.

## Deploy on GitHub Pages
1. Push this repository to GitHub.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select your branch and `/ (root)`.
4. Save and open the published URL.

## Edit questions
Questions are in `script.js` in `questionBank`.
Each entry uses editable text fields:
- `category`
- `prompt`
- `choices` (3–4 options supported)
- `correct` (must match the exact correct choice text)
- `explanation`
- `difficulty`

## Answer randomization
Each question shuffles answer text before rendering lane cards. The card stores `isCorrect` by text comparison to `correct`, so the correct lane is not fixed.

## Game modes
- **Arcade Sprint**: 60s, wrong answers add damage.
- **Daily Service Challenge**: date-seeded deterministic question order.
- **Survival Run**: starts at 3 lives; wrong/timeout removes a life.
- **Category Practice**: 60s, filtered to one selected category.

## Chromebook test checklist
- Open `index.html` directly in Chrome.
- Verify touchpad click/tap lane selection.
- Verify keyboard controls (`1-4`, arrow keys).
- Verify timers, combo, XP, feedback, and restart flow.
- Verify copy-result works (or fallback message appears).

## Teacher usage ideas
- Bell-ringer warmup (2–4 rounds)
- Exit ticket with screenshot or copied result
- Category remediation stations
- Daily challenge leaderboard by class period

## Student instructions
1. Read the question at top.
2. Click/tap the correct lane card before timer expires.
3. Build combo for bonus XP.
4. Avoid damage (or preserve lives in Survival).
5. Copy and submit your result summary when done.

## Verification
Run the lightweight verification script from the repo root:

```bash
./verify.sh
```

This checks merge markers, JavaScript syntax, ID consistency between `script.js` and `index.html`, question count, and legacy `answer: 0` patterns.

