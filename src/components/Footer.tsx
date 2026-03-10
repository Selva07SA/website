const footerLinks = {
  Products: ["CRM Software", "Billing Software", "Inventory Management"],
  Services: ["Web Development", "Mobile Apps", "Custom Software"],
  Company: ["About", "Portfolio", "Contact"],
};

const Footer = () => (
  <footer className="border-t border-border py-20">
    <div className="section-container">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <p className="font-heading text-xl font-bold text-foreground mb-4">Problem Info Tech</p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
            Building scalable software solutions for modern businesses.
          </p>
          <div className="flex gap-3 mt-8">
            {[
              { label: "X", href: "#" },
              { label: "Li", href: "#" },
              { label: "Gh", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-body text-xs text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-5">{category}</h4>
            <ul className="space-y-3">
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

      <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Problem Info Tech. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((link) => (
            <span key={link} className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              {link}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
