# Module 3.4: Testing and Quality Assurance

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Understand what testing is and why it's important
  - Ask Claude Code to write tests for your code
  - Run tests and understand the results (pass/fail)
  - Understand how testing saves time in the long run
  - Write comprehensive tests for a simple function

## 📖 Theory

### What Is Testing?

Imagine you're **buying a used car**. What would you do?
- Test drive it to check if the engine has any problems
- Check whether the brakes work properly
- Toggle the lights and windshield wipers on and off
- Make sure the air conditioning works

These "try it and see" actions are **testing**.

In software development, testing means writing small programs that automatically check whether your main program works correctly. For example:
- Addition function: input 2 + 3, result should be 5
- Discount function: $100 at 20% off, result should be $80
- Sort function: input [3, 1, 2], result should be [1, 2, 3]

### Why Write Tests?

| Without Tests | With Tests |
|---------|---------|
| Change one thing, no idea if it breaks something else | Run tests after every change, immediately know if there's a problem |
| Discover bugs after going live — expensive to fix | Catch bugs before release — cheap to fix |
| Come back to the code three months later, not sure what still works | Run tests and you'll know right away if everything is fine |
| Manually test every feature each time | One command to automatically test everything |

**Everyday analogy**: Testing is like **tasting as you cook**. If you wait until the entire dish is done to take your first bite and discover there's too much salt, it's too late. But if you taste after each seasoning, you can make sure the flavor is just right.

### Basic Concepts of Testing

A test consists of three parts (think of it as three steps):

1. **Arrange** — Prepare the data needed for the test
2. **Act** — Execute the feature you want to test
3. **Assert** — Check whether the result matches expectations

Like the process of test-driving a car:
1. **Arrange**: Sit in the driver's seat, buckle up
2. **Act**: Turn the key, press the gas pedal
3. **Assert**: Did the engine start normally?

### Python's Testing Tool: pytest

Python has a very useful testing tool called `pytest`. It can:
- Automatically find all test files
- Run all tests
- Clearly tell you which passed and which failed

First, install pytest:

**Windows (Git Bash):**
```bash
pip install pytest
```

**Mac/Linux:**
```bash
pip3 install pytest
```

## 💻 Code Example 1: Writing Tests for a Calculator

Let's build a simple calculator, then write tests for it.

Set up the practice environment:

```bash
mkdir -p ~/claude-practice/testing
cd ~/claude-practice/testing
```

First, create the program we want to test, `calculator.py`:

```python
# calculator.py — Simple calculator

def add(a, b):
    """Add two numbers"""
    return a + b

def subtract(a, b):
    """Subtract two numbers"""
    return a - b

def multiply(a, b):
    """Multiply two numbers"""
    return a * b

def divide(a, b):
    """Divide two numbers, returns error when dividing by zero"""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def percentage(amount, percent):
    """Calculate a percentage, e.g., 15% of 200 = 30"""
    return amount * percent / 100
```

Now start Claude Code:

```bash
cd ~/claude-practice/testing
claude
```

Tell Claude Code:

```
Please write tests for all the functions in calculator.py.
Use pytest format and save to test_calculator.py.
Each function should have at least 3 test cases, including:
1. Normal cases
2. Edge cases (e.g., 0, negative numbers)
3. Error cases (e.g., division by zero)
```

Claude Code will generate a test file similar to this:

```python
# test_calculator.py — Test file for calculator.py
import pytest                              # Import the testing framework
from calculator import add, subtract, multiply, divide, percentage

# ===== Tests for the add function =====

def test_add_positive_numbers():
    """Test: adding two positive numbers"""
    result = add(2, 3)                     # Act: calculate 2 + 3
    assert result == 5                     # Assert: result should be 5

def test_add_negative_numbers():
    """Test: adding negative numbers"""
    result = add(-1, -1)
    assert result == -2

def test_add_zero():
    """Test: adding zero"""
    result = add(5, 0)
    assert result == 5                     # Any number plus zero should equal itself

# ===== Tests for the subtract function =====

def test_subtract_basic():
    """Test: basic subtraction"""
    assert subtract(10, 3) == 7

def test_subtract_negative_result():
    """Test: result is negative"""
    assert subtract(3, 10) == -7

def test_subtract_same_numbers():
    """Test: subtracting equal numbers"""
    assert subtract(5, 5) == 0

# ===== Tests for the multiply function =====

def test_multiply_basic():
    """Test: basic multiplication"""
    assert multiply(4, 5) == 20

def test_multiply_by_zero():
    """Test: multiplying by zero"""
    assert multiply(100, 0) == 0           # Any number times zero is zero

def test_multiply_negative():
    """Test: multiplying negative numbers"""
    assert multiply(-3, -4) == 12          # Negative times negative is positive

# ===== Tests for the divide function =====

def test_divide_basic():
    """Test: basic division"""
    assert divide(10, 2) == 5

def test_divide_decimal_result():
    """Test: result is a decimal"""
    assert divide(7, 2) == 3.5

def test_divide_by_zero():
    """Test: dividing by zero should raise an error"""
    with pytest.raises(ValueError):        # Expect a ValueError to be raised
        divide(10, 0)

# ===== Tests for the percentage function =====

def test_percentage_basic():
    """Test: basic percentage"""
    assert percentage(200, 15) == 30       # 15% of 200 = 30

def test_percentage_hundred():
    """Test: 100% equals the original number"""
    assert percentage(50, 100) == 50

def test_percentage_zero():
    """Test: 0% equals zero"""
    assert percentage(1000, 0) == 0
```

### Expected Output:

Ask Claude Code to run the tests:

```
Please run pytest test_calculator.py -v
```

`-v` stands for verbose mode, which shows the result of each individual test.

📸 [What you should see]
```
┌────────────────────────────────────────────────────────┐
│ ======================== test session starts ========== │
│ collected 15 items                                     │
│                                                        │
│ test_calculator.py::test_add_positive_numbers PASSED   │
│ test_calculator.py::test_add_negative_numbers PASSED   │
│ test_calculator.py::test_add_zero PASSED               │
│ test_calculator.py::test_subtract_basic PASSED         │
│ test_calculator.py::test_subtract_negative_result PASSED│
│ test_calculator.py::test_subtract_same_numbers PASSED  │
│ test_calculator.py::test_multiply_basic PASSED         │
│ test_calculator.py::test_multiply_by_zero PASSED       │
│ test_calculator.py::test_multiply_negative PASSED      │
│ test_calculator.py::test_divide_basic PASSED           │
│ test_calculator.py::test_divide_decimal_result PASSED  │
│ test_calculator.py::test_divide_by_zero PASSED         │
│ test_calculator.py::test_percentage_basic PASSED       │
│ test_calculator.py::test_percentage_hundred PASSED     │
│ test_calculator.py::test_percentage_zero PASSED        │
│                                                        │
│ ================= 15 passed in 0.03s ================= │
└────────────────────────────────────────────────────────┘
```

**15 passed** — All 15 tests passed! A green PASSED indicates success.

## 💻 Code Example 2: What Happens When a Test Fails?

Let's intentionally break a test to see what happens.

Tell Claude Code:

```
Please modify the percentage function in calculator.py and deliberately break it
(e.g., forget to divide by 100), then rerun the tests so I can see what a failure looks like.
```

Claude Code will change the `percentage` function to:

```python
def percentage(amount, percent):
    """Calculate a percentage (deliberately broken!)"""
    return amount * percent    # Forgot to divide by 100!
```

Then run the tests:

📸 [What you should see]
```
┌────────────────────────────────────────────────────────┐
│ ======================== test session starts ========== │
│ collected 15 items                                     │
│                                                        │
│ test_calculator.py::test_add_positive_numbers PASSED   │
│ ...(first 12 tests all pass)...                        │
│ test_calculator.py::test_percentage_basic FAILED       │
│ test_calculator.py::test_percentage_hundred FAILED     │
│ test_calculator.py::test_percentage_zero PASSED        │
│                                                        │
│ ==================== FAILURES ======================== │
│ _____________ test_percentage_basic _________________  │
│                                                        │
│     assert percentage(200, 15) == 30                   │
│ E   assert 3000 == 30                                  │
│ E    +  where 3000 = percentage(200, 15)               │
│                                                        │
│ ============== 2 failed, 13 passed in 0.03s ========== │
└────────────────────────────────────────────────────────┘
```

See that? The test clearly tells you:
- `percentage(200, 15)` should return `30`, but it actually returned `3000`
- That's because it forgot to divide by 100: 200 * 15 = 3000, instead of 200 * 15 / 100 = 30

**This is the value of testing**: Without tests, you might not discover the problem until a customer complains about an incorrect bill!

Then tell Claude Code:

```
The tests failed. Please change the percentage function back to the correct version.
```

## 📖 Testing Best Practices

### 1. Use Clear Test Names

```python
# Good naming: you can tell what's being tested just by reading the function name
def test_divide_by_zero_raises_error():
    ...

# Bad naming: no idea what's being tested
def test_1():
    ...
```

### 2. Each Test Should Verify Only One Thing

```python
# Good: one test, one thing
def test_add_returns_correct_sum():
    assert add(2, 3) == 5

# Bad: too many things crammed into one test
def test_everything():
    assert add(2, 3) == 5
    assert subtract(5, 3) == 2
    assert multiply(2, 3) == 6
```

### 3. Test Edge Cases

Edge cases are "extreme" inputs, such as:
- Zero (0)
- Negative numbers
- Very large numbers
- Empty string `""`
- Empty list `[]`

These edge cases are often where bugs are most likely to occur.

### 4. Let Claude Code Help You Think of Test Cases

You can ask something like:

```
I have a function that calculates age. Please help me think of all the cases
that need testing, including normal cases and edge cases that might cause problems.
```

Claude Code will help you think of scenarios you might have missed.

## ✍️ Hands-on Exercises

### Exercise 1: Write Tests for String Utility Functions

First, create `string_utils.py`:

```python
# string_utils.py — String utility functions

def reverse_string(text):
    """Reverse a string, e.g., 'hello' -> 'olleh'"""
    return text[::-1]

def count_vowels(text):
    """Count the number of vowels (a, e, i, o, u)"""
    vowels = 'aeiouAEIOU'
    return sum(1 for char in text if char in vowels)

def is_palindrome(text):
    """Check if a string is a palindrome (reads the same forwards and backwards)"""
    cleaned = text.lower().replace(' ', '')
    return cleaned == cleaned[::-1]

def truncate(text, max_length):
    """Truncate text, adding '...' if it exceeds the max length"""
    if len(text) <= max_length:
        return text
    return text[:max_length - 3] + '...'
```

Tell Claude Code:

```
Please write at least 3 tests for each function in string_utils.py,
including normal cases and edge cases (empty strings, single characters, etc.).
Save to test_string_utils.py, then run the tests.
```

**Tip**: Pay attention to the `is_palindrome` function — "racecar" and "A man a plan a canal Panama" are both palindromes. What about an empty string?

### Exercise 2: Test-driven Bug Fixing

Create a buggy function along with its tests, and let Claude Code fix the function to make all tests pass:

```python
# temperature.py — Temperature conversion (buggy)

def celsius_to_fahrenheit(celsius):
    """Celsius to Fahrenheit: F = C * 9/5 + 32"""
    return celsius * 9 / 5 + 32

def fahrenheit_to_celsius(fahrenheit):
    """Fahrenheit to Celsius: C = (F - 32) * 5/9"""
    return fahrenheit - 32 * 5 / 9          # Bug! Operator precedence is wrong

def is_freezing(celsius):
    """Check if the temperature is at or below freezing"""
    return celsius < 0                       # Bug! 0 degrees is also freezing
```

Tell Claude Code:

```
Please first write comprehensive tests for temperature.py (test_temperature.py).
Then run the tests, find which ones fail, and fix the bugs in temperature.py
so that all tests pass.
```

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. Why should you write tests?</p>
<label><input type="radio" name="q1" value="0"> Because the boss requires it</label>
<label><input type="radio" name="q1" value="1"> To make the program run faster</label>
<label><input type="radio" name="q1" value="2"> To automatically check if code is correct, and quickly confirm nothing broke after changes</label>
<label><input type="radio" name="q1" value="3"> To make the codebase look bigger</label>
<div class="quiz-explain">The core value of testing is automated verification. When you modify code, you only need to run the tests once to know if you accidentally broke something else. This is much faster and more reliable than manual checking every time.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. When pytest shows "3 failed, 12 passed", what does that mean?</p>
<label><input type="radio" name="q2" value="0"> The entire program is broken and needs to be rewritten</label>
<label><input type="radio" name="q2" value="1"> Out of 15 tests, 12 passed and 3 found issues that need fixing</label>
<label><input type="radio" name="q2" value="2"> 3 new packages need to be installed</label>
<label><input type="radio" name="q2" value="3"> The computer needs to be restarted</label>
<div class="quiz-explain">pytest clearly tells you which tests passed and which failed. 3 failures mean 3 places where the functionality doesn't match expectations — you only need to fix those 3 issues.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. Which of the following is a good test case?</p>
<label><input type="radio" name="q3" value="0"> <code>def test_1(): pass</code></label>
<label><input type="radio" name="q3" value="1"> <code>def test_add_two_positive_numbers(): assert add(2, 3) == 5</code></label>
<label><input type="radio" name="q3" value="2"> <code>def test(): add(2, 3)</code></label>
<label><input type="radio" name="q3" value="3"> <code>def check_add(): return add(2, 3) == 5</code></label>
<div class="quiz-explain">A good test needs: a clear name (describes what's being tested), uses assert to verify the result, and the function name starts with test_ (so pytest can find it). Option A tests nothing, C doesn't verify the result, and D isn't in pytest format.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Congratulations on completing all of Phase 3! You've learned:
- Multi-file operations and refactoring (3.1)
- Writing automation scripts (3.2)
- Debugging and error fixing (3.3)
- Testing and quality assurance (3.4)

In the upcoming **Phase 4: Advanced Applications**, you'll start using Claude Code to build truly practical projects — including API integration, web development, and more complex automation workflows. You now have a solid foundation and are ready for bigger challenges!
