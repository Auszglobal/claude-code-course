# 7.5 第三方整合全景圖

## Claude Code 整合密切度排名

不同第三方工具與 Claude Code 的整合程度差異很大。以下按密切度從高到低排列：

### Tier 1 — 深度整合（幾乎每次都用）

| 工具 | 密切度 | 說明 |
|------|--------|------|
| **Git** | ★★★★★ | 內建支援，幾乎每個任務都涉及版本控制 |
| **GitHub** | ★★★★★ | `gh` CLI 完整支援 — PR、Issue、Actions、Review |
| **npm / pip** | ★★★★★ | 套件管理是日常開發核心 |
| **Terminal** | ★★★★★ | Claude Code 的運行環境本身 |

### Tier 2 — 緊密整合（經常使用）

| 工具 | 密切度 | 說明 |
|------|--------|------|
| **VS Code / JetBrains** | ★★★★☆ | 官方 IDE 擴充套件，內嵌 Claude Code |
| **AWS CLI** | ★★★★☆ | 部署、資料庫、伺服器管理 |
| **Docker** | ★★★★☆ | 容器化部署和開發環境 |
| **Google Sheets** | ★★★☆☆ | 透過 `gspread` + 服務帳號 |
| **Gmail API** | ★★★☆☆ | 自動化郵件通知和報表 |

### Tier 3 — 中度整合（按需使用）

| 工具 | 密切度 | 說明 |
|------|--------|------|
| **Slack** | ★★★☆☆ | Webhook 或 API — 通知和協作 |
| **Notion** | ★★★☆☆ | API 整合 — 知識庫和專案管理 |
| **Playwright** | ★★★☆☆ | 瀏覽器自動化和爬蟲 |
| **Firebase** | ★★☆☆☆ | FCM 推送通知 |
| **PostgreSQL** | ★★★☆☆ | 資料庫操作和遷移 |

### Tier 4 — 輕度整合（透過 MCP 或 API）

| 工具 | 密切度 | 說明 |
|------|--------|------|
| **Figma** | ★★☆☆☆ | 透過 MCP connector 讀取設計 |
| **Jira** | ★★☆☆☆ | API 整合 — Issue 追蹤 |
| **Zapier** | ★★☆☆☆ | 透過 MCP 連接 8000+ 應用 |
| **Apify** | ★★☆☆☆ | 透過 MCP — 網頁爬蟲 |

## 選擇整合方式的決策樹

```
需要整合一個第三方工具？
│
├── Claude Code 有內建支援嗎？（Git, npm, CLI 工具）
│   └── ✅ 直接用
│
├── 有官方 MCP server 嗎？
│   └── ✅ 配置在 settings.json
│
├── 有 REST API 嗎？
│   └── ✅ 讓 Claude Code 寫 API 整合腳本
│
├── 有 Zapier 支援嗎？
│   └── ✅ 透過 Zapier MCP（Cowork 限定）
│
└── 都沒有？
    └── 用 Playwright 做瀏覽器自動化
```

## MCP 整合配置範例

在 `~/.claude/settings.json` 中配置：

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

## Claude Code vs Cowork 整合比較

| 場景 | 推薦工具 | 原因 |
|------|----------|------|
| 寫程式碼 + Git + 部署 | Claude Code | 原生開發環境 |
| 整理文件 + 發郵件 | Cowork | connector 更方便 |
| 自動化腳本 + cron | Claude Code | 終端 + Task Scheduler |
| 跨應用工作流 | Cowork | Plugin + connector |
| 資料分析 + 報表 | 視乎技術能力 | Code 更強，Cowork 更易用 |

## 整合安全守則

1. **API 密鑰永不提交到 Git** — 用 `.env` 或環境變數
2. **最小權限原則** — 只給必要的存取權限
3. **定期輪換 Token** — 特別是長期運行的自動化
4. **外部 Skill 必須審查** — prompt injection 是真實風險
5. **Webhook URL 保密** — 洩漏等於任何人都能觸發

---

## 總結

掌握第三方整合是從「用 Claude Code 寫程式碼」升級到「用 Claude Code 管理整個業務」的關鍵。

核心心法：
- **GitHub** 是基礎設施 — 每個項目都要用
- **Google 生態** 是數據中心 — Sheets + Gmail 覆蓋大部分需求
- **Slack/Notion** 是協作樞紐 — 團隊溝通和知識管理
- **AWS** 是部署目標 — 把成果推向生產環境
- **MCP** 是萬能膠水 — 連接一切

---

## 練習

1. 畫出你自己的「第三方整合地圖」— 列出你日常用的工具，標記整合方式
2. 選擇一個 Tier 3/4 的工具，嘗試用 MCP 或 API 整合
3. 設計一個跨 3 個工具的自動化工作流
