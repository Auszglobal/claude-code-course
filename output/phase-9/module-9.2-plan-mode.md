# Module 9.2: Plan Mode & Complex Architecture

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Activate and use Plan Mode to design before building
  - Understand when planning is valuable vs unnecessary overhead
  - Work with implementation plans: review, adjust, and execute
  - Use task tracking to monitor progress on complex work
  - Leverage Extended Thinking for deeper analysis

## 📖 Theory

### Think Before You Build

Imagine a construction company that starts building a house by laying bricks on day one — no blueprints, no site survey, no structural plans. The result? Walls in the wrong place, plumbing that doesn't connect, and expensive rework.

**Plan Mode is the blueprint step for code.** Instead of immediately editing files, Claude Code first:

1. Reads and analyses the relevant code
2. Identifies all files that need to change
3. Proposes a step-by-step implementation plan
4. Lists risks and trade-offs
5. Waits for your approval before making any changes

### When to Use Plan Mode

| Situation | Plan Mode? | Why |
|-----------|-----------|-----|
| Multi-file refactoring | ✓ Yes | Many files to coordinate — a plan prevents mistakes |
| New feature touching 5+ files | ✓ Yes | Need to see the full picture before changing anything |
| Unfamiliar codebase | ✓ Yes | Plan Mode explores and maps the code for you |
| Simple bug fix in one file | ✗ No | Overhead of planning exceeds the work itself |
| Renaming a variable | ✗ No | Trivial — just do it |
| "I'm not sure how to approach this" | ✓ Yes | Let Claude analyse and propose options |

### Three Ways to Activate Plan Mode

1. **Shift+Tab** — Toggle plan mode on/off at any time
2. **Ask for a plan** — Include "plan" in your prompt naturally
3. **Describe uncertainty** — Claude often enters plan mode automatically when the task is complex

## 💻 Code Example 1: Using Plan Mode

### Activating Plan Mode:

```bash
# Method 1: Toggle with keyboard
# Press Shift+Tab — you'll see the mode indicator change

# Method 2: Just ask naturally
> Plan how to add user roles (admin, editor, viewer) to our Django app.
  We have a User model in models.py and authentication in auth.py.
```

[What you should see]
```
+--------------------------------------------------+
| 📋 PLAN MODE — No changes will be made           |
|                                                  |
| After analysing your codebase, here's my plan:   |
|                                                  |
| Step 1: Create a Role model in models.py         |
|   - Add Role model with name and permissions     |
|   - Add ManyToMany relationship to User          |
|                                                  |
| Step 2: Create migration                         |
|   - python manage.py makemigrations              |
|   - python manage.py migrate                     |
|                                                  |
| Step 3: Update auth.py                           |
|   - Add role-checking decorator                  |
|   - Add permission verification functions        |
|                                                  |
| Step 4: Update views.py                          |
|   - Add @require_role('admin') to admin views    |
|   - Add @require_role('editor') to edit views    |
|                                                  |
| Step 5: Add tests                                |
|   - Test role assignment                         |
|   - Test permission checks                       |
|   - Test unauthorised access returns 403         |
|                                                  |
| Files affected: models.py, auth.py, views.py,    |
|   tests/test_roles.py (new)                      |
|                                                  |
| Risks: Existing users will have no role assigned.|
|   We need a data migration to set a default.     |
|                                                  |
| Shall I proceed with this plan?                  |
+--------------------------------------------------+
```

### Adjusting the Plan:

```bash
> Good plan, but let's skip step 5 for now. Also, make the default 
  role "viewer" for existing users. Go ahead.
```

Claude adjusts the plan and begins executing it step by step.

## 💻 Code Example 2: Task Tracking

When working on complex tasks, Claude Code creates tasks to track progress:

```bash
> Implement the user roles plan we discussed. Track each step.
```

[What you should see]
```
+--------------------------------------------------+
| Task Progress:                                   |
|                                                  |
| ✓ Step 1: Create Role model     [completed]      |
| ✓ Step 2: Create migration      [completed]      |
| → Step 3: Update auth.py        [in progress]    |
| ○ Step 4: Update views.py       [pending]        |
|                                                  |
| Working on Step 3...                             |
+--------------------------------------------------+
```

You can check progress at any time:

```bash
# Ask about progress
> What's the status of the current task?
```

### Extended Thinking

For particularly complex problems, Claude Code uses **Extended Thinking** — spending extra time analysing before responding:

```bash
> This payment processing module has a race condition that causes 
  duplicate charges. The bug is intermittent and only happens under 
  high load. Analyse the concurrency handling and find the root cause.
```

[What you should see]
```
+--------------------------------------------------+
| Claude is thinking deeply...                     |
| (Extended Thinking activated automatically)      |
|                                                  |
| Analysing:                                       |
| - Reading processor.py concurrency patterns      |
| - Tracing the transaction lifecycle              |
| - Identifying shared state and lock points       |
| - Checking for TOCTOU vulnerabilities            |
|                                                  |
| Analysis complete. Here's what I found:          |
| ...                                              |
+--------------------------------------------------+
```

Extended Thinking activates automatically when Claude determines the task needs deeper analysis. You don't need to do anything special.

## 💻 Supplementary Example: Plan Mode Workflow Patterns

### Pattern 1: Explore → Plan → Execute

For unfamiliar codebases:

```bash
# Step 1: Explore
> I just cloned this project. Give me an overview of the architecture 
  and how the main components fit together.

# Step 2: Plan
> Now plan how to add a caching layer for the API responses.

# Step 3: Execute
> The plan looks good. Implement it.
```

### Pattern 2: Plan Comparison

When you're not sure about the approach:

```bash
> Give me two different plans for implementing search functionality:
  Plan A: Full-text search with PostgreSQL
  Plan B: Elasticsearch integration
  Compare the trade-offs for each.
```

Claude produces two plans side by side, helping you make an informed decision before writing any code.

### Pattern 3: Incremental Planning

For very large features:

```bash
# Session 1
> Plan the overall architecture for the notification system. 
  Save the plan to docs/notification-plan.md

# Session 2
> Read docs/notification-plan.md. Plan the detailed implementation 
  for Phase 1 (email notifications only).

# Session 3
> Read docs/notification-plan.md. Implement Phase 1.
```

### What Makes a Good Plan?

| Element | Why It Matters |
|---------|---------------|
| **Ordered steps** | You can follow progress and catch issues early |
| **Files listed** | You know exactly what will change |
| **Risks identified** | No surprises during implementation |
| **Rollback strategy** | You know how to undo if something goes wrong |
| **Success criteria** | You know when the task is truly done |

## ✍️ Hands-On Exercisess

### Exercise 1: Plan Before You Build
1. Choose a feature you want to add to a project
2. Ask Claude Code to plan the implementation (use Shift+Tab or say "plan how to...")
3. Review the plan carefully:
   - Are all affected files listed?
   - Do the steps make sense in order?
   - Are there risks you didn't think of?
4. Suggest one adjustment to the plan
5. Once satisfied, tell Claude to execute

> Tip: A good planning habit saves hours of debugging. If the plan reveals complexity you didn't expect, that's a win — it's much cheaper to discover problems in a plan than in code.

### Exercise 2: Compare Approaches
1. Think of a problem that could be solved multiple ways
2. Ask Claude Code: "Give me two different plans for solving [problem]. Compare the trade-offs."
3. Review both plans
4. Choose one and ask Claude to implement it
5. Reflect: did the comparison help you make a better decision?

> Tip: This works especially well for architectural decisions like "should we use a SQL or NoSQL database?" or "should we build a monolith or microservices?"

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What does Plan Mode do differently from normal mode?</p>
<label><input type="radio" name="q1" value="0"> It uses a more powerful AI model for better results</label>
<label><input type="radio" name="q1" value="1"> It analyses code and proposes a plan without making any changes until you approve</label>
<label><input type="radio" name="q1" value="2"> It automatically creates a backup of all files before editing</label>
<label><input type="radio" name="q1" value="3"> It runs all changes in a sandbox environment first</label>
<div class="quiz-explain">Plan Mode is about thinking before acting. Claude reads your code, designs a step-by-step plan, identifies risks, and presents it for your review — all without changing any files. Only after you approve does it begin implementation.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>2. When is Plan Mode NOT recommended?</p>
<label><input type="radio" name="q2" value="0"> When refactoring code across multiple files</label>
<label><input type="radio" name="q2" value="1"> When you're unsure about the best approach</label>
<label><input type="radio" name="q2" value="2"> When working in an unfamiliar codebase</label>
<label><input type="radio" name="q2" value="3"> When fixing a simple typo in one file</label>
<div class="quiz-explain">Plan Mode adds overhead — reading files, designing steps, waiting for approval. For simple, single-file fixes like typos, this overhead is unnecessary. Just make the change directly.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. What is Extended Thinking in Claude Code?</p>
<label><input type="radio" name="q3" value="0"> A paid add-on that enables longer conversations</label>
<label><input type="radio" name="q3" value="1"> A mode where Claude types its reasoning out loud for you to follow</label>
<label><input type="radio" name="q3" value="2"> An automatic behaviour where Claude spends extra time analysing complex problems before responding</label>
<label><input type="radio" name="q3" value="3"> A setting that enables Claude to remember things between sessions</label>
<div class="quiz-explain">Extended Thinking activates automatically when Claude determines a task needs deeper analysis. It spends more time reasoning about the problem before giving a response, resulting in more thorough and accurate solutions for complex tasks.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Now you know how to plan before building. In the next module, **9.3: Database Operations**, we'll learn how to use Claude Code to create, query, and manage databases — a skill needed for almost every real application.
