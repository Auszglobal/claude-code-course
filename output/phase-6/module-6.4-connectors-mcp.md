# 6.4 Connectors, MCP, and Browser Capabilities

## 🎯 Learning Objectives
- Understand the three-layer capability architecture and when to use each layer
- Connect your first MCP Connector (like Google Drive or Slack) in Cowork
- Know the security risks of Browser Extension and Computer Use, and how to mitigate them
- Use advanced connectors like Apify and Zapier to expand Cowork's reach
- Compare how MCP works in Cowork vs Claude Code

## 📖 Theory: Three-Layer Capability Architecture

By default, Cowork can only work with files in your sandbox folder. But what if you need it to read your Google Drive, post to Slack, or check a website? That is where the three-layer capability system comes in.

Think of it like three ways to get information from a library:
- **Layer 1 (Connectors/MCP)**: You have a library card and direct access to the stacks. This is the fastest and most reliable method.
- **Layer 2 (Browser Extension)**: You do not have a card, but you can walk in and read books on the tables. You can see everything, but your access is less structured.
- **Layer 3 (Computer Use)**: You do not even have access to the building, so you look through the windows and try to read the book covers. It works, but it is the least efficient option.

Always try Layer 1 first. Only fall back to Layer 2 or 3 when a connector is not available.

```
1. Connectors (MCP)    → First choice: direct API integration
2. Browser extension    → Second choice: read and interact with web pages
3. Computer Use         → Last resort: directly control the screen and mouse
```

## 📖 Theory: Layer 1 — Connectors (MCP)

MCP (Model Context Protocol) lets Claude operate directly within applications — not copy-paste, but authorized direct access. Think of MCP as a secure handshake between Claude and another app. The app says "I trust Claude to read and write within these boundaries," and Claude can then work directly inside the app.

### Natively Supported Apps

- **Google Drive** — Read, create, and organize documents and spreadsheets
- **Notion** — Read and update pages, databases, and wikis
- **Slack** — Read channels, send messages, search conversations
- **Gmail** — Read, draft, and organize emails
- **GitHub** — Read repos, create issues, manage pull requests
- **Figma** — Read design files and extract specifications

### How to Connect

1. Click the **+** icon in the chat interface
2. Go to the **Connectors** tab
3. Search for the tool you need
4. Complete authorization in the browser

```
📸 [You should see a screen like this]
┌────────────────────────────────────────┐
│  + Add Connector                       │
│                                        │
│  🔍 Search connectors...               │
│                                        │
│  📁 Google Drive          [Connect]    │
│  📝 Notion                [Connect]    │
│  💬 Slack                 [Connect]    │
│  📧 Gmail                 [Connect]    │
│  🐙 GitHub                [Connect]    │
│  🎨 Figma                 [Connect]    │
└────────────────────────────────────────┘
```

### Permission Controls

Each connected app can be configured individually:
- **Always allow** — Permit without asking (use for trusted, read-only tasks)
- **Ask first** — Requires confirmation each time (recommended for most apps)
- **Never allow** — Block access completely

### Advanced Hack: Apify MCP

Want to scrape data from YouTube, TikTok, or Instagram?

1. Create a free API Token on Apify
2. Search "Apify" in Cowork connectors
3. Paste your API Key

Claude will automatically choose the most suitable scraper from 1,300+ crawling tools.

### Advanced Hack: Zapier MCP

Connect 8,000+ apps (HubSpot, Airtable, etc.):

1. Create an MCP server in Zapier
2. Select "Claude Cowork"
3. Configure allowed tools and actions
4. Copy the generated URL, then paste it into Claude connectors

## 📖 Theory: Layer 2 — Browser Extension

Used when no connector is available. The Browser Extension gives Cowork the ability to browse the web like a human would — opening tabs, reading pages, and clicking buttons.

### Installation

1. Search "Claude" in the Chrome Web Store
2. Install and pin it to the toolbar
3. Settings, then enable "Claude in Chrome"

### Capabilities

- Automatically opens browser tabs
- Visits and reads web page content
- Understands page structure (headings, CTAs, layout)
- Multi-step operations (open YouTube, then analyze video metrics)

> **Important risk warning**: Claude uses your real browser, logged into your accounts. It has the ability to complete payments. Make sure to set up a blocklist. This is like handing someone the keys to your car — make sure you trust where they are going.

## 📖 Theory: Layer 3 — Computer Use

The ultimate fallback. Claude can:
- See your screen
- Control the mouse
- Type on the keyboard

**How to enable**: Settings, then General, then Computer Use

> **Must-do**: Add sensitive applications to the blocklist before enabling this. Computer Use is powerful but carries the highest risk because Claude has access to everything visible on your screen.

## 💻 Code Example 1: Connecting Google Drive in Cowork vs Claude Code

Here is a side-by-side comparison showing how the same Google Drive integration works in both tools:

```bash
# ============================================
# COWORK approach: Point-and-click (no code needed!)
# ============================================
# 1. Click the + icon in Cowork
# 2. Search "Google Drive"
# 3. Click [Connect]
# 4. Browser opens → Sign in to Google → Click "Allow"
# 5. Done! You can now say:
#    "Read the Q1 report from my Google Drive
#     and summarize the key takeaways."

# ============================================
# CLAUDE CODE approach: Manual configuration
# ============================================

# Step 1: Install the MCP server package
npm install -g @anthropic/mcp-google-drive

# Step 2: Add it to your Claude Code settings
# Edit ~/.claude/settings.json:
cat ~/.claude/settings.json
# {
#   "mcpServers": {
#     "google-drive": {
#       "command": "npx",
#       "args": ["@anthropic/mcp-google-drive"],
#       "env": {
#         "GOOGLE_CLIENT_ID": "your-client-id",
#         "GOOGLE_CLIENT_SECRET": "your-client-secret"
#       }
#     }
#   }
# }

# Step 3: Restart Claude Code for the changes to take effect
# Now you can use Google Drive tools in your terminal session
```

### Expected Output:
After connecting Google Drive in Cowork, you can ask natural language questions about your files:

```
📸 [You should see something like this]
You: "What documents are in my 'Q1 Reports' folder?"

Cowork: "I found 7 documents in your Q1 Reports folder:
  1. Q1-Revenue-Summary.xlsx (last modified Mar 28)
  2. Q1-Marketing-Metrics.docx (last modified Mar 30)
  3. Q1-Customer-Feedback.pdf (last modified Apr 1)
  ..."
```

## 💻 Code Example 2: Setting Up a Zapier MCP Connection

This advanced example shows how to connect Cowork to thousands of apps through Zapier:

```bash
# ============================================
# Setting up Zapier MCP for Cowork
# ============================================

# Step 1: Go to zapier.com/mcp and sign in
# Step 2: Click "Create MCP Server"
# Step 3: Select "Claude Cowork" as the client
# Step 4: Choose which apps and actions to allow:
#
#   Example configuration:
#   ┌─────────────────────────────────────────┐
#   │ App: HubSpot CRM                        │
#   │ Allowed actions:                        │
#   │   ✅ Read contacts                       │
#   │   ✅ Create contacts                     │
#   │   ✅ Update contact properties           │
#   │   ❌ Delete contacts (blocked for safety)│
#   │                                         │
#   │ App: Airtable                           │
#   │ Allowed actions:                        │
#   │   ✅ Read records                        │
#   │   ✅ Create records                      │
#   │   ✅ Update records                      │
#   │   ❌ Delete records (blocked for safety) │
#   └─────────────────────────────────────────┘

# Step 5: Zapier generates a unique URL like:
# https://actions.zapier.com/mcp/sk-xxx-your-key/sse

# Step 6: In Cowork, click + → Connectors → Custom URL
# Paste the Zapier MCP URL

# Now you can say things like:
# "Look up the contact 'Sarah Chen' in HubSpot
#  and add her latest purchase to the Airtable tracker."
```

### Expected Output:
After connecting Zapier MCP, Cowork gains access to the specific apps and actions you configured. It will show the connected tools in your connector list:

```
📸 [You should see your connected tools]
┌────────────────────────────────────────┐
│  Connected Tools                       │
│                                        │
│  ✅ Google Drive (native)              │
│  ✅ Zapier MCP                         │
│     → HubSpot CRM (read, create)      │
│     → Airtable (read, create, update) │
└────────────────────────────────────────┘
```

## Comparing MCP in Cowork vs Claude Code

| Feature | Cowork MCP | Claude Code MCP |
|---------|------------|-----------------|
| Configuration | GUI point-and-click | `~/.claude/settings.json` configuration |
| Server type | Cloud-hosted | Local stdio or SSE |
| Custom MCP | Via Zapier/Apify | Write your own MCP server |
| Browser capability | Built-in Chrome extension | Requires tools like Playwright |
| Setup difficulty | Beginner-friendly | Requires technical knowledge |
| Flexibility | Pre-built connectors | Unlimited custom servers |

## ✍️ Hands-On Exercises

**Exercise 1: Connect Your First Connector**

Follow these steps to connect Google Drive (or any available connector) to Cowork:
1. Open Cowork and click the **+** icon.
2. Go to the **Connectors** tab.
3. Search for "Google Drive" (or another service you use).
4. Click **Connect** and complete the authorization.
5. Once connected, ask Cowork: "List all files in my Google Drive root folder."
6. Verify that the output matches what you see in your actual Google Drive.

> Hint: If you do not have Google Drive, try connecting GitHub instead and ask Cowork to list your repositories.

**Exercise 2: Plan Your Connector Strategy**

Think about the tools you use daily at work. Create a table like this:

| Tool I Use | Connector Available? | Permission Level I Would Set |
|---|---|---|
| Google Drive | Yes (native) | Always allow (read), Ask first (write) |
| Slack | Yes (native) | Ask first |
| My CRM | Maybe (via Zapier) | Ask first |
| Company wiki | No | Browser extension fallback |

Fill in at least 5 tools. For each one, decide whether you would use a native connector, Zapier, the browser extension, or if it is not possible.

> Hint: Always prefer native connectors over Zapier, and Zapier over the browser extension. Use the three-layer priority system.

## 🔗 Next Step

In the next module (6.5), we will explore automation and scheduling — how to turn your Cowork tasks into recurring workflows that run automatically. You will learn about Skills, Plugins, Scheduled Tasks, and the powerful Dispatch Mode.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="0">
<p>1. In Cowork's three-layer capability architecture, what is the first choice for interacting with external services?</p>
<label><input type="radio" name="q1" value="0"> Connectors (MCP) -- direct API integration</label>
<label><input type="radio" name="q1" value="1"> Browser extension -- read and interact with web pages</label>
<label><input type="radio" name="q1" value="2"> Computer Use -- directly control the screen and mouse</label>
<label><input type="radio" name="q1" value="3"> Manual copy-paste from applications</label>
<div class="quiz-explain">The three layers are used in order of priority: Connectors (MCP) first for direct API integration, Browser extension second for web page interaction, and Computer Use as the last resort for screen control.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What is a critical risk to be aware of when using the Browser Extension?</p>
<label><input type="radio" name="q2" value="0"> It only works on Firefox</label>
<label><input type="radio" name="q2" value="1"> It requires a separate monthly subscription</label>
<label><input type="radio" name="q2" value="2"> Claude uses your real browser logged into your accounts and can complete payments</label>
<label><input type="radio" name="q2" value="3"> It can only read text, not interact with buttons</label>
<div class="quiz-explain">The Browser Extension uses your real browser with your logged-in accounts. Claude has the ability to complete payments and perform actions on your behalf, so setting up a blocklist for sensitive applications is essential.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. How does MCP configuration differ between Cowork and Claude Code?</p>
<label><input type="radio" name="q3" value="0"> Both use the same settings.json file</label>
<label><input type="radio" name="q3" value="1"> Cowork uses a GUI point-and-click approach; Claude Code uses settings.json configuration</label>
<label><input type="radio" name="q3" value="2"> Only Claude Code supports MCP</label>
<label><input type="radio" name="q3" value="3"> Cowork requires writing custom MCP servers; Claude Code does not</label>
<div class="quiz-explain">Cowork configures MCP through a graphical point-and-click interface with cloud-hosted servers, while Claude Code uses manual configuration in ~/.claude/settings.json with local stdio or SSE servers.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. In the library analogy, what does "having a library card with direct access to the stacks" represent?</p>
<label><input type="radio" name="q4" value="0"> Computer Use</label>
<label><input type="radio" name="q4" value="1"> Browser Extension</label>
<label><input type="radio" name="q4" value="2"> Manual copy-paste</label>
<label><input type="radio" name="q4" value="3"> Connectors (MCP) -- the fastest and most reliable access method</label>
<div class="quiz-explain">In the library analogy, having a library card with direct stack access represents Connectors (MCP) — the most direct, structured, and reliable way to interact with external services. The browser extension is like reading books on tables (less structured), and Computer Use is like looking through windows (least efficient).</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. What does Apify MCP allow Cowork to do?</p>
<label><input type="radio" name="q5" value="0"> Scrape data from websites like YouTube, TikTok, and Instagram using 1,300+ crawling tools</label>
<label><input type="radio" name="q5" value="1"> Send automated emails to customers</label>
<label><input type="radio" name="q5" value="2"> Create mobile applications</label>
<label><input type="radio" name="q5" value="3"> Host websites on the cloud</label>
<div class="quiz-explain">Apify MCP connects Cowork to Apify's library of 1,300+ web scraping tools. Claude automatically selects the most suitable scraper for the target website, allowing data extraction from YouTube, TikTok, Instagram, and many other sites.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. What permission level is recommended for most connected apps?</p>
<label><input type="radio" name="q6" value="0"> Always allow — for maximum speed</label>
<label><input type="radio" name="q6" value="1"> Ask first — so you confirm each action before it happens</label>
<label><input type="radio" name="q6" value="2"> Never allow — and manually approve each connector use</label>
<label><input type="radio" name="q6" value="3"> No permission settings are needed</label>
<div class="quiz-explain">"Ask first" is the recommended permission level for most apps. It provides a safety net by requiring your confirmation before Claude performs actions, while still being convenient. "Always allow" should only be used for trusted, low-risk read-only operations.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. How many apps can you potentially connect to Cowork through Zapier MCP?</p>
<label><input type="radio" name="q7" value="0"> About 50 popular apps</label>
<label><input type="radio" name="q7" value="1"> About 500 business apps</label>
<label><input type="radio" name="q7" value="2"> Over 8,000 apps including HubSpot, Airtable, and more</label>
<label><input type="radio" name="q7" value="3"> Only Google and Microsoft apps</label>
<div class="quiz-explain">Zapier MCP connects Cowork to over 8,000 apps. You create an MCP server in Zapier, select "Claude Cowork" as the client, configure which tools and actions are allowed, then paste the generated URL into Cowork's connectors.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>8. Before enabling Computer Use (Layer 3), what is the mandatory safety step?</p>
<label><input type="radio" name="q8" value="0"> Close all browser tabs</label>
<label><input type="radio" name="q8" value="1"> Disconnect from the internet</label>
<label><input type="radio" name="q8" value="2"> Switch to a guest user account</label>
<label><input type="radio" name="q8" value="3"> Add sensitive applications to the blocklist</label>
<div class="quiz-explain">Before enabling Computer Use, you must add sensitive applications (banking, payments, personal accounts) to the blocklist. Computer Use gives Claude control over your screen and mouse, so blocking sensitive apps prevents accidental or harmful actions.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
