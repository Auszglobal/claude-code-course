# Module 3.1: Multi-file Operations and Refactoring

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Understand when you need to modify multiple files at once
  - Use Claude Code to perform cross-file refactoring operations
  - Understand how Claude Code plans multi-file modifications
  - Safely review batch changes
  - Reorganize a messy project into a clean folder structure

## 📖 Theory

### What Are Multi-file Operations?

Imagine you're moving to a new house — you don't just move one box. You need to sort through the living room, bedroom, and kitchen all at once, then reclassify everything into different rooms in your new home. Software development works the same way — many tasks require you to **modify several files at the same time**.

For example:
- You rename a function from `calcPrice` to `calculatePrice`, so every file that uses that function needs to be updated too
- You want to organize 20 files scattered in one folder into three subfolders: `images/`, `scripts/`, `styles/`
- You notice the same block of code repeated across 5 files and want to extract it into a shared module

These are all **multi-file operation** scenarios.

### What Is Refactoring?

Refactoring is like **organizing your closet** — the clothes are still the same clothes, but you re-sort them, fold them neatly, and put them in the right places so they're easier to find later.

In software development, refactoring means:
- **Not changing the functionality**, but improving the structure of the code
- Making the code easier to read, maintain, and extend
- Eliminating duplicate code
- Giving files and variables better names

The good news is: Claude Code is excellent at this kind of work! You just need to describe the result you want in natural language, and Claude Code will plan and execute it for you.

### How Does Claude Code Handle Multi-file Changes?

When you ask Claude Code to perform multi-file operations, it will:
1. **Analyze** — First understand the current project structure
2. **Plan** — List which files need to be changed and how
3. **Execute** — Modify each file one by one
4. **Confirm** — Ask for your approval at each step

It's like a professional moving company that first confirms the moving plan with you, then executes it step by step.

## 💻 Code Example 1: Renaming and Organizing Files

Suppose you have a messy project with all files stuffed in one folder:

```
my-messy-project/
├── app.py              # Main program
├── helpers.py          # Some utility functions
├── test1.py            # Test file
├── test2.py            # Another test file
├── style.css           # Stylesheet
├── index.html          # Web page
├── logo.png            # Image
├── banner.jpg          # Another image
├── config.json         # Configuration file
├── notes.txt           # Notes
└── README.md           # Documentation
```

First, let's set up this practice environment. Run the following in your terminal:

**Windows (Git Bash):**
```bash
# Create a messy practice project
mkdir -p ~/claude-practice/my-messy-project
cd ~/claude-practice/my-messy-project

# Create some sample files
echo "print('Hello')" > app.py
echo "def helper(): pass" > helpers.py
echo "def test_one(): pass" > test1.py
echo "def test_two(): pass" > test2.py
echo "body { color: red; }" > style.css
echo "<html><body>Hi</body></html>" > index.html
echo '{"debug": true}' > config.json
echo "Some notes here" > notes.txt
echo "# My Project" > README.md
```

**Mac/Linux:**
```bash
# The commands are exactly the same for Mac and Linux
mkdir -p ~/claude-practice/my-messy-project
cd ~/claude-practice/my-messy-project

echo "print('Hello')" > app.py
echo "def helper(): pass" > helpers.py
echo "def test_one(): pass" > test1.py
echo "def test_two(): pass" > test2.py
echo "body { color: red; }" > style.css
echo "<html><body>Hi</body></html>" > index.html
echo '{"debug": true}' > config.json
echo "Some notes here" > notes.txt
echo "# My Project" > README.md
```

Now, navigate to this directory and start Claude Code:

```bash
cd ~/claude-practice/my-messy-project
claude
```

Then tell Claude Code:

```
Please organize this project into a clean folder structure.
Put Python source files in src/, test files in tests/,
web-related files in web/, and configuration files in config/.
```

### Expected Output:

Claude Code will analyze your project and propose an organization plan:

📸 [What you should see]
```
┌─────────────────────────────────────────────────┐
│ I'll organize your project into this structure:  │
│                                                   │
│ my-messy-project/                                 │
│ ├── src/                                          │
│ │   ├── app.py                                    │
│ │   └── helpers.py                                │
│ ├── tests/                                        │
│ │   ├── test1.py                                  │
│ │   └── test2.py                                  │
│ ├── web/                                          │
│ │   ├── index.html                                │
│ │   └── style.css                                 │
│ ├── config/                                       │
│ │   └── config.json                               │
│ ├── notes.txt                                     │
│ └── README.md                                     │
│                                                   │
│ Shall I go ahead with these changes?              │
└─────────────────────────────────────────────────┘
```

Claude Code will ask for your permission before moving files. You can press **y** to confirm, or suggest modifications.

## 💻 Code Example 2: Cross-file Refactoring — Renaming Functions

This is a more advanced scenario. Suppose you have multiple Python files that reference each other:

First, create the practice files:

```bash
mkdir -p ~/claude-practice/rename-demo
cd ~/claude-practice/rename-demo
```

Create `math_utils.py`:
```python
# math_utils.py — Math utility functions
def calc(a, b):
    """Calculate the sum of two numbers"""
    return a + b

def calc2(a, b):
    """Calculate the product of two numbers"""
    return a * b
```

Create `main.py`:
```python
# main.py — Main program
from math_utils import calc, calc2

# Using short, unclear function names
result1 = calc(10, 20)       # Addition
result2 = calc2(10, 20)      # Multiplication

print(f"Sum: {result1}")
print(f"Product: {result2}")
```

Create `report.py`:
```python
# report.py — Report generator
from math_utils import calc, calc2

def generate_report(items):
    """Generate a sales report"""
    total = calc(0, 0)  # Initialize
    for price, quantity in items:
        subtotal = calc2(price, quantity)
        total = calc(total, subtotal)
    return total
```

Now start Claude Code and request the refactoring:

```bash
cd ~/claude-practice/rename-demo
claude
```

Tell Claude Code:

```
The function names in this project are too short and hard to understand. Please:
1. Rename calc to add_numbers
2. Rename calc2 to multiply_numbers
3. Make sure all files that reference these functions are updated together
```

### Expected Output:

Claude Code will list all the files and locations that need to be changed:

📸 [What you should see]
```
┌──────────────────────────────────────────────────────┐
│ I'll rename across the following 3 files:             │
│                                                        │
│ 1. math_utils.py                                       │
│    - calc → add_numbers (line 2)                       │
│    - calc2 → multiply_numbers (line 6)                 │
│                                                        │
│ 2. main.py                                             │
│    - import statement updated (line 2)                  │
│    - calc → add_numbers (line 5)                       │
│    - calc2 → multiply_numbers (line 6)                 │
│                                                        │
│ 3. report.py                                           │
│    - import statement updated (line 2)                  │
│    - calc → add_numbers (line 6)                       │
│    - calc2 → multiply_numbers (lines 7, 8)             │
│                                                        │
│ Total: 3 files modified, 8 changes.                    │
└──────────────────────────────────────────────────────┘
```

**Important note**: Before modifying files, Claude Code will show a diff so you can see which lines are being changed. Green indicates added content, and red indicates removed content.

## 📖 Tips for Safely Reviewing Batch Changes

When Claude Code proposes changes to multiple files, keep these things in mind:

1. **Read the change list carefully** — Make sure every modification is what you want
2. **Watch for unintended changes** — Sometimes similarly named variables might get changed by mistake
3. **Confirm one group of changes at a time** — If there are too many changes, you can ask Claude Code to do them in batches
4. **Test after making changes** — Confirm the program still runs correctly

You can tell Claude Code something like:

```
Please modify only math_utils.py first. Let me confirm it looks good before you change the other files.
```

Or:

```
Before making any changes, show me a preview of the changes for each file without actually modifying anything.
```

## ✍️ Hands-on Exercises

### Exercise 1: Organize a Downloads Folder

Create a simulated "Downloads folder," then use Claude Code to organize it:

```bash
mkdir -p ~/claude-practice/messy-downloads
cd ~/claude-practice/messy-downloads

# Create various types of files
touch report-2024.pdf vacation-photo.jpg notes.txt
touch presentation.pptx budget.xlsx song.mp3
touch screenshot.png archive.zip script.py
touch document.docx movie-clip.mp4 data.csv
```

Start Claude Code and say:

```
Please organize these files into subfolders by type:
- documents/ for documents (pdf, docx, pptx, xlsx, csv, txt)
- images/ for images (jpg, png)
- media/ for audio/video (mp3, mp4)
- other/ for everything else (zip, py)
```

**Tip**: Observe how Claude Code plans the move operations — notice how it lists where each file will be moved before executing.

### Exercise 2: Refactor an HTML File

Create a simple web page with all the CSS written inline in the HTML, then ask Claude Code to extract the CSS into a separate file:

```bash
mkdir -p ~/claude-practice/refactor-html
cd ~/claude-practice/refactor-html
```

Create `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        h1 { color: blue; font-size: 24px; }
        p { color: gray; line-height: 1.6; }
        .button { background: green; color: white; padding: 10px; }
    </style>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is my page.</p>
    <a class="button" href="#">Click me</a>
</body>
</html>
```

Tell Claude Code:
```
Please extract the CSS styles from index.html into a separate style.css file,
and add a link tag in the HTML to reference it.
```

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is "Refactoring"?</p>
<label><input type="radio" name="q1" value="0"> Deleting all code and rewriting from scratch</label>
<label><input type="radio" name="q1" value="1"> Improving code structure and readability without changing functionality</label>
<label><input type="radio" name="q1" value="2"> Adding new features to a program</label>
<label><input type="radio" name="q1" value="3"> Fixing bugs in a program</label>
<div class="quiz-explain">The core idea of refactoring is to make code cleaner and easier to maintain without changing what the program does. It's like organizing your closet — the clothes are still the same, just arranged more neatly.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. When Claude Code proposes changes to 10 files, what is the safest approach?</p>
<label><input type="radio" name="q2" value="0"> Accept everything immediately — Claude Code never makes mistakes</label>
<label><input type="radio" name="q2" value="1"> Reject all changes and do everything manually</label>
<label><input type="radio" name="q2" value="2"> Carefully review the change list and ask for batch processing if needed</label>
<label><input type="radio" name="q2" value="3"> Close Claude Code and start over</label>
<div class="quiz-explain">Even though Claude Code is very capable, you should still review every change. You can ask it to work in batches, or modify just one file first to confirm the result.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. Why does renaming a function require changes to multiple files?</p>
<label><input type="radio" name="q3" value="0"> Because Claude Code likes to modify many files</label>
<label><input type="radio" name="q3" value="1"> Because other files may reference that function, and everything must stay consistent</label>
<label><input type="radio" name="q3" value="2"> Because the computer needs to recompile all files</label>
<label><input type="radio" name="q3" value="3"> Because old files are automatically deleted</label>
<div class="quiz-explain">When a function is used (imported) by multiple files, renaming it means you must update all the places that reference it, or the program will throw an error saying the function can't be found. That's why multi-file operations are important.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. You have 20 files scattered in one folder. You want to sort them into subfolders by type. What should you tell Claude Code?</p>
<label><input type="radio" name="q4" value="0"> Describe the desired folder structure in natural language and let Claude Code plan and execute the reorganisation</label>
<label><input type="radio" name="q4" value="1"> Move each file manually and ask Claude Code to verify afterwards</label>
<label><input type="radio" name="q4" value="2"> Delete all files and recreate them in the correct folders</label>
<label><input type="radio" name="q4" value="3"> It's not possible to organise files with Claude Code</label>
<div class="quiz-explain">Claude Code excels at multi-file operations. You can describe the desired result — for example, "put Python files in src/, test files in tests/, web files in web/" — and Claude Code will analyse the files and plan the reorganisation for you.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>5. During a refactoring operation, Claude Code proposes changes to 10 files. You want to proceed cautiously. What can you ask?</p>
<label><input type="radio" name="q5" value="0"> "Cancel everything and forget about it"</label>
<label><input type="radio" name="q5" value="1"> "Just change all of them — I trust you completely"</label>
<label><input type="radio" name="q5" value="2"> "Show me only the first file"</label>
<label><input type="radio" name="q5" value="3"> "Please modify only one file first so I can verify, then proceed with the rest"</label>
<div class="quiz-explain">Asking Claude Code to modify one file at a time is a safe, cautious approach. This lets you verify each change before moving on to the next file. You can also ask for a preview of all changes without actually modifying anything.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. What is the main goal of extracting duplicate code into a shared module?</p>
<label><input type="radio" name="q6" value="0"> To make the project have more files</label>
<label><input type="radio" name="q6" value="1"> To make the program run faster</label>
<label><input type="radio" name="q6" value="2"> To eliminate repetition — so you only need to update the code in one place instead of many</label>
<label><input type="radio" name="q6" value="3"> To satisfy a requirement from the programming language</label>
<div class="quiz-explain">When the same code appears in multiple files, fixing a bug or making a change means updating every copy. By extracting it into a shared module, you maintain a single source of truth. Update it once and every file that uses it gets the fix automatically.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>7. After Claude Code completes a multi-file refactoring, what is the most important next step?</p>
<label><input type="radio" name="q7" value="0"> Immediately delete the old backup files</label>
<label><input type="radio" name="q7" value="1"> Test the program to confirm it still works correctly</label>
<label><input type="radio" name="q7" value="2"> Celebrate and move on to the next task</label>
<label><input type="radio" name="q7" value="3"> Rewrite all the files from scratch</label>
<div class="quiz-explain">After any refactoring, testing is crucial. Refactoring is supposed to improve structure without changing functionality, so you need to verify that the program still behaves exactly as before. Running existing tests or manually checking key features is the safest approach.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. You renamed a function from <code>calc</code> to <code>add_numbers</code> in the definition file, but forgot to update the files that import it. What will happen?</p>
<label><input type="radio" name="q8" value="0"> The program will run correctly — it automatically detects renamed functions</label>
<label><input type="radio" name="q8" value="1"> The program will silently give wrong results</label>
<label><input type="radio" name="q8" value="2"> The program will crash with an error saying it cannot find the function <code>calc</code></label>
<label><input type="radio" name="q8" value="3"> The old function name will continue to work alongside the new one</label>
<div class="quiz-explain">If other files still try to import <code>calc</code> but the function is now called <code>add_numbers</code>, the program will throw an ImportError or NameError. This is exactly why multi-file refactoring is important — all references must be updated consistently.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

In the next module, **3.2: Introduction to Automation Scripts**, you'll learn how to have Claude Code write scripts for you — letting your computer automatically handle repetitive tasks like organizing files or batch-renaming photos. This is an important step from "doing things manually" to "automation"!
