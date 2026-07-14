export interface ConsultingEngagement {
  client: string;
  country: string;
  type: string;
  hours: number;
  description: string;
}

export const consultingEngagements: ConsultingEngagement[] = [
  {
    client: "National Information Technology Authority — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Deposit Protection Fund — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "National Drug Authority — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Financial Intelligence Authority — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Petroleum Authority of Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Personal Data Protection Office — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Electricity Regulatory Authority — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Uganda Registration Services Bureau",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Insurance Training College — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
  {
    client: "Public Procurement and Disposal of Public Assets Authority — Uganda",
    country: "Uganda",
    type: "ISO/IEC 27001 ISMS Gap Assessment",
    hours: 35,
    description:
      "Reviewed existing information security controls, evaluated governance structures, assessed risk management processes, and documented gaps against ISO/IEC 27001 requirements.",
  },
];

export const totalAuditHours = consultingEngagements.reduce((sum, e) => sum + e.hours, 0);

export const consultingServices = [
  {
    title: "ISO 27001 Implementation",
    description: "End-to-end implementation support for ISO/IEC 27001:2022 Information Security Management Systems.",
    icon: "ShieldCheck",
  },
  {
    title: "Governance & Risk Management",
    description: "Enterprise governance structuring, risk assessment, and risk treatment planning aligned with international standards.",
    icon: "Briefcase",
  },
  {
    title: "Compliance & Audit Readiness",
    description: "Gap assessments, control reviews, and audit preparation to ensure organizational readiness for certification audits.",
    icon: "FileCheck",
  },
  {
    title: "Enterprise Transformation",
    description: "Digital transformation of compliance processes through automation, reducing manual overhead and improving traceability.",
    icon: "RefreshCw",
  },
];
