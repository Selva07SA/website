import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "FinFlow Dashboard",
    stack: "React · Node.js · PostgreSQL",
    desc: "Real-time financial analytics platform for enterprise treasury management.",
  },
  {
    name: "MediTrack",
    stack: "React Native · Firebase · ML Kit",
    desc: "Patient management system with AI-powered diagnostics for regional clinics.",
  },
  {
    name: "LogiChain",
    stack: "Next.js · Python · AWS",
    desc: "End-to-end supply chain visibility platform for logistics operators.",
  },
  {
    name: "EduPlatform",
    stack: "Vue.js · Django · Redis",
    desc: "Scalable learning management system serving 50K+ concurrent users.",
  },
];

const Portfolio = () => (
  <section id="portfolio" className="py-32">
    <div className="section-container">
      <AnimatedSection>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">Our Work</p>
        <h2 className="section-title mb-6">Portfolio</h2>
        <p className="section-subtitle mb-20">Selected work across industries.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <AnimatedSection key={p.name} delay={i * 0.1}>
            <div className="group relative rounded-2xl border border-border p-10 hover:border-foreground/20 transition-all duration-500 cursor-pointer">
              <ArrowUpRight
                size={20}
                className="absolute top-8 right-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-4">{p.stack}</p>
              <h3 className="font-heading text-2xl font-normal text-foreground mb-3">{p.name}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md">{p.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
