# 7.5 The Complete Third-Party Integration Map

## Claude Code Integration Ranking by Depth

Different third-party tools vary significantly in how deeply they integrate with Claude Code. Listed below from deepest to lightest:

### Tier 1 — Deep Integration (Used Almost Every Time)

| Tool | Depth | Description |
|------|-------|-------------|
| **Git** | ★★★★★ | Built-in support, version control is part of nearly every task |
| **GitHub** | ★★★★★ | Full `gh` CLI support — PRs, Issues, Actions, Reviews |
| **npm / pip** | ★★★★★ | Package management is a core part of daily development |
| **Terminal** | ★★★★★ | The runtime environment for Claude Code itself |

### Tier 2 — Tight Integration (Used Frequently)

| Tool | Depth | Description |
|------|-------|-------------|
| **VS Code / JetBrains** | ★★★★☆ | Official IDE extensions with embedded Claude Code |
| **AWS CLI** | ★★★★☆ | Deployment, database, and server management |
| **Docker** | ★★★★☆ | Containerized deployment and development environments |
| **Google Sheets** | ★★★☆☆ | Via `gspread` + service account |
| **Gmail API** | ★★★☆☆ | Automated email notifications and reports |

### Tier 3 — Moderate Integration (Used as Needed)

| Tool | Depth | Description |
|------|-------|-------------|
| **Slack** | ★★★☆☆ | Webhook or API — notifications and collaboration |
| **Notion** | ★★★☆☆ | API integration — knowledge base and project management |
| **Playwright** | ★★★☆☆ | Browser automation and web scraping |
| **Firebase** | ★★☆☆☆ | FCM push notifications |
| **PostgreSQL** | ★★★☆☆ | Database operations and migrations |

### Tier 4 — Light Integration (Via MCP or API)

| Tool | Depth | Description |
|------|-------|-------------|
| **Figma** | ★★☆☆☆ | Read designs via MCP connector |
| **Jira** | ★★☆☆☆ | API integration — issue tracking |
| **Zapier** | ★★☆☆☆ | Connect 8,000+ apps via MCP |
| **Apify** | ★★☆☆☆ | Web scraping via MCP |

## Decision Tree for Choosing an Integration Method

```
Need to integrate a third-party tool?
│
├── Does Claude Code have built-in support? (Git, npm, CLI tools)
│   └── ✅ Use it directly
│
├── Is there an official MCP server?
│   └── ✅ Configure it in settings.json
│
├── Does it have a REST API?
│   └── ✅ Have Claude Code write an API integration script
│
├── Is it supported by Zapier?
│   └── ✅ Use Zapier MCP (Cowork only)
│
└── None of the above?
    └── Use Playwright for browser automation
```

## MCP Integration Configuration Example

Configure in `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "gh",
      "args": ["mcp"]
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/slack-mcp"],
      "env": {
        "SLACK_TOKEN": "xoxb-..."
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic/notion-mcp"],
      "env": {
        "NOTION_TOKEN": "secret_..."
      }
    }
  }
}
```

## Claude Code vs Cowork Integration Comparison

| Scenario | Recommended Tool | Reason |
|----------|-----------------|--------|
| Write code + Git + deploy | Claude Code | Native development environment |
| Organize documents + send emails | Cowork | Connectors are more convenient |
| Automation scripts + cron | Claude Code | Terminal + Task Scheduler |
| Cross-application workflows | Cowork | Plugin + connector |
| Data analysis + reports | Depends on technical ability | Code is more powerful, Cowork is easier |

## Integration Security Guidelines

1. **Never commit API keys to Git** — Use `.env` or environment variables
2. **Principle of least privilege** — Only grant the access that's necessary
3. **Rotate tokens regularly** — Especially for long-running automations
4. **Always review external Skills** — Prompt injection is a real risk
5. **Keep Webhook URLs secret** — A leaked URL means anyone can trigger it

---

## Summary

Mastering third-party integrations is the key to upgrading from "using Claude Code to write code" to "using Claude Code to manage your entire business."

Core principles:
- **GitHub** is infrastructure — use it on every project
- **Google ecosystem** is your data hub — Sheets + Gmail covers most needs
- **Slack/Notion** is the collaboration hub — team communication and knowledge management
- **AWS** is your deployment target — push results to production
- **MCP** is the universal glue — connects everything

---

## Exercises

1. Draw your own "third-party integration map" — list the tools you use daily and label how they integrate
2. Pick a Tier 3/4 tool and try integrating it via MCP or API
3. Design an automation workflow that spans 3 different tools
