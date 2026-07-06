# Inquizzitive

A trivia quiz game built with React. Questions are pulled live from the
[Open Trivia Database](https://opentdb.com/) across a grid of categories
(Books, Film, Music, Video Games, Science, and more), and high scores are
saved to your account so you can compete on the global leaderboard.

## Game modes

- **Survival** — answer questions until you get one wrong. One mistake ends
  the run, so every answer counts.
- **Infinity** — a relaxed mode with no game-over. Answer as many questions
  as you like and bail out whenever you want; your score is banked when you
  exit.

## Features

- **Accounts** — create an account and log in to save your personal best in
  both modes.
- **Leaderboard** — top-5 rankings for Survival and Infinity, populated from
  all players' saved scores.
- **Category select** — pick a specific trivia category for each run, or go
  Random.
- **Music toggle** — optional menu music, mutable from any page.

## Tech stack

| Layer    | Tech |
|----------|------|
| Frontend | React 18, React Router 6, Bootstrap 5, react-hook-form |
| Build    | Vite 8, ESLint 9 |
| Data     | Open Trivia DB (questions), AWS API Gateway + Lambda (accounts & scores) |
| Backend  | AWS Amplify Gen 2 definition in [`amplify/`](amplify/) (Cognito auth, data model, storage) |

## Getting started

Requires Node.js 20.19+ (22+ recommended).

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Credits

- Trivia questions: [Open Trivia Database](https://opentdb.com/)
- Menu music: ["Funky Menu Loop"](https://opengameart.org/content/funky-menu-loop)
  by iamoneabe (CC0 / public domain)

## Project structure

```
src/
  App.jsx            # routes: /, /survival, /infinity, /leaderboard,
                     # /login, /createaccount, /account
  main.jsx           # app bootstrap + shared quiz engine (Open Trivia DB
                     # fetching, scoring, game flow)
  pages/             # one component per route
  Images/, Music/    # static assets
amplify/             # AWS Amplify Gen 2 backend definition
```
