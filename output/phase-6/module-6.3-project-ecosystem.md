# 6.3 Project Ecosystem and Business Brain

## The Pain of Working Without Projects

If you keep using Cowork without any structure:

- Nothing is remembered between sessions
- Every time you open a new window, you have to re-explain your business
- Different tasks interfere with and bleed into each other

**The solution: build a project-based workflow (Project Ecosystem).**

## What Is a Project?

A Project is not just a simple folder. It's a container that brings together:

- Your files
- Custom instructions
- Skills
- Context memory that accumulates over time

### With vs Without a Project

| Scenario | Result |
|----------|--------|
| Without a Project | You start from scratch explaining yourself every conversation |
| With a Project | Context compounds like interest — by week 6, you just say "do the usual" |

## The Project Isolation Principle

> Different domains must be split into separate projects. No exceptions.

For example:
- YouTube content project
- Finance project
- Customer management project

**Why?** YouTube tone rules will "contaminate" finance tasks, and Claude will start mixing up styles.

## Business Brain — Your .md Files

These plain text files live in the context folder, and Claude reads them before every task:

### `about_me.md`
```markdown
Who you are, what your business does, who your customers are, how you make money, current priorities.
Claude reads this file every time.
```

### `brand_voice.md`
```markdown
Your tone, expressions you hate, phrases you commonly use.
Paste real writing samples so the output stops sounding like "generic Claude."
```

### `working_preferences.md`
```markdown
How you manage tasks, where files are stored, output format requirements.
```

> **Tip**: Don't write these from scratch. Just tell Claude: "Ask me questions step by step, then generate a set of business brain files based on my answers." It only takes 15 minutes.

## Comparison with Claude Code

| Concept | Cowork | Claude Code |
|---------|--------|-------------|
| Project configuration | .md files + Project settings | `CLAUDE.md` |
| Brand voice | `brand_voice.md` | Written as instructions in `CLAUDE.md` |
| Memory system | Project context | Memory system (auto memory) |

## Three-Layer Instruction System

| Layer | Location | Scope |
|-------|----------|-------|
| **Layer 1** — Personalisation | Account settings | Global across Chat + Code + Cowork |
| **Layer 2** — Cowork global | Settings → Cowork → Global | All Cowork tasks |
| **Layer 3** — Project-level | Project Instructions | Within a single project |

**Principle: Global defines habits, Cowork defines execution, Project defines expertise.**

---

## Exercises

1. Create a Cowork Project and write an `about_me.md`
2. Compare the output difference with and without a Project
3. Think about the similarities and differences between your Claude Code `CLAUDE.md` and Cowork Business Brain
