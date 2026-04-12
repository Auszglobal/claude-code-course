# Module 2.2: Reading and Editing Files -- Let AI Manage Your Files

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Have Claude Code read the contents of any file
  - Have Claude Code create brand new files
  - Have Claude Code modify specific parts of existing files
  - Understand what a "diff" (difference comparison) is
  - Review what changes Claude Code made before accepting them

## 📖 Theory

### Why Are File Operations So Important?

The most common thing you'll do with Claude Code is work with files. Whether you're building a website, editing an article, or organising data, it all comes down to working with files.

Claude Code has three core file operation tools:

| Tool | Function | Real-Life Analogy |
|------|----------|-------------------|
| **Read** | View the contents of a file | Opening a book to read it |
| **Write** | Create a brand new file | Taking a blank sheet of paper and writing a document from scratch |
| **Edit** | Modify a specific part of a file | Using an eraser and pencil to revise a paragraph in a book |

### Read -- Reading Files

When you ask Claude Code to "take a look at a file," it uses the Read tool. It's like telling your assistant: "Bring me that report so I can review it."

Claude Code will read all (or part) of the file's contents and then discuss it with you.

### Write -- Creating New Files

When you ask Claude Code to "create a new file," it uses the Write tool. It's like telling your assistant: "Draft a new document for me."

Write creates a file from scratch. If a file with the same name already exists at that location, **it will overwrite the old file**, so be careful!

### Edit -- Modifying Files

Edit is the most precise tool. It doesn't rewrite the entire file -- it only changes the specific part you want modified.

Imagine a 100-page contract where you only need to change a date on page 37. You wouldn't reprint the entire contract -- you'd just change that one page. That's exactly what Edit does.

### What Is a Diff (Difference Comparison)?

When Claude Code modifies a file, it shows you a "diff" -- a "before vs after" comparison.

```diff
- This is the old content (red, meaning deleted)
+ This is the new content (green, meaning added)
```

A diff is like the redline markup used when revising contracts. You can clearly see what was removed, what was added, and what stayed the same.

**Important: Always review the diff before accepting changes!** Just like you'd read the revised terms before signing a contract.

## 💻 Code Example 1: Reading and Creating Files

### Preparation

Make sure you're in the practice project folder (continuing from Module 2.1):

```bash
# Navigate to your practice project
cd ~/Desktop/my-first-project

# Launch Claude Code
claude
```

### Step 1: Create a File

Type the following in Claude Code:

```
Please create a file called hello.txt with the content "Hello, world! This is my first file."
```

### Expected Output:

[What you should see]
```
+----------------------------------------------+
| Claude Code                                  |
|                                              |
| I'll create the hello.txt file.              |
|                                              |
| Created: hello.txt                           |
|                                              |
| File contents:                               |
| Hello, world! This is my first file.         |
+----------------------------------------------+
```

### Step 2: Read the File You Just Created

Now type:

```
Please read the contents of hello.txt and show me
```

### Expected Output:

Claude Code will display the complete file contents with line numbers:

```
1  Hello, world! This is my first file.
```

### Step 3: Create a Multi-Line File

Try creating a more complex file:

```
Please create a shopping-list.txt file with a shopping list containing the following items:
1. Milk
2. Eggs
3. Bread
4. Apples
5. Coffee
```

### Expected Output:

Claude Code will create a neatly formatted shopping list file. Your project folder now has:

```
my-first-project/
├── CLAUDE.md          (created in Module 2.1)
├── hello.txt          (just created)
└── shopping-list.txt  (just created)
```

## 💻 Code Example 2: Editing Existing Files

### Step 1: Modify Specific Content in a File

Now let's modify shopping-list.txt. Type the following in Claude Code:

```
Please change "Milk" to "Skim milk" in shopping-list.txt, then add "6. Chocolate" at the end of the list
```

### Expected Output:

Claude Code will show the diff (difference comparison) of the changes:

[The diff you should see]
```
+----------------------------------------------+
| Edit: shopping-list.txt                      |
|                                              |
| - 1. Milk                                   |
| + 1. Skim milk                               |
|                                              |
|   2. Eggs                                    |
|   3. Bread                                   |
|   4. Apples                                  |
|   5. Coffee                                  |
| + 6. Chocolate                               |
|                                              |
| [Accept / Reject]                            |
+----------------------------------------------+
```

Here you can see:
- **Red (-)**: "1. Milk" was removed
- **Green (+)**: "1. Skim milk" was added (as a replacement)
- **Green (+)**: "6. Chocolate" was added at the end
- **Lines without symbols**: Were not modified

### Step 2: Accept or Reject the Changes

Claude Code will wait for your confirmation. You have a few options:

| Action | Description |
|--------|-------------|
| **Accept** (press Y or Enter) | Confirm the changes; the file will be updated |
| **Reject** (press N) | Cancel the changes; the file stays as is |

> **Important reminder**: Build the habit -- always review the diff before deciding whether to accept. This is your final check as the "boss"! Claude Code is the assistant, but the final decision is yours.

### Step 3: Verify the Changes

After accepting the changes, type:

```
Please read the latest contents of shopping-list.txt
```

You should see the updated full list:

```
1. Skim milk
2. Eggs
3. Bread
4. Apples
5. Coffee
6. Chocolate
```

### Creating and Editing a README File

Let's do an exercise that's closer to a real-world scenario. Type:

```
Please create a README.md file introducing this project. The title is "My Practice Project," and it explains this is a practice space for learning Claude Code. List all the files currently in the folder.
```

Claude Code will read the current file structure and then create a README.md. Next, you can say:

```
Please add a "Learning Progress" section to README.md with the following:
- [x] Module 2.1: Learned about CLAUDE.md
- [x] Module 2.2: Learned about file operations
- [ ] Module 2.3: Search and navigation (in progress)
```

Claude Code will use the Edit tool to add only this section to README.md, without touching any existing content.

## ✍️ Hands-On Exercises

### Exercise 1: The Three-Step File Operation

Complete the following three steps in your practice project:

1. **Create**: Ask Claude Code to create a `notes.txt` file with three things you learned today
2. **Read**: Ask Claude Code to read `notes.txt` to confirm the content is correct
3. **Edit**: Ask Claude Code to add a line at the end of `notes.txt`: "Tomorrow I'll continue with Module 2.3!"

> Tip: You can describe what you want to do in natural language -- no need to memorise any commands. For example: "Add a line at the end of notes.txt..."

### Exercise 2: Create a Simple Personal Page

Ask Claude Code to help you with the following:

1. Create an `index.html` file with a simple HTML page -- the title should be your name
2. Read the file and check if the content is correct
3. Modify the page to add a brief personal introduction (a sentence or two is fine)

Observe whether Claude Code uses Write or Edit at each step.

> Tip: Step 1 creates a new file and will use Write. Step 3 modifies an existing file and will use Edit. Pay attention to the diff display!

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is the difference between Claude Code's Write tool and Edit tool?</p>
<label><input type="radio" name="q1" value="0"> No difference; they're functionally identical</label>
<label><input type="radio" name="q1" value="1"> Write creates a brand new file or overwrites completely; Edit only modifies specific parts of a file</label>
<label><input type="radio" name="q1" value="2"> Write can only create text files; Edit can create any file type</label>
<label><input type="radio" name="q1" value="3"> Write is faster than Edit</label>
<div class="quiz-explain">Write is used to create new files from scratch (or completely overwrite existing files), while Edit is used to precisely modify specific parts of a file without affecting the rest. Edit is like changing one clause in a contract, while Write is like drafting the entire contract from scratch.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. What is a diff?</p>
<label><input type="radio" name="q2" value="0"> A programming language</label>
<label><input type="radio" name="q2" value="1"> A before-and-after comparison showing what was added and deleted in a file</label>
<label><input type="radio" name="q2" value="2"> A Claude Code configuration option</label>
<label><input type="radio" name="q2" value="3"> A file format</label>
<div class="quiz-explain">A diff is a before-and-after comparison of changes. Red (-) represents deleted content, and green (+) represents added content. It lets you clearly see what Claude Code changed before you accept the modifications.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. After Claude Code shows you a diff, what should you do?</p>
<label><input type="radio" name="q3" value="0"> Accept it immediately, because the AI never makes mistakes</label>
<label><input type="radio" name="q3" value="1"> Reject it immediately and make the changes manually</label>
<label><input type="radio" name="q3" value="2"> Review the diff contents first, then accept only after confirming the changes are correct</label>
<label><input type="radio" name="q3" value="3"> Close Claude Code and start over</label>
<div class="quiz-explain">Build good habits: always review the diff before making a decision. Claude Code is very smart, but it can occasionally misunderstand your intent. As the project owner, the final decision is yours. Look first, then confirm -- that's the safest approach.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You've now mastered Claude Code's core file operation skills! You can have the AI read, create, and modify any file.

In the next module, **2.3: Searching and Navigating the Codebase**, we'll learn how to quickly find what you need among a large number of files. When your project has dozens or even hundreds of files, search capabilities become essential.
