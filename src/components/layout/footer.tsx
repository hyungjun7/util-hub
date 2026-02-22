export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} Post. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
