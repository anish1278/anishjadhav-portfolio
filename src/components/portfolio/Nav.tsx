import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#nova", label: "NOVA Lab" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#top"
          className={`flex items-center gap-2 font-mono text-sm tracking-widest transition-all ${
            scrolled ? "glass rounded-full px-4 py-2" : ""
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-neon" />
            <span className="relative h-2 w-2 rounded-full bg-neon" />
          </span>
          <span className="text-neon text-glow-neon">ANISH JADHAV</span>
          <span className="text-muted-foreground">// v2.0</span>
        </a>

        <nav
          className={`hidden items-center gap-1 md:flex ${
            scrolled ? "glass rounded-full px-2 py-1.5" : ""
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-white/5 hover:text-neon"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group relative hidden overflow-hidden rounded-full border border-neon/40 bg-neon/10 px-5 py-2 font-mono text-xs uppercase tracking-wider text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:glow-neon md:inline-flex"
        >
          <span className="relative">Initialize_Contact()</span>
        </a>
      </div>
    </header>
  );
}
