export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div>© 2026 Anish Abhijeet Jadhav · All systems operational</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon glow-neon" />
          <span className="text-neon">Built with NOVA</span>
        </div>
      </div>
    </footer>
  );
}
