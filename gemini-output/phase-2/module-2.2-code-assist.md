# Module 2.2: Gemini Code Assist in VS Code

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Install and configure the Gemini Code Assist extension in VS Code
- Use AI-powered code completion to write code faster
- Ask Gemini to explain unfamiliar code in plain English
- Generate entire functions or files from natural language descriptions
- Have inline conversations with Gemini without leaving your editor

## 📖 Theory

### Your AI Pair Programmer

Imagine you had a brilliant colleague sitting right next to you while you code -- someone who could finish your sentences, explain confusing code, and even write entire functions when you describe what you need. That is exactly what Gemini Code Assist does inside Visual Studio Code.

**Gemini Code Assist** is a free extension (with generous usage limits) that brings Google's Gemini AI directly into your code editor. Instead of switching between your editor and a browser tab to ask questions, everything happens right where you work.

### How It Works

Gemini Code Assist operates in several modes:

1. **Code Completion** -- As you type, Gemini predicts what you are about to write and suggests the next chunk of code. You press `Tab` to accept, or keep typing to ignore it. Think of it like autocomplete on your phone, but for code.

2. **Code Explanation** -- Select any code you do not understand, and Gemini will break it down in plain language. It is like having a patient teacher who never gets tired of questions.

3. **Code Generation** -- Describe what you want in English (or any language), and Gemini writes the code for you. You review it, tweak if needed, and move on.

4. **Inline Chat** -- Open a chat panel right inside VS Code to have a back-and-forth conversation about your code. You can ask follow-up questions, request changes, or explore alternatives.

### Why Use It Over the Web Interface?

The web interface at gemini.google.com is great for general questions, but Code Assist is purpose-built for coding. It understands your project structure, sees the file you are working on, and gives contextually relevant suggestions. It is the difference between asking a stranger for directions versus having a GPS that knows exactly where you are.

## 💻 Code Example 1: Installing and Setting Up Gemini Code Assist

### Step 1: Open VS Code

Launch Visual Studio Code. If you do not have it yet, download it from [code.visualstudio.com](https://code.visualstudio.com/).

### Step 2: Install the Extension

1. Click the **Extensions** icon in the left sidebar (it looks like four small squares).
2. In the search bar, type: `Gemini Code Assist`
3. Find the extension published by **Google** (look for the verified checkmark).
4. Click **Install**.

```
You should see the Gemini icon appear in your left sidebar after installation.
```

### Step 3: Sign In

1. Click the **Gemini icon** in the sidebar.
2. Click **Sign in with Google**.
3. A browser window opens -- sign in with your Google account.
4. Return to VS Code. You should see "Gemini Code Assist" ready in the sidebar.

```
Expected result:
┌──────────────────────────────────────┐
│  Gemini Code Assist                  │
│  ✓ Signed in as you@gmail.com        │
│                                      │
│  Ask Gemini anything...              │
└──────────────────────────────────────┘
```

### Step 4: Try Code Completion

Create a new file called `hello.py` and start typing:

```python
# Create a function that greets a user by name
def greet_user(
```

Pause after the opening parenthesis. Within a second or two, Gemini suggests the rest:

```python
# Gemini suggests this completion (shown in grey text):
def greet_user(name):
    """Greet a user by their name."""
    print(f"Hello, {name}! Welcome aboard.")
```

Press **Tab** to accept the suggestion. That is it -- Gemini just wrote your function.

### Step 5: Try Code Explanation

Now suppose you encounter code you do not understand. Select the following code in your editor:

```python
result = [x**2 for x in range(10) if x % 2 == 0]
```

Right-click and choose **Gemini > Explain This**. Gemini responds with something like:

```
This is a list comprehension that:
1. Loops through numbers 0-9
2. Filters for even numbers only (x % 2 == 0)
3. Squares each even number (x**2)
4. Result: [0, 4, 16, 36, 64]
```

## 💻 Code Example 2: Code Generation and Inline Chat

### Generating Code from a Description

Open the Gemini chat panel (click the Gemini icon in the sidebar) and type:

```
Create a Python function that reads a CSV file and returns the average
value of a specified column. Include error handling for missing files
and non-numeric data.
```

Gemini generates:

```python
import csv

def average_of_column(file_path, column_name):
    """
    Read a CSV file and return the average value of a specified column.

    Args:
        file_path: Path to the CSV file.
        column_name: Name of the column to average.

    Returns:
        The average value as a float, or None if calculation fails.
    """
    try:
        values = []
        with open(file_path, "r") as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    values.append(float(row[column_name]))
                except (ValueError, KeyError):
                    continue  # Skip non-numeric or missing values

        if not values:
            print(f"No numeric values found in column '{column_name}'.")
            return None

        return sum(values) / len(values)

    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None

# Example usage
avg = average_of_column("sales.csv", "revenue")
if avg is not None:
    print(f"Average revenue: ${avg:.2f}")
```

Click **Insert at Cursor** to drop this code right into your file.

### Using Inline Chat for Refinement

Place your cursor inside the function above and press **Ctrl+I** (or **Cmd+I** on Mac) to open inline chat. Type:

```
Add logging instead of print statements, and add a parameter
for skipping the first N rows.
```

Gemini rewrites the function in place with your requested changes. You see a diff view showing what changed, and you can accept or reject each modification.

### Keyboard Shortcuts Worth Remembering

| Action | Windows/Linux | Mac |
|---|---|---|
| Accept completion | `Tab` | `Tab` |
| Dismiss completion | `Esc` | `Esc` |
| Open inline chat | `Ctrl+I` | `Cmd+I` |
| Open sidebar chat | Click Gemini icon | Click Gemini icon |
| Explain selection | Right-click > Gemini > Explain | Right-click > Gemini > Explain |

## ✍️ Hands-On Exercises

### Exercise 1: Auto-Complete Challenge

Create a new file called `calculator.py`. Start typing each of these function signatures and let Gemini complete them. See how close its suggestions are to what you wanted:

```python
def add(a, b):

def multiply(a, b):

def calculate_average(numbers):

def convert_celsius_to_fahrenheit(celsius):
```

**Hint:** If Gemini's suggestion is not quite right, keep typing a few more characters to steer it in the right direction, then pause again.

### Exercise 2: Explain and Generate

1. Find any open-source Python file on GitHub that you do not fully understand.
2. Paste it into VS Code.
3. Select the entire file and ask Gemini to explain it.
4. Then ask Gemini in the chat: "Write a similar function but for [your own use case]."

**Hint:** Try searching GitHub for "Python utility functions" and pick something that looks interesting but unfamiliar.

## ❓ Quiz

<div id="quiz">

<div class="quiz-question" data-answer="B">
<p><strong>1.</strong> What is the primary advantage of Gemini Code Assist over using Gemini in a browser?</p>
<label><input type="radio" name="q1" value="A"> A. It uses a more powerful AI model</label>
<label><input type="radio" name="q1" value="B"> B. It understands your project context and works inside your editor</label>
<label><input type="radio" name="q1" value="C"> C. It is a paid premium feature with faster responses</label>
<label><input type="radio" name="q1" value="D"> D. It only works with Google Cloud projects</label>
<div class="quiz-explain" style="display:none;">B -- Code Assist sees your open files, project structure, and current cursor position, giving it far more context than the web interface.</div>
</div>

<div class="quiz-question" data-answer="C">
<p><strong>2.</strong> How do you accept a code completion suggestion from Gemini in VS Code?</p>
<label><input type="radio" name="q2" value="A"> A. Press Enter</label>
<label><input type="radio" name="q2" value="B"> B. Click the suggestion with your mouse</label>
<label><input type="radio" name="q2" value="C"> C. Press Tab</label>
<label><input type="radio" name="q2" value="D"> D. Press Ctrl+A</label>
<div class="quiz-explain" style="display:none;">C -- Tab is the standard key to accept an inline code suggestion. Pressing Esc dismisses it.</div>
</div>

<div class="quiz-question" data-answer="A">
<p><strong>3.</strong> What happens when you select code, right-click, and choose "Gemini > Explain This"?</p>
<label><input type="radio" name="q3" value="A"> A. Gemini provides a plain-language explanation of the selected code</label>
<label><input type="radio" name="q3" value="B"> B. Gemini deletes the code and replaces it with comments</label>
<label><input type="radio" name="q3" value="C"> C. Gemini runs the code and shows the output</label>
<label><input type="radio" name="q3" value="D"> D. Gemini translates the code to another programming language</label>
<div class="quiz-explain" style="display:none;">A -- The Explain feature breaks down what the code does step by step in natural language, making it perfect for learning unfamiliar code.</div>
</div>

<div class="quiz-question" data-answer="D">
<p><strong>4.</strong> What keyboard shortcut opens the inline chat in VS Code?</p>
<label><input type="radio" name="q4" value="A"> A. Ctrl+G / Cmd+G</label>
<label><input type="radio" name="q4" value="B"> B. Ctrl+Shift+P / Cmd+Shift+P</label>
<label><input type="radio" name="q4" value="C"> C. Alt+Enter / Option+Enter</label>
<label><input type="radio" name="q4" value="D"> D. Ctrl+I / Cmd+I</label>
<div class="quiz-explain" style="display:none;">D -- Ctrl+I (Windows/Linux) or Cmd+I (Mac) opens the inline chat, letting you give Gemini instructions right at your cursor position.</div>
</div>

<div class="quiz-question" data-answer="B">
<p><strong>5.</strong> Which of the following is NOT a mode of Gemini Code Assist?</p>
<label><input type="radio" name="q5" value="A"> A. Code Completion</label>
<label><input type="radio" name="q5" value="B"> B. Code Deployment</label>
<label><input type="radio" name="q5" value="C"> C. Code Explanation</label>
<label><input type="radio" name="q5" value="D"> D. Code Generation</label>
<div class="quiz-explain" style="display:none;">B -- Gemini Code Assist handles completion, explanation, generation, and inline chat. Deployment is handled by other tools like Google Cloud CLI.</div>
</div>

<div class="quiz-question" data-answer="A">
<p><strong>6.</strong> When Gemini suggests a code completion, what does pressing Esc do?</p>
<label><input type="radio" name="q6" value="A"> A. Dismisses the suggestion so you can keep typing manually</label>
<label><input type="radio" name="q6" value="B"> B. Accepts the suggestion and moves to the next line</label>
<label><input type="radio" name="q6" value="C"> C. Opens a menu with alternative suggestions</label>
<label><input type="radio" name="q6" value="D"> D. Closes VS Code entirely</label>
<div class="quiz-explain" style="display:none;">A -- Esc dismisses the ghost text suggestion, letting you continue typing your own code without accepting Gemini's prediction.</div>
</div>

<div class="quiz-question" data-answer="C">
<p><strong>7.</strong> What is the best analogy for code completion?</p>
<label><input type="radio" name="q7" value="A"> A. A spell checker that fixes mistakes</label>
<label><input type="radio" name="q7" value="B"> B. A search engine that finds code online</label>
<label><input type="radio" name="q7" value="C"> C. Autocomplete on your phone, but for code</label>
<label><input type="radio" name="q7" value="D"> D. A compiler that converts code to machine language</label>
<div class="quiz-explain" style="display:none;">C -- Just like your phone predicts the next word in a text message, Gemini predicts the next chunk of code based on what you have typed so far.</div>
</div>

<div class="quiz-question" data-answer="D">
<p><strong>8.</strong> After Gemini generates code in the chat panel, how do you add it to your file?</p>
<label><input type="radio" name="q8" value="A"> A. You must manually copy and paste it</label>
<label><input type="radio" name="q8" value="B"> B. It is automatically inserted at the top of your file</label>
<label><input type="radio" name="q8" value="C"> C. You need to save the chat log first</label>
<label><input type="radio" name="q8" value="D"> D. Click "Insert at Cursor" to place it at your current position</label>
<div class="quiz-explain" style="display:none;">D -- The chat panel provides an "Insert at Cursor" button that places the generated code exactly where your cursor is in the editor, saving you from manual copy-paste.</div>
</div>

<button class="quiz-submit" onclick="checkQuiz()">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Now that you have Gemini working inside your editor, you are ready to put it to serious use. In **Module 2.3: Writing Real Code with Gemini**, we will tackle real programming tasks -- writing Python and JavaScript from scratch, debugging errors, and using Gemini for code review. You will see how to go from idea to working code with AI as your co-pilot.
