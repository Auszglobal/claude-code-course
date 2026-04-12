# Module 5.3: Team Collaboration Best Practices

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand the difference between global and project-level CLAUDE.md configurations
  - Use Claude Code to conduct code reviews
  - Create and manage Pull Requests through Claude Code
  - Plan a branching strategy for your team's use of Claude Code
  - Understand permission modes and security considerations

## 📖 Theory

### Claude Code in a Team Setting

Imagine a kitchen with multiple chefs cooking together. If everyone grabs ingredients at random and adds seasoning however they like, the kitchen will quickly descend into chaos. But if everyone follows the same recipe and adheres to the same standards, they can collaborate to produce a delicious meal.

**Claude Code's role in a team is like a shared recipe and set of kitchen standards.**

With proper configuration, everyone on the team can:
- Use the same code style and conventions
- Automate repetitive review processes
- Safely merge their individual work

### The Two Levels of CLAUDE.md

| Level | File Location | Who Can See It | Purpose |
|-------|--------------|----------------|---------|
| **Global** | `~/.claude/CLAUDE.md` | Only you | Personal preferences, private API key reminders |
| **Project** | `your-project/CLAUDE.md` | Entire team (committed to Git) | Project conventions, code style, collaboration rules |

Key concept: **The project-level CLAUDE.md should be committed to Git**, so that every team member's Claude Code reads the same instructions.

## 💻 Code Example 1: Creating a Shared Team CLAUDE.md

Let's create a comprehensive CLAUDE.md for a team project:

```bash
# Create CLAUDE.md in the project root directory
cd ~/my-team-project
```

Here's a CLAUDE.md template suitable for team use:

```markdown
# Project Name -- Claude Code Team Guide

## Project Overview
This is an online store project using a React frontend + Node.js backend.

## Code Style Conventions
- Use TypeScript; the `any` type is forbidden
- Variable naming uses camelCase
- File naming uses kebab-case (e.g., user-profile.tsx)
- Every function must have a JSDoc comment
- Maximum line width is 100 characters

## Git Conventions
- Branch naming: feature/feature-name, fix/fix-name, chore/task-name
- Commit message format: type(scope): description
- Never push directly to the main branch
- All changes must go through a Pull Request

## Prohibited Actions
- Do not modify .env or .env.local files
- Do not delete package-lock.json
- Do not install unapproved dependencies
- Do not commit node_modules/

## Testing Requirements
- New features must have corresponding tests
- Write a failing test before fixing a bug
- Test files go in the __tests__/ directory

## Deployment Process
1. Confirm all tests pass: npm test
2. Create a Pull Request to the main branch
3. At least one team member must approve the review
4. Merged changes are deployed automatically (CI/CD)
```

Commit this file to Git:

```bash
# Add CLAUDE.md to Git version control
git add CLAUDE.md

# Commit
git commit -m "docs: add team CLAUDE.md for Claude Code collaboration"

# Push to remote
git push
```

### Expected Output:
After every team member pulls the latest code, their Claude Code will automatically follow the conventions defined in CLAUDE.md.

## 💻 Code Example 2: Using Claude Code for Code Reviews

Claude Code can help you review other people's code. Here's the complete review workflow:

### Step 1: Get the Pull Request to Review

```bash
# View the list of currently open Pull Requests
gh pr list

# View details for a specific PR (e.g., PR #42)
gh pr view 42
```

[What you should see]
```
+-------------------------------------------------------+
| $ gh pr list                                          |
|                                                       |
| #42  Add user registration    feature/user-reg   OPEN |
| #41  Fix login issue          fix/login-bug      OPEN |
| #40  Update documentation     chore/update-docs  OPEN |
+-------------------------------------------------------+
```

### Step 2: Review in Claude Code

```bash
# First, check out the PR branch
gh pr checkout 42
```

Then in Claude Code:

```
> Please review all the changes in this Pull Request.
  Check the following:
  1. Whether the code quality and style follow the CLAUDE.md conventions
  2. Whether there are potential bugs or security issues
  3. Whether test coverage is sufficient
  4. Whether variable names are clear
  Please list all issues found and improvement suggestions.
```

Claude Code will automatically:
1. Read the team conventions from CLAUDE.md
2. Review all modified files in the PR
3. Check each one against the conventions
4. Produce a structured review report

### Step 3: Submit Review Comments via CLI

```bash
# Leave review comments directly on the PR
gh pr review 42 --comment --body "Code review complete.

## Issues Found
1. user-service.ts line 45 is missing error handling
2. register.test.ts needs additional edge case tests

## Suggestions
- Consider extracting the validation logic into a separate validator module

Overall code quality is good! Ready to merge once the above issues are fixed."
```

### Expected Output:
Your review comments will appear on the PR page, and team members can see and respond to them.

## 💻 Code Example 3: Creating a Pull Request with Claude Code

Let's walk through the complete process from creating a branch to submitting a PR:

```bash
# Step 1: Create a new branch from main
git checkout main           # Switch back to the main branch
git pull                    # Make sure it's up to date
git checkout -b feature/add-search   # Create a feature branch
```

After completing your feature development in Claude Code:

```bash
# Step 2: Commit your changes
git add src/components/SearchBar.tsx src/hooks/useSearch.ts
git commit -m "feat(search): add search bar component with debounced input"
```

```bash
# Step 3: Push to remote
git push -u origin feature/add-search
```

```bash
# Step 4: Create a Pull Request using gh
gh pr create \
  --title "feat: add search functionality" \
  --body "## Summary
- Added SearchBar component with debounced input
- Created useSearch custom hook for search logic
- Added unit tests for search functionality

## Test Plan
- [ ] Manual testing: search bar renders correctly
- [ ] Unit tests pass: npm test
- [ ] No console errors in browser

## Screenshots
N/A (text-based component)"
```

[What you should see]
```
+---------------------------------------------------+
| $ gh pr create ...                                |
|                                                   |
| Creating pull request for feature/add-search      |
|   into main in your-org/your-repo                 |
|                                                   |
| https://github.com/your-org/your-repo/pull/43     |
+---------------------------------------------------+
```

### Expected Output:
The command will output the URL of the newly created PR, which you can open in a browser to view.

## 💻 Code Example 4: Branching Strategy and Permission Control

### Recommended Team Branching Strategy

```
main (main branch)
  +-- develop (development branch)
  |     +-- feature/user-auth (feature branch A)
  |     +-- feature/search (feature branch B)
  |     +-- fix/login-bug (fix branch)
  +-- release/v1.0 (release branch)
```

### Claude Code Permission Settings

For team security, it's recommended to set permissions in the project's `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Write",
      "Bash(npm run test)",
      "Bash(npm run lint)",
      "Bash(npm run build)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(gh pr *)"
    ],
    "deny": [
      "Bash(git push --force *)",
      "Bash(git reset --hard *)",
      "Bash(rm -rf *)",
      "Bash(git checkout main && git push *)"
    ]
  }
}
```

This configuration means:
- **Allow**: Read/write files, run tests, basic Git operations, create PRs
- **Deny**: Force push, hard reset, dangerous deletions, pushing directly to main

Commit this configuration to Git and all team members will have the same safety rules applied.

## ✍️ Hands-On Exercisess

### Exercise 1: Create a Team CLAUDE.md
1. Choose one of your projects (or create a new practice project)
2. Create a `CLAUDE.md` in the project root
3. Write at least 5 team conventions (code style, Git rules, prohibited actions, etc.)
4. Commit it to Git

> Tip: Imagine you need a new colleague to immediately understand the project's conventions. CLAUDE.md is the perfect onboarding document.

### Exercise 2: Simulate a PR Review Workflow
1. Create a new branch in your project
2. Make some simple changes (e.g., add a new function)
3. Commit and push to the remote
4. Create a Pull Request using `gh pr create`
5. Ask Claude Code to review the PR

> Tip: Even for your own code, Claude Code can spot issues you've overlooked. Build the habit of "review before merge"!

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Where should a team's shared CLAUDE.md be placed?</p>
<label><input type="radio" name="q1" value="0"> In each person's <code>~/.claude/CLAUDE.md</code></label>
<label><input type="radio" name="q1" value="1"> In the project root's <code>CLAUDE.md</code> (committed to Git)</label>
<label><input type="radio" name="q1" value="2"> Inside the project's <code>node_modules/</code></label>
<label><input type="radio" name="q1" value="3"> On the GitHub Wiki page</label>
<div class="quiz-explain">A CLAUDE.md in the project root gets committed to Git. After every team member pulls, their Claude Code will read the same conventions. The global CLAUDE.md (~/.claude/CLAUDE.md) is for personal use.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. Which approach best follows team security best practices?</p>
<label><input type="radio" name="q2" value="0"> Allow Claude Code to use <code>git push --force</code></label>
<label><input type="radio" name="q2" value="1"> Forbid dangerous operations in the settings.json deny list</label>
<label><input type="radio" name="q2" value="2"> Set no permission restrictions at all</label>
<label><input type="radio" name="q2" value="3"> Let each person decide their own permissions</label>
<div class="quiz-explain">Explicitly forbidding dangerous operations (like force push, hard reset) in the project's <code>.claude/settings.json</code> prevents accidental destructive actions. Once committed to Git, all team members will have these rules applied.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. When using Claude Code to review a PR, what does it reference to evaluate code conventions?</p>
<label><input type="radio" name="q3" value="0"> Only the code's syntax itself</label>
<label><input type="radio" name="q3" value="1"> Only online best practices</label>
<label><input type="radio" name="q3" value="2"> The project's CLAUDE.md and existing code style</label>
<label><input type="radio" name="q3" value="3"> Random judgement</label>
<div class="quiz-explain">Claude Code reads the project's CLAUDE.md as the convention baseline and also references the project's existing code style for consistency checks.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. What is the purpose of creating a Pull Request instead of pushing directly to the main branch?</p>
<label><input type="radio" name="q4" value="0"> Pull Requests make the code run faster</label>
<label><input type="radio" name="q4" value="1"> Pull Requests are required by Git itself</label>
<label><input type="radio" name="q4" value="2"> Pull Requests automatically fix bugs in the code</label>
<label><input type="radio" name="q4" value="3"> Pull Requests allow team members to review and discuss changes before merging into the main codebase</label>
<div class="quiz-explain">Pull Requests create a review step before changes reach the main branch. Team members can inspect the code, leave comments, suggest improvements, and catch bugs — preventing broken code from reaching production.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. Which command checks out a Pull Request locally so you can review it?</p>
<label><input type="radio" name="q5" value="0"> <code>gh pr checkout 42</code></label>
<label><input type="radio" name="q5" value="1"> <code>git clone pr-42</code></label>
<label><input type="radio" name="q5" value="2"> <code>git pull request 42</code></label>
<label><input type="radio" name="q5" value="3"> <code>gh pr download 42</code></label>
<div class="quiz-explain"><code>gh pr checkout 42</code> switches your local repository to the branch associated with PR #42, allowing you to review the code, run tests, and test the changes locally before approving.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. Why should <code>git push --force</code> be in the "deny" list for team projects?</p>
<label><input type="radio" name="q6" value="0"> It's slower than regular push</label>
<label><input type="radio" name="q6" value="1"> It uses more network bandwidth</label>
<label><input type="radio" name="q6" value="2"> It overwrites remote history and can permanently destroy teammates' committed work</label>
<label><input type="radio" name="q6" value="3"> It's an outdated command that no longer works</label>
<div class="quiz-explain">Force push rewrites the remote branch history. If a teammate has commits on that branch, force push can permanently delete their work. In team environments, this is one of the most dangerous Git operations.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>7. What is the recommended branch naming convention described in this module?</p>
<label><input type="radio" name="q7" value="0"> date-username-description (e.g., 2026-04-12-alex-login)</label>
<label><input type="radio" name="q7" value="1"> type/description (e.g., feature/user-auth, fix/login-bug)</label>
<label><input type="radio" name="q7" value="2"> Random names chosen by the developer</label>
<label><input type="radio" name="q7" value="3"> Always use the main branch for all work</label>
<div class="quiz-explain">The convention <code>feature/name</code>, <code>fix/name</code>, <code>chore/name</code> makes it instantly clear what type of work a branch contains. This helps team members understand the purpose of each branch at a glance.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. What is the difference between the global CLAUDE.md and the project CLAUDE.md?</p>
<label><input type="radio" name="q8" value="0"> Global (~/.claude/CLAUDE.md) is personal and private; project (root/CLAUDE.md) is shared with the team via Git</label>
<label><input type="radio" name="q8" value="1"> Global is for large projects; project is for small projects</label>
<label><input type="radio" name="q8" value="2"> Global is read first; project is never read</label>
<label><input type="radio" name="q8" value="3"> There is no difference — they are the same file</label>
<div class="quiz-explain">The global CLAUDE.md stores your personal preferences (only visible to you). The project CLAUDE.md is committed to Git and shared with all team members, ensuring everyone's Claude Code follows the same conventions.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You've now mastered the key skills for team collaboration! In the final module, **5.4: Capstone Project**, we'll apply everything you've learned throughout the entire course to build a complete project from scratch -- this will be your graduation project!
