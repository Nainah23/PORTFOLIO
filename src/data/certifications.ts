export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  icon: string;
}

export const certifications: Certification[] = [
  {
    title: "PECB Certified Lead Auditor — ISO/IEC 27001",
    issuer: "PECB (Professional Evaluation and Certification Board)",
    date: "2025",
    description:
      "Certified to lead ISMS audits against ISO/IEC 27001:2022. Covers audit planning, execution, reporting, and follow-up for information security management systems.",
    icon: "Award",
  },
  {
    title: "Full-Stack Software Engineering",
    issuer: "ALX-Africa",
    date: "2024 — 2025",
    description:
      "Intensive software engineering program covering frontend, backend, and full-stack development. Graduated with First Class Honors.",
    icon: "GraduationCap",
  },
  {
    title: "BSc. Economics and Statistics",
    issuer: "Kenyatta University, Nairobi",
    date: "Sep 2019 — 2024",
    description:
      "First Class Honours. Strong analytical foundation in economics, statistics, and data analysis — informing data-driven approach to software engineering.",
    icon: "TrendingUp",
  },
  {
    title: "Japanese Language (AFJ B01)",
    issuer: "Kenyatta University",
    date: "Mar 2022 — Mar 2023",
    description: "Conversational Japanese language certification, enabling cross-cultural communication.",
    icon: "Languages",
  },
];
