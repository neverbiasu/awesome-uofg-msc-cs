#!/usr/bin/env node

import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config();

/**
 * -----------------------------------------------------------------------------
 * Configuration
 * -----------------------------------------------------------------------------
 * - Reads API key and endpoint from environment variables.
 * - Make sure you have a .env file in the project root with:
 *   MODELSCOPE_API_KEY=your_token
 * - The model ID is set here.
 */
const API_KEY = process.env.MODELSCOPE_API_KEY;
const BASE_URL = process.env.MODELSCOPE_API_ENDPOINT || "https://api-inference.modelscope.cn/v1"; // Allow BASE_URL to be overridden by .env
const MODEL_ID = "Qwen/Qwen3-VL-235B-A22B-Instruct"; // New model specified by user
const PROMPT_TEXT = "Describe this image in detail. What is its content and purpose? Is it a diagram, a screenshot, an icon, or something else? If it's a diagram, explain what it shows.";

// --- DEBUG ---
console.log("DEBUG: API_KEY (first 5 chars):", API_KEY ? API_KEY.substring(0, 5) : "undefined");
console.log("DEBUG: BASE_URL:", BASE_URL);
// --- END DEBUG ---

// Initialize the OpenAI client for ModelScope
const client = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URL,
});

/**
 * Converts an image file to a Base64 encoded data URL.
 * @param {string} filePath - The path to the image file.
 * @returns {string|null} The data URL or null if the file type is not supported.
 */
function imageToDataURL(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  let mimeType;
  switch (extension) {
    case '.png':
      mimeType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      mimeType = 'image/jpeg';
      break;
    case '.webp':
      mimeType = 'image/webp';
      break;
    default:
      return null; // Unsupported file type
  }
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');
  return `data:${mimeType};base64,${base64Data}`;
}

/**
 * Analyzes a single image using the ModelScope API.
 * @param {string} dataURL - The Base64 encoded image data URL.
 * @returns {Promise<string>} A promise that resolves to the image description.
 */
async function analyzeImage(dataURL) {
  try {
    const response = await client.chat.completions.create({
      model: MODEL_ID,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: dataURL } },
            { type: 'text', text: PROMPT_TEXT },
          ],
        },
      ],
    });
    return response.choices[0].message.content || 'No description returned.';
  } catch (error) {
    console.error('Error calling ModelScope API:', error.message);
    return 'Error analyzing image.';
  }
}

/**
 * Main function to process the image directory.
 * @param {string} dirPath - The path to the directory containing images.
 */
async function main(dirPath) {
  if (!API_KEY) {
    console.error('Error: MODELSCOPE_ACCESS_TOKEN is not set in your environment or .env file.');
    process.exit(1);
  }

  if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
    console.error(`Error: Directory not found at '${dirPath}'`);
    process.exit(1);
  }
  
  const reportPath = path.join(process.cwd(), 'image_analysis_report.md');
  const reportStream = fs.createWriteStream(reportPath);
  reportStream.write(`# Image Analysis Report for ${path.basename(dirPath)}\n\n`);
  
  const allFiles = fs.readdirSync(dirPath);
  const imageFiles = allFiles.filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file));

  const MIN_FILE_SIZE_BYTES = 51200; // 50 KB

  console.log(`Found ${imageFiles.length} images. Filtering for files > ${MIN_FILE_SIZE_BYTES / 1024} KB...`);

  for (const file of imageFiles) {
    const fullPath = path.join(dirPath, file);
    
    // Get file stats to check the size
    const stats = fs.statSync(fullPath);
    if (stats.size <= MIN_FILE_SIZE_BYTES) {
      continue; // Skip small files
    }

    const dataURL = imageToDataURL(fullPath);

    if (!dataURL) {
      console.warn(`Skipping unsupported file type: ${file}`);
      continue;
    }

    console.log(`Analyzing ${file} (${Math.round(stats.size / 1024)} KB)...`);
    const description = await analyzeImage(dataURL);
    
    // Write the result to the report
    const relativeImagePath = path.relative(process.cwd(), fullPath);
    reportStream.write(`## ${file}\n\n`);
    reportStream.write(`![${file}](${relativeImagePath})\n\n`);
    reportStream.write('**AI Description:**\n');
    reportStream.write(`${description}\n\n`);
    reportStream.write('---\n\n');
  }

  reportStream.end();
  console.log(`\nAnalysis complete. Report generated at: ${reportPath}`);
}

// --- Script Execution ---
const targetDirectory = process.argv[2];
if (!targetDirectory) {
  console.error('Usage: node scripts/analyze-images.js <path/to/image/directory>');
  console.error('Example: node scripts/analyze-images.js public/images/COMPSCI5104/week2');
  process.exit(1);
}

main(path.resolve(targetDirectory));