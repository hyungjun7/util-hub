"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { navItems } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { utilTools } from "@/components/layout/util-tools";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [utilOpen, setUtilOpen] = useState(pathname.startsWith("/util"));

  return (
    <aside className="border-border bg-background sticky top-0 hidden h-screen border-r md:block">
      <div className="flex h-full w-60 flex-col px-5 py-8">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            {t("brand.name")}
          </Link>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{t("brand.tagline")}</p>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          {navItems.map(({ href, labelKey }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            if (href === "/util") {
              return (
                <div key={href} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setUtilOpen((previous) => !previous)}
                    aria-expanded={utilOpen}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {t(labelKey)}
                  </button>

                  {utilOpen && (
                    <div className="ml-3 flex flex-col gap-1">
                      <Link
                        href="/util"
                        className={`px-2 py-1 text-xs font-medium transition-colors ${
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
                          className={`px-2 py-1 text-xs font-medium transition-colors ${
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
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
