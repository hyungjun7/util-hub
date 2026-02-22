import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { MDXContent } from "@/components/blog/mdx-content";
import { PostHeader } from "@/components/blog/post-header";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function getPostBySlug(slug: string) {
  return posts.find((post) => post.slugAsParams === slug && post.published);
}

export async function generateStaticParams() {
  return posts.filter((post) => post.published).map((post) => ({ slug: post.slugAsParams }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <PostHeader post={post} />
      <div className="mdx-prose prose prose-neutral mt-10 max-w-none">
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
