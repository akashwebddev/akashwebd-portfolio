import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body?.text || '';
    const chat_id = body?.chat_id || process.env.CHAT_ID;
    const token = process.env.BOT_TOKEN;
    const apiBase = process.env.TELEGRAM_API_URL || 'https://api.telegram.org';

    if (!token) {
      return NextResponse.json({ error: 'BOT_TOKEN not configured' }, { status: 500 });
    }
    if (!chat_id) {
      return NextResponse.json({ error: 'CHAT_ID not configured' }, { status: 400 });
    }

    const res = await fetch(`${apiBase}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : 500 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
