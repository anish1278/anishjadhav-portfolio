import { motion } from "framer-motion";
import { SectionLabel } from "./About";

const achievements = [
  {
    year: "2025",
    title: "Taluka-Level Science Exhibition",
    desc: "Recognized for the Smart Car Safety System — an Arduino-driven prototype for real-time driver assistance.",
    badge: "AWARD",
  },
  {
    year: "2025",
    title: "Real Client Websites Delivered",
    desc: "Designed, built, and shipped production websites for real businesses including Alfabyte Computers.",
    badge: "SHIPPED",
  },
  {
    year: "2025",
    title: "NOVA AI Lab Founded",
    desc: "Launched a personal R&D lab to evolve NOVA from a software assistant into a physical desk robot.",
    badge: "LAUNCH",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="05" label="Milestones.Log" />
        <h2 className="mt-6 font-display text-5xl font-bold sm:text-6xl">
          <span className="text-neon text-glow-neon">Achievements</span>
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-neon/40 hover:glow-neon"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-neon/10 blur-2xl transition-all group-hover:bg-neon/20" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-glow">{a.year}</span>
                  <span className="rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neon">
                    {a.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold transition-colors group-hover:text-neon">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
