import { pdf } from 'pdf-to-img';
import path from 'path';
import fs from 'fs';

const inputPdf = process.argv[2];
const outputDir = process.argv[3];

if (!inputPdf || !outputDir) {
    console.error('Usage: node convert-pdf-to-images.mjs <inputPdf> <outputDir>');
    process.exit(1);
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function convert() {
    try {
        const document = await pdf(inputPdf, { scale: 2 }); // Increase scale for better quality
        let counter = 0;
        for await (const image of document) {
            const outputName = path.basename(inputPdf, '.pdf') + `-${String(counter).padStart(3, '0')}.png`;
            const outputPath = path.join(outputDir, outputName);
            fs.writeFileSync(outputPath, image);
            console.log(`Saved: ${outputPath}`);
            counter++;
        }
        console.log('Conversion complete.');
    } catch (error) {
        console.error('Error converting PDF:', error);
        process.exit(1);
    }
}

convert();
