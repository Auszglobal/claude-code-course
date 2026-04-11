# 模塊 3.2：自動化腳本入門 (Introduction to Automation Scripts)

## 🎯 學習目標
- 完成本課後你能夠：
  - 理解什麼是腳本，以及為什麼需要自動化
  - 請 Claude Code 幫你撰寫簡單的 Python 腳本
  - 透過 Claude Code 執行腳本並觀察結果
  - 建立一個自動整理文件的腳本
  - 建立一個自動重新命名照片的腳本

## 📖 理論解釋

### 什麼是腳本 (Script)？

腳本就像一份**食譜**。

想像你每天早上都要做同樣的早餐：煎蛋、烤吐司、倒咖啡。如果你把步驟寫成一份食譜，任何人都可以照著做出一樣的早餐。

腳本就是寫給電腦的「食譜」——一系列按順序執行的指令。你寫一次，電腦就可以重複執行無數次，而且不會出錯、不會偷懶。

### 為什麼要自動化？

| 手動做 | 用腳本自動化 |
|--------|-------------|
| 一個一個重新命名 100 張照片 | 一鍵完成全部重新命名 |
| 每天手動整理下載資料夾 | 腳本自動分類所有新文件 |
| 一個一個複製貼上數據 | 腳本自動讀取和處理數據 |
| 花 30 分鐘做重複工作 | 花 1 秒鐘執行腳本 |

**關鍵概念**：你不需要自己寫腳本！你只需要告訴 Claude Code 你想自動化什麼，它會幫你寫好腳本。

### Python 是什麼？

Python 是一種程式語言，特別適合寫自動化腳本，因為：
- 語法簡單，接近英文
- 有大量現成的工具包
- 幾乎每台電腦都可以執行

你不需要學會 Python 才能使用它——Claude Code 會幫你寫，你只需要告訴它你想做什麼。

### 確認 Python 已安裝

在開始之前，先確認你的電腦有 Python：

**Windows (Git Bash)：**
```bash
python --version
```

**Mac/Linux：**
```bash
python3 --version
```

📸 [你應該看到的畫面]
```
┌─────────────────────────────┐
│ Python 3.11.5               │
└─────────────────────────────┘
```

如果看到版本號碼（3.8 以上都可以），就表示已經安裝好了。如果沒有，請參考 Python 官網 (python.org) 的安裝教學。

## 💻 代碼示例 1：自動整理下載資料夾

讓我們請 Claude Code 寫一個腳本，自動把文件按類型分類到不同資料夾。

首先建立練習環境：

```bash
# 建立練習目錄和模擬文件
mkdir -p ~/claude-practice/auto-organizer/downloads
cd ~/claude-practice/auto-organizer/downloads

# 建立各種測試文件
touch report.pdf budget.xlsx presentation.pptx
touch vacation.jpg selfie.png screenshot.bmp
touch song.mp3 podcast.wav
touch video.mp4 clip.mov
touch notes.txt readme.md data.csv
touch archive.zip backup.tar.gz
```

啟動 Claude Code：

```bash
cd ~/claude-practice/auto-organizer
claude
```

對 Claude Code 說：

```
請幫我寫一個 Python 腳本 organize.py，功能是自動整理 downloads/ 資料夾裡的文件。

規則：
- 圖片 (.jpg, .png, .bmp, .gif) 移到 downloads/Images/
- 文檔 (.pdf, .docx, .xlsx, .pptx, .txt, .md, .csv) 移到 downloads/Documents/
- 音樂 (.mp3, .wav, .flac) 移到 downloads/Music/
- 影片 (.mp4, .mov, .avi) 移到 downloads/Videos/
- 壓縮檔 (.zip, .tar.gz, .rar) 移到 downloads/Archives/
- 其他文件移到 downloads/Other/

腳本要：
1. 自動建立子資料夾（如果不存在）
2. 顯示每個文件被移到哪裡
3. 最後顯示整理結果摘要
```

Claude Code 會幫你生成類似這樣的腳本：

```python
# organize.py — 自動整理下載資料夾
import os       # 操作系統功能（處理文件和資料夾）
import shutil   # 文件移動功能

# 定義文件分類規則（像一張對照表）
FILE_CATEGORIES = {
    'Images': ['.jpg', '.jpeg', '.png', '.bmp', '.gif'],
    'Documents': ['.pdf', '.docx', '.xlsx', '.pptx', '.txt', '.md', '.csv'],
    'Music': ['.mp3', '.wav', '.flac'],
    'Videos': ['.mp4', '.mov', '.avi'],
    'Archives': ['.zip', '.tar.gz', '.rar'],
}

def organize_folder(folder_path):
    """整理指定資料夾中的所有文件"""
    moved_count = {}  # 記錄每個類別移動了多少文件

    # 遍歷資料夾中的每個文件
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        # 跳過資料夾，只處理文件
        if os.path.isdir(file_path):
            continue

        # 取得文件的副檔名（例如 .pdf）
        _, ext = os.path.splitext(filename)
        ext = ext.lower()  # 統一轉小寫

        # 找出這個文件屬於哪個類別
        category = 'Other'  # 預設類別
        for cat_name, extensions in FILE_CATEGORIES.items():
            if ext in extensions:
                category = cat_name
                break

        # 建立目標資料夾（如果不存在）
        dest_folder = os.path.join(folder_path, category)
        os.makedirs(dest_folder, exist_ok=True)

        # 移動文件
        dest_path = os.path.join(dest_folder, filename)
        shutil.move(file_path, dest_path)
        print(f"  {filename} -> {category}/")

        # 更新計數
        moved_count[category] = moved_count.get(category, 0) + 1

    # 顯示結果摘要
    print("\n--- 整理完成 ---")
    total = 0
    for category, count in sorted(moved_count.items()):
        print(f"  {category}: {count} 個文件")
        total += count
    print(f"  總共整理了 {total} 個文件")

# 執行整理
if __name__ == '__main__':
    downloads_path = os.path.join(os.path.dirname(__file__), 'downloads')
    print(f"正在整理: {downloads_path}\n")
    organize_folder(downloads_path)
```

### 預期輸出：

要求 Claude Code 執行這個腳本：

```
請執行 organize.py
```

📸 [你應該看到的畫面]
```
┌──────────────────────────────────────┐
│ 正在整理: /home/user/.../downloads   │
│                                      │
│   report.pdf -> Documents/           │
│   budget.xlsx -> Documents/          │
│   presentation.pptx -> Documents/    │
│   vacation.jpg -> Images/            │
│   selfie.png -> Images/              │
│   screenshot.bmp -> Images/          │
│   song.mp3 -> Music/                 │
│   podcast.wav -> Music/              │
│   video.mp4 -> Videos/               │
│   clip.mov -> Videos/                │
│   notes.txt -> Documents/            │
│   readme.md -> Documents/            │
│   data.csv -> Documents/             │
│   archive.zip -> Archives/           │
│   backup.tar.gz -> Other/            │
│                                      │
│ --- 整理完成 ---                      │
│   Archives: 1 個文件                  │
│   Documents: 6 個文件                 │
│   Images: 3 個文件                    │
│   Music: 2 個文件                     │
│   Other: 1 個文件                     │
│   Videos: 2 個文件                    │
│   總共整理了 15 個文件                 │
└──────────────────────────────────────┘
```

## 💻 代碼示例 2：自動按日期重新命名照片

很多人的照片名字是 `IMG_0001.jpg`、`DSC_1234.jpg` 這種沒有意義的名字。讓我們寫一個腳本，把照片按拍攝日期重新命名。

建立練習環境：

```bash
mkdir -p ~/claude-practice/photo-renamer/photos
cd ~/claude-practice/photo-renamer
```

啟動 Claude Code：

```bash
cd ~/claude-practice/photo-renamer
claude
```

對 Claude Code 說：

```
請幫我寫一個 Python 腳本 rename_photos.py，功能是把 photos/ 資料夾中的圖片
按照文件的最後修改日期重新命名。

命名格式：YYYY-MM-DD_001.jpg、YYYY-MM-DD_002.jpg

例如 2024 年 3 月 15 日的第一張照片就叫 2024-03-15_001.jpg

要求：
1. 先用 --preview 模式預覽改名結果（不實際改名）
2. 確認後才用 --execute 模式真正執行
3. 顯示清楚的「之前 -> 之後」對照表
4. 請先建立一些測試用的假圖片文件讓我測試
```

Claude Code 會幫你生成腳本，並建立測試文件。核心邏輯大致如下：

```python
# rename_photos.py — 按日期重新命名照片
import os
import sys
from datetime import datetime

def get_file_date(filepath):
    """取得文件的最後修改日期"""
    timestamp = os.path.getmtime(filepath)          # 取得修改時間戳記
    return datetime.fromtimestamp(timestamp)          # 轉換成日期格式

def rename_photos(folder, execute=False):
    """重新命名照片文件"""
    # 支援的圖片格式
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.gif'}

    # 收集所有圖片文件
    photos = []
    for filename in sorted(os.listdir(folder)):
        _, ext = os.path.splitext(filename)
        if ext.lower() in image_extensions:
            filepath = os.path.join(folder, filename)
            photos.append((filename, filepath, get_file_date(filepath)))

    # 按日期排序
    photos.sort(key=lambda x: x[2])

    # 生成新名字
    date_counter = {}  # 每個日期的計數器
    renames = []

    for old_name, filepath, file_date in photos:
        date_str = file_date.strftime('%Y-%m-%d')    # 格式化日期
        _, ext = os.path.splitext(old_name)

        # 計算這個日期的序號
        date_counter[date_str] = date_counter.get(date_str, 0) + 1
        seq = date_counter[date_str]

        new_name = f"{date_str}_{seq:03d}{ext.lower()}"  # 例如：2024-03-15_001.jpg
        renames.append((old_name, new_name, filepath))

    # 顯示預覽
    print("照片重新命名預覽：")
    print("-" * 50)
    for old_name, new_name, _ in renames:
        status = "[將執行]" if execute else "[預覽]"
        print(f"  {status} {old_name} -> {new_name}")

    # 如果是執行模式，真正改名
    if execute:
        for old_name, new_name, filepath in renames:
            new_path = os.path.join(folder, new_name)
            os.rename(filepath, new_path)
        print(f"\n已成功重新命名 {len(renames)} 張照片！")
    else:
        print(f"\n預覽模式：共 {len(renames)} 張照片待重新命名")
        print("確認無誤後，請加上 --execute 參數來執行改名")

if __name__ == '__main__':
    photos_folder = os.path.join(os.path.dirname(__file__), 'photos')
    execute_mode = '--execute' in sys.argv
    rename_photos(photos_folder, execute=execute_mode)
```

### 預期輸出：

先預覽：
```
請執行 python rename_photos.py --preview
```

📸 [你應該看到的畫面]
```
┌─────────────────────────────────────────────────┐
│ 照片重新命名預覽：                                │
│ ──────────────────────────────────────────        │
│   [預覽] IMG_0001.jpg -> 2026-04-11_001.jpg      │
│   [預覽] DSC_1234.jpg -> 2026-04-11_002.jpg      │
│   [預覽] photo.png -> 2026-04-11_003.png         │
│                                                   │
│ 預覽模式：共 3 張照片待重新命名                     │
│ 確認無誤後，請加上 --execute 參數來執行改名          │
└─────────────────────────────────────────────────┘
```

## 📖 腳本執行的幾種方式

你可以透過幾種方式執行腳本：

### 方式 1：請 Claude Code 執行
```
請執行 organize.py
```
Claude Code 會在終端機中幫你執行腳本，你可以看到即時的輸出。

### 方式 2：自己在終端機執行

**Windows (Git Bash)：**
```bash
python organize.py
```

**Mac/Linux：**
```bash
python3 organize.py
```

### 方式 3：請 Claude Code 改良後執行
```
執行 organize.py，如果有錯誤請自動修復後重新執行
```
這是最省心的方式——如果腳本有任何問題，Claude Code 會自動幫你修復。

## ✍️ 動手練習

### 練習 1：建立一個文字統計腳本

請 Claude Code 幫你寫一個腳本，功能是：
- 讀取一個 `.txt` 文件
- 統計：總字數、總行數、最長的一行有幾個字
- 顯示結果

啟動 Claude Code 後說：
```
請幫我寫一個 Python 腳本 word_counter.py，它可以讀取一個文字文件，
然後顯示總字數、總行數、和最長一行的字數。
也請建立一個範例 sample.txt 讓我測試。
```

**提示**：如果腳本執行出錯，不要慌！直接把錯誤訊息告訴 Claude Code，它會幫你修復。

### 練習 2：批量建立資料夾

請 Claude Code 寫一個腳本，幫你批量建立一年 12 個月的資料夾：
```
2026-01-January/
2026-02-February/
2026-03-March/
...
2026-12-December/
```

對 Claude Code 說：
```
請幫我寫一個腳本 create_monthly_folders.py，在當前目錄下建立
2026 年 1 月到 12 月的資料夾，格式為 YYYY-MM-MonthName。
```

## ❓ 小測驗（3 條題目）

1. 腳本 (Script) 最好的比喻是什麼？
   A. 一本小說
   B. 一份食譜——按步驟執行的指令集合
   C. 一張照片
   D. 一個資料夾

   答案：B — 腳本就像食譜一樣，是一系列有順序的指令。你寫好一次，電腦就可以重複執行。

2. 使用 Claude Code 寫自動化腳本時，你需要先學會 Python 嗎？
   A. 是的，必須精通 Python 才能開始
   B. 不需要，你只要用自然語言描述你想做什麼
   C. 需要至少三年的程式經驗
   D. 只有 Mac 用戶才能使用 Python

   答案：B — 這就是 Claude Code 的強大之處。你只需要用中文或英文描述你想自動化的任務，Claude Code 會幫你生成腳本。你可以在使用的過程中慢慢學習。

3. 為什麼照片重新命名腳本要先有「預覽模式」？
   A. 因為電腦執行速度太快
   B. 因為預覽模式可以讓你確認改名結果正確後才真正執行，避免失誤
   C. 因為 Python 要求必須預覽
   D. 因為圖片文件比較大

   答案：B — 預覽模式是一個重要的安全措施。批量操作前先看看結果是否正確，確認沒問題後再真正執行，這樣可以避免意外的錯誤。這是一個很好的程式設計習慣。

## 🔗 下一步

在下一個模塊 **3.3：調試與修復錯誤**，你將學習如何面對程式出錯的情況。不要擔心——程式出錯是完全正常的！重要的是知道怎麼把錯誤訊息告訴 Claude Code，讓它幫你快速找到並修復問題。
