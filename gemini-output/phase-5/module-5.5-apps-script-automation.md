# Module 5.5: Google Apps Script + Gemini API — Automated Workflows and Scheduled Tasks

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Understand what Google Apps Script is and how it connects to Google Workspace
- Write an Apps Script that calls the Gemini API to process data
- Build automated workflows that span Gmail, Sheets, Docs, and Slides
- Set up time-driven triggers to run scripts on a schedule
- Design a complete end-to-end automation pipeline using Gemini

## 📖 Theory

Throughout this phase, you've used Gemini inside individual Google Workspace apps — Gmail, Docs, Sheets, and Slides. But what if you want all of them working together automatically? That's where Google Apps Script comes in.

### What Is Google Apps Script?

Google Apps Script is a lightweight coding platform built into Google Workspace. It uses JavaScript and runs entirely in the cloud — no installation, no servers, no deployment headaches. Think of it as the glue that connects all your Google apps together.

Here's what makes it special:

- **Built-in access** to Gmail, Sheets, Docs, Slides, Calendar, Drive, and more
- **Triggers** that run your scripts on a schedule (every hour, every day, every Monday)
- **UrlFetchApp** that can call any external API — including the Gemini API
- **Free to use** within Google Workspace (no additional costs for the script execution itself)

### How Apps Script + Gemini Work Together

The pattern is simple:

1. **Read data** from a Google Workspace app (e.g., new emails in Gmail, rows in a Sheet)
2. **Send that data to Gemini** via the API for processing (summarize, categorize, generate)
3. **Write the results** back to a Workspace app (update a Sheet, create a Doc, send an email)
4. **Schedule it** to run automatically with a time-driven trigger

This turns one-off AI tasks into repeatable, hands-free workflows.

### When to Use Apps Script vs. Python

Use **Apps Script** when your workflow lives entirely inside Google Workspace and you want zero infrastructure. Use **Python** (as in previous modules) when you need more complex logic, external libraries, or integration with non-Google services.

## 💻 Code Example 1: Email Summarizer That Runs Every Morning

This Apps Script fetches your unread emails, summarizes them with Gemini, and posts the summaries to a Google Sheet.

```javascript
// apps_script_email_summarizer.gs
// Summarize unread emails every morning and log to a Google Sheet
// Setup: Open script.google.com → New Project → Paste this code

// --- Configuration ---
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";  // Store in Script Properties for security
const SHEET_ID = "YOUR_SPREADSHEET_ID";         // The Google Sheet to log summaries

function summarizeUnreadEmails() {
  // Step 1: Get unread emails from the last 24 hours
  const threads = GmailApp.search("is:unread newer_than:1d", 0, 10);  // Max 10 threads

  if (threads.length === 0) {
    Logger.log("No unread emails found.");
    return;
  }

  // Step 2: Open the target spreadsheet
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Email Summaries");

  // Add headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "From", "Subject", "AI Summary"]);
  }

  // Step 3: Process each email thread
  for (const thread of threads) {
    const messages = thread.getMessages();
    const latest = messages[messages.length - 1];     // Get the most recent message

    const from = latest.getFrom();
    const subject = latest.getSubject();
    const body = latest.getPlainBody().substring(0, 2000);  // Limit body length
    const date = latest.getDate();

    // Step 4: Call Gemini API to summarize
    const summary = callGemini(
      `Summarize this email in 2-3 bullet points. Include any action items.\n\n` +
      `From: ${from}\nSubject: ${subject}\nBody: ${body}`
    );

    // Step 5: Write the summary to the spreadsheet
    sheet.appendRow([
      Utilities.formatDate(date, "GMT", "yyyy-MM-dd HH:mm"),
      from,
      subject,
      summary
    ]);
  }

  Logger.log(`Processed ${threads.length} email threads.`);
}

// Helper function: Call the Gemini API
function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true          // Don't throw on HTTP errors
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());

  // Extract the generated text from the response
  if (json.candidates && json.candidates.length > 0) {
    return json.candidates[0].content.parts[0].text;
  }
  return "Error: No response from Gemini";
}

// --- Trigger Setup ---
// To schedule this script to run every morning at 8 AM:
// 1. In the Apps Script editor, click the clock icon (Triggers)
// 2. Click "Add Trigger"
// 3. Choose: summarizeUnreadEmails → Time-driven → Day timer → 8am to 9am
// 4. Save
```

### Expected Output:

After running (or when the trigger fires), your Google Sheet fills up:

```
| Date              | From                | Subject              | AI Summary                           |
|-------------------|---------------------|----------------------|--------------------------------------|
| 2026-03-15 08:00  | sarah@acme.com      | Q3 Budget Review     | - Budget meeting moved to Friday     |
|                   |                     |                      | - Marketing requests 12% increase    |
|                   |                     |                      | - Action: Submit forecasts by Mar 20 |
| 2026-03-15 08:00  | dev-team@company.co | Sprint 14 Retro      | - Velocity improved 15% this sprint  |
|                   |                     |                      | - Two blockers resolved              |
|                   |                     |                      | - Action: Review backlog by Monday   |
```

## 💻 Code Example 2: Weekly Report Generator (Gmail + Sheets + Docs)

This script pulls data from a Google Sheet, sends it to Gemini for analysis, creates a formatted Google Doc report, and emails it to your team.

```javascript
// weekly_report_generator.gs
// Reads Sheets data → Gemini analysis → Creates Doc → Emails team
// A complete cross-app automation pipeline

const GEMINI_KEY = "YOUR_GEMINI_API_KEY";

function generateWeeklyReport() {
  // --- Step 1: Read data from Google Sheets ---
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = ss.getSheetByName("Weekly Metrics");
  const data = dataSheet.getDataRange().getValues();  // Get all data

  // Convert sheet data to readable text
  const headers = data[0];
  let dataText = headers.join(" | ") + "\n";
  for (let i = 1; i < data.length; i++) {
    dataText += data[i].join(" | ") + "\n";
  }

  // --- Step 2: Send to Gemini for analysis ---
  const analysisPrompt = `You are a business analyst. Analyze this weekly data and write
a professional report with these sections:
- Executive Summary (3 sentences)
- Key Metrics Overview (bullet points)
- Trends and Insights (what's improving, what's declining)
- Recommendations (3 actionable items)

Data:
${dataText}`;

  const report = callGemini(analysisPrompt);

  // --- Step 3: Create a Google Doc with the report ---
  const today = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd");
  const doc = DocumentApp.create(`Weekly Report — ${today}`);
  const body = doc.getBody();

  // Add title
  body.appendParagraph(`Weekly Report — ${today}`)
      .setHeading(DocumentApp.ParagraphHeading.HEADING1);

  // Add the AI-generated report content
  body.appendParagraph(report);

  // Add footer with metadata
  body.appendParagraph("\n---\nGenerated by Gemini AI via Apps Script")
      .setForegroundColor("#999999");

  doc.saveAndClose();

  // --- Step 4: Email the report to the team ---
  const docUrl = doc.getUrl();
  const recipients = "team@company.com";    // Change to your team's email

  GmailApp.sendEmail(recipients, `Weekly Report — ${today}`, "", {
    htmlBody: `
      <h2>Weekly Report is Ready</h2>
      <p>The AI-generated weekly report has been created.</p>
      <p><a href="${docUrl}">View the full report in Google Docs</a></p>
      <p><em>This report was automatically generated using Gemini AI.</em></p>
    `
  });

  Logger.log(`Report created: ${docUrl}`);
  Logger.log("Email sent to team.");
}

// Reusable Gemini API caller (same as Code Example 1)
function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  if (json.candidates && json.candidates.length > 0) {
    return json.candidates[0].content.parts[0].text;
  }
  return "Error: No response from Gemini";
}
```

### Expected Output:

```
Report created: https://docs.google.com/document/d/1aBcDeFg...
Email sent to team.
```

Your team receives an email with a link to a professionally structured Google Doc containing AI-generated analysis of the week's metrics.

## ✍️ Hands-On Exercises

**Exercise 1: Build Your Own Morning Briefing**
Modify the email summarizer script (Code Example 1) to also include today's calendar events. Use `CalendarApp.getEventsForDay(new Date())` to fetch events, format them as a list, and add a "Today's Schedule" section above the email summaries in your Sheet. Set a daily trigger for 7 AM.

> Hint: `CalendarApp.getEventsForDay()` returns Event objects. Use `.getTitle()`, `.getStartTime()`, and `.getLocation()` to extract details.

**Exercise 2: Auto-Categorize Feedback**
Create a Google Sheet with 10 rows of fake customer feedback (mix of positive, negative, and neutral comments). Write an Apps Script that reads each row, sends the feedback text to Gemini with the prompt "Classify this feedback as Positive, Negative, or Neutral. Respond with just the category," and writes the classification into the next column. Run it and check the accuracy.

## 🔗 Next Steps

Congratulations — you've completed Phase 5! You now have the skills to use Gemini across every major Google Workspace app and to build automated workflows that connect them all together. In the next phase, you'll explore advanced topics like building custom Gemini-powered chatbots and integrating with external services.

---

<div id="quiz-container">
<h3>Knowledge Check — Module 5.5</h3>
<form id="quiz-form">

<p><strong>1. What programming language does Google Apps Script use?</strong></p>
<label><input type="radio" name="q1" value="A"> A. Python</label><br>
<label><input type="radio" name="q1" value="B" data-answer> B. JavaScript</label><br>
<label><input type="radio" name="q1" value="C"> C. Go</label><br>
<label><input type="radio" name="q1" value="D"> D. Ruby</label>
<div class="quiz-explain" style="display:none;">Google Apps Script is based on JavaScript and runs in Google's cloud infrastructure. No installation needed.</div>

<p><strong>2. How does Apps Script call the Gemini API?</strong></p>
<label><input type="radio" name="q2" value="A"> A. Using a built-in GeminiApp service</label><br>
<label><input type="radio" name="q2" value="B" data-answer> B. Using UrlFetchApp to make HTTP POST requests</label><br>
<label><input type="radio" name="q2" value="C"> C. By importing the google-genai npm package</label><br>
<label><input type="radio" name="q2" value="D"> D. Through the Apps Script Marketplace plugin</label>
<div class="quiz-explain" style="display:none;">Apps Script uses UrlFetchApp.fetch() to make HTTP requests to external APIs, including the Gemini REST API.</div>

<p><strong>3. What is a "time-driven trigger" in Apps Script?</strong></p>
<label><input type="radio" name="q3" value="A"> A. A button that runs the script when clicked</label><br>
<label><input type="radio" name="q3" value="B"> B. A formula that recalculates every hour</label><br>
<label><input type="radio" name="q3" value="C" data-answer> C. A schedule that automatically runs a function at set intervals</label><br>
<label><input type="radio" name="q3" value="D"> D. A notification that reminds you to run the script</label>
<div class="quiz-explain" style="display:none;">Time-driven triggers automatically execute your function at intervals you define — every minute, hour, day, or week — without manual intervention.</div>

<p><strong>4. In Code Example 1, why is the email body limited to 2000 characters?</strong></p>
<label><input type="radio" name="q4" value="A"> A. Apps Script can only read 2000 characters from emails</label><br>
<label><input type="radio" name="q4" value="B" data-answer> B. To keep the Gemini API request within reasonable token limits</label><br>
<label><input type="radio" name="q4" value="C"> C. Gmail only stores the first 2000 characters of each email</label><br>
<label><input type="radio" name="q4" value="D"> D. Google Sheets cells have a 2000-character limit</label>
<div class="quiz-explain" style="display:none;">Limiting the body text prevents sending excessively large payloads to the Gemini API, which could increase latency and costs.</div>

<p><strong>5. What does the weekly report script do after generating the analysis?</strong></p>
<label><input type="radio" name="q5" value="A"> A. Prints it to the console and stops</label><br>
<label><input type="radio" name="q5" value="B"> B. Saves it to a CSV file on Google Drive</label><br>
<label><input type="radio" name="q5" value="C" data-answer> C. Creates a Google Doc and emails the link to the team</label><br>
<label><input type="radio" name="q5" value="D"> D. Posts it to a Slack channel</label>
<div class="quiz-explain" style="display:none;">The script creates a new Google Doc with the AI analysis, then sends an email with the document link to the team — a complete automated pipeline.</div>

<p><strong>6. Where should you store your Gemini API key in a production Apps Script?</strong></p>
<label><input type="radio" name="q6" value="A"> A. Hardcoded directly in the script source code</label><br>
<label><input type="radio" name="q6" value="B" data-answer> B. In Script Properties (File → Project Settings → Script Properties)</label><br>
<label><input type="radio" name="q6" value="C"> C. In a public Google Sheet that anyone can access</label><br>
<label><input type="radio" name="q6" value="D"> D. In the document title</label>
<div class="quiz-explain" style="display:none;">Script Properties provides a secure key-value store within Apps Script. Access it with PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY").</div>

<p><strong>7. What makes the callGemini() helper function reusable?</strong></p>
<label><input type="radio" name="q7" value="A"> A. It only works with email content</label><br>
<label><input type="radio" name="q7" value="B"> B. It requires a specific JSON format for each use case</label><br>
<label><input type="radio" name="q7" value="C" data-answer> C. It accepts any text prompt and returns the generated response</label><br>
<label><input type="radio" name="q7" value="D"> D. It caches responses so the same query is never sent twice</label>
<div class="quiz-explain" style="display:none;">The callGemini() function is designed to accept any prompt string and return the text response, making it reusable across different automation tasks.</div>

<p><strong>8. When should you choose Apps Script over Python for Gemini automation?</strong></p>
<label><input type="radio" name="q8" value="A"> A. When you need to use machine learning libraries like TensorFlow</label><br>
<label><input type="radio" name="q8" value="B"> B. When integrating with non-Google services like AWS</label><br>
<label><input type="radio" name="q8" value="C" data-answer> C. When your workflow lives entirely in Google Workspace with no external dependencies</label><br>
<label><input type="radio" name="q8" value="D"> D. When you need to process files larger than 1GB</label>
<div class="quiz-explain" style="display:none;">Apps Script is ideal when everything stays within Google Workspace — it has built-in access to Gmail, Sheets, Docs, Slides, Calendar, and Drive with zero setup.</div>

</form>
<button id="quiz-submit" onclick="checkQuiz()">Submit Answers</button>
<div id="quiz-result"></div>
</div>

<script>
function checkQuiz() {
    const form = document.getElementById('quiz-form');
    let score = 0;
    const total = 8;
    for (let i = 1; i <= total; i++) {
        const selected = form.querySelector(`input[name="q${i}"]:checked`);
        const explain = form.querySelectorAll('.quiz-explain')[i - 1];
        if (selected && selected.hasAttribute('data-answer')) {
            score++;
            selected.parentElement.style.color = 'green';
        } else if (selected) {
            selected.parentElement.style.color = 'red';
        }
        explain.style.display = 'block';
    }
    document.getElementById('quiz-result').innerHTML =
        `<strong>Your Score: ${score}/${total}</strong> — ${score >= 6 ? 'Great job!' : 'Review the explanations and try again.'}`;
}
</script>
