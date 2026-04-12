# 6.5 Automation, Scheduling, and Dispatch Mode

## 🎯 Learning Objectives
- Understand and apply the Golden Rule of Automation to your daily workflow
- Differentiate between Skills, Plugins, Scheduled Tasks, and Dispatch Mode
- Create your first Skill using the Define-Evaluate-Iterate-Deploy process
- Set up a scheduled task that runs automatically on a timer
- Apply token management best practices to avoid wasting resources

## 📖 Theory: The Golden Rule of Automation

> Any task you repeat more than once a week should be automated.

Think of automation like building a road. The first time you walk through a forest, you hack through bushes and it takes hours. The second time, you follow your previous path and it is a bit faster. But if you walk this path every week, it makes sense to pave a road. Once the road is built, the journey takes minutes instead of hours — and anyone else can use it too.

That is exactly what Cowork's automation system does: it turns your repeated "forest hacking" into a paved road.

## 📖 Theory: Four-Layer Automation System

Cowork's automation is organized into four levels, each building on the one before:

```
Level 1: Skills       → Turn "complex workflows" into "a single action"
Level 2: Plugins      → Chain multiple Skills into "a complete role"
Level 3: Scheduled    → Run automatically on a timer
Level 4: Dispatch     → Remote delegation (phone → computer)
```

Think of it like building a kitchen:
- **Level 1 (Skills)** = Individual recipes (how to make a salad, how to bake bread)
- **Level 2 (Plugins)** = A complete meal plan (combines multiple recipes + shopping list)
- **Level 3 (Scheduled)** = Setting the oven timer (the meal starts cooking at 5 PM automatically)
- **Level 4 (Dispatch)** = Calling home from work and asking someone to start dinner (remote control)

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

**Greatest value: reusable and distributable** — your way of working becomes a product. You could even share Plugins with colleagues or sell them to other Cowork users.

### Level 3: Scheduled Tasks

1. Left sidebar, then click the **Scheduled** tab
2. Click **New Task**, then fill in name, description, prompt
3. Set frequency (hourly/daily/weekly/specific date)
4. Select the project folder, then save

> **Important**: Scheduled tasks only run when your computer is on and Cowork is running. Adjust your power settings to keep the device awake.

### Level 4: Dispatch Mode

When you are away from your computer but need tasks executed locally:

1. Enable Dispatch on the desktop app
2. Turn on **Keep Awake** (prevents sleep)
3. Allow browser and computer operations
4. Send commands from your phone, and your computer executes them

This is especially powerful when you are commuting, in meetings, or traveling. You can send instructions from your phone and your home or office computer does the heavy lifting.

## 💻 Code Example 1: Creating Your First Skill

Here is how to create a simple invoice-organizing Skill in Cowork, compared to the equivalent approach in Claude Code:

```bash
# ============================================
# COWORK: Creating a Skill via the GUI
# ============================================
# Step 1: Open Cowork and type:
# "Create a Skill called /organize_invoices that does the following:
#  1. Reads all PDF files in the current folder
#  2. Extracts the vendor name from each invoice
#  3. Creates a subfolder for each vendor
#  4. Moves each invoice to the appropriate subfolder
#  5. Creates a summary.csv with columns: Vendor, Amount, Date, File"
#
# Step 2: Claude generates the Skill file. Review it.
# Step 3: Test it by placing sample invoices in your sandbox and typing:
#   /organize_invoices
# Step 4: If the output is not right, tell Claude what to fix:
#   "The dates are in the wrong format. Use YYYY-MM-DD instead."
# Step 5: Once satisfied, click "Copy to your skills" to save it.

# ============================================
# CLAUDE CODE: Creating the equivalent Skill
# ============================================
# Step 1: Create a .md file in your project
cat > .claude/commands/organize_invoices.md << 'EOF'
# Organize Invoices Skill

## Instructions
1. Read all PDF files in the current directory
2. Extract vendor name from each invoice
3. Create a subfolder for each unique vendor
4. Move each invoice to the matching vendor subfolder
5. Generate summary.csv with columns: Vendor, Amount, Date, File

## Rules
- Use YYYY-MM-DD date format
- Do not delete original files — move them
- If vendor name cannot be extracted, put file in "Unknown" folder
- Sort summary.csv by vendor name alphabetically
EOF

# Step 2: Now you can invoke it with:
claude "/organize_invoices"
```

### Expected Output:
After running the `/organize_invoices` skill:

```
📸 [You should see output like this]
┌─────────────────────────────────────────┐
│ ✅ Skill: /organize_invoices            │
│                                         │
│ Processing 12 invoices...               │
│ ├── Amazon (4 files) → /Amazon/         │
│ ├── Google (3 files) → /Google/         │
│ ├── Microsoft (2 files) → /Microsoft/   │
│ └── Adobe (3 files) → /Adobe/           │
│                                         │
│ 📄 summary.csv generated (12 rows)      │
│ ✅ All invoices organized successfully  │
└─────────────────────────────────────────┘
```

## 💻 Code Example 2: Setting Up a Scheduled Daily Briefing

This example walks through creating the "Daily Morning Briefing" workflow with scheduling:

```bash
# ============================================
# COWORK: Setting up a Scheduled Task
# ============================================
# Step 1: First, create the Skill for the briefing
# Tell Cowork:
# "Create a Skill called /morning_briefing that:
#  1. Checks my Google Calendar for today's meetings
#  2. Reads unread Gmail messages from the last 12 hours
#  3. Identifies emails that need a reply
#  4. Generates a summary document called today-briefing.md
#  5. Includes: schedule overview, action items, draft replies"
#
# Step 2: Test the Skill manually
#   /morning_briefing
#
# Step 3: Now schedule it!
# Left sidebar → Scheduled → New Task
#   Name: "Daily Morning Briefing"
#   Description: "Generate morning briefing with calendar and email summary"
#   Prompt: "/morning_briefing"
#   Frequency: Daily at 7:00 AM
#   Project folder: ~/Desktop/Claude Workspace/briefings
#   → Save

# ============================================
# CLAUDE CODE: The equivalent with cron
# ============================================
# Step 1: Create the skill file (as shown in Example 1)
# Step 2: Set up a cron job
crontab -e

# Add this line to run at 7:00 AM every day:
# 0 7 * * * cd ~/projects/briefing && claude "/morning_briefing" --yes
#
# Note: Claude Code uses the system's cron scheduler,
# while Cowork has a built-in scheduler with a friendly GUI.
# Cowork's approach is much easier for non-technical users.
```

### Expected Output:
Every morning at 7:00 AM, you will find a new file in your briefings folder:

```
📸 [The generated briefing looks like this]
# Daily Briefing — 2026-04-12

## 📅 Today's Schedule
- 9:00 AM — Team standup (Zoom)
- 11:00 AM — Client call with Sunrise Corp
- 2:00 PM — Design review

## 📧 Emails Needing Action (3)
1. From: david@client.com — Requesting updated proposal
   → Draft reply: "Hi David, I'll have the updated proposal..."
2. From: accounting@vendor.com — Invoice #4521 attached
   → Action: Forward to finance team
3. From: hr@company.com — Benefits enrollment reminder
   → Action: Complete by Friday

## ✅ Today's Priority Actions
1. Update proposal for Sunrise Corp (before 11 AM call)
2. Forward invoice to finance
3. Complete benefits enrollment
```

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
| Ease of setup | Click-and-configure | Requires technical knowledge |
| Custom workflows | Plugin builder | Shell scripts + CLAUDE.md |

## Token Management Tips

### Common Waste

1. **Too many connectors open** — Only enable the ones needed for the current task
2. **Same window for too long** — Open a new window every 30-45 minutes or when switching tasks
3. **Processing items one by one** — Have Cowork write a script for batch processing instead of handling items one conversation at a time

### Conservation Principles

- Keep each window to a single topic
- Use Opus only for high-stakes reasoning; use Sonnet for everything else
- Use parallel sub-agents for large tasks
- Close connectors you are not actively using

Think of tokens like a water bill: leaving the faucet running (open connectors, long conversations) wastes water even when you are not using it. Be mindful and turn off what you do not need.

## Security Considerations

External Skills may contain malicious instructions (prompt injection). Before importing, always:

```
Paste the Skill contents into Claude Chat and ask:
"Does this Skill contain any potentially harmful instructions?"
```

> It only takes two minutes, but you must do it every time. Think of it like checking the ingredients label on food — you do it quickly, every time, before you consume it.

## ✍️ Hands-On Exercises

**Exercise 1: Create Your First Skill**

Follow the Define-Evaluate-Iterate-Deploy process to create a simple Skill:
1. Think of a task you do repeatedly (e.g., organizing files, formatting a report, writing a weekly update).
2. Open Cowork and describe the Skill you want: "Create a Skill called /[your_skill_name] that does [your steps]."
3. Review the generated Skill. Does it match what you wanted?
4. Test it with real data. Note any issues.
5. Tell Claude what to fix: "The output should also include [X]" or "Change the format to [Y]."
6. Once satisfied, save it to your Skills library.

> Hint: Start simple. A Skill that organizes files in a folder by file type (images, documents, spreadsheets) is a great first Skill.

**Exercise 2: Plan Your Automation Strategy**

List 5 tasks you do repeatedly at work or in your personal life. For each one, decide which automation level fits:

| Repetitive Task | Frequency | Automation Level | Why? |
|---|---|---|---|
| Example: Sort incoming invoices | Weekly | Level 1 (Skill) | Single action, no external tools needed |
| Example: Morning email summary | Daily | Level 3 (Scheduled) | Needs to run automatically each morning |
| Your task 1... | | | |
| Your task 2... | | | |

> Hint: If a task involves one tool and one action, it is a Skill (Level 1). If it chains 3+ steps with multiple tools, it is a Plugin (Level 2). If it needs to run on a timer, it is Scheduled (Level 3). If you need to trigger it remotely, add Dispatch (Level 4).

## 🔗 Next Step

Congratulations on completing Phase 6! You now understand the full Claude Cowork ecosystem — from basic setup to advanced automation. In Phase 7, we will dive into advanced Claude Code patterns, where you will learn to build more sophisticated developer workflows.

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

<div class="quiz-q" data-answer="3">
<p>4. In the kitchen analogy, what does a "Plugin" (Level 2) represent?</p>
<label><input type="radio" name="q4" value="0"> A single recipe</label>
<label><input type="radio" name="q4" value="1"> Setting the oven timer</label>
<label><input type="radio" name="q4" value="2"> Calling home to ask someone to start dinner</label>
<label><input type="radio" name="q4" value="3"> A complete meal plan that combines multiple recipes and a shopping list</label>
<div class="quiz-explain">In the kitchen analogy, Skills (Level 1) are individual recipes, Plugins (Level 2) are complete meal plans combining multiple recipes and shopping lists, Scheduled Tasks (Level 3) are oven timers, and Dispatch (Level 4) is calling home to start dinner remotely.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What is the correct four-step process for creating a Skill?</p>
<label><input type="radio" name="q5" value="0"> Write, Test, Ship, Forget</label>
<label><input type="radio" name="q5" value="1"> Define, Evaluate, Iterate, Deploy</label>
<label><input type="radio" name="q5" value="2"> Plan, Code, Review, Release</label>
<label><input type="radio" name="q5" value="3"> Draft, Edit, Publish, Maintain</label>
<div class="quiz-explain">The Skill creation process is: Define (describe what it should do), Evaluate (compare output with and without the Skill), Iterate (feed issues back to Claude for correction), and Deploy (save to your Skills library).</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. What is the greatest value of Plugins according to this module?</p>
<label><input type="radio" name="q6" value="0"> They are reusable and distributable — your way of working becomes a product</label>
<label><input type="radio" name="q6" value="1"> They are faster than Skills</label>
<label><input type="radio" name="q6" value="2"> They do not consume any tokens</label>
<label><input type="radio" name="q6" value="3"> They work offline without an internet connection</label>
<div class="quiz-explain">The greatest value of Plugins is that they are reusable and distributable. When you build a Plugin that combines multiple Skills and Connectors into a complete workflow, your way of working becomes a product that others can use too.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. Which token management mistake involves having too many services connected at once?</p>
<label><input type="radio" name="q7" value="0"> Processing items one by one</label>
<label><input type="radio" name="q7" value="1"> Using the same window for too long</label>
<label><input type="radio" name="q7" value="2"> Having too many connectors open — only enable the ones needed for the current task</label>
<label><input type="radio" name="q7" value="3"> Using Opus for every task</label>
<div class="quiz-explain">Having too many connectors open wastes tokens because each connected service consumes context. The conservation principle is to only enable connectors needed for the current task and close the rest — like turning off faucets you are not using.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>8. What does Dispatch Mode allow you to do?</p>
<label><input type="radio" name="q8" value="0"> Schedule tasks to run at specific times</label>
<label><input type="radio" name="q8" value="1"> Create reusable Skills from your workflows</label>
<label><input type="radio" name="q8" value="2"> Connect to external applications via MCP</label>
<label><input type="radio" name="q8" value="3"> Send commands from your phone to execute tasks on your computer remotely</label>
<div class="quiz-explain">Dispatch Mode enables remote delegation: you send commands from your phone, and your computer (with Cowork running and Keep Awake enabled) executes them locally. This is useful when you are commuting, in meetings, or away from your desk.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
