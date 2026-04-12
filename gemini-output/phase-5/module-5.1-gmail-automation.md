# Module 5.1: Gemini in Gmail — Drafting, Replying, and Summarizing Emails

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Use Gemini's "Help me write" feature to draft professional emails in Gmail
- Summarize long email threads with a single click
- Generate context-aware replies using Gemini's suggestions
- Process emails programmatically using the Gmail API with Gemini
- Apply best practices for reviewing and refining AI-generated email content

## 📖 Theory

Email is the backbone of professional communication, but it can also be a massive time sink. Gemini integrates directly into Gmail to help you write faster, reply smarter, and stay on top of lengthy conversations.

### How Gemini Works in Gmail

Gemini sits right inside the Gmail compose window. When you click the **"Help me write"** sparkle icon, you can describe what you want to say in plain English, and Gemini generates a polished draft. It understands context — if you're replying to a thread, it reads the previous messages and tailors the response accordingly.

There are three main ways to use Gemini in Gmail:

1. **Drafting new emails** — Describe your intent ("Write a follow-up email to a client about our Q3 proposal") and Gemini produces a complete draft.
2. **Summarizing threads** — Click "Summarize this email" at the top of any long conversation, and Gemini condenses the key points into a brief overview.
3. **Smart replies and refinements** — After Gemini generates a draft, you can ask it to make it more formal, shorter, more detailed, or change the tone entirely.

### Why This Matters

Think of Gemini as a writing assistant who has read every email in the thread before you even ask. It saves you from scrolling through 47 replies just to figure out what was decided last Tuesday.

### Beyond the UI: The Gmail API

For power users and teams who need automation at scale, Google's Gmail API lets you process emails programmatically. Combined with Gemini's language capabilities, you can build workflows that automatically categorize, summarize, or respond to incoming messages.

## 💻 Code Example 1: Drafting and Refining Emails with Gemini in Gmail

This example walks through the built-in Gemini experience inside Gmail — no code required.

**Step 1: Open Gmail and start composing**

```
1. Go to mail.google.com
2. Click "Compose" to open a new email
3. Look for the sparkle icon (✨) — that's the "Help me write" button
4. Click it
```

**Step 2: Describe what you want**

In the Gemini prompt box, type a natural language instruction:

```
Write a polite follow-up email to Sarah at Acme Corp. We met last week
at the tech conference. I'd like to schedule a 30-minute call to discuss
a potential partnership around cloud migration services.
```

**Step 3: Review and refine the draft**

Gemini generates a complete email. You can then use these refinement options:

```
- "Make it more formal"    → Adds professional language, removes casual phrases
- "Make it shorter"        → Cuts to essentials, removes filler
- "Make it more detailed"  → Adds specifics and context
- "I'm feeling lucky"      → Generates a fresh creative version
```

**Step 4: Summarize a long thread**

```
1. Open any email thread with 5+ messages
2. At the top of the thread, click "Summarize this email"
3. Gemini reads the entire conversation and displays:
   - Key decisions made
   - Action items mentioned
   - Any open questions
```

### Expected Output:

After clicking "Help me write" and entering your prompt, you should see a fully formatted email draft appear in the compose window. The summary feature produces a short paragraph (3-5 sentences) highlighting the thread's main points.

## 💻 Code Example 2: Processing Emails with the Gmail API and Gemini

This Python script fetches your recent unread emails and uses the Gemini API to generate a summary of each one.

```python
# gmail_summarizer.py
# Summarize unread Gmail messages using Gemini API
# Prerequisites: pip install google-auth google-auth-oauthlib google-api-python-client google-genai

import google.genai as genai
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import base64

# --- Configuration ---
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"    # Replace with your actual key
TOKEN_FILE = "token.json"                  # OAuth token from Gmail API setup

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# Authenticate with Gmail API using OAuth credentials
creds = Credentials.from_authorized_user_file(TOKEN_FILE)
gmail = build("gmail", "v1", credentials=creds)

# Fetch the 5 most recent unread emails
results = gmail.users().messages().list(
    userId="me",
    labelIds=["UNREAD"],   # Only unread messages
    maxResults=5            # Limit to 5 emails
).execute()

messages = results.get("messages", [])

for msg in messages:
    # Get the full email content
    email = gmail.users().messages().get(
        userId="me",
        id=msg["id"],
        format="full"
    ).execute()

    # Extract subject line from headers
    headers = email["payload"]["headers"]
    subject = next(h["value"] for h in headers if h["name"] == "Subject")

    # Extract email body (plain text)
    parts = email["payload"].get("parts", [])
    body = ""
    for part in parts:
        if part["mimeType"] == "text/plain":
            body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
            break

    # Use Gemini to summarize the email
    prompt = f"""Summarize this email in 2-3 bullet points.
    Include any action items or deadlines mentioned.

    Subject: {subject}
    Body: {body[:3000]}"""   # Limit body length to avoid token overflow

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    print(f"\n--- {subject} ---")
    print(response.text)
```

### Expected Output:

```
--- Q3 Budget Review Meeting ---
- Finance team proposes 12% increase in marketing budget for Q3
- All department heads must submit revised forecasts by Friday, March 15
- Next review meeting scheduled for March 20 at 2 PM

--- Project Atlas Update ---
- Backend migration is 80% complete, on track for April deadline
- Frontend team needs two additional developers — requesting approval
- Client demo moved from April 1 to April 8
```

## ✍️ Hands-On Exercises

**Exercise 1: The Tone Transformer**
Open Gmail and compose a new email using "Help me write." Ask Gemini to write a complaint email to a vendor about a late delivery. Then use the refinement options to create three versions: formal, friendly, and concise. Compare how the tone changes while the core message stays the same.

> Hint: Try prompts like "Rewrite this in a friendlier tone" or "Make this more direct and under 50 words."

**Exercise 2: Thread Detective**
Find your longest email thread (10+ messages). Use the Summarize feature and compare the AI summary against your own understanding. Did Gemini catch all the key points? Did it miss anything important? Write down what it got right and what you'd add.

## 🔗 Next Steps

Now that you can handle emails like a pro with Gemini, it's time to bring that same AI power to your documents. In **Module 5.2: Gemini in Google Docs**, you'll learn how to draft reports, translate content, and proofread entire documents — all without leaving your browser.

---

<div id="quiz-container">
<h3>Knowledge Check — Module 5.1</h3>
<form id="quiz-form">

<p><strong>1. Where do you find the "Help me write" feature in Gmail?</strong></p>
<label><input type="radio" name="q1" value="A"> A. In the Settings menu under "AI Features"</label><br>
<label><input type="radio" name="q1" value="B" data-answer> B. The sparkle icon in the compose window</label><br>
<label><input type="radio" name="q1" value="C"> C. By right-clicking the email body</label><br>
<label><input type="radio" name="q1" value="D"> D. In the Gmail sidebar under "Gemini"</label>
<div class="quiz-explain" style="display:none;">The "Help me write" feature is accessed via the sparkle (✨) icon that appears in the Gmail compose window.</div>

<p><strong>2. What does the "Summarize this email" feature do?</strong></p>
<label><input type="radio" name="q2" value="A"> A. Deletes unimportant messages from the thread</label><br>
<label><input type="radio" name="q2" value="B"> B. Forwards the summary to your manager</label><br>
<label><input type="radio" name="q2" value="C" data-answer> C. Condenses a long thread into key points and action items</label><br>
<label><input type="radio" name="q2" value="D"> D. Creates a calendar event from the email content</label>
<div class="quiz-explain" style="display:none;">The Summarize feature reads the entire thread and extracts the main points, decisions, and action items into a concise overview.</div>

<p><strong>3. After Gemini drafts an email, which of the following can you NOT do?</strong></p>
<label><input type="radio" name="q3" value="A"> A. Ask it to make the email more formal</label><br>
<label><input type="radio" name="q3" value="B"> B. Ask it to shorten the email</label><br>
<label><input type="radio" name="q3" value="C"> C. Ask it to add more detail</label><br>
<label><input type="radio" name="q3" value="D" data-answer> D. Ask it to automatically send without review</label>
<div class="quiz-explain" style="display:none;">Gemini always produces a draft for you to review. It never sends emails automatically — you always have final control.</div>

<p><strong>4. In the code example, why is the email body limited to 3000 characters?</strong></p>
<label><input type="radio" name="q4" value="A"> A. Gmail API cannot return more than 3000 characters</label><br>
<label><input type="radio" name="q4" value="B" data-answer> B. To avoid exceeding the model's token limit</label><br>
<label><input type="radio" name="q4" value="C"> C. Gemini only reads the first 3000 characters of any input</label><br>
<label><input type="radio" name="q4" value="D"> D. Python strings have a 3000-character maximum</label>
<div class="quiz-explain" style="display:none;">The 3000-character limit is a practical safeguard to prevent sending too many tokens to the Gemini API, which could cause errors or increase costs.</div>

<p><strong>5. What label filter is used to fetch only unread emails in the code example?</strong></p>
<label><input type="radio" name="q5" value="A"> A. ["INBOX"]</label><br>
<label><input type="radio" name="q5" value="B"> B. ["NEW"]</label><br>
<label><input type="radio" name="q5" value="C" data-answer> C. ["UNREAD"]</label><br>
<label><input type="radio" name="q5" value="D"> D. ["UNSEEN"]</label>
<div class="quiz-explain" style="display:none;">The Gmail API uses the label "UNREAD" to filter messages that haven't been read yet.</div>

<p><strong>6. Which Gemini model is used in the code example for summarization?</strong></p>
<label><input type="radio" name="q6" value="A"> A. gemini-1.5-pro</label><br>
<label><input type="radio" name="q6" value="B" data-answer> B. gemini-2.0-flash</label><br>
<label><input type="radio" name="q6" value="C"> C. gemini-ultra</label><br>
<label><input type="radio" name="q6" value="D"> D. gemini-1.0-nano</label>
<div class="quiz-explain" style="display:none;">The code uses "gemini-2.0-flash", which is fast and cost-effective for summarization tasks.</div>

<p><strong>7. What is the main advantage of using the Gmail API over the built-in Gemini features?</strong></p>
<label><input type="radio" name="q7" value="A"> A. The API produces better-quality writing</label><br>
<label><input type="radio" name="q7" value="B"> B. The API is free while the built-in features are paid</label><br>
<label><input type="radio" name="q7" value="C" data-answer> C. The API enables automation and processing emails at scale</label><br>
<label><input type="radio" name="q7" value="D"> D. The API works without an internet connection</label>
<div class="quiz-explain" style="display:none;">While the built-in Gemini features are great for individual use, the Gmail API lets you build automated workflows that process hundreds of emails without manual interaction.</div>

<p><strong>8. When using "Help me write" to reply to a thread, what context does Gemini use?</strong></p>
<label><input type="radio" name="q8" value="A"> A. Only the most recent message in the thread</label><br>
<label><input type="radio" name="q8" value="B"> B. Only the subject line</label><br>
<label><input type="radio" name="q8" value="C" data-answer> C. The previous messages in the email thread</label><br>
<label><input type="radio" name="q8" value="D"> D. Your entire Gmail inbox history</label>
<div class="quiz-explain" style="display:none;">When replying, Gemini reads the previous messages in the current thread to generate a contextually appropriate response.</div>

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
