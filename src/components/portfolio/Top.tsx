import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight, Check } from "lucide-react";
import { Logo, btnPrimary, btnGhost, Reveal, SectionHead } from "./ui";
import { profile, stats, rotatingWords, marquee } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="flex items-center gap-3" aria-label="Haseeb Nawaz — home">
          <Logo size={36} />
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.14em] text-foreground">HASEEB NAWAZ</span>
            <span className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground">FULL-STACK DEVELOPER</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition hover:text-hover">{l.label}</a>
          ))}
          <a href="#contact" className={btnPrimary + " h-10"}>Let's Talk</a>
        </div>
        <button className="grid size-11 place-items-center rounded-full border border-border md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border md:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-foreground hover:bg-accent">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className={btnPrimary + " mt-2"}>Let's Talk</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Rotator() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.3em] min-w-[12ch] overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span key={i} initial={reduce ? false : { y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? undefined : { y: "-100%", opacity: 0 }} transition={{ duration: 0.45 }} className="text-foreground">
          {rotatingWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d } });
  return (
    <section id="top" className="container-x grid items-center gap-14 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <motion.p {...fade(0)} className="eyebrow">// Freelance Full-Stack Developer</motion.p>
        {profile.availability && <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-foreground" />{profile.availability}</p>}
        <motion.h1 {...fade(0.1)} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
          Making SaaS Ideas Matter in a Noisy Digital World.
        </motion.h1>
        <motion.p {...fade(0.2)} className="mt-6 text-lg text-muted-foreground">
          Building <Rotator />
        </motion.p>
        <motion.p {...fade(0.3)} className="mt-4 max-w-xl text-muted-foreground">
          I build modern websites, full-stack applications, and digital products that help businesses turn ideas into reliable, scalable solutions.
        </motion.p>
        <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className={btnPrimary}>View Projects <ArrowRight className="size-4" /></a>
          <a href="#contact" className={btnGhost}>Get in Touch</a>
        </motion.div>
        <motion.dl {...fade(0.5)} className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-4 first:pl-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-xl font-semibold text-foreground sm:text-2xl">{s.value}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
      <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative mx-auto aspect-square w-full max-w-[420px]">
        <div className="absolute inset-0 rounded-full border border-border" />
        <div className="absolute inset-6 overflow-hidden rounded-full border border-muted-foreground/40 bg-card">
          {profile.profileImage ? (
            <img src={profile.profileImage} alt="Haseeb Nawaz, full-stack developer" className="size-full object-cover " />
          ) : (
            <div className="relative size-full" aria-hidden="true">
              <div className="absolute inset-[18%] rounded-full border border-border" />
              <div className="absolute inset-[34%] rounded-full border border-border" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-border" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-border" />
              <div className="absolute inset-0 grid place-items-center text-6xl font-semibold tracking-tight text-foreground">HN</div>
            </div>
          )}
        </div>
        <span className="absolute left-0 top-[14%] rounded-full border border-border bg-background px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:-left-6">FULL-STACK DEVELOPMENT</span>
        <span className="absolute bottom-[12%] right-0 rounded-full border border-border bg-background px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:-right-4">BUILDING DIGITAL PRODUCTS</span>
      </motion.div>
    </section>
  );
}

export function TechMarquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="group border-y border-border bg-background py-5 mask-fade-x overflow-hidden" aria-label="Technologies">
      <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= marquee.length} className="flex items-center whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="px-6">{t}</span><span className="text-border">•</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  const principles = ["Data-Informed Decisions", "Clean, Maintainable Code", "Transparent Communication", "Reliable Delivery"];
  return (
    <section id="about" className="container-x py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHead label="// About Me" title="Hello, I'm Haseeb Nawaz." sub="Full-Stack Developer Building Practical Digital Products." />
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>I'm a full-stack developer based in {profile.location}, with around a year of hands-on experience building web applications across the MERN stack, Next.js and Python frameworks.</p>
            <p>I enjoy turning ideas into useful websites and products — clean interfaces on the front, dependable APIs and data underneath — and I'm especially interested in SaaS tools and practical AI features.</p>
          </div>
          <ul className="mt-10 grid border-t border-border sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p} className="flex items-center gap-3 border-b border-border py-4 text-foreground">
                <Check className="size-4 text-muted-foreground" /> {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
