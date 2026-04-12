# Module 5.3: Gemini in Google Sheets — Formulas, Data Analysis, and Charts

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Use Gemini in Google Sheets to generate formulas from plain English descriptions
- Analyze datasets by asking natural language questions about your data
- Create charts and visualizations with Gemini's help
- Automate spreadsheet tasks using the Sheets API combined with Gemini
- Apply best practices for validating AI-generated formulas and analysis

## 📖 Theory

Spreadsheets are the workhorses of business — budgets, inventories, project trackers, sales reports. But they come with a steep learning curve. Formulas like `=VLOOKUP(A2,Sheet2!A:C,3,FALSE)` can look like a foreign language to beginners. Gemini changes that entirely by letting you describe what you want in plain English and getting the right formula back.

### How Gemini Works in Google Sheets

Gemini integrates into Sheets in two ways:

1. **Side panel** — Click the Gemini sparkle icon to open a chat where you can ask questions about your data, request formulas, or ask for analysis. The panel can see your entire spreadsheet, so it understands your column headers, data types, and structure.
2. **Help me organize** — When you start with raw data or a blank sheet, Gemini can suggest structures, create headers, and organize information into a usable format.

### What Can Gemini Do in Sheets?

- **Generate formulas** — Describe what you need ("Calculate the average sales for each region") and Gemini writes the formula, including complex ones with SUMIFS, ARRAYFORMULA, or QUERY.
- **Analyze data** — Ask questions like "Which product had the highest growth last quarter?" and Gemini scans your data to provide the answer with supporting numbers.
- **Create charts** — Say "Create a bar chart comparing monthly revenue" and Gemini builds the visualization for you, choosing appropriate chart types and labels.
- **Clean and transform data** — Ask Gemini to remove duplicates, split columns, standardize formats, or fill in missing values.
- **Explain existing formulas** — Paste a complex formula and ask "What does this do?" Gemini breaks it down step by step.

Think of Gemini in Sheets like having a data analyst on call. You bring the questions; it brings the formulas and charts.

### Important: Always Verify

AI-generated formulas are usually correct, but not always. Here is a simple rule: treat every AI formula like code from a colleague — review it before you trust it. Spot-check a few results manually, especially when working with financial data.

### Understanding Formula Types

If you are new to spreadsheets, here is a quick primer on the formula families you will encounter:

| Formula Family | What It Does | Example |
|---------------|-------------|---------|
| SUM / AVERAGE | Basic math on a range of cells | `=SUM(C2:C10)` |
| SUMIFS / COUNTIFS | Math with conditions ("only if region is North") | `=SUMIFS(C2:C10, B2:B10, "North")` |
| VLOOKUP / INDEX-MATCH | Find a value in one column based on another | `=VLOOKUP("Widget A", A:D, 4, FALSE)` |
| ARRAYFORMULA | Apply a formula to every row at once | `=ARRAYFORMULA(C2:C10 * D2:D10)` |
| QUERY | SQL-like data filtering inside Sheets | `=QUERY(A1:D10, "SELECT A, SUM(C) GROUP BY A")` |

You do not need to memorize these. Just describe what you want and Gemini picks the right one.

## 💻 Code Example 1: Using Gemini Inside Google Sheets (No Code Required)

This walkthrough shows you how to use Gemini's built-in features directly in Sheets.

**Step 1: Open a Google Sheet with data**

```
1. Go to sheets.google.com
2. Open an existing spreadsheet, or create a new one with sample data:

   |   A        |   B      |   C        |   D      |
   |------------|----------|------------|----------|
   | Product    | Region   | Q1 Sales   | Q2 Sales |
   | Widget A   | North    | 15000      | 18000    |
   | Widget B   | South    | 22000      | 19500    |
   | Widget C   | North    | 8000       | 12000    |
   | Widget A   | South    | 17500      | 21000    |
   | Widget B   | North    | 14000      | 16500    |
   | Widget C   | South    | 9500       | 11000    |
```

**Step 2: Ask Gemini to generate a formula**

Click the Gemini sparkle icon to open the side panel, then type:

```
Prompt: "Write a formula to calculate the total Q1 sales for the North
region only."
```

Gemini responds with:

```
=SUMIFS(C2:C7, B2:B7, "North")
```

It also explains: "This SUMIFS formula adds up all values in column C (Q1 Sales) where the corresponding value in column B (Region) equals 'North'."

**Step 3: Ask a natural language question about your data**

```
Prompt: "Which product had the biggest increase from Q1 to Q2?"
```

Gemini analyzes the data and responds:

```
Widget C in the North region had the largest increase — from 8,000 to
12,000, a 50% growth. Widget A in the South region was second with a
20% increase from 17,500 to 21,000.
```

**Step 4: Create a chart**

```
Prompt: "Create a grouped bar chart comparing Q1 and Q2 sales for each
product, grouped by region."
```

Gemini generates the chart and inserts it into your sheet. You can then resize it, change colors, or move it to a separate tab.

**Step 5: Understand an existing formula**

If you encounter a formula you do not understand, select the cell and ask:

```
Prompt: "Explain what this formula does:
=ARRAYFORMULA(IF(B2:B7="North", C2:C7*1.1, C2:C7))"
```

Gemini breaks it down: "This formula checks each row. If the region is 'North,' it multiplies Q1 Sales by 1.1 (a 10% increase). For all other regions, it keeps the original Q1 Sales value. ARRAYFORMULA applies this logic to every row at once."

### Expected Output:

After following these steps, your sheet contains a SUMIFS formula that correctly totals North region sales, a natural language answer about growth trends, and a grouped bar chart visualizing the comparison. Each Gemini response includes both the answer and an explanation of the logic behind it.

## 💻 Code Example 2: Automated Data Analysis with the Sheets API and Gemini

This Python script reads data from a Google Sheet, sends it to Gemini for analysis, and writes the results back into the sheet. This is useful when you want to run the same analysis every week without opening the spreadsheet manually.

```python
# sheets_analyzer.py
# Analyze Google Sheets data using Gemini API and write insights back
# Prerequisites: pip install google-auth google-auth-oauthlib google-api-python-client google-genai

import google.genai as genai
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

# --- Configuration ---
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"    # Replace with your actual key
TOKEN_FILE = "token.json"                  # OAuth token from Google API setup
SPREADSHEET_ID = "your-spreadsheet-id"     # Found in the sheet URL between /d/ and /edit

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# Authenticate with Sheets API
creds = Credentials.from_authorized_user_file(TOKEN_FILE)
sheets = build("sheets", "v4", credentials=creds)

# Step 1: Read data from the spreadsheet
result = sheets.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="Sheet1!A1:D7"              # Read columns A through D, rows 1-7
).execute()

rows = result.get("values", [])

# Format data as a readable table for Gemini
table_text = "\n".join(["\t".join(row) for row in rows])

# Step 2: Ask Gemini to analyze the data
analysis_prompt = f"""Analyze this sales data and provide:
1. Top-performing product overall
2. Region with highest total sales
3. Products showing growth from Q1 to Q2
4. One actionable recommendation for the sales team

Data:
{table_text}

Format your response as a numbered list. Be specific with numbers."""

response = client.models.generate_content(
    model="gemini-2.0-flash",         # Fast and cost-effective for analysis
    contents=analysis_prompt
)

analysis = response.text
print("Gemini Analysis:")
print(analysis)

# Step 3: Write the analysis back to the spreadsheet
# Place it in column F so it does not overwrite existing data
sheets.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID,
    range="Sheet1!F1",                # Write to column F
    valueInputOption="RAW",           # Store exactly as provided, no formula parsing
    body={
        "values": [
            ["AI Analysis (Generated by Gemini)"],   # Header row
            *[[line] for line in analysis.split("\n") if line.strip()]
        ]
    }
).execute()

print(f"\nAnalysis written to column F of your spreadsheet.")
print(f"Open your sheet: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
```

### Expected Output:

```
Gemini Analysis:
1. Top-performing product: Widget B with total sales of 72,000 across
   both regions and quarters.
2. Highest-performing region: South with total sales of 100,500 vs
   North at 83,500.
3. Growth products: Widget C showed the strongest growth at 40% average
   increase. Widget A grew 18% on average.
4. Recommendation: Focus Q3 marketing efforts on Widget C — it has the
   highest growth trajectory and may be underinvested compared to
   Widget B.

Analysis written to column F of your spreadsheet.
Open your sheet: https://docs.google.com/spreadsheets/d/your-spreadsheet-id/edit
```

When you open the spreadsheet, column F contains the full analysis alongside your original data.

## ✍️ Hands-On Exercises

**Exercise 1: Formula Builder Challenge**
Create a Google Sheet with at least 10 rows of sample data (you can use product sales, student grades, or monthly expenses). Then use Gemini's side panel to generate three different formulas: one using SUMIFS, one using COUNTIFS, and one using AVERAGEIFS. Verify each formula by calculating the answer manually for at least two rows.

> Hint: Start with simple questions like "How many products in the North region sold more than 10,000 in Q1?" and let Gemini pick the right function.

**Exercise 2: Chart Storyteller**
Using the same dataset from Exercise 1, ask Gemini to create three different chart types: a bar chart, a pie chart, and a line chart. For each one, write one sentence explaining what story the chart tells. Which chart type communicates the data most clearly? This builds your instinct for choosing the right visualization.

## 🔗 Next Steps

You can now work with data like a spreadsheet expert. Next, we will bring your data to life visually. In **Module 5.4: Gemini in Google Slides**, you will learn how to auto-generate presentations, turn documents into slide decks, and add speaker notes — all powered by Gemini.

---

<div id="quiz-container">
<h3>Knowledge Check — Module 5.3</h3>
<form id="quiz-form">

<p><strong>1. How does Gemini help with formulas in Google Sheets?</strong></p>
<label><input type="radio" name="q1" value="A"> A. It only works with basic SUM and AVERAGE formulas</label><br>
<label><input type="radio" name="q1" value="B" data-answer> B. You describe what you need in plain English and it generates the formula</label><br>
<label><input type="radio" name="q1" value="C"> C. It replaces all formulas with static values</label><br>
<label><input type="radio" name="q1" value="D"> D. It only works if you already know the formula syntax</label>
<div class="quiz-explain" style="display:none;">Gemini lets you describe your calculation needs in natural language and generates the appropriate formula, including complex ones like SUMIFS and ARRAYFORMULA.</div>

<p><strong>2. What should you always do after Gemini generates a formula?</strong></p>
<label><input type="radio" name="q2" value="A"> A. Delete it and write your own version</label><br>
<label><input type="radio" name="q2" value="B"> B. Share it with your team immediately</label><br>
<label><input type="radio" name="q2" value="C" data-answer> C. Verify it by spot-checking results manually</label><br>
<label><input type="radio" name="q2" value="D"> D. Convert it to a static value right away</label>
<div class="quiz-explain" style="display:none;">AI-generated formulas are usually correct but should always be verified. Spot-check a few results manually, especially with financial or critical data.</div>

<p><strong>3. What types of charts can Gemini create in Google Sheets?</strong></p>
<label><input type="radio" name="q3" value="A"> A. Only pie charts</label><br>
<label><input type="radio" name="q3" value="B"> B. Only bar charts and line charts</label><br>
<label><input type="radio" name="q3" value="C" data-answer> C. Various types including bar, pie, line, and grouped charts</label><br>
<label><input type="radio" name="q3" value="D"> D. Gemini cannot create charts in Sheets</label>
<div class="quiz-explain" style="display:none;">Gemini can create multiple chart types — bar, pie, line, grouped bar, scatter, and more — based on your description of what you want to visualize.</div>

<p><strong>4. In the code example, what does the Sheets API's values().get() method return?</strong></p>
<label><input type="radio" name="q4" value="A"> A. The formatting and styling of the cells</label><br>
<label><input type="radio" name="q4" value="B" data-answer> B. The raw cell values from the specified range as a list of lists</label><br>
<label><input type="radio" name="q4" value="C"> C. A summary of the entire spreadsheet</label><br>
<label><input type="radio" name="q4" value="D"> D. Only numeric values, ignoring text</label>
<div class="quiz-explain" style="display:none;">The values().get() method retrieves the raw cell values (text and numbers) from the range you specify, returned as a list of lists where each inner list is one row.</div>

<p><strong>5. Why does the code write Gemini's analysis to column F instead of column A?</strong></p>
<label><input type="radio" name="q5" value="A"> A. Column A is read-only in Google Sheets</label><br>
<label><input type="radio" name="q5" value="B"> B. Gemini can only write to columns after E</label><br>
<label><input type="radio" name="q5" value="C" data-answer> C. To avoid overwriting the original data in columns A through D</label><br>
<label><input type="radio" name="q5" value="D"> D. Column F is the default output location for the API</label>
<div class="quiz-explain" style="display:none;">The original data lives in columns A-D. Writing to column F keeps the source data safe while adding the analysis alongside it for easy reference.</div>

<p><strong>6. When you ask Gemini "Which product had the biggest increase?", what does it do?</strong></p>
<label><input type="radio" name="q6" value="A"> A. It guesses based on the product names</label><br>
<label><input type="radio" name="q6" value="B" data-answer> B. It scans the data, calculates the changes, and identifies the answer with specific numbers</label><br>
<label><input type="radio" name="q6" value="C"> C. It creates a formula but does not give the answer</label><br>
<label><input type="radio" name="q6" value="D"> D. It only works if you specify which columns to compare</label>
<div class="quiz-explain" style="display:none;">Gemini reads the spreadsheet data, performs the necessary calculations, and responds with specific numbers and percentages to support its answer.</div>

<p><strong>7. What does SUMIFS do differently from a regular SUM?</strong></p>
<label><input type="radio" name="q7" value="A"> A. SUMIFS is faster than SUM</label><br>
<label><input type="radio" name="q7" value="B"> B. SUMIFS works with text while SUM only works with numbers</label><br>
<label><input type="radio" name="q7" value="C" data-answer> C. SUMIFS adds up values only when specific conditions are met</label><br>
<label><input type="radio" name="q7" value="D"> D. SUMIFS automatically removes duplicates before adding</label>
<div class="quiz-explain" style="display:none;">SUMIFS is a conditional sum — it adds up values only in rows that match one or more criteria. For example, summing sales only for a specific region or product.</div>

<p><strong>8. What is the "valueInputOption" set to "RAW" used for in the Sheets API?</strong></p>
<label><input type="radio" name="q8" value="A"> A. It encrypts the data before writing</label><br>
<label><input type="radio" name="q8" value="B" data-answer> B. It writes the values exactly as provided, without interpreting them as formulas</label><br>
<label><input type="radio" name="q8" value="C"> C. It converts all values to plain text format</label><br>
<label><input type="radio" name="q8" value="D"> D. It skips empty cells during the write operation</label>
<div class="quiz-explain" style="display:none;">Setting valueInputOption to "RAW" tells the API to store the values exactly as given. The alternative, "USER_ENTERED," would interpret strings starting with "=" as formulas.</div>

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
