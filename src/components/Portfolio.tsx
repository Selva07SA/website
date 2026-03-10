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
  <section id="portfolio" className="py-24 border-t border-border">
    <div className="section-container">
      <h2 className="section-title mb-4">Portfolio</h2>
      <p className="section-subtitle mb-16">Selected work across industries.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.name} className="card-hover bg-card p-8">
            <p className="font-heading text-xs uppercase tracking-widest text-primary mb-3">{p.stack}</p>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{p.name}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
