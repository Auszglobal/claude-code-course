# Module 5.1: MCP Servers and External Tools

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand what MCP (Model Context Protocol) is and what it does
  - Explain how MCP servers extend Claude Code's capabilities
  - Set up a simple MCP server and connect it to Claude Code
  - Use MCP tools to access external services (such as databases and file systems)
  - Explore available servers in the MCP ecosystem

## 📖 Theory

### What is MCP?

Imagine you just bought a new phone. The phone itself can make calls and take photos, but its capabilities are limited. Once you install various apps from the App Store -- maps, banking, food delivery -- your phone suddenly becomes incredibly versatile.

**MCP (Model Context Protocol) is like an App Store for Claude Code.**

Claude Code is already powerful on its own -- it can read and write files, run commands, and search code. But through MCP, you can give it "new abilities":

- Connect to databases and query or modify data directly
- Access external APIs and retrieve real-time information
- Work with specialised file systems or cloud storage
- Use professional tools like design software or project management systems

### How MCP Works

MCP's architecture is straightforward. Think of it like a restaurant:

```
You (customer)  ->  Claude Code (waiter)  ->  MCP Server (kitchen)  ->  External Service (ingredient warehouse)
```

1. **You** tell Claude Code what you need (e.g., "Query the orders in the database")
2. **Claude Code** knows there's an MCP tool that can handle this request
3. **The MCP server** receives the request, connects to the database, and fetches the results
4. The results are passed all the way back to you

### Types of MCP Servers

| Type | Analogy | Examples |
|------|---------|----------|
| Database servers | A librarian helping you find books | SQLite, PostgreSQL |
| File system servers | A document manager | Accessing specific directories or cloud files |
| API servers | An interpreter helping you communicate | GitHub, Slack, Google |
| Specialised tool servers | A professional technician | Design tools, deployment services |

## 💻 Code Example 1: Viewing Your Current MCP Configuration

Before installing new MCP servers, let's understand Claude Code's configuration file structure.

In the terminal, type:

```bash
# View the Claude Code global config directory
ls ~/.claude/

# Check if there's already an MCP config file
cat ~/.claude/settings.json
```

[What you should see]
```
+--------------------------------------------------+
| $ ls ~/.claude/                                  |
| CLAUDE.md  settings.json  keybindings.json       |
|                                                  |
| $ cat ~/.claude/settings.json                    |
| {                                                |
|   "permissions": { ... },                        |
|   "hooks": { ... }                               |
| }                                                |
+--------------------------------------------------+
```

MCP servers can be configured in two places:

```bash
# Method 1: Global configuration (available to all projects)
# File location: ~/.claude/settings.json

# Method 2: Project configuration (only available to this project)
# File location: your-project-directory/.claude/settings.json
```

### Expected Output:
You will see the current contents of your config file. If you haven't configured MCP yet, the file might not have an `mcpServers` section -- that's perfectly normal, we're about to add it.

## 💻 Code Example 2: Installing and Configuring an MCP Server

Let's install a practical MCP server -- the **filesystem server**, which allows Claude Code to safely access files in a specified directory.

### Step 1: Install the MCP Server Package

```bash
# Install the filesystem MCP server globally using npm
npm install -g @modelcontextprotocol/server-filesystem
```

### Step 2: Add the MCP Configuration in Claude Code

You can add an MCP server directly using a command in Claude Code:

```bash
# Use the claude command to add an MCP server
# Syntax: claude mcp add <name> <command> [args...]
claude mcp add filesystem npx @modelcontextprotocol/server-filesystem /path/to/your/project
```

On Windows, replace the path with your actual project path:

```bash
# Windows example
claude mcp add filesystem npx @modelcontextprotocol/server-filesystem C:/Users/yourname/Documents/my-project
```

### Step 3: Confirm the Configuration

```bash
# View currently configured MCP servers
claude mcp list
```

[What you should see]
```
+------------------------------------------------------+
| $ claude mcp list                                    |
|                                                      |
| MCP Servers:                                         |
|   filesystem                                         |
|     Command: npx @modelcontextprotocol/server-...    |
|     Status: connected                                |
+------------------------------------------------------+
```

### Step 4: Use It in Claude Code

Now launch Claude Code and you can use the new tool like this:

```
> List all files in the my-project directory

Claude Code will automatically use the filesystem MCP tool to read the directory contents,
rather than relying solely on built-in bash commands.
```

### What the Config File Looks Like

If you're curious what the config file looks like, it will be something like this:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/yourname/Documents/my-project"
      ]
    }
  }
}
```

### Expected Output:
After running `claude mcp list`, you should see the name and status of the server you just added. If the status shows `connected`, everything is working correctly.

## 💻 Supplementary Example: Exploring the MCP Ecosystem

The MCP ecosystem is growing rapidly. Here are some commonly used MCP servers:

| Server Name | Purpose | Install Command |
|-------------|---------|-----------------|
| `server-filesystem` | Secure file system access | `npm i -g @modelcontextprotocol/server-filesystem` |
| `server-github` | Work with GitHub (Issues, PRs) | `npm i -g @modelcontextprotocol/server-github` |
| `server-sqlite` | Query SQLite databases | `npm i -g @modelcontextprotocol/server-sqlite` |
| `server-postgres` | Connect to PostgreSQL databases | `npm i -g @modelcontextprotocol/server-postgres` |
| `server-slack` | Send Slack messages | `npm i -g @modelcontextprotocol/server-slack` |

The installation process is the same for all:

```bash
# Install
npm install -g @modelcontextprotocol/server-sqlite

# Add to Claude Code
claude mcp add sqlite npx @modelcontextprotocol/server-sqlite /path/to/database.db

# Confirm
claude mcp list
```

You can also browse all available MCP servers on this website:
- Official MCP server list: https://github.com/modelcontextprotocol/servers

## ✍️ Hands-On Exercisess

### Exercise 1: Install Your First MCP Server
1. Choose any MCP server from the table above
2. Install it using `npm install -g`
3. Add it to Claude Code using `claude mcp add`
4. Confirm it's connected using `claude mcp list`

> Tip: If you're unsure which one to choose, we recommend starting with `server-filesystem` -- it's the simplest and most practical.

### Exercise 2: Explore MCP Tools
1. After installing an MCP server, launch Claude Code
2. Try asking Claude Code: "What MCP tools do you have available?"
3. Try using an MCP tool to complete a simple task

> Tip: For example, after installing the filesystem server, you can ask Claude Code to help you organise the file structure of a directory.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What does MCP stand for, and what is its main purpose?</p>
<label><input type="radio" name="q1" value="0"> Multi-Code Protocol -- lets multiple code files communicate with each other</label>
<label><input type="radio" name="q1" value="1"> Model Context Protocol -- lets Claude Code connect to external services and tools</label>
<label><input type="radio" name="q1" value="2"> Machine Control Program -- a program that controls computer hardware</label>
<label><input type="radio" name="q1" value="3"> Managed Cloud Platform -- a platform for managing cloud servers</label>
<div class="quiz-explain">MCP stands for Model Context Protocol. Like an App Store, it lets Claude Code install new capabilities, connecting to databases, APIs, and other external services.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. Which command lets you view currently configured MCP servers?</p>
<label><input type="radio" name="q2" value="0"> <code>claude mcp status</code></label>
<label><input type="radio" name="q2" value="1"> <code>claude mcp show</code></label>
<label><input type="radio" name="q2" value="2"> <code>claude mcp list</code></label>
<label><input type="radio" name="q2" value="3"> <code>claude mcp servers</code></label>
<div class="quiz-explain"><code>claude mcp list</code> displays all configured MCP servers and their connection status.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. Where can MCP server configurations be placed?</p>
<label><input type="radio" name="q3" value="0"> Only in the global config (~/.claude/settings.json)</label>
<label><input type="radio" name="q3" value="1"> Only in the project config (project-directory/.claude/settings.json)</label>
<label><input type="radio" name="q3" value="2"> Either global or project config</label>
<label><input type="radio" name="q3" value="3"> Only through environment variables</label>
<div class="quiz-explain">MCP servers can be configured at the global level (shared across all projects) or at the project level (used only by that project), giving you great flexibility.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Great work! You've learned how to extend Claude Code's capabilities. In the next module, **5.2: Custom Workflows and Hooks**, we'll learn how to set up automatic triggers that make Claude Code run actions you define before or after specific operations -- just like setting up smart home automation rules!
