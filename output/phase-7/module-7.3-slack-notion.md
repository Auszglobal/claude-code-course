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

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="0">
<p>1. What is the simplest way to integrate Slack with Claude Code for sending notifications?</p>
<label><input type="radio" name="q1" value="0"> Using a Slack Incoming Webhook with a simple HTTP POST request</label>
<label><input type="radio" name="q1" value="1"> Installing the Slack desktop app alongside Claude Code</label>
<label><input type="radio" name="q1" value="2"> Using Computer Use to type messages into the Slack UI</label>
<label><input type="radio" name="q1" value="3"> Connecting via SSH to the Slack API server</label>
<div class="quiz-explain">The simplest Slack integration is using an Incoming Webhook -- you just send an HTTP POST request with the message payload using Python's <code>requests</code> library. No complex authentication needed for basic notifications.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. For automatically updating Notion reports on a daily schedule, which tool is recommended?</p>
<label><input type="radio" name="q2" value="0"> Cowork + Notion connector</label>
<label><input type="radio" name="q2" value="1"> Manual updates through the Notion web interface</label>
<label><input type="radio" name="q2" value="2"> Claude Code + Notion API + cron/Task Scheduler</label>
<label><input type="radio" name="q2" value="3"> A browser extension that auto-fills Notion</label>
<div class="quiz-explain">For scheduled, automated daily updates, Claude Code + the Notion API combined with cron or Task Scheduler is the recommended approach. Cowork connectors are better for quick one-off tasks.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. In a combined Slack + Notion workflow, what is the typical automation flow?</p>
<label><input type="radio" name="q3" value="0"> Slack sends data to Notion, which triggers Claude Code</label>
<label><input type="radio" name="q3" value="1"> Claude Code runs analysis, writes results to Notion, then sends a Slack notification with a link</label>
<label><input type="radio" name="q3" value="2"> Notion generates reports and posts them directly to Slack</label>
<label><input type="radio" name="q3" value="3"> Slack and Notion sync bidirectionally without Claude Code</label>
<div class="quiz-explain">The common flow is: Claude Code runs daily data analysis, writes results to a Notion database, then sends a completion notification to the Slack channel with a link so team members can view the report.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Exercises

1. Create a Slack Webhook and use Claude Code to send a test message
2. Use the Notion API to create a new page
3. Design a Slack -> Claude Code -> Notion automation flow
