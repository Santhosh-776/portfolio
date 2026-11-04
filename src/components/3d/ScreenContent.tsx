import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Lock,
} from 'lucide-react';
import { featuredProjects, skillsCategories } from '../../utils/resumeData';
import { getSkillVisual } from '../../utils/skillsData';

interface ScreenContentProps {
  activeSection: 'hero' | 'skills' | 'projects' | 'experience' | 'contact';
  activeProjectIndex: number;
  activeSkill?: string;
  setActiveSkill?: (skill: string) => void;
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

export const ScreenContent: React.FC<ScreenContentProps> = ({
  activeSection,
  activeProjectIndex,
  activeSkill = 'LangGraph',
  setActiveSkill,
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
        const currentSkill = activeSkill || 'LangGraph';

        const displayedSkills = skillsCategories
          .filter((cat) => selectedCategory === 'All' || cat.name === selectedCategory)
          .flatMap((cat) => cat.skills);

        return (
          <div className="flex flex-col h-full bg-[#070a12] font-sans select-none overflow-hidden">
            {/* macOS Window Titlebar + Category Pills */}
            <div className="h-10 bg-[#0d121c] border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] font-mono text-neutral-400">
                  ~/skills/interactive-matrix
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pointer-events-auto">
                {['All', ...skillsCategories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(cat);
                    }}
                    className={`px-2.5 py-0.5 text-[10px] rounded-full transition-all pointer-events-auto font-sans cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix of Interactive Skill Bubbles (Dedicated Full Screen View) */}
            <div className="flex-1 p-5 flex items-center justify-center overflow-y-auto scrollbar-none pointer-events-auto">
              <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-2xl mx-auto pointer-events-auto">
                {displayedSkills.map((skill) => {
                  const visual = getSkillVisual(skill);
                  const isCurrent = currentSkill === skill;

                  return (
                    <button
                      key={skill}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setActiveSkill?.(skill);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSkill?.(skill);
                      }}
                      title={skill}
                      style={{
                        borderColor: isCurrent ? visual.color : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isCurrent ? `0 0 22px ${visual.color}66` : 'none',
                      }}
                      className={`group relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 pointer-events-auto cursor-pointer border ${
                        isCurrent
                          ? 'bg-white/20 scale-110 -translate-y-1'
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

      {/* --------------------- SECTION 3: PROJECTS PREVIEW SCREEN (WEBSITE IMAGE) --------------------- */}
      {activeSection === 'projects' && (
        <div className="flex flex-col h-full bg-[#080b12] text-white font-sans select-none overflow-hidden">
          {/* Simulated Browser Chrome */}
          <div className="h-10 bg-[#0d121c] border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-sm mx-4 bg-[#05070d] border border-white/10 rounded-full px-3 py-1 flex items-center text-[11px] font-mono text-slate-300">
              <Lock size={11} className="text-emerald-400 mr-2 flex-shrink-0" />
              <span className="text-emerald-400/80 mr-1">https://</span>
              <span className="text-slate-200 truncate">
                {activeProject.previewUrl?.replace('https://', '') || `${activeProject.id}.app/preview`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                0{activeProjectIndex + 1} / 0{featuredProjects.length}
              </span>
            </div>
          </div>

          {/* Website Image Container (Renders user's screenshot or styled mockup) */}
          <div className="flex-1 relative overflow-hidden bg-[#06080e]">
            {activeProject.image ? (
              <img
                key={activeProject.id}
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover object-top transition-opacity duration-500 animate-fadeIn"
              />
            ) : (
              <div
                key={activeProject.id}
                className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#0c1222] via-[#080d1a] to-[#04060c] relative animate-fadeIn"
              >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Mockup Website Navigation */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs text-white">
                      {activeProject.title.charAt(0)}
                    </div>
                    <span className="font-bold text-sm tracking-tight text-white">{activeProject.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {activeProject.status}
                  </span>
                </div>

                {/* Mockup Website Hero & Visual Center */}
                <div className="relative z-10 my-auto text-center space-y-3 py-4">
                  <span className="text-[11px] font-mono text-sky-400 tracking-wider uppercase block">
                    Website Preview &bull; Live Platform
                  </span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight max-w-md mx-auto">
                    {activeProject.subtitle}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans max-w-lg mx-auto line-clamp-2">
                    {activeProject.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {activeProject.tech.slice(0, 5).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-neutral-300 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mockup Website Status Footer & User Image Guide */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Metrics: {activeProject.metrics.split('•')[0]}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    [image ready: set image in resumeData.ts]
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --------------------- SECTION 4: EXPERIENCE & EDUCATION TELEMETRY --------------------- */}
      {activeSection === 'experience' && (
        <div className="flex flex-col h-full bg-[#080b12] text-white font-sans select-none overflow-hidden animate-fadeIn">
          {/* Simulated macOS Terminal Header */}
          <div className="h-9 bg-[#0d121c] border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[11px] font-mono text-slate-300">
              santhosh@workstation : ~/engineering-track-record
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              LIVE
            </span>
          </div>

          {/* Interactive Telemetry Dashboard */}
          <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto font-mono text-xs space-y-3">
            {/* Industry Role */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>&bull; XIBOTIX PVT. LTD</span>
                <span className="text-[10px] text-neutral-400 font-normal">Nov 2024 – May 2025</span>
              </div>
              <p className="text-white text-sm font-semibold font-sans">Full Stack Web Developer Intern</p>
              <div className="text-[11px] text-neutral-300 font-sans space-y-1">
                <p>&bull; 8+ responsive production pages &amp; 15+ modular React components</p>
                <p>&bull; Mechmega platform migration from Wix to custom React architecture</p>
                <p>&bull; Express.js &amp; MongoDB secure microservice APIs</p>
              </div>
            </div>

            {/* Academic Track */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-sky-400 font-bold">
                <span>&bull; VELLORE INSTITUTE OF TECHNOLOGY</span>
                <span className="text-[10px] text-neutral-400 font-normal">CGPA: 8.22 / 10.0</span>
              </div>
              <p className="text-white text-sm font-semibold font-sans">M.Tech (Integrated) in Computer Science</p>
              <p className="text-[11px] text-neutral-300 font-sans">
                Core: Distributed Systems, Operating Systems, Advanced Web Architectures, AI/ML
              </p>
            </div>

            {/* Terminal Prompt Footer */}
            <div className="pt-2 border-t border-white/10 text-neutral-400 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Cluster status: READY_FOR_DEPLOYMENT
              </span>
              <span className="text-neutral-500">zsh &bull; UTF-8</span>
            </div>
          </div>
        </div>
      )}

      {/* --------------------- SECTION 5: CERTIFICATIONS & CONTACT DISPATCH --------------------- */}
      {activeSection === 'contact' && (
        <div className="flex flex-col h-full bg-[#080b12] text-white font-sans select-none overflow-hidden animate-fadeIn">
          {/* Simulated Verified Credential Header */}
          <div className="h-9 bg-[#0d121c] border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[11px] font-mono text-slate-300">
              ibm.coursera.org/verify/IBM-RAG-LC-2024
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-semibold">
              ACCREDITED
            </span>
          </div>

          {/* Credentials & Message Hub */}
          <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto space-y-3">
            {/* Verified Certification Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Verified Industry Credential &bull; IBM
                </span>
                <span className="text-[10px] font-mono text-neutral-400">2024</span>
              </div>
              <h4 className="text-base font-bold font-sans text-white">
                Fundamentals of AI Agents Using RAG &amp; LangChain
              </h4>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Autonomous AI agents, prompt graphs, vector search, and LangChain orchestration for production applications.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['LangChain', 'RAG Architecture', 'Agent Tooling', 'Vector Search'].map((sk) => (
                  <span key={sk} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-200">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connect Status */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-2">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                Communication Relay
              </span>
              <div className="flex items-center justify-between text-neutral-300">
                <span>Receiver:</span>
                <span className="text-white font-bold">santhoshnadarajan.work@gmail.com</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>Availability:</span>
                <span className="text-emerald-400 font-bold">&bull; Open to Full-Time &amp; Contracts</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>Location:</span>
                <span className="text-neutral-200">Tamil Nadu, India (Remote / Hybrid)</span>
              </div>
            </div>

            {/* Live Signal Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Transmission Line: OPEN
              </span>
              <span className="text-neutral-500">[Send message on left]</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
