import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { Mail, ArrowUpRight, MessageCircle, X, Send, CalendarDays } from "lucide-react";
import { Logo, SectionHead, btnPrimary, card } from "./ui";
import { profile, socials, serviceOptions, services, skillGroups, projects } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const input = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-muted-foreground focus:outline-none";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opening" | "opened" | "error">("idle");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) return; // honeypot
    const r = schema.safeParse(Object.fromEntries(fd));
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("opening");
    try {
      const { name, email, service, message } = r.data;
      const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Project enquiry: ${service}`)}&body=${encodeURIComponent(body)}`;
      setTimeout(() => setStatus("opened"), 600);
    } catch {
      setStatus("error");
    }
  }

  const field = (name: keyof Errors, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-muted-foreground">{label}</label>
      {el}
      {errors[name] && <p id={`${name}-err`} className="mt-1.5 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );
  const aria = (n: keyof Errors) => ({ id: n, name: n, "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${n}-err` : undefined });

  return (
    <section id="contact" className="border-t border-border py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHead label="// Get In Touch" title="Let's Work Together" sub="Have an idea for a website, SaaS product, e-commerce experience, or AI integration? Let's discuss what you want to build." />
          <ul className="space-y-3">
            <li><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-foreground hover:text-hover"><Mail className="size-4 text-muted-foreground" />{profile.email}</a></li>
            {socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-muted-foreground hover:text-hover"><ArrowUpRight className="size-4" />{s.label}</a></li>
            ))}
          </ul>
          <div className={card + " mt-10 p-6"}>
            {profile.calendlyUrl ? (
              <iframe src={profile.calendlyUrl} title="Book a call with Haseeb" className="h-[600px] w-full rounded-2xl" loading="lazy" />
            ) : (
              <div className="flex items-start gap-4">
                <CalendarDays className="mt-0.5 size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Call booking coming soon</p>
                  <p className="mt-1 text-sm text-muted-foreground">Online scheduling isn't set up yet — send a message and we'll arrange a time.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={submit} noValidate className={card + " space-y-5 p-6 sm:p-8"}>
          {field("name", "Name", <input {...aria("name")} autoComplete="name" className={input} placeholder="Your name" />)}
          {field("email", "Email", <input {...aria("email")} type="email" autoComplete="email" className={input} placeholder="you@company.com" />)}
          {field("service", "Service", (
            <select {...aria("service")} defaultValue="" className={input}>
              <option value="" disabled>Select a service</option>
              {serviceOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          ))}
          {field("message", "Message", <textarea {...aria("message")} rows={5} className={input} placeholder="Tell me about your project" />)}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <button type="submit" disabled={status === "opening"} className={btnPrimary + " w-full disabled:opacity-60"}>
            {status === "opening" ? "Opening your email app…" : <>Send via email <Send className="size-4" /></>}
          </button>
          <p className="text-xs text-muted-foreground" role="status">
            {status === "opened" && "Your email app should now have a draft ready — press send there to reach me. If nothing opened, email me directly at " + profile.email + "."}
            {status === "error" && "Couldn't open your email app. Please email " + profile.email + " directly."}
            {status === "idle" && "This form prepares an email in your own email app; nothing is sent until you press send there."}
          </p>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-x py-24 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Ready to Turn Your Idea Into a Digital Product?</h2>
        <a href="#contact" className={btnPrimary + " mt-10"}>Let's Talk <ArrowUpRight className="size-4" /></a>
      </div>
      <div className="container-x flex flex-col gap-8 border-t border-border py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <div>
            <p className="font-semibold">{profile.brand}</p>
            <p className="text-sm text-muted-foreground">Full-stack developer building websites, SaaS and AI-powered products.</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li><a href={`mailto:${profile.email}`} className="hover:text-hover">Email</a></li>
          {socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-hover">{s.label}</a></li>)}
        </ul>
      </div>
      <p className="container-x pb-28 text-xs text-muted-foreground">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  );
}

export function WhatsAppWidget() {
  return (
    <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 left-5 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card pl-1.5 pr-4 text-sm text-foreground shadow-lg transition hover:text-hover">
      <span className="grid size-9 place-items-center rounded-full bg-whatsapp text-background">
        <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" /></svg>
      </span>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}

type Msg = { from: "bot" | "user"; text: string };
function answer(q: string): string {
  const s = q.toLowerCase();
  if (/project|work|portfolio/.test(s)) return `Haseeb has ${projects.length} portfolio projects, including ${projects.slice(0, 4).map((p) => p.name).join(", ")} and more. See the Projects section.`;
  if (/skill|stack|tech|react|node|python/.test(s)) return "Main stack: " + skillGroups.flatMap((g) => g.items).slice(0, 12).join(", ") + ".";
  if (/service|build|offer|saas|ai|shop|commerce|api/.test(s)) return "Services: " + services.map((x) => x.name).join(", ") + ".";
  if (/price|cost|rate|budget/.test(s)) return "Pricing depends on scope. Share your requirements through the contact form and Haseeb will reply with an estimate.";
  if (/contact|email|hire|whatsapp|reach/.test(s)) return `Email ${profile.email}, use the contact form, or tap the WhatsApp button.`;
  if (/experience|year/.test(s)) return "Haseeb has about one year of hands-on full-stack development experience.";
  return "I can answer questions about projects, skills, services, pricing and contact details. Try one of those!";
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hi! I'm a assistant with pre-written answers about Haseeb's portfolio, services and contact details. Ask away." }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  // useEffect(() => end.current?.scrollIntoView({ block: "end" }), [msgs, typing]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  function send(e: FormEvent) {
    e.preventDefault();
    const q = text.trim().slice(0, 500);
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setText("");
    setTyping(true);
    setTimeout(() => { setMsgs((m) => [...m, { from: "bot", text: answer(q) }]); setTyping(false); }, 500);
  }
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label="Portfolio assistant" initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }}
            className="fixed bottom-24 right-4 z-50 flex h-[480px] max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:right-5 sm:w-[350px]">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-sm font-semibold">Portfolio Assistant</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Pre-written answers</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="grid size-9 place-items-center rounded-full hover:bg-accent"><X className="size-4" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
              {msgs.map((m, i) => (
                <p key={i} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "ml-auto bg-primary text-primary-foreground" : "border border-border bg-background text-foreground"}`}>{m.text}</p>
              ))}
              {typing && <p className="text-xs text-muted-foreground">Typing…</p>}
              <div ref={end} />
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <label htmlFor="chat-in" className="sr-only">Your question</label>
              <input id="chat-in" value={text} onChange={(e) => setText(e.target.value)} maxLength={500} placeholder="Ask about projects, skills…" className="flex-1 rounded-full border border-border bg-background px-4 text-sm focus:border-muted-foreground focus:outline-none" />
              <button aria-label="Send message" className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-hover"><Send className="size-4" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"} aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full border border-border bg-primary text-primary-foreground shadow-lg transition hover:bg-hover">
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>
    </>
  );
}
