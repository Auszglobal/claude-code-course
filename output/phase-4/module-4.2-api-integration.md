# 模塊 4.2：API 整合入門 (Introduction to API Integration)

## 🎯 學習目標
- 完成本課後你能夠...
  - 理解什麼是 API 以及它的運作方式
  - 知道 JSON 是什麼，能看懂基本的 JSON 格式
  - 使用 Claude Code 撰寫呼叫 API 的程式
  - 建立一個天氣查詢小工具
  - 建立一個隨機名言顯示器

## 📖 理論解釋

### 什麼是 API？

**API**（Application Programming Interface）聽起來很複雜，但概念其實很簡單。

想像你去一家餐廳：
- 你（程式）坐在座位上，想吃牛排
- **服務員（API）** 接收你的點單
- 服務員把點單送到**廚房（伺服器）**
- 廚房做好菜後，服務員把**牛排（資料）** 端到你面前

你不需要知道廚房怎麼運作，也不需要自己去廚房。你只需要跟服務員說你要什麼，服務員就會幫你搞定。

**API 就是那個服務員** —— 它是你的程式和外部服務之間的溝通橋樑。

### 什麼是 JSON？

當 API 回傳資料時，它通常使用一種叫 **JSON** 的格式。你可以把 JSON 想像成一張**結構化的表單**：

```json
{
  "城市": "台北",
  "溫度": 28,
  "天氣": "晴天",
  "濕度": 65
}
```

看到了嗎？就像填表格一樣：
- 左邊是**欄位名稱**（用引號包起來）
- 右邊是**欄位的值**
- 用大括號 `{}` 包住整張表單
- 每一行用逗號分隔

### 常見的免費 API

以下是一些不需要註冊就能使用的免費 API，非常適合練習：

| API | 用途 | 網址 |
|-----|------|------|
| wttr.in | 天氣資訊 | `https://wttr.in` |
| quotable.io | 隨機名言 | `https://api.quotable.io` |
| dog.ceo | 隨機狗狗圖片 | `https://dog.ceo/api` |
| jsonplaceholder | 假資料練習 | `https://jsonplaceholder.typicode.com` |

---

## 💻 代碼示例 1：建立天氣查詢工具

讓我們用 Claude Code 建立一個能查詢任何城市天氣的小工具。

首先，建立項目資料夾：

```bash
mkdir weather-checker
cd weather-checker
```

啟動 Claude Code，然後輸入：

```
幫我用 Python 建立一個天氣查詢工具，要求：
1. 使用 wttr.in 的 API（不需要 API key）
2. 讓使用者輸入城市名稱
3. 顯示該城市的：目前溫度、天氣狀況、濕度
4. 輸出格式要美觀易讀
5. 如果城市名稱錯誤，要顯示友善的錯誤提示
6. 加上詳細的中文註釋
```

Claude Code 會生成類似這樣的程式：

```python
# weather.py — 天氣查詢工具
import requests  # 用來發送網路請求的工具庫
import json      # 用來處理 JSON 格式資料

def get_weather(city):
    """查詢指定城市的天氣資訊"""
    # 組合 API 的網址（就像告訴服務員你要什麼）
    url = f"https://wttr.in/{city}?format=j1"

    try:
        # 發送請求給 API（就像把點單交給服務員）
        response = requests.get(url, timeout=10)

        # 檢查是否成功（服務員有沒有回來）
        if response.status_code == 200:
            # 解析 JSON 回應（打開服務員送來的餐盤）
            data = response.json()

            # 從資料中取出我們需要的資訊
            current = data["current_condition"][0]
            temp = current["temp_C"]           # 目前溫度（攝氏）
            desc = current["weatherDesc"][0]["value"]  # 天氣描述
            humidity = current["humidity"]     # 濕度百分比
            feels_like = current["FeelsLikeC"] # 體感溫度

            # 美觀地顯示結果
            print(f"\n{'='*40}")
            print(f"  {city} 目前天氣")
            print(f"{'='*40}")
            print(f"  溫度：     {temp}°C")
            print(f"  體感溫度： {feels_like}°C")
            print(f"  天氣狀況： {desc}")
            print(f"  濕度：     {humidity}%")
            print(f"{'='*40}\n")
        else:
            print(f"找不到「{city}」的天氣資訊，請確認城市名稱是否正確。")

    except requests.exceptions.ConnectionError:
        print("無法連接到網路，請檢查你的網路連線。")
    except Exception as e:
        print(f"發生錯誤：{e}")

# 主程式
if __name__ == "__main__":
    print("天氣查詢工具")
    print("-" * 20)
    city = input("請輸入城市名稱（英文）：")  # 等待使用者輸入
    get_weather(city)                          # 呼叫查詢函式
```

### 預期輸出：

執行程式：

```bash
python weather.py
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────┐
│ 天氣查詢工具                          │
│ --------------------                  │
│ 請輸入城市名稱（英文）：Sydney         │
│                                       │
│ ========================================│
│   Sydney 目前天氣                      │
│ ========================================│
│   溫度：     22°C                      │
│   體感溫度： 20°C                      │
│   天氣狀況： Partly cloudy             │
│   濕度：     65%                       │
│ ========================================│
└──────────────────────────────────────┘
```

> **注意**：執行前需要確保你有安裝 `requests` 套件。如果沒有，在終端機執行 `pip install requests`。

---

## 💻 代碼示例 2：隨機名言顯示器

接下來，讓我們建立一個能顯示隨機名言的小程式。在 Claude Code 中輸入：

```
幫我用 Python 建立一個隨機名言顯示器，要求：
1. 使用 https://dummyjson.com/quotes/random API
2. 每次執行顯示一條隨機名言和作者
3. 加入一個迴圈功能，按 Enter 可以看下一條，輸入 q 退出
4. 輸出要有漂亮的邊框
5. 加上詳細的中文註釋
```

Claude Code 會生成類似這樣的程式：

```python
# quotes.py — 隨機名言顯示器
import requests  # 發送網路請求

def get_random_quote():
    """從 API 獲取一條隨機名言"""
    # API 端點（服務員的窗口）
    url = "https://dummyjson.com/quotes/random"

    try:
        # 向 API 發送請求
        response = requests.get(url, timeout=10)

        if response.status_code == 200:
            # 解析回傳的 JSON 資料
            data = response.json()

            quote = data["quote"]    # 名言內容
            author = data["author"]  # 作者名字

            return quote, author
        else:
            return None, None

    except Exception:
        return None, None

def display_quote(quote, author):
    """用漂亮的格式顯示名言"""
    # 計算邊框寬度（名言長度 + 一些空間）
    width = min(max(len(quote), len(author) + 4), 60)

    print()
    print("+" + "-" * (width + 2) + "+")

    # 如果名言很長，分行顯示
    words = quote.split()
    line = " "
    for word in words:
        if len(line) + len(word) + 1 <= width:
            line += word + " "
        else:
            print(f"| {line:<{width}} |")
            line = " " + word + " "
    if line.strip():
        print(f"| {line:<{width}} |")

    print("|" + " " * (width + 2) + "|")
    attribution = f"  -- {author}"
    print(f"| {attribution:<{width}} |")
    print("+" + "-" * (width + 2) + "+")
    print()

# 主程式
if __name__ == "__main__":
    print("=== 隨機名言顯示器 ===")
    print("按 Enter 看下一條名言，輸入 q 退出\n")

    while True:
        # 取得一條隨機名言
        quote, author = get_random_quote()

        if quote:
            display_quote(quote, author)
        else:
            print("無法取得名言，請檢查網路連線。")

        # 等待使用者按鍵
        user_input = input("繼續？(Enter/q) ")
        if user_input.lower() == "q":
            print("感謝使用，再見！")
            break
```

### 預期輸出：

```bash
python quotes.py
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────────────┐
│ === 隨機名言顯示器 ===                                 │
│ 按 Enter 看下一條名言，輸入 q 退出                      │
│                                                        │
│ +--------------------------------------------------+  │
│ |  The only way to do great work is to love what    |  │
│ |  you do.                                          |  │
│ |                                                   |  │
│ |   -- Steve Jobs                                   |  │
│ +--------------------------------------------------+  │
│                                                        │
│ 繼續？(Enter/q)                                        │
└──────────────────────────────────────────────────────┘
```

---

## ✍️ 動手練習

### 練習 1：狗狗圖片產生器

使用 Dog CEO API（`https://dog.ceo/api/breeds/image/random`）建立一個程式：
1. 請 Claude Code 建立一個 Python 腳本
2. 每次執行時取得一張隨機狗狗圖片的網址
3. 在終端機中顯示網址，並嘗試自動用瀏覽器打開圖片

> **提示**：告訴 Claude Code「用 `webbrowser` 模組自動打開圖片連結」

### 練習 2：把 API 加進你的網站

回到模塊 4.1 建立的個人網站，請 Claude Code 加入一個功能：
1. 在網站底部加入一個「每日名言」區域
2. 用 JavaScript 的 `fetch` 函式呼叫名言 API
3. 每次載入網頁時自動顯示一條隨機名言
4. 加一個「換一條」按鈕

> **提示**：告訴 Claude Code「在 index.html 中加入一個每日名言區域，用 JavaScript fetch 呼叫 dummyjson.com 的 quotes API」

---

## ❓ 小測驗（3 條題目）

**1. API 最好的比喻是什麼？**

A. 一本食譜 —— 教你怎麼煮菜
B. 一個服務員 —— 接收你的請求，從廚房帶回結果
C. 一個倉庫 —— 存放所有的資料
D. 一台印表機 —— 把資料印出來

答案：B — API 就像餐廳服務員，你不需要知道廚房（伺服器）怎麼運作，只需要透過服務員（API）點單（發送請求），就能拿到你要的餐點（資料）。

---

**2. 以下 JSON 格式中，「溫度」的值是什麼？**
```json
{
  "城市": "台北",
  "溫度": 28,
  "天氣": "晴天"
}
```

A. "台北"
B. 28
C. "晴天"
D. "溫度"

答案：B — 在 JSON 中，冒號左邊是欄位名稱（key），右邊是值（value）。「溫度」這個欄位對應的值是 28。

---

**3. 如果 API 請求失敗（比如網路斷線），程式應該怎麼處理？**

A. 直接當機，不需要處理
B. 顯示一個友善的錯誤訊息，讓使用者知道出了什麼問題
C. 無限重試直到成功
D. 刪除所有檔案重新開始

答案：B — 好的程式應該使用 try/except 處理可能的錯誤，並顯示友善的提示訊息。無限重試可能會造成程式卡住，直接當機則給使用者很差的體驗。

---

## 🔗 下一步

太棒了！你已經學會了如何讓程式連接外部服務獲取資料。在下一個模塊 **4.3：數據處理與分析** 中，我們將學習如何處理和分析資料檔案 —— 例如讀取 CSV 表格、整理數據、甚至生成圖表。這是非常實用的技能，無論你從事什麼行業都會用到！
