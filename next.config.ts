import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack 설정 (Next.js 16 기본값)
  // Velite는 빌드 스크립트에서 별도 실행
  turbopack: {},
};

export default nextConfig;
