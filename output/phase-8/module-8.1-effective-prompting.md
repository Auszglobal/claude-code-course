# Module 8.1: Effective Prompting for Claude Code

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand why prompting Claude Code is different from chatting with ChatGPT
  - Apply five proven prompting patterns for better results
  - Avoid common prompting mistakes that waste time and tokens
  - Write clear, actionable instructions that Claude Code can execute precisely
  - Know when to start a new conversation vs continue the current one

## 📖 Theory

### Why Claude Code Prompting Is Different

Talking to Claude Code is **not** like chatting with ChatGPT or Claude Chat. Here's why:

| | Claude Chat | Claude Code |
|---|---|---|
| Context | Only your conversation | Your conversation + entire codebase |
| Actions | Can only write text | Can read files, edit code, run commands |
| Consequences | No real-world impact | Changes real files on your computer |
| Precision needed | Low — "explain recursion" works fine | High — "fix the bug" is too vague |

Think of it this way: Claude Chat is like asking a teacher a question. Claude Code is like **briefing a new colleague who just joined your team**. They're smart, but they haven't seen your code, don't know your conventions, and need clear direction.

### The Briefing Mental Model

Every good prompt to Claude Code should answer three questions:

1. **What** do you want done? (the task)
2. **Where** should it happen? (the files, functions, or scope)
3. **Why** or **how**? (constraints, approach, or context)

### Five Prompting Patterns That Work

#### Pattern 1: Task Decomposition
Break complex work into ordered steps.

```
❌ Bad:  "Refactor the authentication system"
✅ Good: "First, extract the password hashing logic from auth.py into a new 
         file called crypto.py. Then update all imports in auth.py and 
         test_auth.py. Finally, run the tests to make sure nothing broke."
```

#### Pattern 2: Constraint-First
Tell Claude what NOT to do before what to do.

```
❌ Bad:  "Fix the login bug"
✅ Good: "Don't modify any test files. The login bug is in src/auth/login.py 
         — the session token isn't being refreshed after password change. 
         Fix only that logic."
```

#### Pattern 3: Example-Driven
Point to existing code as a reference.

```
❌ Bad:  "Add a new API endpoint for orders"
✅ Good: "Add a new API endpoint for orders, following the same pattern as 
         the users endpoint in src/routes/users.py — same error handling 
         style, same response format."
```

#### Pattern 4: Iterative Refinement
Give Claude a strategy, not just a goal.

```
❌ Bad:  "Make the page load faster"
✅ Good: "The dashboard page is slow. First, check if there are any N+1 
         database queries in dashboard_view.py. If so, fix those first. 
         If the page is still slow, look at whether we can cache the 
         stats calculation."
```

#### Pattern 5: Scope Limiting
Draw clear boundaries around the work.

```
❌ Bad:  "Update the styling"
✅ Good: "Only change files in src/components/Header/. Update the nav 
         links to use the new brand colour #008B8B. Don't touch any 
         other components."
```

### Common Prompting Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Too vague | "Fix the code" — which code? Which bug? | Name the file, line, and error |
| Too controlling | Writing out exact code for Claude to paste | Describe the goal, let Claude choose the implementation |
| Missing context | "Add validation" — to what? Where? | "Add email validation to the signup form in register.py" |
| Kitchen sink | Asking for 10 things at once | One task per prompt, or numbered steps |
| No success criteria | "Make it better" — how will you know? | "The test in test_api.py should pass after this change" |

## 💻 Code Example 1: Bad vs Good Prompts in Action

Let's see the difference in practice. Imagine you have a Python web app with a bug where users can't log out.

### Bad Prompt:
```
> Fix the logout bug
```

Claude Code might:
- Search the entire codebase for "logout" (slow)
- Find multiple files and guess which one has the bug
- Make changes you didn't expect
- Fix the wrong thing entirely

### Good Prompt:
```
> There's a bug in src/auth/session.py — the logout() function on line 45 
  clears the session dict but doesn't invalidate the cookie. The cookie 
  name is "session_id" and it's set in the login() function above. Fix 
  logout() to also delete the cookie. Don't change login().
```

[What you should see]
```
+--------------------------------------------------+
| Claude Code reads src/auth/session.py            |
| Identifies the logout() function                 |
| Adds cookie deletion logic                       |
| Shows you the diff for review                    |
+--------------------------------------------------+
```

Claude Code goes straight to the right file, understands the exact problem, and makes a surgical fix.

## 💻 Code Example 2: Using Slash Commands for Context Management

As your conversation grows, Claude Code's context window fills up. Here's how to manage it:

```bash
# Check how much context you've used
/cost

# Compress the conversation to free up space
/compact

# Clear everything and start fresh
/clear
```

### When to use /compact:
```
> /compact
```

[What you should see]
```
+--------------------------------------------------+
| Conversation compacted.                          |
| Previous context summarised.                     |
| You can continue working with full context       |
| awareness but reduced token usage.               |
+--------------------------------------------------+
```

### When to start a new conversation:
- You're switching to a completely different task
- The current conversation has too many failed attempts
- You want Claude to look at the code with "fresh eyes"

### When to continue the current conversation:
- You're iterating on the same feature
- Claude needs to remember decisions you made earlier
- You're in the middle of a multi-step task

## 💻 Supplementary Example: The Prompt Improvement Checklist

Before sending a prompt, run through this checklist:

| Check | Question |
|-------|----------|
| ✓ Specific | Did I name the file(s) and function(s)? |
| ✓ Scoped | Did I say what NOT to change? |
| ✓ Actionable | Can Claude start working immediately, or does it need to ask me questions first? |
| ✓ Verifiable | How will I know this is done correctly? |
| ✓ Sized right | Is this one task, or should I break it into steps? |

### Prompt Templates You Can Reuse

**Bug fix:**
```
There's a [error type] in [file:line]. The [function] does [wrong behaviour] 
but should [correct behaviour]. Fix only that function. Run the tests after.
```

**New feature:**
```
Add [feature] to [file/component]. Follow the same pattern as [existing example]. 
Only modify files in [directory]. The feature should [acceptance criteria].
```

**Refactor:**
```
Extract [logic] from [source file] into [new file]. Update all imports. 
Don't change any behaviour — the existing tests should still pass.
```

## ✍️ Hands-On Exercisess

### Exercise 1: Rewrite Bad Prompts
Take these vague prompts and rewrite them using the patterns above:

1. "Add error handling to the app"
2. "The tests are failing, fix them"
3. "Make the code cleaner"
4. "Add a new page to the website"

> Tip: For each one, ask yourself: What file? What function? What specifically should change? What shouldn't change?

### Exercise 2: Prompt a Real Task
1. Open a project you're working on
2. Identify one small improvement you'd like to make
3. Write a prompt using the Constraint-First pattern
4. Send it to Claude Code and observe how precisely it executes
5. Refine your prompt if the result wasn't what you expected

> Tip: The more specific your first prompt, the fewer follow-up messages you'll need. One precise prompt beats five rounds of "no, not that."

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. Why is prompting Claude Code different from chatting with Claude Chat?</p>
<label><input type="radio" name="q1" value="0"> Claude Code is less intelligent and needs simpler instructions</label>
<label><input type="radio" name="q1" value="1"> Claude Code only understands programming languages, not natural language</label>
<label><input type="radio" name="q1" value="2"> Claude Code takes real actions on your files, so precision and scope matter more</label>
<label><input type="radio" name="q1" value="3"> There is no difference — the same prompts work equally well</label>
<div class="quiz-explain">Claude Code can read, edit, and delete real files on your computer. Vague prompts can lead to unintended changes, so you need to be more specific about what to change, where, and what to leave alone.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. Which prompting pattern is best when you want Claude Code to NOT modify certain files?</p>
<label><input type="radio" name="q2" value="0"> Task Decomposition — break the work into steps</label>
<label><input type="radio" name="q2" value="1"> Constraint-First — state what not to do before what to do</label>
<label><input type="radio" name="q2" value="2"> Example-Driven — point to existing code as reference</label>
<label><input type="radio" name="q2" value="3"> Iterative Refinement — try approach A, then B</label>
<div class="quiz-explain">The Constraint-First pattern puts boundaries on Claude's work before giving it the task. Saying "Don't modify test files" up front prevents unwanted changes.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>3. When should you start a new conversation instead of continuing the current one?</p>
<label><input type="radio" name="q3" value="0"> Every time you send a new prompt</label>
<label><input type="radio" name="q3" value="1"> Only when Claude Code crashes</label>
<label><input type="radio" name="q3" value="2"> After every successful task completion</label>
<label><input type="radio" name="q3" value="3"> When switching to a completely different task or when the conversation has too many failed attempts</label>
<div class="quiz-explain">Starting fresh makes sense when you're moving to an unrelated task or when the current conversation is cluttered with failed attempts. For iterative work on the same feature, continuing the conversation preserves useful context.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. Which prompting pattern should you use when you want Claude Code to follow the style of existing code?</p>
<label><input type="radio" name="q4" value="0"> Example-Driven — point to existing code as a reference</label>
<label><input type="radio" name="q4" value="1"> Scope Limiting — restrict which files to touch</label>
<label><input type="radio" name="q4" value="2"> Task Decomposition — break work into steps</label>
<label><input type="radio" name="q4" value="3"> Constraint-First — state what NOT to do</label>
<div class="quiz-explain">The Example-Driven pattern tells Claude to follow the same pattern as existing code (e.g., "follow the same pattern as src/routes/users.py"). This ensures consistency without you having to describe every detail of the coding style.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>5. What is wrong with the prompt: "Make the code better"?</p>
<label><input type="radio" name="q5" value="0"> Claude Code doesn't understand English</label>
<label><input type="radio" name="q5" value="1"> The prompt is too long and wastes tokens</label>
<label><input type="radio" name="q5" value="2"> It has no success criteria — "better" is subjective and Claude doesn't know when the task is done</label>
<label><input type="radio" name="q5" value="3"> Claude Code can only fix bugs, not improve code</label>
<div class="quiz-explain">Without clear success criteria, Claude has to guess what "better" means. A specific prompt like "Reduce the function to under 20 lines while keeping all tests passing" gives Claude a measurable target.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. You have a complex task: extract auth logic from one file, create a new file, update all imports, and run tests. Which pattern fits best?</p>
<label><input type="radio" name="q6" value="0"> Constraint-First</label>
<label><input type="radio" name="q6" value="1"> Task Decomposition — break it into ordered steps</label>
<label><input type="radio" name="q6" value="2"> Scope Limiting</label>
<label><input type="radio" name="q6" value="3"> Example-Driven</label>
<div class="quiz-explain">Task Decomposition breaks complex work into numbered steps that Claude executes in order. This is ideal when there's a clear sequence: first extract, then update imports, then test. Each step builds on the previous one.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. What does the /compact command do and when should you use it?</p>
<label><input type="radio" name="q7" value="0"> It compresses your code files to save disk space — use it when your hard drive is full</label>
<label><input type="radio" name="q7" value="1"> It deletes old messages — use it every few minutes</label>
<label><input type="radio" name="q7" value="2"> It reformats your code — use it before committing</label>
<label><input type="radio" name="q7" value="3"> It summarises the conversation to free up context space — use it when the context is filling up</label>
<div class="quiz-explain">/compact summarises the conversation history into a shorter form while keeping key decisions and context. Use it proactively when working on long tasks to prevent the context window from filling up completely.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. Before sending a prompt to Claude Code, which of these is NOT on the recommended checklist?</p>
<label><input type="radio" name="q8" value="0"> Is the task specific enough? (Did I name files and functions?)</label>
<label><input type="radio" name="q8" value="1"> Is the scope clear? (Did I say what NOT to change?)</label>
<label><input type="radio" name="q8" value="2"> Is the prompt written in a formal academic style?</label>
<label><input type="radio" name="q8" value="3"> Is it verifiable? (How will I know it's done correctly?)</label>
<div class="quiz-explain">The checklist focuses on specificity, scope, actionability, verifiability, and right-sizing. Formal academic style is irrelevant — Claude Code responds equally well to casual language as long as the instruction is clear and precise.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Great work! You now know how to communicate effectively with Claude Code. In the next module, **8.2: Context, Cost & Model Selection**, we'll learn how to manage your token budget, choose the right model for each task, and keep your costs under control.
