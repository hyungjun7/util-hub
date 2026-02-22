"use client";

import { Suspense } from "react";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

interface LayoutShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <I18nProvider>
      <div className="md:grid md:min-h-screen md:grid-cols-[240px_1fr]">
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </I18nProvider>
  );
}
