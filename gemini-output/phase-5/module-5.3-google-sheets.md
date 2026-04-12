# Module 5.3: Gemini in Google Sheets — Formulas, Analysis, and Charts

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Use Gemini's side panel in Google Sheets to generate formulas from plain English
- Analyze datasets by asking Gemini to identify trends, outliers, and patterns
- Create charts and visualizations through conversational prompts
- Build a sales report workflow using the Sheets API with Gemini-generated insights
- Understand when to trust AI-generated formulas and when to verify them

## 📖 Theory

Spreadsheets are the unsung heroes of every business. But let's be honest — not everyone dreams in VLOOKUP. Gemini in Google Sheets changes the game by letting you describe what you need in plain English and getting back working formulas, data analysis, and charts.

### How Gemini Works in Sheets

Gemini integrates into Sheets through the **side panel** (click the sparkle icon in the toolbar). Unlike Docs where Gemini writes prose, in Sheets it speaks the language of data:

- **Formula generation** — "What formula calculates the average revenue per customer in column D?" Gemini returns a ready-to-use formula.
- **Data analysis** — "What are the top 5 products by total sales?" Gemini scans your data and provides insights.
- **Chart creation** — "Create a bar chart showing monthly revenue for 2025." Gemini builds and inserts the chart.
- **Data organization** — "Sort this data by date and highlight rows where sales dropped more than 20%." Gemini suggests steps or generates the formulas to do it.

### Why This Is a Game-Changer

Imagine you have a spreadsheet with 10,000 rows of sales data. Before Gemini, you'd need to know the right combination of SUMIF, INDEX-MATCH, and pivot tables. Now you just say what you want to know, and Gemini figures out the "how."

That said, always double-check AI-generated formulas against a few rows of known data. Gemini is excellent at structure but can occasionally misread which column you're referring to.

## 💻 Code Example 1: Using Gemini in the Sheets Interface

This walkthrough shows the built-in Gemini experience — no code required.

**Step 1: Open a Sheet with data**

```
1. Go to sheets.google.com
2. Open a spreadsheet with data, or create one with this sample:

   |   A       |    B     |   C    |    D     |
   |-----------|----------|--------|----------|
   | Product   | Month    | Units  | Revenue  |
   | Widget A  | January  | 150    | $4,500   |
   | Widget B  | January  | 200    | $8,000   |
   | Widget A  | February | 180    | $5,400   |
   | Widget B  | February | 170    | $6,800   |
   | Widget A  | March    | 210    | $6,300   |
   | Widget B  | March    | 250    | $10,000  |
```

**Step 2: Ask Gemini for a formula**

Click the Gemini sparkle icon and type:

```
Prompt: "Write a formula to calculate the total revenue for Widget A
across all months."
```

Gemini responds with:

```
=SUMIF(A2:A7, "Widget A", D2:D7)
```

**Step 3: Ask for analysis**

```
Prompt: "Which product had the highest growth rate from January to March?"
```

Gemini analyzes the data and responds:

```
Widget B grew from $8,000 to $10,000 (25% increase), while Widget A
grew from $4,500 to $6,300 (40% increase). Widget A had the highest
growth rate at 40%.
```

**Step 4: Generate a chart**

```
Prompt: "Create a grouped bar chart comparing monthly revenue for
Widget A and Widget B."
```

Gemini inserts a chart directly into your spreadsheet with proper labels, colors, and axes.

### Expected Output:

You'll see a formula appear that you can paste into any cell, a text analysis in the side panel, and a chart embedded in your sheet. The chart shows two bars per month (one per product) with revenue on the Y-axis.

## 💻 Code Example 2: Automated Sales Report with the Sheets API and Gemini

This script reads sales data from a Google Sheet, sends it to Gemini for analysis, and writes the insights back into a summary tab.

```python
# sheets_analyzer.py
# Analyze Google Sheets data with Gemini and write insights back
# Prerequisites: pip install google-auth google-auth-oauthlib google-api-python-client google-genai

import google.genai as genai
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

# --- Configuration ---
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
TOKEN_FILE = "token.json"
SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"   # From the sheet URL

# Initialize clients
client = genai.Client(api_key=GEMINI_API_KEY)
creds = Credentials.from_authorized_user_file(TOKEN_FILE)
sheets = build("sheets", "v4", credentials=creds)

# Step 1: Read sales data from the "Sales Data" tab
result = sheets.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="Sales Data!A1:D100"       # Read up to 100 rows
).execute()

rows = result.get("values", [])
header = rows[0]                      # ["Product", "Month", "Units", "Revenue"]
data_rows = rows[1:]                  # All data rows

# Format data as a readable string for Gemini
data_text = "\n".join([", ".join(row) for row in rows])

# Step 2: Ask Gemini to analyze the data
analysis_prompt = f"""Analyze this sales data and provide:
1. Total revenue by product
2. Best and worst performing month
3. Month-over-month growth trends
4. Three actionable recommendations

Data:
{data_text}

Format your response as a clean report with bullet points."""

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=analysis_prompt
)

analysis = response.text

# Step 3: Write the analysis to a new "AI Summary" tab
# First, create the new sheet tab
try:
    sheets.spreadsheets().batchUpdate(
        spreadsheetId=SPREADSHEET_ID,
        body={
            "requests": [{
                "addSheet": {
                    "properties": {"title": "AI Summary"}
                }
            }]
        }
    ).execute()
except Exception:
    pass  # Tab may already exist

# Write the analysis into the summary tab
lines = analysis.split("\n")
values = [[line] for line in lines]    # One line per row

sheets.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID,
    range="AI Summary!A1",
    valueInputOption="RAW",
    body={"values": values}
).execute()

print("Analysis written to 'AI Summary' tab.")
print("\nPreview:")
print(analysis[:500])
```

### Expected Output:

```
Analysis written to 'AI Summary' tab.

Preview:
## Sales Analysis Report

**Total Revenue by Product:**
- Widget A: $16,200 (3 months)
- Widget B: $24,800 (3 months)

**Best Performing Month:** March ($16,300 combined)
**Worst Performing Month:** January ($12,500 combined)

**Growth Trends:**
- Widget A: Consistent upward trend (+20% Jan→Feb, +17% Feb→Mar)
- Widget B: Dip in February (-15%) followed by strong recovery (+47%)

**Recommendations:**
1. Investigate Widget B's February dip — was it a supply or demand issue?
...
```

## ✍️ Hands-On Exercises

**Exercise 1: Formula Translator**
Create a spreadsheet with student names, three test scores, and a final grade column. Use Gemini to generate formulas for: (1) average score per student, (2) class average per test, and (3) a letter grade using a grading scale (A: 90+, B: 80+, C: 70+, D: 60+, F: below 60). Verify each formula against at least two students manually.

> Hint: Ask Gemini: "Write an IF formula that converts a numeric score in E2 to a letter grade."

**Exercise 2: Chart Storyteller**
Using the same student data, ask Gemini to create three different chart types: a bar chart of average scores, a line chart showing score trends across tests, and a pie chart of grade distribution. For each chart, write one sentence explaining what story the chart tells.

## 🔗 Next Steps

Numbers and charts are powerful, but sometimes you need to present your findings to a room full of people. In **Module 5.4: Gemini in Google Slides**, you'll learn how to auto-generate presentations, create speaker notes, and build pitch decks — all with AI assistance.

---

<div id="quiz-container">
<h3>Knowledge Check — Module 5.3</h3>
<form id="quiz-form">

<p><strong>1. How do you access Gemini in Google Sheets?</strong></p>
<label><input type="radio" name="q1" value="A"> A. Type a formula starting with =GEMINI()</label><br>
<label><input type="radio" name="q1" value="B" data-answer> B. Click the sparkle icon to open the Gemini side panel</label><br>
<label><input type="radio" name="q1" value="C"> C. Right-click a cell and choose "Ask AI"</label><br>
<label><input type="radio" name="q1" value="D"> D. Install the Gemini add-on from the Marketplace</label>
<div class="quiz-explain" style="display:none;">Gemini is accessed through the sparkle icon in the Sheets toolbar, which opens the side panel for conversational interaction.</div>

<p><strong>2. What formula did Gemini generate for total Widget A revenue?</strong></p>
<label><input type="radio" name="q2" value="A"> A. =SUM(D2:D7)</label><br>
<label><input type="radio" name="q2" value="B"> B. =COUNTIF(A2:A7, "Widget A")</label><br>
<label><input type="radio" name="q2" value="C" data-answer> C. =SUMIF(A2:A7, "Widget A", D2:D7)</label><br>
<label><input type="radio" name="q2" value="D"> D. =FILTER(D2:D7, A2:A7="Widget A")</label>
<div class="quiz-explain" style="display:none;">SUMIF is the correct function — it sums values in the Revenue column (D) only where the Product column (A) matches "Widget A".</div>

<p><strong>3. Why should you verify AI-generated formulas manually?</strong></p>
<label><input type="radio" name="q3" value="A"> A. Gemini formulas only work in certain countries</label><br>
<label><input type="radio" name="q3" value="B" data-answer> B. Gemini might misinterpret which columns or ranges you mean</label><br>
<label><input type="radio" name="q3" value="C"> C. AI formulas expire after 30 days</label><br>
<label><input type="radio" name="q3" value="D"> D. Google Sheets doesn't support AI-generated formulas natively</label>
<div class="quiz-explain" style="display:none;">While Gemini is great at formula structure, it can sometimes reference the wrong column or range, especially in complex spreadsheets. Always spot-check against known values.</div>

<p><strong>4. In the code example, what does the Sheets API's values().get() method return?</strong></p>
<label><input type="radio" name="q4" value="A"> A. A formatted chart image</label><br>
<label><input type="radio" name="q4" value="B" data-answer> B. The cell values from the specified range as a list of lists</label><br>
<label><input type="radio" name="q4" value="C"> C. The spreadsheet's formatting and styles</label><br>
<label><input type="radio" name="q4" value="D"> D. A summary of the spreadsheet's metadata</label>
<div class="quiz-explain" style="display:none;">The values().get() method returns the raw cell values from the specified range, structured as a list of rows (each row is a list of cell values).</div>

<p><strong>5. What does the "valueInputOption: RAW" parameter mean when writing data?</strong></p>
<label><input type="radio" name="q5" value="A" data-answer> A. The values are stored exactly as provided, without parsing</label><br>
<label><input type="radio" name="q5" value="B"> B. The values are encrypted before storage</label><br>
<label><input type="radio" name="q5" value="C"> C. The values are converted to formulas automatically</label><br>
<label><input type="radio" name="q5" value="D"> D. The values overwrite the entire spreadsheet</label>
<div class="quiz-explain" style="display:none;">"RAW" means the input is stored as-is. The alternative, "USER_ENTERED", would parse the input as if a user typed it (e.g., interpreting "=SUM()" as a formula).</div>

<p><strong>6. What type of chart was requested in the Sheets interface example?</strong></p>
<label><input type="radio" name="q6" value="A"> A. Pie chart</label><br>
<label><input type="radio" name="q6" value="B"> B. Line chart</label><br>
<label><input type="radio" name="q6" value="C" data-answer> C. Grouped bar chart</label><br>
<label><input type="radio" name="q6" value="D"> D. Scatter plot</label>
<div class="quiz-explain" style="display:none;">The prompt asked for a "grouped bar chart comparing monthly revenue for Widget A and Widget B," which displays bars side by side for each month.</div>

<p><strong>7. In the automated script, where does Gemini's analysis get written?</strong></p>
<label><input type="radio" name="q7" value="A"> A. To a new Google Doc</label><br>
<label><input type="radio" name="q7" value="B"> B. To the terminal console only</label><br>
<label><input type="radio" name="q7" value="C" data-answer> C. To a new "AI Summary" tab in the same spreadsheet</label><br>
<label><input type="radio" name="q7" value="D"> D. To a PDF file saved in Google Drive</label>
<div class="quiz-explain" style="display:none;">The script creates a new tab called "AI Summary" within the existing spreadsheet and writes Gemini's analysis there, keeping everything in one place.</div>

<p><strong>8. Which of these is something Gemini CANNOT do directly in Google Sheets?</strong></p>
<label><input type="radio" name="q8" value="A"> A. Generate a SUMIF formula from a description</label><br>
<label><input type="radio" name="q8" value="B"> B. Create a chart from your data</label><br>
<label><input type="radio" name="q8" value="C"> C. Identify trends in your data</label><br>
<label><input type="radio" name="q8" value="D" data-answer> D. Connect to an external database and import live data</label>
<div class="quiz-explain" style="display:none;">Gemini in Sheets works with data already in your spreadsheet. Connecting to external databases requires separate tools like BigQuery connectors or Apps Script.</div>

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
