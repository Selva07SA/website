import { Globe, Smartphone, Cog, MessageCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    items: ["Business websites", "SaaS platforms", "E-commerce"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    items: ["Android", "iOS", "Cross-platform"],
  },
  {
    icon: Cog,
    title: "Custom Software Development",
    items: ["Business automation", "Enterprise systems", "Internal tools"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    items: ["Broadcast campaigns", "Auto-replies & flows", "CRM integration"],
  },
];

const Services = () => (
  <section className="py-32 bg-muted/30">
    <div className="section-container">
      <AnimatedSection>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">What We Do</p>
        <h2 className="section-title mb-6">Services</h2>
        <p className="section-subtitle mb-20">End-to-end development, from concept to deployment.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 0.15}>
            <div className="group p-8 rounded-2xl border border-border bg-background hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center mb-6">
                <s.icon className="w-5 h-5 text-background" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-normal text-foreground mb-5">{s.title}</h3>
              <ul className="space-y-3">
                {s.items.map((item) => (
                  <li key={item} className="font-body text-sm text-muted-foreground flex items-center gap-3">
                    <span className="w-4 h-px bg-muted-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
