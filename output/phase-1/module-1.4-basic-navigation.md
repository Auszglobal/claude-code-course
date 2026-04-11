# Module 1.4: Basic Navigation

## Learning Objectives
- After completing this lesson, you will be able to:
  - Understand the concept of "working directory"
  - Ask Claude Code to list files in a folder
  - Ask Claude Code to read file contents
  - Understand the differences between Windows and Mac file paths
  - Navigate between different folders

---

## Theory

### What Is a "Working Directory"?

Imagine your computer is a house, and each **folder** is a **room** in that house.

When you launch Claude Code, it "stands" in a particular room -- that's the **working directory** (abbreviated as cwd). By default, Claude Code can only see what's in that room.

For example:
- If you're in the "kitchen" (`C:\claude-practice`), you can see the ingredients on the table (files)
- If you want to see what's in the "bedroom" (`C:\Users\kin\Documents`), you need to "walk" to that room first

### File Paths: The Address System of Your Computer

A **file path** is the "address" of a file on your computer. Just like mailing a letter requires an address, you need to tell Claude Code where a file is located.

**Windows paths look like this:**
```
C:\Users\kin\Documents\report.txt
```
- `C:\` is your hard drive (like a city name)
- `Users\kin\` is your user folder (like a street name)
- `Documents\` is the Documents folder (like a house number)
- `report.txt` is the specific file (like the recipient's name)
- Note: Windows uses **backslashes** `\` as separators

**Mac paths look like this:**
```
/Users/kin/Documents/report.txt
```
- `/` is the root directory (the top level, like a city name)
- `Users/kin/` is your user folder
- `Documents/` is the Documents folder
- `report.txt` is the specific file
- Note: Mac uses **forward slashes** `/` as separators

> Tip: Windows uses `\` (backslash), Mac uses `/` (forward slash). However, in Claude Code, you usually don't need to type paths yourself -- just describe things in natural language.

---

## Code Example 1: Exploring Files and Folders

### Preparation

First, let's create some practice files and folders.

**Windows:**
```bash
# Navigate to the practice folder
cd C:\claude-practice

# Launch Claude Code
claude
```

**Mac:**
```bash
# Navigate to the practice folder
cd ~/claude-practice

# Launch Claude Code
claude
```

### Command 1: Check Where You Are

In Claude Code, type:
```
What folder am I currently in?
```

[What you should see]
```
+--------------------------------------------------+
|  > What folder am I currently in?                |
|                                                  |
|  You are currently in the following working      |
|  directory:                                      |
|                                                  |
|  Windows: C:\claude-practice                     |
|  Mac:     /Users/kin/claude-practice             |
|                                                  |
|  >                                               |
+--------------------------------------------------+
```

### Command 2: List Files in the Folder

```
List all the files in this folder
```

### Expected Output:
If you created files in Module 1.3, you'll see a list like this:
```
hello.txt
about-me.txt
```

### Command 3: Create Subfolders and More Files

Let's create a richer practice structure:

```
Please do the following:
1. Create a subfolder called projects
2. Inside projects, create a file called my-first-project.txt with the content "This is my first project"
3. Create a subfolder called notes
4. Inside notes, create a file called learning-log.txt with the content "Day 1: Started learning Claude Code"
```

Claude Code will perform these operations one by one (asking for your permission at each step).

After completion, your folder structure will look like this:

```
claude-practice/           <- Your main practice folder
├── hello.txt              <- Created in Module 1.3
├── about-me.txt           <- Created in Module 1.3
├── projects/              <- Subfolder just created
│   └── my-first-project.txt
└── notes/                 <- Subfolder just created
    └── learning-log.txt
```

---

## Code Example 2: Navigation and Reading Files

### Reading Files in Different Locations

You don't need to "walk to" a folder to read a file inside it. Just tell Claude Code where the file is:

```
Read my-first-project.txt in the projects folder
```

[What you should see]
```
+--------------------------------------------------+
|  > Read my-first-project.txt in the projects     |
|    folder                                        |
|                                                  |
|  The contents of this file are:                  |
|                                                  |
|  This is my first project                        |
|                                                  |
|  >                                               |
+--------------------------------------------------+
```

### Viewing the Folder Structure

To see the entire folder structure, you can say:

```
Show the complete structure of the current folder, including all subfolders and files
```

### Expected Output:
Claude Code will display the full tree structure, giving you a clear view of which files are in which locations.

### Searching for Files

If you've forgotten where a file is:

```
Help me find where all the .txt files are
```

Claude Code will search the current folder (and all subfolders) and list all matching files.

---

### Windows vs Mac Path Comparison Table

When working with files in Claude Code, understanding path differences is helpful:

| Concept | Windows | Mac |
|---------|---------|-----|
| User home directory | `C:\Users\YourName\` | `/Users/YourName/` or `~/` |
| Desktop | `C:\Users\YourName\Desktop\` | `~/Desktop/` |
| Documents | `C:\Users\YourName\Documents\` | `~/Documents/` |
| Downloads | `C:\Users\YourName\Downloads\` | `~/Downloads/` |
| Path separator | `\` (backslash) | `/` (forward slash) |

> Good news: In Claude Code, you usually don't need to type paths directly. You can describe things in natural language, such as "open report.txt on the desktop," and Claude Code will automatically find the correct path.

---

### Quick Reference for Common Navigation Commands

Here are some commonly used natural language navigation commands:

| What you want to do | How you can say it |
|---------------------|-------------------|
| Check current location | "What folder am I in?" |
| List files | "List all the files here" |
| Read a file | "Read the contents of XXX.txt" |
| View structure | "Show this folder's structure" |
| Find a file | "Find files with 'report' in the name" |
| Create a folder | "Create a folder called XXX" |
| Check file sizes | "How big is each file in this folder?" |

---

## Hands-On Practice

### Exercise 1: Build Your Study Notes System
1. Launch Claude Code (in the `claude-practice` folder)
2. Ask Claude Code to create the following structure:
   ```
   study/
   ├── week-1/
   │   └── day-1-notes.txt (content: Today I learned how to install Claude Code)
   └── week-2/
       └── placeholder.txt (content: About to start week 2 of learning)
   ```
3. After creation, ask Claude Code to display the complete structure of the `study` folder
4. Ask Claude Code to read the contents of `day-1-notes.txt`

> Tip: You can tell Claude Code everything you want to create at once, and it will complete the tasks in order.

### Exercise 2: Explore Your Computer
1. Ask Claude Code to tell you what files are on your desktop
2. Ask Claude Code to read the contents of any `.txt` file on the desktop (if there are any)

> Tip: You can say "List the files on my desktop" and Claude Code will know where to look. If there are no `.txt` files on the desktop, that's fine -- this is just practice for navigation skills.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What does "working directory" mean?</p>
<label><input type="radio" name="q1" value="0"> Where Claude Code is installed</label>
<label><input type="radio" name="q1" value="1"> The folder Claude Code is currently operating in</label>
<label><input type="radio" name="q1" value="2"> Your desktop folder</label>
<label><input type="radio" name="q1" value="3"> A Windows system folder</label>
<div class="quiz-explain">The working directory is the folder where Claude Code is currently "located." Just like standing in a particular room of a house -- you can mainly see and work with what's in that room.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. On Windows, what symbol is used to separate folders in a file path?</p>
<label><input type="radio" name="q2" value="0"> Forward slash <code>/</code></label>
<label><input type="radio" name="q2" value="1"> Backslash <code>\</code></label>
<label><input type="radio" name="q2" value="2"> Colon <code>:</code></label>
<label><input type="radio" name="q2" value="3"> Period <code>.</code></label>
<div class="quiz-explain">Windows uses backslashes <code>\</code> to separate folders in paths, for example <code>C:\Users\kin\Documents\</code>. Mac uses forward slashes <code>/</code>. This is one of the most common differences between the two systems.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. If you want to read a file in a subfolder, what do you need to do?</p>
<label><input type="radio" name="q3" value="0"> Exit Claude Code, manually navigate to that subfolder, and restart</label>
<label><input type="radio" name="q3" value="1"> Simply tell Claude Code which folder and file you want to read</label>
<label><input type="radio" name="q3" value="2"> Delete the file and recreate it</label>
<label><input type="radio" name="q3" value="3"> Files in subfolders cannot be read</label>
<div class="quiz-explain">You just need to describe the file's location in natural language, for example "Read report.txt in the projects folder." Claude Code will automatically find the correct path and read the contents.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Next Steps

Great work! You've now mastered the basic navigation skills in Claude Code -- knowing where you are, browsing files, reading contents, and working across different folders.

Phase 1 (Getting Started) is now complete! Here's what you've learned:
- What Claude Code is (Module 1.1)
- Installation and setup (Module 1.2)
- Giving your first command (Module 1.3)
- Basic navigation (Module 1.4)

In **Phase 2: Core Features**, the first module **2.1: The CLAUDE.md Configuration File** will teach you how to use a special configuration file to "train" Claude Code so it better understands your needs and preferences. It's like giving your AI assistant a personalised instruction manual!
