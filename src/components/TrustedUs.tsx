import AnimatedSection from "./AnimatedSection";

const logos = [
  "Acme Corp",
  "Nova Labs",
  "Vertex Systems",
  "BlueWave",
  "NexaWorks",
  "CloudNine",
  "Pioneer",
  "BrightBridge",
];

const TrustedUs = () => (
  <section aria-label="Trusted by" className="py-20 bg-background">
    <div className="section-container">
      <AnimatedSection>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">Trusted By</p>
        <h2 className="section-title mb-10">Teams that trust us</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="relative overflow-hidden">
          <div className="marquee flex w-max items-center gap-6 py-8 px-0 animate-marquee motion-reduce:animate-none">
            {[...logos, ...logos].map((name, idx) => (
              <div
                key={`${name}-${idx}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-background shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-foreground/90 text-background flex items-center justify-center font-heading text-sm">
                  {name.slice(0, 1).toUpperCase()}
                </div>
                <span className="font-body text-sm text-foreground whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustedUs;
