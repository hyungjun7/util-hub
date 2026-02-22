"use client";

import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

interface LayoutShellProps {
  children: React.ReactNode;
  categories: string[];
}

export function LayoutShell({ children, categories }: LayoutShellProps) {
  return (
    <div className="md:grid md:min-h-screen md:grid-cols-[240px_1fr]">
      <Suspense fallback={null}>
        <Sidebar categories={categories} />
      </Suspense>
      <div className="flex min-h-screen flex-col">
        <Suspense fallback={null}>
          <Header categories={categories} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
