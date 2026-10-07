# Entertainment WebApp

A React-based entertainment discovery application for browsing, searching, and bookmarking movies and TV series using TMDB data.

**Live demo:** https://jana-alhasan.github.io/entertainment-WebApp/

## What the app does

- Browse movie and TV content from TMDB.
- Search movies and TV series with debounced input.
- Paginate movie and TV search results.
- Open dedicated movie and series detail pages.
- Preview available trailers with a poster fallback when no trailer is returned.
- Bookmark movies and TV series and persist them with `localStorage`.
- Search saved bookmarks case-insensitively.
- Switch between light and dark themes with persisted preference.
- Create an account and sign in with Firebase email/password authentication.
- Require email verification before a user can remain signed in.
- Sign out through the profile control and react to Firebase auth-state changes.
- Use responsive layouts for desktop, tablet, and smaller screens.

## Tech stack

- React 18
- JavaScript
- React Router
- Firebase Authentication
- TMDB REST API
- Context API
- Custom React hooks
- React Paginate
- HTML5 / CSS3
- `localStorage`

## Implementation highlights

- Reusable `useFetch`, `useDebounce`, and `useLocalStorage` hooks support data fetching, delayed search, and persistence.
- Movie and TV bookmarks are handled independently so identical TMDB numeric IDs across media types do not conflict.
- Fetch requests are aborted during cleanup and aborted requests do not surface as user-facing errors.
- Search pagination updates the TMDB page request for both movie and TV results.
- Search text is URL-encoded before it is sent to TMDB.
- Trailer previews handle empty video results without crashing the card UI.
- Firebase authentication listens to auth-state changes so the profile control updates after login and logout.
- Unverified Firebase users are signed out even when a verification-email resend cannot be completed immediately.

## Routes

The application includes routes for the home page, movies, TV series, bookmarks, signup, login, movie details, series details, and a catch-all not-found route.

## Run locally

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` and add your own TMDB API key:

```bash
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

Then start the app:

```bash
npm start
```

Create a production build with:

```bash
npm run build
```

The TMDB key is read from a Create React App environment variable instead of being hard-coded in tracked source. Because this is a browser application, values included at build time can still be visible to users of the deployed app; the environment variable improves configuration hygiene but is not secret storage.

## Validation and CI

The repository has a permanent GitHub Actions CI workflow that runs on pull requests and pushes to `main`. It performs a clean dependency install, runs the focused Jest regression tests, and builds the production bundle.

Recent hardening work was also validated with targeted headless-Chrome regression checks covering core search, details, bookmarks, pagination, trailer fallback, and theme persistence.

The Firebase flow was validated end-to-end with a disposable test account: signup, unverified-login handling, real email verification, verified login, reactive profile state, and logout. The temporary Firebase user and mailbox were removed after testing.

## Project status

This is an individual portfolio project. The current cleanup work focuses on reliability, accurate project documentation, configuration hygiene, and recruiter-facing proof without claiming features that are not implemented.
