"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n-provider";
import { utilTools } from "@/components/layout/util-tools";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-14 md:py-16">
      <section className="gh-surface mb-10 p-6 md:p-8">
        <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
          {t("home.kicker")}
        </p>
        <h1 className="mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {t("home.title")}
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed md:text-lg">
          {t("home.description")}
        </p>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">{t("home.featured")}</h2>
          <Link
            href="/util"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {t("home.browseAll")}
          </Link>
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
      </section>
    </div>
  );
}
