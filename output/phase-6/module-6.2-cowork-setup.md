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

## Exercises

1. Create a `Claude Workspace` folder on your desktop
2. Connect this folder in Cowork
3. Try having Cowork organize a folder containing mixed file types
