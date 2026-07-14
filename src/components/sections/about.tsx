import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Code2, ShieldCheck, Briefcase, GraduationCap, Globe, Coffee, Quote } from "lucide-react";
import { useContact } from "@/context/contact-context";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import ianImage from "@/assets/ian.jpg";

const traitKeys = [
  { icon: Code2, key: "engineering", color: "from-violet-500 to-purple-500" },
  { icon: ShieldCheck, key: "quality", color: "from-blue-500 to-cyan-500" },
  { icon: Briefcase, key: "grc", color: "from-amber-500 to-orange-500" },
  { icon: GraduationCap, key: "education", color: "from-emerald-500 to-teal-500" },
  { icon: Globe, key: "global", color: "from-rose-500 to-pink-500" },
  { icon: Coffee, key: "reliable", color: "from-indigo-500 to-blue-500" },
] as const;

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export function About() {
  const { t } = useTranslation();
  const { openContact } = useContact();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" />

      <div className="container">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr]">
          {/* Left: Profile image with layered effects */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-24 mx-auto max-w-sm lg:mx-0"
          >
            <div className="relative">
              {/* Layered glow */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-blue-600/15 blur-3xl glow-pulse" />
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-violet-600/10 to-transparent blur-xl" />

              {/* Image container with animated gradient border */}
              <div className="relative animated-gradient-border overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={ianImage}
                  alt="Ian Wainaina Kamau"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating PECB badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 flex items-center gap-3 rounded-xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">PECB Certified</div>
                  <div className="text-[10px] text-muted-foreground">ISO/IEC 27001</div>
                </div>
              </motion.div>

              {/* Floating experience badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -left-4 flex items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 shadow-xl backdrop-blur-md"
              >
                <div className="text-2xl font-extrabold text-gradient">9+</div>
                <div className="text-[10px] text-muted-foreground leading-tight">
                  Enterprise<br />Projects
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                {t("about.title")}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
                {t("about.heading")}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground text-balance">
                {t("about.subheading")}
              </p>
            </motion.div>

            {/* Trait cards with 3D tilt */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {traitKeys.map(({ icon: Icon, key }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TiltCard className="group h-full rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))` }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold">{t(`about.traits.${key}.title`)}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {t(`about.traits.${key}.description`)}
                    </p>
                    {/* Hover indicator line */}
                    <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/40 transition-all duration-300 group-hover:w-full" />
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <Button variant="outline" onClick={openContact}>
                <Mail className="h-4 w-4" />
                {t("nav.getInTouch")}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Quote with animated quotation marks */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-20 max-w-3xl"
        >
          <div className="relative rounded-2xl border border-border bg-card/30 p-8 backdrop-blur-md md:p-12">
            {/* Large quotation mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
              className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg"
            >
              <Quote className="h-5 w-5" />
            </motion.div>

            <blockquote className="text-center text-lg font-medium leading-relaxed text-foreground/90 md:text-xl text-balance">
              {t("about.quote")}
            </blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              — {t("hero.name")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-3 text-center text-sm text-primary/70 italic"
            >
              {t("about.personality")}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
