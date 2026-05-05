# Auto Shop Diagnostic Dash

## 1) Project title
**Auto Shop Diagnostic Dash**

## 2) Short description
Auto Shop Diagnostic Dash is a browser-based, timed classroom game for Autos 2 students (grades 9–12). Students choose a category (or Mixed Review), answer one multiple-choice question at a time, and receive immediate feedback with explanations.

## 3) How to run locally
1. Download or clone this repository.
2. Open `index.html` in any modern browser (Chrome recommended for Chromebook compatibility).
3. Start playing—no install, login, database, or server required.

## 4) How to deploy with GitHub Pages
1. Go to the GitHub repo.
2. Open **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the **main** branch.
6. Select **/root**.
7. Click **Save**.
8. Use the generated GitHub Pages link.

## 5) How to edit or add questions
1. Open `script.js`.
2. Find the `questionBank` array near the top.
3. Add or edit objects with this format:

```js
{
  category: 'Brakes',
  prompt: 'Your question here',
  choices: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
  answer: 0,
  explanation: 'Why answer A is best.',
  difficulty: 'easy'
}
```

- `answer` is the zero-based index in `choices`.
- Category names must match existing text exactly, or they become a new category automatically.

## 6) How to change the timer length
- In `script.js`, change `const ROUND_SECONDS = 60;` to another number (example: `90`).

## 7) How to add categories
- Add questions to `questionBank` with the new category name.
- The category selector is generated automatically from the question bank.

## 8) Student instructions
The full student instructions are displayed on the start screen in the app, including:
- Goal
- How to Play
- Scoring
- Classroom Expectations
- Diagnostic Mindset
- After the Round

## 9) Teacher notes for classroom use
- Use as a warm-up, station activity, or exit ticket review.
- Encourage students to explain why the best answer is the best **first diagnostic step**.
- Have students write one missed topic after each round.
- Use category mode for focused reteaching (example: only Brakes).
- Use Mixed Review for cumulative practice before assessments.

## 10) Chromebook testing checklist
- [ ] Opens by double-clicking `index.html`.
- [ ] Text is readable at arm’s length.
- [ ] Buttons are easy to click on Chromebook touchpad/touchscreen.
- [ ] Timer counts down from 60 seconds.
- [ ] Questions advance one at a time.
- [ ] Correct/incorrect feedback appears immediately.
- [ ] Explanations display after each answer.
- [ ] Final score screen shows score, correct, attempted, accuracy, and best streak.
- [ ] Restart button returns to start screen.
- [ ] Mixed Review and category filtering both work.
