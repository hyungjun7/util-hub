"use client";

import { useEffect, useMemo, useState } from "react";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

const THEME_STORAGE_KEY = "theme-preference";

function resolveSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemePreference) {
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
    return;
  }

  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      const initialTheme: ThemePreference =
        storedTheme === "light" || storedTheme === "dark" ? storedTheme : "system";

      setTheme(initialTheme);
      setSystemTheme(resolveSystemTheme());
      applyTheme(initialTheme);
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (theme === "system") {
      return systemTheme;
    }

    return theme;
  }, [theme, systemTheme]);

  const toggleTheme = () => {
    const nextTheme: ThemePreference = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={toggleTheme}
        disabled={!mounted}
        className="border-border text-muted-foreground hover:text-foreground hover:bg-accent rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      >
        {resolvedTheme === "dark" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
