import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "CRM Software",
    description: "Streamline customer relationships with intelligent lead tracking and pipeline management.",
    features: ["Lead management", "Sales pipeline", "Customer analytics"],
    num: "01",
  },
  {
    name: "Billing Software",
    description: "Automate invoicing, payment tracking, and tax compliance in one unified platform.",
    features: ["Invoice generation", "Payment tracking", "Tax management"],
    num: "02",
  },
  {
    name: "Inventory Management",
    description: "Real-time stock visibility across warehouses with supplier integration.",
    features: ["Stock tracking", "Supplier management", "Warehouse control"],
    num: "03",
  },
];

const Products = () => (
  <section id="products" className="py-32">
    <div className="section-container">
      <AnimatedSection>
        <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">Our Products</p>
        <h2 className="section-title mb-6">Purpose-built SaaS tools</h2>
        <p className="section-subtitle mb-20">Tools designed to simplify operations and accelerate growth.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <AnimatedSection key={product.name} delay={i * 0.15}>
            <div className="group h-full bg-muted/50 rounded-2xl p-8 hover:bg-muted transition-all duration-500 relative overflow-hidden">
              <span className="font-heading text-6xl font-normal text-muted-foreground/20 absolute top-4 right-6">
                {product.num}
              </span>
              <div className="relative">
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">{product.name}</h3>
                <p className="font-body text-muted-foreground text-sm mb-8 leading-relaxed">{product.description}</p>
                <ul className="space-y-3 mb-8">
                  {product.features.map((f) => (
                    <li key={f} className="font-body text-sm text-muted-foreground flex items-center gap-3">
                      <span className="w-1 h-1 bg-foreground rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="inline-flex items-center gap-2 font-heading text-sm font-normal text-foreground group-hover:gap-3 transition-all duration-300">
                  Learn More <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
