import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./About";
import { SOCIAL_LINKS } from "@/lib/socials";

const bootLines = [
  "$ nova --init contact-console",
  "[OK] handshake established · channel: secure",
  "[OK] encryption: AES-256 · latency: 12ms",
  "[OK] awaiting transmission from operator...",
  "Type 'help' to see available cyber-commands.",
];

export function Contact() {
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // CLI States
  const [cliHistory, setCliHistory] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  // Form States
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Boot sequence animation
  useEffect(() => {
    if (!started || lineIdx >= bootLines.length) return;
    const line = bootLines[lineIdx];
    if (typed.length < line.length) {
      const t = setTimeout(() => setTyped(line.slice(0, typed.length + 1)), 20);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCliHistory((prev) => [...prev, line]);
      setLineIdx((i) => i + 1);
      setTyped("");
    }, 250);
    return () => clearTimeout(t);
  }, [typed, lineIdx, started]);

  // Scroll within the terminal panel only — never scroll the document
  useEffect(() => {
    if (!started) return;
    const panel = terminalScrollRef.current;
    if (!panel) return;
    panel.scrollTo({ top: panel.scrollHeight, behavior: "smooth" });
  }, [cliHistory, typed, lineIdx, started]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    let reply: string[] = [];

    if (lowerCmd === "help") {
      reply = [
        `$ ${cmd}`,
        "Available cyber-console commands:",
        "  help      - Print this listing.",
        "  projects  - Inspect currently catalogued projects.",
        "  skills    - Retrieve capability telemetry matrices.",
        "  socials   - Extract Github and LinkedIn profiles.",
        "  location  - Retrieve geographic coordinate sector.",
        "  clear     - Wipe out terminal logs.",
        "  msg [txt] - Pre-fill form payload message box."
      ];
    } else if (lowerCmd === "clear") {
      setCliHistory([]);
      setInputVal("");
      return;
    } else if (lowerCmd === "projects") {
      reply = [
        `$ ${cmd}`,
        "RETRIEVING ARCHIVE BUILDS...",
        "  01. Ecommerce Website [React, Tailwind, Node.js]",
        "  02. Alfabyte Computers [React, Vite, Framer Motion]",
        "  03. Smart Car Safety System [Arduino, C++, Sonar Sensors]"
      ];
    } else if (lowerCmd === "skills") {
      reply = [
        `$ ${cmd}`,
        "LOADING SKILLS MATRIX...",
        "  React      [██████████░░] 92%",
        "  JS/TS      [██████████░░] 90%",
        "  Arduino    [█████████░░░] 85%",
        "  UI/UX      [████████░░░░] 82%",
        "  Robotics   [████████░░░░] 80%",
        "  AI Core    [████████░░░░] 78%"
      ];
    } else if (lowerCmd === "socials") {
      reply = [
        `$ ${cmd}`,
        "EXTRACTING DIRECT CHANNELS...",
        ...SOCIAL_LINKS.map((s) => {
          const path = s.href.trim() ? s.href.replace(/^https?:\/\//, "") : "[pending — edit socials.ts]";
          return `  ${s.label.padEnd(10)} -> ${path}`;
        }),
        "  Email      -> anish.jadhav@example.com",
      ];
    } else if (lowerCmd === "location") {
      reply = [
        `$ ${cmd}`,
        "GEOLOCATION SECTOR:",
        "  Sector -> India [IST / UTC+5:30]"
      ];
    } else if (lowerCmd.startsWith("msg ")) {
      const msgContent = cmd.substring(4);
      setFormMsg(msgContent);
      reply = [
        `$ ${cmd}`,
        `[OK] Pre-filled form message with: "${msgContent}"`
      ];
    } else {
      reply = [
        `$ ${cmd}`,
        `Command not found: '${cmd}'. Type 'help' for system guide.`
      ];
    }

    setCliHistory((prev) => [...prev, ...reply]);
    setInputVal("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="relative scroll-mt-24 overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionLabel index="06" label="Establish.Connection" />
        <h2 className="mt-6 font-display text-5xl font-bold sm:text-6xl">
          <span className="gradient-text">Let's </span>
          <span className="text-cyan-glow text-glow-cyan">Build</span>
          <span className="gradient-text"> Together</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong mt-12 overflow-hidden rounded-2xl border border-neon/20"
        >
          {/* Terminal chrome header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-neon/80 shadow shadow-neon" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              nova_console · /dev/operator
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-neon glow-neon animate-pulse" />
          </div>

          <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
            {/* Left CLI Terminal Console */}
            <div className="flex flex-col h-[380px] bg-black/30 border-b border-white/5 md:border-b-0 md:border-r border-white/10 p-6 font-mono text-[11px] text-muted-foreground">
              <div
                ref={terminalScrollRef}
                className="flex-1 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin"
              >
                {cliHistory.map((l, i) => {
                  let colorClass = "text-muted-foreground";
                  if (l.startsWith("$")) colorClass = "text-neon font-bold";
                  else if (l.startsWith("[OK]")) colorClass = "text-cyan-glow";
                  else if (l.includes("->")) colorClass = "text-foreground";
                  else if (l.includes("██")) colorClass = "text-neon";

                  return (
                    <div key={i} className={`${colorClass} leading-relaxed whitespace-pre-wrap`}>
                      {l}
                    </div>
                  );
                })}

                {/* Simulated typing output for boot sequence */}
                {lineIdx < bootLines.length && (
                  <div
                    className={`min-h-[1.25rem] ${lineIdx === 0 ? "text-neon font-bold" : "text-muted-foreground"}`}
                  >
                    {typed}
                    <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-neon animate-blink" />
                  </div>
                )}

                <div aria-hidden className="h-px shrink-0" />
              </div>

              {/* Terminal command input form */}
              {lineIdx >= bootLines.length && (
                <form onSubmit={handleCommand} className="mt-4 border-t border-white/10 pt-3 flex items-center gap-2">
                  <span className="text-neon font-bold">{">"}</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type 'help'..."
                    autoComplete="off"
                    className="flex-1 bg-transparent text-foreground outline-none border-none placeholder:text-muted-foreground/30 font-mono text-[11px]"
                  />
                  <button type="submit" className="hidden">Submit</button>
                </form>
              )}
            </div>

            {/* Right Standard Form Channel */}
            <form onSubmit={onSubmit} className="space-y-4 p-6 font-mono text-xs flex flex-col justify-between">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-10">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neon/40 bg-neon/10 glow-neon">
                    <span className="text-xl text-neon">✓</span>
                  </div>
                  <div className="text-neon font-bold uppercase tracking-widest">[TRANSMISSION RECEIVED]</div>
                  <div className="mt-2 text-muted-foreground leading-normal">
                    Signal routed to core channels. NOVA will queue your payload. Stand by.
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="block pb-1 text-cyan-glow">{">"} operator.name</label>
                      <input
                        required
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Operator Name"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-foreground outline-none transition-all placeholder:text-muted-foreground/30 focus:border-neon/60 focus:glow-neon font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block pb-1 text-cyan-glow">{">"} operator.email</label>
                      <input
                        required
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="operator@domain.com"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-foreground outline-none transition-all placeholder:text-muted-foreground/30 focus:border-neon/60 focus:glow-neon font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block pb-1 text-cyan-glow">{">"} message.payload</label>
                      <textarea
                        required
                        rows={4}
                        value={formMsg}
                        onChange={(e) => setFormMsg(e.target.value)}
                        placeholder="Initiate transmission signal..."
                        className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-foreground outline-none transition-all placeholder:text-muted-foreground/30 focus:border-neon/60 focus:glow-neon font-mono text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-lg bg-neon px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:glow-neon cursor-pointer mt-2"
                  >
                    Transmit_Signal()
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
