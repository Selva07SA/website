import AnimatedSection from "./AnimatedSection";

const steps = [
  { num: "01", title: "Requirement Analysis", desc: "Deep discovery sessions to understand your business context." },
  { num: "02", title: "Planning", desc: "Architecture design, technology selection, and project roadmap." },
  { num: "03", title: "Development", desc: "Iterative sprints with continuous integration and code reviews." },
  { num: "04", title: "Testing", desc: "Automated and manual QA across devices and security audits." },
  { num: "05", title: "Deployment", desc: "Zero-downtime deployment with monitoring and alerting." },
  { num: "06", title: "Support", desc: "Ongoing maintenance, feature iteration, and dedicated support." },
];

const Process = () => (
  <section className="py-32 bg-foreground text-background">
    <div className="section-container">
      <AnimatedSection>
        <p className="font-body text-sm text-background/50 tracking-widest uppercase mb-4">Our Process</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight mb-20">
          How we work
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {steps.map((step, i) => (
          <AnimatedSection key={step.num} delay={i * 0.1}>
            <div className="relative">
              <span className="font-heading text-xs text-background/30 tracking-widest">{step.num}</span>
              <h3 className="font-heading text-lg font-normal mt-2 mb-3">{step.title}</h3>
              <p className="font-body text-sm text-background/60 leading-relaxed">{step.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
