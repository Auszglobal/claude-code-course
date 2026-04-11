# Module 2.4: Git Basics and Version Control -- Adding a "Save Game" Feature to Your Project

## Learning Objectives
- After completing this lesson, you will be able to:
  - Understand what Git is and why it's so important
  - Have Claude Code check the Git status of your project
  - Have Claude Code save (commit) your work progress
  - Have Claude Code view the commit history
  - Understand basic version control concepts

## Theory

### What Is Git?

Have you ever had this experience?

- While writing a report, you keep saving new copies: `report-v1.docx`, `report-v2.docx`, `report-final.docx`, `report-final(really-final).docx`
- After making a bunch of changes, you realise you've broken something and want to go back to a previous version, but you can't remember what you changed

**Git was created to solve exactly this problem.**

Think of Git as a video game's "save" system:

| Game Save | Git |
|-----------|-----|
| Save point | Commit |
| Save description (e.g., "After defeating the Level 3 boss") | Commit message |
| Load save (go back to a previous point) | View or restore a historical version |
| Save file list | Git log (commit history) |

Each time you "save" (commit), Git records:
- Which files were modified
- What was changed
- Who made the changes
- When the changes were made
- Your description (why the changes were made)

### Why Is Version Control Important?

1. **Safety net**: Broke something? Just go back to the last save
2. **History**: Clearly know the reason for every change
3. **Collaboration**: Multiple people can work simultaneously without overwriting each other (an advanced concept we'll cover later)
4. **Confidence**: With saves in place, you can experiment boldly without fear of breaking things

### Good News: Claude Code Handles Git for You

Git actually has a lot of commands, which can be a bit intimidating for beginners. But the good news is -- **you don't need to memorise any Git commands**!

Just tell Claude Code what you want to do in natural language, and it will execute the correct Git operations.

| What you say | What Claude Code does for you |
|--------------|-------------------------------|
| "What's the current status of the project?" | Runs `git status` to check the status |
| "Save my progress with the description..." | Runs `git add` + `git commit` |
| "Show me the previous change history" | Runs `git log` to display the history |
| "What was changed last time?" | Runs `git diff` to show the differences |

### Basic Git Concepts

Before we start hands-on work, let's understand a few basic concepts:

```
+---------------------------------------------+
|              Git Workflow                     |
|                                              |
|  Working Dir     Staging Area    History      |
|  (Working)       (Staging)       (History)   |
|                                              |
|  Edit files  -->  Prepare to  --> Officially |
|  [editing]        save [ready]    saved      |
|                                  [recorded]  |
|                                              |
|  Analogy:                                    |
|  Working at  ->  Put in the   -> Mail sent   |
|  your desk       outbox                      |
+---------------------------------------------+
```

- **Working directory**: The files you're currently editing (documents on your desk)
- **Staging area**: Changes ready to be "saved" (letters placed in the outbox)
- **Commit**: Officially recording those changes (mailing the letter -- can't take it back)

> Don't worry: These concepts will make sense naturally as you practise. And Claude Code handles these steps for you -- just say "save my work" and you're done.

## Code Example 1: Initialising Git and Making Your First Commit

### Step 1: Create a New Project and Initialise Git

Open the terminal and type the following:

**Windows (Git Bash) and Mac / Linux:**
```bash
# Create a new practice project
mkdir ~/Desktop/git-practice

# Navigate to this folder
cd ~/Desktop/git-practice

# Launch Claude Code
claude
```

Type the following in Claude Code:

```
Please initialise a Git repository, then create a simple index.html file with a welcome page
```

### Expected Output:

[What you should see]
```
+----------------------------------------------+
| Claude Code                                  |
|                                              |
| Initialised Git repository                   |
| Created file: index.html                     |
|                                              |
| Note: There is 1 new file not yet committed. |
+----------------------------------------------+
```

### Step 2: Check the Project Status

Type:

```
What is the current Git status of the project?
```

### Expected Output:

Claude Code will run `git status` and tell you:

```
Current Git status:
- Branch: main
- 1 untracked new file:
  - index.html

This file has not yet been "saved" (committed).
```

"Untracked" means Git is saying "I see this file, but you haven't told me whether to track it yet."

### Step 3: Make Your First Commit (Save)

Type:

```
Please commit index.html to Git with the commit message "Create welcome page"
```

### Expected Output:

[What you should see]
```
+----------------------------------------------+
| Claude Code                                  |
|                                              |
| Added index.html to staging area             |
| Committed: "Create welcome page"             |
|                                              |
| Commit summary:                              |
| - 1 file changed                             |
| - 15 lines added                             |
+----------------------------------------------+
```

Congratulations! Your first "game save" has been created!

## Code Example 2: Modifying Files and Creating More Save Points

### Step 1: Modify a File

Type:

```
Please add a navigation bar to index.html with three links: "Home," "About," and "Contact"
```

Claude Code will modify index.html and show the diff. After accepting the changes, type:

```
What's the Git status now?
```

### Expected Output:

```
Current Git status:
- 1 modified file:
  - index.html (modified)

These changes have not been committed yet.
```

### Step 2: Create a Second Save Point

Type:

```
Please commit these changes with the description "Add navigation bar"
```

### Step 3: View the Commit History

Now let's see all of our save records. Type:

```
Please show me the Git commit history
```

### Expected Output:

[What you should see]
```
+----------------------------------------------+
| Git Commit History                           |
|                                              |
| 2. abc1234 -- Add navigation bar             |
|    Date: 2026-04-11 15:30                    |
|                                              |
| 1. def5678 -- Create welcome page            |
|    Date: 2026-04-11 15:25                    |
+----------------------------------------------+
```

You can clearly see the time and description of each "save." This is the value of version control -- every step you take is recorded.

### Step 4: View the Changes in a Specific Commit

You can also ask:

```
What was changed in the last commit?
```

Claude Code will show the diff, letting you see exactly what code was added.

### Good Commit Messages vs Bad Commit Messages

A commit message is like a game save description. A good description lets you quickly find the right version in the future.

| Bad message | Good message |
|-------------|-------------|
| "update" | "Add contact form page" |
| "fixed some stuff" | "Fix navigation bar not displaying on mobile" |
| "changes" | "Change primary colour from blue to green" |
| "asdf" | "Remove unused test files" |

> Tip: Good commit messages answer the question "why was this change made" rather than "what was changed." Git already records what was changed (the diff), so the message should explain the reason.

## Hands-On Practice

### Exercise 1: Complete a Three-Commit Workflow

In the git-practice project, complete the following:

1. Ask Claude Code to create an `about.html` (About page), then commit with the message: "Add about page"
2. Ask Claude Code to create a `style.css` (stylesheet), then commit with the message: "Add basic stylesheet"
3. Ask Claude Code to modify `index.html` to link to the newly created pages, then commit with the message: "Update homepage links"
4. Finally, ask Claude Code to display the complete Git history

You should see 5 commit records (the previous 2 + the new 3).

> Tip: You can work step by step, telling Claude Code what to do each time in natural language. For example: "Create about.html for me, then commit it to Git."

### Exercise 2: Experience the Power of "Viewing History"

After completing Exercise 1, try the following:

1. Ask Claude Code to "show all commit history records"
2. Ask Claude Code to "show what's different between the second commit and the latest commit"
3. Ask Claude Code to "show the modification history of index.html"

Experience the power of version control -- you can review how your project has evolved at any time.

> Tip: You don't need to remember any Git commands. Just ask Claude Code in plain language: "What's the change history for index.html?"

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Which of the following best describes a Git commit?</p>
<label><input type="radio" name="q1" value="0"> Deleting a file</label>
<label><input type="radio" name="q1" value="1"> A game save -- recording the current state of the project</label>
<label><input type="radio" name="q1" value="2"> Installing new software</label>
<label><input type="radio" name="q1" value="3"> Uploading a file to the internet</label>
<div class="quiz-explain">A commit is like a game save. It records the complete state of the project at a specific point in time, and you can view or return to this state at any time. Each commit has a description (commit message), just like a save description.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. When using Claude Code for Git operations, do you need to memorise Git commands?</p>
<label><input type="radio" name="q2" value="0"> Yes, you need to memorise every command</label>
<label><input type="radio" name="q2" value="1"> No, just describe what you want in natural language and Claude Code will run the right commands</label>
<label><input type="radio" name="q2" value="2"> You only need to memorise git commit</label>
<label><input type="radio" name="q2" value="3"> You need to complete a full Git tutorial before you can use it</label>
<div class="quiz-explain">One of Claude Code's biggest advantages is that you can describe what you want to do in natural language. Say "save my work" and it runs the correct git add and git commit. Say "show me the history" and it runs git log. You don't need to memorise any commands.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. Which of the following is a good commit message?</p>
<label><input type="radio" name="q3" value="0"> "update"</label>
<label><input type="radio" name="q3" value="1"> "fix"</label>
<label><input type="radio" name="q3" value="2"> "Add user login form page"</label>
<label><input type="radio" name="q3" value="3"> "changed some stuff"</label>
<div class="quiz-explain">A good commit message should clearly describe why this change was made. "Add user login form page" lets you immediately know what this commit did when reviewing history in the future. The other options are too vague and don't provide useful information.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Next Steps

Excellent! You've completed all of Phase 2! Let's recap what you've learned:

- **Module 2.1**: Setting up AI behaviour rules with CLAUDE.md
- **Module 2.2**: Reading, creating, and editing files
- **Module 2.3**: Searching and navigating across large numbers of files
- **Module 2.4**: Protecting your work with Git version control

These four skills form the core foundation for using Claude Code. Starting in Phase 3, we'll move into more advanced topics -- learning how to have Claude Code help you build real projects, from simple web pages to automation tools. You're ready!

> In **Phase 3: Practical Applications**, we'll learn how to use Claude Code to build a complete project from scratch. Stay tuned!
