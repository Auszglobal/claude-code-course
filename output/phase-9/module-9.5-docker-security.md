# Module 9.5: Docker, Git Worktrees & Security Deep Dive

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Use Claude Code to create Dockerfiles and docker-compose configurations
  - Understand git worktrees for isolated parallel development
  - Identify common security vulnerabilities in AI-generated code
  - Configure Claude Code's permission system for maximum safety
  - Apply a security checklist before deploying AI-assisted code

## 📖 Theory

### Part 1: Docker with Claude Code

#### What Is Docker?

Imagine shipping a product internationally. Without a standard shipping container, every port needs different equipment. With standard containers, any ship and any crane can handle the cargo.

**Docker does the same for software.** It packages your app with all its dependencies into a standard "container" that runs identically on any machine — your laptop, your colleague's Mac, or a cloud server.

```
Without Docker:
"It works on my machine!" → "It crashes on the server"

With Docker:
"It works in the container" → "It works everywhere the container runs"
```

#### Why Use Docker with Claude Code?

| Benefit | Description |
|---------|-------------|
| **Consistency** | Same environment for development and production |
| **Safety** | Break the container, not your machine |
| **Reproducibility** | Anyone can run your app with one command |
| **Isolation** | Different projects can use different Python/Node versions |

### Part 2: Git Worktrees

#### What Are Worktrees?

A git worktree is a **second (or third, or fourth) working directory** from the same repository. Each worktree can be on a different branch, with different files checked out.

```
Your repo: my-project/
├── main worktree (main branch)     ← your normal working directory
├── worktree-2 (feature-auth)       ← working on auth feature
└── worktree-3 (fix-bug-123)        ← fixing a bug simultaneously
```

All worktrees share the same git history. Changes committed in any worktree are visible to all.

#### Why Worktrees Matter for Claude Code

Claude Code can use worktrees to:
- **Try experimental approaches** without risking your working directory
- **Run sub-agents** in isolated copies of the repo
- **Compare implementations** side by side

### Part 3: Security Deep Dive

#### AI-Generated Code Needs Review

Claude Code writes excellent code, but all code — human or AI-generated — should be reviewed before deployment. AI can introduce subtle security issues:

| Risk | Example |
|------|---------|
| **SQL Injection** | Using f-strings in SQL instead of parameterised queries |
| **Command Injection** | Passing user input to `os.system()` without sanitisation |
| **Hardcoded Secrets** | Putting API keys directly in code instead of env vars |
| **Insecure Dependencies** | Using outdated packages with known vulnerabilities |
| **Overly Permissive Access** | Creating API endpoints without authentication checks |

## 💻 Code Example 1: Docker with Claude Code

### Creating a Dockerfile:

```bash
> Create a Dockerfile for our Python Flask app. It uses Python 3.11, 
  has requirements.txt for dependencies, and runs on port 5000.
```

[What you should see]
```
+--------------------------------------------------+
| Claude creates Dockerfile:                       |
|                                                  |
| FROM python:3.11-slim                            |
|                                                  |
| WORKDIR /app                                     |
|                                                  |
| COPY requirements.txt .                          |
| RUN pip install --no-cache-dir -r requirements.txt|
|                                                  |
| COPY . .                                         |
|                                                  |
| EXPOSE 5000                                      |
|                                                  |
| CMD ["python", "app.py"]                         |
+--------------------------------------------------+
```

### Creating docker-compose for app + database:

```bash
> Create a docker-compose.yml that runs our Flask app and a PostgreSQL 
  database. The app should connect to the database using environment 
  variables. Include a volume for persistent data.
```

Claude creates a complete docker-compose.yml with proper networking, environment variables, and volumes.

### Common Docker commands Claude Code helps with:

```bash
# Build and run
> Build and run the Docker container for our app

# Debug container issues
> The Docker container starts but the app crashes immediately. 
  Check the logs and fix the issue.

# Optimise image size
> Our Docker image is 1.2GB. Optimise the Dockerfile to reduce 
  the image size using multi-stage builds.
```

## 💻 Code Example 2: Security Configuration

### Claude Code's Permission System:

```bash
# When Claude wants to run a command, you see:
┌──────────────────────────────────────────┐
│ Claude wants to run: rm -rf /tmp/cache   │
│                                          │
│ [Allow] [Deny] [Allow Always]            │
└──────────────────────────────────────────┘
```

Three options:
- **Allow** — Approve this one time
- **Deny** — Block this action
- **Allow Always** — Auto-approve this tool going forward (use carefully!)

### Configuring Safety Rules in settings.json:

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Grep",
      "Glob"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(DROP TABLE)",
      "Write(*.env)"
    ]
  }
}
```

### Setting Up Security Hooks:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "command": "echo '$FILE_PATH' | grep -q '\\.env$' && echo 'BLOCKED: Cannot write .env files' && exit 1 || exit 0"
      },
      {
        "matcher": "Bash",
        "command": "echo '$COMMAND' | grep -qi 'git push.*--force' && echo 'BLOCKED: Force push not allowed' && exit 1 || exit 0"
      }
    ]
  }
}
```

[What you should see]
```
+--------------------------------------------------+
| With these hooks configured:                     |
|                                                  |
| > Write to .env file                             |
| ❌ BLOCKED: Cannot write .env files              |
|                                                  |
| > git push --force origin main                   |
| ❌ BLOCKED: Force push not allowed               |
|                                                  |
| > Write to src/app.py                            |
| ✅ Allowed (not a .env file)                     |
+--------------------------------------------------+
```

## 💻 Supplementary Example: Security Checklist

### Before Deploying AI-Generated Code:

#### 1. Check for Injection Vulnerabilities

```python
# ❌ SQL Injection — NEVER do this
cursor.execute(f"SELECT * FROM users WHERE name = '{user_input}'")

# ✅ Parameterised query — ALWAYS do this
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))
```

```python
# ❌ Command Injection — NEVER do this
os.system(f"ping {user_input}")

# ✅ Use subprocess with list arguments
subprocess.run(["ping", user_input], capture_output=True)
```

#### 2. Check for Hardcoded Secrets

```bash
# Ask Claude to scan for secrets
> Search the codebase for any hardcoded API keys, passwords, 
  tokens, or secrets. Check all file types including config files.
```

#### 3. Check Dependencies

```bash
# Ask Claude to audit dependencies
> Check requirements.txt for any packages with known security 
  vulnerabilities. Suggest updates where needed.
```

#### 4. Review Git History

```bash
# Check if secrets were accidentally committed
> Search the git history for any commits that might have 
  included .env files, credentials, or API keys.
```

### Git Worktree Quick Reference

```bash
# Create a new worktree
git worktree add ../my-feature feature-branch

# List all worktrees
git worktree list

# Remove a worktree
git worktree remove ../my-feature

# Prune stale worktrees
git worktree prune
```

### The Security Review Mindset

```
For every change Claude makes, ask:

1. INPUT:  Does this accept user input? Is it sanitised?
2. OUTPUT: Does this expose sensitive data? Are errors too verbose?
3. ACCESS: Does this check permissions? Can unauthorised users reach it?
4. DEPS:   Are dependencies up to date? From trusted sources?
5. STATE:  Can this corrupt data if it fails halfway?
```

## ✍️ Hands-On Exercisess

### Exercise 1: Dockerise a Project
1. Choose a simple project (Python, Node, or any language)
2. Ask Claude Code: "Create a Dockerfile for this project"
3. Build it: `docker build -t my-app .`
4. Run it: `docker run -p 5000:5000 my-app`
5. Verify it works the same as running locally
6. Ask Claude to add a docker-compose.yml with a database

> Tip: If you don't have Docker installed, ask Claude Code to walk you through the installation for your operating system. Docker Desktop is the easiest way to get started.

### Exercise 2: Security Audit
1. Open any project you've been working on
2. Ask Claude Code: "Perform a security audit of this codebase. Check for: SQL injection, command injection, hardcoded secrets, XSS vulnerabilities, and insecure file handling."
3. Review Claude's findings
4. For each issue found, ask Claude to fix it
5. Verify the fixes don't break any existing functionality

> Tip: Even if Claude doesn't find critical issues, this exercise builds the habit of security reviews. The checklist in the supplementary example above is something you should run before every deployment.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is the main benefit of using Docker with your projects?</p>
<label><input type="radio" name="q1" value="0"> It makes your code run faster</label>
<label><input type="radio" name="q1" value="1"> It ensures your app runs the same way on any machine</label>
<label><input type="radio" name="q1" value="2"> It automatically fixes security vulnerabilities</label>
<label><input type="radio" name="q1" value="3"> It replaces the need for version control</label>
<div class="quiz-explain">Docker's main benefit is consistency — your app runs in the same environment everywhere. "It works on my machine" becomes "it works in the container" which means it works on every machine that runs Docker.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What is the correct way to handle user input in SQL queries?</p>
<label><input type="radio" name="q2" value="0"> Use f-strings to insert values directly into the query</label>
<label><input type="radio" name="q2" value="1"> Escape special characters manually with string replacement</label>
<label><input type="radio" name="q2" value="2"> Use parameterised queries with placeholders (%s or ?)</label>
<label><input type="radio" name="q2" value="3"> Convert all input to integers before using in queries</label>
<div class="quiz-explain">Parameterised queries (using %s or ? placeholders) let the database engine handle escaping, preventing SQL injection attacks. Never use f-strings or string concatenation to build SQL queries with user input.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. What should you do before deploying code that Claude Code generated?</p>
<label><input type="radio" name="q3" value="0"> Review the code for security issues, test it, and check for hardcoded secrets</label>
<label><input type="radio" name="q3" value="1"> Deploy it immediately — AI-generated code is always secure</label>
<label><input type="radio" name="q3" value="2"> Only check that it compiles without errors</label>
<label><input type="radio" name="q3" value="3"> Ask a different AI to review it</label>
<div class="quiz-explain">All code — whether written by humans or AI — needs security review before deployment. Check for injection vulnerabilities, hardcoded secrets, proper access controls, and test that it works correctly. AI-generated code is generally high quality but not infallible.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>4. What is a git worktree?</p>
<label><input type="radio" name="q4" value="0"> A visualisation of the git commit history</label>
<label><input type="radio" name="q4" value="1"> A second working directory from the same repository, allowing you to work on different branches simultaneously</label>
<label><input type="radio" name="q4" value="2"> A backup of your git repository</label>
<label><input type="radio" name="q4" value="3"> A tool for merging branches</label>
<div class="quiz-explain">A git worktree creates a separate working directory linked to the same repository. You can have multiple worktrees on different branches, allowing parallel development without stashing or switching branches in your main directory.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. In a Dockerfile, why should you <code>COPY requirements.txt</code> and run <code>pip install</code> BEFORE <code>COPY . .</code>?</p>
<label><input type="radio" name="q5" value="0"> Docker caches each layer — if requirements.txt hasn't changed, pip install is skipped on rebuild, saving time</label>
<label><input type="radio" name="q5" value="1"> It's required by Docker syntax</label>
<label><input type="radio" name="q5" value="2"> It makes the container start faster</label>
<label><input type="radio" name="q5" value="3"> It reduces the image size</label>
<div class="quiz-explain">Docker builds images in layers. By copying requirements.txt first, the pip install layer is cached. When you change your code but not dependencies, Docker reuses the cached pip install layer instead of reinstalling everything, dramatically speeding up builds.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>6. What security question should you ask about every piece of code that accepts user input?</p>
<label><input type="radio" name="q6" value="0"> Is the input in English?</label>
<label><input type="radio" name="q6" value="1"> Is the input less than 100 characters?</label>
<label><input type="radio" name="q6" value="2"> Does the input contain numbers?</label>
<label><input type="radio" name="q6" value="3"> Is the input sanitised before being used in queries, commands, or HTML output?</label>
<div class="quiz-explain">Unsanitised user input is the root cause of most security vulnerabilities: SQL injection, command injection, and XSS attacks. Always validate and sanitise input before using it in database queries, system commands, or web page output.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. When Claude Code shows a permission prompt [Allow] [Deny] [Allow Always], when should you use "Allow Always"?</p>
<label><input type="radio" name="q7" value="0"> Always — it speeds up your workflow</label>
<label><input type="radio" name="q7" value="1"> Never — it's a dangerous feature</label>
<label><input type="radio" name="q7" value="2"> Only for safe, routine operations you're comfortable auto-approving (like reading files)</label>
<label><input type="radio" name="q7" value="3"> Only when working in a Docker container</label>
<div class="quiz-explain">"Allow Always" auto-approves that specific tool call in future. It's safe for read operations, but use caution with write operations or bash commands. You can always configure more granular permissions in settings.json.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>8. What command would you use to list all git worktrees in your repository?</p>
<label><input type="radio" name="q8" value="0"> <code>git branch --worktrees</code></label>
<label><input type="radio" name="q8" value="1"> <code>git worktree list</code></label>
<label><input type="radio" name="q8" value="2"> <code>git status --worktrees</code></label>
<label><input type="radio" name="q8" value="3"> <code>git log --worktrees</code></label>
<div class="quiz-explain"><code>git worktree list</code> shows all worktrees associated with your repository, including their paths and the branches they're checked out on. Use <code>git worktree add</code> to create new ones and <code>git worktree remove</code> to clean them up.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Congratulations — you've completed Phase 9: Production! You now have the skills to use Claude Code professionally: parallel execution with sub-agents, architectural planning, database operations, CI/CD automation, Docker containerisation, and security best practices.

Combined with the earlier phases, you have a complete toolkit for AI-powered software development. Keep practising, keep reviewing, and keep building!
