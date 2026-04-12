# Module 8.3: IDE Integration — VS Code & JetBrains

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Install and use the Claude Code extension in VS Code
  - Install and use the Claude Code plugin in JetBrains IDEs
  - Understand the differences between terminal, IDE, desktop, and web interfaces
  - Choose the right interface for different types of tasks
  - Use IDE-specific features like inline diffs and file context

## 📖 Theory

### Why Use Claude Code Inside an IDE?

Using Claude Code in the terminal is powerful, but using it inside your code editor adds a new dimension:

| Feature | Terminal | IDE |
|---------|----------|-----|
| See code and AI side by side | ✗ (switch windows) | ✓ (split panel) |
| Click file names to navigate | ✗ | ✓ |
| Inline diff review | ✗ (text-based diffs) | ✓ (visual diffs with colours) |
| Auto-detect current file | ✗ | ✓ |
| Run without leaving editor | ✗ | ✓ |

Think of it like reading a recipe: you *could* read it on your phone while cooking (terminal), but having it displayed on a screen right next to your stove (IDE) is much more convenient.

### Five Ways to Use Claude Code

Claude Code is available in five different interfaces:

| Interface | Best For | Install |
|-----------|----------|---------|
| **Terminal (CLI)** | Power users, scripting, automation | `npm install -g @anthropic-ai/claude-code` |
| **VS Code Extension** | Web/JS/Python developers who live in VS Code | VS Code Marketplace |
| **JetBrains Plugin** | Java/Kotlin/Python developers using IntelliJ/PyCharm | JetBrains Marketplace |
| **Desktop App** | Quick tasks, non-terminal users | Download from claude.ai |
| **Web (claude.ai/code)** | No install needed, quick access from any computer | Browser |

All five interfaces connect to the same Claude models and have the same core capabilities. The difference is in the user experience.

## 💻 Code Example 1: Setting Up VS Code Extension

### Step 1: Install the Extension

```
1. Open VS Code
2. Click the Extensions icon (Ctrl+Shift+X)
3. Search for "Claude Code"
4. Click "Install" on the official Anthropic extension
5. Reload VS Code when prompted
```

### Step 2: Open the Claude Code Panel

```
# Option 1: Keyboard shortcut
Ctrl+Shift+P → Type "Claude Code" → Select "Open Claude Code"

# Option 2: Click the Claude icon in the sidebar

# Option 3: Keyboard shortcut (after setup)
Ctrl+L (default keybinding)
```

[What you should see]
```
+--------------------------------------------------+
| VS Code Window                                   |
| +-------------------+---------------------------+|
| | File Explorer     | editor.py (your code)     ||
| | src/              |                           ||
| |   auth.py         | def login(user, pwd):     ||
| |   models.py       |     ...                   ||
| |   views.py        |                           ||
| +-------------------+---------------------------+|
| | Claude Code Panel                             ||
| | > How can I help?                             ||
| | |                                             ||
| +-----------------------------------------------+|
+--------------------------------------------------+
```

### Step 3: Your First IDE Prompt

With a file open in the editor, Claude Code automatically knows which file you're looking at:

```
> What does this file do?
```

Claude reads the currently open file and explains it — no need to specify the file path.

### Key VS Code Features:

| Feature | How to Use |
|---------|-----------|
| Reference a file | Type `@filename.py` in the chat |
| Reference a folder | Type `@src/components/` |
| See inline diffs | Claude shows changes with green (added) and red (removed) |
| Accept/reject changes | Click "Accept" or "Reject" on each diff block |
| Terminal integration | Claude can still run commands in the VS Code terminal |

## 💻 Code Example 2: Setting Up JetBrains Plugin

### Step 1: Install the Plugin

```
1. Open IntelliJ IDEA / PyCharm / WebStorm
2. Go to Settings → Plugins → Marketplace
3. Search for "Claude Code"
4. Click "Install"
5. Restart the IDE
```

### Step 2: Open the Tool Window

```
# Option 1: Menu
View → Tool Windows → Claude Code

# Option 2: Click the Claude icon in the right sidebar
```

[What you should see]
```
+--------------------------------------------------+
| JetBrains IDE                                    |
| +-------------------+---------------------------+|
| | Project Tree      | MyService.java            ||
| | src/main/java/    |                           ||
| |   UserService     | @Service                  ||
| |   OrderService    | public class MyService {  ||
| |   config/         |     ...                   ||
| +-------------------+---------------------------+|
| | Claude Code Tool Window                       ||
| | > Ask Claude Code...                          ||
| +-----------------------------------------------+|
+--------------------------------------------------+
```

### Step 3: Using Context-Aware Prompts

```
# With UserService.java open:
> Add input validation to the createUser method

# Claude automatically knows you're talking about the open file
```

### Key JetBrains Features:

| Feature | How to Use |
|---------|-----------|
| Context from open file | Automatically included when you ask a question |
| Inline code suggestions | Claude can suggest changes directly in the editor |
| Run configurations | Claude can create and modify run configs |
| Refactoring support | Works with the IDE's built-in refactoring tools |

## 💻 Supplementary Example: Desktop App & Web Interface

### Claude Code Desktop App

The desktop app provides Claude Code without needing a terminal or IDE:

```
1. Download from claude.ai (available for Mac and Windows)
2. Sign in with your Anthropic account
3. Open a project folder
4. Start chatting — same capabilities as the terminal
```

**Best for:**
- People who don't use a code editor regularly
- Quick one-off tasks
- Non-developers who need to work with code occasionally

### Claude Code on the Web (claude.ai/code)

```
1. Go to claude.ai/code in your browser
2. Sign in with your Anthropic account
3. Connect a repository or upload files
4. Start working — no installation required
```

**Best for:**
- Working from a shared or borrowed computer
- Quick access without installing anything
- Trying Claude Code before installing

### Choosing the Right Interface — Decision Tree

```
Do you write code daily?
├── Yes → Do you use VS Code or JetBrains?
│   ├── VS Code → Use the VS Code extension
│   ├── JetBrains → Use the JetBrains plugin
│   └── Other editor → Use the terminal CLI
└── No → Do you need to install anything?
    ├── No → Use the web interface (claude.ai/code)
    └── Yes, but no terminal → Use the desktop app
```

## ✍️ Hands-On Exercisess

### Exercise 1: Set Up Your Preferred Interface
1. Choose the interface that matches your workflow (VS Code, JetBrains, desktop, or web)
2. Install it following the steps above
3. Open a project you're working on
4. Ask Claude Code to explain the main entry file of your project
5. Try referencing a specific file using @filename

> Tip: Even if you prefer the terminal, try the IDE extension at least once. The inline diff view alone can be worth it for code reviews.

### Exercise 2: Compare Two Interfaces
1. Open the same project in both the terminal and your IDE extension
2. Ask the same question in both: "What does src/main.py do?"
3. Compare the experience — how the output looks, how you navigate to files, how diffs are displayed
4. Note which interface feels more natural for your workflow

> Tip: Many developers use both — terminal for automation and scripting, IDE extension for feature development and code review.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is the main advantage of using Claude Code inside an IDE versus the terminal?</p>
<label><input type="radio" name="q1" value="0"> The IDE version uses a more powerful AI model</label>
<label><input type="radio" name="q1" value="1"> You can see your code and Claude's suggestions side by side with visual diffs</label>
<label><input type="radio" name="q1" value="2"> The IDE version is free while the terminal version requires payment</label>
<label><input type="radio" name="q1" value="3"> The IDE version can edit files but the terminal version cannot</label>
<div class="quiz-explain">All interfaces use the same Claude models and have the same capabilities. The IDE advantage is the user experience — visual diffs, side-by-side code view, and click-to-navigate make reviewing changes much easier.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>2. Which interface requires no installation at all?</p>
<label><input type="radio" name="q2" value="0"> VS Code Extension</label>
<label><input type="radio" name="q2" value="1"> Terminal CLI</label>
<label><input type="radio" name="q2" value="2"> Desktop App</label>
<label><input type="radio" name="q2" value="3"> Web interface (claude.ai/code)</label>
<div class="quiz-explain">The web interface at claude.ai/code runs entirely in your browser — no downloads, no npm installs, no extensions. Just sign in and start working.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. When working in VS Code, how do you reference a specific file in your prompt to Claude Code?</p>
<label><input type="radio" name="q3" value="0"> Type @filename.py in the chat message</label>
<label><input type="radio" name="q3" value="1"> Right-click the file and select "Send to Claude"</label>
<label><input type="radio" name="q3" value="2"> Copy the file path and paste it in the chat</label>
<label><input type="radio" name="q3" value="3"> You cannot — Claude only sees the currently open file</label>
<div class="quiz-explain">In the VS Code extension, typing @filename.py in your chat message tells Claude Code to include that specific file as context. This works for both files and folders.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You now know how to use Claude Code across all available interfaces. In the next module, **8.4: Memory System & Multi-Session Workflows**, we'll learn how Claude Code remembers things across conversations — and how to make the most of this feature.
