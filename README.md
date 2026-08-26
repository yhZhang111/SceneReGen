# Paper Site

Static project-page scaffold for a research paper.

## Local Preview

From this folder:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If npm is available:

```powershell
npm run start
```

## Main Files

- `index.html`: page structure
- `styles.css`: responsive visual style
- `site.config.js`: paper metadata, links, media, table values, BibTeX
- `script.js`: renders the configured content
- `assets/`: place final images, videos, meshes, and PDFs here

## Suggested Asset Layout

```text
assets/
  images/
  videos/
  meshes/
  papers/
```

Use GLB or GLTF files for interactive meshes.
