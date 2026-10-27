import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <rect x="0.5" y="0.5" width="39" height="39" rx="10" className="fill-primary stroke-border" />
      <path d="M10 11v18M10 20h8M18 11v18M23 29V11l8 18V11" className="stroke-primary-foreground" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="eyebrow">{label}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export const btnPrimary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-hover";
export const btnGhost =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:border-muted-foreground hover:text-hover";
export const card = "rounded-3xl border border-border bg-card";
