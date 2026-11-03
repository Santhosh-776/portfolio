import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Search,
  Cpu,
  Lock,
  ArrowRight,
  Network,
  Brain,
  Database,
  Workflow,
  Layers,
  Sparkles,
  Zap,
  BarChart2
} from 'lucide-react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiReactquery,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiJsonwebtokens,
  SiSocketdotio,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiGithubactions,
  SiNginx,
  SiAmazonwebservices,
  SiGit,
  SiLinux,
  SiPostman,
  SiLangchain,
  SiScikitlearn,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { featuredProjects, skillsCategories } from '../../utils/resumeData';

interface ScreenContentProps {
  activeSection: 'hero' | 'skills' | 'projects' | 'experience' | 'contact';
  activeProjectIndex: number;
}

// Continuous streaming code lines with syntax styling
const STREAMING_CODE_SNIPPETS = [
  { num: 1, text: "# --- SANTHOSH N // AI PIPELINE & DISTRIBUTED CORE ---", type: "comment" },
  { num: 2, text: "from langchain_groq import ChatGroq", type: "import" },
  { num: 3, text: "from langgraph.graph import StateGraph, END", type: "import" },
  { num: 4, text: "from fastapi import FastAPI, WebSocket, BackgroundTasks", type: "import" },
  { num: 5, text: "import torch, lightgbm as lgb, shap, asyncio", type: "import" },
  { num: 6, text: "", type: "empty" },
  { num: 7, text: "class MicroserviceClusterSupervisor:", type: "class" },
  { num: 8, text: "    def __init__(self, cluster_id: str = 'deploymind-mesh-01'):", type: "def" },
  { num: 9, text: "        self.cluster_id = cluster_id", type: "body" },
  { num: 10, text: "        self.redis = Redis.from_url('redis://localhost:6379')", type: "body" },
  { num: 11, text: "        self.llm = ChatGroq(model='llama-3.3-70b-versatile', temperature=0.1)", type: "body" },
  { num: 12, text: "        self.active_microservices = 5", type: "body" },
  { num: 13, text: "        self.cluster_health = 'PASSING_100%'", type: "body" },
  { num: 14, text: "", type: "empty" },
  { num: 15, text: "    async def stream_live_build_logs(self, container_id: str):", type: "def" },
  { num: 16, text: "        '''Streams SSE deployment telemetry via Nginx reverse proxy'''", type: "comment" },
  { num: 17, text: "        async for log_chunk in docker_client.logs(container_id, stream=True):", type: "body" },
  { num: 18, text: "            if 'OOMKilled' in log_chunk.decode():", type: "body" },
  { num: 19, text: "                patch = await self.llm.ainvoke('Analyze OOM error in Docker build')", type: "body" },
  { num: 20, text: "                yield f'data: {{\"auto_fix\": \"Allocated 4GB Heap\", \"applied\": True}}\\n\\n'", type: "body" },
  { num: 21, text: "            yield f'data: {log_chunk.decode()}\\n\\n'", type: "body" },
  { num: 22, text: "", type: "empty" },
  { num: 23, text: "class PulmoGuardRiskEngine:", type: "class" },
  { num: 24, text: "    def evaluate_clinical_biometrics(self, patient_features: dict):", type: "def" },
  { num: 25, text: "        '''Evaluates respiratory risk with 90.5% accuracy across 50K records'''", type: "comment" },
  { num: 26, text: "        explainer = shap.TreeExplainer(self.lightgbm_classifier)", type: "body" },
  { num: 27, text: "        shap_waterfall = explainer.shap_values(patient_features['vitals'])", type: "body" },
  { num: 28, text: "        return {", type: "body" },
  { num: 29, text: "            'accuracy': 0.905, 'roc_auc': 0.70, 'specificity': 0.925,", type: "highlight" },
  { num: 30, text: "            'shap_attributions': shap_waterfall,", type: "highlight" },
  { num: 31, text: "            'synthesis': await self.llm.ainvoke('Synthesize clinical risk narrative')", type: "highlight" },
  { num: 32, text: "        }", type: "body" },
  { num: 33, text: "", type: "empty" },
  { num: 34, text: "// Grex Real-Time Socket.IO Synchronization", type: "comment" },
  { num: 35, text: "io.on('connection', (socket) => {", type: "def" },
  { num: 36, text: "    socket.join(`workspace:${socket.handshake.query.workspaceId}`);", type: "body" },
  { num: 37, text: "    socket.broadcast.emit('kanban:state_change', {", type: "body" },
  { num: 38, text: "        user: 'Santhosh N', latency_ms: 18, redis_cached: true", type: "highlight" },
  { num: 39, text: "    });", type: "body" },
  { num: 40, text: "});", type: "def" },
  { num: 41, text: "", type: "empty" },
  { num: 42, text: "export default MicroserviceClusterSupervisor;", type: "import" },
];

interface SkillVisual {
  icon: React.ReactNode;
  color: string;
  bg: string;
}

const SKILL_ICONS: Record<string, SkillVisual> = {
  'JavaScript': { icon: <SiJavascript size={50} />, color: '#F7DF1E', bg: 'rgba(247, 223, 30, 0.15)' },
  'TypeScript': { icon: <SiTypescript size={50} />, color: '#3178C6', bg: 'rgba(49, 120, 198, 0.15)' },
  'Python': { icon: <SiPython size={50} />, color: '#3776AB', bg: 'rgba(55, 118, 171, 0.15)' },
  'Java': { icon: <FaJava size={50} />, color: '#ED8B00', bg: 'rgba(237, 139, 0, 0.15)' },
  'C/C++': { icon: <SiCplusplus size={50} />, color: '#00599C', bg: 'rgba(0, 89, 156, 0.15)' },
  'React.js': { icon: <SiReact size={50} />, color: '#61DAFB', bg: 'rgba(97, 218, 251, 0.15)' },
  'Next.js': { icon: <SiNextdotjs size={50} />, color: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.15)' },
  'Tailwind CSS': { icon: <SiTailwindcss size={50} />, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.15)' },
  'React Query': { icon: <SiReactquery size={50} />, color: '#FF4154', bg: 'rgba(255, 65, 84, 0.15)' },
  'Redux': { icon: <SiRedux size={50} />, color: '#764ABC', bg: 'rgba(118, 74, 188, 0.15)' },
  'Zustand': { icon: <Layers size={50} />, color: '#E97B4C', bg: 'rgba(233, 123, 76, 0.15)' },
  'Node.js': { icon: <SiNodedotjs size={50} />, color: '#5FA04E', bg: 'rgba(95, 160, 78, 0.15)' },
  'Express.js': { icon: <SiExpress size={50} />, color: '#E5E7EB', bg: 'rgba(229, 231, 235, 0.15)' },
  'FastAPI': { icon: <SiFastapi size={50} />, color: '#009688', bg: 'rgba(0, 150, 136, 0.15)' },
  'REST APIs': { icon: <Network size={50} />, color: '#60A5FA', bg: 'rgba(96, 165, 250, 0.15)' },
  'JWT': { icon: <SiJsonwebtokens size={50} />, color: '#D63AFF', bg: 'rgba(214, 58, 255, 0.15)' },
  'Socket.IO': { icon: <SiSocketdotio size={50} />, color: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.15)' },
  'Prisma ORM': { icon: <SiPrisma size={50} />, color: '#4E98E6', bg: 'rgba(78, 152, 230, 0.15)' },
  'PostgreSQL': { icon: <SiPostgresql size={50} />, color: '#4169E1', bg: 'rgba(65, 105, 225, 0.15)' },
  'MongoDB': { icon: <SiMongodb size={50} />, color: '#47A248', bg: 'rgba(71, 162, 72, 0.15)' },
  'Redis': { icon: <SiRedis size={50} />, color: '#DC382D', bg: 'rgba(220, 56, 45, 0.15)' },
  'MySQL': { icon: <SiMysql size={50} />, color: '#4479A1', bg: 'rgba(68, 121, 161, 0.15)' },
  'Firestore': { icon: <SiFirebase size={50} />, color: '#FFCA28', bg: 'rgba(255, 202, 40, 0.15)' },
  'pgvector': { icon: <Database size={50} />, color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.15)' },
  'LangChain': { icon: <SiLangchain size={50} />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  'LangGraph': { icon: <Workflow size={50} />, color: '#34D399', bg: 'rgba(52, 211, 153, 0.15)' },
  'Retrieval-Augmented Generation (RAG)': { icon: <Brain size={50} />, color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.15)' },
  'Scikit-Learn': { icon: <SiScikitlearn size={50} />, color: '#F7931E', bg: 'rgba(247, 147, 30, 0.15)' },
  'LightGBM': { icon: <Zap size={50} />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  'SHAP': { icon: <BarChart2 size={50} />, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.15)' },
  'Docker': { icon: <SiDocker size={50} />, color: '#2496ED', bg: 'rgba(36, 150, 237, 0.15)' },
  'GitHub Actions': { icon: <SiGithubactions size={50} />, color: '#2088FF', bg: 'rgba(32, 136, 255, 0.15)' },
  'Nginx': { icon: <SiNginx size={50} />, color: '#009639', bg: 'rgba(0, 150, 57, 0.15)' },
  'AWS': { icon: <SiAmazonwebservices size={50} />, color: '#FF9900', bg: 'rgba(255, 153, 0, 0.15)' },
  'Git': { icon: <SiGit size={50} />, color: '#F05032', bg: 'rgba(240, 80, 50, 0.15)' },
  'Linux': { icon: <SiLinux size={50} />, color: '#FCC624', bg: 'rgba(252, 198, 36, 0.15)' },
  'Postman': { icon: <SiPostman size={50} />, color: '#FF6C37', bg: 'rgba(255, 108, 55, 0.15)' },
};

const SKILL_DESCRIPTIONS: Record<string, string> = {
  'JavaScript': 'Single-threaded event loop powering the modern open web.',
  'TypeScript': 'JavaScript with superpowers and zero unexpected undefineds.',
  'Python': 'From elegant scripts to heavy-duty distributed AI pipelines.',
  'Java': 'Battle-tested OOP runtime with rock-solid enterprise concurrency.',
  'C/C++': 'Raw silicon performance, manual memory control, and microsecond latency.',
  'React.js': 'Declarative, component-driven client architecture with instant reactive updates.',
  'Next.js': 'Full-stack React with zero-config SSR, streaming, and lightning Edge caching.',
  'Tailwind CSS': 'Utility-first styling crafted directly at the speed of thought.',
  'React Query': 'Effortless server-state synchronization with automatic background re-fetching.',
  'Redux': 'Predictable, centralized state container for deterministic application flows.',
  'Zustand': 'Bear-minimum, un-opinionated state management with zero boilerplate.',
  'Node.js': 'Non-blocking asynchronous I/O driving scalable network services.',
  'Express.js': 'Minimalist, robust routing foundation for modern RESTful microservices.',
  'FastAPI': 'High-performance Python backend with automatic OpenAPI and async speed.',
  'REST APIs': 'Clean architectural contracts powering stateless inter-service communication.',
  'JWT': 'Stateless cryptographic tokens for tamper-proof auth across microservices.',
  'Socket.IO': 'Bidirectional, sub-50ms event streaming for hyper-responsive collaboration.',
  'Prisma ORM': 'Type-safe database querying and schema migrations made delightful.',
  'PostgreSQL': "The world's most advanced relational database with rock-solid ACID reliability.",
  'MongoDB': 'Flexible schema JSON documents built for rapid horizontal scalability.',
  'Redis': 'Blazing in-memory key-value data structures with sub-millisecond lookups.',
  'MySQL': 'Proven relational powerhouse serving scalable production workloads globally.',
  'Firestore': 'Real-time serverless NoSQL documents syncing state instantly across clients.',
  'pgvector': 'High-dimensional vector embeddings stored natively alongside relational tables.',
  'LangChain': 'Chaining LLMs, prompt templates, and external tools into autonomous workflows.',
  'LangGraph': 'Cyclic, multi-agent state machines orchestrating resilient AI reasoning loops.',
  'Retrieval-Augmented Generation (RAG)': 'Grounding generative models with semantic domain knowledge without fine-tuning.',
  'Scikit-Learn': 'Classical predictive machine learning algorithms refined to mathematical perfection.',
  'LightGBM': 'Gradient-boosted decision trees delivering top-tier tabular classification accuracy.',
  'SHAP': 'Game-theoretic Shapley values providing crystal-clear explainability to black-box models.',
  'Docker': 'Ship once, run reliably anywhere across isolated, containerized runtimes.',
  'GitHub Actions': 'Automated CI/CD pipelines deploying code from Git commit to production.',
  'Nginx': 'High-concurrency reverse proxy, SSL termination, and static asset acceleration.',
  'AWS': 'Global hyperscale cloud infrastructure powering resilient compute and storage.',
  'Git': 'Distributed version control preserving every single commit, branch, and rebase.',
  'Linux': 'The kernel of the internet — rock-solid stability and terminal-first power.',
  'Postman': 'End-to-end API testing, automated contract validation, and mocking.',
};

function getSkillVisual(name: string): SkillVisual {
  return SKILL_ICONS[name] || {
    icon: <Sparkles size={20} />,
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.15)',
  };
}

export const ScreenContent: React.FC<ScreenContentProps> = ({
  activeSection,
  activeProjectIndex,
}) => {
  // Moving Code Stream Ref
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const isPaused = false;

  // Terminal state for Hero
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'macOS 15.2 (24C101) Apple M3 Max • 64GB Unified Memory',
    'Cluster daemon initialized: deploymind-mesh-01 [STATUS: READY]',
    'SSE Event stream mounted at /api/v1/deployments/logs (Nginx :443)',
    'LangGraph multi-agent supervisor listening on port :8000',
  ]);

  // Skills state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string | null>('React.js');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Continuous auto-scrolling moving code stream
  useEffect(() => {
    const el = codeContainerRef.current;
    if (!el) return;

    let animId: number;
    let scrollPos = el.scrollTop;

    const scrollStep = () => {
      if (!isPaused && el) {
        scrollPos += 0.85; // smooth scrolling speed
        if (scrollPos >= el.scrollHeight - el.clientHeight) {
          scrollPos = 0; // loop back seamlessly
        }
        el.scrollTop = scrollPos;
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, activeSection]);

  // Live Terminal Log Generator
  useEffect(() => {
    if (activeSection !== 'hero') return;
    const interval = setInterval(() => {
      const liveEvents = [
        `[${new Date().toLocaleTimeString()}] SSE stream: dispatched telemetry packet (p99 < 32ms)`,
        `[${new Date().toLocaleTimeString()}] Groq LLM: generated auto-fix proposal in 240ms`,
        `[${new Date().toLocaleTimeString()}] LangGraph: RAG vector similarity computed (cosine: 0.96)`,
        `[${new Date().toLocaleTimeString()}] Docker: Microservice container recycled in 120ms`,
        `[${new Date().toLocaleTimeString()}] Redis: Cached 10+ PostgreSQL models with Prisma ORM`,
      ];
      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      setTerminalLogs((prev) => [...prev.slice(-6), randomEvent]);
    }, 2400);
    return () => clearInterval(interval);
  }, [activeSection]);

  const activeProject = featuredProjects[activeProjectIndex] || featuredProjects[0];

  return (
    <div className="w-full h-full bg-[#07090e] text-slate-200 font-mono flex flex-col overflow-hidden select-none">
      {/* --------------------- SECTION 1: HERO SCREEN (MOVING CODE STREAM) --------------------- */}
      {(activeSection === 'hero' || activeSection === 'contact' || activeSection === 'experience') && (
        <div className="flex flex-col h-full bg-[#06080d]">
          {/* macOS Space Grey MacBook Window Titlebar */}
          <div className="h-9 bg-[#111318] border-b border-white/10 px-4 flex items-center justify-between">
            {/* macOS Window Traffic Lights */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110" />
              <span className="ml-3 text-[11px] text-neutral-400 font-sans font-medium">
                santhosh@Cyberpunk: ~/projects/core-systems (zsh)
              </span>
            </div>


          </div>

          {/* Continuously Moving & Scrolling Code Stream */}
          <div
            ref={codeContainerRef}
            className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto space-y-1 scrollbar-none"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Render duplicated stream so user sees continuous flowing code */}
            {[...STREAMING_CODE_SNIPPETS, ...STREAMING_CODE_SNIPPETS].map((line, idx) => (
              <div key={idx} className="flex items-start gap-3 hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
                <span className="w-6 text-right text-neutral-600 select-none flex-shrink-0 text-[10px]">
                  {line.type === 'empty' ? '' : ((idx % STREAMING_CODE_SNIPPETS.length) + 1)}
                </span>
                <span className="flex-1 whitespace-pre">
                  {line.type === 'comment' && (
                    <span className="text-neutral-500 italic">{line.text}</span>
                  )}
                  {line.type === 'import' && (
                    <span className="text-purple-400 font-semibold">{line.text}</span>
                  )}
                  {line.type === 'class' && (
                    <span className="text-yellow-300 font-bold">{line.text}</span>
                  )}
                  {line.type === 'def' && (
                    <span className="text-sky-400 font-semibold">{line.text}</span>
                  )}
                  {line.type === 'highlight' && (
                    <span className="text-emerald-300">{line.text}</span>
                  )}
                  {line.type === 'body' && (
                    <span className="text-slate-200">{line.text}</span>
                  )}
                  {line.type === 'empty' && <span>&nbsp;</span>}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Live Terminal Telemetry Output */}
          <div className="h-28 bg-[#090b10] border-t border-white/10 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] text-neutral-400 border-b border-white/5 pb-1 mb-1">
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Terminal size={12} /> LIVE CLUSTER TELEMETRY / STDOUT
              </span>
              <span className="text-emerald-400">Microservices: 5/5 Healthy</span>
            </div>
            <div className="space-y-1 text-[10px] text-slate-300 font-mono overflow-hidden">
              {terminalLogs.slice(-3).map((log, i) => (
                <div key={i} className="flex items-center gap-2 truncate">
                  <span className="text-sky-400">&gt;</span>
                  <span className="truncate">{log}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sky-400">
                <span>&gt;</span>
                <span className="inline-block w-2 h-3 bg-sky-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------- SECTION 2: SKILLS BUBBLE CLOUD --------------------- */}
      {activeSection === 'skills' && (() => {
        const activeSkillName = hoveredSkill || selectedSkill || 'React.js';
        const activeVisual = getSkillVisual(activeSkillName);
        const activeDesc =
          SKILL_DESCRIPTIONS[activeSkillName] ||
          'Modern production technology powering high-performance distributed architectures.';
        const activeCategory =
          skillsCategories.find((cat) => cat.skills.includes(activeSkillName))?.name || 'Technology';

        const displayedSkills = skillsCategories
          .filter((cat) => selectedCategory === 'All' || cat.name === selectedCategory)
          .flatMap((cat) => cat.skills);

        return (
          <div className="flex flex-col h-full bg-[#070a12] font-sans select-none overflow-hidden">
            {/* macOS Window Titlebar + Category Pills */}
            <div className="h-9 bg-[#0d121c] border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] font-mono text-neutral-400">
                  ~/skills/tech-stack
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pointer-events-auto">
                {['All', ...skillsCategories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(cat);
                    }}
                    className={`px-2 py-0.5 text-[10px] rounded-full transition-all pointer-events-auto font-sans cursor-pointer ${selectedCategory === cat
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Showcase: Dynamic Skill Name & Crisp Fancy Description */}
            <div className="h-28 px-6 py-3 flex flex-col justify-center items-center text-center border-b border-white/5 bg-gradient-to-b from-[#0b101c] to-[#070a12] flex-shrink-0 pointer-events-none">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span
                  className="text-2xl font-extrabold font-sans tracking-tight drop-shadow"
                  style={{ color: activeVisual.color }}
                >
                  {activeSkillName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                  {activeCategory}
                </span>
              </div>

              <p className="text-[13px] font-sans font-medium text-slate-200 leading-snug tracking-wide italic max-w-lg">
                &ldquo;{activeDesc}&rdquo;
              </p>

              <span className="text-[10px] text-neutral-400 font-sans mt-1 block">
                (hover or tap any skill bubble)
              </span>
            </div>

            {/* Bottom Showcase: Centered Interactive Skill Bubbles Cloud */}
            <div className="flex-1 p-4 flex items-center justify-center overflow-y-auto scrollbar-none pointer-events-auto">
              <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto pointer-events-auto">
                {displayedSkills.map((skill) => {
                  const visual = getSkillVisual(skill);
                  const isCurrent = activeSkillName === skill;

                  return (
                    <button
                      key={skill}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setHoveredSkill(skill);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        setHoveredSkill(null);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSkill(skill);
                      }}
                      title={skill}
                      style={{
                        borderColor: isCurrent ? visual.color : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isCurrent ? `0 0 18px ${visual.color}55` : 'none',
                      }}
                      className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 pointer-events-auto cursor-pointer border ${isCurrent
                        ? 'bg-white/15 scale-110 -translate-y-1'
                        : 'bg-white/[0.04] hover:bg-white/[0.1] hover:scale-105 hover:-translate-y-0.5'
                        }`}
                    >
                      <div
                        style={{ color: visual.color }}
                        className="flex items-center justify-center transition-transform group-hover:scale-110 pointer-events-none"
                      >
                        {visual.icon}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* --------------------- SECTION 3: PROJECTS PREVIEW SCREEN --------------------- */}
      {activeSection === 'projects' && (
        <div className="flex flex-col h-full bg-[#090d16]">
          {/* Simulated Browser Chrome */}
          <div className="h-10 bg-[#111728] border-b border-white/10 px-4 flex items-center justify-between font-sans">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-md mx-4 bg-[#070a12] border border-white/10 rounded-full px-3 py-1 flex items-center text-xs font-mono text-slate-300">
              <Lock size={11} className="text-emerald-400 mr-2 flex-shrink-0" />
              <span className="text-emerald-400/80 mr-1">https://</span>
              <span className="text-slate-200 truncate">
                {activeProject.id === 'deploymind' && 'deploymind.cloud/dashboard/cluster-01'}
                {activeProject.id === 'grex' && 'grex.workspace.ai/projects/sprint-4'}
                {activeProject.id === 'pulmoguard' && 'pulmoguard.ai/clinical/risk-screening'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-white text-black font-bold">
                ACTIVE #{activeProjectIndex + 1}
              </span>
            </div>
          </div>

          {/* Project Specific Interactive Dashboard */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col justify-between font-sans">
            {/* 1. DEPLOYMIND PREVIEW */}
            {activeProject.id === 'deploymind' && (
              <div className="space-y-3">
                {/* Cluster metrics header */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-[#121a2d] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">MICROSERVICES</span>
                    <span className="text-sm font-bold text-white font-mono">5 ACTIVE</span>
                  </div>
                  <div className="bg-[#121a2d] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">BUILD STATUS</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">PASSING (100%)</span>
                  </div>
                  <div className="bg-[#121a2d] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">AI ROOT-CAUSE</span>
                    <span className="text-sm font-bold text-white font-mono">GROQ LLM</span>
                  </div>
                  <div className="bg-[#121a2d] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">LOG STREAM</span>
                    <span className="text-sm font-bold text-white font-mono">SSE / NGINX</span>
                  </div>
                </div>

                {/* AI Error Analysis Card */}
                <div className="bg-[#131d33] border border-neutral-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Cpu size={14} className="text-white" /> Groq LLM Diagnostic Engine
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Auto-Patched in 280ms
                    </span>
                  </div>
                  <div className="bg-black/40 rounded p-2 font-mono text-[11px] text-slate-300 space-y-1">
                    <p className="text-rose-400">
                      [Error] Step 4/8 Dockerfile: OOMKilled in node:20-alpine build runner.
                    </p>
                    <p className="text-emerald-300">
                      [AI Fix Proposal] Set NODE_OPTIONS="--max-old-space-size=4096" in Docker env.
                    </p>
                    <p className="text-neutral-400 text-[10px]">
                      &gt; Patch applied to deploy branch automatically. Redeploying container...
                    </p>
                  </div>
                </div>

                {/* Microservice Live Status Table */}
                <div className="bg-[#101728] border border-neutral-700 rounded-lg p-2.5">
                  <div className="flex justify-between items-center mb-1 text-[11px] text-neutral-400">
                    <span>CONTAINER MESH</span>
                    <span>CPU / RAM</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    {[
                      { name: 'deploymind-auth-srv', port: ':4000', status: 'Healthy', stat: '1.2% / 128MB' },
                      { name: 'deploymind-worker-runner', port: ':5001', status: 'Healthy', stat: '8.4% / 512MB' },
                      { name: 'deploymind-groq-diagnostics', port: ':8000', status: 'Active', stat: '3.1% / 256MB' },
                    ].map((srv, i) => (
                      <div key={i} className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-slate-200">{srv.name}</span>
                          <span className="text-neutral-500 text-[10px]">{srv.port}</span>
                        </div>
                        <span className="text-neutral-400 text-[11px]">{srv.stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. GREX PREVIEW */}
            {activeProject.id === 'grex' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#121c2e] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">REAL-TIME SOCKET</span>
                    <span className="text-sm font-bold text-white font-mono">&lt; 50ms Latency</span>
                  </div>
                  <div className="bg-[#121c2e] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">POSTGRES + PRISMA</span>
                    <span className="text-sm font-bold text-white font-mono">10+ DB Models</span>
                  </div>
                  <div className="bg-[#121c2e] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">LANGGRAPH RAG</span>
                    <span className="text-sm font-bold text-white font-mono">Doc Summarizer</span>
                  </div>
                </div>

                <div className="bg-[#101728] border border-neutral-700 rounded-lg p-2.5">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-2">
                    Live Sprint Board (Socket.IO Synchronized)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#0b101c] rounded p-2 border border-white/5">
                      <span className="text-[10px] text-neutral-400 block mb-1">TO DO (2)</span>
                      <div className="bg-white/5 rounded p-1.5 text-xs text-slate-200 mb-1 font-mono">
                        RBAC Role Permissions
                      </div>
                      <div className="bg-white/5 rounded p-1.5 text-xs text-slate-200 font-mono">
                        Redis Cache Invalidation
                      </div>
                    </div>
                    <div className="bg-[#0b101c] rounded p-2 border border-white/5">
                      <span className="text-[10px] text-white font-bold block mb-1">IN PROGRESS</span>
                      <div className="bg-white/10 border border-white/20 rounded p-1.5 text-xs text-white font-mono">
                        LangGraph Document RAG
                      </div>
                    </div>
                    <div className="bg-[#0b101c] rounded p-2 border border-white/5">
                      <span className="text-[10px] text-emerald-400 block mb-1">DONE</span>
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-1.5 text-xs text-emerald-200 font-mono">
                        25+ REST Endpoints
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#131d33] border border-neutral-700 rounded-lg p-2.5 font-mono">
                  <div className="flex items-center gap-1.5 text-xs text-white font-bold mb-1">
                    <Search size={13} /> LangGraph Semantic Knowledge Query
                  </div>
                  <div className="text-[11px] text-slate-300 bg-black/40 p-2 rounded">
                    <span className="text-white">Q:</span> "Summarize sprint blockers for team backend"
                    <br />
                    <span className="text-emerald-400">A:</span> "Retrieved 3 PRs and 2 issues. Zero blockers; auth module passed 100% tests."
                  </div>
                </div>
              </div>
            )}

            {/* 3. PULMOGUARD AI PREVIEW */}
            {activeProject.id === 'pulmoguard' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#121c2e] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">CLASSIFICATION ACCURACY</span>
                    <span className="text-base font-bold text-white font-mono">90.5% (50K Records)</span>
                  </div>
                  <div className="bg-[#121c2e] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">ROC-AUC / SPECIFICITY</span>
                    <span className="text-base font-bold text-white font-mono">0.70 / 92.5%</span>
                  </div>
                  <div className="bg-[#121c2e] border border-neutral-700 rounded p-2">
                    <span className="text-[10px] text-neutral-400 block">EXPLAINABILITY</span>
                    <span className="text-base font-bold text-white font-mono">SHAP Waterfall</span>
                  </div>
                </div>

                <div className="bg-[#101728] border border-neutral-700 rounded-lg p-2.5">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-2">
                    SHAP Feature Attribution (Transparent Clinical Reasoning)
                  </span>
                  <div className="space-y-1.5 font-mono text-xs">
                    {[
                      { feature: 'FEV1 / FVC Ratio', impact: '+0.48 Risk', color: 'bg-rose-500', width: '75%' },
                      { feature: 'Smoking Pack-Years', impact: '+0.32 Risk', color: 'bg-amber-500', width: '55%' },
                      { feature: 'SpO2 Oxygen Saturation', impact: '-0.25 Protective', color: 'bg-emerald-500', width: '40%' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/5 px-2.5 py-1.5 rounded">
                        <span className="text-slate-300">{item.feature}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: item.width }} />
                          </div>
                          <span className="text-[11px] text-slate-300 w-24 text-right">{item.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#121d30] border border-neutral-700 rounded-lg p-2.5 font-mono text-[11px]">
                  <span className="text-white font-bold block mb-1">
                    LangChain + Groq LLM Medical Synthesis:
                  </span>
                  <p className="text-slate-300 leading-snug">
                    "Patient displays elevated obstructive risk based on spirometry variance. Recommendation: Secondary spirometry screening and pulmonary consultation."
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Project Navigation / Github CTA */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs font-sans">
              <span className="text-neutral-400">
                Tech: {activeProject.tech.slice(0, 4).join(', ')} + more
              </span>
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white hover:bg-neutral-200 text-black font-bold rounded flex items-center gap-1.5 pointer-events-auto transition-colors"
              >
                View Repository <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
