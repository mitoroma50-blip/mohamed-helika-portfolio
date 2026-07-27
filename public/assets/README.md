# Assets Manager

All editable content lives in this folder. **Replace files by name and the
website updates automatically — no code editing required.**

## Folder structure

```
public/assets/
├── profile/         →  profile.jpg   (your profile photo)
├── cv/              →  cv.pdf        (your downloadable CV)
├── certificates/    →  cert-1.jpg, cert-2.jpg, …  (auto-detected)
└── projects/        →  project-1.jpg, project-2.jpg, … (auto-detected)
```

## How it works

The site scans these folders at build time (and on every file change during
development) and automatically loads whatever it finds. Image URLs are never
hardcoded in the code.

## Adding / replacing assets

### Profile photo
Replace `public/assets/profile/profile.jpg` with your own image (same
filename). Any common format works (`.jpg`, `.png`, `.webp`), but the file
must be named **`profile`** — e.g. `profile.jpg` or `profile.png`.

### CV (PDF)
Replace `public/assets/cv/cv.pdf` with your real CV. The "Download CV"
buttons use this file automatically. Must be named **`cv.pdf`**.

### Certificates
Drop images into `public/assets/certificates/`. They are detected
automatically and shown in the Certificates grid, sorted by filename.

Recommended naming: **`cert-1.jpg`, `cert-2.jpg`, `cert-3.jpg`, …**

To edit the title / issuer / year shown for a certificate, open
`src/lib/assets.ts` and edit the `CERT_META` map (key = filename without
extension, e.g. `cert-1`). This is the only place text is stored — no
image URLs to manage.

### Project images
Drop images into `public/assets/projects/`. They feed the Featured Project
gallery automatically.

Recommended naming: **`project-1.jpg`, `project-2.jpg`, …**

Captions and tags for each image are in `src/lib/assets.ts` under
`PROJECT_META`. Until you add project images, tasteful placeholders fill in.

## Replacement = update

Because each file is referenced by filename, simply overwriting a file with
the same name updates the site. A cache-busting query is added automatically
so browsers always load the newest version.
