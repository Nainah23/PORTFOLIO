import { Reveal, StaggerContainer, StaggerItem } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";
import { certifications } from "@/data/certifications";
import { Award, GraduationCap, TrendingUp, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, GraduationCap, TrendingUp, Languages,
};

export function Certifications() {
  const { t } = useTranslation();
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            {t("certifications.title")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("certifications.heading")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("certifications.subheading")}
          </p>
          <p className="mt-3 text-sm text-primary/70 italic">
            {t("certifications.personality")}
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {certifications.map((cert) => {
            const Icon = iconMap[cert.icon] ?? Award;
            return (
              <StaggerItem key={cert.title}>
                <Card className="group h-full p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold leading-tight">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary">{cert.issuer}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{cert.date}</p>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
