#!/usr/bin/env node
/**
 * Agnes translation quality evaluator.
 *
 * Translates a handful of representative EN notes (math / code / mermaid / bilingual
 * mix) to ZH using the same provider chain as translate-notes.js, writes the
 * outputs under eval/agnes/ for human review, and runs automatic checks that
 * MDX components, code fences and math blocks were preserved (not translated).
 *
 * Usage:  node scripts/eval-agnes.mjs
 * Requires one of: AGNES_API_KEY (preferred) or MODELSCOPE_API_KEY in .env
 */

import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config();

function buildProviders() {
  const providers = [];
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
  return providers;
}

const PROVIDERS = buildProviders();
if (PROVIDERS.length === 0) {
  console.error('No provider configured. Set AGNES_API_KEY or MODELSCOPE_API_KEY.');
  process.exit(1);
}

async function chat(prompt, temperature) {
  let lastError;
  for (const p of PROVIDERS) {
    try {
      const r = await p.client.chat.completions.create({
        model: p.model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
      });
      const c = r.choices[0]?.message?.content ?? '';
      if (c.trim()) return c;
      lastError = new Error(`Empty response from ${p.name}`);
    } catch (e) {
      lastError = e;
      console.error(`  [${p.name}] failed: ${e.message}`);
    }
  }
  throw lastError;
}

function parseMdx(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { frontmatter: '', body: content };
  return { frontmatter: m[1], body: m[2] };
}

// Automatic preservation checks — these must hold for a correct translation.
function checkPreservation(src, out, label) {
  const checks = [];
  const cmp = (name, re) => {
    const s = (src.match(re) || []).length;
    const o = (out.match(re) || []).length;
    checks.push({ name, src: s, out: o, ok: s === o });
  };
  cmp('mdx components (<Xxx ...>)', /<\s*[A-Z][A-Za-z]*\b/g);
  cmp('code fences (```)', /```/g);
  cmp('inline math ($$)', /\$\$/g);
  cmp('mermaid blocks', /```mermaid/g);
  console.log(`\n[${label}] preservation checks:`);
  for (const c of checks) {
    console.log(`  ${c.ok ? 'PASS' : 'FAIL'}  ${c.name}: src=${c.src} out=${c.out}`);
  }
  return checks.every((c) => c.ok);
}

const SAMPLES = [
  'notes/en/semester-1/COMPSCI5100/unit1/polynomial-and-cv.mdx',
  'notes/en/semester-1/COMPSCI5100/unit2/logistic-regression-and-svms.mdx',
  'notes/en/semester-1/COMPSCI5092/index.mdx',
];

const OUT_DIR = 'eval/agnes';
fs.mkdirSync(OUT_DIR, { recursive: true });

let allOk = true;
for (const rel of SAMPLES) {
  const abs = path.resolve(rel);
  if (!fs.existsSync(abs)) {
    console.warn(`Skipping missing sample: ${rel}`);
    continue;
  }
  const src = fs.readFileSync(abs, 'utf8');
  const { frontmatter, body } = parseMdx(src);
  console.log(`\n=== ${rel} ===`);

  const fmOut = frontmatter.trim()
    ? (await chat(`Translate only the values of the YAML frontmatter keys to Simplified Chinese. Keep keys and YAML formatting exactly. Return ONLY the raw YAML block.\n\n${frontmatter}`, 0.1)).trim()
    : '';
  const bodyOut = (await chat(`You are a professional academic translator specializing in CS. Translate the following MDX body into Simplified Chinese. Do NOT translate or modify any MDX/HTML components, code, math ($$...$$), or mermaid blocks. Preserve all Markdown. Return only the translated body.\n\n${body}`, 0.2)).trim();

  const out = `---\n${fmOut}\n---\n\n${bodyOut}\n`;
  const name = path.basename(rel).replace('.mdx', '.zh.mdx');
  fs.writeFileSync(path.join(OUT_DIR, name), out, 'utf8');
  console.log(`  written eval/agnes/${name} (${out.length} chars)`);
  allOk = checkPreservation(src, out, rel) && allOk;
}

console.log(`\n==== Summary: ${allOk ? 'ALL PRESERVATION CHECKS PASS' : 'SOME CHECKS FAILED'} ====`);
console.log('Review eval/agnes/*.zh.mdx for translation fluency/accuracy, then decide on adoption.');
