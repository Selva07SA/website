import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Calendar as CalendarIcon, Check, Clock, Send } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ContactFormState = {
  name: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  interestTab: "product" | "service";
  selectedProducts: string[];
  selectedServices: string[];
  date?: Date;
  time?: string; // canonical "HH:mm"
  timeFormat: "12h" | "24h";
  message: string;
};

const getToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const TIME_VALUES_30_MIN = Array.from({ length: 48 }, (_, i) => {
  const totalMinutes = i * 30;
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

const getMinTimeValue = (selectedDate?: Date) => {
  if (!selectedDate) return undefined;

  const today = getToday();
  const dateAtMidnight = new Date(selectedDate);
  dateAtMidnight.setHours(0, 0, 0, 0);

  if (!isSameDay(dateAtMidnight, today)) return undefined;

  const min = new Date();
  min.setMinutes(0, 0, 0);
  min.setHours(min.getHours() + 1);

  // Round up to the next 30-min increment
  const minutes = min.getMinutes();
  const roundedMinutes = minutes <= 0 ? 0 : minutes <= 30 ? 30 : 0;
  if (roundedMinutes === 0 && minutes > 30) min.setHours(min.getHours() + 1);
  min.setMinutes(roundedMinutes, 0, 0);

  return `${String(min.getHours()).padStart(2, "0")}:${String(min.getMinutes()).padStart(2, "0")}`;
};

const formatTime = (value: string, timeFormat: ContactFormState["timeFormat"]) => {
  if (timeFormat === "24h") return value;

  const [hRaw, mRaw] = value.split(":");
  const hours24 = Number(hRaw);
  const minutes = Number(mRaw);
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
};

const PRODUCT_OPTIONS = ["CRM Software", "Billing Software", "Inventory Management", "Ticket Software"] as const;
const SERVICE_OPTIONS = ["Web Development", "Mobile App Development", "Custom Software Development", "WhatsApp Automation"] as const;

const PHONE_RULES: Record<string, { minDigits: number; maxDigits: number; example: string }> = {
  "+91": { minDigits: 10, maxDigits: 10, example: "9876543210" }, // India
  "+1": { minDigits: 10, maxDigits: 10, example: "5551234567" }, // USA/Canada
  "+44": { minDigits: 10, maxDigits: 11, example: "7123456789" }, // UK (often 10–11)
  "+61": { minDigits: 9, maxDigits: 9, example: "412345678" }, // Australia (mobile without leading 0)
  "+971": { minDigits: 9, maxDigits: 9, example: "501234567" }, // UAE
  "+65": { minDigits: 8, maxDigits: 8, example: "81234567" }, // Singapore
};

const getPhoneRules = (code: string) => PHONE_RULES[code] ?? { minDigits: 6, maxDigits: 15, example: "123456" };

const toggleInList = (list: string[], value: string) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";
const toApiUrl = (path: string) => (API_BASE_URL ? `${API_BASE_URL.replace(/\/+$/, "")}${path}` : path);

const Contact = () => {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    phoneCountryCode: "+91",
    phoneNumber: "",
    interestTab: "service",
    selectedProducts: [],
    selectedServices: [],
    date: new Date(),
    time: undefined,
    timeFormat: "12h",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [interestError, setInterestError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (form.selectedProducts.length === 0 && form.selectedServices.length === 0) {
      setInterestError("Please select at least one product or service.");
      return;
    }

    const phoneDigits = form.phoneNumber.replace(/\D/g, "");
    const { minDigits, maxDigits } = getPhoneRules(form.phoneCountryCode);
    if (phoneDigits.length < minDigits || phoneDigits.length > maxDigits) {
      setPhoneError(`Phone number must be ${minDigits === maxDigits ? `${maxDigits}` : `${minDigits}–${maxDigits}`} digits.`);
      return;
    }

    setInterestError(null);
    setPhoneError(null);
    setIsSubmitting(true);
    try {
      const payload = {
        createdAt: new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        name: form.name,
        email: form.email,
        phoneCountryCode: form.phoneCountryCode,
        phoneNumber: phoneDigits,
        phoneE164: `${form.phoneCountryCode}${phoneDigits}`,
        selectedServices: form.selectedServices,
        selectedProducts: form.selectedProducts,
        preferredDate: form.date ? format(form.date, "yyyy-MM-dd") : "",
        preferredTime24: form.time ?? "",
        preferredTime12: form.time ? formatTime(form.time, "12h") : "",
        message: form.message,
      };

      const res = await fetch(toApiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phoneCountryCode: "+91",
        phoneNumber: "",
        interestTab: "service",
        selectedProducts: [],
        selectedServices: [],
        date: new Date(),
        time: undefined,
        timeFormat: "12h",
        message: "",
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 bg-muted/30">
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
                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">Contact Number</label>
                  <div className="flex gap-3">
                    <select
                      value={form.phoneCountryCode}
                      onChange={(e) => {
                        const nextCode = e.target.value;
                        const { maxDigits } = getPhoneRules(nextCode);
                        const digits = form.phoneNumber.replace(/\D/g, "").slice(0, maxDigits);
                        setForm({ ...form, phoneCountryCode: nextCode, phoneNumber: digits });
                        setPhoneError(null);
                      }}
                      className="w-32 bg-background border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm focus:border-foreground focus:outline-none transition-colors"
                      aria-label="Country code"
                    >
                      <option value="+91">IN +91</option>
                      <option value="+1">US +1</option>
                      <option value="+44">UK +44</option>
                      <option value="+61">AU +61</option>
                      <option value="+971">UAE +971</option>
                      <option value="+65">SG +65</option>
                    </select>
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      value={form.phoneNumber}
                      onChange={(e) => {
                        const { maxDigits } = getPhoneRules(form.phoneCountryCode);
                        const digits = e.target.value.replace(/\D/g, "").slice(0, maxDigits);
                        setForm({ ...form, phoneNumber: digits });
                        setPhoneError(null);
                      }}
                      maxLength={getPhoneRules(form.phoneCountryCode).maxDigits}
                      placeholder={`e.g. ${getPhoneRules(form.phoneCountryCode).example}`}
                      className="flex-1 bg-background border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>
                  {phoneError ? <p className="mt-2 font-body text-xs text-destructive">{phoneError}</p> : null}
                </div>

                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">Pick a Product or Service</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-foreground text-sm focus:border-foreground focus:outline-none transition-colors text-left flex items-center justify-between gap-3"
                      >
                        <span
                          className={
                            form.selectedProducts.length || form.selectedServices.length ? "text-foreground" : "text-muted-foreground"
                          }
                        >
                          {form.selectedProducts.length || form.selectedServices.length
                            ? `${form.selectedServices.length} service${form.selectedServices.length === 1 ? "" : "s"}, ${form.selectedProducts.length} product${form.selectedProducts.length === 1 ? "" : "s"} selected`
                            : "Select products and/or services"}
                        </span>
                        <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">
                          {form.interestTab}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-80 p-2">
                      <div className="px-2 pt-1 pb-2">
                        <ToggleGroup
                          type="single"
                          value={form.interestTab}
                          onValueChange={(value) => {
                            if (value !== "product" && value !== "service") return;
                            setForm({ ...form, interestTab: value });
                          }}
                          className="justify-start"
                        >
                          <ToggleGroupItem value="service" aria-label="Services">
                            Services
                          </ToggleGroupItem>
                          <ToggleGroupItem value="product" aria-label="Products">
                            Products
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>

                      <ScrollArea className="h-56">
                        <div className="p-1 space-y-1">
                          {(form.interestTab === "product" ? PRODUCT_OPTIONS : SERVICE_OPTIONS).map((item) => {
                            const selected =
                              form.interestTab === "product"
                                ? form.selectedProducts.includes(item)
                                : form.selectedServices.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  if (form.interestTab === "product") {
                                    setForm({ ...form, selectedProducts: toggleInList(form.selectedProducts, item) });
                                  } else {
                                    setForm({ ...form, selectedServices: toggleInList(form.selectedServices, item) });
                                  }
                                  setInterestError(null);
                                }}
                                className="w-full rounded-md px-3 py-2 font-body text-sm transition-colors hover:bg-muted flex items-center justify-between gap-3"
                              >
                                <span className={selected ? "text-foreground" : "text-muted-foreground"}>{item}</span>
                                {selected ? <Check className="w-4 h-4 text-foreground" /> : <span className="w-4 h-4" />}
                              </button>
                            );
                          })}
                        </div>
                      </ScrollArea>

                      <div className="flex items-center justify-between px-2 pt-2">
                        <p className="font-body text-xs text-muted-foreground">
                          {form.selectedServices.length + form.selectedProducts.length} selected
                        </p>
                        <button
                          type="button"
                          className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() =>
                            setForm({ ...form, selectedProducts: [], selectedServices: [] })
                          }
                        >
                          Clear all
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {interestError ? (
                    <p className="mt-2 font-body text-xs text-destructive">{interestError}</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Preferred Date</label>
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
                          onSelect={(date) => {
                            const nextDate = date ?? undefined;
                            const minTime = getMinTimeValue(nextDate);
                            const nextTime = form.time && minTime && form.time < minTime ? undefined : form.time;
                            setForm({ ...form, date: nextDate, time: nextTime });
                          }}
                          disabled={{ before: getToday() }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-2 block">Preferred Time</label>
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
                        {(() => {
                          const minTime = getMinTimeValue(form.date);
                          if (!minTime) return null;
                          return (
                            <p className="px-2 pb-2 font-body text-xs text-muted-foreground">
                              Available times start from {formatTime(minTime, form.timeFormat)} (after 1 hour).
                            </p>
                          );
                        })()}
                        <ScrollArea className="h-56">
                          <div className="p-1 space-y-1">
                            {TIME_VALUES_30_MIN.filter((value) => {
                              const minTime = getMinTimeValue(form.date);
                              return !minTime || value >= minTime;
                            }).map((value) => {
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
                {submitError ? <p className="font-body text-sm text-destructive">{submitError}</p> : null}
                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
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
