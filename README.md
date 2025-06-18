# Artifact Vault – Client

React (Vite) front-end for browsing, adding, liking and managing museum artifacts.

## Features

• Browse all artifacts, search by name
• View details with like count
• Add / edit / delete your own artifacts (authenticated)
• Like / unlike artifacts, see list of liked items
• Firebase Auth (email / Google)
• Responsive UI with Tailwind CSS + DaisyUI

## Tech Stack

* React 19 + React Router v7
* Vite build
* Tailwind CSS, DaisyUI
* Firebase Authentication
* Toast notifications via **react-toastify**
* Calls REST API served by the [Artifact Vault server](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-4nik/tree/main)

## Prerequisites

1. Node ≥ 18 (18 LTS recommended)
2. The server should be running locally **or** the Vercel deployment (`https://artifacts-server-side-eta.vercel.app`)
3. Firebase project with Email/Password & Google providers enabled

### Environment variables

Create `.env` in the project root:

```bash
VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=XXXX
VITE_FIREBASE_APP_ID=XXXX
```

*(All variables are used inside `src/firebase.init.js`)*

## Getting Started (local dev)

```bash
npm install

# start vite dev server (http://localhost:5173)
npm run dev
```

While developing locally you can also start the Express API on port 3000:

```bash
cd ../artifacts-server-side
npm start
```

The client automatically points to `http://localhost:3000` when `npm run dev` is used (thanks to `import.meta.env.DEV` logic). When built or served from Netlify / Firebase the client points to the Vercel URL.

## Production build

```bash
npm run build   # files go to dist/
```

Serve locally to test:

```bash
npm run preview
```

## Deployment

Any static hosting (Netlify, Firebase Hosting, Vercel, Github Pages, etc.) works. Just build and deploy the contents of the `dist/` folder.

---

For API implementation instructions see the server side README.
