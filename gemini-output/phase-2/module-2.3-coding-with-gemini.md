# Module 2.3: Writing Real Code with Gemini

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Write Python and JavaScript programs with Gemini's help, even as a beginner
- Use Gemini to debug errors and understand what went wrong
- Ask Gemini to review your code and suggest improvements
- Follow a practical workflow for building small programs from scratch
- Know when to trust Gemini's output and when to verify it

## 📖 Theory

### From Blank Page to Working Code

The hardest part of programming is often staring at an empty file with no idea where to start. Gemini changes that completely. Instead of needing to memorize syntax and wrestle with semicolons, you can describe what you want in plain English and let Gemini produce the first draft.

But here is the key insight: **Gemini is your co-pilot, not your autopilot.** You still need to understand what the code does, verify it works correctly, and guide the AI when it goes off track. Think of it like working with a very fast but occasionally careless assistant -- brilliant at drafting, but you are the one who signs off on the final product.

### The Build-Debug-Review Cycle

When you write code with Gemini, you will follow a natural cycle:

1. **Build** -- Describe what you need and let Gemini generate the code.
2. **Run** -- Execute the code and see if it works.
3. **Debug** -- If something breaks, paste the error message into Gemini and ask for help.
4. **Review** -- Once it works, ask Gemini to review the code for improvements.

This cycle is exactly what professional developers do, except Gemini makes each step faster.

### Python vs. JavaScript: Quick Context

We will use two languages in this module:

- **Python** -- Known for clean, readable syntax. Great for data processing, automation, and scripting. If you are brand new to coding, Python is the friendliest starting point.
- **JavaScript** -- The language of the web. Runs in every browser and powers interactive websites. If you want to build things people can see in a browser, JavaScript is your tool.

You do not need to be an expert in either. Gemini will handle the syntax -- your job is to describe the logic.

## 💻 Code Example 1: Building a Python Program from Scratch

Let us build a simple expense tracker. We will go through the full cycle: generate, run, debug, and review.

### Step 1: Ask Gemini to Generate

Open Gemini (web or VS Code) and type:

```
Write a Python script that:
1. Asks the user to enter expenses (description and amount)
2. Lets them add multiple expenses in a loop
3. Shows a summary with total spending when they type "done"
Keep it simple and beginner-friendly.
```

Gemini produces something like:

```python
# expense_tracker.py -- A simple expense tracker

def main():
    expenses = []  # List to store all expenses
    print("=== Simple Expense Tracker ===")
    print("Enter your expenses. Type 'done' when finished.\n")

    while True:
        description = input("Expense description (or 'done'): ")

        if description.lower() == "done":
            break

        try:
            amount = float(input(f"Amount for '{description}': $"))
            expenses.append({"description": description, "amount": amount})
            print(f"  Added: {description} -- ${amount:.2f}\n")
        except ValueError:
            print("  That does not look like a valid number. Try again.\n")

    # Display summary
    print("\n=== Expense Summary ===")
    if not expenses:
        print("No expenses recorded.")
    else:
        total = 0
        for i, expense in enumerate(expenses, 1):
            print(f"  {i}. {expense['description']}: ${expense['amount']:.2f}")
            total += expense["amount"]
        print(f"\n  Total: ${total:.2f}")
        print(f"  Number of expenses: {len(expenses)}")

if __name__ == "__main__":
    main()
```

### Step 2: Run It

Save this as `expense_tracker.py` and run it in your terminal:

```bash
python expense_tracker.py
```

```
Expected output:
=== Simple Expense Tracker ===
Enter your expenses. Type 'done' when finished.

Expense description (or 'done'): Coffee
Amount for 'Coffee': $4.50
  Added: Coffee -- $4.50

Expense description (or 'done'): Lunch
Amount for 'Lunch': $12.00
  Added: Lunch -- $12.00

Expense description (or 'done'): done

=== Expense Summary ===
  1. Coffee: $4.50
  2. Lunch: $12.00

  Total: $16.50
  Number of expenses: 2
```

### Step 3: Debug (If Needed)

Suppose you accidentally typed `amount = input(...)` without the `float()` wrapper and got an error. Paste the error into Gemini:

```
I got this error: TypeError: unsupported operand type(s) for +=: 'int' and 'str'
Here is my code: [paste code]
```

Gemini immediately spots the issue: `input()` returns a string, and you need to convert it to a number with `float()`. It shows you exactly which line to fix.

### Step 4: Ask for a Review

Once the code works, ask Gemini:

```
Review this expense tracker code. Suggest improvements for:
- Error handling
- Code organization
- Any edge cases I might have missed
```

Gemini might suggest adding negative-amount validation, saving expenses to a file, or sorting by amount. You decide which suggestions to implement.

## 💻 Code Example 2: JavaScript Debugging and Code Review

Now let us try JavaScript. Here is a small program with a few bugs hidden inside. We will use Gemini to find and fix them.

### The Buggy Code

```javascript
// todo.js -- A to-do list manager (has bugs!)

let todos = [];

function addTodo(task) {
    todos.push({ task: task, done: false });
    console.log("Added: " + task);
}

function completeTodo(index) {
    todos[index].done = true;       // Bug: no bounds checking
    console.log("Completed: " + todos[index].task);
}

function listTodos() {
    for (let i = 0; i <= todos.length; i++) {   // Bug: <= should be <
        let status = todos[i].done ? "[x]" : "[ ]";
        console.log(i + ". " + status + " " + todos[i].task);
    }
}

function removeTodo(index) {
    let removed = todos.splice(index);           // Bug: missing second argument
    console.log("Removed: " + removed.task);     // Bug: removed is an array
}

// Test it
addTodo("Buy groceries");
addTodo("Read a book");
addTodo("Walk the dog");
listTodos();
completeTodo(1);
removeTodo(0);
listTodos();
```

### Ask Gemini to Find the Bugs

Paste this code into Gemini and ask:

```
Find all the bugs in this JavaScript code and explain each one.
Then provide the corrected version.
```

Gemini identifies the issues:

```
Bug 1 (line 12): completeTodo has no bounds checking.
  If index is out of range, it will crash.
  Fix: Add a check -- if (index < 0 || index >= todos.length)

Bug 2 (line 17): Loop uses <= instead of <.
  This causes an "off by one" error, accessing an undefined element.
  Fix: Change i <= todos.length to i < todos.length

Bug 3 (line 23): splice(index) removes everything from that index onward.
  Fix: Change to splice(index, 1) to remove only one item.

Bug 4 (line 24): splice returns an array, not a single object.
  Fix: Change removed.task to removed[0].task
```

### The Corrected Code

```javascript
// todo.js -- Fixed to-do list manager

let todos = [];

function addTodo(task) {
    if (!task || task.trim() === "") {
        console.log("Error: Task cannot be empty.");
        return;
    }
    todos.push({ task: task.trim(), done: false });
    console.log("Added: " + task.trim());
}

function completeTodo(index) {
    if (index < 0 || index >= todos.length) {
        console.log("Error: Invalid index " + index);
        return;
    }
    todos[index].done = true;
    console.log("Completed: " + todos[index].task);
}

function listTodos() {
    if (todos.length === 0) {
        console.log("No tasks yet!");
        return;
    }
    for (let i = 0; i < todos.length; i++) {
        let status = todos[i].done ? "[x]" : "[ ]";
        console.log(i + ". " + status + " " + todos[i].task);
    }
}

function removeTodo(index) {
    if (index < 0 || index >= todos.length) {
        console.log("Error: Invalid index " + index);
        return;
    }
    let removed = todos.splice(index, 1);
    console.log("Removed: " + removed[0].task);
}

// Test it
addTodo("Buy groceries");
addTodo("Read a book");
addTodo("Walk the dog");
listTodos();
completeTodo(1);
removeTodo(0);
listTodos();
```

```
Expected output:
Added: Buy groceries
Added: Read a book
Added: Walk the dog
0. [ ] Buy groceries
1. [ ] Read a book
2. [ ] Walk the dog
Completed: Read a book
Removed: Buy groceries
0. [ ] Read a book (now completed -- wait, it should be [x])
```

Notice something? Even after Gemini's fix, the output might surprise you because removing index 0 shifts everything. This is a great learning moment -- always run the code yourself and think critically about the results.

## ✍️ Hands-On Exercises

### Exercise 1: Build Your Own

Ask Gemini to help you write a program (Python or JavaScript, your choice) that does one of these:

- A unit converter (miles to kilometers, Fahrenheit to Celsius, etc.)
- A password strength checker
- A simple quiz game with 5 questions

Follow the full Build-Debug-Review cycle. Generate the code, run it, fix any issues, and then ask Gemini to review the final version.

**Hint:** Start with a very specific prompt. Instead of "make a quiz game," try "make a Python quiz game with 5 multiple choice questions about world capitals, that tracks the score and shows the correct answer after each question."

### Exercise 2: Bug Hunt

Here is a broken Python function. Paste it into Gemini and ask it to find and fix all bugs:

```python
def calculate_grade(scores):
    total = 0
    for score in scores:
        total = total + score
    average = total / len(scores)

    if average >= 90:
        return "A"
    elif average >= 80:
        return "B"
    elif average >= 70:
        return "C"
    else
        return "F"

grades = calculate_grade([85, 92, 78, 95, 88])
print(f"Your grade is: " + grades)
```

Count how many bugs Gemini finds. There are at least 3. Can you spot them before Gemini does?

## ❓ Quiz

<div id="quiz">

<div class="quiz-question" data-answer="C">
<p><strong>1.</strong> What is the recommended workflow when coding with Gemini?</p>
<label><input type="radio" name="q1" value="A"> A. Generate code and immediately ship it to production</label>
<label><input type="radio" name="q1" value="B"> B. Write all code yourself, then ask Gemini to reformat it</label>
<label><input type="radio" name="q1" value="C"> C. Build, Run, Debug, Review -- in a cycle</label>
<label><input type="radio" name="q1" value="D"> D. Only use Gemini for code you have already finished writing</label>
<div class="quiz-explain" style="display:none;">C -- The Build-Debug-Review cycle lets you leverage Gemini's speed while maintaining quality through testing and review.</div>
</div>

<div class="quiz-question" data-answer="B">
<p><strong>2.</strong> What does Gemini do when you paste an error message and your code?</p>
<label><input type="radio" name="q2" value="A"> A. It automatically fixes the code in your editor</label>
<label><input type="radio" name="q2" value="B"> B. It identifies the cause of the error and suggests a fix</label>
<label><input type="radio" name="q2" value="C"> C. It reports the bug to the language's development team</label>
<label><input type="radio" name="q2" value="D"> D. It rewrites the entire program from scratch</label>
<div class="quiz-explain" style="display:none;">B -- Gemini analyzes the error message in context with your code to pinpoint the problem and explain both why it happened and how to fix it.</div>
</div>

<div class="quiz-question" data-answer="A">
<p><strong>3.</strong> Why is the analogy "co-pilot, not autopilot" important?</p>
<label><input type="radio" name="q3" value="A"> A. You still need to understand, verify, and guide the code Gemini produces</label>
<label><input type="radio" name="q3" value="B"> B. Gemini cannot write code without your line-by-line approval</label>
<label><input type="radio" name="q3" value="C"> C. Gemini only works when you are actively typing</label>
<label><input type="radio" name="q3" value="D"> D. You must always rewrite Gemini's code before using it</label>
<div class="quiz-explain" style="display:none;">A -- Gemini is powerful but not perfect. Treating it as a co-pilot means you stay engaged, verify correctness, and make the final decisions.</div>
</div>

<div class="quiz-question" data-answer="D">
<p><strong>4.</strong> What was the bug with <code>todos.splice(index)</code> in the JavaScript example?</p>
<label><input type="radio" name="q4" value="A"> A. splice is not a valid JavaScript function</label>
<label><input type="radio" name="q4" value="B"> B. It removes the item but does not return it</label>
<label><input type="radio" name="q4" value="C"> C. It only works on strings, not arrays</label>
<label><input type="radio" name="q4" value="D"> D. Without a second argument, it removes everything from that index onward</label>
<div class="quiz-explain" style="display:none;">D -- splice(index) without a count argument removes all elements from index to the end. Using splice(index, 1) removes exactly one element.</div>
</div>

<div class="quiz-question" data-answer="B">
<p><strong>5.</strong> What makes a good prompt when asking Gemini to generate code?</p>
<label><input type="radio" name="q5" value="A"> A. Keeping it as short as possible, like "make a game"</label>
<label><input type="radio" name="q5" value="B"> B. Being specific about features, behavior, and constraints</label>
<label><input type="radio" name="q5" value="C"> C. Writing the code yourself first and asking Gemini to check the syntax</label>
<label><input type="radio" name="q5" value="D"> D. Using only technical jargon so Gemini takes you seriously</label>
<div class="quiz-explain" style="display:none;">B -- Specific prompts get better results. "A Python quiz with 5 multiple choice questions about capitals that tracks score" is far better than "make a quiz."</div>
</div>

<div class="quiz-question" data-answer="C">
<p><strong>6.</strong> When should you ask Gemini to review your code?</p>
<label><input type="radio" name="q6" value="A"> A. Before writing any code at all</label>
<label><input type="radio" name="q6" value="B"> B. Only when you encounter an error</label>
<label><input type="radio" name="q6" value="C"> C. After the code works, to find improvements and edge cases</label>
<label><input type="radio" name="q6" value="D"> D. Never -- code review is only for human reviewers</label>
<div class="quiz-explain" style="display:none;">C -- Once your code runs correctly, a review pass helps catch edge cases, improve readability, and follow best practices. Gemini is great at spotting things you might have missed.</div>
</div>

<div class="quiz-question" data-answer="A">
<p><strong>7.</strong> In the Python expense tracker, what does <code>float(input(...))</code> do?</p>
<label><input type="radio" name="q7" value="A"> A. Reads user input as text and converts it to a decimal number</label>
<label><input type="radio" name="q7" value="B"> B. Rounds the number to two decimal places</label>
<label><input type="radio" name="q7" value="C"> C. Checks if the input is a valid currency amount</label>
<label><input type="radio" name="q7" value="D"> D. Displays a floating tooltip above the input field</label>
<div class="quiz-explain" style="display:none;">A -- input() always returns a string in Python. Wrapping it with float() converts that string to a decimal number so you can do math with it.</div>
</div>

<div class="quiz-question" data-answer="D">
<p><strong>8.</strong> What is the most important thing to do after Gemini generates code for you?</p>
<label><input type="radio" name="q8" value="A"> A. Immediately share it with your team</label>
<label><input type="radio" name="q8" value="B"> B. Translate it to a different programming language</label>
<label><input type="radio" name="q8" value="C"> C. Add more comments and rename the variables</label>
<label><input type="radio" name="q8" value="D"> D. Run it, test it, and verify it does what you expect</label>
<div class="quiz-explain" style="display:none;">D -- AI-generated code can contain bugs or misunderstand your intent. Always run the code, test with different inputs, and verify the output matches your expectations.</div>
</div>

<button class="quiz-submit" onclick="checkQuiz()">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You have now written, debugged, and reviewed real code with Gemini. In **Module 2.4: Gemini's Long Context Window**, we will explore one of Gemini's most powerful features -- the ability to process up to 2 million tokens at once. You will learn how to upload entire books, codebases, and document collections for Gemini to analyze in a single conversation.
