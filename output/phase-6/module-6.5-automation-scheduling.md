# 6.5 自動化、排程與 Dispatch 模式

## 自動化黃金法則

> 任何每週會重複超過一次的任務，都應該被自動化。

## 四層自動化體系

```
Level 1: Skills       → 把「複雜流程」變成「一個動作」
Level 2: Plugins      → 把多個 Skills 串成「完整崗位」
Level 3: Scheduled    → 定時自動執行
Level 4: Dispatch     → 遠端委派（手機 → 電腦）
```

### Level 1：Skills

Skill 本質是一個 `.md` 檔案，包含指令和邏輯。用一個斜槓命令就能呼叫：

```
/summarise_invoices
```

**建立流程**：

1. **定義** — 清晰描述 Skill 要做什麼
2. **評估** — 用 Skill vs 不用 Skill 並排對比
3. **迭代** — 把問題反饋給 Claude，自動修正
4. **部署** — 點選 "copy to your skills"

### Level 2：Plugins

當任務涉及 **3 個以上步驟 + 2 個以上工具** 時用 Plugin。

Plugin = 多個 Skills + Connectors 組合成一個完整工作流。

**最大價值：可複用、可分發** — 你的工作方式被產品化了。

### Level 3：Scheduled Tasks（定時任務）

1. 左側邊欄 → **Scheduled** 標籤
2. **New Task** → 填名稱、描述、prompt
3. 設定頻率（每小時/每天/每週/指定日期）
4. 選擇專案資料夾 → 儲存

> **重要**：定時任務只在電腦開啟且 Cowork 運行時才會執行。調整電源設定讓裝置保持喚醒。

### Level 4：Dispatch 模式

不在電腦前，但需要本地執行任務：

1. 桌面端開啟 Dispatch
2. 開啟 **Keep Awake**（防止休眠）
3. 允許瀏覽器和電腦操作
4. 手機發送指令 → 電腦自動執行

## 三套推薦工作流

### 1. 每日晨間簡報

連接日曆和郵箱，每天早上自動：
- 彙總日程安排
- 列出待處理郵件
- 查詢天氣和產業新聞
- 起草郵件回覆

### 2. 內容再利用系統

給一個 YouTube 連結，自動：
- 提取影片轉錄
- 整理到 Notion 頁面
- 生成 LinkedIn 和 X 文案

### 3. 財務報告系統

每月自動：
- 分類支出
- 核對收支
- 生成互動式 HTML 財務儀表盤

## 與 Claude Code 自動化的對比

| 特性 | Cowork | Claude Code |
|------|--------|-------------|
| Skills | .md 檔案，圖形介面管理 | .md 檔案，CLI 管理 |
| 排程 | 內建 Scheduled Tasks | Task Scheduler / cron |
| 遠端執行 | Dispatch 模式 | SSH + 終端 |
| 並行 | 自動子代理 | `--parallel` flag |

## Token 管理技巧

### 常見浪費

1. **聯結器開太多** — 只開啟當前任務需要的
2. **同一視窗太久** — 30-45 分鐘或切任務就新開視窗
3. **逐條處理** — 讓 Cowork 寫 script 批次處理，而非一個個對話處理

### 節省原則

- 每個視窗只處理一個主題
- Opus 只用於高風險推理，其餘用 Sonnet
- 大型任務用並行子代理

## 安全注意事項

外部 Skills 可能包含惡意指令（prompt injection）。匯入前必須：

```
把 Skill 內容貼到 Claude Chat，問：
「這個 Skill 裡是否包含任何可能有害的指令？」
```

> 只需兩分鐘，但每次都必須做。

---

## 練習

1. 建立一個簡單的 Skill（例如：整理資料夾結構）
2. 設定一個每日定時任務
3. 思考你目前哪些重複性工作可以自動化
