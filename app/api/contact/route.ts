import { NextResponse } from 'next/server';
import { z } from 'zod';
import ContactRequestEmail from '../../../emails/contact-request';

const mailerSendToken = process.env.MAILERSEND_API_TOKEN;

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  serviceNeed: z.string().optional(),
  message: z.string().min(10),
  honeypot: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = contactSchema.parse(json);

    if (data.honeypot) {
      return NextResponse.json({ status: 'ok' });
    }

    if (!mailerSendToken) {
      console.warn('MailerSend API token missing.');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!to || !from) {
      console.warn('Contact email environment variables missing.');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mailerSendToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: { email: from, name: '360ace.Food' },
        to: [{ email: to, name: '360ace.Food' }],
        subject: `New inquiry from ${data.name}`,
        html: ContactRequestEmail({
          name: data.name,
          email: data.email,
          organization: data.organization,
          serviceNeed: data.serviceNeed,
          message: data.message
        })
      })
    });

    if (!response.ok) {
      console.error('MailerSend error', await response.text());
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
