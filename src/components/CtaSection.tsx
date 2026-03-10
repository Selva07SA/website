const CtaSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 border-t border-border">
      <div className="section-container text-center">
        <h2 className="section-title mb-6">Let's Build Your Next Software Solution</h2>
        <p className="section-subtitle mx-auto mb-10">
          From concept to production — we partner with you at every stage.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => scrollTo("contact")} className="btn-primary">
            Book Free Consultation
          </button>
          <button onClick={() => scrollTo("contact")} className="btn-secondary">
            Get Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
