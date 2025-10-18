import { NextResponse } from 'next/server';
import { source } from '@/lib/source';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    pageTree: source.pageTree,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
