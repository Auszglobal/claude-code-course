# Module 9.1: Sub-agents & Parallel Execution

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand what sub-agents are and how they work in Claude Code
  - Identify when parallel execution improves efficiency
  - Use sub-agents for codebase exploration, research, and independent tasks
  - Understand git worktrees for isolated agent work
  - Know the limitations and trade-offs of parallel execution

## 📖 Theory

### What Are Sub-agents?

Imagine you're a project manager with a team of developers. Instead of doing everything yourself — searching the codebase, reviewing files, running tests — you delegate tasks to team members who work independently and report back.

**Sub-agents work the same way.** Claude Code (the "main agent") can spawn child agents that work on tasks in parallel. Each sub-agent:

- Gets its own context window (clean slate)
- Has access to the same tools (Read, Grep, Bash, etc.)
- Works independently and can't see what other agents are doing
- Reports its findings back to the main agent

### Types of Sub-agents

| Type | Purpose | Speed | Best For |
|------|---------|-------|----------|
| **Explore** | Fast codebase search | Quick | "Find all files that import auth" |
| **Plan** | Design implementation strategies | Medium | "Plan how to refactor the API layer" |
| **General-purpose** | Complex multi-step tasks | Varies | "Research how error handling works in this codebase" |

### When Sub-agents Shine

Sub-agents are most valuable when you have **independent tasks** — work that doesn't depend on each other:

```
✅ Good use of sub-agents (independent tasks):
├── Agent 1: Search for all API endpoint definitions
├── Agent 2: Search for all database query patterns
└── Agent 3: Search for all authentication checks

❌ Bad use of sub-agents (dependent tasks):
├── Agent 1: Read the config file
├── Agent 2: Use values from config to update database  ← needs Agent 1's result!
└── Agent 3: Test the database changes                  ← needs Agent 2's result!
```

### The Manager-Worker Model

```
┌─────────────────────┐
│   You (the human)   │
│ "Review all changed  │
│  files in this PR"   │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ Main Claude Code    │
│ (Project Manager)   │
│ Breaks task into    │
│ parallel sub-tasks  │
└──┬────┬────┬────┬───┘
   │    │    │    │
┌──▼─┐┌─▼──┐┌▼──┐┌▼──┐
│ A1 ││ A2 ││ A3││ A4│  ← Sub-agents (Workers)
│auth││api ││db ││ui │
│.py ││.py ││.py││.js│
└──┬─┘└─┬──┘└┬──┘└┬──┘
   │    │    │    │
┌──▼────▼────▼────▼───┐
│ Main Claude Code    │
│ Combines all results│
│ into a single report│
└─────────────────────┘
```

## 💻 Code Example 1: Automatic Sub-agent Usage

Claude Code often uses sub-agents automatically when it recognises a task that benefits from parallel execution. You don't need to do anything special:

```bash
# Ask Claude to do something that naturally parallelises
> Search the entire codebase for any hardcoded API keys, passwords, 
  or secrets. Check all file types.
```

[What you should see]
```
+--------------------------------------------------+
| Claude Code spawns multiple Explore agents:      |
|                                                  |
| Agent 1: Searching for API key patterns...       |
| Agent 2: Searching for password patterns...      |
| Agent 3: Searching for secret/token patterns...  |
|                                                  |
| All agents complete and report back:             |
| "Found 3 potential issues:                       |
|  1. src/config.py:12 — hardcoded API key         |
|  2. tests/fixtures.py:8 — test password          |
|  3. scripts/deploy.sh:5 — AWS secret"            |
+--------------------------------------------------+
```

### You can also explicitly ask for parallel work:

```bash
> Review each of these 4 files in parallel and give me a summary 
  of what each one does:
  - src/auth/login.py
  - src/auth/register.py
  - src/auth/permissions.py
  - src/auth/tokens.py
```

Claude spawns a sub-agent for each file, reads them simultaneously, and combines the summaries.

## 💻 Code Example 2: Git Worktrees for Safe Isolation

### What Are Git Worktrees?

A git worktree is like having a **second copy of your project** that shares the same git history but has its own working directory. Sub-agents can use worktrees to make experimental changes without affecting your main working directory.

```bash
# Normal workflow (no worktree):
# Sub-agent edits files → your working directory changes
# If something goes wrong → you have to undo changes

# Worktree workflow (isolated):
# Sub-agent works in a separate copy → your directory is untouched
# If something goes wrong → just delete the worktree
```

### How it works in practice:

```bash
> Try two different approaches to fix the performance bug in parallel:
  Approach A: Add caching to the database queries
  Approach B: Optimize the SQL queries themselves
  Use isolated worktrees so neither approach affects my current code.
```

[What you should see]
```
+--------------------------------------------------+
| Claude spawns two agents in separate worktrees:  |
|                                                  |
| Agent A (worktree: /tmp/worktree-abc123):        |
|   Adding Redis cache layer to db queries...      |
|                                                  |
| Agent B (worktree: /tmp/worktree-def456):        |
|   Optimizing SQL with proper indexes...          |
|                                                  |
| Results:                                         |
| "Approach A: 3x faster but adds Redis dependency"|
| "Approach B: 2x faster with no new dependencies" |
|                                                  |
| Your working directory: unchanged                |
+--------------------------------------------------+
```

You can then choose which approach to apply to your main code.

## 💻 Supplementary Example: When NOT to Use Sub-agents

Sub-agents aren't always the answer. Here are the trade-offs:

| Factor | Details |
|--------|---------|
| **Overhead** | Each sub-agent starts fresh — loading CLAUDE.md, reading context. For small tasks, this overhead isn't worth it |
| **No shared state** | Agent A can't see what Agent B found. If tasks depend on each other, they must be sequential |
| **Cost** | More agents = more tokens = more cost. 4 agents reading 4 files costs more than 1 agent reading 4 files sequentially |
| **Context isolation** | Sub-agents don't see your conversation history. They only know what the main agent tells them |

### Decision Guide:

```
Is the task independent? (no shared state needed)
├── Yes → Are there 2+ parallel parts?
│   ├── Yes → Sub-agents will help ✓
│   └── No → Just do it directly
└── No → Do it sequentially (no sub-agents)
```

### Practical Examples:

| Task | Sub-agents? | Why |
|------|-------------|-----|
| "Search for all TODO comments" | Yes | Each file can be searched independently |
| "Refactor function A, then update its callers" | No | Callers depend on the refactored function |
| "Review 5 PR files for bugs" | Yes | Each file review is independent |
| "Add a column to the database, then update the model, then update the API" | No | Each step depends on the previous |
| "Compare our auth with 3 different open-source implementations" | Yes | Each comparison is independent |

## ✍️ Hands-On Exercisess

### Exercise 1: Parallel Codebase Exploration
1. Open a project with at least 10 files
2. Ask Claude Code: "Explore this codebase and tell me: (1) what the main entry point is, (2) what external APIs it calls, and (3) what database it uses. Search in parallel."
3. Observe how Claude spawns sub-agents for each question
4. Compare the speed with asking each question one at a time

> Tip: The larger your codebase, the more you'll appreciate parallel search. On small projects (under 10 files), sequential search is often fast enough.

### Exercise 2: Parallel Code Review
1. Make changes to 3 different files in a project
2. Ask Claude Code: "Review all three changed files in parallel. For each file, tell me: what changed, whether it looks correct, and any potential issues."
3. Compare the combined review to reviewing each file one by one

> Tip: This workflow is especially powerful for reviewing pull requests with many changed files. Instead of reading each file sequentially, sub-agents review them all at once.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is the main advantage of sub-agents in Claude Code?</p>
<label><input type="radio" name="q1" value="0"> They use more powerful AI models than the main agent</label>
<label><input type="radio" name="q1" value="1"> They can work on independent tasks in parallel, saving time</label>
<label><input type="radio" name="q1" value="2"> They share context with each other for better collaboration</label>
<label><input type="radio" name="q1" value="3"> They are free and don't consume any tokens</label>
<div class="quiz-explain">Sub-agents excel at parallel execution — when you have multiple independent tasks (like searching different parts of a codebase), sub-agents can do them simultaneously instead of one at a time. They don't share context with each other and do consume tokens.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What is a git worktree used for in the context of sub-agents?</p>
<label><input type="radio" name="q2" value="0"> It makes sub-agents run faster by caching git history</label>
<label><input type="radio" name="q2" value="1"> It allows sub-agents to push code directly to GitHub</label>
<label><input type="radio" name="q2" value="2"> It creates an isolated copy of the repo so sub-agent changes don't affect your working directory</label>
<label><input type="radio" name="q2" value="3"> It merges all sub-agent results into a single commit</label>
<div class="quiz-explain">Git worktrees create separate working directories that share the same repository. Sub-agents can make experimental changes in a worktree without affecting your main working directory, making it safe to try risky approaches.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. When should you NOT use sub-agents?</p>
<label><input type="radio" name="q3" value="0"> When tasks depend on each other and must run in sequence</label>
<label><input type="radio" name="q3" value="1"> When you have more than 5 files to review</label>
<label><input type="radio" name="q3" value="2"> When working with Python code instead of JavaScript</label>
<label><input type="radio" name="q3" value="3"> When your internet connection is slow</label>
<div class="quiz-explain">Sub-agents work independently and can't see each other's results. If task B depends on task A's output (like refactoring a function and then updating its callers), you need sequential execution, not parallel sub-agents.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. You ask Claude Code to review 5 modified files in a Pull Request. How do sub-agents help?</p>
<label><input type="radio" name="q4" value="0"> They merge the files automatically</label>
<label><input type="radio" name="q4" value="1"> They each review the same file for redundancy</label>
<label><input type="radio" name="q4" value="2"> They translate the code to a different language</label>
<label><input type="radio" name="q4" value="3"> Each sub-agent reviews a different file simultaneously, then the main agent combines all findings</label>
<div class="quiz-explain">Since each file review is independent, sub-agents can review them in parallel. One agent reads auth.py, another reads api.py, etc. The main agent then combines all the individual reviews into a comprehensive report.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. Why can't sub-agents share information with each other during execution?</p>
<label><input type="radio" name="q5" value="0"> It's a bug that hasn't been fixed yet</label>
<label><input type="radio" name="q5" value="1"> Each sub-agent gets its own isolated context window and cannot see other agents' work</label>
<label><input type="radio" name="q5" value="2"> They use different programming languages</label>
<label><input type="radio" name="q5" value="3"> They run on different computers</label>
<div class="quiz-explain">Sub-agents are designed with context isolation — each one starts with a clean slate and only knows what the main agent tells it. This isolation ensures independent execution but means they can't coordinate directly with each other.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. You need to refactor a function and then update all files that call it. Should you use sub-agents?</p>
<label><input type="radio" name="q6" value="0"> Yes — have one agent refactor and another update callers simultaneously</label>
<label><input type="radio" name="q6" value="1"> Yes — but only use Explore-type agents</label>
<label><input type="radio" name="q6" value="2"> No — the tasks are dependent (updating callers requires the refactored function to be done first)</label>
<label><input type="radio" name="q6" value="3"> No — sub-agents can't modify code</label>
<div class="quiz-explain">This is a sequential dependency: you must finish refactoring the function before you can update its callers, because the callers need to match the new function signature. Sub-agents are for independent, parallel tasks only.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>7. What happens to your main working directory when a sub-agent makes changes in a git worktree?</p>
<label><input type="radio" name="q7" value="0"> Nothing — your main directory stays untouched; changes are isolated in the worktree</label>
<label><input type="radio" name="q7" value="1"> Your main directory is automatically updated with the changes</label>
<label><input type="radio" name="q7" value="2"> Your main directory is deleted and replaced</label>
<label><input type="radio" name="q7" value="3"> Both directories show the same changes simultaneously</label>
<div class="quiz-explain">Git worktrees are isolated copies that share the same git history but have separate working directories. Changes in a worktree don't affect your main directory, making it safe for experimental work.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. Using 4 sub-agents to read 4 files costs more tokens than 1 agent reading the same 4 files sequentially. Why might you still choose sub-agents?</p>
<label><input type="radio" name="q8" value="0"> Because sub-agents produce better analysis</label>
<label><input type="radio" name="q8" value="1"> Because sub-agents are required for reading multiple files</label>
<label><input type="radio" name="q8" value="2"> Because the time saved by parallel execution is worth the extra cost</label>
<label><input type="radio" name="q8" value="3"> Because sequential reading is not supported</label>
<div class="quiz-explain">Sub-agents trade cost for speed. Each agent has startup overhead (loading CLAUDE.md, initialising context), so 4 agents cost more than 1 sequential agent. But when time is critical — like reviewing a PR before a meeting — the speed benefit outweighs the extra cost.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You now understand how Claude Code leverages parallel execution for speed. In the next module, **9.2: Plan Mode & Complex Architecture**, we'll learn how to use Plan Mode to design before building — essential for large, multi-file tasks.
