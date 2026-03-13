import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "E-commerce",
    stack: "Branding / Web Design / E-commerce",
    desc: "A traditional dairy and sweets e-commerce platform, designed with pastoral visuals and clear product listings to emphasize authenticity, heritage, and easy online shopping.",
    imageSrc: "/portfolio/Ecommerce.jpeg",
  },
  {
    name: "Mobile Shopping App",
    stack: "React Native / Firebase ",
    desc: "A sleek mobile shopping experience for traditional fashion, combining heritage branding with modern UI features like product listings, notifications, and seamless checkout.",
    imageSrc: "/portfolio/meditrack.jpeg",
  },
  {
    name: "E-commerce",
    stack: "React / Python / postgreSQL",
    desc: "A vibrant e-commerce homepage showcasing authenticity and tradition, highlighting 100% pure cow’s milk ghee with pastoral visuals and clear product focus.",
    imageSrc: "/portfolio/Ecomweb.jpeg",
  },
  {
    name: "Media Growth Platform",
    stack: "React / Node.js / MongoDB",
    desc: "A dynamic social media growth platform homepage, designed to highlight engagement-driven services with bold messaging, lifestyle visuals, and clear calls-to-action.",
    imageSrc: "/portfolio/Mediapage.jpeg",
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
            <div className="group relative h-full rounded-2xl border border-border bg-[#e5e5e5] p-8 md:p-10 hover:border-foreground/20 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col lg:flex-row gap-8">
              <ArrowUpRight
                size={20}
                className="absolute top-8 right-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="flex flex-col flex-1 min-w-0 lg:flex-[0_0_42%]">
                <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-4">{p.stack}</p>
                <h3 className="font-heading text-xl sm:text-2xl font-normal text-foreground mb-3">{p.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 break-words">{p.desc}</p>
              </div>

              <div className="w-full shrink-0 lg:flex-[0_0_58%]">
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-[#e5e5e5]">
                  <img
                    src={p.imageSrc}
                    alt={`${p.name} preview`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
