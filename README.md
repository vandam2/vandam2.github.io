# NoteBase — Personal Knowledge Site

A clean, fast, searchable personal knowledge base built as a static site.
Hosted free on GitHub Pages. No backend, no database.

## 🚀 Setup on GitHub Pages (5 minutes)

### Step 1 — Create Your Repository
1. Go to [github.com](https://github.com) → **New repository**
2. Name it exactly: `YOUR-USERNAME.github.io`
3. Set visibility to **Public**
4. Click **Create repository**

### Step 2 — Upload These Files
Option A — GitHub Web UI (no software needed):
1. Open your new repo
2. Click **Add file → Upload files**
3. Drag all the files from this folder in
4. Commit with message: `Initial site setup`

Option B — Use github.dev (VS Code in browser):
1. Go to your repo on GitHub
2. Press the `.` key on your keyboard
3. VS Code opens in the browser — drag and drop files in

### Step 3 — Enable GitHub Pages
1. In your repo → **Settings → Pages**
2. Under *Branch*, select **main** and **/ (root)**
3. Click Save
4. Wait ~60 seconds → your site is live at `https://YOUR-USERNAME.github.io`

---

## 📝 Adding a New Note

### 1. Create the Markdown file
Add a `.md` file under the `notes/` folder:
```
notes/
  powerapps/     ← Power Apps notes
  powerautomate/ ← Power Automate notes
  powerbi/       ← Power BI notes
  sharepoint/    ← SharePoint notes
  other/         ← Everything else
```

### 2. Register it in notes-data.js
Open `notes-data.js` and add an entry to the `NOTES` array:

```js
{
  id: "unique-kebab-case-id",           // must be unique
  title: "Your Note Title",
  category: "powerapps",                // powerapps | powerautomate | powerbi | sharepoint | other
  categoryLabel: "Power Apps",
  excerpt: "One or two sentence summary shown on the card.",
  tags: ["tag1", "tag2"],
  file: "notes/powerapps/your-file.md", // path to your .md file
  date: "2025-01-15"                    // YYYY-MM-DD
}
```

### 3. Commit and push
GitHub Pages auto-rebuilds within ~30 seconds.

---

## 🎨 Customization

### Change the site name
In `index.html` and `viewer.html`, find `NoteBase` and replace it.

### Change the accent color
In `style.css`, edit `--accent: #4f8ef7;` to any hex color.

### Add a new category
1. Add a nav item in both `index.html` and `viewer.html`
2. Add a tab button in `index.html`
3. Add a color variable in `style.css` under `/* Category Colors */`

---

## 📁 File Structure

```
your-username.github.io/
├── index.html         Homepage with card grid
├── viewer.html        Note reader page
├── style.css          All styles
├── script.js          Search, filter, render
├── notes-data.js      Your note catalog (edit this!)
└── notes/
    ├── powerapps/
    ├── powerautomate/
    ├── powerbi/
    ├── sharepoint/
    └── other/
```

---

## 💡 Editing Notes from Any Computer

Since everything is on GitHub, you can edit from anywhere:

| Method | How |
|--------|-----|
| **GitHub Web** | Click a file → pencil icon → edit → commit |
| **github.dev** | Press `.` on any GitHub repo page |
| **VS Code Desktop** | Clone the repo, edit, push |
| **GitHub Mobile** | GitHub app → browse files → edit |

No login needed to *view* your site (it's public). Login to GitHub only needed to *edit*.
