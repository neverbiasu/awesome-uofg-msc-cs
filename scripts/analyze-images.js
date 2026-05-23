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
const MODEL_ID = "qwen/Qwen2.5-VL-3B-Instruct"; // The smaller model that seemed more lenient
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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Main function to process the image directory.
 * @param {string} dirPath - The path to the directory containing images.
 * @param {string} courseCode - The course code for organizing the report.
 * @param {string} reportHint - A hint for the report filename, e.g., 'L0-L3'.
 * @param {number} limit - The maximum number of images to process.
 * @param {number} offset - The starting offset for the images to process.
 */
async function main(dirPath, courseCode = 'COMPSCI5012', reportHint = 'analysis', limit = null, offset = 0) {
  if (!API_KEY) {
    console.error('Error: MODELSCOPE_API_KEY is not set in your environment or .env file.');
    process.exit(1);
  }

  if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
    console.error(`Error: Directory not found at '${dirPath}'`);
    process.exit(1);
  }

  // Define and create the output directory
  const reportDir = path.join(process.cwd(), 'reports', 'image-analysis', courseCode);
  fs.mkdirSync(reportDir, { recursive: true });
  
  const finalReportHint = limit ? `${reportHint}-batch-${offset/limit + 1}` : reportHint;
  const reportPath = path.join(reportDir, `${finalReportHint}-analysis.json`);
  const reportStream = fs.createWriteStream(reportPath);
  reportStream.write('[\n');

  const allFiles = fs.readdirSync(dirPath);
  let imageFiles = allFiles.filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file));

  // Apply slicing for batch processing
  if (limit) {
    imageFiles = imageFiles.slice(offset, offset + limit);
  }

  const MIN_FILE_SIZE_BYTES = 51200; // 50 KB

  console.log(`Found ${imageFiles.length} images to process in this batch. Filtering for files > ${MIN_FILE_SIZE_BYTES / 1024} KB...`);
  let isFirst = true;

  for (const file of imageFiles) {
    const fullPath = path.join(dirPath, file);
    
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
    
    // Use a root-relative path for consistency, stripping the leading 'public' directory
    const relativePath = path.relative(process.cwd(), fullPath);
    const publicIndex = relativePath.indexOf('public');
    const rootRelativePath = publicIndex !== -1 ? relativePath.substring(publicIndex + 'public'.length) : '/' + relativePath;
    
    const result = {
      imageFile: file,
      imagePath: rootRelativePath,
      aiDescription: description,
    };

    if (!isFirst) {
      reportStream.write(',\n');
    }
    reportStream.write(JSON.stringify(result, null, 2));
    isFirst = false;

    // Be nice to the API
    await sleep(5000);
  }

  reportStream.write('\n]\n');
  reportStream.end();

  console.log(`\nAnalysis complete. JSON report for this batch generated at: ${reportPath}`);
}
// --- Script Execution ---
function parseArgs(args) {
  const parsedArgs = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      parsedArgs[key] = value || (args[i+1] && !args[i+1].startsWith('--') ? args[i+1] : true);
    }
  }
  return parsedArgs;
}

const logDir = path.join(process.cwd(), 'logs');
fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, 'analyze-images.log');

process.on('unhandledRejection', (reason, promise) => {
  const errorMessage = `[${new Date().toISOString()}] --- UNHANDLED REJECTION ---\nReason: ${reason}\n\n`;
  fs.appendFileSync(logFile, errorMessage);
  console.error('An unhandled promise rejection occurred. See logs/analyze-images.log for details.');
  process.exit(1);
});

const positionalArgs = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const options = parseArgs(process.argv.slice(2));

const targetDirectory = positionalArgs[0];
const courseCode = positionalArgs[1];
const reportHint = positionalArgs[2];
const limit = options.limit ? parseInt(options.limit, 10) : null;
const offset = options.offset ? parseInt(options.offset, 10) : 0;


if (!targetDirectory || !courseCode || !reportHint) {
  console.error('Usage: node scripts/analyze-images.js <path/to/image/directory> <courseCode> <reportHint> [--limit=<num>] [--offset=<num>]');
  console.error('Example: node scripts/analyze-images.js public/images/COMPSCI5012-internet-technology COMPSCI5012-internet-technology L1 --limit=5 --offset=0');
  process.exit(1);
}

try {
  main(path.resolve(targetDirectory), courseCode, reportHint, limit, offset);
} catch (error) {
  const errorMessage = `[${new Date().toISOString()}] --- SYNC ERROR ---\n${error.stack}\n\n`;
  fs.appendFileSync(logFile, errorMessage);
  console.error('A critical synchronous error occurred. See logs/analyze-images.log for details.');
  process.exit(1);
}
