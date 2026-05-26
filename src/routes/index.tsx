import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MouseGlow } from "@/components/portfolio/Background";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Nova } from "@/components/portfolio/Nova";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { pageHeadFromKey } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => pageHeadFromKey("home"),
});

function Index() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <MouseGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Nova />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
