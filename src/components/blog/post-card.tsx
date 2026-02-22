import Image from "next/image";
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
      className="group hover:bg-accent/60 flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors"
    >
      <div className="flex min-w-0 items-center gap-3">
        {post.cover && (
          <div className="border-border bg-muted/40 relative h-14 w-20 shrink-0 overflow-hidden rounded-md border">
            <Image
              src={post.cover.src}
              alt={post.title}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-muted-foreground mb-0.5 text-xs font-medium">{post.category}</p>
          <span className="group-hover:text-foreground text-foreground line-clamp-2 leading-snug font-medium transition-colors">
            {post.title}
          </span>
        </div>
      </div>
      <time dateTime={post.date} className="text-muted-foreground shrink-0 text-sm tabular-nums">
        {formatDate(post.date)}
      </time>
    </Link>
  );
}
