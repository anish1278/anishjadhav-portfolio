import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { SectionLabel } from "./About";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ecommerceImg from "@/assets/ecommerce-project.png";
import alfabyteImg from "@/assets/alfabyte-project.png";
import smartCarImg from "@/assets/smart-car-project.png";

type Project = {
  name: string;
  tag: string;
  desc: string;
  longDesc: string;
  githubUrl: string;
  liveDemoUrl: string;
  pagePath?: string;
  image: string;
  stack: string[];
  accent: "purple" | "red" | "yellow";
  details: {
    role: string;
    timeline: string;
    architecture: string;
    highlights: string[];
  };
};

const projects: Project[] = [
  {
    name: "AI Vision Experiments",
    tag: "FULL-STACK",
    desc: "Interactive AI and computer vision experiments featuring gesture control, handwriting recognition, and real-time visual tracking systems.",
    longDesc: "A futuristic collection of Python-based AI and computer vision projects focused on real-time interaction systems. This lab includes hand tracking, gesture-based controls, handwriting recognition, augmented reality experiments, and intelligent visual processing using OpenCV, MediaPipe, and machine learning concepts. Each project is designed to explore the cutting edge of human-computer interaction through computer vision and AI.",
    image: ecommerceImg,
    githubUrl: "",
    liveDemoUrl: "",
    pagePath: "/ai-vision",
    stack: ["Python", "OpenCV", "Computer Vision", "Machine Learning", "AI Concepts "],
    accent: "purple",
    details: {
      role: "Lead Full-Stack Developer",
      timeline: "3 Months (Q3 2024)",
      architecture: "MERN Stack (MongoDB, Express, React, Node) with JWT Authentication and Stripe Payments.",
      highlights: [
        "Implemented high-performance product indexing with fuzzy search.",
        "Optimized checkout latency by 45% using state caching.",
        "Engineered fully responsive storefront layout supporting legacy browsers."
      ] 
    }
  },
  {
    name: "Alfabyte Computers",
    tag: "CLIENT WORK",
    desc: "Production website for a real computer retail brand — sleek service catalogue, contact funnel, and live deployment.",
    longDesc: "A specialized computer hardware portfolio and quotation system designed to showcase custom computer builds, repair services, and retail parts. Features an interactive build-configurator wizard and a high-conversion leads routing funnel.",
    image: alfabyteImg,
    githubUrl: "",
    liveDemoUrl: "",
    pagePath: "/alfabyte",
    stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    accent: "red",
    details: {
      role: "Front-End Engineer & UI/UX Designer",
      timeline: "2 Months (Q1 2025)",
      architecture: "Vite + React Single Page App, animated with Framer Motion, styled with custom Tailwind utility tokens.",
      highlights: [
        "Configured high-converting interactive PC builder tool.",
        "Achieved 98/100 Lighthouse score for performance and accessibility.",
        "Designed dark cyber-aesthetic branding and assets from scratch."
      ]
    }
  },
  {
    name: "Smart Car Safety System",
    tag: "ROBOTICS",
    desc: "Award-winning hardware project: an Arduino-based driver-assist system with collision sensing and real-time alerts.",
    longDesc: "A cyber-physical hardware prototype engineered to prevent traffic accidents. Uses a mesh of ultrasonic sensors and infrared sensors connected to an Arduino microcontroller, providing real-time proximity telemetry, audio-visual alarms, and automatic braking actuation.",
    image: smartCarImg,
    githubUrl: "",
    liveDemoUrl: "",
    pagePath: "/car-safety",
    stack: ["Arduino", "C++", "Sensors", "Circuits"],
    accent: "yellow",
    details: {
      role: "Hardware Developer & Embedded Programmer",
      timeline: "Science Exhibition Award Winner (2025)",
      architecture: "Atmega328P Microcontroller running highly optimized C++ loop, interfacing with active sonar and IR sensor matrices.",
      highlights: [
        "Won Taluka-level science exhibition representing high-school innovator division.",
        "Engineered real-time sensor processing loop with less than 8ms loop delay.",
        "Designed fail-safe backup control path for automatic obstacle stopping."
      ]
    }
  },
];

const colorConfig = {
  purple: {
    accent: "#c084fc",
    accentLight: "#e9d5ff",
    accentRgb: "168, 85, 247",
    cardBg:
      "linear-gradient(145deg, rgba(168,85,247,0.14) 0%, rgba(12,8,24,0.92) 45%, rgba(88,28,135,0.08) 100%)",
    border: "rgba(168, 85, 247, 0.45)",
    borderHover: "rgba(192, 132, 252, 0.75)",
    shadow: "0 0 40px rgba(168, 85, 247, 0.22), 0 0 80px rgba(168, 85, 247, 0.08), inset 0 1px 0 rgba(192, 132, 252, 0.15)",
    shadowHover:
      "0 0 50px rgba(168, 85, 247, 0.4), 0 0 100px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(233, 213, 255, 0.2)",
    imageOverlay: "linear-gradient(to top, rgba(46, 16, 101, 0.9) 0%, transparent 55%)",
    textGlow: "text-purple-300 drop-shadow-[0_0_10px_rgba(192,132,252,0.65)]",
    bullet: "bg-purple-400 shadow-[0_0_10px_#c084fc,0_0_20px_#a855f7]",
    stackBadge: "border-purple-500/35 bg-purple-500/12 text-purple-200",
    corner: "border-purple-400/70 shadow-[0_0_8px_rgba(168,85,247,0.5)]",
  },
  red: {
    accent: "#f87171",
    accentLight: "#fecaca",
    accentRgb: "239, 68, 68",
    cardBg:
      "linear-gradient(145deg, rgba(239,68,68,0.14) 0%, rgba(20,8,8,0.92) 45%, rgba(127,29,29,0.08) 100%)",
    border: "rgba(239, 68, 68, 0.45)",
    borderHover: "rgba(248, 113, 113, 0.75)",
    shadow: "0 0 40px rgba(239, 68, 68, 0.22), 0 0 80px rgba(239, 68, 68, 0.08), inset 0 1px 0 rgba(248, 113, 113, 0.15)",
    shadowHover:
      "0 0 50px rgba(239, 68, 68, 0.4), 0 0 100px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(254, 202, 202, 0.2)",
    imageOverlay: "linear-gradient(to top, rgba(69, 10, 10, 0.9) 0%, transparent 55%)",
    textGlow: "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.65)]",
    bullet: "bg-red-400 shadow-[0_0_10px_#f87171,0_0_20px_#ef4444]",
    stackBadge: "border-red-500/35 bg-red-500/12 text-red-200",
    corner: "border-red-400/70 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  },
  yellow: {
    accent: "#fde047",
    accentLight: "#fef9c3",
    accentRgb: "250, 204, 21",
    cardBg:
      "linear-gradient(145deg, rgba(250,204,21,0.14) 0%, rgba(20,18,6,0.92) 45%, rgba(113,63,18,0.08) 100%)",
    border: "rgba(250, 204, 21, 0.45)",
    borderHover: "rgba(253, 224, 71, 0.75)",
    shadow: "0 0 40px rgba(250, 204, 21, 0.2), 0 0 80px rgba(250, 204, 21, 0.08), inset 0 1px 0 rgba(253, 224, 71, 0.15)",
    shadowHover:
      "0 0 50px rgba(250, 204, 21, 0.38), 0 0 100px rgba(250, 204, 21, 0.14), inset 0 1px 0 rgba(254, 249, 195, 0.2)",
    imageOverlay: "linear-gradient(to top, rgba(66, 32, 6, 0.9) 0%, transparent 55%)",
    textGlow: "text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.65)]",
    bullet: "bg-yellow-400 shadow-[0_0_10px_#fde047,0_0_20px_#facc15]",
    stackBadge: "border-yellow-500/35 bg-yellow-500/12 text-yellow-100",
    corner: "border-yellow-400/70 shadow-[0_0_8px_rgba(250,204,21,0.5)]",
  },
} as const;

function HUDOverlay({ accentColor, active }: { accentColor: string; active: boolean }) {
  const [telemetry, setTelemetry] = useState({ x: 0.0, y: 0.0, r: 0 });

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTelemetry({
        x: parseFloat((Math.random() * 100).toFixed(1)),
        y: parseFloat((Math.random() * 100).toFixed(1)),
        r: Math.floor(Math.random() * 80 + 10),
      });
    }, 150);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-3.5 font-mono text-[9px] text-white/90 bg-black/75 backdrop-blur-[1px] transition-all duration-300">
      {/* Grid Scan Effect */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${accentColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${accentColor} 1px, transparent 1px)
          `,
          backgroundSize: '12px 12px'
        }}
      />

      {/* Top HUD Row */}
      <div className="flex justify-between items-center relative z-10">
        <span className="flex items-center gap-1.5">
          <span 
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ 
              backgroundColor: accentColor,
              boxShadow: `0 0 6px ${accentColor}`
            }}
          />
          <span className="tracking-widest uppercase">ROBO_COREROUTINE // RUN</span>
        </span>
        <span className="opacity-80" style={{ color: accentColor }}>RANGE: {telemetry.r}m</span>
      </div>

      {/* Center Target Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="relative w-20 h-20 rounded-full border border-dashed flex items-center justify-center animate-spin"
          style={{ borderColor: `${accentColor}40`, animationDuration: '10s' }}
        >
          <div 
            className="w-12 h-12 rounded-full border flex items-center justify-center"
            style={{ borderColor: `${accentColor}30` }}
          />
          <div 
            className="absolute w-full h-[1px]"
            style={{ backgroundColor: `${accentColor}25` }}
          />
          <div 
            className="absolute h-full w-[1px]"
            style={{ backgroundColor: `${accentColor}25` }}
          />
        </div>
      </div>

      {/* Bottom HUD Row */}
      <div className="flex justify-between items-end relative z-10">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="opacity-60">HUD_GRID: X={telemetry.x} Y={telemetry.y}</span>
          <span className="tracking-wider uppercase" style={{ color: accentColor }}>TELEMETRY: LOADED</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-bold tracking-widest animate-pulse" style={{ color: accentColor }}>ANALYZING...</span>
        </div>
      </div>

      {/* Vertical Sweep Line */}
      <div 
        className="absolute left-0 right-0 h-[1.5px] opacity-80 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 6px ${accentColor}`,
          animation: 'sweep 2.5s linear infinite',
        }}
      />
    </div>
  );
}

export function Projects() {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const navigate = useNavigate();

  const openProject = (project: Project) => {
    if (project.pagePath) {
      navigate({ to: project.pagePath });
      return;
    }

    setSelectedProj(project);
  };

  const selectedTheme = selectedProj ? colorConfig[selectedProj.accent] : null;

  return (
    <section id="projects" className="relative scroll-mt-24 py-32">
      <style>{`
        @keyframes sweep {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="03" label="Builds.Archive" />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-bold sm:text-6xl">
            <span className="gradient-text">Selected</span> <span className="text-neon text-glow-neon">Projects</span>
          </h2>
          <p className="max-w-md font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Real shipped work — from client websites to hardware prototypes. Click a card to boot details.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const theme = colorConfig[p.accent];
            const isHovered = hoveredIdx === i;

            return (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => openProject(p)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
              style={{
                background: theme.cardBg,
                border: `1px solid ${isHovered ? theme.borderHover : theme.border}`,
                boxShadow: isHovered ? theme.shadowHover : theme.shadow,
              }}
            >
              {/* Ambient neon wash */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ backgroundColor: theme.accent }}
              />
              <div
                className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full opacity-20 blur-2xl"
                style={{ backgroundColor: theme.accent }}
              />

              {/* Corner brackets */}
              <span className={`pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 ${theme.corner}`} />
              <span className={`pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 ${theme.corner}`} />
              <span className={`pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 ${theme.corner}`} />
              <span className={`pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 ${theme.corner}`} />

              {/* Image Preview Canvas */}
              <div
                className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-black/40 transition-colors duration-500"
                style={{ border: `1px solid rgba(${theme.accentRgb}, 0.35)` }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: theme.imageOverlay }}
                />
                
                {/* Tech HUD elements */}
                <div className="absolute left-3 top-3 flex gap-1.5 opacity-80 transition-opacity group-hover:opacity-0">
                  <span className={`h-2.5 w-2.5 rounded-full ${theme.bullet}`} />
                  <span
                    className="h-2.5 w-2.5 rounded-full opacity-50"
                    style={{ backgroundColor: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}
                  />
                </div>
                <div
                  className="absolute right-3 top-3 font-mono text-[9px] tracking-wider transition-opacity group-hover:opacity-0"
                  style={{ color: theme.accent }}
                >
                  STATUS: LIVE
                </div>
                
                {/* Hover scanline effect */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(${theme.accentRgb}, 0.06) 3px, rgba(${theme.accentRgb}, 0.06) 4px)`,
                  }}
                />
                
                {/* Robotic Loading HUD Animation */}
                <HUDOverlay accentColor={theme.accent} active={isHovered} />
              </div>

              <div className="flex items-center justify-between">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${theme.textGlow}`}>
                  {p.tag}
                </span>
                <span
                  className="font-mono text-[10px] font-bold"
                  style={{ color: theme.accent }}
                >
                  0{i + 1}
                </span>
              </div>
              
              <h3 
                className="mt-3 font-display text-xl font-semibold transition-all duration-300"
                style={{
                  color: isHovered ? theme.accentLight : "#ffffff",
                  textShadow: isHovered ? `0 0 20px rgba(${theme.accentRgb}, 0.5)` : "none",
                }}
              >
                {p.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[10px] ${theme.stackBadge}`}
                  >
                    {s}
                  </span>
                ))}
                {p.stack.length > 3 && (
                  <span className={`rounded-full border px-2 py-1 font-mono text-[10px] opacity-70 ${theme.stackBadge}`}>
                    +{p.stack.length - 3}
                  </span>
                )}
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal Dialog */}
      <Dialog open={!!selectedProj} onOpenChange={(open) => !open && setSelectedProj(null)}>
        <DialogContent 
          className="glass-strong border text-foreground max-w-2xl font-mono text-xs"
          style={{ borderColor: selectedTheme ? `${selectedTheme.accent}40` : "rgba(255,255,255,0.1)" }}
        >
          {selectedProj && selectedTheme && (
            <>
              <DialogHeader className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest" style={{ color: selectedTheme.accent }}>
                  <span>PROJECT // {selectedProj.tag}</span>
                  <span className="animate-pulse" style={{ color: selectedTheme.accent, textShadow: `0 0 8px ${selectedTheme.accent}` }}>● INITIALIZED</span>
                </div>
                <DialogTitle className="mt-2 font-display text-2xl font-bold text-foreground">
                  {selectedProj.name}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {/* Tech image mockup banner */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/5">
                  <img
                    src={selectedProj.image}
                    alt={selectedProj.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="scan-line absolute inset-0" />
                </div>

                <DialogDescription className="text-muted-foreground leading-relaxed text-xs">
                  {selectedProj.longDesc}
                </DialogDescription>

                {/* Telemetry specs grid */}
                <div className="grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
                  <div>
                    <div className="uppercase tracking-wider font-semibold" style={{ color: selectedTheme.accent }}>{"// System Details"}</div>
                    <div className="mt-2 space-y-1.5">
                      <div>
                        <span className="text-muted-foreground">Role:</span> {selectedProj.details.role}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span> {selectedProj.details.timeline}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tech Core:</span> {selectedProj.details.architecture}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="uppercase tracking-wider font-semibold" style={{ color: selectedTheme.accent }}>{"// Performance Highlights"}</div>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                      {selectedProj.details.highlights.map((h, idx) => (
                        <li key={idx} className="leading-tight">
                          <span className="text-foreground">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4 flex flex-wrap gap-1.5">
                  {selectedProj.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded border px-2 py-0.5 font-mono text-[10px]"
                      style={{
                        backgroundColor: `${selectedTheme.accent}15`,
                        borderColor: `${selectedTheme.accent}30`,
                        color: selectedTheme.accentLight,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
