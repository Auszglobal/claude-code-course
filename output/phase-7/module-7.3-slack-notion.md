# 7.3 Slack 與 Notion — 團隊協作整合

## Slack — 即時通訊與通知

### 為什麼整合 Slack？

Slack 是很多團隊的通訊中心。Claude 可以：
- 自動發送任務完成通知
- 讀取和回覆頻道訊息
- 從 Slack 訊息觸發工作流

### Claude Code 方式：Webhook

最簡單的整合 — 使用 Slack Incoming Webhook：

```python
import requests

SLACK_WEBHOOK = "https://hooks.slack.com/services/T.../B.../xxx"

def notify_slack(message):
    requests.post(SLACK_WEBHOOK, json={
        "text": message,
        "username": "Claude Bot",
        "icon_emoji": ":robot_face:"
    })

# 使用範例
notify_slack("發票處理完成 - 共 15 張，總金額 $4,520")
```

### Claude Code 方式：Slack API

更進階的操作 — 讀取訊息、回覆、管理頻道：

```python
from slack_sdk import WebClient

client = WebClient(token="xoxb-your-token")

# 發送訊息
client.chat_postMessage(
    channel="#operations",
    text="今日預約總數：23 單"
)

# 讀取頻道訊息
response = client.conversations_history(channel="C01234567")
messages = response['messages']
```

### Cowork 方式

直接連接 Slack connector：
```
"讀取 #general 頻道的最近 10 條訊息，整理成摘要"
```

### MCP 整合

Claude Code 可以透過 Slack MCP server 實現更深度的整合：

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

## Notion — 知識庫與專案管理

### 為什麼整合 Notion？

Notion 是很多團隊的知識庫和專案管理工具。Claude 可以：
- 自動建立和更新頁面
- 讀取資料庫內容
- 將處理結果寫入 Notion

### Claude Code 方式：Notion API

```python
import requests

NOTION_TOKEN = "secret_..."
NOTION_DB_ID = "abc123..."

headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

# 查詢資料庫
response = requests.post(
    f"https://api.notion.com/v1/databases/{NOTION_DB_ID}/query",
    headers=headers
)
results = response.json()['results']

# 建立新頁面
new_page = {
    "parent": {"database_id": NOTION_DB_ID},
    "properties": {
        "Name": {"title": [{"text": {"content": "每日報告 - 2026-04-11"}}]},
        "Status": {"select": {"name": "完成"}}
    }
}
requests.post("https://api.notion.com/v1/pages", 
              headers=headers, json=new_page)
```

### Cowork 方式

直接連接 Notion connector：
```
"把這份分析報告整理成一個新的 Notion 頁面，
 放在 Operations 資料庫裡"
```

### 實用場景

| 場景 | 工具選擇 |
|------|----------|
| 每日自動更新 Notion 報表 | Claude Code + cron |
| 臨時整理一份筆記到 Notion | Cowork + connector |
| 從 Notion 讀取配置跑自動化 | Claude Code + API |
| 團隊知識庫搜尋 | Cowork + connector |

---

## Slack + Notion 組合工作流

一個常見的自動化流程：

```
1. Claude Code 執行每日數據分析
2. 結果寫入 Notion 資料庫
3. 完成通知發送到 Slack #reports 頻道
4. 團隊成員在 Slack 中收到提醒，點擊連結查看 Notion 報表
```

---

## 練習

1. 建立一個 Slack Webhook，用 Claude Code 發送測試訊息
2. 用 Notion API 建立一個新頁面
3. 設計一個 Slack → Claude Code → Notion 的自動化流程
