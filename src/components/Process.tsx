const steps = [
  { num: "01", title: "Requirement Analysis", desc: "Deep discovery sessions to understand your business context, user needs, and technical constraints." },
  { num: "02", title: "Planning", desc: "Architecture design, technology selection, and project roadmap with clear milestones." },
  { num: "03", title: "Development", desc: "Iterative sprints with continuous integration, code reviews, and stakeholder demos." },
  { num: "04", title: "Testing", desc: "Automated and manual QA across devices, performance benchmarks, and security audits." },
  { num: "05", title: "Deployment", desc: "Zero-downtime deployment with monitoring, alerting, and rollback capabilities." },
  { num: "06", title: "Support", desc: "Ongoing maintenance, feature iteration, and dedicated technical support." },
];

const Process = () => (
  <section className="py-24 border-t border-border grid-bg">
    <div className="section-container">
      <h2 className="section-title mb-4">Development Process</h2>
      <p className="section-subtitle mb-16">A deliberate, transparent methodology.</p>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="grid md:grid-cols-12 gap-4 py-8 border-b border-border last:border-b-0"
          >
            <div className="md:col-span-1">
              <span className="font-heading text-2xl font-bold text-primary">{step.num}</span>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-body text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
            {/* Cyan marker */}
            {i < steps.length - 1 && (
              <div className="hidden md:block md:col-span-1">
                <div className="w-px h-full bg-border mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
