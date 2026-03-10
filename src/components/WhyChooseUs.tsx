import { Users, Layers, Shield, Zap } from "lucide-react";

const reasons = [
  { icon: Users, title: "Experienced Developers", desc: "Senior engineers with deep domain expertise across industries." },
  { icon: Layers, title: "Scalable Architecture", desc: "Systems designed to grow from prototype to millions of users." },
  { icon: Shield, title: "Secure Software", desc: "Security-first approach with encryption, auditing, and compliance." },
  { icon: Zap, title: "Agile Development", desc: "Iterative delivery with continuous feedback and rapid adaptation." },
];

const WhyChooseUs = () => (
  <section className="py-24 border-t border-border">
    <div className="section-container">
      <h2 className="section-title mb-4">Why Choose Us</h2>
      <p className="section-subtitle mb-16">The principles that define how we build.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="p-6 border border-border hover:border-primary transition-colors duration-300">
            <r.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-base font-semibold text-foreground mb-2">{r.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
