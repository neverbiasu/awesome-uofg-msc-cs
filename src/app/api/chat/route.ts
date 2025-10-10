import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type ChatRole = 'system' | 'user' | 'assistant';

type IncomingMessage = {
  role: ChatRole;
  content: string;
};

const MODELSCOPE_MODELS = [
  'ZhipuAI/GLM-4.6',
  'iic/Tongyi-DeepResearch-30B-A3B',
  'Qwen/Qwen3-Next-80B-A3B-Instruct',
  'Qwen/Qwen3-Next-80B-A3B-Thinking',
  'deepseek-ai/DeepSeek-V3.1',
  'Qwen/Qwen3-32B',
  'Qwen/Qwen3-8B',
  'Qwen/Qwen3-0.6B',
  'Qwen/Qwen3-235B-A22B-Instruct-2507',
  'ZhipuAI/GLM-4.5',
  'deepseek-ai/DeepSeek-R1-0528',
  'Qwen/Qwen3-30B-A3B-Instruct-2507',
  'Qwen/Qwen2.5-7B-Instruct',
  'Qwen/Qwen3-Coder-30B-A3B-Instruct',
  'Qwen/Qwen3-4B',
  'Qwen/Qwen3-235B-A22B',
  'Qwen/Qwen3-1.7B',
  'Qwen/Qwen3-14B',
  'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
  'Qwen/Qwen3-235B-A22B-Thinking-2507',
  'Qwen/Qwen3-30B-A3B',
  'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
  'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
  'Qwen/Qwen3-30B-A3B-Thinking-2507',
  'Qwen/Qwen2.5-72B-Instruct',
  'Qwen/QwQ-32B',
  'deepseek-ai/DeepSeek-R1-Distill-Llama-70B',
  'Qwen/Qwen2.5-32B-Instruct',
  'Qwen/Qwen2.5-14B-Instruct',
  'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B',
  'Qwen/Qwen2.5-Coder-32B-Instruct',
  'XGenerationLab/XiYanSQL-QwenCoder-32B-2504',
  'XGenerationLab/XiYanSQL-QwenCoder-32B-2412',
  'deepseek-ai/DeepSeek-R1-Distill-Llama-8B',
  'Qwen/Qwen2.5-Coder-7B-Instruct',
  'Qwen/Qwen2.5-7B-Instruct-1M',
  'LLM-Research/Llama-4-Scout-17B-16E-Instruct',
  'Qwen/Qwen2.5-14B-Instruct-1M',
  'LLM-Research/Llama-4-Maverick-17B-128E-Instruct',
  'Menlo/Jan-nano',
  'Qwen/Qwen2.5-Coder-14B-Instruct',
  'Qwen/QwQ-32B-Preview',
];

const DEFAULT_MODEL = MODELSCOPE_MODELS[0];

type MessageLike = {
  role?: unknown;
  content?: unknown;
  parts?: unknown;
};

const normaliseContent = (raw: unknown): string => {
  if (typeof raw === 'string') return raw.trim();

  if (Array.isArray(raw)) {
    const pieces = raw
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part && typeof (part as { text?: unknown }).text === 'string') {
          return ((part as { text?: string }).text ?? '').toString();
        }
        if (part && typeof part === 'object' && 'content' in part && typeof (part as { content?: unknown }).content === 'string') {
          return (part as { content?: string }).content ?? '';
        }
        return '';
      })
      .filter((chunk) => chunk.trim().length > 0);
    return pieces.join('\n').trim();
  }

  if (raw && typeof raw === 'object' && 'text' in raw) {
    const text = (raw as { text?: unknown }).text;
    if (typeof text === 'string') return text.trim();
  }

  return '';
};

const parseMessages = (value: unknown): IncomingMessage[] | null => {
  if (!Array.isArray(value)) return null;

  const parsed: IncomingMessage[] = [];

  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const candidate = item as MessageLike;
    const role = candidate.role;
    if (role !== 'system' && role !== 'user' && role !== 'assistant') continue;

    const content = normaliseContent(candidate.content ?? candidate.parts);
    if (content.length === 0 && role !== 'system') continue;

    parsed.push({ role, content });
  }

  return parsed.length > 0 ? parsed : null;
};

const jsonResponse = (data: unknown, status = 200) =>
  NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });

export async function POST(req: Request) {
  let body: Record<string, unknown> | null = null;

  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload' }, 400);
  }

  const messages = parseMessages(body?.messages);
  if (!messages) {
  return jsonResponse({ error: 'Missing or invalid messages array', received: body?.messages }, 400);
  }

  const apiKey = process.env.MODELSCOPE_API_KEY ?? process.env.OPENAI_API_KEY ?? '';
  if (!apiKey) {
    return jsonResponse({ error: 'Server missing MODELSCOPE_API_KEY environment variable' }, 500);
  }

  const requestedModel = typeof body?.model === 'string' ? (body.model as string) : null;
  const modelName = requestedModel && MODELSCOPE_MODELS.includes(requestedModel) ? requestedModel : DEFAULT_MODEL;

  const temperature = typeof body?.temperature === 'number' ? (body.temperature as number) : 0.2;
  const maxOutputTokens = typeof body?.max_tokens === 'number' ? (body.max_tokens as number) : undefined;

  const openai = createOpenAICompatible({
    name: 'modelscope',
    apiKey,
    baseURL: 'https://api-inference.modelscope.cn/v1',
  });

  try {
    const result = await streamText({
      model: openai(modelName),
      messages,
      temperature,
      ...(maxOutputTokens ? { maxOutputTokens } : {}),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('[api/chat] stream error', error);
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse({ error: message }, 500);
  }
}

export const ModelscopeModelList = MODELSCOPE_MODELS satisfies readonly string[];
