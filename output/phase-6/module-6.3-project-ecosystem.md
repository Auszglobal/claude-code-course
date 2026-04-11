# 6.3 專案生態系統與 Business Brain

## 沒有專案的痛點

如果你一直「無結構」地使用 Cowork：

- 不同會話之間不會記住任何東西
- 每次開啟新視窗，要重新解釋你的業務
- 不同任務互相干擾、混在一起

**解決方法：建立專案化的工作體系（Project Ecosystem）。**

## 什麼是 Project？

Project 不是一個簡單的資料夾。它是一個容器，整合了：

- 你的檔案
- 自定義指令（instructions）
- 技能（skills）
- 可以不斷積累的上下文記憶

### 有 vs 沒有 Project

| 情況 | 效果 |
|------|------|
| 沒有 Project | 每次對話從零開始解釋自己 |
| 有 Project | 上下文「複利式積累」— 第 6 周只需說「照常做」 |

## 專案隔離原則

> 不同領域，必須拆成不同專案。沒有商量餘地。

例如：
- YouTube 內容專案
- 財務 / Finance 專案
- 客戶管理專案

**為什麼？** YouTube 的語氣規則會「汙染」財務任務，Claude 會開始混淆風格。

## Business Brain — 你的 .md 檔案

這些純文字檔案放在上下文資料夾裡，Claude 每次執行任務前都會讀取：

### `about_me.md`
```markdown
你是誰、業務做什麼、客戶是誰、如何賺錢、當前優先事項。
Claude 每次都會讀取這個檔案。
```

### `brand_voice.md`
```markdown
你的語氣、討厭的表達、常用句式。
貼上真實寫作樣本，讓內容不再像「千篇一律的 Claude」。
```

### `working_preferences.md`
```markdown
任務管理方式、檔案儲存位置、輸出格式要求。
```

> **提示**：不要自己從零寫。直接告訴 Claude：「請逐步向我提問，並根據我的回答生成一套 business brain 檔案。」只需 15 分鐘。

## 與 Claude Code 的對比

| 概念 | Cowork | Claude Code |
|------|--------|-------------|
| 專案配置 | .md 檔案 + Project 設定 | `CLAUDE.md` |
| 品牌語氣 | `brand_voice.md` | 寫在 `CLAUDE.md` 的指令中 |
| 記憶系統 | Project 上下文 | Memory 系統（auto memory） |

## 三層指令體系

| 層級 | 位置 | 作用範圍 |
|------|------|----------|
| **Layer 1** — Personalisation | 帳號設定 | Chat + Code + Cowork 全域 |
| **Layer 2** — Cowork 全域 | Settings → Cowork → Global | 所有 Cowork 任務 |
| **Layer 3** — 專案級 | Project Instructions | 單個專案內部 |

**原則：全域定習慣，Cowork 定執行，專案定專業。**

---

## 練習

1. 建立一個 Cowork Project，寫入 `about_me.md`
2. 比較有沒有 Project 的輸出差異
3. 思考你的 Claude Code `CLAUDE.md` 和 Cowork Business Brain 的異同
