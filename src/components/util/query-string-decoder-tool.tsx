"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";

function extractQueryString(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.includes("?")) {
    const afterQuestion = trimmed.split("?")[1] ?? "";
    return afterQuestion.split("#")[0] ?? "";
  }

  if (trimmed.startsWith("#")) {
    return "";
  }

  return trimmed.startsWith("&") ? trimmed.slice(1) : trimmed;
}

function decodeQueryToJson(input: string) {
  const query = extractQueryString(input);
  const params = new URLSearchParams(query);
  const result: Record<string, string | string[]> = {};

  for (const [key, value] of params.entries()) {
    const current = result[key];

    if (typeof current === "undefined") {
      result[key] = value;
      continue;
    }

    if (Array.isArray(current)) {
      current.push(value);
      continue;
    }

    result[key] = [current, value];
  }

  return JSON.stringify(result, null, 2);
}

export function QueryStringDecoderTool() {
  const { t } = useI18n();
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (input.trim().length === 0) {
      return "";
    }

    return decodeQueryToJson(input);
  }, [input]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="gh-surface mb-8 p-6 md:p-7">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">{t("query.title")}</h1>
        <p className="text-muted-foreground">{t("query.description")}</p>
      </div>

      <div className="gh-surface grid gap-4 p-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">{t("query.input")}</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t("query.inputPlaceholder")}
            className="border-border bg-background text-foreground mt-2 min-h-64 w-full rounded-lg border p-3 font-mono text-sm leading-relaxed"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">{t("query.output")}</span>
          <textarea
            value={output}
            readOnly
            placeholder={t("query.outputPlaceholder")}
            className="border-border bg-background text-foreground mt-2 min-h-64 w-full rounded-lg border p-3 font-mono text-sm leading-relaxed"
          />
        </label>
      </div>
    </div>
  );
}
