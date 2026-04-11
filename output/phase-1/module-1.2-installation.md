# 模塊 1.2：安裝 Claude Code

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解什麼是 Node.js 以及為什麼需要它
  - 在 Windows 或 Mac 上成功安裝 Node.js
  - 取得 Anthropic API Key
  - 使用 npm 安裝 Claude Code
  - 驗證安裝是否成功

---

## 📖 理論解釋

### Node.js 是什麼？為什麼需要它？

想像你買了一台全新的遊戲機（Claude Code），但你需要先接上電源（Node.js）才能開機。

**Node.js** 就是 Claude Code 的「引擎」。Claude Code 是用 JavaScript 語言寫的程式，而 Node.js 就是讓 JavaScript 能在你的電腦上運行的環境。沒有 Node.js，Claude Code 就像沒有電的遊戲機——什麼都做不了。

### API Key 是什麼？

**API Key**（應用程式介面金鑰）就像是一張會員卡。

想像你去一間高級健身房：
- 你需要先**註冊成為會員**（建立 Anthropic 帳號）
- 健身房會給你一張**會員卡**（API Key）
- 每次進門都要**刷卡**（Claude Code 每次連線都會用到 API Key）
- 健身房會根據你的**使用次數收費**（API 使用量計費）

API Key 是一串長長的密碼，讓 Anthropic 知道「是你在使用這個服務」。

### npm 是什麼？

**npm**（Node Package Manager）是 Node.js 自帶的「應用商店」。就像你手機上的 App Store 或 Google Play，npm 讓你可以一行指令就安裝各種工具，包括 Claude Code。

---

## 💻 代碼示例 1：安裝 Node.js

### Windows 安裝步驟

**第一步：下載 Node.js**

1. 打開瀏覽器，前往 [https://nodejs.org](https://nodejs.org)
2. 你會看到兩個綠色的下載按鈕
3. 點擊左邊的 **LTS**（長期支援版本）— 這是最穩定的版本

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────┐
│         nodejs.org                        │
│                                          │
│   ┌──────────┐    ┌──────────┐           │
│   │  22.x.x  │    │  23.x.x  │           │
│   │   LTS    │    │ Current  │           │
│   │ 推薦下載  │    │  最新版   │           │
│   └──────────┘    └──────────┘           │
│                                          │
│   ← 點這個！                              │
└──────────────────────────────────────────┘
```

**第二步：執行安裝程式**

1. 打開下載的 `.msi` 檔案
2. 一路點 **Next**（下一步）
3. 勾選 **「Automatically install the necessary tools」**（自動安裝必要工具）
4. 點 **Install**（安裝）
5. 等待安裝完成，點 **Finish**（完成）

**第三步：驗證安裝**

打開「命令提示字元」（按 `Win + R`，輸入 `cmd`，按 Enter）：

```bash
# 檢查 Node.js 版本（確認安裝成功）
node --version
```

### 預期輸出：
```
v22.14.0
```
（版本號碼可能不同，只要顯示 `v18` 以上就沒問題）

再檢查 npm：
```bash
# 檢查 npm 版本
npm --version
```

### 預期輸出：
```
10.9.2
```

### Mac 安裝步驟

**方法一：從官網下載（最簡單）**

1. 前往 [https://nodejs.org](https://nodejs.org)
2. 下載 **LTS** 版本的 `.pkg` 檔案
3. 打開下載的檔案，按照提示完成安裝

**方法二：使用 Homebrew（如果你已經有 Homebrew）**

打開「終端機」（Terminal）：
```bash
# 使用 Homebrew 安裝 Node.js
brew install node
```

**驗證安裝**（打開終端機 Terminal）：
```bash
# 檢查 Node.js 版本
node --version

# 檢查 npm 版本
npm --version
```

---

## 💻 代碼示例 2：取得 API Key 並安裝 Claude Code

### 第一步：建立 Anthropic 帳號並取得 API Key

1. 打開瀏覽器，前往 [https://console.anthropic.com](https://console.anthropic.com)
2. 點擊 **Sign Up**（註冊）建立帳號（可以用 Google 帳號或 Email）
3. 登入後，在左側選單中點擊 **API Keys**
4. 點擊 **Create Key**（建立金鑰）
5. 給這個 Key 取個名字，例如 `my-claude-code`
6. 點擊 **Create**（建立）

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────┐
│  API Keys                                │
│                                          │
│  Name: my-claude-code                    │
│  Key:  sk-ant-api03-xxxxxxxxxxxxxxx...   │
│                                          │
│  ⚠️ 請立刻複製這串金鑰！                   │
│     關閉後就看不到了！                      │
└──────────────────────────────────────────┘
```

> ⚠️ **重要提醒**：API Key 只會顯示一次！請立刻複製並保存到安全的地方（例如密碼管理器）。如果忘記了，只能刪除舊的再建立新的。

> ⚠️ **費用提醒**：使用 API 會產生費用。Anthropic 提供免費額度讓你開始學習，但請留意用量。你可以在 console.anthropic.com 查看目前的用量和費用。

### 第二步：安裝 Claude Code

打開終端機（Windows 用命令提示字元或 PowerShell，Mac 用 Terminal）：

```bash
# 使用 npm 全域安裝 Claude Code（-g 代表全域安裝，讓你在任何地方都能使用）
npm install -g @anthropic-ai/claude-code
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────┐
│ added 1 package in 15s                       │
│                                              │
│ 1 package is looking for funding             │
│   run `npm fund` for details                 │
└──────────────────────────────────────────────┘
```

> 💡 **Windows 注意**：如果出現「權限不足」的錯誤，請用**系統管理員身分**執行命令提示字元（右鍵 → 以系統管理員身分執行）。
>
> 💡 **Mac 注意**：如果出現權限錯誤，在指令前面加上 `sudo`：
> ```bash
> sudo npm install -g @anthropic-ai/claude-code
> ```

### 第三步：驗證 Claude Code 安裝成功

```bash
# 檢查 Claude Code 是否安裝成功
claude --version
```

### 預期輸出：
```
1.0.x (或更新的版本號)
```

### 第四步：設定 API Key

第一次啟動 Claude Code 時，它會自動要求你輸入 API Key：

```bash
# 啟動 Claude Code
claude
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────┐
│  Welcome to Claude Code!                 │
│                                          │
│  Please enter your API key:              │
│  > sk-ant-api03-________________         │
│                                          │
│  (貼上你剛才複製的 API Key)               │
└──────────────────────────────────────────┘
```

貼上你的 API Key（注意：貼上後畫面上不會顯示任何字，這是正常的安全設計），然後按 Enter。

如果看到歡迎訊息和提示符號，恭喜你——安裝成功了！

---

## ✍️ 動手練習

### 練習 1：完成安裝全流程
按照上面的步驟，在你的電腦上完成以下操作：
1. 安裝 Node.js
2. 驗證 Node.js 和 npm 版本
3. 建立 Anthropic 帳號並取得 API Key
4. 安裝 Claude Code
5. 驗證 Claude Code 版本

> 💡 **提示**：如果卡在某個步驟，不要慌張。最常見的問題是「權限不足」——Windows 記得用管理員身分執行，Mac 記得用 `sudo`。

### 練習 2：記錄你的版本資訊
在終端機中依次執行以下三個指令，把結果記錄下來：
```bash
node --version
npm --version
claude --version
```
把這三個版本號碼記在筆記本上，未來排除問題時可能會用到。

---

## ❓ 小測驗（3 條題目）

**1. Node.js 在 Claude Code 安裝過程中扮演什麼角色？**

A. 它是一個瀏覽器插件
B. 它是讓 Claude Code 能在電腦上運行的執行環境
C. 它是一種程式語言
D. 它是 Anthropic 的伺服器軟體

答案：B — Node.js 是 JavaScript 的執行環境，Claude Code 是用 JavaScript 寫的，所以需要 Node.js 來運行。就像遊戲機需要電源一樣。

---

**2. API Key 的作用是什麼？**

A. 用來加速網路連線
B. 用來識別使用者身分並授權使用 Anthropic 的 AI 服務
C. 用來安裝 Node.js
D. 用來登入你的電腦

答案：B — API Key 就像會員卡，讓 Anthropic 知道是誰在使用服務，並據此計費。

---

**3. 安裝 Claude Code 時，`npm install -g` 中的 `-g` 是什麼意思？**

A. 代表 "good"（好的安裝模式）
B. 代表 "global"（全域安裝，在任何資料夾都能使用）
C. 代表 "generate"（自動生成設定檔）
D. 代表 "git"（連結到 Git 倉庫）

答案：B — `-g` 代表 global（全域），意思是安裝到整台電腦的共用位置，讓你在任何資料夾都能直接使用 `claude` 指令。如果不加 `-g`，就只能在安裝的那個資料夾裡使用。

---

## 🔗 下一步

恭喜你完成安裝！你的電腦現在已經準備好了。

在下一個模塊 **1.3：第一個指令**中，我們將正式啟動 Claude Code，學習它的操作介面，並讓它幫你完成第一個任務——建立一個簡單的文字檔案。這會是你與 AI 助手互動的第一步！
