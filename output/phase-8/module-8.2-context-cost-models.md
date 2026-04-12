# Module 8.2: Context, Cost & Model Selection

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand what the context window is and how tokens work
  - Use /compact and /clear to manage conversation length
  - Choose the right model (Opus, Sonnet, Haiku) for each task
  - Apply cost-saving strategies to reduce API spending
  - Monitor your usage with the /cost command

## 📖 Theory

### What Is the Context Window?

Think of the context window as Claude Code's **working memory** — like a desk with limited space. Everything sits on this desk:

- Your messages and prompts
- Files that Claude reads
- Tool results (command output, search results)
- Claude's own responses

When the desk gets full, older items fall off the edge. That's why long conversations can feel like Claude "forgot" what you discussed earlier.

### How Tokens Work

Tokens are the units that make up the context window. A rough guide:

| Content | Approximate Tokens |
|---------|-------------------|
| 1 word of English | ~1.3 tokens |
| 1 line of code | ~10-15 tokens |
| A 100-line Python file | ~1,500 tokens |
| A 500-line file | ~7,500 tokens |
| Your entire conversation | Adds up fast! |

Every message you send, every file Claude reads, and every command output — it all consumes tokens.

### The Three Models

Claude Code gives you access to three different models, each with different strengths:

| Model | Speed | Capability | Cost | Best For |
|-------|-------|-----------|------|----------|
| **Opus** | Slower | Highest | $$$ | Complex multi-file refactoring, architecture design, subtle bugs |
| **Sonnet** | Fast | High | $$ | Most everyday tasks, feature building, code review |
| **Haiku** | Fastest | Good | $ | Simple edits, quick searches, formatting, boilerplate |

Think of it like hiring help:
- **Opus** = Senior architect — takes longer, costs more, but handles the hardest problems
- **Sonnet** = Experienced developer — great balance of speed and skill
- **Haiku** = Junior assistant — fast and cheap for simple tasks

### Prompt Caching — The Hidden Cost Saver

Claude Code uses **prompt caching** with a 5-minute TTL (time-to-live). Here's what that means:

```
Message 1 (0:00) → Full price — cache is cold
Message 2 (1:30) → Cheaper! — cache is warm (within 5 minutes)
Message 3 (3:00) → Cheaper! — still warm
Message 4 (8:00) → Full price again — cache expired (more than 5 minutes)
```

**The takeaway:** If you're actively working, keep a steady pace. A 10-minute coffee break means your next message costs more because the cache expired.

## 💻 Code Example 1: Checking and Managing Context

### Checking your usage:

```bash
# See how much you've spent in the current session
> /cost
```

[What you should see]
```
+--------------------------------------------------+
| Session cost: $0.42                              |
| Total tokens: 45,230                             |
| Input: 38,100 | Output: 7,130                   |
| Cache hits: 72%                                  |
+--------------------------------------------------+
```

### Compacting the conversation:

When your context is getting full, Claude will warn you. You can proactively compact:

```bash
# Summarise the conversation to free up space
> /compact
```

[What you should see]
```
+--------------------------------------------------+
| Conversation compacted.                          |
| Summarised 47 messages into context summary.     |
| You can continue working — Claude remembers      |
| the key decisions and progress.                  |
+--------------------------------------------------+
```

### Starting fresh:

```bash
# Clear everything and start a new conversation
> /clear
```

Use /clear when:
- You're starting a completely different task
- The conversation is full of dead ends and failed attempts
- You want Claude to re-examine the code without preconceptions

## 💻 Code Example 2: Switching Models

### Check your current model:

```bash
# See which model you're using
> /model
```

### Switch to a different model:

```bash
# Switch to Haiku for a quick, simple task
> /model haiku

# Switch back to Opus for complex work
> /model opus

# Use Sonnet for balanced performance
> /model sonnet
```

[What you should see]
```
+--------------------------------------------------+
| Model switched to claude-haiku-4-5               |
| This model is fastest and most cost-effective.   |
| Best for: simple edits, searches, formatting.    |
+--------------------------------------------------+
```

### Choosing the right model for the task:

```
# Simple rename — use Haiku
> /model haiku
> Rename the variable "x" to "user_count" in analytics.py

# Building a new feature — use Sonnet
> /model sonnet
> Add pagination to the /api/users endpoint following the pattern in /api/orders

# Debugging a subtle race condition — use Opus
> /model opus
> There's an intermittent failure in the payment processing pipeline. 
  Sometimes charges are duplicated. Investigate the concurrency handling 
  in src/payments/processor.py and src/queue/worker.py
```

## 💻 Supplementary Example: Cost-Saving Strategies

### Strategy 1: Read Only What You Need

```
❌ Expensive: "Read all the files in the src/ directory"
✅ Cheaper:   "Read src/auth/login.py — I need to fix the login bug"
```

### Strategy 2: Use the Right Model

| Task | Model | Why |
|------|-------|-----|
| "Rename userId to user_id everywhere" | Haiku | Mechanical, no thinking needed |
| "Add form validation to the signup page" | Sonnet | Standard feature work |
| "Redesign the database schema for multi-tenancy" | Opus | Complex architecture decision |

### Strategy 3: Break Large Tasks Into Conversations

Instead of one massive conversation that fills the context:

```
Session 1: "Plan the authentication refactor" → save the plan to a file
Session 2: "Implement step 1 of the plan in auth-plan.md"
Session 3: "Implement step 2 of the plan in auth-plan.md"
```

Each session starts with a fresh, cheap context.

### Strategy 4: Stay in Cache

If you're actively coding, keep messages flowing within 5-minute windows:

```
0:00 — Send prompt (cache cold — expensive)
0:45 — Follow-up (cache warm — cheap)
1:30 — Another follow-up (still warm — cheap)
7:00 — New question (cache expired — expensive again)
```

### Strategy 5: Use /compact Before It's Too Late

Don't wait for the "context full" warning. Compact proactively:

```
# After completing a major sub-task
> /compact

# Then continue with the next sub-task
> Now let's work on the API endpoints...
```

## ✍️ Hands-On Exercisess

### Exercise 1: Model Selection Practice
For each scenario below, decide which model you'd use and why:

1. Fixing a typo in a README file
2. Building a REST API with 5 endpoints
3. Debugging a memory leak in a production application
4. Generating boilerplate test files for 10 modules
5. Designing a migration strategy from MongoDB to PostgreSQL

> Tip: When in doubt, start with Sonnet. Switch to Opus only for tasks that need deep reasoning, and to Haiku for tasks that are purely mechanical.

### Exercise 2: Context Management
1. Start a new Claude Code session
2. Run `/cost` to see your baseline
3. Ask Claude to read 3-4 files and explain them
4. Run `/cost` again — notice the increase
5. Run `/compact` and then `/cost` — see the difference
6. Try `/model haiku` and ask a simple question, then check `/cost`

> Tip: Getting a feel for token costs helps you make better decisions about when to compact, when to start fresh, and which model to use.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What does the /compact command do?</p>
<label><input type="radio" name="q1" value="0"> Deletes all files Claude Code has read</label>
<label><input type="radio" name="q1" value="1"> Switches to a smaller, cheaper model</label>
<label><input type="radio" name="q1" value="2"> Summarises the conversation to free up context space while preserving key information</label>
<label><input type="radio" name="q1" value="3"> Compresses your code files to save disk space</label>
<div class="quiz-explain">/compact summarises your conversation history into a shorter form, freeing up context window space while keeping the important decisions and context. This lets you continue working without starting over.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>2. Which model should you choose for a complex, multi-file architecture redesign?</p>
<label><input type="radio" name="q2" value="0"> Opus — most capable, best for complex reasoning tasks</label>
<label><input type="radio" name="q2" value="1"> Sonnet — balanced, good for most tasks</label>
<label><input type="radio" name="q2" value="2"> Haiku — fastest and cheapest</label>
<label><input type="radio" name="q2" value="3"> It doesn't matter — all models perform equally</label>
<div class="quiz-explain">Opus is the most capable model and excels at complex tasks that require deep reasoning, like architecture design, subtle bug investigation, and multi-file refactoring. It costs more and is slower, but the quality is worth it for hard problems.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. What is prompt caching and why does it matter for costs?</p>
<label><input type="radio" name="q3" value="0"> It saves your prompts to disk so you can reuse them later</label>
<label><input type="radio" name="q3" value="1"> It temporarily stores processed context so follow-up messages within 5 minutes cost less</label>
<label><input type="radio" name="q3" value="2"> It remembers your favourite prompts and auto-suggests them</label>
<label><input type="radio" name="q3" value="3"> It compresses tokens to fit more into the context window</label>
<div class="quiz-explain">Prompt caching keeps your processed conversation context warm for 5 minutes. Messages sent within this window are cheaper because Claude doesn't need to re-process the entire context. This is why steady, active work sessions are more cost-efficient than sporadic use.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Now you know how to manage your context and costs effectively. In the next module, **8.3: IDE Integration — VS Code & JetBrains**, we'll explore how to use Claude Code inside your favourite code editor for an even smoother workflow.
