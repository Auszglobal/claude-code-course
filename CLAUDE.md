# Claude Code 完全指南 — 課程生成系統

## 項目目標
生成一套完整的 Claude Code 學習課程，目標讀者為**零基礎學習者**（無需任何編程背景）。
課程從安裝 Claude Code 開始，逐步帶領學員建立真實的 AI 自動化系統。

---

## 輸出格式要求

每個模塊文件必須包含以下章節：
```
# 模塊 X.X：[標題]

## 🎯 學習目標
- 完成本課後你能夠...（3-5 個具體目標）

## 📖 理論解釋
（清晰的概念解釋，配合比喻和類比幫助理解）

## 💻 代碼示例 1：[基礎示例標題]
（完整可執行代碼，有詳細注釋）

### 預期輸出：
（說明代碼運行後應該看到什麼）

## 💻 代碼示例 2：[進階示例標題]
（略複雜的應用示例）

## ✍️ 動手練習
（1-2 個讀者可以自己嘗試的練習，提供提示）

## ❓ 小測驗（3 條題目）
1. 問題...
   A. 選項
   B. 選項
   C. 選項
   D. 選項
   答案：X — 解釋原因

## 🔗 下一步
（預告下一個模塊的內容）
```

---

## 語言與風格規範
- **語言**：繁體中文（技術術語保留英文，如 MCP、API、Node.js）
- **語氣**：友善、鼓勵，像一位有耐心的老師
- **假設讀者**：完全零基礎，不懂編程，第一次接觸命令行
- **解釋方式**：多用日常生活比喻，例如「CLAUDE.md 就像 AI 的筆記本」

---

## 文件命名規範
```
output/
├── phase-1/
│   ├── module-1.1-what-is-claude-code.md
│   ├── module-1.2-installation.md
│   ├── module-1.3-first-command.md
│   └── module-1.4-basic-navigation.md
├── phase-2/
│   ├── module-2.1-claude-md.md
│   └── ...
```

---

## 代碼示例規範
- 所有代碼示例必須可以直接複製貼上執行
- 每行重要代碼必須有中文注釋說明
- 必須說明在哪個目錄執行、用什麼工具
- 必須描述預期的成功輸出（讀者怎樣知道成功了）

---

## 圖文說明規範
由於是文字課程，使用以下格式代替截圖：
```
📸 [你應該看到的畫面]
在終端機中，你會看到類似這樣的輸出：
┌─────────────────────────────────┐
│ Claude Code v1.0                │
│ ✓ API Key 已驗證                 │
│ 輸入你的第一個指令...            │
└─────────────────────────────────┘
```

---

## 禁止事項
- ❌ 不要假設讀者懂 Python、JavaScript 或任何編程語言
- ❌ 不要省略安裝步驟，要一步一步說明
- ❌ 不要使用太多技術術語而不解釋
- ❌ 不要生成過於複雜的示例（Phase 1-2 要特別簡單）
- ❌ 不要漏掉 Windows/Mac 的差異說明

---

## 快速生成指令

### 生成單個模塊：
```bash
claude "根據 CLAUDE.md 的格式規範，為模塊 1.1《什麼是 Claude Code？》生成完整教學材料，保存到 output/phase-1/module-1.1.md"
```

### 生成整個 Phase：
```bash
claude "根據 CLAUDE.md 規範，生成 Phase 1 入門篇的全部 4 個模塊（1.1-1.4），分別保存到 output/phase-1/ 目錄"
```

### 批量生成所有 20 個模塊：
```bash
claude "根據 CLAUDE.md 規範，逐一生成全部 5 個 Phase、20 個模塊的完整教學材料，保存到對應的 output/ 子目錄"
```

### 生成小測驗題庫：
```bash
claude "為所有已生成的模塊，每個額外生成 5 條練習題，保存到 output/quizzes/ 目錄"
```

### 生成課程總目錄：
```bash
claude "讀取所有 output/ 目錄下的 .md 文件，生成一個帶超連結的課程總目錄 README.md"
```

---

## 項目當前狀態（2026-04-12 更新）

### 已完成功能
- ✅ 47 個 modules（10 phases + bonus），全部有 quiz HTML
- ✅ 遊戲化：XP 等級系統（10 級）、成就徽章、排行榜
- ✅ 學習工具：Flashcards、Cheat Sheets、Prompt Templates、TL;DR、Glossary
- ✅ 個人化：書籤、筆記、學習路徑、頭像上傳
- ✅ 用戶管理：登入、Admin panel、JSONBlob 雲端同步
- ✅ PWA：離線支援、可安裝、Service Worker
- ✅ UI/UX：深色/淺色模式、手機響應式、搜尋、鍵盤快捷鍵、導覽 tour
- ✅ GitHub Pages 部署（GitHub Actions workflow）
- ✅ 自訂域名：learn.auszglobal.com.au（DNS via AWS Route 53 → GitHub Pages）

### 本次 Session 完成的修復和功能
1. ✅ **Memory Error Fix** — 全部 localStorage.setItem() 加 try-catch 防 QuotaExceededError
2. ✅ **JSON.parse 保護** — 全部 JSON.parse(localStorage...) 加 try-catch + fallback
3. ✅ **Streak UI** — 🔥 火焰 icon + 連續日數顯示（sidebar profile）
4. ✅ **進度匯出/匯入** — 📤📥 JSON 備份/恢復功能（progress、XP、streak、bookmarks）
5. ✅ **證書 PDF** — 新版證書支援 print-to-PDF + PNG 下載，顯示 stats

### 進行中 / 待完成
6. ✅ Module 格式統一 — 27 files, 177 headings 加咗 emoji（🎯📖💻✍️🔗）
7. ✅ Accessibility 基本修復 — ARIA roles、skip link、sr-only labels、prefers-reduced-motion
8. ✅ 全文搜尋 — 搜索 module 內容 + 顯示 snippet，首次 focus 時建立 index
9. ✅ Lazy load Mermaid.js — 移除 eager script，按需載入省 ~200KB
10. ✅ 學習時間追蹤 — per-module timer，sidebar 顯示總時間，含 export/import
11. ✅ Spaced Repetition Flashcards — Again/Hard/Easy 評分，SM-2 算法，due badge
12. ✅ 社交分享成就 — LinkedIn、X/Twitter、Copy Link，badge toast 內嵌 Share 按鈕
13. ✅ 「繼續學習」卡片 — Welcome 頁頂部顯示下一個未完成 module + 整體進度
14. ✅ 進度里程碑慶祝 — 25%/50%/75%/100% toast 動畫 + 100% 可下載證書
15. ✅ 模組間快速複習 — 開新 module 時顯示上一個 module 嘅 3 個重點
16. ✅ 每日學習目標 — sidebar 顯示今日進度 vs 目標，可自訂 target
17. ✅ 「我唔明」標記 — ❓ 按鈕標記需要複習嘅 module，sidebar 有 dot 提示
18. ✅ Phase 完成總結 — 完成 phase 後顯示 skills mastered overlay

### 待考慮（暫不需要）
- ⬜ 遷移到 Firebase/Supabase（暫時幾個學員用，JSONBlob 夠用）
- ⬜ 討論區/留言功能
- ⬜ 互動代碼沙盒（對 CLI 課程幫助有限）
- ⬜ 老師 Dashboard + 學生分析
- ⬜ 多語言切換（EN/繁中）

### 已知問題
- ⚠️ 全部 47 個 module 係英文（CLAUDE.md 要求繁體中文 — 視乎目標讀者決定）
- ⚠️ JSONBlob ID 公開在 HTML source（安全風險）
- ⚠️ 密碼 SHA256 無 salt（建議遷移後改用 bcrypt）
- ⚠️ Phase 6-9 modules 內容較 Phase 1-5 短

### 技術架構
- **Frontend**：單一 index.html（inline CSS + JS）
- **Markdown 渲染**：marked.js + highlight.js
- **數據存儲**：localStorage + JSONBlob（雲端同步）
- **部署**：GitHub Pages via GitHub Actions
- **域名**：learn.auszglobal.com.au（GoDaddy → AWS Route 53 NS → GitHub Pages）
- **CDN 依賴**：highlight.js、marked.js、marked-highlight、mermaid
