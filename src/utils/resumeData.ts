export const personalInfo = {
  name: "Santhosh N",
  title: "Full Stack Web Developer & AI Engineer",
  tagline: "Building resilient distributed systems, modern full-stack web platforms, and explainable AI pipelines.",
  bio: "Full Stack Web Developer & AI Engineer with hands-on experience delivering production-grade microservices, real-time collaboration platforms, and clinical machine learning models with explainable AI.",
  location: "Tamil Nadu, India",
  email: "santhoshnadarajan.work@gmail.com",
  phone: "+91 9790373682",
  website: "https://santhosh77.web.app",
  links: {
    github: "https://github.com/Santhosh-776",
    linkedin: "https://linkedin.com/in/santhosh-n-3379b42b5",
    email: "mailto:santhoshnadarajan.work@gmail.com",
    phone: "tel:+919790373682",
  },
};

export const education = [
  {
    institution: "Vellore Institute of Technology (VIT)",
    location: "Vellore, India",
    degree: "M.Tech (Integrated) in Computer Science & Engineering",
    duration: "2022 – 2027",
    cgpa: "8.22",
    details: "Specializing in Distributed Systems, Artificial Intelligence, Machine Learning, and Advanced Web Architecture.",
  },
];

export const experience = [
  {
    company: "XIBOTIX Pvt. Ltd",
    role: "Full Stack Web Developer Intern",
    location: "India",
    duration: "Nov 2024 – May 2025",
    overview:
      "Contributed to engineering core production features across full-stack applications, migrating legacy architectures to modern React micro-frontends and scaling backend APIs.",
    highlights: [
      "Built 8+ responsive pages and 15+ reusable UI components with React, Next.js, and Tailwind CSS.",
      "Integrated 3+ backend modules with Express.js and MongoDB for secure CRUD operations.",
      "Migrated the Mechmega website from Wix to custom React, rebuilding 10+ UI sections for superior maintainability and speed.",
      "Collaborated in a 3–5 member Agile team with clean Git commits and code reviews.",
    ],
  },
];

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  description: string;
  tech: string[];
  metrics: string;
  features: string[];
  github: string;
  live?: string;
  previewUrl: string;
}

export const featuredProjects: ProjectData[] = [
  {
    id: "deploymind",
    title: "DeployMind",
    subtitle: "AI-Powered Deployment Platform",
    status: "Production Ready",
    description:
      "Modern cloud deployment and orchestration engine automating Git-to-container workflows with AI-driven root-cause error diagnostics and instant fixes.",
    tech: [
      "Next.js",
      "Express.js",
      "FastAPI",
      "Docker",
      "PostgreSQL",
      "Nginx",
      "SSE",
      "AWS",
      "Groq LLM",
    ],
    metrics: "5 Microservices • Automated CI/CD • Instant AI Root-Cause Fix",
    features: [
      "Automated Git-based builds and Docker lifecycle management across 5 microservices",
      "AI-driven root-cause error analysis via Groq LLM with automated patch proposals",
      "Real-time log streaming using Server-Sent Events (SSE) and Nginx reverse proxy",
    ],
    github: "https://github.com/Santhosh-776/DeployMind",
    live: "https://github.com/Santhosh-776/DeployMind",
    previewUrl: "https://deploymind.cloud/dashboard",
  },
  {
    id: "grex",
    title: "Grex",
    subtitle: "AI-Powered Team Collaboration Platform",
    status: "Active System",
    description:
      "High-throughput collaborative workspace integrating real-time messaging, interactive Kanban project management, and LangGraph RAG document intelligence.",
    tech: [
      "Next.js",
      "Express.js",
      "FastAPI",
      "Prisma ORM",
      "Redis",
      "Socket.IO",
      "LangGraph",
      "RAG",
      "PostgreSQL",
    ],
    metrics: "25+ REST APIs • 10+ DB Models • Sub-50ms Socket Sync",
    features: [
      "Team workspaces, real-time Socket.IO chat, interactive Kanban boards, meeting scheduling, file sharing, and RBAC",
      "25+ REST APIs and 10+ PostgreSQL models structured with Prisma ORM and Redis caching",
      "LangGraph-based RAG workflow for semantic document search and automated knowledge summarization",
    ],
    github: "https://github.com/Santhosh-776/Grex",
    live: "https://github.com/Santhosh-776/Grex",
    previewUrl: "https://grex-workspace.app/board",
  },
  {
    id: "pulmoguard",
    title: "PulmoGuard AI",
    subtitle: "Explainable Healthcare Risk Platform",
    status: "Validated ML Platform",
    description:
      "Clinical risk screening platform with explainable AI delivering disease susceptibility scores with SHAP attribution and LangChain medical narratives.",
    tech: [
      "Python",
      "LightGBM",
      "Scikit-Learn",
      "SHAP",
      "LangChain",
      "FastAPI",
      "Next.js",
      "Docker",
      "Groq LLM",
    ],
    metrics: "90.5% Accuracy • 0.70 ROC-AUC • 92.5% Specificity on 50K Records",
    features: [
      "Clinical risk screening platform with Logistic Regression and LightGBM achieving 90.5% accuracy, 0.70 ROC-AUC, and 92.5% specificity on 50K patient records",
      "SHAP risk attribution breakdown providing clinicians transparent feature impact waterfalls",
      "LangChain + Groq LLM clinical reports generated dynamically from biometric parameters",
    ],
    github: "https://github.com/Santhosh-776/PulmoGuard-AI",
    live: "https://github.com/Santhosh-776/PulmoGuard-AI",
    previewUrl: "https://pulmoguard.ai/screening",
  },
];

export const skillsCategories = [
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C/C++"],
    description: "Core algorithmic thinking, systems programming, and modern typed web development.",
  },
  {
    name: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "React Query", "Redux", "Zustand"],
    description: "Reactive component architectures, SSR/SSG, state synchronization, and micro-animations.",
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT", "Socket.IO", "Prisma ORM"],
    description: "High-throughput asynchronous servers, real-time WebSockets, and secure API gateways.",
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firestore", "pgvector"],
    description: "Relational modeling, vector embeddings, caching layers, and NoSQL document storage.",
  },
  {
    name: "AI/ML",
    skills: ["LangChain", "LangGraph", "Retrieval-Augmented Generation (RAG)", "Scikit-Learn", "LightGBM", "SHAP"],
    description: "Multi-agent LLM graphs, vector search, explainable AI, and supervised classification.",
  },
  {
    name: "DevOps & Tools",
    skills: ["Docker", "GitHub Actions", "Nginx", "AWS", "Git", "Linux", "Postman"],
    description: "Containerization, automated CI/CD pipelines, reverse proxying, and cloud deployments.",
  },
];

export const certifications = [
  {
    title: "Fundamentals of AI Agents Using RAG and LangChain",
    issuer: "IBM Coursera",
    date: "2024",
    credentialId: "IBM-RAG-LC-2024",
    description:
      "Deep dive into autonomous AI agents, multi-step prompt engineering, vector databases, and LangChain orchestration for production applications.",
    skillsGained: ["LangChain", "RAG Architecture", "Agent Tooling", "Vector Search"],
  },
];
