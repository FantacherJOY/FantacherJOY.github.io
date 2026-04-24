# Md Fantacher Islam — Portfolio

A clean, fast, static academic portfolio website. No build tools, no frameworks — just HTML, CSS, and a tiny bit of JavaScript. Deploys to GitHub Pages for free.

---

## File structure

```
portfolio/
├── index.html          # Home page
├── academics.html      # Education & coursework
├── experiences.html    # Research, teaching, professional
├── projects.html       # Research projects
├── publications.html   # Peer-reviewed papers
├── awards.html         # Awards & certifications
├── contact.html        # Contact channels
├── style.css           # All styling (shared across pages)
├── script.js           # Mobile nav toggle + active link
├── .nojekyll           # Tells GitHub Pages to skip Jekyll processing
└── README.md           # This file
```

---

## Editing your content

All pages are hand-editable HTML. Look for HTML comments like this in each file:

```html
<!-- EDIT: Short intro paragraph. Keep it to 2–4 sentences. -->
```

These comments mark the spots you should change. The rest of the structure can stay the same.

### Common edits

- **Your name / title** → top of every page, inside `<a class="wordmark">` and in the hero of `index.html`.
- **Intro paragraph** → in `index.html`, inside `<p class="hero-lead">`.
- **Research interests chips** → `index.html`, inside `<div class="chips">`.
- **Publications** → duplicate the `<li class="publication">` block in `publications.html` for each paper.
- **Projects** → duplicate the `<article class="project">` block in `projects.html`.
- **Contact info** → `contact.html`, inside each `<div class="contact-item">`.

### Changing the accent color

Open `style.css`, line 11–12. Change these two CSS variables:

```css
--accent:       #7B2D26;   /* oxblood — used for links, highlights */
--accent-hover: #A23A30;
```

Want blue instead? Try `#1F4E79` and `#2D6DA3`. Green? `#2D5A3D` and `#3F7A54`. Anything you like.

### Changing the fonts

The site uses **Fraunces** (serif) and **JetBrains Mono** (monospace), both from Google Fonts. To swap:

1. Grab a new font URL from [fonts.google.com](https://fonts.google.com).
2. Replace the `<link href="https://fonts.googleapis.com/...">` tag in every HTML file's `<head>`.
3. Update the `--font-serif` / `--font-mono` variables at the top of `style.css`.

---

## Deploying to GitHub Pages

### One-time setup

1. Create a new repository on GitHub. **Important:** name it exactly `your-username.github.io` (replacing `your-username` with your GitHub username). This gives you a site at `https://your-username.github.io`.
   - Example: if your GitHub username is `fantacher`, name the repo `fantacher.github.io`.
   - (You can also use any repo name if you prefer `https://your-username.github.io/repo-name` — see "Project site" below.)

2. Open a terminal in this `portfolio/` folder.

3. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-username.github.io.git
   git push -u origin main
   ```

4. On GitHub, go to the repo → **Settings** → **Pages**. Under "Source", pick **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.

5. Wait ~30 seconds. Your site will be live at `https://your-username.github.io`.

### Project site (alternative)

If you want the portfolio under a sub-path (e.g., `https://your-username.github.io/portfolio`), just name the repo anything (like `portfolio`) and push the same way. GitHub Pages will serve it at `https://your-username.github.io/repo-name`.

### Updating the site

After editing any file:

```bash
git add .
git commit -m "Updated publications"
git push
```

Changes go live in under a minute.

---

## Local preview

You can open `index.html` directly in your browser — but the font loading and some relative paths work better with a tiny local server. Either:

```bash
# Python 3 (ships with macOS/Linux, easy on Windows)
python3 -m http.server 8000
# then visit http://localhost:8000
```

or if you have Node installed:

```bash
npx serve .
```

---

## Custom domain (optional)

If you own a domain (e.g., `fantacher.com`) and want to use it:

1. In your repo, create a file called `CNAME` (no extension). Put one line in it: `fantacher.com`.
2. At your domain registrar, add a CNAME record pointing `www` to `your-username.github.io`, and A records for the root domain pointing to GitHub's IPs (see [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
3. In repo → Settings → Pages, enter your custom domain and enable HTTPS.

---

## Accessibility & SEO notes

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`) is used throughout.
- Every page has a descriptive `<title>` and `<meta name="description">`.
- The home page has Open Graph tags for nice link previews.
- Focus states rely on browser defaults; consider adding custom `:focus-visible` styles if you want.
- Color contrast meets WCAG AA for body text.

---

## License

Use, modify, and adapt freely. The design is yours.
