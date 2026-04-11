# 模塊 B4：從零打造你自己的 Skill

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解 Skill 的完整結構（SKILL.md 格式）以及每個區塊的用途
  - 解釋 Progressive Disclosure（漸進式載入）機制如何節省 Token
  - 從零撰寫一個完整的 SKILL.md 檔案
  - 在本地安裝並測試你的自製 Skill
  - 為自己最常重複的任務建立專屬 Skill

## 📖 理論解釋

### 什麼是 Skill？

在之前的模塊中，我們學過 CLAUDE.md 就像 AI 的筆記本。那 **Skill 就像 AI 的專業技能手冊**。

想像你開了一家餐廳：

- **CLAUDE.md** 是「員工手冊」— 所有員工都要看的通用規範（例如：上班要穿制服、客人來要打招呼）
- **Skill** 是「專業食譜本」— 只有在需要做某道菜時才翻開（例如：客人點了提拉米蘇，才拿出提拉米蘇的詳細食譜）

這個「需要時才翻開」的設計非常重要，我們稱它為 **Progressive Disclosure（漸進式載入）**。

### Progressive Disclosure 是怎麼運作的？

Claude Code 處理 Skill 分為兩個階段：

**第一階段：讀封面（極便宜，約 100 Tokens）**

Claude Code 啟動時，只讀取每個 SKILL.md 的「封面」— 也就是最上方的 metadata（中繼資料）區塊。這就像在書店裡快速掃一眼書名和簡介，決定要不要翻開。

```
📸 [Claude Code 啟動時的 Skill 載入過程]
┌────────────────────────────────────────────┐
│  載入 Skill 中繼資料...                      │
│  ✓ generate-python — 生成 PEP8 Python 腳本   │
│  ✓ deploy-blog — 建置並部署 React 部落格       │
│  ✓ backup-agents — Git 備份自動化腳本         │
│  已載入 3 個 Skill（共消耗 ~300 Tokens）       │
└────────────────────────────────────────────┘
```

**第二階段：翻開全文（需要時才載入，最多 ~5,000 Tokens）**

當你輸入的指令匹配到某個 Skill 的觸發條件（trigger）時，Claude Code 才載入該 Skill 的完整內容。就像客人點了提拉米蘇，廚師才翻開那頁食譜。

```
📸 [觸發 Skill 時的載入過程]
┌──────────────────────────────────────────────────┐
│  > 幫我寫一個 Python 腳本處理 CSV 檔案            │
│                                                    │
│  匹配到 Skill: generate-python                     │
│  載入完整指令...（消耗 ~2,500 Tokens）              │
│  正在根據 PEP8 規範生成 Python 腳本...              │
└──────────────────────────────────────────────────┘
```

這種設計的好處是：如果你安裝了 20 個 Skill，但這次只用到 1 個，你只需要為那 1 個付出完整的 Token 費用，其餘 19 個只花了極少的「封面」成本。

### SKILL.md 的完整結構

每個 Skill 就是一個 `SKILL.md` 檔案，放在 `.claude/skills/` 目錄下。它由兩大部分組成：

| 部分 | 內容 | 何時載入 |
|------|------|----------|
| **Metadata 區塊**（封面） | 名稱、描述、觸發詞 | 啟動時（永遠載入） |
| **正文內容**（全文） | 詳細指令、模板、範例 | 觸發時（按需載入） |

讓我們逐一了解每個區塊：

#### 1. Metadata 區塊（YAML Front Matter）

```yaml
---
name: skill-name          # Skill 的唯一識別名稱（用英文、小寫、連字號）
description: 一句話描述    # 告訴 Claude「這個 Skill 做什麼」和「什麼時候用」
triggers:                  # 觸發詞列表 — 使用者說了這些關鍵字就會啟動
  - 關鍵字一
  - 關鍵字二
---
```

- **name**：就像檔案名稱，必須是唯一的，全小寫，用連字號（`-`）連接
- **description**：最關鍵的一行！Claude 根據這句話決定要不要啟動這個 Skill。寫得越清楚，觸發越準確
- **triggers**：當使用者的指令包含這些關鍵字時，Claude 會自動啟動這個 Skill

#### 2. 正文 — When to Use / When NOT to Use

告訴 Claude 在什麼情境下應該或不應該使用這個 Skill。這能避免誤觸發。

#### 3. 正文 — Step-by-Step Instructions

一步一步的詳細指令。Claude 會嚴格按照這些步驟執行。

#### 4. 正文 — Code Templates

提供程式碼模板，讓 Claude 生成的內容保持一致的風格和品質。

#### 5. 正文 — Examples

給出輸入和預期輸出的範例。Claude 非常擅長「從範例中學習」。

#### 6. 正文 — Common Mistakes

列出常見錯誤。Claude 看到這些提醒後，會主動避開這些陷阱。

## 💻 代碼示例 1：打造「Python 腳本生成器」Skill

讓我們建立一個真正實用的 Skill —— 每次請 Claude 寫 Python 時，它都會自動遵循 PEP8 規範並加上 Type Hints（型別提示）。

### 步驟一：建立 Skill 檔案

在終端機中執行以下指令：

```bash
# 建立 skills 目錄（如果還不存在）
mkdir -p ~/.claude/skills

# 建立 SKILL.md 檔案
# Windows 使用者：路徑是 %USERPROFILE%\.claude\skills\
# Mac/Linux 使用者：路徑是 ~/.claude/skills/
```

### 步驟二：撰寫完整的 SKILL.md

把以下內容存入 `~/.claude/skills/generate-python.SKILL.md`：

```markdown
---
name: generate-python
description: >
  Generate Python scripts that strictly follow PEP8 style and include
  type hints. Use this skill whenever the user asks to write, create,
  or generate a Python script, module, or function.
triggers:
  - write a python script
  - generate python
  - create a python function
  - python module
  - PEP8
  - type hints
---

# Generate Python Script (PEP8 + Type Hints)

Generate clean, production-ready Python code that follows PEP8 style
guidelines and includes comprehensive type hints.

## When to Use This Skill
- User asks to write, create, or generate any Python code
- User asks to refactor Python code to follow best practices
- User mentions PEP8, type hints, or Python style

## When NOT to Use This Skill
- User is asking about Python concepts without needing code
- User explicitly says "quick and dirty" or "no need for types"
- User is working in a language other than Python

## Step-by-Step Instructions

1. **Read the requirement** — Understand what the script needs to do
2. **Plan the structure** — Identify functions, classes, and modules
3. **Write the code** following ALL of these rules:
   - Every function must have type hints for parameters and return value
   - Every module must start with a docstring
   - Every function/class must have a docstring (Google style)
   - Use `snake_case` for functions/variables, `PascalCase` for classes
   - Maximum line length: 88 characters (Black formatter standard)
   - Group imports: stdlib first, third-party second, local third
   - Add a `if __name__ == "__main__":` block when appropriate
4. **Add error handling** — Use specific exceptions, never bare `except:`
5. **Include a usage example** in comments or docstring

## Code Templates

### Function Template
```python
def function_name(param1: str, param2: int = 0) -> list[str]:
    """Brief description of what this function does.

    Args:
        param1: Description of param1.
        param2: Description of param2. Defaults to 0.

    Returns:
        Description of what is returned.

    Raises:
        ValueError: When param1 is empty.
    """
    if not param1:
        raise ValueError("param1 cannot be empty")

    result: list[str] = []
    # ... implementation
    return result
```

### Script Template
```python
"""Module docstring: Brief description of what this script does."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any


def main() -> None:
    """Entry point for the script."""
    # ... implementation
    pass


if __name__ == "__main__":
    main()
```

## Examples

### Input
"寫一個 Python 函數，讀取 CSV 檔案並回傳平均值"

### Expected Output
```python
"""CSV processing utilities for calculating averages."""

from __future__ import annotations

import csv
from pathlib import Path


def calculate_csv_average(file_path: str | Path, column: str) -> float:
    """Read a CSV file and return the average of a specified column.

    Args:
        file_path: Path to the CSV file.
        column: Name of the column to average.

    Returns:
        The arithmetic mean of the column values.

    Raises:
        FileNotFoundError: When the CSV file does not exist.
        KeyError: When the specified column is not in the CSV.
        ValueError: When column contains non-numeric data.
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"CSV file not found: {path}")

    values: list[float] = []

    with path.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if column not in row:
                raise KeyError(f"Column '{column}' not found in CSV")
            try:
                values.append(float(row[column]))
            except ValueError as e:
                raise ValueError(
                    f"Non-numeric value in column '{column}': {row[column]}"
                ) from e

    if not values:
        return 0.0

    return sum(values) / len(values)


if __name__ == "__main__":
    avg = calculate_csv_average("data.csv", "price")
    print(f"Average: {avg:.2f}")
```

## Common Mistakes
- Do NOT use `Any` as a lazy type hint — always use the most specific type
- Do NOT use bare `except:` — always catch specific exceptions
- Do NOT skip docstrings, even for short functions
- Do NOT use `from module import *` — always import explicitly
- Do NOT forget `from __future__ import annotations` for modern type syntax
```

### 預期輸出：

當你安裝這個 Skill 後，每次對 Claude Code 說「幫我寫一個 Python 腳本」，它都會自動：
- 加上完整的 Type Hints
- 寫 Google 風格的 Docstring
- 遵守 PEP8 和 88 字元行寬
- 加上錯誤處理和使用範例

## 💻 代碼示例 2：安裝與測試你的 Skill

### 步驟一：確認檔案位置

Skill 檔案需要放在正確的位置才能被 Claude Code 偵測到。

```bash
# 確認 skills 目錄存在
ls ~/.claude/skills/

# 你應該看到：
# generate-python.SKILL.md
```

```
📸 [確認 Skill 檔案的畫面]
┌─────────────────────────────────────────┐
│  $ ls ~/.claude/skills/                  │
│  generate-python.SKILL.md                │
└─────────────────────────────────────────┘
```

### 步驟二：重新啟動 Claude Code

Skill 的 metadata 在 Claude Code 啟動時載入，所以新增 Skill 後需要重新啟動：

```bash
# 退出目前的 Claude Code 對話（如果有的話）
# 按 Ctrl+C 或輸入 /exit

# 重新啟動 Claude Code
claude
```

### 步驟三：觸發 Skill 並觀察

現在來測試！輸入一個會觸發 Skill 的指令：

```
> 幫我寫一個 Python 函數，將攝氏溫度轉換為華氏溫度
```

```
📸 [Skill 被觸發後的畫面]
┌──────────────────────────────────────────────────────┐
│  > 幫我寫一個 Python 函數，將攝氏溫度轉換為華氏溫度    │
│                                                        │
│  [Skill: generate-python activated]                    │
│                                                        │
│  """Temperature conversion utilities."""               │
│                                                        │
│  from __future__ import annotations                    │
│                                                        │
│  def celsius_to_fahrenheit(celsius: float) -> float:   │
│      """Convert Celsius to Fahrenheit.                 │
│                                                        │
│      Args:                                             │
│          celsius: Temperature in Celsius.              │
│                                                        │
│      Returns:                                          │
│          Temperature in Fahrenheit.                    │
│      """                                               │
│      return celsius * 9.0 / 5.0 + 32.0                │
└──────────────────────────────────────────────────────┘
```

### 步驟四：驗證 Skill 是否生效

怎麼確認 Claude 真的有遵循你的 Skill 指令？檢查以下幾點：

| 檢查項目 | 沒有 Skill 時 | 有 Skill 時 |
|----------|--------------|-------------|
| Type Hints | 可能沒有 | 一定有（`celsius: float -> float`） |
| Docstring | 可能簡短或缺少 | 完整的 Google 風格 Docstring |
| Import 排序 | 隨意排列 | stdlib / third-party / local 分組 |
| 錯誤處理 | 可能沒有 | 有具體的 Exception 處理 |

### 步驟五：用 /skills 指令確認載入狀態

在 Claude Code 中，你可以使用斜線指令來查看目前已載入的 Skills：

```
> /skills
```

這會列出所有被偵測到的 Skill，以及它們的觸發狀態。

## ✍️ 動手練習

### 練習：為你最常重複的任務建立 Skill

每個人都有一些重複性的工作。現在就來把你的重複任務變成一個 Skill。

**第一步：找出你的重複任務**

想一想，你在使用 Claude Code 時，是否經常重複類似的指令？例如：

- 「每次讓 Claude 寫 JavaScript 時，我都要提醒它用 TypeScript」
- 「每次建立新專案時，我都要告訴它用什麼目錄結構」
- 「每次寫 SQL 查詢時，我都要提醒它加上註解和安全檢查」

把你找到的重複任務寫下來：「每次 ______ 時，我都要 ______」

**第二步：填寫 Skill 模板**

建立一個新檔案 `~/.claude/skills/my-first-skill.SKILL.md`，填入以下模板：

```markdown
---
name: my-task-name
description: >
  [一句話描述：做什麼 + 什麼時候用]
triggers:
  - [觸發詞 1]
  - [觸發詞 2]
  - [觸發詞 3]
---

# [Skill 標題]

[一段話概述這個 Skill 的用途]

## When to Use This Skill
- [情境 1]
- [情境 2]

## When NOT to Use This Skill
- [不適用的情境 1]
- [不適用的情境 2]

## Step-by-Step Instructions
1. [第一步]
2. [第二步]
3. [第三步]

## Code Templates
[放入你希望 Claude 遵循的程式碼模板]

## Examples
### Input
[使用者會說什麼]

### Expected Output
[Claude 應該生成什麼]

## Common Mistakes
- [常見錯誤 1]
- [常見錯誤 2]
```

**第三步：測試你的 Skill**

1. 儲存檔案
2. 重新啟動 Claude Code
3. 輸入一個包含觸發詞的指令
4. 檢查 Claude 的輸出是否符合你的規範

**提示**：如果 Skill 沒有被觸發，檢查以下常見問題：
- 檔案是否在正確的目錄下（`~/.claude/skills/`）？
- 檔案名稱是否以 `.SKILL.md` 結尾？
- `description` 是否清楚描述了使用時機？
- `triggers` 是否包含你在指令中使用的關鍵字？

## ❓ 小測驗（3 條題目）

1. Progressive Disclosure 的主要好處是什麼？
   A. 讓 Skill 執行得更快
   B. 只在需要時才載入完整內容，節省 Token 消耗
   C. 讓 Skill 的程式碼更短
   D. 自動更新 Skill 的內容

   答案：B — Claude Code 啟動時只讀取 metadata（約 100 Tokens），完整指令（最多約 5,000 Tokens）只在觸發時才載入。這樣即使安裝了很多 Skill，日常使用也不會浪費大量 Token。

2. 在 SKILL.md 中，哪個欄位對 Claude 決定是否啟動 Skill 最重要？
   A. `name`
   B. `triggers`
   C. `description`
   D. `Common Mistakes`

   答案：C — `description` 是 Claude 判斷是否啟動 Skill 的主要依據。它需要清楚說明「做什麼」和「什麼時候用」。`triggers` 提供輔助的關鍵字匹配，但 `description` 的語意理解更為關鍵。

3. 你建立了一個新的 SKILL.md 檔案，但 Claude Code 沒有偵測到它。最可能的原因是什麼？
   A. 檔案太大了
   B. 沒有重新啟動 Claude Code
   C. 電腦需要重新開機
   D. 需要購買 Skill 授權

   答案：B — Skill 的 metadata 在 Claude Code 啟動時載入。新增或修改 SKILL.md 後，需要重新啟動 Claude Code 才能偵測到變更。

## 🔗 下一步

恭喜你！你已經學會了從零打造自己的 Skill。這是 Claude Code 進階使用中最強大的功能之一 — 你可以把任何重複性的工作模式封裝成 Skill，讓 Claude 每次都按照你的標準執行。

接下來的建議：
- **實戰練習**：嘗試為你的工作建立 2-3 個常用 Skill
- **分享與協作**：SKILL.md 檔案可以透過 Git 分享給團隊成員，讓整個團隊受益
- **持續優化**：觀察 Claude 的輸出，持續調整 Skill 中的指令和範例，讓結果越來越精準

記住：**好的 Skill = 清楚的 description + 具體的步驟 + 真實的範例**。只要掌握這個公式，你就能讓 Claude Code 成為你最稱職的工作夥伴。
