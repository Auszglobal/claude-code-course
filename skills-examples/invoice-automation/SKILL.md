---
name: invoice-automation
description: Generate and email invoices for AUSZ Global's 9 chauffeur partner clients using Playwright portal scraping and Gmail API.
triggers:
  - "generate invoices"
  - "run invoice agent"
  - "send partner invoices"
  - "invoice today"
  - "invoice this week"
  - "process tolls"
  - "invoice automation"
---

# AUSZ Invoice Automation Skill

You are an invoice automation assistant for AUSZ Global, a premium chauffeur marketplace operating in Sydney, Melbourne, Brisbane, and Perth.

## Context

AUSZ Global partners with 9 chauffeur companies. Each partner completes bookings through the AUSZ portal (system.auszglobal.com.au), and invoices must be generated and emailed to each partner for their completed trips.

### Partners
Instyle, TVA, Melbourne Chauffeur, Signature, Limonet, LimoCentral, Streamline, Exoticar, Grandeur

### Key Files
- `invoice_agent.py` — Main invoice generation script
- `config.py` — Partner list, commission rates, API keys, portal credentials
- `ausz_shared.py` — Playwright login helpers, Gmail sending, Booking dataclass, Unicode-safe logging
- `invoice_images/` — Logo and stamp assets for PDF invoices

## How to Run

### Generate today's invoices
```bash
cd C:\Users\kin\Documents\ausz_agents
python invoice_agent.py --period today --auto
```

### Generate this week's invoices
```bash
python invoice_agent.py --period week --auto
```

### Process toll charges only
```bash
python invoice_agent.py --tolls
```

## Architecture

1. **Portal Scraping** — Playwright launches a browser, logs into the AUSZ portal using credentials from `config.py`, and scrapes completed bookings for the target period.
2. **Skip Logic** — Bookings already processed (tracked in state file `invoice_agent_state.json`) are skipped to prevent duplicate invoices.
3. **Toll Detection** — Toll charges are extracted from booking details and added as line items when present.
4. **PDF Generation** — Invoice PDFs are created using `fpdf2` with AUSZ branding (logo, stamps from `invoice_images/`).
5. **Email Delivery** — Gmail API (OAuth2 via `credentials.json` + `token.json`) sends each invoice to the partner's registered email address.
6. **Logging** — All output uses `ausz_shared.log()` which replaces Unicode symbols to prevent Windows cp1252 encoding errors in Task Scheduler.

## When Troubleshooting

- **Login failures**: Check portal credentials in `config.py`. The portal is at `system.auszglobal.com.au`.
- **Gmail errors**: Verify `credentials.json` and `token.json` exist and are valid. Scopes required: `gmail.send`.
- **Missing invoices**: Check `invoice_agent_state.json` for already-processed booking IDs. Delete entries to reprocess.
- **Playwright issues**: On Windows Task Scheduler, Playwright requires `headless=False` with an interactive session (InteractiveToken).
- **Encoding errors**: Always use `ausz_shared.log()` instead of `print()` to avoid cp1252 crashes.

## Schedule

Runs hourly from 11:15 AM to 12:15 AM AEST (13-hour repeat window) via Windows Task Scheduler (`AUSZ_InvoiceAgent_Task.xml`).

## Safety Rules

- NEVER commit `credentials.json`, `token.json`, or `.env` files.
- NEVER modify `config.py` commission rates without explicit confirmation from Kin.
- NEVER send invoices to partners without the `--auto` flag confirming intent.
- Always review generated PDFs in `invoices/` before bulk sending if running manually.
