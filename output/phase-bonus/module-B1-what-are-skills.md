# Module B1: What Are Claude Code Skills?

## Learning Objectives

- After completing this lesson you will be able to:
  - Explain what a Claude Code Skill is and how it changes Claude's behaviour
  - Understand the Progressive Disclosure architecture of Skills
  - Distinguish between the use cases for Skills, MCP Servers, and Subagents
  - Find the official Anthropic Skills Marketplace
  - Read and understand the structure of a SKILL.md file

---

## Theory

### What Are Skills?

Imagine you've hired a very smart assistant (Claude Code) who knows a bit about everything, but doesn't necessarily know **your company's specific procedures**.

**A Skill is like a dedicated operations manual** that you place on your assistant's desk. When they need to perform a specific task, they open it up and follow the instructions.

Technically, a Skill is a **SKILL.md file** placed in a specific folder. When Claude Code starts up, it scans these files and loads the relevant guidance when needed.

### Why Do You Need Skills?

Claude Code without Skills is like a general practitioner -- they can treat anything, but might not know your hospital's specific procedures.

Claude Code with Skills is like a **doctor carrying specialist handbooks** -- when a heart issue comes up, they automatically open the cardiology standards and follow each step correctly.

### Progressive Disclosure Architecture

Skills are designed very cleverly. They don't dump all their content into Claude's context at once (that would waste tokens and memory). Instead, they work in three stages:

| Stage | What's Loaded | Token Cost | When It Happens |
|-------|--------------|-----------|----------------|
| Stage 1 | Skill name + short description (metadata) | ~100 tokens | When Claude Code starts up |
| Stage 2 | Full SKILL.md content | < 5,000 tokens | When a task matches the Skill |
| Stage 3 | Accompanying resource files (templates, examples, etc.) | Varies by file size | Loaded on demand during execution |

Think of it like a library:

- Stage 1 = Reading the book title and blurb (quick browse)
- Stage 2 = Borrowing the book to read in detail (only when needed)
- Stage 3 = Opening the CD or workbook that comes with the book (only when you're actually doing the work)

### Workflow Diagram

Here's the complete flow of how Claude Code processes Skills:

```
Claude Code starts
      |
      v
Scans ~/.claude/skills/  <-- (100 tokens per skill, very cheap)
      |
      v
Task matches a skill? --No--> Normal operation
      |
     Yes
      v
Loads full SKILL.md <-- (up to 5k tokens)
      |
      v
Executes with skill context
```

[How to understand this flow]
```
+-----------------------------------------------------+
|  Claude Code starts                                  |
|  -> Scans the skills folder (like reading book       |
|     titles on a shelf)                               |
|  -> Discovers 5 Skills: frontend-design, TDD,        |
|     deploy, docs, SEO                                |
|  -> Only remembers names and descriptions (very      |
|     resource-efficient)                              |
|                                                      |
|  You say: "Help me write a React component"          |
|  -> Claude thinks: This relates to the               |
|     "frontend-design" Skill!                         |
|  -> Loads the full frontend-design SKILL.md          |
|  -> Writes code following the Skill's guidance       |
+-----------------------------------------------------+
```

### Skills vs MCP Servers vs Subagents

Beginners often confuse these three concepts. Here's a table to clarify:

| Feature | Skills | MCP Servers | Subagents |
|---------|--------|-------------|-----------|
| **What it is** | A text-based guide (SKILL.md) | A continuously running external service | An independent Claude instance |
| **Analogy** | Operations manual | An external specialised tool | An outside consultant you've brought in |
| **Installation difficulty** | Just copy a file | Requires configuration and running a service | Requires code setup |
| **Best for** | Changing how Claude works | Connecting to external data sources (databases, APIs) | Multiple AIs processing complex tasks in parallel |
| **Resource usage** | Very low (plain text) | Moderate (requires a running service) | Higher (multiple AI instances) |
| **Examples** | TDD workflow, code style guide | GitHub, Slack, database connections | Automated research, large-scale refactoring |

**Quick decision guide:**
- Want Claude to **do things differently** -> Use a Skill
- Want Claude to **connect to new tools or data** -> Use an MCP Server
- Want Claude to **handle multiple things at once** -> Use a Subagent

### The Official Anthropic Skills Marketplace

Anthropic and community developers provide many ready-made Skills you can install directly. Common sources:

1. **Official Anthropic Skills** -- in the skills folder of the `anthropics/claude-code` GitHub repo
2. **Community Skills** -- e.g., `obra/superpowers`, contributed by community developers
3. **Your own Skills** -- customised for your specific workflow

### Cross-Platform Nature of Skills

A great feature: Skills don't only work in Claude Code (the command line). The same SKILL.md can be used across:

- **Claude Code** (command-line tool)
- **Claude.ai** (web version)
- **Claude API** (programmatic access)

This means you write a Skill once and use it everywhere.

---

## Code Example 1: A Simple SKILL.md File

Let's see what a Skill file looks like. Here's a Skill that helps write Git commit messages:

```markdown
---
name: better-commits
description: Write clear, conventional commit messages following best practices
triggers:
  - commit
  - git commit
  - save changes
---

# Better Commits Skill

## When to use
When the user asks to commit code or save changes to git.

## Instructions

1. Review all staged changes using `git diff --cached`
2. Write a commit message following this format:
   - First line: type(scope): short description (max 72 chars)
   - Types: feat, fix, docs, style, refactor, test, chore
   - Body: explain WHY, not WHAT (the diff shows what changed)
3. Always include a blank line between the subject and body
4. Never use vague messages like "update" or "fix stuff"

## Examples

Good: `feat(auth): add password reset via email verification`
Bad:  `updated auth stuff`

Good: `fix(cart): prevent negative quantity on item removal`
Bad:  `fixed bug`
```

### Explanation of Each Section:

| Section | Purpose | Analogy |
|---------|---------|---------|
| `name` | The Skill's unique name | Book title |
| `description` | Short description (loaded in Stage 1) | Book subtitle |
| `triggers` | Keywords that activate this Skill | Category labels on the book |
| `# Heading onwards` | Complete operating instructions (loaded in Stage 2) | The body of the book |

### Expected Output:

After installing this Skill, when you say "help me commit" in Claude Code, Claude will:

[Behaviour change after installing the Skill]
```
+--------------------------------------------------+
| > Help me commit these changes                   |
|                                                  |
| Claude: Let me review your changes first...      |
| [runs git diff --cached]                         |
|                                                  |
| Based on the changes, I suggest this commit      |
| message:                                         |
|                                                  |
|   feat(invoice): add automatic retry on          |
|   email send failure                             |
|                                                  |
|   When Gmail API returns a 429 rate limit error, |
|   the agent now waits 30s and retries up to 3    |
|   times before marking the invoice as failed.    |
|                                                  |
| Shall I commit with this message?                |
+--------------------------------------------------+
```

---

## Code Example 2: With Skill vs Without Skill Comparison

Let's see how Claude Code behaves differently on the same task **with** and **without** a Skill.

### Scenario: You say "Help me build a login page"

**Without a Skill:**

```
> Help me build a login page

Claude: Sure, here's a simple login page:

[Generates a basic HTML/CSS login form]
[Could use any framework or plain HTML]
[Random style and structure]
```

**After installing the `frontend-design` Skill:**

Suppose your Skill is written like this:

```markdown
---
name: frontend-design
description: Build UI components following our design system
triggers:
  - UI
  - component
  - page
  - login
---

# Frontend Design Skill

## Design System Rules
- Framework: React + TypeScript (always)
- Styling: Tailwind CSS (never plain CSS or CSS modules)
- Colors: primary=#008B8B, accent=#00B4A6, dark=#1A1A2E
- Font: Inter for body, Poppins for headings
- All forms must have: loading states, error messages, accessibility labels
- Mobile-first: design for 375px width, then scale up

## Component Structure
- One component per file
- Props interface defined above component
- Use React Hook Form for all forms
- Include unit test file alongside component
```

**Claude's behaviour will be completely different:**

```
> Help me build a login page

Claude: Following our design system, I'll build the login page
using React + TypeScript + Tailwind CSS.

[Generates LoginPage.tsx -- using React Hook Form]
[Uses brand colours #008B8B and #00B4A6]
[Includes loading state and error handling]
[Includes accessibility labels]
[Mobile-first responsive design]
[Also generates LoginPage.test.tsx]
```

[Comparison]
```
+---------------------+--------------------------+
|    Without Skill     |    With Skill             |
+---------------------+--------------------------+
| Random framework     | Always React+TypeScript   |
| Random CSS           | Always Tailwind CSS       |
| Random colours       | Brand colour #008B8B      |
| May lack error       | Includes complete error   |
|   handling           |   handling                |
| May lack tests       | Auto-generates test file  |
| May not be mobile-   | Mobile-first design       |
|   first              |                           |
+---------------------+--------------------------+
```

**This is the power of Skills -- they turn Claude from a "generalist" into "your team's expert".**

---

## Hands-On Exercises

### Exercise 1: Reading Comprehension

Look at the following SKILL.md snippet and answer the questions:

```markdown
---
name: api-docs
description: Generate API documentation from code
triggers:
  - document
  - API docs
  - swagger
---

# API Documentation Skill

## Rules
- Use OpenAPI 3.0 format
- Include request/response examples
- All endpoints must have description and error codes
```

Questions:
1. When will this Skill be triggered?
2. What format will it make Claude use for generating documentation?
3. Approximately how many tokens does its metadata use?

> Hint: The answers are all in the tables and flow diagram above!

### Exercise 2: Design Your Own Skill

Think of a task you frequently repeat in your daily work or studies. Using the template below, sketch out your Skill concept (no need to create an actual file yet -- just write it on paper or in a notebook):

```
Skill name: _______________
Short description: _______________
Trigger keywords: _______________
Main rules (3-5): 
1. _______________
2. _______________
3. _______________
```

> Hint: Good Skills typically solve the problem of "having to explain the same thing every time." For example: always having to remind Claude to use a specific framework, follow a particular code style, or follow a certain process.

---

## Quiz (3 Questions)

**1. What is the core essence of Claude Code Skills?**

A. A software plugin that needs to be installed  
B. A Markdown-format guidance document (SKILL.md)  
C. A continuously running background service  
D. A built-in Claude feature module  

Answer: **B** -- A Skill is essentially a SKILL.md file placed in a designated folder. It's pure text -- no software installation or running service required.

---

**2. What does Progressive Disclosure load in Stage 1?**

A. The full SKILL.md content (~5,000 tokens)  
B. The Skill's name and short description (~100 tokens)  
C. All the Skill's accompanying resource files  
D. The complete contents of all installed Skills  

Answer: **B** -- Stage 1 only loads the metadata (name + description), approximately 100 tokens. This means even if you have many Skills installed, startup won't waste resources. The full content is only loaded when a task actually matches a Skill.

---

**3. Which scenario is best solved with a Skill?**

A. Need to connect to the company's Slack channel to send notifications  
B. Need to translate 50 documents simultaneously  
C. Every time you write code, you need to remind Claude to follow your company's naming conventions  
D. Need to read customer data from a database  

Answer: **C** -- Skills are best suited for "changing how Claude works," like following specific conventions or processes. A and D require connecting to external services (use MCP Server), B requires parallel processing (use Subagent).

---

## Next Steps

Now that you understand what Skills are, in **Module B2: Installing Skills -- 3 Methods**, we'll get hands-on with installing Skills! You'll learn three different installation methods, from the simplest one-line command to manual file copying, ensuring you can install successfully in any environment.
