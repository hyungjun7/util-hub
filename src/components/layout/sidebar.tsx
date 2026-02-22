"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface SidebarProps {
  categories: string[];
}

export function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [postOpen, setPostOpen] = useState(pathname.startsWith("/blog"));

  return (
    <aside className="border-border bg-background sticky top-0 hidden h-screen border-r md:block">
      <div className="flex h-full w-60 flex-col px-5 py-8">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Post
          </Link>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">기록을 남기는 공간</p>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            if (href === "/blog") {
              return (
                <div key={href} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPostOpen((previous) => !previous)}
                    aria-expanded={postOpen}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {label}
                  </button>

                  {postOpen && (
                    <div className="ml-3 flex flex-col gap-1">
                      <Link
                        href="/blog"
                        className={`px-2 py-1 text-xs font-medium transition-colors ${
                          pathname === "/blog" && !currentCategory
                            ? "text-sky-600 dark:text-sky-400"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        All
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/blog?category=${encodeURIComponent(category)}`}
                          className={`px-2 py-1 text-xs font-medium transition-colors ${
                            pathname === "/blog" && currentCategory === category
                              ? "text-sky-600 dark:text-sky-400"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
