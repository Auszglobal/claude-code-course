# 7.1 GitHub — Claude Code's Best Partner

## 🎯 Learning Objectives

After completing this module, you will be able to:
- Understand why GitHub is the most important third-party integration for Claude Code
- Use Claude Code to perform everyday Git operations (commit, push, branch, merge)
- Create and manage Pull Requests using the GitHub CLI (`gh`)
- Set up GitHub Actions CI/CD workflows with Claude Code's help
- Follow Git safety best practices that Claude Code enforces automatically

## 📖 Theory Explanation

### Why Is GitHub the Most Important Third-Party Integration?

The relationship between Claude Code and GitHub is like a chef and a kitchen — almost everything revolves around Git/GitHub. If Claude Code is your AI programming assistant, then GitHub is the workspace where all the action happens. You write code, save snapshots of your progress (commits), collaborate with others (pull requests), and deploy your finished product — all through GitHub.

Think of it this way: a painter needs a canvas before they can create art. For developers using Claude Code, GitHub **is** that canvas. Nearly every task you do — from writing a single line of code to deploying a full application — involves Git or GitHub in some way.

```
Claude Code + GitHub = A complete development workflow
```

There are three main ways Claude Code talks to GitHub, and each one serves a different purpose. Understanding these layers will help you see just how deeply the two are connected.

### How Git, GitHub CLI, and GitHub Actions Work Together

Imagine a restaurant kitchen. **Git** is like the chef's knife — the fundamental tool used in every single dish. **GitHub CLI** is like the ordering system that connects the kitchen to the front of house (managing PRs, issues, and reviews). **GitHub Actions** is like the automated dishwasher and prep station — it runs tasks in the background without you having to do them manually.

These three layers work together seamlessly, and Claude Code can operate all of them from a single terminal window.

## Core Integration Methods

### 1. Git Operations (Built-in)

Claude Code directly supports all Git operations:

```bash
# Check what files have changed
git status

# Stage all changed files for commit
git add .

# Save your changes with a descriptive message
git commit -m "Fix login bug"

# Upload your changes to GitHub
git push origin feature-branch

# View the last 10 commits in a compact format
git log --oneline -10
```

You don't need any extra setup — as long as Git is installed on your system, Claude Code can use it. This is the most fundamental integration and the one you will use every single day.

### 2. GitHub CLI (`gh`)

Claude Code makes heavy use of `gh` commands to interact with the GitHub API:

```bash
# Create a Pull Request with a title and description
gh pr create --title "Add search feature" --body "## Change summary..."

# View details of PR number 42
gh pr view 42

# View details of Issue number 15
gh issue view 15

# Check the CI/CD status of a PR
gh pr checks

# View comments on a specific PR via the API
gh api repos/owner/repo/pulls/123/comments
```

The `gh` CLI is like having a remote control for GitHub — you can do almost everything you'd normally do on the GitHub website, but without ever leaving your terminal.

### 3. GitHub Actions (CI/CD)

GitHub Actions are automated workflows that run whenever something happens in your repo (like pushing code or opening a PR). Claude Code can help you:
- Write and debug `.github/workflows/*.yml` files
- Analyze CI failure causes by reading workflow logs
- Set up automated testing and deployment pipelines
- Fix failing tests that block your PR from merging

## 💻 Code Example 1: Creating a Feature Branch and PR

Here is a complete, real-world workflow where you ask Claude Code to help you build a feature from start to finish:

```bash
# Step 1: Create a new branch for your feature
git checkout -b feature/user-search

# Step 2: After Claude Code writes the code for you, stage changes
git add src/search.js src/search.test.js

# Step 3: Commit with a meaningful message
git commit -m "Add user search endpoint with filtering and pagination"

# Step 4: Push the branch to GitHub
git push -u origin feature/user-search

# Step 5: Create a Pull Request using gh CLI
gh pr create \
  --title "Add user search feature" \
  --body "## Summary
- Added GET /api/users/search endpoint
- Supports filtering by name, email, role
- Includes pagination (default 20 per page)

## Test plan
- [x] Unit tests pass
- [ ] Manual QA on staging"
```

### Expected Output:

After running the `gh pr create` command, you should see something like:
```
Creating pull request for feature/user-search into main in owner/my-project

https://github.com/owner/my-project/pull/47
```

This URL is your new Pull Request. You (or your teammates) can now review the code on GitHub.

## 💻 Code Example 2: Automated Code Review with Claude Code

One of the most powerful GitHub integrations is having Claude Code review Pull Requests for you. Here is how it works in practice:

```bash
# Ask Claude Code to review a specific PR
# Claude Code will: fetch the PR, read the diff, and analyze it

# Step 1: Check out the PR locally
gh pr checkout 47

# Step 2: View what files changed
gh pr diff 47

# Step 3: Ask Claude Code to review
# You: "Review this PR for bugs, security issues, and code quality"

# Claude Code will analyze the diff and provide feedback like:
# - "Line 23 in search.js: SQL injection risk — use parameterized queries"
# - "Missing error handling for empty search results"
# - "Consider adding rate limiting to the search endpoint"

# Step 4: After fixing issues, push updates
git add .
git commit -m "Address PR review feedback: add input sanitization and error handling"
git push
```

### Expected Output:

Claude Code will provide a structured review covering:
- Security vulnerabilities (e.g., SQL injection, XSS)
- Logic errors or edge cases
- Code style and best practices
- Suggestions for improvement

This saves hours of manual code review and catches issues that humans often miss.

## Claude Code's GitHub Workflow

### Day-to-Day Development Flow

```
1. Create a feature branch
   → Claude Code: "create a new branch for the search feature"

2. Write code
   → Claude Code: "implement the search API endpoint"

3. Commit changes
   → Claude Code: /commit

4. Create a PR
   → Claude Code: "create a PR for this branch"

5. Code review
   → Claude Code: "review this PR and suggest improvements"

6. Merge
   → Via the GitHub UI or gh pr merge
```

### PR Review Flow

Claude Code can automatically:
- Analyze changes across all commits (not just the latest one)
- Write clear, informative PR titles and descriptions
- Check for security vulnerabilities and common mistakes
- Suggest concrete code improvements with examples

## Security Considerations

Claude Code follows strict Git safety protocols. Think of these as guardrails on a mountain road — they are there to prevent you from accidentally going off a cliff:

| Rule | Description |
|------|-------------|
| Never modify git config | Avoids changing global settings that affect all your projects |
| Never force push | Unless you explicitly ask — force push can erase teammates' work |
| Never skip hooks | `--no-verify` requires your explicit request — hooks catch bugs early |
| Create new commits instead of amend | Avoids overwriting history that others may depend on |
| Never auto-push | Waits for your confirmation before pushing code to GitHub |

These rules exist because Git mistakes can be very hard to undo. Claude Code is deliberately cautious so you stay safe.

## GitHub in Cowork vs Code

| Feature | Claude Code | Claude Cowork |
|---------|-------------|---------------|
| Git operations | Runs directly in terminal | Via GitHub connector |
| PR management | `gh` CLI | Graphical connector |
| Code review | Reads diffs + analyzes | N/A (not development-oriented) |
| CI/CD | Directly edits workflow files | N/A |

## ✍️ Hands-On Exercises

**Exercise 1: Create Your First Repo with Claude Code**

Open Claude Code and type: "Create a new GitHub repo called hello-claude, initialize it with a README and a .gitignore for Node.js, then push it up." Watch as Claude Code runs each step. Verify the repo appears on your GitHub profile at `https://github.com/YOUR_USERNAME/hello-claude`.

> Hint: Make sure you have `gh` installed and authenticated first. Run `gh auth status` to check.

**Exercise 2: The Full PR Workflow**

1. Clone the repo you just created
2. Ask Claude Code: "Create a feature branch called add-homepage, create a simple index.html file, commit it, and open a PR"
3. Then ask Claude Code: "Review the PR you just created and suggest improvements"
4. See how Claude Code gives you feedback, even on your own code!

> Hint: If the PR creation fails, check that your branch has been pushed with `git push -u origin add-homepage` first.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Which tool does Claude Code use to interact with the GitHub API for creating PRs, viewing issues, etc.?</p>
<label><input type="radio" name="q1" value="0"> The GitHub MCP server exclusively</label>
<label><input type="radio" name="q1" value="1"> The GitHub CLI (<code>gh</code>) commands</label>
<label><input type="radio" name="q1" value="2"> Direct HTTP requests to api.github.com</label>
<label><input type="radio" name="q1" value="3"> A built-in GitHub plugin</label>
<div class="quiz-explain">Claude Code makes heavy use of the GitHub CLI (<code>gh</code>) commands to interact with the GitHub API -- creating PRs, viewing issues, checking PR status, and more.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. According to Claude Code's Git safety protocols, what does it do by default instead of amending commits?</p>
<label><input type="radio" name="q2" value="0"> Force pushes the changes</label>
<label><input type="radio" name="q2" value="1"> Skips the commit entirely</label>
<label><input type="radio" name="q2" value="2"> Creates new commits to avoid overwriting history</label>
<label><input type="radio" name="q2" value="3"> Stashes the changes for later</label>
<div class="quiz-explain">Claude Code follows strict safety protocols: it creates new commits instead of amending existing ones, to avoid accidentally overwriting commit history. It also never force pushes or skips hooks unless explicitly asked.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. What is the relationship between GitHub and Claude Code?</p>
<label><input type="radio" name="q3" value="0"> GitHub is the most deeply integrated third-party tool, used in almost every development workflow</label>
<label><input type="radio" name="q3" value="1"> GitHub is an optional plugin that most users don't need</label>
<label><input type="radio" name="q3" value="2"> Claude Code can only read from GitHub but cannot write to it</label>
<label><input type="radio" name="q3" value="3"> GitHub integration requires a paid add-on</label>
<div class="quiz-explain">GitHub is Claude Code's most important third-party integration. Git and GitHub are used in almost every development workflow -- from version control to PRs to code reviews to CI/CD.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. What does the command <code>gh pr checks</code> do?</p>
<label><input type="radio" name="q4" value="0"> It checks out a Pull Request locally</label>
<label><input type="radio" name="q4" value="1"> It validates that your code has no syntax errors</label>
<label><input type="radio" name="q4" value="2"> It creates a new Pull Request with automated checks</label>
<label><input type="radio" name="q4" value="3"> It shows the CI/CD status and test results for a Pull Request</label>
<div class="quiz-explain"><code>gh pr checks</code> displays the status of all CI/CD checks (GitHub Actions workflows, tests, linters, etc.) associated with a Pull Request. This helps you see if your code passes all automated tests before merging.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What is the purpose of GitHub Actions in the Claude Code workflow?</p>
<label><input type="radio" name="q5" value="0"> It replaces Git for version control</label>
<label><input type="radio" name="q5" value="1"> It automates tasks like testing and deployment that run when code is pushed or a PR is opened</label>
<label><input type="radio" name="q5" value="2"> It provides a graphical interface for managing Pull Requests</label>
<label><input type="radio" name="q5" value="3"> It stores your API keys securely in the cloud</label>
<div class="quiz-explain">GitHub Actions is GitHub's CI/CD system. It runs automated workflows (defined in <code>.github/workflows/*.yml</code> files) whenever certain events happen — like pushing code, opening a PR, or merging. Claude Code can write, debug, and manage these workflow files for you.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. Why does Claude Code never force push by default?</p>
<label><input type="radio" name="q6" value="0"> Because force pushing can overwrite teammates' work and erase commit history</label>
<label><input type="radio" name="q6" value="1"> Because GitHub does not support force push</label>
<label><input type="radio" name="q6" value="2"> Because force pushing requires a paid GitHub plan</label>
<label><input type="radio" name="q6" value="3"> Because force pushing is slower than regular push</label>
<div class="quiz-explain">Force push (<code>git push --force</code>) overwrites the remote branch history, which can permanently destroy commits that teammates have based their work on. Claude Code requires your explicit permission before performing this dangerous operation.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. What is the correct first step before using <code>gh</code> commands with Claude Code?</p>
<label><input type="radio" name="q7" value="0"> Install the GitHub MCP server</label>
<label><input type="radio" name="q7" value="1"> Create a GitHub Personal Access Token and paste it into Claude Code</label>
<label><input type="radio" name="q7" value="2"> Install the GitHub CLI and authenticate with <code>gh auth login</code></label>
<label><input type="radio" name="q7" value="3"> Enable GitHub integration in Claude Code's settings panel</label>
<div class="quiz-explain">Before using <code>gh</code> commands, you need to install the GitHub CLI tool and authenticate by running <code>gh auth login</code>. Once authenticated, Claude Code can use all <code>gh</code> commands to interact with your GitHub repos, PRs, and issues.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>8. In the day-to-day development flow, what happens right after Claude Code writes your code?</p>
<label><input type="radio" name="q8" value="0"> The code is automatically deployed to production</label>
<label><input type="radio" name="q8" value="1"> You commit the changes (e.g., using the <code>/commit</code> command)</label>
<label><input type="radio" name="q8" value="2"> Claude Code automatically creates a Pull Request</label>
<label><input type="radio" name="q8" value="3"> The code is sent to a reviewer via email</label>
<div class="quiz-explain">After Claude Code writes your code, the next step is to commit the changes. You can use the <code>/commit</code> slash command or ask Claude Code to commit. After committing, you push the branch and create a PR for review.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Now that you understand how Claude Code works hand-in-hand with GitHub, you are ready to explore another major integration — the Google ecosystem. In **Module 7.2**, we will look at how Claude Code connects to Google Sheets, Gmail, Google Drive, and Google Calendar to automate your data and communication workflows.
