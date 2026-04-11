# 模塊 5.2：自定義工作流與 Hooks

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解什麼是 Hooks 以及它們在 Claude Code 中的作用
  - 區分三種 Hook 類型：PreToolUse、PostToolUse、Notification
  - 在 settings.json 中設定自定義 Hooks
  - 建立自定義 Slash Command（斜線指令）
  - 設計一個適合自己工作習慣的自動化工作流

## 📖 理論解釋

### 什麼是 Hooks？

想像你家裝了一套智慧家居系統：

- 當你**打開大門**時（觸發事件），玄關燈**自動亮起**（自動動作）
- 當你**說晚安**時（觸發事件），全屋燈光**自動關閉**（自動動作）
- 當有人**按門鈴**時（觸發事件），你的手機**收到通知**（自動動作）

**Claude Code 的 Hooks 就是這樣的自動觸發器。** 當 Claude Code 執行特定操作時，Hook 會自動執行你預先定義的腳本或指令。

### 三種 Hook 類型

| Hook 類型 | 觸發時機 | 比喻 |
|-----------|----------|------|
| **PreToolUse** | Claude Code 使用工具**之前** | 出門前自動檢查有沒有帶鑰匙 |
| **PostToolUse** | Claude Code 使用工具**之後** | 回家後自動開燈 |
| **Notification** | Claude Code 需要通知你時 | 門鈴響了，手機提醒你 |

### 為什麼需要 Hooks？

Hooks 能幫你：

1. **自動化重複動作** — 編輯檔案後自動格式化程式碼
2. **安全防護** — 阻止 Claude Code 修改不該碰的檔案
3. **即時提醒** — 長時間任務完成時通知你
4. **品質控制** — 每次寫入檔案後自動執行測試

## 💻 代碼示例 1：設定一個簡單的 Notification Hook

讓我們從最簡單的 Hook 開始——當 Claude Code 需要你注意時，彈出桌面通知。

### 步驟一：了解設定檔結構

Hooks 設定在 `settings.json` 裡。打開你的設定檔：

```bash
# 查看全域設定檔（如果存在）
cat ~/.claude/settings.json
```

### 步驟二：新增 Notification Hook

在 Claude Code 中，你可以請它幫你設定 Hook：

```
> 幫我在 settings.json 中新增一個 notification hook，
  當 Claude Code 需要我注意時，用 PowerShell 彈出桌面通知
```

設定檔會變成這樣：

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Claude Code 需要你的注意！')\""
          }
        ]
      }
    ]
  }
}
```

> 📝 **Mac 使用者**可以把指令改成：
> ```
> "command": "osascript -e 'display notification \"Claude Code 需要你的注意！\" with title \"Claude Code\"'"
> ```

### 預期輸出：
設定完成後，每當 Claude Code 完成一個長時間的任務或需要你確認某個操作時，你會看到一個桌面通知彈窗。

## 💻 代碼示例 2：建立安全防護 Hook

現在來建立一個更實用的 Hook——阻止 Claude Code 修改敏感檔案（例如 `.env` 檔案）。

### PreToolUse Hook 設定

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q '\\.env'; then echo 'BLOCK: 不允許修改 .env 檔案！請手動編輯。' >&2; exit 1; fi"
          }
        ]
      }
    ]
  }
}
```

讓我們拆解這個設定：

```
"matcher": "Write|Edit"
  ↑ 當 Claude Code 要使用 Write 或 Edit 工具時觸發

"command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q '\\.env'; then ..."
  ↑ 檢查工具的輸入（要修改的檔案）是否包含 .env

"exit 1"
  ↑ 返回錯誤碼 1，告訴 Claude Code 停止這個操作
```

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────┐
│ > 請幫我修改 .env 檔案中的 API_KEY                  │
│                                                   │
│ ⚠️  Hook 已阻止此操作                               │
│ BLOCK: 不允許修改 .env 檔案！請手動編輯。            │
│                                                   │
│ 我無法直接修改 .env 檔案（被安全 Hook 阻止）。       │
│ 你可以手動打開檔案進行編輯：                         │
│ code .env                                         │
└───────────────────────────────────────────────────┘
```

### 預期輸出：
當你試著讓 Claude Code 編輯 `.env` 檔案時，Hook 會攔截這個操作並顯示錯誤訊息，Claude Code 會告訴你需要手動編輯。

## 💻 代碼示例 3：建立 PostToolUse Hook

這個 Hook 會在每次 Claude Code 編輯檔案後，自動提醒你進行 Git 提交：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo '💡 提醒：檔案已修改，記得用 git commit 儲存變更！'"
          }
        ]
      }
    ]
  }
}
```

### 預期輸出：
每次 Claude Code 修改或建立檔案後，你會在終端機看到一行提醒文字，提醒你及時提交到 Git。

## 💻 代碼示例 4：自定義 Slash Command

除了 Hooks，Claude Code 還支援自定義 **Slash Command**（斜線指令）。這就像為你常用的操作建立快捷鍵。

### 建立方式

在專案根目錄建立 `.claude/commands/` 資料夾，每個 `.md` 檔案就是一個指令：

```bash
# 建立指令目錄
mkdir -p .claude/commands

# 建立一個「格式化」指令
cat > .claude/commands/format.md << 'EOF'
請幫我格式化目前專案中所有已修改的檔案：
1. 找出所有已修改的檔案（用 git diff --name-only）
2. 根據檔案類型執行對應的格式化工具
3. 完成後顯示格式化了哪些檔案
EOF

# 建立一個「檢查」指令
cat > .claude/commands/check.md << 'EOF'
請對目前專案執行全面檢查：
1. 執行所有測試（如果有的話）
2. 檢查是否有語法錯誤
3. 確認沒有遺漏的 console.log 或 print 語句
4. 回報檢查結果摘要
EOF
```

### 使用方式

在 Claude Code 中輸入斜線加指令名稱：

```
> /format
> /check
```

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────┐
│ > /format                                         │
│                                                   │
│ 正在查找已修改的檔案...                              │
│ 找到 3 個已修改的檔案：                              │
│   - src/app.js (JavaScript)                       │
│   - styles/main.css (CSS)                         │
│   - index.html (HTML)                             │
│                                                   │
│ ✓ 所有檔案已格式化完成！                             │
└───────────────────────────────────────────────────┘
```

### 預期輸出：
輸入 `/format` 後，Claude Code 會讀取 `.claude/commands/format.md` 的內容作為提示詞，自動執行裡面描述的步驟。

## 💻 代碼示例 5：完整的工作流設定

以下是一個結合多種 Hook 的完整 `settings.json` 範例：

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read",
      "Write",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q '\\.env\\|credentials\\|token\\.json'; then echo 'BLOCK: 禁止修改敏感檔案' >&2; exit 1; fi"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo '提醒：檔案已變更，記得測試和提交'"
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -Command \"Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show($env:CLAUDE_NOTIFICATION, 'Claude Code')\""
          }
        ]
      }
    ]
  }
}
```

## ✍️ 動手練習

### 練習 1：建立你的第一個 Hook
1. 打開你的 `~/.claude/settings.json`
2. 新增一個 PostToolUse Hook，在 Claude Code 每次執行 Bash 指令後顯示「指令已執行完畢」
3. 測試：在 Claude Code 中執行一個簡單的指令，看看提醒有沒有出現

> 💡 提示：matcher 設定為 `"Bash"`，command 設定為 `echo '指令已執行完畢'`

### 練習 2：建立自定義 Slash Command
1. 在你的專案中建立 `.claude/commands/` 目錄
2. 建立一個 `status.md` 檔案，內容描述你想讓 Claude Code 做的檢查步驟
3. 在 Claude Code 中輸入 `/status` 來測試

> 💡 提示：例如，你可以讓 `/status` 檢查 Git 狀態、列出最近修改的檔案、執行測試等。

## ❓ 小測驗（3 條題目）

1. PreToolUse Hook 在什麼時候觸發？
   A. Claude Code 啟動時
   B. Claude Code 使用工具之前
   C. Claude Code 使用工具之後
   D. Claude Code 關閉時
   答案：B — PreToolUse 在 Claude Code 使用工具之前觸發。你可以用它來檢查和阻止不安全的操作。

2. 自定義 Slash Command 的檔案應該放在哪裡？
   A. 專案根目錄的 `commands/` 資料夾
   B. `~/.claude/settings.json` 裡面
   C. 專案根目錄的 `.claude/commands/` 資料夾
   D. `node_modules/` 裡面
   答案：C — 自定義指令以 `.md` 檔案的形式放在專案的 `.claude/commands/` 目錄中，每個檔案名稱就是指令名稱。

3. 如果一個 PreToolUse Hook 的腳本返回 `exit 1`，會發生什麼？
   A. Claude Code 會崩潰
   B. 該工具操作會被阻止，Claude Code 不會執行它
   C. 什麼都不會發生
   D. Claude Code 會忽略 Hook 繼續執行
   答案：B — 當 PreToolUse Hook 的指令返回非零的退出碼（如 exit 1），Claude Code 會阻止該工具操作，這是實現安全防護的關鍵機制。

## 🔗 下一步

你已經學會如何打造個人化的 Claude Code 工作環境了！在下一個模塊 **5.3：團隊協作最佳實踐** 中，我們將學習如何在團隊中分享這些設定、進行程式碼審查、以及管理 Pull Request——讓 Claude Code 成為你團隊合作的好幫手。
