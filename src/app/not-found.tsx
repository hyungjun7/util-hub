import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="text-muted-foreground mb-8 text-lg">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="bg-foreground text-background rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
