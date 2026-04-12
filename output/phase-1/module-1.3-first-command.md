# Module 1.3: Your First Command

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Successfully launch Claude Code
  - Understand the different parts of the Claude Code interface
  - Give Claude Code your first command using natural language
  - Understand and operate the permission system (allow / deny)
  - Properly exit Claude Code

---

## 📖 Theory

### How Claude Code Works

Claude Code is like having a super assistant sitting right next to you. You just need to **tell it what you want to do in everyday language**, and it will take care of it.

For example, if you say: "Create a file called hello.txt with the content Hello World" -- Claude Code will do exactly that. You don't need to memorise any code or commands.

### The Permission System: Why Claude Code Asks "Can I?"

Imagine this: your assistant is helping you organise your office, and every time they need to touch your documents, they ask first: "Can I open this drawer?" That's Claude Code's **permission system**.

Before performing any operation that **modifies files on your computer**, Claude Code will ask whether you allow it. This is a safety mechanism that ensures it won't accidentally modify or delete your important files.

You have three choices:
- **Allow**: "Go ahead, perform this action"
- **Allow always**: "Don't ask me about this type of action in the future"
- **Deny**: "Don't perform this action"

---

## 💻 Code Example 1: Launching Claude Code and Getting to Know the Interface

### Step 1: Create a Practice Folder

Before we begin, let's create a folder specifically for practice:

**Windows** (Command Prompt):
```bash
# Create a practice folder
mkdir C:\claude-practice

# Navigate to this folder
cd C:\claude-practice
```

**Mac** (Terminal):
```bash
# Create a practice folder
mkdir ~/claude-practice

# Navigate to this folder
cd ~/claude-practice
```

### Step 2: Launch Claude Code

Type the following in the terminal:
```bash
# Launch Claude Code
claude
```

[What you should see]
```
+--------------------------------------------------+
|                                                  |
|  +=======================================+       |
|  |  Claude Code                         |        |
|  |  v1.0.x                              |        |
|  +=======================================+       |
|                                                  |
|  Tips:                                           |
|  - Use Claude to edit files, run commands,       |
|    and answer questions about your codebase      |
|  - Be specific about what you want               |
|  - Type /help for available commands              |
|                                                  |
|  cwd: C:\claude-practice                         |
|                                                  |
|  >                                               |
|  ^ This is where you type, your input area       |
+--------------------------------------------------+
```

### Understanding the Interface

| Area | Description |
|------|-------------|
| Title area | Shows the Claude Code version number |
| Tips area | Helpful usage tips |
| `cwd` | The current working directory (the folder Claude Code is "looking at") |
| `>` prompt | Where you type your commands |

### Expected Output:
After a successful launch, you'll see version information, usage tips, and a `>` prompt waiting for your input.

---

## 💻 Code Example 2: Giving Your First Command

### Have Claude Code Create a Text File

Now, after the `>` prompt, type the following (just like talking to a person):

```
Create a file called hello.txt with the content "Hello, this is my first file created with Claude Code!"
```

Press **Enter** to send.

[What you should see]
```
+--------------------------------------------------+
|  > Create a file called hello.txt with the       |
|    content "Hello, this is my first file created  |
|    with Claude Code!"                            |
|                                                  |
|  Claude Code is thinking...                      |
|                                                  |
|  I'll create that file for you.                  |
|                                                  |
|  +-- Write file: hello.txt -------------------+  |
|  | Hello, this is my first file created with   |  |
|  | Claude Code!                                |  |
|  +---------------------------------------------+ |
|                                                  |
|  Allow this action?                              |
|  [Y] Allow  [A] Allow always  [N] Deny           |
|                                                  |
+--------------------------------------------------+
```

### Step 2: Respond to the Permission Request

Claude Code is asking you: "Can I create this file?"

Press **Y** (or just press Enter, since Allow is usually the default option).

[After the action completes, you'll see]
```
+--------------------------------------------------+
|  File created: hello.txt                         |
|                                                  |
|  I've created hello.txt with the content:        |
|  "Hello, this is my first file created with      |
|  Claude Code!"                                   |
|                                                  |
|  >                                               |
|  ^ Ready for your next command                   |
+--------------------------------------------------+
```

### Step 3: Verify the File Was Actually Created

Continue typing at the Claude Code prompt:

```
Read the contents of hello.txt and show me
```

### Expected Output:
Claude Code will display the file's contents: "Hello, this is my first file created with Claude Code!"

You can also exit Claude Code and find the file in File Explorer (Windows) or Finder (Mac), then open it with Notepad or a text editor to verify.

---

### More Commands You Can Try

Here are some simple commands suitable for beginners:

```
Create a file called notes.txt, write today's date and "Started learning Claude Code"
```

```
Tell me what files are currently in this folder
```

```
Change the content of hello.txt to "Hello World! I've learned how to use Claude Code!"
```

Every command follows the same flow:
1. You describe your request in natural language
2. Claude Code understands and prepares to execute
3. If it involves file operations, it asks for your permission
4. You confirm, and the action is completed

---

### How to Exit Claude Code

When you want to stop using Claude Code, there are a few ways:

```
# Method 1: Type the exit command
/exit
```

```
# Method 2: Use a keyboard shortcut
Ctrl + C (hold Ctrl, then press C)
```

[After exiting, you'll see]
```
+------------------------------------------+
|  Goodbye! Session ended.                 |
|                                          |
|  C:\claude-practice>                     |
|  ^ Back to the normal command prompt     |
+------------------------------------------+
```

---

## ✍️ Hands-On Exercises

### Exercise 1: Create Your Self-Introduction File
1. Launch Claude Code in the `claude-practice` folder
2. Ask Claude Code to create a file called `about-me.txt`
3. The file should contain your name and "I am learning Claude Code"
4. After confirming the file was created, ask Claude Code to read the file contents

> Tip: You can give commands in any language you're comfortable with -- Claude Code understands multiple languages.

### Exercise 2: Modify File Contents
1. Ask Claude Code to add a new line to `about-me.txt`: "Today is my first day of learning"
2. Ask Claude Code to read the modified file to confirm the changes were successful

> Tip: You can simply say "Add a line at the end of about-me.txt..." and Claude Code will understand what you mean.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. In Claude Code, how do you give commands?</p>
<label><input type="radio" name="q1" value="0"> You must use English programming syntax</label>
<label><input type="radio" name="q1" value="1"> Describe what you want to do in natural language (any language works)</label>
<label><input type="radio" name="q1" value="2"> You must memorise specific command-line commands</label>
<label><input type="radio" name="q1" value="3"> You can only select operations from a menu</label>
<div class="quiz-explain">Claude Code's greatest advantage is that you can use everyday language to tell it what you want to do. You don't need to learn any code or command syntax.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. When Claude Code asks "Allow this action?" and you press [N], what happens?</p>
<label><input type="radio" name="q2" value="0"> Claude Code will force the action anyway</label>
<label><input type="radio" name="q2" value="1"> Claude Code will cancel the action and make no changes</label>
<label><input type="radio" name="q2" value="2"> Your computer will shut down</label>
<label><input type="radio" name="q2" value="3"> Claude Code will delete all files</label>
<div class="quiz-explain">Pressing N (Deny) means rejecting the action. Claude Code will respect your decision and make no changes. You can always reject any action you're unsure about -- this is an important safety mechanism.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. Which of the following can be used to exit Claude Code?</p>
<label><input type="radio" name="q3" value="0"> Shut down the computer</label>
<label><input type="radio" name="q3" value="1"> Type <code>/exit</code> or press <code>Ctrl + C</code></label>
<label><input type="radio" name="q3" value="2"> Unplug the network cable</label>
<label><input type="radio" name="q3" value="3"> Wait for it to close on its own</label>
<div class="quiz-explain">The most common ways to exit are typing <code>/exit</code> or pressing the keyboard shortcut <code>Ctrl + C</code>. Both safely end the Claude Code session.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Excellent! You've successfully completed your first interaction with Claude Code and created your first file.

In the next module, **1.4: Basic Navigation**, we'll learn how to move between different folders and have Claude Code help you browse and manage files on your computer. It's like learning to walk between different rooms in a house -- an essential foundational skill for using Claude Code!
