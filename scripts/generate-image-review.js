#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function createImageGallery(imagePaths, outputDir) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Image Extraction Report</title>
      <style>
        body { font-family: sans-serif; margin: 2em; background-color: #f8f9fa; color: #212529; }
        h1 { text-align: center; color: #343a40; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5em; }
        .card { background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); overflow: hidden; transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); }
        .card img { max-width: 100%; height: auto; display: block; }
        .card-info { padding: 1em; }
        .card-info p { margin: 0; font-size: 0.9em; word-wrap: break-word; }
        .card-info .filename { font-weight: bold; color: #007bff; margin-bottom: 0.5em; }
        .card-info .path { color: #6c757d; }
      </style>
    </head>
    <body>
      <h1>Image Extraction Report</h1>
      <p>Found ${imagePaths.length} images in <strong>${outputDir}</strong>.</p>
      <div class="gallery">
        ${imagePaths.map(imagePath => `
          <div class="card">
            <img src="${path.relative(path.dirname(path.resolve(outputDir, 'image_review.html')), imagePath)}" alt="${path.basename(imagePath)}">
            <div class="card-info">
              <p class="filename">${path.basename(imagePath)}</p>
              <p class="path">${imagePath}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
  fs.writeFileSync(path.join(outputDir, 'image_review.html'), htmlContent, 'utf8');
}

async function main() {
  const targetDir = process.argv[2];
  if (!targetDir) {
    console.error('Usage: node scripts/generate-image-review.js <path/to/image/directory>');
    process.exit(2);
  }

  const resolvedDir = path.resolve(targetDir);
  if (!fs.existsSync(resolvedDir) || !fs.lstatSync(resolvedDir).isDirectory()) {
    console.error('Directory not found:', resolvedDir);
    process.exit(2);
  }

  try {
    const allFiles = fs.readdirSync(resolvedDir);
    const imageFiles = allFiles.filter(file => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file));
    const fullImagePaths = imageFiles.map(file => path.join(resolvedDir, file));

    createImageGallery(fullImagePaths, resolvedDir);
    console.log(`Successfully generated image report: ${path.join(resolvedDir, 'image_review.html')}`);
  } catch (err) {
    console.error('Error generating image report:', err);
    process.exit(1);
  }
}

main();
