import { motion } from "framer-motion";
import { SocialLinks } from "./SocialLinks";

const timeline = [
  { year: "2024", title: "Web Development", desc: "Anish Jadhav started building modern websites with React and Tailwind for real clients." },
  { year: "2025", title: "Robotics Innovator", desc: "Anish won taluka-level science exhibition recognition with a Smart Car Safety System prototype." },
  { year: "2025", title: "NOVA AI Lab", desc: "Founded NOVA -- a personal AI assistant by Anish Jadhav evolving from PC automation to a physical desk robot." },
  { year: "2026", title: "Future Technology Builder", desc: "Anish Abhijeet Jadhav is developing advanced AI interfaces, robotics concepts, and immersive digital experiences through NOVA." },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="01" label="Identity.Anish" />
        <div className="mt-6 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-strong relative h-fit overflow-hidden rounded-3xl p-8"
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-neon">// PROFILE.SYS</span>
                <span className="text-muted-foreground">ID: ANISH-001</span>
              </div>
              <div className="mt-6 flex h-32 w-32 items-center justify-center rounded-2xl border border-neon/30 bg-gradient-to-br from-neon/20 to-cyan-glow/10 glow-neon">
                <span className="font-display text-5xl font-bold text-neon text-glow-neon">A</span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold text-neon text-glow-neon">Anish Abhijeet Jadhav</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-cyan-glow">Student // Innovator // Builder</p>

              <div className="mt-6 space-y-2 font-mono text-xs">
                {[
                  ["status", "ONLINE"],
                  ["grade", "11th"],
                  ["focus", "AI // Robotics // Web"],
                  ["mode", "BUILD/SHIP"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-foreground">{v}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-8 border-t border-white/10 pt-6">
                <SocialLinks />
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I'm <span className="text-neon text-glow-neon">Anish Jadhav</span>, a high-school builder obsessed with the intersection of <span className="text-neon">artificial intelligence</span>, <span className="text-cyan-glow">robotics</span>, and <span className="text-foreground">human-centered design</span>. I ship code, solder circuits, and chase ideas until they breathe.
            </p>

            <div className="relative space-y-8 border-l border-neon/20 pl-8">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[42px] top-1 flex h-5 w-5 items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-neon glow-neon" />
                    <div className="absolute h-5 w-5 rounded-full border border-neon/30" />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-cyan-glow">{t.year}</div>
                  <h4 className="mt-1 font-display text-xl font-semibold">{t.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-neon">[{index}]</span>
      <span className="h-px w-12 bg-gradient-to-r from-neon to-transparent" />
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
    </div>
  );
}
