# Module 5.2: Custom Workflows and Hooks

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand what Hooks are and their role in Claude Code
  - Distinguish between the three Hook types: PreToolUse, PostToolUse, and Notification
  - Configure custom Hooks in settings.json
  - Create custom Slash Commands
  - Design an automated workflow that fits your work habits

## 📖 Theory

### What Are Hooks?

Imagine you have a smart home system installed in your house:

- When you **open the front door** (trigger event), the hallway lights **automatically turn on** (automatic action)
- When you **say goodnight** (trigger event), all the lights **automatically turn off** (automatic action)
- When someone **rings the doorbell** (trigger event), your phone **receives a notification** (automatic action)

**Claude Code's Hooks work exactly like these automatic triggers.** When Claude Code performs a specific operation, a Hook automatically runs a script or command you've defined in advance.

### The Three Hook Types

| Hook Type | When It Triggers | Analogy |
|-----------|-----------------|---------|
| **PreToolUse** | **Before** Claude Code uses a tool | Automatically checking you have your keys before leaving the house |
| **PostToolUse** | **After** Claude Code uses a tool | Lights turning on automatically when you get home |
| **Notification** | When Claude Code needs to notify you | Doorbell rings, your phone alerts you |

### Why Do You Need Hooks?

Hooks can help you:

1. **Automate repetitive actions** -- automatically format code after editing a file
2. **Security protection** -- prevent Claude Code from modifying files it shouldn't touch
3. **Real-time alerts** -- notify you when a long-running task completes
4. **Quality control** -- automatically run tests after every file write

## 💻 Code Example 1: Setting Up a Simple Notification Hook

Let's start with the simplest Hook -- popping up a desktop notification when Claude Code needs your attention.

### Step 1: Understand the Config File Structure

Hooks are configured in `settings.json`. Open your config file:

```bash
# View the global config file (if it exists)
cat ~/.claude/settings.json
```

### Step 2: Add a Notification Hook

In Claude Code, you can ask it to set up a Hook for you:

```
> Help me add a notification hook in settings.json that uses PowerShell
  to pop up a desktop notification when Claude Code needs my attention
```

The config file will look like this:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Claude Code needs your attention!')\""
          }
        ]
      }
    ]
  }
}
```

> **Mac users** can change the command to:
> ```
> "command": "osascript -e 'display notification \"Claude Code needs your attention!\" with title \"Claude Code\"'"
> ```

### Expected Output:
Once configured, whenever Claude Code completes a long-running task or needs you to confirm an operation, you'll see a desktop notification popup.

## 💻 Code Example 2: Creating a Security Protection Hook

Now let's build a more practical Hook -- blocking Claude Code from modifying sensitive files (such as `.env` files).

### PreToolUse Hook Configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q '\\.env'; then echo 'BLOCK: Modifying .env files is not allowed! Please edit manually.' >&2; exit 1; fi"
          }
        ]
      }
    ]
  }
}
```

Let's break down this configuration:

```
"matcher": "Write|Edit"
  ^ Triggers when Claude Code is about to use the Write or Edit tool

"command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q '\\.env'; then ..."
  ^ Checks if the tool's input (the file being modified) contains .env

"exit 1"
  ^ Returns error code 1, telling Claude Code to stop this operation
```

[What you should see]
```
+---------------------------------------------------+
| > Please modify the API_KEY in the .env file      |
|                                                   |
| Hook blocked this operation                       |
| BLOCK: Modifying .env files is not allowed!       |
| Please edit manually.                             |
|                                                   |
| I cannot directly modify .env files (blocked by   |
| a security Hook). You can manually open the file  |
| to edit it:                                       |
| code .env                                         |
+---------------------------------------------------+
```

### Expected Output:
When you try to have Claude Code edit a `.env` file, the Hook will intercept the operation and display an error message. Claude Code will tell you that you need to edit it manually.

## 💻 Code Example 3: Creating a PostToolUse Hook

This Hook will automatically remind you to make a Git commit after Claude Code edits a file:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: File has been modified. Remember to save your changes with git commit!'"
          }
        ]
      }
    ]
  }
}
```

### Expected Output:
Each time Claude Code modifies or creates a file, you'll see a reminder in the terminal prompting you to commit to Git in a timely manner.

## 💻 Code Example 4: Custom Slash Commands

In addition to Hooks, Claude Code also supports custom **Slash Commands**. Think of these as keyboard shortcuts for your commonly used operations.

### How to Create Them

Create a `.claude/commands/` folder in your project root. Each `.md` file becomes a command:

```bash
# Create the commands directory
mkdir -p .claude/commands

# Create a "format" command
cat > .claude/commands/format.md << 'EOF'
Please format all modified files in the current project:
1. Find all modified files (using git diff --name-only)
2. Run the appropriate formatter based on file type
3. Display which files were formatted when done
EOF

# Create a "check" command
cat > .claude/commands/check.md << 'EOF'
Please run a comprehensive check on the current project:
1. Run all tests (if any exist)
2. Check for syntax errors
3. Confirm there are no leftover console.log or print statements
4. Report a summary of the check results
EOF
```

### How to Use Them

In Claude Code, type a slash followed by the command name:

```
> /format
> /check
```

[What you should see]
```
+---------------------------------------------------+
| > /format                                         |
|                                                   |
| Searching for modified files...                   |
| Found 3 modified files:                           |
|   - src/app.js (JavaScript)                       |
|   - styles/main.css (CSS)                         |
|   - index.html (HTML)                             |
|                                                   |
| All files have been formatted!                    |
+---------------------------------------------------+
```

### Expected Output:
After typing `/format`, Claude Code reads the contents of `.claude/commands/format.md` as a prompt and automatically executes the steps described within.

## 💻 Code Example 5: A Complete Workflow Configuration

Here's a complete `settings.json` example combining multiple Hook types:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read",
      "Write",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q '\\.env\\|credentials\\|token\\.json'; then echo 'BLOCK: Modifying sensitive files is forbidden' >&2; exit 1; fi"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: File has been changed. Remember to test and commit.'"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -Command \"Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show($env:CLAUDE_NOTIFICATION, 'Claude Code')\""
          }
        ]
      }
    ]
  }
}
```

## ✍️ Hands-On Exercisess

### Exercise 1: Create Your First Hook
1. Open your `~/.claude/settings.json`
2. Add a PostToolUse Hook that displays "Command execution complete" after every time Claude Code runs a Bash command
3. Test it: run a simple command in Claude Code and see if the reminder appears

> Tip: Set the matcher to `"Bash"` and the command to `echo 'Command execution complete'`

### Exercise 2: Create a Custom Slash Command
1. Create a `.claude/commands/` directory in your project
2. Create a `status.md` file describing the checks you want Claude Code to perform
3. Type `/status` in Claude Code to test it

> Tip: For example, you could have `/status` check Git status, list recently modified files, run tests, etc.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. When does a PreToolUse Hook trigger?</p>
<label><input type="radio" name="q1" value="0"> When Claude Code starts up</label>
<label><input type="radio" name="q1" value="1"> Before Claude Code uses a tool</label>
<label><input type="radio" name="q1" value="2"> After Claude Code uses a tool</label>
<label><input type="radio" name="q1" value="3"> When Claude Code shuts down</label>
<div class="quiz-explain">PreToolUse triggers before Claude Code uses a tool. You can use it to check for and block unsafe operations.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. Where should custom Slash Command files be placed?</p>
<label><input type="radio" name="q2" value="0"> In the <code>commands/</code> folder at the project root</label>
<label><input type="radio" name="q2" value="1"> Inside <code>~/.claude/settings.json</code></label>
<label><input type="radio" name="q2" value="2"> In the <code>.claude/commands/</code> folder at the project root</label>
<label><input type="radio" name="q2" value="3"> Inside <code>node_modules/</code></label>
<div class="quiz-explain">Custom commands are <code>.md</code> files placed in the project's <code>.claude/commands/</code> directory. Each filename becomes the command name.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. What happens if a PreToolUse Hook script returns <code>exit 1</code>?</p>
<label><input type="radio" name="q3" value="0"> Claude Code will crash</label>
<label><input type="radio" name="q3" value="1"> The tool operation will be blocked and Claude Code won't execute it</label>
<label><input type="radio" name="q3" value="2"> Nothing will happen</label>
<label><input type="radio" name="q3" value="3"> Claude Code will ignore the Hook and continue</label>
<div class="quiz-explain">When a PreToolUse Hook command returns a non-zero exit code (like exit 1), Claude Code blocks the tool operation. This is the key mechanism for implementing security protections.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>4. What is the role of the "matcher" field in a Hook configuration?</p>
<label><input type="radio" name="q4" value="0"> It determines how fast the Hook runs</label>
<label><input type="radio" name="q4" value="1"> It sets the priority of the Hook</label>
<label><input type="radio" name="q4" value="2"> It specifies which tool(s) the Hook should trigger on (e.g., "Write|Edit" or "Bash")</label>
<label><input type="radio" name="q4" value="3"> It matches the user's name for permissions</label>
<div class="quiz-explain">The matcher field uses a pattern (like "Write|Edit") to specify which Claude Code tools will trigger the Hook. The pipe symbol <code>|</code> means "or" — so "Write|Edit" triggers when either the Write or Edit tool is used.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. You want Claude Code to automatically run tests after every file edit. Which Hook type should you use?</p>
<label><input type="radio" name="q5" value="0"> PostToolUse — triggers after a tool is used</label>
<label><input type="radio" name="q5" value="1"> PreToolUse — triggers before a tool is used</label>
<label><input type="radio" name="q5" value="2"> Notification — triggers when Claude needs attention</label>
<label><input type="radio" name="q5" value="3"> OnStartup — triggers when Claude Code starts</label>
<div class="quiz-explain">PostToolUse runs after a tool completes. By matching on "Write|Edit", you can automatically run tests every time Claude Code finishes modifying a file, catching issues immediately.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. How do you invoke a custom Slash Command in Claude Code?</p>
<label><input type="radio" name="q6" value="0"> By running it from the terminal outside Claude Code</label>
<label><input type="radio" name="q6" value="1"> By typing a slash followed by the command name (e.g., <code>/format</code>)</label>
<label><input type="radio" name="q6" value="2"> By editing settings.json and restarting</label>
<label><input type="radio" name="q6" value="3"> By double-clicking the .md file in your file explorer</label>
<div class="quiz-explain">Custom Slash Commands are invoked by typing <code>/</code> followed by the filename (without the .md extension) in the Claude Code conversation. Claude reads the contents of the matching .md file as instructions.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. What is the environment variable <code>$CLAUDE_TOOL_INPUT</code> used for in a PreToolUse Hook?</p>
<label><input type="radio" name="q7" value="0"> It stores the API key for authentication</label>
<label><input type="radio" name="q7" value="1"> It contains the output from the previous command</label>
<label><input type="radio" name="q7" value="2"> It holds the current working directory path</label>
<label><input type="radio" name="q7" value="3"> It contains the input data that Claude is about to send to the tool (e.g., file path being written)</label>
<div class="quiz-explain"><code>$CLAUDE_TOOL_INPUT</code> holds the input that Claude Code is about to pass to a tool. In a PreToolUse Hook, you can inspect this value to check whether the operation should be allowed or blocked (e.g., checking if the file path contains ".env").</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. What is the key difference between Hooks and Slash Commands?</p>
<label><input type="radio" name="q8" value="0"> Hooks run automatically on triggers; Slash Commands are manually invoked by typing <code>/commandname</code></label>
<label><input type="radio" name="q8" value="1"> Hooks are written in Python; Slash Commands are written in JavaScript</label>
<label><input type="radio" name="q8" value="2"> Hooks only work on Mac; Slash Commands work on all platforms</label>
<label><input type="radio" name="q8" value="3"> There is no difference — they are the same feature</label>
<div class="quiz-explain">Hooks are automatic triggers that fire when Claude Code uses specific tools (before, after, or on notification). Slash Commands are user-initiated — you explicitly type them when you want a specific workflow to run.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You've now learned how to build a personalised Claude Code working environment! In the next module, **5.3: Team Collaboration Best Practices**, we'll learn how to share these configurations across a team, conduct code reviews, and manage Pull Requests -- making Claude Code a great partner for team collaboration.
