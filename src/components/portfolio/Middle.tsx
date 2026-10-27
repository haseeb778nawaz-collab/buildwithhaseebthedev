import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Github, Plus, Check } from "lucide-react";
import { Reveal, SectionHead, card, btnPrimary } from "./ui";
import { services, skillGroups, tools, projects, journey, reasons, faqs, type Project } from "@/data/site";

export function ServicesCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);
  const go = useCallback((d: number) => setI((v) => (v + d + services.length) % services.length), []);
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, reduce, go]);
  const s = services[i];
  const Icon = s.icon;
  return (
    <section id="services" className="border-t border-border py-24 md:py-32">
      <div className="container-x">
        <SectionHead label="// Services" title="What I Can Build for You" />
        <div
          role="region" aria-roledescription="carousel" aria-label="Services"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
          onTouchEnd={(e) => { if (touchX.current !== null) { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); } touchX.current = null; }}
          className="select-none"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className={card + " relative min-h-[420px] overflow-hidden p-8 sm:p-12"}>
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={reduce ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -30 }} transition={{ duration: 0.4 }} aria-live="polite">
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl border border-border bg-background"><Icon className="size-6" /></span>
                    <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</span>
                  </div>
                  <p className="mt-10 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{s.name}</h3>
                  <p className="mt-4 max-w-xl text-muted-foreground">{s.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f) => <li key={f} className="flex items-center gap-3 text-sm"><Check className="size-4 text-muted-foreground" />{f}</li>)}
                  </ul>
                  <a href="#contact" className={btnPrimary + " mt-8"}>{s.cta} <ArrowUpRight className="size-4" /></a>
                </motion.div>
              </AnimatePresence>
            </div>
            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {services.map((x, idx) => (
                <li key={x.name}>
                  <button onClick={() => setI(idx)} aria-current={idx === i} aria-label={`Show ${x.name}`}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${idx === i ? "border-muted-foreground bg-card text-foreground" : "border-border text-muted-foreground hover:text-hover"}`}>
                    <x.icon className="size-4 shrink-0" /> {x.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous service" className="grid size-11 place-items-center rounded-full border border-border hover:text-hover"><ChevronLeft className="size-5" /></button>
            <button onClick={() => go(1)} aria-label="Next service" className="grid size-11 place-items-center rounded-full border border-border hover:text-hover"><ChevronRight className="size-5" /></button>
            <div className="flex gap-2" aria-hidden="true">
              {services.map((_, idx) => <span key={idx} className={`h-1 rounded-full transition-all ${idx === i ? "w-8 bg-foreground" : "w-3 bg-border"}`} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="border-t border-border py-24 md:py-32">
      <div className="container-x">
        <SectionHead label="// Expertise" title="Technologies I Work With" />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {skillGroups.map((g, k) => (
            <Reveal key={g.title} delay={k * 0.05} className="bg-background p-8">
              <p className="font-mono text-xs text-muted-foreground">0{k + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{g.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.note}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((it) => <li key={it} className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground">{it}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
        <h3 className="eyebrow mb-6 mt-20">// Tools & Technologies</h3>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tools.map((t) => (
            <li key={t} className="flex h-20 items-center justify-center rounded-2xl border border-border bg-card text-sm font-medium tracking-wide text-muted-foreground transition hover:border-muted-foreground hover:text-hover">{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectImage({ p }: { p: Project }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-background">
      {!failed ? (
        <img src={p.image} alt={`${p.name} — ${p.category} project screenshot`} loading="lazy" decoding="async" onError={() => setFailed(true)}
          className="size-full object-cover grayscale-[40%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5" role="img" aria-label={`${p.name} preview placeholder`}>
          <div className="flex gap-1.5"><span className="size-2 rounded-full bg-border" /><span className="size-2 rounded-full bg-border" /><span className="size-2 rounded-full bg-border" /></div>
          <span className="text-3xl font-semibold tracking-tight text-muted-foreground/60 transition group-hover:text-foreground">{p.name}</span>
          <div className="space-y-2"><div className="h-2 w-2/3 rounded bg-border" /><div className="h-2 w-1/3 rounded bg-border" /></div>
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <section id="projects" className="border-t border-border py-24 md:py-32">
      <div className="container-x">
        <SectionHead label="// Selected Work" title="Portfolio Projects" sub="Projects I've designed and developed to showcase my full-stack development skills." />
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-hover"}`}>{c}</button>
          ))}
        </div>
        <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {list.map((p, k) => (
              <motion.li layout key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`group ${card} p-3 transition hover:border-muted-foreground/50 ${cat === "All" && k === 0 ? "md:col-span-2" : ""}`}>
                <ProjectImage p={p} />
                <div className="p-4">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{p.category}</span><span>{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{t}</span>)}</div>
                  {(p.liveUrl || p.sourceUrl) && (
                    <div className="mt-5 flex gap-4 text-sm">
                      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-hover">Live demo <ArrowUpRight className="size-4" /></a>}
                      {p.sourceUrl && <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-hover"><Github className="size-4" /> Source</a>}
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="border-t border-border py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead label="// Growth Journey" title="My Development Journey" />
        <ol className="relative border-l border-border">
          {journey.map((j, k) => (
            <Reveal key={j.title} delay={k * 0.08} className="relative pb-12 pl-8 last:pb-0">
              <span className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border border-muted-foreground ${k === 0 ? "bg-foreground" : "bg-background"}`} />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{j.when}</p>
              <h3 className="mt-2 text-xl font-semibold">{j.title}</h3>
              <p className="mt-2 text-muted-foreground">{j.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyChooseMe() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="container-x">
        <SectionHead label="// Why Work With Me" title="How I Approach Every Build" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, k) => (
            <Reveal key={r.title} delay={k * 0.06} className={card + " p-7"}>
              <r.icon className="size-5 text-muted-foreground" />
              <h3 className="mt-8 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead label="// FAQ" title="Frequently Asked Questions" />
        <div className="border-t border-border">
          {faqs.map((f, k) => {
            const isOpen = open === k;
            return (
              <div key={f.q} className="border-b border-border">
                <h3>
                  <button id={`faq-b-${k}`} aria-expanded={isOpen} aria-controls={`faq-p-${k}`} onClick={() => setOpen(isOpen ? null : k)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium text-foreground hover:text-hover sm:text-lg">
                    {f.q}
                    <Plus className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-p-${k}`} role="region" aria-labelledby={`faq-b-${k}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="pb-6 pr-10 text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
