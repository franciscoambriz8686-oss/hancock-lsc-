# Hancock LSC — PWA Setup & Deployment Guide

## Your File Structure
```
hancock-lsc-pwa/
├── index.html              ← PWA meta tags + service worker registration
├── vite.config.js          ← Build config
├── package.json            ← Dependencies
├── public/
│   ├── manifest.json       ← App name, icon, colors for phone install
│   ├── sw.js               ← Service worker (enables offline use)
│   └── icons/              ← YOU NEED TO ADD ICONS (see Step 2)
└── src/
    ├── main.jsx            ← React entry point
    └── App.jsx             ← Full dashboard app
```

---

## Step 1 — Install Tools (one time only)

1. Download **Node.js** from https://nodejs.org (click "LTS" version)
2. Download **VS Code** from https://code.visualstudio.com
3. Create a free account at https://github.com
4. Create a free account at https://vercel.com (sign in with GitHub)

---

## Step 2 — Add App Icons

You need two PNG icon files for the home screen icon:
- `public/icons/icon-192.png` (192×192 pixels)
- `public/icons/icon-512.png` (512×512 pixels)

**Quick option:** Use https://realfavicongenerator.net
- Upload any image (a CPS logo or school logo works)
- Download the generated icons
- Rename them to icon-192.png and icon-512.png
- Place them in the `public/icons/` folder

---

## Step 3 — Run Locally (test on your computer first)

Open VS Code, then open the Terminal (menu: Terminal → New Terminal), and run:

```bash
cd hancock-lsc-pwa
npm install
npm run dev
```

Open your browser to: http://localhost:5173
The app should appear. Test all tabs.

---

## Step 4 — Push to GitHub

In VS Code terminal:

```bash
git init
git add .
git commit -m "Initial Hancock LSC app"
```

Then:
1. Go to https://github.com → click "New repository"
2. Name it `hancock-lsc`
3. Copy the commands GitHub shows you under "push an existing repository"
4. Paste and run them in your terminal

---

## Step 5 — Deploy to Vercel (get a live URL)

1. Go to https://vercel.com and log in
2. Click "Add New Project"
3. Select your `hancock-lsc` GitHub repository
4. Leave all settings as default — click "Deploy"
5. In ~60 seconds you get a live URL like:
   **https://hancock-lsc.vercel.app**

Share this URL with Ana and your group.

---

## Step 6 — Install on Phones

### iPhone (Safari only — must use Safari, not Chrome):
1. Open the URL in Safari
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **"Add"** — the app icon appears on your home screen

### Android (Chrome):
1. Open the URL in Chrome
2. Chrome may show a banner "Add Hancock LSC to Home Screen" — tap it
3. OR tap the 3-dot menu → "Add to Home Screen"

The app opens full-screen like a native app with no browser bar.

---

## Step 7 — Future Updates

Whenever you want to change something:
1. Edit the files in VS Code
2. Run in terminal: `git add . && git commit -m "update" && git push`
3. Vercel automatically redeploys in ~30 seconds
4. Everyone's app updates the next time they open it

---

## Troubleshooting

**"npm: command not found"** → Node.js didn't install. Re-download from nodejs.org.

**App not installing on iPhone** → Must use Safari (not Chrome or Firefox) on iOS.

**Changes not showing after deploy** → Hard refresh: hold Shift + click refresh in browser.

**AI Advisor not responding** → The Anthropic API key is handled by the Claude.ai artifact environment. For the deployed version, you'll need to add your own API key (contact Francisco for setup).

---

## OLSCR Contact
For procedural questions or to report violations:
📞 (773) 553-1400
