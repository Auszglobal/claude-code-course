# 模塊 3.4：測試與品質保證 (Testing and Quality Assurance)

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解什麼是測試，以及為什麼測試很重要
  - 請 Claude Code 為你的程式碼撰寫測試
  - 執行測試並理解測試結果（通過/失敗）
  - 理解測試如何在長期節省時間
  - 為一個簡單的函數編寫完整的測試

## 📖 理論解釋

### 什麼是測試？

想像你要**買一輛二手車**。你會怎麼做？
- 試開看看引擎有沒有問題
- 檢查煞車是否正常
- 開開關關車燈、雨刷
- 確認冷氣能不能用

這些「試一試」的動作，就是**測試**。

在程式開發中，測試就是寫一些「小程式」來自動檢查你的主程式是否正確運作。比如：
- 加法函數：輸入 2 + 3，結果應該是 5
- 折扣函數：100 元打 8 折，結果應該是 80 元
- 排序函數：輸入 [3, 1, 2]，結果應該是 [1, 2, 3]

### 為什麼要寫測試？

| 不寫測試 | 有寫測試 |
|---------|---------|
| 改了一個地方，不知道會不會影響其他功能 | 改完後跑一次測試，馬上知道有沒有問題 |
| 上線後才發現 bug，修復代價大 | 發布前就發現 bug，修復成本低 |
| 過了三個月回來改程式，不確定什麼能動 | 跑測試就知道一切是否正常 |
| 每次都要手動測試每個功能 | 一個指令自動測試全部功能 |

**日常比喻**：測試就像做菜時**邊做邊試味道**。如果你做完一整道菜才嚐第一口，發現鹽太多就來不及了。但如果每加一次調味料就試一口，就能確保最後的味道剛好。

### 測試的基本概念

一個測試包含三個部分（想像成三步驟）：

1. **準備 (Arrange)** — 準備測試需要的數據
2. **執行 (Act)** — 執行你要測試的功能
3. **驗證 (Assert)** — 檢查結果是否符合預期

就像試車的流程：
1. **準備**：坐上駕駛座，繫好安全帶
2. **執行**：轉動鑰匙，踩油門
3. **驗證**：引擎有沒有正常啟動？

### Python 的測試工具：pytest

Python 有一個非常好用的測試工具叫 `pytest`。它可以：
- 自動找到所有測試文件
- 執行所有測試
- 用清楚的方式告訴你哪些通過、哪些失敗

先安裝 pytest：

**Windows (Git Bash)：**
```bash
pip install pytest
```

**Mac/Linux：**
```bash
pip3 install pytest
```

## 💻 代碼示例 1：為計算器寫測試

讓我們建立一個簡單的計算器，然後為它寫測試。

建立練習環境：

```bash
mkdir -p ~/claude-practice/testing
cd ~/claude-practice/testing
```

首先，建立我們要測試的程式 `calculator.py`：

```python
# calculator.py — 簡易計算器

def add(a, b):
    """兩個數相加"""
    return a + b

def subtract(a, b):
    """兩個數相減"""
    return a - b

def multiply(a, b):
    """兩個數相乘"""
    return a * b

def divide(a, b):
    """兩個數相除，除以零時回傳錯誤訊息"""
    if b == 0:
        raise ValueError("不能除以零")
    return a / b

def percentage(amount, percent):
    """計算百分比，例如 200 的 15% = 30"""
    return amount * percent / 100
```

現在啟動 Claude Code：

```bash
cd ~/claude-practice/testing
claude
```

對 Claude Code 說：

```
請為 calculator.py 中的所有函數寫測試。
用 pytest 格式，保存到 test_calculator.py。
每個函數至少要有 3 個測試案例，包含：
1. 正常情況
2. 邊界情況（例如 0、負數）
3. 錯誤情況（例如除以零）
```

Claude Code 會生成類似這樣的測試文件：

```python
# test_calculator.py — calculator.py 的測試文件
import pytest                              # 引入測試框架
from calculator import add, subtract, multiply, divide, percentage

# ===== 測試 add 函數 =====

def test_add_positive_numbers():
    """測試：兩個正數相加"""
    result = add(2, 3)                     # 執行：計算 2 + 3
    assert result == 5                     # 驗證：結果應該是 5

def test_add_negative_numbers():
    """測試：負數相加"""
    result = add(-1, -1)
    assert result == -2

def test_add_zero():
    """測試：加零"""
    result = add(5, 0)
    assert result == 5                     # 任何數加零應該等於自己

# ===== 測試 subtract 函數 =====

def test_subtract_basic():
    """測試：基本減法"""
    assert subtract(10, 3) == 7

def test_subtract_negative_result():
    """測試：結果為負數"""
    assert subtract(3, 10) == -7

def test_subtract_same_numbers():
    """測試：相同的數相減"""
    assert subtract(5, 5) == 0

# ===== 測試 multiply 函數 =====

def test_multiply_basic():
    """測試：基本乘法"""
    assert multiply(4, 5) == 20

def test_multiply_by_zero():
    """測試：乘以零"""
    assert multiply(100, 0) == 0           # 任何數乘以零都是零

def test_multiply_negative():
    """測試：負數相乘"""
    assert multiply(-3, -4) == 12          # 負負得正

# ===== 測試 divide 函數 =====

def test_divide_basic():
    """測試：基本除法"""
    assert divide(10, 2) == 5

def test_divide_decimal_result():
    """測試：結果是小數"""
    assert divide(7, 2) == 3.5

def test_divide_by_zero():
    """測試：除以零應該報錯"""
    with pytest.raises(ValueError):        # 期望拋出 ValueError
        divide(10, 0)

# ===== 測試 percentage 函數 =====

def test_percentage_basic():
    """測試：基本百分比"""
    assert percentage(200, 15) == 30       # 200 的 15% = 30

def test_percentage_hundred():
    """測試：100% 就是原數"""
    assert percentage(50, 100) == 50

def test_percentage_zero():
    """測試：0% 就是零"""
    assert percentage(1000, 0) == 0
```

### 預期輸出：

要求 Claude Code 執行測試：

```
請執行 pytest test_calculator.py -v
```

`-v` 表示 verbose（詳細模式），會顯示每個測試的結果。

📸 [你應該看到的畫面]
```
┌────────────────────────────────────────────────────────┐
│ ======================== test session starts ========== │
│ collected 15 items                                     │
│                                                        │
│ test_calculator.py::test_add_positive_numbers PASSED   │
│ test_calculator.py::test_add_negative_numbers PASSED   │
│ test_calculator.py::test_add_zero PASSED               │
│ test_calculator.py::test_subtract_basic PASSED         │
│ test_calculator.py::test_subtract_negative_result PASSED│
│ test_calculator.py::test_subtract_same_numbers PASSED  │
│ test_calculator.py::test_multiply_basic PASSED         │
│ test_calculator.py::test_multiply_by_zero PASSED       │
│ test_calculator.py::test_multiply_negative PASSED      │
│ test_calculator.py::test_divide_basic PASSED           │
│ test_calculator.py::test_divide_decimal_result PASSED  │
│ test_calculator.py::test_divide_by_zero PASSED         │
│ test_calculator.py::test_percentage_basic PASSED       │
│ test_calculator.py::test_percentage_hundred PASSED     │
│ test_calculator.py::test_percentage_zero PASSED        │
│                                                        │
│ ================= 15 passed in 0.03s ================= │
└────────────────────────────────────────────────────────┘
```

**15 passed** — 所有 15 個測試都通過了！綠色的 PASSED 表示成功。

## 💻 代碼示例 2：測試失敗時會怎樣？

讓我們故意讓一個測試失敗，看看會怎樣。

對 Claude Code 說：

```
請修改 calculator.py 的 percentage 函數，故意把它改壞（例如忘了除以 100），
然後重新跑測試，讓我看看測試失敗的樣子。
```

Claude Code 會把 `percentage` 函數改成：

```python
def percentage(amount, percent):
    """計算百分比（故意寫錯了！）"""
    return amount * percent    # 忘了除以 100！
```

然後執行測試：

📸 [你應該看到的畫面]
```
┌────────────────────────────────────────────────────────┐
│ ======================== test session starts ========== │
│ collected 15 items                                     │
│                                                        │
│ test_calculator.py::test_add_positive_numbers PASSED   │
│ ...（前 12 個測試都通過）...                              │
│ test_calculator.py::test_percentage_basic FAILED       │
│ test_calculator.py::test_percentage_hundred FAILED     │
│ test_calculator.py::test_percentage_zero PASSED        │
│                                                        │
│ ==================== FAILURES ======================== │
│ _____________ test_percentage_basic _________________  │
│                                                        │
│     assert percentage(200, 15) == 30                   │
│ E   assert 3000 == 30                                  │
│ E    +  where 3000 = percentage(200, 15)               │
│                                                        │
│ ============== 2 failed, 13 passed in 0.03s ========== │
└────────────────────────────────────────────────────────┘
```

看到了嗎？測試清楚地告訴你：
- `percentage(200, 15)` 應該回傳 `30`，但實際回傳了 `3000`
- 這就是因為忘了除以 100：200 * 15 = 3000，而不是 200 * 15 / 100 = 30

**這就是測試的價值**：如果沒有測試，你可能要等到客戶投訴帳單金額錯誤時才會發現問題！

然後告訴 Claude Code：

```
測試失敗了，請把 percentage 函數改回正確的版本。
```

## 📖 測試的最佳實踐

### 1. 測試命名要清楚

```python
# 好的命名：看函數名就知道在測什麼
def test_divide_by_zero_raises_error():
    ...

# 不好的命名：看不出在測什麼
def test_1():
    ...
```

### 2. 每個測試只驗證一件事

```python
# 好：一個測試一件事
def test_add_returns_correct_sum():
    assert add(2, 3) == 5

# 不好：一個測試塞太多東西
def test_everything():
    assert add(2, 3) == 5
    assert subtract(5, 3) == 2
    assert multiply(2, 3) == 6
```

### 3. 測試邊界情況

邊界情況就是「極端」的輸入，例如：
- 零 (0)
- 負數
- 非常大的數字
- 空字串 `""`
- 空列表 `[]`

這些邊界情況往往是最容易出 bug 的地方。

### 4. 讓 Claude Code 幫你想測試案例

你可以這樣問：

```
我有一個函數可以計算年齡。請幫我想想有哪些需要測試的情況，
包括正常情況和可能出問題的邊界情況。
```

Claude Code 會幫你想到你可能遺漏的場景。

## ✍️ 動手練習

### 練習 1：為字串工具函數寫測試

先建立 `string_utils.py`：

```python
# string_utils.py — 字串工具函數

def reverse_string(text):
    """反轉字串，例如 'hello' -> 'olleh'"""
    return text[::-1]

def count_vowels(text):
    """計算母音數量 (a, e, i, o, u)"""
    vowels = 'aeiouAEIOU'
    return sum(1 for char in text if char in vowels)

def is_palindrome(text):
    """檢查是否為回文（正反讀都一樣）"""
    cleaned = text.lower().replace(' ', '')
    return cleaned == cleaned[::-1]

def truncate(text, max_length):
    """截斷文字，超過長度時加上 '...'"""
    if len(text) <= max_length:
        return text
    return text[:max_length - 3] + '...'
```

對 Claude Code 說：

```
請為 string_utils.py 的每個函數寫至少 3 個測試，
包含正常情況和邊界情況（空字串、單一字元等）。
保存到 test_string_utils.py，然後執行測試。
```

**提示**：注意 `is_palindrome` 函數——"racecar"、"A man a plan a canal Panama" 都是回文。空字串呢？

### 練習 2：測試驅動修復

建立一個有 bug 的函數和它的測試，讓 Claude Code 通過修復函數來讓所有測試通過：

```python
# temperature.py — 溫度轉換（有 bug）

def celsius_to_fahrenheit(celsius):
    """攝氏轉華氏：F = C * 9/5 + 32"""
    return celsius * 9 / 5 + 32

def fahrenheit_to_celsius(fahrenheit):
    """華氏轉攝氏：C = (F - 32) * 5/9"""
    return fahrenheit - 32 * 5 / 9          # Bug！運算優先順序錯了

def is_freezing(celsius):
    """判斷是否為冰點以下"""
    return celsius < 0                       # Bug！冰點是 0 度，0 度也算冰點
```

對 Claude Code 說：

```
請先為 temperature.py 寫完整的測試（test_temperature.py）。
然後執行測試，找出哪些測試失敗了，並修復 temperature.py 中的 bug，
讓所有測試都能通過。
```

## ❓ 小測驗（3 條題目）

1. 為什麼要寫測試？
   A. 因為老闆要求
   B. 讓程式跑得更快
   C. 自動檢查程式碼是否正確，修改後能快速確認沒有壞掉
   D. 讓程式碼看起來更多

   答案：C — 測試的核心價值是自動化驗證。當你修改了程式碼，只需要跑一次測試就能知道有沒有不小心弄壞其他功能。這比每次都手動檢查快得多，也可靠得多。

2. 當 pytest 顯示 `3 failed, 12 passed`，這代表什麼？
   A. 整個程式都壞了，要全部重寫
   B. 15 個測試中有 12 個通過了，3 個發現了問題需要修復
   C. 要安裝 3 個新套件
   D. 電腦需要重新啟動

   答案：B — pytest 會清楚地告訴你哪些測試通過了、哪些失敗了。3 個失敗表示有 3 個地方的功能不符合預期，你只需要修復那 3 個問題就好。

3. 以下哪個是好的測試案例？
   A. `def test_1(): pass`
   B. `def test_add_two_positive_numbers(): assert add(2, 3) == 5`
   C. `def test(): add(2, 3)`
   D. `def check_add(): return add(2, 3) == 5`

   答案：B — 好的測試需要：清楚的命名（說明在測什麼）、使用 `assert` 來驗證結果、函數名以 `test_` 開頭（pytest 才能找到它）。選項 A 什麼都沒測，C 沒有驗證結果，D 不是 pytest 格式。

## 🔗 下一步

恭喜你完成了 Phase 3 的所有模塊！你已經學會了：
- 多文件操作與重構（3.1）
- 自動化腳本撰寫（3.2）
- 調試與錯誤修復（3.3）
- 測試與品質保證（3.4）

在接下來的 **Phase 4：進階應用篇**，你將開始使用 Claude Code 來建立真正實用的專案——包括 API 串接、網頁開發、和更複雜的自動化工作流程。你已經有了堅實的基礎，準備好迎接更大的挑戰！
