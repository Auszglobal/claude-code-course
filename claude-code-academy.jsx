import { useState, useEffect, useRef } from "react";

const course = {phases:[
  {id:1,icon:"🌱",name:"Getting Started",color:"#4ade80",tagline:"Install Claude Code and write your first AI command from scratch",modules:[
    {id:"1.1",title:"What is Claude Code?",time:30,tag:"Concept",desc:"Understand Claude Code's role, how it differs from other AI tools, and why it's powerful.",lessons:["Introduction & positioning","Claude Code vs ChatGPT vs Cursor","Key use cases","Your learning roadmap"]},
    {id:"1.2",title:"Installation & Setup",time:45,tag:"Hands-on",desc:"Install Node.js, Claude Code, and configure your Anthropic API key on any OS.",lessons:["Installing Node.js (Win/Mac/Linux)","npm install -g @anthropic-ai/claude-code","Getting your API key","Launching Claude Code"]},
    {id:"1.3",title:"Your First Command",time:30,tag:"Hands-on",desc:"Have a live conversation, create a file, and run your first AI-generated program.",lessons:["Basic conversation mode","Creating your first file","Writing your first program","Understanding Claude's responses"]},
    {id:"1.4",title:"Basic Navigation",time:30,tag:"Concept",desc:"Master shortcuts, built-in commands, and session management.",lessons:["Essential keyboard shortcuts","/help command","/cost for usage tracking","Escape to cancel operations"]},
  ]},
  {id:2,icon:"🔧",name:"Core Skills",color:"#60a5fa",tagline:"CLAUDE.md memory, file operations, code generation & debugging",modules:[
    {id:"2.1",title:"CLAUDE.md — Your AI Memory",time:60,tag:"Core",desc:"Create a CLAUDE.md that gives Claude persistent memory of your project rules.",lessons:["Why CLAUDE.md matters","Designing the structure","Setting project rules","Creating command shortcuts","Build your first CLAUDE.md"]},
    {id:"2.2",title:"File Operations",time:45,tag:"Hands-on",desc:"Read, create, edit and restructure files using natural language.",lessons:["Reading and analyzing code","Creating files & directories","Batch editing files","Search and replace","Refactoring structure"]},
    {id:"2.3",title:"Code Generation Techniques",time:60,tag:"Hands-on",desc:"Craft effective prompts that produce high-quality code in any language.",lessons:["How to describe requirements","Specifying language & framework","Generating feature modules","Auto-generate documentation","Generating test code"]},
    {id:"2.4",title:"Debugging & Error Fixing",time:45,tag:"Hands-on",desc:"Paste errors, analyze bugs, and let Claude Code fix and optimize your code.",lessons:["Pasting error messages for analysis","Step-by-step debug strategy","Common error types reference","Code review & optimization"]},
  ]},
  {id:3,icon:"⚡",name:"Power Features",color:"#f59e0b",tagline:"Slash commands, MCP tools, large projects & automation workflows",modules:[
    {id:"3.1",title:"Slash Commands Mastery",time:45,tag:"Skills",desc:"Master all built-in slash commands and create your own custom shortcuts.",lessons:["/clear /compact /cost in depth","/review /test /fix usage","Creating custom commands","Building a command library","Command chaining techniques"]},
    {id:"3.2",title:"MCP Tool Integration",time:90,tag:"Core",desc:"Connect Claude Code to filesystem, web search, email via Model Context Protocol.",lessons:["What is MCP and how it works","Installing MCP servers","Filesystem MCP","Tavily Search integration","Gmail MCP automation","Your first MCP workflow"]},
    {id:"3.3",title:"Large Project Management",time:60,tag:"Hands-on",desc:"Navigate and refactor large codebases with thousands of files.",lessons:["Multi-file project best practices","Rapid codebase analysis","Cross-file refactoring","Dependency management","Git integration workflow"]},
    {id:"3.4",title:"Automation Workflows",time:75,tag:"Hands-on",desc:"Design reliable automation scripts with scheduling, error handling and logging.",lessons:["Batch file processing","Task Scheduler integration","Workflow design patterns","Error handling & retries","Logging and monitoring"]},
  ]},
  {id:4,icon:"🏗️",name:"System Building",color:"#f97316",tagline:"Build AI agents, multi-agent systems, and deploy to production",modules:[
    {id:"4.1",title:"Building Your First AI Agent",time:120,tag:"Project",desc:"Design and implement an AI agent that autonomously completes real-world tasks.",lessons:["AI agent design principles","Defining goals & boundaries","Agent memory systems","Hands-on: automated report agent","Testing & tuning your agent"]},
    {id:"4.2",title:"Multi-Agent Systems",time:90,tag:"Advanced",desc:"Build Supervisor + Worker architectures for parallel task processing.",lessons:["Multi-agent architecture","Agent communication protocols","Parallel vs sequential routing","Build a Supervisor+Worker system","Conflict handling & fault tolerance"]},
    {id:"4.3",title:"Security & Permissions",time:60,tag:"Critical",desc:"Understand Claude Code's permission model and enforce safe production practices.",lessons:["Permission model explained","--dangerously-skip-permissions guide","Production security practices","Handling sensitive data","Audit logging & monitoring"]},
    {id:"4.4",title:"Production Deployment",time:90,tag:"Hands-on",desc:"Deploy Claude Code apps to cloud servers with CI/CD pipelines.",lessons:["Docker containerization","CI/CD pipeline integration","AWS/GCP server config","Environment variables & secrets","Monitoring & alerting"]},
  ]},
  {id:5,icon:"🎯",name:"Expert Track",color:"#e879f9",tagline:"Enterprise architecture, custom MCP servers, prompt engineering & case studies",modules:[
    {id:"5.1",title:"Enterprise Architecture",time:120,tag:"Architecture",desc:"Design high-availability, scalable enterprise-grade AI systems.",lessons:["Large-scale AI design patterns","Microservices + Claude Code","High availability design","Cost optimization strategies","Team collaboration best practices"]},
    {id:"5.2",title:"Custom MCP Server Dev",time:150,tag:"Development",desc:"Build your own MCP server from scratch for custom AI tool integration.",lessons:["MCP server dev environment","Designing tool interfaces","Build a business MCP server","Testing & publishing","MCP server security"]},
    {id:"5.3",title:"Prompt Engineering Mastery",time:90,tag:"Technique",desc:"Master advanced prompting techniques to maximize Claude Code output quality.",lessons:["Advanced system prompt design","Chain-of-Thought techniques","Few-Shot learning","Instruction optimization","Build a prompt library"]},
    {id:"5.4",title:"Real-World Case Studies",time:120,tag:"Cases",desc:"Deep-dive real commercial projects and extract systems thinking principles.",lessons:["Case 1: Invoice automation","Case 2: AI investment agent","Case 3: B2B email outreach","Case 4: Multi-platform support","Systems thinking framework"]},
  ]},
]};

const Q=(q,opts,a,exp)=>({q,opts,a,exp});
const quizzes={
"1.1":[Q("What type of tool is Claude Code?",["A browser extension","An AI command-line coding assistant","A cloud IDE","A text editor plugin"],1,"Claude Code runs in your terminal using Claude AI to build, edit, and automate software on your machine."),Q("What key advantage does Claude Code have over a chat interface?",["It's faster","It can directly read, create and edit files on your computer","Supports more languages","Nicer UI"],1,"Unlike chat, Claude Code has direct filesystem access — reads code, creates files, runs commands autonomously."),Q("Who is Claude Code designed for?",["Senior engineers only","Data scientists only","Anyone who wants to build or automate software — including beginners","DevOps only"],2,"Claude Code is for everyone from complete beginners to expert developers who want to build real systems.")],
"1.2":[Q("Correct install command?",["pip install claude-code","npm install -g @anthropic-ai/claude-code","brew install claude","apt install anthropic"],1,"npm with the -g flag installs Claude Code globally so you can use it from any directory."),Q("What must be installed BEFORE Claude Code?",["Python 3.10+","Docker","Node.js","Ruby"],2,"Claude Code is a Node.js application. Run 'node --version' to verify Node.js is already installed."),Q("Where do you get an Anthropic API Key?",["github.com/anthropic","console.anthropic.com","anthropic.ai/download","npmjs.com"],1,"API keys are created at console.anthropic.com after making a free account.")],
"1.3":[Q("How do you start Claude Code in a project?",["Double-click an icon","Run 'claude' in your terminal from the project directory","Open from Start Menu","Visit a website"],1,"cd into your project folder in terminal, then type 'claude' to start an interactive session."),Q("Good first test command?",["Ask for complex architecture right away","Ask Claude to create a simple hello.txt file","Run /cost immediately","Use /clear first"],1,"A simple task like 'Create hello.txt with Hello World' verifies everything works before complex tasks."),Q("Before Claude Code makes file changes, it:",["Acts immediately","Asks for your approval first","Sends files to Anthropic","Creates automatic backups"],1,"By default Claude Code shows what it plans to do and asks for confirmation before modifying files.")],
"1.4":[Q("What does /cost show?",["Your subscription price","Token usage and cost for the current session","Server fees","Monthly billing"],1,"/cost shows API token usage and estimated cost for your current session — helps you monitor expenses."),Q("How do you cancel a running operation?",["Close the terminal","Ctrl+Z","Escape","Type stop"],2,"Press Escape to interrupt Claude Code mid-operation while keeping your session alive."),Q("What does /compact do?",["Compresses files on disk","Summarizes conversation to free up context space","Makes responses shorter","Removes empty lines"],1,"/compact summarizes conversation history to reduce token usage while retaining key context.")],
"2.1":[Q("Main purpose of CLAUDE.md?",["Store your code","Give Claude persistent memory of project rules and context","Configure terminal theme","Manage npm packages"],1,"CLAUDE.md is read every session, giving Claude project-specific instructions without you re-explaining."),Q("Where should CLAUDE.md be placed?",["Home directory ~/","Project's root directory",".git folder","node_modules"],1,"CLAUDE.md belongs in your project's root — Claude looks there automatically on startup."),Q("What SHOULD go in CLAUDE.md?",["Passwords and API keys","Personal diary","Tech stack, coding style rules, and custom commands","Binary files"],2,"CLAUDE.md should have your stack, conventions, and shortcuts — never credentials or secrets.")],
"2.2":[Q("How to ask Claude to analyze a file?",["Use a separate viewer","Say 'Read src/app.js and explain what it does'","Paste the entire file manually","Use /open command"],1,"Claude reads any file you reference by path — just describe what you want analyzed in plain English."),Q("To create a folder structure:",["Only use mkdir","Ask 'Create a folder structure for a Node.js REST API'","Use GUI file manager","Edit package.json"],1,"Claude understands natural language — describe the structure and it creates all folders and starter files."),Q("Safest approach for a large refactor:",["Change everything in one shot","Review proposed changes step-by-step, approving each file","Trust it completely","One line at a time manually"],1,"Review each proposed change before approving to prevent unintended modifications in critical code.")],
"2.3":[Q("What makes a good code generation prompt?",["Be as vague as possible","Specify language, framework, function names, inputs, outputs, edge cases","One-word prompts","Only request tiny snippets"],1,"Specificity is key — the more context you give, the better and more accurate the generated code."),Q("To match your team's coding style:",["Hope Claude guesses correctly","Paste an example and say 'Follow this style for all code'","Only use defaults","Use a different tool"],1,"Show don't tell: paste a code example in your preferred style and Claude will match it throughout."),Q("To generate tests for existing code:",["Write all tests manually","Say 'Write unit tests for auth.js using Jest'","Only test by running the app","Tests can't be auto-generated"],1,"Claude analyzes your code and generates comprehensive unit tests including edge cases you might miss.")],
"2.4":[Q("Fastest way to debug an error:",["Search Stack Overflow","Paste the full error and say 'What does this mean and how to fix it?'","Restart your computer","Delete node_modules"],1,"The complete error message with stack trace gives Claude all context to diagnose the issue accurately."),Q("When asking for performance optimization:",["Just say 'make it faster'","Provide code, describe the problem, and share any profiling data","Never optimize, rewrite from scratch","Only optimize DB queries"],1,"Describe the specific performance issue alongside your code for targeted, precise solutions."),Q("If Claude's fix doesn't work:",["Give up","Paste the new error and say 'This didn't fix it, I now get this error...'","Delete the project","Undo without telling Claude"],1,"Continue the conversation! Paste the new error — Claude uses history to progressively narrow down the root cause.")],
"3.1":[Q("What does /clear do?",["Deletes all files","Clears terminal screen only","Clears conversation history for a fresh context","Removes API key"],2,"/clear wipes conversation history completely. Use when starting a new unrelated task to prevent context confusion."),Q("When to use /compact instead of /clear?",["When you want to start over","When you want to preserve context but reduce token usage mid-task","When the app crashes","Before every command"],1,"/compact summarizes to save tokens while keeping important context — ideal for long working sessions."),Q("Where are custom slash commands defined?",["In a separate app","In CLAUDE.md or a project commands file","By contacting Anthropic","They cannot be created"],1,"Custom slash commands are defined in CLAUDE.md, creating reusable shortcuts for repeated tasks.")],
"3.2":[Q("What does MCP stand for?",["Machine Control Protocol","Model Context Protocol","Multi-Core Processing","Managed Cloud Platform"],1,"MCP is the Model Context Protocol — a standard way for AI models to connect to external tools and services."),Q("What does Filesystem MCP allow?",["Access the internet","Read/write files outside the project with controlled permissions","Only read files","Manage cloud storage"],1,"Filesystem MCP grants Claude access to specific directories with fine-grained read/write permissions."),Q("How are MCP servers configured?",["Through a web dashboard","In a config file like claude_desktop_config.json","By installing a GUI app","Automatically with no setup"],1,"MCP servers are configured by editing Claude Code's config file with server type, path, and parameters.")],
"3.3":[Q("Best first step with a large codebase:",["Start making changes immediately","Ask for an overview of the project structure first","Read every file manually","Work on one file only"],1,"Start with: 'Explain the structure and purpose of each directory.' This gives Claude essential context."),Q("For a cross-file refactor:",["Change all files simultaneously","Plan first, then execute file by file with review at each step","Use find-and-replace in text editor","Never refactor large codebases"],1,"Plan the refactor first (ask Claude to outline all changes), then execute step by step reviewing each change."),Q("How can Claude help with dependencies?",["It can't help","Analyze package.json, identify outdated packages, help upgrade safely","Only by deleting node_modules","Rewrite code to have zero deps"],1,"Claude reviews dependency files, identifies outdated or vulnerable packages, and helps upgrade safely.")],
"3.4":[Q("For a daily 6 AM task on Windows:",["A Linux cron job","Windows Task Scheduler","A manual reminder","A browser extension"],1,"Windows Task Scheduler runs scripts at specified times. Claude helps write the XML configuration."),Q("Every production automation script needs:",["Only core logic","Error handling, logging, and retry logic","A user interface","Hard-coded credentials"],1,"Robust scripts need error handling (catch failures), logging (track actions), and retry logic."),Q("Good workflow design principle:",["All logic in one massive file","Break into small, testable, single-purpose modules","Never comment automation code","Avoid environment variables"],1,"Modular design makes workflows easier to test, debug and maintain. One module, one responsibility.")],
"4.1":[Q("Key difference: chatbot vs AI agent?",["Agents are smarter","Agents autonomously execute sequences of actions to achieve a goal","Chatbots can use tools, agents can't","No difference"],1,"An agent plans and executes a series of actions (reading files, calling APIs, making decisions) autonomously."),Q("Why define an agent's boundaries?",["To make it faster","To prevent unintended or harmful actions outside its intended scope","Boundaries don't matter","To reduce costs only"],1,"Clear boundaries prevent agents from taking wrong actions — like modifying production data when it should only read."),Q("What does an agent's memory system do?",["Stores agent code","Persists context between runs so the agent remembers state and previous actions","Logs errors only","Auto-connects to databases"],1,"A memory system lets the agent remember what it's done, what it learned, and the current state of ongoing work.")],
"4.2":[Q("In Supervisor + Worker architecture, the Supervisor:",["Does all work itself","Breaks down tasks and delegates to specialist Workers","Only monitors errors","Manages billing"],1,"The Supervisor receives the high-level goal, decomposes into subtasks, assigns to Workers, and coordinates results."),Q("When to use parallel agent execution?",["Always","When tasks are independent and can run simultaneously","Only for simple tasks","Never — sequential is always better"],1,"Parallel execution works when tasks are independent — e.g., analyzing 5 data sources at the same time."),Q("Key challenge in multi-agent systems:",["Too many languages","Handling conflicts when agents produce contradictory results or have dependencies","Too many servers","Too much documentation"],1,"Agent coordination requires handling conflicting results, dependency chains between agents, and partial failures.")],
"4.3":[Q("What does --dangerously-skip-permissions do?",["Makes Claude faster","Skips user confirmation prompts for file and command operations","Grants admin access","Disables all security forever"],1,"--dangerously-skip-permissions removes approval prompts for automation. Only use in controlled, trusted environments."),Q("Where should you NEVER store API keys?",["In environment variables","In .env file with .gitignore","Directly in CLAUDE.md or source code","In a secrets manager"],2,"Never hard-code keys in CLAUDE.md or any committed file. Use environment variables and .gitignore."),Q("Purpose of audit logging:",["Makes the system slower","Creates a traceable record of every action for security and debugging","Fills up disk space","Has no practical purpose"],1,"Audit logs record what the system did, when, and with what result — essential for compliance and incident investigation.")],
"4.4":[Q("Why use Docker for deployment?",["Required by Anthropic","Packages your app with all dependencies for consistent deployments","Makes the app faster","Only for websites"],1,"Docker containers bundle your app and all dependencies, ensuring it runs identically on every server."),Q("For production secrets, best practice:",["Hard-code for convenience","Only use environment variables","Use a proper secrets manager (AWS Secrets Manager, Vault)","Store in CLAUDE.md"],2,"For production, use a dedicated secrets manager rather than relying solely on environment variables."),Q("CI/CD benefit for Claude Code agents:",["No benefit — deploy manually","Automated testing and deployment on every code change, reducing human error","Faster API responses","Cheaper API costs"],1,"CI/CD ensures agents always run the latest tested code without manual intervention on every update.")],
"5.1":[Q("Key principle of scalable AI system design:",["Monolithic process is best","Loose coupling — each component is independent and replaceable","Use one AI model for everything","Never use cloud services"],1,"Loose coupling means components interact via well-defined interfaces, so any part can be replaced or scaled independently."),Q("AI cost optimization in enterprise:",["Use expensive model for everything","Route simple tasks to smaller models, reserve powerful models for complex tasks","Never monitor costs","Only run AI during business hours"],1,"Model tiering: fast cheap models for simple routing tasks, larger models only when complexity demands it."),Q("'High availability' means:",["Available at premium prices","System remains operational even when components fail, using redundancy","High GPU availability","Available to many users at once"],1,"High availability means the system stays up even if a server crashes, using load balancing, failover, and redundancy.")],
"5.2":[Q("Recommended languages for MCP servers?",["Only Python","TypeScript/JavaScript or Python — both have official SDKs","Java only","Only Rust"],1,"Anthropic provides official MCP SDKs for TypeScript and Python, making these the natural choices."),Q("Core thing you define in an MCP server:",["Database schemas","Tools — with name, description, input schema, and handler function","UI components","Network routing rules"],1,"An MCP server is a collection of tools, each with a name, description, JSON input schema, and handler."),Q("How does the AI decide when to use your MCP tool?",["Randomly","Based on the tool's name and description — precision is critical","Based on file size","Based on last tool used"],1,"The AI reads your tool's description to decide when to use it. Vague descriptions confuse the model — be precise.")],
"5.3":[Q("What is Chain-of-Thought prompting?",["Very long prompts","Instructing AI to reason step-by-step before giving an answer","Chaining multiple API calls","A type of MCP server"],1,"Chain-of-Thought tells the AI to show its reasoning process, dramatically improving accuracy on complex problems."),Q("What is Few-Shot prompting?",["Asking few questions","Providing 2-5 input-output examples before your actual request","Limiting response length","Using a small model"],1,"Few-Shot prompting gives examples to demonstrate the exact format and style you want without long explanations."),Q("What makes a good agent system prompt?",["Keep it very short","Clearly define role, capabilities, constraints, output format, and error behavior","Use complex jargon","Say 'be helpful' with no specifics"],1,"A good system prompt gives the agent a clear identity, hard constraints (what it must never do), and exact output expectations.")],
"5.4":[Q("First step in a new automation project:",["Write code immediately","Define the problem: inputs, outputs, edge cases, and success criteria","Choose programming language first","Estimate cost first"],1,"Always define the problem first: what comes in, what should happen, edge cases, and what success looks like."),Q("When a production system fails, check first:",["Restart everything immediately","The logs — understand what happened before making changes","Rebuild the entire system","Call support"],1,"Logs tell you exactly what the system was doing when it failed, which error occurred, and what inputs caused it."),Q("Most valuable lesson from real-world case studies:",["AI solves all problems automatically","Start simple, validate with real data, then iterate — grow complexity from proven foundations","Complex systems are always better","Never use AI in production"],1,"Every successful case: start minimal, validate on real data, then add complexity incrementally.")],
};

const QUIZ_TIME=180;
const allMods=course.phases.flatMap(p=>p.modules.map(m=>({...m,phase:p})));
const TAG_COLORS={"Concept":"#60a5fa","Hands-on":"#4ade80","Core":"#f59e0b","Skills":"#e879f9","Project":"#fb923c","Advanced":"#c084fc","Critical":"#f87171","Architecture":"#34d399","Development":"#60a5fa","Technique":"#e879f9","Cases":"#4ade80"};
const pc=c=>c>=80?"#4ade80":c>=60?"#f59e0b":"#f87171";
const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

function Ring({pct,size=100,stroke=6,color="#4ade80",label}){
  const r=(size-stroke)/2,ci=2*Math.PI*r,of=ci*(1-pct/100);
  return(
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={ci} strokeDashoffset={of} strokeLinecap="round" style={{transition:"stroke-dashoffset .6s ease"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:size/5.5,fontWeight:800,color:"#f1f5f9",lineHeight:1}}>{pct}%</span>
        {label&&<span style={{fontSize:size/10,color:"#64748b",marginTop:1,textAlign:"center",lineHeight:1.2,maxWidth:size*.65}}>{label}</span>}
      </div>
    </div>
  );
}

function Certificate({name,onClose}){
  const date=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div style={{maxWidth:740,width:"100%"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:12,color:"#64748b"}}>🎓 Your Certificate</span>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",color:"#94a3b8",borderRadius:7,padding:"5px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>✕ Close</button>
        </div>
        <div style={{background:"linear-gradient(145deg,#080d1c 0%,#0c1228 50%,#080d1c 100%)",border:"2px solid #b8962e",borderRadius:18,padding:"44px 48px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          {/* Corner ornaments */}
          {[[0,0,"top","left"],[0,1,"top","right"],[1,0,"bottom","left"],[1,1,"bottom","right"]].map(([t,r,tv,rv],i)=>(
            <div key={i} style={{position:"absolute",[tv]:14,[rv]:14,width:36,height:36,
              borderTop:t?"none":"2px solid #b8962e55",borderBottom:t?"2px solid #b8962e55":"none",
              borderLeft:r?"none":"2px solid #b8962e55",borderRight:r?"2px solid #b8962e55":"none"}}/>
          ))}
          {/* Seal */}
          <div style={{width:76,height:76,borderRadius:"50%",background:"linear-gradient(135deg,#b8962e,#e8c848,#b8962e)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px",boxShadow:"0 0 28px rgba(184,150,46,.4)"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:"#08080f",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"1px solid #b8962e44"}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:"#e8c848",lineHeight:1}}>CCA</span>
              <span style={{fontSize:7,color:"#b8962e",letterSpacing:".1em"}}>ACADEMY</span>
            </div>
          </div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:"#b8962e",letterSpacing:".22em",textTransform:"uppercase",marginBottom:8}}>Certificate of Completion</div>
          <div style={{fontSize:13,color:"#64748b",marginBottom:10}}>This certifies that</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,4vw,32px)",fontWeight:800,color:"#f8f8f8",marginBottom:12,borderBottom:"1px solid rgba(184,150,46,.2)",paddingBottom:12}}>{name||"Student"}</div>
          <div style={{fontSize:13,color:"#64748b",marginBottom:5}}>has successfully completed the full</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(15px,3vw,20px)",fontWeight:800,color:"#22d3ee",marginBottom:3}}>Claude Code Academy</div>
          <div style={{fontSize:12,color:"#475569",marginBottom:24}}>20 Modules · 5 Phases · Beginner to Expert</div>
          <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:24}}>
            {course.phases.map(p=>(
              <div key={p.id} style={{background:`${p.color}18`,border:`1px solid ${p.color}40`,borderRadius:16,padding:"4px 12px",fontSize:11,color:p.color,fontWeight:600}}>{p.icon} {p.name}</div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderTop:"1px solid rgba(184,150,46,.12)",paddingTop:16,flexWrap:"wrap",gap:10}}>
            <div style={{textAlign:"left"}}><div style={{fontSize:10,color:"#475569"}}>Issued on</div><div style={{fontSize:12,color:"#94a3b8",fontWeight:600}}>{date}</div></div>
            <div style={{textAlign:"center"}}><div style={{width:110,height:1,background:"linear-gradient(90deg,transparent,#b8962e,transparent)",marginBottom:3}}/><div style={{fontSize:9,color:"#475569",letterSpacing:".06em"}}>CLAUDE CODE · ANTHROPIC AI</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#475569"}}>ID</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#b8962e"}}>CCA-2025-EXP</div></div>
          </div>
        </div>
        <p style={{textAlign:"center",fontSize:11,color:"#475569",marginTop:10}}>📸 Screenshot to save · 🖨️ Ctrl+P to print</p>
      </div>
    </div>
  );
}

export default function App(){
  const [completed,setCompleted]=useState(new Set());
  const [scores,setScores]=useState({});
  const [notes,setNotes]=useState({});
  const [tab,setTab]=useState("dashboard");
  const [phaseIdx,setPhaseIdx]=useState(0);
  const [expanded,setExpanded]=useState(null);
  const [qMod,setQMod]=useState(null);
  const [answers,setAnswers]=useState({});
  const [qDone,setQDone]=useState(false);
  const [timer,setTimer]=useState(null);
  const [timerOn,setTimerOn]=useState(false);
  const [showCert,setShowCert]=useState(false);
  const [certName,setCertName]=useState("");
  const [notePhase,setNotePhase]=useState(0);
  const [noteMod,setNoteMod]=useState(null);
  const answersRef=useRef({});
  const qModRef=useRef(null);
  const doneRef=useRef(false);

  useEffect(()=>{if(!timerOn||!timer)return;if(timer<=0){doSubmit();return;}const id=setTimeout(()=>setTimer(t=>t-1),1000);return()=>clearTimeout(id);},[timer,timerOn]);

  const total=allMods.length;
  const doneCount=completed.size;
  const overallPct=Math.round((doneCount/total)*100);
  const qCount=Object.keys(scores).length;
  const avgScore=qCount?Math.round(Object.values(scores).reduce((s,sc)=>s+sc.pct,0)/qCount):null;
  const pStat=p=>{const d=p.modules.filter(m=>completed.has(m.id)).length;return{d,t:p.modules.length,pct:Math.round((d/p.modules.length)*100)};};
  const ph=course.phases[phaseIdx];

  const doSubmit=()=>{
    if(doneRef.current)return;
    doneRef.current=true;
    const id=qModRef.current,ans=answersRef.current,qs=quizzes[id];
    if(!qs)return;
    const score=qs.filter((q,i)=>ans[i]===q.a).length;
    setScores(p=>({...p,[id]:{score,total:qs.length,pct:Math.round((score/qs.length)*100)}}));
    setQDone(true);setTimerOn(false);
    if(score===qs.length)setCompleted(p=>new Set([...p,id]));
  };

  const startQuiz=id=>{
    qModRef.current=id;answersRef.current={};doneRef.current=false;
    setQMod(id);setAnswers({});setQDone(false);setTimer(QUIZ_TIME);setTimerOn(true);setTab("quiz");
  };
  const setAns=(qi,oi)=>{answersRef.current={...answersRef.current,[qi]:oi};setAnswers({...answersRef.current});};
  const markDone=id=>setCompleted(p=>new Set([...p,id]));
  const next=allMods.find(m=>!completed.has(m.id));
  const tc=timer<30?"#f87171":timer<60?"#f59e0b":"#4ade80";
  const tPct=Math.round((timer/QUIZ_TIME)*100);

  const TABS=[["dashboard","📊 Dashboard"],["curriculum","📚 Curriculum"],["quiz","📝 Quizzes"],["notes","📒 Notes"]];

  return(
    <div style={{fontFamily:"'Outfit',sans-serif",background:"#050912",minHeight:"100vh",color:"#e2e8f0"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .nb{cursor:pointer;background:transparent;border:none;transition:all .2s;color:#64748b;padding:13px 16px;font-size:12px;font-weight:600;font-family:inherit;letter-spacing:.03em;border-bottom:2px solid transparent;white-space:nowrap;}
        .nb:hover{color:#e2e8f0;} .nb.on{color:#22d3ee;border-bottom-color:#22d3ee;}
        .card{background:#0c1220;border:1px solid rgba(255,255,255,.06);border-radius:14px;}
        .mc{cursor:pointer;background:#0c1220;border:1px solid rgba(255,255,255,.06);border-radius:14px;transition:all .2s;}
        .mc:hover{border-color:rgba(255,255,255,.16);transform:translateY(-2px);box-shadow:0 12px 36px rgba(0,0,0,.5);}
        .lr{padding:6px 10px;border-radius:6px;display:flex;align-items:center;gap:9px;transition:background .15s;}
        .lr:hover{background:rgba(255,255,255,.04);}
        .pt{cursor:pointer;background:rgba(255,255,255,.04);border:1px solid transparent;border-radius:10px;padding:9px 13px;transition:all .2s;min-width:106px;text-align:left;}
        .pt:hover{background:rgba(255,255,255,.07);} .pt.on{background:rgba(255,255,255,.07);}
        .ob{cursor:pointer;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:9px 13px;text-align:left;color:#94a3b8;font-size:13px;font-family:inherit;transition:all .15s;width:100%;}
        .ob:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#e2e8f0;}
        .ob.sel{background:rgba(34,211,238,.1);border-color:#22d3ee;color:#e2e8f0;}
        .ob.ok{background:rgba(74,222,128,.1);border-color:#4ade80;color:#e2e8f0;}
        .ob.no{background:rgba(248,113,113,.07);border-color:#f87171;color:#94a3b8;}
        .btn{cursor:pointer;border-radius:9px;border:none;font-family:inherit;font-weight:600;transition:all .15s;}
        .btn:hover{filter:brightness(1.1);} .btn:active{transform:scale(.97);}
        .qc{cursor:pointer;background:#0c1220;border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:13px 15px;transition:all .2s;}
        .qc:hover{border-color:rgba(255,255,255,.18);transform:translateY(-2px);}
        .na{width:100%;background:#070b16;border:1px solid rgba(255,255,255,.07);border-radius:9px;padding:12px 14px;color:#e2e8f0;font-size:13px;font-family:'Outfit',sans-serif;resize:vertical;min-height:110px;line-height:1.6;transition:border-color .2s;outline:none;}
        .na:focus{border-color:rgba(34,211,238,.4);}
        @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} .fu{animation:fu .22s ease;}
        @keyframes pu{0%,100%{opacity:1}50%{opacity:.35}} .pu{animation:pu .75s infinite;}
        ::-webkit-scrollbar{width:4px;height:4px} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
      `}</style>

      {showCert&&<Certificate name={certName} onClose={()=>setShowCert(false)}/>}

      {/* HEADER */}
      <div style={{borderBottom:"1px solid rgba(255,255,255,.07)",background:"rgba(5,9,18,.96)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:980,margin:"0 auto",padding:"0 14px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"13px 0",flexShrink:0}}>
            <div style={{width:26,height:26,borderRadius:7,background:"linear-gradient(135deg,#22d3ee,#818cf8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>⚡</div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14}}>Claude Code <span style={{color:"#22d3ee"}}>Academy</span></span>
          </div>
          <div style={{display:"flex",gap:1,overflowX:"auto"}}>
            {TABS.map(([t,l])=><button key={t} className={`nb${tab===t?" on":""}`} onClick={()=>setTab(t)}>{l}</button>)}
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center",flexShrink:0}}>
            <div style={{fontSize:11,color:"#64748b",padding:"3px 8px",background:"rgba(255,255,255,.04)",borderRadius:5,border:"1px solid rgba(255,255,255,.07)"}}>
              <span style={{color:"#22d3ee",fontWeight:700}}>{doneCount}</span>/{total}
            </div>
            {doneCount===total&&<button className="btn" style={{background:"linear-gradient(135deg,#b8962e,#e8c848)",color:"#08080f",padding:"5px 11px",fontSize:11}} onClick={()=>setShowCert(true)}>🎓 Certificate</button>}
          </div>
        </div>
      </div>

      <div style={{maxWidth:980,margin:"0 auto",padding:"22px 14px 56px"}}>

        {/* ── DASHBOARD ── */}
        {tab==="dashboard"&&<div className="fu">
          <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:20,alignItems:"center",marginBottom:22}}>
            <Ring pct={overallPct} size={116} color="#22d3ee" label="Overall"/>
            <div>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(18px,4vw,30px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:5}}>
                {doneCount===0?"Start Your Journey 🚀":doneCount===total?"All Done — Claim Your Certificate! 🎓":`Keep Going — ${doneCount} Down! 💪`}
              </h1>
              <p style={{fontSize:12,color:"#64748b",marginBottom:12}}>{total} modules · {course.phases.flatMap(p=>p.modules).reduce((s,m)=>s+m.time,0)} min total</p>
              <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
                {[{l:"Modules Done",v:doneCount,c:"#22d3ee"},{l:"Quizzes Taken",v:qCount,c:"#818cf8"},{l:"Avg Score",v:avgScore!=null?`${avgScore}%`:"—",c:avgScore?pc(avgScore):"#64748b"},{l:"Notes Written",v:Object.values(notes).filter(n=>n?.trim()).length,c:"#f59e0b"}].map(s=>(
                  <div key={s.l}><div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:"#475569",marginTop:1}}>{s.l}</div></div>
                ))}
              </div>
              {doneCount===total&&<div style={{marginTop:12}}>
                <div style={{fontSize:11,color:"#b8962e",marginBottom:5}}>Enter your name for the certificate:</div>
                <div style={{display:"flex",gap:7}}>
                  <input value={certName} onChange={e=>setCertName(e.target.value)} placeholder="Your full name"
                    style={{flex:1,maxWidth:220,background:"rgba(255,255,255,.06)",border:"1px solid rgba(184,150,46,.4)",borderRadius:8,padding:"6px 11px",color:"#f1f5f9",fontSize:12,fontFamily:"inherit",outline:"none"}}/>
                  <button className="btn" style={{background:"linear-gradient(135deg,#b8962e,#e8c848)",color:"#08080f",padding:"6px 14px",fontSize:11}} onClick={()=>setShowCert(true)}>🎓 View</button>
                </div>
              </div>}
            </div>
          </div>

          <div className="card" style={{padding:20,marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:"#475569",letterSpacing:".07em",marginBottom:14,textTransform:"uppercase"}}>Phase Progress</div>
            <div style={{display:"grid",gap:13}}>
              {course.phases.map(p=>{const{d,t,pct}=pStat(p);return(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:11,cursor:"pointer"}} onClick={()=>{setPhaseIdx(p.id-1);setTab("curriculum");}}>
                  <span style={{fontSize:16,width:20,textAlign:"center"}}>{p.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:12,fontWeight:600,color:pct>0?"#e2e8f0":"#64748b"}}>{p.name}</span>
                      <span style={{fontSize:11,color:p.color,fontWeight:600}}>{d}/{t}</span>
                    </div>
                    <div style={{height:4,background:"rgba(255,255,255,.06)",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${pct}%`,background:p.color,borderRadius:2,transition:"width .6s ease"}}/>
                    </div>
                  </div>
                  <Ring pct={pct} size={36} stroke={3} color={p.color}/>
                </div>
              );})}
            </div>
          </div>

          {next&&<div className="card" style={{padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,flexWrap:"wrap",borderColor:`${next.phase.color}30`}}>
            <div>
              <div style={{fontSize:9,color:"#475569",fontWeight:700,letterSpacing:".07em",marginBottom:3}}>CONTINUE LEARNING</div>
              <div style={{fontSize:14,fontWeight:700}}>{next.phase.icon} {next.title}</div>
              <div style={{fontSize:11,color:"#64748b",marginTop:2}}>Module {next.id} · {next.time} min</div>
            </div>
            <button className="btn" style={{background:`linear-gradient(135deg,${next.phase.color},${next.phase.color}99)`,color:"#0a1020",padding:"8px 16px",fontSize:12}}
              onClick={()=>{setPhaseIdx(next.phase.id-1);setExpanded(next.id);setTab("curriculum");}}>Open →</button>
          </div>}

          {qCount>0&&<div className="card" style={{padding:18,marginTop:14}}>
            <div style={{fontSize:10,fontWeight:700,color:"#475569",letterSpacing:".07em",marginBottom:12,textTransform:"uppercase"}}>Recent Quiz Results</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:8}}>
              {Object.entries(scores).slice(-8).map(([id,sc])=>{const m=allMods.find(x=>x.id===id);return m?(
                <div key={id} style={{background:"rgba(255,255,255,.03)",borderRadius:9,padding:"9px 11px",border:`1px solid ${pc(sc.pct)}20`}}>
                  <div style={{fontSize:10,color:"#475569",marginBottom:2}}>{m.id}</div>
                  <div style={{fontSize:11,fontWeight:600,marginBottom:5,lineHeight:1.3}}>{m.title}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:pc(sc.pct)}}>{sc.pct}%</div>
                  <div style={{fontSize:10,color:"#475569"}}>{sc.score}/{sc.total}</div>
                </div>
              ):null;})}
            </div>
          </div>}
        </div>}

        {/* ── CURRICULUM ── */}
        {tab==="curriculum"&&<div className="fu">
          <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4,marginBottom:16}}>
            {course.phases.map((p,i)=>{const{d,t}=pStat(p);return(
              <button key={p.id} className={`pt${phaseIdx===i?" on":""}`} onClick={()=>{setPhaseIdx(i);setExpanded(null);}} style={{borderColor:phaseIdx===i?p.color:"transparent"}}>
                <div style={{fontSize:14,marginBottom:2}}>{p.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:phaseIdx===i?p.color:"#94a3b8",whiteSpace:"nowrap"}}>Phase {p.id}</div>
                <div style={{fontSize:10,color:"#475569",whiteSpace:"nowrap"}}>{p.name}</div>
                <div style={{fontSize:10,color:d===t?"#4ade80":"#475569",marginTop:1}}>{d}/{t}</div>
              </button>
            );})}
          </div>
          <div style={{background:`${ph.color}07`,border:`1px solid ${ph.color}1e`,borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:ph.color,marginBottom:3}}>{ph.icon} Phase {ph.id} — {ph.name}</div>
              <div style={{fontSize:12,color:"#64748b"}}>{ph.tagline}</div>
            </div>
            <Ring pct={pStat(ph).pct} size={50} stroke={4} color={ph.color}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(370px,1fr))",gap:11}}>
            {ph.modules.map(mod=>{
              const done=completed.has(mod.id),sc=scores[mod.id],isE=expanded===mod.id;
              return<div key={mod.id} className="mc" style={{borderColor:isE?`${ph.color}55`:done?"rgba(74,222,128,.2)":"rgba(255,255,255,.06)"}} onClick={()=>setExpanded(isE?null:mod.id)}>
                <div style={{padding:"15px 15px 11px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#475569"}}>{mod.id}</span>
                      <span style={{fontSize:9,background:(TAG_COLORS[mod.tag]||"#94a3b8")+"18",color:TAG_COLORS[mod.tag]||"#94a3b8",border:`1px solid ${TAG_COLORS[mod.tag]||"#94a3b8"}30`,borderRadius:4,padding:"2px 6px"}}>{mod.tag}</span>
                      {done&&<span style={{fontSize:9,background:"rgba(74,222,128,.12)",color:"#4ade80",border:"1px solid rgba(74,222,128,.25)",borderRadius:4,padding:"2px 6px"}}>✓ Done</span>}
                      {sc&&<span style={{fontSize:9,background:`${pc(sc.pct)}15`,color:pc(sc.pct),border:`1px solid ${pc(sc.pct)}30`,borderRadius:4,padding:"2px 6px"}}>{sc.pct}%</span>}
                      {notes[mod.id]?.trim()&&<span style={{fontSize:9,background:"rgba(245,158,11,.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,.2)",borderRadius:4,padding:"2px 6px"}}>📒</span>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <span style={{fontSize:10,color:"#475569"}}>⏱{mod.time}m</span>
                      <span style={{color:"#475569",fontSize:10,transition:"transform .2s",transform:isE?"rotate(180deg)":"rotate(0)",display:"inline-block"}}>▼</span>
                    </div>
                  </div>
                  <h3 style={{fontSize:13,fontWeight:700,color:"#f1f5f9",margin:"0 0 4px",lineHeight:1.3}}>{mod.title}</h3>
                  <p style={{fontSize:11,color:"#64748b",margin:0,lineHeight:1.5}}>{mod.desc}</p>
                </div>
                {isE&&<div onClick={e=>e.stopPropagation()} style={{borderTop:`1px solid ${ph.color}16`,padding:"11px 15px 15px",background:`${ph.color}04`}}>
                  <div style={{fontSize:9,fontWeight:700,color:ph.color,marginBottom:7,letterSpacing:".07em",textTransform:"uppercase"}}>Lessons</div>
                  {mod.lessons.map((l,li)=>(
                    <div key={li} className="lr">
                      <span style={{width:15,height:15,borderRadius:3,background:`${ph.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:ph.color,fontWeight:700,flexShrink:0}}>{li+1}</span>
                      <span style={{fontSize:12,color:"#cbd5e1"}}>{l}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",gap:6,marginTop:11,flexWrap:"wrap"}}>
                    {!done&&<button className="btn" style={{background:"rgba(74,222,128,.1)",color:"#4ade80",border:"1px solid rgba(74,222,128,.2)",padding:"5px 11px",fontSize:11}} onClick={()=>markDone(mod.id)}>✓ Mark Complete</button>}
                    {quizzes[mod.id]&&<button className="btn" style={{background:`${ph.color}12`,color:ph.color,border:`1px solid ${ph.color}28`,padding:"5px 11px",fontSize:11}} onClick={()=>startQuiz(mod.id)}>{sc?"↩ Retake Quiz":ph.icon+" Take Quiz"}</button>}
                    <button className="btn" style={{background:"rgba(245,158,11,.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,.2)",padding:"5px 11px",fontSize:11}} onClick={()=>{setNoteMod(mod.id);setNotePhase(ph.id-1);setTab("notes");}}>📒 Notes</button>
                  </div>
                </div>}
              </div>;
            })}
          </div>
        </div>}

        {/* ── QUIZ ── */}
        {tab==="quiz"&&<div className="fu">
          {!qMod?(<>
            <div style={{marginBottom:18}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:21,fontWeight:800,marginBottom:3}}>📝 Module Quizzes</h2>
              <p style={{fontSize:12,color:"#64748b"}}>3 questions · 3 min timer · 100% score → module auto-completes</p>
            </div>
            {course.phases.map(p=>(
              <div key={p.id} style={{marginBottom:18}}>
                <div style={{fontSize:10,fontWeight:700,color:p.color,letterSpacing:".07em",textTransform:"uppercase",marginBottom:8}}>{p.icon} {p.name}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:7}}>
                  {p.modules.map(mod=>{const sc=scores[mod.id],done=completed.has(mod.id);return(
                    <div key={mod.id} className="qc" onClick={()=>startQuiz(mod.id)}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#475569"}}>{mod.id}</span>{done&&<span style={{fontSize:10,color:"#4ade80"}}>✓</span>}</div>
                      <div style={{fontSize:12,fontWeight:600,color:"#e2e8f0",marginBottom:6,lineHeight:1.3}}>{mod.title}</div>
                      {sc?(<><div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:pc(sc.pct)}}>{sc.pct}%</div><div style={{fontSize:9,color:"#475569"}}>{sc.score}/{sc.total} · Tap to retake</div></>):(
                        <div style={{fontSize:11,color:p.color}}>Start quiz →</div>
                      )}
                    </div>
                  );})}
                </div>
              </div>
            ))}
          </>):(()=>{
            const qs=quizzes[qMod],mod=allMods.find(m=>m.id===qMod);
            if(!mod||!qs)return null;
            const sc=scores[qMod],allAns=qs.every((_,i)=>answers[i]!==undefined);
            return<div style={{maxWidth:600}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:9}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <button className="btn" style={{background:"rgba(255,255,255,.05)",color:"#94a3b8",border:"1px solid rgba(255,255,255,.1)",padding:"5px 11px",fontSize:11}} onClick={()=>{setQMod(null);setTimerOn(false);setQDone(false);}}>← Back</button>
                  <div>
                    <div style={{fontSize:9,color:"#475569"}}>{mod.phase.icon} {mod.phase.name} · {mod.id}</div>
                    <div style={{fontSize:13,fontWeight:700}}>{mod.title}</div>
                  </div>
                </div>
                {!qDone&&timer!==null&&(
                  <div className={timer<10?"pu":""} style={{background:`${tc}18`,border:`1px solid ${tc}40`,borderRadius:8,padding:"5px 12px",display:"flex",alignItems:"center",gap:7}}>
                    <div style={{position:"relative",width:26,height:26}}>
                      <svg width={26} height={26} style={{transform:"rotate(-90deg)"}}>
                        <circle cx={13} cy={13} r={10} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={2.5}/>
                        <circle cx={13} cy={13} r={10} fill="none" stroke={tc} strokeWidth={2.5}
                          strokeDasharray={62.8} strokeDashoffset={62.8*(1-tPct/100)} strokeLinecap="round"
                          style={{transition:"stroke-dashoffset 1s linear,stroke .5s"}}/>
                      </svg>
                    </div>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:tc}}>{fmt(timer)}</span>
                  </div>
                )}
              </div>
              {!qDone&&timer!==null&&<div style={{height:3,background:"rgba(255,255,255,.06)",borderRadius:2,marginBottom:16,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${tPct}%`,background:tc,transition:"width 1s linear,background .5s"}}/>
              </div>}
              {timer===0&&!qDone&&<div style={{background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.25)",borderRadius:9,padding:"9px 14px",marginBottom:14,fontSize:12,color:"#f87171",textAlign:"center"}}>⏰ Time's up! Submitting your answers...</div>}

              {!qDone?(<>
                {qs.map((q,qi)=>(
                  <div key={qi} className="card" style={{padding:16,marginBottom:12}}>
                    <div style={{fontSize:9,color:"#475569",fontWeight:600,marginBottom:6}}>Q{qi+1} of {qs.length}</div>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:12,lineHeight:1.5,color:"#f1f5f9"}}>{q.q}</div>
                    <div style={{display:"grid",gap:6}}>
                      {q.opts.map((opt,oi)=>(
                        <button key={oi} className={`ob${answers[qi]===oi?" sel":""}`} onClick={()=>setAns(qi,oi)}>
                          <span style={{marginRight:7,fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:answers[qi]===oi?"#22d3ee":"#475569"}}>{String.fromCharCode(65+oi)}.</span>{opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="btn" disabled={!allAns}
                  style={{background:allAns?"linear-gradient(135deg,#22d3ee,#818cf8)":"rgba(255,255,255,.07)",color:allAns?"#050912":"#475569",padding:"10px 22px",fontSize:13,width:"100%",cursor:allAns?"pointer":"not-allowed"}}
                  onClick={doSubmit}>{allAns?"Submit Quiz →":"Answer all questions to submit"}</button>
              </>):(
                <div>
                  <div className="card" style={{padding:22,marginBottom:14,textAlign:"center",border:`1px solid ${pc(sc.pct)}30`}}>
                    <Ring pct={sc.pct} size={96} stroke={7} color={pc(sc.pct)}/>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,marginTop:12,color:pc(sc.pct)}}>{sc.pct===100?"Perfect Score! 🎉":sc.pct>=80?"Great Work! 💪":sc.pct>=60?"Review the explanations below 📖":"Keep Studying 📚"}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{sc.score}/{sc.total} correct</div>
                    {sc.pct===100&&<div style={{fontSize:11,color:"#4ade80",marginTop:5}}>✓ Module automatically marked complete!</div>}
                  </div>
                  {qs.map((q,qi)=>{const r=answers[qi]===q.a;return(
                    <div key={qi} className="card" style={{padding:14,marginBottom:9,borderColor:r?"rgba(74,222,128,.2)":"rgba(248,113,113,.2)"}}>
                      <div style={{display:"flex",gap:7,marginBottom:9,alignItems:"flex-start"}}>
                        <span style={{fontSize:14}}>{r?"✅":"❌"}</span>
                        <div style={{fontSize:12,fontWeight:600,color:"#f1f5f9",lineHeight:1.4}}>{q.q}</div>
                      </div>
                      {q.opts.map((opt,oi)=>(
                        <div key={oi} style={{padding:"5px 9px",borderRadius:5,marginBottom:2,fontSize:11,
                          background:oi===q.a?"rgba(74,222,128,.08)":oi===answers[qi]&&!r?"rgba(248,113,113,.06)":"transparent",
                          color:oi===q.a?"#4ade80":oi===answers[qi]&&!r?"#f87171":"#64748b",
                          border:oi===q.a?"1px solid rgba(74,222,128,.2)":"1px solid transparent"}}>
                          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,marginRight:5}}>{String.fromCharCode(65+oi)}.</span>{opt}{oi===q.a?" ✓":""}
                        </div>
                      ))}
                      <div style={{marginTop:7,fontSize:11,color:"#94a3b8",background:"rgba(255,255,255,.03)",borderRadius:6,padding:"6px 9px",borderLeft:`2px solid ${pc(sc.pct)}`}}>💡 {q.exp}</div>
                    </div>
                  );})}
                  <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:4}}>
                    <button className="btn" style={{background:"rgba(255,255,255,.06)",color:"#94a3b8",border:"1px solid rgba(255,255,255,.1)",padding:"8px 14px",fontSize:11}} onClick={()=>startQuiz(qMod)}>↩ Retake</button>
                    <button className="btn" style={{background:"rgba(34,211,238,.1)",color:"#22d3ee",border:"1px solid rgba(34,211,238,.2)",padding:"8px 14px",fontSize:11}} onClick={()=>setQMod(null)}>All Quizzes</button>
                    {!completed.has(qMod)&&<button className="btn" style={{background:"rgba(74,222,128,.1)",color:"#4ade80",border:"1px solid rgba(74,222,128,.2)",padding:"8px 14px",fontSize:11}} onClick={()=>markDone(qMod)}>✓ Mark Complete</button>}
                  </div>
                </div>
              )}
            </div>;
          })()}
        </div>}

        {/* ── NOTES ── */}
        {tab==="notes"&&<div className="fu">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:10}}>
            <div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:21,fontWeight:800,marginBottom:3}}>📒 Study Notes</h2>
              <p style={{fontSize:12,color:"#64748b"}}>Write personal notes per module · session-only (screenshot or copy to save)</p>
            </div>
            <button className="btn" style={{background:"rgba(245,158,11,.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,.2)",padding:"7px 13px",fontSize:11}}
              onClick={()=>{const txt=Object.entries(notes).filter(([,v])=>v?.trim()).map(([id,v])=>{const m=allMods.find(x=>x.id===id);return`## ${id} — ${m?.title||""}\n\n${v}`;}).join("\n\n---\n\n");navigator.clipboard.writeText(txt||"No notes yet.");}}>📋 Copy All</button>
          </div>
          <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4,marginBottom:16}}>
            {course.phases.map((p,i)=>{const wn=p.modules.filter(m=>notes[m.id]?.trim()).length;return(
              <button key={p.id} className={`pt${notePhase===i?" on":""}`} onClick={()=>{setNotePhase(i);setNoteMod(null);}} style={{borderColor:notePhase===i?p.color:"transparent"}}>
                <div style={{fontSize:14,marginBottom:2}}>{p.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:notePhase===i?p.color:"#94a3b8",whiteSpace:"nowrap"}}>{p.name}</div>
                {wn>0&&<div style={{fontSize:9,color:"#f59e0b"}}>📒 {wn}</div>}
              </button>
            );})}
          </div>
          <div style={{display:"grid",gap:10}}>
            {course.phases[notePhase].modules.map(mod=>{
              const isO=noteMod===mod.id,done=completed.has(mod.id),sc=scores[mod.id],hasN=notes[mod.id]?.trim();
              return<div key={mod.id} className="card" style={{padding:0,overflow:"hidden",borderColor:isO?"rgba(245,158,11,.3)":hasN?"rgba(245,158,11,.13)":"rgba(255,255,255,.06)"}}>
                <div style={{padding:"13px 15px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",gap:10}} onClick={()=>setNoteMod(isO?null:mod.id)}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",gap:5,alignItems:"center",marginBottom:2,flexWrap:"wrap"}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#475569"}}>{mod.id}</span>
                      {done&&<span style={{fontSize:9,color:"#4ade80"}}>✓</span>}
                      {sc&&<span style={{fontSize:9,color:pc(sc.pct)}}>{sc.pct}%</span>}
                      {hasN&&<span style={{fontSize:9,color:"#f59e0b"}}>📒 {(notes[mod.id]||"").length}ch</span>}
                    </div>
                    <div style={{fontSize:13,fontWeight:600,color:"#e2e8f0",lineHeight:1.3}}>{mod.title}</div>
                  </div>
                  <span style={{color:"#64748b",fontSize:10,transition:"transform .2s",transform:isO?"rotate(180deg)":"rotate(0)",display:"inline-block",flexShrink:0}}>▼</span>
                </div>
                {isO&&<div style={{padding:"0 15px 15px",borderTop:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",margin:"11px 0 10px"}}>
                    {mod.lessons.map((l,li)=>(
                      <span key={li} style={{fontSize:10,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:5,padding:"2px 7px",color:"#64748b"}}>{li+1}. {l}</span>
                    ))}
                  </div>
                  <div style={{fontSize:9,color:"#f59e0b",fontWeight:700,marginBottom:6,letterSpacing:".06em"}}>YOUR NOTES</div>
                  <textarea className="na" value={notes[mod.id]||""} onChange={e=>setNotes(p=>({...p,[mod.id]:e.target.value}))}
                    placeholder={`Notes for "${mod.title}"...\n\n• Key concepts\n• Commands to remember\n• Things to practice`}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:7,flexWrap:"wrap",gap:7}}>
                    <span style={{fontSize:10,color:"#475569"}}>{(notes[mod.id]||"").length} chars</span>
                    <div style={{display:"flex",gap:6}}>
                      {notes[mod.id]&&<button className="btn" style={{background:"rgba(248,113,113,.08)",color:"#f87171",border:"1px solid rgba(248,113,113,.2)",padding:"4px 9px",fontSize:10}} onClick={()=>setNotes(p=>({...p,[mod.id]:""}))} >Clear</button>}
                      <button className="btn" style={{background:"rgba(245,158,11,.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,.2)",padding:"4px 9px",fontSize:10}} onClick={()=>navigator.clipboard.writeText(notes[mod.id]||"")}>📋 Copy</button>
                    </div>
                  </div>
                </div>}
              </div>;
            })}
          </div>
        </div>}
      </div>
    </div>
  );
}
