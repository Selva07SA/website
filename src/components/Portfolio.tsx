import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Little Devotee",
    stack: "Branding / Web Design / E-commerce",
    desc: "A modern parenting brand rooted in Indian values, blending cultural symbolism with contemporary design to create a warm, engaging online presence.",
    imageSrc: "/portfolio/little-devotee.jpeg",
  },
  {
    name: "MediTrack",
    stack: "React Native / Firebase / ML Kit",
    desc: "Patient management system with AI-powered diagnostics for regional clinics.",
    imageSrc: "/portfolio/meditrack.svg",
  },
  {
    name: "LogiChain",
    stack: "Next.js / Python / AWS",
    desc: "End-to-end supply chain visibility platform for logistics operators.",
    imageSrc: "/portfolio/logichain.svg",
  },
  {
    name: "EduPlatform",
    stack: "Vue.js / Django / Redis",
    desc: "Scalable learning management system serving 50K+ concurrent users.",
    imageSrc: "/portfolio/eduplatform.svg",
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
          <AnimatedSection key={p.name} delay={i * 0.1} className="h-full">
            <div className="group relative h-full rounded-2xl border border-border bg-[#e5e5e5] p-10 md:pr-72 lg:pr-80 hover:border-foreground/20 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col">
              <ArrowUpRight
                size={20}
                className="absolute top-8 right-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 w-48 lg:w-60">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none bg-transparent">
                  <img
                    src={p.imageSrc}
                    alt={`${p.name} preview`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-4">{p.stack}</p>
              <h3 className="font-heading text-2xl font-normal text-foreground mb-3">{p.name}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md flex-1">{p.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
