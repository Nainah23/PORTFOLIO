import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useContact } from "@/context/contact-context";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_portfolio";
const EMAILJS_TEMPLATE_ID = "template_portfolio";
const EMAILJS_PUBLIC_KEY = "your_public_key_here";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactDialog() {
  const { t } = useTranslation();
  const { isContactOpen, closeContact } = useContact();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t("contact.errors.nameRequired");
    if (!form.email.trim()) e.email = t("contact.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("contact.errors.emailInvalid");
    if (!form.message.trim()) e.message = t("contact.errors.messageRequired");
    else if (form.message.trim().length < 10) e.message = t("contact.errors.messageShort");
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || `Portfolio inquiry from ${form.name}`,
          message: form.message,
          to_email: "kamauwainaina29@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        closeContact();
      }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    { icon: Mail, label: t("contact.email"), value: "kamauwainaina29@gmail.com", href: "mailto:kamauwainaina29@gmail.com" },
    { icon: Phone, label: t("contact.phone"), value: "+254 715 383 470", href: "tel:+254715383470" },
    { icon: MapPin, label: t("contact.location"), value: t("contact.locationValue"), href: null },
  ];

  return (
    <AnimatePresence>
      {isContactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          onClick={closeContact}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/95 px-6 py-4 backdrop-blur-sm">
              <div>
                <h2 className="text-lg font-bold">{t("contact.heading")}</h2>
                <p className="text-xs text-muted-foreground">{t("contact.subheading")}</p>
                <p className="mt-1 text-xs text-primary/70 italic">{t("contact.personality")}</p>
              </div>
              <button
                onClick={closeContact}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Contact info row */}
              <div className="grid gap-3 sm:grid-cols-3">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <info.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="block truncate text-xs font-medium text-foreground hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-xs font-medium text-foreground">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/Rodela-Techouse", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:kamauwainaina29@gmail.com", label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dialog-name">{t("contact.form.name")} <span className="text-destructive">*</span></Label>
                    <Input
                      id="dialog-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t("contact.form.namePlaceholder")}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dialog-email">{t("contact.form.email")} <span className="text-destructive">*</span></Label>
                    <Input
                      id="dialog-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dialog-subject">{t("contact.form.subject")}</Label>
                  <Input
                    id="dialog-subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={t("contact.form.subjectPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dialog-message">{t("contact.form.message")} <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="dialog-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={4}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={status === "loading" || status === "success"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("contact.form.sending")}
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      {t("contact.form.success")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("contact.form.send")}
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                    >
                      {t("contact.form.error")}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
