"use client";

import { useI18n } from "@/components/i18n/i18n-provider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-border border-t">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} Util Hub. {t("footer.builtWith")}
        </p>
      </div>
    </footer>
  );
}
