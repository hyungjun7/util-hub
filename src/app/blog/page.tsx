import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/content";
import { PostCard } from "@/components/blog/post-card";
import { sortPostsByDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Post",
  description: "모든 포스트 목록",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const publishedPosts = sortPostsByDate(posts.filter((post) => post.published));
  const categories = Array.from(new Set(publishedPosts.map((post) => post.category)));
  const filteredPosts = category
    ? publishedPosts.filter((post) => post.category === category)
    : publishedPosts;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Post</h1>
        <p className="text-muted-foreground">총 {filteredPosts.length}개의 포스트</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !category
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground hover:bg-accent/80"
          }`}
        >
          All
        </Link>
        {categories.map((item) => (
          <Link
            key={item}
            href={`/blog?category=${encodeURIComponent(item)}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              category === item
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground hover:bg-accent/80"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="space-y-1">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
      )}
    </div>
  );
}
