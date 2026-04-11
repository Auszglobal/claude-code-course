# 6.1 What Is Claude Cowork?

> This lesson references the BlockTempo article "The Complete Guide to Claude Cowork"

## Chat vs Code vs Cowork

Claude's product line has three core forms, each with a different purpose:

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

## How Cowork Executes

Under the hood, Cowork uses the same auto-execution engine as Claude Code, but provides a non-technical user-facing interface:

```mermaid
flowchart LR
    A[You assign a task] --> B[Cowork breaks it into subtasks]
    B --> C[Spins up VM environment]
    C --> D[Parallel sub-agents]
    D --> E[Results in your folder]
    style A fill:#008B8B,color:#fff
    style E fill:#00B4A6,color:#fff
```

1. You assign a task
2. Cowork automatically breaks it into subtasks
3. It spins up a local virtual machine environment
4. It may schedule multiple parallel sub-agents simultaneously
5. It places the final output directly in your folder

## Where This Course Fits In

This course (The Complete Guide to Claude Code) focuses on **Claude Code** — the developer tool. But understanding Cowork helps you:

- Know when to use Code vs Cowork
- Understand the shared underlying architecture (MCP, Skills, etc.)
- Recommend the right tool for non-technical team members

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

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
