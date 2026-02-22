"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n-provider";
import { utilTools } from "@/components/layout/util-tools";

export function UtilIndex() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-14 md:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{t("util.title")}</h1>
          <p className="text-muted-foreground">{t("util.description")}</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {utilTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="gh-surface group block px-4 py-4 transition-colors"
          >
            <p className="text-muted-foreground mb-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
              {t(tool.tagKey)}
            </p>
            <p className="group-hover:text-foreground mb-1 text-base font-semibold transition-colors">
              {t(tool.labelKey)}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">{t(tool.summaryKey)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
