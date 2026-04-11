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

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Why must different business domains be split into separate Cowork Projects?</p>
<label><input type="radio" name="q1" value="0"> Because Cowork can only open one project at a time</label>
<label><input type="radio" name="q1" value="1"> Because mixing domains causes style and context contamination between tasks</label>
<label><input type="radio" name="q1" value="2"> Because each project requires a separate paid subscription</label>
<label><input type="radio" name="q1" value="3"> Because projects have a strict file size limit</label>
<div class="quiz-explain">The Project Isolation Principle states that different domains must be split into separate projects. Without isolation, YouTube tone rules will "contaminate" finance tasks, and Claude will start mixing up styles and context.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What is the Cowork equivalent of Claude Code's CLAUDE.md?</p>
<label><input type="radio" name="q2" value="0"> A single settings.json file</label>
<label><input type="radio" name="q2" value="1"> Environment variables</label>
<label><input type="radio" name="q2" value="2"> Business Brain .md files (about_me.md, brand_voice.md, working_preferences.md)</label>
<label><input type="radio" name="q2" value="3"> The Cowork sidebar menu</label>
<div class="quiz-explain">In Cowork, Business Brain .md files serve the same purpose as CLAUDE.md in Claude Code -- they provide persistent context and instructions that Claude reads before every task.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. In the Three-Layer Instruction System, what does the Personalisation layer (Layer 1) control?</p>
<label><input type="radio" name="q3" value="0"> Global settings across Chat, Code, and Cowork</label>
<label><input type="radio" name="q3" value="1"> Settings for all Cowork tasks only</label>
<label><input type="radio" name="q3" value="2"> Settings within a single project only</label>
<label><input type="radio" name="q3" value="3"> Settings for a single conversation only</label>
<div class="quiz-explain">Layer 1 (Personalisation) is set in Account settings and applies globally across Chat, Code, and Cowork. Layer 2 covers all Cowork tasks, and Layer 3 is project-specific.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Exercises

1. Create a Cowork Project and write an `about_me.md`
2. Compare the output difference with and without a Project
3. Think about the similarities and differences between your Claude Code `CLAUDE.md` and Cowork Business Brain
