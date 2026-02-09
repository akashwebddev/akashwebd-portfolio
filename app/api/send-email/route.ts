import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  // Send email logic
  return NextResponse.json({ success: true })
}
