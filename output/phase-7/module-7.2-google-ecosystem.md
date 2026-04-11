# 7.2 Google Ecosystem Integration

## Overview

Google's suite of tools is a daily essential for many teams. Both Claude Code and Cowork can deeply integrate with Google:

| Google Service | Claude Code Approach | Cowork Approach |
|----------------|---------------------|-----------------|
| Google Sheets | `gspread` + service account | Google Drive connector |
| Gmail | Gmail API + OAuth2 | Gmail connector |
| Google Drive | API or CLI | Drive connector |
| Google Calendar | API | Calendar connector |

## Google Sheets — Data Sync

### Claude Code Approach

Using the `gspread` Python library + service account:

```python
import gspread
from google.oauth2.service_account import Credentials

# Authentication
creds = Credentials.from_service_account_file(
    'google_credentials.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets']
)
gc = gspread.authorize(creds)

# Open spreadsheet
sh = gc.open('AUSZ Bookings')
worksheet = sh.sheet1

# Read all data
data = worksheet.get_all_records()

# Write data
worksheet.append_row(['2026-04-11', 'Sydney Airport', '$180'])
```

### Use Cases

- Automatically sync orders/bookings to Sheets
- Read configuration and parameters from Sheets
- Auto-populate monthly reports

## Gmail — Email Automation

### Claude Code Approach

Using the Gmail API + OAuth2:

```python
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# Authentication (requires token.json)
creds = Credentials.from_authorized_user_file('token.json')
service = build('gmail', 'v1', credentials=creds)

# Send email
message = create_message(
    sender='me',
    to='client@example.com',
    subject='Booking Confirmation',
    body='Your booking has been confirmed...'
)
service.users().messages().send(userId='me', body=message).execute()
```

### Cowork Approach

Directly in Cowork:
```
Connect Gmail connector → "Reply to this email, keep the tone professional"
```

### Use Cases

- Automatically send booking confirmation emails
- Batch send reports and invoices
- Read email content and sort/process it

## Google Calendar

### Cowork Approach (Simplest)

1. Connect the Google Calendar connector
2. Have Cowork read today's schedule
3. Combine it with the daily morning briefing workflow

### Claude Code Approach

Via the Google Calendar API or MCP server:

```bash
# If you have a Google Calendar MCP server
# Claude Code can directly query and create events
```

## Security Considerations

| File | Notes |
|------|-------|
| `credentials.json` | OAuth2 client secret — **never commit to Git** |
| `token.json` | User authorization token — **never commit to Git** |
| `google_credentials.json` | Service account key — **never commit to Git** |

Add to your `.gitignore`:
```
credentials.json
token.json
google_credentials.json
```

---

## Exercises

1. Set up Google Sheets integration and have Claude Code read a spreadsheet
2. Send a test email using the Gmail API
3. Connect Google Drive in Cowork and compare the convenience of both approaches
