# React CI/CD Pipeline

A beginner-friendly React (Vite + JavaScript) project that shows how a CI/CD
pipeline works. GitHub Actions builds the app and deploys it to GitHub Pages
on every push to `main`.

## Pipeline stages

1. **Code Push**: `git push origin main` starts the workflow.
2. **Install Dependencies**: `npm ci`
3. **Build Application**: `npm run build`
4. **Deploy Website**: the `dist` folder is published to GitHub Pages.

Pull requests only run the build check. They are never deployed.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/my-react-app/` (the exact address is shown in the
terminal; it includes the Vite base path).

## Build locally

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a **public** GitHub repository named `my-react-app`.
2. Go to **Settings -> Pages** and set **Source** to **GitHub Actions**.
3. Push this project to the `main` branch.
4. Watch the workflow in the **Actions** tab.
5. Open `https://YOUR-USERNAME.github.io/my-react-app/`.

## Important: the Vite base path

`vite.config.js` contains `base: '/my-react-app/'`. This must match the
repository name exactly, including the slash at the start and the end.
If you rename the repository, update this value.

## Project structure

```
.github/workflows/deploy.yml   CI/CD workflow
src/                           React source code
index.html                     HTML entry point
vite.config.js                 Vite configuration
package-lock.json              Exact dependency versions (needed by npm ci)
```
