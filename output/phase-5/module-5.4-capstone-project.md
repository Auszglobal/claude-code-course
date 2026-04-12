# Module 5.4: Capstone Project

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Independently use Claude Code to build a complete project from scratch
  - Integrate a frontend (HTML/CSS/JS) with a backend (Python)
  - Write automated tests to ensure code quality
  - Use Git for version control and deploy to GitHub Pages
  - Confidently apply Claude Code to a variety of development tasks

## 📖 Theory

### Your Graduation Project: A Personal Task Manager

Congratulations on making it this far! Over the past 4 Phases, you've gone from complete beginner to learning step by step:

- Phase 1: Installing Claude Code, giving instructions, navigating files
- Phase 2: Configuring CLAUDE.md, editing files, using Git
- Phase 3: Writing scripts, debugging, testing
- Phase 4: Web development, API integration, data processing, deployment

Now it's time to bring all those skills together.

We're going to build a **Personal Task Manager**, which includes:

| Component | Technology | Corresponding Phase |
|-----------|-----------|-------------------|
| Frontend interface | HTML + CSS + JavaScript | Phase 4 |
| Backend script | Python (reading/writing JSON files) | Phase 3 |
| Automated tests | Python unittest | Phase 3 |
| Project configuration | CLAUDE.md | Phase 2 |
| Version control | Git + GitHub | Phase 2 |
| Deployment | GitHub Pages (frontend) | Phase 4 |

Think of it like building a house: you've already learned how to lay bricks, do the plumbing and wiring, and paint the walls. Now it's time to combine those skills to build a real house.

## Step 1: Create the Project Structure

Let's get started! In Claude Code, type:

```
> Help me create a new project called task-manager with the following structure:

task-manager/
├── CLAUDE.md            (project documentation)
├── .gitignore           (Git ignore rules)
├── frontend/            (frontend files)
│   ├── index.html
│   ├── style.css
│   └── app.js
├── backend/             (backend scripts)
│   ├── task_manager.py
│   └── tasks.json
└── tests/               (test files)
    └── test_task_manager.py
```

Or you can create it manually:

```bash
# Create the project directories
mkdir -p ~/task-manager/frontend
mkdir -p ~/task-manager/backend
mkdir -p ~/task-manager/tests

# Enter the project directory
cd ~/task-manager
```

### Expected Output:
You'll see a clean project directory structure with all folders created.

## Step 2: Configure CLAUDE.md

First, create a CLAUDE.md for the project:

```markdown
# Task Manager -- Personal Task Management System

## Project Overview
A simple task management app with a pure HTML/CSS/JS frontend and a Python backend that reads and writes JSON files.

## Tech Stack
- Frontend: HTML5, CSS3, vanilla JavaScript (no frameworks)
- Backend: Python 3.x (standard library, no extra packages needed)
- Data storage: JSON file
- Testing: Python unittest

## Code Style
- HTML/CSS/JS: Use 2-space indentation
- Python: Follow PEP 8, use 4-space indentation
- All functions must have a docstring

## Prohibited Actions
- Do not install external dependencies (the standard library is sufficient)
- Do not modify the tasks.json structure
- Do not hardcode backend paths in frontend code
```

## Step 3: Build the Backend (Python)

In Claude Code:

```
> Help me create backend/task_manager.py with the following features:
  - Read from and write to a tasks.json file
  - Support adding, deleting, toggling completion, and listing all tasks
  - Each task has: id, title, completed, created_at fields
```

Here's the complete backend code:

```python
"""
task_manager.py -- Task management backend
Handles reading and writing tasks.json, providing CRUD operations for tasks
"""

import json          # For reading and writing JSON files
import os            # For checking if files exist
from datetime import datetime  # For recording creation timestamps

# Path to the data file (in the same directory as this Python file)
DATA_FILE = os.path.join(os.path.dirname(__file__), "tasks.json")


def load_tasks():
    """Load all tasks from the JSON file"""
    # If the file doesn't exist, return an empty list
    if not os.path.exists(DATA_FILE):
        return []
    # Read the file contents and convert to a Python list
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_tasks(tasks):
    """Save the task list to the JSON file"""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        # ensure_ascii=False allows non-ASCII characters to display properly
        # indent=2 makes the JSON more readable
        json.dump(tasks, f, ensure_ascii=False, indent=2)


def add_task(title):
    """Add a new task"""
    tasks = load_tasks()

    # Calculate the new ID (find the current max ID + 1)
    new_id = max([t["id"] for t in tasks], default=0) + 1

    # Create the new task
    new_task = {
        "id": new_id,
        "title": title,
        "completed": False,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    # Add to the list and save
    tasks.append(new_task)
    save_tasks(tasks)
    return new_task


def delete_task(task_id):
    """Delete a task by its ID"""
    tasks = load_tasks()
    # Filter out the task to be deleted
    updated = [t for t in tasks if t["id"] != task_id]

    # Check if anything was actually deleted
    if len(updated) == len(tasks):
        return False  # ID not found
    save_tasks(updated)
    return True


def toggle_task(task_id):
    """Toggle a task's completion status"""
    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            # Toggle: True becomes False, False becomes True
            task["completed"] = not task["completed"]
            save_tasks(tasks)
            return task
    return None  # ID not found


def list_tasks(show_all=True):
    """List tasks"""
    tasks = load_tasks()
    if show_all:
        return tasks
    # Return only incomplete tasks
    return [t for t in tasks if not t["completed"]]


# If this file is run directly (not imported by another program)
if __name__ == "__main__":
    import sys

    # Simple command-line interface
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python task_manager.py add 'task name'")
        print("  python task_manager.py list")
        print("  python task_manager.py done 1")
        print("  python task_manager.py delete 1")
        sys.exit(0)

    command = sys.argv[1]  # Get the command

    if command == "add" and len(sys.argv) > 2:
        task = add_task(sys.argv[2])
        print(f"Added task #{task['id']}: {task['title']}")

    elif command == "list":
        tasks = list_tasks()
        if not tasks:
            print("No tasks yet!")
        for t in tasks:
            status = "[x]" if t["completed"] else "[ ]"
            print(f"  {status} #{t['id']} {t['title']}  ({t['created_at']})")

    elif command == "done" and len(sys.argv) > 2:
        task = toggle_task(int(sys.argv[2]))
        if task:
            status = "completed" if task["completed"] else "incomplete"
            print(f"Task #{task['id']} marked as {status}")
        else:
            print(f"Task #{sys.argv[2]} not found")

    elif command == "delete" and len(sys.argv) > 2:
        if delete_task(int(sys.argv[2])):
            print(f"Deleted task #{sys.argv[2]}")
        else:
            print(f"Task #{sys.argv[2]} not found")

    else:
        print(f"Unknown command: {command}")
```

Initialise the empty data file:

```bash
# Create an empty tasks.json
echo "[]" > backend/tasks.json
```

### Test the Backend

```bash
# Add a few tasks
python backend/task_manager.py add "Learn Claude Code"
python backend/task_manager.py add "Complete the capstone project"
python backend/task_manager.py add "Celebrate finishing the course"

# List all tasks
python backend/task_manager.py list

# Mark the first task as completed
python backend/task_manager.py done 1

# List again
python backend/task_manager.py list
```

[What you should see]
```
+-------------------------------------------------------+
| $ python backend/task_manager.py add "Learn Claude    |
|   Code"                                               |
| Added task #1: Learn Claude Code                      |
|                                                       |
| $ python backend/task_manager.py list                 |
|   [ ] #1 Learn Claude Code  (2026-04-11 10:30:00)    |
|   [ ] #2 Complete the capstone project                |
|          (2026-04-11 10:30:01)                        |
|   [ ] #3 Celebrate finishing the course               |
|          (2026-04-11 10:30:02)                        |
|                                                       |
| $ python backend/task_manager.py done 1               |
| Task #1 marked as completed                           |
|                                                       |
| $ python backend/task_manager.py list                 |
|   [x] #1 Learn Claude Code  (2026-04-11 10:30:00)    |
|   [ ] #2 Complete the capstone project                |
|          (2026-04-11 10:30:01)                        |
|   [ ] #3 Celebrate finishing the course               |
|          (2026-04-11 10:30:02)                        |
+-------------------------------------------------------+
```

### Expected Output:
You'll see the process of tasks being added, listed, and marked as completed. `[x]` means completed, `[ ]` means incomplete.

## Step 4: Create Automated Tests

```
> Help me create tests/test_task_manager.py that tests all backend functionality
```

Complete test code:

```python
"""
test_task_manager.py -- Automated tests for the task management system
Ensures all functionality works correctly
"""

import unittest    # Python's built-in testing framework
import os          # File operations
import json        # JSON processing
import sys

# Add the backend directory to the search path so we can import task_manager
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))
import task_manager


class TestTaskManager(unittest.TestCase):
    """Test all features of the task management system"""

    def setUp(self):
        """Before each test: create a clean test environment"""
        # Use a test data file to avoid affecting real data
        self.test_file = os.path.join(
            os.path.dirname(__file__), "..", "backend", "test_tasks.json"
        )
        task_manager.DATA_FILE = self.test_file
        # Ensure the data file is empty at the start of each test
        with open(self.test_file, "w") as f:
            json.dump([], f)

    def tearDown(self):
        """After each test: clean up the test file"""
        if os.path.exists(self.test_file):
            os.remove(self.test_file)

    def test_add_task(self):
        """Test adding a task"""
        # Add a task
        task = task_manager.add_task("Test task")

        # Verify the returned task data is correct
        self.assertEqual(task["title"], "Test task")
        self.assertEqual(task["id"], 1)
        self.assertFalse(task["completed"])
        self.assertIn("created_at", task)

    def test_add_multiple_tasks(self):
        """Test adding multiple tasks -- IDs should increment"""
        task1 = task_manager.add_task("Task one")
        task2 = task_manager.add_task("Task two")
        task3 = task_manager.add_task("Task three")

        self.assertEqual(task1["id"], 1)
        self.assertEqual(task2["id"], 2)
        self.assertEqual(task3["id"], 3)

    def test_list_tasks(self):
        """Test listing all tasks"""
        # First add two tasks
        task_manager.add_task("Task A")
        task_manager.add_task("Task B")

        # List all tasks
        tasks = task_manager.list_tasks()
        self.assertEqual(len(tasks), 2)

    def test_toggle_task(self):
        """Test toggling task completion status"""
        task_manager.add_task("Pending task")

        # First toggle: incomplete -> completed
        result = task_manager.toggle_task(1)
        self.assertTrue(result["completed"])

        # Second toggle: completed -> incomplete
        result = task_manager.toggle_task(1)
        self.assertFalse(result["completed"])

    def test_delete_task(self):
        """Test deleting a task"""
        task_manager.add_task("Task to delete")
        task_manager.add_task("Task to keep")

        # Delete the first task
        result = task_manager.delete_task(1)
        self.assertTrue(result)

        # Confirm only one task remains
        tasks = task_manager.list_tasks()
        self.assertEqual(len(tasks), 1)
        self.assertEqual(tasks[0]["title"], "Task to keep")

    def test_delete_nonexistent_task(self):
        """Test deleting a task that doesn't exist"""
        result = task_manager.delete_task(999)
        self.assertFalse(result)

    def test_toggle_nonexistent_task(self):
        """Test toggling a task that doesn't exist"""
        result = task_manager.toggle_task(999)
        self.assertIsNone(result)

    def test_empty_task_list(self):
        """Test an empty task list"""
        tasks = task_manager.list_tasks()
        self.assertEqual(len(tasks), 0)


# Run all tests
if __name__ == "__main__":
    unittest.main()
```

Run the tests:

```bash
# Run all tests
python -m unittest tests/test_task_manager.py -v
```

[What you should see]
```
+-------------------------------------------------------+
| $ python -m unittest tests/test_task_manager.py -v    |
|                                                       |
| test_add_multiple_tasks ... ok                        |
| test_add_task ... ok                                  |
| test_delete_nonexistent_task ... ok                   |
| test_delete_task ... ok                               |
| test_empty_task_list ... ok                           |
| test_list_tasks ... ok                                |
| test_toggle_nonexistent_task ... ok                   |
| test_toggle_task ... ok                               |
|                                                       |
| -----------------------------------------------      |
| Ran 8 tests in 0.023s                                 |
|                                                       |
| OK                                                    |
+-------------------------------------------------------+
```

### Expected Output:
All 8 tests should show `ok`, with a final `OK` indicating everything passed.

## Step 5: Build the Frontend Interface

In Claude Code:

```
> Help me create a clean, attractive task management frontend interface
  using pure HTML + CSS + JavaScript, no frameworks needed
```

### frontend/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <!-- Import CSS styles -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <!-- Header section -->
    <header>
      <h1>Task Manager</h1>
      <p>A task management system built with Claude Code</p>
    </header>

    <!-- Add task section -->
    <div class="add-task">
      <input
        type="text"
        id="taskInput"
        placeholder="Enter a new task..."
        autofocus
      >
      <button id="addBtn" onclick="addTask()">Add</button>
    </div>

    <!-- Filter buttons -->
    <div class="filters">
      <button class="filter-btn active" onclick="filterTasks('all')">All</button>
      <button class="filter-btn" onclick="filterTasks('active')">Active</button>
      <button class="filter-btn" onclick="filterTasks('completed')">Completed</button>
    </div>

    <!-- Task list -->
    <ul id="taskList" class="task-list">
      <!-- Task items are dynamically generated by JavaScript -->
    </ul>

    <!-- Statistics -->
    <div class="stats">
      <span id="taskCount">0 tasks</span>
      <button id="clearCompleted" onclick="clearCompleted()">Clear completed</button>
    </div>
  </div>

  <!-- Import JavaScript -->
  <script src="app.js"></script>
</body>
</html>
```

### frontend/style.css

```css
/* Global style reset */
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

/* Main container */
.container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 100%;
  max-width: 520px;
}

/* Header */
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

/* Add task area */
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

/* Filter buttons */
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

/* Task list */
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

/* Statistics area */
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

/* Empty state message */
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
 * app.js -- Task management frontend logic
 * Uses localStorage to store task data (frontend version)
 */

// Load tasks from localStorage, or use an empty array if none exist
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// Current filter state
let currentFilter = "all";

/**
 * Add a task
 */
function addTask() {
  // Get the input field content
  const input = document.getElementById("taskInput");
  const title = input.value.trim();  // trim() removes leading/trailing whitespace

  // Don't add if it's empty
  if (!title) return;

  // Create a new task object
  const task = {
    id: Date.now(),  // Use timestamp as unique ID
    title: title,
    completed: false,
    created_at: new Date().toLocaleString("en-AU")
  };

  // Add to the array
  tasks.push(task);

  // Save to localStorage
  saveTasks();

  // Clear the input and refocus
  input.value = "";
  input.focus();

  // Re-render the display
  renderTasks();
}

/**
 * Toggle a task's completion status
 */
function toggleTask(id) {
  // Find the matching task
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;  // Toggle the status
    saveTasks();
    renderTasks();
  }
}

/**
 * Delete a task
 */
function deleteTask(id) {
  // Filter out the task to delete
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

/**
 * Filter tasks
 */
function filterTasks(filter) {
  currentFilter = filter;

  // Update filter button styles
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  renderTasks();
}

/**
 * Clear all completed tasks
 */
function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Render the task list to the screen
 */
function renderTasks() {
  const list = document.getElementById("taskList");
  const count = document.getElementById("taskCount");

  // Filter tasks based on the current filter
  let filtered = tasks;
  if (currentFilter === "active") {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  // If there are no tasks, show the empty state
  if (filtered.length === 0) {
    list.innerHTML = '<li class="empty-state">No tasks yet. Add one!</li>';
  } else {
    // Generate the HTML for each task
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

  // Update statistics
  const activeCount = tasks.filter(t => !t.completed).length;
  count.textContent = `${activeCount} remaining / ${tasks.length} total tasks`;
}

/**
 * Prevent XSS attacks: escape HTML special characters
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Listen for the Enter key to add a task
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Render the task list when the page loads
renderTasks();
```

### Expected Output:
Open `frontend/index.html` in a browser and you'll see an attractive task management interface where you can add, complete, and delete tasks.

## Step 6: Git Version Control

```bash
# Initialise a Git repository
cd ~/task-manager
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Temporary files generated by tests
backend/test_tasks.json

# System files
.DS_Store
Thumbs.db

# IDE settings
.vscode/
.idea/
EOF

# Add all files
git add CLAUDE.md .gitignore
git add frontend/ backend/task_manager.py backend/tasks.json tests/

# First commit
git commit -m "feat: initial task manager project with frontend, backend, and tests"
```

[What you should see]
```
+-------------------------------------------------------+
| $ git commit -m "feat: initial task manager..."       |
|                                                       |
| [main (root-commit) abc1234] feat: initial task       |
|  manager project with frontend, backend, and tests    |
|  8 files changed, 350 insertions(+)                   |
|  create mode 100644 .gitignore                        |
|  create mode 100644 CLAUDE.md                         |
|  create mode 100644 backend/task_manager.py           |
|  create mode 100644 backend/tasks.json                |
|  create mode 100644 frontend/app.js                   |
|  create mode 100644 frontend/index.html               |
|  create mode 100644 frontend/style.css                |
|  create mode 100644 tests/test_task_manager.py        |
+-------------------------------------------------------+
```

## Step 7: Deploy to GitHub Pages

```bash
# Create a new repository on GitHub (using gh CLI)
gh repo create task-manager --public --source=. --push

# GitHub Pages only needs the frontend files
# We can deploy the contents of frontend/ to a gh-pages branch

# Install the gh-pages tool (if you have Node.js)
# Or do it manually:

# Create the gh-pages branch
git checkout --orphan gh-pages

# Keep only the frontend files
git rm -rf .
cp -r frontend/* .
git add index.html style.css app.js

# Commit and push
git commit -m "deploy: frontend to GitHub Pages"
git push origin gh-pages

# Switch back to the main branch
git checkout main
```

Then in the GitHub repository settings:
1. Go to Settings > Pages
2. Set Source to the `gh-pages` branch
3. Wait a few minutes and your site will be live!

[What you should see]
```
+-------------------------------------------------------+
| Your site is live!                                    |
|                                                       |
| https://your-username.github.io/task-manager/         |
|                                                       |
| Open a browser to see the task management system      |
| you built with your own hands!                        |
+-------------------------------------------------------+
```

### Expected Output:
You'll get a public URL that anyone can visit to use your task management system.

## ✍️ Hands-On Exercisess

### Exercise 1: Add a New Feature
Use Claude Code to add a new feature to your task management system. Here are some ideas:
- Task priority levels (High / Medium / Low)
- Task category labels
- Search functionality
- Dark mode toggle

> Tip: Describe the feature you want in Claude Code and let it modify the appropriate files. Don't forget to update the tests too!

### Exercise 2: Improve CLAUDE.md
Based on the features you've added, update the CLAUDE.md to reflect the project's current state.

> Tip: A good CLAUDE.md grows with the project. Whenever you add features or change the architecture, you should update it.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Why do we put the frontend and backend in separate directories?</p>
<label><input type="radio" name="q1" value="0"> To make it look like there are more files</label>
<label><input type="radio" name="q1" value="1"> To make it easier to maintain, test, and deploy each component independently</label>
<label><input type="radio" name="q1" value="2"> Python can't be placed alongside HTML</label>
<label><input type="radio" name="q1" value="3"> It's a GitHub requirement</label>
<div class="quiz-explain">Separating frontend and backend is a software engineering best practice. This lets you independently develop, test, and deploy each component, and makes it easier for teams to divide work.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. Why do we use setUp() and tearDown() methods in tests?</p>
<label><input type="radio" name="q2" value="0"> It's a Python syntax requirement</label>
<label><input type="radio" name="q2" value="1"> To ensure each test runs in a clean environment without affecting others</label>
<label><input type="radio" name="q2" value="2"> To make the tests run faster</label>
<label><input type="radio" name="q2" value="3"> They're decorative and have no practical function</label>
<div class="quiz-explain">setUp() creates a clean environment before each test, and tearDown() cleans up afterwards. This ensures tests don't interfere with each other, making each test independent and reliable.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. What type of content is GitHub Pages primarily used to deploy?</p>
<label><input type="radio" name="q3" value="0"> Python backend programs</label>
<label><input type="radio" name="q3" value="1"> Databases</label>
<label><input type="radio" name="q3" value="2"> Static web pages (HTML/CSS/JS)</label>
<label><input type="radio" name="q3" value="3"> Docker containers</label>
<div class="quiz-explain">GitHub Pages is a static web hosting service, suitable for deploying HTML, CSS, JavaScript, and other frontend files. Backend programs need other services (like AWS or Heroku) for deployment.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>4. In the task manager's backend, what does <code>max([t["id"] for t in tasks], default=0) + 1</code> do?</p>
<label><input type="radio" name="q4" value="0"> Deletes the task with the highest ID</label>
<label><input type="radio" name="q4" value="1"> Counts the total number of tasks</label>
<label><input type="radio" name="q4" value="2"> Finds the highest existing ID and adds 1 to create a unique new ID</label>
<label><input type="radio" name="q4" value="3"> Sorts all tasks by their ID</label>
<div class="quiz-explain">This expression finds the maximum ID currently in the task list and adds 1, ensuring every new task gets a unique ID. The <code>default=0</code> handles the case when the list is empty (so the first task gets ID 1).</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. Why does the frontend use <code>localStorage</code> instead of the Python backend's JSON file?</p>
<label><input type="radio" name="q5" value="0"> Because a static HTML page deployed to GitHub Pages cannot communicate with a Python backend</label>
<label><input type="radio" name="q5" value="1"> Because localStorage is faster than JSON</label>
<label><input type="radio" name="q5" value="2"> Because JSON files cannot store task data</label>
<label><input type="radio" name="q5" value="3"> Because Python is not supported by modern browsers</label>
<div class="quiz-explain">GitHub Pages only hosts static files (HTML, CSS, JS). It cannot run Python scripts. The frontend uses localStorage (browser storage) as a standalone solution. In a production app, you'd need a server to bridge the frontend and backend.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. What is the purpose of the <code>escapeHtml()</code> function in the frontend code?</p>
<label><input type="radio" name="q6" value="0"> It makes text display in bold</label>
<label><input type="radio" name="q6" value="1"> It prevents XSS attacks by converting special HTML characters to safe text</label>
<label><input type="radio" name="q6" value="2"> It translates text to different languages</label>
<label><input type="radio" name="q6" value="3"> It compresses the text to save storage space</label>
<div class="quiz-explain">XSS (Cross-Site Scripting) attacks happen when user input containing HTML/JavaScript is rendered directly on the page. <code>escapeHtml()</code> converts special characters like <code>&lt;</code> and <code>&gt;</code> into safe text, preventing malicious code injection.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. Why is a <code>.gitignore</code> file important for this project?</p>
<label><input type="radio" name="q7" value="0"> It makes Git run faster</label>
<label><input type="radio" name="q7" value="1"> It automatically backs up important files</label>
<label><input type="radio" name="q7" value="2"> It encrypts sensitive files before committing</label>
<label><input type="radio" name="q7" value="3"> It tells Git which files to exclude from version control, like test data and system files</label>
<div class="quiz-explain">The .gitignore file prevents unwanted files (test data, OS files like .DS_Store, IDE settings) from being committed to the repository. This keeps the repo clean and avoids sharing irrelevant or sensitive files.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. What does the <code>git checkout --orphan gh-pages</code> command do in the deployment process?</p>
<label><input type="radio" name="q8" value="0"> It downloads a backup of the repository</label>
<label><input type="radio" name="q8" value="1"> It deletes all branches except main</label>
<label><input type="radio" name="q8" value="2"> It creates a new branch with no commit history, perfect for deploying only the frontend files</label>
<label><input type="radio" name="q8" value="3"> It merges all branches together</label>
<div class="quiz-explain">An orphan branch starts with no history — a clean slate. This is useful for GitHub Pages because you only want the frontend files on the deployment branch, without the backend code or full project history.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🏗️ Bonus Mini Challenge: Add a "Due Date" Feature

You have built a working task manager -- now extend it with a due date feature. This challenge tests your ability to modify both frontend and backend code, update tests, and redeploy.

### Requirements
- Each task should optionally have a due date
- Tasks that are past their due date should be highlighted in red
- Add a "Sort by due date" button to the frontend
- Update the backend and tests to handle the new field
- Commit and push the changes

### Step-by-Step Guide

1. **Start Claude Code in your task-manager project:**
   ```bash
   cd ~/task-manager
   claude
   ```

2. **Update the backend to support due dates:**
   ```
   Modify the add_task function in backend/task_manager.py to accept an optional due_date parameter (format: YYYY-MM-DD). Store it in the task object. If no due date is given, set it to null.
   ```

3. **Update the frontend to show and set due dates:**
   ```
   Update frontend/index.html and frontend/app.js to:
   - Add a date input field next to the task input
   - Display the due date next to each task
   - Highlight tasks in red if the due date is in the past
   - Add a "Sort by due date" button that reorders the list
   ```

4. **Update the tests:**
   ```
   Add 3 new tests to tests/test_task_manager.py:
   - test_add_task_with_due_date
   - test_add_task_without_due_date
   - test_list_tasks_sorts_by_due_date
   Then run all tests to make sure nothing is broken.
   ```

5. **Run the tests:**
   ```bash
   python -m unittest tests/test_task_manager.py -v
   ```

6. **Commit and push:**
   ```
   Commit all changes with the message "Add due date feature with sorting and overdue highlighting" and push to GitHub
   ```

### Expected Result

When you are done, your task manager should:
- Let you add tasks with or without a due date
- Show a red highlight on overdue tasks
- Sort tasks by due date when the button is clicked
- Pass all existing tests plus the 3 new ones

### Bonus Challenge
- Add a notification badge in the page title showing the count of overdue tasks (e.g., "(3) Task Manager")
- Add a "Due This Week" filter that only shows tasks due in the next 7 days

---

## 🔗 Next Steps

### Congratulations on Completing the Entire Course!

You started as a complete beginner with no programming experience and made it all the way here, building a complete project with a frontend, backend, tests, version control, and deployment. That's no small feat -- you should be proud of yourself!

### A Review of Everything You've Learned

| Phase | Topic | What You Learned |
|-------|-------|-----------------|
| **Phase 1** | Getting Started | Installing Claude Code, giving instructions, navigating the file system |
| **Phase 2** | Files and Configuration | CLAUDE.md setup, editing files, Git version control |
| **Phase 3** | Scripts and Quality | Writing scripts, debugging techniques, automated testing |
| **Phase 4** | Real-World Applications | Web development, API integration, data processing, deployment |
| **Phase 5** | Advanced Techniques | MCP servers, Hooks automation, team collaboration, complete projects |

### Directions for Further Learning

You now have a solid foundation. Here are some directions worth exploring:

1. **Deep dive into frontend development** -- Learn React, Vue, or Svelte frameworks
2. **Backend development** -- Learn Flask, Django, or Express.js to build API servers
3. **Databases** -- Graduate from JSON files to SQLite and PostgreSQL
4. **Cloud deployment** -- Learn AWS, Google Cloud, or Vercel
5. **AI integration** -- Use the Claude API to add AI capabilities to your apps
6. **Open source contributions** -- Find interesting open source projects on GitHub to contribute to

### The Most Important Takeaway

Tools will be updated and technologies will change, but the **way of thinking** and **problem-solving ability** you've developed will last forever.

Claude Code is your assistant, but the true creator is you. Keep being curious, keep building things, and keep using technology to solve real problems.

**You are now a capable developer. Go create something of your own!**
