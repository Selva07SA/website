import AnimatedSection from "./AnimatedSection";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32">
      <div className="section-container">
        <AnimatedSection>
          <div className="bg-foreground text-background rounded-3xl px-8 md:px-16 py-20 text-center relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }} />
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight mb-6">
                Let's Build Your Next
                <br />Software Solution
              </h2>
              <p className="font-body text-background/60 text-lg max-w-xl mx-auto mb-10">
                From concept to production — we partner with you at every stage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => scrollTo("contact")}
                  className="bg-background text-foreground font-heading font-normal px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] text-sm inline-flex items-center gap-2 group"
                >
                  Book Free Consultation
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="border border-background/30 text-background font-heading font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-background/10 text-sm"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CtaSection;
