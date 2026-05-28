import { motion } from "framer-motion";
import { AnimatedGrid, Particles } from "./Background";
import heroImg from "@/assets/hero-robot.jpg";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-32">
      <AnimatedGrid />
      <Particles count={50} />

      {/* glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-neon/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-cyan-glow/20 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT: Copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-neon"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon glow-neon" />
            NOVA Lab // Anish Jadhav
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            <span className="block gradient-text">BUILDING THE</span>
            <span className="block gradient-text">FUTURE WITH</span>
            <span className="relative block">
              <span className="text-neon text-glow-neon">AI</span>
              <span className="text-foreground/80"> & </span>
              <span className="text-cyan-glow text-glow-cyan">ROBOTICS</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground"
          >
            <span className="text-neon">{">"}</span> Initializing{" "}
            <span className="text-neon text-glow-neon">Anish Abhijeet Jadhav</span>
            {" "}-- 11th-grade student, JEE aspirant, web developer, and robotics innovator engineering the next generation of intelligent machines.
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-neon animate-blink" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#nova"
              className="group relative overflow-hidden rounded-full bg-neon px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:glow-neon"
            >
              Enter NOVA Lab
            </a>
            <a
              href="#projects"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-foreground/90 backdrop-blur transition-all hover:border-cyan-glow hover:text-cyan-glow"
            >
              View Projects
            </a>
          </motion.div>

          {/* Floating dashboard stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-14 grid max-w-2xl grid-cols-3 gap-3"
          >
            {[
              { v: "12+", l: "Projects" },
              { v: "3", l: "Robotics Builds" },
              { v: "AI", l: "Systems by Anish" },
            ].map((s) => (
              <div
                key={s.l}
                className="glass relative overflow-hidden rounded-2xl px-4 py-4"
              >
                <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-neon glow-neon" />
                <div className="font-display text-3xl font-bold text-neon text-glow-neon">{s.v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Robot visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
        >
          {/* Orbit rings */}
          <div className="absolute inset-0 rounded-full border border-neon/15" />
          <div className="absolute inset-6 rounded-full border border-cyan-glow/15" />
          <div className="absolute inset-12 rounded-full border border-neon/10" />

          {/* Robot image */}
          <div className="absolute inset-8 overflow-hidden rounded-full border border-neon/30 glow-neon">
            <div className="scan-line relative h-full w-full">
              <img
                src={heroImg}
                alt="Futuristic AI humanoid robot representing Anish Jadhav's robotics and AI systems"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>

          {/* Orbiting nodes */}
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-orbit" style={{ ["--r" as never]: "220px", ["--d" as never]: "20s" }}>
              <div className="h-3 w-3 rounded-full bg-neon glow-neon" />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-orbit" style={{ ["--r" as never]: "180px", ["--d" as never]: "14s" }}>
              <div className="h-2 w-2 rounded-full bg-cyan-glow glow-cyan" />
            </div>
          </div>

          {/* Floating hologram cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong absolute -left-4 top-12 w-44 rounded-xl p-3 font-mono text-[10px]"
          >
            <div className="mb-1 flex items-center justify-between text-neon">
              <span>NEURAL.CORE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            </div>
            <div className="text-muted-foreground">Status: <span className="text-foreground">ACTIVE</span></div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[87%] bg-gradient-to-r from-neon to-cyan-glow" />
            </div>
            <div className="mt-1 text-right text-muted-foreground">87.2%</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass-strong absolute -right-2 bottom-20 w-40 rounded-xl p-3 font-mono text-[10px]"
          >
            <div className="mb-1 text-cyan-glow">SENSOR.ARRAY</div>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 rounded-sm"
                  style={{
                    background: i < 6 ? "oklch(0.85 0.18 200)" : "oklch(0.85 0.18 200 / 0.2)",
                    boxShadow: i < 6 ? "0 0 4px oklch(0.85 0.18 200)" : undefined,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 text-muted-foreground">06/08 online</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
          <div className="relative h-10 w-6 rounded-full border border-neon/40">
            <div className="absolute left-1/2 top-1 h-2 w-1 -translate-x-1/2 rounded-full bg-neon animate-scroll-down" />
          </div>
        </div>
      </div>
    </section>
  );
}
