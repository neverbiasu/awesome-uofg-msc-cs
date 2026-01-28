
const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

// Path to the soffice executable on macOS
const sofficePath = '/Applications/LibreOffice.app/Contents/MacOS/soffice';
const materialsDir = path.join(__dirname, '..', 'materials');

async function findPptxFiles(dir) {
    let results = [];
    try {
        const list = await fs.readdir(dir);
        for (const file of list) {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);
            if (stat && stat.isDirectory()) {
                results = results.concat(await findPptxFiles(filePath));
            } else if (filePath.endsWith('.pptx')) {
                results.push(filePath);
            }
        }
    } catch (err) {
        // Ignore directories that cannot be read (e.g. permission errors)
        if (err.code !== 'EACCES' && err.code !== 'EPERM') {
            console.error(`Error reading directory ${dir}:`, err);
        }
    }
    return results;
}

async function convertPptxToPdf() {
    console.log('Checking for soffice executable...');
    try {
        await fs.access(sofficePath);
        console.log('soffice found.');
    } catch (error) {
        console.error(`Error: LibreOffice executable not found at: ${sofficePath}`);
        console.error('Please ensure LibreOffice is installed correctly and the path is correct in the script.');
        return;
    }
    
    console.log(`Searching for .pptx files in ${materialsDir}...`);
    let pptxFiles;
    try {
        pptxFiles = await findPptxFiles(materialsDir);
    } catch (error) {
        console.error(`Error finding files: ${error.message}`);
        return;
    }

    if (pptxFiles.length === 0) {
        console.log('No .pptx files found to convert.');
        return;
    }

    console.log(`Found ${pptxFiles.length} file(s) to convert.`);

    for (const pptxFile of pptxFiles) {
        const outDir = path.dirname(pptxFile);
        const command = `"${sofficePath}" --headless --convert-to pdf --outdir "${outDir}" "${pptxFile}"`;
        
        console.log(`\nConverting: ${path.relative(materialsDir, pptxFile)}...`);
        try {
            const { stdout, stderr } = await execPromise(command);
            if (stderr) {
                console.error(`Conversion stderr for ${path.basename(pptxFile)}: ${stderr}`);
            }
            const pdfPath = pptxFile.replace(/\.pptx$/, '.pdf');
            console.log(`Successfully converted to: ${path.basename(pdfPath)}`);
            if (stdout) {
                 console.log(`Conversion stdout: ${stdout}`);
            }
        } catch (error) {
            console.error(`Failed to execute conversion for ${path.basename(pptxFile)}: ${error.message}`);
        }
    }
}

convertPptxToPdf().catch(console.error);
