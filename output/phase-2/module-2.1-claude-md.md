# Module 2.1: CLAUDE.md -- The AI's Notebook

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Understand the purpose and importance of CLAUDE.md
  - Know where CLAUDE.md should be placed
  - Write a basic CLAUDE.md configuration file
  - Have Claude Code follow your specific instructions
  - Master best practices for writing clear directives

## 📖 Theory

### What Is CLAUDE.md?

Imagine you've hired a new assistant starting their first day. You'd give them an "onboarding guide" that says:

- "Our company is called XX, and we do YY"
- "Files should be stored in this folder"
- "Use this format for emails"
- "These things must never be done"

**CLAUDE.md is the "onboarding guide" you give to Claude Code.**

Every time Claude Code starts working, it reads this file first to understand:
- What this project is about
- What rules you want it to follow
- Any special conventions to be aware of
- What it must not do

Without a CLAUDE.md, Claude Code is like a new employee who hasn't read the company handbook -- still smart, but unaware of your specific needs.

### Where Does CLAUDE.md Go?

CLAUDE.md goes in your **project root directory** -- the top-level folder of your project.

```
my-project/          <-- Project root directory
├── CLAUDE.md        <-- Put it here!
├── src/
│   └── app.js
├── README.md
└── package.json
```

> Tip: The "project root directory" is like the front door of your house. Everything starts here. CLAUDE.md goes at the front door so Claude Code sees it the moment it enters.

### Basic Structure of CLAUDE.md

A good CLAUDE.md typically contains the following sections:

| Section | Description | Analogy |
|---------|-------------|---------|
| Project description | What this project is and what it does | Company overview |
| Tech stack | What tools and languages are used | What equipment the office has |
| Rules | Required standards to follow | Company policies |
| Conventions | Naming habits, code style | Unwritten office norms |
| Prohibited actions | Things that must never be done | Company red lines |

### How Does Claude Code Use CLAUDE.md?

When you launch Claude Code in a project folder:

1. Claude Code automatically scans the current directory
2. It discovers the CLAUDE.md file
3. It reads and understands all the instructions within
4. It follows those instructions in every subsequent conversation

It's like your assistant reviewing the handbook every morning to make sure they don't make mistakes.

## 💻 Code Example 1: Creating Your First CLAUDE.md

### Step 1: Create a Practice Project Folder

First, open your terminal and type the following:

**Windows (Command Prompt or Git Bash):**
```bash
# Create a practice project folder on the desktop
mkdir ~/Desktop/my-first-project

# Navigate to this folder
cd ~/Desktop/my-first-project
```

**Mac / Linux:**
```bash
# Create a practice project folder on the desktop
mkdir ~/Desktop/my-first-project

# Navigate to this folder
cd ~/Desktop/my-first-project
```

### Step 2: Launch Claude Code and Create CLAUDE.md

Launch Claude Code in that folder:

```bash
claude
```

Then type the following command:

```
Please create a CLAUDE.md file with the following content:

# My First Project

## Project Description
This is a practice project for learning how to use Claude Code.

## Rules
- All files use UTF-8 encoding
- Code comments should be in English
- File names use lowercase English with hyphens (e.g., my-file.txt)

## Prohibited Actions
- Do not delete any existing files
- Do not use abbreviations in comments
```

### Expected Output:

[What you should see]
```
+---------------------------------------------+
| Claude Code                                 |
|                                             |
| Created file: CLAUDE.md                     |
|                                             |
| File contents include:                      |
| - Project description                       |
| - Rules (3 items)                           |
| - Prohibited actions (2 items)              |
+---------------------------------------------+
```

Claude Code will create this file and start following your rules from this point on.

## 💻 Code Example 2: Writing a More Complete CLAUDE.md

Here is a more complete CLAUDE.md example, suitable for a small website project:

```markdown
# My Personal Website

## Project Description
This is my personal portfolio website, showcasing my design work and contact information.
Built with HTML and CSS, no JavaScript required.

## Tech Stack
- HTML5
- CSS3
- Static website (no server needed)

## File Structure
```
website/
├── index.html      (Home page)
├── about.html      (About me)
├── portfolio.html  (Portfolio)
├── css/
│   └── style.css   (Stylesheet)
└── images/         (Images folder)
```

## Design Specifications
- Primary colour: #2C3E50 (dark blue-grey)
- Accent colour: #E74C3C (red)
- Font: use system default fonts
- All pages must be responsive (mobile-friendly)

## Naming Conventions
- HTML files: lowercase English with hyphens (my-page.html)
- CSS classes: use kebab-case (e.g., main-header)
- Images: descriptive names (hero-banner.jpg, not img1.jpg)

## Prohibited Actions
- Do not use JavaScript (this is a pure HTML/CSS project)
- Do not use external CSS frameworks (like Bootstrap)
- Do not use inline styles in HTML
```

You can tell Claude Code:

```
Please create a CLAUDE.md using the format from the example above
```

### Expected Output:

Claude Code will create the file, and from then on, whenever you ask it to create new HTML pages, it will automatically:
- Use your specified colours #2C3E50 and #E74C3C
- Not use JavaScript
- Follow your naming conventions
- Ensure responsive design

This is the power of CLAUDE.md -- **you only need to say it once, and it remembers forever**.

## ✍️ Hands-On Exercises

### Exercise 1: Create a CLAUDE.md for a Project You're Interested In

Think of a project you're interested in (for example: a recipe collection site, a travel journal, study notes), then:

1. Create a new folder
2. Launch Claude Code
3. Ask it to create a CLAUDE.md that includes:
   - A project description (at least 2 sentences)
   - At least 3 rules
   - At least 2 prohibited actions

> Tip: It doesn't need to be perfect! CLAUDE.md can be modified and updated at any time. Start with a simple version and add to it later.

### Exercise 2: Test Whether CLAUDE.md Takes Effect

In the project from Exercise 1, try the following:

1. Ask Claude Code to create a new file
2. Observe whether it followed the rules you set in CLAUDE.md
3. If it didn't follow them, try editing CLAUDE.md to make the instructions clearer

> Tip: If Claude Code doesn't follow your rules, your instructions might not be specific enough. Try using more direct, concrete language. For example, instead of writing "pay attention to code quality," write "every function must have a comment explaining its purpose."

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Where should the CLAUDE.md file be placed in a project?</p>
<label><input type="radio" name="q1" value="0"> Inside the src/ folder</label>
<label><input type="radio" name="q1" value="1"> In the project root directory (the top-level folder)</label>
<label><input type="radio" name="q1" value="2"> On the computer desktop</label>
<label><input type="radio" name="q1" value="3"> In any subfolder</label>
<div class="quiz-explain">CLAUDE.md must be placed in the project root directory so that Claude Code can find and read it the moment it enters the project. It's like putting a company handbook at the front desk where new employees can pick it up immediately.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. Which of the following is a best practice for CLAUDE.md?</p>
<label><input type="radio" name="q2" value="0"> The vaguer the instructions, the better, to give the AI more creative freedom</label>
<label><input type="radio" name="q2" value="1"> The longer the better, the more detailed the better</label>
<label><input type="radio" name="q2" value="2"> Use clear, specific instructions and avoid vague language</label>
<label><input type="radio" name="q2" value="3"> Only write prohibited actions, nothing else is needed</label>
<div class="quiz-explain">Clear, specific instructions help Claude Code understand your needs more accurately. Vague instructions can lead to unexpected results. But it doesn't need to be excessively long either -- the focus should be on precision, not length.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. If you modify CLAUDE.md, when will Claude Code read the new content?</p>
<label><input type="radio" name="q3" value="0"> Never, because it only reads it the first time</label>
<label><input type="radio" name="q3" value="1"> You need to reinstall Claude Code</label>
<label><input type="radio" name="q3" value="2"> The next time you start a new conversation, it will read the latest content</label>
<label><input type="radio" name="q3" value="3"> You need to run a special command manually</label>
<div class="quiz-explain">Claude Code re-reads CLAUDE.md every time a new conversation starts, so your changes will take effect in the next session. You can also ask Claude Code to re-read CLAUDE.md during a conversation.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Great work! You've learned how to use CLAUDE.md to "teach" Claude Code about your project.

In the next module, **2.2: Reading and Editing Files**, we'll learn how to have Claude Code help you read, create, and modify files. This is one of Claude Code's most commonly used features -- you'll learn how to let the AI manage all the files in your project.
