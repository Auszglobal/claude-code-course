# 6.2 Cowork Environment Setup and Sandbox

## 🎯 Learning Objectives
- Understand why a sandbox folder is essential for safe Cowork usage
- Know how to choose the right AI model for different task types
- Set up a complete Cowork environment from scratch in four steps
- Configure folder permissions and understand the blocklist system
- Compare the setup process between Claude Code and Claude Cowork

## 📖 Theory: Why Do You Need a Sandbox?

Cowork directly reads and writes files on your hard drive. Giving it access to your entire system is a recipe for disaster.

Think of it this way: if you hired a new assistant on their first day, you would not hand them the keys to every filing cabinet, safe, and office in the building. You would give them access to their own desk and workspace first. Once you trust them, you might expand their access. The sandbox folder is that desk.

> So, start by restricting it to a controlled space.

### What Could Go Wrong Without a Sandbox?

Without a sandbox, Cowork could potentially:
- Accidentally delete or overwrite important personal files
- Move system files that your operating system needs
- Mix up files from different projects
- Read sensitive documents you did not intend to share

A sandbox prevents all of this by creating a clear boundary: "You can work here, and nowhere else."

## 📖 Theory: The Four-Step Setup Process

### Step 1: Choose a Model

Select the AI model for task execution on the right side of the Cowork interface:

| Model | Use Case | Cost | Speed |
|-------|----------|------|-------|
| **Sonnet 4.6** | Workhorse model, covers 99% of daily needs | Lower | Fast |
| **Opus 4.6** | Heavy-duty tasks, complex reasoning | Very high | Slower |
| **Haiku** | Lightweight tasks, optimized for speed | Lowest | Fastest |

**The Einstein Principle**: Don't send Einstein to do kitchen chores. 99% of the time you don't need Opus.

Think of it like choosing a vehicle for a trip:
- **Haiku** is a bicycle — fast for short trips, very economical
- **Sonnet** is a reliable car — handles almost everything you throw at it
- **Opus** is a semi-truck — powerful but expensive, only needed for heavy loads

> Remember to enable **Extended Thinking** — let Claude actually work through complex logic instead of relying on pattern matching. This is like giving your assistant time to plan before they start working, instead of rushing into the task.

### Step 2: Create a Sandbox

Create a folder on your desktop named `Claude Workspace` or `Sandbox`. This becomes Cowork's workspace — it can't touch anything outside this folder.

**On Mac:**
```bash
# Open Terminal and run:
mkdir ~/Desktop/"Claude Workspace"
```

**On Windows:**
```bash
# Open Command Prompt or PowerShell and run:
mkdir "%USERPROFILE%\Desktop\Claude Workspace"
```

Or simply right-click on your Desktop, select "New Folder," and name it `Claude Workspace`.

### Step 3: Grant Folder Permissions

Go to Cowork, then click **Work in a folder**, then select the sandbox folder, then click **Allow once** or **Always allow**.

```
📸 [You should see a screen like this]
┌────────────────────────────────────────┐
│  Work in a folder                      │
│                                        │
│  📁 Claude Workspace                   │
│  ~/Desktop/Claude Workspace            │
│                                        │
│  [Allow once]  [Always allow]          │
└────────────────────────────────────────┘
```

**Which option to choose?**
- **Allow once** — Good for first-time testing. You will be asked again next time.
- **Always allow** — Good once you are comfortable. Saves time on repeated use.

### Step 4: Run Your First Task

Drag a dozen invoices of different types into the sandbox, then type:

```
Please organize these invoices into subfolders by category and generate an Excel summary sheet.
```

Cowork will lay out its execution plan, then start processing autonomously.

## 💻 Code Example 1: Setting Up Your Workspace (Side-by-Side Comparison)

Here is how the same workspace setup looks in Claude Code vs Cowork:

```bash
# ============================================
# CLAUDE CODE SETUP (terminal-based)
# ============================================

# Step 1: Create a project directory
mkdir ~/projects/invoice-organizer
cd ~/projects/invoice-organizer

# Step 2: Create a CLAUDE.md file with instructions
cat > CLAUDE.md << 'EOF'
# Invoice Organizer Project
- Organize invoices by vendor name
- Create subdirectories for each vendor
- Generate a summary CSV file with totals
- Never delete original files
EOF

# Step 3: Copy your invoices into the project folder
cp ~/Downloads/invoices/*.pdf ./

# Step 4: Launch Claude Code
claude "Organize these invoices by vendor and create a summary."

# ============================================
# COWORK SETUP (graphical interface)
# ============================================
# 1. Create "Claude Workspace" folder on Desktop
# 2. Drag invoice files into the folder
# 3. Open Cowork → "Work in a folder" → select the folder
# 4. Type: "Organize these invoices by vendor and create a summary."
# That's it! No terminal needed.
```

### Expected Output:
Both approaches produce the same result — organized invoice folders with a summary file. The difference is only in how you set it up. Claude Code requires terminal commands; Cowork requires clicking and dragging.

## 💻 Code Example 2: Configuring the Blocklist for Safety

One important safety feature in Cowork is the blocklist — a list of websites and applications that Cowork should never access. Here is how to think about it:

```bash
# In Claude Code, you control permissions through CLAUDE.md and hooks:
cat > CLAUDE.md << 'EOF'
# Security Rules
- Never access files outside this project directory
- Never run commands that modify system settings
- Never access ~/.ssh or ~/.aws directories
EOF

# You can also set hooks in settings.json:
# {
#   "hooks": {
#     "PreToolUse": [{
#       "matcher": "Bash",
#       "hook": "check-no-dangerous-commands.sh"
#     }]
#   }
# }

# In Cowork, the equivalent is the BLOCKLIST:
# Settings → Cowork → Blocklist
# Add entries like:
#   - banking websites (e.g., chase.com, bankofamerica.com)
#   - payment platforms (e.g., paypal.com, stripe.com)
#   - social media accounts (e.g., facebook.com for personal pages)
#
# This prevents Cowork from accidentally making purchases
# or accessing sensitive accounts when using Browser or Computer Use.
```

### Expected Output:
After configuring the blocklist, if Cowork tries to navigate to a blocked site, it will be prevented from doing so. You will see a message indicating the site is blocked.

```
📸 [You should see something like this]
┌─────────────────────────────────────────┐
│ ⚠️ Blocked: chase.com                   │
│ This site is on your blocklist.         │
│ Cowork will not access it.              │
└─────────────────────────────────────────┘
```

## Comparison with Claude Code

| Setting | Claude Code | Claude Cowork |
|---------|-------------|---------------|
| Working directory | `cd` to project directory in terminal | Select sandbox folder |
| Permission control | `CLAUDE.md` + hooks | Folder permissions + blocklist |
| Model selection | CLI flag `--model` | Interface sidebar selection |
| Safety restrictions | Manual configuration in files | GUI-based blocklist |
| First-time setup | Install Node.js + npm package | Just open the web interface |

## ✍️ Hands-On Exercises

**Exercise 1: Create Your Sandbox**

Follow these steps and verify each one:
1. Create a folder called `Claude Workspace` on your Desktop.
2. Inside it, create three subfolders: `invoices`, `reports`, and `misc`.
3. Drop a few sample files (any documents you have) into the `invoices` folder.
4. Open Cowork and connect to the `Claude Workspace` folder.
5. Ask Cowork: "What files are in my workspace? List them all."

> Hint: If Cowork correctly lists your files, your sandbox is working! If it says it cannot find any files, double-check that you selected the right folder.

**Exercise 2: Model Selection Experiment**

Try the same simple task with two different models to see the difference:
1. Select **Haiku** and ask: "Create a short summary of the files in this folder."
2. Note how long it takes and the quality of the output.
3. Switch to **Sonnet 4.6** and ask the exact same question.
4. Compare the results. Was the quality difference worth the extra cost and time?

> Hint: For simple file listing tasks, you probably will not notice a big quality difference. The lesson here is that you do not need the most powerful model for every task.

## 🔗 Next Step

In the next module (6.3), we will explore the Project Ecosystem and Business Brain — how to give Cowork persistent memory so it remembers your business, your preferences, and your working style across sessions.

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

<div class="quiz-q" data-answer="2">
<p>4. In the vehicle analogy, which model is compared to a reliable car?</p>
<label><input type="radio" name="q4" value="0"> Haiku</label>
<label><input type="radio" name="q4" value="1"> Opus 4.6</label>
<label><input type="radio" name="q4" value="2"> Sonnet 4.6</label>
<label><input type="radio" name="q4" value="3"> All models are the same</label>
<div class="quiz-explain">In the vehicle analogy, Haiku is a bicycle (fast, economical), Sonnet is a reliable car (handles almost everything), and Opus is a semi-truck (powerful but expensive, for heavy loads only).</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What does "Extended Thinking" do when enabled in Cowork?</p>
<label><input type="radio" name="q5" value="0"> It makes the model respond in a more detailed writing style</label>
<label><input type="radio" name="q5" value="1"> It lets Claude work through complex logic and plan before executing, rather than relying on pattern matching</label>
<label><input type="radio" name="q5" value="2"> It extends the session timeout so you can leave tasks running longer</label>
<label><input type="radio" name="q5" value="3"> It enables access to the internet for research</label>
<div class="quiz-explain">Extended Thinking gives Claude time to reason through complex logic step by step before acting. It is like giving your assistant time to plan before they start working, resulting in better outcomes for complex tasks.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>6. What is the purpose of the Cowork blocklist?</p>
<label><input type="radio" name="q6" value="0"> To block other users from accessing your Cowork account</label>
<label><input type="radio" name="q6" value="1"> To prevent Cowork from using too many tokens</label>
<label><input type="radio" name="q6" value="2"> To restrict which AI models can be selected</label>
<label><input type="radio" name="q6" value="3"> To prevent Cowork from accessing sensitive websites and applications like banking or payment sites</label>
<div class="quiz-explain">The blocklist prevents Cowork from accessing sensitive websites and applications. Since Cowork can use your real browser (logged into your accounts), blocking banking and payment sites prevents accidental purchases or access to sensitive financial data.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>7. What is the difference between "Allow once" and "Always allow" when granting folder permissions?</p>
<label><input type="radio" name="q7" value="0"> "Allow once" requires re-confirmation each time; "Always allow" grants persistent access</label>
<label><input type="radio" name="q7" value="1"> "Allow once" gives read-only access; "Always allow" gives read-write access</label>
<label><input type="radio" name="q7" value="2"> "Allow once" is free; "Always allow" costs extra</label>
<label><input type="radio" name="q7" value="3"> There is no difference between them</label>
<div class="quiz-explain">"Allow once" is good for first-time testing — you will be asked again next session. "Always allow" grants persistent access and saves time on repeated use. Choose "Allow once" until you are comfortable with Cowork.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>8. In Claude Code, what is the equivalent of Cowork's sandbox folder?</p>
<label><input type="radio" name="q8" value="0"> The home directory (~)</label>
<label><input type="radio" name="q8" value="1"> The project directory you cd into before running Claude Code</label>
<label><input type="radio" name="q8" value="2"> The ~/.claude directory</label>
<label><input type="radio" name="q8" value="3"> There is no equivalent; Claude Code accesses everything</label>
<div class="quiz-explain">In Claude Code, you navigate (cd) to your project directory before starting Claude. This directory serves as the working context, similar to how the sandbox folder defines Cowork's workspace. CLAUDE.md and hooks provide additional permission control.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
