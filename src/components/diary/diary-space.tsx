"use client";

import { useMemo, useState } from "react";

type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const DIARY_STORAGE_KEY = "diary-entries";

function formatKoreanDate(dateISO: string) {
  return new Date(dateISO).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function readEntries() {
  if (typeof window === "undefined") {
    return [] as DiaryEntry[];
  }

  try {
    const raw = window.localStorage.getItem(DIARY_STORAGE_KEY);
    if (!raw) {
      return [] as DiaryEntry[];
    }

    const parsed = JSON.parse(raw) as DiaryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as DiaryEntry[];
  }
}

export function DiarySpace() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  const canSave = useMemo(() => content.trim().length > 0, [content]);

  const loadEntries = () => {
    const nextEntries = readEntries();
    setEntries(nextEntries);
    setLoaded(true);
  };

  const saveEntry = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || typeof window === "undefined") {
      return;
    }

    const nextEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      title: title.trim() || "제목 없는 일기",
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };

    const nextEntries = [nextEntry, ...readEntries()];
    window.localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(nextEntries));
    setEntries(nextEntries);
    setLoaded(true);
    setTitle("");
    setContent("");
  };

  const clearEntries = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(DIARY_STORAGE_KEY);
    setEntries([]);
    setLoaded(true);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Diary</h1>
        <p className="text-muted-foreground">
          오늘의 생각을 자유롭게 기록해보세요. 저장한 내용은 이 브라우저에 보관됩니다.
        </p>
      </div>

      <section className="border-border bg-background mb-8 rounded-xl border p-5">
        <div className="mb-3">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목 (선택)"
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="오늘의 일기를 적어보세요..."
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring min-h-56 w-full rounded-md border p-3 text-sm leading-relaxed focus:ring-2 focus:outline-none"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveEntry}
            disabled={!canSave}
            className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium disabled:opacity-50"
          >
            저장
          </button>
          <button
            type="button"
            onClick={loadEntries}
            className="border-border text-muted-foreground hover:text-foreground hover:bg-accent rounded-md border px-3 py-1.5 text-sm font-medium"
          >
            불러오기
          </button>
          <button
            type="button"
            onClick={clearEntries}
            className="border-border text-muted-foreground hover:text-foreground hover:bg-accent rounded-md border px-3 py-1.5 text-sm font-medium"
          >
            전체 삭제
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">저장된 일기</h2>
        {!loaded ? (
          <p className="text-muted-foreground text-sm">불러오기를 눌러 기존 일기를 확인하세요.</p>
        ) : entries.length === 0 ? (
          <p className="text-muted-foreground text-sm">저장된 일기가 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <article key={entry.id} className="border-border bg-background rounded-xl border p-4">
                <h3 className="mb-1 text-base font-semibold">{entry.title}</h3>
                <time className="text-muted-foreground mb-3 block text-xs">
                  {formatKoreanDate(entry.createdAt)}
                </time>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{entry.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
