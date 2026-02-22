"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "theme-preference";

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      const initialTheme: ThemeMode = stored === "dark" ? "dark" : "light";
      setTheme(initialTheme);
      applyTheme(initialTheme);
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectTheme = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className="border-border bg-background/60 flex items-center gap-1 rounded-md border p-1">
      {(["light", "dark"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => selectTheme(mode)}
          disabled={!mounted}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            theme === mode
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground"
          } disabled:opacity-60`}
        >
          {mode === "light" ? t("theme.light") : t("theme.dark")}
        </button>
      ))}
    </div>
  );
}
