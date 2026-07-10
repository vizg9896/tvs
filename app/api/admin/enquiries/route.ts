import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json({ success: false, reason: 'No Sheets URL configured' });
    }

    const res = await fetch(scriptUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 } // Disable Next.js fetch caching
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, reason: 'Failed to fetch from Google Script' });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching admin enquiries:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
