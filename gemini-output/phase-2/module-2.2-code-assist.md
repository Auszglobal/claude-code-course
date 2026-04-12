# Module 2.2: Gemini Code Assist in VS Code

## 🎯 Learning Objectives
- Understand what Gemini Code Assist is and how it helps you code faster
- Install and set up Gemini Code Assist in VS Code
- Use AI-powered code completion to write code faster
- Ask Gemini to explain, generate, and transform code using inline chat
- Know the difference between Code Assist and using the API directly

## 📖 Theory

### What is Gemini Code Assist?

Imagine you are writing an essay, and a helpful friend is looking over your shoulder. As you type, they suggest how to finish your sentences. When you get stuck, you can ask them "What should I write next?" or "Can you explain this paragraph I found online?"

**Gemini Code Assist** works exactly like that, but for programming. It is a free extension for **Visual Studio Code** (VS Code) — one of the most popular code editors in the world — that brings Gemini's intelligence directly into your coding workflow.

Here is what it can do:
- **Code completion**: As you type, it suggests the rest of the line or entire blocks of code
- **Code generation**: Describe what you want in plain English, and it writes the code
- **Code explanation**: Highlight code you do not understand, and it explains it
- **Inline chat**: Ask questions about your code without leaving the editor
- **Code transformation**: Select code and ask Gemini to refactor, optimize, or convert it

### VS Code — A Quick Introduction

If you have never used VS Code, do not worry. **Visual Studio Code** (VS Code) is a free, lightweight code editor made by Microsoft. Think of it like a powerful version of Notepad or TextEdit, but designed specifically for writing code. It has:

- Syntax highlighting (code is color-coded to make it readable)
- A built-in terminal (so you can run code without switching windows)
- Extensions (add-ons that give it new powers — like Gemini Code Assist!)

### How Does Code Assist Differ from the API?

| Feature | Gemini Code Assist (VS Code) | Gemini API (Python) |
|---------|------------------------------|---------------------|
| **How you use it** | Inside your code editor while writing | By writing Python scripts |
| **Best for** | Day-to-day coding help | Building AI-powered apps |
| **Input** | Your code + natural language | Programmatic prompts |
| **Setup** | Install an extension | Write code to call the API |
| **Interaction** | Real-time suggestions as you type | Request-response cycle |

They complement each other. Code Assist helps you **write code faster**. The API helps you **build apps that use AI**.

## 💻 Code Example 1: Installing and Setting Up Code Assist

### Step 1: Install VS Code (if you do not have it)

```
1. Go to https://code.visualstudio.com
2. Click the big download button (it detects your operating system)
3. Run the installer:
   - Mac: Drag VS Code to your Applications folder
   - Windows: Run the .exe installer (accept all defaults)
4. Open VS Code
```

### Step 2: Install the Gemini Code Assist Extension

```
1. Open VS Code
2. Click the Extensions icon in the left sidebar
   (it looks like 4 small squares, or press Ctrl+Shift+X / Cmd+Shift+X)
3. In the search bar, type: "Gemini Code Assist"
4. Find "Gemini Code Assist" by Google
   (look for the official Google logo)
5. Click "Install"
6. Wait for it to finish installing (usually 10-30 seconds)
```

### Step 3: Sign In with Your Google Account

```
1. After installation, you will see a Gemini icon in the left sidebar
2. Click it — a panel opens on the side
3. Click "Sign in with Google"
4. A browser window opens — sign in with your Google account
5. Grant the requested permissions
6. Return to VS Code — you should see "Signed in" confirmation
```

📸 [What you should see after setup]
```
┌──────────────────────────────────────────────────────────┐
│  VS Code                                                 │
│  ┌─────┬──────────────────────┬──────────────────┐       │
│  │ 📁  │  welcome.py          │  Gemini Chat     │       │
│  │ 🔍  │                      │                  │       │
│  │ 🔧  │  (your code here)    │  ✓ Signed in     │       │
│  │ 🧩  │                      │  Ask Gemini...   │       │
│  │ ✨  │                      │                  │       │
│  │     │                      │                  │       │
│  │ ✨ = Gemini icon            │                  │       │
│  └─────┴──────────────────────┴──────────────────┘       │
└──────────────────────────────────────────────────────────┘
```

### Step 4: Test Code Completion

Create a new file called `test_assist.py` and start typing:

```python
# Create a new file: test_assist.py
# Start typing the following and PAUSE after each line.
# Watch for grey "ghost text" suggestions from Gemini!

def calculate_tip(bill_amount, tip_percentage):
    # After you type the function signature and press Enter,
    # Gemini should suggest the body of the function!
    
    # If you see grey suggestion text, press Tab to accept it.
    # Press Escape to dismiss it.
```

### Expected Behavior:
After typing the function name and parameters, you should see grey "ghost text" appear suggesting something like:
```python
def calculate_tip(bill_amount, tip_percentage):
    tip = bill_amount * (tip_percentage / 100)    # <- Gemini suggests this
    total = bill_amount + tip                      # <- and this
    return tip, total                              # <- and this
```

Press **Tab** to accept the suggestion, or keep typing to ignore it.

## 💻 Code Example 2: Inline Chat and Code Explanation

### Using the Chat Panel

The Gemini chat panel (on the right side of VS Code) is your AI coding buddy. Here are practical examples:

```
Example 1 — Generate code from description:
Click in the Gemini chat panel and type:

"Write a Python function that takes a list of student names
 and test scores, and returns the top 3 students with the
 highest scores. Include error handling."

Gemini will generate the complete function with comments!
```

### Expected Output in Chat:
```python
def get_top_students(students: list[dict], top_n: int = 3) -> list[dict]:
    """
    Returns the top N students with the highest scores.
    
    Args:
        students: List of dicts with 'name' and 'score' keys
        top_n: Number of top students to return (default: 3)
    
    Returns:
        List of top N student dicts, sorted by score descending
    """
    if not students:
        raise ValueError("Student list cannot be empty")
    
    if top_n <= 0:
        raise ValueError("top_n must be a positive integer")
    
    # Sort students by score in descending order
    sorted_students = sorted(students, key=lambda x: x['score'], reverse=True)
    
    # Return the top N (or all if fewer than N)
    return sorted_students[:top_n]


# Example usage:
students = [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 87},
    {"name": "Charlie", "score": 92},
    {"name": "Diana", "score": 98},
    {"name": "Eve", "score": 88},
]

top_3 = get_top_students(students)
for student in top_3:
    print(f"{student['name']}: {student['score']}")
```

### Explaining Code You Do Not Understand

If you find code online that you do not understand:

```
1. Paste the confusing code into your VS Code file
2. Select (highlight) the code
3. Right-click and look for "Gemini: Explain this code"
   OR type in the chat panel: "Explain the selected code"
```

For example, select this code:
```python
result = [x**2 for x in range(10) if x % 2 == 0]
```

Gemini will explain:
> "This is a **list comprehension** — a compact way to create a list in Python. It does three things:
> 1. `range(10)` generates numbers 0 through 9
> 2. `if x % 2 == 0` filters to only even numbers (0, 2, 4, 6, 8)
> 3. `x**2` squares each number
> 
> So the result is `[0, 4, 16, 36, 64]` — the squares of even numbers from 0 to 9."

### Transforming Code

Select some code, then ask Gemini to transform it:

```
Try these commands in the chat:
- "Convert this function to use async/await"
- "Add type hints to all parameters"
- "Rewrite this using a class instead of functions"
- "Make this code handle errors gracefully"
- "Add docstrings to all functions"
```

## ✍️ Hands-On Exercises

### Exercise 1: Build a Mini Calculator
Use Gemini Code Assist to help you build a simple calculator:

1. Create a new file called `calculator.py`
2. Type: `def add(a, b):` and see what Gemini suggests
3. Accept the suggestion with Tab
4. Now type `def subtract(` and let Gemini complete it
5. Continue for multiply and divide
6. Ask the chat panel: "Add a main menu that lets the user choose an operation and input numbers"

**Tip**: If Gemini's suggestion is not quite right, just keep typing your own version. The more context (code) you provide, the better the suggestions become.

### Exercise 2: Code Explanation Challenge
Find a piece of code online that you do not understand (try searching "Python one-liners" or "JavaScript tricks"). Paste it into VS Code, select it, and ask Gemini to explain it. Here are three to try:

```python
# Paste each one into VS Code and ask Gemini to explain:

# 1. What does this do?
print({i: i**3 for i in range(1, 6)})

# 2. What about this?
words = "hello world foo bar"
result = " ".join(word.capitalize() for word in words.split())

# 3. And this?
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = [num for row in matrix for num in row]
```

**Tip**: After reading Gemini's explanation, try to predict what each code snippet outputs before running it. Then run it to check!

## 🔗 Next Steps

You now have an AI coding assistant right inside your editor. In **Module 2.3**, we will use Gemini (both Code Assist and the API) to **write real programs** — Python and JavaScript projects, debugging sessions, and code reviews. Time to build something!

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is Gemini Code Assist?</p>
<label><input type="radio" name="q1" value="0"> A standalone application for writing code</label>
<label><input type="radio" name="q1" value="1"> A free VS Code extension that provides AI-powered code completion, generation, and explanation</label>
<label><input type="radio" name="q1" value="2"> A replacement for the Python programming language</label>
<label><input type="radio" name="q1" value="3"> A paid service that costs $20/month</label>
<div class="quiz-explain">Gemini Code Assist is a free extension for Visual Studio Code (VS Code) that brings Google Gemini's AI capabilities directly into your code editor. It provides real-time code suggestions, generation from natural language, and code explanation.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>2. How do you accept a code suggestion from Gemini Code Assist?</p>
<label><input type="radio" name="q2" value="0"> Press the Tab key</label>
<label><input type="radio" name="q2" value="1"> Click the Accept button</label>
<label><input type="radio" name="q2" value="2"> Say "yes" out loud</label>
<label><input type="radio" name="q2" value="3"> Press Ctrl+S</label>
<div class="quiz-explain">When Gemini Code Assist shows a grey "ghost text" suggestion in your editor, press the Tab key to accept it. Press Escape to dismiss it, or just keep typing your own code to ignore it.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>3. What is the keyboard shortcut to open the Extensions panel in VS Code?</p>
<label><input type="radio" name="q3" value="0"> Ctrl+E / Cmd+E</label>
<label><input type="radio" name="q3" value="1"> Ctrl+P / Cmd+P</label>
<label><input type="radio" name="q3" value="2"> Ctrl+T / Cmd+T</label>
<label><input type="radio" name="q3" value="3"> Ctrl+Shift+X / Cmd+Shift+X</label>
<div class="quiz-explain">The keyboard shortcut Ctrl+Shift+X (Windows/Linux) or Cmd+Shift+X (Mac) opens the Extensions panel in VS Code, where you can search for and install extensions like Gemini Code Assist.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>4. What is the difference between Code Assist and the Gemini API?</p>
<label><input type="radio" name="q4" value="0"> They are the same thing with different names</label>
<label><input type="radio" name="q4" value="1"> Code Assist is more powerful than the API</label>
<label><input type="radio" name="q4" value="2"> Code Assist helps you write code in an editor; the API lets you build AI-powered applications</label>
<label><input type="radio" name="q4" value="3"> The API is free but Code Assist is paid</label>
<div class="quiz-explain">Code Assist is designed for day-to-day coding help inside your editor (suggestions, explanations, generation). The API is for building applications that programmatically use Gemini's intelligence. They serve different purposes and complement each other.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. How can you ask Gemini to explain a piece of code you do not understand?</p>
<label><input type="radio" name="q5" value="0"> Delete the code and rewrite it from scratch</label>
<label><input type="radio" name="q5" value="1"> Select the code, right-click, and choose "Gemini: Explain this code" or ask in the chat panel</label>
<label><input type="radio" name="q5" value="2"> Copy the code and email it to Google</label>
<label><input type="radio" name="q5" value="3"> Code explanation is not available in Code Assist</label>
<div class="quiz-explain">You can select any code in your editor, right-click for the Gemini context menu, or type your question in the Gemini chat panel on the side. Both methods work for getting clear explanations of code you find confusing.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. What does Gemini Code Assist's code completion look like in the editor?</p>
<label><input type="radio" name="q6" value="0"> Grey "ghost text" that appears after your cursor as you type</label>
<label><input type="radio" name="q6" value="1"> A pop-up window that blocks your view</label>
<label><input type="radio" name="q6" value="2"> Red underlined text</label>
<label><input type="radio" name="q6" value="3"> A notification in the bottom corner</label>
<div class="quiz-explain">Gemini Code Assist shows suggestions as grey "ghost text" — dimmed text that appears after your cursor. It is non-intrusive and you can accept it with Tab, ignore it by continuing to type, or dismiss it with Escape.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. Which of these can you NOT do with Gemini Code Assist?</p>
<label><input type="radio" name="q7" value="0"> Generate code from a natural language description</label>
<label><input type="radio" name="q7" value="1"> Explain what a piece of code does</label>
<label><input type="radio" name="q7" value="2"> Refactor or transform selected code</label>
<label><input type="radio" name="q7" value="3"> Deploy your application to a production server</label>
<div class="quiz-explain">Gemini Code Assist can generate, explain, and transform code, but it cannot deploy applications to production servers. Deployment requires separate tools and processes. Code Assist focuses on helping you write and understand code.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. What makes Gemini Code Assist give better suggestions?</p>
<label><input type="radio" name="q8" value="0"> Having a faster internet connection</label>
<label><input type="radio" name="q8" value="1"> Using a bigger monitor</label>
<label><input type="radio" name="q8" value="2"> Providing more context — more code in your file, descriptive function names, and comments</label>
<label><input type="radio" name="q8" value="3"> Waiting longer before accepting suggestions</label>
<div class="quiz-explain">Gemini Code Assist uses the surrounding code as context to make better suggestions. The more code you have in your file, combined with clear function names, comments, and docstrings, the more accurate and relevant its suggestions will be.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
