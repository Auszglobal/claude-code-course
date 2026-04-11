# 模塊 4.3：數據處理與分析 (Data Processing and Analysis)

## 🎯 學習目標
- 完成本課後你能夠...
  - 理解常見的資料檔案格式：CSV、JSON、Excel
  - 使用 Claude Code 讀取和解析各種資料檔案
  - 對資料進行篩選、排序、統計等基本操作
  - 用 Python 生成簡單的圖表
  - 從原始資料產出一份摘要報告

## 📖 理論解釋

### 常見的資料檔案格式

你每天都在接觸資料，只是可能沒注意到：銀行帳單、購物清單、成績表 —— 這些都是資料。在電腦的世界裡，資料通常存放在以下幾種格式的檔案中：

#### CSV（逗號分隔值）

想像一張 **Excel 表格被存成純文字**。每一行是一筆記錄，每個欄位用逗號隔開。

```
姓名,年齡,城市
小明,25,台北
小華,30,高雄
小美,28,台中
```

就像用逗號取代了表格的格線。CSV 是最常見、最通用的資料格式，幾乎所有軟體都能讀取。

#### JSON（JavaScript 物件表示法）

在模塊 4.2 我們已經見過 JSON 了。它像一份**有層次的表單**：

```json
[
  {"姓名": "小明", "年齡": 25, "城市": "台北"},
  {"姓名": "小華", "年齡": 30, "城市": "高雄"}
]
```

JSON 特別適合有巢狀結構的資料（例如一個人有多個地址）。

#### Excel（.xlsx）

就是你熟悉的 **Microsoft Excel 試算表**。它可以有多個工作表（Sheet）、格式設定、公式等。功能最豐富，但檔案比較大，也比較複雜。

> **小比喻**：如果資料是水，那 CSV 就是塑膠杯（簡單輕便）、JSON 就是保溫瓶（有結構有保護）、Excel 就是水壺（功能齊全但較重）。

---

## 💻 代碼示例 1：分析銷售數據 CSV

讓我們用一個實際例子來學習。首先建立項目：

```bash
mkdir data-analysis
cd data-analysis
```

啟動 Claude Code，先請它幫我們建立一份範例資料：

```
幫我建立一個 sales_data.csv 檔案，包含以下欄位：
- date（日期，2024年1月到6月）
- product（產品名稱：筆電、手機、平板、耳機、充電器）
- quantity（數量，1-50之間的隨機整數）
- price（單價，跟產品對應的合理價格）
- region（地區：北部、中部、南部、東部）
生成 100 筆模擬資料。
```

接下來，請 Claude Code 分析這份資料：

```
幫我用 Python 分析 sales_data.csv，我想知道：
1. 總銷售額是多少
2. 哪個產品賣得最好（按數量）
3. 哪個地區銷售額最高
4. 每個月的銷售趨勢
用 pandas 處理資料，加上詳細中文註釋。
```

Claude Code 會生成類似這樣的分析腳本：

```python
# analyze_sales.py — 銷售數據分析工具
import pandas as pd  # pandas 是 Python 最強大的資料分析工具庫

# ===== 第一步：讀取資料 =====
# 就像打開一個 Excel 檔案一樣簡單
df = pd.read_csv("sales_data.csv")

# 計算每筆交易的銷售額
df["total"] = df["quantity"] * df["price"]  # 數量 x 單價 = 銷售額

# 看看資料長什麼樣（顯示前 5 筆）
print("=== 資料預覽（前 5 筆）===")
print(df.head())
print(f"\n共有 {len(df)} 筆資料\n")

# ===== 第二步：基本統計 =====
total_revenue = df["total"].sum()  # 加總所有銷售額
print(f"=== 總銷售額 ===")
print(f"${total_revenue:,.0f}\n")

# ===== 第三步：各產品銷售量排名 =====
product_qty = df.groupby("product")["quantity"].sum()  # 按產品分組，加總數量
product_qty = product_qty.sort_values(ascending=False)  # 由大到小排序

print("=== 產品銷售量排名 ===")
for product, qty in product_qty.items():
    print(f"  {product}: {qty} 件")

# ===== 第四步：各地區銷售額 =====
region_sales = df.groupby("region")["total"].sum()  # 按地區分組，加總銷售額
region_sales = region_sales.sort_values(ascending=False)

print("\n=== 地區銷售額排名 ===")
for region, sales in region_sales.items():
    print(f"  {region}: ${sales:,.0f}")

# ===== 第五步：月度趨勢 =====
df["month"] = pd.to_datetime(df["date"]).dt.month  # 從日期中提取月份
monthly = df.groupby("month")["total"].sum()       # 按月份加總

print("\n=== 月度銷售趨勢 ===")
for month, sales in monthly.items():
    # 用簡單的長條圖表示
    bar = "#" * int(sales / monthly.max() * 30)  # 等比例縮放
    print(f"  {month}月: ${sales:>10,.0f} {bar}")
```

### 預期輸出：

```bash
# 先安裝 pandas（如果還沒有的話）
pip install pandas

# 執行分析腳本
python analyze_sales.py
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────────┐
│ === 資料預覽（前 5 筆）===                      │
│   date     product  quantity  price  total    │
│ 2024-01-05  筆電      3      25000  75000    │
│ 2024-01-08  手機      12      8000  96000    │
│ ...                                           │
│                                               │
│ 共有 100 筆資料                                │
│                                               │
│ === 總銷售額 ===                               │
│ $5,234,000                                    │
│                                               │
│ === 產品銷售量排名 ===                          │
│   耳機: 245 件                                 │
│   充電器: 198 件                               │
│   手機: 167 件                                 │
│   平板: 142 件                                 │
│   筆電: 98 件                                  │
│                                               │
│ === 月度銷售趨勢 ===                            │
│   1月: $  820,000 ####################         │
│   2月: $  750,000 ##################           │
│   3月: $  910,000 #######################      │
│   ...                                          │
└──────────────────────────────────────────────┘
```

---

## 💻 代碼示例 2：生成圖表視覺化

數字很好，但圖表更直觀！讓我們請 Claude Code 加入圖表功能：

```
幫我在 analyze_sales.py 的基礎上，用 matplotlib 生成以下圖表，
全部保存為 PNG 圖片：
1. 各產品銷售量的長條圖 (bar chart)
2. 各地區銷售額的圓餅圖 (pie chart)
3. 月度銷售趨勢的折線圖 (line chart)
圖表標題和標籤用中文，要有適當的配色。
保存到 charts/ 資料夾中。
```

Claude Code 會生成圖表腳本：

```python
# create_charts.py — 銷售數據圖表生成器
import pandas as pd
import matplotlib.pyplot as plt       # 繪圖工具庫
import matplotlib                       # 用來設定中文字體
import os

# 設定中文字體（避免亂碼）
matplotlib.rcParams["font.sans-serif"] = ["Microsoft JhengHei", "SimHei", "Arial"]
matplotlib.rcParams["axes.unicode_minus"] = False  # 正確顯示負號

# 建立 charts 資料夾（如果不存在）
os.makedirs("charts", exist_ok=True)

# 讀取資料
df = pd.read_csv("sales_data.csv")
df["total"] = df["quantity"] * df["price"]

# ===== 圖表 1：產品銷售量長條圖 =====
product_qty = df.groupby("product")["quantity"].sum().sort_values(ascending=True)

plt.figure(figsize=(10, 6))                    # 設定圖表大小
colors = ["#00b4a6", "#1a1a2e", "#e76f51", "#2a9d8f", "#264653"]
product_qty.plot(kind="barh", color=colors)    # 水平長條圖
plt.title("各產品銷售量", fontsize=16)
plt.xlabel("銷售數量（件）")
plt.tight_layout()                              # 自動調整邊距
plt.savefig("charts/product_sales.png", dpi=150)  # 保存為圖片
plt.close()
print("已生成：charts/product_sales.png")

# ===== 圖表 2：地區銷售額圓餅圖 =====
region_sales = df.groupby("region")["total"].sum()

plt.figure(figsize=(8, 8))
region_sales.plot(kind="pie", autopct="%1.1f%%", colors=colors)
plt.title("各地區銷售額佔比", fontsize=16)
plt.ylabel("")                                  # 隱藏預設的 y 軸標籤
plt.tight_layout()
plt.savefig("charts/region_pie.png", dpi=150)
plt.close()
print("已生成：charts/region_pie.png")

# ===== 圖表 3：月度趨勢折線圖 =====
df["month"] = pd.to_datetime(df["date"]).dt.month
monthly = df.groupby("month")["total"].sum()

plt.figure(figsize=(10, 6))
monthly.plot(kind="line", marker="o", color="#00b4a6", linewidth=2)
plt.title("月度銷售趨勢", fontsize=16)
plt.xlabel("月份")
plt.ylabel("銷售額（$）")
plt.grid(True, alpha=0.3)                       # 加入淡色格線
plt.xticks(range(1, 7), ["1月", "2月", "3月", "4月", "5月", "6月"])
plt.tight_layout()
plt.savefig("charts/monthly_trend.png", dpi=150)
plt.close()
print("已生成：charts/monthly_trend.png")

print("\n所有圖表已保存到 charts/ 資料夾！")
```

### 預期輸出：

```bash
# 安裝 matplotlib（如果還沒有的話）
pip install matplotlib

# 執行圖表腳本
python create_charts.py
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────────┐
│ 已生成：charts/product_sales.png          │
│ 已生成：charts/region_pie.png             │
│ 已生成：charts/monthly_trend.png          │
│                                           │
│ 所有圖表已保存到 charts/ 資料夾！           │
└──────────────────────────────────────────┘
```

生成後的檔案結構：

```
data-analysis/
├── sales_data.csv          # 原始資料
├── analyze_sales.py        # 分析腳本
├── create_charts.py        # 圖表腳本
└── charts/
    ├── product_sales.png   # 產品銷售量長條圖
    ├── region_pie.png      # 地區圓餅圖
    └── monthly_trend.png   # 月度趨勢折線圖
```

你可以在檔案總管中雙擊打開那些 PNG 圖片來查看圖表。

---

## ✍️ 動手練習

### 練習 1：分析你自己的資料

1. 請 Claude Code 建立一份你感興趣的模擬資料（例如：讀書記錄、運動數據、每日開支）
2. 至少包含 50 筆資料和 4 個欄位
3. 用 pandas 進行分析，找出至少 3 個有趣的發現
4. 生成至少一張圖表

> **提示**：例如你可以說「幫我建立一份 2024 年每日運動記錄的 CSV，包含日期、運動類型、持續時間、消耗卡路里，然後分析哪種運動最常做、每月平均運動時間」

### 練習 2：從 JSON 檔案生成摘要報告

1. 請 Claude Code 建立一份 JSON 格式的學生成績資料（10 個學生，5 個科目）
2. 撰寫一個 Python 腳本，讀取 JSON 並產出：
   - 每個學生的平均分數
   - 每科的最高分和最低分
   - 全班的排名
3. 把結果輸出成一份整齊的文字報告

> **提示**：告訴 Claude Code「讀取 students.json，計算各種統計，然後用 print 輸出一份格式整齊的報告」

---

## ❓ 小測驗（3 條題目）

**1. CSV 檔案的特點是什麼？**

A. 只能用 Microsoft Excel 打開
B. 用逗號分隔每個欄位的純文字檔案
C. 一種圖片格式
D. 需要特殊軟體才能建立

答案：B — CSV（Comma-Separated Values，逗號分隔值）是純文字檔案，用逗號分隔欄位。它可以被任何文字編輯器、Excel、Google Sheets 或程式語言讀取，是最通用的資料格式。

---

**2. 在 pandas 中，`df.groupby("product")["quantity"].sum()` 這行代碼做了什麼？**

A. 刪除了所有產品資料
B. 按產品名稱分組，然後計算每組的數量總和
C. 把所有產品的名稱加在一起
D. 隨機打亂資料的順序

答案：B — `groupby("product")` 把資料按產品名稱分成不同的組（就像把撲克牌按花色分堆），然後 `["quantity"].sum()` 計算每組中數量欄位的加總。

---

**3. 為什麼在用 matplotlib 生成圖表時需要設定中文字體？**

A. 中文字體能讓圖表更漂亮
B. 沒有設定中文字體，圖表上的中文字會變成亂碼或方框
C. 英文字體不能顯示數字
D. matplotlib 只支持中文字體

答案：B — matplotlib 預設使用的字體不包含中文字元，所以中文標題和標籤會顯示為方框或亂碼。透過設定 `rcParams["font.sans-serif"]` 指定包含中文的字體，就能正確顯示中文。

---

## 🔗 下一步

你現在已經會讀取資料、分析資料、甚至生成漂亮的圖表了！在最後一個模塊 **4.4：部署與發布** 中，我們將學習如何把你建立的網站或項目發布到網路上，讓全世界的人都能看到你的作品。這是把學習成果變成真實成就的最後一步！
