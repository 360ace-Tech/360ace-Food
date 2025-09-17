import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import ContactRequestEmail from '../../../emails/contact-request';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    if (!resend) {
      console.warn('Resend API key missing.');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!to || !from) {
      console.warn('Contact email environment variables missing.');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    await resend.emails.send({
      from,
      to,
      subject: `New inquiry from ${data.name}`,
      react: ContactRequestEmail({
        name: data.name,
        email: data.email,
        organization: data.organization,
        serviceNeed: data.serviceNeed,
        message: data.message
      })
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
