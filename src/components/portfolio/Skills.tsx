import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./About";

type Skill = {
  name: string;
  key: string;
  level: number;
  description: string;
};

const skills: Skill[] = [
  { name: "React", key: "React", level: 92, description: "Advanced single page apps, state routers, custom hooks & performance optimization." },
  { name: "JavaScript", key: "JS", level: 90, description: "Modern ES6+, asynchronous programming, web APIs, and Node backend servers." },
  { name: "Web Development", key: "Web", level: 88, description: "Production deployments, semantic HTML, layout systems, and responsive design systems." },
  { name: "UI / UX", key: "UI", level: 82, description: "Futuristic dashboard layouts, interactive user funnels, typography, and color spaces." },
  { name: "Arduino", key: "Arduino", level: 85, description: "Embedded hardware systems, sensor telemetry loops, and automated servo controllers." },
  { name: "Robotics", key: "Robotics", level: 80, description: "Cyber-physical system designs, automated path loops, and hardware exhibitions." },
  { name: "AI Concepts", key: "AI", level: 78, description: "LLM integration, API pipelines, custom agents, prompts engineering, and PC automation script nodes." },
];

const orbiting = ["React", "JS", "AI", "Arduino", "UI", "Web", "Robotics"];

export function Skills() {
  const [activeSkillKey, setActiveSkillKey] = useState<string | null>(null);

  // Helper to find skill details by orbiting key
  const activeSkill = skills.find((s) => s.key === activeSkillKey);

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="04" label="Skill.Matrix" />
        <h2 className="mt-6 font-display text-5xl font-bold sm:text-6xl">
          <span className="gradient-text">Capability</span> <span className="text-cyan-glow text-glow-cyan">Stack</span>
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Orbit Visualizer */}
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div className="absolute inset-0 rounded-full border border-neon/15" />
            <div className="absolute inset-10 rounded-full border border-cyan-glow/15" />
            <div className="absolute inset-20 rounded-full border border-neon/10" />

            {/* Core center node */}
            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon/40 bg-background/80 backdrop-blur glow-neon">
              <div className="text-center">
                <div className="font-mono text-[9px] uppercase tracking-widest text-cyan-glow">CORE</div>
                <div className="mt-1 font-display text-2xl font-bold text-glow-neon text-neon">ANISH</div>
                {activeSkillKey && (
                  <div className="mt-1 font-mono text-[8px] uppercase text-cyan-glow animate-pulse">
                    [{activeSkillKey}]
                  </div>
                )}
              </div>
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-neon/40" />
            </div>

            {/* Orbiting skill chips */}
            {orbiting.map((s, i) => {
              const radius = i % 2 === 0 ? 180 : 140;
              const duration = 16 + i * 2;
              const reverse = i % 2 === 1;
              const isActive = activeSkillKey === s;
              
              return (
                <div
                  key={s}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{
                    transform: `rotate(${(360 / orbiting.length) * i}deg)`,
                  }}
                >
                  <div
                    className="animate-orbit"
                    style={{
                      ["--r" as never]: `${radius}px`,
                      ["--d" as never]: `${duration}s`,
                      animationDirection: reverse ? "reverse" : "normal",
                      animationPlayState: activeSkillKey ? "paused" : "running",
                    }}
                  >
                    <button
                      onMouseEnter={() => setActiveSkillKey(s)}
                      onMouseLeave={() => setActiveSkillKey(null)}
                      onClick={() => setActiveSkillKey(activeSkillKey === s ? null : s)}
                      className={`glass-strong cursor-pointer -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                        isActive
                          ? "border-neon text-neon glow-neon scale-110"
                          : "border-neon/20 text-foreground/80 hover:border-cyan-glow hover:text-cyan-glow"
                      }`}
                    >
                      {s}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bar Dashboard and Description console */}
          <div className="space-y-4">
            {/* Top Telemetry Display */}
            <div className="glass rounded-xl p-4 font-mono text-[11px] text-muted-foreground border-l-2 border-cyan-glow">
              {activeSkill ? (
                <div>
                  <div className="flex items-center justify-between text-neon font-bold uppercase tracking-widest">
                    <span>SYSTEM CORE: {activeSkill.name}</span>
                    <span>TELEMETRY ACTIVE</span>
                  </div>
                  <div className="mt-2 text-foreground leading-relaxed text-xs">
                    {activeSkill.description}
                  </div>
                </div>
              ) : (
                <div className="animate-pulse">
                  {"> Hover an orbiting cybernode to inspect capabilities and retrieve live telemetry details..."}
                </div>
              )}
            </div>

            {/* Capability Bars */}
            <div className="space-y-3">
              {skills.map((s, i) => {
                const isActive = activeSkillKey === s.key;
                return (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    onMouseEnter={() => setActiveSkillKey(s.key)}
                    onMouseLeave={() => setActiveSkillKey(null)}
                    className={`glass rounded-xl p-4 transition-all duration-300 ${
                      isActive ? "border-neon/60 bg-neon/5 scale-[1.02] shadow-md shadow-neon/5" : "border-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className={`transition-colors ${isActive ? "text-neon font-bold" : "text-foreground"}`}>
                        {s.name}
                      </span>
                      <span className={`transition-colors ${isActive ? "text-neon" : "text-muted-foreground"}`}>
                        {s.level}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.06, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${
                          isActive ? "from-neon via-neon to-cyan-glow" : "from-neon/70 to-cyan-glow/70"
                        }`}
                        style={{
                          boxShadow: isActive ? "0 0 12px oklch(0.62 0.25 25)" : "0 0 4px oklch(0.62 0.25 25 / 0.3)",
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
