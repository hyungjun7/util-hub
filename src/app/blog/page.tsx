import type { Metadata } from "next";
import { posts } from "@/lib/content";
import { PostCard } from "@/components/blog/post-card";
import { sortPostsByDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "모든 글 목록",
};

export default function BlogPage() {
  const publishedPosts = sortPostsByDate(posts.filter((post) => post.published));

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          총 {publishedPosts.length}개의 글
        </p>
      </div>

      {publishedPosts.length > 0 ? (
        <div className="space-y-1">
          {publishedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
      )}
    </div>
  );
}
