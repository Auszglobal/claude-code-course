# Module 5.2: Custom Workflows and Hooks

## Learning Objectives
- After completing this lesson you will be able to:
  - Understand what Hooks are and their role in Claude Code
  - Distinguish between the three Hook types: PreToolUse, PostToolUse, and Notification
  - Configure custom Hooks in settings.json
  - Create custom Slash Commands
  - Design an automated workflow that fits your work habits

## Theory

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

## Code Example 1: Setting Up a Simple Notification Hook

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

## Code Example 2: Creating a Security Protection Hook

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

## Code Example 3: Creating a PostToolUse Hook

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

## Code Example 4: Custom Slash Commands

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

## Code Example 5: A Complete Workflow Configuration

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

## Hands-On Exercises

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

## Quiz (3 Questions)

1. When does a PreToolUse Hook trigger?
   A. When Claude Code starts up
   B. Before Claude Code uses a tool
   C. After Claude Code uses a tool
   D. When Claude Code shuts down
   Answer: B -- PreToolUse triggers before Claude Code uses a tool. You can use it to check for and block unsafe operations.

2. Where should custom Slash Command files be placed?
   A. In the `commands/` folder at the project root
   B. Inside `~/.claude/settings.json`
   C. In the `.claude/commands/` folder at the project root
   D. Inside `node_modules/`
   Answer: C -- Custom commands are `.md` files placed in the project's `.claude/commands/` directory. Each filename becomes the command name.

3. What happens if a PreToolUse Hook script returns `exit 1`?
   A. Claude Code will crash
   B. The tool operation will be blocked and Claude Code won't execute it
   C. Nothing will happen
   D. Claude Code will ignore the Hook and continue
   Answer: B -- When a PreToolUse Hook command returns a non-zero exit code (like exit 1), Claude Code blocks the tool operation. This is the key mechanism for implementing security protections.

## Next Steps

You've now learned how to build a personalised Claude Code working environment! In the next module, **5.3: Team Collaboration Best Practices**, we'll learn how to share these configurations across a team, conduct code reviews, and manage Pull Requests -- making Claude Code a great partner for team collaboration.
