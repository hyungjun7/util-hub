"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { navItems } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { utilTools } from "@/components/layout/util-tools";

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [utilOpen, setUtilOpen] = useState(pathname.startsWith("/util"));

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm md:hidden">
      <div className="container mx-auto max-w-3xl px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {t("brand.name")}
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
        <nav className="mb-2 flex flex-col gap-3">
          {navItems.map(({ href, labelKey }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            if (href === "/util") {
              return (
                <div key={href} className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setUtilOpen((previous) => !previous)}
                    aria-expanded={utilOpen}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(labelKey)}
                  </button>
                  {utilOpen && (
                    <div className="ml-1 flex flex-col gap-1">
                      <Link
                        href="/util"
                        className={`px-1 py-1 text-xs font-medium transition-colors ${
                          pathname === "/util"
                            ? "text-sky-600 dark:text-sky-400"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t("common.all")}
                      </Link>
                      {utilTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className={`px-1 py-1 text-xs font-medium transition-colors ${
                            pathname === tool.href
                              ? "text-sky-600 dark:text-sky-400"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {t(tool.labelKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
