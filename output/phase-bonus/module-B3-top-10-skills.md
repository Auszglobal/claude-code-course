# 模塊 B3：十大必裝 Skills — 讓 Claude Code 功力倍增

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解什麼是 Claude Code Skills 以及它們如何擴展 Claude Code 的能力
  - 安裝並使用官方和社區提供的 Skills
  - 根據自己的需求選擇合適的 Skills 組合
  - 用 frontend-design Skill 快速建立網頁
  - 用 TDD Skill 實踐「先寫測試、再寫程式碼」的開發方法

## 📖 理論解釋

### 什麼是 Skills？

想像你請了一位非常聰明的助手（Claude Code）來幫你工作。這位助手什麼都能做，但如果你給他一本**專業手冊**，他就能做得更好、更快、更專業。

**Skills 就是這些專業手冊。** 每個 Skill 會教 Claude Code 一套特定的工作方法和最佳實踐，讓它在某個領域表現得更出色。

Skills 主要分為**官方 Skills**（Anthropic 出品，穩定可靠）和**社區 Skills**（全球開發者貢獻，有很多優秀作品）。

### 安裝語法

```bash
# 官方 Skill
npx skills add anthropics/claude-code --skill skill-name

# 社區 Skill
npx skills add developer-name/repo-name
```

安裝後 Skill 會自動生效，下次給出相關指令時 Claude Code 就會運用該 Skill 的知識。

---

## 十大 Skills 速覽表

| # | Skill 名稱 | 類型 | 用途 | 適合誰 |
|---|-----------|------|------|--------|
| 1 | **frontend-design** | 官方 | 建立專業級網頁 UI | 想做網站的人 |
| 2 | **obra/superpowers** | 社區 | 20+ 實戰技能合集 | 所有人（強烈推薦） |
| 3 | **mcp-builder** | 官方 | 建立 MCP Server | 想擴展工具的人 |
| 4 | **test-driven-development** | 社區 | 先測試、再寫碼 | 注重程式碼品質的人 |
| 5 | **webapp-testing** | 官方 | 網頁自動化測試 | 做 Web App 的人 |
| 6 | **skill-creator** | 官方 | 建立自定義 Skill | 想分享 Skill 的人 |
| 7 | **software-architecture** | 社區 | 架構設計指導 | 做大型專案的人 |
| 8 | **varlock** | 社區 | 安全管理環境變數 | 處理機密設定的人 |
| 9 | **prompt-engineering** | 社區 | 進階提示詞技巧 | 想寫更好指令的人 |
| 10 | **debug-skill** | 社區 | 真正的 Debugger 除錯 | 需要深入除錯的人 |

---

## 逐一介紹十大 Skills

### 1. frontend-design（官方）— 建立專業級網頁

讓 Claude Code 像資深前端設計師，建立美觀、響應式、可直接上線的網頁。

```bash
npx skills add anthropics/claude-code --skill frontend-design
```

> **你說：**「幫我建立一個咖啡店的 landing page，要有 hero section、菜單和聯絡表單。」
> **Claude Code：** 自動生成完整 HTML/CSS/JS，使用 CSS Grid 排版、響應式設計、配色和表單驗證。

**適用場景：** 個人網站、作品集、產品頁面、活動頁面。

### 2. obra/superpowers（社區）— 20+ 實戰技能合集

一個「技能大禮包」，包含 TDD、除錯、Git worktree、程式碼審查等 20+ 個 Skills。由資深開發者 Jesse Vincent 維護。

```bash
npx skills add obra/superpowers
```

> **你說：**「用 git worktree 幫我在新分支上修 bug，不要影響目前的工作。」
> **Claude Code：** 自動在獨立目錄建立 worktree，切換到新分支修復，完成後提示你合併。

**適用場景：** 建議所有人都裝，社區中最全面、最受好評的合集。

### 3. mcp-builder（官方）— 建立 MCP Server

一步一步引導你建立自己的 MCP Server，讓 Claude Code 連接新的外部工具和資料來源。

```bash
npx skills add anthropics/claude-code --skill mcp-builder
```

> **你說：**「建立一個 MCP Server 查詢公司內部 API 的訂單資料。」
> **Claude Code：** 建立專案結構、定義 tools、設定 API 連接、生成測試和文件。

**適用場景：** 想讓 Claude Code 連接它目前不支援的服務或資料庫時。

### 4. test-driven-development — 先測試、再實作

強制 Claude Code 遵循 TDD 流程 — 先寫測試確認需求，再寫程式碼讓測試通過。（已包含在 obra/superpowers 中）

```bash
npx skills add obra/superpowers
```

> **你說：**「用 TDD 幫我寫一個計算運費的函數。」
> **Claude Code：** 先寫測試（紅燈）→ 寫程式碼讓測試通過（綠燈）→ 重構優化。

**適用場景：** 寫任何重要的業務邏輯時，確保程式碼正確可靠。

### 5. webapp-testing（官方）— 網頁自動化測試

使用 Playwright 框架，讓 Claude Code 打開瀏覽器、點擊按鈕、填表單，驗證網頁是否正常。

```bash
npx skills add anthropics/claude-code --skill webapp-testing
```

> **你說：**「測試登入頁面，確認帳密錯誤時會顯示錯誤訊息。」
> **Claude Code：** 啟動瀏覽器、輸入錯誤帳密、點擊登入、檢查錯誤提示並截圖。

**適用場景：** 網頁表單、登入流程、購物車等互動功能的測試。

### 6. skill-creator（官方）— 建立你自己的 Skill

互動式引導你建立自定義 Skill，把工作流程和最佳實踐包裝成 Skill 分享給團隊或社區。

```bash
npx skills add anthropics/claude-code --skill skill-creator
```

> **你說：**「建立一個 Skill，讓 Claude Code 寫 Python 時遵循公司編碼規範。」
> **Claude Code：** 詢問規範細節、建立 Skill 定義檔、設定觸發條件、測試。

**適用場景：** 當你發現自己反覆給相同指示時，做成 Skill 一勞永逸。

### 7. software-architecture — 架構設計指導

讓 Claude Code 自動遵循 Clean Architecture、SOLID 原則和常見設計模式。

```bash
npx skills add ComposioHQ/awesome-claude-skills
```

> **你說：**「幫我設計一個訂單管理系統的架構。」
> **Claude Code：** 按 Clean Architecture 分層、定義 entities 和 use cases、建議設計模式。

**適用場景：** 開始新專案或需要重構現有架構時。

### 8. varlock — 安全管理環境變數

確保 API Key、密碼等機密設定不會意外寫入程式碼或提交到 Git。

```bash
npx skills add BehiSecc/awesome-claude-skills
```

> **你說：**「設定專案的環境變數，有 API Key 和資料庫密碼。」
> **Claude Code：** 建立 .env 範本、確認 .gitignore、使用安全讀取方式、提醒敏感資訊。

**適用場景：** 任何涉及 API Key、密碼、token 等機密資訊的專案。

### 9. prompt-engineering — 進階提示詞技巧

撰寫 AI 提示詞時，自動運用 Chain-of-Thought、Few-shot 等技巧。

```bash
npx skills add ComposioHQ/awesome-claude-skills
```

> **你說：**「寫一個 prompt 讓 AI 準確分類客戶投訴郵件。」
> **Claude Code：** 使用結構化格式、加入 Few-shot 範例、設定推理步驟、處理邊界情況。

**適用場景：** 開發 AI 應用、寫系統提示詞、最佳化 LLM 輸出。

### 10. debug-skill — 真正的 Debugger 除錯

不只「看」程式碼找問題，而是真正啟動 debugger，設斷點、查變數值、逐步執行。

```bash
npx skills add BehiSecc/awesome-claude-skills
```

> **你說：**「這個函數結果不對，幫我 debug。」
> **Claude Code：** 設斷點、啟動 debugger、逐步檢查變數、找到問題並提供修復。

**適用場景：** 當 console.log 不夠用，需要深入追蹤程式碼執行流程時。

---

## 💻 代碼示例 1：用 frontend-design 建立 Landing Page

### 步驟一：安裝 Skill

```bash
npx skills add anthropics/claude-code --skill frontend-design
```

📸 [你應該看到的畫面]
```
┌─────────────────────────────────────────────┐
│ Installing skill: frontend-design           │
│ Source: anthropics/claude-code               │
│ ✓ Skill installed successfully              │
└─────────────────────────────────────────────┘
```

### 步驟二：建立專案並下指令

```bash
mkdir my-landing-page && cd my-landing-page
claude
```

進入後輸入：

```
幫我建立一個寵物美容店的 landing page。
要求：
- Hero section 標題「毛孩子的五星級 SPA」
- 服務區塊：洗澡、美容、寄宿，各配 emoji
- 價目表用卡片式排版
- 底部放聯絡資訊和營業時間
- 暖色系配色（米白 + 淡橘）
- 支援手機瀏覽（響應式）
```

### 預期輸出：

Claude Code 會生成 `index.html`（結構）、`styles.css`（樣式+響應式）、`script.js`（互動效果）。直接在瀏覽器打開 `index.html` 即可查看。想調整的話，直接說「把標題改大一點」或「服務區塊改兩欄」。

---

## 💻 代碼示例 2：用 TDD Skill 寫程式

### 步驟一：安裝並建立專案

```bash
npx skills add obra/superpowers

mkdir tdd-demo && cd tdd-demo
npm init -y
npm install jest
```

### 步驟二：用 TDD 方式開發

啟動 Claude Code，輸入：

```
用 TDD 方式寫一個 calculateDiscount 函數。
規則：1000 元以上打 9 折、3000 以上打 8 折、5000 以上打 7 折、VIP 額外 95 折
```

Claude Code 自動遵循「紅 → 綠 → 重構」流程：

**紅燈 — 先寫測試（預期失敗）：**

```javascript
// calculateDiscount.test.js
const { calculateDiscount } = require('./calculateDiscount');

describe('calculateDiscount 折扣計算', () => {
  test('低於 1000 元不打折', () => {
    expect(calculateDiscount(500, false)).toBe(500);
  });
  test('1000 元以上打 9 折', () => {
    expect(calculateDiscount(1000, false)).toBe(900);
  });
  test('3000 元以上打 8 折', () => {
    expect(calculateDiscount(3000, false)).toBe(2400);
  });
  test('5000 元以上打 7 折', () => {
    expect(calculateDiscount(5000, false)).toBe(3500);
  });
  test('VIP 額外打 95 折', () => {
    expect(calculateDiscount(5000, true)).toBe(3325);
  });
});
```

**綠燈 — 寫程式碼讓測試通過：**

```javascript
// calculateDiscount.js
function calculateDiscount(amount, isVIP) {
  let discount = 1;                          // 預設不打折
  if (amount >= 5000) discount = 0.7;        // 7 折
  else if (amount >= 3000) discount = 0.8;   // 8 折
  else if (amount >= 1000) discount = 0.9;   // 9 折

  let finalAmount = amount * discount;
  if (isVIP) finalAmount *= 0.95;            // VIP 額外 95 折
  return finalAmount;
}
module.exports = { calculateDiscount };
```

### 預期輸出：

```
📸 [測試結果]
┌─────────────────────────────────────────────┐
│ PASS  ./calculateDiscount.test.js           │
│                                             │
│ calculateDiscount 折扣計算                    │
│   ✓ 低於 1000 元不打折 (2 ms)                 │
│   ✓ 1000 元以上打 9 折 (1 ms)                 │
│   ✓ 3000 元以上打 8 折 (1 ms)                 │
│   ✓ 5000 元以上打 7 折                         │
│   ✓ VIP 額外打 95 折 (1 ms)                   │
│                                             │
│ Tests: 5 passed, 5 total                    │
└─────────────────────────────────────────────┘
```

第三步是**重構** — Claude Code 會優化程式碼（例如提取折扣規則為設定檔），同時確保測試仍全部通過。

---

## ✍️ 動手練習

### 練習 1：安裝你的第一個 Skill
選一個有興趣的 Skill 安裝，啟動 Claude Code 給一個相關任務，觀察行為是否不同。推薦從 `obra/superpowers` 開始。

### 練習 2：用 frontend-design 建立你的網頁
安裝 frontend-design，請 Claude Code 建立一個你喜歡主題的網頁（個人作品集、食譜網站等），在瀏覽器打開查看，再用口語修改設計。不需要懂 HTML 或 CSS。

---

## ❓ 小測驗（3 條題目）

**1. Skills 在 Claude Code 中扮演什麼角色？**

A. 它是一種程式語言
B. 它是擴展 Claude Code 能力的專業知識包
C. 它是 Claude Code 的付費升級功能
D. 它是一種檔案格式

答案：B — Skills 就像「專業手冊」，安裝後讓 Claude Code 在特定領域表現更專業。

**2. TDD 的正確流程是什麼？**
A. 寫程式碼 → 寫測試 → 重構　B. 寫測試 → 寫程式碼 → 部署
C. 寫測試 → 寫程式碼讓測試通過 → 重構　D. 重構 → 寫測試 → 寫程式碼

答案：C — 先寫測試（紅燈），再寫最少程式碼讓測試通過（綠燈），最後重構。

**3. 想一次獲得最多 Skills，應該安裝哪一個？**
A. frontend-design　B. skill-creator　C. obra/superpowers　D. mcp-builder

答案：C — 一次安裝包含 20+ 個 Skills，涵蓋 TDD、除錯、Git 工作流等。

---

## 🔗 下一步

恭喜你認識了十大必裝 Skills！建議先安裝 2-3 個最需要的 Skills 體驗效果，再用 skill-creator 建立自己的 Skill 分享給團隊。

> **記住：** Skills 不是越多越好。選擇最相關的幾個熟練使用，才能真正提升效率。就像廚師不需要所有廚具，但幾把好刀用得順手，就能做出美味佳餚。
