# 模塊 5.4：綜合實戰項目

## 🎯 學習目標
- 完成本課後你能夠：
  - 獨立使用 Claude Code 從零建立一個完整的專案
  - 整合前端（HTML/CSS/JS）與後端（Python）
  - 撰寫自動化測試確保程式品質
  - 使用 Git 進行版本控制並部署到 GitHub Pages
  - 自信地運用 Claude Code 解決各種開發任務

## 📖 理論解釋

### 你的畢業作品：個人任務管理系統

恭喜你走到了這裡！在過去的 4 個 Phase 中，你從完全零基礎一步步學會了：

- Phase 1：安裝 Claude Code、下達指令、瀏覽檔案
- Phase 2：設定 CLAUDE.md、編輯檔案、使用 Git
- Phase 3：腳本編寫、除錯、測試
- Phase 4：建立網頁、串接 API、資料處理、部署

現在，是時候把所有技能融合在一起了。

我們要建立一個 **個人任務管理系統（Task Manager）**，它包含：

| 組件 | 技術 | 對應 Phase |
|------|------|-----------|
| 前端介面 | HTML + CSS + JavaScript | Phase 4 |
| 後端腳本 | Python（讀寫 JSON 檔案） | Phase 3 |
| 自動化測試 | Python unittest | Phase 3 |
| 專案設定 | CLAUDE.md | Phase 2 |
| 版本控制 | Git + GitHub | Phase 2 |
| 部署 | GitHub Pages（前端） | Phase 4 |

把它想像成蓋一棟房子：你已經學會了砌磚、裝水電、刷油漆，現在要把這些技能組合起來，蓋出一棟真正的房子。

## 💻 步驟 1：建立專案結構

讓我們開始吧！在 Claude Code 中輸入：

```
> 幫我建立一個名為 task-manager 的新專案，包含以下結構：

task-manager/
├── CLAUDE.md            （專案說明）
├── .gitignore           （Git 忽略規則）
├── frontend/            （前端檔案）
│   ├── index.html
│   ├── style.css
│   └── app.js
├── backend/             （後端腳本）
│   ├── task_manager.py
│   └── tasks.json
└── tests/               （測試檔案）
    └── test_task_manager.py
```

或者你可以手動建立：

```bash
# 建立專案目錄
mkdir -p ~/task-manager/frontend
mkdir -p ~/task-manager/backend
mkdir -p ~/task-manager/tests

# 進入專案目錄
cd ~/task-manager
```

### 預期輸出：
你會看到一個乾淨的專案目錄結構，所有資料夾都已建立好。

## 💻 步驟 2：設定 CLAUDE.md

首先，為專案建立 CLAUDE.md：

```markdown
# Task Manager — 個人任務管理系統

## 專案概述
簡單的任務管理應用，前端使用純 HTML/CSS/JS，後端使用 Python 讀寫 JSON 檔案。

## 技術棧
- 前端：HTML5, CSS3, vanilla JavaScript（不使用框架）
- 後端：Python 3.x（標準庫，不需額外安裝）
- 資料儲存：JSON 檔案
- 測試：Python unittest

## 程式碼風格
- HTML/CSS/JS：使用 2 空格縮排
- Python：遵循 PEP 8，使用 4 空格縮排
- 所有函數必須有 docstring 說明

## 禁止事項
- 不要安裝外部依賴套件（使用標準庫即可）
- 不要修改 tasks.json 的結構
- 不要在前端程式碼中硬編碼後端路徑
```

## 💻 步驟 3：建立後端（Python）

在 Claude Code 中：

```
> 幫我建立 backend/task_manager.py，功能如下：
  - 讀取和寫入 tasks.json 檔案
  - 支持新增、刪除、標記完成、列出所有任務
  - 每個任務有：id, title, completed, created_at 欄位
```

以下是完整的後端程式碼：

```python
"""
task_manager.py — 任務管理後端
負責讀寫 tasks.json，提供任務的增刪改查功能
"""

import json          # 用來讀寫 JSON 檔案
import os            # 用來檢查檔案是否存在
from datetime import datetime  # 用來記錄建立時間

# 資料檔案的路徑（和這個 Python 檔案放在同一個目錄）
DATA_FILE = os.path.join(os.path.dirname(__file__), "tasks.json")


def load_tasks():
    """從 JSON 檔案讀取所有任務"""
    # 如果檔案不存在，回傳空列表
    if not os.path.exists(DATA_FILE):
        return []
    # 讀取檔案內容並轉換成 Python 列表
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_tasks(tasks):
    """將任務列表儲存到 JSON 檔案"""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        # ensure_ascii=False 讓中文正常顯示
        # indent=2 讓 JSON 格式更好看
        json.dump(tasks, f, ensure_ascii=False, indent=2)


def add_task(title):
    """新增一個任務"""
    tasks = load_tasks()

    # 計算新的 ID（找到目前最大 ID + 1）
    new_id = max([t["id"] for t in tasks], default=0) + 1

    # 建立新任務
    new_task = {
        "id": new_id,
        "title": title,
        "completed": False,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    # 加到列表並儲存
    tasks.append(new_task)
    save_tasks(tasks)
    return new_task


def delete_task(task_id):
    """刪除指定 ID 的任務"""
    tasks = load_tasks()
    # 過濾掉要刪除的任務
    updated = [t for t in tasks if t["id"] != task_id]

    # 檢查是否真的有刪除
    if len(updated) == len(tasks):
        return False  # 找不到該 ID
    save_tasks(updated)
    return True


def toggle_task(task_id):
    """切換任務的完成狀態"""
    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            # 切換：True 變 False，False 變 True
            task["completed"] = not task["completed"]
            save_tasks(tasks)
            return task
    return None  # 找不到該 ID


def list_tasks(show_all=True):
    """列出任務"""
    tasks = load_tasks()
    if show_all:
        return tasks
    # 只回傳未完成的任務
    return [t for t in tasks if not t["completed"]]


# 如果直接執行這個檔案（而不是被其他程式引用）
if __name__ == "__main__":
    import sys

    # 簡單的命令列介面
    if len(sys.argv) < 2:
        print("用法：")
        print("  python task_manager.py add '任務名稱'")
        print("  python task_manager.py list")
        print("  python task_manager.py done 1")
        print("  python task_manager.py delete 1")
        sys.exit(0)

    command = sys.argv[1]  # 取得指令

    if command == "add" and len(sys.argv) > 2:
        task = add_task(sys.argv[2])
        print(f"已新增任務 #{task['id']}：{task['title']}")

    elif command == "list":
        tasks = list_tasks()
        if not tasks:
            print("目前沒有任何任務！")
        for t in tasks:
            status = "[x]" if t["completed"] else "[ ]"
            print(f"  {status} #{t['id']} {t['title']}  ({t['created_at']})")

    elif command == "done" and len(sys.argv) > 2:
        task = toggle_task(int(sys.argv[2]))
        if task:
            status = "完成" if task["completed"] else "未完成"
            print(f"任務 #{task['id']} 已標記為{status}")
        else:
            print(f"找不到任務 #{sys.argv[2]}")

    elif command == "delete" and len(sys.argv) > 2:
        if delete_task(int(sys.argv[2])):
            print(f"已刪除任務 #{sys.argv[2]}")
        else:
            print(f"找不到任務 #{sys.argv[2]}")

    else:
        print(f"未知指令：{command}")
```

初始化空的資料檔案：

```bash
# 建立空的 tasks.json
echo "[]" > backend/tasks.json
```

### 測試後端

```bash
# 新增幾個任務
python backend/task_manager.py add "學習 Claude Code"
python backend/task_manager.py add "完成畢業專案"
python backend/task_manager.py add "慶祝課程完成"

# 列出所有任務
python backend/task_manager.py list

# 標記第一個任務完成
python backend/task_manager.py done 1

# 再次列出
python backend/task_manager.py list
```

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────────┐
│ $ python backend/task_manager.py add "學習 Claude Code"│
│ 已新增任務 #1：學習 Claude Code                        │
│                                                       │
│ $ python backend/task_manager.py list                 │
│   [ ] #1 學習 Claude Code  (2026-04-11 10:30:00)     │
│   [ ] #2 完成畢業專案  (2026-04-11 10:30:01)          │
│   [ ] #3 慶祝課程完成  (2026-04-11 10:30:02)          │
│                                                       │
│ $ python backend/task_manager.py done 1               │
│ 任務 #1 已標記為完成                                   │
│                                                       │
│ $ python backend/task_manager.py list                 │
│   [x] #1 學習 Claude Code  (2026-04-11 10:30:00)     │
│   [ ] #2 完成畢業專案  (2026-04-11 10:30:01)          │
│   [ ] #3 慶祝課程完成  (2026-04-11 10:30:02)          │
└───────────────────────────────────────────────────────┘
```

### 預期輸出：
你會看到任務被新增、列出、標記完成的過程。`[x]` 表示已完成，`[ ]` 表示未完成。

## 💻 步驟 4：建立自動化測試

```
> 幫我建立 tests/test_task_manager.py，測試所有後端功能
```

完整的測試程式碼：

```python
"""
test_task_manager.py — 任務管理系統的自動化測試
確保所有功能正常運作
"""

import unittest    # Python 內建的測試框架
import os          # 檔案操作
import json        # JSON 處理
import sys

# 將 backend 目錄加入搜尋路徑，才能引用 task_manager
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))
import task_manager


class TestTaskManager(unittest.TestCase):
    """測試任務管理系統的所有功能"""

    def setUp(self):
        """每個測試執行前：建立一個乾淨的測試環境"""
        # 使用測試用的資料檔案，避免影響真實資料
        self.test_file = os.path.join(
            os.path.dirname(__file__), "..", "backend", "test_tasks.json"
        )
        task_manager.DATA_FILE = self.test_file
        # 確保測試開始時資料檔案是空的
        with open(self.test_file, "w") as f:
            json.dump([], f)

    def tearDown(self):
        """每個測試執行後：清理測試檔案"""
        if os.path.exists(self.test_file):
            os.remove(self.test_file)

    def test_add_task(self):
        """測試新增任務"""
        # 新增一個任務
        task = task_manager.add_task("測試任務")

        # 驗證回傳的任務資料正確
        self.assertEqual(task["title"], "測試任務")
        self.assertEqual(task["id"], 1)
        self.assertFalse(task["completed"])
        self.assertIn("created_at", task)

    def test_add_multiple_tasks(self):
        """測試新增多個任務，ID 應該遞增"""
        task1 = task_manager.add_task("任務一")
        task2 = task_manager.add_task("任務二")
        task3 = task_manager.add_task("任務三")

        self.assertEqual(task1["id"], 1)
        self.assertEqual(task2["id"], 2)
        self.assertEqual(task3["id"], 3)

    def test_list_tasks(self):
        """測試列出所有任務"""
        # 先新增兩個任務
        task_manager.add_task("任務 A")
        task_manager.add_task("任務 B")

        # 列出所有任務
        tasks = task_manager.list_tasks()
        self.assertEqual(len(tasks), 2)

    def test_toggle_task(self):
        """測試切換任務完成狀態"""
        task_manager.add_task("待完成任務")

        # 第一次切換：未完成 → 完成
        result = task_manager.toggle_task(1)
        self.assertTrue(result["completed"])

        # 第二次切換：完成 → 未完成
        result = task_manager.toggle_task(1)
        self.assertFalse(result["completed"])

    def test_delete_task(self):
        """測試刪除任務"""
        task_manager.add_task("要刪除的任務")
        task_manager.add_task("要保留的任務")

        # 刪除第一個任務
        result = task_manager.delete_task(1)
        self.assertTrue(result)

        # 確認只剩一個任務
        tasks = task_manager.list_tasks()
        self.assertEqual(len(tasks), 1)
        self.assertEqual(tasks[0]["title"], "要保留的任務")

    def test_delete_nonexistent_task(self):
        """測試刪除不存在的任務"""
        result = task_manager.delete_task(999)
        self.assertFalse(result)

    def test_toggle_nonexistent_task(self):
        """測試切換不存在的任務"""
        result = task_manager.toggle_task(999)
        self.assertIsNone(result)

    def test_empty_task_list(self):
        """測試空的任務列表"""
        tasks = task_manager.list_tasks()
        self.assertEqual(len(tasks), 0)


# 執行所有測試
if __name__ == "__main__":
    unittest.main()
```

執行測試：

```bash
# 執行所有測試
python -m unittest tests/test_task_manager.py -v
```

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────────┐
│ $ python -m unittest tests/test_task_manager.py -v    │
│                                                       │
│ test_add_multiple_tasks ... ok                        │
│ test_add_task ... ok                                  │
│ test_delete_nonexistent_task ... ok                   │
│ test_delete_task ... ok                               │
│ test_empty_task_list ... ok                           │
│ test_list_tasks ... ok                                │
│ test_toggle_nonexistent_task ... ok                   │
│ test_toggle_task ... ok                               │
│                                                       │
│ -----------------------------------------------      │
│ Ran 8 tests in 0.023s                                 │
│                                                       │
│ OK                                                    │
└───────────────────────────────────────────────────────┘
```

### 預期輸出：
所有 8 個測試都應該顯示 `ok`，最後出現 `OK` 表示全部通過。

## 💻 步驟 5：建立前端介面

在 Claude Code 中：

```
> 幫我建立一個簡潔美觀的任務管理前端介面
  使用純 HTML + CSS + JavaScript，不需要任何框架
```

### frontend/index.html

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager — 我的任務管理</title>
  <!-- 引入 CSS 樣式 -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <!-- 標題區 -->
    <header>
      <h1>Task Manager</h1>
      <p>用 Claude Code 打造的任務管理系統</p>
    </header>

    <!-- 新增任務區 -->
    <div class="add-task">
      <input
        type="text"
        id="taskInput"
        placeholder="輸入新任務..."
        autofocus
      >
      <button id="addBtn" onclick="addTask()">新增</button>
    </div>

    <!-- 篩選按鈕 -->
    <div class="filters">
      <button class="filter-btn active" onclick="filterTasks('all')">全部</button>
      <button class="filter-btn" onclick="filterTasks('active')">進行中</button>
      <button class="filter-btn" onclick="filterTasks('completed')">已完成</button>
    </div>

    <!-- 任務列表 -->
    <ul id="taskList" class="task-list">
      <!-- 任務項目會由 JavaScript 動態生成 -->
    </ul>

    <!-- 統計資訊 -->
    <div class="stats">
      <span id="taskCount">0 個任務</span>
      <button id="clearCompleted" onclick="clearCompleted()">清除已完成</button>
    </div>
  </div>

  <!-- 引入 JavaScript -->
  <script src="app.js"></script>
</body>
</html>
```

### frontend/style.css

```css
/* 全域樣式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f0f2f5;
  color: #333;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

/* 主容器 */
.container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 100%;
  max-width: 520px;
}

/* 標題 */
header {
  text-align: center;
  margin-bottom: 24px;
}

header h1 {
  font-size: 28px;
  color: #008b8b;
}

header p {
  color: #888;
  font-size: 14px;
  margin-top: 4px;
}

/* 新增任務區域 */
.add-task {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.add-task input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.add-task input:focus {
  outline: none;
  border-color: #008b8b;
}

.add-task button {
  padding: 12px 24px;
  background: #008b8b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-task button:hover {
  background: #006d6d;
}

/* 篩選按鈕 */
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-btn {
  flex: 1;
  padding: 8px;
  background: #f0f2f5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #008b8b;
  color: white;
}

/* 任務列表 */
.task-list {
  list-style: none;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f2f5;
  transition: background 0.2s;
}

.task-item:hover {
  background: #f9f9f9;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #aaa;
}

.task-checkbox {
  width: 22px;
  height: 22px;
  margin-right: 12px;
  cursor: pointer;
  accent-color: #008b8b;
}

.task-title {
  flex: 1;
  font-size: 16px;
}

.task-delete {
  background: none;
  border: none;
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.task-delete:hover {
  color: #e74c3c;
  background: #ffeaea;
}

/* 統計區域 */
.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  color: #888;
  font-size: 14px;
}

.stats button {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 14px;
}

.stats button:hover {
  color: #e74c3c;
}

/* 空狀態提示 */
.empty-state {
  text-align: center;
  padding: 40px;
  color: #ccc;
  font-size: 16px;
}
```

### frontend/app.js

```javascript
/**
 * app.js — 任務管理前端邏輯
 * 使用 localStorage 來儲存任務資料（前端版本）
 */

// 從 localStorage 讀取任務，如果沒有就用空陣列
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// 目前的篩選狀態
let currentFilter = "all";

/**
 * 新增任務
 */
function addTask() {
  // 取得輸入框的內容
  const input = document.getElementById("taskInput");
  const title = input.value.trim();  // trim() 去掉前後空白

  // 如果是空白就不新增
  if (!title) return;

  // 建立新任務物件
  const task = {
    id: Date.now(),  // 用時間戳當作唯一 ID
    title: title,
    completed: false,
    created_at: new Date().toLocaleString("zh-TW")
  };

  // 加到陣列
  tasks.push(task);

  // 儲存到 localStorage
  saveTasks();

  // 清空輸入框並重新聚焦
  input.value = "";
  input.focus();

  // 重新渲染畫面
  renderTasks();
}

/**
 * 切換任務完成狀態
 */
function toggleTask(id) {
  // 找到對應的任務
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;  // 切換狀態
    saveTasks();
    renderTasks();
  }
}

/**
 * 刪除任務
 */
function deleteTask(id) {
  // 過濾掉要刪除的任務
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

/**
 * 篩選任務
 */
function filterTasks(filter) {
  currentFilter = filter;

  // 更新篩選按鈕的樣式
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  renderTasks();
}

/**
 * 清除所有已完成的任務
 */
function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}

/**
 * 儲存任務到 localStorage
 */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * 渲染任務列表到畫面
 */
function renderTasks() {
  const list = document.getElementById("taskList");
  const count = document.getElementById("taskCount");

  // 根據篩選條件過濾任務
  let filtered = tasks;
  if (currentFilter === "active") {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  // 如果沒有任務，顯示空狀態
  if (filtered.length === 0) {
    list.innerHTML = '<li class="empty-state">目前沒有任務，新增一個吧！</li>';
  } else {
    // 產生每個任務的 HTML
    list.innerHTML = filtered.map(task => `
      <li class="task-item ${task.completed ? 'completed' : ''}">
        <input
          type="checkbox"
          class="task-checkbox"
          ${task.completed ? 'checked' : ''}
          onchange="toggleTask(${task.id})"
        >
        <span class="task-title">${escapeHtml(task.title)}</span>
        <button class="task-delete" onclick="deleteTask(${task.id})">x</button>
      </li>
    `).join("");
  }

  // 更新統計
  const activeCount = tasks.filter(t => !t.completed).length;
  count.textContent = `${activeCount} 個待完成 / 共 ${tasks.length} 個任務`;
}

/**
 * 防止 XSS 攻擊：轉義 HTML 特殊字元
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 監聽 Enter 鍵，按下時新增任務
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// 頁面載入時渲染任務列表
renderTasks();
```

### 預期輸出：
在瀏覽器中打開 `frontend/index.html`，你會看到一個美觀的任務管理介面，可以新增、完成、刪除任務。

## 💻 步驟 6：Git 版本控制

```bash
# 初始化 Git 倉庫
cd ~/task-manager
git init

# 建立 .gitignore
cat > .gitignore << 'EOF'
# 測試產生的臨時檔案
backend/test_tasks.json

# 系統檔案
.DS_Store
Thumbs.db

# IDE 設定
.vscode/
.idea/
EOF

# 加入所有檔案
git add CLAUDE.md .gitignore
git add frontend/ backend/task_manager.py backend/tasks.json tests/

# 第一次提交
git commit -m "feat: initial task manager project with frontend, backend, and tests"
```

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────────┐
│ $ git commit -m "feat: initial task manager..."       │
│                                                       │
│ [main (root-commit) abc1234] feat: initial task       │
│  manager project with frontend, backend, and tests    │
│  8 files changed, 350 insertions(+)                   │
│  create mode 100644 .gitignore                        │
│  create mode 100644 CLAUDE.md                         │
│  create mode 100644 backend/task_manager.py           │
│  create mode 100644 backend/tasks.json                │
│  create mode 100644 frontend/app.js                   │
│  create mode 100644 frontend/index.html               │
│  create mode 100644 frontend/style.css                │
│  create mode 100644 tests/test_task_manager.py        │
└───────────────────────────────────────────────────────┘
```

## 💻 步驟 7：部署到 GitHub Pages

```bash
# 在 GitHub 建立新倉庫（用 gh CLI）
gh repo create task-manager --public --source=. --push

# GitHub Pages 只需要前端檔案
# 我們可以把 frontend/ 的內容部署到 gh-pages 分支

# 安裝 gh-pages 工具（如果你有 Node.js）
# 或者手動操作：

# 建立 gh-pages 分支
git checkout --orphan gh-pages

# 只保留前端檔案
git rm -rf .
cp -r frontend/* .
git add index.html style.css app.js

# 提交並推送
git commit -m "deploy: frontend to GitHub Pages"
git push origin gh-pages

# 回到 main 分支
git checkout main
```

然後在 GitHub 倉庫設定中：
1. 前往 Settings > Pages
2. Source 選擇 `gh-pages` 分支
3. 等待幾分鐘，你的網站就上線了！

📸 [你應該看到的畫面]
```
┌───────────────────────────────────────────────────────┐
│ 你的網站已上線！                                       │
│                                                       │
│ https://你的用戶名.github.io/task-manager/             │
│                                                       │
│ 打開瀏覽器，你會看到你親手建立的任務管理系統！           │
└───────────────────────────────────────────────────────┘
```

### 預期輸出：
你會得到一個公開的網址，任何人都可以造訪你的任務管理系統。

## ✍️ 動手練習

### 練習 1：新增功能
用 Claude Code 為你的任務管理系統新增一個功能。以下是一些點子：
- 任務優先級（高/中/低）
- 任務分類標籤
- 搜尋任務功能
- 深色模式切換

> 💡 提示：在 Claude Code 中描述你想要的功能，讓它幫你修改對應的檔案。別忘了也要更新測試！

### 練習 2：完善 CLAUDE.md
根據你新增的功能，更新 CLAUDE.md 的內容，讓它反映專案的最新狀態。

> 💡 提示：好的 CLAUDE.md 會隨著專案一起成長。每當你新增功能或改變架構，都應該更新它。

## ❓ 小測驗（3 條題目）

1. 為什麼我們要把前端和後端分開放在不同的目錄？
   A. 這樣檔案看起來比較多
   B. 方便分別維護、測試和部署各個組件
   C. Python 不能和 HTML 放在一起
   D. GitHub 的要求
   答案：B — 分離前後端是軟體工程的最佳實踐。這樣你可以獨立地開發、測試和部署每個組件，也更容易讓團隊分工合作。

2. 為什麼測試中要使用 setUp() 和 tearDown() 方法？
   A. 這是 Python 的語法要求
   B. 確保每個測試都在乾淨的環境中執行，互不影響
   C. 讓測試跑得更快
   D. 裝飾性的，沒有實際作用
   答案：B — setUp() 在每個測試前建立乾淨的環境，tearDown() 在測試後清理。這確保測試之間互不干擾，每個測試都是獨立可靠的。

3. GitHub Pages 主要用來部署什麼類型的內容？
   A. Python 後端程式
   B. 資料庫
   C. 靜態網頁（HTML/CSS/JS）
   D. Docker 容器
   答案：C — GitHub Pages 是一個靜態網頁託管服務，適合部署 HTML、CSS、JavaScript 等前端檔案。後端程式需要其他服務（如 AWS、Heroku）來部署。

## 🔗 下一步

### 恭喜你完成了整個課程！

你從一個完全不懂程式的初學者，一路走到了這裡，建立了一個包含前端、後端、測試、版本控制和部署的完整專案。這不是一件小事——你應該為自己感到驕傲！

### 回顧你學到的所有技能

| Phase | 主題 | 你學會了什麼 |
|-------|------|-------------|
| **Phase 1** | 入門基礎 | 安裝 Claude Code、下達指令、瀏覽檔案系統 |
| **Phase 2** | 檔案與設定 | CLAUDE.md 設定、編輯檔案、Git 版本控制 |
| **Phase 3** | 腳本與品質 | 撰寫腳本、除錯技巧、自動化測試 |
| **Phase 4** | 實戰應用 | 網頁開發、API 整合、資料處理、部署 |
| **Phase 5** | 進階技巧 | MCP 伺服器、Hooks 自動化、團隊協作、完整專案 |

### 繼續學習的方向

你已經有了堅實的基礎，以下是一些值得探索的方向：

1. **深入前端開發** — 學習 React、Vue 或 Svelte 框架
2. **後端開發** — 學習 Flask、Django 或 Express.js 建立 API 伺服器
3. **資料庫** — 從 JSON 檔案進階到 SQLite、PostgreSQL
4. **雲端部署** — 學習 AWS、Google Cloud 或 Vercel
5. **AI 整合** — 使用 Claude API 為你的應用加入 AI 功能
6. **開源貢獻** — 在 GitHub 上尋找有趣的開源專案參與貢獻

### 最重要的一件事

工具會更新，技術會變化，但你學到的**思考方式**和**解決問題的能力**是永遠的。

Claude Code 是你的助手，但真正的創造者是你。繼續保持好奇心，繼續動手實踐，繼續用技術解決真實的問題。

**你已經是一位有能力的開發者了。去創造屬於你的東西吧！**
