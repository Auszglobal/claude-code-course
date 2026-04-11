# Claude Code Skills — Course Module Generator
# Run this entire file as a prompt inside Claude Code:
# claude < generate-skills-modules.md

---

Read CLAUDE.md first for formatting rules, then do ALL of the following tasks in order:

## TASK 1 — Create the Skills folder structure

Create these folders and files:
```
output/
└── phase-bonus/
    ├── module-B1-what-are-skills.md
    ├── module-B2-installing-skills.md
    ├── module-B3-top-10-skills.md
    ├── module-B4-build-your-own-skill.md
    └── module-B5-skills-for-ausz.md

skills-examples/
    ├── invoice-automation/
    │   └── SKILL.md
    ├── booking-agent/
    │   └── SKILL.md
    └── email-reporter/
        └── SKILL.md
```

---

## TASK 2 — Generate module-B1-what-are-skills.md

Title: "What Are Claude Code Skills?"

Cover:
- Skills are SKILL.md files that give Claude Code a "specialised playbook" for a task
- Progressive disclosure architecture: metadata (~100 tokens) → full instructions (<5k tokens) → bundled resources
- Skills vs MCP servers vs Subagents — when to use each
- The official Anthropic skills marketplace
- Real example: the `docx` skill that already powers THIS course generation
- Skills work across Claude.ai, Claude Code, and the API

Include a visual diagram in ASCII showing how skills load:

```
Claude Code starts
      │
      ▼
Scans ~/.claude/skills/  ←── (100 tokens per skill, very cheap)
      │
      ▼
Task matches a skill? ──No──→ Normal operation
      │
     Yes
      ▼
Loads full SKILL.md ←── (up to 5k tokens)
      │
      ▼
Executes with skill context
```

---

## TASK 3 — Generate module-B2-installing-skills.md

Title: "Installing Skills — 3 Methods"

Cover all 3 installation methods with exact commands:

### Method 1: npx (Recommended — newest way)
```bash
# Install a single official Anthropic skill
npx skills add anthropics/claude-code --skill frontend-design

# Install from community repo
npx skills add obra/superpowers

# Install 1,234+ skills at once (Antigravity collection)
npx antigravity-awesome-skills --claude

# List installed skills
npx skills list
```

### Method 2: Manual copy (Windows — most reliable)
```powershell
# Create skills directory
mkdir C:\Users\kin\.claude\skills

# Clone a skills repo
git clone https://github.com/obra/superpowers.git
cd superpowers

# Copy a specific skill
xcopy skills\tdd C:\Users\kin\.claude\skills\tdd /E /I

# Verify
dir C:\Users\kin\.claude\skills\
```

### Method 3: Claude Code plugin command
```
/plugin marketplace add anthropics/skills
/plugin add C:\path\to\my-skill
```

Include step-by-step screenshots descriptions and expected output for Windows users.

---

## TASK 4 — Generate module-B3-top-10-skills.md

Title: "Top 10 Must-Have Skills for Claude Code"

For each skill, include: what it does, install command, example usage, and when to use it.

The 10 skills to cover:

1. **frontend-design** (Official Anthropic)
   - Creates distinctive, production-grade UI — used in THIS course to build the React app
   - `npx skills add anthropics/claude-code --skill frontend-design`

2. **obra/superpowers** (Community — 20+ battle-tested skills)
   - TDD, debugging, git worktrees, collaboration patterns
   - `npx skills add obra/superpowers`

3. **mcp-builder** (Official Anthropic)
   - Guides creation of custom MCP servers
   - `npx skills add anthropics/claude-code --skill mcp-builder`

4. **test-driven-development**
   - Enforces TDD discipline: write test first, then implementation
   - `npx skills add obra/superpowers` (included in superpowers)

5. **webapp-testing** (Playwright)
   - Tests web apps using Playwright for UI verification
   - `npx skills add anthropics/claude-code --skill webapp-testing`

6. **skill-creator** (Official Anthropic)
   - Interactive tool to help you build your own skills
   - `npx skills add anthropics/claude-code --skill skill-creator`

7. **software-architecture**
   - Clean Architecture, SOLID principles, design patterns
   - `npx skills add ComposioHQ/awesome-claude-skills`

8. **varlock**
   - Secure environment variable management — secrets never appear in logs
   - `npx skills add BehiSecc/awesome-claude-skills`

9. **prompt-engineering**
   - Teaches advanced prompting techniques from within Claude Code
   - `npx skills add ComposioHQ/awesome-claude-skills`

10. **debug-skill**
    - Real debugger with breakpoints, stepping, variable inspection via CLI
    - `npx skills add BehiSecc/awesome-claude-skills`

For each skill include a realistic usage example showing what you type and what Claude does.

---

## TASK 5 — Generate module-B4-build-your-own-skill.md

Title: "Build Your Own Skill from Scratch"

Cover the full SKILL.md format:

```markdown
---
name: skill-name
description: One sentence — what this skill does and WHEN Claude should use it
triggers:
  - keywords that auto-activate this skill
  - another trigger phrase
---

# Skill Name

Brief overview paragraph.

## When to Use This Skill
- Use when...
- Do NOT use when...

## Step-by-Step Instructions
1. First step
2. Second step

## Code Templates
[Templates Claude should follow]

## Examples
[Input/output examples]

## Common Mistakes
[What to avoid]
```

Include a complete worked example: building a skill for "generating Python scripts that follow PEP8 and include type hints"

Show how progressive disclosure works — metadata first, full instructions only when triggered.

Include exercise: "Build a skill for your most repeated task"

---

## TASK 6 — Generate module-B5-skills-for-ausz.md

Title: "Building AUSZ-Specific Skills"

This module is tailored for a chauffeur marketplace business (AUSZ Global). Build 3 custom skills:

### Skill 1: invoice-automation
For the existing invoice_agent.py workflow — write SKILL.md that helps Claude:
- Follow the existing toll detection logic
- Know the PARTNER_CLIENTS list format
- Apply the skip logic for already-processed bookings
- Generate the combined email report format

### Skill 2: booking-intake
For the booking automation workflow:
- Read Gmail from two sender addresses
- Fill Django admin portal forms
- Handle the specific field names and CSS selectors

### Skill 3: daily-ops-reporter  
For daily_ops_report.py:
- Log summary format
- Email template for kin.yip@auszglobal.com.au
- Error categorization patterns

For each skill: generate the complete SKILL.md file content ready to copy.

---

## TASK 7 — Create skills-examples/ files

Create the actual SKILL.md files (not just documentation, but real working skill files):

### skills-examples/invoice-automation/SKILL.md
A real skill file for AUSZ invoice automation

### skills-examples/booking-agent/SKILL.md  
A real skill file for AUSZ booking intake

### skills-examples/email-reporter/SKILL.md
A real skill file for daily ops reporting

These should be READY TO COPY to C:\Users\kin\.claude\skills\

---

## TASK 8 — Create a quick-install script

Create install-skills.ps1 (PowerShell) that:
1. Creates C:\Users\kin\.claude\skills\ if it doesn't exist
2. Copies all skills from skills-examples/ to the right place
3. Installs top 5 community skills via npx
4. Prints a success summary

```powershell
# Save as: install-skills.ps1
# Run with: .\install-skills.ps1

Write-Host "Installing Claude Code Skills for AUSZ Global..." -ForegroundColor Cyan

# Create skills directory
$skillsDir = "C:\Users\kin\.claude\skills"
if (-not (Test-Path $skillsDir)) {
    New-Item -ItemType Directory -Path $skillsDir
    Write-Host "Created $skillsDir" -ForegroundColor Green
}

# Copy AUSZ custom skills
$skills = @("invoice-automation", "booking-agent", "email-reporter")
foreach ($skill in $skills) {
    $src = ".\skills-examples\$skill"
    $dst = "$skillsDir\$skill"
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Recurse -Force
        Write-Host "✓ Installed $skill" -ForegroundColor Green
    }
}

# Install community skills
Write-Host "`nInstalling community skills via npx..." -ForegroundColor Cyan
npx skills add anthropics/claude-code --skill frontend-design
npx skills add anthropics/claude-code --skill mcp-builder
npx skills add anthropics/claude-code --skill skill-creator

Write-Host "`n✅ All skills installed!" -ForegroundColor Green
Write-Host "Skills location: $skillsDir" -ForegroundColor Yellow
npx skills list
```

---

After completing ALL tasks, print a summary:
- How many files were created
- List of all file paths
- Next step instructions
