# Module 8.5: Multimodal — Images, Screenshots & PDFs

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Use Claude Code to read and understand images and screenshots
  - Implement UI designs from mockup images
  - Read and extract information from PDF files
  - Apply multimodal capabilities to real development workflows
  - Understand the limitations of image and PDF processing

## 📖 Theory

### Claude Code Can See

Most people think of Claude Code as a text-only tool — you type commands, it reads code. But Claude Code is **multimodal**, which means it can understand images just like it understands text.

Think of it like hiring a developer who can also read architectural blueprints, look at design mockups, and review printed documents — not just code on a screen.

### What Can Claude Code See?

| Input Type | What Claude Does With It | Common Use Cases |
|-----------|------------------------|-----------------|
| **Screenshots** | Reads text, identifies UI elements, spots errors | Debug error dialogs, read terminal output |
| **Design mockups** | Identifies layout, colours, components | Build HTML/CSS from Figma exports |
| **Diagrams** | Understands relationships, data flow | Explain architecture, implement from diagrams |
| **Photos of whiteboards** | Reads handwritten text and drawings | Convert planning sessions into code |
| **PDF documents** | Extracts text, tables, structure | Read specs, documentation, contracts |

### Three Ways to Share Images

1. **Drag and drop** — Drag an image file into the terminal (supported in modern terminals)
2. **File path** — Tell Claude to read an image: "Read the screenshot at ./error.png"
3. **Paste from clipboard** — Copy an image and paste it into the chat (IDE extensions)

## 💻 Code Example 1: Debugging with Screenshots

Imagine you see an error on your website but the error message is in a screenshot from a colleague.

### Step 1: Share the screenshot with Claude Code

```bash
# Reference an image file by path
> Read the screenshot at ./screenshots/error-page.png and tell me what the error is
```

[What you should see]
```
+--------------------------------------------------+
| Claude reads the image and responds:             |
|                                                  |
| "The screenshot shows a 500 Internal Server      |
|  Error page. The traceback visible in the        |
|  debug panel shows:                              |
|                                                  |
|  AttributeError: 'NoneType' object has no        |
|  attribute 'email' in views.py line 34.          |
|                                                  |
|  This means user is None when you try to         |
|  access user.email. The fix is to add a          |
|  null check before accessing the attribute."     |
+--------------------------------------------------+
```

### Step 2: Ask Claude to fix the bug it identified

```bash
> Now fix that bug in views.py — add a null check for the user object before accessing .email
```

Claude reads views.py, finds line 34, and adds the appropriate null check — all from seeing a screenshot.

## 💻 Code Example 2: Building UI from a Design Mockup

### Step 1: Share a design image

```bash
> I have a design mockup at ./designs/landing-page.png. 
  Build the HTML and CSS to match this design. 
  Use modern CSS (flexbox/grid) and make it responsive.
```

[What you should see]
```
+--------------------------------------------------+
| Claude examines the image and identifies:        |
| - Header with logo and navigation                |
| - Hero section with headline and CTA button      |
| - Three-column feature cards                     |
| - Footer with links                              |
|                                                  |
| Then creates:                                    |
| - index.html with semantic HTML structure        |
| - styles.css with matching colours, spacing,     |
|   and responsive breakpoints                     |
+--------------------------------------------------+
```

### Step 2: Iterate on the design

```bash
> Read ./designs/landing-page.png again. Compare it with the index.html 
  you just created. What differences do you see? Fix them.
```

Claude compares the design to its implementation and adjusts spacing, colours, or layout to match more closely.

## 💻 Supplementary Example: Reading PDF Documents

### Reading a short PDF:

```bash
> Read the PDF at ./docs/api-specification.pdf and summarise the endpoints
```

Claude reads the PDF and extracts the information.

### Reading a large PDF (more than 10 pages):

```bash
# For large PDFs, specify page ranges (max 20 pages per request)
> Read pages 1-10 of ./docs/technical-spec.pdf

# Then read the next section
> Read pages 11-20 of ./docs/technical-spec.pdf
```

### Practical PDF Workflows:

| Scenario | Prompt |
|----------|--------|
| Client sends requirements PDF | "Read the PDF at ./requirements.pdf and create a list of user stories" |
| API documentation | "Read the API spec PDF and generate Python request examples for each endpoint" |
| Database schema PDF | "Read the schema diagram PDF and create Django models matching the tables" |
| Legal/compliance doc | "Read this compliance PDF and list all the technical requirements we need to implement" |

### Image Comparison for QA:

```bash
> Compare these two screenshots:
  1. ./designs/expected-login.png (the design)
  2. ./screenshots/actual-login.png (what we built)
  List all visual differences.
```

Claude identifies differences like wrong colours, misaligned elements, missing icons, or incorrect fonts.

### Limitations to Be Aware Of

| Limitation | Details |
|-----------|---------|
| Very small text | Text smaller than ~8px in screenshots may be hard to read |
| Complex charts | Dense data visualisations may need verbal description |
| Video | Not supported — use screenshots from key frames |
| Animated GIFs | Only the first frame is analysed |
| Large PDFs | Must be read in chunks of 20 pages max |
| Handwriting | Works but accuracy varies with legibility |

## ✍️ Hands-On Exercisess

### Exercise 1: Screenshot Debugging
1. Take a screenshot of any error message on your screen (terminal error, browser error, etc.)
2. Save it as `error.png` in your project directory
3. Ask Claude Code: "Read the screenshot at ./error.png and explain the error"
4. If Claude identifies a fixable issue, ask it to fix the code
5. Compare the experience to manually copying and pasting the error text

> Tip: This workflow is especially powerful when errors contain long stack traces or when the error is in a GUI application where you can't easily copy text.

### Exercise 2: Design to Code
1. Find any simple web design (search "simple landing page design" online)
2. Save the image to your project directory
3. Ask Claude Code to build the HTML/CSS from the design
4. Open the generated HTML in a browser
5. Compare it to the original design and ask Claude to fix any differences

> Tip: Start with simple designs — a single-section page works best for learning. Complex multi-page designs are better handled in pieces.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What does it mean that Claude Code is "multimodal"?</p>
<label><input type="radio" name="q1" value="0"> It can run on multiple operating systems simultaneously</label>
<label><input type="radio" name="q1" value="1"> It can understand both text and images, not just code</label>
<label><input type="radio" name="q1" value="2"> It can use multiple programming languages at the same time</label>
<label><input type="radio" name="q1" value="3"> It can connect to multiple AI models at once</label>
<div class="quiz-explain">Multimodal means Claude Code can process multiple types of input — text, images, screenshots, and PDFs. This lets you share visual information like design mockups or error screenshots, not just code and text.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. How should you handle a 50-page PDF document in Claude Code?</p>
<label><input type="radio" name="q2" value="0"> Just ask Claude to read the entire PDF at once</label>
<label><input type="radio" name="q2" value="1"> Convert it to text first using an external tool</label>
<label><input type="radio" name="q2" value="2"> Read it in chunks of up to 20 pages per request</label>
<label><input type="radio" name="q2" value="3"> PDFs are not supported by Claude Code</label>
<div class="quiz-explain">For large PDFs (more than 10 pages), you should specify page ranges like "Read pages 1-20" and then "Read pages 21-40". The maximum per request is 20 pages. This prevents overwhelming the context window.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. Which of the following is a practical use case for Claude Code's image capabilities?</p>
<label><input type="radio" name="q3" value="0"> Sharing a design mockup and asking Claude to build matching HTML/CSS</label>
<label><input type="radio" name="q3" value="1"> Asking Claude to edit pixels in an image file</label>
<label><input type="radio" name="q3" value="2"> Having Claude watch a video tutorial and summarise it</label>
<label><input type="radio" name="q3" value="3"> Using Claude to generate AI artwork from text descriptions</label>
<div class="quiz-explain">Claude Code can look at a design mockup image and build HTML/CSS to match it. It understands layout, colours, and component structure from images. It cannot edit images, watch videos, or generate artwork — it's an AI coding tool, not an image editor.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Congratulations — you've completed Phase 8: Mastery! You now know how to prompt effectively, manage costs, use IDE integrations, leverage the memory system, and work with images and PDFs. In the next phase, **Phase 9: Production**, we'll learn the tools and techniques for production-grade development — sub-agents, databases, CI/CD, and security.
