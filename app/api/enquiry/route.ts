import { NextResponse } from 'next/server';

export interface EnquiryPayload {
  type: 'booking' | 'inquiry';
  name: string;
  phone: string;
  vehicleTitle?: string;
  variant?: string;
  date?: string;
  slot?: string;
  message?: string;
  submittedAt: string;
}

// ── Helper: Append row to Google Sheet via Apps Script Web App ───────────────
async function saveToGoogleSheet(data: EnquiryPayload) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!scriptUrl) return { ok: false, reason: 'No Apps Script URL configured' };

  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return { ok: res.ok, status: res.status };
}

// ── Helper: Send email via Resend ─────────────────────────────────────────────
async function sendEmailViaResend(data: EnquiryPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !toEmail) return { ok: false, reason: 'Email not configured' };

  const isBooking = data.type === 'booking';
  const subject = isBooking
    ? `🏍️ New Test Ride Booking — ${data.vehicleTitle || 'Unknown Vehicle'}`
    : `📩 New Enquiry — ${data.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 12px;">
      <div style="background: #d62b2b; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Shree Balaji TVS</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 13px;">
          ${isBooking ? '🏍️ New Test Ride Booking' : '📩 New Customer Enquiry'}
        </p>
      </div>
      <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; width: 120px;">TYPE</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: ${isBooking ? '#d62b2b' : '#1d4ed8'};">${isBooking ? 'TEST RIDE BOOKING' : 'GENERAL ENQUIRY'}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">NAME</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">PHONE</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="tel:${data.phone}" style="color: #d62b2b; font-weight: 700; text-decoration: none;">${data.phone}</a></td></tr>
          ${data.vehicleTitle ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">VEHICLE</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.vehicleTitle}${data.variant ? ` — ${data.variant}` : ''}</td></tr>` : ''}
          ${data.date ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">PREFERRED DATE</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.date}</td></tr>` : ''}
          ${data.slot ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px;">TIME SLOT</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.slot}</td></tr>` : ''}
          ${data.message ? `<tr><td style="padding: 10px 0; color: #888; font-size: 12px; vertical-align: top;">MESSAGE</td><td style="padding: 10px 0; line-height: 1.5;">${data.message}</td></tr>` : ''}
        </table>
        <div style="margin-top: 20px; padding: 14px; background: #f9fafb; border-radius: 8px; font-size: 12px; color: #888;">
          Submitted: ${new Date(data.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}
        </div>
        <a href="tel:${data.phone}" style="display: inline-block; margin-top: 16px; background: #d62b2b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">
          📞 Call ${data.name} Now
        </a>
      </div>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Shree Balaji TVS <onboarding@resend.dev>',
      to: [toEmail],
      subject,
      html,
    }),
  });

  return { ok: res.ok, status: res.status };
}

// ── POST /api/enquiry ─────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body: EnquiryPayload = await request.json();

    if (!body.name || !body.phone || !body.type) {
      return NextResponse.json({ error: 'Missing required fields: name, phone, type' }, { status: 400 });
    }

    // Validate phone number (basic)
    const phoneClean = body.phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    const payload: EnquiryPayload = {
      ...body,
      submittedAt: body.submittedAt || new Date().toISOString(),
    };

    // Run both saves in parallel — neither failure blocks the other
    const [sheetResult, emailResult] = await Promise.allSettled([
      saveToGoogleSheet(payload),
      sendEmailViaResend(payload),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully',
      sheet: sheetResult.status === 'fulfilled' ? sheetResult.value : { ok: false },
      email: emailResult.status === 'fulfilled' ? emailResult.value : { ok: false },
    });

  } catch (error: any) {
    console.error('Enquiry API error:', error);
    return NextResponse.json({ error: 'Internal server error', detail: error.message }, { status: 500 });
  }
}
