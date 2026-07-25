# AI Image Detection Experiment

Static browser quiz using 16 original images and previously recorded TruthScan classifications.

## Run locally

Open `index.html` directly in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project structure

- `index.html` — page structure
- `styles.css` — responsive design
- `app.js` — quiz data and logic
- `assets/` — the 16 original image files

## Important

The included TruthScan results are comparison benchmarks, not verified ground truth. Replacing, recompressing, cropping, or upscaling the images could change detector output, so the original files are retained unchanged.
