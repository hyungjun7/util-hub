import Link from "next/link";
import { posts } from "@/lib/content";
import { PostCard } from "@/components/blog/post-card";
import { sortPostsByDate } from "@/lib/utils";

export default function HomePage() {
  const recentPosts = sortPostsByDate(
    posts.filter((post) => post.published)
  ).slice(0, 5);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">안녕하세요 👋</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          개발하면서 배운 것들, 생각한 것들을 기록합니다.
        </p>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">최근 글</h2>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            전체 보기 →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="space-y-1">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
        )}
      </section>
    </div>
  );
}
