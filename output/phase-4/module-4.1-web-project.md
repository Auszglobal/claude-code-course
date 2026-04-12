# Module 4.1: Building a Complete Web Project

## 🎯 Learning Objectives
- After completing this lesson, you will be able to...
  - Understand the three building blocks of a web page: HTML, CSS, JavaScript
  - Use Claude Code to build a personal portfolio website from scratch
  - Understand the file structure of a web project
  - Modify text, colors, and layout of a website
  - Preview your website in a browser

## 📖 Theory

### How Is a Web Page Put Together?

Imagine you're building a house:

- **HTML** is the **structural framework** of the house — where the walls go, where the doors and windows are, how the rooms are divided. It defines what content appears on the page (headings, paragraphs, images, buttons).
- **CSS** is the **interior design** — what color to paint the walls, what material for the floors, how to arrange the furniture. It determines how the page looks (colors, fonts, layout).
- **JavaScript** is the **electrical system** — flip a switch and the light turns on, press the doorbell and it rings. It makes the page interactive (things happen when you click a button, animation effects).

For beginners, the good news is: **You don't need to write any of this code yourself!** Claude Code will generate everything for you — you just need to tell it what you want.

### What Is a Personal Portfolio Website?

A personal portfolio website is like your **digital business card**. It typically includes:
- Your name and a brief introduction
- Your skills or areas of expertise
- Projects or work you've done
- Contact information

This is an excellent first project because the content is about you, so you'll know exactly what to include!

---

## 💻 Code Example 1: Have Claude Code Build the Website Skeleton

First, open your terminal and navigate to your working directory:

```bash
# Create a new project folder
mkdir my-portfolio

# Enter the folder
cd my-portfolio
```

Then start Claude Code:

```bash
claude
```

Now, give Claude Code your first instruction:

```
Help me build a simple personal portfolio website with the following sections:
- A navigation bar at the top (name, About Me, Work, Contact)
- A hero section with a large heading and a short introduction
- An "About Me" section with a self-introduction paragraph
- A "My Skills" section listing 4-5 skills
- A "Contact Me" section with email and social media links
- A footer with copyright information
Use plain HTML + CSS, no JavaScript frameworks needed.
The design should be modern and clean, using dark blue (#1a1a2e) and teal (#00b4a6) as the color scheme.
```

### Expected Output:

Claude Code will generate at least two files for you:

📸 [What you should see]
```
┌─────────────────────────────────────────────────┐
│ Claude Code is generating files...               │
│                                                   │
│ ✓ Created index.html                              │
│ ✓ Created styles.css                              │
│                                                   │
│ I've built a personal portfolio website with:     │
│ - index.html: The main structure of the website   │
│ - styles.css: The style design of the website     │
│                                                   │
│ You can open index.html in your browser to        │
│ preview it.                                       │
└─────────────────────────────────────────────────┘
```

After generation, check the file structure:

```bash
# Enter this in Claude Code
ls -la
```

You should see:

```
my-portfolio/
├── index.html      # Web page structure (HTML)
└── styles.css      # Web page styling (CSS)
```

### Preview Your Website

Find the `index.html` file on your computer and double-click to open it — your browser will display your website!

**Windows users**: Find the file in File Explorer and double-click.
**Mac users**: Find the file in Finder and double-click.

Or from the terminal:

```bash
# Windows — open with default browser
start index.html

# Mac — open with default browser
open index.html
```

---

## 💻 Code Example 2: Modifying and Customizing Your Website

Once the website is built, you'll want to change it to your own content. This is where Claude Code is most convenient — just use natural language to tell it what to change!

### Modify Text Content

Enter in Claude Code:

```
Change the name in index.html to "Alex Chen",
and change the self-introduction to "I'm someone who loves learning new technology,
currently exploring AI tools and their applications.
In my free time, I enjoy photography and traveling.
I hope to use technology to make life better."
```

### Modify Colors

```
Change the main color of the website from dark blue to dark green (#1b4332),
and the accent color from teal to gold (#f4a261).
```

### Modify Layout

```
Change the "My Skills" section to display in two columns side by side (on desktop),
and keep it as a single column on mobile. Add a simple hover animation effect.
```

### Expected Output:

After each modification, Claude Code will tell you what it changed:

📸 [What you should see]
```
┌──────────────────────────────────────────────────┐
│ I've made the following changes:                   │
│                                                    │
│ styles.css:                                        │
│  - Main color changed to dark green (#1b4332)      │
│  - Accent color changed to gold (#f4a261)          │
│  - Skills section changed to CSS Grid two-column   │
│    layout                                          │
│  - Added hover zoom effect                         │
│                                                    │
│ Please refresh your browser to see the changes.    │
└──────────────────────────────────────────────────┘
```

> **Tip**: After changes are made, go back to your browser and press `Ctrl + R` (Windows) or `Cmd + R` (Mac) to refresh the page and see the updates.

### Add More Features

You can also ask Claude Code to add more elements:

```
Between the "About Me" and "Skills" sections, add a "My Work" section
using a card-style layout displaying 3 projects. Each card should have:
- A project name
- A short description
- A "Learn More" button
Use placeholder data for now.
```

This will update your website structure to:

```
my-portfolio/
├── index.html      # Web page structure — now with more sections
└── styles.css      # Web page styling — card styles added
```

---

## ✍️ Hands-on Exercises

### Exercise 1: Build Your Own Personal Page

1. Create a new folder called `my-site`
2. In Claude Code, create a personal website using your own real information (or made-up information)
3. Include at minimum: your name, a bio, 3 skills, and contact information
4. Choose a color scheme you like
5. Open it in a browser and take a screenshot

> **Tip**: If you're not sure what colors to use, tell Claude Code "Pick a professional yet vibrant color scheme for me" and it will decide for you!

### Exercise 2: Add a New Page

1. Ask Claude Code to add a `projects.html` page to your website
2. This page should showcase 3 projects you've done (or want to do)
3. Make sure the navigation bar links to the new page
4. Make sure the new page's style matches the homepage

> **Tip**: Tell Claude Code "The new page should use the same styles.css as index.html, and the navigation bar should be the same"

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What are HTML, CSS, and JavaScript each responsible for?</p>
<label><input type="radio" name="q1" value="0"> HTML handles colors, CSS handles structure, JavaScript handles animation</label>
<label><input type="radio" name="q1" value="1"> HTML handles structure, CSS handles styling, JavaScript handles interactivity</label>
<label><input type="radio" name="q1" value="2"> HTML handles interactivity, CSS handles structure, JavaScript handles styling</label>
<label><input type="radio" name="q1" value="3"> All three do the same thing and are interchangeable</label>
<div class="quiz-explain">HTML defines the content structure of the page (the skeleton), CSS controls the visual appearance (the interior design), and JavaScript handles user interaction (the electrical system).</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. After modifying a website, how do you see the latest changes in the browser?</p>
<label><input type="radio" name="q2" value="0"> You need to reinstall the browser</label>
<label><input type="radio" name="q2" value="1"> Press Ctrl+R (Windows) or Cmd+R (Mac) to refresh the page</label>
<label><input type="radio" name="q2" value="2"> You need to restart your computer</label>
<label><input type="radio" name="q2" value="3"> Changes appear automatically, no action needed</label>
<div class="quiz-explain">Browsers cache (temporarily store) the old version of the page. Pressing the refresh key tells the browser to reload the latest file content.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. Which instruction is most effective for getting Claude Code to build a good-looking website?</p>
<label><input type="radio" name="q3" value="0"> "Build a website"</label>
<label><input type="radio" name="q3" value="1"> "Build a personal website with a navigation bar, self-introduction, skills showcase, using blue and white colors, modern and clean style"</label>
<label><input type="radio" name="q3" value="2"> "Write 500 lines of HTML code"</label>
<label><input type="radio" name="q3" value="3"> "Copy Google's homepage"</label>
<div class="quiz-explain">The more specific your description (including content, colors, style, etc.), the better Claude Code can generate results that match your expectations. Vague instructions lead to vague results.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. What is the minimum set of files Claude Code typically generates for a basic website?</p>
<label><input type="radio" name="q4" value="0"> index.html and styles.css</label>
<label><input type="radio" name="q4" value="1"> app.py and database.db</label>
<label><input type="radio" name="q4" value="2"> package.json and node_modules</label>
<label><input type="radio" name="q4" value="3"> main.js and config.yml</label>
<div class="quiz-explain">A basic website needs at minimum an HTML file (index.html) for structure and a CSS file (styles.css) for styling. These two files are enough to create a complete, viewable web page.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>5. You want to change the background colour of your website from blue to green. What is the best way to ask Claude Code?</p>
<label><input type="radio" name="q5" value="0"> "Fix the colours"</label>
<label><input type="radio" name="q5" value="1"> "Open styles.css and change line 14"</label>
<label><input type="radio" name="q5" value="2"> "Change the main background colour in styles.css from blue to green (#2d6a4f)"</label>
<label><input type="radio" name="q5" value="3"> "Rewrite the entire CSS file"</label>
<div class="quiz-explain">Being specific about which file to change, what property to modify, and what the new value should be (including a hex code) gives Claude Code the clearest instruction. Vague prompts lead to unpredictable results.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. Why should you preview your website in a browser after every change?</p>
<label><input type="radio" name="q6" value="0"> Because Claude Code cannot generate code without a browser open</label>
<label><input type="radio" name="q6" value="1"> To verify the changes look correct and catch any visual issues early</label>
<label><input type="radio" name="q6" value="2"> Because the code only works while the browser is open</label>
<label><input type="radio" name="q6" value="3"> Because browsers automatically fix code errors</label>
<div class="quiz-explain">Previewing in a browser lets you see exactly what visitors will see. You can catch layout issues, colour mismatches, or missing elements immediately rather than discovering them later.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. What does the term "responsive design" mean for a website?</p>
<label><input type="radio" name="q7" value="0"> The website loads faster on newer computers</label>
<label><input type="radio" name="q7" value="1"> The website responds to voice commands</label>
<label><input type="radio" name="q7" value="2"> The website only works on desktop computers</label>
<label><input type="radio" name="q7" value="3"> The website adjusts its layout to look good on screens of different sizes (phone, tablet, desktop)</label>
<div class="quiz-explain">Responsive design means the website automatically adapts its layout based on the screen size. A two-column layout on desktop might become a single column on a phone, ensuring readability on all devices.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. You built a website and want to add a new "My Projects" page. What should you tell Claude Code to ensure consistency?</p>
<label><input type="radio" name="q8" value="0"> "Create a new projects.html page that uses the same styles.css and has the same navigation bar as index.html"</label>
<label><input type="radio" name="q8" value="1"> "Make a new page"</label>
<label><input type="radio" name="q8" value="2"> "Copy index.html and rename it"</label>
<label><input type="radio" name="q8" value="3"> "Write a projects page from scratch with new styles"</label>
<div class="quiz-explain">Telling Claude Code to reuse the same stylesheet and navigation bar ensures visual consistency between pages. Without this instruction, Claude might create a completely different design for the new page.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Congratulations on building your first complete website! In the next module, **4.2: Introduction to API Integration**, we'll learn how to connect your website or program to external services — such as fetching real-time weather data or random quotes. This will upgrade your project from a "static page" to an "application with real data"!
