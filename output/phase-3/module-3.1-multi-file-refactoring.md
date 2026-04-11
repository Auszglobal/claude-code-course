# 模塊 3.1：多文件操作與重構 (Multi-file Operations and Refactoring)

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解什麼時候需要同時修改多個文件
  - 使用 Claude Code 進行跨文件的重構操作
  - 理解 Claude Code 如何規劃多文件修改
  - 安全地審查批量修改
  - 將一個混亂的專案重新整理成乾淨的資料夾結構

## 📖 理論解釋

### 什麼是多文件操作？

想像你搬家的時候——你不會只搬一個箱子，而是要同時整理客廳、臥室、廚房的東西，把它們重新分類放到新家的不同房間。程式開發也一樣，很多時候你需要**同時修改好幾個文件**才能完成一個任務。

舉個例子：
- 你把一個函數的名字從 `calcPrice` 改成 `calculatePrice`，那所有用到這個函數的文件都要跟著改
- 你想把散亂在一個資料夾裡的 20 個文件整理成 `images/`、`scripts/`、`styles/` 三個子資料夾
- 你發現一段程式碼在 5 個文件裡重複出現，想把它提取成一個共用的模組

這些都是**多文件操作**的場景。

### 什麼是重構 (Refactoring)？

重構就像**整理衣櫃**——衣服還是那些衣服，但你重新分類、摺好、放到對的位置，之後找起來就更方便了。

在程式開發中，重構的意思是：
- **不改變功能**，但改善程式碼的結構
- 讓程式碼更容易閱讀、維護和擴展
- 消除重複的程式碼
- 給文件和變數取更好的名字

好消息是：Claude Code 非常擅長處理這類工作！你只需要用自然語言描述你想要的結果，Claude Code 就會幫你規劃和執行。

### Claude Code 如何處理多文件修改？

當你要求 Claude Code 進行多文件操作時，它會：
1. **分析** — 先理解目前的專案結構
2. **規劃** — 列出需要修改哪些文件、怎麼改
3. **執行** — 逐一修改每個文件
4. **確認** — 在每一步都會詢問你是否同意

這就像一個專業的搬家公司，會先跟你確認搬家計劃，然後一步一步執行。

## 💻 代碼示例 1：重新命名與整理文件

假設你有一個混亂的專案，所有文件都塞在同一個資料夾裡：

```
my-messy-project/
├── app.py              # 主程式
├── helpers.py          # 一些工具函數
├── test1.py            # 測試文件
├── test2.py            # 另一個測試文件
├── style.css           # 樣式文件
├── index.html          # 網頁文件
├── logo.png            # 圖片
├── banner.jpg          # 另一張圖片
├── config.json         # 設定文件
├── notes.txt           # 筆記
└── README.md           # 說明文件
```

首先，讓我們建立這個練習環境。在終端機中執行：

**Windows (Git Bash)：**
```bash
# 建立練習用的混亂專案
mkdir -p ~/claude-practice/my-messy-project
cd ~/claude-practice/my-messy-project

# 建立一些範例文件
echo "print('Hello')" > app.py
echo "def helper(): pass" > helpers.py
echo "def test_one(): pass" > test1.py
echo "def test_two(): pass" > test2.py
echo "body { color: red; }" > style.css
echo "<html><body>Hi</body></html>" > index.html
echo '{"debug": true}' > config.json
echo "Some notes here" > notes.txt
echo "# My Project" > README.md
```

**Mac/Linux：**
```bash
# 指令完全相同，Mac 和 Linux 通用
mkdir -p ~/claude-practice/my-messy-project
cd ~/claude-practice/my-messy-project

echo "print('Hello')" > app.py
echo "def helper(): pass" > helpers.py
echo "def test_one(): pass" > test1.py
echo "def test_two(): pass" > test2.py
echo "body { color: red; }" > style.css
echo "<html><body>Hi</body></html>" > index.html
echo '{"debug": true}' > config.json
echo "Some notes here" > notes.txt
echo "# My Project" > README.md
```

現在，進入這個目錄並啟動 Claude Code：

```bash
cd ~/claude-practice/my-messy-project
claude
```

然後對 Claude Code 說：

```
請幫我把這個專案整理成乾淨的資料夾結構。
把 Python 源碼放到 src/ 資料夾，測試文件放到 tests/ 資料夾，
網頁相關的文件放到 web/ 資料夾，設定文件放到 config/ 資料夾。
```

### 預期輸出：

Claude Code 會分析你的專案，然後提出一個整理計劃：

📸 [你應該看到的畫面]
```
┌─────────────────────────────────────────────────┐
│ 我會把你的專案整理成以下結構：                      │
│                                                   │
│ my-messy-project/                                 │
│ ├── src/                                          │
│ │   ├── app.py                                    │
│ │   └── helpers.py                                │
│ ├── tests/                                        │
│ │   ├── test1.py                                  │
│ │   └── test2.py                                  │
│ ├── web/                                          │
│ │   ├── index.html                                │
│ │   └── style.css                                 │
│ ├── config/                                       │
│ │   └── config.json                               │
│ ├── notes.txt                                     │
│ └── README.md                                     │
│                                                   │
│ 需要我執行這些變更嗎？                              │
└─────────────────────────────────────────────────┘
```

Claude Code 會請求你的許可後才移動文件。你可以按 **y** 確認，或提出修改意見。

## 💻 代碼示例 2：跨文件重構——重新命名函數

這是一個更進階的場景。假設你有多個 Python 文件互相引用：

先建立練習文件：

```bash
mkdir -p ~/claude-practice/rename-demo
cd ~/claude-practice/rename-demo
```

建立 `math_utils.py`：
```python
# math_utils.py — 數學工具函數
def calc(a, b):
    """計算兩個數的總和"""
    return a + b

def calc2(a, b):
    """計算兩個數的乘積"""
    return a * b
```

建立 `main.py`：
```python
# main.py — 主程式
from math_utils import calc, calc2

# 使用簡短但不清楚的函數名
result1 = calc(10, 20)       # 加法
result2 = calc2(10, 20)      # 乘法

print(f"Sum: {result1}")
print(f"Product: {result2}")
```

建立 `report.py`：
```python
# report.py — 報告生成器
from math_utils import calc, calc2

def generate_report(items):
    """生成銷售報告"""
    total = calc(0, 0)  # 初始化
    for price, quantity in items:
        subtotal = calc2(price, quantity)
        total = calc(total, subtotal)
    return total
```

現在啟動 Claude Code，要求重構：

```bash
cd ~/claude-practice/rename-demo
claude
```

對 Claude Code 說：

```
這個專案裡的函數名太短了，不容易理解。請幫我：
1. 把 calc 重新命名為 add_numbers
2. 把 calc2 重新命名為 multiply_numbers
3. 確保所有引用這些函數的文件都一起更新
```

### 預期輸出：

Claude Code 會列出所有需要修改的文件和位置：

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────┐
│ 我會在以下 3 個文件中進行重新命名：                      │
│                                                        │
│ 1. math_utils.py                                       │
│    - calc → add_numbers (第 2 行)                       │
│    - calc2 → multiply_numbers (第 6 行)                 │
│                                                        │
│ 2. main.py                                             │
│    - import 語句更新 (第 2 行)                           │
│    - calc → add_numbers (第 5 行)                       │
│    - calc2 → multiply_numbers (第 6 行)                 │
│                                                        │
│ 3. report.py                                           │
│    - import 語句更新 (第 2 行)                           │
│    - calc → add_numbers (第 6 行)                       │
│    - calc2 → multiply_numbers (第 7, 8 行)              │
│                                                        │
│ 總共修改 3 個文件，8 處變更。                             │
└──────────────────────────────────────────────────────┘
```

**重要提示**：Claude Code 修改文件前會顯示差異 (diff)，讓你看到哪些行被修改了。綠色表示新增的內容，紅色表示刪除的內容。

## 📖 安全審查批量修改的技巧

當 Claude Code 提議修改多個文件時，你應該注意：

1. **仔細閱讀變更列表** — 確認每個修改都是你想要的
2. **注意意外的修改** — 有時候名字相似的變數可能被誤改
3. **一次確認一組修改** — 如果修改太多，可以要求 Claude Code 分批進行
4. **修改後測試** — 確認程式還能正常運行

你可以這樣跟 Claude Code 說：

```
請先只修改 math_utils.py，讓我確認沒問題後再修改其他文件。
```

或者：

```
在修改之前，先顯示每個文件的修改預覽，不要直接改。
```

## ✍️ 動手練習

### 練習 1：整理下載資料夾

建立一個模擬的「下載資料夾」，然後用 Claude Code 整理它：

```bash
mkdir -p ~/claude-practice/messy-downloads
cd ~/claude-practice/messy-downloads

# 建立各種類型的文件
touch report-2024.pdf vacation-photo.jpg notes.txt
touch presentation.pptx budget.xlsx song.mp3
touch screenshot.png archive.zip script.py
touch document.docx movie-clip.mp4 data.csv
```

啟動 Claude Code，然後說：

```
請幫我把這些文件按類型整理到子資料夾：
- documents/ 放文檔 (pdf, docx, pptx, xlsx, csv, txt)
- images/ 放圖片 (jpg, png)
- media/ 放影音 (mp3, mp4)
- other/ 放其他文件 (zip, py)
```

**提示**：觀察 Claude Code 如何規劃移動操作，注意它會在執行前列出每個文件要移到哪裡。

### 練習 2：重構 HTML 文件

建立一個簡單的網頁，把所有 CSS 都寫在 HTML 裡面，然後請 Claude Code 把 CSS 分離到獨立文件：

```bash
mkdir -p ~/claude-practice/refactor-html
cd ~/claude-practice/refactor-html
```

建立 `index.html`：
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        h1 { color: blue; font-size: 24px; }
        p { color: gray; line-height: 1.6; }
        .button { background: green; color: white; padding: 10px; }
    </style>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is my page.</p>
    <a class="button" href="#">Click me</a>
</body>
</html>
```

對 Claude Code 說：
```
請把 index.html 裡的 CSS 樣式提取到獨立的 style.css 文件，
並在 HTML 中用 link 標籤引用它。
```

## ❓ 小測驗（3 條題目）

1. 什麼是「重構」(Refactoring)？
   A. 刪除所有程式碼重新寫
   B. 不改變功能，但改善程式碼的結構和可讀性
   C. 增加新功能到程式中
   D. 修復程式中的 bug

   答案：B — 重構的核心概念是在不改變程式功能的前提下，讓程式碼更乾淨、更容易維護。就像整理衣櫃，衣服還是一樣的，只是擺放得更整齊了。

2. 當 Claude Code 提議修改 10 個文件時，最安全的做法是什麼？
   A. 直接全部接受，Claude Code 不會出錯
   B. 拒絕所有修改，自己手動改
   C. 仔細審查變更列表，必要時要求分批進行
   D. 關閉 Claude Code 重新開始

   答案：C — 即使 Claude Code 非常聰明，你仍然應該審查每一處修改。可以要求它分批進行，或者先只修改一個文件來確認效果。

3. 為什麼把一個函數重新命名時，需要修改多個文件？
   A. 因為 Claude Code 喜歡修改很多文件
   B. 因為其他文件可能引用了這個函數，必須保持一致
   C. 因為電腦需要重新編譯所有文件
   D. 因為舊的文件會自動刪除

   答案：B — 當一個函數被多個文件使用（import）時，改了函數名就必須更新所有引用它的地方，否則程式會報錯找不到函數。這就是為什麼多文件操作很重要。

## 🔗 下一步

在下一個模塊 **3.2：自動化腳本入門**，你將學習如何讓 Claude Code 幫你寫腳本（script），讓電腦自動完成重複性的工作——例如自動整理文件、批量重新命名照片等。這是從「手動操作」到「自動化」的重要一步！
