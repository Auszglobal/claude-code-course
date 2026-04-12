# 7.5 The Complete Third-Party Integration Map

## 🎯 Learning Objectives

After completing this module, you will be able to:
- See the big picture of how Claude Code integrates with the entire ecosystem of third-party tools
- Classify tools into integration tiers (Tier 1 through Tier 4) based on depth and frequency of use
- Use the decision tree to choose the right integration method for any new tool
- Configure MCP servers in your settings.json for seamless tool access
- Apply security best practices across all third-party integrations

## 📖 Theory Explanation

### Seeing the Big Picture

Throughout this phase, you have learned how Claude Code integrates with specific tools — GitHub for code, Google for data, Slack and Notion for collaboration, and AWS for deployment. Now it is time to zoom out and see how all of these fit together.

Think of Claude Code as the conductor of an orchestra. Each third-party tool is a different instrument — GitHub is the drums (keeping the rhythm of your development workflow), Google Sheets is the piano (handling the data melody), Slack is the trumpet (announcing results to the audience), and AWS is the stage (where the performance goes live). The conductor does not play every instrument, but they coordinate all of them to create something greater than the sum of its parts.

The key insight is this: **Claude Code's power multiplies with every tool you connect to it.** On its own, Claude Code is a great coding assistant. Connected to GitHub, it becomes a complete development workflow. Add Google Sheets, and it can process business data. Add Slack, and it can report results to your team. Add AWS, and it can deploy everything to production. Together, you have a fully automated business system.

### Understanding Integration Depth

Not all integrations are created equal. Some tools are so deeply connected to Claude Code that they feel like native features. Others require a bit of configuration or custom code. Understanding this spectrum helps you set realistic expectations and choose the right approach for each tool.

The four tiers below rank tools from "feels built-in" to "needs some assembly":

## Claude Code Integration Ranking by Depth

### Tier 1 — Deep Integration (Used Almost Every Time)

These are the tools that Claude Code uses in nearly every session. They feel like part of Claude Code itself.

| Tool | Depth | Description |
|------|-------|-------------|
| **Git** | ★★★★★ | Built-in support, version control is part of nearly every task |
| **GitHub** | ★★★★★ | Full `gh` CLI support — PRs, Issues, Actions, Reviews |
| **npm / pip** | ★★★★★ | Package management is a core part of daily development |
| **Terminal** | ★★★★★ | The runtime environment for Claude Code itself |

### Tier 2 — Tight Integration (Used Frequently)

These tools require initial setup but then work smoothly with Claude Code for common development tasks.

| Tool | Depth | Description |
|------|-------|-------------|
| **VS Code / JetBrains** | ★★★★☆ | Official IDE extensions with embedded Claude Code |
| **AWS CLI** | ★★★★☆ | Deployment, database, and server management |
| **Docker** | ★★★★☆ | Containerized deployment and development environments |
| **Google Sheets** | ★★★☆☆ | Via `gspread` + service account |
| **Gmail API** | ★★★☆☆ | Automated email notifications and reports |

### Tier 3 — Moderate Integration (Used as Needed)

These tools integrate well but are typically used for specific tasks rather than daily development.

| Tool | Depth | Description |
|------|-------|-------------|
| **Slack** | ★★★☆☆ | Webhook or API — notifications and collaboration |
| **Notion** | ★★★☆☆ | API integration — knowledge base and project management |
| **Playwright** | ★★★☆☆ | Browser automation and web scraping |
| **Firebase** | ★★☆☆☆ | FCM push notifications |
| **PostgreSQL** | ★★★☆☆ | Database operations and migrations |

### Tier 4 — Light Integration (Via MCP or API)

These tools connect through MCP servers or custom API scripts. They work, but require the most setup.

| Tool | Depth | Description |
|------|-------|-------------|
| **Figma** | ★★☆☆☆ | Read designs via MCP connector |
| **Jira** | ★★☆☆☆ | API integration — issue tracking |
| **Zapier** | ★★☆☆☆ | Connect 8,000+ apps via MCP |
| **Apify** | ★★☆☆☆ | Web scraping via MCP |

## Decision Tree for Choosing an Integration Method

When you encounter a new tool and want to connect it to Claude Code, follow this decision tree. It goes from the simplest option to the most involved:

```mermaid
flowchart TD
    A[Need to integrate a tool?] --> B{Built-in support?}
    B -->|Yes| C[Use it directly]
    B -->|No| D{Official MCP server?}
    D -->|Yes| E[Configure in settings.json]
    D -->|No| F{Has REST API?}
    F -->|Yes| G[Write API integration script]
    F -->|No| H{Zapier support?}
    H -->|Yes| I[Use Zapier MCP]
    H -->|No| J[Use Playwright]
    style A fill:#1A1A2E,color:#fff
    style C fill:#008B8B,color:#fff
    style E fill:#008B8B,color:#fff
    style G fill:#008B8B,color:#fff
    style I fill:#00B4A6,color:#fff
    style J fill:#00B4A6,color:#fff
```

In plain English, the priority order is:
1. **Built-in?** Just use it (e.g., Git, npm, any CLI tool)
2. **MCP server available?** Configure it once and forget it (e.g., Slack MCP, Notion MCP)
3. **REST API?** Write a Python/Node script to call it (e.g., Notion API, Gmail API)
4. **Zapier?** Use the Zapier MCP to connect indirectly (covers 8,000+ apps)
5. **Nothing else works?** Use Playwright for browser automation as a last resort

## 💻 Code Example 1: Configuring Multiple MCP Servers

The MCP (Model Context Protocol) is Claude Code's universal connector system. By configuring MCP servers in your settings file, you give Claude Code the ability to talk to external tools as naturally as it talks to your filesystem.

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
        "SLACK_TOKEN": "xoxb-your-slack-bot-token"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic/notion-mcp"],
      "env": {
        "NOTION_TOKEN": "secret_your-notion-token"
      }
    }
  }
}
```

### Expected Result:

After saving this configuration and restarting Claude Code, you can interact with all three services naturally:

```
You: "Check if there are any open PRs on my project"
→ Claude Code uses the GitHub MCP to list open PRs

You: "Post a summary of today's completed tasks to #team-updates"
→ Claude Code uses the Slack MCP to send a message

You: "Create a new page in the Operations database with today's metrics"
→ Claude Code uses the Notion MCP to create the page
```

No Python scripts needed — MCP makes the integration feel built-in.

## 💻 Code Example 2: Building a Multi-Tool Automation Pipeline

Here is a practical example that ties together multiple integrations into a single automated workflow. This is the kind of pipeline that can save hours of manual work every day:

```python
import gspread
import requests
import boto3
from datetime import datetime
from google.oauth2.service_account import Credentials

# === STEP 1: Read data from Google Sheets ===
creds = Credentials.from_service_account_file(
    'google_credentials.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets']
)
gc = gspread.authorize(creds)
sheet = gc.open('Daily Sales').sheet1
sales_data = sheet.get_all_records()

# Calculate today's totals
total_revenue = sum(row['Amount'] for row in sales_data)
total_orders = len(sales_data)
print(f"Step 1 complete: {total_orders} orders, ${total_revenue} revenue")

# === STEP 2: Write results to DynamoDB (AWS) ===
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DailyReports')
table.put_item(Item={
    'report_date': datetime.now().strftime('%Y-%m-%d'),
    'total_orders': total_orders,
    'total_revenue': str(total_revenue),
    'generated_at': datetime.now().isoformat()
})
print("Step 2 complete: Report saved to DynamoDB")

# === STEP 3: Create a Notion page with the report ===
NOTION_TOKEN = "secret_..."
notion_headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}
notion_page = {
    "parent": {"database_id": "your-db-id"},
    "properties": {
        "Name": {"title": [{"text": {"content": f"Daily Report — {datetime.now().strftime('%Y-%m-%d')}"}}]},
        "Revenue": {"number": total_revenue},
        "Orders": {"number": total_orders},
        "Status": {"select": {"name": "Complete"}}
    }
}
requests.post("https://api.notion.com/v1/pages",
              headers=notion_headers, json=notion_page)
print("Step 3 complete: Notion page created")

# === STEP 4: Notify the team on Slack ===
SLACK_WEBHOOK = "https://hooks.slack.com/services/T.../B.../xxx"
requests.post(SLACK_WEBHOOK, json={
    "text": f"Daily Report Ready!\n"
            f"Orders: {total_orders} | Revenue: ${total_revenue}\n"
            f"View full report in Notion: [link]"
})
print("Step 4 complete: Slack notification sent!")
```

### Expected Output:
```
Step 1 complete: 47 orders, $8,250 revenue
Step 2 complete: Report saved to DynamoDB
Step 3 complete: Notion page created
Step 4 complete: Slack notification sent!
```

This single script reads from Google Sheets, stores data in AWS, creates a report in Notion, and notifies the team on Slack — all in about 30 lines of code!

## Claude Code vs Cowork Integration Comparison

| Scenario | Recommended Tool | Reason |
|----------|-----------------|--------|
| Write code + Git + deploy | Claude Code | Native development environment |
| Organize documents + send emails | Cowork | Connectors are more convenient |
| Automation scripts + cron | Claude Code | Terminal + Task Scheduler |
| Cross-application workflows | Cowork | Plugin + connector |
| Data analysis + reports | Depends on technical ability | Code is more powerful, Cowork is easier |

## Integration Security Guidelines

Security is not optional — it is the foundation that everything else rests on. A single leaked API key can compromise your entire system. Follow these five rules without exception:

1. **Never commit API keys to Git** — Use `.env` files or environment variables. Add `.env` to `.gitignore` immediately.
2. **Principle of least privilege** — Only grant the minimum access needed. A Slack bot that only sends messages should not have permission to read all channels.
3. **Rotate tokens regularly** — Especially for long-running automations. Set a calendar reminder to rotate keys every 90 days.
4. **Always review external Skills** — Prompt injection is a real risk. Before using a community MCP server, review its source code.
5. **Keep Webhook URLs secret** — A leaked Slack webhook URL means anyone on the internet can post messages to your channel.

---

## Summary

Mastering third-party integrations is the key to upgrading from "using Claude Code to write code" to "using Claude Code to manage your entire business."

Core principles:
- **GitHub** is infrastructure — use it on every project
- **Google ecosystem** is your data hub — Sheets + Gmail covers most needs
- **Slack/Notion** is the collaboration hub — team communication and knowledge management
- **AWS** is your deployment target — push results to production
- **MCP** is the universal glue — connects everything

## ✍️ Hands-On Exercises

**Exercise 1: Draw Your Personal Integration Map**

Take a piece of paper (or open a drawing tool) and list every digital tool you use in your daily work or personal life. For each one, determine:
- What tier would it fall into? (Tier 1-4)
- How would you connect it to Claude Code? (Built-in, MCP, API, Zapier, or Playwright)
- What task would you automate first?

This map becomes your personal roadmap for building automation with Claude Code.

> Hint: Start with the tools you use most. Even simple integrations (like a Slack webhook notification) can save significant time when they run automatically.

**Exercise 2: Build a Two-Tool Workflow**

Pick any two tools from the integration map and build a simple automated workflow that connects them. For example:
- Google Sheets + Slack: Read sales data from Sheets and post a daily summary to Slack
- GitHub + Notion: When a PR is merged, create a changelog entry in Notion
- AWS S3 + Slack: After deploying to S3, notify the team on Slack with the URL

Ask Claude Code to help you write the script. Start simple — even 10 lines of code that connect two tools is a real automation!

> Hint: Use environment variables for all tokens and keys. Ask Claude Code: "Help me set up a .env file for my Slack webhook URL and Notion API token, and show me how to load them in Python."

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. According to the integration depth ranking, which tools are Tier 1 (deepest integration, used almost every time)?</p>
<label><input type="radio" name="q1" value="0"> Slack, Notion, and Firebase</label>
<label><input type="radio" name="q1" value="1"> Git, GitHub, npm/pip, and the Terminal</label>
<label><input type="radio" name="q1" value="2"> AWS CLI, Docker, and Google Sheets</label>
<label><input type="radio" name="q1" value="3"> Figma, Jira, and Zapier</label>
<div class="quiz-explain">Tier 1 tools are Git, GitHub, npm/pip, and the Terminal -- they have the deepest integration and are used in almost every Claude Code session. They are built-in and form the core development workflow.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. When you need to integrate a third-party tool, what is the first question in the decision tree?</p>
<label><input type="radio" name="q2" value="0"> Is there a Zapier connector available?</label>
<label><input type="radio" name="q2" value="1"> Can you use Playwright for browser automation?</label>
<label><input type="radio" name="q2" value="2"> Does Claude Code have built-in support for it?</label>
<label><input type="radio" name="q2" value="3"> Does it have a REST API?</label>
<div class="quiz-explain">The decision tree starts with checking if Claude Code has built-in support (like Git, npm, CLI tools). If yes, use it directly. If not, check for an MCP server, then REST API, then Zapier, and finally Playwright as a last resort.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. Which is the most important security guideline for third-party integrations?</p>
<label><input type="radio" name="q3" value="0"> Never commit API keys to Git -- use .env or environment variables</label>
<label><input type="radio" name="q3" value="1"> Always use the latest version of every integration</label>
<label><input type="radio" name="q3" value="2"> Only integrate tools from the official Anthropic marketplace</label>
<label><input type="radio" name="q3" value="3"> Always use Cowork instead of Claude Code for integrations</label>
<div class="quiz-explain">The top security guideline is to never commit API keys to Git. Use .env files or environment variables instead. Other important practices include following least privilege, rotating tokens regularly, and reviewing external Skills for prompt injection.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. What is MCP (Model Context Protocol) in the context of Claude Code integrations?</p>
<label><input type="radio" name="q4" value="0"> A programming language for writing integrations</label>
<label><input type="radio" name="q4" value="1"> A security protocol for encrypting API keys</label>
<label><input type="radio" name="q4" value="2"> A file format for storing integration configurations</label>
<label><input type="radio" name="q4" value="3"> A universal connector system that lets Claude Code interact with external tools naturally, without writing custom scripts</label>
<div class="quiz-explain">MCP (Model Context Protocol) is Claude Code's universal connector system. By configuring MCP servers in your settings.json, Claude Code can interact with external tools (Slack, Notion, GitHub, etc.) as naturally as it interacts with your filesystem — no custom Python scripts required.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. In the decision tree, when should you use Playwright as an integration method?</p>
<label><input type="radio" name="q5" value="0"> As the first choice for any web-based tool</label>
<label><input type="radio" name="q5" value="1"> As a last resort, when the tool has no CLI, MCP server, REST API, or Zapier support</label>
<label><input type="radio" name="q5" value="2"> Only for testing purposes, never for production integrations</label>
<label><input type="radio" name="q5" value="3"> Whenever you need to interact with a tool that has a web interface</label>
<div class="quiz-explain">Playwright (browser automation) is the last resort in the decision tree. It is the most brittle and complex integration method because it depends on the tool's UI, which can change without warning. Always prefer built-in CLI support, MCP, REST API, or Zapier first.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. Where do you configure MCP servers for Claude Code?</p>
<label><input type="radio" name="q6" value="0"> In the <code>~/.claude/settings.json</code> file under the <code>"mcpServers"</code> key</label>
<label><input type="radio" name="q6" value="1"> In the <code>CLAUDE.md</code> file at the root of your project</label>
<label><input type="radio" name="q6" value="2"> In the <code>.env</code> file alongside your API keys</label>
<label><input type="radio" name="q6" value="3"> In the Claude Code web dashboard under "Integrations"</label>
<div class="quiz-explain">MCP servers are configured in <code>~/.claude/settings.json</code> under the <code>"mcpServers"</code> key. Each entry specifies the command to run, any arguments, and environment variables (like API tokens). After saving and restarting Claude Code, the MCP tools become available.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. What makes Tier 1 tools different from Tier 3 or Tier 4 tools?</p>
<label><input type="radio" name="q7" value="0"> Tier 1 tools are free while Tier 3/4 tools require payment</label>
<label><input type="radio" name="q7" value="1"> Tier 1 tools only work on Mac while Tier 3/4 work on all platforms</label>
<label><input type="radio" name="q7" value="2"> Tier 1 tools have built-in support and are used in almost every session, while Tier 3/4 tools require configuration and are used for specific tasks</label>
<label><input type="radio" name="q7" value="3"> Tier 1 tools are newer and Tier 3/4 tools are older</label>
<div class="quiz-explain">Tier 1 tools (Git, GitHub, npm/pip, Terminal) are deeply built into Claude Code and used in almost every session. Tier 3/4 tools (Slack, Notion, Figma, Jira) integrate through APIs or MCP servers and are used for specific tasks rather than daily development — they require more setup but still add significant value.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>8. What is the key insight about Claude Code's power when combined with multiple integrations?</p>
<label><input type="radio" name="q8" value="0"> Each integration slows Claude Code down, so you should use as few as possible</label>
<label><input type="radio" name="q8" value="1"> Claude Code's power multiplies with every tool connected — going from coding assistant to full business automation system</label>
<label><input type="radio" name="q8" value="2"> Integrations are only useful for large enterprise teams, not individual users</label>
<label><input type="radio" name="q8" value="3"> You need to master every integration before using any of them</label>
<div class="quiz-explain">Claude Code's power multiplies with each integration. On its own, it is a coding assistant. With GitHub, it becomes a complete development workflow. Add Google Sheets for data, Slack for communication, and AWS for deployment, and you have a fully automated business system. Start with one integration and grow from there.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Congratulations! You have completed Phase 7 — Integrations. You now understand how Claude Code connects to the entire ecosystem of tools that modern teams use every day. In **Phase 8**, we will explore advanced workflows that combine everything you have learned — building real-world automation systems that run with minimal human intervention.
