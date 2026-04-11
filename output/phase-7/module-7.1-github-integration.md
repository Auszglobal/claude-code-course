# 7.1 GitHub — Claude Code's Best Partner

## Why Is GitHub the Most Important Third-Party Integration?

The relationship between Claude Code and GitHub is like a chef and a kitchen — almost everything revolves around Git/GitHub.

```
Claude Code + GitHub = A complete development workflow
```

## Core Integration Methods

### 1. Git Operations (Built-in)

Claude Code directly supports all Git operations:

```bash
# Claude Code can run these directly
git status
git add .
git commit -m "Fix login bug"
git push origin feature-branch
git log --oneline -10
```

You don't need any extra setup — as long as Git is installed on your system, Claude Code can use it.

### 2. GitHub CLI (`gh`)

Claude Code makes heavy use of `gh` commands to interact with the GitHub API:

```bash
# Create a Pull Request
gh pr create --title "Add search feature" --body "## Change summary..."

# View PR status
gh pr view 42

# View an Issue
gh issue view 15

# List PR checks
gh pr checks

# View PR comments
gh api repos/owner/repo/pulls/123/comments
```

### 3. GitHub Actions (CI/CD)

Claude Code can help you:
- Write and debug `.github/workflows/*.yml` files
- Analyze CI failure causes
- Set up automated testing and deployment pipelines

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
- Analyze changes across all commits
- Write PR titles and descriptions
- Check for security vulnerabilities
- Suggest code improvements

## Security Considerations

Claude Code follows strict Git safety protocols:

| Rule | Description |
|------|-------------|
| Never modify git config | Avoids changing global settings |
| Never force push | Unless you explicitly ask |
| Never skip hooks | `--no-verify` requires your explicit request |
| Create new commits instead of amend | Avoids overwriting history |
| Never auto-push | Waits for your confirmation before pushing |

## GitHub in Cowork vs Code

| Feature | Claude Code | Claude Cowork |
|---------|-------------|---------------|
| Git operations | Runs directly in terminal | Via GitHub connector |
| PR management | `gh` CLI | Graphical connector |
| Code review | Reads diffs + analyzes | N/A (not development-oriented) |
| CI/CD | Directly edits workflow files | N/A |

## Practical Example

### Creating a Complete GitHub Repo

```
You: "Create a new GitHub repo called my-project,
     initialize it with a README, .gitignore (Node.js),
     then push it up"

Claude Code will:
1. mkdir my-project && cd my-project
2. git init
3. Create README.md and .gitignore
4. git add . && git commit
5. gh repo create my-project --public
6. git push -u origin main
```

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

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Exercises

1. Use Claude Code to create a new GitHub repo
2. Create a feature branch, make some changes, then create a PR
3. Use Claude Code to review an existing PR
