import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Mail, Github, Linkedin, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useContact } from "@/context/contact-context";
import ianImage from "@/assets/ian.jpg";

function AnimatedCounter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const { openContact } = useContact();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const flipRef = useRef(null);
  const flipInView = useInView(flipRef, { once: false, margin: "-40px" });
  const [flipStage, setFlipStage] = useState<"idle" | "flipping" | "emoji" | "flippingBack">("idle");

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const orb1X = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const orb1Y = useTransform(springY, [-0.5, 0.5], [-30, 30]);
  const orb2X = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const orb2Y = useTransform(springY, [-0.5, 0.5], [20, -20]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const roles = [t("hero.role1"), t("hero.role2"), t("hero.role3")];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    if (!flipInView) {
      setFlipStage("idle");
      return;
    }
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
    let timeout3: ReturnType<typeof setTimeout>;

    setFlipStage("flipping");
    timeout1 = setTimeout(() => setFlipStage("emoji"), 400);
    timeout2 = setTimeout(() => setFlipStage("flippingBack"), 1400);
    timeout3 = setTimeout(() => setFlipStage("idle"), 1800);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [flipInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const flipRotation =
    flipStage === "idle" ? 0 :
    flipStage === "flipping" ? 90 :
    flipStage === "emoji" ? 180 :
    flipStage === "flippingBack" ? 90 : 0;

  const stats = [
    { value: 9, suffix: "+", label: t("hero.stats.projects") },
    { value: 350, suffix: "+", label: t("hero.stats.auditHours") },
    { value: 10, suffix: "+", label: t("hero.stats.mdas") },
    { value: 3, suffix: "", label: t("hero.stats.languages") },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const headingWords = t("hero.name").split(" ");

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-grid bg-mesh pt-16"
    >
      {/* Animated background orbs with parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[120px] glow-pulse"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/12 blur-[100px] glow-pulse"
        />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      {/* Grid fade overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-fade bg-grid" />

      <div className="container relative z-10 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: Text content */}
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <Badge variant="success" className="gap-2 px-4 py-1.5 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t("hero.available")}
              </Badge>
            </motion.div>

            {/* Name with word-by-word reveal */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                  {i < headingWords.length - 1 && "\u00A0"}
                </motion.span>
              ))}
            </h1>

            {/* Animated role with typing cursor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex items-center justify-center gap-2 text-lg text-muted-foreground sm:text-xl md:text-2xl lg:justify-start"
            >
              <span className="text-primary/60 font-mono">{"<"}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="font-semibold text-gradient"
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-primary font-mono"
              >
                _
              </motion.span>
              <span className="text-primary/60 font-mono">{"/>"}</span>
            </motion.div>

            {/* Value proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl lg:mx-0 text-balance"
            >
              {t("hero.description")}
            </motion.p>

            {/* Universal language tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-4 max-w-xl text-sm font-medium text-primary/80 italic lg:mx-0"
            >
              {t("hero.universalLanguage")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                variant="gradient"
                size="lg"
                onClick={() => scrollTo("#projects")}
                className="w-full sm:w-auto group"
              >
                {t("hero.viewWork")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={openContact}
                className="w-full sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                {t("hero.getInTouch")}
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
            >
              {[
                { icon: Github, href: "https://github.com/Rodela-Techouse", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:kamauwainaina29@gmail.com", label: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile image with rotating gradient border and parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <motion.div style={{ x: imageX, y: imageY }}>
              {/* 3D Flip card container */}
              <div ref={flipRef} className="relative aspect-square" style={{ perspective: "1000px" }}>
                {/* Rotating gradient border */}
                <div className="absolute inset-0 rounded-full rotate-border" style={{ borderRadius: "50%" }} />

                {/* Flip card */}
                <motion.div
                  animate={{ rotateY: flipRotation }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-[3px] rounded-full overflow-hidden border-2 border-border shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front: Profile image */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img
                      src={ianImage}
                      alt="Ian Wainaina Kamau"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Back: Emoji */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <motion.span
                      animate={flipStage === "emoji" ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="text-7xl sm:text-8xl"
                    >
                      😎
                    </motion.span>
                  </div>
                </motion.div>
              </div>

              {/* Floating tech badges with spring physics */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 shadow-lg"
              >
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs font-bold text-primary">React</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 -left-2 flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 shadow-lg"
              >
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span className="text-xs font-bold text-primary">ISO 27001</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-6 flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-lg"
              >
                <span className="text-xs font-bold text-primary">TS</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="animated-gradient-border rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-extrabold text-gradient sm:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-primary/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
