import * as React from 'react';

type ContactRequestEmailProps = {
  name: string;
  email: string;
  organization?: string;
  serviceNeed?: string;
  message: string;
};

export default function ContactRequestEmail({ name, email, organization, serviceNeed, message }: ContactRequestEmailProps) {
  return (
    <html>
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '24px', backgroundColor: '#f5f7fa' }}>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ maxWidth: 640, margin: '0 auto', backgroundColor: '#ffffff', borderRadius: 24, padding: 24 }}
        >
          <tbody>
            <tr>
              <td>
                <h1 style={{ fontSize: 20, marginBottom: 16, color: '#0b1a2a' }}>New 360ace.Food inquiry</h1>
                <p style={{ margin: '4px 0', color: '#0b1a2a' }}>
                  <strong>Name:</strong> {name}
                </p>
                <p style={{ margin: '4px 0', color: '#0b1a2a' }}>
                  <strong>Email:</strong> {email}
                </p>
                {organization ? (
                  <p style={{ margin: '4px 0', color: '#0b1a2a' }}>
                    <strong>Organization:</strong> {organization}
                  </p>
                ) : null}
                {serviceNeed ? (
                  <p style={{ margin: '4px 0', color: '#0b1a2a' }}>
                    <strong>Focus area:</strong> {serviceNeed}
                  </p>
                ) : null}
                <div style={{ marginTop: 20 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, textTransform: 'uppercase', color: '#0b1a2a', letterSpacing: '0.12em' }}>
                    Message
                  </p>
                  <p style={{ marginTop: 12, color: '#0b1a2a', lineHeight: 1.6 }}>{message}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
