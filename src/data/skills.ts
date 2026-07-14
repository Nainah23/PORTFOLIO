export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    icon: "Code2",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Radix UI / shadcn", level: 90 },
      { name: "Framer Motion", level: 85 },
      { name: "React Router", level: 92 },
      { name: "TanStack Query", level: 88 },
      { name: "Vite", level: 90 },
    ],
  },
  {
    title: "Quality Engineering",
    icon: "ShieldCheck",
    skills: [
      { name: "Functional Testing", level: 92 },
      { name: "Regression Testing", level: 90 },
      { name: "API Testing", level: 85 },
      { name: "Workflow Validation", level: 92 },
      { name: "Test Case Design", level: 88 },
      { name: "Vitest", level: 82 },
      { name: "Playwright", level: 80 },
    ],
  },
  {
    title: "Backend Familiarity",
    icon: "Server",
    skills: [
      { name: "Node.js / Express", level: 80 },
      { name: "Java", level: 75 },
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 75 },
      { name: "REST APIs", level: 85 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    title: "Governance, Risk & Compliance",
    icon: "Briefcase",
    skills: [
      { name: "ISO 27001", level: 90 },
      { name: "Information Security", level: 88 },
      { name: "Risk Management", level: 85 },
      { name: "Compliance Automation", level: 90 },
      { name: "Audit Readiness", level: 88 },
      { name: "Gap Assessment", level: 90 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "Wrench",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 80 },
      { name: "Linux / Bash", level: 78 },
      { name: "Nginx", level: 72 },
      { name: "CI/CD", level: 75 },
    ],
  },
  {
    title: "Data & Analytics",
    icon: "BarChart3",
    skills: [
      { name: "Power BI", level: 78 },
      { name: "Looker Studio", level: 75 },
      { name: "Tableau", level: 72 },
      { name: "Recharts", level: 88 },
    ],
  },
];

export const languages = [
  { name: "English", level: "Fluent", flag: "🇬🇧" },
  { name: "Kiswahili", level: "Fluent", flag: "🇰🇪" },
  { name: "Japanese", level: "Conversational", flag: "🇯🇵" },
];
