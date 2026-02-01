#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

/**
 * Merges all JSON files from batch analysis into a single JSON report.
 * @param {string} dirPath - The directory containing the batch JSON files.
 * @param {string} finalReportName - The name for the final merged JSON file (e.g., 'final-analysis.json').
 */
function mergeJsonReports(dirPath, finalReportName) {
  if (!fs.existsSync(dirPath)) {
    console.error('Error: Directory with batch reports not found at', dirPath);
    process.exit(1);
  }

  const allResults = [];
  const batchFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('-analysis.json'));

  console.log(`Found ${batchFiles.length} batch files to merge.`);

  for (const file of batchFiles) {
    const filePath = path.join(dirPath, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      // Each file is a JSON array, so parse it and add its elements to the master array
      const batchResults = JSON.parse(content);
      allResults.push(...batchResults);
    } catch (err) {
      console.error(`Error reading or parsing ${file}:`, err);
    }
  }

  const finalReportPath = path.join(dirPath, finalReportName);
  try {
    fs.writeFileSync(finalReportPath, JSON.stringify(allResults, null, 2), 'utf8');
    console.log(`Successfully merged ${allResults.length} records into ${finalReportPath}`);
  } catch (err) {
    console.error(`Error writing final merged report:`, err);
  }
}

// --- Script Execution ---
const targetDir = process.argv[2];
const finalReportName = process.argv[3];

if (!targetDir || !finalReportName) {
  console.error('Usage: node scripts/merge-json-reports.js <path/to/batch/directory> <final_report_name.json>');
  process.exit(1);
}

mergeJsonReports(path.resolve(targetDir), finalReportName);
