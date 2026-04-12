# Module B3: Top 10 Must-Have Skills -- Supercharge Your Claude Code

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand what Claude Code Skills are and how they extend Claude Code's capabilities
  - Install and use both official and community-contributed Skills
  - Choose the right combination of Skills for your needs
  - Use the frontend-design Skill to quickly build web pages
  - Use the TDD Skill to practise "write tests first, then code"

## 📖 Theory

### What Are Skills?

Imagine you've hired a very smart assistant (Claude Code) to help you work. This assistant can do anything, but if you give them a **professional handbook**, they can do it better, faster, and more professionally.

**Skills are those professional handbooks.** Each Skill teaches Claude Code a specific set of methods and best practices, making it perform better in a particular area.

Skills are primarily divided into **Official Skills** (made by Anthropic, stable and reliable) and **Community Skills** (contributed by developers worldwide, with many excellent options).

### Installation Syntax

```bash
# Official Skill
npx skills add anthropics/claude-code --skill skill-name

# Community Skill
npx skills add developer-name/repo-name
```

After installation, Skills take effect automatically. The next time you give a relevant instruction, Claude Code will apply that Skill's knowledge.

---

## Top 10 Skills at a Glance

| # | Skill Name | Type | Purpose | Who It's For |
|---|-----------|------|---------|--------------|
| 1 | **frontend-design** | Official | Build professional-grade web UIs | Anyone building websites |
| 2 | **obra/superpowers** | Community | 20+ practical skills collection | Everyone (highly recommended) |
| 3 | **mcp-builder** | Official | Build MCP Servers | Anyone extending tools |
| 4 | **test-driven-development** | Community | Test first, code second | Quality-focused developers |
| 5 | **webapp-testing** | Official | Automated web testing | Web app developers |
| 6 | **skill-creator** | Official | Create custom Skills | Anyone wanting to share Skills |
| 7 | **software-architecture** | Community | Architecture design guidance | Large project developers |
| 8 | **varlock** | Community | Secure environment variable management | Anyone handling secrets |
| 9 | **prompt-engineering** | Community | Advanced prompting techniques | Anyone writing better instructions |
| 10 | **debug-skill** | Community | Real debugger-level debugging | Anyone needing deep debugging |

---

## Detailed Introduction to Each of the Top 10 Skills

### 1. frontend-design (Official) -- Build Professional Web Pages

Makes Claude Code act like a senior frontend designer, creating attractive, responsive, production-ready web pages.

```bash
npx skills add anthropics/claude-code --skill frontend-design
```

> **You say:** "Build me a landing page for a coffee shop with a hero section, menu, and contact form."
> **Claude Code:** Automatically generates complete HTML/CSS/JS with CSS Grid layout, responsive design, colour scheme, and form validation.

**Use cases:** Personal websites, portfolios, product pages, event pages.

### 2. obra/superpowers (Community) -- 20+ Practical Skills Collection

A "skills mega-pack" containing 20+ Skills including TDD, debugging, Git worktree, code review, and more. Maintained by senior developer Jesse Vincent.

```bash
npx skills add obra/superpowers
```

> **You say:** "Use git worktree to fix a bug on a new branch without affecting my current work."
> **Claude Code:** Automatically creates a worktree in a separate directory, switches to a new branch for the fix, and prompts you to merge when done.

**Use cases:** Recommended for everyone. The most comprehensive and well-reviewed collection in the community.

### 3. mcp-builder (Official) -- Build MCP Servers

Guides you step by step through building your own MCP Server, letting Claude Code connect to new external tools and data sources.

```bash
npx skills add anthropics/claude-code --skill mcp-builder
```

> **You say:** "Build an MCP Server to query order data from our internal API."
> **Claude Code:** Creates the project structure, defines tools, sets up API connections, and generates tests and documentation.

**Use cases:** When you want Claude Code to connect to services or databases it doesn't currently support.

### 4. test-driven-development -- Test First, Then Implement

Forces Claude Code to follow the TDD workflow -- write tests first to confirm requirements, then write code to make the tests pass. (Already included in obra/superpowers)

```bash
npx skills add obra/superpowers
```

> **You say:** "Use TDD to write a shipping cost calculator function."
> **Claude Code:** Writes tests first (red) -> writes code to pass the tests (green) -> refactors and optimises.

**Use cases:** When writing any important business logic, to ensure code is correct and reliable.

### 5. webapp-testing (Official) -- Automated Web Testing

Uses the Playwright framework to have Claude Code open a browser, click buttons, fill forms, and verify that web pages work correctly.

```bash
npx skills add anthropics/claude-code --skill webapp-testing
```

> **You say:** "Test the login page to confirm an error message appears with wrong credentials."
> **Claude Code:** Launches a browser, enters wrong credentials, clicks login, checks the error message, and takes a screenshot.

**Use cases:** Testing web forms, login flows, shopping carts, and other interactive features.

### 6. skill-creator (Official) -- Create Your Own Skill

Interactively guides you through creating a custom Skill, packaging your workflows and best practices into a Skill to share with your team or the community.

```bash
npx skills add anthropics/claude-code --skill skill-creator
```

> **You say:** "Create a Skill that makes Claude Code follow our company's Python coding standards."
> **Claude Code:** Asks about the specific standards, creates the Skill definition file, sets up trigger conditions, and tests it.

**Use cases:** When you find yourself giving the same instructions over and over, turn them into a Skill once and for all.

### 7. software-architecture -- Architecture Design Guidance

Makes Claude Code automatically follow Clean Architecture, SOLID principles, and common design patterns.

```bash
npx skills add ComposioHQ/awesome-claude-skills
```

> **You say:** "Help me design the architecture for an order management system."
> **Claude Code:** Separates layers per Clean Architecture, defines entities and use cases, and suggests design patterns.

**Use cases:** When starting a new project or when you need to refactor existing architecture.

### 8. varlock -- Secure Environment Variable Management

Ensures API keys, passwords, and other secrets don't accidentally end up in code or get committed to Git.

```bash
npx skills add BehiSecc/awesome-claude-skills
```

> **You say:** "Set up the project's environment variables, including an API key and database password."
> **Claude Code:** Creates a .env template, verifies .gitignore, uses secure reading methods, and flags sensitive information.

**Use cases:** Any project involving API keys, passwords, tokens, or other sensitive information.

### 9. prompt-engineering -- Advanced Prompting Techniques

Automatically applies Chain-of-Thought, Few-shot, and other techniques when writing AI prompts.

```bash
npx skills add ComposioHQ/awesome-claude-skills
```

> **You say:** "Write a prompt that makes an AI accurately classify customer complaint emails."
> **Claude Code:** Uses structured formatting, adds Few-shot examples, sets up reasoning steps, and handles edge cases.

**Use cases:** Developing AI applications, writing system prompts, optimising LLM output.

### 10. debug-skill -- Real Debugger-Level Debugging

Goes beyond just "reading" code to find problems -- actually launches a debugger, sets breakpoints, inspects variable values, and steps through execution.

```bash
npx skills add BehiSecc/awesome-claude-skills
```

> **You say:** "This function is giving the wrong result. Help me debug it."
> **Claude Code:** Sets breakpoints, launches the debugger, steps through and inspects variables, finds the issue, and provides a fix.

**Use cases:** When console.log isn't enough and you need to deeply trace code execution.

---

## 💻 Code Example 1: Building a Landing Page with frontend-design

### Step 1: Install the Skill

```bash
npx skills add anthropics/claude-code --skill frontend-design
```

[What you should see]
```
+---------------------------------------------+
| Installing skill: frontend-design           |
| Source: anthropics/claude-code               |
| Skill installed successfully                |
+---------------------------------------------+
```

### Step 2: Create the Project and Give Instructions

```bash
mkdir my-landing-page && cd my-landing-page
claude
```

Once inside, type:

```
Build me a landing page for a pet grooming salon.
Requirements:
- Hero section with the title "Five-Star SPA for Your Furry Friends"
- Services section: Bath, Grooming, Boarding, each with an emoji
- Pricing table using card-style layout
- Footer with contact information and business hours
- Warm colour scheme (cream + light orange)
- Mobile-friendly (responsive design)
```

### Expected Output:

Claude Code will generate `index.html` (structure), `styles.css` (styling + responsiveness), and `script.js` (interactive effects). Open `index.html` directly in a browser to view. To make adjustments, just say "make the title bigger" or "change the services section to two columns."

---

## 💻 Code Example 2: Writing Code with the TDD Skill

### Step 1: Install and Create the Project

```bash
npx skills add obra/superpowers

mkdir tdd-demo && cd tdd-demo
npm init -y
npm install jest
```

### Step 2: Develop Using TDD

Launch Claude Code and type:

```
Use TDD to write a calculateDiscount function.
Rules: 10% off above $1000, 20% off above $3000, 30% off above $5000, VIP members get an additional 5% off
```

Claude Code automatically follows the "Red -> Green -> Refactor" cycle:

**Red -- Write tests first (expected to fail):**

```javascript
// calculateDiscount.test.js
const { calculateDiscount } = require('./calculateDiscount');

describe('calculateDiscount', () => {
  test('no discount below $1000', () => {
    expect(calculateDiscount(500, false)).toBe(500);
  });
  test('10% off at $1000 and above', () => {
    expect(calculateDiscount(1000, false)).toBe(900);
  });
  test('20% off at $3000 and above', () => {
    expect(calculateDiscount(3000, false)).toBe(2400);
  });
  test('30% off at $5000 and above', () => {
    expect(calculateDiscount(5000, false)).toBe(3500);
  });
  test('VIP gets additional 5% off', () => {
    expect(calculateDiscount(5000, true)).toBe(3325);
  });
});
```

**Green -- Write code to make the tests pass:**

```javascript
// calculateDiscount.js
function calculateDiscount(amount, isVIP) {
  let discount = 1;                          // Default: no discount
  if (amount >= 5000) discount = 0.7;        // 30% off
  else if (amount >= 3000) discount = 0.8;   // 20% off
  else if (amount >= 1000) discount = 0.9;   // 10% off

  let finalAmount = amount * discount;
  if (isVIP) finalAmount *= 0.95;            // VIP additional 5% off
  return finalAmount;
}
module.exports = { calculateDiscount };
```

### Expected Output:

```
[Test results]
+---------------------------------------------+
| PASS  ./calculateDiscount.test.js           |
|                                             |
| calculateDiscount                           |
|   + no discount below $1000 (2 ms)         |
|   + 10% off at $1000 and above (1 ms)      |
|   + 20% off at $3000 and above (1 ms)      |
|   + 30% off at $5000 and above              |
|   + VIP gets additional 5% off (1 ms)      |
|                                             |
| Tests: 5 passed, 5 total                    |
+---------------------------------------------+
```

The third step is **Refactor** -- Claude Code will optimise the code (e.g., extracting discount rules into a config file) while ensuring all tests still pass.

---

## ✍️ Hands-On Exercisess

### Exercise 1: Install Your First Skill
Pick a Skill that interests you, install it, launch Claude Code, give it a relevant task, and observe whether its behaviour changes. We recommend starting with `obra/superpowers`.

### Exercise 2: Build a Web Page with frontend-design
Install frontend-design, ask Claude Code to build a web page on a topic you like (personal portfolio, recipe site, etc.), open it in a browser, and then use plain language to request design changes. No HTML or CSS knowledge required.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What role do Skills play in Claude Code?</p>
<label><input type="radio" name="q1" value="0"> They are a programming language</label>
<label><input type="radio" name="q1" value="1"> They are specialised knowledge packs that extend Claude Code's capabilities</label>
<label><input type="radio" name="q1" value="2"> They are a paid upgrade for Claude Code</label>
<label><input type="radio" name="q1" value="3"> They are a file format</label>
<div class="quiz-explain">Skills are like "professional handbooks." Once installed, they make Claude Code more professional in specific areas.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What is the correct TDD workflow?</p>
<label><input type="radio" name="q2" value="0"> Write code -> Write tests -> Refactor</label>
<label><input type="radio" name="q2" value="1"> Write tests -> Write code -> Deploy</label>
<label><input type="radio" name="q2" value="2"> Write tests -> Write code to pass the tests -> Refactor</label>
<label><input type="radio" name="q2" value="3"> Refactor -> Write tests -> Write code</label>
<div class="quiz-explain">First write tests (red), then write the minimum code to pass the tests (green), then refactor. This is the Red-Green-Refactor cycle.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. Which one should you install to get the most Skills at once?</p>
<label><input type="radio" name="q3" value="0"> frontend-design</label>
<label><input type="radio" name="q3" value="1"> skill-creator</label>
<label><input type="radio" name="q3" value="2"> obra/superpowers</label>
<label><input type="radio" name="q3" value="3"> mcp-builder</label>
<div class="quiz-explain">A single install of obra/superpowers gives you 20+ Skills covering TDD, debugging, Git workflows, and more.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. What does the "varlock" Skill protect against?</p>
<label><input type="radio" name="q4" value="0"> API keys, passwords, and secrets accidentally ending up in code or being committed to Git</label>
<label><input type="radio" name="q4" value="1"> Computer viruses and malware</label>
<label><input type="radio" name="q4" value="2"> Unauthorised users accessing Claude Code</label>
<label><input type="radio" name="q4" value="3"> Code formatting errors</label>
<div class="quiz-explain">The varlock Skill ensures sensitive data (API keys, passwords, tokens) is properly managed — creating .env templates, verifying .gitignore coverage, and using secure reading methods. It prevents the common mistake of hardcoding secrets in source code.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What is the "Red-Green-Refactor" cycle in TDD?</p>
<label><input type="radio" name="q5" value="0"> Write code in red text, change it to green, then refactor</label>
<label><input type="radio" name="q5" value="1"> Write failing tests (Red), write code to pass them (Green), then optimise the code (Refactor)</label>
<label><input type="radio" name="q5" value="2"> Delete old code (Red), write new code (Green), review it (Refactor)</label>
<label><input type="radio" name="q5" value="3"> Plan in red, build in green, deploy in refactor</label>
<div class="quiz-explain">TDD follows a strict cycle: Red (write a test that fails because the feature doesn't exist yet), Green (write the minimum code to make the test pass), Refactor (improve the code quality while keeping tests passing). This ensures every feature has test coverage from the start.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>6. The webapp-testing Skill uses Playwright. What does Playwright do?</p>
<label><input type="radio" name="q6" value="0"> It writes CSS styles for web pages</label>
<label><input type="radio" name="q6" value="1"> It generates HTML templates</label>
<label><input type="radio" name="q6" value="2"> It compiles JavaScript for production</label>
<label><input type="radio" name="q6" value="3"> It automates browser interactions — clicking buttons, filling forms, and verifying page content</label>
<div class="quiz-explain">Playwright is a browser automation framework. It launches a real browser, navigates to pages, interacts with elements (clicks, types, submits forms), and verifies results — essentially simulating a real user to test web applications.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. Why is having "more Skills isn't always better" mentioned as advice?</p>
<label><input type="radio" name="q7" value="0"> Too many Skills will crash Claude Code</label>
<label><input type="radio" name="q7" value="1"> Extra Skills cost money per installation</label>
<label><input type="radio" name="q7" value="2"> Irrelevant Skills can trigger incorrectly and add unnecessary context; mastering a few relevant ones is more effective</label>
<label><input type="radio" name="q7" value="3"> Claude Code has a limit of 5 Skills maximum</label>
<div class="quiz-explain">While each Skill's metadata cost is small (~100 tokens), having many irrelevant Skills increases the chance of false triggers. It's better to install 3-5 Skills that match your actual workflow and master them, rather than installing 20 Skills you rarely use.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. You want Claude Code to automatically follow Clean Architecture and SOLID principles when designing new features. Which Skill should you install?</p>
<label><input type="radio" name="q8" value="0"> software-architecture</label>
<label><input type="radio" name="q8" value="1"> frontend-design</label>
<label><input type="radio" name="q8" value="2"> debug-skill</label>
<label><input type="radio" name="q8" value="3"> better-commits</label>
<div class="quiz-explain">The software-architecture Skill guides Claude to follow Clean Architecture patterns, SOLID principles, and established design patterns. It's ideal for structuring new projects or refactoring existing ones to be more maintainable.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

---

## 🔗 Next Steps

Congratulations on getting to know the top 10 must-have Skills! We recommend installing 2-3 Skills you need most to experience the difference, then using skill-creator to build your own Skill to share with your team.

> **Remember:** More Skills isn't always better. Choose the most relevant few and master them to truly boost your efficiency. Just as a chef doesn't need every kitchen gadget -- a few good knives used well can produce an amazing meal.
