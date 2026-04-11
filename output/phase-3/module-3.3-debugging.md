# Module 3.3: Debugging and Fixing Errors

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Understand the three major types of programming errors: syntax errors, logic errors, and runtime errors
  - Effectively describe errors to Claude Code so it can fix them quickly
  - Read and understand basic error messages
  - Master the debugging cycle: Identify → Understand → Fix → Verify
  - Learn common error communication patterns

## 📖 Theory

### Errors Are Normal!

First, the most important point: **errors are completely normal in programming**, even engineers with 20 years of experience encounter them every day.

Think of programming like **learning to cook**:
- The first time you cook, putting in too much salt or setting the heat too high is normal
- What matters isn't never making mistakes, but knowing **how to spot problems and fix them**
- With Claude Code's help, fixing errors becomes super easy

### Three Types of Errors

#### 1. Syntax Error — "Typos"

Just like making typos in English, code has fixed grammar rules. Misspell a letter or forget a bracket, and the computer can't understand it.

**Everyday analogy**: You wrote a letter, but spelled "receive" as "recieve" — the spell checker flags it.

Common syntax errors:
```python
# Missing closing quote
print("Hello World)

# Missing colon
if x > 5
    print("big")

# Incorrect indentation (spacing)
def hello():
print("hi")    # This line should be indented
```

#### 2. Logic Error — "Wrong Turn"

The program runs successfully, but the result is wrong. This is the hardest type of error to catch because the computer doesn't report anything.

**Everyday analogy**: You want to go to Central Station, and the GPS doesn't show any error, but it takes you to the airport instead — the route is valid, but the destination is wrong.

```python
# Trying to calculate an average score, but the logic is wrong
scores = [80, 90, 70]
average = scores[0] + scores[1] + scores[2] / 3   # Wrong! Only 70 is divided by 3
# Correct: (scores[0] + scores[1] + scores[2]) / 3
```

#### 3. Runtime Error — "Unexpected Roadblock"

The syntax is correct and the logic is sound, but something unexpected happens during execution.

**Everyday analogy**: Your navigation route is correct, but halfway there you discover the road ahead is closed for construction.

```python
# Trying to open a file that doesn't exist
file = open("nonexistent_file.txt")

# Division by zero
result = 100 / 0

# List index out of range
names = ["Alice", "Bob"]
print(names[5])    # Only 2 elements, but trying to access the 6th
```

### The Debugging Cycle: Four Steps

```
   Identify
      ↓
   Understand
      ↓
   Fix
      ↓
   Verify
      ↓
   (If there's still a problem, go back to "Identify")
```

1. **Identify**: Discover there's an error (see an error message, or the result is wrong)
2. **Understand**: Figure out where the error is and why it happened
3. **Fix**: Modify the code
4. **Verify**: Run the program again to confirm the problem is resolved

With Claude Code, steps 2 and 3 become very easy — you just need to copy the error message to it.

## 💻 Code Example 1: Fixing Syntax Errors

Let's practice using Claude Code to fix intentionally broken code.

First, set up the practice environment:

```bash
mkdir -p ~/claude-practice/debugging
cd ~/claude-practice/debugging
```

Create a deliberately broken file, `broken_calculator.py`:

```python
# broken_calculator.py — A calculator full of errors (intentionally broken!)

def add(a, b)     # Error 1: Missing colon
    return a + b

def subtract(a, b):
    return a - c   # Error 2: c is not defined, should be b

def multiply(a, b):
    return a * b

def divide(a, b):
    return a / b   # Error 3: No handling for division by zero

# Main program
print("=== Simple Calculator ===")
print("10 + 5 =", add(10, 5))
print("10 - 5 =", subtract(10, 5)
print("10 * 5 =", multiply(10, 5))   # Error 4: Previous line is missing closing parenthesis
print("10 / 0 =", divide(10, 0))     # This will trigger a division by zero error
```

Start Claude Code:

```bash
cd ~/claude-practice/debugging
claude
```

Tell Claude Code:

```
Please look at broken_calculator.py — this file has several errors.
Find all the errors, explain what each one is, and fix them.
```

### Expected Output:

Claude Code will analyze the file and list all the issues:

📸 [What you should see]
```
┌────────────────────────────────────────────────────────┐
│ I found 4 errors in broken_calculator.py:               │
│                                                         │
│ 1. Line 3: def add(a, b) is missing a colon             │
│    Fix: def add(a, b):                                  │
│                                                         │
│ 2. Line 7: return a - c — c should be b                 │
│    Fix: return a - b                                    │
│                                                         │
│ 3. Line 18: print statement is missing closing paren    │
│    Fix: print("10 - 5 =", subtract(10, 5))             │
│                                                         │
│ 4. Line 20: divide(10, 0) will cause division by zero   │
│    Fix: Add a zero check in the divide function          │
│                                                         │
│ Shall I fix these errors?                                │
└────────────────────────────────────────────────────────┘
```

After you confirm, Claude Code will fix the file. The corrected version will look roughly like this:

```python
# broken_calculator.py — Fixed calculator

def add(a, b):          # Fixed: added colon
    return a + b

def subtract(a, b):
    return a - b        # Fixed: changed c to b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:          # Fixed: check for division by zero
        return "Error: cannot divide by zero"
    return a / b

# Main program
print("=== Simple Calculator ===")
print("10 + 5 =", add(10, 5))
print("10 - 5 =", subtract(10, 5))   # Fixed: added closing parenthesis
print("10 * 5 =", multiply(10, 5))
print("10 / 0 =", divide(10, 0))
```

## 💻 Code Example 2: Handling Runtime Errors

Create a script that will fail at runtime, `file_reader.py`:

```python
# file_reader.py — A file reader with runtime errors

def read_and_process(filename):
    """Read a file and count words per line"""
    # Open the file (will error if the file doesn't exist)
    with open(filename, 'r') as f:
        lines = f.readlines()

    # Count words per line (will error if the file is empty)
    total_words = 0
    for i in range(len(lines) + 1):    # Deliberately reads one extra line — will go out of bounds
        words = lines[i].split()
        total_words += len(words)

    average = total_words / len(lines)  # Division by zero if file is empty
    print(f"Total words: {total_words}")
    print(f"Average per line: {average:.1f} words")

# Try to read a file that doesn't exist
read_and_process("nonexistent.txt")
```

Tell Claude Code:

```
Please run file_reader.py, then help me fix all the errors.
I want it to:
1. Handle the case where the file doesn't exist gracefully
2. Handle empty files
3. Fix the index out of range bug
```

### Expected Output:

Claude Code will attempt to run it, see the error, then analyze and fix it:

📸 [What you should see]
```
┌──────────────────────────────────────────────────────┐
│ Error running file_reader.py:                         │
│                                                       │
│ FileNotFoundError: [Errno 2] No such file or          │
│ directory: 'nonexistent.txt'                          │
│                                                       │
│ I found 3 issues and am fixing them:                  │
│                                                       │
│ 1. No handling for file not found                     │
│    → Adding try/except FileNotFoundError              │
│                                                       │
│ 2. range(len(lines) + 1) will exceed list bounds      │
│    → Changing to range(len(lines))                    │
│                                                       │
│ 3. Empty file will cause division by zero             │
│    → Adding a len(lines) == 0 check                   │
└──────────────────────────────────────────────────────┘
```

## 📖 How to Effectively Describe Errors to Claude Code

When communicating errors to Claude Code, the more information you provide the better. Here are some effective ways to describe errors:

### Good Descriptions

```
When running organize.py I got this error:
FileNotFoundError: [Errno 2] No such file or directory: 'downloads'
I was running it from the ~/claude-practice/auto-organizer/ directory.
```

```
The program runs, but the result is wrong.
I input [80, 90, 70], expected an average of 80, but the program shows 93.3.
```

```
This script was working fine yesterday, but suddenly throws an error today.
The error message is ConnectionRefusedError.
I haven't changed any code.
```

### Not-so-good Descriptions

```
The program is broken, fix it.         ← Too vague — Claude Code doesn't know what's broken
```

```
There's an error.                      ← No error message provided
```

**Remember this formula**:
> **[When] + [What you did] + [What you expected] + [What actually happened / error message]**

## 📖 Common Error Quick Reference

| Error Message | Meaning | Common Cause |
|----------|------|---------|
| `SyntaxError` | Syntax error | Missing colon, mismatched brackets, typos |
| `NameError` | Variable not found | Misspelled variable name, forgot to define it |
| `TypeError` | Wrong type | Using text as a number, wrong number of arguments |
| `IndexError` | Index out of range | List has only 3 items but you tried to access the 4th |
| `FileNotFoundError` | File doesn't exist | Wrong path, misspelled filename |
| `ZeroDivisionError` | Division by zero | Denominator is zero |
| `IndentationError` | Indentation error | Inconsistent number of spaces |
| `ModuleNotFoundError` | Module not found | Package not installed |
| `KeyError` | Key not found | Dictionary doesn't contain that key |
| `PermissionError` | No permission | File is locked or insufficient permissions |

When you encounter any of these errors, just copy and paste the full error message to Claude Code!

## ✍️ Hands-on Exercises

### Exercise 1: Fix a Shopping Cart Program

Create this intentionally buggy file, `shopping_cart.py`:

```python
# shopping_cart.py — A shopping cart full of bugs

cart = []

def add_item(name, price, quantity)    # Bug 1
    item = {"name": name, "price": price, "quantity": quantity}
    cart.appen(item)                    # Bug 2

def calculate_total():
    total = 0
    for item in cart:
        subtotal = item["price"] * item["qauntity"]  # Bug 3
        total += subtotal
    return total

def apply_discount(total, discount_percent):
    discount = total * discount_percent  # Bug 4: Percentage not divided by 100
    return total - discount

# Test the program
add_item("Apple", 3.5, 2)
add_item("Bread", 4.0, 1)
add_item("Milk", 5.5, 3)

total = calculate_total()
print(f"Subtotal: ${total}")

final = apply_discount(total, 10)      # 10% discount
print(f"After discount: ${final}")     # Bug 5: 10% discount result is wrong
```

Start Claude Code and say:

```
Please run shopping_cart.py, fix all the bugs,
and after fixing them, explain what each bug was and how you fixed it.
```

**Tip**: This file has 5 bugs (syntax errors, typos, and logic errors). See if Claude Code can find them all!

### Exercise 2: Debug a Number Guessing Game

Create `guess_game.py`:

```python
# guess_game.py — Number guessing game (buggy)
import random

secret = random.randint(1, 10)
print("I'm thinking of a number between 1 and 10. Guess!")

for attempt in range(3):
    guess = input(f"Guess #{attempt}: ")     # Bug: Should start from 1
    
    if guess == secret:                        # Bug: Type comparison issue
        print("Correct!")
        break
    elif guess < secret:                       # Bug: Can't compare string with number
        print("Too low!")
    else:
        print("Too high!")
else:
    print(f"Three wrong guesses. The answer was {secret}")
```

Tell Claude Code:

```
This number guessing game has several bugs. Please find and fix them.
The problems I've noticed: the attempt number displays incorrectly,
and you can never guess correctly.
```

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. A program runs successfully but produces the wrong result. What type of error is this most likely?</p>
<label><input type="radio" name="q1" value="0"> Syntax Error</label>
<label><input type="radio" name="q1" value="1"> Logic Error</label>
<label><input type="radio" name="q1" value="2"> Runtime Error</label>
<label><input type="radio" name="q1" value="3"> Installation Error</label>
<div class="quiz-explain">Syntax errors prevent the program from running at all. Runtime errors cause it to crash midway. Only logic errors allow a program to run "successfully" but produce the wrong result — like a GPS that smoothly takes you to the wrong destination.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. When describing an error to Claude Code, what information is most helpful?</p>
<label><input type="radio" name="q2" value="0"> Just saying "the program is broken"</label>
<label><input type="radio" name="q2" value="1"> The complete error message, the command you ran, and the result you expected</label>
<label><input type="radio" name="q2" value="2"> Your computer's brand and model</label>
<label><input type="radio" name="q2" value="3"> The date you bought your computer</label>
<div class="quiz-explain">Just like describing symptoms to a doctor, providing the full error message, what you did, and what you expected lets Claude Code find the problem and solution as quickly as possible.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. What is the correct order of the debugging cycle?</p>
<label><input type="radio" name="q3" value="0"> Fix, Identify, Verify, Understand</label>
<label><input type="radio" name="q3" value="1"> Understand, Fix, Identify, Verify</label>
<label><input type="radio" name="q3" value="2"> Identify, Understand, Fix, Verify</label>
<label><input type="radio" name="q3" value="3"> Verify, Fix, Understand, Identify</label>
<div class="quiz-explain">The correct order is: discover the problem (Identify), figure out why it went wrong (Understand), modify the code (Fix), then test again to confirm the problem is resolved (Verify). If there are still issues, repeat the cycle.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

In the next module, **3.4: Testing and Quality Assurance**, you'll learn how to prevent errors **before** they happen — by writing tests that automatically check whether your code is correct. It's like tasting your seasoning while cooking, rather than waiting until the entire dish is done to discover you added too much salt!
