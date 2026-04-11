# Module B4: Build Your Own Skill from Scratch

## Learning Objectives
- After completing this lesson you will be able to:
  - Understand the complete structure of a Skill (SKILL.md format) and the purpose of each section
  - Explain how the Progressive Disclosure mechanism saves tokens
  - Write a complete SKILL.md file from scratch
  - Install and test your custom Skill locally
  - Build a dedicated Skill for your most frequently repeated tasks

## Theory

### What Is a Skill?

In previous modules, we learned that CLAUDE.md is like an AI's notebook. Well, **a Skill is like an AI's professional technique manual**.

Imagine you've opened a restaurant:

- **CLAUDE.md** is the "employee handbook" -- general rules that all staff must read (e.g., wear the uniform, greet customers when they arrive)
- **A Skill** is a "professional recipe book" -- only opened when a specific dish needs to be made (e.g., when a customer orders tiramisu, you pull out the detailed tiramisu recipe)

This "only open when needed" design is very important. We call it **Progressive Disclosure**.

### How Does Progressive Disclosure Work?

Claude Code processes Skills in two stages:

**Stage 1: Read the Cover (extremely cheap, ~100 tokens)**

When Claude Code starts up, it only reads the "cover" of each SKILL.md -- the metadata block at the top. It's like quickly scanning book titles and summaries in a bookstore to decide whether to pick one up.

```
[Claude Code's Skill loading process at startup]
+--------------------------------------------+
|  Loading Skill metadata...                  |
|  + generate-python -- Generate PEP8 Python  |
|    scripts                                  |
|  + deploy-blog -- Build and deploy React    |
|    blog                                     |
|  + backup-agents -- Git backup automation   |
|    scripts                                  |
|  Loaded 3 Skills (~300 tokens total)        |
+--------------------------------------------+
```

**Stage 2: Open the Full Text (loaded only when needed, up to ~5,000 tokens)**

When your instruction matches a Skill's trigger conditions, Claude Code loads that Skill's complete content. It's like a chef opening the recipe page only when a customer orders that specific dish.

```
[Loading process when a Skill is triggered]
+--------------------------------------------------+
|  > Help me write a Python script to process a    |
|    CSV file                                      |
|                                                  |
|  Matched Skill: generate-python                  |
|  Loading full instructions... (~2,500 tokens)    |
|  Generating Python script following PEP8...      |
+--------------------------------------------------+
```

The benefit of this design: if you have 20 Skills installed but only use 1 this time, you only pay the full token cost for that 1 Skill. The other 19 only cost a tiny "cover" amount.

### Complete Structure of SKILL.md

Every Skill is a `SKILL.md` file placed in the `.claude/skills/` directory. It consists of two main parts:

| Part | Content | When It's Loaded |
|------|---------|-----------------|
| **Metadata block** (cover) | Name, description, triggers | At startup (always loaded) |
| **Body content** (full text) | Detailed instructions, templates, examples | When triggered (on demand) |

Let's go through each section:

#### 1. Metadata Block (YAML Front Matter)

```yaml
---
name: skill-name          # Unique identifier for the Skill (English, lowercase, hyphens)
description: One-line description  # Tells Claude "what this Skill does" and "when to use it"
triggers:                  # Trigger word list -- activates when the user says these keywords
  - keyword one
  - keyword two
---
```

- **name**: Like a filename, must be unique, all lowercase, connected with hyphens (`-`)
- **description**: The most critical line! Claude uses this sentence to decide whether to activate the Skill. The clearer you write it, the more accurate the triggering
- **triggers**: When the user's instruction contains these keywords, Claude automatically activates this Skill

#### 2. Body -- When to Use / When NOT to Use

Tells Claude in which situations it should or shouldn't use this Skill. This helps avoid false triggers.

#### 3. Body -- Step-by-Step Instructions

Detailed step-by-step instructions. Claude will follow these steps strictly.

#### 4. Body -- Code Templates

Code templates to ensure Claude generates content with a consistent style and quality.

#### 5. Body -- Examples

Input and expected output examples. Claude is excellent at "learning from examples."

#### 6. Body -- Common Mistakes

Lists common errors. When Claude sees these reminders, it proactively avoids these pitfalls.

## Code Example 1: Building a "Python Script Generator" Skill

Let's build a truly practical Skill -- every time you ask Claude to write Python, it will automatically follow PEP8 standards and include type hints.

### Step 1: Create the Skill File

Run the following command in your terminal:

```bash
# Create the skills directory (if it doesn't exist yet)
mkdir -p ~/.claude/skills

# Create the SKILL.md file
# Windows users: path is %USERPROFILE%\.claude\skills\
# Mac/Linux users: path is ~/.claude/skills/
```

### Step 2: Write the Complete SKILL.md

Save the following content to `~/.claude/skills/generate-python.SKILL.md`:

```markdown
---
name: generate-python
description: >
  Generate Python scripts that strictly follow PEP8 style and include
  type hints. Use this skill whenever the user asks to write, create,
  or generate a Python script, module, or function.
triggers:
  - write a python script
  - generate python
  - create a python function
  - python module
  - PEP8
  - type hints
---

# Generate Python Script (PEP8 + Type Hints)

Generate clean, production-ready Python code that follows PEP8 style
guidelines and includes comprehensive type hints.

## When to Use This Skill
- User asks to write, create, or generate any Python code
- User asks to refactor Python code to follow best practices
- User mentions PEP8, type hints, or Python style

## When NOT to Use This Skill
- User is asking about Python concepts without needing code
- User explicitly says "quick and dirty" or "no need for types"
- User is working in a language other than Python

## Step-by-Step Instructions

1. **Read the requirement** -- Understand what the script needs to do
2. **Plan the structure** -- Identify functions, classes, and modules
3. **Write the code** following ALL of these rules:
   - Every function must have type hints for parameters and return value
   - Every module must start with a docstring
   - Every function/class must have a docstring (Google style)
   - Use `snake_case` for functions/variables, `PascalCase` for classes
   - Maximum line length: 88 characters (Black formatter standard)
   - Group imports: stdlib first, third-party second, local third
   - Add a `if __name__ == "__main__":` block when appropriate
4. **Add error handling** -- Use specific exceptions, never bare `except:`
5. **Include a usage example** in comments or docstring

## Code Templates

### Function Template
```python
def function_name(param1: str, param2: int = 0) -> list[str]:
    """Brief description of what this function does.

    Args:
        param1: Description of param1.
        param2: Description of param2. Defaults to 0.

    Returns:
        Description of what is returned.

    Raises:
        ValueError: When param1 is empty.
    """
    if not param1:
        raise ValueError("param1 cannot be empty")

    result: list[str] = []
    # ... implementation
    return result
```

### Script Template
```python
"""Module docstring: Brief description of what this script does."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any


def main() -> None:
    """Entry point for the script."""
    # ... implementation
    pass


if __name__ == "__main__":
    main()
```

## Examples

### Input
"Write a Python function that reads a CSV file and returns the average"

### Expected Output
```python
"""CSV processing utilities for calculating averages."""

from __future__ import annotations

import csv
from pathlib import Path


def calculate_csv_average(file_path: str | Path, column: str) -> float:
    """Read a CSV file and return the average of a specified column.

    Args:
        file_path: Path to the CSV file.
        column: Name of the column to average.

    Returns:
        The arithmetic mean of the column values.

    Raises:
        FileNotFoundError: When the CSV file does not exist.
        KeyError: When the specified column is not in the CSV.
        ValueError: When column contains non-numeric data.
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"CSV file not found: {path}")

    values: list[float] = []

    with path.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if column not in row:
                raise KeyError(f"Column '{column}' not found in CSV")
            try:
                values.append(float(row[column]))
            except ValueError as e:
                raise ValueError(
                    f"Non-numeric value in column '{column}': {row[column]}"
                ) from e

    if not values:
        return 0.0

    return sum(values) / len(values)


if __name__ == "__main__":
    avg = calculate_csv_average("data.csv", "price")
    print(f"Average: {avg:.2f}")
```

## Common Mistakes
- Do NOT use `Any` as a lazy type hint -- always use the most specific type
- Do NOT use bare `except:` -- always catch specific exceptions
- Do NOT skip docstrings, even for short functions
- Do NOT use `from module import *` -- always import explicitly
- Do NOT forget `from __future__ import annotations` for modern type syntax
```

### Expected Output:

After installing this Skill, every time you tell Claude Code "help me write a Python script," it will automatically:
- Add complete type hints
- Write Google-style docstrings
- Follow PEP8 and the 88-character line width limit
- Add error handling and usage examples

## Code Example 2: Installing and Testing Your Skill

### Step 1: Verify the File Location

The Skill file needs to be in the correct location for Claude Code to detect it.

```bash
# Confirm the skills directory exists
ls ~/.claude/skills/

# You should see:
# generate-python.SKILL.md
```

```
[Confirming the Skill file]
+-----------------------------------------+
|  $ ls ~/.claude/skills/                  |
|  generate-python.SKILL.md                |
+-----------------------------------------+
```

### Step 2: Restart Claude Code

Skill metadata is loaded when Claude Code starts up, so you need to restart after adding a new Skill:

```bash
# Exit the current Claude Code session (if any)
# Press Ctrl+C or type /exit

# Restart Claude Code
claude
```

### Step 3: Trigger the Skill and Observe

Now let's test! Enter an instruction that will trigger the Skill:

```
> Help me write a Python function that converts Celsius to Fahrenheit
```

```
[Screen after the Skill is triggered]
+------------------------------------------------------+
|  > Help me write a Python function that converts     |
|    Celsius to Fahrenheit                             |
|                                                      |
|  [Skill: generate-python activated]                  |
|                                                      |
|  """Temperature conversion utilities."""             |
|                                                      |
|  from __future__ import annotations                  |
|                                                      |
|  def celsius_to_fahrenheit(celsius: float) -> float: |
|      """Convert Celsius to Fahrenheit.               |
|                                                      |
|      Args:                                           |
|          celsius: Temperature in Celsius.            |
|                                                      |
|      Returns:                                        |
|          Temperature in Fahrenheit.                  |
|      """                                             |
|      return celsius * 9.0 / 5.0 + 32.0              |
+------------------------------------------------------+
```

### Step 4: Verify the Skill Is Working

How do you confirm Claude is actually following your Skill's instructions? Check these points:

| Check Item | Without Skill | With Skill |
|-----------|--------------|------------|
| Type Hints | May be missing | Always present (`celsius: float -> float`) |
| Docstring | May be brief or absent | Complete Google-style docstring |
| Import ordering | Random | stdlib / third-party / local groups |
| Error handling | May be missing | Specific exception handling |

### Step 5: Use the /skills Command to Check Load Status

In Claude Code, you can use a slash command to view currently loaded Skills:

```
> /skills
```

This will list all detected Skills and their trigger status.

## Hands-On Exercises

### Exercise: Build a Skill for Your Most Frequently Repeated Task

Everyone has some repetitive work. Let's turn your repeated task into a Skill right now.

**Step 1: Identify Your Repetitive Task**

Think about whether you frequently give similar instructions when using Claude Code. For example:

- "Every time I ask Claude to write JavaScript, I have to remind it to use TypeScript"
- "Every time I create a new project, I have to tell it what directory structure to use"
- "Every time I write SQL queries, I have to remind it to add comments and security checks"

Write down the repetitive task you've found: "Every time I ______, I have to ______"

**Step 2: Fill In the Skill Template**

Create a new file `~/.claude/skills/my-first-skill.SKILL.md` and fill in the following template:

```markdown
---
name: my-task-name
description: >
  [One-line description: what it does + when to use it]
triggers:
  - [trigger word 1]
  - [trigger word 2]
  - [trigger word 3]
---

# [Skill Title]

[One paragraph summarising this Skill's purpose]

## When to Use This Skill
- [Scenario 1]
- [Scenario 2]

## When NOT to Use This Skill
- [Inapplicable scenario 1]
- [Inapplicable scenario 2]

## Step-by-Step Instructions
1. [Step one]
2. [Step two]
3. [Step three]

## Code Templates
[Include code templates you want Claude to follow]

## Examples
### Input
[What the user will say]

### Expected Output
[What Claude should generate]

## Common Mistakes
- [Common mistake 1]
- [Common mistake 2]
```

**Step 3: Test Your Skill**

1. Save the file
2. Restart Claude Code
3. Enter an instruction containing trigger keywords
4. Check whether Claude's output follows your conventions

**Hint**: If the Skill isn't being triggered, check these common issues:
- Is the file in the correct directory (`~/.claude/skills/`)?
- Does the filename end with `.SKILL.md`?
- Does the `description` clearly describe when to use it?
- Do the `triggers` include keywords you're using in your instructions?

## Quiz (3 Questions)

1. What is the main benefit of Progressive Disclosure?
   A. It makes Skills execute faster
   B. It only loads full content when needed, saving token consumption
   C. It makes Skill code shorter
   D. It automatically updates Skill content

   Answer: B -- Claude Code only reads the metadata at startup (~100 tokens). The full instructions (up to ~5,000 tokens) are only loaded when triggered. This means even with many Skills installed, day-to-day usage won't waste large amounts of tokens.

2. In a SKILL.md, which field is most important for Claude's decision on whether to activate a Skill?
   A. `name`
   B. `triggers`
   C. `description`
   D. `Common Mistakes`

   Answer: C -- The `description` is the primary basis for Claude's decision on whether to activate a Skill. It needs to clearly state "what it does" and "when to use it." `triggers` provide supplementary keyword matching, but `description`'s semantic understanding is more critical.

3. You've created a new SKILL.md file, but Claude Code hasn't detected it. What's the most likely reason?
   A. The file is too large
   B. You haven't restarted Claude Code
   C. The computer needs to be rebooted
   D. A Skill licence needs to be purchased

   Answer: B -- Skill metadata is loaded when Claude Code starts up. After adding or modifying a SKILL.md, you need to restart Claude Code for it to detect the changes.

## Next Steps

Congratulations! You've learned how to build your own Skill from scratch. This is one of the most powerful features in advanced Claude Code usage -- you can encapsulate any repetitive work pattern into a Skill so Claude executes to your standards every time.

Suggestions for what's next:
- **Real-world practice**: Try building 2-3 commonly used Skills for your work
- **Sharing and collaboration**: SKILL.md files can be shared with team members via Git, benefiting the whole team
- **Continuous improvement**: Observe Claude's output and keep refining the instructions and examples in your Skills for increasingly precise results

Remember: **A good Skill = clear description + specific steps + real examples**. Master this formula and you can make Claude Code your most capable work partner.
