# Module 8.4: Memory System & Multi-Session Workflows

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand the three layers of Claude Code's memory system
  - Set up and organise CLAUDE.md files at global, project, and folder levels
  - Use auto-memory to let Claude remember things across conversations
  - Design effective multi-session workflows for large projects
  - Know what belongs in CLAUDE.md versus what auto-memory should handle

## 📖 Theory

### The Problem: Claude Forgets Everything

Every time you close Claude Code and open a new session, it starts with a blank slate. It doesn't remember:
- What you worked on yesterday
- Your coding preferences
- The architecture decisions you made
- Which approach you tried and rejected

This is like hiring a brilliant consultant who gets amnesia every evening. They're incredibly skilled each day, but you have to re-brief them every morning.

**Claude Code's memory system solves this.** It has three layers:

### Layer 1: CLAUDE.md (Manual — You Write It)

CLAUDE.md is a file you create that Claude Code reads at the start of every conversation. Think of it as the **employee handbook** — permanent instructions that never change.

```
~/.claude/CLAUDE.md              → Global (all projects)
your-project/CLAUDE.md           → Project-level (shared via git)
your-project/src/CLAUDE.md       → Folder-scoped (only when working in src/)
```

**Hierarchy rule:** All three are loaded, with more specific files taking priority.

### Layer 2: Auto-Memory (Automatic — Claude Writes It)

Auto-memory is Claude's personal notebook. When it learns something important about you or your project, it saves it automatically to `~/.claude/projects/*/memory/`.

Types of auto-memory:

| Type | What It Stores | Example |
|------|---------------|---------|
| **User** | Your role, skills, preferences | "Kin is a CEO, prefers concise responses" |
| **Feedback** | Corrections and confirmations | "Don't add comments to code unless asked" |
| **Project** | Ongoing work, decisions, deadlines | "Auth rewrite is driven by compliance deadline" |
| **Reference** | Where to find external information | "Bug tracking is in Linear project INGEST" |

### Layer 3: Conversation Context (Ephemeral)

This is just the current conversation. It disappears when you close the session. Use /compact to summarise it, or /clear to discard it.

### How the Layers Work Together

```
┌─────────────────────────────┐
│ Layer 3: Conversation       │ ← Ephemeral (this session only)
│ "We just fixed the login    │
│  bug in auth.py"            │
├─────────────────────────────┤
│ Layer 2: Auto-Memory        │ ← Persistent (across sessions)
│ "User prefers Python 3.11"  │
│ "Don't mock databases"      │
├─────────────────────────────┤
│ Layer 1: CLAUDE.md          │ ← Permanent (you maintain it)
│ "This is a Django project"  │
│ "Use pytest for testing"    │
│ "Never modify production"   │
└─────────────────────────────┘
```

## 💻 Code Example 1: Creating an Effective CLAUDE.md

### Global CLAUDE.md (applies to all projects):

```bash
# Create or edit your global instructions
# Location: ~/.claude/CLAUDE.md
```

Example content:

```markdown
# Global Instructions

## About Me
- I'm a Python developer working on web applications
- I prefer concise responses — don't explain things I already know
- I use pytest for testing, never unittest

## Code Style
- Python: Black formatter, 88-char line length
- Always use type hints for function signatures
- Prefer f-strings over .format()

## Safety Rules
- Never commit .env files
- Always create a new git branch for features
- Never force push to main
```

### Project CLAUDE.md (specific to one project):

```markdown
# My E-commerce App

## Tech Stack
- Django 4.2, Python 3.11, PostgreSQL 15
- Frontend: HTMX + Tailwind CSS
- Deployed on AWS Lightsail

## Project Structure
- src/orders/ — Order management (main feature area)
- src/auth/ — Custom auth (don't modify without discussion)
- src/payments/ — Stripe integration

## Conventions
- All API endpoints return JSON with {data, error, status} format
- Use Django REST Framework serializers for validation
- Database migrations must be reversible

## Current Sprint
- Building the returns/refund feature in src/orders/returns.py
- Do NOT touch the payment processing code — it's being audited
```

[What you should see]
```
+--------------------------------------------------+
| When Claude Code starts, it reads:               |
| 1. ~/.claude/CLAUDE.md (global)                  |
| 2. /your-project/CLAUDE.md (project)             |
| 3. Any subfolder CLAUDE.md (if working there)    |
|                                                  |
| Claude now knows your preferences, stack,        |
| conventions, and current focus area.             |
+--------------------------------------------------+
```

## 💻 Code Example 2: Using Auto-Memory

### Telling Claude to remember something:

```
> Remember that our staging server is at staging.example.com 
  and deploys happen via GitHub Actions on the staging branch
```

[What you should see]
```
+--------------------------------------------------+
| Claude saves a memory file:                      |
| ~/.claude/projects/my-project/memory/            |
|   reference_staging.md                           |
|                                                  |
| And updates the index:                           |
|   MEMORY.md                                      |
|   - [Staging Server](reference_staging.md) —     |
|     staging.example.com, deploys via GH Actions  |
+--------------------------------------------------+
```

### Claude remembers automatically too:

```
> Don't add docstrings to my code — I find them cluttered

# Claude automatically saves this as a "feedback" memory
# Next session, it won't add docstrings unless you ask
```

### Telling Claude to forget:

```
> Forget about the staging server — we've migrated to Vercel
```

Claude deletes the relevant memory file.

### Checking what Claude remembers:

```
> What do you remember about this project?
```

Claude reads its memory files and tells you what it knows.

## 💻 Supplementary Example: Multi-Session Workflow Strategies

### Strategy 1: The Checkpoint Pattern

For large features that span multiple sessions:

```
Session 1: Plan the feature
> Plan how to add user roles to our app. Save the plan to docs/roles-plan.md

Session 2: Implement step 1
> Read docs/roles-plan.md. Implement step 1 (database models).

Session 3: Implement step 2
> Read docs/roles-plan.md. Implement step 2 (API endpoints). 
  Step 1 is done — see the commit "Add role models" from yesterday.
```

### Strategy 2: Git as Memory

Git commits serve as checkpoints between sessions:

```
Session 1: Make changes → commit "Add user model with roles"
Session 2: "Show me the last 5 commits" → Claude sees your progress
```

### Strategy 3: CLAUDE.md as Living Document

Update your project CLAUDE.md as the project evolves:

```markdown
## Current Status (updated 2026-04-11)
- ✅ Phase 1: Database models (complete)
- 🔄 Phase 2: API endpoints (in progress — /roles done, /permissions next)
- ⬜ Phase 3: Frontend UI (not started)
```

### What Goes Where?

| Information | Where to Put It |
|------------|-----------------|
| Tech stack, conventions | CLAUDE.md (project) |
| Your personal preferences | CLAUDE.md (global) or auto-memory |
| "Don't do X" corrections | Auto-memory (feedback type) |
| Current sprint / deadlines | CLAUDE.md (project) or auto-memory (project type) |
| External service URLs | Auto-memory (reference type) |
| Code patterns to follow | CLAUDE.md (project) |
| Temporary debugging notes | Don't save — just use conversation context |

## ✍️ Hands-On Exercisess

### Exercise 1: Create Your CLAUDE.md Files
1. Create a global `~/.claude/CLAUDE.md` with your personal preferences
2. Pick a project and create a project-level `CLAUDE.md` in its root
3. Include: tech stack, coding conventions, project structure, and safety rules
4. Start a new Claude Code session and ask "What do you know about this project?"
5. Verify that Claude read your CLAUDE.md correctly

> Tip: Start small — 10-15 lines is enough. You can always add more as you discover things you want Claude to consistently know.

### Exercise 2: Test the Memory System
1. Start a Claude Code session
2. Tell Claude: "Remember that our API rate limit is 100 requests per minute"
3. Close the session completely
4. Start a new session
5. Ask: "What's our API rate limit?"
6. Verify that Claude remembers from the previous session

> Tip: Auto-memory is great for things that come up organically in conversation. CLAUDE.md is for things you know upfront and want to standardise.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What are the three layers of Claude Code's memory system?</p>
<label><input type="radio" name="q1" value="0"> Short-term memory, long-term memory, and permanent memory</label>
<label><input type="radio" name="q1" value="1"> Local storage, cloud storage, and database storage</label>
<label><input type="radio" name="q1" value="2"> CLAUDE.md (manual), auto-memory (automatic), and conversation context (ephemeral)</label>
<label><input type="radio" name="q1" value="3"> Project memory, user memory, and system memory</label>
<div class="quiz-explain">Claude Code has three layers: CLAUDE.md files that you write and maintain, auto-memory that Claude saves automatically across sessions, and conversation context that only lasts for the current session.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. Where should you put project-specific coding conventions that the whole team should follow?</p>
<label><input type="radio" name="q2" value="0"> In your global ~/.claude/CLAUDE.md</label>
<label><input type="radio" name="q2" value="1"> In the project root CLAUDE.md (committed to git)</label>
<label><input type="radio" name="q2" value="2"> In auto-memory files</label>
<label><input type="radio" name="q2" value="3"> In the conversation — just tell Claude each time</label>
<div class="quiz-explain">Project-level CLAUDE.md in the repo root is the right place for team conventions. Since it's committed to git, everyone on the team gets the same instructions. Global CLAUDE.md is for personal preferences, and auto-memory is for things that emerge organically.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>3. How do you make Claude Code remember something across sessions?</p>
<label><input type="radio" name="q3" value="0"> You can't — Claude always starts fresh</label>
<label><input type="radio" name="q3" value="1"> Save it to a text file and read it manually each time</label>
<label><input type="radio" name="q3" value="2"> Write it in the conversation and use /compact</label>
<label><input type="radio" name="q3" value="3"> Say "Remember that..." and Claude saves it to auto-memory, or write it in CLAUDE.md</label>
<div class="quiz-explain">You can either tell Claude to "remember" something (it saves to auto-memory files) or write it in CLAUDE.md (permanent instructions). Both persist across sessions. Conversation context and /compact only work within the current session.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Excellent! You now understand how Claude Code's memory works across sessions. In the next module, **8.5: Multimodal — Images, Screenshots & PDFs**, we'll explore Claude Code's ability to see and understand images, not just text.
