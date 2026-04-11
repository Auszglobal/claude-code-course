# 模塊 B2：Installing Skills — 3 Methods

## 🎯 學習目標

- 完成本課後你能夠：
  - 使用 `npx` 指令一鍵安裝 Skills（最簡單的方法）
  - 手動下載並複製 Skill 文件到正確位置（最可靠的方法）
  - 使用 Claude Code 的 plugin 指令安裝 Skills
  - 確認 Skill 是否安裝成功
  - 了解 Windows 和 Mac 的路徑差異

---

## 📖 理論解釋

### Skills 安裝在哪裡？

在上一課我們學到，Claude Code 啟動時會掃描一個特定資料夾來尋找 Skills。這個資料夾在不同系統上的位置是：

| 作業系統 | Skills 資料夾路徑 |
|---------|-----------------|
| **Windows** | `C:\Users\你的用戶名\.claude\skills\` |
| **Mac** | `/Users/你的用戶名/.claude/skills/` |
| **Linux** | `/home/你的用戶名/.claude/skills/` |

每個 Skill 通常是一個**子資料夾**，裡面包含一個 `SKILL.md` 文件和可能的附屬資源：

```
.claude/
└── skills/
    ├── tdd/
    │   └── SKILL.md
    ├── frontend-design/
    │   └── SKILL.md
    └── better-commits/
        └── SKILL.md
```

### 三種安裝方法概覽

| 方法 | 難度 | 適合場景 | 優點 | 缺點 |
|------|------|---------|------|------|
| **npx 指令** | 最簡單 | 日常使用 | 一行指令搞定 | 需要 Node.js |
| **手動複製** | 中等 | Windows 用戶 / 網路問題 | 最可靠、最透明 | 步驟較多 |
| **plugin 指令** | 簡單 | 在 Claude Code 內操作 | 不需離開 Claude Code | 功能較新 |

好，讓我們逐一學習每種方法！

---

## 💻 代碼示例 1：方法一 — npx 安裝（推薦）

`npx` 是 Node.js 附帶的工具，可以直接運行網上的安裝腳本。如果你已經安裝了 Node.js（在模塊 1.2 中應該已經裝好），就可以用這個方法。

### 前提檢查

先確認你有 Node.js 和 npx：

**Windows（在 Git Bash 或 PowerShell 中）：**
```bash
# 檢查 Node.js 是否已安裝
node --version

# 檢查 npx 是否可用
npx --version
```

**Mac（在 Terminal 中）：**
```bash
# 檢查 Node.js 是否已安裝
node --version

# 檢查 npx 是否可用
npx --version
```

📸 [你應該看到類似這樣的輸出]
```
┌─────────────────────────────┐
│ $ node --version            │
│ v20.11.0                    │
│                             │
│ $ npx --version             │
│ 10.2.4                      │
└─────────────────────────────┘
```

> 如果顯示「command not found」，請回到模塊 1.2 安裝 Node.js。

### 安裝官方 Skills

以下指令會從 Anthropic 官方倉庫安裝指定的 Skill：

```bash
# 安裝 Anthropic 官方的 frontend-design Skill
npx skills add anthropics/claude-code --skill frontend-design
```

讓我們拆解這個指令：

| 部分 | 意思 |
|------|------|
| `npx` | 使用 Node.js 的指令運行工具 |
| `skills` | 呼叫 skills 安裝工具 |
| `add` | 動作：添加一個新 Skill |
| `anthropics/claude-code` | 來源：Anthropic 的 GitHub 倉庫 |
| `--skill frontend-design` | 指定要安裝哪一個 Skill |

📸 [安裝成功的畫面]
```
┌──────────────────────────────────────────────────┐
│ $ npx skills add anthropics/claude-code          │
│          --skill frontend-design                 │
│                                                  │
│ Fetching skill from anthropics/claude-code...    │
│ Installing frontend-design...                    │
│ ✓ Skill installed to ~/.claude/skills/           │
│   frontend-design                                │
│                                                  │
│ Skill is ready to use! Restart Claude Code       │
│ to activate.                                     │
└──────────────────────────────────────────────────┘
```

### 安裝社群 Skills

社群開發者也會分享他們寫的 Skills。最受歡迎的之一是 `obra/superpowers`：

```bash
# 安裝 obra/superpowers — 一組增強 Claude Code 能力的 Skills
npx skills add obra/superpowers
```

### 安裝精選 Skills 合集

有些工具會幫你一次安裝多個推薦的 Skills：

```bash
# 安裝一組精選的 awesome skills
npx antigravity-awesome-skills --claude
```

### 查看已安裝的 Skills

```bash
# 列出所有已安裝的 Skills
npx skills list
```

📸 [列出已安裝 Skills 的畫面]
```
┌──────────────────────────────────────────────────┐
│ $ npx skills list                                │
│                                                  │
│ Installed Skills:                                │
│                                                  │
│  1. frontend-design                              │
│     Source: anthropics/claude-code                │
│     Path: ~/.claude/skills/frontend-design       │
│                                                  │
│  2. tdd                                          │
│     Source: obra/superpowers                      │
│     Path: ~/.claude/skills/tdd                   │
│                                                  │
│  3. better-commits                               │
│     Source: obra/superpowers                      │
│     Path: ~/.claude/skills/better-commits        │
│                                                  │
│ Total: 3 skills installed                        │
└──────────────────────────────────────────────────┘
```

### 預期輸出：

安裝完成後，你的 `~/.claude/skills/` 資料夾會出現新的子資料夾，每個裡面都有一個 SKILL.md 文件。下次啟動 Claude Code 時，它會自動偵測並載入這些 Skills。

---

## 💻 代碼示例 2：方法二 — 手動複製（Windows 最可靠）

如果 npx 有問題（網路限制、版本衝突等），手動複製是最可靠的方法。這個方法讓你完全掌控安裝了什麼。

### Windows 步驟（PowerShell）

一步一步來，每個指令都有解釋：

```powershell
# 步驟 1：建立 skills 資料夾（如果不存在的話）
# -Force 參數表示「如果已經存在就跳過，不報錯」
mkdir C:\Users\kin\.claude\skills -Force
```

📸 [步驟 1 的輸出]
```
┌──────────────────────────────────────────────────┐
│ PS> mkdir C:\Users\kin\.claude\skills -Force     │
│                                                  │
│     Directory: C:\Users\kin\.claude              │
│                                                  │
│ Mode       LastWriteTime    Length Name           │
│ ----       -------------    ------ ----           │
│ d-----     2026/04/11       skills               │
└──────────────────────────────────────────────────┘
```

```powershell
# 步驟 2：下載社群 Skills 倉庫
# 先切到一個臨時工作目錄
cd C:\Users\kin\Downloads

# 用 git 下載 obra/superpowers 倉庫
git clone https://github.com/obra/superpowers.git
```

📸 [步驟 2 的輸出]
```
┌──────────────────────────────────────────────────┐
│ PS> git clone https://github.com/obra/           │
│     superpowers.git                              │
│                                                  │
│ Cloning into 'superpowers'...                    │
│ remote: Enumerating objects: 156, done.          │
│ remote: Counting objects: 100% (156/156), done.  │
│ Receiving objects: 100% (156/156), 45.2 KiB,     │
│ done.                                            │
└──────────────────────────────────────────────────┘
```

```powershell
# 步驟 3：進入下載的資料夾，看看有哪些 Skills
cd superpowers
dir skills
```

📸 [步驟 3 的輸出 — 查看可用的 Skills]
```
┌──────────────────────────────────────────────────┐
│ PS> dir skills                                   │
│                                                  │
│     Directory: C:\Users\kin\Downloads\            │
│                superpowers\skills                │
│                                                  │
│ Mode       LastWriteTime    Name                 │
│ ----       -------------    ----                 │
│ d-----     2026/04/10       tdd                  │
│ d-----     2026/04/10       better-commits       │
│ d-----     2026/04/10       code-review          │
│ d-----     2026/04/10       refactor             │
└──────────────────────────────────────────────────┘
```

```powershell
# 步驟 4：複製你想要的 Skill 到 Claude 的 skills 資料夾
# /E = 複製子資料夾（包括空的）
# /I = 如果目標不存在就自動建立
xcopy skills\tdd C:\Users\kin\.claude\skills\tdd /E /I
```

📸 [步驟 4 的輸出]
```
┌──────────────────────────────────────────────────┐
│ PS> xcopy skills\tdd                             │
│     C:\Users\kin\.claude\skills\tdd /E /I        │
│                                                  │
│ skills\tdd\SKILL.md                              │
│ 1 File(s) copied                                 │
└──────────────────────────────────────────────────┘
```

```powershell
# 步驟 5：確認安裝成功
dir C:\Users\kin\.claude\skills\
```

📸 [最終確認畫面]
```
┌──────────────────────────────────────────────────┐
│ PS> dir C:\Users\kin\.claude\skills\             │
│                                                  │
│     Directory: C:\Users\kin\.claude\skills       │
│                                                  │
│ Mode       LastWriteTime    Name                 │
│ ----       -------------    ----                 │
│ d-----     2026/04/11       tdd                  │
│                                                  │
│ 成功！tdd Skill 已經安裝好了。                     │
└──────────────────────────────────────────────────┘
```

### Mac 步驟（Terminal）

Mac 用戶使用以下指令：

```bash
# 步驟 1：建立 skills 資料夾
mkdir -p ~/.claude/skills

# 步驟 2：下載 Skills 倉庫
cd ~/Downloads
git clone https://github.com/obra/superpowers.git

# 步驟 3：查看可用的 Skills
ls superpowers/skills/

# 步驟 4：複製想要的 Skill
# -r 表示遞迴複製（包括資料夾裡的所有文件）
cp -r superpowers/skills/tdd ~/.claude/skills/

# 步驟 5：確認安裝成功
ls ~/.claude/skills/
```

> **Windows vs Mac 差異提醒：**
> - Windows 用 `xcopy ... /E /I` 或 `Copy-Item -Recurse`
> - Mac 用 `cp -r`
> - Windows 路徑用 `\`（反斜線），Mac 用 `/`（正斜線）
> - Windows 的用戶資料夾是 `C:\Users\你的名字\`，Mac 是 `/Users/你的名字/` 或簡寫 `~/`

---

## 💻 代碼示例 3：方法三 — Claude Code Plugin 指令

最新版的 Claude Code 支援直接在對話中管理 Skills，不需要離開 Claude Code 環境。

### 從 Marketplace 安裝

在 Claude Code 的對話框中直接輸入：

```
/plugin marketplace add anthropics/skills
```

這會打開一個互動式選單，讓你瀏覽和選擇要安裝的 Skills。

📸 [Plugin Marketplace 畫面]
```
┌──────────────────────────────────────────────────┐
│ > /plugin marketplace add anthropics/skills      │
│                                                  │
│ Available Skills from anthropics/skills:         │
│                                                  │
│  [ ] frontend-design  - Build UI components      │
│  [ ] tdd              - Test-driven development  │
│  [ ] code-review      - Structured code reviews  │
│  [ ] api-design       - RESTful API design       │
│                                                  │
│ Use arrow keys to select, Enter to install       │
└──────────────────────────────────────────────────┘
```

### 安裝本地 Skill

如果你自己寫了一個 Skill（我們會在後面的模塊學習），可以直接從本地路徑安裝：

**Windows：**
```
/plugin add C:\Users\kin\my-skills\my-custom-skill
```

**Mac：**
```
/plugin add /Users/yourname/my-skills/my-custom-skill
```

### 查看和管理已安裝的 Skills

```
/plugin list
```

📸 [查看已安裝 Skills]
```
┌──────────────────────────────────────────────────┐
│ > /plugin list                                   │
│                                                  │
│ Installed plugins & skills:                      │
│                                                  │
│  1. tdd (skill)                                  │
│     Status: Active                               │
│     Source: obra/superpowers                      │
│                                                  │
│  2. frontend-design (skill)                      │
│     Status: Active                               │
│     Source: anthropics/claude-code                │
│                                                  │
│ Total: 2 active skills                           │
└──────────────────────────────────────────────────┘
```

### 預期輸出：

無論用哪種方法安裝，最終結果都一樣：SKILL.md 文件會出現在 `~/.claude/skills/` 資料夾裡。你可以隨時用方法二的最後一步（列出資料夾內容）來確認。

---

## 🔍 安裝後的驗證清單

無論你用了哪種方法，請用以下步驟確認安裝成功：

### 第一步：檢查文件是否存在

**Windows（PowerShell）：**
```powershell
# 列出所有已安裝的 Skills
dir C:\Users\kin\.claude\skills\ -Recurse -Filter "SKILL.md"
```

**Mac（Terminal）：**
```bash
# 列出所有已安裝的 Skills
find ~/.claude/skills -name "SKILL.md"
```

### 第二步：查看 Skill 內容

**Windows：**
```powershell
# 查看某個 Skill 的內容（以 tdd 為例）
type C:\Users\kin\.claude\skills\tdd\SKILL.md
```

**Mac：**
```bash
cat ~/.claude/skills/tdd/SKILL.md
```

### 第三步：重啟 Claude Code

Skills 在 Claude Code **啟動時**被掃描，所以安裝新 Skill 後需要重啟：

```bash
# 先退出 Claude Code（輸入 exit 或按 Ctrl+C）
exit

# 重新啟動
claude
```

📸 [重啟後 Claude Code 會顯示偵測到的 Skills]
```
┌──────────────────────────────────────────────────┐
│ Claude Code v1.x                                 │
│                                                  │
│ Loaded skills: tdd, frontend-design              │
│ Type your request...                             │
│                                                  │
│ >                                                │
└──────────────────────────────────────────────────┘
```

---

## ⚠️ 常見問題排解

| 問題 | 可能原因 | 解決方法 |
|------|---------|---------|
| Skill 沒被偵測到 | 文件放錯位置 | 確認 SKILL.md 在 `~/.claude/skills/技能名稱/SKILL.md` |
| npx 指令失敗 | Node.js 版本太舊 | 更新到 Node.js 18 以上 |
| git clone 失敗 | 網路問題或未安裝 Git | 確認 `git --version` 可以運行 |
| Windows 路徑錯誤 | 用了正斜線 `/` | Windows PowerShell 中用反斜線 `\` |
| 權限被拒絕（Mac） | 資料夾權限問題 | 在指令前加 `sudo`：`sudo cp -r ...` |

---

## ✍️ 動手練習

### 練習 1：安裝你的第一個 Skill

選擇上面三種方法中最適合你的一種，安裝 `obra/superpowers` 中的任何一個 Skill。

完成後，用以下指令驗證：

**Windows：**
```powershell
dir C:\Users\kin\.claude\skills\ 
```

**Mac：**
```bash
ls ~/.claude/skills/
```

> 提示：如果你是完全的新手，建議用**方法二（手動複製）**，因為你能清楚看到每一步發生了什麼。

### 練習 2：閱讀已安裝的 SKILL.md

找到你剛安裝的 SKILL.md 文件，用任何文字編輯器打開它（記事本、VS Code、TextEdit 都可以），回答以下問題：

1. 這個 Skill 的 `name` 是什麼？
2. 它有哪些 `triggers`？
3. 它的主要規則有幾條？

> 提示：如果你用 VS Code，可以直接在終端機中輸入 `code ~/.claude/skills/tdd/SKILL.md` 來打開文件。

---

## ❓ 小測驗（3 條題目）

**1. 在 Windows 上，Claude Code Skills 預設安裝在哪個路徑？**

A. `C:\Program Files\Claude\skills\`  
B. `C:\Users\你的用戶名\.claude\skills\`  
C. `C:\Claude Code\plugins\skills\`  
D. `C:\Users\你的用戶名\AppData\claude\skills\`  

答案：**B** — Skills 安裝在用戶的家目錄下的 `.claude/skills/` 資料夾中。`.claude` 是一個隱藏資料夾（以 `.` 開頭），包含 Claude Code 的所有配置和資源。

---

**2. 以下哪種安裝方法不需要離開 Claude Code 環境？**

A. `npx skills add`  
B. 手動 `git clone` + `xcopy`  
C. `/plugin marketplace add`  
D. 直接下載 ZIP 文件解壓  

答案：**C** — `/plugin` 指令是在 Claude Code 的對話介面中直接使用的，不需要切換到終端機或其他工具。方法一（npx）和方法二（手動）都需要在終端機中操作。

---

**3. 安裝新 Skill 後，為什麼需要重啟 Claude Code？**

A. 因為 Skill 需要編譯才能運行  
B. 因為 Claude Code 在啟動時才會掃描 skills 資料夾  
C. 因為需要重新下載 Skill 的最新版本  
D. 因為 Skill 需要網路驗證才能啟用  

答案：**B** — Claude Code 的設計是在啟動時掃描 `~/.claude/skills/` 資料夾，載入所有 Skill 的 metadata（名稱和簡短描述）。如果你在運行中添加了新 Skill，需要重啟讓 Claude Code 重新掃描一次。

---

## 🔗 下一步

恭喜你學會了安裝 Skills！在接下來的模塊中，我們會學習**如何寫自己的 Skill** — 你會發現，為你的特定工作流程定制一個 Skill，可以讓 Claude Code 的效率提升好幾倍。到時見！
