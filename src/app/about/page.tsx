import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "저에 대해 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">About</h1>
      <div className="prose prose-neutral max-w-none">
        <p>안녕하세요. 이 블로그는 개발과 생각을 기록하는 공간입니다.</p>
        <p>이 섹션을 자유롭게 수정해주세요.</p>
      </div>
    </div>
  );
}
