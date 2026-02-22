import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { LayoutShell } from "@/components/layout/layout-shell";
import { posts } from "@/lib/content";

const themeScript = `(function(){try{var storedTheme=window.localStorage.getItem("theme-preference");if(storedTheme==="light"||storedTheme==="dark"){document.documentElement.setAttribute("data-theme",storedTheme);}else{document.documentElement.removeAttribute("data-theme");}}catch(_error){document.documentElement.removeAttribute("data-theme");}})();`;

export const metadata: Metadata = {
  title: {
    default: "Post",
    template: "%s | Post",
  },
  description: "개발과 생각을 기록하는 공간",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Post",
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
  const categories = Array.from(
    new Set(posts.filter((post) => post.published).map((post) => post.category))
  ).sort();

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LayoutShell categories={categories}>{children}</LayoutShell>
      </body>
    </html>
  );
}
