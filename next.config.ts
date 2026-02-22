import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const basePath = isGitHubActions && !isUserOrOrgPage ? `/${repositoryName}` : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Turbopack 설정 (Next.js 16 기본값)
  // Velite는 빌드 스크립트에서 별도 실행
  turbopack: {},
  ...(isGitHubActions
    ? {
        output: "export",
        images: {
          unoptimized: true,
        },
        trailingSlash: true,
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "Content-Security-Policy", value: contentSecurityPolicy },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
