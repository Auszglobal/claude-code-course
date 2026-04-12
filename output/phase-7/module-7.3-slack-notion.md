# 7.3 Slack and Notion — Team Collaboration Integration

## 🎯 Learning Objectives

After completing this module, you will be able to:
- Send automated notifications to Slack channels using webhooks and the Slack API
- Read and write data to Notion databases using the Notion API
- Configure MCP servers for deeper Slack and Notion integration
- Design combined Slack + Notion automation workflows powered by Claude Code
- Choose the right integration method (webhook vs API vs MCP vs Cowork) for each use case

## 📖 Theory Explanation

### Why Do Slack and Notion Matter?

If GitHub is where your code lives, then Slack and Notion are where your **team** lives. Slack is like the office hallway — it is where quick conversations, announcements, and alerts happen in real time. Notion is like the office filing cabinet and whiteboard combined — it is where documents, plans, databases, and knowledge are organized and stored.

When Claude Code can talk to both tools, something magical happens: your automation can not only **do work** but also **communicate the results** to your team. Imagine a robot that not only files your reports but also walks over to your colleague's desk and says, "Hey, the report is ready — here's the link." That is what Slack + Notion integration gives you.

### The Three Levels of Integration

Think of integration depth like ordering food:
1. **Webhook** (Level 1): Like dropping a note through a mail slot. You can send messages, but you cannot read responses or do anything else. Simple and fast.
2. **API** (Level 2): Like having a phone conversation. You can send messages, read messages, manage channels, and do much more. Requires a bot token with proper permissions.
3. **MCP Server** (Level 3): Like having a direct line installed. Claude Code can interact with Slack/Notion as naturally as it interacts with your filesystem — reading, searching, and writing seamlessly.

Each level requires a bit more setup, but gives you significantly more capability.

## Slack — Real-Time Messaging and Notifications

### Why Integrate Slack?

Slack is the communication hub for many teams. Claude can:
- Automatically send task completion notifications
- Read and reply to channel messages
- Trigger workflows from Slack messages
- Post formatted reports with rich text, links, and attachments

## 💻 Code Example 1: Sending Slack Notifications via Webhook

The simplest Slack integration is a webhook — a special URL that accepts incoming messages. You create it once in Slack's settings, and then any script can post messages by sending an HTTP request to that URL.

**How to get a Webhook URL:**
1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Under "Incoming Webhooks", toggle it on
3. Click "Add New Webhook to Workspace" and pick a channel
4. Copy the webhook URL (it starts with `https://hooks.slack.com/services/...`)

```python
import requests
import json

# Your Slack Incoming Webhook URL
# NEVER hard-code this in production — use environment variables instead
SLACK_WEBHOOK = "https://hooks.slack.com/services/T.../B.../xxx"

def notify_slack(message, channel_override=None):
    """Send a notification to Slack via webhook."""
    payload = {
        "text": message,
        "username": "Claude Bot",       # Display name in Slack
        "icon_emoji": ":robot_face:"    # Bot avatar emoji
    }
    # Optionally override the default channel
    if channel_override:
        payload["channel"] = channel_override

    response = requests.post(SLACK_WEBHOOK, json=payload)

    if response.status_code == 200:
        print("Message sent to Slack successfully!")
    else:
        print(f"Failed to send: {response.status_code} — {response.text}")

# Usage examples
notify_slack("Invoice processing complete — 15 invoices, total $4,520")
notify_slack("Daily backup finished at 3:00 AM. All systems healthy.")
notify_slack("ALERT: Server CPU usage exceeded 90%", "#alerts")
```

### Expected Output:
```
Message sent to Slack successfully!
Message sent to Slack successfully!
Message sent to Slack successfully!
```

In Slack, your team will see these messages appear in the designated channel with the robot face emoji as the avatar.

## 💻 Code Example 2: Full Slack API Integration (Read + Write)

For more advanced operations — reading messages, replying, managing channels — you need the Slack SDK and a bot token with the right permissions.

```python
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

# Initialize the Slack client with your bot token
# Get this from: api.slack.com > Your App > OAuth & Permissions
client = WebClient(token="xoxb-your-bot-token-here")

# --- Sending a formatted message ---
try:
    result = client.chat_postMessage(
        channel="#operations",
        text="Daily Summary for April 11, 2026",
        blocks=[
            {
                "type": "header",
                "text": {"type": "plain_text", "text": "Daily Booking Summary"}
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Total Bookings:* 23\n*Revenue:* $3,450\n*Top Route:* Airport → CBD"
                }
            }
        ]
    )
    print(f"Message sent! Timestamp: {result['ts']}")
except SlackApiError as e:
    print(f"Error: {e.response['error']}")

# --- Reading recent channel messages ---
try:
    response = client.conversations_history(
        channel="C01234567",  # Channel ID (not name)
        limit=5               # Get last 5 messages
    )
    print("\nRecent messages:")
    for msg in response['messages']:
        print(f"  - {msg.get('text', '(no text)')[:80]}")
except SlackApiError as e:
    print(f"Error reading messages: {e.response['error']}")
```

### Expected Output:
```
Message sent! Timestamp: 1712847600.000123

Recent messages:
  - Daily Summary for April 11, 2026
  - Reminder: Team standup at 9:30 AM
  - Deploy v2.3.1 completed successfully
  - New PR #47: Add user search feature
  - Good morning team!
```

### MCP Integration

Claude Code can also achieve deeper integration through a Slack MCP server. This lets Claude Code interact with Slack naturally, without you writing any Python code:

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

With this configured, you can simply tell Claude Code: "Read the last 10 messages in #general and summarize them" and it handles everything.

---

## Notion — Knowledge Base and Project Management

### Why Integrate Notion?

Notion is the knowledge base and project management tool for many teams. Think of it as a digital workspace where you can create documents, build databases, track tasks, and organize everything in one place. Claude can:
- Automatically create and update pages after running analysis
- Read database content to get task lists or configuration
- Write processed results into Notion for the whole team to see

## Notion API Integration

Setting up Notion API access requires creating an "internal integration" in Notion's settings. Here is the process:
1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a new integration and copy the API token
3. In Notion, share the specific page or database with your integration

```python
import requests

# Your Notion integration token and database ID
NOTION_TOKEN = "secret_..."
NOTION_DB_ID = "abc123..."

# Required headers for all Notion API requests
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"   # API version — always include this
}

# --- Read: Query all items from a database ---
response = requests.post(
    f"https://api.notion.com/v1/databases/{NOTION_DB_ID}/query",
    headers=headers
)
results = response.json()['results']
print(f"Found {len(results)} entries in the database")

for item in results[:3]:
    # Extract the title from the first title property
    title = item['properties']['Name']['title'][0]['text']['content']
    status = item['properties']['Status']['select']['name']
    print(f"  - {title} [{status}]")

# --- Write: Create a new page in the database ---
new_page = {
    "parent": {"database_id": NOTION_DB_ID},
    "properties": {
        "Name": {"title": [{"text": {"content": "Daily Report — 2026-04-11"}}]},
        "Status": {"select": {"name": "Complete"}},
    }
}
create_response = requests.post(
    "https://api.notion.com/v1/pages",
    headers=headers,
    json=new_page
)
if create_response.status_code == 200:
    print("New page created in Notion!")
else:
    print(f"Error: {create_response.status_code}")
```

### Cowork Approach

Connect the Notion connector directly — no code needed:
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

The real power shows when you combine both tools. Here is a common automation flow that brings everything together:

```
1. Claude Code runs daily data analysis (e.g., sales figures)
2. Results are formatted and written to a Notion database page
3. A completion notification is sent to the Slack #reports channel
4. The Slack message includes a direct link to the Notion report
5. Team members receive the alert and click the link to view details
```

This pattern — **process, store, notify** — is one of the most useful automation patterns you can build. It works for financial reports, booking summaries, inventory updates, customer feedback analysis, and much more.

## ✍️ Hands-On Exercises

**Exercise 1: Send Your First Slack Notification**

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Enable Incoming Webhooks and add one to a test channel (create a `#test-bot` channel first)
3. Ask Claude Code: "Write a Python script that sends a message to Slack using this webhook URL: [paste your URL]"
4. Run the script and verify the message appears in your Slack channel
5. Modify the script to include today's date in the message

> Hint: Never share your webhook URL publicly! Anyone with the URL can post messages to your channel.

**Exercise 2: Create a Notion Page via API**

1. Create a Notion integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a test database in Notion with columns: Name (title), Status (select), Date (date)
3. Share the database with your integration (click "..." > "Add connections")
4. Ask Claude Code: "Write a script to add a new entry to my Notion database with today's date and status 'In Progress'"
5. Check Notion and verify the new entry appears

> Hint: To find your database ID, open the database in Notion and look at the URL. The 32-character string after the workspace name is your database ID.

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

<div class="quiz-q" data-answer="2">
<p>4. What is the difference between a Slack Webhook and the Slack API (using a bot token)?</p>
<label><input type="radio" name="q4" value="0"> They are the same thing with different names</label>
<label><input type="radio" name="q4" value="1"> Webhooks can read and write messages, while the API can only send</label>
<label><input type="radio" name="q4" value="2"> Webhooks can only send messages, while the API can send, read, reply, and manage channels</label>
<label><input type="radio" name="q4" value="3"> The API is free but webhooks require a paid Slack plan</label>
<div class="quiz-explain">A Slack Incoming Webhook is one-way: it can only send messages to a specific channel. The Slack API (using a bot token and the <code>slack_sdk</code> library) is much more capable — it can send messages, read channel history, reply to threads, manage channels, and more.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. Before the Notion API can access a database, what must you do in Notion?</p>
<label><input type="radio" name="q5" value="0"> Make the database public on the internet</label>
<label><input type="radio" name="q5" value="1"> Share the database with your Notion integration (via "Add connections")</label>
<label><input type="radio" name="q5" value="2"> Export the database as a CSV file first</label>
<label><input type="radio" name="q5" value="3"> Install a Notion plugin from the marketplace</label>
<div class="quiz-explain">Notion integrations can only access pages and databases that have been explicitly shared with them. In Notion, you click the "..." menu on the database, choose "Add connections," and select your integration. This is a security measure so integrations only see what you allow.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. What header must always be included in Notion API requests?</p>
<label><input type="radio" name="q6" value="0"> <code>Notion-Version</code> (specifying the API version)</label>
<label><input type="radio" name="q6" value="1"> <code>X-Notion-Auth</code> (for extra security)</label>
<label><input type="radio" name="q6" value="2"> <code>Accept-Language</code> (for localization)</label>
<label><input type="radio" name="q6" value="3"> <code>User-Agent</code> (identifying your application)</label>
<div class="quiz-explain">The Notion API requires the <code>Notion-Version</code> header in every request (e.g., <code>"Notion-Version": "2022-06-28"</code>). This tells the API which version of the response format to use, ensuring your code does not break when Notion releases updates.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. Which integration method lets Claude Code interact with Slack most naturally, without writing Python code?</p>
<label><input type="radio" name="q7" value="0"> Using Slack Incoming Webhooks</label>
<label><input type="radio" name="q7" value="1"> Using the slack_sdk Python library</label>
<label><input type="radio" name="q7" value="2"> Using Cowork's graphical connector</label>
<label><input type="radio" name="q7" value="3"> Configuring a Slack MCP server in Claude Code's settings</label>
<div class="quiz-explain">An MCP (Model Context Protocol) server for Slack allows Claude Code to interact with Slack as naturally as it interacts with your filesystem. You configure it in your settings.json, and then you can simply say "Read the last 10 messages in #general" without writing any code.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. What is the "process, store, notify" pattern?</p>
<label><input type="radio" name="q8" value="0"> A Slack-specific message formatting standard</label>
<label><input type="radio" name="q8" value="1"> A Python design pattern for error handling</label>
<label><input type="radio" name="q8" value="2"> An automation pattern where Claude Code processes data, saves results to Notion, and sends a Slack alert</label>
<label><input type="radio" name="q8" value="3"> A way to back up your Slack messages to Notion automatically</label>
<div class="quiz-explain">The "process, store, notify" pattern is a common automation workflow: Claude Code processes data (analysis, reports, etc.), stores the results in Notion (or another knowledge base), and then notifies the team via Slack with a link to the results. It is one of the most practical automation patterns you can build.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

With Slack and Notion integrated, your Claude Code automation can now communicate with your team and store results in a shared knowledge base. In **Module 7.4**, we will tackle the final piece of the puzzle — deploying your work to the cloud with AWS.
