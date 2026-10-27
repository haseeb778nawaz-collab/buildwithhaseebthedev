import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Hero, TechMarquee, About } from "@/components/portfolio/Top";
import { ServicesCarousel, Expertise, Projects, Journey, WhyChooseMe, FAQ } from "@/components/portfolio/Middle";
import { Contact, Footer, WhatsAppWidget, AIChatWidget } from "@/components/portfolio/Bottom";
import { profile, socials } from "@/data/site";

const title = "Haseeb Nawaz — Full-Stack & MERN Developer | BuildWithHaseeb";
const description = "Haseeb Nawaz is a full-stack MERN developer in Islamabad building SaaS products, AI integrations, e-commerce and APIs for clients worldwide.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: profile.domain + "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: profile.domain + "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: "Full-Stack Developer",
        email: `mailto:${profile.email}`, url: profile.domain, sameAs: socials.map((s) => s.href),
        address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Navbar />
      <main id="main" className="overflow-x-hidden">
        <Hero />
        <TechMarquee />
        <About />
        <ServicesCarousel />
        <Expertise />
        <Projects />
        <Journey />
        <WhyChooseMe />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
      <AIChatWidget />
    </>
  );
}
