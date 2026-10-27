import {
  Layers, Code2, Sparkles, ShoppingBag, Plug, Wrench,
  Target, FileCode2, MessageSquare, Gauge,
} from "lucide-react";

/** Central profile config. Leave optional URLs empty ("") to hide them in the UI. */
export const profile = {
  brand: "BuildWithHaseeb",
  name: "Haseeb Nawaz",
  title: "Full-Stack Developer | MERN Stack Developer",
  tagline: "I Build SaaS & AI Products That Scale",
  location: "Islamabad, Pakistan",
  email: "haseeb778nawaz@gmail.com",
  domain: "https://buildwithhaseebthedev.vercel.app",
  whatsapp: "https://wa.me/923105837845",
  profileImage: "/images/projects/profile.jpg", // e.g. "/images/profile.jpg"
  resumeUrl: "/images/projects/Haseeb_Nawaz_Resume (1).pdf",
  calendlyUrl: "", // e.g. "https://calendly.com/your-handle/intro"
  availability: "", // e.g. "Available for new projects" — leave empty to hide
};

export const socials = [
  { label: "GitHub", href: "https://github.com/haseeb778nawaz-collab/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-haseeb-nawaz-61356542b/" },
  { label: "Fiverr", href: "https://www.fiverr.com/muhammadnawaz13" },
  // Add more: { label: "X", href: "https://x.com/..." }
].filter((s) => s.href);

export const stats = [
  { value: "9", label: "Portfolio projects" },
  { value: "~1 yr", label: "Hands-on experience" },
  { value: "Full-stack", label: "Development focus" },
];

export const rotatingWords = ["MERN Stack", "SaaS Applications", "AI Integrations", "E-commerce", "API Development"];

export const marquee = ["React.js", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "SaaS", "AI Integration", "Stripe", "Vercel", "Shopify"];

export const services = [
  { icon: Layers, label: "Custom Build", name: "SaaS Development", cta: "Discuss a SaaS idea",
    desc: "Build web-based products with structured interfaces, authentication, data management, and application workflows where required.",
    features: ["Product dashboards", "Authentication and user roles", "Database-backed workflows"] },
  { icon: Code2, label: "Full-Stack JS", name: "MERN Stack Applications", cta: "Plan an application",
    desc: "Develop full-stack JavaScript applications using React, Node.js, Express, and MongoDB.",
    features: ["Responsive React interfaces", "REST API integration", "Database-backed application logic"] },
  { icon: Sparkles, label: "API Integration", name: "AI Integration", cta: "Explore AI features",
    desc: "Integrate suitable AI APIs into web applications to support chat, content workflows, knowledge retrieval, and business automation.",
    features: ["AI chat interfaces", "API integrations", "Workflow automation"] },
  { icon: ShoppingBag, label: "Storefronts", name: "E-commerce Development", cta: "Talk about your store",
    desc: "Build and improve e-commerce experiences, including custom storefronts and relevant platform integrations.",
    features: ["Product catalogue interfaces", "Cart and checkout integrations", "Order and inventory workflows"] },
  { icon: Plug, label: "Backend", name: "API Development", cta: "Scope an API",
    desc: "Build and integrate APIs that connect application interfaces, databases, and third-party services.",
    features: ["REST endpoints", "Validation and error handling", "External API integration"] },
  { icon: Wrench, label: "Performance Focus", name: "Website Development & Maintenance", cta: "Improve your website",
    desc: "Build, redesign, maintain, and optimize business websites.",
    features: ["Responsive layouts", "Performance improvements", "Bug fixes and ongoing maintenance"] },
];

export const skillGroups = [
  { title: "Frontend", note: "Interfaces that are responsive, accessible and fast.", items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Backend", note: "APIs and server logic in JavaScript and Python.", items: ["Node.js", "Express.js", "Python", "Django", "Flask", "REST APIs"] },
  { title: "Database", note: "Modelling and querying application data.", items: ["MongoDB", "Mongoose", "SQL"] },
  { title: "Frameworks & Integrations", note: "Shipping, payments and AI features.", items: ["Next.js", "Stripe integrations", "OpenAI API integrations", "Vercel deployment", "Git and GitHub"] },
];

export const tools = ["React", "Next.js", "Node.js", "MongoDB", "Vercel", "Stripe", "OpenAI", "GitHub", "Figma", "Shopify", "Python", "Django", "Flask"];

export type Project = {
  slug: string; name: string; category: string; description: string; tags: string[];
  image: string; liveUrl?: string; sourceUrl?: string;
};

/** Add verified liveUrl / sourceUrl values to show links. Empty values are hidden. */
export const projects: Project[] = [
  { slug: "novapay", name: "NovaPay", category: "Fintech", description: "A fintech and payments product with a focus on clear money-movement interfaces.", tags: ["React", "Fintech UI"], image: "/images/projects/novapay.png" },
  { slug: "luma-stay", name: "Luma Stay", category: "Travel", description: "A luxury travel and accommodation website presenting stays with an editorial feel.", tags: ["React", "Responsive"], image: "/images/projects/luma-stay.png" },
  { slug: "savora", name: "Savora", category: "Food", description: "A food-related web product built around browsing and discovery.", tags: ["React", "UI Design"], image: "/images/projects/savora.png" },
  { slug: "fitpulse", name: "FitPulse", category: "Wellness", description: "A fitness and wellness web product for presenting programs and routines.", tags: ["React", "Responsive"], image: "/images/projects/fitpulse.png" },
  { slug: "kora", name: "Kora", category: "E-commerce", description: "A full-stack e-commerce store with product listing and shopping flows.", tags: ["MERN", "E-commerce"], image: "/images/projects/kora.png" },
  { slug: "verdant", name: "Verdant", category: "Nursery", description: "A sustainability and nature-themed website.", tags: ["React", "Mern"], image: "/images/projects/verdant.png" },
  { slug: "aurelia-escapes", name: "Aurelia Escapes", category: "Travel", description: "A luxury travel website showcasing curated destinations.", tags: ["React", "Responsive"], image: "/images/projects/aurelia-escapes.png" },
  { slug: "ripple-social", name: "Ripple Social", category: "Social", description: "A social platform exploring feeds and profiles.", tags: ["React", "Mern"], image: "/images/projects/ripple-social.png" },
  { slug: "stackit", name: "StackIt.io", category: "SaaS", description: "A project management SaaS for organising tasks and teams.", tags: ["SaaS", "Dashboard"], image: "/images/projects/stackit.png" },
];

export const journey = [
  { when: "Current", title: "Full-Stack Development & Independent Projects", body: "Building full-stack web applications and taking on independent freelance work." },
  { when: "~1 year", title: "Hands-on Development Experience", body: "Roughly a year of practical work across frontend and backend development." },
  { when: "Ongoing", title: "Learning Modern Frontend & Backend", body: "Applying React, Node.js, Express, MongoDB, Next.js and Python frameworks in real builds." },
  { when: "Ongoing", title: "Portfolio Projects & Client-Facing Skills", body: "Shipping portfolio projects and improving scoping, communication and delivery." },
];

export const reasons = [
  { icon: Target, title: "Practical Problem-Solving", body: "Focus on the actual business problem instead of adding unnecessary complexity." },
  { icon: FileCode2, title: "Maintainable Development", body: "Understandable, organised code that can be improved over time." },
  { icon: MessageSquare, title: "Clear Communication", body: "Project scope, requirements and technical trade-offs kept understandable." },
  { icon: Gauge, title: "Responsive & Performance-Aware", body: "Interfaces that work across devices, with attention to performance and accessibility." },
];

export const faqs = [
  { q: "What types of websites and applications do you build?", a: "Business websites, full-stack web applications, SaaS-style dashboards, e-commerce storefronts, and apps that integrate third-party or AI APIs." },
  { q: "Can you build a complete full-stack application?", a: "Yes. I work across the frontend (React, Next.js), backend (Node.js, Express, Python) and database (MongoDB, SQL), so I can take a project from interface to API to data." },
  { q: "Can you integrate AI APIs into an existing website?", a: "Yes, where it makes sense. I can add features like chat interfaces or content workflows using APIs such as OpenAI, with keys kept securely on the server." },
  { q: "Can you redesign or improve an existing website?", a: "Yes. I can review your current site and work on layout, responsiveness, performance and bug fixes." },
  { q: "How does your development process work?", a: "We start by clarifying goals and scope, then I propose an approach, build in reviewable steps, share progress regularly, and refine based on your feedback." },
  { q: "How do we discuss project requirements and pricing?", a: "Send a message with what you want to build. Pricing depends on scope, so we'll discuss requirements first and agree on an estimate before work starts." },
  { q: "Can you maintain or improve an existing application?", a: "Yes. I can help with fixes, feature additions and improvements, after first reviewing the codebase to understand how it's built." },
  { q: "How can I contact you?", a: "Use the contact form, email haseeb778nawaz@gmail.com, message on WhatsApp, or reach out through LinkedIn or Fiverr." },
];

export const serviceOptions = ["Business Website", "Full-Stack Application", "SaaS Development", "E-commerce", "AI Integration", "API Integration", "Website Maintenance", "Other"];
