#!/usr/bin/env node

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs';

const execAsync = promisify(exec);

async function convertPptxToPdf(pptxPath) {
    const pdfPath = pptxPath.replace(/\.pptx$/i, '.pdf');
    const command = `"/Applications/LibreOffice.app/Contents/MacOS/soffice" --headless --convert-to pdf "${pptxPath}" --outdir "${path.dirname(pptxPath)}"`;
    console.log(`Converting: ${path.basename(pptxPath)}...`);
    try {
        const { stdout, stderr } = await execAsync(command);
        console.log(`Successfully converted to: ${path.basename(pdfPath)}`);
        if (stdout) console.log('Conversion stdout:', stdout);
        if (stderr) console.error('Conversion stderr:', stderr);
        return pdfPath;
    } catch (error) {
        console.error(`Error converting ${path.basename(pptxPath)}:`, error);
        throw error;
    }
}

async function main() {
    const targetPptxPath = process.argv[2]; // Optional: a specific pptx file to convert
    if (targetPptxPath) {
        // If a specific file is provided, convert only that file
        const resolvedPath = path.resolve(targetPptxPath);
        if (!fs.existsSync(resolvedPath)) {
            console.error('File not found:', resolvedPath);
            process.exit(1);
        }
        if (path.extname(resolvedPath).toLowerCase() !== '.pptx') {
            console.error('Provided file is not a PPTX:', resolvedPath);
            process.exit(1);
        }
        await convertPptxToPdf(resolvedPath);
        return;
    }

    // If no specific file, find all pptx in materials/
    console.log('Searching for .pptx files in materials...');
    const materialsDir = path.join(process.cwd(), 'materials');
    const pptxFiles = findPptxFilesRecursive(materialsDir).filter(file => file.endsWith('.pptx'));
    console.log(`Found ${pptxFiles.length} file(s) to convert.`);

    for (const file of pptxFiles) {
        await convertPptxToPdf(file);
    }
    console.log('All PPTX to PDF conversions complete.');
}

main();
