import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MBK BAU | Stavební firma Znojmo',
  icons: { icon: [{ url: '/mbkbau-white.png', type: 'image/png' }] },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Třída `js` skryje obsah hera do spuštění intro animace (bez probliknutí).
const JS_CLASS_SCRIPT = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={montserrat.variable} lang="cs" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: statický inline skript bez uživatelských dat */}
        <script dangerouslySetInnerHTML={{ __html: JS_CLASS_SCRIPT }} />
      </head>
      <body className="bg-surface font-sans text-on-surface antialiased">{children}</body>
    </html>
  );
}
