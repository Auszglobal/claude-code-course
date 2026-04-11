# 模塊 5.3：團隊協作最佳實踐

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解 CLAUDE.md 的全域與專案層級設定差異
  - 使用 Claude Code 進行程式碼審查（Code Review）
  - 透過 Claude Code 建立和管理 Pull Request
  - 規劃團隊使用 Claude Code 的分支策略
  - 了解權限模式與安全考量

## 📖 理論解釋

### 團隊中的 Claude Code

想像一個廚房裡有多位廚師一起做菜。如果每個人都隨便拿食材、隨便放調味料，廚房很快就會亂成一團。但如果大家都遵循同一份食譜、使用相同的工具規範，就能協作出美味的料理。

**Claude Code 在團隊中的角色就像一份共享的食譜和廚房規範。**

透過適當的設定，團隊中的每個人都能：
- 使用相同的程式碼風格和規範
- 自動化重複的審查流程
- 安全地合併各自的工作成果

### CLAUDE.md 的兩個層級

| 層級 | 檔案位置 | 誰能看到 | 用途 |
|------|----------|----------|------|
| **全域** | `~/.claude/CLAUDE.md` | 只有你自己 | 個人偏好、私人 API 金鑰提示 |
| **專案** | `你的專案/CLAUDE.md` | 整個團隊（提交到 Git） | 專案規範、程式碼風格、協作規則 |

重要概念：**專案級的 CLAUDE.md 應該提交到 Git**，這樣團隊每個成員的 Claude Code 都會讀取相同的指示。

## 💻 代碼示例 1：建立團隊共享的 CLAUDE.md

讓我們為一個團隊專案建立一份完整的 CLAUDE.md：

```bash
# 在專案根目錄建立 CLAUDE.md
cd ~/my-team-project
```

以下是一個適合團隊使用的 CLAUDE.md 範本：

```markdown
# 專案名稱 — Claude Code 團隊指南

## 專案概述
這是一個線上商店專案，使用 React 前端 + Node.js 後端。

## 程式碼風格規範
- 使用 TypeScript，禁止 any 類型
- 變數命名使用 camelCase
- 檔案命名使用 kebab-case（例如：user-profile.tsx）
- 每個函數都要有 JSDoc 註解
- 最大行寬 100 字元

## Git 規範
- 分支命名：feature/功能名稱、fix/修復名稱、chore/雜務名稱
- Commit 訊息格式：type(scope): description
- 永遠不要直接推送到 main 分支
- 所有變更必須通過 Pull Request

## 禁止事項
- 不要修改 .env 或 .env.local 檔案
- 不要刪除 package-lock.json
- 不要安裝未經核准的依賴套件
- 不要提交 node_modules/

## 測試要求
- 新功能必須有對應的測試
- 修復 Bug 前先寫失敗的測試
- 測試檔案放在 __tests__/ 目錄

## 部署流程
1. 確認所有測試通過：npm test
2. 建立 Pull Request 到 main 分支
3. 至少一位團隊成員審查通過
4. 合併後自動部署（CI/CD）
```

把這個檔案提交到 Git：

```bash
# 將 CLAUDE.md 加入 Git 版本控制
git add CLAUDE.md

# 提交
git commit -m "docs: add team CLAUDE.md for Claude Code collaboration"

# 推送到遠端
git push
```

### 預期輸出：
團隊中的每個成員拉取最新程式碼後，當他們使用 Claude Code 時，都會自動遵循 CLAUDE.md 中定義的規範。

## 💻 代碼示例 2：使用 Claude Code 進行程式碼審查

Claude Code 可以幫你審查其他人的程式碼。以下是完整的審查流程：

### 步驟一：取得要審查的 Pull Request

```bash
# 查看目前開放的 Pull Request 列表
gh pr list

# 查看某個特定 PR 的詳細資訊（例如 PR #42）
gh pr view 42
```

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────────┐
│ $ gh pr list                                          │
│                                                       │
│ #42  新增用戶註冊功能  feature/user-registration  OPEN │
│ #41  修復登入問題      fix/login-bug              OPEN │
│ #40  更新文件          chore/update-docs          OPEN │
└───────────────────────────────────────────────────────┘
```

### 步驟二：在 Claude Code 中審查

```bash
# 先切換到 PR 的分支
gh pr checkout 42
```

然後在 Claude Code 中：

```
> 請幫我審查這個 Pull Request 的所有變更。
  檢查以下幾點：
  1. 程式碼品質和風格是否符合 CLAUDE.md 的規範
  2. 是否有潛在的 Bug 或安全問題
  3. 測試覆蓋率是否足夠
  4. 變數命名是否清楚
  請列出所有發現的問題和改善建議。
```

Claude Code 會自動：
1. 讀取 CLAUDE.md 中的團隊規範
2. 查看 PR 中所有修改的檔案
3. 對照規範逐一檢查
4. 產生結構化的審查報告

### 步驟三：透過 CLI 提交審查意見

```bash
# 直接在 PR 上留下審查意見
gh pr review 42 --comment --body "程式碼審查完成。

## 發現的問題
1. user-service.ts 第 45 行缺少錯誤處理
2. register.test.ts 需要新增邊界情況測試

## 建議
- 考慮將驗證邏輯抽取到獨立的 validator 模組

整體程式碼品質良好！修正上述問題後即可合併。"
```

### 預期輸出：
PR 頁面上會出現你的審查意見，團隊成員可以看到並進行回覆。

## 💻 代碼示例 3：使用 Claude Code 建立 Pull Request

讓我們完整走一次從建立分支到提交 PR 的流程：

```bash
# 步驟一：從 main 建立新分支
git checkout main           # 回到 main 分支
git pull                    # 確保是最新版本
git checkout -b feature/add-search   # 建立功能分支
```

在 Claude Code 中完成你的功能開發後：

```bash
# 步驟二：提交變更
git add src/components/SearchBar.tsx src/hooks/useSearch.ts
git commit -m "feat(search): add search bar component with debounced input"
```

```bash
# 步驟三：推送到遠端
git push -u origin feature/add-search
```

```bash
# 步驟四：使用 gh 建立 Pull Request
gh pr create \
  --title "feat: add search functionality" \
  --body "## Summary
- Added SearchBar component with debounced input
- Created useSearch custom hook for search logic
- Added unit tests for search functionality

## Test Plan
- [ ] Manual testing: search bar renders correctly
- [ ] Unit tests pass: npm test
- [ ] No console errors in browser

## Screenshots
N/A (text-based component)"
```

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────┐
│ $ gh pr create ...                                │
│                                                   │
│ Creating pull request for feature/add-search      │
│   into main in your-org/your-repo                 │
│                                                   │
│ https://github.com/your-org/your-repo/pull/43     │
└───────────────────────────────────────────────────┘
```

### 預期輸出：
命令會輸出新建的 PR 網址，你可以在瀏覽器中開啟查看。

## 💻 代碼示例 4：分支策略與權限控制

### 推薦的團隊分支策略

```
main（主分支）
  ├── develop（開發分支）
  │     ├── feature/user-auth（功能分支 A）
  │     ├── feature/search（功能分支 B）
  │     └── fix/login-bug（修復分支）
  └── release/v1.0（發佈分支）
```

### Claude Code 權限設定

為了團隊安全，建議在專案的 `.claude/settings.json` 中設定權限：

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Write",
      "Bash(npm run test)",
      "Bash(npm run lint)",
      "Bash(npm run build)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(gh pr *)"
    ],
    "deny": [
      "Bash(git push --force *)",
      "Bash(git reset --hard *)",
      "Bash(rm -rf *)",
      "Bash(git checkout main && git push *)"
    ]
  }
}
```

這個設定的意思是：
- **允許**：讀寫檔案、執行測試、基本 Git 操作、建立 PR
- **禁止**：強制推送、硬重置、危險刪除、直接推送到 main

把這個設定提交到 Git，團隊所有人都會套用相同的安全規則。

## ✍️ 動手練習

### 練習 1：建立團隊 CLAUDE.md
1. 選擇你的一個專案（或建立一個新的練習專案）
2. 在專案根目錄建立 `CLAUDE.md`
3. 寫下至少 5 條團隊規範（程式碼風格、Git 規則、禁止事項等）
4. 提交到 Git

> 💡 提示：想像你要讓一位新同事立刻了解專案規範，CLAUDE.md 就是最好的入門文件。

### 練習 2：模擬 PR 審查流程
1. 在專案中建立一個新分支
2. 做一些簡單的修改（例如新增一個函數）
3. 提交並推送到遠端
4. 使用 `gh pr create` 建立 Pull Request
5. 在 Claude Code 中請它審查這個 PR

> 💡 提示：即使是你自己的程式碼，Claude Code 也能發現你忽略的問題。養成「先審查再合併」的好習慣！

## ❓ 小測驗（3 條題目）

1. 團隊共享的 CLAUDE.md 應該放在哪裡？
   A. 每個人的 `~/.claude/CLAUDE.md`
   B. 專案根目錄的 `CLAUDE.md`（提交到 Git）
   C. 專案的 `node_modules/` 裡面
   D. GitHub 的 Wiki 頁面
   答案：B — 專案根目錄的 CLAUDE.md 會被提交到 Git，團隊每個成員拉取後，他們的 Claude Code 都會讀取相同的規範。全域 CLAUDE.md（~/.claude/CLAUDE.md）是個人用的。

2. 以下哪個做法最符合團隊安全最佳實踐？
   A. 允許 Claude Code 使用 `git push --force`
   B. 在 settings.json 的 deny 列表中禁止危險操作
   C. 不設定任何權限限制
   D. 讓每個人自己決定權限設定
   答案：B — 在專案的 `.claude/settings.json` 中明確禁止危險操作（如 force push、hard reset），可以防止意外的破壞性操作。這個設定提交到 Git 後，所有團隊成員都會套用。

3. 使用 Claude Code 審查 PR 時，它會參考什麼來判斷程式碼規範？
   A. 只看程式碼本身的語法
   B. 只參考網路上的最佳實踐
   C. 參考專案的 CLAUDE.md 和已有的程式碼風格
   D. 隨機判斷
   答案：C — Claude Code 會讀取專案的 CLAUDE.md 作為規範基準，同時也會參考專案中已有的程式碼風格來進行一致性檢查。

## 🔗 下一步

你已經掌握了團隊協作的關鍵技能！在最後一個模塊 **5.4：綜合實戰項目** 中，我們將運用整個課程所學的所有技能，從零開始建立一個完整的專案——這將是你的畢業作品！
