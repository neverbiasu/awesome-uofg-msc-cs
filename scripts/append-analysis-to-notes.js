#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

/**
 * Finds the corresponding notes directory for a given course code.
 * @param {string} courseCode - e.g., COMPSCI5012-internet-technology
 * @returns {string|null} Path to the notes directory or null if not found.
 */
function findNotesDir(courseCode) {
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
 * Generates a descriptive slug from the image filename.
 * e.g., "L0-Welcome_to_the_course-001.jpg" -> "l0-welcome_to_the_course"
 * @param {string} imageName - The name of the image file.
 * @returns {string} A URL-friendly slug.
 */
function getSlugFromImageName(imageName) {
    // Remove file extension and leading numbers/dashes from images
    let baseName = path.basename(imageName, path.extname(imageName));
    // Remove common prefixes like 'L0-', 'L1-', etc. for a cleaner slug
    baseName = baseName.replace(/^(L\d+)-/, '');
    return baseName.toLowerCase().replace(/[^a-z0-9_]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Constructs the target path for a note file based on a lecture prefix.
 * @param {string} notesRootForLang - The root directory for the course's notes for a specific language.
 * @param {string} lecturePrefix - The prefix like 'L0', 'L1', etc.
 * @param {string} slug - The descriptive slug for the filename.
 * @param {string} lang - The language code ('zh' or 'en').
 * @returns {string|null} The absolute path for the target .mdx file.
 */
function getTargetNotePath(notesRootForLang, lecturePrefix, slug, lang) {
    const weekMatch = lecturePrefix.match(/L(\d+)/);
    if (!weekMatch) return null;
    
    const weekNum = parseInt(weekMatch[1], 10);
    const weekDirName = `week${weekNum}`;
    const potentialWeekDir = path.join(notesRootForLang, weekDirName);
    
    // Ensure the week directory exists
    fs.mkdirSync(potentialWeekDir, { recursive: true });

    // Use the slug to create a descriptive filename
    let noteFilename = `${lecturePrefix.toLowerCase()}-${slug}.mdx`;
    
    // For specific weeks, we already have files, so use those.
    // This part might need to be dynamic or configured if filenames vary significantly
    // For now, it's a specific fix for L3.
    if (weekNum === 3 && lang === 'zh' && slug.includes('htmlcssbootstrap')) {
        noteFilename = 'html-css-bootstrap-basics.mdx';
    }

    return path.join(potentialWeekDir, noteFilename);
}

async function main(jsonPath, courseCode, lang) {
    if (!fs.existsSync(jsonPath)) {
        console.error('Error: Analysis JSON file not found at', jsonPath);
        process.exit(1);
    }

    const notesRootForLang = path.join(process.cwd(), 'notes', lang, 'semester-2', courseCode);
    if (!fs.existsSync(notesRootForLang) || !fs.lstatSync(notesRootForLang).isDirectory()) {
        console.error(`Error: Could not find the notes root directory for language '${lang}' at '${notesRootForLang}'.`);
        process.exit(1);
    }


    const analysisData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const insertionsByFile = {};

    console.log('--- Non-Interactive Image Insertion ---');
    console.log(`Processing ${analysisData.length} analyzed images.`);

    for (const image of analysisData) {
        const lecturePrefixMatch = image.imageFile.match(/^(L\d+)/); // Match just L0, L1, etc.
        if (!lecturePrefixMatch) {
            console.warn(`Could not determine lecture prefix for image ${image.imageFile}. Skipping.`);
            continue;
        }
        
        const lecturePrefix = lecturePrefixMatch[1];
        const slug = getSlugFromImageName(image.imageFile);
        const targetFile = getTargetNotePath(notesRootForLang, lecturePrefix, slug, lang);

        if (!targetFile) {
            console.warn(`Could not determine a target note path for lecture ${lecturePrefix} and image ${image.imageFile}. Skipping.`);
            continue;
        }

        // If the note file doesn't exist, create it with a frontmatter
        if (!fs.existsSync(targetFile)) {
            const weekNum = lecturePrefix.match(/L(\d+)/)[1];
            let title = '';
            let description = '';

            // Default titles and descriptions for newly created note files
            // For now, these are very generic.
            if (lang === 'zh') {
                title = `第${weekNum}周笔记`;
                description = `第${weekNum}周的课程笔记。`;
            } else { // lang === 'en'
                title = `Week ${weekNum} Notes`;
                description = `Course notes for Week ${weekNum}.`;
            }
            
            const frontmatter = `---\ntitle: "${title}"
description: "${description}"
---` + `

`;
            fs.writeFileSync(targetFile, frontmatter, 'utf8');
        }
        
        const markdownContent = `
![${image.aiDescription}](${image.imagePath})

---
`;

        
        if (!insertionsByFile[targetFile]) {
            insertionsByFile[targetFile] = '';
        }
        insertionsByFile[targetFile] += markdownContent;
    }

    // Process the insertions
    if (Object.keys(insertionsByFile).length > 0) {
        console.log('------------------------------------');
        console.log('Appending images to note files...');

        for (const [filePath, contentToAppend] of Object.entries(insertionsByFile)) {
            try {
                fs.appendFileSync(filePath, contentToAppend);
                console.log(`Successfully appended content to ${path.basename(filePath)}`);
            } catch (err) {
                console.error(`Error writing to ${filePath}:`, err);
            }
        }
    } else {
        console.log('No images were matched to note files.');
    }

    console.log('Non-interactive insertion complete.');
}

// --- Script Execution ---
const jsonPath = process.argv[2];
const courseCode = process.argv[3];
const lang = process.argv[4]; // New argument for language

if (!jsonPath || !courseCode || !lang) {
    console.error('Usage: node scripts/append-analysis-to-notes.js <path/to/analysis.json> <courseCode> <lang>');
    console.error('Example: node scripts/append-analysis-to-notes.js reports/.../final-analysis.json COMPSCI5012-internet-technology zh');
    process.exit(1);
}

main(path.resolve(jsonPath), courseCode, lang);
