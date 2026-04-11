# 7.3 Slack and Notion — Team Collaboration Integration

## Slack — Real-Time Messaging and Notifications

### Why Integrate Slack?

Slack is the communication hub for many teams. Claude can:
- Automatically send task completion notifications
- Read and reply to channel messages
- Trigger workflows from Slack messages

### Claude Code Approach: Webhook

The simplest integration — using a Slack Incoming Webhook:

```python
import requests

SLACK_WEBHOOK = "https://hooks.slack.com/services/T.../B.../xxx"

def notify_slack(message):
    requests.post(SLACK_WEBHOOK, json={
        "text": message,
        "username": "Claude Bot",
        "icon_emoji": ":robot_face:"
    })

# Usage example
notify_slack("Invoice processing complete - 15 invoices, total $4,520")
```

### Claude Code Approach: Slack API

For more advanced operations — reading messages, replying, managing channels:

```python
from slack_sdk import WebClient

client = WebClient(token="xoxb-your-token")

# Send a message
client.chat_postMessage(
    channel="#operations",
    text="Today's booking total: 23"
)

# Read channel messages
response = client.conversations_history(channel="C01234567")
messages = response['messages']
```

### Cowork Approach

Connect the Slack connector directly:
```
"Read the last 10 messages in #general and summarize them"
```

### MCP Integration

Claude Code can achieve deeper integration through a Slack MCP server:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/slack-mcp"],
      "env": {
        "SLACK_TOKEN": "xoxb-..."
      }
    }
  }
}
```

---

## Notion — Knowledge Base and Project Management

### Why Integrate Notion?

Notion is the knowledge base and project management tool for many teams. Claude can:
- Automatically create and update pages
- Read database content
- Write processed results into Notion

### Claude Code Approach: Notion API

```python
import requests

NOTION_TOKEN = "secret_..."
NOTION_DB_ID = "abc123..."

headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

# Query database
response = requests.post(
    f"https://api.notion.com/v1/databases/{NOTION_DB_ID}/query",
    headers=headers
)
results = response.json()['results']

# Create a new page
new_page = {
    "parent": {"database_id": NOTION_DB_ID},
    "properties": {
        "Name": {"title": [{"text": {"content": "Daily Report - 2026-04-11"}}]},
        "Status": {"select": {"name": "Complete"}}
    }
}
requests.post("https://api.notion.com/v1/pages", 
              headers=headers, json=new_page)
```

### Cowork Approach

Connect the Notion connector directly:
```
"Organize this analysis report into a new Notion page
 and place it in the Operations database"
```

### Practical Scenarios

| Scenario | Tool Choice |
|----------|-------------|
| Auto-update Notion reports daily | Claude Code + cron |
| Quickly organize notes into Notion | Cowork + connector |
| Read config from Notion to run automation | Claude Code + API |
| Search the team knowledge base | Cowork + connector |

---

## Slack + Notion Combined Workflow

A common automation flow:

```
1. Claude Code runs daily data analysis
2. Results are written to a Notion database
3. Completion notification is sent to the Slack #reports channel
4. Team members receive the alert in Slack and click the link to view the Notion report
```

---

## Exercises

1. Create a Slack Webhook and use Claude Code to send a test message
2. Use the Notion API to create a new page
3. Design a Slack → Claude Code → Notion automation flow
