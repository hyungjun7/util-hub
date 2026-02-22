"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";

type IndentStyle = "spaces" | "tabs";

function formatJson(
  source: string,
  indentStyle: IndentStyle,
  indentSize: number,
  tabSize: number,
  sortKeys: boolean
) {
  const parsed = JSON.parse(source) as unknown;

  const replacer: ((this: unknown, key: string, value: unknown) => unknown) | undefined = sortKeys
    ? function replacerFn(_key: string, value: unknown) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          const keys = Object.keys(value as Record<string, unknown>).sort();
          const sorted: Record<string, unknown> = {};

          for (const key of keys) {
            sorted[key] = (value as Record<string, unknown>)[key];
          }

          return sorted;
        }

        return value;
      }
    : undefined;

  const indent = indentStyle === "tabs" ? "\t".repeat(tabSize) : " ".repeat(indentSize);
  return JSON.stringify(parsed, replacer, indent);
}

export function JsonFormatterTool() {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [indentStyle, setIndentStyle] = useState<IndentStyle>("spaces");
  const [indentSize, setIndentSize] = useState(2);
  const [tabSize, setTabSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [inputScrollTop, setInputScrollTop] = useState(0);
  const [outputScrollTop, setOutputScrollTop] = useState(0);

  const inputLines = useMemo(() => Math.max(input.split("\n").length, 1), [input]);
  const { output, error } = useMemo(() => {
    if (input.trim().length === 0) {
      return { output: "", error: "" };
    }

    try {
      return {
        output: formatJson(input, indentStyle, indentSize, tabSize, sortKeys),
        error: "",
      };
    } catch (cause) {
      return {
        output: "",
        error: cause instanceof Error ? cause.message : t("json.invalid"),
      };
    }
  }, [indentSize, indentStyle, input, sortKeys, t, tabSize]);
  const outputLineCount = useMemo(() => Math.max(output.split("\n").length, 1), [output]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="gh-surface mb-8 p-6 md:p-7">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">{t("json.title")}</h1>
        <p className="text-muted-foreground">{t("json.description")}</p>
      </div>

      <div className="gh-surface mb-4 flex flex-wrap items-center gap-3 p-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{t("json.indent")}</span>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="indent-style"
              checked={indentStyle === "spaces"}
              onChange={() => setIndentStyle("spaces")}
            />
            {t("json.spaces")}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="indent-style"
              checked={indentStyle === "tabs"}
              onChange={() => setIndentStyle("tabs")}
            />
            {t("json.tabs")}
          </label>
        </div>

        {indentStyle === "spaces" ? (
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium">{t("json.spaceSize")}</span>
            <select
              value={indentSize}
              onChange={(event) => setIndentSize(Number(event.target.value))}
              className="bg-background border-border rounded-md border px-2 py-1"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </label>
        ) : (
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium">{t("json.tabSize")}</span>
            <select
              value={tabSize}
              onChange={(event) => setTabSize(Number(event.target.value))}
              className="bg-background border-border rounded-md border px-2 py-1"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </label>
        )}

        <label className="ml-auto flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(event) => setSortKeys(event.target.checked)}
          />
          {t("json.sortKeys")}
        </label>
      </div>

      <div className="gh-surface mb-4 grid gap-4 p-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">{t("json.input")}</span>
          <div
            style={indentStyle === "tabs" ? { tabSize } : undefined}
            className="border-border bg-background text-foreground mt-2 min-h-64 w-full overflow-hidden rounded-lg border font-mono text-sm leading-relaxed"
          >
            <div className="grid grid-cols-[3rem_1fr]">
              <div className="border-border bg-muted/40 text-muted-foreground border-r px-2 py-2 text-right select-none">
                <div style={{ transform: `translateY(-${inputScrollTop}px)` }}>
                  {Array.from({ length: inputLines }, (_, index) => (
                    <div key={`input-line-${index}`} className="py-0.5">
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onScroll={(event) => setInputScrollTop(event.currentTarget.scrollTop)}
                placeholder='{"name":"util","meta":{"b":2,"a":1}}'
                className="text-foreground min-h-64 w-full resize-y px-3 py-2 focus:outline-none"
              />
            </div>
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold">{t("json.output")}</span>
          <div
            style={indentStyle === "tabs" ? { tabSize } : undefined}
            className="border-border bg-background text-foreground mt-2 min-h-64 w-full overflow-hidden rounded-lg border font-mono text-sm leading-relaxed"
          >
            <div className="grid grid-cols-[3rem_1fr]">
              <div className="border-border bg-muted/40 text-muted-foreground border-r px-2 py-2 text-right select-none">
                <div style={{ transform: `translateY(-${outputScrollTop}px)` }}>
                  {Array.from({ length: outputLineCount }, (_, index) => (
                    <div key={`output-line-${index}`} className="py-0.5">
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                onScroll={(event) => setOutputScrollTop(event.currentTarget.scrollTop)}
                placeholder={error || t("json.placeholder")}
                className={`min-h-64 w-full resize-y px-3 py-2 focus:outline-none ${
                  error ? "text-rose-600 dark:text-rose-400" : "text-foreground"
                }`}
              />
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
