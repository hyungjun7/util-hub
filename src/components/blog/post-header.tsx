import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-10">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
        {post.title}
      </h1>
      {post.description && (
        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
          {post.description}
        </p>
      )}
      <time
        dateTime={post.date}
        className="text-muted-foreground text-sm"
      >
        {formatDate(post.date)}
      </time>
    </header>
  );
}
