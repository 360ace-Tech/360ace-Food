import React from "react";

type JsonLdValue = string | number | boolean | null | JsonLdValue[] | { [k: string]: JsonLdValue };
export default function JsonLd({ data }: { data: { [k: string]: JsonLdValue } }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
