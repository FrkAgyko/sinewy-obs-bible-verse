# OBS Bible Verse Plugin

### Display Scripture on your church livestream — no coding required.

A free, open-source tool for OBS Studio that lets you show Bible verses on your livestream with a single click. You get a control panel docked inside OBS where you type a reference, choose your style, and press **Show**. The verse appears instantly on your stream as a beautiful lower-third overlay. No servers, no subscriptions, no technical setup beyond copying a folder.

![License: MIT](https://img.shields.io/badge/license-MIT-blue)

---

## Screenshots

![Control Panel](screenshots/control-panel.png)
![Overlay](screenshots/overlay.png)
![Live in OBS](screenshots/obs-live.png)

---

## Features

- **Quick Lookup buttons** — one-tap buttons for the most commonly preached books: John, Romans, Psalms, Matthew, Genesis, Proverbs, Isaiah, Hebrews, Acts, and Revelation
- **Chapter and verse dropdowns** — after selecting a book, chapter and verse dropdowns appear automatically for fast selection without typing
- **Auto Show toggle** — when enabled, verses automatically appear on the overlay as soon as they are looked up, no need to click Show manually
- **Auto-scaling font size** — automatically adjusts text size based on verse length so short verses display large and long verses always fit
- **Smart verse search** — start typing a book name and a dropdown suggests matching books automatically
- **Instant lookup** — type any reference (e.g. `John 3:16`) and fetch the verse text with one click or press Enter
- **Editable text** — change, shorten, or add to the verse text before it goes live on stream
- **Next / Previous navigation** — step through consecutive verses without retyping anything
- **Random verse generator** — pick a random verse from the Entire Bible, Old Testament, New Testament, Gospels only, or Psalms & Proverbs
- **4 preset themes** — Classic Gold, Clean White, Dark Minimal, and Sacred Light (background image with text floating freely)
- **Custom theme** — choose your own background colour, verse text colour, and reference text colour with a full colour picker
- **Background image upload** — upload any photo as a fullscreen background behind your verse card
- **Card overlay toggle** — hide the dark card so verse text sits directly on your background image with a clean look
- **Opacity slider** — control how solid or transparent the card background is, from 0% to 100%
- **Font selector** — choose from 9 fonts including Open Sans (default), Atkinson Hyperlegible (designed for low vision), EB Garamond, Cinzel, Playfair Display, Lora, Cormorant Garamond, and Crimson Text
- **Font size control** — Small, Medium, Large, or X-Large
- **3 positions** — Bottom (default), Center, or Top of screen
- **3 animation styles** — Fade, Slide Up, or None
- **Keyboard shortcuts** — control everything from your keyboard without touching the mouse
- **50+ Bible translations** — KJV (default), NKJV, NIV, ESV, NLT, NASB, AMP, MSG, CSB, WEB, ASV, BBE, Darby, YLT, RSV, NET, and many more
- **Multi-language support** — 9 languages including English, French, Portuguese, Spanish, Swahili, Arabic, Chinese, German and Russian
- **Language selector** — filter Bible translations by language for multilingual church services
- **Settings are remembered** — all your choices are saved automatically and restored next time you open OBS
- **No internet required for display** — once a verse is loaded, the overlay works offline

---

## What You Need Before Starting

- **OBS Studio version 28 or newer** — [download free at obsproject.com](https://obsproject.com)
- **An internet connection** when looking up verses (the verse text itself is fetched from the web)
- The plugin folder saved somewhere on your computer

---

## Installation

### Step 1 — Download the plugin

1. Go to the GitHub page for this project
2. Click the green **Code** button, then click **Download ZIP**
3. Find the downloaded ZIP file (usually in your Downloads folder)
4. Right-click it and choose **Extract All** (Windows) or double-click to unzip (Mac)
5. Move the extracted folder somewhere permanent — for example, your **Documents** folder
   > ⚠️ Do not move or rename any files inside the folder after this step. The plugin needs all its files to stay together.

---

### Step 2 — Add the control panel to OBS

The control panel is the window inside OBS where you type references and control what appears on stream.

1. Open **OBS Studio**
2. In the top menu bar, click **Docks**, then click **Custom Browser Docks…**
3. A small window will appear. Click the **+** button (or type in the Name field)
4. Set the **Dock Name** to: `Bible Verse`
5. Set the **URL** to the full file path of `index.html` inside the folder you extracted

   **How to find the full path:**

   - **Windows:** Open File Explorer, navigate to the folder, hold Shift and right-click `index.html`, then choose **Copy as path**. Paste it into the URL field, then replace any backslashes `\` with forward slashes `/`, and make sure it starts with `file:///`
     - Example: `file:///C:/Users/YourName/Documents/sinewy-obs-bible-verse/index.html`

   - **Mac:** Open Finder, navigate to the folder, right-click `index.html`, hold the Option key, then choose **Copy "index.html" as Pathname**. Paste it into the URL field and add `file://` to the front
     - Example: `file:///Users/YourName/Documents/sinewy-obs-bible-verse/index.html`

6. Click **Apply**
7. The **Bible Verse** panel will appear as a dockable window inside OBS. You can drag it to any position in your OBS layout.

---

### Step 3 — Add the overlay to your scene

The overlay is the transparent layer that sits on top of your video and displays the verse text on stream.

1. In OBS, select the scene you want to add the verses to (or add it to all scenes — see tip below)
2. In the **Sources** panel, click the **+** button
3. Choose **Browser** from the list
4. Give it a name like `Bible Verse Overlay` and click **OK**
5. In the properties window that opens:
   - Tick **Local file**
   - Click **Browse** and select `overlay.html` from the plugin folder
   - Set **Width** to `1920`
   - Set **Height** to `1080`
   - Make sure **Shutdown source when not visible** is **unticked** ← this is important
   - Make sure **Refresh browser when scene becomes active** is **unticked** ← this is important
6. Click **OK**

> 💡 **Tip:** If you want the overlay available in every scene, add it to a **Scene Collection** that is applied globally, or copy the source across all your scenes by right-clicking it and choosing **Copy**, then pasting into each scene.

---

## How to Use It During a Service

### Looking up a verse

1. In the **Bible Verse** dock panel, click the reference box at the top (it says *e.g. John 3:16*)
2. Start typing a book name — a dropdown will suggest matching books. Click one to select it, or keep typing
3. Type the full reference, e.g. `Romans 8:28` or `Psalm 23:1-3`
4. Choose your translation from the dropdown next to the reference box (KJV is the default)
5. Click **Lookup** or press **Enter**
6. The verse text appears in the text box below. You can edit it if you want — for example, to shorten a long verse
7. Click **Show** to send it to the stream

### Using the Random Verse button

1. Click the **🎲 Random** button next to the Lookup button
2. A small menu will appear with five options:
   - **📖 Entire Bible** — any verse from Genesis to Revelation
   - **📜 Old Testament** — Genesis through Malachi
   - **✝ New Testament** — Matthew through Revelation
   - **🕊 Gospels only** — Matthew, Mark, Luke, or John
   - **🎵 Psalms & Proverbs** — a verse from Psalms or Proverbs
3. Click your chosen option — a verse is fetched and loaded automatically
4. Click **Show** to send it to the stream

### Navigating verses

Once a verse is loaded, use the **◀** and **▶** buttons to step backwards or forwards one verse at a time. The verse text updates automatically. If the overlay is already showing, it updates live on stream.

### Showing and hiding the overlay

| Button | What it does |
|--------|-------------|
| **Show** | Sends the verse to the stream with your chosen animation |
| **Hide** | Fades the verse out but keeps it ready to show again |
| **Clear** | Removes the verse completely and resets everything |

### Changing the look

All display settings are in the **Display Settings** section of the dock panel.

| Setting | What it does |
|---------|-------------|
| **Font** | Choose the typeface for the verse text |
| **Font Size** | Small, Medium, Large, or X-Large |
| **Theme** | Choose a colour style (see Themes section below) |
| **Position** | Where on screen the verse appears — Bottom, Center, or Top |
| **Animation** | How the verse enters — Fade, Slide Up, or None |
| **Background Opacity** | Drag the slider to make the card more or less transparent |

Any change you make while the overlay is showing will update live on stream immediately.

---

## Themes

### Classic Gold
A dark semi-transparent card with a gold top border and warm cream-coloured text. Italic verse text. Best for traditional church settings or when your camera background is dark.

### Clean White
A white semi-transparent card with a blue accent border. Dark text. Works well on any background and suits contemporary or modern church styles.

### Dark Minimal
A dark glass card with a subtle grey border. Light text. Clean and understated — good for conferences and modern productions.

### Sacred Light
Your `assets/bg1.png` image fills the entire screen edge to edge. There is no dark card — the verse text floats directly over the image in white with a warm gold reference. Select this theme and your background image appears automatically with no extra steps.

### Custom
Choose your own colours. When you select **Custom…** from the Theme dropdown, three extra options appear:

- **Background**, **Verse Text**, and **Reference** colour pickers — click each square to open a colour chooser
- **Show card overlay on background** checkbox — tick this to show a semi-transparent dark card behind your text, or leave it unticked for text-only on a plain or image background
- **Background Mode** toggle — switch between **Colour** (solid card) and **Image** (upload your own photo)

**To upload a background image:**
1. Select **Custom…** theme
2. Click the **Image** toggle button
3. Click **Choose Image** and pick a photo from your computer
4. The image is applied to the overlay immediately

---

## Keyboard Shortcuts

You can control the overlay from your keyboard without clicking. These shortcuts work when your cursor is not inside a text box.

| Key | Action |
|-----|--------|
| `←` Left arrow | Previous verse |
| `→` Right arrow | Next verse |
| `Esc` | Hide the overlay |
| `Ctrl` + `Enter` (inside the text box) | Show the verse on stream |

---

## Bible Translations

Verse text is fetched from [Bolls.life](https://bolls.life). Over 50 translations are available across 9 languages.

### English (26 translations)

| Translation | Full Name | Notes |
|-------------|-----------|-------|
| KJV | King James Version | Default. Most widely used in churches |
| NKJV | New King James Version | Modern update of KJV |
| NIV | New International Version (1984) | Popular modern translation |
| NIV2011 | New International Version (2011) | Updated NIV |
| ESV | English Standard Version | Essentially literal translation |
| NLT | New Living Translation | Easy to read, thought-for-thought |
| NASB | New American Standard Bible | Highly literal |
| AMP | Amplified Bible | Expanded wording for clarity |
| MSG | The Message | Contemporary paraphrase |
| CSB | Christian Standard Bible | Balance of accuracy and readability |
| WEB | World English Bible | Modern language. Completely free to use |
| WEBBE | World English Bible (British) | British English edition |
| ASV | American Standard Version | Classic 1901 translation |
| BBE | Bible in Basic English | Simple vocabulary |
| DBY | Darby Translation | Literal 19th-century translation |
| YLT | Young's Literal Translation | NT only |
| DRB | Douay-Rheims | Catholic translation |
| RSV | Revised Standard Version | Mid-20th century revision of ASV |
| NET | New English Translation | With extensive translators' notes |
| GNV | Geneva Bible (1599) | Historic Protestant Bible |
| LSV | Literal Standard Version | Modern literal translation |
| BSB | Berean Standard Bible | Free modern translation |
| MEV | Modern English Version | Based on KJV textual tradition |
| ISV | International Standard Version | Modern scholarly translation |
| ERV | Easy-to-Read Version | Simplified English |
| GNT | Good News Bible | Simple, clear language |

### Other Languages

| Language | Translations Available |
|----------|----------------------|
| French | NBS, LSG (Louis Segond 1910), DBY French, PDV, BDS |
| Portuguese | ARA, ACF, NVI-PT, NTLH, ARC |
| Spanish | RV1960, RV2004, NVI, PDT, NTV |
| Swahili | SUV (Swahili Union Version) |
| Arabic | NAV (New Arabic Version), SVD (Smith & Van Dyke) |
| Chinese | CUV (Chinese Union Version), CUNP |
| German | ELB (Elberfelder), LUT (Luther 2017), SCH (Schlachter 2000) |
| Russian | SYNOD (Russian Synodal), NRT (New Russian Translation) |

---

## Reference Format Guide

| What you type | What you get |
|---------------|-------------|
| `John 3:16` | A single verse |
| `John 3:16-17` | Two verses in a row |
| `Ps 23:1-3` | Verses 1 to 3 of Psalm 23 |
| `1 Cor 13:4` | First Corinthians chapter 13 verse 4 |
| `Genesis 1:1` | Full book names work too |

Most common abbreviations are accepted — `Ps`, `Rev`, `Matt`, `1 Cor`, `Phil`, etc.

---

## Troubleshooting

### The overlay is not showing on stream

- Make sure the Browser Source is in your active scene and is **not muted or hidden** (check the eye icon next to it in the Sources panel)
- Right-click the Browser Source in the Sources panel and choose **Refresh** — then try pressing Show again from the dock

### The dock panel shows a blank page

- Check the URL you entered in **Docks → Custom Browser Docks** starts with `file:///` and uses forward slashes `/` throughout
- Make sure the path points exactly to `index.html` (including the filename at the end)
- Windows example: `file:///C:/Users/YourName/Documents/sinewy-obs-bible-verse/index.html`
- Mac example: `file:///Users/YourName/Documents/sinewy-obs-bible-verse/index.html`

### The verse is showing in the dock but not updating on stream

- Check that **Shutdown source when not visible** is **unticked** in the Browser Source properties
- Confirm you are using **OBS Studio version 28 or newer** (click **Help → About OBS Studio** to check)
- Try right-clicking the Browser Source and choosing **Refresh**, then press Show again

### Verse text is not loading when I click Lookup

- Check your internet connection — the lookup needs access to bolls.life
- Make sure your reference is formatted correctly, e.g. `John 3:16` not `John3:16`
- If the service is temporarily unavailable, type the verse text directly into the text box

### The background is not transparent in OBS

- In the Browser Source properties, make sure **Width is 1920** and **Height is 1080**
- Do **not** apply a Chroma Key filter to this source — it is already transparent

---

## Support This Project

If this plugin has helped your church or ministry, consider buying me a coffee!
Feature requests from supporters get prioritised.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sinewytech)

If you find it useful, a ⭐ star on GitHub helps other churches discover the project.

---

## Contributing

Found a bug or have a feature idea? Open an issue on GitHub — all feedback is welcome. Pull requests are also appreciated.

---

## Licence

MIT — see [LICENSE](LICENSE).

Free for church use, personal use, and commercial use. You are welcome to modify and redistribute this project as long as you include the original licence file.

## Development Note

This project was developed with the assistance of AI tools to accelerate development.
