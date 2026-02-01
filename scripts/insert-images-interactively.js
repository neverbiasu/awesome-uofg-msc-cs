#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

/**
 * Finds the corresponding notes directory for a given course code.
 * @param {string} courseCode - e.g., COMPSCI5012-internet-technology
 * @returns {string|null} Path to the notes directory or null if not found.
 */
function findNotesDir(courseCode) {
  // This is a simplified search. We assume a structure like /notes/{lang}/semester-{n}/{courseCode}
  const notesRoot = path.join(process.cwd(), 'notes');
  const langDirs = ['zh', 'en'];
  const semesterDirs = ['semester-1', 'semester-2', 'semester-3'];

  for (const lang of langDirs) {
    for (const semester of semesterDirs) {
      const potentialDir = path.join(notesRoot, lang, semester, courseCode);
      if (fs.existsSync(potentialDir)) {
        return potentialDir;
      }
    }
  }
  return null;
}

/**
 * Recursively finds all .mdx files in a directory.
 * @param {string} dir - The directory to search.
 * @param {Array<string>} fileList - Accumulator for file paths.
 * @returns {Array<string>} List of absolute paths to .mdx files.
 */
function getMdxFilesRecursive(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getMdxFilesRecursive(filePath, fileList);
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function main(jsonPath, courseCode) {
  if (!fs.existsSync(jsonPath)) {
    console.error('Error: Analysis JSON file not found at', jsonPath);
    process.exit(1);
  }

  const notesDir = findNotesDir(courseCode);
  if (!notesDir) {
    console.error(`Error: Could not find a corresponding notes directory for course code '${courseCode}'.`);
    process.exit(1);
  }

  const noteFilesAbsolute = getMdxFilesRecursive(notesDir);
  // Make noteFiles relative to notesDir for cleaner display in prompts
  const noteFiles = noteFilesAbsolute.map(absPath => path.relative(notesDir, absPath));

  if (noteFiles.length === 0) {
    console.error(`Error: No .mdx files found in '${notesDir}' or its subdirectories.`);
    process.exit(1);
  }

  const analysisData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const approvedInsertions = []; // { targetFile: 'path/to/note.mdx', content: 'markdown content' }

  console.log('--- Interactive Image Insertion ---');
  console.log(`Found ${analysisData.length} analyzed images.`);
  console.log(`Target notes directory: ${notesDir}\n`);

  for (const image of analysisData) {
    console.log('------------------------------------');
    console.log(`Image File: ${image.imageFile}`);
    console.log(`Image Path: ${image.imagePath}`);
    console.log(`\nAI Description:\n${image.aiDescription}\n`);
    
    const useful = await question('-> Add this image to a note? (y/n): ');
    if (useful.toLowerCase() !== 'y') {
      console.log('Skipping.\n');
      continue;
    }

    console.log('\nAvailable note files:');
    noteFiles.forEach((file, index) => console.log(`  [${index + 1}] ${file}`));
    
    const choiceStr = await question(`\n-> Enter the number of the note file to insert into: `);
    const choice = parseInt(choiceStr, 10);

    if (isNaN(choice) || choice < 1 || choice > noteFiles.length) {
      console.log('Invalid choice. Skipping this image.\n');
      continue;
    }

    const targetFile = noteFiles[choice - 1];
    const targetFilePath = path.join(notesDir, targetFile);
    
    const markdownContent = `
![${image.aiDescription}](${image.imagePath})

---
`;
    approvedInsertions.push({ targetFile: targetFilePath, content: markdownContent });
    console.log(`Queued for insertion into ${targetFile}.\n`);
  }

  // Process the insertions
  if (approvedInsertions.length > 0) {
    console.log('------------------------------------');
    console.log('Processing insertions...');

    const insertionsByFile = approvedInsertions.reduce((acc, insertion) => {
      acc[insertion.targetFile] = (acc[insertion.targetFile] || '') + insertion.content;
      return acc;
    }, {});

    for (const [filePath, contentToAppend] of Object.entries(insertionsByFile)) {
      try {
        fs.appendFileSync(filePath, contentToAppend);
        console.log(`Successfully appended ${Object.keys(insertionsByFile).length} image(s) to ${path.basename(filePath)}`);
      } catch (err) {
        console.error(`Error writing to ${filePath}:`, err);
      }
    }
  } else {
    console.log('No images were selected for insertion.');
  }

  rl.close();
  console.log('Interactive session complete.');
}

// --- Script Execution ---
const jsonPath = process.argv[2];
const courseCode = process.argv[3];

if (!jsonPath || !courseCode) {
  console.error('Usage: node scripts/insert-images-interactively.js <path/to/analysis.json> <courseCode>');
  process.exit(1);
}

main(path.resolve(jsonPath), courseCode);
