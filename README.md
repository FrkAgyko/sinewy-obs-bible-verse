# OBS Bible Verse Plugin

A lightweight, browser-based Bible verse lower-third for OBS Studio — no installation required. Runs entirely from local HTML files: a control dock for the operator and a transparent overlay for the stream.

![Classic Gold theme screenshot](https://img.shields.io/badge/theme-Classic%20Gold-gold) ![License: MIT](https://img.shields.io/badge/license-MIT-blue)

---

## Features

- Type a reference (e.g. `John 3:16`) and look it up instantly via the free [bible-api.com](https://bible-api.com) API
- Editable verse text — override or add content before going live
- **Three themes**: Classic Gold (dark background, gold accents), Clean White (semi-opaque white card), Dark Minimal (dark glass)
- **Three positions**: Bottom, Center, Top of screen
- **Three font sizes** and **three animations**: Fade, Slide Up, or None
- Instant Show / Hide / Clear controls
- Settings persist between sessions via `localStorage`
- Overlay auto-restores if the browser source is refreshed mid-stream
- No build step. No server. No dependencies.

---

## Requirements

- **OBS Studio 28+** (shares a single Chromium process — required for real-time communication)
- **Internet connection** for verse lookup (manual text entry works offline)

---

## Quick Start

### Step 1 — Add the Overlay (Browser Source)

1. In OBS, click **+** under Sources → choose **Browser Source**
2. Check **Local File**, then browse to `overlay.html` in this folder
3. Set **Width: 1920**, **Height: 1080**
4. Uncheck **Shutdown source when not visible** ← important
5. Uncheck **Refresh browser when scene becomes active** ← important
6. Click OK

> The overlay must always be running to receive commands from the dock. Add it to every scene where you need it, or put it in a global scene collection.

### Step 2 — Add the Control Dock

1. In OBS, go to **Docks → Custom Browser Docks…**
2. Click **+** and set:
   - **Dock Name**: Bible Verses
   - **URL**: `file:///` followed by the full path to `index.html`
     - macOS example: `file:///Users/yourname/Documents/sinewy-obs-bible-verse/index.html`
     - Windows example: `file:///C:/Users/yourname/Desktop/sinewy-obs-bible-verse/index.html`
3. Click **Apply** — the dock will appear as a panel in OBS

### Step 3 — Using During a Service

1. Type a verse reference in the **Verse Lookup** field (e.g. `Psalm 23:1`)
2. Choose your translation (KJV default)
3. Click **Lookup** or press **Enter**
4. The verse text fills in automatically — edit it freely if needed
5. Adjust theme, position, size, and animation in **Display Settings**
6. Click **Show** — the verse appears on stream instantly
7. Click **Hide** to fade it out without clearing
8. Click **Clear** to reset everything

---

## Translations

| Code | Name | Notes |
|------|------|-------|
| `KJV` | King James Version | Most common in churches; default |
| `WEB` | World English Bible | Modern language; fully public domain |
| `ASV` | American Standard Version (1901) | Public domain |

> NIV, ESV, and NLT are copyrighted and not available through the free API. For those translations, type or paste the verse text manually.

---

## Reference Formats

The API accepts standard references:

| Input | Result |
|-------|--------|
| `John 3:16` | Single verse |
| `John 3:16-17` | Verse range |
| `Ps 23` | Full chapter |
| `1 Cor 13:4-7` | Multi-verse range |
| `Genesis 1:1` | Full book name works too |

---

## Themes

### Classic Gold
Dark, semi-transparent background with gold border and warm cream text. Best for traditional church settings and darker scene backgrounds.

### Clean White
White semi-opaque card with a blue left border. Readable on any background. Good for contemporary and modern church aesthetics.

### Dark Minimal
Dark glass panel with a subtle slate border. Clean and unobtrusive. Good for conferences and modern productions.

---

## Troubleshooting

### Overlay not responding to dock commands

- Verify both files are in the **same folder** and loaded from the same `file://` origin
- Confirm you are using **OBS Studio 28 or newer** (`Help → About OBS Studio`)
- In the Browser Source properties, check that **Shutdown source when not visible** is **OFF**
- Try clicking **Refresh** in the Browser Source right-click menu, then re-send from the dock

### Verse text not loading

- Check your internet connection (bible-api.com requires network access)
- Verify the reference format: `Book Chapter:Verse` (e.g. `Romans 8:28`)
- Try abbreviations: `Ps` for Psalms, `Rev` for Revelation, `1 Cor` for 1 Corinthians
- If the API is down, type the verse text manually in the text area

### Overlay visible in OBS but background isn't transparent

- In Browser Source properties, confirm **Width: 1920** and **Height: 1080**
- Do **not** enable a chroma key filter on this source — it's already transparent by CSS

### Dock shows blank page

- Ensure the URL in Custom Browser Docks uses the full absolute path starting with `file:///`
- On Windows, use forward slashes: `file:///C:/path/to/index.html`
- On macOS/Linux: `file:///Users/yourname/path/to/index.html`

---

## Project Structure

```
sinewy-obs-bible-verse/
├── LICENSE             MIT licence
├── README.md           This file
├── index.html          OBS Dock — operator control panel
├── overlay.html        OBS Browser Source — stream overlay
└── assets/
    ├── app.js          Shared communication layer (BroadcastChannel + localStorage)
    ├── dock.css        Control panel styles
    └── overlay.css     Overlay styles (themes, animations, positions)
```

---

## How It Works

**Communication**: The dock and overlay communicate via the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel), which works across tabs/pages in the same browser process. OBS 28+ runs all browser sources and docks in a shared Chromium process, so messages pass directly. A `localStorage` polling fallback (80ms interval) handles edge cases and older OBS builds.

**Verse Data**: Fetched from [bible-api.com](https://bible-api.com) — a free, open-source Bible API with no authentication required.

**State Persistence**: Display settings are saved to `localStorage` automatically. The overlay re-reads the last known state on load, so refreshing mid-stream restores the visible verse without operator intervention.

---

## Contributing

Pull requests welcome. Open an issue for bugs or feature requests.

## License

MIT — see [LICENSE](LICENSE). Free for church use, personal use, and commercial use.
