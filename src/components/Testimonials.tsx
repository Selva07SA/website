const testimonials = [
  {
    quote: "Problem Info Tech transformed our entire operations stack. Their CRM integration alone saved us 200+ hours per quarter in manual data entry.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "NovaTech Industries",
  },
  {
    quote: "The team's technical depth is exceptional. They didn't just build what we asked for — they challenged our assumptions and delivered something far better.",
    name: "Marcus Rodriguez",
    title: "CTO",
    company: "Meridian Health",
  },
  {
    quote: "From initial requirements to production deployment in 12 weeks. Their process is rigorous, transparent, and genuinely collaborative.",
    name: "Anika Patel",
    title: "Director of Engineering",
    company: "UrbanGrid Solutions",
  },
];

const Testimonials = () => (
  <section className="py-24 border-t border-border grid-bg">
    <div className="section-container">
      <h2 className="section-title mb-16">What Our Clients Say</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="border border-border p-8 flex flex-col">
            <blockquote className="font-body text-foreground leading-relaxed mb-8 flex-1">
              "{t.quote}"
            </blockquote>
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
              <p className="font-body text-xs text-muted-foreground">{t.title}, {t.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
