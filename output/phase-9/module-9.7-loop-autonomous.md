# 模塊 9.7：/loop 指令與自主 Agent 模式

## 🎯 學習目標
- 理解 `/loop` 指令的用途，以及它如何讓 Claude 自動重複執行任務
- 區分兩種 loop 模式：固定間隔模式與動態自主節奏模式
- 學會使用 `/loop` 搭配 Skills 來建立自動化監控流程
- 了解 ScheduleWakeup 的快取機制（cache-aware timing）及其對效能的影響
- 認識自主 Agent 模式的安全邊界與限制

## 📖 理論解釋

### 什麼是 /loop？

想像你設了一個鬧鐘，每隔 5 分鐘響一次，提醒你去看看烤箱裡的蛋糕有沒有烤好。如果蛋糕還沒好，你就繼續等下一次鬧鐘；如果烤好了，你就把蛋糕拿出來。

**`/loop` 就是 Claude Code 的鬧鐘。** 它告訴 Claude：「每隔一段時間，幫我檢查某件事情，直到完成為止。」

沒有 `/loop` 的時候，Claude 就像一個一次性的助手 — 你問一個問題，它回答，然後就結束了。有了 `/loop`，Claude 變成了一個**持續監控的守衛**，會不斷地巡邏、檢查、修復問題。

### 兩種 Loop 模式

| 模式 | 語法 | 比喻 | 適用場景 |
|------|------|------|----------|
| **固定間隔模式** | `/loop 5m "檢查任務"` | 每 5 分鐘響一次的鬧鐘 | 你知道多久檢查一次最合適 |
| **動態自主模式** | `/loop "監控任務"` | 聰明的管家，自己決定何時巡邏 | 讓 Claude 根據情況自行判斷 |

#### 固定間隔模式

你明確告訴 Claude 多久檢查一次。就像設定微波爐的計時器：

```
/loop 2m "檢查測試是否通過"        ← 每 2 分鐘檢查一次
/loop 5m "看看 build 完成了沒有"   ← 每 5 分鐘檢查一次
/loop 30m /portal-status           ← 每 30 分鐘執行一次健康檢查
```

#### 動態自主模式

你不指定時間間隔，讓 Claude 自己決定什麼時候「醒來」檢查。就像一個有經驗的保全人員，知道什麼時候該多巡邏、什麼時候可以休息：

```
/loop "監控 build 過程，出現錯誤就修復"
/loop "持續跑測試，直到全部通過"
```

在動態模式下，Claude 會使用 **ScheduleWakeup** 功能來安排自己的下一次「醒來」時間。

### ScheduleWakeup 與快取機制

這是一個進階但重要的概念。Claude 在運作時會使用**快取**（cache）來記住之前讀過的檔案和對話內容，這樣可以節省時間和成本。

快取有一個關鍵的時間限制：

```
┌─────────────────────────────────────────────────────┐
│           ScheduleWakeup 快取時間窗口               │
│                                                     │
│  0s ──────── 270s ──── 300s ──── 超過 300s          │
│  │           │          │          │                 │
│  │  ✅ 快取命中區      │          │                 │
│  │  (cache hit)        │          │                 │
│  │  快速且便宜         │  ⚠️ 危險區  ❌ 快取失效      │
│  │                     │          │  (cache miss)   │
│  │                     │          │   需要重新讀取    │
│  │                     │          │  較慢且較貴      │
└─────────────────────────────────────────────────────┘
```

簡單來說：
- **270 秒（4.5 分鐘）以內醒來** → 快取還在，Claude 可以快速繼續工作（省錢省時間）
- **超過 300 秒（5 分鐘）才醒來** → 快取消失了，Claude 需要重新讀取所有資料（較慢、較貴）

所以在動態模式下，Claude 會「聰明地」在快取即將過期前醒來，除非任務本身不需要這麼頻繁的檢查。

### 自主 Agent 模式

當你使用 `/loop` 搭配一個開放性的指令時，Claude 就進入了**自主 Agent 模式** — 它不再只是回答問題，而是：

1. **觀察**：檢查當前狀態（測試結果、build 狀態、錯誤日誌）
2. **判斷**：決定是否需要採取行動
3. **執行**：自動修復問題、重新執行命令
4. **回報**：告訴你做了什麼改動
5. **重複**：安排下一次檢查

```
┌─────────────────────────────────────────┐
│         自主 Agent 運作循環              │
│                                         │
│    ┌──── 觀察 ◄─────────────────┐       │
│    │       │                    │       │
│    │       ▼                    │       │
│    │     判斷                   │       │
│    │    ╱    ╲                  │       │
│    │  需要     不需要            │       │
│    │  行動     行動             │       │
│    │   │        │              │       │
│    │   ▼        ▼              │       │
│    │  執行    等待下一次  ──────┘       │
│    │   │                               │
│    │   ▼                               │
│    └─ 回報 ──► 安排下次喚醒 ───────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 安全考量

`/loop` 雖然強大，但有明確的安全邊界：

| 可以做 | 不可以做 |
|--------|----------|
| 讀取和分析檔案 | 繞過你設定的權限限制 |
| 執行測試和 build 指令 | 自動推送到 git remote |
| 修改程式碼（如果你允許） | 刪除重要檔案 |
| 安裝 npm 套件 | 存取你沒有授權的系統 |
| 回報狀態和結果 | 無限制地執行危險操作 |

Claude 仍然遵守你在 `settings.json` 中設定的所有 hooks 和權限規則。`/loop` 不會讓 Claude 獲得額外的權限 — 它只是讓同樣的操作可以自動重複執行。

## 💻 代碼示例 1：固定間隔監控測試結果

這是最常用的 `/loop` 場景：你正在修改程式碼，想讓 Claude 持續幫你跑測試，一旦失敗就自動修復。

### 在 Claude Code 終端輸入：

```bash
# 場景：你的專案有一些失敗的測試，你想讓 Claude 自動修復它們

# 步驟 1：啟動 loop，每 2 分鐘檢查一次
/loop 2m "執行 npm test，如果有測試失敗，分析錯誤原因並修復程式碼，然後重新執行測試確認修復成功"
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────────┐
│ 🔄 Loop started                                         │
│ Interval: every 2 minutes                                │
│ Task: 執行 npm test，如果有測試失敗...                     │
│                                                          │
│ ─── Iteration 1 ──────────────────────────────────────── │
│ > Running: npm test                                      │
│ FAIL  src/utils.test.js                                  │
│   ✗ calculateTotal should handle empty array             │
│                                                          │
│ Found 1 failing test. Analyzing...                       │
│ The issue is in src/utils.js line 15:                    │
│   return items.reduce(...)  ← crashes on empty array     │
│                                                          │
│ Fixing: Added empty array check                          │
│ > Running: npm test                                      │
│ PASS  src/utils.test.js                                  │
│   ✓ calculateTotal should handle empty array             │
│                                                          │
│ All tests passing. Will check again in 2 minutes...      │
│                                                          │
│ ─── Iteration 2 ──────────────────────────────────────── │
│ > Running: npm test                                      │
│ PASS  All tests passing (12/12)                          │
│ No action needed. Next check in 2 minutes...             │
│                                                          │
│ Press Esc to stop the loop.                              │
└──────────────────────────────────────────────────────────┘
```

### 預期輸出：
- Claude 每 2 分鐘自動執行一次 `npm test`
- 如果有失敗的測試，Claude 會分析原因、修改程式碼、再次執行測試
- 如果所有測試通過，Claude 報告「一切正常」然後等待下一次檢查
- 你隨時可以按 **Esc** 停止 loop

## 💻 代碼示例 2：動態模式 + Skill 組合

這個進階範例展示如何用 `/loop` 搭配自訂 Skill 來建立一個完整的自動監控系統。

### 範例 A：搭配 Skill 使用

```bash
# 每 30 分鐘自動檢查 Django portal 的健康狀態
/loop 30m /portal-status
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────────┐
│ 🔄 Loop started                                         │
│ Interval: every 30 minutes                               │
│ Skill: /portal-status                                    │
│                                                          │
│ ─── 10:00 AM ─────────────────────────────────────────── │
│ Running /portal-status...                                │
│ ✓ Portal is healthy                                      │
│   Response time: 245ms                                   │
│   Database: connected                                    │
│   Last booking: 2 minutes ago                            │
│ Next check at 10:30 AM                                   │
│                                                          │
│ ─── 10:30 AM ─────────────────────────────────────────── │
│ Running /portal-status...                                │
│ ⚠ Portal response slow (1,240ms)                        │
│ Investigating...                                         │
│ Database queries appear normal.                          │
│ High response time may be due to server load.            │
│ Will monitor more closely. Next check at 11:00 AM        │
│                                                          │
│ ─── 11:00 AM ─────────────────────────────────────────── │
│ Running /portal-status...                                │
│ ✓ Portal is healthy                                      │
│   Response time: 198ms                                   │
│ Issue resolved. Next check at 11:30 AM                   │
└──────────────────────────────────────────────────────────┘
```

### 範例 B：動態自主模式 — 監控 Build

```bash
# 不指定間隔，讓 Claude 自己決定檢查頻率
/loop "監控 build 過程。如果 build 失敗，分析錯誤日誌並嘗試修復。build 成功後通知我。"
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────────┐
│ 🔄 Loop started (dynamic pacing)                        │
│ Claude will self-schedule wake-ups                       │
│                                                          │
│ ─── Wake 1 (T+0s) ───────────────────────────────────── │
│ > Checking build status...                               │
│ Build in progress (step 3/7: compiling TypeScript)       │
│ Scheduling next check in 60 seconds (build still early)  │
│                                                          │
│ ─── Wake 2 (T+60s) ──────────────────────────────────── │
│ > Checking build status...                               │
│ Build in progress (step 5/7: running linter)             │
│ Scheduling next check in 45 seconds (getting close)      │
│                                                          │
│ ─── Wake 3 (T+105s) ─────────────────────────────────── │
│ > Checking build status...                               │
│ ❌ Build FAILED at step 6/7 (test suite)                 │
│ Error: TypeError in src/api/handler.ts:42                │
│                                                          │
│ Analyzing error... Found issue: missing null check       │
│ Applying fix to src/api/handler.ts                       │
│ Restarting build...                                      │
│ Scheduling next check in 30 seconds (watching fix)       │
│                                                          │
│ ─── Wake 4 (T+135s) ─────────────────────────────────── │
│ > Checking build status...                               │
│ Build in progress (step 6/7: test suite)                 │
│ Scheduling next check in 30 seconds                      │
│                                                          │
│ ─── Wake 5 (T+165s) ─────────────────────────────────── │
│ > Checking build status...                               │
│ ✅ Build SUCCEEDED! All 7 steps completed.               │
│ Build time: 2m 45s                                       │
│ Fix applied: added null check in handler.ts:42           │
│                                                          │
│ Loop complete. Build is green!                           │
└──────────────────────────────────────────────────────────┘
```

注意動態模式下，Claude 如何根據情況調整檢查頻率：
- Build 剛開始 → 60 秒後再看（不用太著急）
- Build 接近完成 → 45 秒後再看（快好了）
- 剛修完 bug → 30 秒後再看（要確認修復是否有效）

所有的間隔都控制在 **270 秒以內**，這樣可以保持快取命中，節省成本和時間。

### 預期輸出：
- Claude 根據任務進展自動調整檢查間隔
- 發現錯誤時自動分析並嘗試修復
- 任務完成後自動結束 loop 並回報結果
- 整個過程中你不需要做任何操作

## 💡 進階應用：排程代理（Scheduled Agents）

除了在終端中手動啟動 `/loop` 之外，Claude Code 還支援使用 `/schedule` Skill 來建立**排程代理** — 在遠端按照 cron 時間表自動執行 Claude Code。

```bash
# 使用 /schedule 建立一個每天早上 8 點執行的健康檢查
/schedule create --cron "0 8 * * *" --task "檢查 portal 狀態，如果有問題發送通知"

# 列出所有已設定的排程代理
/schedule list

# 手動觸發一次排程代理
/schedule run <trigger-id>
```

這就像是把 `/loop` 從「你的電腦上的鬧鐘」升級成「雲端上的排班表」。即使你的電腦關機了，排程代理仍然會按時執行。

> 注意：排程代理是進階功能，需要額外設定。我們會在後續的 Bonus 課程中詳細介紹。

## ✍️ 動手練習

### 練習 1：基礎 Loop 監控

在你的任意一個有測試的專案中，試試看：

```bash
# 啟動一個每 3 分鐘檢查一次的 loop
/loop 3m "執行測試，回報結果"
```

觀察以下幾點：
- Claude 是否按照指定間隔執行？
- 每次檢查的輸出是否清晰？
- 按 Esc 是否能正常停止 loop？

> 提示：如果你沒有測試可以跑，也可以用這個簡單的指令來練習：
> ```bash
> /loop 1m "告訴我現在的時間，以及當前目錄下有多少個檔案"
> ```

### 練習 2：動態模式體驗

試試不指定時間間隔的動態模式：

```bash
/loop "檢查當前目錄的 git status，如果有未提交的修改就列出來，如果沒有就說一切乾淨"
```

觀察 Claude 如何自己決定檢查頻率。它選擇的間隔是否合理？

> 提示：在 loop 運行期間，試著在另一個終端窗口修改一個檔案，看看 Claude 在下一次檢查時是否會發現變化。

## ❓ 小測驗（3 條題目）

**1. `/loop 5m "check tests"` 和 `/loop "check tests"` 有什麼區別？**

A. 沒有區別，兩者完全一樣
B. 第一個每 5 分鐘固定檢查一次，第二個讓 Claude 自己決定間隔
C. 第一個只檢查 5 次，第二個無限檢查
D. 第一個用快取，第二個不用快取

答案：B — 加上時間間隔（如 `5m`）使用固定間隔模式，Claude 嚴格按照指定時間重複執行。省略時間間隔則進入動態自主模式，Claude 會使用 ScheduleWakeup 自行決定最佳的喚醒時間。

---

**2. 為什麼 Claude 在動態模式下傾向於在 270 秒以內安排下一次喚醒？**

A. 因為 270 秒是 Claude 的最大運行時間
B. 因為超過 270 秒後快取會開始失效，超過 300 秒快取完全消失，導致需要重新讀取所有資料
C. 因為 270 秒是系統規定的最短間隔
D. 因為 270 秒剛好等於一次完整的 build 時間

答案：B — Claude 的 prompt cache 在 270 秒以內保持有效（cache hit），超過 300 秒就會完全失效（cache miss）。在快取命中的情況下，Claude 可以快速繼續之前的工作，不需要重新讀取檔案和對話歷史，這樣更快也更省成本。

---

**3. 以下哪一個是 `/loop` 無法做到的？**

A. 每 10 分鐘自動執行 `npm test` 並回報結果
B. 監控 build 過程並在失敗時自動修復程式碼
C. 繞過 `settings.json` 中設定的安全限制來刪除受保護的檔案
D. 搭配 `/portal-status` Skill 進行定期健康檢查

答案：C — `/loop` 不會讓 Claude 獲得額外的權限。所有在 `settings.json` 中設定的 hooks 和安全限制仍然有效。`/loop` 只是讓原本允許的操作可以自動重複執行，它不能繞過任何安全邊界。

## 🔗 下一步

恭喜你完成了 Phase 9 的所有模塊！你已經掌握了 Claude Code 的高級生產環境技巧，包括 Sub-agents、Plan Mode、資料庫操作、CI/CD、Docker 安全，以及本課的 `/loop` 自主 Agent 模式。

在接下來的 **Bonus Phase：Skills 進階** 中，我們將深入探討：
- 如何建立和管理自訂 Skills（自定義斜線指令）
- Skill 的最佳實踐與設計模式
- 如何將你的工作流程封裝成可重用的 Skills
- 與團隊共享 Skills 的方法

你已經從零基礎走到了能夠讓 Claude 自主運作的程度 — 這是非常了不起的進步！
