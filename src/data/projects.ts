import gsmaImage from "@/assets/gsma-screenshot.png";
import riskguardImage from "@/assets/riskguard-screenshot.png";
import ismsImage from "@/assets/isms-screenshot.png";
import gapAssessmentImage from "@/assets/gapassessment.png";
import cerebroImage from "@/assets/cerebro-screenshot.png";
import satiImage from "@/assets/sati-screenshot.png";
import welfareAppImage from "@/assets/welfareapp1.jpeg";
import certiTrustImage from "@/assets/certi-trust-screenshot.png";
import certiTrustSiteImage from "@/assets/certi-trustsite.png";
import threatToolImage from "@/assets/threattool.png";
import golisImage from "@/assets/golis-screenshot.png";
import imsImage from "@/assets/ims-screenshot.png";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: "Complete" | "In Progress";
  url?: string;
  deployment: string;
  techStack: string[];
  businessProblem: string;
  role: string;
  architecture: string;
  challenges: string[];
  solutions: string[];
  impact: string[];
  features: string[];
  icon: string;
  image: string;
  tags: string[];
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: "gsma",
    title: "GSMA Mobile Money Certification Platform",
    subtitle: "Multi-tenant certification platform for Mobile Money Providers",
    category: "Certification & Compliance",
    status: "Complete",
    url: "https://certification.gsmamobilemoneycertification.com",
    deployment: "Live — certification.gsmamobilemoneycertification.com",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "React Hook Form", "Zod", "i18next", "Recharts", "jsPDF", "WebSocket"],
    businessProblem:
      "Mobile Money Providers need a structured, auditable path to GSMA certification. The process involves self-assessments, document submission, multi-stage reviews, and compliance verification — all requiring strict workflow validation, role-based access, and multilingual support across African and international markets.",
    role: "Lead Frontend Engineer & Quality Engineer — designed, built, and validated the entire frontend architecture.",
    architecture:
      "Multi-tenant SPA with role-based routing (Provider, Assessor, Quality Reviewer, Consultant, Admin). Real-time document collaboration via WebSocket. Internationalization with i18next for multi-language support. Client-side PDF generation for certificates and reports. Form validation with Zod schemas. State management via React Query and local storage.",
    challenges: [
      "Designing a multi-tenant architecture that isolates data per provider while maintaining a unified admin view",
      "Implementing strict workflow validation across submission, review, and certification stages",
      "Supporting real-time document collaboration without performance degradation",
      "Ensuring audit readiness with complete document traceability",
      "Building multilingual interfaces for diverse African and international users",
    ],
    solutions: [
      "Role-based access control with protected routes and session management",
      "Structured workflow engine enforcing submission → review → quality review → certification pipeline",
      "WebSocket integration for real-time document collaboration and notifications",
      "Comprehensive audit trail with document versioning and traceability",
      "Full i18next integration with dynamic language switching",
    ],
    impact: [
      "Enabled Mobile Money Providers across multiple countries to pursue GSMA certification digitally",
      "Reduced certification cycle time through structured, automated workflows",
      "Ensured data integrity and audit readiness across the entire certification lifecycle",
      "Supported multilingual high-stake certification workflows for diverse markets",
    ],
    features: [
      "Multi-role authentication (Provider, Assessor, Quality Reviewer, Consultant, Admin)",
      "Self-assessment submission with document upload",
      "Multi-stage review pipeline with role-based workflows",
      "Real-time document collaboration",
      "Certificate generation with QR code verification",
      "Multi-language support (i18next)",
      "Admin-managed content sections",
      "Dashboard analytics with Recharts",
    ],
    icon: "ShieldCheck",
    image: gsmaImage,
    tags: ["React", "Certification", "FinTech"],
  },
  {
    id: "erm",
    title: "Enterprise Risk Management Platform",
    subtitle: "AI-assisted risk assessment platform for enterprise consultants",
    category: "Risk Management",
    status: "Complete",
    url: "https://risk.rodela.co.ke",
    deployment: "Live — risk.rodela.co.ke",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "TanStack Query", "Axios", "Recharts", "React Hook Form", "Zod"],
    businessProblem:
      "Enterprise risk management consultants need a digital platform to assess, score, and visualize risks across organizations. The platform was demoed live at the BCI #CCEA25 Conference at Argyle Hotel by Sentinel Africa Consulting, requiring real-time stability under live demonstration conditions.",
    role: "Frontend Engineer — built and validated the AI-assisted risk assessment interface and data visualization layer.",
    architecture:
      "SPA with TanStack Query for server state management. AI-assisted risk scoring with data visualization via Recharts. Form-driven risk assessment workflows with Zod validation. Axios for API communication with structured error handling.",
    challenges: [
      "Building AI-assisted risk scoring logic that produces reliable, explainable results",
      "Ensuring functional stability during live conference demonstrations",
      "Designing data validation rules for complex risk assessment inputs",
      "Handling edge cases in decision-support workflows",
    ],
    solutions: [
      "Structured risk scoring with visual feedback via Recharts dashboards",
      "Comprehensive data validation rules using Zod schemas",
      "Edge case testing for all risk scoring scenarios",
      "Real-time stability optimization for demo conditions",
    ],
    impact: [
      "Successfully demoed at BCI #CCEA25 Conference — live, in front of industry stakeholders",
      "Enabled consultants to produce data-driven risk assessments with AI assistance",
      "Improved risk visualization for stakeholder presentations",
    ],
    features: [
      "AI-assisted risk scoring",
      "Interactive risk dashboards with Recharts",
      "Risk assessment form workflows",
      "Data validation and error handling",
      "Consultant dashboard with analytics",
    ],
    icon: "TrendingUp",
    image: riskguardImage,
    tags: ["React", "AI", "ISO 31000"],
  },
  {
    id: "golis",
    title: "GOLIS Balanced Scorecard",
    subtitle: "Performance management system for organizational KPIs",
    category: "Performance Management",
    status: "Complete",
    deployment: "Offline — deployed on secure internal servers",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Recharts", "jsPDF", "html2canvas", "React Hook Form", "Zod"],
    businessProblem:
      "Organizations need a structured way to track performance metrics across organizational, departmental, and individual levels. The system was deployed on offline servers for security, requiring a self-contained application with no external dependencies.",
    role: "Frontend Engineer — designed and validated the KPI tracking workflows and performance reporting system.",
    architecture:
      "SPA with hierarchical KPI tracking (organizational → departmental → individual). PDF report generation via jsPDF and html2canvas. Data visualization with Recharts. Offline deployment with no external API dependencies.",
    challenges: [
      "Designing KPI tracking workflows across three organizational levels",
      "Ensuring accuracy of calculated performance metrics",
      "Generating professional PDF reports client-side without server processing",
      "Maintaining data correctness during feature updates via regression testing",
    ],
    solutions: [
      "Hierarchical KPI data model with cascading objectives",
      "Calculated metric validation with consistency checks",
      "Client-side PDF generation using jsPDF + html2canvas",
      "Regression testing protocol for all feature updates",
    ],
    impact: [
      "Enabled data-driven performance management across organizational levels",
      "Ensured metric accuracy and consistency for management reporting",
      "Provided offline, secure deployment for sensitive performance data",
    ],
    features: [
      "Organizational, departmental, and individual KPI tracking",
      "Performance dashboards with Recharts",
      "PDF report generation",
      "Objective cascading across hierarchy levels",
      "Offline deployment capability",
    ],
    icon: "Target",
    image: golisImage,
    tags: ["React", "KPI", "Performance"],
  },
  {
    id: "isms",
    title: "ISO 27001 Process Automation Tool",
    subtitle: "Compliance automation for ISO 27001 information security management",
    category: "Compliance Automation",
    status: "In Progress",
    deployment: "In active development — isms.rodelatech.com",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Framer Motion", "TanStack Query", "Fuse.js", "jsPDF", "React Quill", "docx", "Vitest", "Playwright"],
    businessProblem:
      "ISO 27001 compliance requires managing hundreds of controls, evidence submissions, risk assessments, and audit documentation. Manual processes are error-prone, time-consuming, and difficult to trace. The tool automates these workflows to improve audit readiness and reduce manual oversight.",
    role: "Frontend Engineer & Quality Engineer — building the automation interface, control management system, and testing framework.",
    architecture:
      "SPA with Framer Motion animations. Full-text search via Fuse.js. Rich text editing with React Quill for policy documentation. DOCX generation for audit reports. Comprehensive test suite with Vitest and Playwright. PDF generation for compliance reports.",
    challenges: [
      "Automating complex ISO 27001 compliance workflows with process accuracy",
      "Ensuring traceability across controls, evidence, and audit processes",
      "Generating professional compliance documentation (DOCX, PDF)",
      "Building a comprehensive test suite for compliance-critical features",
    ],
    solutions: [
      "Structured workflow automation with validation rules",
      "Evidence submission tracking with full audit trail",
      "DOCX and PDF report generation for audit readiness",
      "Vitest unit tests and Playwright E2E tests for critical paths",
    ],
    impact: [
      "Reduced manual errors through enforced validation rules",
      "Improved audit readiness with structured compliance workflows",
      "Decreased manual oversight time for compliance teams",
    ],
    features: [
      "ISO 27001 control management",
      "Evidence submission and tracking",
      "Risk assessment workflows",
      "Policy documentation with rich text editor",
      "DOCX/PDF compliance report generation",
      "Full-text search across controls",
      "Audit trail and traceability",
    ],
    icon: "FileCheck",
    image: ismsImage,
    tags: ["React", "ISO 27001", "Security"],
  },
  {
    id: "ims",
    title: "Integrated Management System (IMS)",
    subtitle: "Unified platform for ISO 27001 and ISO 9001 workflows",
    category: "Integrated Compliance",
    status: "In Progress",
    deployment: "In active development — ims.rodelatech.com",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "TanStack Query", "Lottie React", "jsPDF", "docx", "Vitest", "Playwright"],
    businessProblem:
      "Organizations implementing multiple ISO standards (27001, 9001) need a unified system to manage integrated workflows, shared documentation, and cross-standard controls. Disparate systems create duplication, inconsistency, and compliance gaps.",
    role: "Frontend Engineer — building the unified IMS interface integrating ISO 27001 and ISO 9001 workflows.",
    architecture:
      "SPA integrating multiple ISO standard workflows. Shared document management. Lottie animations for enhanced UX. DOCX/PDF generation for integrated audit reports. Test coverage with Vitest and Playwright.",
    challenges: [
      "Integrating workflows from multiple ISO standards into a unified interface",
      "Managing shared documentation across standards without duplication",
      "Ensuring cross-standard control mapping and traceability",
    ],
    solutions: [
      "Unified workflow engine supporting multiple ISO standards",
      "Shared document repository with cross-standard referencing",
      "Integrated audit reporting across ISO 27001 and ISO 9001",
    ],
    impact: [
      "Streamlined multi-standard compliance management",
      "Reduced documentation duplication across standards",
      "Improved cross-standard control visibility",
    ],
    features: [
      "ISO 27001 and ISO 9001 workflow integration",
      "Shared document management",
      "Cross-standard control mapping",
      "Integrated audit reporting",
      "Lottie-enhanced user experience",
    ],
    icon: "Layers",
    image: imsImage,
    tags: ["React", "ISO 27001", "ISO 9001"],
    url: "https://ims.rodelatech.com/",
  },
  {
    id: "gap",
    title: "ISO 27001 Gap Assessment Platform",
    subtitle: "Digital gap assessment tool for ISO 27001 compliance readiness",
    category: "Compliance Assessment",
    status: "Complete",
    deployment: "Internal deployment",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "jsPDF", "jspdf-autotable", "ExcelJS", "FileSaver"],
    businessProblem:
      "Conducting ISO 27001 gap assessments across government MDAs requires structured control review, documentation of non-conformities, and generation of professional assessment reports. Manual processes are inconsistent and difficult to standardize across multiple organizations.",
    role: "Frontend Engineer — built the gap assessment interface, reporting system, and data export capabilities.",
    architecture:
      "SPA with structured gap assessment workflows. PDF report generation with jsPDF and autotable. Excel export via ExcelJS and FileSaver. Data visualization with Recharts for compliance scoring.",
    challenges: [
      "Standardizing gap assessment workflows across diverse organizations",
      "Generating professional assessment reports in multiple formats (PDF, Excel)",
      "Visualizing compliance scores and gap severity",
    ],
    solutions: [
      "Structured assessment workflow with ISO 27001:2022 Annex A controls",
      "Multi-format report generation (PDF with autotable, Excel with ExcelJS)",
      "Compliance scoring dashboards with Recharts",
    ],
    impact: [
      "Conducted ISMS gap assessments for 10+ government MDAs in Uganda",
      "Standardized assessment output across diverse organizations",
      "350+ hours of ISMS audit/gap assessment experience enabled through the platform",
    ],
    features: [
      "ISO 27001:2022 Annex A control review",
      "Gap severity scoring and visualization",
      "PDF assessment report generation",
      "Excel export for data analysis",
      "Compliance dashboards",
    ],
    icon: "Search",
    image: gapAssessmentImage,
    tags: ["React", "ISO 27001", "Compliance"],
  },
  {
    id: "sati",
    title: "SATI Learning Management System",
    subtitle: "LMS for courses, exams, and certifications",
    category: "Education & Assessment",
    status: "In Progress",
    deployment: "In active development",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "TanStack Query", "Recharts", "jsPDF", "XLSX", "Vitest", "DotLottie"],
    businessProblem:
      "Organizations need a comprehensive platform for delivering courses, conducting exams, and issuing certificates. The system must handle course management, student progress tracking, exam administration, and certificate generation.",
    role: "Frontend Engineer — built the LMS interface, course management system, and exam platform.",
    architecture:
      "SPA with course management, exam administration, and certificate generation. TanStack Query for data fetching. DotLottie animations for enhanced UX. XLSX export for analytics. Vitest for testing.",
    challenges: [
      "Building a comprehensive course management system",
      "Designing secure exam workflows with timing controls",
      "Generating professional certificates",
    ],
    solutions: [
      "Structured course management with progress tracking",
      "Secure exam interface with timing and access controls",
      "PDF certificate generation with verification",
    ],
    impact: [
      "Enabled organizations to deliver courses and exams digitally",
      "Streamlined certification processes",
      "Provided analytics for student performance tracking",
    ],
    features: [
      "Course management and enrollment",
      "Exam administration with timing controls",
      "Certificate generation",
      "Student progress tracking",
      "Analytics dashboards",
      "DotLottie-enhanced UX",
    ],
    icon: "GraduationCap",
    image: satiImage,
    tags: ["React", "LMS", "E-Commerce"],
    comingSoon: true,
  },
  {
    id: "exam",
    title: "Online Exam Proctoring Platform",
    subtitle: "Secure remote examination with AI-powered proctoring",
    category: "Assessment & Security",
    status: "Complete",
    url: "https://rodela.co.ke",
    deployment: "Live — rodela.co.ke",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "TensorFlow.js", "MediaPipe", "face-api.js", "React Webcam", "Framer Motion", "Zustand", "Vite PWA"],
    businessProblem:
      "Remote examination requires robust proctoring to ensure assessment integrity. The system must detect faces, monitor for suspicious behavior, enforce timing controls, and prevent unauthorized access — all while providing a seamless exam experience for legitimate candidates.",
    role: "Frontend Engineer & Quality Engineer — built the exam interface, proctoring logic, and validation framework.",
    architecture:
      "SPA with TensorFlow.js and MediaPipe for face detection. React Webcam for camera access. Zustand for state management. PWA support for offline capability. Framer Motion for UI transitions. Multi-model face detection (BlazeFace, Face Landmarks Detection).",
    challenges: [
      "Integrating TensorFlow.js face detection models in the browser without performance degradation",
      "Designing proctoring logic that prevents cheating without disrupting legitimate candidates",
      "Handling camera permissions and edge cases across browsers",
      "Ensuring assessment integrity through timing controls and session management",
    ],
    solutions: [
      "Multi-model face detection pipeline (BlazeFace + Face Landmarks Detection + face-api.js)",
      "Session-based access control with timing enforcement",
      "Scenario testing to prevent cheating and unauthorized access",
      "PWA support for reliable exam delivery",
    ],
    impact: [
      "Enabled secure remote invigilation for high-stake assessments",
      "Prevented cheating through AI-powered face detection and monitoring",
      "Provided a seamless exam experience for legitimate candidates",
    ],
    features: [
      "AI-powered face detection (TensorFlow.js, MediaPipe, face-api.js)",
      "Secure exam interface with timing controls",
      "Camera-based proctoring with React Webcam",
      "Session management and access restrictions",
      "PWA support for offline reliability",
      "Audio monitoring with Hark",
    ],
    icon: "Camera",
    image: cerebroImage,
    tags: ["React", "AI", "WebRTC"],
  },
  {
    id: "welfare",
    title: "Welfare Application",
    subtitle: "Savings and loan management platform for employees",
    category: "Fintech",
    status: "In Progress",
    deployment: "In active development",
    techStack: ["React", "Flutter", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "React Hook Form", "Zod"],
    businessProblem:
      "Employees need a platform to manage monthly savings contributions and apply for loans based on their accumulated contributions. The system must handle financial calculations, eligibility logic, and contribution limits accurately.",
    role: "Frontend Engineer — building the web and mobile (Flutter) interfaces for savings and loan management.",
    architecture:
      "Cross-platform: React web app + Flutter mobile app. Form-driven workflows with Zod validation. Financial calculation logic for contributions, eligibility, and loan approvals.",
    challenges: [
      "Ensuring correctness of financial calculations for savings and loans",
      "Building eligibility logic based on contribution history",
      "Handling edge cases for contribution limits and loan approvals",
      "Maintaining consistency between web and mobile interfaces",
    ],
    solutions: [
      "Validated financial calculation logic with edge case testing",
      "Contribution-based eligibility rules with clear feedback",
      "Cross-platform consistency between React and Flutter",
    ],
    impact: [
      "Enabled employees to manage savings and apply for loans digitally",
      "Ensured financial accuracy through validated calculation logic",
    ],
    features: [
      "Monthly savings contribution management",
      "Loan application with eligibility checks",
      "Contribution tracking and history",
      "Loan approval workflow",
      "Cross-platform (React web + Flutter mobile)",
    ],
    icon: "Wallet",
    image: welfareAppImage,
    tags: ["React", "Flutter", "FinTech"],
    comingSoon: true,
  },
  {
    id: "certi-trust-exam",
    title: "Certi-Trust Exam System",
    subtitle: "Secure exam proctoring with AI-powered biometric verification",
    category: "Assessment & Security",
    status: "Complete",
    url: "https://rodela.co.ke/",
    deployment: "Live — rodela.co.ke",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "AI", "Biometrics"],
    businessProblem:
      "Organizations need a secure exam platform with AI-powered biometric verification, real-time monitoring, and encrypted question databases to ensure assessment integrity.",
    role: "Frontend Engineer & Quality Engineer — built the exam interface, proctoring logic, and validation framework.",
    architecture:
      "SPA with AI-powered biometric verification, real-time monitoring, and encrypted question databases.",
    challenges: [
      "Implementing secure biometric verification",
      "Real-time monitoring without performance degradation",
      "Encrypted question database management",
    ],
    solutions: [
      "AI-powered biometric verification pipeline",
      "Real-time monitoring with optimized performance",
      "Encrypted question storage and delivery",
    ],
    impact: [
      "Enabled secure remote examinations with biometric verification",
      "Ensured assessment integrity through AI-powered monitoring",
    ],
    features: [
      "AI-powered biometric verification",
      "Real-time exam monitoring",
      "Encrypted question database",
      "Secure exam interface",
    ],
    icon: "ShieldCheck",
    image: certiTrustImage,
    tags: ["React", "AI", "Biometrics"],
  },
  {
    id: "certi-trust-site",
    title: "Certi-Trust Official Website",
    subtitle: "Corporate website for ISO certifications and professional development",
    category: "Certification Services",
    status: "Complete",
    url: "https://certi-trust.co.ke/",
    deployment: "Live — certi-trust.co.ke",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI"],
    businessProblem:
      "Certi-Trust needed a corporate website to showcase their ISO certification services, independent assessments, and professional development offerings to a global audience.",
    role: "Frontend Engineer — built the corporate website with modern design and content management.",
    architecture:
      "SPA with responsive design, SEO optimization, and content sections for services, certifications, and professional development.",
    challenges: [
      "Creating a professional corporate brand presence",
      "Structuring content for multiple service offerings",
      "SEO optimization for certification services",
    ],
    solutions: [
      "Modern, responsive design with professional branding",
      "Structured content sections for services and certifications",
      "SEO-optimized pages with semantic HTML",
    ],
    impact: [
      "Established Certi-Trust's digital presence",
      "Showcased ISO certification services to a global audience",
      "Enabled online inquiries and professional development enrollment",
    ],
    features: [
      "Corporate homepage with service overview",
      "Certification service pages",
      "Professional development catalog",
      "Contact and inquiry forms",
      "SEO-optimized content",
    ],
    icon: "Globe",
    image: certiTrustSiteImage,
    tags: ["React", "ISO", "Certification"],
  },
  {
    id: "threat-tool",
    title: "Threat Assessment Tool",
    subtitle: "Cybersecurity threat landscape assessment and crisis management",
    category: "Cybersecurity",
    status: "Complete",
    url: "https://threat.rodela.co.ke/login",
    deployment: "Live — threat.rodela.co.ke",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Recharts"],
    businessProblem:
      "Organizations need a structured way to assess their threat landscape, identify risks, score likelihoods, and generate actionable crisis management plans in one platform.",
    role: "Frontend Engineer — built the threat assessment interface, scoring system, and crisis management plan generator.",
    architecture:
      "SPA with threat assessment workflows, risk scoring, and crisis management plan generation. Data visualization with Recharts.",
    challenges: [
      "Designing a comprehensive threat assessment workflow",
      "Implementing risk scoring with likelihood and impact factors",
      "Generating actionable crisis management plans",
    ],
    solutions: [
      "Structured threat assessment workflow",
      "Risk scoring with visual dashboards",
      "Automated crisis management plan generation",
    ],
    impact: [
      "Enabled organizations to assess their threat landscape with precision",
      "Improved crisis preparedness through actionable plans",
      "Provided data-driven threat intelligence",
    ],
    features: [
      "Threat identification and scoring",
      "Risk likelihood assessment",
      "Crisis management plan generation",
      "Threat landscape dashboards",
      "Actionable recommendations",
    ],
    icon: "AlertTriangle",
    image: threatToolImage,
    tags: ["React", "Cybersecurity", "Risk"],
  },
];
