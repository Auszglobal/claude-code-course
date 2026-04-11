# 模塊 B1：What Are Claude Code Skills?

## 🎯 學習目標

- 完成本課後你能夠：
  - 解釋什麼是 Claude Code Skill，以及它如何改變 Claude 的行為
  - 理解 Skills 的「漸進式載入」架構（Progressive Disclosure）
  - 區分 Skills、MCP Servers 和 Subagents 的使用場景
  - 找到 Anthropic 官方的 Skills Marketplace
  - 閱讀並理解一個 SKILL.md 文件的結構

---

## 📖 理論解釋

### Skills 是什麼？

想像你請了一位非常聰明的助手（Claude Code），他什麼都懂一點，但不一定知道**你公司的具體做法**。

**Skill 就像一本「專屬操作手冊」**，你放在助手的桌上，當他需要做某件特定任務時，就會翻開來看。

技術上來說，Skill 是一個 **SKILL.md 文件**，放在特定的資料夾裡。當 Claude Code 啟動時，它會掃描這些文件，在需要時載入對應的指引。

### 為什麼需要 Skills？

沒有 Skill 的 Claude Code 就像一位通才醫生——什麼病都能看，但可能不知道你醫院的特殊流程。

有了 Skill 的 Claude Code 就像一位**帶著專科手冊的醫生**——遇到心臟問題時，會自動翻開心臟科的標準流程，確保每一步都正確。

### 漸進式載入架構（Progressive Disclosure）

Skills 的設計非常聰明，它不會一次把所有內容塞進 Claude 的腦子裡（那樣會浪費 tokens 和記憶體）。它分三個階段：

| 階段 | 載入內容 | Token 成本 | 何時發生 |
|------|---------|-----------|---------|
| 第一階段 | Skill 名稱 + 簡短描述（metadata） | ~100 tokens | Claude Code 啟動時 |
| 第二階段 | 完整 SKILL.md 內容 | < 5,000 tokens | 任務匹配到該 Skill 時 |
| 第三階段 | 附帶的資源文件（模板、範例等） | 視文件大小 | Skill 執行時按需載入 |

這就像一間圖書館：

- 第一階段 = 看書名和簡介（快速瀏覽）
- 第二階段 = 把書借回家仔細讀（需要時才拿）
- 第三階段 = 打開書裡附的光碟或練習冊（真正動手時才用）

### 工作流程圖

以下是 Claude Code 處理 Skills 的完整流程：

```
Claude Code starts
      │
      ▼
Scans ~/.claude/skills/  ←── (100 tokens per skill, very cheap)
      │
      ▼
Task matches a skill? ──No──→ Normal operation
      │
     Yes
      ▼
Loads full SKILL.md ←── (up to 5k tokens)
      │
      ▼
Executes with skill context
```

📸 [你可以這樣理解這個流程]
```
┌─────────────────────────────────────────────────────┐
│  Claude Code 啟動                                    │
│  → 掃描 skills 資料夾（就像看一排書的書名）            │
│  → 發現 5 個 Skill：前端設計、TDD、部署、文件、SEO      │
│  → 只記住名字和簡介（非常省資源）                      │
│                                                      │
│  你說：「幫我寫一個 React 元件」                       │
│  → Claude 想：這跟「前端設計」Skill 有關！              │
│  → 載入完整的 frontend-design SKILL.md                │
│  → 按照 Skill 裡的指引來寫代碼                        │
└─────────────────────────────────────────────────────┘
```

### Skills vs MCP Servers vs Subagents

初學者常常搞混這三個概念，以下用一張表格來釐清：

| 特性 | Skills | MCP Servers | Subagents |
|------|--------|-------------|-----------|
| **是什麼** | 一份文字指南（SKILL.md） | 一個持續運行的外部服務 | 一個獨立的 Claude 實例 |
| **比喻** | 操作手冊 | 外接的專用工具 | 請來的外部顧問 |
| **安裝難度** | 複製文件即可 | 需要配置和啟動服務 | 需要程式碼設定 |
| **適合場景** | 改變 Claude 的工作方式 | 連接外部資料來源（資料庫、API） | 需要多個 AI 並行處理複雜任務 |
| **資源消耗** | 極低（純文字） | 中等（需要運行服務） | 較高（多個 AI 實例） |
| **舉例** | TDD 開發流程、代碼風格指南 | GitHub、Slack、資料庫連接 | 自動化研究、大型重構 |

**簡單判斷法：**
- 想讓 Claude **用不同方式做事** → 用 Skill
- 想讓 Claude **連接新的工具或資料** → 用 MCP Server
- 想讓 Claude **同時處理多件事** → 用 Subagent

### Anthropic 官方 Skills Marketplace

Anthropic 和社群開發者提供了許多現成的 Skills，你可以直接安裝使用。常見的來源：

1. **Anthropic 官方 Skills** — `anthropics/claude-code` GitHub repo 中的 skills 資料夾
2. **社群 Skills** — 例如 `obra/superpowers`，由社群開發者貢獻
3. **自己寫的 Skills** — 針對你自己的工作流程定制

### Skills 的跨平台特性

一個很棒的特點：Skills 不只在 Claude Code（命令行）中運作。同一份 SKILL.md 可以在以下平台使用：

- **Claude Code**（命令行工具）
- **Claude.ai**（網頁版）
- **Claude API**（程式化呼叫）

這意味著你寫一次 Skill，到處都能用。

---

## 💻 代碼示例 1：一個最簡單的 SKILL.md 文件

讓我們看看一個 Skill 文件長什麼樣子。以下是一個幫助寫 Git commit 訊息的 Skill：

```markdown
---
name: better-commits
description: Write clear, conventional commit messages following best practices
triggers:
  - commit
  - git commit
  - save changes
---

# Better Commits Skill

## When to use
When the user asks to commit code or save changes to git.

## Instructions

1. Review all staged changes using `git diff --cached`
2. Write a commit message following this format:
   - First line: type(scope): short description (max 72 chars)
   - Types: feat, fix, docs, style, refactor, test, chore
   - Body: explain WHY, not WHAT (the diff shows what changed)
3. Always include a blank line between the subject and body
4. Never use vague messages like "update" or "fix stuff"

## Examples

Good: `feat(auth): add password reset via email verification`
Bad:  `updated auth stuff`

Good: `fix(cart): prevent negative quantity on item removal`
Bad:  `fixed bug`
```

### 各部分解釋：

| 部分 | 作用 | 類比 |
|------|------|------|
| `name` | Skill 的唯一名稱 | 書名 |
| `description` | 簡短描述（第一階段載入） | 書的副標題 |
| `triggers` | 什麼關鍵字會觸發這個 Skill | 書的分類標籤 |
| `# 標題以下` | 完整的操作指引（第二階段載入） | 書的正文 |

### 預期輸出：

安裝這個 Skill 之後，當你在 Claude Code 中說「幫我 commit」，Claude 會：

📸 [安裝 Skill 後的行為變化]
```
┌──────────────────────────────────────────────────┐
│ > 幫我把這些改動 commit                            │
│                                                   │
│ Claude: 讓我先檢查你的改動...                      │
│ [執行 git diff --cached]                          │
│                                                   │
│ 根據改動內容，我建議這個 commit message：            │
│                                                   │
│   feat(invoice): add automatic retry on           │
│   email send failure                              │
│                                                   │
│   When Gmail API returns a 429 rate limit error,  │
│   the agent now waits 30s and retries up to 3     │
│   times before marking the invoice as failed.     │
│                                                   │
│ 要我用這個訊息來 commit 嗎？                        │
└──────────────────────────────────────────────────┘
```

---

## 💻 代碼示例 2：有 Skill vs 沒有 Skill 的對比

讓我們看看同一個任務，Claude Code 在**有 Skill** 和**沒有 Skill** 時的行為差異。

### 場景：你說「幫我寫一個登入頁面」

**沒有 Skill 時：**

```
> 幫我寫一個登入頁面

Claude: 好的，這是一個簡單的登入頁面：

[生成一個基本的 HTML/CSS 登入表單]
[可能用任何框架或純 HTML]
[風格和結構隨機]
```

**安裝了 `frontend-design` Skill 後：**

假設你的 Skill 這樣寫：

```markdown
---
name: frontend-design
description: Build UI components following our design system
triggers:
  - UI
  - component
  - page
  - 頁面
  - 登入
---

# Frontend Design Skill

## Design System Rules
- Framework: React + TypeScript (always)
- Styling: Tailwind CSS (never plain CSS or CSS modules)
- Colors: primary=#008B8B, accent=#00B4A6, dark=#1A1A2E
- Font: Inter for body, Poppins for headings
- All forms must have: loading states, error messages, accessibility labels
- Mobile-first: design for 375px width, then scale up

## Component Structure
- One component per file
- Props interface defined above component
- Use React Hook Form for all forms
- Include unit test file alongside component
```

**Claude 的行為會完全不同：**

```
> 幫我寫一個登入頁面

Claude: 根據我們的設計系統，我會用 React + TypeScript + 
Tailwind CSS 來建立登入頁面。

[生成 LoginPage.tsx — 使用 React Hook Form]
[使用品牌色 #008B8B 和 #00B4A6]
[包含 loading state 和 error handling]
[包含 accessibility labels]
[Mobile-first 響應式設計]
[同時生成 LoginPage.test.tsx]
```

📸 [對比效果]
```
┌─────────────────────┬──────────────────────────┐
│    沒有 Skill        │    有 Skill               │
├─────────────────────┼──────────────────────────┤
│ 隨機選擇框架         │ 固定用 React+TypeScript   │
│ 普通 CSS 或隨機      │ 固定用 Tailwind CSS       │
│ 隨機配色             │ 使用品牌色 #008B8B        │
│ 可能沒有錯誤處理      │ 包含完整錯誤處理          │
│ 可能沒有測試          │ 自動生成測試文件          │
│ 可能不是手機優先      │ Mobile-first 設計         │
└─────────────────────┴──────────────────────────┘
```

**這就是 Skill 的威力 —— 它把 Claude 從「通才」變成「你團隊的專家」。**

---

## ✍️ 動手練習

### 練習 1：閱讀理解

看看以下的 SKILL.md 片段，回答問題：

```markdown
---
name: api-docs
description: Generate API documentation from code
triggers:
  - document
  - API docs
  - swagger
---

# API Documentation Skill

## Rules
- Use OpenAPI 3.0 format
- Include request/response examples
- All endpoints must have description and error codes
```

問題：
1. 這個 Skill 會在什麼時候被觸發？
2. 它會讓 Claude 用什麼格式來生成文件？
3. 它的 metadata 大約佔多少 tokens？

> 提示：答案都在上面的表格和流程圖裡！

### 練習 2：設計你自己的 Skill

想一個你日常工作或學習中經常重複的任務，用以下模板寫出你的 Skill 概念（不需要真的建文件，先在紙上或筆記本寫）：

```
Skill 名稱：_______________
簡短描述：_______________
觸發關鍵字：_______________
主要規則（3-5 條）：
1. _______________
2. _______________
3. _______________
```

> 提示：好的 Skill 通常解決「每次都要重複解釋同樣的事」這種問題。比如：每次都要提醒 Claude 用某個特定框架、遵守某個代碼風格、或按照某個流程來做事。

---

## ❓ 小測驗（3 條題目）

**1. Claude Code Skills 的核心本質是什麼？**

A. 一個需要安裝的軟體外掛  
B. 一份 Markdown 格式的指引文件（SKILL.md）  
C. 一個持續運行的背景服務  
D. Claude 內建的功能模塊  

答案：**B** — Skill 本質上就是一個 SKILL.md 文件，放在指定資料夾裡。它是純文字的，不需要安裝軟體或運行服務。

---

**2. 漸進式載入（Progressive Disclosure）的第一階段載入什麼？**

A. 完整的 SKILL.md 內容（約 5,000 tokens）  
B. Skill 的名稱和簡短描述（約 100 tokens）  
C. Skill 附帶的所有資源文件  
D. 所有已安裝 Skills 的完整內容  

答案：**B** — 第一階段只載入 metadata（名稱 + 描述），大約 100 tokens。這樣即使安裝了很多 Skills，啟動時也不會浪費資源。只有當任務真正匹配到某個 Skill 時，才會載入完整內容。

---

**3. 以下哪個場景最適合用 Skill 來解決？**

A. 需要連接公司的 Slack 頻道來發送通知  
B. 需要同時翻譯 50 份文件  
C. 每次寫代碼都要提醒 Claude 遵守公司的命名規範  
D. 需要從資料庫讀取客戶資料  

答案：**C** — Skill 最適合「改變 Claude 的工作方式」，像是遵守特定規範或流程。A 和 D 需要連接外部服務（用 MCP Server），B 需要並行處理（用 Subagent）。

---

## 🔗 下一步

現在你已經了解什麼是 Skills，接下來在**模塊 B2：Installing Skills — 3 Methods**中，我們會實際動手安裝 Skills！你會學到三種不同的安裝方法，從最簡單的一行指令到手動複製文件，確保你在任何環境下都能安裝成功。
