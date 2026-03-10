import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 bg-muted/30">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-20">
          <AnimatedSection>
            <p className="font-body text-sm text-muted-foreground tracking-widest uppercase mb-4">Get in Touch</p>
            <h2 className="section-title mb-6">Let's talk about your project</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-10">
              Tell us about your vision and we'll help you bring it to life with the right technology and approach.
            </p>
            <div className="space-y-4">
              {[
                { label: "Email", value: "hello@probleminfo.tech" },
                { label: "Response time", value: "Within 24 hours" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="font-body text-sm text-muted-foreground w-28">{item.label}</span>
                  <span className="font-body text-sm text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {submitted ? (
              <div className="rounded-2xl border border-border bg-background p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-foreground mx-auto mb-6 flex items-center justify-center">
                  <Send className="w-5 h-5 text-background" />
                </div>
                <p className="font-heading text-foreground text-xl font-semibold mb-2">Message sent</p>
                <p className="font-body text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Name", type: "text", key: "name" as const },
                  { label: "Email", type: "email", key: "email" as const },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="font-body text-sm text-foreground mb-2 block">{field.label}</label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm focus:border-foreground focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
