import { AboutServices } from "@/components/landing/AboutServices";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { MouseTrailSection } from "@/components/landing/MouseTrailSection";
import { Projects } from "@/components/landing/Projects";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <Hero />
      <Marquee />
      <AboutServices />
      <Projects />
      <Testimonials />
      <ContactFooter />
      <MouseTrailSection />
    </main>
  );
}
