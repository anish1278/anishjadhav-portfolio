import { useEffect, useRef, useState } from "react";
import "@/styles/project-pages.css";

// ─── WIRE YOUR PHOTOS HERE ────────────────────────────────────────────────────
// 1. Create folder: src/assets/smartcar/
// 2. Copy files with these exact names:
//    photo1.jpeg  ← IMG-20260408-WA0025  (prototype table + radar)
//    photo2.jpeg  ← IMG-20260408-WA0031  (you presenting to crowd)
//    photo3.jpeg  ← IMG-20260408-WA0032  (crowd close-up)
//    photo4.jpeg  ← IMG-20260408-WA0035  (judges at science fair entrance)
//    photo5.jpeg  ← 20260526_110214      (trophy)
//    diagram1.png ← ChatGPT_Image        (system architecture)
//    diagram2.png ← Gemini_Generated     (driver protection map)
// 3. Uncomment these 7 lines:
import photo1 from "@/assets/smartcar/photo1.jpeg";
import photo2 from "@/assets/smartcar/photo2.jpeg";
import photo3 from "@/assets/smartcar/photo3.jpeg";
import photo4 from "@/assets/smartcar/photo4.jpeg";
import photo5 from "@/assets/smartcar/photo5.jpeg";
import diagram1 from "@/assets/smartcar/diagram1.png";
import diagram2 from "@/assets/smartcar/diagram2.png";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stat { label: string; value: string; unit?: string }
interface Feature { icon: string; title: string; desc: string }

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: Stat[] = [
  { label: "Eye Close Trigger", value: "4", unit: "sec" },
  { label: "Response Time",     value: "200", unit: "ms" },
  { label: "Exhibition Rank",   value: "3", unit: "rd" },
  { label: "Safety Systems",    value: "3", unit: "sys" },
];

const STACK = [
  { name: "Arduino UNO",           color: "#f97316" },
  { name: "C++",                   color: "#fb923c" },
  { name: "Ultrasonic Sensor",     color: "#fbbf24" },
  { name: "MQ-3 Alcohol Sensor",   color: "#a3e635" },
  { name: "IR Eye Sensor",         color: "#f97316" },
  { name: "Servo Motor",           color: "#fcd34d" },
  { name: "Buzzer Alert System",   color: "#fb923c" },
  { name: "Embedded C",            color: "#fdba74" },
  { name: "Radar (Ultrasonic)",    color: "#fbbf24" },
];

const FEATURES: Feature[] = [
  {
    icon: "◉",
    title: "Drowsiness Detection",
    desc: "IR sensor monitors driver eyes continuously. If closed ~4 seconds, buzzer fires immediately and vehicle slows automatically.",
  },
  {
    icon: "⬡",
    title: "Alcohol Detection",
    desc: "MQ-3 gas sensor detects alcohol vapour from the driver. On positive detection, safety alerts activate and vehicle slows.",
  },
  {
    icon: "◈",
    title: "Rear Radar Assistance",
    desc: "Ultrasonic radar activates during braking. Detects approaching vehicles behind and alerts the driver instantly.",
  },
  {
    icon: "⬟",
    title: "Automated Response",
    desc: "All three systems run in parallel on Arduino. Detection triggers automated relay logic — no manual input needed.",
  },
  {
    icon: "◆",
    title: "Real-Time Monitoring",
    desc: "Sensor data processed in tight real-time loops. System latency under 200ms from trigger to alert output.",
  },
  {
    icon: "⬢",
    title: "Tiered Buzzer Alerts",
    desc: "Short beeps for warnings, continuous tone for critical states. Designed to wake a drowsy driver instantly.",
  },
];

// ─── Counter hook ─────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ stat, animate }: { stat: Stat; animate: boolean }) {
  const num = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const raw = useCounter(num, 1600, animate);
  return (
    <div style={{
      background: "rgba(20,8,2,0.75)",
      border: "1px solid rgba(249,115,22,0.2)",
      borderRadius: 12, padding: "24px 20px",
      position: "relative", overflow: "hidden",
      minWidth: 0,
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #f97316, #fbbf24, transparent)",
      }} />
      <div
        className="pp-stat-value"
        style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 6,
      }}>
        {animate ? raw : "0"}
        <span style={{ fontSize: 16, color: "#f97316", marginLeft: 2 }}>{stat.unit}</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase" }}>
        {stat.label}
      </div>
    </div>
  );
}

// ─── Animated Car Diagram ─────────────────────────────────────────────────────
function CarDiagram() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(id);
  }, []);
  const pulse  = 0.5 + 0.5 * Math.sin(tick * 0.07);
  const pulse2 = 0.5 + 0.5 * Math.sin(tick * 0.05 + 2);
  const radarP = (tick % 60) / 60;

  return (
    <svg viewBox="0 0 520 280" style={{ width: "100%", height: "100%" }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 20} x2="520" y2={i * 20} stroke="#f97316" strokeWidth="0.3" opacity="0.1" />
      ))}
      {Array.from({ length: 27 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="280" stroke="#f97316" strokeWidth="0.3" opacity="0.1" />
      ))}
      {/* Wheels */}
      <ellipse cx="145" cy="200" rx="28" ry="28" fill="#111" stroke="#f97316" strokeWidth="1.5" opacity="0.8" />
      <ellipse cx="145" cy="200" rx="14" ry="14" fill="#1a0a00" stroke="#fb923c" strokeWidth="1" />
      <ellipse cx="360" cy="200" rx="28" ry="28" fill="#111" stroke="#f97316" strokeWidth="1.5" opacity="0.8" />
      <ellipse cx="360" cy="200" rx="14" ry="14" fill="#1a0a00" stroke="#fb923c" strokeWidth="1" />
      {/* Chassis */}
      <rect x="110" y="155" width="280" height="48" rx="8" fill="#1a0800" stroke="#f97316" strokeWidth="1.5" opacity="0.9" />
      <path d="M175,155 L195,110 L325,110 L345,155 Z" fill="#0f0500" stroke="#f97316" strokeWidth="1.5" opacity="0.9" />
      <path d="M200,150 L215,118 L315,118 L330,150 Z" fill="rgba(249,115,22,0.08)" stroke="#fb923c" strokeWidth="1" />
      {/* Eye sensor */}
      <rect x="240" y="100" width="40" height="10" rx="3" fill="#1a0800" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="260" cy="97" r={4 + pulse * 2} fill="none" stroke="#fbbf24" strokeWidth="1" opacity={0.3 + pulse * 0.5} />
      <circle cx="260" cy="97" r="3" fill="#fbbf24" opacity={0.6 + pulse * 0.4} />
      <text x="260" y="86" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#fbbf24" opacity="0.8">EYE SENSOR</text>
      <line x1="260" y1="88" x2="260" y2="100" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.5" />
      {/* Alcohol sensor */}
      <rect x="170" y="145" width="30" height="12" rx="3" fill="#1a0800" stroke="#a3e635" strokeWidth="1" />
      <circle cx="185" cy="141" r={3 + pulse2 * 2} fill="none" stroke="#a3e635" strokeWidth="1" opacity={0.3 + pulse2 * 0.4} />
      <circle cx="185" cy="141" r="2.5" fill="#a3e635" opacity={0.5 + pulse2 * 0.4} />
      <text x="185" y="133" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#a3e635" opacity="0.8">MQ-3</text>
      <line x1="185" y1="135" x2="185" y2="145" stroke="#a3e635" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.5" />
      {[0, 1, 2].map(i => (
        <path key={i} d={`M${160 - i*8},${138 + i*3} Q${155 - i*8},${130 + i*2} ${150 - i*8},${135 + i*3}`}
          fill="none" stroke="#a3e635" strokeWidth="0.8" opacity={pulse2 * 0.4 - i * 0.1} />
      ))}
      {/* Rear radar */}
      {[1, 2, 3].map(i => (
        <path key={i} d={`M${430 + i*14},185 A${i*14},${i*20} 0 0,1 ${430 + i*14},215`}
          fill="none" stroke="#f97316" strokeWidth="1.5"
          opacity={(1 - radarP) * (0.8 - i * 0.2) + 0.1}
          strokeDasharray={i === 1 ? "none" : "3,2"} />
      ))}
      <rect x="388" y="183" width="16" height="34" rx="3" fill="#1a0800" stroke="#f97316" strokeWidth="1.5" />
      <text x="420" y="225" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#f97316" opacity="0.8">RADAR</text>
      {/* Arduino */}
      <rect x="220" y="162" width="60" height="36" rx="4" fill="#0a1a00" stroke="#4ade80" strokeWidth="1.2" />
      <text x="250" y="177" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#4ade80" fontWeight="700">ARDUINO</text>
      <text x="250" y="188" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#4ade80" opacity="0.6">UNO R3</text>
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={224 + i*9} y="196" width="4" height="4" rx="1" fill="#4ade80" opacity="0.5" />
      ))}
      {/* Wires */}
      <path d="M250,162 L250,144 L260,110" fill="none" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4" />
      <path d="M230,170 L185,157" fill="none" stroke="#a3e635" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4" />
      <path d="M280,180 L395,195" fill="none" stroke="#f97316" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4" />
      {/* Buzzer */}
      <circle cx="145" cy="155" r="10" fill="#1a0800" stroke="#fbbf24" strokeWidth="1.2" />
      <text x="145" y="158" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#fbbf24">🔊</text>
      <text x="145" y="143" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#fbbf24" opacity="0.7">BUZZ</text>
      {pulse > 0.7 && [1, 2].map(i => (
        <path key={i} d={`M${130 - i*8},148 Q${125 - i*8},155 ${130 - i*8},162`}
          fill="none" stroke="#fbbf24" strokeWidth="1" opacity={pulse * 0.6} />
      ))}
      {/* Corners */}
      <path d="M8,8 L8,24 M8,8 L24,8" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
      <path d="M512,8 L512,24 M512,8 L496,8" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
      <path d="M8,272 L8,256 M8,272 L24,272" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
      <path d="M512,272 L512,256 M512,272 L496,272" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
      {/* Status dots */}
      {["EYE","MQ3","RADAR","MCU"].map((label, i) => (
        <g key={label}>
          <circle cx={60 + i*110} cy="268" r="3"
            fill={["#fbbf24","#a3e635","#f97316","#4ade80"][i]}
            opacity={0.4 + pulse * 0.4} />
          <text x={70 + i*110} y="271" fontFamily="monospace" fontSize="7"
            fill={["#fbbf24","#a3e635","#f97316","#4ade80"][i]} opacity="0.6">
            {label}: ACTIVE
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Image card ───────────────────────────────────────────────────────────────
function ImgCard({
  src, label, badge, tall = false,
}: {
  src: string | undefined;
  label: string;
  badge?: string;
  tall?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(20,8,2,0.85)",
        border: `1px solid ${hovered ? "rgba(249,115,22,0.55)" : "rgba(249,115,22,0.18)"}`,
        borderRadius: 14, overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 50px rgba(249,115,22,0.1)" : "none",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg,transparent,#f97316,#fbbf24,transparent)",
        opacity: hovered ? 1 : 0.35, transition: "opacity 0.3s",
      }} />

      {/* Image */}
      <div
        className={tall ? "pp-img-media pp-img-media--tall" : "pp-img-media"}
        style={{
        background: src ? "transparent" : "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.06), #0c0400)",
      }}>
        {src ? (
          <img src={src} alt={`${label} from Anish Jadhav's Smart Car Safety System project`}
            style={{ width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.4s",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }} />
        ) : (
          <>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(249,115,22,0.15) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }} />
            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "rgba(249,115,22,0.08)",
                border: "1px dashed rgba(249,115,22,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px", fontSize: 24,
              }}>📷</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                letterSpacing: 2, color: "rgba(249,115,22,0.5)", textTransform: "uppercase",
              }}>
                Import your photo here
              </div>
            </div>
          </>
        )}
        {badge && (
          <div style={{
            position: "absolute", top: 10, left: 10,
            padding: "4px 10px", borderRadius: 20,
            background: "rgba(249,115,22,0.15)",
            border: "1px solid rgba(249,115,22,0.4)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: 2, color: "#f97316",
          }}>{badge}</div>
        )}
      </div>

      <div style={{ padding: "14px 16px 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#f3f4f6" }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SmartCar() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [scanY, setScanY] = useState(0);
  const statsRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const colors = ["rgba(249,115,22,","rgba(251,146,60,","rgba(234,88,12,"];
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,  y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38, vy: (Math.random() - 0.5) * 0.38,
      size: Math.random() * 1.5 + 0.5,  alpha: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * 3)],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(249,115,22,0.04)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 50) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 50) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = p.color + p.alpha + ")"; ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    let y = 0;
    const tick = () => { y = (y + 0.25) % 100; setScanY(y); requestAnimationFrame(tick); };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = statsRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const ACCENT = "#f97316";

  return (
    <div
      className="project-page"
      style={{
      minHeight: "100vh", background: "#060200",
      color: "#e5e7eb", fontFamily: "'Space Grotesk','Inter',sans-serif",
      position: "relative", overflowX: "hidden",
    }}>
      <style>{`
        @keyframes pulse-dot  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes badge-glow { 0%,100%{box-shadow:0 0 8px rgba(251,191,36,0.3)} 50%{box-shadow:0 0 20px rgba(251,191,36,0.7)} }
      `}</style>

      <canvas ref={canvasRef} style={{ position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} />
      <div style={{
        position:"fixed",left:0,right:0,height:1,zIndex:1,pointerEvents:"none",
        top:`${scanY}%`,
        background:"linear-gradient(90deg,transparent,rgba(249,115,22,0.2),rgba(251,191,36,0.12),transparent)",
      }} />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="pp-section">
        <div className="pp-wrap pp-wrap--hero">

          {/* Breadcrumb */}
          <div className="pp-breadcrumb">
            <a href="/" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              color:ACCENT,textDecoration:"none",
              fontFamily:"'JetBrains Mono',monospace",fontSize:12,letterSpacing:2,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              BACK
            </a>
            <span style={{ color:"#374151",fontFamily:"monospace",fontSize:12 }}>/</span>
            <span style={{ color:"#4b5563",fontFamily:"monospace",fontSize:12,letterSpacing:2 }}>
              PROJECTS / SMART-CAR
            </span>
          </div>

          {/* Header */}
          <div className="pp-hero-grid">
            <div className="pp-text-break">
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT }}>
                  HARDWARE PROTOTYPE
                </span>
                <div style={{ width:40,height:1,background:`linear-gradient(90deg,${ACCENT},#fbbf24)` }} />
                <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:3,color:"#374151" }}>03</span>
                <div style={{
                  display:"inline-flex",alignItems:"center",gap:6,
                  padding:"4px 12px",borderRadius:20,
                  background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.35)",
                  animation:"badge-glow 2s ease-in-out infinite",
                }}>
                  <span style={{ fontSize:12 }}>🏆</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:2,color:"#fbbf24" }}>
                    3RD PLACE · DISTRICT LEVEL · PUNE
                  </span>
                </div>
              </div>

              <h1 style={{ fontSize:"clamp(32px,5vw,72px)",fontWeight:800,lineHeight:1.05,margin:0,letterSpacing:-2 }}>
                <span style={{ color:"#fff" }}>Smart </span>
                <span style={{ color:"transparent",WebkitTextStroke:`1px ${ACCENT}` }}>Car</span>
              </h1>
              <h2 style={{
                fontSize:"clamp(13px,2vw,19px)",fontWeight:400,color:"#6b7280",
                marginTop:8,letterSpacing:4,textTransform:"uppercase",
                fontFamily:"'JetBrains Mono',monospace",
              }}>
                Safety & Driver Protection System
              </h2>

              <p style={{ marginTop:28,fontSize:16,color:"#9ca3af",lineHeight:1.8,maxWidth:560 }}>
                An intelligent vehicle safety prototype designed to reduce road accidents caused by
                driver drowsiness, drunk driving, and rear-end collisions. Built and demonstrated
                at the <strong style={{ color:"#f97316" }}>52nd Taluka-Level Science Exhibition</strong>,
                Indapur, Pune — and secured <strong style={{ color:"#fbbf24" }}>3rd Place</strong>.
              </p>

              <div style={{ display:"flex",gap:14,marginTop:36,flexWrap:"wrap" }}>
                <a href="https://github.com/anish1278/Car-Safety-System.git" target="_blank" rel="noopener noreferrer"
                  className="pp-touch-link"
                  style={{
                    gap:10,
                    padding:"14px 28px",borderRadius:10,
                    background:`linear-gradient(135deg,${ACCENT},#ea580c)`,
                    color:"#fff",fontWeight:600,fontSize:14,
                    textDecoration:"none",letterSpacing:0.5,
                    border:"1px solid rgba(249,115,22,0.5)",transition:"all 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 0 32px rgba(249,115,22,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow="none";
                    (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.931.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a href="#gallery"
                  className="pp-touch-link"
                  style={{
                    gap:10,
                    padding:"14px 28px",borderRadius:10,
                    background:"transparent",color:"#e5e7eb",fontWeight:600,fontSize:14,
                    textDecoration:"none",letterSpacing:0.5,
                    border:"1px solid rgba(249,115,22,0.3)",transition:"all 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor=ACCENT;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 0 20px rgba(249,115,22,0.15)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(249,115,22,0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow="none";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  View Photos
                </a>
              </div>
            </div>

            {/* Status box */}
            <div className="pp-status-wrap">
              <div
                className="pp-status-box"
                style={{
                background:"rgba(20,8,2,0.9)",border:"1px solid rgba(249,115,22,0.25)",
                borderRadius:12,padding:"16px 20px",fontFamily:"'JetBrains Mono',monospace",
              }}>
                <div style={{ fontSize:10,letterSpacing:3,color:"#6b7280",marginBottom:12 }}>SYSTEM STATUS</div>
                {[
                  { label:"PROTOTYPE",  value:"BUILT"     },
                  { label:"DEMO",       value:"SUCCESS"   },
                  { label:"AWARD",      value:"3RD PLACE" },
                  { label:"EXHIBITION", value:"DISTRICT"  },
                ].map(r => (
                  <div key={r.label} style={{ display:"flex",justifyContent:"space-between",gap:24,marginBottom:8 }}>
                    <span style={{ fontSize:11,color:"#6b7280",letterSpacing:1 }}>{r.label}</span>
                    <span style={{ fontSize:11,color:ACCENT,letterSpacing:1 }}>● {r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ANIMATED DIAGRAM ──────────────────────────────────────────── */}
          <div style={{
            background:"rgba(10,4,0,0.9)",border:"1px solid rgba(249,115,22,0.2)",
            borderRadius:16,overflow:"hidden",marginBottom:80,
            boxShadow:"0 40px 120px rgba(249,115,22,0.06)",
          }}>
            <div
              className="pp-diagram-header"
              style={{
              background:"rgba(20,8,2,0.95)",borderBottom:"1px solid rgba(249,115,22,0.15)",
              padding:"12px 20px",
            }}>
              <div style={{ display:"flex",gap:7,flexShrink:0 }}>
                {["#ef4444","#f59e0b","#22c55e"].map((c,i) => (
                  <div key={i} style={{ width:12,height:12,borderRadius:"50%",background:c,opacity:0.8 }} />
                ))}
              </div>
              <span className="pp-text-break" style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:ACCENT,letterSpacing:2,flex:"1 1 auto",minWidth:0 }}>
                SYSTEM_DIAGRAM.svg — Smart Car Safety Architecture
              </span>
              <div className="pp-diagram-legend">
                {[["#fbbf24","EYE"],["#a3e635","MQ-3"],["#f97316","RADAR"],["#4ade80","MCU"]].map(([c,l]) => (
                  <div key={l} style={{ display:"flex",alignItems:"center",gap:5 }}>
                    <div style={{ width:6,height:6,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}` }} />
                    <span style={{ fontFamily:"monospace",fontSize:9,color:"#6b7280",letterSpacing:1 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pp-diagram-body" style={{ background:"#060200" }}>
              <CarDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div className="pp-stats-grid">
            {STATS.map(s => <StatCard key={s.label} stat={s} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      {/* ══ PHOTO GALLERY ════════════════════════════════════════════════════ */}
      <section id="gallery" className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT,marginBottom:12 }}>
              // EXHIBITION PHOTOS
            </div>
            <h2 className="pp-h2-section" style={{ margin:"0 0 8px" }}>Project Gallery</h2>
            <p style={{ color:"#6b7280",fontSize:13,fontFamily:"'JetBrains Mono',monospace",letterSpacing:1 }}>
              Real photos from the 52nd Taluka-Level Science Exhibition · Indapur, Pune
            </p>
          </div>

          {/* Row 1: hero wide + trophy */}
          <div className="pp-gallery-wide">
            <ImgCard
              src={photo2}
              label="Demonstrating the prototype to visitors at the exhibition"
              badge="DEMO DAY"
              tall
            />
            <ImgCard
              src={photo5}
              label="Official award plaque — 52nd Taluka-Level Science Exhibition, 3rd Place"
              badge="🏆 AWARD"
              tall
            />
          </div>

          {/* Row 2: prototype table + crowd */}
          <div className="pp-gallery-half">
            <ImgCard
              src={photo1}
              label="Prototype on display — RC cars, Arduino setup and live radar screen"
              badge="PROTOTYPE"
            />
            <ImgCard
              src={photo3}
              label="Students crowding around to see the radar detection in action"
              badge="CROWD"
            />
          </div>

          {/* Row 3: judges + presenting */}
          <div className="pp-gallery-half">
            <ImgCard
              src={photo4}
              label="Judges and officials visiting the Science Fair"
              badge="JUDGES"
            />
            <ImgCard
              src={photo2}
               label="Live demonstration of radar system and safety response"
              badge="LIVE DEMO"
            />
          </div>
        </div>
      </section>

      {/* ══ SYSTEM DIAGRAMS ══════════════════════════════════════════════════ */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT,marginBottom:12 }}>
              // SYSTEM DIAGRAMS
            </div>
            <h2 className="pp-h2-section">Architecture Overview</h2>
          </div>
          <div className="pp-diagrams-grid">
            {/* Diagram 1 */}
            <div style={{
              background:"rgba(20,8,2,0.85)",
              border:"1px solid rgba(249,115,22,0.18)",
              borderRadius:14,overflow:"hidden",
            }}>
              <div
                className="pp-diagram-img-wrap"
                style={{
                background:"radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.05), #0c0400)",
              }}>
                <img src={diagram1} alt="Smart Car Safety System architecture diagram by Anish Jadhav"
                  style={{ width: "100%", height: "100%", objectFit: "contain",
                    transition: "transform 0.4s",
                  }} />
              </div>
              <div style={{ padding:"14px 18px 18px" }}>
                <div style={{ fontSize:13,fontWeight:600,color:"#f3f4f6" }}>System Architecture Diagram</div>
                <div style={{ fontSize:12,color:"#6b7280",marginTop:4 }}>All 3 modules connected to Arduino central controller</div>
              </div>
            </div>

            {/* Diagram 2 */}
            <div style={{
              background:"rgba(20,8,2,0.85)",
              border:"1px solid rgba(249,115,22,0.18)",
              borderRadius:14,overflow:"hidden",
            }}>
              <div
                className="pp-diagram-img-wrap"
                style={{
                background:"radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.05), #0c0400)",
              }}>
                <img src={diagram2} alt="Driver protection flow map for Anish Jadhav's Smart Car Safety System"
                  style={{ width: "100%", height: "100%", objectFit: "contain",
                    transition: "transform 0.4s",
                  }} />
              </div>
              <div style={{ padding:"14px 18px 18px" }}>
                <div style={{ fontSize:13,fontWeight:600,color:"#f3f4f6" }}>Driver Protection Flow Map</div>
                <div style={{ fontSize:12,color:"#6b7280",marginTop:4 }}>Detection → Alert → Response pipeline per module</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════════════════════ */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div style={{ marginBottom:48 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT,marginBottom:12 }}>
              // CORE SYSTEMS
            </div>
            <h2 className="pp-h2-section">How it protects</h2>
          </div>
          <div className="pp-features-grid">
            {FEATURES.map((f,i) => (
              <div key={i}
                style={{
                  background:"rgba(20,8,2,0.8)",
                  border:"1px solid rgba(249,115,22,0.12)",
                  borderRadius:12,padding:"28px 24px",
                  transition:"border-color 0.3s,transform 0.3s",cursor:"default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor="rgba(249,115,22,0.4)";
                  (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor="rgba(249,115,22,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform="translateY(0)";
                }}
              >
                <div style={{ fontSize:24,marginBottom:14,color:ACCENT }}>{f.icon}</div>
                <div style={{ fontSize:15,fontWeight:600,color:"#f3f4f6",marginBottom:10 }}>{f.title}</div>
                <div style={{ fontSize:13,color:"#6b7280",lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PIPELINE ═════════════════════════════════════════════════════════ */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div style={{ marginBottom:48 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT,marginBottom:12 }}>
              // LOGIC FLOW
            </div>
            <h2 className="pp-h2-section">Detection pipeline</h2>
          </div>
          <div className="pp-pipeline-grid">
            <div
              className="pp-pipeline-line"
              style={{
              position:"absolute",top:28,left:"12.5%",right:"12.5%",height:1,
              background:"linear-gradient(90deg,#f97316,#fbbf24,#f97316)",
              opacity:0.3,zIndex:0,
            }}/>
            {[
              { step:"01",title:"Sensor Input",  desc:"Eye IR, MQ-3 gas & ultrasonic radar feed live data to Arduino",    color:"#f97316" },
              { step:"02",title:"Threshold Check",desc:"Arduino compares values against pre-programmed safety thresholds", color:"#fb923c" },
              { step:"03",title:"Alert Trigger",  desc:"Buzzer activates instantly — short beeps for warning, continuous for critical", color:"#fbbf24" },
              { step:"04",title:"Auto Response",  desc:"Relay logic slows vehicle or locks ignition per detected risk level",color:"#a3e635" },
            ].map((item,i) => (
              <div key={i} style={{ padding:"0 16px",position:"relative",zIndex:1 }}>
                <div style={{
                  width:56,height:56,borderRadius:"50%",
                  background:`${item.color}15`,border:`1px solid ${item.color}45`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto 20px",
                  fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:item.color,
                }}>{item.step}</div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:14,fontWeight:600,color:"#f3f4f6",marginBottom:8 }}>{item.title}</div>
                  <div style={{ fontSize:12,color:"#6b7280",lineHeight:1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH STACK ═══════════════════════════════════════════════════════ */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div
            className="pp-stack-panel"
            style={{
            background:"rgba(20,8,2,0.8)",
            border:"1px solid rgba(249,115,22,0.15)",
            borderRadius:16,
          }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT,marginBottom:8 }}>
              // COMPONENTS & TECH
            </div>
            <h2 style={{ fontSize:24,fontWeight:700,color:"#fff",margin:"0 0 32px" }}>Built with</h2>
            <div style={{ display:"flex",flexWrap:"wrap",gap:12 }}>
              {STACK.map(s => (
                <div key={s.name}
                  style={{
                    padding:"10px 18px",borderRadius:8,
                    border:`1px solid ${s.color}30`,background:`${s.color}08`,
                    color:s.color,fontFamily:"'JetBrains Mono',monospace",
                    fontSize:13,fontWeight:500,transition:"all 0.2s",cursor:"default",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background=`${s.color}18`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow=`0 0 16px ${s.color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background=`${s.color}08`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow="none";
                  }}
                >{s.name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ROLE / META ══════════════════════════════════════════════════════ */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div className="pp-meta-grid">
            {[
              { label:"ROLE",       value:"Solo Builder",      sub:"Concept, wiring, code & demo" },
              { label:"EXHIBITION", value:"Indapur, Pune",     sub:"52nd Taluka-Level · Dec 2024"  },
              { label:"AWARD",      value:"3rd Place 🏆",      sub:"Taluka + District Level"       },
              { label:"STATUS",     value:"Prototype Built",   sub:"Fully demonstrated at venue"   },
            ].map(item => (
              <div key={item.label} className="pp-meta-item" style={{
                background:"rgba(20,8,2,0.7)",
                border:"1px solid rgba(249,115,22,0.12)",
                borderRadius:12,padding:"24px 28px",
              }}>
                <div className="pp-meta-label" style={{
                  fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                  letterSpacing:3,color:ACCENT,opacity:0.7,
                }}>{item.label}</div>
                <div style={{ borderLeft:"1px solid rgba(249,115,22,0.2)",paddingLeft:20 }}>
                  <div style={{ fontSize:18,fontWeight:700,color:"#fff" }}>{item.value}</div>
                  <div style={{ fontSize:12,color:"#6b7280",marginTop:4 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FUTURE ═══════════════════════════════════════════════════════════ */}
      <section className="pp-section pp-section-pad">
        <div className="pp-wrap">
          <div
            className="pp-stack-panel"
            style={{
            background:"rgba(20,8,2,0.8)",
            border:"1px solid rgba(249,115,22,0.15)",
            borderRadius:16,
          }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT,marginBottom:8 }}>
              // FUTURE_IMPROVEMENTS.md
            </div>
            <h2 style={{ fontSize:"clamp(1.25rem, 3.5vw, 1.5rem)",fontWeight:700,color:"#fff",margin:"0 0 32px" }}>What's next</h2>
            <div className="pp-future-grid">
              {[
                { icon:"🧠",title:"AI Driver Monitoring",   desc:"Camera-based eye tracking with ML fatigue classification"  },
                { icon:"📡",title:"GPS Integration",        desc:"Real-time location logging on critical safety events"       },
                { icon:"📱",title:"Mobile App",             desc:"Companion app for live monitoring and alert history"        },
                { icon:"📊",title:"Analytics Dashboard",    desc:"Real-time safety metrics and trip report generation"        },
                { icon:"🚨",title:"Emergency Alerts",       desc:"Auto SMS to emergency contacts on critical detection"       },
                { icon:"🔮",title:"Collision Prediction",   desc:"Advanced AI-based collision probability modelling"          },
              ].map((item,i) => (
                <div key={i} style={{
                  padding:"18px 20px",borderRadius:10,
                  background:"rgba(249,115,22,0.04)",
                  border:"1px solid rgba(249,115,22,0.1)",
                  display:"flex",gap:12,alignItems:"flex-start",
                }}>
                  <span style={{ fontSize:18,flexShrink:0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize:13,fontWeight:600,color:"#f3f4f6",marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontSize:12,color:"#6b7280",lineHeight:1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════════ */}
      <section className="pp-section pp-section-pad--cta">
        <div className="pp-wrap">
          <div
            className="pp-cta-box"
            style={{
            background:"rgba(20,8,2,0.9)",
            border:"1px solid rgba(249,115,22,0.25)",
            borderRadius:20,
            textAlign:"center",position:"relative",overflow:"hidden",
          }}>
            <div style={{
              position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
              width:200,height:1,
              background:"linear-gradient(90deg,transparent,#f97316,#fbbf24,transparent)",
            }}/>
            <div style={{ fontSize:48,marginBottom:16 }}>🏆</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:4,color:ACCENT,marginBottom:16 }}>
              // DISTRICT LEVEL ACHIEVEMENT
            </div>
            <h2 className="pp-cta-h2">
              Smart Car Safety System
            </h2>
            <p style={{ color:"#6b7280",fontSize:15,maxWidth:520,margin:"0 auto 8px" }}>
              3rd Place — 52nd Taluka-Level Science Exhibition, Indapur, Pune
            </p>
            <p style={{
              color:"#4b5563",fontSize:13,maxWidth:480,margin:"0 auto 36px",
              fontFamily:"'JetBrains Mono',monospace",letterSpacing:1,
            }}>
              Built solo. Demonstrated live. Awarded.
            </p>
            <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
              <a href="https://github.com/anish1278/Car-Safety-System.git" target="_blank" rel="noopener noreferrer"
                className="pp-touch-link"
                style={{
                  gap:10,
                  padding:"16px 36px",borderRadius:10,
                  background:`linear-gradient(135deg,${ACCENT},#ea580c)`,
                  color:"#fff",fontWeight:700,fontSize:15,textDecoration:"none",
                  boxShadow:"0 0 40px rgba(249,115,22,0.3)",transition:"all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 0 60px rgba(249,115,22,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 0 40px rgba(249,115,22,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.931.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View Source Code
              </a>
              <a href="#gallery"
                className="pp-touch-link"
                style={{
                  gap:10,
                  padding:"16px 36px",borderRadius:10,
                  background:"transparent",color:"#e5e7eb",
                  fontWeight:700,fontSize:15,textDecoration:"none",
                  border:"1px solid rgba(249,115,22,0.35)",transition:"all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor=ACCENT;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 0 24px rgba(249,115,22,0.2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(249,115,22,0.35)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow="none";
                }}
              >
                See Photos
              </a>
            </div>
            <div style={{
              position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",
              width:200,height:1,
              background:"linear-gradient(90deg,transparent,rgba(249,115,22,0.4),transparent)",
            }}/>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer style={{
        position:"relative",zIndex:10,
        borderTop:"1px solid rgba(249,115,22,0.1)",
        padding:"24px",textAlign:"center",
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:11,letterSpacing:3,color:"#374151",
      }}>
        [ SMARTCAR.TSX · HARDWARE_PROTOTYPE · 03 ]
      </footer>
    </div>
  );
}
