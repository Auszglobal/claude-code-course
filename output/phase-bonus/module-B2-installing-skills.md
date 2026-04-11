# Module B2: Installing Skills -- 3 Methods

## Learning Objectives

- After completing this lesson you will be able to:
  - Install Skills with a single `npx` command (the easiest method)
  - Manually download and copy Skill files to the correct location (the most reliable method)
  - Install Skills using Claude Code's plugin command
  - Verify whether a Skill was installed successfully
  - Understand the path differences between Windows and Mac

---

## Theory

### Where Are Skills Installed?

In the previous lesson, we learned that Claude Code scans a specific folder for Skills when it starts up. This folder's location varies by operating system:

| Operating System | Skills Folder Path |
|-----------------|-------------------|
| **Windows** | `C:\Users\your-username\.claude\skills\` |
| **Mac** | `/Users/your-username/.claude/skills/` |
| **Linux** | `/home/your-username/.claude/skills/` |

Each Skill is typically a **subfolder** containing a `SKILL.md` file and possibly accompanying resources:

```
.claude/
└── skills/
    ├── tdd/
    │   └── SKILL.md
    ├── frontend-design/
    │   └── SKILL.md
    └── better-commits/
        └── SKILL.md
```

### Overview of the Three Installation Methods

| Method | Difficulty | Best For | Pros | Cons |
|--------|-----------|----------|------|------|
| **npx command** | Easiest | Day-to-day use | One command does it all | Requires Node.js |
| **Manual copy** | Medium | Windows users / network issues | Most reliable and transparent | More steps involved |
| **plugin command** | Easy | Working within Claude Code | No need to leave Claude Code | Newer feature |

Let's learn each method one by one!

---

## Code Example 1: Method 1 -- npx Installation (Recommended)

`npx` is a tool that comes with Node.js and can run installation scripts directly from the internet. If you already have Node.js installed (which you should have from Module 1.2), you can use this method.

### Prerequisites Check

First, confirm you have Node.js and npx:

**Windows (in Git Bash or PowerShell):**
```bash
# Check if Node.js is installed
node --version

# Check if npx is available
npx --version
```

**Mac (in Terminal):**
```bash
# Check if Node.js is installed
node --version

# Check if npx is available
npx --version
```

[You should see output similar to this]
```
+-----------------------------+
| $ node --version            |
| v20.11.0                    |
|                             |
| $ npx --version             |
| 10.2.4                      |
+-----------------------------+
```

> If you see "command not found", go back to Module 1.2 to install Node.js.

### Installing Official Skills

The following command installs a specified Skill from the official Anthropic repository:

```bash
# Install Anthropic's official frontend-design Skill
npx skills add anthropics/claude-code --skill frontend-design
```

Let's break down this command:

| Part | Meaning |
|------|---------|
| `npx` | Use the Node.js command runner |
| `skills` | Call the skills installation tool |
| `add` | Action: add a new Skill |
| `anthropics/claude-code` | Source: Anthropic's GitHub repository |
| `--skill frontend-design` | Specify which Skill to install |

[Successful installation screen]
```
+--------------------------------------------------+
| $ npx skills add anthropics/claude-code          |
|          --skill frontend-design                 |
|                                                  |
| Fetching skill from anthropics/claude-code...    |
| Installing frontend-design...                    |
| Skill installed to ~/.claude/skills/             |
|   frontend-design                                |
|                                                  |
| Skill is ready to use! Restart Claude Code       |
| to activate.                                     |
+--------------------------------------------------+
```

### Installing Community Skills

Community developers also share Skills they've written. One of the most popular is `obra/superpowers`:

```bash
# Install obra/superpowers -- a collection of Skills that enhance Claude Code's abilities
npx skills add obra/superpowers
```

### Installing a Curated Skills Collection

Some tools will install multiple recommended Skills at once:

```bash
# Install a curated set of awesome skills
npx antigravity-awesome-skills --claude
```

### Viewing Installed Skills

```bash
# List all installed Skills
npx skills list
```

[Listing installed Skills]
```
+--------------------------------------------------+
| $ npx skills list                                |
|                                                  |
| Installed Skills:                                |
|                                                  |
|  1. frontend-design                              |
|     Source: anthropics/claude-code                |
|     Path: ~/.claude/skills/frontend-design       |
|                                                  |
|  2. tdd                                          |
|     Source: obra/superpowers                      |
|     Path: ~/.claude/skills/tdd                   |
|                                                  |
|  3. better-commits                               |
|     Source: obra/superpowers                      |
|     Path: ~/.claude/skills/better-commits        |
|                                                  |
| Total: 3 skills installed                        |
+--------------------------------------------------+
```

### Expected Output:

After installation, your `~/.claude/skills/` folder will contain new subfolders, each with a SKILL.md file. The next time you start Claude Code, it will automatically detect and load these Skills.

---

## Code Example 2: Method 2 -- Manual Copy (Most Reliable on Windows)

If npx has issues (network restrictions, version conflicts, etc.), manual copying is the most reliable method. This approach gives you complete control over what gets installed.

### Windows Steps (PowerShell)

Step by step, with explanations for each command:

```powershell
# Step 1: Create the skills folder (if it doesn't already exist)
# The -Force parameter means "skip without error if it already exists"
mkdir C:\Users\kin\.claude\skills -Force
```

[Step 1 output]
```
+--------------------------------------------------+
| PS> mkdir C:\Users\kin\.claude\skills -Force     |
|                                                  |
|     Directory: C:\Users\kin\.claude              |
|                                                  |
| Mode       LastWriteTime    Length Name           |
| ----       -------------    ------ ----           |
| d-----     2026/04/11       skills               |
+--------------------------------------------------+
```

```powershell
# Step 2: Download a community Skills repository
# First, switch to a temporary working directory
cd C:\Users\kin\Downloads

# Use git to download the obra/superpowers repository
git clone https://github.com/obra/superpowers.git
```

[Step 2 output]
```
+--------------------------------------------------+
| PS> git clone https://github.com/obra/           |
|     superpowers.git                              |
|                                                  |
| Cloning into 'superpowers'...                    |
| remote: Enumerating objects: 156, done.          |
| remote: Counting objects: 100% (156/156), done.  |
| Receiving objects: 100% (156/156), 45.2 KiB,     |
| done.                                            |
+--------------------------------------------------+
```

```powershell
# Step 3: Enter the downloaded folder and see which Skills are available
cd superpowers
dir skills
```

[Step 3 output -- viewing available Skills]
```
+--------------------------------------------------+
| PS> dir skills                                   |
|                                                  |
|     Directory: C:\Users\kin\Downloads\            |
|                superpowers\skills                |
|                                                  |
| Mode       LastWriteTime    Name                 |
| ----       -------------    ----                 |
| d-----     2026/04/10       tdd                  |
| d-----     2026/04/10       better-commits       |
| d-----     2026/04/10       code-review          |
| d-----     2026/04/10       refactor             |
+--------------------------------------------------+
```

```powershell
# Step 4: Copy the Skill you want to Claude's skills folder
# /E = copy subfolders (including empty ones)
# /I = automatically create the destination if it doesn't exist
xcopy skills\tdd C:\Users\kin\.claude\skills\tdd /E /I
```

[Step 4 output]
```
+--------------------------------------------------+
| PS> xcopy skills\tdd                             |
|     C:\Users\kin\.claude\skills\tdd /E /I        |
|                                                  |
| skills\tdd\SKILL.md                              |
| 1 File(s) copied                                 |
+--------------------------------------------------+
```

```powershell
# Step 5: Confirm the installation was successful
dir C:\Users\kin\.claude\skills\
```

[Final confirmation screen]
```
+--------------------------------------------------+
| PS> dir C:\Users\kin\.claude\skills\             |
|                                                  |
|     Directory: C:\Users\kin\.claude\skills       |
|                                                  |
| Mode       LastWriteTime    Name                 |
| ----       -------------    ----                 |
| d-----     2026/04/11       tdd                  |
|                                                  |
| Success! The tdd Skill has been installed.       |
+--------------------------------------------------+
```

### Mac Steps (Terminal)

Mac users can use the following commands:

```bash
# Step 1: Create the skills folder
mkdir -p ~/.claude/skills

# Step 2: Download the Skills repository
cd ~/Downloads
git clone https://github.com/obra/superpowers.git

# Step 3: View available Skills
ls superpowers/skills/

# Step 4: Copy the Skill you want
# -r means recursive copy (includes all files in the folder)
cp -r superpowers/skills/tdd ~/.claude/skills/

# Step 5: Confirm the installation was successful
ls ~/.claude/skills/
```

> **Windows vs Mac Differences:**
> - Windows uses `xcopy ... /E /I` or `Copy-Item -Recurse`
> - Mac uses `cp -r`
> - Windows paths use `\` (backslash), Mac uses `/` (forward slash)
> - Windows home directory is `C:\Users\your-name\`, Mac is `/Users/your-name/` or the shorthand `~/`

---

## Code Example 3: Method 3 -- Claude Code Plugin Command

The latest version of Claude Code supports managing Skills directly in the conversation, without needing to leave the Claude Code environment.

### Installing from the Marketplace

Type directly in the Claude Code conversation:

```
/plugin marketplace add anthropics/skills
```

This opens an interactive menu where you can browse and select Skills to install.

[Plugin Marketplace screen]
```
+--------------------------------------------------+
| > /plugin marketplace add anthropics/skills      |
|                                                  |
| Available Skills from anthropics/skills:         |
|                                                  |
|  [ ] frontend-design  - Build UI components      |
|  [ ] tdd              - Test-driven development  |
|  [ ] code-review      - Structured code reviews  |
|  [ ] api-design       - RESTful API design       |
|                                                  |
| Use arrow keys to select, Enter to install       |
+--------------------------------------------------+
```

### Installing a Local Skill

If you've written your own Skill (we'll learn how in a later module), you can install it directly from a local path:

**Windows:**
```
/plugin add C:\Users\kin\my-skills\my-custom-skill
```

**Mac:**
```
/plugin add /Users/yourname/my-skills/my-custom-skill
```

### Viewing and Managing Installed Skills

```
/plugin list
```

[Viewing installed Skills]
```
+--------------------------------------------------+
| > /plugin list                                   |
|                                                  |
| Installed plugins & skills:                      |
|                                                  |
|  1. tdd (skill)                                  |
|     Status: Active                               |
|     Source: obra/superpowers                      |
|                                                  |
|  2. frontend-design (skill)                      |
|     Status: Active                               |
|     Source: anthropics/claude-code                |
|                                                  |
| Total: 2 active skills                           |
+--------------------------------------------------+
```

### Expected Output:

Regardless of which method you use, the end result is the same: SKILL.md files will appear in the `~/.claude/skills/` folder. You can always use the last step from Method 2 (listing the folder contents) to confirm.

---

## Post-Installation Verification Checklist

No matter which method you used, follow these steps to confirm the installation was successful:

### Step 1: Check That the File Exists

**Windows (PowerShell):**
```powershell
# List all installed Skills
dir C:\Users\kin\.claude\skills\ -Recurse -Filter "SKILL.md"
```

**Mac (Terminal):**
```bash
# List all installed Skills
find ~/.claude/skills -name "SKILL.md"
```

### Step 2: View the Skill Contents

**Windows:**
```powershell
# View the contents of a Skill (using tdd as an example)
type C:\Users\kin\.claude\skills\tdd\SKILL.md
```

**Mac:**
```bash
cat ~/.claude/skills/tdd/SKILL.md
```

### Step 3: Restart Claude Code

Skills are scanned when Claude Code **starts up**, so you need to restart after installing a new Skill:

```bash
# Exit Claude Code first (type exit or press Ctrl+C)
exit

# Restart
claude
```

[After restarting, Claude Code will show detected Skills]
```
+--------------------------------------------------+
| Claude Code v1.x                                 |
|                                                  |
| Loaded skills: tdd, frontend-design              |
| Type your request...                             |
|                                                  |
| >                                                |
+--------------------------------------------------+
```

---

## Common Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Skill not detected | File in the wrong location | Confirm SKILL.md is at `~/.claude/skills/skill-name/SKILL.md` |
| npx command fails | Node.js version too old | Update to Node.js 18 or above |
| git clone fails | Network issue or Git not installed | Confirm `git --version` works |
| Windows path error | Used forward slashes `/` | Use backslashes `\` in Windows PowerShell |
| Permission denied (Mac) | Folder permission issue | Prefix the command with `sudo`: `sudo cp -r ...` |

---

## Hands-On Exercises

### Exercise 1: Install Your First Skill

Choose whichever of the three methods above suits you best, and install any Skill from `obra/superpowers`.

When done, verify with:

**Windows:**
```powershell
dir C:\Users\kin\.claude\skills\ 
```

**Mac:**
```bash
ls ~/.claude/skills/
```

> Hint: If you're a complete beginner, we recommend **Method 2 (manual copy)** because you can clearly see what's happening at every step.

### Exercise 2: Read an Installed SKILL.md

Find the SKILL.md file you just installed and open it with any text editor (Notepad, VS Code, TextEdit -- anything works). Answer these questions:

1. What is this Skill's `name`?
2. What `triggers` does it have?
3. How many main rules does it contain?

> Hint: If you use VS Code, you can type `code ~/.claude/skills/tdd/SKILL.md` in the terminal to open the file directly.

---

## Quiz (3 Questions)

**1. On Windows, where are Claude Code Skills installed by default?**

A. `C:\Program Files\Claude\skills\`  
B. `C:\Users\your-username\.claude\skills\`  
C. `C:\Claude Code\plugins\skills\`  
D. `C:\Users\your-username\AppData\claude\skills\`  

Answer: **B** -- Skills are installed in the `.claude/skills/` folder under the user's home directory. `.claude` is a hidden folder (prefixed with `.`) that contains all of Claude Code's configuration and resources.

---

**2. Which installation method doesn't require leaving the Claude Code environment?**

A. `npx skills add`  
B. Manual `git clone` + `xcopy`  
C. `/plugin marketplace add`  
D. Downloading and extracting a ZIP file  

Answer: **C** -- The `/plugin` command is used directly within Claude Code's conversation interface, without needing to switch to a terminal or other tool. Method 1 (npx) and Method 2 (manual) both require terminal access.

---

**3. Why do you need to restart Claude Code after installing a new Skill?**

A. Because the Skill needs to be compiled before it can run  
B. Because Claude Code only scans the skills folder at startup  
C. Because the Skill's latest version needs to be re-downloaded  
D. Because the Skill requires online verification to activate  

Answer: **B** -- Claude Code is designed to scan the `~/.claude/skills/` folder at startup, loading all Skill metadata (names and short descriptions). If you add a new Skill while it's running, you need to restart so Claude Code can scan again.

---

## Next Steps

Congratulations on learning how to install Skills! In the upcoming modules, we'll learn **how to write your own Skill** -- you'll discover that customising a Skill for your specific workflow can multiply Claude Code's efficiency several times over. See you there!
