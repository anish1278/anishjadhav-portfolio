import { useEffect, useRef, useState } from "react";
import "@/styles/project-pages.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stat { label: string; value: string; unit?: string }
interface Feature { icon: string; title: string; desc: string }
interface Experiment {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  desc: string;
  tags: string[];
  accent: string;
  glowColor: string;
  status: string;
  icon: string;
  demoUrl: string;
  githubUrl: string;
  visual: "hand" | "naruto" | "ar";
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: Stat[] = [
  { label: "FPS Realtime", value: "60", unit: "fps" },
  { label: "Hand Landmarks", value: "21", unit: "pts" },
  { label: "Detection Accuracy", value: "94", unit: "%" },
  { label: "Latency", value: "18", unit: "ms" },
];

const STACK = [
  { name: "Python", color: "#facc15" },
  { name: "OpenCV", color: "#22d3ee" },
  { name: "MediaPipe", color: "#a78bfa" },
  { name: "TensorFlow", color: "#f97316" },
  { name: "NumPy", color: "#4ade80" },
  { name: "React", color: "#61dafb" },
  { name: "WebRTC", color: "#e879f9" },
];

const FEATURES: Feature[] = [
  {
    icon: "◈",
    title: "Real-Time Hand Tracking",
    desc: "MediaPipe Hands pipeline detecting 21 3D landmarks per hand at 60fps — works under varied lighting without GPU acceleration.",
  },
  {
    icon: "⬡",
    title: "Gesture Recognition Engine",
    desc: "Custom classifier maps landmark vectors to discrete gestures with a sliding window buffer to eliminate false positives.",
  },
  {
    icon: "◉",
    title: "AR Canvas Overlay",
    desc: "WebGL canvas composited over the live webcam feed — strokes persist per finger, with pressure simulation from Z-depth.",
  },
  {
    icon: "⬟",
    title: "Ability Binding System",
    desc: "Each Naruto hand seal maps to a specific chakra ability — Rasengan, Chidori, Shadow Clone — triggered by pose sequence.",
  },
  {
    icon: "◆",
    title: "Zero-Latency Pipeline",
    desc: "Frame processing stays under 18ms using async inference, keeping the camera feed smooth while model runs in parallel.",
  },
  {
    icon: "⬢",
    title: "Browser Native",
    desc: "Runs entirely in-browser via WASM + WebRTC. No backend, no install, no camera data ever leaves the device.",
  },
];

const EXPERIMENTS: Experiment[] = [
  {
    id: "ar-draw",
    number: "EXP · 01",
    name: "AR Drawing",
    subtitle: "With Fingers",
    desc: "Draw in augmented reality using only your index finger as a brush. Pinch to change color, spread to erase — no stylus, no screen touch.",
    tags: ["MediaPipe", "OpenCV", "WebGL", "WebRTC", "Pressure Simulation"],
    accent: "#22d3ee",
    glowColor: "rgba(34,211,238,",
    status: "LIVE",
    icon: "✦",
    demoUrl: "https://anish1278.github.io/AirDraw-AI/",
    githubUrl: "https://github.com/anish1278/AirDraw-AI.git",
    visual: "ar",
  },
  {
    id: "naruto",
    number: "EXP · 02",
    name: "Naruto Abilities",
    subtitle: "In Your Hands",
    desc: "Form real Naruto hand seals and watch chakra abilities activate in real-time AR. Ox → Ram → Monkey → Boar → Horse → Tiger = Fireball Jutsu.",
    tags: ["TensorFlow", "MediaPipe", "Pose Classification", "Canvas API"],
    accent: "#f97316",
    glowColor: "rgba(249,115,22,",
    status: "LIVE",
    icon: "◈",
    demoUrl: "https://anish1278.github.io/Naruto-fun/",
    githubUrl: "https://github.com/anish1278/Naruto-fun.git",
    visual: "naruto",
  },
  {
    id: "gesture-os",
    number: "EXP · 03",
    name: "Gesture OS",
    subtitle: "Hands-Free UI",
    desc: "Navigate a minimal OS-like interface using only hand gestures — open apps, drag windows, dismiss notifications. Zero touch required.",
    tags: ["MediaPipe", "React", "Framer Motion", "WebRTC"],
    accent: "#a78bfa",
    glowColor: "rgba(167,139,250,",
    status: "IN DEV",
    icon: "⬢",
    demoUrl: "#",
    githubUrl: "https://github.com/you/gesture-os",
    visual: "hand",
  },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, animate }: { stat: Stat; animate: boolean }) {
  const num = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const isDecimal = stat.value.includes(".");
  const raw = useCounter(Math.floor(num * (isDecimal ? 10 : 1)), 1600, animate);
  const display = isDecimal ? (raw / 10).toFixed(1) : String(raw);
  return (
    <div style={{
      background: "rgba(4,4,20,0.7)",
      border: "1px solid rgba(139,92,246,0.2)",
      borderRadius: 12, padding: "24px 20px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #8b5cf6, #22d3ee, transparent)",
      }} />
      <div
        className="pp-stat-value"
        style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 6,
      }}>
        {animate ? display : "0"}
        <span style={{ fontSize: 16, color: "#8b5cf6", marginLeft: 2 }}>{stat.unit}</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase" }}>
        {stat.label}
      </div>
    </div>
  );
}

// ─── Hand SVG visual for experiment cards ────────────────────────────────────
function HandVisual({ type, accent }: { type: "hand" | "naruto" | "ar"; accent: string }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  const pulse = 0.5 + 0.5 * Math.sin(tick * 0.08);
  const pulse2 = 0.5 + 0.5 * Math.sin(tick * 0.05 + 1);

  return (
    <svg viewBox="0 0 200 160" style={{ width: "100%", height: "100%" }}>
      {/* Background grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 18} x2="200" y2={i * 18}
          stroke={accent} strokeWidth="0.3" opacity="0.15" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 18} y1="0" x2={i * 18} y2="160"
          stroke={accent} strokeWidth="0.3" opacity="0.15" />
      ))}

      {type === "ar" && (
        <g>
          {/* Hand outline */}
          <path d="M80,130 L80,80 M80,80 L80,45 M88,80 L88,38 M96,80 L96,40 M104,80 L104,44 M112,80 L112,60 M80,80 C75,78 68,75 65,80 L65,120 C65,128 75,132 80,130 Z"
            stroke={accent} strokeWidth="1.5" fill="none" opacity="0.9" strokeLinecap="round" />
          {/* Finger joints */}
          {[[80,60],[80,72],[88,55],[88,68],[96,57],[96,70],[104,60],[104,72],[112,70]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2" fill={accent} opacity="0.6" />
          ))}
          {/* AR trail */}
          <path d={`M${50 + tick % 80},${80 - Math.sin(tick*0.1)*20} Q${70 + tick%40},${60 - pulse*15} ${90 + tick%30},${70 - pulse2*10}`}
            stroke={accent} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
          <circle cx={90 + tick%30} cy={70 - pulse2*10} r={3 + pulse*2} fill={accent} opacity="0.9" />
          {/* Glow rings */}
          <circle cx="88" cy="38" r={6 + pulse * 4} stroke={accent} strokeWidth="1" fill="none" opacity={0.3 + pulse * 0.3} />
        </g>
      )}

      {type === "naruto" && (
        <g>
          {/* Hand seal pose */}
          <path d="M70,130 L70,90 L70,60 M70,60 L85,45 M85,45 L100,50 M100,50 L110,40 M110,40 L120,50 M120,50 L125,70 M125,70 L120,90 L120,130"
            stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M70,90 L120,90" stroke={accent} strokeWidth="1" opacity="0.5" />
          {/* Chakra orb */}
          <circle cx="100" cy="75" r={12 + pulse * 6} stroke={accent} strokeWidth="1.5"
            fill="none" opacity={0.4 + pulse * 0.3} />
          <circle cx="100" cy="75" r={6 + pulse * 3} fill={accent} opacity={0.2 + pulse * 0.2} />
          <circle cx="100" cy="75" r="3" fill={accent} opacity="0.9" />
          {/* Energy sparks */}
          {[0,45,90,135,180,225,270,315].map((deg, i) => {
            const r = 20 + pulse * 8;
            const x = 100 + r * Math.cos((deg + tick * 2) * Math.PI / 180);
            const y = 75 + r * Math.sin((deg + tick * 2) * Math.PI / 180);
            return <circle key={i} cx={x} cy={y} r="1.5" fill={accent} opacity={0.5 + pulse * 0.4} />;
          })}
          {/* Kanji-like marks */}
          <text x="96" y="128" fontFamily="monospace" fontSize="9" fill={accent} opacity="0.5">手印</text>
        </g>
      )}

      {type === "hand" && (
        <g>
          {/* Open hand */}
          <path d="M85,130 L85,85 L85,50 M93,85 L93,42 M101,85 L101,44 M109,85 L109,50 M117,85 L117,68"
            stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M85,85 C80,83 72,80 70,85 L70,118 C70,126 80,130 85,128 Z"
            stroke={accent} strokeWidth="1" fill="none" opacity="0.6" />
          {/* UI hover elements */}
          <rect x="130" y="35" width="50" height="20" rx="4" stroke={accent} strokeWidth="1"
            fill={`${accent}10`} opacity={0.5 + pulse * 0.4} />
          <rect x="130" y="62" width="38" height="14" rx="4" stroke={accent} strokeWidth="1"
            fill={`${accent}08`} opacity={0.4 + pulse2 * 0.3} />
          <rect x="130" y="83" width="44" height="14" rx="4" stroke={accent} strokeWidth="1"
            fill={`${accent}08`} opacity={0.3 + pulse * 0.3} />
          {/* Pointer line from fingertip */}
          <line x1="85" y1="50" x2="130" y2="45" stroke={accent} strokeWidth="1"
            strokeDasharray="3,3" opacity={0.4 + pulse * 0.3} />
          <circle cx="85" cy="50" r={3 + pulse * 2} fill={accent} opacity="0.8" />
        </g>
      )}

      {/* Corner brackets */}
      <path d="M5,5 L5,18 M5,5 L18,5" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <path d="M195,5 L195,18 M195,5 L182,5" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <path d="M5,155 L5,142 M5,155 L18,155" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <path d="M195,155 L195,142 M195,155 L182,155" stroke={accent} strokeWidth="1.5" opacity="0.5" />

      {/* Landmark dots */}
      {type !== "gesture-os" && Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx={30 + i * 8} cy={148} r="1.5" fill={accent}
          opacity={tick % 5 === i ? 0.9 : 0.25} />
      ))}
    </svg>
  );
}

// ─── Experiment Card ──────────────────────────────────────────────────────────
function ExperimentCard({ exp }: { exp: Experiment }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(6,4,20,0.85)",
        border: `1px solid ${hovered ? exp.accent + "60" : exp.accent + "20"}`,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${exp.glowColor}0.12)` : "none",
        cursor: "default",
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${exp.accent}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.3s",
      }} />

      {/* Corner decoration */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        width: 10, height: 10,
        borderTop: `1px solid ${exp.accent}80`,
        borderRight: `1px solid ${exp.accent}80`,
        borderRadius: "0 4px 0 0",
      }} />
      <div style={{
        position: "absolute", bottom: 14, left: 14,
        width: 10, height: 10,
        borderBottom: `1px solid ${exp.accent}50`,
        borderLeft: `1px solid ${exp.accent}50`,
        borderRadius: "0 0 0 4px",
      }} />

      {/* Visual area */}
      <div
        className="pp-exp-card-visual"
        style={{
        background: `radial-gradient(ellipse at 50% 50%, ${exp.glowColor}0.08) 0%, transparent 70%), #060410`,
        borderBottom: `1px solid ${exp.accent}15`,
        padding: "16px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Animated dots bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${exp.accent}20 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: hovered ? 0.6 : 0.3,
          transition: "opacity 0.3s",
        }} />
        <HandVisual type={exp.visual} accent={exp.accent} />
        {/* Status badge */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          padding: "4px 10px",
          borderRadius: 20,
          background: exp.status === "LIVE" ? "rgba(34,197,94,0.1)" : "rgba(249,115,22,0.1)",
          border: `1px solid ${exp.status === "LIVE" ? "rgba(34,197,94,0.3)" : "rgba(249,115,22,0.3)"}`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: 2,
          color: exp.status === "LIVE" ? "#22c55e" : "#f97316",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: exp.status === "LIVE" ? "#22c55e" : "#f97316",
            animation: "pulse-dot 1.5s infinite",
          }} />
          {exp.status}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 28px" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: 3,
          color: exp.accent, marginBottom: 8, opacity: 0.7,
        }}>{exp.number}</div>

        <h3 className="pp-text-break" style={{ fontSize: "clamp(1.125rem, 4vw, 1.375rem)", fontWeight: 800, color: "#fff", margin: "0 0 2px", letterSpacing: -0.5 }}>
          {exp.name}
        </h3>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, letterSpacing: 3,
          color: "#6b7280", marginBottom: 14,
          textTransform: "uppercase",
        }}>{exp.subtitle}</div>

        <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, marginBottom: 20 }}>
          {exp.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {exp.tags.map(t => (
            <span key={t} style={{
              padding: "4px 10px", borderRadius: 6,
              background: `${exp.accent}0d`,
              border: `1px solid ${exp.accent}25`,
              color: exp.accent,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: 1,
            }}>{t}</span>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, ${exp.accent}25, transparent)`,
          marginBottom: 20,
        }} />

        {/* Buttons */}
        <div className="pp-exp-buttons">
          <a
            href={exp.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-touch-link"
            style={{
              flex: 1,
              gap: 8,
              padding: "11px 16px", borderRadius: 9,
              background: `${exp.accent}15`,
              border: `1px solid ${exp.accent}35`,
              color: exp.accent,
              fontWeight: 600, fontSize: 13,
              textDecoration: "none",
              transition: "all 0.2s",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = `${exp.accent}25`;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px ${exp.glowColor}0.2)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = `${exp.accent}15`;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
          <a
            href={exp.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-touch-link"
            style={{
              flex: 1,
              gap: 8,
              padding: "11px 16px", borderRadius: 9,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
              fontWeight: 600, fontSize: 13,
              textDecoration: "none",
              transition: "all 0.2s",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.931.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIVision() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [scanY, setScanY] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // ── Particle canvas ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ["rgba(139,92,246,", "rgba(34,211,238,", "rgba(167,139,250,"];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(139,92,246,0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")"; ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  // ── Scan line ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let y = 0;
    const tick = () => { y = (y + 0.25) % 100; setScanY(y); requestAnimationFrame(tick); };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  // ── Stats observer ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="project-page"
      style={{
      minHeight: "100vh",
      background: "#04020f",
      color: "#e5e7eb",
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes float-up { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:0.5} 100%{transform:translateY(-80px);opacity:0} }
      `}</style>

      {/* BG canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />

      {/* Scan line — cyan/purple tint */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: 1, zIndex: 1, pointerEvents: "none",
        top: `${scanY}%`,
        background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), rgba(34,211,238,0.15), transparent)",
      }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="pp-section">
        <div className="pp-wrap pp-wrap--hero">

          {/* Back + breadcrumb */}
          <div className="pp-breadcrumb">
            <a href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "#8b5cf6", textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 2,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              BACK
            </a>
            <span style={{ color: "#374151", fontFamily: "monospace", fontSize: 12 }}>/</span>
            <span style={{ color: "#4b5563", fontFamily: "monospace", fontSize: 12, letterSpacing: 2 }}>
              PROJECTS / AI-VISION
            </span>
          </div>

          {/* Header row */}
          <div className="pp-hero-grid" style={{ marginBottom: "2.5rem" }}>
            <div className="pp-text-break">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#8b5cf6" }}>
                  AI / COMPUTER VISION
                </span>
                <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #8b5cf6, #22d3ee)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#374151" }}>04</span>
              </div>

              <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800, lineHeight: 1, margin: 0, letterSpacing: -2 }}>
                <span style={{ color: "#fff" }}>AI </span>
                <span style={{ color: "transparent", WebkitTextStroke: "1px #8b5cf6" }}>Vision</span>
              </h1>
              <h2 style={{
                fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 400, color: "#6b7280",
                marginTop: 8, letterSpacing: 6, textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Experiments
              </h2>

              <p style={{ marginTop: 28, fontSize: 16, color: "#9ca3af", lineHeight: 1.8, maxWidth: 540 }}>
                A collection of real-time computer vision experiments built with MediaPipe and OpenCV —
                from AR finger painting to Naruto hand seals that trigger chakra effects in live camera.
              </p>

            </div>

            {/* System status */}
            <div className="pp-status-wrap">
              <div
                className="pp-status-box"
                style={{
                background: "rgba(4,2,20,0.9)",
                border: "1px solid rgba(139,92,246,0.25)",
                borderRadius: 12, padding: "16px 20px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#6b7280", marginBottom: 12 }}>SYSTEM STATUS</div>
                {[
                  { label: "CAMERA FEED", value: "ACTIVE", ok: true },
                  { label: "INFERENCE", value: "RUNNING", ok: true },
                  { label: "FPS TARGET", value: "60fps", ok: true },
                  { label: "MODEL", value: "LOADED", ok: true },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 24, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 11, color: "#22c55e", letterSpacing: 1 }}>● {row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── EXPERIMENT CARDS ─────────────────────────────────────────── */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#8b5cf6", marginBottom: 12 }}>
              // EXPERIMENTS
            </div>
            <h2 className="pp-h2-section" style={{ margin: "0 0 2rem" }}>
              What was built
            </h2>
          </div>
          <div className="pp-experiments-grid">
            {EXPERIMENTS.map(exp => <ExperimentCard key={exp.id} exp={exp} />)}
          </div>

        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div className="pp-stats-grid">
            {STATS.map(s => <StatCard key={s.label} stat={s} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#8b5cf6", marginBottom: 12 }}>
              // PIPELINE
            </div>
            <h2 className="pp-h2-section">How it works</h2>
          </div>
          {/* Pipeline steps */}
          <div className="pp-pipeline-grid">
            {/* connector line */}
            <div
              className="pp-pipeline-line"
              style={{
              position: "absolute", top: 28, left: "12.5%", right: "12.5%", height: 1,
              background: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
              opacity: 0.3, zIndex: 0,
            }}
            />
            {[
              { step: "01", title: "Webcam Input", desc: "Raw RGB frames captured at 60fps via WebRTC getUserMedia", color: "#8b5cf6" },
              { step: "02", title: "MediaPipe", desc: "21 3D hand landmarks extracted per frame using ML pipeline", color: "#a78bfa" },
              { step: "03", title: "Classifier", desc: "Landmark vectors mapped to gesture labels with sliding window", color: "#22d3ee" },
              { step: "04", title: "AR Render", desc: "WebGL canvas composited over live feed in real-time", color: "#34d399" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "0 16px", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 700, color: item.color,
                }}>{item.step}</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f3f4f6", marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#8b5cf6", marginBottom: 12 }}>
              // FEATURES
            </div>
            <h2 className="pp-h2-section">Core capabilities</h2>
          </div>
          <div className="pp-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i}
                style={{
                  background: "rgba(6,4,20,0.8)",
                  border: "1px solid rgba(139,92,246,0.12)",
                  borderRadius: 12, padding: "28px 24px",
                  transition: "border-color 0.3s, transform 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.4)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 14, color: "#8b5cf6" }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#f3f4f6", marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ─────────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div
            className="pp-stack-panel"
            style={{
            background: "rgba(6,4,20,0.8)",
            border: "1px solid rgba(139,92,246,0.15)",
            borderRadius: 16,
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#8b5cf6", marginBottom: 8 }}>
              // TECH STACK
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 32px" }}>Built with</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {STACK.map(s => (
                <div key={s.name}
                  style={{
                    padding: "10px 18px", borderRadius: 8,
                    border: `1px solid ${s.color}30`, background: `${s.color}08`,
                    color: s.color, fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13, fontWeight: 500, transition: "all 0.2s", cursor: "default",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = `${s.color}18`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${s.color}25`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = `${s.color}08`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >{s.name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLE / TIMELINE ────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div className="pp-meta-grid">
            {[
              { label: "ROLE", value: "Solo Builder", sub: "Research, design, code & deploy" },
              { label: "TIMELINE", value: "Ongoing", sub: "Personal experiments · 2024–25" },
              { label: "TYPE", value: "AI / CV Research", sub: "Computer vision + AR fusion" },
              { label: "STATUS", value: "Live & Active", sub: "3 experiments shipped" },
            ].map(item => (
              <div key={item.label} className="pp-meta-item" style={{
                background: "rgba(6,4,20,0.7)",
                border: "1px solid rgba(139,92,246,0.12)",
                borderRadius: 12, padding: "24px 28px",
              }}>
                <div className="pp-meta-label" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  letterSpacing: 3, color: "#8b5cf6", opacity: 0.7,
                }}>{item.label}</div>
                <div style={{ borderLeft: "1px solid rgba(139,92,246,0.2)", paddingLeft: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────────── */}
      <section className="pp-section pp-section-pad--cta">
        <div className="pp-wrap">
          <div
            className="pp-cta-box"
            style={{
            background: "rgba(6,4,20,0.9)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 20,
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 200, height: 1,
              background: "linear-gradient(90deg, transparent, #8b5cf6, #22d3ee, transparent)",
            }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#8b5cf6", marginBottom: 16 }}>
              // TRY IT YOURSELF
            </div>
            <h2 className="pp-cta-h2">
              AI Vision Experiments
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
              Open your camera and draw with your finger, cast jutsu with your hands — all in real-time.
            </p>
            {false && <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://your-aivision-demo.com" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "16px 36px", borderRadius: 10,
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none",
                  boxShadow: "0 0 40px rgba(139,92,246,0.3)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(139,92,246,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(139,92,246,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Launch Experiments
              </a>
              <a href="https://github.com/you/ai-vision" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "16px 36px", borderRadius: 10,
                  background: "transparent", color: "#e5e7eb",
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  border: "1px solid rgba(139,92,246,0.35)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#8b5cf6";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(139,92,246,0.2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,92,246,0.35)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.931.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Source
              </a>
            </div>}
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: 200, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)",
            }} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(139,92,246,0.1)",
        padding: "24px", textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: 3, color: "#374151",
      }}>
        [ AIVISION.TSX · AI_EXPERIMENTS · 04 ]
      </footer>
    </div>
  );
}
