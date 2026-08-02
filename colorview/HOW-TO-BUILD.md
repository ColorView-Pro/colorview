# Building ColorView Pro's Windows Installer

This folder wraps your existing website (the files inside `app/`) into a real
Windows desktop app using Electron, and packages it into a proper
`ColorViewPro-Setup-1.0.0.exe` installer (install wizard, Start Menu shortcut,
Desktop shortcut, uninstaller — all included automatically).

You have two options. **Option A needs nothing installed on your computer.**

---

## Option A — Let GitHub build it for you (recommended)

1. Put this whole `colorview` folder into your GitHub repo (same repo as
   your website — just as a subfolder, next to `index.html`, `docs/`, etc.)
2. Push it to the `main` branch.
3. On GitHub, go to your repo → **Actions** tab. You'll see a workflow
   called **"Build Windows Installer"** running automatically (it also runs
   any time you push changes inside `colorview/`).
4. When it finishes (a few minutes), click into that run → scroll down to
   **Artifacts** → download **ColorViewPro-Setup**. That's a zip containing
   your `Setup.exe`.

No Windows machine, no Node.js install, nothing — GitHub's servers do the
build for you.

If it doesn't run automatically, go to **Actions → Build Windows Installer →
Run workflow** to trigger it manually.

---

## Option B — Build it yourself on a Windows PC

1. Install [Node.js](https://nodejs.org) (LTS version).
2. Open a terminal in this `colorview` folder.
3. Run:
   ```
   npm install
   npm run dist
   ```
4. Your installer will appear at `dist/ColorViewPro-Setup-1.0.0.exe`.

---

## Updating the app later

Whenever you change `index.html` / `style.css` / `script.js` on your website,
copy the updated files into `colorview/app/` too, then rebuild (push again
for Option A, or re-run `npm run dist` for Option B).

## Notes

- The app opens your site in its own window — no browser, no "open
  index.html" instructions needed for users anymore.
- Camera access (for Live Webcam Mode) is pre-approved in `main.js` so it
  works the same as it does in a browser.
- The desktop app doesn't use `sw.js` / offline caching — since all files are
  already on the user's disk, there's nothing to cache. That file is only
  relevant to the website version.
