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
 */
const API_KEY = process.env.MODELSCOPE_API_KEY;
const BASE_URL = process.env.MODELSCOPE_API_ENDPOINT || "https://api-inference.modelscope.cn/v1";
const MODEL_ID = "qwen/Qwen2.5-72B-Instruct"; // Strong translation model

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: API_KEY || "dummy-key",
  baseURL: BASE_URL,
});

/**
 * Split MDX content into Frontmatter (YAML) and Body
 * @param {string} content - Raw file content.
 * @returns {{frontmatter: string, body: string}}
 */
function parseMdx(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: '', body: content };
  }
  return {
    frontmatter: match[1],
    body: match[2],
  };
}

/**
 * Translate YAML frontmatter values while maintaining YAML keys and syntax.
 * @param {string} yamlStr - Raw frontmatter YAML string.
 * @param {string} targetLang - Language code: 'zh' or 'en'.
 * @returns {Promise<string>}
 */
async function translateFrontmatter(yamlStr, targetLang = 'zh') {
  if (!yamlStr.trim()) return '';

  const prompt = `Translate only the values of the YAML frontmatter keys (such as 'title' and 'description') to ${
    targetLang === 'zh' ? 'Simplified Chinese' : 'English'
  }. Keep the key names and overall YAML formatting exactly the same.
Return ONLY the raw YAML block without any Markdown wrappers like \`\`\`yaml.

YAML frontmatter:
${yamlStr}`;

  try {
    const response = await client.chat.completions.create({
      model: MODEL_ID,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
    });
    return response.choices[0].message.content.trim() || yamlStr;
  } catch (error) {
    console.error('Error translating frontmatter:', error.message);
    return yamlStr;
  }
}

/**
 * Translate the main MDX body while preserving tags and formatting.
 * @param {string} text - MDX body text.
 * @param {string} targetLang - Language code: 'zh' or 'en'.
 * @returns {Promise<string>}
 */
async function translateMdxBody(text, targetLang = 'zh') {
  if (!text.trim()) return '';
  if (!API_KEY) {
    console.warn("MODELSCOPE_API_KEY is not configured. Skipping LLM translation for body.");
    return `[Translated to ${targetLang}]:\n${text}`;
  }

  const prompt = `You are a professional academic translator specializing in Computer Science and software engineering.
Translate the following MDX document body into ${targetLang === 'zh' ? 'Simplified Chinese (zh)' : 'English (en)'}.

Follow these rules strictly:
1. Do NOT translate or modify any MDX/HTML components or tags (e.g. <Accordions>, <Accordion>, <Steps>, <Step>, <Callout>, <Card>, <GraphView>). Keep their attributes and values unchanged.
2. Preserve all Markdown elements like headers (#, ##, ###), bold (**), list formats, and inline code (\`code\`).
3. Preserve all inline math expressions (written as $$...$$) and block-level math code blocks (\`\`\`math ... \`\`\`).
4. Preserve all Mermaid diagram code blocks (\`\`\`mermaid ... \`\`\`).
5. Ensure the translated terms match standard CS academic usage. Do not add any extra explanations or greetings.
6. Return only the translated body.

Document Body to Translate:
${text}`;

  try {
    const response = await client.chat.completions.create({
      model: MODEL_ID,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error translating MDX body:', error.message);
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const sourcePath = args[0];
  const targetPath = args[1];
  const targetLang = args[2] || 'zh';

  if (!sourcePath || !targetPath) {
    console.error('Usage: node scripts/translate-notes.js <source-file.mdx> <target-file.mdx> [targetLang]');
    console.error('Example: node scripts/translate-notes.js notes/en/semester-1/COMPSCI5100/week1/intro.mdx notes/zh/semester-1/COMPSCI5100/week1/intro.mdx zh');
    process.exit(1);
  }

  try {
    const absoluteSource = path.resolve(sourcePath);
    const absoluteTarget = path.resolve(targetPath);

    if (!fs.existsSync(absoluteSource)) {
      throw new Error(`Source file not found at ${absoluteSource}`);
    }

    console.log(`Reading source file from: ${absoluteSource}`);
    const sourceContent = fs.readFileSync(absoluteSource, 'utf8');

    const { frontmatter, body } = parseMdx(sourceContent);

    console.log(`Translating frontmatter to ${targetLang}...`);
    const translatedFrontmatter = await translateFrontmatter(frontmatter, targetLang);

    console.log(`Translating body to ${targetLang}...`);
    const translatedBody = await translateMdxBody(body, targetLang);

    // Reconstruct the translated MDX note
    const finalContent = `---\n${translatedFrontmatter}\n---\n\n${translatedBody}\n`;

    // Ensure output directories exist
    fs.mkdirSync(path.dirname(absoluteTarget), { recursive: true });
    
    console.log(`Writing translated note to: ${absoluteTarget}`);
    fs.writeFileSync(absoluteTarget, finalContent, 'utf8');
    console.log('Translation and sync completed successfully.');

  } catch (error) {
    console.error('Critical failure in translation script:', error.message);
    process.exit(1);
  }
}

main();

