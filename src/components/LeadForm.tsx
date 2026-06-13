import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Briefcase, MessageSquare, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

// Configure your Formspree Form ID here
// Can be overridden by VITE_FORMSPREE_FORM_ID environment variable
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || "mbdepeez";

const PLANS = [
  { id: "basic", label: "Basic Plan", desc: "₹6,999/mo" },
  { id: "standard", label: "Standard Plan", desc: "₹11,999/mo" },
  { id: "premium", label: "Premium Plan", desc: "₹19,999/mo" },
  { id: "consultation", label: "Just Consult", desc: "Discuss first" },
];

const SERVICES = [
  { value: "Meta Ads", label: "Meta Ads" },
  { value: "Google Ads", label: "Google Ads" },
  { value: "SEO", label: "SEO Services" },
  { value: "Social Media", label: "Social Media Mgt" },
  { value: "Website Dev", label: "Website Dev" },
  { value: "Branding", label: "Branding & Graphics" },
  { value: "Video Reels", label: "Video & Reels" },
  { value: "Other", label: "Other / Multiple" },
];

interface FormErrors {
  name?: string;
  phone?: string;
  businessName?: string;
  services?: string;
}

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    message: "",
  });

  const [selectedPlan, setSelectedPlan] = useState("consultation");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  // Sync hash selection (e.g. #contact-basic, #contact-premium)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#contact-")) {
        const planId = hash.replace("#contact-", "");
        if (["basic", "standard", "premium"].includes(planId)) {
          setSelectedPlan(planId);
        }

        // Scroll cleanly to the contact section
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else if (hash === "#contact") {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceToggle = (val: string) => {
    setSelectedServices((prev) => {
      const updated = prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val];
      if (errors.services && updated.length > 0) {
        setErrors((errs) => ({ ...errs, services: undefined }));
      }
      return updated;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const cleanPhone = formData.phone.replace(/[\s-()]/g, "");
      if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
        newErrors.phone = "Enter a valid phone number (min 10 digits)";
      }
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (selectedServices.length === 0) {
      newErrors.services = "Select at least one service of interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || submitStatus === "success") return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError("");

    const chosenPlanObj = PLANS.find((p) => p.id === selectedPlan);
    const chosenPlanText = chosenPlanObj ? `${chosenPlanObj.label} (${chosenPlanObj.desc})` : selectedPlan;

    const payload = {
      name: formData.name,
      phone: formData.phone,
      businessName: formData.businessName,
      selectedPlan: chosenPlanText,
      services: selectedServices.join(", "),
      message: formData.message,
    };

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          businessName: "",
          message: "",
        });
        setSelectedServices([]);
        setSelectedPlan("consultation");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit form. Please verify Formspree ID or try again.");
      }
    } catch (err: any) {
      setSubmitStatus("error");
      setServerError(err.message || "An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden border-t border-[color:var(--border)]"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 50%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Pitch */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="size-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-gold" />
              Growth Consultation
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance">
              Let's scale your <br />
              <span className="gold-text italic font-light" style={{ backgroundImage: "var(--gradient-gold)" }}>
                business.
              </span>
            </h2>

            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Ready for measurable growth? Fill out the form to book your free strategy audit.
              We will analyze your current digital presence, audit your competitors, and lay out
              a clear roadmap to drive high-converting leads.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3.5 text-sm">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-gold ring-1 ring-[color:var(--gold)]/30">
                  ✓
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">100% Free Strategy Session</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">30 minutes of actionable strategies tailored to your market.</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5 text-sm">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-gold ring-1 ring-[color:var(--gold)]/30">
                  ✓
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">In-Depth Presence Audit</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">We check your SEO rankings, social engagement, and ad performance.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column - Premium Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="h-16 w-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6 ring-1 ring-gold/30">
                      <CheckCircle size={36} className="animate-bounce" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground">
                      Request Received!
                    </h3>
                    <p className="mt-4 text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed">
                      Thank you! Our team will contact you shortly. Get ready to transform your brand's digital presence.
                    </p>
                    <div className="mt-8">
                      <button
                        onClick={() => setSubmitStatus("idle")}
                        className="text-xs uppercase tracking-[0.2em] text-gold hover:text-white transition-colors py-2"
                      >
                        Submit another response
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    noValidate
                  >
                    {submitStatus === "error" && (
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm leading-relaxed">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{serverError || "An error occurred. Please try again."}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground block">
                          Name <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className={`w-full bg-background/40 border ${
                              errors.name ? "border-destructive focus:ring-destructive/30" : "border-[color:var(--border)] focus:border-gold/60"
                            } focus:outline-none focus:ring-2 focus:ring-gold/15 rounded-xl pl-11 pr-4 py-3.5 text-sm transition-all text-foreground placeholder:text-muted-foreground/50`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs text-destructive flex items-center gap-1.5 mt-1">
                            <AlertCircle size={10} /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground block">
                          Phone Number <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +91 98765 43210"
                            className={`w-full bg-background/40 border ${
                              errors.phone ? "border-destructive focus:ring-destructive/30" : "border-[color:var(--border)] focus:border-gold/60"
                            } focus:outline-none focus:ring-2 focus:ring-gold/15 rounded-xl pl-11 pr-4 py-3.5 text-sm transition-all text-foreground placeholder:text-muted-foreground/50`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-destructive flex items-center gap-1.5 mt-1">
                            <AlertCircle size={10} /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Business Name */}
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground block">
                        Business Name <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          required
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="Your Business / Shop Name"
                          className={`w-full bg-background/40 border ${
                            errors.businessName ? "border-destructive focus:ring-destructive/30" : "border-[color:var(--border)] focus:border-gold/60"
                          } focus:outline-none focus:ring-2 focus:ring-gold/15 rounded-xl pl-11 pr-4 py-3.5 text-sm transition-all text-foreground placeholder:text-muted-foreground/50`}
                        />
                      </div>
                      {errors.businessName && (
                        <p className="text-xs text-destructive flex items-center gap-1.5 mt-1">
                          <AlertCircle size={10} /> {errors.businessName}
                        </p>
                      )}
                    </div>

                    {/* Selected Plan Details (Radio button cards) */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground block">
                        Select Plan <span className="text-gold">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {PLANS.map((p) => {
                          const isSelected = selectedPlan === p.id;
                          return (
                            <label
                              key={p.id}
                              className={`flex flex-col p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                                isSelected
                                  ? "border-gold bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] ring-1 ring-gold/30"
                                  : "border-[color:var(--border)] bg-background/20 hover:border-gold/30"
                              }`}
                            >
                              <input
                                type="radio"
                                name="selectedPlan"
                                value={p.id}
                                checked={isSelected}
                                onChange={() => setSelectedPlan(p.id)}
                                className="sr-only"
                              />
                              <span className="text-xs sm:text-sm font-semibold text-foreground">{p.label}</span>
                              <span className="text-[10px] text-muted-foreground mt-0.5">{p.desc}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Services Interested In (Multi-select Checkboxes) */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground block">
                        Services Needed <span className="text-gold">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 p-3 rounded-xl border border-[color:var(--border)] bg-background/10">
                        {SERVICES.map((s) => {
                          const isChecked = selectedServices.includes(s.value);
                          return (
                            <label
                              key={s.value}
                              className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-foreground/80 hover:text-foreground transition-colors py-0.5"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleServiceToggle(s.value)}
                                className="rounded border-[color:var(--border)] bg-background/20 text-gold focus:ring-gold/30 size-4 cursor-pointer accent-gold"
                              />
                              <span>{s.label}</span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.services && (
                        <p className="text-xs text-destructive flex items-center gap-1.5 mt-1">
                          <AlertCircle size={10} /> {errors.services}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground block">
                        Message <span className="text-muted-foreground/60">(Optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-4 top-4 text-muted-foreground/60" />
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project goals..."
                          className="w-full bg-background/40 border border-[color:var(--border)] focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/15 rounded-xl pl-11 pr-4 py-3 text-sm transition-all text-foreground placeholder:text-muted-foreground/50 resize-y"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <MagneticButton
                        className="w-full justify-center py-4 text-sm font-semibold select-none shadow-[0_0_30px_-6px_var(--gold)]"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin text-primary-foreground" />
                            Sending Request...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Get Free Consultation <Send size={14} className="text-primary-foreground" />
                          </span>
                        )}
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
