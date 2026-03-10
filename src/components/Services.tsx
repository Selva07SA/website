import { Globe, Smartphone, Cog } from "lucide-react";

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
];

const Services = () => (
  <section id="services" className="py-24 border-t border-border grid-bg">
    <div className="section-container">
      <h2 className="section-title mb-4">Services</h2>
      <p className="section-subtitle mb-16">End-to-end development, from concept to deployment.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="card-hover bg-card p-8">
            <s.icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">{s.title}</h3>
            <ul className="space-y-3">
              {s.items.map((item) => (
                <li key={item} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
