const footerLinks = {
  Products: ["CRM Software", "Billing Software", "Inventory Management"],
  Services: ["Web Development", "Mobile Apps", "Custom Software"],
  Company: ["About", "Portfolio", "Contact"],
};

const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="section-container">
      <div className="grid md:grid-cols-4 gap-12">
        <div>
          <p className="font-heading text-lg font-bold text-foreground mb-4">Problem Info Tech</p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Building scalable software solutions for modern businesses.
          </p>
          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            {["X", "LI", "GH"].map((label) => (
              <span
                key={label}
                className="w-8 h-8 border border-border flex items-center justify-center font-heading text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-heading text-xs uppercase tracking-widest text-foreground mb-4">{category}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <span className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border mt-12 pt-8">
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Problem Info Tech. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
