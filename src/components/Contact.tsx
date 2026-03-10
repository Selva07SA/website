import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 border-t border-border grid-bg">
      <div className="section-container">
        <div className="max-w-xl">
          <h2 className="section-title mb-4">Contact</h2>
          <p className="section-subtitle mb-10">Tell us about your project.</p>

          {submitted ? (
            <div className="border border-primary p-8">
              <p className="font-heading text-foreground text-lg">Message received.</p>
              <p className="font-body text-muted-foreground text-sm mt-2">We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
