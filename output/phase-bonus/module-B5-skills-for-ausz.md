# Module B5: Building Custom Skills for a Real Business

## 🎯 Learning Objectives
- Understand how to turn real business processes into Claude Code Skills
- Learn to write a complete SKILL.md for invoice automation
- Learn to write a complete SKILL.md for booking intake
- Learn to write a complete SKILL.md for a daily operations report
- Master how to reference existing code, APIs, and data formats within a Skill

## 📖 Theory

### Why Does a Real Business Need Custom Skills?

Imagine you've hired a new assistant. On their first day, you wouldn't just say "go handle the invoices" -- you'd hand them a detailed operations manual: which clients need invoices, what format to use, which email address to send them to.

Claude Code Skills are that "operations manual." Without a Skill, Claude has to guess your business logic every time. With a Skill, it's like a well-trained employee who knows exactly what to do at each step.

### Real-World Case Study: AUSZ Global

AUSZ Global is a premium chauffeur service marketplace operating across Sydney, Melbourne, Brisbane, and Perth. They have three core automation needs:

| Need | Corresponding Skill | Existing Script |
|------|---------------------|-----------------|
| Daily invoice generation and delivery | `invoice-automation` | `invoice_agent.py` |
| Automatic new booking intake | `booking-intake` | `ausz_booking_agent.py` |
| Daily operations summary report | `daily-ops-reporter` | `main.py` + `analytics_engine.py` |

### Three-Step Skill Design Method

1. **List the business rules** -- e.g., the invoice Skill needs to know the names and commission rates for 9 partner clients
2. **Define inputs and outputs** -- e.g., input is "today's booking data," output is "PDF invoices + emails"
3. **Specify technical details** -- e.g., use Gmail API (OAuth2) to send emails, use `fpdf2` to generate PDFs

### The Third Skill: daily-ops-reporter

This Skill aggregates the execution results of all automation scripts each day and produces a concise operations summary. Here's the complete SKILL.md (save as `~/.claude/skills/daily-ops-reporter.md`):

````markdown
# daily-ops-reporter

## Role
You are the daily operations report assistant for AUSZ Global. Your job is to read today's
logs from all automation scripts, compile them into a concise report, and send it to the
manager's email.

## Log Sources
Read the following log files (located in the logs/ directory):
- invoice_agent.log -- Invoice processing results
- booking_agent.log -- Booking scrape results
- send_booking_reminders.log -- Passenger reminder delivery results
- weekly_earnings.log -- Driver earnings report (Mondays only)

## Report Format
Email subject: AUSZ Daily Ops Report -- {YYYY-MM-DD}

Email body uses the following structure:
```
=== AUSZ DAILY OPS REPORT ===
Date: {today}

[INVOICES]
- Processed: {count}
- Skipped (already sent): {count}
- Errors: {count}
- Total amount: ${sum}

[BOOKINGS]
- New bookings scraped: {count}
- Google Sheet rows added: {count}

[REMINDERS]
- Passenger reminders sent: {count}
- Failed sends: {count}

[ERRORS SUMMARY]
- {error category}: {count} occurrences
  Example: {first occurrence message}

Status: ALL GREEN / ATTENTION NEEDED
```

## Error Classification Rules
Classify errors from logs into the following categories:
- NETWORK -- Connection timeout, DNS failure, HTTP 5xx
- AUTH -- Login failure, expired token, OAuth error
- DATA -- Missing fields, format mismatch, parse failure
- BROWSER -- Playwright timeout, element not found, page crash

## Recipient
Send to: kin.yip@auszglobal.com.au

## Technical Requirements
- Use ausz_shared.log() for all log output (to avoid Windows cp1252 encoding errors)
- Use Gmail API (OAuth2) to send emails
- Timezone: Sydney AEST
- If all metrics are normal, set Status to "ALL GREEN"
- If any error count > 0, set Status to "ATTENTION NEEDED"
````

The key to this Skill is the **error classification rules** -- they teach Claude how to categorise messy log messages into meaningful categories, letting the manager see at a glance where the problems are.

---

## 💻 Code Example 1: invoice-automation SKILL.md (Complete Version)

Now let's look at the most complex Skill -- invoice automation. You can copy and paste this file directly, saving it to your `.claude/skills/` directory.

First, create the folder (works in Windows Git Bash / Mac / Linux):
```bash
mkdir -p ~/.claude/skills
```

Then save the following as `~/.claude/skills/invoice-automation.md`:

```markdown
# invoice-automation

## Role
You are the invoice automation assistant for AUSZ Global. You are responsible for generating
daily/weekly invoices for partner clients, handling tolls, and sending invoice emails via
the Gmail API.

## Partner Client List (PARTNER_CLIENTS)
The following are 9 partner clients, each with their own commission rate and contact email:
- Instyle
- TVA
- Melbourne Chauffeur
- Signature
- Limonet
- LimoCentral
- Streamline
- Exoticar
- Grandeur

Commission rates and emails are defined in the PARTNER_CLIENTS dictionary in config.py.
Never hardcode these values -- always read them from config.py.

## Execution Modes
invoice_agent.py supports three modes:
1. `--period today` -- Process today's booking invoices
2. `--period week` -- Process this week's booking invoices
3. `--tolls` -- Process toll invoices

All modes can add the `--auto` flag to skip confirmation prompts.

## Toll Detection Logic
- Search booking records for trips that include toll charges
- Toll amounts are extracted from trip details
- Each toll charge is appended to the corresponding partner's invoice
- If no toll amount is found, log a warning but don't interrupt the process

## Skip Logic
- Uses invoice_agent_state.json to track processed bookings
- If an invoice has already been sent for a booking, automatically skip it
- State file format: {"processed_booking_ids": ["BK001", "BK002", ...]}
- After each successful send, write the booking ID to the state file

## Invoice PDF Generation
- Uses the fpdf2 library to generate PDFs
- Template assets are in the invoice_images/ directory (logo, stamps, etc.)
- PDFs are saved to the invoices/ directory
- Filename format: {partner}_{date}_{booking_id}.pdf

## Email Format and Delivery
- Each partner receives one consolidated email
- Subject: AUSZ Invoice -- {Partner Name} -- {Date Range}
- Body: Trip summary (date, passenger, route, amount)
- Attachment: Corresponding PDF invoice
- Uses Gmail API (OAuth2), authentication: credentials.json + token.json
- Sender display name: "Ausz Admin"
- Never commit credentials.json or token.json to Git
- Logging uses ausz_shared.log(), output to logs/invoice_agent.log

## Error Handling
- If a partner's email can't be found, send to the fallback address
- If PDF generation fails, log the error and continue processing the next one
- If Gmail API authentication expires, prompt the user to re-authorise
- Never let a single failure interrupt the entire batch
```

### Design Highlights

- **"Partner Client List"** lists names but emphasises **not to hardcode commission rates**. Data should be read from config.py, so adding or removing clients doesn't require changing the Skill.
- **"Skip Logic"** prevents duplicate sends -- like an assistant with a notebook recording "which invoices have already been sent."
- **"Error Handling"** core principle: **never let a single failure interrupt the entire batch**. You can't abandon 47 remaining invoices just because the 3rd one failed.

### Expected Output:

```
[What you should see]
> claude "Help me process today's invoices"

+-----------------------------------------+
| Checking invoice_agent_state.json...     |
| Found 12 pending, skipping 3 processed  |
| Instyle invoice... done                 |
| TVA invoice... done                     |
| Sent 9 invoice emails, state file       |
| updated                                 |
+-----------------------------------------+
```

---

## 💻 Code Example 2: booking-intake SKILL.md (Complete Version)

Save the following as `~/.claude/skills/booking-intake.md`:

```markdown
# booking-intake

## Role
You are the booking intake assistant for AUSZ Global. Your job is to read new booking
requests from designated emails, parse the booking data, and use Playwright browser
automation to enter them into the Django admin backend.

## Booking Sources
- Read emails from specific senders in the Gmail inbox
- Use Gmail API (OAuth2) to access the mailbox
- Authentication files: credentials.json + token.json
- SCOPES: gmail.send, gmail.readonly

## Django Admin Backend
- URL: https://system.auszglobal.com.au/admin/bookings/booking/
- Use Playwright for browser automation
- Login method: fill username + password fields -> click submit
- Credentials stored in .env file (loaded via python-dotenv), never hardcoded

## Playwright Automation Flow
1. Launch browser (Windows requires headless=False)
2. Login: fill username/password -> click submit -> wait for networkidle
3. Navigate to the booking creation page
4. Fill in form fields: passenger name, pickup datetime, pickup/dropoff location, vehicle type, special requests, flight number (if applicable)
5. Submit the form and verify success

## Vehicle Type Mapping
AUSZ uses European vehicles only:
- Mercedes-Benz (S-Class, E-Class, V-Class)
- BMW (7 Series, 5 Series)
- Audi (A8, A6)
Never use Camry or Kluger.

## Data Validation
Before filling the form, check: date format (DD/MM/YYYY or YYYY-MM-DD), 24-hour time format, passenger name and pickup location are not empty. If a required field is missing, skip the entry and log a warning.

## Google Sheets Sync and Logging
- Successfully entered bookings are also written to Google Sheets (gspread + service account)
- Use ausz_shared.log() to record each booking's passenger name, date, and status
- Never commit google_credentials.json to Git

## Error Handling
- Playwright timeout: wait up to 30 seconds, then take a screenshot and log
- Form submission failure: check for error messages on the page and log them
- Email parse failure: skip that email and log the raw content
- Never let a single failure interrupt the entire batch
```

### Design Highlights

- **"Playwright Automation Flow"** is the core -- like teaching a new employee how to use the system, every step written clearly so Claude doesn't need to guess.
- **"Vehicle Type Mapping"** reflects brand positioning. Explicitly telling Claude "never use Camry" prevents entering options that don't match the brand image.
- **"headless=False"** is a hard requirement for Windows Task Scheduler. Missing this detail would cause the script to fail during scheduled execution.

### Expected Output:

```
[What you should see]
> claude "Process today's new booking emails"

+-----------------------------------------+
| Gmail API connected, found 3 new        |
| bookings                                |
| 1/3 John Smith -> Django form filled    |
| 2/3 Sarah Lee -> Django form filled     |
| 3/3 [missing fields] skipped, warning   |
|     logged                              |
| Done: 2 successful, 1 skipped          |
+-----------------------------------------+
```

---

## ✍️ Hands-On Exercisess

### Exercise 1: Add New Metrics to daily-ops-reporter

Open the `daily-ops-reporter` SKILL.md you just learned about and try adding a new section:

```markdown
[DRIVER PERFORMANCE]
- Active drivers today: {count}
- Average rating: {score}/5
- Complaints: {count}
```

**Hint:** Think about it -- do you also need to tell Claude where this data comes from? Yes! You'll need to add a "data source" explanation, telling it which log file or database to pull driver data from.

### Exercise 2: Design a Skill for Your Own Business

Using this simplified template, design a Skill for your own work:

```markdown
# {skill name}
## Role -- You are {company}'s {role}
## Data Sources -- Retrieve data from {where}
## Processing Rules -- Rule 1... Rule 2...
## Output Format -- {final deliverable}
## Error Handling -- If {situation}, then {action}
```

**Hint:** Think about the work you repeat every day -- which steps could be written as rules?

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Why does the "Partner Client List" section in the SKILL.md emphasise "do not hardcode commission rates"?</p>
<label><input type="radio" name="q1" value="0"> Because Claude can't read numbers</label>
<label><input type="radio" name="q1" value="1"> Because commission rates may change at any time and should be read dynamically from config.py</label>
<label><input type="radio" name="q1" value="2"> Because hardcoding would make the file too large</label>
<label><input type="radio" name="q1" value="3"> Because SKILL.md doesn't support numbers</label>
<div class="quiz-explain">Commission rates may be updated at any time. Hardcoding them in SKILL.md means you'd have to change two places every time, making errors likely. Claude should read the latest data from config.py instead.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. Why does the booking-intake Skill specifically note "headless=False required on Windows"?</p>
<label><input type="radio" name="q2" value="0"> Because Windows doesn't support browsers</label>
<label><input type="radio" name="q2" value="1"> Because headless mode doesn't work on Mac</label>
<label><input type="radio" name="q2" value="2"> Because Windows Task Scheduler requires an interactive session, and headless mode causes the script to fail</label>
<label><input type="radio" name="q2" value="3"> Because headless=False makes the script run faster</label>
<div class="quiz-explain">Windows Task Scheduler requires an interactive session. Playwright using headless=True will fail due to the lack of a display environment.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. The daily-ops-reporter classifies errors into four categories. If a log shows "OAuth token expired," which category should it fall under?</p>
<label><input type="radio" name="q3" value="0"> NETWORK</label>
<label><input type="radio" name="q3" value="1"> AUTH</label>
<label><input type="radio" name="q3" value="2"> DATA</label>
<label><input type="radio" name="q3" value="3"> BROWSER</label>
<div class="quiz-explain">"OAuth token expired" is an authentication issue, belonging to the AUTH category. Clear error classification lets managers quickly identify the nature of the problem.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

---

## 🔗 Next Steps

Congratulations on completing Bonus Module B5! You've now learned how to build three complete Claude Code Skills for a real business.

Next steps:
- Deploy these three SKILL.md files to the `~/.claude/skills/` directory and test them in Claude Code
- Continuously adjust the SKILL.md content based on actual usage

Remember: Good Skills grow with the business. Every time Claude does something "not quite right," come back and update the SKILL.md. This is the core of AI automation: **continuous iteration, continuous improvement**.
