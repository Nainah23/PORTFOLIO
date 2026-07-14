export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  stack?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: "Senior Frontend & Quality Engineer",
    company: "Rodela TechHouse",
    period: "Jan 2025 — Present",
    location: "Nairobi, Kenya (Hybrid)",
    description:
      "Leading frontend development and quality engineering for enterprise-level applications across GRC, fintech, certification, and assessment domains. Serving as the technical bridge between Sentinel Africa Consulting's compliance expertise and Rodela TechHouse's software solutions.",
    highlights: [
      "Spearheaded development of 9+ enterprise applications using React, TypeScript, Java, and Flutter",
      "Built multi-tenant certification platforms with strict workflow validation and role-based access control",
      "Implemented AI-assisted risk assessment tools demoed at international conferences",
      "Established quality engineering practices including functional, regression, and scenario testing",
      "Integrated real-time collaboration, PDF generation, and internationalization across platforms",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "TanStack Query", "Framer Motion", "Zod", "Vitest", "Playwright"],
  },
  {
    role: "Backend Developer Intern",
    company: "HNG Internship",
    period: "Jun 2024 — Sep 2024",
    location: "Remote",
    description:
      "Collaborated with distributed pan-African teams to build an AI-powered learning platform for homework assistance and grading.",
    highlights: [
      "Collaborated with distributed teams to build and validate an AI-powered learning platform",
      "Tested backend APIs and data flows to ensure correct grading and response behavior",
      "Contributed to improving system reliability through validation and bug fixes",
    ],
    stack: ["Express.js", "TypeScript", "PostgreSQL"],
  },
  {
    role: "Freelance Writer",
    company: "Remote — Global Clients",
    period: "Dec 2018 — Present",
    location: "Remote",
    description:
      "Built a consistent global client base producing high-impact content across technology, education, and business niches.",
    highlights: [
      "Built a consistent global client base across multiple niches",
      "Produced over 500 high-impact articles across technology, education, and business",
      "Enhanced learning outcomes through educational content",
    ],
  },
];
