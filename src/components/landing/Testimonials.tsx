import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { RevealSection } from "@/components/landing/RevealSection";

export function Testimonials() {
  return (
    <RevealSection id="proof" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <TestimonialsCarousel />
      </div>
    </RevealSection>
  );
}
