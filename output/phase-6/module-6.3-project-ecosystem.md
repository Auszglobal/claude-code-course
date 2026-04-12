# 6.3 Project Ecosystem and Business Brain

## 🎯 Learning Objectives
- Understand why Projects are essential for consistent, high-quality Cowork output
- Apply the Project Isolation Principle to your own work
- Create Business Brain .md files that give Claude deep context about your business
- Explain the Three-Layer Instruction System and how layers interact
- Compare Cowork's Project system to Claude Code's CLAUDE.md approach

## 📖 Theory: The Pain of Working Without Projects

If you keep using Cowork without any structure:

- Nothing is remembered between sessions
- Every time you open a new window, you have to re-explain your business
- Different tasks interfere with and bleed into each other

Imagine hiring a new assistant every single morning. Each day, you have to explain who you are, what your company does, who your customers are, and how you like things done. By Friday, you are exhausted from repeating yourself. That is what using Cowork without Projects feels like.

**The solution: build a project-based workflow (Project Ecosystem).**

With a Project, the experience is more like having a long-term employee who remembers everything from previous conversations. By week six, you can just say "do the usual Monday report" and they know exactly what you mean.

## 📖 Theory: What Is a Project?

A Project is not just a simple folder. It's a container that brings together:

- **Your files** — Documents, data, templates that Cowork can access
- **Custom instructions** — Rules about how Claude should behave in this context
- **Skills** — Reusable workflows you have built (more on this in Module 6.5)
- **Context memory** that accumulates over time — The more you use a project, the smarter it gets

### With vs Without a Project

| Scenario | Result |
|----------|--------|
| Without a Project | You start from scratch explaining yourself every conversation |
| With a Project | Context compounds like interest — by week 6, you just say "do the usual" |

Think of it like compound interest at a bank. Each conversation deposits a little more context. Over time, that context grows and compounds, making every future interaction faster and more accurate.

## 📖 Theory: The Project Isolation Principle

> Different domains must be split into separate projects. No exceptions.

For example:
- YouTube content project
- Finance project
- Customer management project

**Why?** YouTube tone rules will "contaminate" finance tasks, and Claude will start mixing up styles.

Here is a real-world analogy: imagine you have one notebook where you write your creative fiction AND your tax calculations. Eventually, your tax documents start sounding poetic, and your stories start including spreadsheet formulas. Keeping separate notebooks (projects) for separate domains prevents this cross-contamination.

### How Many Projects Should You Have?

A good rule of thumb:
- **1 project per business function** (marketing, finance, operations)
- **1 project per client** if you serve multiple clients
- **1 project per major content type** (blog, YouTube, newsletter)
- **Never combine** projects that have very different tones or audiences

## 📖 Theory: Business Brain — Your .md Files

These plain text files live in the context folder, and Claude reads them before every task. They are your business's "brain transplant" for Claude:

### `about_me.md`
```markdown
# About Me and My Business
- Name: Sarah Chen
- Business: Sunrise Digital Marketing Agency
- Customers: Small to medium local businesses (restaurants, salons, gyms)
- Revenue model: Monthly retainer packages ($500-$2000/month)
- Current priorities: Grow from 15 to 25 clients by Q3
- Team size: 3 people (me + 1 designer + 1 content writer)

Claude reads this file every time, so it always knows the context.
```

### `brand_voice.md`
```markdown
# Brand Voice Guide
- Tone: Friendly, professional, no jargon
- We say "grow your business" NOT "leverage synergies"
- We say "customers" NOT "end users" or "stakeholders"
- We NEVER use: "cutting-edge", "game-changing", "disrupt"
- Our emails always end with a specific next step, not vague promises

## Real Writing Samples (paste 2-3 examples of your actual writing)
Paste real writing samples so the output stops sounding like "generic Claude."
```

### `working_preferences.md`
```markdown
# How I Work
- All reports go in the /reports subfolder
- File naming: YYYY-MM-DD-description.extension
- I prefer bullet points over long paragraphs
- Always include a "TL;DR" at the top of any document longer than 1 page
- Spreadsheets should use USD currency format with 2 decimal places
```

> **Tip**: Don't write these from scratch. Just tell Claude: "Ask me questions step by step, then generate a set of business brain files based on my answers." It only takes 15 minutes.

## 💻 Code Example 1: Setting Up Business Brain Files

Here is how you would create these files for a Cowork project, compared to the equivalent Claude Code approach:

```bash
# ============================================
# CLAUDE CODE approach: Everything goes in CLAUDE.md
# ============================================
cat > CLAUDE.md << 'EOF'
# Project: Sunrise Digital Marketing

## About
- Agency serving local businesses
- Monthly retainer model ($500-$2000)
- Team of 3 people

## Voice Rules
- Friendly, professional tone
- Say "customers" not "end users"
- Never use buzzwords like "cutting-edge" or "disrupt"

## Working Preferences
- Reports go in /reports
- File naming: YYYY-MM-DD-description.ext
- Always include TL;DR for long documents
EOF

# ============================================
# COWORK approach: Separate .md files in context folder
# ============================================
# In Cowork, you would:
# 1. Open your Project settings
# 2. Go to the "Context" or "Custom Instructions" section
# 3. Add each .md file separately:
#    - about_me.md    (who you are)
#    - brand_voice.md (how you write)
#    - working_preferences.md (how you work)
#
# OR, even easier — just tell Cowork:
# "Ask me 10 questions about my business, then generate
#  about_me.md, brand_voice.md, and working_preferences.md
#  based on my answers."
#
# Claude will interview you and auto-generate the files!
```

### Expected Output:
After setting up Business Brain files, try asking Cowork to write a client email. Instead of generic corporate language, you should see output that matches your specific tone, uses your preferred terminology, and follows your formatting preferences.

```
📸 [Before Business Brain]
"Dear Valued Customer, We are excited to leverage our 
cutting-edge solutions to disrupt your market position..."

📸 [After Business Brain]  
"Hi David, Here's your monthly report — your Instagram 
engagement grew 23% this month! Let's chat Thursday about 
adding Google Ads to your package. — Sarah"
```

## 💻 Code Example 2: The Three-Layer Instruction System in Action

The Three-Layer system determines how Claude behaves. Here is how to think about it:

```bash
# ============================================
# LAYER 1: Personalisation (Account Settings)
# ============================================
# Location: Account Settings → Personalisation
# Scope: ALL of Claude (Chat + Code + Cowork)
# Example content:
#   "I prefer concise answers with bullet points.
#    I work in the Pacific timezone.
#    I am a visual learner — include diagrams when possible."

# ============================================
# LAYER 2: Cowork Global (Cowork Settings)
# ============================================
# Location: Settings → Cowork → Global Instructions
# Scope: ALL Cowork tasks (across all projects)
# Example content:
#   "Always show your execution plan before starting.
#    Save all outputs in the project folder, never elsewhere.
#    Use Australian English spelling (colour, organise)."

# ============================================
# LAYER 3: Project-Level (Project Instructions)
# ============================================
# Location: Project → Custom Instructions
# Scope: Only THIS specific project
# Example content (for a YouTube project):
#   "All scripts should be 8-12 minutes reading length.
#    Use a conversational, energetic tone.
#    Include a hook in the first 15 seconds.
#    Reference our standard intro and outro templates."

# HOW THEY INTERACT:
# Layer 3 overrides Layer 2, which overrides Layer 1.
# Think of it like: Personal habits < Work rules < Project rules
# If Layer 1 says "be concise" but Layer 3 says "write detailed scripts",
# the detailed scripts win for that specific project.
```

### Expected Output:
When you work in a YouTube project, Claude combines all three layers: your personal preferences (concise, Pacific timezone), your global Cowork rules (Australian spelling, show execution plan), and your YouTube-specific rules (8-12 minute scripts, energetic tone). The project-level rules take priority when there is a conflict.

## Comparison with Claude Code

| Concept | Cowork | Claude Code |
|---------|--------|-------------|
| Project configuration | .md files + Project settings | `CLAUDE.md` |
| Brand voice | `brand_voice.md` | Written as instructions in `CLAUDE.md` |
| Memory system | Project context | Memory system (auto memory) |
| Instruction layers | 3 layers (Personal/Global/Project) | 3 levels (User/Enterprise/Project CLAUDE.md) |
| Setup method | GUI + interview with Claude | Manual file creation |

## Three-Layer Instruction System

| Layer | Location | Scope |
|-------|----------|-------|
| **Layer 1** — Personalisation | Account settings | Global across Chat + Code + Cowork |
| **Layer 2** — Cowork global | Settings → Cowork → Global | All Cowork tasks |
| **Layer 3** — Project-level | Project Instructions | Within a single project |

**Principle: Global defines habits, Cowork defines execution, Project defines expertise.**

## ✍️ Hands-On Exercises

**Exercise 1: Create Your Business Brain**

Open Cowork and start a new conversation. Type the following prompt:

> "I want to set up Business Brain files for my work. Please ask me 10 questions about my business, my writing style, and my working preferences. After I answer, generate three files: about_me.md, brand_voice.md, and working_preferences.md."

Answer each question honestly. When Claude generates the files, review them and make corrections. Save the final versions in your project's context folder.

> Hint: The more specific your answers, the better Claude's output will be. Instead of "I like professional writing," say "I write like a friendly mentor — warm but not overly casual, and I always include specific numbers."

**Exercise 2: Test the Before and After**

Try this experiment to see the power of Business Brain files:
1. Start a **new conversation without a project**. Ask: "Write me a marketing email for a 20% off sale."
2. Note the output — it will be generic.
3. Now switch to your **project with Business Brain files**. Ask the exact same question.
4. Compare the two outputs side by side.

> Hint: The difference should be dramatic. The project version should use your brand voice, address your specific customer type, and follow your formatting preferences.

## 🔗 Next Step

In the next module (6.4), we will explore how to connect Cowork to external tools using Connectors (MCP), the Browser Extension, and Computer Use. This is where Cowork truly becomes powerful — it can reach into your Google Drive, Notion, Slack, and more.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Why must different business domains be split into separate Cowork Projects?</p>
<label><input type="radio" name="q1" value="0"> Because Cowork can only open one project at a time</label>
<label><input type="radio" name="q1" value="1"> Because mixing domains causes style and context contamination between tasks</label>
<label><input type="radio" name="q1" value="2"> Because each project requires a separate paid subscription</label>
<label><input type="radio" name="q1" value="3"> Because projects have a strict file size limit</label>
<div class="quiz-explain">The Project Isolation Principle states that different domains must be split into separate projects. Without isolation, YouTube tone rules will "contaminate" finance tasks, and Claude will start mixing up styles and context.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What is the Cowork equivalent of Claude Code's CLAUDE.md?</p>
<label><input type="radio" name="q2" value="0"> A single settings.json file</label>
<label><input type="radio" name="q2" value="1"> Environment variables</label>
<label><input type="radio" name="q2" value="2"> Business Brain .md files (about_me.md, brand_voice.md, working_preferences.md)</label>
<label><input type="radio" name="q2" value="3"> The Cowork sidebar menu</label>
<div class="quiz-explain">In Cowork, Business Brain .md files serve the same purpose as CLAUDE.md in Claude Code -- they provide persistent context and instructions that Claude reads before every task.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. In the Three-Layer Instruction System, what does the Personalisation layer (Layer 1) control?</p>
<label><input type="radio" name="q3" value="0"> Global settings across Chat, Code, and Cowork</label>
<label><input type="radio" name="q3" value="1"> Settings for all Cowork tasks only</label>
<label><input type="radio" name="q3" value="2"> Settings within a single project only</label>
<label><input type="radio" name="q3" value="3"> Settings for a single conversation only</label>
<div class="quiz-explain">Layer 1 (Personalisation) is set in Account settings and applies globally across Chat, Code, and Cowork. Layer 2 covers all Cowork tasks, and Layer 3 is project-specific.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>4. What is the easiest way to create Business Brain files without writing them from scratch?</p>
<label><input type="radio" name="q4" value="0"> Copy them from a template website</label>
<label><input type="radio" name="q4" value="1"> Hire a consultant to write them for you</label>
<label><input type="radio" name="q4" value="2"> Ask Claude to interview you step by step, then auto-generate the files from your answers</label>
<label><input type="radio" name="q4" value="3"> Leave them empty and let Claude figure it out</label>
<div class="quiz-explain">The recommended approach is to tell Claude: "Ask me questions step by step, then generate business brain files based on my answers." This interview process takes about 15 minutes and produces personalized, accurate files.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What happens when Layer 3 (Project) instructions conflict with Layer 1 (Personal) instructions?</p>
<label><input type="radio" name="q5" value="0"> Layer 1 always wins because it is the global default</label>
<label><input type="radio" name="q5" value="1"> Layer 3 takes priority because project-specific rules override global settings</label>
<label><input type="radio" name="q5" value="2"> Both layers are ignored and Claude uses its default behavior</label>
<label><input type="radio" name="q5" value="3"> Claude asks you to resolve the conflict manually</label>
<div class="quiz-explain">Layer 3 (Project-level) overrides Layer 2 (Cowork global), which overrides Layer 1 (Personal). More specific instructions always take priority over more general ones.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. Why is the compound interest analogy used to describe Projects?</p>
<label><input type="radio" name="q6" value="0"> Because each conversation deposits more context, and over time the accumulated context makes every interaction faster and more accurate</label>
<label><input type="radio" name="q6" value="1"> Because projects cost more money over time</label>
<label><input type="radio" name="q6" value="2"> Because you earn rewards points for using Projects</label>
<label><input type="radio" name="q6" value="3"> Because project files grow in size automatically</label>
<div class="quiz-explain">Like compound interest at a bank, each conversation deposits a little more context into the Project. Over time, that context grows and compounds, making every future interaction faster and more accurate — by week 6, you just say "do the usual."</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. Which file would you use to tell Claude to always say "customers" instead of "end users"?</p>
<label><input type="radio" name="q7" value="0"> about_me.md</label>
<label><input type="radio" name="q7" value="1"> working_preferences.md</label>
<label><input type="radio" name="q7" value="2"> settings.json</label>
<label><input type="radio" name="q7" value="3"> brand_voice.md</label>
<div class="quiz-explain">brand_voice.md is where you define your tone, preferred terminology, and expressions you want to avoid. Rules like "say customers, not end users" belong in this file because they define how Claude should write.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. How many projects should you create for a business that does YouTube content, financial accounting, and client management?</p>
<label><input type="radio" name="q8" value="0"> One project that covers everything for simplicity</label>
<label><input type="radio" name="q8" value="1"> Two projects — one for content and one for business</label>
<label><input type="radio" name="q8" value="2"> Three separate projects — one per domain</label>
<label><input type="radio" name="q8" value="3"> It does not matter how many projects you use</label>
<div class="quiz-explain">The Project Isolation Principle says different domains must be split into separate projects. YouTube content, finance, and client management each have very different tones, rules, and audiences, so each needs its own project to prevent context contamination.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
