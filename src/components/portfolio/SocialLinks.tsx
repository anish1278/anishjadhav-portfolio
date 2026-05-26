import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, type LucideIcon } from "lucide-react";
import { SOCIAL_LINKS, type SocialPlatform } from "@/lib/socials";

const ICONS: Record<SocialPlatform, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

const STYLES: Record<
  SocialPlatform,
  {
    border: string;
    icon: string;
    hover: string;
    glow: string;
  }
> = {
  github: {
    border: "border-neon/25",
    icon: "text-neon/90",
    hover: "hover:border-neon/55 hover:bg-neon/10 hover:text-neon",
    glow: "hover:shadow-[0_0_28px_rgba(220,38,38,0.35)]",
  },
  linkedin: {
    border: "border-cyan-glow/25",
    icon: "text-cyan-glow/90",
    hover: "hover:border-cyan-glow/55 hover:bg-cyan-glow/10 hover:text-cyan-glow",
    glow: "hover:shadow-[0_0_28px_rgba(34,211,238,0.3)]",
  },
  instagram: {
    border: "border-purple-400/25",
    icon: "text-purple-300/90",
    hover: "hover:border-purple-400/55 hover:bg-purple-500/10 hover:text-purple-200",
    glow: "hover:shadow-[0_0_28px_rgba(192,132,252,0.38)]",
  },
};

type SocialLinksProps = {
  className?: string;
  showLabel?: boolean;
};

export function SocialLinks({ className = "", showLabel = true }: SocialLinksProps) {
  const hasPlaceholder = SOCIAL_LINKS.some((link) => !link.href.trim());

  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <span className="text-neon">// SOCIAL.LINKS</span>
          <span className="text-muted-foreground">UPLINK</span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {SOCIAL_LINKS.map((social, i) => {
          const Icon = ICONS[social.id];
          const theme = STYLES[social.id];
          const ready = Boolean(social.href.trim());
          const shared =
            "group relative flex h-12 w-12 items-center justify-center rounded-xl border bg-black/30 backdrop-blur-sm transition-all duration-300";

          const inner = (
            <>
              <span
                className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${ready ? "bg-gradient-to-br from-white/5 to-transparent" : ""}`}
              />
              <Icon
                className={`relative z-10 h-5 w-5 transition-transform duration-300 ${theme.icon} ${ready ? "group-hover:scale-110" : "opacity-40"}`}
                strokeWidth={1.75}
                aria-hidden
              />
            </>
          );

          if (!ready) {
            return (
              <motion.span
                key={social.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                title={`Add your ${social.label} URL in src/lib/socials.ts`}
                className={`${shared} ${theme.border} cursor-not-allowed opacity-50`}
              >
                {inner}
              </motion.span>
            );
          }

          return (
            <motion.a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3, scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className={`${shared} ${theme.border} ${theme.hover} ${theme.glow}`}
            >
              {inner}
            </motion.a>
          );
        })}
      </div>

      {hasPlaceholder && (
        <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-foreground/80">
          {"// Add missing links in "}
          <span className="text-neon/80">src/lib/socials.ts</span>
        </p>
      )}
    </div>
  );
}
