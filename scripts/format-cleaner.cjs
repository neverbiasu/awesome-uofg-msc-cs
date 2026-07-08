const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '../notes');

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    // 1. Remove numbered headings
    // Matches ## 1. , ### 2. , #### 10. , etc.
    content = content.replace(/^(#+)\s+\d+\.\s+(.*)$/gm, '$1 $2');

    // 2. Remove "更新记录" / "Last Update" blocks
    // This regex looks for --- followed by some optional whitespace/newlines,
    // then "更新记录" or "Last Update", and strips everything from that --- to the end of the file.
    // It's a bit aggressive but matches the template structure.
    const updateRecordRegex = /---\s*[\r\n]+(?:更新记录|Last Update\b)[\s\S]*$/i;
    content = content.replace(updateRecordRegex, '');

    // Ensure file ends with a single newline if it was modified
    if (content !== originalContent) {
        if (!content.endsWith('\n')) {
             content += '\n';
        }
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Cleaned: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.mdx')) {
            cleanFile(fullPath);
        }
    }
}

walkDir(notesDir);
console.log('Format cleaning completed.');
