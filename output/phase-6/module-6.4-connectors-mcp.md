# 6.4 Connectors, MCP, and Browser Capabilities

## Three-Layer Capability Architecture

Cowork's ability to interact with the outside world is divided into three layers, used in order of priority:

```
1. Connectors (MCP)    → First choice: direct API integration
2. Browser extension    → Second choice: read and interact with web pages
3. Computer Use         → Last resort: directly control the screen and mouse
```

## Layer 1: Connectors (MCP)

MCP (Model Context Protocol) lets Claude operate directly within applications — not copy-paste, but authorized direct access.

### Natively Supported Apps

- Google Drive
- Notion
- Slack
- Gmail
- GitHub
- Figma

### How to Connect

1. Click the **+** icon in the chat interface
2. Go to the **Connectors** tab
3. Search for the tool you need
4. Complete authorization in the browser

### Permission Controls

Each connected app can be configured individually:
- **Always allow** — Permit without asking
- **Ask first** — Requires confirmation
- **Never allow** — Block access

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
4. Copy the generated URL → paste it into Claude connectors

## Layer 2: Browser Extension

Used when no connector is available.

### Installation

1. Search "Claude" in the Chrome Web Store
2. Install and pin it to the toolbar
3. Settings → Enable "Claude in Chrome"

### Capabilities

- Automatically opens browser tabs
- Visits and reads web page content
- Understands page structure (headings, CTAs, layout)
- Multi-step operations (open YouTube → analyze video metrics)

> **Important risk warning**: Claude uses your real browser, logged into your accounts. It has the ability to complete payments. Make sure to set up a blocklist.

## Layer 3: Computer Use

The ultimate fallback. Claude can:
- See your screen
- Control the mouse
- Type on the keyboard

**How to enable**: Settings → General → Computer Use

> **Must-do**: Add sensitive applications to the blocklist before enabling this.

## Comparing MCP in Cowork vs Claude Code

| Feature | Cowork MCP | Claude Code MCP |
|---------|------------|-----------------|
| Configuration | GUI point-and-click | `~/.claude/settings.json` configuration |
| Server type | Cloud-hosted | Local stdio or SSE |
| Custom MCP | Via Zapier/Apify | Write your own MCP server |
| Browser capability | Built-in Chrome extension | Requires tools like Playwright |

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

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## Exercises

1. Connect a Connector (e.g., Google Drive)
2. Try having Cowork read and organize documents through the connector
3. Compare the configuration approaches of Cowork MCP vs Claude Code MCP
