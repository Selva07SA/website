import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "CRM Software",
    description: "Streamline customer relationships with intelligent lead tracking and pipeline management.",
    features: ["Lead management", "Sales pipeline", "Customer analytics"],
    imageSrc: "/products/crm-opt.jpeg",
  },
  {
    name: "Billing Software",
    description: "Automate invoicing, payment tracking, and tax compliance in one unified platform.",
    features: ["Invoice generation", "Payment tracking", "Tax management"],
    imageSrc: "/products/billing-opt.jpeg",
  },
  {
    name: "Inventory Management",
    description: "Real-time stock visibility across warehouses with supplier integration.",
    features: ["Stock tracking", "Supplier management", "Warehouse control"],
    imageSrc: "/products/inventory-opt.jpeg",
  },
  {
    name: "Ticket Software",
    description: "Manage customer support with a modern ticketing system, SLAs, and team collaboration.",
    features: ["Ticket inbox", "SLA automation", "Team assignments"],
    imageSrc: "/placeholder.svg",
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

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product, i) => (
          <AnimatedSection key={product.name} delay={i * 0.1} className="h-full">
            <div className="group relative h-full rounded-2xl border border-border bg-[#e5e5e5] p-8 md:p-10 hover:border-foreground/20 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col lg:flex-row gap-8">
              <ArrowUpRight
                size={20}
                className="absolute top-8 right-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="flex flex-col flex-1 min-w-0 lg:flex-[0_0_42%]">
                <h3 className="font-heading text-xl font-normal text-foreground mb-3">{product.name}</h3>
                <p className="font-body text-muted-foreground text-sm mb-8 leading-relaxed break-words">
                  {product.description}
                </p>
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

              <div className="w-full shrink-0 lg:flex-[0_0_58%]">
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-[#e5e5e5]">
                  <img
                    src={product.imageSrc}
                    alt={`${product.name} preview`}
                    className="w-full h-full object-fill transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
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

export default Products;
