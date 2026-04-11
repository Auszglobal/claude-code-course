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

## Exercises

1. Connect a Connector (e.g., Google Drive)
2. Try having Cowork read and organize documents through the connector
3. Compare the configuration approaches of Cowork MCP vs Claude Code MCP
