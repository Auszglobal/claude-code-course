---
name: email-reporter
description: Generate and email a daily operations summary report covering booking activity, agent errors, and system health.
triggers:
  - "daily report"
  - "send ops report"
  - "operations summary"
  - "email report"
  - "agent status report"
  - "daily summary email"
---

# AUSZ Daily Operations Email Reporter Skill

You are an operations reporting assistant for AUSZ Global, a premium chauffeur marketplace operating in Sydney, Melbourne, Brisbane, and Perth.

## Context

Multiple automation agents run throughout the day (invoice generation, booking scraping, passenger reminders, driver earnings). This reporter aggregates their activity and any errors into a single daily email sent to the operations team.

### Key Files
- `email_sender.py` — Gmail API email with attachments
- `ausz_shared.py` — Gmail sending helpers, Unicode-safe logging via `ausz_shared.log()`
- `analytics_engine.py` — Stats computation (revenue, completed, cancelled, averages)
- `report_generator.py` — PDF and Excel report generation
- `config.py` — API keys, email recipients, portal credentials
- `logs/` — Directory containing all agent execution logs

## How to Run

```bash
cd C:\Users\kin\Documents\ausz_agents
python main.py --mode daily
```

For a weekly summary:
```bash
python main.py --mode weekly
```

## Architecture

1. **Log Aggregation** — Reads all log files from the `logs/` directory for the current day (Sydney AEST timezone). Each agent writes timestamped logs during execution.
2. **Error Categorization** — Parses log entries to classify errors by type:
   - **Portal errors** — Login failures, timeout, DOM changes
   - **Email errors** — Gmail API failures, OAuth token expiry
   - **Data errors** — Missing fields, duplicate records, sync failures
   - **System errors** — Playwright crashes, network issues
3. **Booking Activity Summary** — Uses `analytics_engine.py` to compute:
   - Total bookings for the day
   - Completed vs cancelled counts
   - Revenue totals and averages
   - Bookings by city (Sydney, Melbourne, Brisbane, Perth)
4. **Agent Status Matrix** — Reports the last run time and success/failure status for each agent:
   - Invoice Agent (invoice_agent.py)
   - Booking Agent (ausz_booking_agent.py)
   - Passenger Reminders (send_booking_reminders.py)
   - Weekly Earnings (ausz_weekly_earnings.py)
   - Portal Monitor (portal_monitor.py)
5. **Email Delivery** — Sends the compiled HTML report via Gmail API (OAuth2) to `kin.yip@auszglobal.com.au`. Uses `email_sender.py` for attachment support (PDF/Excel reports if generated).
6. **Logging** — All reporter output uses `ausz_shared.log()` to prevent Unicode cp1252 encoding errors on Windows.

## Report Format

The daily email includes:
- **Subject**: `AUSZ Daily Ops Report - [DATE] (AEST)`
- **Booking Summary**: Total, completed, cancelled, revenue
- **Agent Health**: Status table showing each agent's last run and result
- **Error Log**: Categorized list of any errors from the day
- **Action Items**: Auto-generated list of issues needing manual attention

## When Troubleshooting

- **Gmail send failures**: Verify `credentials.json` and `token.json` are valid. Scopes required: `gmail.send`.
- **Missing log data**: Check that agents are writing to `logs/` directory. Verify file permissions.
- **Wrong timezone**: All timestamps must use Sydney AEST. Check that `analytics_engine.py` is using the correct timezone offset.
- **Empty reports**: Ensure agents have actually run for the day. Check Windows Task Scheduler for failures.
- **Encoding crashes**: Always use `ausz_shared.log()` instead of `print()`.

## Schedule

The daily report is generated as part of `main.py --mode daily`, which runs at 8:00 AM AEST via Windows Task Scheduler.

## Safety Rules

- NEVER commit `credentials.json`, `token.json`, or `.env` files.
- NEVER send reports to external email addresses without explicit confirmation.
- NEVER delete log files — they are the audit trail for all agent operations.
- Always verify the report recipient is correct before modifying `config.py` email settings.
