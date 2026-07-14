import { Mail, Phone, Github, Linkedin, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContact } from "@/context/contact-context";

const navLinkKeys = [
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "certifications", href: "#certifications" },
  { key: "consulting", href: "#consulting" },
];

export function Footer() {
  const { t } = useTranslation();
  const { openContact } = useContact();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm font-extrabold">
                IW
              </span>
              <span className="text-lg font-bold tracking-tight">{t("hero.name")}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.navigation")}
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinkKeys.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.getInTouch")}
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:kamauwainaina29@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                kamauwainaina29@gmail.com
              </a>
              <a
                href="tel:+254715383470"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +254 715 383 470
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t("footer.available")}
              </p>
              <button
                onClick={openContact}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {t("nav.getInTouch")}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("hero.name")}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to top"
          >
            {t("footer.backToTop")}
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
