#!/usr/bin/env node

import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config();

/**
 * -----------------------------------------------------------------------------
 * Provider configuration
 * -----------------------------------------------------------------------------
 * Each provider is OpenAI-compatible. The first provider with a configured key
 * is used; on failure we fall through to the next one. If no provider has a
 * key, the script fails fast instead of emitting untranslated (fake) content.
 */
function buildProviders() {
  /** @type {{name: string, client: import('openai').OpenAI, model: string}[]} */
  const providers = [];

  // Agnes AI first: free, unlimited, OpenAI-compatible.
  const agnesKey = process.env.AGNES_API_KEY;
  if (agnesKey) {
    providers.push({
      name: 'agnes',
      client: new OpenAI({
        apiKey: agnesKey,
        baseURL: process.env.AGNES_API_ENDPOINT || 'https://apihub.agnes-ai.com/v1',
      }),
      model: process.env.AGNES_MODEL || 'agnes-2.0-flash',
    });
  }

  // ModelScope as fallback.
  const msKey = process.env.MODELSCOPE_API_KEY;
  if (msKey) {
    providers.push({
      name: 'modelscope',
      client: new OpenAI({
        apiKey: msKey,
        baseURL: process.env.MODELSCOPE_API_ENDPOINT || 'https://api-inference.modelscope.cn/v1',
      }),
      model: 'qwen/Qwen2.5-72B-Instruct',
    });
  }

  return providers;
}

const PROVIDERS = buildProviders();

if (PROVIDERS.length === 0) {
  console.error(
    'No translation provider configured. Set MODELSCOPE_API_KEY or AGNES_API_KEY (or both).\n' +
      'Get a free Agnes key at https://platform.agnes-ai.com (no credit card required).'
  );
  process.exit(1);
}

/**
 * Call chat completions, trying each configured provider in order.
 * Fails fast (throws) if every provider errors — never returns fake content.
 * @param {string} prompt
 * @param {number} temperature
 * @returns {Promise<string>}
 */
async function chat(prompt, temperature) {
  let lastError;
  for (const provider of PROVIDERS) {
    try {
      const response = await provider.client.chat.completions.create({
        model: provider.model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
      });
      const content = response.choices[0]?.message?.content ?? '';
      if (content.trim()) return content;
      lastError = new Error(`Empty response from ${provider.name}`);
    } catch (error) {
      lastError = error;
      console.error(`Provider "${provider.name}" failed: ${error.message}`);
    }
  }
  throw lastError ?? new Error('All providers failed');
}

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
 * Strip accidental Markdown code fences (e.g. ```yaml ... ```) some models
 * wrap around the response, so the result stays valid frontmatter.
 * @param {string} s
 */
function stripFences(s) {
  return s.replace(/^```[a-zA-Z]*\s*\n([\s\S]*?)\n```$/s, '$1').trim();
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
Return ONLY the raw YAML block, with no Markdown code fences and no extra text.

YAML frontmatter:
${yamlStr}`;

  const result = stripFences(await chat(prompt, 0.1));
  return result || yamlStr;
}

/**
 * Translate the main MDX body while preserving tags and formatting.
 * @param {string} text - MDX body text.
 * @param {string} targetLang - Language code: 'zh' or 'en'.
 * @returns {Promise<string>}
 */
async function translateMdxBody(text, targetLang = 'zh') {
  if (!text.trim()) return '';

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

  return (await chat(prompt, 0.2)).trim();
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
