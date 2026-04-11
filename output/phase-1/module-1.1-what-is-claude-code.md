# Module 1.1: What Is Claude Code?

## Learning Objectives

After completing this lesson, you will be able to:
- Explain what Claude Code is in your own words
- Distinguish Claude Code from chat tools like ChatGPT
- Understand what tasks Claude Code can help you accomplish
- Recognise the basic concepts of "terminal" and "command line"
- Understand why Claude Code is beginner-friendly, even for those with zero experience

---

## Theory

### What Is Claude Code?

Imagine you've hired a super assistant sitting right next to your computer. This assistant can not only chat with you, but can also **directly operate your computer** -- creating files, editing code, searching for information, and even running commands.

That is **Claude Code**.

More precisely, Claude Code is an **AI command-line tool** (CLI Tool) developed by Anthropic. It runs in your computer's "terminal" and lets you use everyday language to instruct the AI to complete various software development and automation tasks.

### An Analogy to Help You Understand

| Analogy | Explanation |
|---|---|
| ChatGPT / Claude.ai (web version) | Like **calling a friend on the phone**: you ask questions, your friend answers, but your friend can't touch your computer |
| Claude Code (command-line version) | Like **having a friend sit next to you**: you say what you want to do, and your friend does it directly on your computer |

The key difference: **Claude Code can directly read and modify files on your computer**. It doesn't just give you suggestions -- it actually does the work for you.

### What Can Claude Code Do?

As a complete beginner, here are things you can accomplish with Claude Code:

| Task | Example |
|---|---|
| Create and manage files | "Create a folder called my-project on the desktop" |
| Edit file contents | "Change the title in README.md to English" |
| Search files | "Find all files containing 'error' in this project" |
| Fix problems | "This code is throwing an error, help me find the issue" |
| Automate repetitive work | "Automatically organise the files in this folder every day" |
| Write code | "Write me a simple web page" |

### What Is a "Terminal"?

Before we continue, let's get familiar with an important concept -- the **terminal**.

The terminal is like a **text-based remote control** for your computer. Normally you click icons with a mouse to open programs, but with a terminal, you **type** to tell the computer what to do.

[What you should see]
On Windows, when you open the terminal, you'll see an interface like this:
```
+------------------------------------------+
| C:\Users\YourName>                       |
|                                          |
| (This is where you type commands)        |
|                                          |
+------------------------------------------+
```

On Mac, it looks like this:
```
+------------------------------------------+
| YourName@MacBook ~ %                     |
|                                          |
| (This is where you type commands)        |
|                                          |
+------------------------------------------+
```

Don't be afraid! You don't need to memorise any complicated commands. The beauty of Claude Code is that **you just describe what you want to do in plain language, and it does it for you**.

### How Claude Code Works

Claude Code's workflow is very simple -- just three steps:

```
You (describe the task in text)  ->  Claude Code (understands and executes)  ->  Result (displayed in the terminal)
```

**Step 1: You describe your request**
> "Create a file called hello.txt with the content Hello World"

**Step 2: Claude Code plans the action**
Claude Code will tell you what it intends to do and ask for your confirmation (a safety mechanism).

**Step 3: Execute and report**
Claude Code completes the task and tells you the result.

This "ask before acting" design ensures you always stay in control -- Claude Code won't make changes to your computer without your knowledge.

---

## Code Example 1: Your First Claude Code Conversation

> Note: This example is meant to give you a preview of the Claude Code experience. You don't need to actually do this yet -- installation steps will be covered in detail in Module 1.2.

Assuming you've already installed Claude Code, type `claude` in the terminal to start it:

```bash
# Type claude in the terminal to start Claude Code
claude
```

Then you can talk to it directly in natural language:

```
You: Show me what files are in the current folder

Claude Code: Let me check the contents of the current directory for you.

(Claude Code will list all files and subfolders in the current folder)
```

### Expected Output:

[What you should see]
```
+--------------------------------------------------+
| > claude                                         |
|                                                  |
| +----------------------------------------------+ |
| | Claude Code v1.x                             | |
| | Type your command, or press /help for         | |
| | available commands                            | |
| +----------------------------------------------+ |
|                                                  |
| You> Show me what files are in the current folder|
|                                                  |
| Claude: Let me check the contents of the current |
| directory.                                       |
|                                                  |
| Current directory contains:                      |
|   - README.md                                    |
|   - package.json                                 |
|   - src/                                         |
|   - ...                                          |
+--------------------------------------------------+
```

The key point: you don't need to memorise any "commands"! Just describe what you want to do in your own words.

---

## Code Example 2: Having Claude Code Create a File for You

Here's a slightly more advanced example showing how Claude Code can create a complete file for you:

```
You: Create a file called self-intro.txt with a self-introduction template

Claude Code: Sure, I'll create that file for you.

(Claude Code will generate the file content and ask you to confirm before creating it)
```

[What you should see]
```
+--------------------------------------------------+
| You> Create a file called self-intro.txt with    |
|      a self-introduction template                |
|                                                  |
| Claude: I'll create self-intro.txt for you.      |
|                                                  |
| Will create file self-intro.txt:                 |
| +--------------------------------------------+   |
| | Self-Introduction                          |   |
| |                                            |   |
| | Name:                                      |   |
| | Occupation:                                |   |
| | Hobbies:                                   |   |
| | Learning goals:                            |   |
| +--------------------------------------------+   |
|                                                  |
| Confirm creation? (Y/n)                          |
+--------------------------------------------------+
```

Did you notice? Before actually creating the file, Claude Code shows you the content first and **asks for your confirmation**. This is the safety mechanism we mentioned earlier -- you always have the final say.

---

## Hands-On Practice

### Exercise 1: Think About Your Use Cases

On paper or in a notebook, write down 3 tasks you'd like Claude Code to help you with. For example:
- Organise files on your computer
- Learn to build a simple web page
- Automate some task you repeat every day

> Tip: Don't limit your imagination! Claude Code might be more capable than you think. Write down these ideas -- we'll teach you how to accomplish them in later lessons.

### Exercise 2: Get to Know Your Terminal

Try to find and open the terminal on your computer:

**Windows users:**
1. Press the `Windows key` on your keyboard
2. Type `Terminal` or `cmd`
3. Click "Terminal" or "Command Prompt"

**Mac users:**
1. Press `Command + Space` to open Spotlight
2. Type `Terminal`
3. Press Enter to open

> Tip: Once it's open, you don't need to type anything! Just see what it looks like. We'll start using it properly in Module 1.2.

---

## Quiz (3 Questions)

**1. What is the biggest difference between Claude Code and a regular AI chatbot (like the web version of ChatGPT)?**

A. Claude Code is smarter  
B. Claude Code can directly read and modify files on your computer  
C. Claude Code is free  
D. Claude Code can only be used in English  

Answer: B -- Claude Code's most distinctive feature is its ability to interact directly with your computer. It doesn't just answer questions -- it actually helps you operate files and run commands.

---

**2. What is a "terminal"?**

A. A special type of browser  
B. A text-based interface for operating your computer  
C. A shopping website  
D. Claude Code's official website  

Answer: B -- A terminal is an interface where you operate your computer using text commands. You type a command, and the computer carries out the corresponding action. Claude Code runs inside the terminal.

---

**3. When Claude Code needs to modify your files, what does it do?**

A. Modifies them directly without notifying you  
B. First tells you what it plans to do, then waits for your confirmation before executing  
C. Sends you an email notification  
D. Automatically backs up and then modifies directly  

Answer: B -- Claude Code has a safety mechanism. Before performing any action that could affect your files, it explains its plan and asks for your confirmation. You always have ultimate control.

---

## Next Steps

Congratulations on completing the first lesson! Now you understand what Claude Code is and what it can do.

In the next module, **1.2: Installing Claude Code**, we'll walk you through step by step:
- Installing Node.js (the runtime environment Claude Code needs)
- Getting your Anthropic API key
- Installing Claude Code on your computer
- Verifying that the installation was successful

Ready? Let's keep going!
