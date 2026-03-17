import type { CSSProperties } from "react";
import AnimatedSection from "./AnimatedSection";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Problem transformed our entire operations stack. Their CRM integration alone saved us 200+ hours per quarter.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "NovaTech Industries",
  },
  {
    quote: "The team's technical depth is exceptional. They didn't just build what we asked for - they delivered something far better.",
    name: "Marcus Rodriguez",
    title: "CTO",
    company: "Meridian Health",
  },
  {
    quote: "From initial requirements to production deployment in 12 weeks. Their process is rigorous and genuinely collaborative.",
    name: "Anika Patel",
    title: "Director of Engineering",
    company: "UrbanGrid Solutions",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-32 bg-muted/30">
    <div className="section-container">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="section-title">What our clients say</h2>
        </div>
      </AnimatedSection>

      {/* Mobile: static grid */}
      <div className="grid md:hidden gap-8">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.15}>
            <div className="bg-background rounded-2xl p-8 h-full flex flex-col border border-border">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="fill-foreground text-foreground" />
                ))}
              </div>
              <blockquote className="font-body text-foreground leading-relaxed mb-8 flex-1 text-sm">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="font-heading text-sm font-normal text-foreground">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-sm font-normal text-foreground">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Desktop: auto-moving marquee (to the right) */}
      <AnimatedSection delay={0.1}>
        <div className="hidden md:block relative overflow-hidden">
          <div
            className="flex w-max gap-8 animate-marquee-right"
            style={{ "--marquee-duration": "26s" } as CSSProperties}
          >
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div key={`${t.name}-${idx}`} className="w-[360px] bg-background rounded-2xl p-8 border border-border">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="fill-foreground text-foreground" />
                  ))}
                </div>
                <blockquote className="font-body text-foreground leading-relaxed mb-8 text-sm">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-heading text-sm font-normal text-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading text-sm font-normal text-foreground">{t.name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default Testimonials;

