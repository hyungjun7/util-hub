"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";

type DiffType = "same" | "add" | "remove";

interface DiffLine {
  type: DiffType;
  content: string;
}

function computeDiffLines(beforeText: string, afterText: string): DiffLine[] {
  const before = beforeText.split("\n");
  const after = afterText.split("\n");
  const rows = before.length;
  const cols = after.length;

  const lcs = Array.from({ length: rows + 1 }, () => Array<number>(cols + 1).fill(0));

  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = cols - 1; j >= 0; j -= 1) {
      if (before[i] === after[j]) {
        lcs[i][j] = lcs[i + 1][j + 1] + 1;
      } else {
        lcs[i][j] = Math.max(lcs[i + 1][j], lcs[i][j + 1]);
      }
    }
  }

  const diff: DiffLine[] = [];
  let i = 0;
  let j = 0;

  while (i < rows && j < cols) {
    if (before[i] === after[j]) {
      diff.push({ type: "same", content: before[i] });
      i += 1;
      j += 1;
      continue;
    }

    if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      diff.push({ type: "remove", content: before[i] });
      i += 1;
    } else {
      diff.push({ type: "add", content: after[j] });
      j += 1;
    }
  }

  while (i < rows) {
    diff.push({ type: "remove", content: before[i] });
    i += 1;
  }

  while (j < cols) {
    diff.push({ type: "add", content: after[j] });
    j += 1;
  }

  return diff;
}

function linePrefix(type: DiffType) {
  if (type === "add") {
    return "+";
  }

  if (type === "remove") {
    return "-";
  }

  return " ";
}

export function StringDiffTool() {
  const { t } = useI18n();
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");

  const diffLines = useMemo(() => computeDiffLines(before, after), [before, after]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="gh-surface mb-8 p-6 md:p-7">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">{t("diff.title")}</h1>
        <p className="text-muted-foreground">{t("diff.description")}</p>
      </div>

      <div className="gh-surface mb-6 grid gap-4 p-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">{t("diff.before")}</span>
          <textarea
            value={before}
            onChange={(event) => setBefore(event.target.value)}
            className="border-border bg-background text-foreground mt-2 min-h-56 w-full rounded-lg border p-3 text-sm leading-relaxed"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">{t("diff.after")}</span>
          <textarea
            value={after}
            onChange={(event) => setAfter(event.target.value)}
            className="border-border bg-background text-foreground mt-2 min-h-56 w-full rounded-lg border p-3 text-sm leading-relaxed"
          />
        </label>
      </div>

      <section className="gh-surface overflow-hidden">
        <div className="border-border bg-muted/30 text-muted-foreground border-b px-4 py-2 text-xs font-semibold tracking-wide uppercase">
          {t("diff.result")}
        </div>
        <pre className="overflow-x-auto p-0 text-sm leading-6">
          {diffLines.map((line, index) => (
            <div
              key={`${line.type}-${index}-${line.content}`}
              className={`px-4 font-mono ${
                line.type === "add"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : line.type === "remove"
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-foreground"
              }`}
            >
              {linePrefix(line.type)} {line.content || " "}
            </div>
          ))}
        </pre>
      </section>
    </div>
  );
}
