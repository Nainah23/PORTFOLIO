import { Reveal, StaggerContainer, StaggerItem } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { consultingEngagements, consultingServices, totalAuditHours } from "@/data/consulting";
import {
  ShieldCheck, Briefcase, FileCheck, RefreshCw, Clock, MapPin, Building2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Briefcase, FileCheck, RefreshCw,
};

export function Consulting() {
  const { t } = useTranslation();
  return (
    <section id="consulting" className="relative py-24 md:py-32 bg-muted/30">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            {t("consulting.title")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("consulting.heading")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("consulting.subheading")}
          </p>
          <p className="mt-3 text-sm text-primary/70 italic">
            {t("consulting.personality")}
          </p>
        </Reveal>

        {/* Stats banner */}
        <Reveal delay={0.1} className="mt-12">
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="text-3xl font-extrabold text-gradient">{totalAuditHours}+</div>
              <div className="mt-1 text-sm text-muted-foreground">{t("consulting.stats.auditHours")}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="text-3xl font-extrabold text-gradient">{consultingEngagements.length}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t("consulting.stats.organizations")}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="text-3xl font-extrabold text-gradient">ISO 27001</div>
              <div className="mt-1 text-sm text-muted-foreground">{t("consulting.stats.standard")}</div>
            </div>
          </div>
        </Reveal>

        {/* Services */}
        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {consultingServices.map((service) => {
            const Icon = iconMap[service.icon] ?? ShieldCheck;
            return (
              <StaggerItem key={service.title}>
                <Card className="group h-full p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Engagement list */}
        <Reveal delay={0.2} className="mt-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
            {t("consulting.engagements")}
          </h3>
          <div className="mx-auto max-w-3xl space-y-3">
            {consultingEngagements.map((eng, i) => (
              <Reveal key={eng.client} delay={i * 0.03}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight">{eng.client}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{eng.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="info" className="text-xs">{eng.type}</Badge>
                      <Badge variant="outline" className="text-xs gap-1">
                        <MapPin className="h-3 w-3" /> {eng.country}
                      </Badge>
                      <Badge variant="outline" className="text-xs gap-1">
                        <Clock className="h-3 w-3" /> {eng.hours}h
                      </Badge>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
