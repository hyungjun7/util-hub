import { defineConfig, defineCollection, s } from "velite";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(100),
      description: s.string().max(300),
      category: s.string().max(40).default("General"),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      published: s.boolean().default(true),
      cover: s.image().optional(),
      slug: s.path(),
      body: s.mdx(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark-default",
          keepBackground: true,
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
});
