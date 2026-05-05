# Torque Rush: ASE G1 Garage Sprint

## Short description
A Chromebook-friendly, no-login, no-backend automotive arcade review game for high school students. Players answer ASE G1-level questions in fast timed rounds, building Boost and Combo while avoiding Damage.

## Run locally
1. Download or clone the repo.
2. Open `index.html` directly in a browser.
3. Click **Start Sprint**.

## Deploy with GitHub Pages
1. Go to your GitHub repo.
2. Open **Settings** → **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch: **main**.
5. Select folder: **/root**.
6. Save and use the generated Pages URL.

## Edit questions
- Open `script.js` and edit `questionBank`.
- Each question uses:
  - `category`
  - `prompt`
  - `choices`
  - `correct` (answer text)
  - `explanation`
  - `difficulty`

## How answer randomization works
- Choices are shuffled each time a question appears.
- Correctness is tracked by matching choice text against the `correct` value.

## Change timer length
- In `script.js`, edit `ROUND_SECONDS`.

## Add categories
- Add questions with a new `category` name.
- Category dropdown is generated automatically.

## Daily Garage Challenge
- Choose **Daily Garage Challenge** mode.
- The game uses a date-based deterministic seed so all users that day get the same question order.

## Survival Mode
- Starts with 3 lives.
- Wrong answers remove a life.
- Round ends when lives reach 0 or time runs out.

## Student instructions (in app)
Students should:
- Choose a mode.
- Read and answer quickly but carefully.
- Build Boost and Combo with correct answers.
- Avoid Damage from incorrect answers.
- Use results to review weak topics.

## Teacher notes
- Great for warm-ups, station rotation, and review days.
- Use Category mode for targeted reteach.
- Use Daily challenge for shared class competition.

## Chromebook testing checklist
- [ ] Opens by launching `index.html`.
- [ ] Mixed Review works.
- [ ] Category Review works.
- [ ] Daily Garage Challenge gives consistent order on same date.
- [ ] Survival Mode ends when lives are gone.
- [ ] End Round button works.
- [ ] Copy Result works (or shows fallback message).
- [ ] No login or install required.
