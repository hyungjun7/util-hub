"use client";

import { useI18n } from "@/components/i18n/i18n-provider";
import { localeOptions } from "@/i18n/locales";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="border-border bg-background/60 flex items-center gap-1 rounded-md border p-1">
      {localeOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLocale(option.code)}
          className={`rounded px-2 py-1 text-xs font-medium ${
            locale === option.code
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
