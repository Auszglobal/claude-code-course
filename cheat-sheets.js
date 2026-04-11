const CHEAT_SHEETS = {
  'phase-1': {
    title: 'Getting Started',
    sections: [
      {
        heading: 'Essential Commands',
        items: [
          { cmd: 'claude', desc: 'Start Claude Code in interactive mode in current directory' },
          { cmd: 'claude "your prompt"', desc: 'Run a one-shot command without entering interactive mode' },
          { cmd: 'claude --version', desc: 'Check which version of Claude Code is installed' },
          { cmd: 'claude --help', desc: 'Show all available CLI flags and options' },
          { cmd: 'claude config', desc: 'Open configuration settings' },
          { cmd: 'claude update', desc: 'Update Claude Code to the latest version' }
        ]
      },
      {
        heading: 'Permission System',
        items: [
          { cmd: 'Allow', desc: 'Approve a single tool use (one-time permission)' },
          { cmd: 'Deny', desc: 'Reject a tool use and optionally provide feedback' },
          { cmd: 'Always Allow', desc: 'Permanently allow this tool for the current project' },
          { cmd: 'Trust Project', desc: 'Allow all tools for this project without prompts' },
          { cmd: '--dangerously-skip-permissions', desc: 'Skip all permission prompts (use with caution)' }
        ]
      },
      {
        heading: 'Key Shortcuts',
        items: [
          { cmd: 'Ctrl+C', desc: 'Cancel the current operation or generation' },
          { cmd: 'Escape', desc: 'Cancel current input or dismiss suggestion' },
          { cmd: '/help', desc: 'Show available slash commands and usage info' },
          { cmd: '/clear', desc: 'Clear conversation history and start fresh' },
          { cmd: '/exit', desc: 'Exit Claude Code interactive session' },
          { cmd: 'Up Arrow', desc: 'Recall previous prompt from history' }
        ]
      }
    ]
  },
  'phase-2': {
    title: 'Fundamentals',
    sections: [
      {
        heading: 'CLAUDE.md Syntax',
        items: [
          { cmd: 'CLAUDE.md (project root)', desc: 'Project-level instructions, checked into Git for the team' },
          { cmd: '.claude/CLAUDE.md', desc: 'Personal project instructions, typically gitignored' },
          { cmd: '~/.claude/CLAUDE.md', desc: 'Global instructions applied to all projects' },
          { cmd: '# Heading', desc: 'Use Markdown headings to organize instruction sections' },
          { cmd: 'IMPORTANT:', desc: 'Prefix critical rules to give them higher priority' },
          { cmd: 'NEVER / ALWAYS', desc: 'Use strong keywords for non-negotiable rules' }
        ]
      },
      {
        heading: 'File Operations',
        items: [
          { cmd: 'Read', desc: 'Read file contents — Claude uses this before editing' },
          { cmd: 'Write', desc: 'Create a new file or completely overwrite an existing one' },
          { cmd: 'Edit', desc: 'Make targeted replacements in an existing file (preferred over Write)' },
          { cmd: 'Glob', desc: 'Find files by pattern (e.g., **/*.js, src/**/*.ts)' },
          { cmd: 'Grep', desc: 'Search file contents with regex patterns' },
          { cmd: 'Bash', desc: 'Run shell commands (git, npm, python, etc.)' }
        ]
      },
      {
        heading: 'Basic Git Commands',
        items: [
          { cmd: 'git status', desc: 'Show modified, staged, and untracked files' },
          { cmd: 'git add <file>', desc: 'Stage a specific file for commit' },
          { cmd: 'git commit -m "msg"', desc: 'Create a commit with a message' },
          { cmd: 'git checkout -b <branch>', desc: 'Create and switch to a new branch' },
          { cmd: 'git diff', desc: 'Show unstaged changes in working directory' },
          { cmd: 'git log --oneline -10', desc: 'Show last 10 commits in compact format' }
        ]
      }
    ]
  },
  'phase-3': {
    title: 'Intermediate',
    sections: [
      {
        heading: 'Multi-File Editing Patterns',
        items: [
          { cmd: '"Edit files X, Y, Z to..."', desc: 'Name specific files for Claude to modify together' },
          { cmd: '"Refactor across all *.ts files"', desc: 'Ask Claude to apply changes across matching files' },
          { cmd: '"Add error handling to every fetch call"', desc: 'Pattern-based bulk edit instruction' },
          { cmd: '"Rename variable foo to bar everywhere"', desc: 'Cross-file rename with consistency check' },
          { cmd: '"Update imports after moving utils.js to lib/"', desc: 'Dependency-aware file restructuring' },
          { cmd: '"Apply the same pattern as in fileA to fileB"', desc: 'Template-based editing by example' }
        ]
      },
      {
        heading: 'Debugging Workflow',
        items: [
          { cmd: '"I got this error: <paste>"', desc: 'Paste error messages for Claude to diagnose' },
          { cmd: '"Run the tests and fix failures"', desc: 'Iterative test-fix loop' },
          { cmd: '"Explain what this code does"', desc: 'Ask for line-by-line walkthrough' },
          { cmd: '"Add console.log to trace the bug"', desc: 'Insert debug logging at key points' },
          { cmd: '"Check for null/undefined edge cases"', desc: 'Defensive programming review' },
          { cmd: '"Why does this work in dev but not prod?"', desc: 'Environment-specific debugging' }
        ]
      },
      {
        heading: 'Testing Commands',
        items: [
          { cmd: 'npm test', desc: 'Run project test suite (Node.js / Jest / Vitest)' },
          { cmd: 'python -m pytest', desc: 'Run Python tests with pytest' },
          { cmd: 'python -m pytest -x', desc: 'Stop on first test failure' },
          { cmd: '"Write unit tests for <function>"', desc: 'Ask Claude to generate test cases' },
          { cmd: '"Add edge case tests for empty input"', desc: 'Request specific test scenarios' },
          { cmd: '"Run tests and show only failures"', desc: 'Focused test output for debugging' }
        ]
      }
    ]
  },
  'phase-4': {
    title: 'Real Projects',
    sections: [
      {
        heading: 'Project Structure',
        items: [
          { cmd: 'index.html + style.css + app.js', desc: 'Basic frontend project trio' },
          { cmd: 'src/ + public/ + package.json', desc: 'Standard Node.js / React project layout' },
          { cmd: 'npm init -y', desc: 'Initialize a new Node.js project with defaults' },
          { cmd: 'npx create-vite my-app', desc: 'Scaffold a Vite project (React, Vue, vanilla)' },
          { cmd: 'npm install <package>', desc: 'Add a dependency to the project' },
          { cmd: 'npm run build', desc: 'Build project for production' }
        ]
      },
      {
        heading: 'API Integration Patterns',
        items: [
          { cmd: 'fetch(url)', desc: 'Native browser/Node 18+ HTTP request' },
          { cmd: 'await fetch(url).then(r => r.json())', desc: 'Fetch and parse JSON response' },
          { cmd: 'axios.get(url)', desc: 'HTTP GET with axios (auto-parses JSON)' },
          { cmd: 'try { await fetch() } catch(e) {}', desc: 'Always wrap API calls in error handling' },
          { cmd: 'Authorization: Bearer <token>', desc: 'Common API authentication header pattern' },
          { cmd: '.env + process.env.API_KEY', desc: 'Store secrets in environment variables, never in code' }
        ]
      },
      {
        heading: 'Deployment Commands',
        items: [
          { cmd: 'npx gh-pages -d dist', desc: 'Deploy dist/ folder to GitHub Pages' },
          { cmd: 'aws s3 sync dist/ s3://bucket/', desc: 'Deploy static site to AWS S3 bucket' },
          { cmd: 'gh repo create --public', desc: 'Create a new GitHub repository from CLI' },
          { cmd: 'git push origin main', desc: 'Push commits to remote repository' },
          { cmd: 'npm run build && npm run preview', desc: 'Build and preview production output locally' },
          { cmd: 'netlify deploy --prod', desc: 'Deploy to Netlify from command line' }
        ]
      }
    ]
  },
  'phase-5': {
    title: 'Advanced',
    sections: [
      {
        heading: 'MCP Server Configuration',
        items: [
          { cmd: 'claude mcp add <name> <cmd>', desc: 'Add an MCP server to your project' },
          { cmd: 'claude mcp list', desc: 'List all configured MCP servers' },
          { cmd: 'claude mcp remove <name>', desc: 'Remove an MCP server' },
          { cmd: '.claude/settings.json', desc: 'Project-level MCP and permissions config file' },
          { cmd: '"mcpServers": { "name": { "command": "npx", "args": [...] } }', desc: 'MCP server JSON config structure' },
          { cmd: 'claude mcp add --scope user <name> <cmd>', desc: 'Add MCP server globally for all projects' }
        ]
      },
      {
        heading: 'Hook Types',
        items: [
          { cmd: 'PreToolUse', desc: 'Runs before a tool executes — can block or modify the action' },
          { cmd: 'PostToolUse', desc: 'Runs after a tool completes — can validate or log results' },
          { cmd: 'Notification', desc: 'Triggered when Claude needs user attention' },
          { cmd: '"hooks": { "PreToolUse": [{ "command": "..." }] }', desc: 'Hook config structure in settings.json' },
          { cmd: 'exit 2 (BLOCK)', desc: 'Hook exit code 2 blocks the tool from executing' },
          { cmd: 'stdout JSON { "decision": "block", "reason": "..." }', desc: 'Hook can return JSON to control behavior' }
        ]
      },
      {
        heading: 'Team CLAUDE.md Patterns',
        items: [
          { cmd: 'CLAUDE.md (root)', desc: 'Shared team rules — code style, architecture, conventions' },
          { cmd: 'src/CLAUDE.md', desc: 'Directory-specific instructions for a subfolder' },
          { cmd: '"Always use TypeScript strict mode"', desc: 'Example team coding standard rule' },
          { cmd: '"Run npm test before committing"', desc: 'Example CI/quality gate rule' },
          { cmd: '"Never modify generated/ files directly"', desc: 'Example safety boundary rule' },
          { cmd: '"Use conventional commits: feat:, fix:, docs:"', desc: 'Example commit message convention' }
        ]
      }
    ]
  },
  'phase-6': {
    title: 'Cowork',
    sections: [
      {
        heading: 'Cowork Project Setup',
        items: [
          { cmd: 'claude cowork init', desc: 'Initialize a cowork project in the current directory' },
          { cmd: 'claude cowork start', desc: 'Start a cowork session with connected services' },
          { cmd: 'claude cowork status', desc: 'Check status of all active cowork connections' },
          { cmd: 'claude cowork stop', desc: 'Stop all running cowork processes' },
          { cmd: '.claude/cowork.json', desc: 'Cowork configuration file for connectors and schedules' },
          { cmd: 'claude cowork logs', desc: 'View logs from cowork session activity' }
        ]
      },
      {
        heading: 'Connector Types',
        items: [
          { cmd: 'browser', desc: 'Connector for web scraping and browser automation' },
          { cmd: 'api', desc: 'Connector for REST/GraphQL API interactions' },
          { cmd: 'database', desc: 'Connector for direct database queries (Postgres, SQLite)' },
          { cmd: 'filesystem', desc: 'Connector for file watching and directory monitoring' },
          { cmd: 'webhook', desc: 'Connector for receiving external HTTP callbacks' },
          { cmd: 'schedule', desc: 'Connector for cron-like timed task execution' }
        ]
      },
      {
        heading: 'Scheduling & Dispatch',
        items: [
          { cmd: '"every": "5m"', desc: 'Run task every 5 minutes' },
          { cmd: '"cron": "0 9 * * *"', desc: 'Run task daily at 9 AM (cron syntax)' },
          { cmd: '"on": "file-change"', desc: 'Trigger task when watched files change' },
          { cmd: '"on": "webhook"', desc: 'Trigger task on incoming webhook request' },
          { cmd: '"retry": 3', desc: 'Retry failed tasks up to 3 times' },
          { cmd: '"timeout": "30s"', desc: 'Set maximum execution time for a task' }
        ]
      }
    ]
  },
  'phase-7': {
    title: 'Integrations',
    sections: [
      {
        heading: 'GitHub CLI (gh)',
        items: [
          { cmd: 'gh pr create --title "..." --body "..."', desc: 'Create a pull request from current branch' },
          { cmd: 'gh pr list', desc: 'List open pull requests in the repo' },
          { cmd: 'gh pr view <number>', desc: 'View details of a specific pull request' },
          { cmd: 'gh issue create --title "..."', desc: 'Create a new GitHub issue' },
          { cmd: 'gh issue list --label bug', desc: 'List issues filtered by label' },
          { cmd: 'gh repo clone <owner>/<repo>', desc: 'Clone a GitHub repository' },
          { cmd: 'gh run list', desc: 'List recent GitHub Actions workflow runs' }
        ]
      },
      {
        heading: 'Cloud & Service CLIs',
        items: [
          { cmd: 'aws s3 ls s3://bucket/', desc: 'List objects in an S3 bucket' },
          { cmd: 'aws s3 cp file s3://bucket/', desc: 'Upload a file to S3' },
          { cmd: 'aws lightsail get-instances', desc: 'List Lightsail server instances' },
          { cmd: 'gspread.open("Sheet Name")', desc: 'Open a Google Sheet by name (Python)' },
          { cmd: 'worksheet.get_all_records()', desc: 'Read all rows from a Google Sheet as dicts' },
          { cmd: 'requests.post(slack_webhook, json=payload)', desc: 'Send a message to Slack via webhook' }
        ]
      },
      {
        heading: 'Integration Tiers',
        items: [
          { cmd: 'Tier 1: CLI tools', desc: 'Direct shell commands (gh, aws, git) — simplest' },
          { cmd: 'Tier 2: REST APIs', desc: 'HTTP requests with fetch/axios/requests — flexible' },
          { cmd: 'Tier 3: SDKs', desc: 'Language-specific libraries (boto3, gspread) — richest features' },
          { cmd: 'Tier 4: MCP servers', desc: 'Native Claude Code tool integrations — deepest integration' },
          { cmd: 'API key in .env', desc: 'Always store credentials in environment variables' },
          { cmd: 'Rate limiting', desc: 'Respect API rate limits — add retries with backoff' }
        ]
      }
    ]
  },
  'phase-8': {
    title: 'Mastery',
    sections: [
      {
        heading: 'Prompting Patterns',
        items: [
          { cmd: 'Direct: "Create a function that..."', desc: 'Simple instruction — best for clear, single tasks' },
          { cmd: 'Contextual: "In this React app, add..."', desc: 'Provide project context for better results' },
          { cmd: 'Iterative: "Now refactor it to..."', desc: 'Build on previous output step by step' },
          { cmd: 'Constrained: "Using only stdlib, write..."', desc: 'Add constraints to guide the solution' },
          { cmd: 'Exploratory: "What are 3 ways to..."', desc: 'Ask for options before committing to an approach' },
          { cmd: '"Think step by step"', desc: 'Encourage Claude to reason through complex problems' }
        ]
      },
      {
        heading: 'Session & Model Management',
        items: [
          { cmd: '/compact', desc: 'Compress conversation history to free up context window' },
          { cmd: '/model', desc: 'View or switch the current model' },
          { cmd: 'Opus', desc: 'Most capable model — best for complex reasoning and architecture' },
          { cmd: 'Sonnet', desc: 'Balanced model — good speed and quality for daily tasks' },
          { cmd: 'Haiku', desc: 'Fastest model — ideal for simple edits and quick questions' },
          { cmd: '/cost', desc: 'Show token usage and estimated cost for the session' }
        ]
      },
      {
        heading: 'Memory & Multimodal',
        items: [
          { cmd: '~/.claude/CLAUDE.md', desc: 'Global memory — personal preferences across all projects' },
          { cmd: 'CLAUDE.md (project)', desc: 'Project memory — shared team context and rules' },
          { cmd: '.claude/CLAUDE.md', desc: 'Local memory — personal notes for this project only' },
          { cmd: '"Read this image: /path/to/screenshot.png"', desc: 'Ask Claude to analyze an image file' },
          { cmd: '"Read this PDF: /path/to/doc.pdf"', desc: 'Ask Claude to read and summarize a PDF' },
          { cmd: 'Paste image into prompt', desc: 'Directly share screenshots for visual debugging' }
        ]
      }
    ]
  },
  'phase-9': {
    title: 'Production',
    sections: [
      {
        heading: 'Headless & Automation',
        items: [
          { cmd: 'claude -p "prompt"', desc: 'Run Claude in headless mode (non-interactive, for scripts)' },
          { cmd: 'claude -p "prompt" --output-format json', desc: 'Get structured JSON output from headless mode' },
          { cmd: 'echo "prompt" | claude -p', desc: 'Pipe input to Claude for pipeline integration' },
          { cmd: 'claude -p --model sonnet', desc: 'Specify model in headless mode' },
          { cmd: 'claude -p --max-turns 5', desc: 'Limit number of agentic turns in headless mode' },
          { cmd: '/loop', desc: 'Run Claude in a continuous loop for long-running tasks' }
        ]
      },
      {
        heading: 'Sub-Agents & Plan Mode',
        items: [
          { cmd: 'Agent tool', desc: 'Spawn a sub-agent for independent research tasks' },
          { cmd: '"Plan first, then implement"', desc: 'Two-phase approach: outline then execute' },
          { cmd: '"Create a plan for migrating..."', desc: 'Ask Claude to generate a step-by-step plan' },
          { cmd: '"Execute step 1 of the plan"', desc: 'Work through plan steps incrementally' },
          { cmd: 'TodoWrite', desc: 'Track complex multi-step tasks with a todo list' },
          { cmd: '"Break this into subtasks"', desc: 'Decompose large tasks for better execution' }
        ]
      },
      {
        heading: 'SDK & Deployment',
        items: [
          { cmd: 'npm install @anthropic-ai/claude-code', desc: 'Install Claude Code SDK for programmatic use' },
          { cmd: 'import { claude } from "@anthropic-ai/claude-code"', desc: 'Import SDK in Node.js scripts' },
          { cmd: 'docker run -it claude-code', desc: 'Run Claude Code inside a Docker container' },
          { cmd: 'claude -p "fix lint" --allowedTools Edit,Bash', desc: 'Restrict which tools headless mode can use' },
          { cmd: 'CI/CD: claude -p "review changes"', desc: 'Use headless mode in CI pipelines for code review' },
          { cmd: 'claude -p --permission-mode bypass', desc: 'Skip permission prompts in trusted CI environments' }
        ]
      }
    ]
  },
  'phase-bonus': {
    title: 'Skills',
    sections: [
      {
        heading: 'Skill File Structure',
        items: [
          { cmd: 'SKILL.md', desc: 'Main skill definition file with instructions and metadata' },
          { cmd: '# Skill Name', desc: 'First heading becomes the skill display name' },
          { cmd: '## Trigger', desc: 'Section defining when/how the skill activates' },
          { cmd: '## Instructions', desc: 'Step-by-step instructions Claude follows when skill runs' },
          { cmd: '## Examples', desc: 'Usage examples to guide the user and Claude' },
          { cmd: '.claude/skills/', desc: 'Directory where project skills are stored' }
        ]
      },
      {
        heading: 'Installation Methods',
        items: [
          { cmd: 'npx claude-skill add <name>', desc: 'Install a skill from the community registry' },
          { cmd: 'Manual: create .claude/skills/SKILL.md', desc: 'Create a custom skill by writing the file directly' },
          { cmd: 'claude skill list', desc: 'List all installed skills for the current project' },
          { cmd: 'claude skill init', desc: 'Scaffold a new skill template interactively' },
          { cmd: 'Git: clone skill into .claude/skills/', desc: 'Install a skill from a Git repository' },
          { cmd: '~/.claude/skills/', desc: 'Global skills directory — available in all projects' }
        ]
      },
      {
        heading: 'Skill Triggers & Progressive Disclosure',
        items: [
          { cmd: '/skill-name', desc: 'Invoke a skill using slash command syntax' },
          { cmd: '"on": "file-save"', desc: 'Trigger skill automatically when files are saved' },
          { cmd: '"on": "commit"', desc: 'Trigger skill on git commit events' },
          { cmd: 'Level 1: Basic usage shown first', desc: 'Progressive Disclosure — show simple options initially' },
          { cmd: 'Level 2: Advanced options on demand', desc: 'Reveal complexity only when the user asks for it' },
          { cmd: '"Run /deploy with --dry-run first"', desc: 'Skills can support flags for safe preview modes' }
        ]
      }
    ]
  }
};
