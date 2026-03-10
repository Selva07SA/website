import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Products", "Services", "Portfolio", "Contact"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="section-container flex items-center justify-between h-16">
        <button onClick={() => scrollTo("home")} className="font-heading text-lg font-bold tracking-tight text-foreground">
          Problem Info Tech
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} className="btn-primary">
            Get Demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="block w-full text-left font-body text-sm text-muted-foreground hover:text-foreground"
            >
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} className="btn-primary w-full text-center">
            Get Demo
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
