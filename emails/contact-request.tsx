type ContactRequestEmailProps = {
  name: string;
  email: string;
  organization?: string;
  serviceNeed?: string;
  message: string;
};

export default function ContactRequestEmail({ name, email, organization, serviceNeed, message }: ContactRequestEmailProps) {
  return `
    <html>
      <body style="font-family: Inter, system-ui, sans-serif; padding: 24px; background-color: #f5f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; padding: 24px;">
          <tbody>
            <tr>
              <td>
                <h1 style="font-size: 20px; margin-bottom: 16px; color: #0b1a2a;">New 360ace.Food inquiry</h1>
                <p style="margin: 4px 0; color: #0b1a2a;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 4px 0; color: #0b1a2a;"><strong>Email:</strong> ${email}</p>
                ${organization ? `<p style="margin: 4px 0; color: #0b1a2a;"><strong>Organization:</strong> ${organization}</p>` : ''}
                ${serviceNeed ? `<p style="margin: 4px 0; color: #0b1a2a;"><strong>Focus area:</strong> ${serviceNeed}</p>` : ''}
                <div style="margin-top: 20px;">
                  <p style="font-weight: 600; font-size: 14px; text-transform: uppercase; color: #0b1a2a; letter-spacing: 0.12em;">Message</p>
                  <p style="margin-top: 12px; color: #0b1a2a; line-height: 1.6;">${message}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
}
