# 6.1 What Is Claude Cowork?

## 🎯 Learning Objectives
- Understand the difference between Claude Chat, Claude Code, and Claude Cowork
- Identify which tool to use for different types of tasks
- Explain how Cowork executes tasks under the hood using sub-agents
- Know when to recommend Cowork vs Code to your team members
- Appreciate the shared architecture that connects all three Claude products

> This lesson references the BlockTempo article "The Complete Guide to Claude Cowork"

## 📖 Theory: Chat vs Code vs Cowork

Think of Claude's three products like three employees at a company:

- **Claude Chat** is like a **consultant sitting across the table**. You ask questions, they give answers, and you decide what to do next. The conversation goes back and forth.
- **Claude Code** is like a **skilled mechanic**. You give them access to your workshop (terminal), and they roll up their sleeves to build things, fix bugs, and manage your code directly.
- **Claude Cowork** is like a **personal assistant with their own office**. You hand them a task brief, they go away, figure out how to do it, and come back with the finished work in your folder.

Here is a quick comparison:

| Product | Role | Who It's For |
|---------|------|--------------|
| **Claude Chat** | Chat assistant | Everyone — you type a prompt, it gives a response. You stay involved in the conversation |
| **Claude Code** | Developer tool | Engineers — runs in the terminal, directly writes code, executes commands, manages Git |
| **Claude Cowork** | Digital employee | Everyone — you assign a task, it breaks it down, executes it, and delivers results |

### Key Differences

- **Chat is a conversation** — you ask, it answers, and you stay "in the loop"
- **Code is a tool** — Iron Man armor fitted over "raw intelligence," operating in the terminal and IDE
- **Cowork is an employee** — you delegate tasks, it completes them autonomously, and results go straight into your folder

> Once you understand this distinction, the way you think about Cowork changes completely.

### When Should You Use Each?

Here is a practical rule of thumb:

| If you need to... | Use... |
|---|---|
| Ask a quick question or brainstorm | **Chat** |
| Write code, debug, manage Git, run tests | **Code** |
| Organize files, generate reports, process documents | **Cowork** |
| Automate a weekly recurring business task | **Cowork** |
| Build a full application from scratch | **Code** |
| Summarize a batch of PDFs into a spreadsheet | **Cowork** |

The key insight: **Code requires technical knowledge; Cowork does not.** If the task is something a competent office assistant could do (given enough time), Cowork is probably the right choice.

## 📖 Theory: How Cowork Executes

Under the hood, Cowork uses the same auto-execution engine as Claude Code, but provides a non-technical user-facing interface. Think of it like ordering food at a restaurant: you tell the waiter what you want (Cowork's interface), and the kitchen (Claude's engine) handles the cooking. You never need to know how the stove works.

```mermaid
flowchart LR
    A[You assign a task] --> B[Cowork breaks it into subtasks]
    B --> C[Spins up VM environment]
    C --> D[Parallel sub-agents]
    D --> E[Results in your folder]
    style A fill:#008B8B,color:#fff
    style E fill:#00B4A6,color:#fff
```

1. **You assign a task** — Write a clear description of what you want done
2. **Cowork breaks it into subtasks** — Like a project manager creating a to-do list
3. **It spins up a local virtual machine environment** — A safe, isolated workspace
4. **It may schedule multiple parallel sub-agents simultaneously** — Multiple workers tackling different parts at once
5. **It places the final output directly in your folder** — The finished work appears like magic

### What Are Sub-Agents?

Sub-agents are like team members that Cowork assigns to different parts of a task. For example, if you ask Cowork to "analyze these 50 invoices and create a report," it might:
- Assign one sub-agent to read and categorize the invoices
- Assign another sub-agent to calculate totals
- Assign a third sub-agent to generate the final report

This parallel execution is why Cowork can feel surprisingly fast for complex tasks.

## 💻 Code Example 1: Understanding the Difference in Practice

Even though Cowork itself uses a graphical interface, understanding how you would phrase the same task for each tool helps clarify the differences:

```bash
# ---- Claude Chat approach ----
# You would type in the chat window:
# "Can you help me organize my invoices by category?"
# Chat gives you advice and instructions, but YOU do the work.

# ---- Claude Code approach ----
# In your terminal, you would run:
claude "Read all PDF files in ./invoices/, extract vendor names,
       create subdirectories by vendor, and move each file
       to the appropriate directory."
# Code executes commands directly in your terminal.
# You need to be comfortable with the command line.

# ---- Claude Cowork approach ----
# In the Cowork interface, you would type:
# "Organize these invoices by vendor into subfolders
#  and generate an Excel summary."
# Then you drag your invoice files into the sandbox folder.
# Cowork handles EVERYTHING — no terminal needed.
```

### Expected Output:
After Cowork finishes, you would see your sandbox folder transformed:

```
📸 [You should see a folder structure like this]
Claude Workspace/
├── Amazon/
│   ├── invoice-001.pdf
│   └── invoice-007.pdf
├── Google/
│   ├── invoice-003.pdf
│   └── invoice-012.pdf
├── Microsoft/
│   └── invoice-005.pdf
└── summary.xlsx        ← Auto-generated summary spreadsheet
```

## 💻 Code Example 2: Seeing the Shared Architecture

Both Cowork and Claude Code share the same underlying MCP (Model Context Protocol) architecture. Here is how you can see the connection:

```bash
# In Claude Code, you configure MCP servers in settings.json:
cat ~/.claude/settings.json
# Output might include:
# {
#   "mcpServers": {
#     "google-drive": {
#       "command": "npx",
#       "args": ["@anthropic/mcp-google-drive"]
#     }
#   }
# }

# In Cowork, the same Google Drive connection is set up
# by clicking the + icon → Connectors → Google Drive → Authorize.
# Same capability, different interface!

# Both tools can also use Skills — reusable instruction files:
# Claude Code: /summarize-invoices  (slash command in terminal)
# Cowork: /summarize-invoices       (slash command in chat interface)

# The .md skill file is identical in both cases.
# This means skills you build in one tool can transfer to the other.
```

### Expected Output:
This example is conceptual — it shows you that the configuration file Claude Code uses maps directly to the point-and-click connectors in Cowork. The same MCP servers power both tools.

## Where This Course Fits In

This course (The Complete Guide to Claude Code) focuses on **Claude Code** — the developer tool. But understanding Cowork helps you:

- Know when to use Code vs Cowork
- Understand the shared underlying architecture (MCP, Skills, etc.)
- Recommend the right tool for non-technical team members
- Transfer skills between tools (MCP servers, Skills, and prompting techniques)

## ✍️ Hands-On Exercises

**Exercise 1: Tool Selection Practice**

For each scenario below, decide whether you would use Chat, Code, or Cowork. Write down your answer and reasoning:

1. You want to brainstorm marketing taglines for a new product.
2. You need to refactor a React component and write unit tests.
3. You have 200 customer emails and want them categorized by topic with a summary report.
4. You want to set up a GitHub Actions CI/CD pipeline.
5. You need to convert 30 blog posts into a formatted ebook.

> Hint: Ask yourself — "Does this require a terminal? Does it require ongoing conversation? Or can I just hand it off?"

**Exercise 2: Explain It to a Friend**

Imagine a non-technical colleague asks you: "What is this Claude Cowork thing? Is it the same as ChatGPT?" Write a 3-sentence explanation that a complete beginner would understand. Try to use an analogy from everyday life.

> Hint: Focus on the "digital employee" concept and the idea that Cowork works autonomously rather than needing constant back-and-forth.

## 🔗 Next Step

In the next module (6.2), we will set up the Cowork environment, create a sandbox folder, choose the right model, and run your very first Cowork task. You will go from theory to hands-on practice!

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What best describes Claude Cowork's role compared to Chat and Code?</p>
<label><input type="radio" name="q1" value="0"> A chat assistant that answers questions conversationally</label>
<label><input type="radio" name="q1" value="1"> A developer tool that runs in the terminal and writes code</label>
<label><input type="radio" name="q1" value="2"> A digital employee that autonomously completes delegated tasks</label>
<label><input type="radio" name="q1" value="3"> A cloud hosting platform for deploying applications</label>
<div class="quiz-explain">Cowork acts as a digital employee -- you assign a task, it breaks it down, executes it autonomously, and delivers results directly into your folder. Chat is conversational, and Code is a developer terminal tool.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. Which type of task is better suited for Cowork rather than Claude Code?</p>
<label><input type="radio" name="q2" value="0"> Writing and debugging Python scripts in a terminal</label>
<label><input type="radio" name="q2" value="1"> Organizing a folder of mixed invoices into categories and generating a summary spreadsheet</label>
<label><input type="radio" name="q2" value="2"> Creating Git branches and managing pull requests</label>
<label><input type="radio" name="q2" value="3"> Setting up CI/CD pipelines with GitHub Actions</label>
<div class="quiz-explain">Cowork excels at non-technical file organization and document processing tasks. Claude Code is better for developer-oriented tasks like Git, scripting, and CI/CD.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>3. How does Cowork execute complex tasks under the hood?</p>
<label><input type="radio" name="q3" value="0"> It sends everything to a remote cloud server for processing</label>
<label><input type="radio" name="q3" value="1"> It requires you to manually break down each subtask</label>
<label><input type="radio" name="q3" value="2"> It only processes one step at a time sequentially</label>
<label><input type="radio" name="q3" value="3"> It automatically breaks tasks into subtasks and may run parallel sub-agents</label>
<div class="quiz-explain">Cowork uses the same auto-execution engine as Claude Code. It automatically decomposes tasks into subtasks and can schedule multiple parallel sub-agents to work simultaneously.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>4. In the restaurant analogy, what does the "kitchen" represent?</p>
<label><input type="radio" name="q4" value="0"> The Cowork graphical interface</label>
<label><input type="radio" name="q4" value="1"> Claude's auto-execution engine that processes tasks behind the scenes</label>
<label><input type="radio" name="q4" value="2"> Your computer's file system</label>
<label><input type="radio" name="q4" value="3"> The internet connection</label>
<div class="quiz-explain">In the restaurant analogy, you tell the waiter (Cowork's interface) what you want, and the kitchen (Claude's engine) handles the actual work. You never need to know how the stove works.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. What are sub-agents in the context of Cowork?</p>
<label><input type="radio" name="q5" value="0"> Parallel workers that Cowork assigns to different parts of a task</label>
<label><input type="radio" name="q5" value="1"> Other users who share your Cowork account</label>
<label><input type="radio" name="q5" value="2"> External APIs that Cowork connects to</label>
<label><input type="radio" name="q5" value="3"> Backup copies of your task in case something fails</label>
<div class="quiz-explain">Sub-agents are like team members that Cowork assigns to different parts of a task. For example, one might categorize files while another generates a report, allowing parallel execution.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. Which statement about Skills is correct?</p>
<label><input type="radio" name="q6" value="0"> Skills only work in Claude Code, not in Cowork</label>
<label><input type="radio" name="q6" value="1"> Skills only work in Cowork, not in Claude Code</label>
<label><input type="radio" name="q6" value="2"> Skills built as .md files can be used in both Cowork and Claude Code</label>
<label><input type="radio" name="q6" value="3"> Skills require a paid enterprise subscription</label>
<div class="quiz-explain">Skills are reusable .md instruction files that work in both Cowork and Claude Code. The same skill file can be invoked as a slash command in either tool, making skills transferable.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. What is the main advantage of Cowork over Claude Code for non-technical users?</p>
<label><input type="radio" name="q7" value="0"> Cowork is faster at processing tasks</label>
<label><input type="radio" name="q7" value="1"> Cowork produces higher quality output</label>
<label><input type="radio" name="q7" value="2"> Cowork is free while Code requires payment</label>
<label><input type="radio" name="q7" value="3"> Cowork does not require terminal or command-line knowledge</label>
<div class="quiz-explain">The key advantage of Cowork for non-technical users is that it provides a graphical interface. You do not need to use a terminal, write commands, or understand the command line. You just describe what you want done.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. If you need to debug a failing Python test suite and fix the code, which tool should you use?</p>
<label><input type="radio" name="q8" value="0"> Claude Code — it runs in the terminal and can directly edit code and run tests</label>
<label><input type="radio" name="q8" value="1"> Claude Cowork — it can handle any task autonomously</label>
<label><input type="radio" name="q8" value="2"> Claude Chat — it can explain the error to you</label>
<label><input type="radio" name="q8" value="3"> All three are equally suited for this task</label>
<div class="quiz-explain">Debugging code requires direct terminal access, running test commands, editing source files, and managing Git — all strengths of Claude Code. While Chat could explain errors, only Code can directly fix the code and re-run tests.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
