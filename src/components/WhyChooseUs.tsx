import { Users, Layers, Shield, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const reasons = [
  { icon: Users, title: "Experienced Developers", desc: "Senior engineers with deep domain expertise across industries." },
  { icon: Layers, title: "Scalable Architecture", desc: "Systems designed to grow from prototype to millions of users." },
  { icon: Shield, title: "Secure Software", desc: "Security-first approach with encryption, auditing, and compliance." },
  { icon: Zap, title: "Agile Development", desc: "Iterative delivery with continuous feedback and rapid adaptation." },
];

const WhyChooseUs = () => (
  <section className="py-32">
    <div className="section-container">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">Why Us</p>
          <h2 className="section-title mb-6">Built on principles that matter</h2>
          <p className="section-subtitle mx-auto">The foundation of every project we deliver.</p>
        </div>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((r, i) => (
          <AnimatedSection key={r.title} delay={i * 0.1}>
            <div className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-muted mx-auto mb-6 flex items-center justify-center group-hover:bg-foreground transition-colors duration-500">
                <r.icon className="w-6 h-6 text-foreground group-hover:text-background transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">{r.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
