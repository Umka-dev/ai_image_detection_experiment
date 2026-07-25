# AI Image Detection Experiment

A static browser-based quiz that challenges users to classify 16 original images as **Real**, **Digitally Edited**, or **AI Generated**, then compare their answers with previously recorded TruthScan AI Image Detector classifications.

## Live Demo

https://ai-image-detection-experiment.netlify.app/

## Local Usage

Clone or download this repository and open `index.html` in a modern web browser.

## Project Structure

```
index.html      # Page structure
styles.css      # Responsive styles
app.js          # Quiz logic and dataset
assets/         # Original image files
```

## Notes

- The quiz uses previously recorded classifications produced by TruthScan AI Image Detector.
- These classifications are provided as comparison benchmarks and should not be considered verified ground truth.
- The original image files are included unchanged. Recompressing, resizing, cropping, or otherwise modifying them may produce different AI detector results.
