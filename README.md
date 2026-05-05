# Torque Rush: ASE G1 Garage Sprint

## Short description

Torque Rush: ASE G1 Garage Sprint is a Chromebook-friendly, no-login, no-backend automotive arcade review game for high school students. Players answer ASE G1-level automotive maintenance and light repair questions in fast timed rounds while building Boost and Combo and avoiding Damage.

The game is built with plain HTML, CSS, and JavaScript. It is designed to run directly in the browser and deploy easily with GitHub Pages.

## Run locally

1. Download or clone the repo.
2. Open `index.html` directly in a browser.
3. Choose a mode.
4. Choose a category if using Category Review.
5. Click **Start Sprint**.

No install, login, database, or server is required.

## Deploy with GitHub Pages

1. Go to the GitHub repo.
2. Open **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch: **main**.
6. Select folder: **/root**.
7. Click **Save**.
8. Use the generated GitHub Pages URL.

## Edit questions

Open `script.js` and edit the `questionBank` array.

Each question uses this format:

```js
{
  category: "Batteries",
  prompt: "A battery reads 12.6 volts with the key off. What does this usually indicate?",
  choices: [
    "The battery is near fully charged",
    "The alternator has failed",
    "The starter is shorted",
    "The coolant level is low"
  ],
  correct: "The battery is near fully charged",
  explanation: "A fully charged 12-volt lead-acid battery is usually around 12.6 volts with the key off.",
  difficulty: "Easy"
}