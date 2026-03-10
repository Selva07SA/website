const products = [
  {
    name: "CRM Software",
    description: "Streamline customer relationships with intelligent lead tracking and pipeline management.",
    features: ["Lead management", "Sales pipeline", "Customer analytics"],
    animation: "gears",
  },
  {
    name: "Billing Software",
    description: "Automate invoicing, payment tracking, and tax compliance in one unified platform.",
    features: ["Invoice generation", "Payment tracking", "Tax management"],
    animation: "bars",
  },
  {
    name: "Inventory Management",
    description: "Real-time stock visibility across warehouses with supplier integration.",
    features: ["Stock tracking", "Supplier management", "Warehouse control"],
    animation: "grid",
  },
];

const GearAnimation = () => (
  <div className="w-20 h-20 relative mx-auto mb-6">
    <svg viewBox="0 0 80 80" className="w-full h-full" style={{ animation: "spin-slow 8s linear infinite" }}>
      <circle cx="40" cy="40" r="15" fill="none" stroke="hsl(var(--cyan-glow))" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="25" fill="none" stroke="hsl(var(--cyan-glow))" strokeWidth="1" strokeDasharray="4 4" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line
          key={angle}
          x1="40"
          y1="12"
          x2="40"
          y2="18"
          stroke="hsl(var(--cyan-glow))"
          strokeWidth="2"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
    </svg>
  </div>
);

const BarsAnimation = () => (
  <div className="flex items-end justify-center gap-1.5 h-20 mb-6">
    {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
      <div
        key={i}
        className="w-3 bg-primary origin-bottom"
        style={{
          animation: `pulse-bar 1.5s ease-in-out ${delay}s infinite`,
          height: "100%",
        }}
      />
    ))}
  </div>
);

const GridAnimation = () => (
  <div className="grid grid-cols-3 gap-1.5 w-20 h-20 mx-auto mb-6">
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        className="border border-primary"
        style={{
          animation: `shift-block 3s ease-in-out ${i * 0.15}s infinite`,
        }}
      />
    ))}
  </div>
);

const animationMap: Record<string, () => JSX.Element> = {
  gears: GearAnimation,
  bars: BarsAnimation,
  grid: GridAnimation,
};

const Products = () => (
  <section id="products" className="py-24 border-t border-border">
    <div className="section-container">
      <h2 className="section-title mb-4">Products</h2>
      <p className="section-subtitle mb-16">Purpose-built SaaS tools for modern operations.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => {
          const Anim = animationMap[product.animation];
          return (
            <div key={product.name} className="card-hover bg-card p-8 flex flex-col">
              <Anim />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{product.name}</h3>
              <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">{product.description}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {product.features.map((f) => (
                  <li key={f} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="font-heading text-sm text-secondary hover:text-primary transition-colors duration-200 self-start underline-offset-4 hover:underline">
                Learn More →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Products;
