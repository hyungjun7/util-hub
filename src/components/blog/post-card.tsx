import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slugAsParams}`}
      className="group flex items-baseline justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-neutral-50"
    >
      <span className="group-hover:text-foreground text-foreground font-medium leading-snug transition-colors">
        {post.title}
      </span>
      <time
        dateTime={post.date}
        className="text-muted-foreground shrink-0 text-sm tabular-nums"
      >
        {formatDate(post.date)}
      </time>
    </Link>
  );
}
