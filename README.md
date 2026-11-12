# Will anyone pay for your product? (Bolt.new workshop deck)

HTML slide deck for the live Bolt.new workshop on Thursday, Nov 12, 10:30 am PT
([Luma](https://luma.com/bolt-e3ba)).

## Run it

Import this repo into Bolt.new from GitHub, or run it locally:

```
npm install
npm run dev
```

Vite gives Bolt.new a dev server to start. Opening `index.html` straight from
your file system won't run the script (browsers block module scripts on `file://`),
so use `npm run dev` or any static server, such as `npx serve`.

## Present it

| Key | Does |
| --- | --- |
| → / Space / clicker | Next step, then next slide |
| ← | Back one step |
| N | Presenter notes |
| F | Fullscreen |
| Home / End | First / last slide |

Deep link to any slide with `#number` (for example `#11` for Prompt 1).
Every prompt card has a Copy prompt button. Print to PDF gives one slide per page
with every step revealed.

## Files

- `index.html` – all 28 slides and presenter notes
- `styles.css` – tokens (match the Validate Your Business Idea canvas), layout, animations
- `deck.js` – scaling, navigation, step reveals, notes, copy buttons
- `assets/` – Bolt.new wordmarks and hero artwork
- `prompts.md` – every prompt in plain text, for the YouTube description and chat

## Before you present

- Brand assets in `assets/` (wordmarks and the light-leak artwork) come from the Validate Your Business Idea canvas.
- Replace `[YOUR EMAIL]` in Prompt 2 only in your Bolt.new project, not the deck.
