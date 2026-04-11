# 模塊 B5：為真實業務打造專屬 Skills

## 🎯 學習目標
- 理解如何將真實業務流程轉化為 Claude Code Skills
- 學會為發票自動化（invoice-automation）編寫完整的 SKILL.md
- 學會為預約處理（booking-intake）編寫完整的 SKILL.md
- 學會為每日營運報告（daily-ops-reporter）編寫完整的 SKILL.md
- 掌握 Skill 中如何引用現有程式碼、API 和資料格式

## 📖 理論解釋

### 為什麼真實業務需要自定義 Skills？

想像你僱用了一位新助理。第一天上班時，你不會只說「去處理發票」——你會給他一份詳細的工作手冊：哪些客戶要開發票、用什麼格式、發送到哪個 email。

Claude Code 的 Skills 就是這份「工作手冊」。沒有 Skill，Claude 每次都要重新猜測你的業務邏輯。有了 Skill，它就像一位訓練有素的員工，知道每一步該怎麼做。

### 本課的真實案例：AUSZ Global

AUSZ Global 是一家高端禮賓車服務平台，營運範圍涵蓋 Sydney、Melbourne、Brisbane、Perth。他們有三個核心自動化需求：

| 需求 | 對應 Skill | 現有腳本 |
|------|-----------|----------|
| 每日發票生成與發送 | `invoice-automation` | `invoice_agent.py` |
| 新預約自動錄入系統 | `booking-intake` | `ausz_booking_agent.py` |
| 每日營運摘要報告 | `daily-ops-reporter` | `main.py` + `analytics_engine.py` |

### Skill 設計三步法

1. **列出業務規則** — 例如：發票 Skill 需要知道 9 家合作夥伴的名稱和佣金比例
2. **定義輸入與輸出** — 例如：輸入是「今天的預約資料」，輸出是「PDF 發票 + 電子郵件」
3. **指定技術細節** — 例如：使用 Gmail API（OAuth2）發送郵件，用 `fpdf2` 產生 PDF

### 第三個 Skill：daily-ops-reporter

這個 Skill 負責每天彙整所有自動化腳本的執行結果，產生一份簡潔的營運摘要。以下是完整的 SKILL.md（儲存為 `~/.claude/skills/daily-ops-reporter.md`）：

````markdown
# daily-ops-reporter

## 角色
你是 AUSZ Global 的每日營運報告助理。你的工作是讀取今日所有自動化腳本的 logs，
彙整成一份簡明報告，並發送到管理者信箱。

## 日誌來源
讀取以下 log 檔案（位於 logs/ 目錄）：
- invoice_agent.log — 發票處理結果
- booking_agent.log — 預約抓取結果
- send_booking_reminders.log — 乘客提醒發送結果
- weekly_earnings.log — 司機收入報告（僅週一）

## 報告格式
郵件主題：AUSZ Daily Ops Report — {YYYY-MM-DD}

郵件內容使用以下結構：
```
=== AUSZ DAILY OPS REPORT ===
Date: {today}

[INVOICES]
- Processed: {count}
- Skipped (already sent): {count}
- Errors: {count}
- Total amount: ${sum}

[BOOKINGS]
- New bookings scraped: {count}
- Google Sheet rows added: {count}

[REMINDERS]
- Passenger reminders sent: {count}
- Failed sends: {count}

[ERRORS SUMMARY]
- {error category}: {count} occurrences
  Example: {first occurrence message}

Status: ALL GREEN / ATTENTION NEEDED
```

## 錯誤分類規則
將 log 中的錯誤分為以下類別：
- NETWORK — 連線逾時、DNS 失敗、HTTP 5xx
- AUTH — 登入失敗、token 過期、OAuth 錯誤
- DATA — 欄位缺失、格式不符、解析失敗
- BROWSER — Playwright 逾時、元素未找到、頁面崩潰

## 收件人
發送至：kin.yip@auszglobal.com.au

## 技術要求
- 使用 ausz_shared.log() 進行所有日誌輸出（避免 Windows cp1252 編碼錯誤）
- 使用 Gmail API（OAuth2）發送郵件
- 時區：Sydney AEST
- 如果所有指標正常，Status 顯示 "ALL GREEN"
- 如果任何錯誤數 > 0，Status 顯示 "ATTENTION NEEDED"
````

這個 Skill 的關鍵在於**錯誤分類規則**——它教會 Claude 如何把雜亂的 log 訊息歸類為有意義的類別，讓管理者一眼就能看出問題在哪裡。

---

## 💻 代碼示例 1：invoice-automation SKILL.md（完整版）

現在讓我們來看最複雜的 Skill——發票自動化。這個檔案你可以直接複製貼上，儲存到你的 `.claude/skills/` 目錄。

首先建立資料夾（Windows Git Bash / Mac / Linux 通用）：
```bash
mkdir -p ~/.claude/skills
```

然後將以下內容儲存為 `~/.claude/skills/invoice-automation.md`：

```markdown
# invoice-automation

## 角色
你是 AUSZ Global 的發票自動化助理。你負責為合作夥伴生成每日/每週發票，
處理過路費（tolls），並透過 Gmail API 發送發票郵件。

## 合作夥伴清單（PARTNER_CLIENTS）
以下是 9 家合作夥伴，每家都有各自的佣金比例和聯絡 email：
- Instyle
- TVA
- Melbourne Chauffeur
- Signature
- Limonet
- LimoCentral
- Streamline
- Exoticar
- Grandeur

佣金比例和 email 定義在 config.py 的 PARTNER_CLIENTS 字典中。
絕對不要硬編碼這些值——永遠從 config.py 讀取。

## 執行模式
invoice_agent.py 支援三種模式：
1. `--period today` — 處理今天的預約發票
2. `--period week` — 處理本週的預約發票
3. `--tolls` — 處理過路費發票

所有模式都可加上 `--auto` 旗標來跳過確認提示。

## 過路費偵測邏輯（Toll Detection）
- 從預約記錄中尋找包含 toll 費用的行程
- Toll 金額從行程詳細資料中提取
- 每筆 toll 費用會附加在對應合作夥伴的發票上
- 如果找不到 toll 金額，記錄警告但不中斷流程

## 跳過邏輯（Skip Logic）
- 使用 invoice_agent_state.json 追蹤已處理的預約
- 如果某筆預約的發票已經發送過，自動跳過
- 狀態檔案格式：{"processed_booking_ids": ["BK001", "BK002", ...]}
- 每次成功發送後，將 booking ID 寫入狀態檔案

## 發票 PDF 生成
- 使用 fpdf2 庫生成 PDF
- 模板素材位於 invoice_images/ 目錄（logo、印章等）
- PDF 儲存至 invoices/ 目錄
- 檔名格式：{partner}_{date}_{booking_id}.pdf

## 郵件格式與發送
- 每位合作夥伴收到一封彙整郵件
- 主題：AUSZ Invoice — {Partner Name} — {Date Range}
- 內文：行程摘要（日期、乘客、路線、金額）
- 附件：對應的 PDF 發票
- 使用 Gmail API（OAuth2），認證：credentials.json + token.json
- 寄件者顯示名稱："Ausz Admin"
- 絕對不要 commit credentials.json 或 token.json 到 Git
- 日誌使用 ausz_shared.log()，輸出至 logs/invoice_agent.log

## 錯誤處理
- 如果某位合作夥伴的 email 找不到，發送至 fallback 信箱
- 如果 PDF 生成失敗，記錄錯誤並繼續處理下一筆
- 如果 Gmail API 認證過期，提示用戶重新授權
- 絕對不要因為單筆失敗而中斷整個批次
```

### 設計重點解析

- **「合作夥伴清單」** 列出名稱但強調**不要硬編碼佣金比例**。資料應從 config.py 讀取，新增或刪除客戶時不需要改 Skill。
- **「跳過邏輯」** 防止重複發送——就像助理有本記事本，記錄「哪些發票已寄出」。
- **「錯誤處理」** 的核心原則：**絕不因單筆失敗而中斷整個批次**。50 筆發票不能因第 3 筆出錯就放棄剩下 47 筆。

### 預期輸出：

```
📸 [你應該看到的畫面]
> claude "幫我執行今天的發票處理"

┌─────────────────────────────────────────┐
│ 檢查 invoice_agent_state.json...        │
│ 找到 12 筆待處理，跳過 3 筆已處理        │
│ Instyle 發票... 完成                    │
│ TVA 發票... 完成                        │
│ 已發送 9 封發票郵件，狀態檔案已更新       │
└─────────────────────────────────────────┘
```

---

## 💻 代碼示例 2：booking-intake SKILL.md（完整版）

將以下內容儲存為 `~/.claude/skills/booking-intake.md`：

```markdown
# booking-intake

## 角色
你是 AUSZ Global 的預約處理助理。你的工作是從指定的 email 中讀取
新預約請求，解析預約資料，然後透過 Playwright 瀏覽器自動化填寫到
Django 管理後台。

## 預約來源
- 從 Gmail 收件匣讀取特定寄件者的 email
- 使用 Gmail API（OAuth2）存取信箱
- 認證檔案：credentials.json + token.json
- SCOPES: gmail.send, gmail.readonly

## Django 管理後台
- URL: https://system.auszglobal.com.au/admin/bookings/booking/
- 使用 Playwright 進行瀏覽器自動化
- 登入方式：填寫 username + password 欄位 → 點擊提交
- 帳號密碼儲存在 .env 檔案（透過 python-dotenv 載入），絕不硬編碼

## Playwright 自動化流程
1. 啟動瀏覽器（Windows 需要 headless=False）
2. 登入：填寫 username/password → 點擊 submit → 等待 networkidle
3. 導航至 booking 新增頁面
4. 填寫表單欄位：passenger name、pickup datetime、pickup/dropoff location、vehicle type、special requests、flight number（如適用）
5. 提交表單並驗證成功

## 車型對應
AUSZ 只使用歐洲車款：
- Mercedes-Benz（S-Class、E-Class、V-Class）
- BMW（7 Series、5 Series）
- Audi（A8、A6）
絕不使用 Camry 或 Kluger。

## 資料驗證
填寫表單前檢查：日期格式（DD/MM/YYYY 或 YYYY-MM-DD）、24 小時制時間、乘客姓名與上車地點不為空。必填欄位缺失則跳過並記錄警告。

## Google Sheets 同步與日誌
- 成功錄入的預約同時寫入 Google Sheet（gspread + service account）
- 使用 ausz_shared.log() 記錄每筆預約的乘客名、日期、狀態
- 絕不 commit google_credentials.json 到 Git

## 錯誤處理
- Playwright 逾時：等待最多 30 秒，超時則截圖並記錄
- 表單提交失敗：檢查頁面上的錯誤訊息並記錄
- Email 解析失敗：跳過該封 email 並記錄原始內容
- 絕不因為單筆失敗而中斷整個批次
```

### 設計重點解析

- **「Playwright 自動化流程」** 是核心——像教新員工操作系統，每一步寫清楚，Claude 不需要猜測。
- **「車型對應」** 反映品牌定位。明確告訴 Claude「絕不使用 Camry」，避免填入不符合品牌形象的選項。
- **「headless=False」** 是 Windows Task Scheduler 的硬性限制，漏掉這點腳本會在排程執行時失敗。

### 預期輸出：

```
📸 [你應該看到的畫面]
> claude "處理今天的新預約 email"

┌─────────────────────────────────────────┐
│ Gmail API 連接成功，找到 3 封新預約       │
│ 1/3 John Smith → Django 填表完成         │
│ 2/3 Sarah Lee → Django 填表完成          │
│ 3/3 [欄位缺失] 跳過並記錄警告            │
│ 完成：2 筆成功、1 筆跳過                 │
└─────────────────────────────────────────┘
```

---

## ✍️ 動手練習

### 練習 1：修改 daily-ops-reporter 加入新指標

打開你剛才學到的 `daily-ops-reporter` SKILL.md，試著加入一個新的段落：

```markdown
[DRIVER PERFORMANCE]
- Active drivers today: {count}
- Average rating: {score}/5
- Complaints: {count}
```

**提示：** 想想看——你還需要告訴 Claude 這些資料從哪裡來嗎？是的！你需要加一個「資料來源」說明，告訴它去哪個 log 檔案或資料庫取得司機資料。

### 練習 2：為你自己的業務設計一個 Skill

用這個精簡模板，為你自己的工作設計一個 Skill：

```markdown
# {skill 名稱}
## 角色 — 你是 {公司} 的 {角色}
## 資料來源 — 從 {哪裡} 取得資料
## 處理規則 — 規則 1... 規則 2...
## 輸出格式 — {最終產出}
## 錯誤處理 — 如果 {情況}，則 {處理方式}
```

**提示：** 回想你每天重複做的工作——哪些步驟可以寫成規則？

---

## ❓ 小測驗（3 條題目）

**1. 為什麼 SKILL.md 中的「合作夥伴清單」段落強調「不要硬編碼佣金比例」？**

A. 因為 Claude 無法讀取數字
B. 因為佣金比例可能隨時變更，應從 config.py 動態讀取
C. 因為硬編碼會讓檔案太大
D. 因為 SKILL.md 不支援數字

答案：B — 佣金比例可能隨時更新。寫死在 SKILL.md 中，每次變更都要改兩個地方，容易出錯。應讓 Claude 從 config.py 讀取最新資料。

**2. booking-intake Skill 中為什麼要特別註明「Windows 上需要 headless=False」？**

A. 因為 Windows 不支援瀏覽器
B. 因為 headless 模式在 Mac 上無法使用
C. 因為 Windows Task Scheduler 需要互動式會話，headless 模式會導致腳本失敗
D. 因為 headless=False 可以讓腳本跑得更快

答案：C — Windows Task Scheduler 需要互動式會話。Playwright 使用 headless=True 會因缺少顯示環境而失敗。

**3. daily-ops-reporter 中的「錯誤分類規則」將錯誤分為四類。如果 log 中出現 "OAuth token expired"，它應該歸類為哪一類？**

A. NETWORK
B. AUTH
C. DATA
D. BROWSER

答案：B — "OAuth token expired" 是認證問題，屬於 AUTH 類別。清晰的錯誤分類讓管理者快速判斷問題性質。

---

## 🔗 下一步

恭喜你完成了 Bonus 模塊 B5！你已經學會了如何為真實業務打造三個完整的 Claude Code Skills。

接下來你可以：
- 將這三個 SKILL.md 部署到 `~/.claude/skills/` 目錄，在 Claude Code 中測試
- 根據實際使用情況持續調整 SKILL.md 的內容

記住：好的 Skill 會隨業務一起成長。每次 Claude 做了「不太對」的事，就回來更新 SKILL.md。這就是 AI 自動化的核心：**持續迭代、持續改進**。
