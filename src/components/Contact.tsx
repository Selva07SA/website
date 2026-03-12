import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Calendar as CalendarIcon, Clock, Send } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ContactFormState = {
  name: string;
  email: string;
  date?: Date;
  time?: string; // canonical "HH:mm"
  timeFormat: "12h" | "24h";
  message: string;
};

const getTomorrow = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  return d;
};

const TIME_VALUES_30_MIN = Array.from({ length: 48 }, (_, i) => {
  const totalMinutes = i * 30;
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

const formatTime = (value: string, timeFormat: ContactFormState["timeFormat"]) => {
  if (timeFormat === "24h") return value;

  const [hRaw, mRaw] = value.split(":");
  const hours24 = Number(hRaw);
  const minutes = Number(mRaw);
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
};

const Contact = () => {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    date: undefined,
    time: undefined,
    timeFormat: "12h",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", date: undefined, time: undefined, timeFormat: "12h", message: "" });
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
                <p className="font-heading text-foreground text-xl font-normal mb-2">Message sent</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Preferred Date (Optional)</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm focus:border-foreground focus:outline-none transition-colors text-left flex items-center justify-between gap-3"
                        >
                          <span className={form.date ? "text-foreground" : "text-muted-foreground"}>
                            {form.date ? format(form.date, "PPP") : "Pick a date"}
                          </span>
                          <CalendarIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.date}
                          onSelect={(date) => setForm({ ...form, date: date ?? undefined })}
                          disabled={{ before: getTomorrow() }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Preferred Time (Optional)</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm focus:border-foreground focus:outline-none transition-colors text-left flex items-center justify-between gap-3"
                        >
                          <span className={form.time ? "text-foreground" : "text-muted-foreground"}>
                            {form.time ? formatTime(form.time, form.timeFormat) : "Pick a time"}
                          </span>
                          <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-64 p-2">
                        <div className="flex items-center justify-between gap-2 px-2 py-1">
                          <p className="font-body text-sm text-foreground">Select a time</p>
                          <button
                            type="button"
                            className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setForm({ ...form, time: undefined })}
                          >
                            Clear
                          </button>
                        </div>
                        <div className="px-2 pb-2">
                          <ToggleGroup
                            type="single"
                            value={form.timeFormat}
                            onValueChange={(value) => {
                              if (value === "12h" || value === "24h") setForm({ ...form, timeFormat: value });
                            }}
                            className="justify-start"
                          >
                            <ToggleGroupItem value="12h" aria-label="12 hour format">
                              12h
                            </ToggleGroupItem>
                            <ToggleGroupItem value="24h" aria-label="24 hour format">
                              24h
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <ScrollArea className="h-56">
                          <div className="p-1 space-y-1">
                            {TIME_VALUES_30_MIN.map((value) => {
                              const label = formatTime(value, form.timeFormat);
                              const isSelected = form.time === value;
                              return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setForm({ ...form, time: value })}
                                className={`w-full text-left rounded-md px-3 py-2 font-body text-sm transition-colors hover:bg-muted ${
                                  isSelected ? "bg-muted text-foreground" : "text-muted-foreground"
                                }`}
                              >
                                {label}
                              </button>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
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
