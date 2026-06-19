# Tahir Abbas — Portfolio

A 4-page personal portfolio site: **Home, About, Projects, Contact**.
Plain HTML/CSS/JS — no build step, no frameworks. Works directly on
GitHub Pages.

## What's inside

```
portfolio/
├── index.html        ← Home (hero + featured project + skills)
├── about.html         ← Bio, timeline, full skills, certifications
├── projects.html       ← All 6 projects
├── contact.html         ← Contact info
├── css/style.css         ← All styling
├── js/main.js              ← Nav menu, scroll animations, card tilt
├── js/hero-scene.js          ← The animated 3D scene in the Home hero
└── images/                    ← Put your 7 PNGs here (see below)
```

The design idea: a "single-line diagram" theme — deep navy background,
copper + cyan accents (copper wire, oscilloscope glow), with your real
SLD project as the visual signature: the Home page hero is a live 3D
power-grid animation (nodes + traveling current), and the About page
timeline is drawn as a busbar with breaker-style nodes.

## Step 1 — Add your images

Put these 7 files into the `images/` folder, with these **exact names**:

| Filename | What it should be |
|---|---|
| `profile.png` | Full-body photo, background removed |
| `project-sld.png` | SLD AI Explainer screenshot |
| `project-robot.png` | Humanoid robot photo |
| `project-led.png` | LED cube photo |
| `project-home.png` | Home automation photo |
| `project-stick.png` | Smart blind stick photo |
| `project-fire.png` | Firefighting robot photo |

You can delete the `PUT_YOUR_IMAGES_HERE.txt` file once your images are in.

## Step 2 — Put this on GitHub

You already have a GitHub Pages URL: `https://ee-tahirabbas.github.io`.
That means GitHub Pages is served from a repo named **exactly**
`ee-tahirabbas.github.io`. Two ways to upload:

### Option A — Using GitHub.com in your browser (no coding tools needed)

1. Go to your repo `ee-tahirabbas.github.io` on github.com (create it first
   if it doesn't exist yet: **New repository** → name it exactly
   `ee-tahirabbas.github.io` → Create).
2. Click **Add file → Upload files**.
3. Drag in `index.html`, `about.html`, `projects.html`, `contact.html`,
   the whole `css` folder, the whole `js` folder, and the whole `images`
   folder (with your 7 PNGs inside) — drag the folders in directly,
   GitHub keeps the folder structure.
4. Scroll down, click **Commit changes**.
5. Go to **Settings → Pages**, under "Build and deployment" set
   **Source: Deploy from a branch**, branch **main**, folder **/ (root)**,
   click **Save**.
6. Wait ~1 minute, then visit `https://ee-tahirabbas.github.io` — your
   site is live.

To edit any page later: open the file on github.com, click the pencil
(✏️) icon, edit the text between the HTML tags, commit. You don't need
to touch anything inside `<...>` angle brackets — just the words between
them.

### Option B — Using VS Code + Git

```bash
git clone https://github.com/ee-tahirabbas/ee-tahirabbas.github.io.git
cd ee-tahirabbas.github.io
# copy all the files from this portfolio folder in here
git add .
git commit -m "Add portfolio site"
git push
```

Then turn on GitHub Pages the same way as step 5 above.

## Customizing later

- **Text**: every page is plain HTML — find the sentence you want to
  change and edit it directly. Text lives between tags like
  `<p>...</p>` or `<h1>...</h1>`.
- **Colors**: open `css/style.css`, edit the `:root { ... }` block near
  the top. `--copper` and `--cyan` are the two accent colors used
  everywhere.
- **Add LinkedIn**: once your new LinkedIn profile is built, add a line
  like this inside the `.footer-links` block on any page (and in the
  Contact page contact card):
  `<a href="https://linkedin.com/in/your-handle" target="_blank">LinkedIn</a>`
- **Add a new project**: copy one `.project-card` block in
  `projects.html`, change the image, title, description, tags and link.

## Notes on what's deliberately included

- The **O&M Engineer** role at Nizam Energy is included here (and should
  also go on your resume + LinkedIn — it's real, current experience).
- The hero's 3D animation is built with three.js (loaded from a CDN,
  no install needed) and automatically turns static if a visitor has
  "reduce motion" turned on, and gets lighter on phones.
- Everything is responsive down to small phones, and keyboard-navigable.
