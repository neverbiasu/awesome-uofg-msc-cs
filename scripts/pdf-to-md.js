#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
let pdfjsLib;

async function pdfToText(pdfPath){
  if (!pdfjsLib) {
    // dynamic import of the ESM bundle to support current pdfjs-dist versions
    pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  }
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjsLib.getDocument({data});
  const doc = await loadingTask.promise;
  let out = '';
  for(let i=1;i<=doc.numPages;i++){
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    // join with spaces and collapse multiple spaces
    const para = strings.join(' ').replace(/\s+/g, ' ').trim();
    out += `\n\n<!-- Page ${i} -->\n\n${para}\n`;
  }
  return out.trim();
}

async function main(){
  const arg = process.argv[2];
  if(!arg){
    console.error('Usage: node pdf-to-md.js <path/to/file.pdf>');
    process.exit(2);
  }
  const pdfPath = path.resolve(arg);
  if(!fs.existsSync(pdfPath)){
    console.error('File not found:', pdfPath);
    process.exit(2);
  }
  try{
    const text = await pdfToText(pdfPath);
    // simple header using filename
    const base = path.basename(pdfPath, path.extname(pdfPath));
    const md = `# ${base}\n\n` + text;
    const outPath = path.join(path.dirname(pdfPath), base + '.md');
    fs.writeFileSync(outPath, md, 'utf8');
    console.log('Wrote:', outPath);
  }catch(err){
    console.error('Error extracting PDF:', err);
    process.exit(1);
  }
}

main();
