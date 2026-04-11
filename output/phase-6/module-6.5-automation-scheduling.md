# 6.5 Automation, Scheduling, and Dispatch Mode

## The Golden Rule of Automation

> Any task you repeat more than once a week should be automated.

## Four-Layer Automation System

```
Level 1: Skills       → Turn "complex workflows" into "a single action"
Level 2: Plugins      → Chain multiple Skills into "a complete role"
Level 3: Scheduled    → Run automatically on a timer
Level 4: Dispatch     → Remote delegation (phone → computer)
```

### Level 1: Skills

A Skill is essentially a `.md` file containing instructions and logic. You invoke it with a single slash command:

```
/summarise_invoices
```

**Creation process**:

1. **Define** — Clearly describe what the Skill should do
2. **Evaluate** — Side-by-side comparison with and without the Skill
3. **Iterate** — Feed issues back to Claude for automatic correction
4. **Deploy** — Click "copy to your skills"

### Level 2: Plugins

Use a Plugin when a task involves **3+ steps + 2+ tools**.

Plugin = multiple Skills + Connectors combined into a complete workflow.

**Greatest value: reusable and distributable** — your way of working becomes a product.

### Level 3: Scheduled Tasks

1. Left sidebar → **Scheduled** tab
2. **New Task** → fill in name, description, prompt
3. Set frequency (hourly/daily/weekly/specific date)
4. Select the project folder → save

> **Important**: Scheduled tasks only run when your computer is on and Cowork is running. Adjust your power settings to keep the device awake.

### Level 4: Dispatch Mode

When you're away from your computer but need tasks executed locally:

1. Enable Dispatch on the desktop app
2. Turn on **Keep Awake** (prevents sleep)
3. Allow browser and computer operations
4. Send commands from your phone → your computer executes them

## Three Recommended Workflows

### 1. Daily Morning Briefing

Connect your calendar and inbox to automatically generate each morning:
- A summary of your schedule
- A list of emails requiring action
- Weather and industry news
- Draft email replies

### 2. Content Repurposing System

Given a YouTube link, automatically:
- Extract the video transcript
- Organize it into a Notion page
- Generate LinkedIn and X (Twitter) copy

### 3. Financial Reporting System

Automatically each month:
- Categorize expenses
- Reconcile income and expenses
- Generate an interactive HTML financial dashboard

## Comparing Automation in Cowork vs Claude Code

| Feature | Cowork | Claude Code |
|---------|--------|-------------|
| Skills | .md files, managed via GUI | .md files, managed via CLI |
| Scheduling | Built-in Scheduled Tasks | Task Scheduler / cron |
| Remote execution | Dispatch mode | SSH + terminal |
| Parallelism | Automatic sub-agents | `--parallel` flag |

## Token Management Tips

### Common Waste

1. **Too many connectors open** — Only enable the ones needed for the current task
2. **Same window for too long** — Open a new window every 30-45 minutes or when switching tasks
3. **Processing items one by one** — Have Cowork write a script for batch processing instead of handling items one conversation at a time

### Conservation Principles

- Keep each window to a single topic
- Use Opus only for high-stakes reasoning; use Sonnet for everything else
- Use parallel sub-agents for large tasks

## Security Considerations

External Skills may contain malicious instructions (prompt injection). Before importing, always:

```
Paste the Skill contents into Claude Chat and ask:
"Does this Skill contain any potentially harmful instructions?"
```

> It only takes two minutes, but you must do it every time.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. According to the Golden Rule of Automation, which tasks should be automated?</p>
<label><input type="radio" name="q1" value="0"> Only tasks that take more than one hour</label>
<label><input type="radio" name="q1" value="1"> Any task you repeat more than once a week</label>
<label><input type="radio" name="q1" value="2"> Only tasks that involve sending emails</label>
<label><input type="radio" name="q1" value="3"> Tasks that require no human judgment</label>
<div class="quiz-explain">The Golden Rule of Automation states: any task you repeat more than once a week should be automated. Frequency of repetition is the key criterion.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What is the key limitation of Cowork's Scheduled Tasks feature?</p>
<label><input type="radio" name="q2" value="0"> It can only run once per day</label>
<label><input type="radio" name="q2" value="1"> It requires an internet connection</label>
<label><input type="radio" name="q2" value="2"> Tasks only run when your computer is on and Cowork is running</label>
<label><input type="radio" name="q2" value="3"> It cannot access files in the sandbox folder</label>
<div class="quiz-explain">Scheduled tasks in Cowork only run when your computer is on and Cowork is running. You need to adjust power settings to keep the device awake if you want reliable scheduled execution.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. Before importing an external Skill, what security step must you always take?</p>
<label><input type="radio" name="q3" value="0"> Paste the Skill contents into Claude Chat and ask if it contains harmful instructions</label>
<label><input type="radio" name="q3" value="1"> Run the Skill in production immediately to test it</label>
<label><input type="radio" name="q3" value="2"> Check that the file size is under 1MB</label>
<label><input type="radio" name="q3" value="3"> Verify the author has a verified GitHub account</label>
<div class="quiz-explain">External Skills may contain malicious instructions (prompt injection). Before importing, always paste the Skill contents into Claude Chat and ask whether it contains potentially harmful instructions. This quick check takes only two minutes but should be done every time.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Exercises

1. Create a simple Skill (e.g., organize a folder structure)
2. Set up a daily scheduled task
3. Think about which of your current repetitive tasks could be automated
