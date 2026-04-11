# Module 9.4: Headless Mode & CI/CD Pipelines

## Learning Objectives
- After completing this lesson you will be able to:
  - Run Claude Code in headless (non-interactive) mode for automation
  - Use CLI flags to control behaviour without human input
  - Integrate Claude Code into GitHub Actions workflows
  - Set up automated code review and documentation generation
  - Apply safety practices for unattended Claude Code execution

## Theory

### What Is Headless Mode?

Normally, Claude Code is interactive — you type a prompt, review the response, approve tool calls, and guide the conversation. **Headless mode** removes the human from the loop.

Think of it like setting an autopilot:
- **Interactive mode** = You're flying the plane, making every decision
- **Headless mode** = You program the destination and the plane flies itself

### Why Use Headless Mode?

| Use Case | Example |
|----------|---------|
| **Automated code review** | Review every PR automatically before human review |
| **Documentation generation** | Generate docs from code changes on every push |
| **Code quality checks** | Scan for security issues, style violations nightly |
| **Release notes** | Auto-generate release notes from git log |
| **Scheduled maintenance** | Run cleanup scripts on a schedule |

### CLI Flags for Headless Mode

| Flag | Purpose | Example |
|------|---------|---------|
| `-p "prompt"` | Run a single prompt and exit | `claude -p "explain main.py"` |
| `--output-format json` | Return structured JSON output | For parsing in scripts |
| `--allowedTools` | Restrict which tools Claude can use | Safety: prevent file writes |
| `--max-turns` | Limit how many steps Claude can take | Prevent runaway execution |
| `--yes` | Auto-approve all tool calls | Use with caution! |

## Code Example 1: Running Claude Code in One-Shot Mode

### Basic one-shot command:

```bash
# Run a single prompt and get the result
claude -p "Read src/main.py and explain what it does in 3 bullet points"
```

[What you should see]
```
+--------------------------------------------------+
| • Main.py is the entry point for the Flask web   |
|   application, initialising the app and routes   |
| • It configures the database connection using    |
|   environment variables from .env                |
| • It starts the development server on port 5000  |
|   with debug mode controlled by DEBUG env var    |
+--------------------------------------------------+
```

### Structured output for scripting:

```bash
# Get JSON output for parsing in another script
claude -p "List all Python files that import 'requests'" --output-format json
```

### Restricted tool usage:

```bash
# Only allow reading files — no editing, no commands
claude -p "Review src/auth.py for security issues" \
  --allowedTools "Read,Grep,Glob"
```

### Limiting execution:

```bash
# Maximum 5 turns — prevents runaway loops
claude -p "Fix the failing test in test_api.py" \
  --max-turns 5
```

## Code Example 2: GitHub Actions Integration

### Auto-review PRs with Claude Code:

Create `.github/workflows/claude-review.yml`:

```yaml
name: Claude Code PR Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Review PR Changes
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Get the diff
          git diff origin/main...HEAD > pr_diff.txt

          # Ask Claude to review
          claude -p "Review this PR diff for:
            1. Potential bugs
            2. Security issues
            3. Code style problems
            Give a brief summary with file:line references.
            
            $(cat pr_diff.txt)" \
            --allowedTools "Read,Grep,Glob" \
            --max-turns 10
```

[What you should see]
```
+--------------------------------------------------+
| On every PR, GitHub Actions:                     |
| 1. Checks out the code                          |
| 2. Installs Claude Code                         |
| 3. Gets the PR diff                             |
| 4. Runs Claude Code to review the changes       |
| 5. Posts the review as a comment (with gh)       |
|                                                  |
| Claude can only Read/Grep/Glob — it cannot       |
| modify any files (safe for automated review).    |
+--------------------------------------------------+
```

### Auto-generate release notes:

```yaml
name: Generate Release Notes
on:
  release:
    types: [created]

jobs:
  notes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Generate Notes
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Read the git log since the last tag and generate 
            release notes in markdown format. Group changes by: 
            Features, Bug Fixes, Improvements. 
            Keep each entry to one line." \
            --allowedTools "Bash,Read" \
            --max-turns 5
```

## Supplementary Example: Scheduled Tasks

### Windows Task Scheduler:

```bash
# Create a scheduled task that runs Claude Code nightly
# to check for security vulnerabilities

# The command to schedule:
claude -p "Scan all Python files for: hardcoded secrets, SQL injection, 
  command injection, and insecure file operations. Report findings." \
  --allowedTools "Read,Grep,Glob" \
  --max-turns 15 \
  --output-format json > security-report.json
```

### Linux/Mac Cron:

```bash
# Add to crontab (crontab -e):
# Run every night at 2 AM
0 2 * * * cd /path/to/project && claude -p "Generate a daily code quality report" \
  --allowedTools "Read,Grep,Glob,Bash" \
  --max-turns 10 >> /var/log/claude-reports.log 2>&1
```

### Safety Checklist for Headless Mode

| Practice | Why |
|----------|-----|
| **Always restrict tools** | Don't give `--yes` + all tools — Claude could delete files |
| **Set max-turns** | Prevents infinite loops that burn tokens |
| **Use read-only tools for reviews** | `Read,Grep,Glob` can't harm your code |
| **Store API keys as secrets** | Never hardcode in workflow files |
| **Review outputs before auto-committing** | Don't let Claude push code without review |
| **Start conservative** | Begin with `--max-turns 3` and increase after testing |
| **Log everything** | Redirect output to files for debugging |

### What Headless Mode Can and Can't Do

| Can Do | Can't Do |
|--------|----------|
| Read and analyse code | Make good judgement calls on ambiguous tasks |
| Generate reports and summaries | Handle interactive prompts (login, 2FA) |
| Run tests and check results | Recover from unexpected errors creatively |
| Apply simple, well-defined fixes | Navigate complex multi-step decisions |
| Search for patterns across codebases | Know when to stop and ask a human |

## Hands-On Exercises

### Exercise 1: Your First Headless Command
1. Navigate to any project directory in your terminal
2. Run: `claude -p "List the 5 most important files in this project and explain why each matters" --max-turns 5`
3. Try adding `--output-format json` and see how the output changes
4. Try restricting tools: `--allowedTools "Read,Glob"`
5. Compare the output with and without restrictions

> Tip: Start with read-only commands (analysis, reports) before moving to commands that modify files. This builds confidence that headless mode behaves predictably.

### Exercise 2: Build a Simple Automation Script
1. Create a bash script called `daily-check.sh`:
   ```bash
   #!/bin/bash
   claude -p "Check for any TODO or FIXME comments in the codebase. 
     List them with file paths and line numbers." \
     --allowedTools "Grep,Glob" \
     --max-turns 5 > todo-report.txt
   echo "Report generated at $(date)" >> todo-report.txt
   ```
2. Make it executable: `chmod +x daily-check.sh`
3. Run it: `./daily-check.sh`
4. Check the output in `todo-report.txt`

> Tip: This is the foundation of CI/CD automation. Once you have a working script, you can schedule it with cron (Linux/Mac) or Task Scheduler (Windows) or add it to GitHub Actions.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What does the flag `claude -p "prompt"` do?</p>
<label><input type="radio" name="q1" value="0"> Opens Claude Code in planning mode</label>
<label><input type="radio" name="q1" value="1"> Sets the project directory for Claude Code</label>
<label><input type="radio" name="q1" value="2"> Runs a single prompt in non-interactive mode and exits</label>
<label><input type="radio" name="q1" value="3"> Saves the prompt to a file for later use</label>
<div class="quiz-explain">The -p flag runs Claude Code in one-shot (headless) mode. It processes the single prompt, outputs the result, and exits — no interactive session, no human input needed. This is the foundation of automation with Claude Code.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. Why should you use `--allowedTools "Read,Grep,Glob"` for automated code reviews?</p>
<label><input type="radio" name="q2" value="0"> These tools are faster than other tools</label>
<label><input type="radio" name="q2" value="1"> Restricting to read-only tools prevents Claude from accidentally modifying code in an unattended process</label>
<label><input type="radio" name="q2" value="2"> Claude Code requires these specific tools for code review</label>
<label><input type="radio" name="q2" value="3"> Other tools are not available in headless mode</label>
<div class="quiz-explain">In automated (unattended) processes, you want Claude to analyse code but not change it. Restricting to read-only tools (Read, Grep, Glob) ensures Claude can examine the codebase without any risk of modifying files, deleting code, or running harmful commands.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>3. What does the `--max-turns` flag prevent?</p>
<label><input type="radio" name="q3" value="0"> Claude from using too many different tools</label>
<label><input type="radio" name="q3" value="1"> Claude from reading files larger than a certain size</label>
<label><input type="radio" name="q3" value="2"> Other users from accessing Claude Code simultaneously</label>
<label><input type="radio" name="q3" value="3"> Runaway execution loops that could burn tokens indefinitely</label>
<div class="quiz-explain">Without --max-turns, Claude could keep iterating indefinitely in headless mode — searching, reading, trying different approaches — consuming tokens with no human to stop it. Setting a limit ensures the process terminates after a reasonable number of steps.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Next Steps

You can now automate Claude Code for unattended tasks. In the final module, **9.5: Docker, Git Worktrees & Security Deep Dive**, we'll cover containerised development, isolated workspaces, and a comprehensive security checklist for AI-assisted coding.
