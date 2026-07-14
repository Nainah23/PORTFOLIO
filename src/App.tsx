import { lazy, Suspense } from "react";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ContactProvider } from "@/context/contact-context";
import { ContactDialog } from "@/components/contact-dialog";
import { useScrollRestore } from "@/hooks/use-scroll-restore";

const Experience = lazy(() => import("@/components/sections/experience").then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import("@/components/sections/projects").then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import("@/components/sections/skills").then((m) => ({ default: m.Skills })));
const Certifications = lazy(() => import("@/components/sections/certifications").then((m) => ({ default: m.Certifications })));
const Consulting = lazy(() => import("@/components/sections/consulting").then((m) => ({ default: m.Consulting })));
const Footer = lazy(() => import("@/components/sections/footer").then((m) => ({ default: m.Footer })));

export default function App() {
  useScrollRestore();

  return (
    <ContactProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Suspense fallback={null}>
            <Experience />
            <Projects />
            <Skills />
            <Certifications />
            <Consulting />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <ContactDialog />
      </div>
    </ContactProvider>
  );
}
