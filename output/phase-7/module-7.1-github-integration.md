# 7.1 GitHub — Claude Code 的最佳拍檔

## 為什麼 GitHub 是最重要的第三方整合？

Claude Code 和 GitHub 的關係就像廚師和廚房 — 幾乎所有操作都圍繞 Git/GitHub 進行。

```
Claude Code + GitHub = 完整的開發工作流
```

## 核心整合方式

### 1. Git 操作（內建）

Claude Code 直接支援所有 Git 操作：

```bash
# Claude Code 可以直接執行
git status
git add .
git commit -m "修復登入bug"
git push origin feature-branch
git log --oneline -10
```

你不需要任何額外設定 — 只要你的系統裝了 Git，Claude Code 就能用。

### 2. GitHub CLI (`gh`)

Claude Code 大量使用 `gh` 命令與 GitHub API 互動：

```bash
# 建立 Pull Request
gh pr create --title "新增搜尋功能" --body "## 改動摘要..."

# 查看 PR 狀態
gh pr view 42

# 查看 Issue
gh issue view 15

# 列出 PR 的 checks
gh pr checks

# 查看 PR 評論
gh api repos/owner/repo/pulls/123/comments
```

### 3. GitHub Actions（CI/CD）

Claude Code 可以幫你：
- 撰寫和除錯 `.github/workflows/*.yml` 文件
- 分析 CI 失敗原因
- 設定自動測試、部署流程

## Claude Code 的 GitHub 工作流

### 日常開發流程

```
1. 建立 feature branch
   → Claude Code: "create a new branch for the search feature"

2. 寫程式碼
   → Claude Code: "implement the search API endpoint"

3. 提交變更
   → Claude Code: /commit

4. 建立 PR
   → Claude Code: "create a PR for this branch"

5. 程式碼審查
   → Claude Code: "review this PR and suggest improvements"

6. 合併
   → 在 GitHub 介面或 gh pr merge
```

### PR 審查流程

Claude Code 可以自動：
- 分析所有 commit 的改動
- 撰寫 PR 標題和描述
- 檢查是否有安全漏洞
- 建議程式碼改進

## 安全注意事項

Claude Code 遵循嚴格的 Git 安全協議：

| 規則 | 說明 |
|------|------|
| 永不修改 git config | 避免改動全域設定 |
| 永不 force push | 除非你明確要求 |
| 永不跳過 hooks | `--no-verify` 需要你明確要求 |
| 新建 commit 而非 amend | 避免覆蓋歷史 |
| 不自動 push | 等你確認後才推送 |

## GitHub 在 Cowork vs Code 中的角色

| 功能 | Claude Code | Claude Cowork |
|------|-------------|---------------|
| Git 操作 | 直接在終端執行 | 透過 GitHub connector |
| PR 管理 | `gh` CLI | 圖形化 connector |
| 程式碼審查 | 讀取 diff + 分析 | 無（非開發導向） |
| CI/CD | 直接編輯 workflow 文件 | 無 |

## 實戰範例

### 建立一個完整的 GitHub repo

```
你: "幫我建立一個新的 GitHub repo 叫 my-project，
     初始化 README、.gitignore（Node.js），
     然後推送上去"

Claude Code 會：
1. mkdir my-project && cd my-project
2. git init
3. 建立 README.md 和 .gitignore
4. git add . && git commit
5. gh repo create my-project --public
6. git push -u origin main
```

---

## 練習

1. 用 Claude Code 建立一個新的 GitHub repo
2. 建立一個 feature branch，做一些改動，然後建立 PR
3. 用 Claude Code 審查一個現有的 PR
