import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QI Pro - Teste de Inteligência",
  description: "Descubra seu QI real",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18546745052"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18546745052');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}