import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/experience";
import { useTranslation } from "react-i18next";
import { MapPin, Calendar, ChevronDown, Briefcase } from "lucide-react";

export function Experience() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            {t("experience.title")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            {t("experience.heading")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            {t("experience.subheading")}
          </p>
          <p className="mt-3 text-sm text-primary/70 italic">
            {t("experience.personality")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative">
            {/* Animated gradient timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute left-4 top-2 bottom-2 w-px scroll-progress-line md:left-1/2 md:-translate-x-1/2"
            />

            {experiences.map((exp, i) => {
              const isExpanded = expanded === i;
              return (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex gap-6 pb-12 last:pb-0 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot with glow pulse */}
                  <div className="absolute left-4 top-3 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-primary ring-4 ring-background md:left-1/2">
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                      animate={{ scale: [1, 2.5, 1], opacity: [0.75, 0, 0.75] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    />
                    <span className="relative h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>

                  {/* Content card */}
                  <div className={`ml-12 flex-1 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group cursor-pointer rounded-xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                      onClick={() => setExpanded(isExpanded ? null : i)}
                    >
                      {/* Company icon + role */}
                      <div className={`flex items-center gap-3 mb-2 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-indigo-600/20 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-semibold leading-tight">{exp.role}</h3>
                      </div>

                      <p className="font-medium text-primary">{exp.company}</p>

                      {/* Meta info */}
                      <div className={`mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Expandable highlights */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className={`mt-4 space-y-2 ${i % 2 !== 0 ? "md:text-left" : ""}`}>
                              {exp.highlights.map((highlight, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: i % 2 !== 0 ? 10 : -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                  className="flex gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                                  {highlight}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tech stack badges */}
                      {exp.stack && (
                        <div className={`mt-4 flex flex-wrap gap-2 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                          {exp.stack.map((tech, j) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: 0.4 + i * 0.15 + j * 0.03 }}
                            >
                              <Badge variant="outline" className="text-xs transition-colors hover:border-primary/40">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Expand indicator */}
                      <div className={`mt-3 flex items-center gap-1 text-xs font-medium text-primary ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        {isExpanded ? "Show less" : "Show highlights"}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
