/**
 * Velite 생성 콘텐츠를 re-export하는 모듈
 * Turbopack의 JSON import assertion 제한 우회
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const postsData = require("../../.velite/posts.json") as unknown[];

export type Post = {
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  published: boolean;
  cover?: { src: string; width: number; height: number; blurDataURL: string } | undefined;
  slug: string;
  body: string;
  metadata: { readingTime: number; wordCount: number };
  excerpt: string;
  slugAsParams: string;
};

export const posts = postsData as Post[];
