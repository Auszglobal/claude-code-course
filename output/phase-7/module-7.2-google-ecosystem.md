# 7.2 Google Ecosystem Integration

## 🎯 Learning Objectives

After completing this module, you will be able to:
- Understand how Claude Code connects to Google Sheets, Gmail, Drive, and Calendar
- Use the `gspread` library to read and write Google Sheets data programmatically
- Send automated emails through the Gmail API with Claude Code's help
- Keep your Google credentials secure and out of your Git repository
- Choose the right approach (Claude Code vs Cowork) for each Google service

## 📖 Theory Explanation

### Why Integrate with Google?

Google's suite of tools is a daily essential for many teams. Think of Google Workspace as the "office supplies" of the digital world — Sheets is your spreadsheet, Gmail is your mailbox, Drive is your filing cabinet, and Calendar is your planner. Millions of businesses already use these tools every day.

The power of integrating Claude Code with Google is that you can **automate the tedious parts**. Instead of manually copying data into a spreadsheet every evening, Claude Code can do it for you. Instead of sending the same confirmation email to 50 clients by hand, Claude Code can send them all in seconds.

There are two main approaches to Google integration:

- **Claude Code approach**: Write Python scripts that use Google's APIs. This is more powerful, fully automatable, and can run on a schedule (via cron or Task Scheduler).
- **Cowork approach**: Connect a Google connector directly and use natural language. This is simpler but works best for one-off tasks.

Think of it like cooking: Claude Code is like having a programmable slow cooker (set it up once and it runs by itself), while Cowork is like having a helpful kitchen assistant you give verbal instructions to.

| Google Service | Claude Code Approach | Cowork Approach |
|----------------|---------------------|-----------------|
| Google Sheets | `gspread` + service account | Google Drive connector |
| Gmail | Gmail API + OAuth2 | Gmail connector |
| Google Drive | API or CLI | Drive connector |
| Google Calendar | API | Calendar connector |

### Setting Up Google API Access (The Prerequisites)

Before any code can talk to Google, you need to set up a **service account** or **OAuth2 credentials** in the Google Cloud Console. Think of this like getting a key card to enter an office building — Google needs to know who is accessing the data and that they have permission.

Here is the high-level process:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or select an existing one)
3. Enable the API you need (Sheets API, Gmail API, etc.)
4. Create credentials (service account for Sheets, OAuth2 for Gmail)
5. Download the credentials JSON file
6. Share your Google Sheet with the service account email (for Sheets access)

Don't worry if this sounds complicated — Claude Code can walk you through each step!

## 💻 Code Example 1: Reading and Writing Google Sheets

Google Sheets is the most common Google integration. Using the `gspread` Python library with a service account, you can read, write, and update any spreadsheet that has been shared with your service account.

```python
import gspread
from google.oauth2.service_account import Credentials

# Step 1: Set up authentication using your service account key file
# This file was downloaded from Google Cloud Console
creds = Credentials.from_service_account_file(
    'google_credentials.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets']
)

# Step 2: Authorize and connect to Google Sheets
gc = gspread.authorize(creds)

# Step 3: Open a specific spreadsheet by its name
# (The spreadsheet must be shared with the service account email)
sh = gc.open('AUSZ Bookings')
worksheet = sh.sheet1

# Step 4: Read all rows as a list of dictionaries
data = worksheet.get_all_records()
print(f"Found {len(data)} rows of data")
for row in data[:3]:  # Print first 3 rows
    print(row)

# Step 5: Add a new row at the bottom
worksheet.append_row(['2026-04-11', 'Sydney Airport', '$180'])
print("New row added successfully!")

# Step 6: Update a specific cell (row 2, column 3)
worksheet.update_cell(2, 3, '$200')
print("Cell updated!")
```

### Expected Output:
```
Found 24 rows of data
{'Date': '2026-04-01', 'Pickup': 'CBD', 'Price': '$120'}
{'Date': '2026-04-02', 'Pickup': 'Airport', 'Price': '$180'}
{'Date': '2026-04-03', 'Pickup': 'Suburb', 'Price': '$95'}
New row added successfully!
Cell updated!
```

### Use Cases

- Automatically sync orders/bookings to Sheets every day
- Read configuration and parameters from Sheets (so non-technical team members can update settings)
- Auto-populate monthly reports with calculated totals

## 💻 Code Example 2: Sending Automated Emails via Gmail API

The Gmail API lets you send emails programmatically. This is perfect for automated notifications, reports, and confirmations. Note that Gmail uses OAuth2 (not a service account), which means you need to authorize the app once through a browser.

```python
import base64
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# Step 1: Load the authorization token
# (token.json is created after the first OAuth2 login)
creds = Credentials.from_authorized_user_file('token.json')

# Step 2: Build the Gmail service client
service = build('gmail', 'v1', credentials=creds)

# Step 3: Create the email message
def create_message(sender, to, subject, body):
    """Create an email message in the format Gmail API expects."""
    message = MIMEText(body)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    # Gmail API requires base64url encoding
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw}

# Step 4: Send the email
email = create_message(
    sender='me',
    to='client@example.com',
    subject='Booking Confirmation — April 11',
    body='Hi there!\n\nYour booking for April 11 has been confirmed.\n'
         'Pickup: Sydney Airport\nTime: 2:00 PM\n\nThank you!'
)
result = service.users().messages().send(userId='me', body=email).execute()
print(f"Email sent! Message ID: {result['id']}")
```

### Expected Output:
```
Email sent! Message ID: 18e5a3b2c4d6f789
```

### Cowork Approach (For Comparison)

In Cowork, Gmail is much simpler — no code required:
```
Connect Gmail connector → "Reply to this email, keep the tone professional"
```

This is great for one-off replies, but it cannot run on a schedule or handle bulk operations like sending 50 confirmation emails.

## Google Calendar

### Cowork Approach (Simplest)

1. Connect the Google Calendar connector
2. Have Cowork read today's schedule
3. Combine it with the daily morning briefing workflow

### Claude Code Approach

Via the Google Calendar API or MCP server:

```python
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

# Authenticate (similar to Gmail)
creds = Credentials.from_authorized_user_file('token.json')
service = build('calendar', 'v3', credentials=creds)

# List today's events
from datetime import datetime, timezone
now = datetime.now(timezone.utc).isoformat()
events = service.events().list(
    calendarId='primary',
    timeMin=now,
    maxResults=5,
    singleEvents=True,
    orderBy='startTime'
).execute()

for event in events.get('items', []):
    start = event['start'].get('dateTime', event['start'].get('date'))
    print(f"{start}: {event['summary']}")
```

## Security Considerations

Keeping your credentials safe is absolutely critical. If someone gets your Google credentials, they can read your emails, edit your spreadsheets, and access your private files. Treat these files like your house keys — never leave them lying around.

| File | Notes |
|------|-------|
| `credentials.json` | OAuth2 client secret — **never commit to Git** |
| `token.json` | User authorization token — **never commit to Git** |
| `google_credentials.json` | Service account key — **never commit to Git** |

Add to your `.gitignore` immediately:
```
credentials.json
token.json
google_credentials.json
*.pem
```

> Pro tip: If you accidentally commit a credentials file, consider it compromised. Revoke it in Google Cloud Console and generate a new one immediately.

## ✍️ Hands-On Exercises

**Exercise 1: Read a Google Sheet**

1. Create a Google Sheet with some sample data (e.g., a list of bookings with Date, Location, Price columns)
2. Set up a service account in Google Cloud Console and download `google_credentials.json`
3. Share the spreadsheet with the service account email address
4. Ask Claude Code: "Write a Python script using gspread to read all rows from my Google Sheet called [your sheet name] and print them"
5. Run the script and verify you see your data in the terminal

> Hint: The service account email looks like `my-service@my-project.iam.gserviceaccount.com`. You find it in the JSON file under `client_email`.

**Exercise 2: Send a Test Email**

1. Set up Gmail API OAuth2 credentials in Google Cloud Console
2. Ask Claude Code: "Help me set up a Gmail API integration to send a test email to myself"
3. Complete the OAuth2 authorization flow (a browser window will open)
4. Send a test email and verify you receive it in your inbox

> Hint: For testing, send the email to yourself! Set both `sender` and `to` to your own email address.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. Which Python library does Claude Code use to integrate with Google Sheets?</p>
<label><input type="radio" name="q1" value="0"> google-sheets-api</label>
<label><input type="radio" name="q1" value="1"> pygsheets</label>
<label><input type="radio" name="q1" value="2"> gspread + service account</label>
<label><input type="radio" name="q1" value="3"> openpyxl</label>
<div class="quiz-explain">Claude Code uses the <code>gspread</code> library with a Google service account for Sheets integration. This allows reading, writing, and syncing data with Google Sheets programmatically.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. Which of these files should NEVER be committed to Git?</p>
<label><input type="radio" name="q2" value="0"> requirements.txt</label>
<label><input type="radio" name="q2" value="1"> credentials.json and token.json</label>
<label><input type="radio" name="q2" value="2"> CLAUDE.md</label>
<label><input type="radio" name="q2" value="3"> package.json</label>
<div class="quiz-explain">credentials.json (OAuth2 client secret), token.json (user authorization token), and google_credentials.json (service account key) must never be committed to Git. They should be added to .gitignore.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>3. What is the simplest way to integrate Google Calendar with Cowork?</p>
<label><input type="radio" name="q3" value="0"> Write a Python script using the Calendar API</label>
<label><input type="radio" name="q3" value="1"> Set up an MCP server for Google Calendar</label>
<label><input type="radio" name="q3" value="2"> Use a Zapier integration</label>
<label><input type="radio" name="q3" value="3"> Connect the Google Calendar connector directly in Cowork</label>
<div class="quiz-explain">The simplest approach is to connect the Google Calendar connector directly in Cowork's interface. This allows Cowork to read your schedule and combine it with workflows like the daily morning briefing -- no code required.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. What must you do before a service account can access a specific Google Sheet?</p>
<label><input type="radio" name="q4" value="0"> Share the spreadsheet with the service account's email address</label>
<label><input type="radio" name="q4" value="1"> Install a Chrome extension for Google Sheets API</label>
<label><input type="radio" name="q4" value="2"> Make the spreadsheet public on the internet</label>
<label><input type="radio" name="q4" value="3"> Upload the spreadsheet to Google Cloud Storage</label>
<div class="quiz-explain">A service account works like a special Google user. To access a spreadsheet, you must share the sheet with the service account's email address (found in the credentials JSON file as <code>client_email</code>), just like sharing with a regular person.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>5. What is the main difference between the Claude Code approach and the Cowork approach for Google integrations?</p>
<label><input type="radio" name="q5" value="0"> Claude Code is free while Cowork requires payment</label>
<label><input type="radio" name="q5" value="1"> Cowork can do everything Claude Code can, but faster</label>
<label><input type="radio" name="q5" value="2"> Claude Code uses API scripts that can be automated on a schedule, while Cowork uses connectors best for one-off tasks</label>
<label><input type="radio" name="q5" value="3"> Claude Code only supports Sheets, while Cowork supports all Google services</label>
<div class="quiz-explain">The Claude Code approach uses Python scripts with Google APIs, which can be scheduled via cron or Task Scheduler for fully automated workflows. The Cowork approach uses graphical connectors that are simpler but best suited for one-off or interactive tasks.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. What type of authentication does the Gmail API use?</p>
<label><input type="radio" name="q6" value="0"> Service account only</label>
<label><input type="radio" name="q6" value="1"> OAuth2, which requires a one-time browser authorization flow</label>
<label><input type="radio" name="q6" value="2"> API key that you paste directly into your code</label>
<label><input type="radio" name="q6" value="3"> Username and password authentication</label>
<div class="quiz-explain">The Gmail API uses OAuth2 authentication. Unlike Google Sheets (which can use a service account), Gmail requires a one-time browser authorization where you log in and grant permission. This creates a <code>token.json</code> file that subsequent runs use automatically.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. If you accidentally commit <code>google_credentials.json</code> to Git, what should you do?</p>
<label><input type="radio" name="q7" value="0"> Delete the file and push again — the old version is automatically removed</label>
<label><input type="radio" name="q7" value="1"> Nothing — credentials in Git are encrypted automatically</label>
<label><input type="radio" name="q7" value="2"> Add the file to .gitignore and the problem is solved</label>
<label><input type="radio" name="q7" value="3"> Consider the credentials compromised, revoke them in Google Cloud Console, and generate new ones</label>
<div class="quiz-explain">Once a file is committed to Git, it remains in the history even if you delete it later. Anyone with access to the repository can find it. The safe approach is to treat the credentials as compromised, revoke them immediately in Google Cloud Console, and generate new ones.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. Which <code>gspread</code> method adds a new row to the bottom of a Google Sheet?</p>
<label><input type="radio" name="q8" value="0"> <code>worksheet.append_row()</code></label>
<label><input type="radio" name="q8" value="1"> <code>worksheet.insert_row()</code></label>
<label><input type="radio" name="q8" value="2"> <code>worksheet.add_row()</code></label>
<label><input type="radio" name="q8" value="3"> <code>worksheet.write_row()</code></label>
<div class="quiz-explain">The <code>append_row()</code> method adds a new row at the bottom of the existing data in the worksheet. You pass it a list of values, one for each column, like <code>worksheet.append_row(['2026-04-11', 'Sydney Airport', '$180'])</code>.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You have now learned how to connect Claude Code to the Google ecosystem for data management and communication. In **Module 7.3**, we will explore Slack and Notion integration — the tools that keep your team connected and your knowledge organized.
