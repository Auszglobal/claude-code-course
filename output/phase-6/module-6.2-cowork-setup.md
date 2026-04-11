# 6.2 Cowork Environment Setup and Sandbox

## Why Do You Need a Sandbox?

Cowork directly reads and writes files on your hard drive. Giving it access to your entire system is a recipe for disaster.

> So, start by restricting it to a controlled space.

## Four-Step Setup Process

### Step 1: Choose a Model

Select the AI model for task execution on the right side of the Cowork interface:

| Model | Use Case | Cost |
|-------|----------|------|
| **Sonnet 4.6** | Workhorse model, covers 99% of daily needs | Lower |
| **Opus 4.6** | Heavy-duty tasks, complex reasoning | Very high |
| **Haiku** | Lightweight tasks, optimized for speed | Lowest |

**The Einstein Principle**: Don't send Einstein to do kitchen chores. 99% of the time you don't need Opus.

> Remember to enable **Extended Thinking** — let Claude actually work through complex logic instead of relying on pattern matching.

### Step 2: Create a Sandbox

Create a folder on your desktop named `Claude Workspace` or `Sandbox`. This becomes Cowork's workspace — it can't touch anything outside this folder.

### Step 3: Grant Folder Permissions

Go to Cowork → click **Work in a folder** → select the sandbox folder → click **Allow once** or **Always allow**.

### Step 4: Run Your First Task

Drag a dozen invoices of different types into the sandbox, then type:

```
Please organize these invoices into subfolders by category and generate an Excel summary sheet.
```

Cowork will lay out its execution plan, then start processing autonomously.

## Comparison with Claude Code

| Setting | Claude Code | Claude Cowork |
|---------|-------------|---------------|
| Working directory | `cd` to project directory in terminal | Select sandbox folder |
| Permission control | `CLAUDE.md` + hooks | Folder permissions + blocklist |
| Model selection | CLI flag `--model` | Interface sidebar selection |

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Why should you create a sandbox folder before using Cowork?</p>
<label><input type="radio" name="q1" value="0"> It makes Cowork run faster</label>
<label><input type="radio" name="q1" value="1"> It restricts Cowork to a controlled space so it cannot touch files elsewhere on your system</label>
<label><input type="radio" name="q1" value="2"> Cowork cannot function without a specific folder name</label>
<label><input type="radio" name="q1" value="3"> It is required for billing purposes</label>
<div class="quiz-explain">Cowork directly reads and writes files on your hard drive. A sandbox folder restricts its access to a controlled space, preventing it from accidentally modifying important files elsewhere.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>2. According to the "Einstein Principle," which model should you use for 99% of daily Cowork tasks?</p>
<label><input type="radio" name="q2" value="0"> Sonnet 4.6</label>
<label><input type="radio" name="q2" value="1"> Opus 4.6</label>
<label><input type="radio" name="q2" value="2"> Haiku</label>
<label><input type="radio" name="q2" value="3"> Always use the most expensive model available</label>
<div class="quiz-explain">The Einstein Principle says "don't send Einstein to do kitchen chores." Sonnet 4.6 is the workhorse model that covers 99% of daily needs at a lower cost. Opus is reserved for heavy-duty complex reasoning tasks.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. How does permission control differ between Claude Code and Claude Cowork?</p>
<label><input type="radio" name="q3" value="0"> Both use the same CLAUDE.md system</label>
<label><input type="radio" name="q3" value="1"> Cowork uses CLI flags while Code uses a GUI</label>
<label><input type="radio" name="q3" value="2"> Code uses CLAUDE.md + hooks, while Cowork uses folder permissions + blocklist</label>
<label><input type="radio" name="q3" value="3"> Neither has any permission controls</label>
<div class="quiz-explain">Claude Code uses CLAUDE.md files and hooks in settings.json for permission control, while Cowork uses folder-level permissions and blocklist settings through its graphical interface.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Exercises

1. Create a `Claude Workspace` folder on your desktop
2. Connect this folder in Cowork
3. Try having Cowork organize a folder containing mixed file types
