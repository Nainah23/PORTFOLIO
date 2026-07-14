import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories, languages } from "@/data/skills";
import { useTranslation } from "react-i18next";
import {
  Code2, ShieldCheck, Server, Briefcase, Wrench, BarChart3,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, ShieldCheck, Server, Briefcase, Wrench, BarChart3,
};

function CircularProgress({ value, delay }: { value: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="relative h-16 w-16 shrink-0">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32" cy="32" r="28"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="4"
        />
        <motion.circle
          cx="32" cy="32" r="28"
          fill="none"
          stroke="url(#skill-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(263 70% 56%)" />
            <stop offset="100%" stopColor="hsl(280 70% 60%)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground">{value}%</span>
      </div>
    </div>
  );
}

export function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32 bg-muted/30 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-50" />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            {t("skills.title")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            {t("skills.heading")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            {t("skills.subheading")}
          </p>
          <p className="mt-3 text-sm text-primary/70 italic">
            {t("skills.personality")}
          </p>
        </motion.div>

        {/* Interactive category selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {skillCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] ?? Code2;
              const isActive = activeCategory === i;
              return (
                <motion.button
                  key={cat.title}
                  onClick={() => setActiveCategory(i)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className={`group relative flex flex-col items-center gap-3 rounded-xl border p-4 text-center transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs font-medium leading-tight sm:text-sm ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {cat.title}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="skill-active"
                      className="absolute -bottom-px left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills display with circular progress rings */}
        <div className="mx-auto mt-10 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {skillCategories[activeCategory].skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -2 }}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <CircularProgress value={skill.level} delay={i * 0.06} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{skill.name}</div>
                    {/* Animated bar with shimmer */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary shimmer-bar">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Languages with floating animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="mx-auto max-w-2xl">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              {t("skills.languages")}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <motion.span
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="text-2xl"
                  >
                    {lang.flag}
                  </motion.span>
                  <div>
                    <div className="text-sm font-semibold">{lang.name}</div>
                    <div className="text-xs text-muted-foreground">{lang.level}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
