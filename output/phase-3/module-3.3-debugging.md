# 模塊 3.3：調試與修復錯誤 (Debugging and Fixing Errors)

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解程式錯誤的三大類型：語法錯誤、邏輯錯誤、運行時錯誤
  - 有效地向 Claude Code 描述錯誤，讓它快速幫你修復
  - 讀懂基本的錯誤訊息（Error Message）
  - 掌握調試循環：識別 → 理解 → 修復 → 驗證
  - 學會常見錯誤的溝通模式

## 📖 理論解釋

### 程式出錯是正常的！

首先，最重要的一點：**程式出錯是完全正常的**，即使是有 20 年經驗的工程師也天天遇到錯誤。

把程式開發想像成**學做菜**：
- 第一次做菜時，鹽放太多、火開太大，都是正常的
- 重要的不是永遠不犯錯，而是知道**怎麼發現問題和修正**
- 有了 Claude Code 的幫助，修復錯誤變得超級簡單

### 三種錯誤類型

#### 1. 語法錯誤 (Syntax Error) — 「寫錯字」

就像中文裡寫錯字一樣，程式碼有固定的文法規則。打錯一個字母、漏掉一個括號，電腦就看不懂了。

**日常比喻**：你寫了一封信，但把「你好」寫成「你女子」——收件人看不懂。

常見的語法錯誤：
```python
# 漏掉了結尾的引號
print("Hello World)

# 少了冒號
if x > 5
    print("big")

# 縮排（空格）不對
def hello():
print("hi")    # 這行應該要往右縮排
```

#### 2. 邏輯錯誤 (Logic Error) — 「走錯路」

程式可以執行，但結果不對。這是最難發現的錯誤，因為電腦不會報錯。

**日常比喻**：你要去台北車站，GPS 沒有出錯訊息，但它把你帶到了台北 101——路線是通的，但目的地錯了。

```python
# 想計算平均分數，但邏輯有錯
scores = [80, 90, 70]
average = scores[0] + scores[1] + scores[2] / 3   # 錯！只有 70 被除以 3
# 正確寫法：(scores[0] + scores[1] + scores[2]) / 3
```

#### 3. 運行時錯誤 (Runtime Error) — 「路上出意外」

程式語法正確、邏輯也對，但執行過程中遇到了意外情況。

**日常比喻**：你的導航路線是對的，但開到一半發現前面在施工、道路封閉了。

```python
# 嘗試打開一個不存在的文件
file = open("不存在的文件.txt")

# 除以零
result = 100 / 0

# 列表索引超出範圍
names = ["Alice", "Bob"]
print(names[5])    # 只有 2 個元素，卻要取第 6 個
```

### 調試循環：四個步驟

```
   識別 (Identify)
      ↓
   理解 (Understand)
      ↓
   修復 (Fix)
      ↓
   驗證 (Verify)
      ↓
   （如果還有問題，回到「識別」）
```

1. **識別**：發現有錯誤（看到錯誤訊息，或結果不對）
2. **理解**：搞清楚錯在哪裡、為什麼錯
3. **修復**：修改程式碼
4. **驗證**：重新執行，確認問題已解決

有了 Claude Code，第 2 和第 3 步變得非常簡單——你只需要把錯誤訊息複製給它。

## 💻 代碼示例 1：修復語法錯誤

讓我們練習用 Claude Code 修復故意寫錯的程式碼。

先建立練習環境：

```bash
mkdir -p ~/claude-practice/debugging
cd ~/claude-practice/debugging
```

建立一個故意有錯的文件 `broken_calculator.py`：

```python
# broken_calculator.py — 一個充滿錯誤的計算器（故意寫錯的！）

def add(a, b)     # 錯誤 1：少了冒號
    return a + b

def subtract(a, b):
    return a - c   # 錯誤 2：c 沒有定義，應該是 b

def multiply(a, b):
    return a * b

def divide(a, b):
    return a / b   # 錯誤 3：沒有處理除以零的情況

# 主程式
print("=== 簡易計算器 ===")
print("10 + 5 =", add(10, 5))
print("10 - 5 =", subtract(10, 5)
print("10 * 5 =", multiply(10, 5))   # 錯誤 4：上一行少了右括號
print("10 / 0 =", divide(10, 0))     # 這會觸發除以零錯誤
```

啟動 Claude Code：

```bash
cd ~/claude-practice/debugging
claude
```

對 Claude Code 說：

```
請看看 broken_calculator.py，這個文件有好幾個錯誤。
請幫我找出所有錯誤，解釋每個錯誤是什麼，然後修復它們。
```

### 預期輸出：

Claude Code 會分析文件並列出所有問題：

📸 [你應該看到的畫面]
```
┌────────────────────────────────────────────────────────┐
│ 我在 broken_calculator.py 中找到了 4 個錯誤：            │
│                                                         │
│ 1. 第 3 行：def add(a, b) 少了冒號                       │
│    修復：def add(a, b):                                  │
│                                                         │
│ 2. 第 7 行：return a - c 中的 c 應該是 b                 │
│    修復：return a - b                                    │
│                                                         │
│ 3. 第 18 行：print 語句少了右括號                         │
│    修復：print("10 - 5 =", subtract(10, 5))             │
│                                                         │
│ 4. 第 20 行：divide(10, 0) 會導致除以零錯誤              │
│    修復：在 divide 函數中加入零值檢查                      │
│                                                         │
│ 需要我修復這些錯誤嗎？                                    │
└────────────────────────────────────────────────────────┘
```

確認後，Claude Code 會修復文件。修復後的版本大致如下：

```python
# broken_calculator.py — 修復後的計算器

def add(a, b):          # 已修復：加上冒號
    return a + b

def subtract(a, b):
    return a - b        # 已修復：c 改為 b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:          # 已修復：檢查除以零
        return "錯誤：不能除以零"
    return a / b

# 主程式
print("=== 簡易計算器 ===")
print("10 + 5 =", add(10, 5))
print("10 - 5 =", subtract(10, 5))   # 已修復：補上右括號
print("10 * 5 =", multiply(10, 5))
print("10 / 0 =", divide(10, 0))
```

## 💻 代碼示例 2：處理運行時錯誤

建立一個會在執行時出錯的腳本 `file_reader.py`：

```python
# file_reader.py — 一個有運行時錯誤的文件讀取器

def read_and_process(filename):
    """讀取文件並計算每行的字數"""
    # 打開文件（如果文件不存在會出錯）
    with open(filename, 'r') as f:
        lines = f.readlines()

    # 計算每行字數（如果文件是空的會出錯）
    total_words = 0
    for i in range(len(lines) + 1):    # 故意多讀一行，會超出範圍
        words = lines[i].split()
        total_words += len(words)

    average = total_words / len(lines)  # 如果文件為空，除以零
    print(f"總字數: {total_words}")
    print(f"平均每行: {average:.1f} 個字")

# 試著讀取一個不存在的文件
read_and_process("nonexistent.txt")
```

對 Claude Code 說：

```
請執行 file_reader.py，然後幫我修復遇到的所有錯誤。
我希望它能：
1. 優雅地處理文件不存在的情況
2. 處理空文件的情況
3. 修復索引超出範圍的 bug
```

### 預期輸出：

Claude Code 會先嘗試執行，看到錯誤後自動分析和修復：

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────┐
│ 執行 file_reader.py 時出現錯誤：                       │
│                                                       │
│ FileNotFoundError: [Errno 2] No such file or          │
│ directory: 'nonexistent.txt'                          │
│                                                       │
│ 我發現了 3 個問題，正在修復：                            │
│                                                       │
│ 1. 沒有處理文件不存在的錯誤                              │
│    → 加入 try/except FileNotFoundError                 │
│                                                       │
│ 2. range(len(lines) + 1) 會超出列表範圍                 │
│    → 改為 range(len(lines))                            │
│                                                       │
│ 3. 空文件會導致除以零                                    │
│    → 加入 len(lines) == 0 的檢查                       │
└──────────────────────────────────────────────────────┘
```

## 📖 如何有效地向 Claude Code 描述錯誤

跟 Claude Code 溝通錯誤時，提供越多資訊越好。以下是一些有效的描述方式：

### 好的描述方式

```
執行 organize.py 時出現這個錯誤：
FileNotFoundError: [Errno 2] No such file or directory: 'downloads'
我在 ~/claude-practice/auto-organizer/ 目錄下執行的。
```

```
程式可以執行，但結果不對。
我輸入 [80, 90, 70]，期望平均分是 80，但程式顯示 93.3。
```

```
這個腳本昨天還正常，今天突然出錯了。
錯誤訊息是 ConnectionRefusedError。
我沒有改過任何程式碼。
```

### 不太好的描述方式

```
程式壞了，幫我修。           ← 太模糊，Claude Code 不知道哪裡壞了
```

```
有個 error。                ← 沒有提供錯誤訊息
```

**記住這個公式**：
> **[什麼時候] + [做了什麼操作] + [期望看到什麼] + [實際看到什麼/錯誤訊息]**

## 📖 常見錯誤速查表

| 錯誤訊息 | 意思 | 常見原因 |
|----------|------|---------|
| `SyntaxError` | 語法錯誤 | 漏了冒號、括號不配對、拼寫錯誤 |
| `NameError` | 找不到變數 | 變數名拼錯、忘了定義 |
| `TypeError` | 類型不對 | 把文字當數字用、參數數量錯誤 |
| `IndexError` | 索引超出範圍 | 列表只有 3 個元素卻要取第 4 個 |
| `FileNotFoundError` | 文件不存在 | 路徑寫錯、文件名拼錯 |
| `ZeroDivisionError` | 除以零 | 分母為零 |
| `IndentationError` | 縮排錯誤 | 空格數量不一致 |
| `ModuleNotFoundError` | 找不到模組 | 套件沒有安裝 |
| `KeyError` | 找不到鍵值 | 字典中沒有這個 key |
| `PermissionError` | 沒有權限 | 文件被鎖定或權限不足 |

遇到這些錯誤時，直接把完整的錯誤訊息複製貼上給 Claude Code 就好！

## ✍️ 動手練習

### 練習 1：修復購物車程式

建立這個故意有錯的文件 `shopping_cart.py`：

```python
# shopping_cart.py — 一個有很多 bug 的購物車

cart = []

def add_item(name, price, quantity)    # Bug 1
    item = {"name": name, "price": price, "quantity": quantity}
    cart.appen(item)                    # Bug 2

def calculate_total():
    total = 0
    for item in cart:
        subtotal = item["price"] * item["qauntity"]  # Bug 3
        total += subtotal
    return total

def apply_discount(total, discount_percent):
    discount = total * discount_percent  # Bug 4: 百分比沒有除以 100
    return total - discount

# 測試程式
add_item("Apple", 3.5, 2)
add_item("Bread", 4.0, 1)
add_item("Milk", 5.5, 3)

total = calculate_total()
print(f"小計: ${total}")

final = apply_discount(total, 10)      # 打 9 折
print(f"折扣後: ${final}")             # Bug 5: 10% 折扣結果不對
```

啟動 Claude Code，然後說：

```
請幫我執行 shopping_cart.py，修復所有的 bug，
並在修復後解釋每個 bug 是什麼以及怎麼修的。
```

**提示**：這個文件有 5 個 bug（語法錯誤、拼寫錯誤和邏輯錯誤都有）。看看 Claude Code 能不能全部找到！

### 練習 2：調試一個猜數字遊戲

建立 `guess_game.py`：

```python
# guess_game.py — 猜數字遊戲（有 bug）
import random

secret = random.randint(1, 10)
print("我想了一個 1 到 10 之間的數字，猜猜看！")

for attempt in range(3):
    guess = input(f"第 {attempt} 次猜測：")   # Bug: 應該從 1 開始
    
    if guess == secret:                        # Bug: 類型比較問題
        print("猜對了！")
        break
    elif guess < secret:                       # Bug: 字串不能跟數字比
        print("太小了！")
    else:
        print("太大了！")
else:
    print(f"三次都沒猜對，答案是 {secret}")
```

對 Claude Code 說：

```
這個猜數字遊戲有幾個 bug，請幫我找出來並修復。
我知道的問題是：次數顯示不對，而且永遠猜不對。
```

## ❓ 小測驗（3 條題目）

1. 程式可以成功執行但結果不正確，這最可能是哪種錯誤？
   A. 語法錯誤 (Syntax Error)
   B. 邏輯錯誤 (Logic Error)
   C. 運行時錯誤 (Runtime Error)
   D. 安裝錯誤

   答案：B — 語法錯誤會讓程式根本無法執行，運行時錯誤會中途當掉。只有邏輯錯誤會讓程式「順利」執行但結果不對，就像 GPS 順利帶你到了錯誤的地方。

2. 向 Claude Code 描述錯誤時，最有幫助的資訊是什麼？
   A. 說「程式壞了」就好
   B. 完整的錯誤訊息、你執行的指令、和你期望的結果
   C. 電腦的品牌和型號
   D. 你買電腦的日期

   答案：B — 就像看醫生要描述症狀一樣，提供完整的錯誤訊息、你做了什麼操作、以及你期望的結果，能讓 Claude Code 最快速地找到問題和解決方案。

3. 調試循環的正確順序是什麼？
   A. 修復 → 識別 → 驗證 → 理解
   B. 理解 → 修復 → 識別 → 驗證
   C. 識別 → 理解 → 修復 → 驗證
   D. 驗證 → 修復 → 理解 → 識別

   答案：C — 正確的順序是先發現問題（識別），然後搞清楚為什麼出錯（理解），接著修改程式碼（修復），最後重新測試確認問題解決了（驗證）。如果還有問題就再重複這個循環。

## 🔗 下一步

在下一個模塊 **3.4：測試與品質保證**，你將學習如何在錯誤發生**之前**就預防它們——通過編寫測試來自動檢查你的程式碼是否正確。這就像做菜前先試一小口調味料，比做完整道菜才發現鹽放太多要好得多！
