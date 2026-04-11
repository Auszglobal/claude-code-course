# 模塊 5.1：MCP 伺服器與外部工具

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解什麼是 MCP（Model Context Protocol）以及它的作用
  - 解釋 MCP 伺服器如何擴展 Claude Code 的能力
  - 設定一個簡單的 MCP 伺服器並連接到 Claude Code
  - 使用 MCP 工具存取外部服務（如資料庫、檔案系統）
  - 探索 MCP 生態系統中可用的伺服器

## 📖 理論解釋

### 什麼是 MCP？

想像你剛買了一支新手機。手機本身能打電話、拍照，但功能有限。當你從 App Store 安裝各種 App 後——地圖導航、網路銀行、外送服務——手機突然變得無所不能。

**MCP（Model Context Protocol）就像 Claude Code 的 App Store。**

Claude Code 本身已經很強大——它能讀寫檔案、執行指令、搜尋程式碼。但透過 MCP，你可以給它安裝「新能力」：

- 🗄️ 連接資料庫，直接查詢和修改資料
- 🌐 存取外部 API，獲取即時資訊
- 📁 操作特殊的檔案系統或雲端儲存
- 🔧 使用專業工具，如設計軟體、專案管理系統

### MCP 的運作原理

MCP 的架構很簡單，可以用餐廳來比喻：

```
你（顧客）  →  Claude Code（服務生）  →  MCP 伺服器（廚房）  →  外部服務（食材倉庫）
```

1. **你**告訴 Claude Code 你需要什麼（例如：「查詢資料庫裡的訂單」）
2. **Claude Code** 知道有一個 MCP 工具可以處理這個請求
3. **MCP 伺服器**接收請求，連接到資料庫，取得結果
4. 結果一路回傳給你

### MCP 伺服器的類型

| 類型 | 比喻 | 範例 |
|------|------|------|
| 資料庫伺服器 | 圖書館員幫你找書 | SQLite、PostgreSQL |
| 檔案系統伺服器 | 文件管理員 | 存取特定目錄或雲端檔案 |
| API 伺服器 | 翻譯員幫你和外國人溝通 | GitHub、Slack、Google |
| 專業工具伺服器 | 專業技師 | 設計工具、部署服務 |

## 💻 代碼示例 1：查看目前的 MCP 設定

在開始安裝新的 MCP 伺服器之前，讓我們先了解 Claude Code 的設定檔結構。

在終端機中輸入：

```bash
# 查看 Claude Code 的全域設定目錄
ls ~/.claude/

# 查看是否已有 MCP 設定檔
cat ~/.claude/settings.json
```

📸 [你應該看到的畫面]
```
┌─────────────────────────────────────────────────┐
│ $ ls ~/.claude/                                 │
│ CLAUDE.md  settings.json  keybindings.json      │
│                                                 │
│ $ cat ~/.claude/settings.json                   │
│ {                                               │
│   "permissions": { ... },                       │
│   "hooks": { ... }                              │
│ }                                               │
└─────────────────────────────────────────────────┘
```

MCP 伺服器可以在兩個地方設定：

```bash
# 方法一：全域設定（所有專案都能用）
# 檔案位置：~/.claude/settings.json

# 方法二：專案設定（只有這個專案能用）
# 檔案位置：你的專案目錄/.claude/settings.json
```

### 預期輸出：
你會看到目前的設定檔內容。如果你還沒設定過 MCP，檔案裡可能沒有 `mcpServers` 這個區塊——這很正常，我們接下來就要加上它。

## 💻 代碼示例 2：安裝並設定一個 MCP 伺服器

讓我們安裝一個實用的 MCP 伺服器——**filesystem 伺服器**，它能讓 Claude Code 安全地存取指定目錄的檔案。

### 步驟一：安裝 MCP 伺服器套件

```bash
# 使用 npm 安裝 filesystem MCP 伺服器（全域安裝）
npm install -g @modelcontextprotocol/server-filesystem
```

### 步驟二：在 Claude Code 中新增 MCP 設定

你可以直接在 Claude Code 中使用指令來新增 MCP 伺服器：

```bash
# 使用 claude 指令新增 MCP 伺服器
# 語法：claude mcp add <名稱> <指令> [參數...]
claude mcp add filesystem npx @modelcontextprotocol/server-filesystem /path/to/your/project
```

在 Windows 上，路徑要改成你的實際專案路徑：

```bash
# Windows 範例
claude mcp add filesystem npx @modelcontextprotocol/server-filesystem C:/Users/你的名字/Documents/my-project
```

### 步驟三：確認設定成功

```bash
# 查看目前已設定的 MCP 伺服器
claude mcp list
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────┐
│ $ claude mcp list                                    │
│                                                      │
│ MCP Servers:                                         │
│   filesystem                                         │
│     Command: npx @modelcontextprotocol/server-...    │
│     Status: connected                                │
└──────────────────────────────────────────────────────┘
```

### 步驟四：在 Claude Code 中使用

現在啟動 Claude Code，你可以這樣使用新工具：

```
> 請列出 my-project 目錄下的所有檔案

Claude Code 會自動使用 filesystem MCP 工具來讀取目錄內容，
而不是只用內建的 bash 指令。
```

### 設定檔的樣子

如果你好奇設定檔長什麼樣，它會像這樣：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/你的名字/Documents/my-project"
      ]
    }
  }
}
```

### 預期輸出：
執行 `claude mcp list` 後，你應該能看到剛才新增的伺服器名稱和狀態。如果狀態顯示 `connected`，代表一切正常。

## 💻 補充示例：探索 MCP 生態系統

MCP 生態系統正在快速成長。以下是一些常用的 MCP 伺服器：

| 伺服器名稱 | 用途 | 安裝指令 |
|------------|------|----------|
| `server-filesystem` | 安全存取檔案系統 | `npm i -g @modelcontextprotocol/server-filesystem` |
| `server-github` | 操作 GitHub（Issues、PR） | `npm i -g @modelcontextprotocol/server-github` |
| `server-sqlite` | 查詢 SQLite 資料庫 | `npm i -g @modelcontextprotocol/server-sqlite` |
| `server-postgres` | 連接 PostgreSQL 資料庫 | `npm i -g @modelcontextprotocol/server-postgres` |
| `server-slack` | 發送 Slack 訊息 | `npm i -g @modelcontextprotocol/server-slack` |

安裝方式都一樣：

```bash
# 安裝
npm install -g @modelcontextprotocol/server-sqlite

# 新增到 Claude Code
claude mcp add sqlite npx @modelcontextprotocol/server-sqlite /path/to/database.db

# 確認
claude mcp list
```

你也可以在這個網站瀏覽所有可用的 MCP 伺服器：
- 官方 MCP 伺服器列表：https://github.com/modelcontextprotocol/servers

## ✍️ 動手練習

### 練習 1：安裝你的第一個 MCP 伺服器
1. 選擇上面表格中的任何一個 MCP 伺服器
2. 使用 `npm install -g` 安裝它
3. 使用 `claude mcp add` 新增到 Claude Code
4. 使用 `claude mcp list` 確認已連接

> 💡 提示：如果你不確定要選哪個，推薦從 `server-filesystem` 開始，它最簡單也最實用。

### 練習 2：探索 MCP 工具
1. 安裝好一個 MCP 伺服器後，啟動 Claude Code
2. 試著問 Claude Code：「你現在有哪些 MCP 工具可以用？」
3. 嘗試使用一個 MCP 工具完成一個簡單任務

> 💡 提示：例如安裝了 filesystem 伺服器後，可以請 Claude Code 幫你整理某個目錄的檔案結構。

## ❓ 小測驗（3 條題目）

1. MCP 的全名是什麼？它的主要作用是什麼？
   A. Multi-Code Protocol — 讓多個程式碼檔案互相溝通
   B. Model Context Protocol — 讓 Claude Code 能連接外部服務和工具
   C. Machine Control Program — 控制電腦硬體的程式
   D. Managed Cloud Platform — 管理雲端伺服器的平台
   答案：B — MCP 是 Model Context Protocol，它像 App Store 一樣讓 Claude Code 安裝新能力，連接資料庫、API 等外部服務。

2. 以下哪個指令可以查看目前已設定的 MCP 伺服器？
   A. `claude mcp status`
   B. `claude mcp show`
   C. `claude mcp list`
   D. `claude mcp servers`
   答案：C — `claude mcp list` 會列出所有已設定的 MCP 伺服器及其連線狀態。

3. MCP 伺服器的設定可以放在哪些位置？
   A. 只能放在全域設定（~/.claude/settings.json）
   B. 只能放在專案設定（專案目錄/.claude/settings.json）
   C. 全域設定或專案設定都可以
   D. 只能透過環境變數設定
   答案：C — MCP 伺服器可以設定在全域（所有專案共用）或專案層級（只有該專案使用），這給你很大的彈性。

## 🔗 下一步

太棒了！你已經學會如何擴展 Claude Code 的能力了。在下一個模塊 **5.2：自定義工作流與 Hooks** 中，我們將學習如何設定自動觸發器，讓 Claude Code 在特定操作前後自動執行你定義的動作——就像設定智慧家居的自動化規則一樣！
