import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t("contact.errors.nameRequired");
    if (!form.email.trim()) e.email = t("contact.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("contact.errors.emailInvalid");
    if (!form.message.trim()) e.message = t("contact.errors.messageRequired");
    else if (form.message.trim().length < 10) e.message = t("contact.errors.messageShort");
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("loading");
    const mailtoLink = `mailto:kamauwainaina29@gmail.com?subject=${encodeURIComponent(
      form.subject || `Portfolio inquiry from ${form.name}`
    )}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
  };

  const contactInfo = [
    { icon: Mail, label: t("contact.email"), value: "kamauwainaina29@gmail.com", href: "mailto:kamauwainaina29@gmail.com" },
    { icon: Phone, label: t("contact.phone"), value: "+254 715 383 470", href: "tel:+254715383470" },
    { icon: MapPin, label: t("contact.location"), value: t("contact.locationValue"), href: null },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            {t("contact.title")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("contact.heading")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("contact.subheading")}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <Reveal>
            <div className="space-y-6">
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium text-foreground">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
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
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <Card className="p-6 bg-muted/30">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("contact.availability")}
                </p>
              </Card>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1}>
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.name")} <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t("contact.form.namePlaceholder")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.form.email")} <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={t("contact.form.subjectPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")} <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("contact.form.send")}
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {t("contact.form.success")}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
