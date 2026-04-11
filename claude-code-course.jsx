
import { useState } from "react";

const courseData = {
  title: "Claude Code 完全指南",
  subtitle: "從零基礎到 AI 系統建設專家",
  stats: { phases: 5, modules: 20, lessons: 90, hours: "30+" },
  phases: [
    {
      id: 1, icon: "🌱", name: "入門篇", nameEn: "Getting Started",
      color: "#4ade80", bg: "rgba(74,222,128,0.08)",
      description: "認識 Claude Code，完成安裝，寫出你的第一個 AI 指令",
      modules: [
        { id: "1.1", title: "什麼是 Claude Code？", time: "30 分鐘", type: "概念", typeColor: "#60a5fa",
          desc: "了解 Claude Code 的定位、應用場景、與其他 AI 工具的分別",
          lessons: ["Claude Code 介紹與定位", "vs ChatGPT vs Cursor 比較", "適合什麼人學習？", "課程學習路線概覽"] },
        { id: "1.2", title: "安裝與環境設置", time: "45 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "一步一步完成 Node.js、Claude Code、API Key 的安裝與配置",
          lessons: ["Node.js 安裝 (Windows/Mac/Linux)", "npm install -g @anthropic-ai/claude-code", "API Key 申請與設置", "第一次啟動 claude 指令"] },
        { id: "1.3", title: "第一個 AI 指令", time: "30 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "親手讓 Claude Code 創建文件、寫代碼，感受 AI 編程的威力",
          lessons: ["基本問答互動模式", "讓 AI 創建你的第一個文件", "讓 AI 寫你的第一個程式", "理解 Claude Code 的回應格式"] },
        { id: "1.4", title: "基本操作導覽", time: "30 分鐘", type: "概念", typeColor: "#60a5fa",
          desc: "掌握常用快捷鍵、指令格式、取消操作的方法",
          lessons: ["常用快捷鍵一覽", "/help 指令使用", "Escape 取消操作", "查看成本 /cost"] },
      ]
    },
    {
      id: 2, icon: "🔧", name: "基礎應用", nameEn: "Foundation",
      color: "#60a5fa", bg: "rgba(96,165,250,0.08)",
      description: "掌握 CLAUDE.md 記憶系統、文件操作、代碼生成、調試技巧",
      modules: [
        { id: "2.1", title: "CLAUDE.md — AI 記憶庫", time: "60 分鐘", type: "核心", typeColor: "#f59e0b",
          desc: "學習設計 CLAUDE.md 讓 Claude Code 記住你的項目規則與偏好",
          lessons: ["CLAUDE.md 的作用與原理", "文件結構設計模板", "設置項目規則與約束", "自定義常用指令快捷方式", "實戰：為項目建立 CLAUDE.md"] },
        { id: "2.2", title: "文件操作大師", time: "45 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "讀取、創建、修改、重構文件，管理複雜的目錄結構",
          lessons: ["讀取與分析現有代碼", "創建文件與目錄結構", "批量修改文件", "搜索與替換文本", "代碼重構指令"] },
        { id: "2.3", title: "代碼生成技巧", time: "60 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "學習高效描述需求，讓 Claude Code 生成高質量、符合規範的代碼",
          lessons: ["最佳提示方式與格式", "指定語言、框架、風格", "生成完整功能模塊", "代碼注釋與文檔生成", "單元測試代碼生成"] },
        { id: "2.4", title: "調試與錯誤修復", time: "45 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "利用 Claude Code 分析錯誤、逐步調試、優化代碼質量",
          lessons: ["貼上錯誤信息讓 AI 分析", "逐步調試策略", "常見錯誤類型速查", "代碼審查與性能優化"] },
      ]
    },
    {
      id: 3, icon: "⚡", name: "進階技巧", nameEn: "Intermediate",
      color: "#f59e0b", bg: "rgba(245,158,11,0.08)",
      description: "精通 Slash Commands、MCP 工具整合、大型項目管理與自動化",
      modules: [
        { id: "3.1", title: "Slash Commands 精通", time: "45 分鐘", type: "技巧", typeColor: "#e879f9",
          desc: "掌握所有內建指令，並建立自己的自定義指令庫",
          lessons: ["/clear /compact /cost 詳解", "/review /test /fix 應用", "自定義 Slash Commands", "建立個人指令庫", "指令組合技巧"] },
        { id: "3.2", title: "MCP 工具整合", time: "90 分鐘", type: "核心", typeColor: "#f59e0b",
          desc: "學習 Model Context Protocol，連接文件系統、網絡搜索、郵件等外部服務",
          lessons: ["MCP 原理與架構", "安裝配置 MCP Server", "Filesystem MCP 文件工具", "Tavily Search 網絡搜索", "Gmail MCP 郵件自動化", "建立第一個 MCP 工作流程"] },
        { id: "3.3", title: "大型項目管理", time: "60 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "在擁有數千個文件的大型代碼庫中高效使用 Claude Code",
          lessons: ["多文件項目結構最佳實踐", "代碼庫快速分析", "跨文件重構技術", "依賴關係管理", "Git 整合工作流程"] },
        { id: "3.4", title: "自動化工作流程", time: "75 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "設計並實現可靠的自動化腳本，配合 Task Scheduler 定時執行",
          lessons: ["批量文件處理腳本", "Task Scheduler 定時任務", "工作流程設計模式", "錯誤處理與重試機制", "日誌記錄與監控"] },
      ]
    },
    {
      id: 4, icon: "🏗️", name: "系統建設", nameEn: "Advanced",
      color: "#f97316", bg: "rgba(249,115,22,0.08)",
      description: "建立 AI Agent、多代理協作系統、安全管理、生產環境部署",
      modules: [
        { id: "4.1", title: "建立第一個 AI Agent", time: "120 分鐘", type: "項目", typeColor: "#4ade80",
          desc: "從設計到實現，建立一個能夠自主完成任務的 AI Agent",
          lessons: ["AI Agent 設計原則", "定義 Agent 目標與邊界", "Agent 記憶系統設計", "實戰：自動化報告 Agent", "測試與調優 Agent"] },
        { id: "4.2", title: "多代理協作系統", time: "90 分鐘", type: "進階", typeColor: "#e879f9",
          desc: "設計 Supervisor + Worker 架構，實現並行任務處理",
          lessons: ["多代理架構設計原則", "Agent 通信協議", "並行 vs 串行任務分配", "實戰：Supervisor+Worker 架構", "衝突處理與容錯設計"] },
        { id: "4.3", title: "安全與權限管理", time: "60 分鐘", type: "重要", typeColor: "#ef4444",
          desc: "了解 Claude Code 的權限模型，確保生產環境的安全性",
          lessons: ["Claude Code 權限模型", "--dangerously-skip-permissions 須知", "生產環境安全實踐", "敏感數據處理方法", "審計日誌與監控設置"] },
        { id: "4.4", title: "生產環境部署", time: "90 分鐘", type: "實踐", typeColor: "#4ade80",
          desc: "將 Claude Code 應用部署到雲端服務器，配置 CI/CD 管道",
          lessons: ["Docker 容器化應用", "CI/CD 管道整合", "AWS/GCP 服務器配置", "環境變量與密鑰管理", "監控與告警系統"] },
      ]
    },
    {
      id: 5, icon: "🎯", name: "專家實戰", nameEn: "Expert",
      color: "#e879f9", bg: "rgba(232,121,249,0.08)",
      description: "企業架構設計、自定義 MCP Server 開發、提示工程、真實案例研究",
      modules: [
        { id: "5.1", title: "企業級架構設計", time: "120 分鐘", type: "架構", typeColor: "#f59e0b",
          desc: "設計高可用、可擴展的企業級 AI 系統架構",
          lessons: ["大規模 AI 系統設計模式", "微服務與 Claude Code 整合", "高可用性架構設計", "成本優化策略", "團隊協作最佳實踐"] },
        { id: "5.2", title: "自定義 MCP Server 開發", time: "150 分鐘", type: "開發", typeColor: "#60a5fa",
          desc: "從零開發專屬業務的 MCP Server，打造完全定制化的 AI 工具",
          lessons: ["MCP Server 開發環境", "設計自定義工具接口", "實戰：業務系統 MCP Server", "測試與發佈流程", "MCP Server 安全性"] },
        { id: "5.3", title: "提示工程精通", time: "90 分鐘", type: "技術", typeColor: "#e879f9",
          desc: "掌握高級提示技術，最大化 Claude Code 的輸出質量",
          lessons: ["System Prompt 高級設計", "Chain-of-Thought 技術", "Few-Shot 學習應用", "指令優化與測試", "建立個人提示庫"] },
        { id: "5.4", title: "真實案例研究", time: "120 分鐘", type: "案例", typeColor: "#4ade80",
          desc: "深度分析真實商業項目中 Claude Code 的應用，學習系統設計思維",
          lessons: ["案例1：自動化發票系統", "案例2：AI 投資分析 Agent", "案例3：B2B 郵件外展自動化", "案例4：多平台客服系統", "系統設計思維總結"] },
      ]
    }
  ]
};

const claudeCodeSetup = {
  folderStructure: `claude-code-course/
├── CLAUDE.md              # AI 記憶與指令配置
├── course-config.json     # 課程配置
├── prompts/               # 生成提示庫
│   ├── module-generator.md
│   ├── lesson-generator.md
│   └── quiz-generator.md
├── output/                # 生成的課程內容
│   ├── phase-1/
│   ├── phase-2/
│   └── ...
└── assets/                # 圖片與資源`,
  claudeMd: `# Claude Code 課程生成系統

## 項目目標
生成一套完整的 Claude Code 學習課程，目標讀者為零基礎學習者。

## 輸出格式要求
- 每個模塊輸出 Markdown 格式
- 包含：學習目標、理論解釋、代碼示例、實踐練習、小測驗
- 語言：繁體中文，技術術語保留英文
- 每課至少包含 2 個代碼示例和 1 個動手練習

## 文件命名規範
module-{phase}-{module}-{title}.md

## 代碼示例規範
- 必須可以直接複製執行
- 包含詳細注釋
- 提供預期輸出說明

## 禁止事項
- 不要生成過於複雜的示例
- 不要假設讀者有編程基礎
- 不要省略安裝步驟`,
  generateCommands: [
    { phase: "Phase 1 入門篇", cmd: 'claude "根據 course-config.json 中的 Phase 1 配置，為模塊 1.1 生成完整的學習材料，保存到 output/phase-1/module-1.1.md"' },
    { phase: "Phase 2 基礎應用", cmd: 'claude "生成 CLAUDE.md 配置的完整教學，包含 5 個不同使用場景的真實示例"' },
    { phase: "Phase 3 MCP 整合", cmd: 'claude "為 MCP 工具整合模塊生成分步安裝教學，包含截圖說明文字和常見錯誤解決方案"' },
    { phase: "批量生成所有模塊", cmd: 'claude "讀取 course-config.json，為所有 20 個模塊生成完整教學材料，每個模塊單獨保存文件"' },
  ]
};

export default function ClaudeCodeCourse() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedModule, setExpandedModule] = useState(null);
  const [activeTab, setActiveTab] = useState("curriculum"); // "curriculum" | "setup"
  const [copiedCmd, setCopiedCmd] = useState(null);

  const phase = courseData.phases[activePhase];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const totalTime = phase.modules.reduce((sum, m) => sum + parseInt(m.time), 0);

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: "#07090f", minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .phase-btn { cursor: pointer; transition: all 0.2s; border: 1px solid transparent; background: rgba(255,255,255,0.04); }
        .phase-btn:hover { background: rgba(255,255,255,0.08); }
        .phase-btn.active { background: rgba(255,255,255,0.07); }
        .module-card { cursor: pointer; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.07); }
        .module-card:hover { border-color: rgba(255,255,255,0.18); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
        .module-card.expanded { border-color: currentColor !important; }
        .lesson-row { padding: 7px 10px; border-radius: 6px; cursor: default; transition: background 0.15s; display: flex; align-items: center; gap: 10px; }
        .lesson-row:hover { background: rgba(255,255,255,0.05); }
        .tab-btn { cursor: pointer; padding: 10px 24px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #94a3b8; font-size: 14px; font-weight: 500; transition: all 0.2s; }
        .tab-btn:hover { background: rgba(255,255,255,0.06); color: #e2e8f0; }
        .tab-btn.active { background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.2); }
        .copy-btn { cursor: pointer; padding: 4px 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: #94a3b8; font-size: 11px; font-family: inherit; transition: all 0.2s; }
        .copy-btn:hover { background: rgba(255,255,255,0.1); color: white; }
        .copy-btn.copied { background: rgba(74,222,128,0.15); border-color: #4ade80; color: #4ade80; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.25s ease; }
        @keyframes shimmer { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .shimmer { animation: shimmer 2s infinite; }
        ::-webkit-scrollbar { width: 4px; height: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {/* HERO */}
      <div style={{ background: "linear-gradient(180deg, #0d1220 0%, #07090f 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "48px 24px 36px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 6, padding: "4px 10px" }}>claude --version 1.0</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#60a5fa", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 6, padding: "4px 10px" }}>繁體中文</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 6, padding: "4px 10px" }}>零基礎適用</div>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            <span style={{ background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Claude Code</span>
            <br/>
            <span style={{ background: "linear-gradient(135deg, #4ade80 0%, #60a5fa 50%, #e879f9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>完全指南</span>
          </h1>
          <p style={{ fontSize: 17, color: "#94a3b8", margin: "0 0 32px", maxWidth: 540, lineHeight: 1.6 }}>
            {courseData.subtitle} — 由安裝到建立真實 AI 系統，一步一步帶你走完整個旅程
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { val: "5", label: "學習階段", color: "#4ade80" },
              { val: "20", label: "學習模塊", color: "#60a5fa" },
              { val: "90+", label: "實踐課節", color: "#f59e0b" },
              { val: "30+", label: "學習小時", color: "#e879f9" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 8, paddingTop: 16, paddingBottom: 16 }}>
          {[
            { id: "curriculum", label: "📚 課程內容" },
            { id: "setup", label: "⚙️ Claude Code 生成指引" },
          ].map(t => (
            <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>

        {activeTab === "curriculum" && (
          <div className="fade-in">
            {/* PHASE NAV */}
            <div style={{ display: "flex", gap: 10, padding: "24px 0 0", overflowX: "auto", paddingBottom: 4 }}>
              {courseData.phases.map((p, i) => (
                <button key={p.id} className={`phase-btn ${activePhase === i ? "active" : ""}`}
                  onClick={() => { setActivePhase(i); setExpandedModule(null); }}
                  style={{ borderRadius: 12, padding: "10px 18px", display: "flex", flexDirection: "column", gap: 4, minWidth: 130, alignItems: "flex-start", borderColor: activePhase === i ? p.color : "transparent" }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: activePhase === i ? p.color : "#94a3b8", whiteSpace: "nowrap" }}>Phase {p.id}</span>
                  <span style={{ fontSize: 11, color: activePhase === i ? "#e2e8f0" : "#64748b", whiteSpace: "nowrap" }}>{p.name}</span>
                </button>
              ))}
            </div>

            {/* PHASE HEADER */}
            <div className="fade-in" style={{ marginTop: 24, background: phase.bg, border: `1px solid ${phase.color}22`, borderRadius: 16, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: phase.color, marginBottom: 4 }}>
                  {phase.icon} Phase {phase.id} — {phase.name}
                </div>
                <div style={{ fontSize: 14, color: "#94a3b8", maxWidth: 500 }}>{phase.description}</div>
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: phase.color }}>{phase.modules.length}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>模塊</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: phase.color }}>{totalTime}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>分鐘</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: phase.color }}>{phase.modules.reduce((s,m)=>s+m.lessons.length,0)}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>課節</div>
                </div>
              </div>
            </div>

            {/* MODULES */}
            <div className="fade-in" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16, marginTop: 20 }}>
              {phase.modules.map((mod) => {
                const isExpanded = expandedModule === mod.id;
                return (
                  <div key={mod.id} className={`module-card ${isExpanded ? "expanded" : ""}`}
                    style={{ borderRadius: 14, background: "#0d1220", overflow: "hidden", borderColor: isExpanded ? phase.color + "55" : "rgba(255,255,255,0.07)" }}
                    onClick={() => setExpandedModule(isExpanded ? null : mod.id)}>
                    <div style={{ padding: "20px 20px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748b" }}>{mod.id}</span>
                          <span style={{ fontSize: 11, background: mod.typeColor + "18", color: mod.typeColor, border: `1px solid ${mod.typeColor}33`, borderRadius: 5, padding: "2px 8px" }}>{mod.type}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 11, color: "#64748b" }}>🕐 {mod.time}</span>
                          <span style={{ color: "#64748b", fontSize: 12, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▼</span>
                        </div>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: "#f1f5f9", lineHeight: 1.3 }}>{mod.title}</h3>
                      <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.5 }}>{mod.desc}</p>
                    </div>

                    {isExpanded && (
                      <div className="fade-in" style={{ borderTop: `1px solid ${phase.color}22`, padding: "14px 20px 18px", background: phase.bg }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: phase.color, marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>課節內容</div>
                        {mod.lessons.map((lesson, li) => (
                          <div key={li} className="lesson-row">
                            <span style={{ width: 20, height: 20, borderRadius: 4, background: phase.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: phase.color, fontWeight: 700, flexShrink: 0 }}>{li + 1}</span>
                            <span style={{ fontSize: 13, color: "#cbd5e1" }}>{lesson}</span>
                          </div>
                        ))}
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                          <button style={{ padding: "7px 14px", borderRadius: 7, background: phase.color + "18", border: `1px solid ${phase.color}40`, color: phase.color, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                            onClick={e => { e.stopPropagation(); copyToClipboard(`claude "生成模塊 ${mod.id} ${mod.title} 的完整教學材料，包含學習目標、理論解釋、代碼示例和練習題，保存為 output/module-${mod.id}.md"`, mod.id); }}>
                            {copiedCmd === mod.id ? "✓ 已複製" : "📋 複製生成指令"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "setup" && (
          <div className="fade-in" style={{ paddingTop: 28 }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>⚙️ 用 Claude Code 生成課程內容</h2>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>按以下步驟設置，然後用 Claude Code 自動生成完整課程材料</p>
            </div>

            {/* Step 1: Folder */}
            <div style={{ background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#4ade80" }}>Step 1 — 建立項目資料夾結構</div>
              <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#94a3b8", background: "#060810", borderRadius: 8, padding: 16, overflowX: "auto", lineHeight: 1.7, border: "1px solid rgba(255,255,255,0.05)" }}>
{claudeCodeSetup.folderStructure}
              </pre>
              <button className="copy-btn" style={{ marginTop: 10 }} onClick={() => copyToClipboard(`mkdir claude-code-course && cd claude-code-course && mkdir prompts output assets && for i in 1 2 3 4 5; do mkdir output/phase-$i; done`, "folder")}>
                {copiedCmd === "folder" ? "✓ Copied" : "複製建立指令"}
              </button>
            </div>

            {/* Step 2: CLAUDE.md */}
            <div style={{ background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#60a5fa" }}>Step 2 — 建立 CLAUDE.md 配置文件</div>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>將以下內容保存為 <code style={{ fontFamily: "'JetBrains Mono', monospace", background: "rgba(255,255,255,0.07)", padding: "2px 6px", borderRadius: 4 }}>CLAUDE.md</code> 放在項目根目錄：</p>
              <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#94a3b8", background: "#060810", borderRadius: 8, padding: 16, overflowX: "auto", lineHeight: 1.8, border: "1px solid rgba(255,255,255,0.05)", maxHeight: 300, overflow: "auto" }}>
{claudeCodeSetup.claudeMd}
              </pre>
              <button className="copy-btn" style={{ marginTop: 10 }} onClick={() => copyToClipboard(claudeCodeSetup.claudeMd, "claudemd")}>
                {copiedCmd === "claudemd" ? "✓ Copied" : "複製 CLAUDE.md 內容"}
              </button>
            </div>

            {/* Step 3: Generate */}
            <div style={{ background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#f59e0b" }}>Step 3 — 生成指令示例</div>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>在 <code style={{ fontFamily: "'JetBrains Mono', monospace", background: "rgba(255,255,255,0.07)", padding: "2px 6px", borderRadius: 4 }}>claude-code-course/</code> 目錄下執行以下指令：</p>
              {claudeCodeSetup.generateCommands.map((cmd, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>// {cmd.phase}</div>
                  <div style={{ background: "#060810", borderRadius: 8, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#4ade80", flex: 1, minWidth: 200, wordBreak: "break-all" }}>{cmd.cmd}</code>
                    <button className={`copy-btn ${copiedCmd === `cmd${i}` ? "copied" : ""}`} onClick={() => copyToClipboard(cmd.cmd, `cmd${i}`)}>
                      {copiedCmd === `cmd${i}` ? "✓ Copied" : "複製"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 4: Tips */}
            <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#f59e0b" }}>💡 生成技巧</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  { tip: "先生成 Phase 1 測試效果", detail: "確認格式符合要求後，再批量生成其他 Phase" },
                  { tip: "指定語言和難度", detail: '在指令中加入 "繁體中文，零基礎讀者，避免假設讀者有編程基礎"' },
                  { tip: "要求包含截圖說明", detail: '加入 "每個步驟說明截圖應顯示什麼內容" 讓讀者知道看什麼' },
                  { tip: "批量生成後統一審查", detail: "生成後用 claude /review 指令審查所有文件的一致性" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#f59e0b", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i+1}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{item.tip}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
