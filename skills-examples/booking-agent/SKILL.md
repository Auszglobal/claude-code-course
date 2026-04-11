---
name: booking-agent
description: Scrape new bookings from the AUSZ portal and sync them incrementally to Google Sheets and SQLite.
triggers:
  - "scrape bookings"
  - "run booking agent"
  - "sync bookings"
  - "update booking sheet"
  - "booking intake"
  - "fetch new bookings"
---

# AUSZ Booking Intake Agent Skill

You are a booking data automation assistant for AUSZ Global, a premium chauffeur marketplace operating in Sydney, Melbourne, Brisbane, and Perth.

## Context

New bookings are created on the AUSZ portal (system.auszglobal.com.au). This agent scrapes those bookings, stores them in a local SQLite database, and syncs them to a Google Sheet for the operations team to review.

### Key Files
- `ausz_booking_agent.py` — Main booking scraper and sync script
- `ausz_shared.py` — Playwright login helpers, Booking dataclass, Unicode-safe logging
- `database.py` — SQLite schema and query helpers (bookings + scrape_log tables)
- `sheets_sync.py` — Google Sheets integration via `gspread` + service account
- `config.py` — Portal credentials, Google Sheet ID, API configuration
- `booking_scraper.py` — Async Playwright scraper for portal bookings

## How to Run

```bash
cd C:\Users\kin\Documents\ausz_agents
python ausz_booking_agent.py
```

This performs an incremental scrape: only new bookings since the last run are fetched and synced.

## Architecture

1. **Portal Login** — Playwright opens `system.auszglobal.com.au`, fills username/password from `config.py`, clicks submit, and waits for `networkidle`.
2. **Booking Scrape** — Navigates to the bookings list, extracts booking details (date, time, passenger, pickup, dropoff, vehicle, driver, status). Uses the `Booking` dataclass from `ausz_shared.py` for type safety.
3. **SQLite Storage** — New bookings are inserted into the local SQLite database via `database.py`. The `scrape_log` table tracks when each scrape ran for audit purposes.
4. **Incremental Logic** — The agent checks the last scrape timestamp and only processes bookings created after that point, preventing duplicates.
5. **Google Sheets Sync** — `sheets_sync.py` uses `gspread` with a service account (`google_credentials.json`) to append new rows to the configured Google Sheet.
6. **Logging** — All output uses `ausz_shared.log()` for Unicode-safe logging compatible with Windows Task Scheduler.

## When Troubleshooting

- **Login failures**: Verify portal credentials in `config.py`. The portal URL is `system.auszglobal.com.au`.
- **Google Sheets errors**: Check that `google_credentials.json` exists and the service account has edit access to the target spreadsheet.
- **Duplicate bookings**: Inspect the `scrape_log` table in SQLite to verify the last scrape timestamp. The database file is `bookings.db`.
- **Playwright crashes**: On Windows Task Scheduler, ensure the task uses `InteractiveToken` and `headless=False`.
- **Empty scrape results**: The portal may have changed its DOM structure. Check `booking_scraper.py` selectors.
- **Encoding issues**: Always use `ausz_shared.log()` instead of `print()`.

## Schedule

Runs daily at 6:00 AM AEST via Windows Task Scheduler (`AUSZ_BookingAgent_Task.xml`).

## Database Schema

The SQLite database (`bookings.db`) has two key tables:
- `bookings` — All scraped booking records with full details
- `scrape_log` — Timestamps and status of each scrape run

Use `database.py` helper functions for all queries rather than raw SQL.

## Safety Rules

- NEVER commit `google_credentials.json`, `credentials.json`, or `.env` files.
- NEVER delete or truncate the SQLite database without explicit confirmation.
- NEVER modify Google Sheet structure (columns, headers) without checking `sheets_sync.py` first.
- Always verify the scrape count after running to confirm expected results.
