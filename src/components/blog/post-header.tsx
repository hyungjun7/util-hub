import Image from "next/image";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-10">
      {post.cover && (
        <div className="border-border bg-muted/40 relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border">
          <Image
            src={post.cover.src}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
          {post.category}
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl">
        {post.title}
      </h1>
      {post.description && (
        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{post.description}</p>
      )}
      <time dateTime={post.date} className="text-muted-foreground text-sm">
        {formatDate(post.date)}
      </time>
    </header>
  );
}
