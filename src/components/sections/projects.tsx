import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, CheckCircle2, AlertCircle, Lightbulb, Zap, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { projects, type Project } from "@/data/projects";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

interface Dimensions {
  cardWidth: number;
  cardHeight: number;
  radius: number;
  perspective: number;
}

const NORMAL_SPEED = 0.12;

type Mode = "auto" | "hover" | "wheel" | "touch" | "drag";

export function Projects() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Project | null>(null);
  const n = projects.length;

  const [dims, setDims] = useState<Dimensions>({
    cardWidth: 280,
    cardHeight: 320,
    radius: 480,
    perspective: 1400,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(-NORMAL_SPEED);
  const modeRef = useRef<Mode>("auto");
  const mouseOverRef = useRef(false);

  const lastTouchXRef = useRef(0);
  const lastTouchTimeRef = useRef(0);

  const isMouseDownRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const mouseDownTimeRef = useRef(0);
  const mouseMovedRef = useRef(false);

  const rafRef = useRef<number>(0);
  const wheelEndTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      let cardWidth: number, cardHeight: number, perspective: number, maxRadius: number;

      if (w < 640) {
        cardWidth = 160;
        cardHeight = 260;
        perspective = 700;
        maxRadius = 260;
      } else if (w < 1024) {
        cardWidth = 220;
        cardHeight = 290;
        perspective = 1000;
        maxRadius = 400;
      } else {
        cardWidth = 280;
        cardHeight = 320;
        perspective = 1400;
        maxRadius = 550;
      }

      const gap = 20;
      const calculated = (cardWidth + gap) / (2 * Math.sin(Math.PI / n));
      const radius = Math.min(Math.max(calculated, 150), maxRadius);

      setDims({ cardWidth, cardHeight, radius, perspective });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [n]);

  const applyTransform = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      const mode = modeRef.current;

      switch (mode) {
        case "auto":
          velocityRef.current += (-NORMAL_SPEED - velocityRef.current) * 0.03;
          rotationRef.current += velocityRef.current;
          break;
        case "hover":
          velocityRef.current += (0 - velocityRef.current) * 0.1;
          rotationRef.current += velocityRef.current;
          break;
        case "wheel":
          velocityRef.current *= 0.96;
          rotationRef.current += velocityRef.current;
          break;
        case "touch":
        case "drag":
          break;
      }

      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform]);

  const setMode = useCallback((newMode: Mode) => {
    modeRef.current = newMode;
  }, []);

  const endInteraction = useCallback(() => {
    if (mouseOverRef.current) {
      setMode("hover");
    } else {
      setMode("auto");
    }
  }, [setMode]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!mouseOverRef.current) return;
      const scene = sceneRef.current;
      if (!scene) return;

      e.preventDefault();
      e.stopPropagation();

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const force = -delta * 0.15;

      velocityRef.current = force;
      rotationRef.current += force;
      applyTransform();

      setMode("wheel");

      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = setTimeout(() => {
        endInteraction();
      }, 200);
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true } as EventListenerOptions);
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
    };
  }, [applyTransform, setMode, endInteraction]);

  const handleMouseEnter = () => {
    mouseOverRef.current = true;
    if (modeRef.current === "auto") {
      setMode("hover");
    }
  };

  const handleMouseLeave = () => {
    mouseOverRef.current = false;
    if (modeRef.current === "hover" || modeRef.current === "drag") {
      isMouseDownRef.current = false;
      endInteraction();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isMouseDownRef.current = true;
    mouseMovedRef.current = false;
    lastMouseXRef.current = e.clientX;
    mouseDownTimeRef.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const delta = e.clientX - lastMouseXRef.current;
    if (Math.abs(delta) > 3) {
      mouseMovedRef.current = true;
      setMode("drag");
    }
    if (mouseMovedRef.current) {
      lastMouseXRef.current = e.clientX;
      const now = Date.now();
      const dt = Math.max(now - lastTouchTimeRef.current, 1);
      lastTouchTimeRef.current = now;
      const force = (delta / dt) * 16;
      velocityRef.current = force * 0.8;
      rotationRef.current += force * 0.8;
      applyTransform();
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    if (mouseMovedRef.current) {
      endInteraction();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setMode("touch");
    lastTouchXRef.current = e.touches[0].clientX;
    lastTouchTimeRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (modeRef.current !== "touch") return;
    const delta = e.touches[0].clientX - lastTouchXRef.current;
    const now = Date.now();
    const dt = Math.max(now - lastTouchTimeRef.current, 1);
    lastTouchXRef.current = e.touches[0].clientX;
    lastTouchTimeRef.current = now;

    const force = (delta / dt) * 16;
    velocityRef.current = force * 0.8;
    rotationRef.current += force * 0.8;
    applyTransform();
  };

  const handleTouchEnd = () => {
    endInteraction();
  };

  const angleStep = 360 / n;

  const handleCardClick = (project: Project) => {
    if (mouseMovedRef.current) return;
    setSelected(project);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            {t("projects.title")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("projects.heading")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("projects.subheading")}
          </p>
          <p className="mt-3 text-sm text-primary/70 italic">
            {t("projects.personality")}
          </p>
        </Reveal>
      </div>

      {/* 3D Cylindrical Carousel */}
      <div
        ref={sceneRef}
        className="cylinder-scene"
        style={{
          "--card-width": `${dims.cardWidth}px`,
          "--card-height": `${dims.cardHeight}px`,
          perspective: `${dims.perspective}px`,
          minHeight: `${dims.cardHeight + 100}px`,
          paddingBottom: "80px",
          paddingTop: "120px",
        } as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={containerRef} className="cylinder-container">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="cylinder-card group"
              style={{
                transform: `rotateY(${index * angleStep}deg) translateZ(${dims.radius}px)`,
                width: `${dims.cardWidth}px`,
                height: `${dims.cardHeight}px`,
                marginLeft: `${-dims.cardWidth / 2}px`,
                marginTop: `${-dims.cardHeight / 2}px`,
              }}
              onClick={() => handleCardClick(project)}
            >
              <div className="w-full h-full rounded-xl overflow-hidden bg-card border border-border shadow-lg group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300 flex flex-col">
                <div className="relative h-24 sm:h-28 overflow-hidden shrink-0">
                  <img
                    src={project.image}
                    alt={t(`projectsData.${project.id}.title`, project.title)}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {project.comingSoon && (
                    <span className="absolute top-1.5 right-1.5 rounded-full bg-primary px-2 py-0.5 text-[8px] font-medium text-primary-foreground">
                      {t("projects.inProgress")}
                    </span>
                  )}
                  <div className="absolute bottom-1.5 left-2.5 right-2.5">
                    <p className="text-[10px] text-white/70 font-medium leading-tight">{t(`projectsData.${project.id}.category`, project.category)}</p>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">{t(`projectsData.${project.id}.title`, project.title)}</h3>
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 space-y-1.5 flex flex-col flex-1">
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug line-clamp-2">
                    {t(`projectsData.${project.id}.subtitle`, project.subtitle)}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-[9px] sm:text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-[10px] sm:text-[11px] font-semibold text-primary pt-0.5 mt-auto">
                    {project.comingSoon
                      ? t("projects.inProgress")
                      : !project.url
                        ? t("projects.offline")
                        : t("projects.viewProject")}
                    {!project.comingSoon && project.url && <ExternalLink className="w-3 h-3 ml-1" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-10 sm:mt-20 text-center space-y-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("projects.dragSpin")}
        </p>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} t={t} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
  t,
}: {
  project: Project;
  onClose: () => void;
  t: TFunction<"translation">;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
          <img src={project.image} alt={t(`projectsData.${project.id}.title`, project.title)} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={project.status === "Complete" ? "success" : "warning"}>
                {project.status === "Complete" ? t("projects.complete") : t("projects.inProgress")}
              </Badge>
              <Badge variant="secondary">{t(`projectsData.${project.id}.category`, project.category)}</Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{t(`projectsData.${project.id}.title`, project.title)}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t(`projectsData.${project.id}.subtitle`, project.subtitle)}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline">{project.deployment}</Badge>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t("projects.visitSite")}
              </a>
            )}
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("projects.techStack")}</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Business problem */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <AlertCircle className="h-4 w-4" /> {t("projects.businessProblem")}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {project.businessProblem}
            </p>
          </div>

          {/* Role */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Lightbulb className="h-4 w-4" /> {t("projects.myRole")}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {project.role}
            </p>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Layers className="h-4 w-4" /> {t("projects.architecture")}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {project.architecture}
            </p>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <AlertCircle className="h-4 w-4" /> {t("projects.challenges")}
              </h4>
              <ul className="mt-3 space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/90">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Zap className="h-4 w-4" /> {t("projects.solutions")}
              </h4>
              <ul className="mt-3 space-y-2">
                {project.solutions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/90">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Impact */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" /> {t("projects.impact")}
            </h4>
            <ul className="mt-3 space-y-2">
              {project.impact.map((imp, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {imp}
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("projects.keyFeatures")}</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.features.map((f) => (
                <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          {project.url && (
            <div className="pt-4 border-t border-border">
              <Button variant="gradient" asChild>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {t("projects.visitSite")}
                </a>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
