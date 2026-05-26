import { useEffect, useRef } from "react";

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl transition-transform"
      style={{
        background:
          "radial-gradient(circle, oklch(0.62 0.25 25 / 0.35) 0%, oklch(0.70 0.18 210 / 0.15) 35%, transparent 70%)",
      }}
    />
  );
}

const particleSymbols = [
  "circle",
  "plus",
  "01",
  "10",
  "</>",
  "[]",
  "{}"
];

export function Particles({ count = 60 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const left = (i * 137.5) % 100;
    const top = (i * 73.3) % 100;
    const size = 2 + ((i * 13) % 6);
    const delay = (i * 0.37) % 6;
    const duration = 10 + ((i * 2.1) % 15);
    const isCyan = i % 3 === 0;
    
    // Choose symbol type based on index
    const symbolIndex = i % particleSymbols.length;
    const symbol = particleSymbols[symbolIndex];

    const shadowColor = isCyan ? "oklch(0.70 0.18 210)" : "oklch(0.62 0.25 25)";
    const colorVal = isCyan ? "oklch(0.70 0.18 210)" : "oklch(0.62 0.25 25)";

    if (symbol === "circle") {
      return (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: colorVal,
            boxShadow: `0 0 ${size * 3}px ${shadowColor}`,
            opacity: 0.4,
            animation: `float-y ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
      );
    }

    if (symbol === "plus") {
      return (
        <span
          key={i}
          className="absolute font-mono pointer-events-none select-none"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            fontSize: `${size + 4}px`,
            color: colorVal,
            textShadow: `0 0 8px ${shadowColor}`,
            opacity: 0.3,
            animation: `float-y ${duration}s ease-in-out ${delay}s infinite`,
          }}
        >
          +
        </span>
      );
    }

    // Code snippets / symbols
    return (
      <span
        key={i}
        className="absolute font-mono pointer-events-none select-none whitespace-nowrap"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          fontSize: `${size + 2}px`,
          color: colorVal,
          textShadow: `0 0 6px ${shadowColor}`,
          opacity: 0.25,
          animation: `float-y ${duration}s ease-in-out ${delay}s infinite`,
        }}
      >
        {symbol}
      </span>
    );
  });

  return <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">{particles}</div>;
}

export function AnimatedGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg animate-grid-pan" />
  );
}
