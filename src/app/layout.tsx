import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { LayoutShell } from "@/components/layout/layout-shell";

const themeScript = `(function(){try{var storedTheme=window.localStorage.getItem("theme-preference");if(storedTheme==="dark"){document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.setAttribute("data-theme","light");}}catch(_error){document.documentElement.setAttribute("data-theme","light");}})();`;

export const metadata: Metadata = {
  title: {
    default: "Util Hub",
    template: "%s | Util Hub",
  },
  description: "개발을 위한 유틸리티를 제공하는 사이트",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Util Hub",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
