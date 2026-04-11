# 6.4 Connectors、MCP 與瀏覽器能力

## 三層能力架構

Cowork 與外部世界互動的能力分為三層，按優先順序使用：

```
1. Connectors（MCP）  → 首選：直接 API 整合
2. 瀏覽器擴充套件       → 次選：讀取和操作網頁
3. Computer Use       → 兜底：直接控制螢幕和滑鼠
```

## 第一層：Connectors（MCP）

MCP（Model Context Protocol）讓 Claude 直接在應用中操作 — 不是複製貼上，而是已授權的直接存取。

### 內建支援的應用

- Google Drive
- Notion
- Slack
- Gmail
- GitHub
- Figma

### 連接方式

1. 點選聊天介面的 **+** 號
2. 進入 **Connectors** 標籤
3. 搜尋需要的工具
4. 在瀏覽器完成授權

### 權限控制

每個已連接的應用可分別設定：
- **Always allow** — 始終允許
- **Ask first** — 需要確認
- **Never allow** — 禁止存取

### 進階 Hack：Apify MCP

想從 YouTube、TikTok、Instagram 抓取資料？

1. 在 Apify 建立免費 API Token
2. Cowork connectors 搜尋 "Apify"
3. 貼上 API Key

Claude 會自動從 1300+ 個爬蟲工具中選擇最合適的執行。

### 進階 Hack：Zapier MCP

連接 8000+ 應用（HubSpot、Airtable 等）：

1. 在 Zapier 建立 MCP server
2. 選擇 "Claude Cowork"
3. 配置允許的工具和操作
4. 複製生成的 URL → 貼到 Claude connectors

## 第二層：瀏覽器擴充套件

當沒有 connector 時使用。

### 安裝

1. Chrome Web Store 搜尋 "Claude"
2. 安裝並固定到工具欄
3. Settings → 開啟 "Claude in Chrome"

### 能力

- 自動開啟瀏覽器標籤頁
- 訪問和閱讀網頁內容
- 理解頁面結構（標題、CTA、布局）
- 多步操作（開啟 YouTube → 分析影片數據）

> **重要風險提示**：Claude 使用的是你的真實瀏覽器，登入在你的帳號裡。它有能力直接完成支付。務必設定 blocklist。

## 第三層：Computer Use

最後的兜底手段。Claude 可以：
- 看到你的螢幕
- 控制滑鼠
- 在鍵盤上輸入

**開啟方式**：Settings → General → Computer Use

> **必做**：開啟前先把敏感應用加入 blocklist。

## 與 Claude Code 的 MCP 對比

| 特性 | Cowork MCP | Claude Code MCP |
|------|------------|-----------------|
| 設定方式 | 圖形介面點選 | `~/.claude/settings.json` 配置 |
| 伺服器類型 | 雲端託管 | 本地 stdio 或 SSE |
| 自訂 MCP | 透過 Zapier/Apify | 直接寫 MCP server |
| 瀏覽器能力 | 內建 Chrome 擴充 | 需要 Playwright 等工具 |

---

## 練習

1. 連接一個 Connector（如 Google Drive）
2. 嘗試讓 Cowork 透過 connector 讀取和整理文件
3. 比較 Cowork MCP 和 Claude Code MCP 的配置方式
