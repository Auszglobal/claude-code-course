# 模塊 4.4：部署與發布 (Deployment and Publishing)

## 🎯 學習目標
- 完成本課後你能夠...
  - 理解什麼是「部署」以及為什麼需要部署
  - 認識免費的網站託管平台：GitHub Pages、Vercel、Netlify
  - 使用 Claude Code 準備你的項目進行部署
  - 一步一步將網站部署到 GitHub Pages
  - 獲得一個可以分享給朋友的真實網址

## 📖 理論解釋

### 什麼是部署？

到目前為止，你建立的網站只能在你自己的電腦上看到。這就像你畫了一幅很漂亮的畫，但一直放在抽屜裡 —— 只有你自己能欣賞。

**部署（Deployment）就是把你的畫掛到美術館裡**，讓所有人都能看到。

具體來說，部署就是把你的網站檔案上傳到一台**24 小時開機、連接網路的電腦**（伺服器），這樣任何人只要輸入你的網址，就能看到你的網站。

### 本機 vs 線上

| | 本機（你的電腦） | 線上（部署後） |
|---|---|---|
| 誰能看到 | 只有你 | 全世界的人 |
| 網址 | `file:///C:/Users/.../index.html` | `https://yourname.github.io` |
| 需要開機嗎 | 你的電腦要開著 | 伺服器 24 小時運行 |
| 費用 | 免費 | 可以免費！ |

### 免費託管平台比較

好消息：有很多免費的平台可以幫你託管網站！

| 平台 | 特點 | 適合 | 免費網址格式 |
|------|------|------|-------------|
| **GitHub Pages** | 跟 Git 完美整合，最多人用 | 個人網站、作品集 | `username.github.io/repo` |
| **Vercel** | 一鍵部署，速度快 | React/Next.js 項目 | `project.vercel.app` |
| **Netlify** | 拖拉上傳，超簡單 | 任何靜態網站 | `project.netlify.app` |

我們這堂課會使用 **GitHub Pages**，因為：
1. 完全免費
2. 你已經會用 Git（Phase 3 學過！）
3. 是業界最常用的方式之一

---

## 💻 代碼示例 1：準備項目並部署到 GitHub Pages

我們將把模塊 4.1 建立的個人網站部署到網路上。跟著以下步驟一步一步來：

### 第一步：確認你有 GitHub 帳號

如果你還沒有 GitHub 帳號，先到 [github.com](https://github.com) 註冊一個。記住你的用戶名，等等會用到。

### 第二步：確認 Git 設定

在終端機中確認你的 Git 已經設定好：

```bash
# 確認 Git 有設定你的名字和 email
git config --global user.name
git config --global user.email
```

如果沒有設定過，請先設定：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的email@example.com"
```

### 第三步：讓 Claude Code 幫你準備部署

進入你的網站項目資料夾，啟動 Claude Code：

```bash
cd my-portfolio
claude
```

在 Claude Code 中輸入：

```
幫我把這個網站項目準備好，以便部署到 GitHub Pages：
1. 確保 index.html 在項目根目錄
2. 檢查所有檔案路徑是否正確（相對路徑）
3. 加入一個簡單的 README.md 說明這是什麼項目
4. 初始化 Git 並建立第一個 commit
```

### 預期輸出：

📸 [你應該看到的畫面]
```
┌────────────────────────────────────────────────────┐
│ 我已經完成以下準備工作：                              │
│                                                      │
│ ✓ 確認 index.html 在根目錄                           │
│ ✓ 所有 CSS/JS 路徑使用相對路徑                        │
│ ✓ 建立了 README.md                                   │
│ ✓ 執行了 git init                                    │
│ ✓ 建立了第一個 commit                                │
│                                                      │
│ 接下來你需要在 GitHub 上建立一個新的 repository。      │
└────────────────────────────────────────────────────┘
```

### 第四步：在 GitHub 上建立新的 Repository

1. 打開瀏覽器，前往 [github.com/new](https://github.com/new)
2. Repository 名稱輸入：`my-portfolio`
3. 選擇 **Public**（公開）—— GitHub Pages 免費版需要公開
4. **不要**勾選「Add a README file」（我們已經有了）
5. 點擊 **Create repository**

GitHub 會顯示一些指令。接下來我們在 Claude Code 中完成：

### 第五步：推送到 GitHub 並啟用 GitHub Pages

在 Claude Code 中輸入：

```
幫我把這個項目推送到 GitHub，remote 網址是：
https://github.com/你的用戶名/my-portfolio.git

然後告訴我怎麼在 GitHub 上啟用 GitHub Pages。
```

Claude Code 會幫你執行類似這樣的指令：

```bash
# 連接到 GitHub 上的 repository（告訴 Git 你的倉庫在哪裡）
git remote add origin https://github.com/你的用戶名/my-portfolio.git

# 把你的代碼推送（上傳）到 GitHub
git branch -M main
git push -u origin main
```

### 第六步：啟用 GitHub Pages

1. 在 GitHub 上打開你的 repository 頁面
2. 點擊 **Settings**（設定）
3. 在左側選單找到 **Pages**
4. 在「Source」下拉選單中選擇 **Deploy from a branch**
5. Branch 選擇 **main**，資料夾選擇 **/ (root)**
6. 點擊 **Save**

📸 [你應該看到的畫面]
```
┌────────────────────────────────────────────────────┐
│ GitHub Pages                                        │
│                                                      │
│ Your site is live at:                                │
│ https://你的用戶名.github.io/my-portfolio/           │
│                                                      │
│ 🎉 這就是你的網站網址！任何人都可以訪問！              │
└────────────────────────────────────────────────────┘
```

> **注意**：GitHub Pages 部署需要幾分鐘時間。如果馬上打開網址看到 404 錯誤，等 2-3 分鐘再試。

---

## 💻 代碼示例 2：更新已部署的網站

部署完成後，你可能還想修改網站。流程非常簡單：

### 修改 → 提交 → 推送

在 Claude Code 中修改你的網站：

```
在我的網站首頁加入一個「最近更新」區塊，
顯示今天的日期和一句話：「網站持續更新中，歡迎常來看看！」
```

修改完成後，讓 Claude Code 幫你部署更新：

```
幫我把剛才的修改 commit 並 push 到 GitHub，
commit 訊息寫「新增最近更新區塊」
```

Claude Code 會執行：

```bash
# 把修改過的檔案加入暫存區
git add index.html styles.css

# 建立一個 commit（就像存檔一樣）
git commit -m "新增最近更新區塊"

# 推送到 GitHub（更新線上版本）
git push origin main
```

### 預期輸出：

📸 [你應該看到的畫面]
```
┌────────────────────────────────────────────────┐
│ [main abc1234] 新增最近更新區塊                  │
│  2 files changed, 15 insertions(+), 2 deletions │
│                                                  │
│ To https://github.com/你的用戶名/my-portfolio    │
│    def5678..abc1234  main -> main                │
│                                                  │
│ 更新已推送！等待 1-2 分鐘後，                      │
│ 重新整理你的網站就能看到變更。                      │
└────────────────────────────────────────────────┘
```

### 部署更新的完整流程

記住這個簡單的循環 —— 這就是真正的開發者每天在做的事情：

```
修改代碼 → git add → git commit → git push → 等幾分鐘 → 網站更新了！
```

用 Claude Code 的話，你甚至可以一句話搞定：

```
把所有修改 commit 並 push 到 GitHub
```

---

## ✍️ 動手練習

### 練習 1：部署你的個人網站

1. 如果你還沒有 GitHub 帳號，先註冊一個
2. 回到模塊 4.1 建立的個人網站（或重新建立一個）
3. 按照本模塊的步驟，把網站部署到 GitHub Pages
4. 把你的網站網址分享給一位朋友，請他幫你看看

> **提示**：如果遇到問題，把錯誤訊息貼到 Claude Code 中，它會幫你解決！例如：「我在 git push 時出現以下錯誤：[貼上錯誤訊息]，請幫我解決」

### 練習 2：建立一個項目展示頁

1. 建立一個新的網站，專門展示你在這個課程中完成的所有項目
2. 包含以下內容：
   - 課程名稱和簡介
   - 每個完成的項目（模塊 4.1 的網站、4.2 的 API 工具、4.3 的數據分析）
   - 每個項目的簡短說明和學到了什麼
3. 部署到 GitHub Pages，網址設為 `你的用戶名.github.io/my-learning-journey`

> **提示**：告訴 Claude Code「幫我建立一個學習歷程展示網站，包含 3 個項目的介紹卡片，每張卡片有標題、描述和一個連結按鈕」

---

## ❓ 小測驗（3 條題目）

**1. 為什麼需要「部署」網站？**

A. 讓網站跑得更快
B. 讓網站能被其他人通過網址訪問，而不是只能在自己電腦上看到
C. 讓網站有更漂亮的設計
D. 讓網站能防止駭客攻擊

答案：B — 部署就是把你的網站檔案放到一台 24 小時運行的伺服器上。這樣任何人只要輸入你的網址，就能看到你的網站。不部署的話，網站只存在於你的電腦中。

---

**2. 修改了已部署的網站後，正確的更新步驟是什麼？**

A. 刪除 GitHub repository，重新建立一個
B. `git add` → `git commit` → `git push`，等幾分鐘就會自動更新
C. 直接在 GitHub 網頁上修改所有檔案
D. 需要重新購買域名

答案：B — 只需要把修改提交到 Git 並推送到 GitHub，GitHub Pages 會自動偵測到更新並重新部署你的網站。通常只需要等待 1-3 分鐘。

---

**3. 以下哪個不是免費的網站託管平台？**

A. GitHub Pages
B. Netlify
C. Adobe Photoshop
D. Vercel

答案：C — Adobe Photoshop 是一個圖片編輯軟體，不是網站託管平台。GitHub Pages、Netlify 和 Vercel 都是可以免費託管靜態網站的平台。

---

## 🔗 下一步

恭喜你完成了 Phase 4 的所有模塊！讓我們回顧一下你在這個階段學到了什麼：

- **模塊 4.1**：從零建立一個完整的網站
- **模塊 4.2**：連接 API 獲取真實的外部資料
- **模塊 4.3**：處理和分析數據，生成圖表
- **模塊 4.4**：把你的作品部署到網路上讓全世界看到

你已經從一個完全不懂程式的初學者，變成了能夠建立網站、調用 API、分析資料、並且部署上線的人。這是非常了不起的進步！

在接下來的 **Phase 5：進階應用與自動化** 中，我們將進入更激動人心的領域 —— 學習如何用 Claude Code 建立自動化工作流程、使用 MCP 擴展功能、以及打造屬於你自己的 AI 助手。準備好了嗎？讓我們繼續前進！
