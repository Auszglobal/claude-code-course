# Module 2.3: Coding with Gemini — Building Real Programs

## 🎯 Learning Objectives
- Use Gemini to write complete Python programs from scratch
- Use Gemini to write JavaScript programs
- Learn how to use Gemini for debugging (finding and fixing errors)
- Understand how to use Gemini for code review (improving existing code)
- Build confidence in using AI as a coding partner, not a crutch

## 📖 Theory

### AI as Your Coding Partner

Learning to code with AI is like learning to cook with a master chef in the room. The chef can:
- Show you how to make a recipe (code generation)
- Explain why a dish tastes wrong (debugging)
- Suggest ways to improve your technique (code review)
- Teach you new recipes you never knew existed (learning new concepts)

But here is the important thing: **you** are still the cook. The chef advises, but you do the work, make decisions, and learn from the process. Use Gemini the same way — as a partner that helps you learn faster, not as a magic button that does everything for you.

### The Coding Workflow with Gemini

Here is a practical workflow that works well for beginners:

1. **Describe** what you want to build in plain English
2. **Generate** the initial code with Gemini
3. **Read** and understand every line (ask Gemini to explain parts you do not understand)
4. **Run** the code and see what happens
5. **Debug** any errors with Gemini's help
6. **Improve** the code based on Gemini's review suggestions
7. **Modify** the code yourself to add features or make changes

This cycle — generate, understand, run, debug, improve — is how professionals use AI coding tools too.

### Python vs. JavaScript — When to Use Which?

| Python | JavaScript |
|--------|-----------|
| Great for data, science, AI, automation | Great for websites, web apps, interactive features |
| Runs in the terminal | Runs in the browser (or terminal with Node.js) |
| Reads like English | More syntax to learn, but very versatile |
| Most popular for beginners and AI | Most popular for web development |

For this module, we will build examples in both languages so you can see how Gemini handles each.

## 💻 Code Example 1: Writing a Python Program with Gemini

Let us build a **personal expense tracker** — a practical program you might actually use.

Here is the prompt you would give Gemini (via the API, AI Studio, or Code Assist):

> "Write a Python program for a simple expense tracker. It should: (1) Let the user add expenses with a category and amount, (2) Show all expenses, (3) Show total spending by category, (4) Save expenses to a file so they persist between sessions. Keep it simple and well-commented."

Gemini would produce something like this:

```python
# expense_tracker.py
# A simple personal expense tracker that saves data to a file

import json  # For saving/loading data to a file
import os    # For checking if the save file exists

# --- File handling ---

SAVE_FILE = "expenses.json"  # Where we store expense data

def load_expenses():
    """Load expenses from the save file. Returns empty list if no file exists."""
    if os.path.exists(SAVE_FILE):
        with open(SAVE_FILE, "r") as file:
            return json.load(file)  # Read JSON data from file
    return []  # No file yet — start with empty list

def save_expenses(expenses):
    """Save the current expenses list to a file."""
    with open(SAVE_FILE, "w") as file:
        json.dump(expenses, file, indent=2)  # Write to file, nicely formatted

# --- Core features ---

def add_expense(expenses):
    """Ask the user for expense details and add it to the list."""
    print("\n--- Add New Expense ---")
    
    # Get the category (what the expense is for)
    category = input("Category (e.g., food, transport, entertainment): ").strip().lower()
    
    # Get the amount — keep asking until they give a valid number
    while True:
        try:
            amount = float(input("Amount ($): "))
            if amount <= 0:
                print("Please enter a positive number.")
                continue
            break
        except ValueError:
            print("That is not a valid number. Try again.")
    
    # Get an optional description
    description = input("Description (optional, press Enter to skip): ").strip()
    
    # Create the expense record
    expense = {
        "category": category,
        "amount": amount,
        "description": description if description else "No description"
    }
    
    # Add to list and save
    expenses.append(expense)
    save_expenses(expenses)
    print(f"Added: ${amount:.2f} in '{category}' — saved!")

def show_all_expenses(expenses):
    """Display all recorded expenses in a formatted table."""
    if not expenses:
        print("\nNo expenses recorded yet. Add one first!")
        return
    
    print("\n--- All Expenses ---")
    print(f"{'#':<4} {'Category':<15} {'Amount':<10} {'Description'}")
    print("-" * 50)
    
    total = 0
    for i, exp in enumerate(expenses, 1):
        print(f"{i:<4} {exp['category']:<15} ${exp['amount']:<9.2f} {exp['description']}")
        total += exp["amount"]
    
    print("-" * 50)
    print(f"{'TOTAL':<19} ${total:.2f}")

def show_by_category(expenses):
    """Show total spending grouped by category."""
    if not expenses:
        print("\nNo expenses recorded yet.")
        return
    
    # Group expenses by category
    categories = {}
    for exp in expenses:
        cat = exp["category"]
        if cat not in categories:
            categories[cat] = 0
        categories[cat] += exp["amount"]
    
    # Display the summary
    print("\n--- Spending by Category ---")
    for cat, total in sorted(categories.items()):
        print(f"  {cat.capitalize():<20} ${total:.2f}")
    
    grand_total = sum(categories.values())
    print(f"  {'GRAND TOTAL':<20} ${grand_total:.2f}")

# --- Main menu ---

def main():
    """Main program loop — shows a menu and handles user choices."""
    print("Welcome to Expense Tracker!")
    print("Your data is saved automatically.\n")
    
    expenses = load_expenses()  # Load any previously saved expenses
    
    while True:
        print("\n--- Menu ---")
        print("1. Add an expense")
        print("2. Show all expenses")
        print("3. Show spending by category")
        print("4. Quit")
        
        choice = input("\nChoose an option (1-4): ").strip()
        
        if choice == "1":
            add_expense(expenses)
        elif choice == "2":
            show_all_expenses(expenses)
        elif choice == "3":
            show_by_category(expenses)
        elif choice == "4":
            print("Goodbye! Your expenses are saved.")
            break
        else:
            print("Invalid choice. Please enter 1, 2, 3, or 4.")

# This line starts the program when you run the file
if __name__ == "__main__":
    main()
```

**To run this program:**
```bash
python3 expense_tracker.py    # Mac
python expense_tracker.py     # Windows
```

### Expected Output:
```
Welcome to Expense Tracker!
Your data is saved automatically.

--- Menu ---
1. Add an expense
2. Show all expenses
3. Show spending by category
4. Quit

Choose an option (1-4): 1

--- Add New Expense ---
Category (e.g., food, transport, entertainment): food
Amount ($): 12.50
Description (optional, press Enter to skip): Lunch at cafe
Added: $12.50 in 'food' — saved!

--- Menu ---
1. Add an expense
2. Show all expenses
3. Show spending by category
4. Quit

Choose an option (1-4): 2

--- All Expenses ---
#    Category        Amount     Description
--------------------------------------------------
1    food            $12.50     Lunch at cafe
--------------------------------------------------
     TOTAL           $12.50
```

## 💻 Code Example 2: Debugging with Gemini

Debugging is one of the most valuable ways to use AI. Here is a realistic example.

Let us say you wrote this JavaScript program and it is not working:

```javascript
// broken_quiz.js
// A simple quiz game — but it has 3 bugs! Can Gemini find them?

const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correct: 1  // Paris (index 1)
    },
    {
        question: "What is 7 x 8?",
        options: ["54", "56", "58", "62"],
        correct: 1  // 56 (index 1)
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correct: 2  // Mercury (index 2)
    }
];

let score = 0;

// Bug 1: Can you spot it?
for (let i = 0; i <= questions.length; i++) {
    console.log(`\nQuestion ${i + 1}: ${questions[i].question}`);
    
    questions[i].options.forEach((option, index) => {
        console.log(`  ${index + 1}. ${option}`);
    });
    
    // Simulate user answering correctly for testing
    const userAnswer = questions[i].correct;
    
    // Bug 2: Can you spot it?
    if (userAnswer = questions[i].correct) {
        score++;
        console.log("Correct!");
    } else {
        console.log("Wrong!");
    }
}

// Bug 3: Can you spot it?
console.log(`\nYou scored ${score} out of ${questions.length}!`);
const percentage = score / questions.length * 100;
console.log(`That is ${percentage.toFixed(1)}%`);
```

**Ask Gemini**: "This JavaScript quiz program has bugs. Find all the bugs, explain what is wrong, and show me the corrected code."

### Gemini's Debugging Response:

Gemini would identify all three bugs:

> **Bug 1 (Line: for loop condition)**: `i <= questions.length` should be `i < questions.length`. Using `<=` means the loop tries to access `questions[3]` which does not exist (the array has indices 0, 1, 2). This is called an "off-by-one error" — one of the most common bugs in programming!
>
> **Bug 2 (Line: if condition)**: `if (userAnswer = questions[i].correct)` uses a single `=` (assignment) instead of `===` (comparison). The single `=` sets `userAnswer` to the value instead of checking if they are equal. This means the condition is always true!
>
> **Bug 3**: This one was a trick — there is actually no bug on the final lines! The percentage calculation and display are correct. However, the score will always be 3/3 because Bug 2 makes every answer "correct."

### The Corrected Code:
```javascript
// Fixed line — use < instead of <=
for (let i = 0; i < questions.length; i++) {
    // ... (same as before)
    
    // Fixed line — use === instead of =
    if (userAnswer === questions[i].correct) {
        score++;
        console.log("Correct!");
    } else {
        console.log("Wrong!");
    }
}
```

### Code Review with Gemini

After your code works, ask Gemini to **review** it:

> "Review this expense tracker code. Suggest improvements for readability, error handling, performance, and best practices. Rate it out of 10."

Gemini might suggest:
- Adding input validation for the category name
- Using a date stamp for each expense
- Adding a "delete expense" feature
- Using constants for menu option strings
- Adding a budget limit warning feature

This is like having a senior developer review your code — incredibly valuable for learning.

## ✍️ Hands-On Exercises

### Exercise 1: Build a To-Do List (Python)
Ask Gemini to help you build a to-do list program with these features:
1. Add a task
2. Mark a task as complete
3. Show all tasks (with a checkmark for completed ones)
4. Delete a task
5. Save tasks to a file

Start by describing what you want in plain English. Then read and understand every line of code Gemini produces. Can you add a "priority level" feature on your own?

**Tip**: After Gemini generates the code, try to add one new feature yourself without asking for help. Even if it is small (like adding colors to the output), the practice of modifying AI-generated code builds real understanding.

### Exercise 2: Debug Challenge
Here is a Python program with three bugs. Try to find them yourself first, then ask Gemini for help:

```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    average = total / len(numbers)
    return average

# Test cases
test1 = [10, 20, 30, 40, 50]
test2 = []
test3 = [100]

print(f"Average of test1: {calculate_average(test1)}")   # Should work
print(f"Average of test2: {calculate_average(test2)}")   # Will crash!
print(f"Average of test3: {calculate_average(test3)}")   # Should work
```

**Tip**: Run the code first and see what error you get. Then ask Gemini: "Why does this crash and how do I fix it?" The main bug is that dividing by zero (empty list) causes an error. But see if Gemini finds additional improvements!

## 🔗 Next Steps

You have now used Gemini to write, debug, and review real code in both Python and JavaScript. In **Module 2.4**, we will explore one of Gemini's most mind-blowing features: the **2-million-token context window**. This lets you upload entire books, research papers, or complete codebases and have Gemini analyze them all at once.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What is the recommended workflow when coding with Gemini?</p>
<label><input type="radio" name="q1" value="0"> Let Gemini write everything and never read the code</label>
<label><input type="radio" name="q1" value="1"> Never use Gemini — always write everything yourself</label>
<label><input type="radio" name="q1" value="2"> Describe, generate, read and understand, run, debug, improve, modify</label>
<label><input type="radio" name="q1" value="3"> Copy code from the internet and ask Gemini to fix it</label>
<div class="quiz-explain">The recommended workflow is: describe what you want, generate code with Gemini, read and understand every line, run it, debug errors, improve based on review, and modify it yourself. This ensures you learn while benefiting from AI assistance.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. In JavaScript, what is the difference between = and ===?</p>
<label><input type="radio" name="q2" value="0"> They are exactly the same thing</label>
<label><input type="radio" name="q2" value="1"> = assigns a value; === compares two values for equality</label>
<label><input type="radio" name="q2" value="2"> === assigns a value; = compares two values</label>
<label><input type="radio" name="q2" value="3"> = is for numbers; === is for text</label>
<div class="quiz-explain">In JavaScript, a single = is the assignment operator (it sets a value), while === is the strict equality operator (it checks if two values are equal). Using = in an if-statement is a very common bug because it assigns instead of comparing.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. What is an "off-by-one error"?</p>
<label><input type="radio" name="q3" value="0"> A bug where a loop runs one too many or one too few times</label>
<label><input type="radio" name="q3" value="1"> When your code is one line too long</label>
<label><input type="radio" name="q3" value="2"> When you forget to save your file</label>
<label><input type="radio" name="q3" value="3"> When the AI gives you one wrong answer</label>
<div class="quiz-explain">An off-by-one error occurs when a loop runs one iteration too many or too few — for example, using <= instead of < in a for loop condition. It is one of the most common bugs in programming and can cause crashes or incorrect results.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. What is a "code review"?</p>
<label><input type="radio" name="q4" value="0"> Running the code to see if it works</label>
<label><input type="radio" name="q4" value="1"> Deleting code and starting over</label>
<label><input type="radio" name="q4" value="2"> Copying code from someone else</label>
<label><input type="radio" name="q4" value="3"> Examining code for improvements in readability, error handling, and best practices</label>
<div class="quiz-explain">A code review is the process of examining code to find potential improvements. This includes checking for bugs, improving readability, adding error handling, following best practices, and optimizing performance. Gemini can serve as a code reviewer.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What happens when you divide by zero in Python?</p>
<label><input type="radio" name="q5" value="0"> Python returns 0</label>
<label><input type="radio" name="q5" value="1"> Python crashes with a ZeroDivisionError</label>
<label><input type="radio" name="q5" value="2"> Python returns infinity</label>
<label><input type="radio" name="q5" value="3"> Python skips that line and continues</label>
<div class="quiz-explain">Dividing by zero in Python raises a ZeroDivisionError and crashes the program. This is why it is important to check for empty lists before calculating averages — len([]) is 0, and dividing by 0 causes this error.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. When should you use Python versus JavaScript?</p>
<label><input type="radio" name="q6" value="0"> Python for data/AI/automation; JavaScript for websites and web apps</label>
<label><input type="radio" name="q6" value="1"> Python is always better than JavaScript</label>
<label><input type="radio" name="q6" value="2"> JavaScript is always better than Python</label>
<label><input type="radio" name="q6" value="3"> There is no difference — they do the same thing</label>
<div class="quiz-explain">Python excels at data science, AI, machine learning, and automation tasks. JavaScript is the language of the web — essential for websites, web apps, and interactive features. Both are powerful, just suited for different purposes.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. After Gemini generates code for you, what should you do first?</p>
<label><input type="radio" name="q7" value="0"> Immediately deploy it to production</label>
<label><input type="radio" name="q7" value="1"> Delete it and write your own version</label>
<label><input type="radio" name="q7" value="2"> Read and understand every line, asking Gemini to explain anything confusing</label>
<label><input type="radio" name="q7" value="3"> Share it on social media</label>
<div class="quiz-explain">Always read and understand every line of code Gemini generates before using it. Ask Gemini to explain anything you do not understand. This is how you learn from AI-generated code rather than just copying it blindly.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>8. What does json.dump() do in the expense tracker example?</p>
<label><input type="radio" name="q8" value="0"> It deletes JSON data from a file</label>
<label><input type="radio" name="q8" value="1"> It reads JSON data from a file</label>
<label><input type="radio" name="q8" value="2"> It converts Python code to JavaScript</label>
<label><input type="radio" name="q8" value="3"> It writes (saves) Python data to a file in JSON format</label>
<div class="quiz-explain">json.dump() takes Python data (like a list or dictionary) and writes it to a file in JSON format. This allows data to persist between program sessions — when you restart the program, it can load the saved data back with json.load().</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
