# ✨ Khushi's Little Universe — Personalisation & Deployment Guide

This website is custom-crafted for **Khushi** from **Ujjwal** for her birthday on **20 October 2026**.

Everything can be personalised from **a single file**: [`src/content.js`](./src/content.js).

---

## 📁 Key File Overview

| What you want to change | Where to find it |
| :--- | :--- |
| **All text, messages, dates, names** | `src/content.js` |
| **The Personal Birthday Letter** | `src/content.js` (under `letter:`) |
| **Scrapbook Photos** | Put images in `public/photos/`, list them in `src/content.js` |
| **Optional Background Music** | Put MP3 in `public/music/`, enable in `src/content.js` |
| **Section Visibility** | `src/content.js` (under `sections:`) |
| **Color Theme Palette** | `src/content.js` (under `theme:`) |

---

## 💌 1. Pasting Your Birthday Letter
Open `src/content.js` and locate:
```javascript
letterHeading: 'A little letter for you 💌',
letter: `[Paste Ujjwal's final personal birthday letter here.]`,
letterSignoff: 'Made with love, just for you. ❤️',
letterFrom: '— Ujjwal',
```
Simply replace the placeholder text with your exact letter.
- **Line breaks and paragraphs** are preserved exactly as you type.
- **Hinglish, Hindi, emojis** (`❤️`, `✨`, `🌸`) work natively without escaping.

---

## 📸 2. Adding Real Photos to the Scrapbook
1. Save your photos in `public/photos/` (e.g. `memory1.jpg`, `trip.png`).
2. In `src/content.js`, update the `photos` array:
   ```javascript
   photos: [
     {
       id: 1,
       src: '/photos/memory1.jpg',
       caption: 'That unforgettable evening ✨',
       date: 'April 2024', // optional
     },
     // add as many as you want!
   ]
   ```
> 💡 **Quick Preview Feature**: On the website itself, click the button **"📸 Personalise / Preview Photos"** to pick photos directly from your computer/phone and see them live in the Polaroid scrapbook before editing any files!

---

## 🌷 3. Customising the Interactive Cards & Envelopes
In `src/content.js`:
- **"Little things that make you, you"**: Edit `cards` array (headings & heartfelt messages).
- **"Open When..." Envelopes**: Edit `openWhenMessages` (the 4 comforting letters).
- **"Garden of Wishes"**: Edit `wishes` (the 8 blooming flower wishes).
- **"Final Surprise" Gift Box**: Edit `finalMessage`.

---

## 💻 4. Running the Website Locally
From the project folder in terminal / command prompt:
```bash
# Start local development server
npm run dev
```
Open the URL shown in terminal (usually `http://localhost:5173`).

To test the production build:
```bash
npm run build
npm run preview
```

---

## 🚀 5. How to Deploy & Share with Khushi

### Option A: Vercel (Easiest, Free & Fast)
1. Install Vercel CLI (or connect via GitHub):
   ```bash
   npx vercel
   ```
2. Follow the 3 prompts (default settings work out of the box).
3. You will receive an instant shareable HTTPS link (e.g., `https://for-khushi.vercel.app`)!

### Option B: Netlify (Free Drag-and-Drop)
1. Run `npm run build` to generate the `dist` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder into the browser.
4. Your website is live immediately with a shareable URL!

### Option C: GitHub Pages
1. Push your repository to GitHub.
2. Go to Repository Settings -> Pages -> Build and deployment -> Source: GitHub Actions.
3. Select the Vite deployment workflow.

---

## 🔒 Privacy Note
This is a static client-side website:
- **No databases, no tracking, no cookies, no analytics**.
- **No external server receives your letter or photos**.
- Whoever has the public link can see the site. To keep it private between the two of you, choose an unguessable deployment sub-domain (e.g., `khushi-little-universe-2026.vercel.app`).
