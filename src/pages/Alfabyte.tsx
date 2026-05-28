import { useEffect, useRef, useState } from "react";
import "@/styles/project-pages.css";
import contactScreen from "@/assets/contact.png";
import homeScreen from "@/assets/home.png";
import phoneScreen from "@/assets/phone.png";
import productScreen from "@/assets/product.png";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stat { label: string; value: string; unit?: string }
interface Feature { icon: string; title: string; desc: string }
interface Screenshot { label: string; color: string; image: string }

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: Stat[] = [
  { label: "Smooth User Experience", value: "99%", unit: "%" },
  { label: "Performance Score", value: "90", unit: "/100" },
  
  { label: "Uptime", value: "99.9", unit: "%" },
];

const STACK = [
  { name: "React", color: "#61dafb" },
  { name: "Vite", color: "#ff3e00" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "Node.js", color: "#84cc16" },
  { name: "Framer Motion", color: "#e879f9" },
  { name: "Vercel", color: "#ffffff" },
];

const FEATURES: Feature[] = [
  {
    icon: "⬡",
    title: "Service Catalogue",
    desc: "Dynamic product listings with filter, search, and real-time stock status — built for a high SKU count without performance loss.",
  },
  {
    icon: "◈",
    title: "Contact Funnel",
    desc: "Conversion-optimised inquiry form with validation, auto-routing to the right department, and confirmation email flow.",
  },
  {
    icon: "◉",
    title: "Live Deployment",
    desc: "CI/CD pipeline via Vercel — every push to main ships in under 30 seconds with zero downtime rollbacks.",
  },
  {
    icon: "⬟",
    title: "Responsive Grid",
    desc: "Pixel-perfect across mobile, tablet, and 4K displays. Tested on 14 device profiles before client handoff.",
  },
  {
    icon: "◆",
    title: "Brand System",
    desc: "Custom design language: typography scale, icon set, color tokens, and motion curves delivered alongside the codebase.",
  },
  {
    icon: "⬢",
    title: "SEO Architecture",
    desc: "Semantic HTML, structured data, Open Graph tags, and a sitemap — indexed and ranking within 48 hours of launch.",
  },
];

const SCREENS: Screenshot[] = [
  { label: "Homepage Hero", color: "#1a0a0a", image: homeScreen },
  { label: "Product Catalogue", color: "#0a0a1a", image: productScreen },
  { label: "Contact Page", color: "#0a1a0a", image: contactScreen },
  { label: "Mobile View", color: "#1a0a12", image: phoneScreen },
];

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ stat, animate }: { stat: Stat; animate: boolean }) {
  const numericTarget = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const isDecimal = stat.value.includes(".");
  const rawCount = useCounter(Math.floor(numericTarget * (isDecimal ? 10 : 1)), 1600, animate);
  const display = isDecimal ? (rawCount / 10).toFixed(1) : String(rawCount);

  return (
    <div
      className="pp-stat-card"
      style={{
      background: "rgba(20,4,4,0.7)",
      border: "1px solid rgba(220,38,38,0.2)",
      borderRadius: 12,
      padding: "24px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
      }} />
      <div
        className="pp-stat-value"
        style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {animate ? display : "0"}
        <span style={{ fontSize: 16, color: "#dc2626", marginLeft: 2 }}>{stat.unit}</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase" }}>
        {stat.label}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Alfabyte() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const [scanY, setScanY] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // ── Particle canvas ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ["rgba(220,38,38,", "rgba(239,68,68,", "rgba(185,28,28,"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Grid
      ctx.strokeStyle = "rgba(220,38,38,0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Scan line ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let y = 0;
    const tick = () => {
      y = (y + 0.3) % 100;
      setScanY(y);
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  // ── Stats intersection observer ───────────────────────────────────────────
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Screen cycle ──────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setActiveScreen(s => (s + 1) % SCREENS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="project-page"
      style={{
      minHeight: "100vh",
      background: "#060101",
      color: "#e5e7eb",
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* BG canvas */}
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Scan line */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: 1, zIndex: 1, pointerEvents: "none",
        top: `${scanY}%`,
        background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.15), transparent)",
      }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pp-section">
        <div className="pp-wrap pp-wrap--hero">

          {/* Back + breadcrumb */}
          <div className="pp-breadcrumb">
            <a href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "#dc2626", textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              BACK
            </a>
            <span style={{ color: "#374151", fontFamily: "monospace", fontSize: 12 }}>/</span>
            <span style={{ color: "#4b5563", fontFamily: "monospace", fontSize: 12, letterSpacing: 2 }}>
              PROJECTS / ALFABYTE
            </span>
          </div>

          {/* Header row */}
          <div className="pp-hero-grid">
            <div className="pp-text-break">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  letterSpacing: 4, color: "#dc2626", textTransform: "uppercase",
                }}>CLIENT WORK</span>
                <div style={{ width: 40, height: 1, background: "#dc2626" }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  letterSpacing: 3, color: "#374151",
                }}>02</span>
              </div>

              <h1 style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 800,
                lineHeight: 1,
                margin: 0,
                letterSpacing: -2,
              }}>
                <span style={{ color: "#fff" }}>Alfa</span>
                <span style={{
                  color: "transparent",
                  WebkitTextStroke: "1px #dc2626",
                }}>byte</span>
              </h1>
              <h2 style={{
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: 400,
                color: "#6b7280",
                marginTop: 8,
                letterSpacing: 6,
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Computers
              </h2>

              <p style={{
                marginTop: 28, fontSize: 16, color: "#9ca3af",
                lineHeight: 1.8, maxWidth: 520,
              }}>
                Production website for a real computer retail brand — sleek service catalogue,
                contact funnel, and live deployment. Shipped from design to production in 3 weeks.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
                <a
                  href="https://alfa-byte-computers.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-touch-link"
                  style={{
                    gap: 10,
                    padding: "14px 28px", borderRadius: 10,
                    background: "#dc2626",
                    color: "#fff", fontWeight: 600, fontSize: 14,
                    textDecoration: "none", letterSpacing: 0.5,
                    transition: "all 0.2s",
                    border: "1px solid #dc2626",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#ef4444";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 32px rgba(220,38,38,0.5)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#dc2626";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
                <a
                  href="https://github.com/anish1278/Alfabytecomputers.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-touch-link"
                  style={{
                    gap: 10,
                    padding: "14px 28px", borderRadius: 10,
                    background: "transparent",
                    color: "#e5e7eb", fontWeight: 600, fontSize: 14,
                    textDecoration: "none", letterSpacing: 0.5,
                    border: "1px solid rgba(220,38,38,0.3)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#dc2626";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(220,38,38,0.15)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(220,38,38,0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#e5e7eb";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.931.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Status badge */}
            <div className="pp-status-wrap">
              <div
                className="pp-status-box"
                style={{
                background: "rgba(20,4,4,0.9)",
                border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: 12, padding: "16px 20px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#6b7280", marginBottom: 12 }}>SYSTEM STATUS</div>
                {[
                  { label: "DEPLOYMENT", value: "LIVE", ok: true },
                  { label: "UPTIME", value: "99.9%", ok: true },
                  { label: "BUILD", value: "PASSING", ok: true },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 24, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 11, color: row.ok ? "#22c55e" : "#dc2626", letterSpacing: 1 }}>
                      {row.ok ? "● " : "○ "}{row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── MOCK BROWSER ───────────────────────────────────────────── */}
          <div style={{
            background: "rgba(10,2,2,0.9)",
            border: "1px solid rgba(220,38,38,0.2)",
            borderRadius: 16, overflow: "hidden",
            marginBottom: 80,
            boxShadow: "0 40px 120px rgba(220,38,38,0.08)",
          }}>
            {/* Browser chrome */}
            <div
              className="pp-browser-chrome"
              style={{
              background: "rgba(20,4,4,0.95)",
              borderBottom: "1px solid rgba(220,38,38,0.15)",
              padding: "12px 16px",
            }}>
              <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.8 }} />
                ))}
              </div>
              <div
                className="pp-browser-url"
                style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 6, padding: "5px 12px",
                fontFamily: "monospace", fontSize: 12, color: "#6b7280",
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                alfabyte-computers.vercel.app
              </div>
              <div className="pp-browser-tabs">
                {SCREENS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScreen(i)}
                    style={{
                      padding: "4px 10px", borderRadius: 5,
                      fontFamily: "monospace", fontSize: 10, cursor: "pointer",
                      background: activeScreen === i ? "rgba(220,38,38,0.2)" : "transparent",
                      color: activeScreen === i ? "#dc2626" : "#6b7280",
                      border: activeScreen === i ? "1px solid rgba(220,38,38,0.4)" : "1px solid transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock screen */}
            <div
              className="pp-mock-screen"
              style={{
              background: SCREENS[activeScreen].color,
              transition: "background 0.4s",
            }}>
              {/* Animated grid in mock */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
              {/* PC mockup graphic */}
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <div
                  className="pp-mock-device"
                  style={{
                  background: "rgba(20,4,4,0.8)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: 8,
                  display: "flex", flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(220,38,38,0.12)",
                }}>
                  <img
                    src={SCREENS[activeScreen].image}
                    alt={`${SCREENS[activeScreen].label} from Alfabyte Computers website designed by Anish Jadhav`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 3,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: activeScreen === 3 ? "top center" : "center top",
                    }}
                  />
                  {/* Fake nav */}
                  <div style={{
                    background: "rgba(220,38,38,0.08)",
                    borderBottom: "1px solid rgba(220,38,38,0.2)",
                    padding: "8px 12px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "#dc2626", fontWeight: 700 }}>ALFABYTE</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {["Products", "Services", "Contact"].map(n => (
                        <span key={n} style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280" }}>{n}</span>
                      ))}
                    </div>
                  </div>
                  {/* Fake hero */}
                  <div className="pp-mock-inner-hero" style={{ flex: 1 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ height: 8, background: "rgba(220,38,38,0.4)", borderRadius: 4, marginBottom: 6, width: "80%" }} />
                      <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, marginBottom: 4, width: "60%" }} />
                      <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, width: "70%" }} />
                      <div style={{
                        marginTop: 14, display: "inline-block",
                        padding: "5px 12px",
                        background: "#dc2626", borderRadius: 5,
                        fontFamily: "monospace", fontSize: 9, color: "#fff",
                      }}>SHOP NOW</div>
                    </div>
                    <div
                      className="pp-mock-thumb"
                      style={{
                      background: "rgba(220,38,38,0.08)",
                      border: "1px solid rgba(220,38,38,0.25)",
                      borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 32,
                    }}>🖥</div>
                  </div>
                </div>
                <div style={{
                  marginTop: 8,
                  fontFamily: "monospace", fontSize: 11,
                  color: "#dc2626", letterSpacing: 3,
                  opacity: 0.7,
                }}>{SCREENS[activeScreen].label.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div className="pp-stats-grid">
            {STATS.map(s => <StatCard key={s.label} stat={s} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div style={{ marginBottom: 48 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: 4, color: "#dc2626", marginBottom: 12,
            }}>// FEATURES</div>
            <h2 className="pp-h2-section">
              What was built
            </h2>
          </div>
          <div className="pp-features-grid">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(15,3,3,0.8)",
                  border: "1px solid rgba(220,38,38,0.12)",
                  borderRadius: 12, padding: "28px 24px",
                  position: "relative", overflow: "hidden",
                  transition: "border-color 0.3s, transform 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(220,38,38,0.4)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(220,38,38,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 14, color: "#dc2626" }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#f3f4f6", marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div
            className="pp-stack-panel"
            style={{
            background: "rgba(15,3,3,0.8)",
            border: "1px solid rgba(220,38,38,0.15)",
            borderRadius: 16,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: 4, color: "#dc2626", marginBottom: 8,
            }}>// TECH STACK</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 32px" }}>
              Built with
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {STACK.map(s => (
                <div
                  key={s.name}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 8,
                    border: `1px solid ${s.color}30`,
                    background: `${s.color}08`,
                    color: s.color,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    fontWeight: 500,
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = `${s.color}18`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${s.color}25`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = `${s.color}08`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLE / TIMELINE ──────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div className="pp-meta-grid">
            {[
              { label: "ROLE", value: "Lead Frontend Developer", sub: "Design to production handoff" },
              { label: "TIMELINE", value: "3 Weeks", sub: "Q1 2025 · Client delivery" },
              { label: "TYPE", value: "Client Work", sub: "Real business, live traffic" },
              { label: "STATUS", value: "Live & Deployed", sub: "Vercel · zero downtime" },
            ].map(item => (
              <div key={item.label} className="pp-meta-item" style={{
                background: "rgba(15,3,3,0.7)",
                border: "1px solid rgba(220,38,38,0.12)",
                borderRadius: 12, padding: "24px 28px",
              }}>
                <div className="pp-meta-label" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  letterSpacing: 3, color: "#dc2626", opacity: 0.7,
                }}>{item.label}</div>
                <div style={{ borderLeft: "1px solid rgba(220,38,38,0.2)", paddingLeft: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad--cta">
        <div className="pp-wrap">
          <div
            className="pp-cta-box"
            style={{
            background: "rgba(20,4,4,0.9)",
            border: "1px solid rgba(220,38,38,0.25)",
            borderRadius: 20,
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 200, height: 1,
              background: "linear-gradient(90deg, transparent, #dc2626, transparent)",
            }} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: 4, color: "#dc2626", marginBottom: 16,
            }}>// READY TO SEE IT LIVE?</div>
            <h2 className="pp-cta-h2">
              Alfabyte Computers
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
              Production-grade retail website shipped and serving real customers.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://alfa-byte-computers.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="pp-touch-link"
                style={{
                  gap: 10,
                  padding: "16px 36px", borderRadius: 10,
                  background: "#dc2626", color: "#fff",
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  boxShadow: "0 0 40px rgba(220,38,38,0.3)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#ef4444";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(220,38,38,0.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#dc2626";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(220,38,38,0.3)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Live Site
              </a>
              <a
                href="https://github.com/anish1278/Alfabytecomputers.git"
                target="_blank"
                rel="noopener noreferrer"
                className="pp-touch-link"
                style={{
                  gap: 10,
                  padding: "16px 36px", borderRadius: 10,
                  background: "transparent", color: "#e5e7eb",
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  border: "1px solid rgba(220,38,38,0.35)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#dc2626";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(220,38,38,0.2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(220,38,38,0.35)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.931.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Source
              </a>
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: 200, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.4), transparent)",
            }} />
          </div>
        </div>
      </section>

      {/* ── FOOTER LINE ─────────────────────────────────────────────────────── */}
      <footer style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(220,38,38,0.1)",
        padding: "24px",
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: 3,
        color: "#374151",
      }}>
        [ ALFABYTE.TSX · CLIENT_WORK · 02 ]
      </footer>
    </div>
  );
}
