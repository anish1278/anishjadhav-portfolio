import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./About";
import novaImg from "@/assets/nova-robot.jpg";

type Hotspot = {
  id: string;
  x: string;
  y: string;
  title: string;
  desc: string;
};

const hotspots: Hotspot[] = [
  {
    id: "lidar",
    x: "50%",
    y: "14%",
    title: "LiDAR Spatial Scanner",
    desc: "Active proximity ranging system mapping the surrounding environment for collision avoidance."
  },
  {
    id: "oled",
    x: "50%",
    y: "32%",
    title: "OLED Face Matrix",
    desc: "High-contrast micro-display rendering dynamic facial graphics and communication status."
  },
  {
    id: "core",
    x: "52%",
    y: "54%",
    title: "Neural Compute Core",
    desc: "Onboard ESP32 microprocessor routing telemetry and handling physical kinematics."
  },
  {
    id: "servos",
    x: "34%",
    y: "75%",
    title: "Kinematic Servos",
    desc: "Three high-precision metal-gear micro servos directing fluid 3-axis physical motion."
  }
];

const simulatorResponses: Record<string, string> = {
  "Hey NOVA, what is your purpose?": "Greetings operator. I am a personal desk companion designed by Anish. I operate at the intersection of voice control, PC task automation, and physical servo movements. I am currently in Phase 03 R&D!",
  "Show telemetry status.": "Core: Active. Lidar sweep: Nominal. CPU: 42.7°C. Servos: Calibrated. Local PC link: Established.",
  "What is your hardware stack?": "ESP32 micro-core, three MG90S servos, 1.3\" OLED display, ultrasonic transducer array, and custom PCB housing.",
  "Tell me a joke.": "Why did the robot go to therapy? Because it had too many unresolved exceptions. Ha... Ha... Ha..."
};

export function Nova() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [activeTab, setActiveTab] = useState<"evolution" | "simulator">("evolution");
  
  // Simulator Chat States
  const [messages, setMessages] = useState<{ sender: "user" | "nova"; text: string }[]>([
    { sender: "nova", text: "NOVA Lab // Anish Jadhav online. Select a query chip to interface with NOVA." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const triggerSimResponse = (query: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setIsTyping(true);

    setTimeout(() => {
      const reply = simulatorResponses[query] || "Signal unrecognized. Please select a valid preset query.";
      setMessages((prev) => [...prev, { sender: "nova", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="nova" className="relative scroll-mt-24 overflow-hidden py-32">
      {/* Cinematic gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-neon/[0.03] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionLabel index="02" label="NOVA.Anish" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-6 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <h2 className="font-display text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
              <span className="text-cyan-glow text-glow-cyan">NOVA</span>{" "}
              <span className="gradient-text">AI LAB</span>
            </h2>
            <p className="mt-4 max-w-2xl font-mono text-sm uppercase tracking-widest text-muted-foreground">
              AI Systems by Anish Abhijeet Jadhav -- from software to silicon.
            </p>
          </div>
          <div className="glass rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-neon border border-neon/45 glow-neon">
            ● Live · Evolving
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT: Visual Blueprint with Hotspots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="glass-strong relative overflow-hidden rounded-3xl p-2 border border-neon/20">
              <div className="scan-line relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={novaImg}
                  alt="NOVA desk robot prototype by Anish Jadhav with holographic display"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                
                {/* Hotspot indicators overlays */}
                {hotspots.map((hs) => (
                  <button
                    key={hs.id}
                    onMouseEnter={() => setActiveHotspot(hs)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
                    className="absolute z-30 h-6 w-6 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    style={{ top: hs.y, left: hs.x }}
                  >
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-neon" />
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-neon/60 bg-background/80 hover:bg-neon transition-colors duration-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-sm shadow-neon" />
                    </span>
                  </button>
                ))}

                {/* Hotspot details overlay tooltip */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="glass-strong absolute inset-x-4 bottom-16 z-40 rounded-xl border border-neon/50 p-4 font-mono text-[10px]"
                    >
                      <div className="text-neon font-bold uppercase tracking-wider">
                        {`[SYSTEM NODE]: ${activeHotspot.title}`}
                      </div>
                      <p className="mt-1 text-[11px] text-foreground leading-normal">
                        {activeHotspot.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent pointer-events-none" />

                {/* HUD overlays */}
                <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-neon">
                  ◉ REC · NOVA_PROTOTYPE_v3
                </div>
                <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-cyan-glow">
                  CAM_01 · 24.06fps
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] text-foreground/80 pointer-events-none">
                  <div>
                    <div className="text-muted-foreground">SUBJECT</div>
                    <div className="text-neon">NOVA // Anish Jadhav</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">CORE TEMP</div>
                    <div className="text-cyan-glow">42.7°C · NOMINAL</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover instruction */}
            <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {"[Hover the flashing nodes to inspect mechanical blueprints]"}
            </div>
          </motion.div>

          {/* RIGHT: Tabbed Control Panel (Evolution vs. Chat Simulator) */}
          <div className="flex flex-col h-full space-y-4">
            {/* Tabs Trigger bar */}
            <div className="flex rounded-xl bg-black/40 border border-white/5 p-1 font-mono text-[10px] uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("evolution")}
                className={`flex-1 rounded-lg py-2 transition-all cursor-pointer ${
                  activeTab === "evolution"
                    ? "bg-neon/15 text-neon border border-neon/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                // 01. Evolution Logs
              </button>
              <button
                onClick={() => setActiveTab("simulator")}
                className={`flex-1 rounded-lg py-2 transition-all cursor-pointer ${
                  activeTab === "simulator"
                    ? "bg-neon/15 text-neon border border-neon/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                // 02. Voice Core Sim
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 min-h-[350px]">
              <AnimatePresence mode="wait">
                {activeTab === "evolution" ? (
                  <motion.div
                    key="evolution"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-3"
                  >
                    {[
                      {
                        phase: "PHASE 01",
                        title: "PC Automation",
                        desc: "NOVA started as a Python-powered desktop AI that automated daily PC tasks — voice control, scheduling, file ops, and natural language commands.",
                        status: "SHIPPED",
                      },
                      {
                        phase: "PHASE 02",
                        title: "Conversational Core",
                        desc: "Upgraded with LLM-driven dialogue, contextual memory, and skill plugins. NOVA learned to think before it acted.",
                        status: "EVOLVING",
                      },
                      {
                        phase: "PHASE 03",
                        title: "Physical Desk Robot",
                        desc: "Migrating NOVA into hardware — a desk companion with servos, sensors, expressive eyes, and an on-board AI brain. Software meets silicon.",
                        status: "IN R&D",
                      },
                    ].map((p, i) => (
                      <div
                        key={p.title}
                        className="glass group relative overflow-hidden rounded-2xl p-5 transition-all hover:border-neon/40"
                      >
                        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-neon via-cyan-glow to-transparent opacity-50" />
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-glow">{p.phase}</span>
                          <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${
                            p.status === "SHIPPED" ? "border-neon/40 text-neon" :
                            p.status === "EVOLVING" ? "border-cyan-glow/40 text-cyan-glow" :
                            "border-yellow-500/40 text-yellow-400"
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        <h4 className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-neon">{p.title}</h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="simulator"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="glass-strong h-full flex flex-col rounded-2xl border border-neon/20 p-5 font-mono text-xs"
                  >
                    {/* Chat console feed */}
                    <div className="flex-1 min-h-[220px] max-h-[260px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                      {messages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                        >
                          <span className="text-[9px] text-muted-foreground uppercase mb-1">
                            {m.sender === "user" ? "Operator" : "NOVA_v3"}
                          </span>
                          <div
                            className={`rounded-xl px-3 py-2 max-w-[85%] leading-relaxed ${
                              m.sender === "user"
                                ? "bg-neon/10 border border-neon/30 text-neon"
                                : "bg-white/5 border border-white/10 text-foreground"
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex flex-col items-start">
                          <span className="text-[9px] text-muted-foreground uppercase mb-1">NOVA_v3</span>
                          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-muted-foreground flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preset query chips */}
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-2">// Select Transmission Probe</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(simulatorResponses).map((q) => (
                          <button
                            key={q}
                            disabled={isTyping}
                            onClick={() => triggerSimResponse(q)}
                            className="rounded-full bg-black/45 border border-white/10 hover:border-neon hover:text-neon px-3 py-1.5 text-[9px] uppercase tracking-wider text-muted-foreground transition-all cursor-pointer disabled:opacity-50"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
