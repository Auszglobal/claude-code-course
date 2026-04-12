# Module 7.4: Data Analysis with Gemini

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Upload CSV and Excel data to Gemini for analysis
- Ask questions about your data in plain English without writing formulas
- Generate charts and visualizations from data automatically
- Write professional reports from raw data using AI
- Identify trends and make data-driven predictions
- Analyze a complete sales dataset and produce a summary report

## 📖 Theory

### Why AI Data Analysis Changes Everything

Imagine you have a spreadsheet with 10,000 rows of sales data. In the past, to answer a question like "Which product had the highest sales in Q3?" you would need to know Excel formulas, pivot tables, or even SQL queries. If you wanted a chart, you would spend 20 minutes formatting it in Excel.

With Gemini, you just ask in plain English: "Which product had the highest sales in Q3?" and get an instant answer. It is like having a data analyst sitting next to you who never gets tired and responds in seconds.

### How Gemini Understands Data

When you give Gemini a table of data (as CSV text or by uploading a file), it reads the data like a very fast human analyst would:

1. **Reads the headers** — understands what each column represents (date, product name, revenue, etc.)
2. **Scans the rows** — gets a sense of the data range, patterns, and outliers
3. **Interprets your question** — figures out what calculation or comparison you need
4. **Generates the answer** — performs the analysis and explains the result in plain language

Think of it like giving a financial report to a smart colleague. You do not need to teach them what "revenue" means. You just hand them the report and ask your question.

### Types of Data Analysis You Can Do

**Descriptive Analysis** — What happened?
- "What were total sales last month?"
- "Which region performed best?"

**Diagnostic Analysis** — Why did it happen?
- "Why did sales drop in March?"
- "What factors correlate with high customer satisfaction?"

**Predictive Analysis** — What might happen next?
- "Based on current trends, what will Q4 revenue look like?"
- "Which customers are most likely to churn?"

**Prescriptive Analysis** — What should we do?
- "What should we focus on to increase revenue by 15%?"
- "Which products should we discontinue?"

### Data Formats Gemini Can Work With

Gemini works best with structured data in these formats:

- **CSV** (Comma-Separated Values) — the most universal format, like a simple text version of a spreadsheet
- **Excel files** — upload directly through the API or paste data as text
- **JSON** — structured data from databases or APIs
- **Plain text tables** — data formatted in columns with spaces or tabs

For the Gemini API, the easiest approach is to include your data directly in the prompt as CSV text. For Google AI Studio, you can upload files directly.

## 💻 Code Example 1: Natural Language Data Queries

This script loads sales data and lets you ask questions about it in plain English. No formulas needed.

```python
# data_analyzer.py
# Ask questions about your data in plain English using Gemini

import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

# Sample sales data — in real use, you would load this from a CSV file
# You can also use: import csv; data = open("sales.csv").read()
sales_data = """
Date,Product,Category,Region,Units_Sold,Unit_Price,Revenue,Customer_Type
2024-01-15,Widget A,Electronics,North,150,29.99,4498.50,Business
2024-01-15,Widget B,Electronics,South,89,49.99,4449.11,Consumer
2024-01-15,Gadget X,Home,North,200,14.99,2998.00,Consumer
2024-02-10,Widget A,Electronics,East,175,29.99,5248.25,Business
2024-02-10,Widget B,Electronics,North,120,49.99,5998.80,Business
2024-02-10,Gadget X,Home,West,95,14.99,1424.05,Consumer
2024-03-08,Widget A,Electronics,South,60,29.99,1799.40,Consumer
2024-03-08,Widget B,Electronics,East,200,49.99,9998.00,Business
2024-03-08,Gadget X,Home,North,310,14.99,4646.90,Consumer
2024-04-12,Widget A,Electronics,West,190,29.99,5698.10,Business
2024-04-12,Widget B,Electronics,North,145,49.99,7248.55,Consumer
2024-04-12,Gadget X,Home,South,80,14.99,1199.20,Consumer
2024-05-20,Widget A,Electronics,North,210,29.99,6297.90,Business
2024-05-20,Widget B,Electronics,South,95,49.99,4749.05,Business
2024-05-20,Gadget X,Home,East,160,14.99,2398.40,Consumer
2024-06-15,Widget A,Electronics,East,130,29.99,3898.70,Consumer
2024-06-15,Widget B,Electronics,West,170,49.99,8498.30,Business
2024-06-15,Gadget X,Home,North,250,14.99,3747.50,Consumer
"""

def ask_data_question(question):
    """Ask a natural language question about the sales data."""

    prompt = f"""You are a data analyst. Here is a sales dataset in CSV format:

{sales_data}

The user asks: "{question}"

Analyze the data and provide:
1. A clear, direct answer to the question
2. The specific numbers that support your answer
3. Any interesting patterns or insights you notice related to the question

Format your response clearly with sections. Use bullet points for key findings.
If the question requires calculations, show your work briefly."""

    response = model.generate_content(prompt)
    return response.text

# Ask several questions about the data
questions = [
    "What month had the highest total revenue?",
    "Which product is most popular with Business customers vs Consumer customers?",
    "Which region is underperforming and might need more attention?",
    "What is the average order value by product category?"
]

for question in questions:
    print(f"\nQUESTION: {question}")
    print("-" * 60)
    print(ask_data_question(question))
    print("=" * 60)
```

### Expected Output:

```
QUESTION: What month had the highest total revenue?
------------------------------------------------------------
## Answer: March 2024 had the highest total revenue.

**Monthly Revenue Breakdown:**
- January: $11,945.61 (Widget A: $4,498.50 + Widget B: $4,449.11 + Gadget X: $2,998.00)
- February: $12,671.10
- March: $16,444.30 <-- HIGHEST
- April: $14,145.85
- May: $13,445.35
- June: $16,144.50

**Key Insight:** March's strong performance was driven by Widget B
selling 200 units in the East region ($9,998.00 alone), which was
the single largest revenue line in the dataset.
============================================================
```

## 💻 Code Example 2: Automated Report Generator

This script analyzes an entire dataset and produces a formatted business report with insights, recommendations, and a text-based chart.

```python
# report_generator.py
# Generate a complete business report from raw data

import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

# Same sales data as before (in real use, load from a file)
sales_data = """
Date,Product,Category,Region,Units_Sold,Unit_Price,Revenue,Customer_Type
2024-01-15,Widget A,Electronics,North,150,29.99,4498.50,Business
2024-01-15,Widget B,Electronics,South,89,49.99,4449.11,Consumer
2024-01-15,Gadget X,Home,North,200,14.99,2998.00,Consumer
2024-02-10,Widget A,Electronics,East,175,29.99,5248.25,Business
2024-02-10,Widget B,Electronics,North,120,49.99,5998.80,Business
2024-02-10,Gadget X,Home,West,95,14.99,1424.05,Consumer
2024-03-08,Widget A,Electronics,South,60,29.99,1799.40,Consumer
2024-03-08,Widget B,Electronics,East,200,49.99,9998.00,Business
2024-03-08,Gadget X,Home,North,310,14.99,4646.90,Consumer
2024-04-12,Widget A,Electronics,West,190,29.99,5698.10,Business
2024-04-12,Widget B,Electronics,North,145,49.99,7248.55,Consumer
2024-04-12,Gadget X,Home,South,80,14.99,1199.20,Consumer
2024-05-20,Widget A,Electronics,North,210,29.99,6297.90,Business
2024-05-20,Widget B,Electronics,South,95,49.99,4749.05,Business
2024-05-20,Gadget X,Home,East,160,14.99,2398.40,Consumer
2024-06-15,Widget A,Electronics,East,130,29.99,3898.70,Consumer
2024-06-15,Widget B,Electronics,West,170,49.99,8498.30,Business
2024-06-15,Gadget X,Home,North,250,14.99,3747.50,Consumer
"""

def generate_report():
    """Generate a comprehensive business report from the data."""

    prompt = f"""You are a senior business analyst. Using this sales data, write a
complete monthly business report.

DATA:
{sales_data}

Create a professional report with these sections:

# Sales Performance Report: January - June 2024

## Executive Summary
(3-4 sentences summarizing overall performance)

## Key Metrics
- Total Revenue
- Total Units Sold
- Average Revenue per Transaction
- Best Performing Product
- Best Performing Region

## Monthly Trend Analysis
(Describe the month-over-month trend. Create a simple ASCII bar chart showing
monthly revenue, like this:
Jan: ████████████ $11,945
Feb: █████████████ $12,671
etc.)

## Product Performance
(Compare the three products — which is growing, which needs attention)

## Regional Analysis
(Compare the four regions — identify strengths and weaknesses)

## Customer Segment Analysis
(Business vs Consumer — which segment drives more revenue?)

## Recommendations
(3-5 specific, actionable recommendations based on the data)

## Forecast
(Brief prediction for Q3-Q4 based on the trends observed)

Make the report professional but easy to understand. Use specific numbers."""

    response = model.generate_content(prompt)
    return response.text

# Generate the report
report = generate_report()

# Save to file
with open("sales-report-h1-2024.md", "w") as f:
    f.write(report)

print(report)
print("\n\nReport saved to sales-report-h1-2024.md")
```

### Expected Output:

```
# Sales Performance Report: January - June 2024

## Executive Summary
Total revenue for H1 2024 reached $84,796.61 across three product
lines and four regions. Performance showed a positive upward trend
with March and June being standout months. Widget B emerged as the
highest revenue generator despite lower unit volumes, while the
North region consistently outperformed other territories.

## Key Metrics
- Total Revenue: $84,796.61
- Total Units Sold: 3,064 units
- Average Revenue per Transaction: $4,710.92
- Best Performing Product: Widget B ($45,941.81 total)
- Best Performing Region: North ($35,436.15 total)

## Monthly Trend Analysis
Jan: ████████████       $11,945.61
Feb: █████████████      $12,671.10
Mar: █████████████████  $16,444.30  ★ Peak
Apr: ██████████████     $14,145.85
May: █████████████      $13,445.35
Jun: ████████████████   $16,144.50

Trend: Positive overall with seasonal dips in April-May...

## Recommendations
1. **Double down on North region** — consistently top performer
2. **Investigate West region** — lowest revenue, may need marketing push
3. **Bundle Gadget X with Widget purchases** — boost low-price product revenue
4. **Focus Business customer retention** — they drive higher revenue per order
5. **Plan for Q3 seasonal push** — build on the March/June momentum
```

## ✍️ Hands-On Exercises

### Exercise 1: Analyze Your Own Data
Find any dataset you have — it could be your personal budget, a public dataset from the internet (try searching for "sample CSV datasets"), or even data you create yourself. Load it into the data analyzer script and ask 5 different questions. Start with simple questions and build up to complex ones.

**Hint:** Start with "What is the total..." or "Which ... had the highest..." and then try more complex questions like "What is the relationship between X and Y?" or "Are there any unusual patterns in the data?"

### Exercise 2: Custom Report Template
Modify the report generator to create a report format specific to your industry. For example, if you work in retail, add sections like "Inventory Turnover," "Seasonal Trends," and "Customer Acquisition Cost." If you work in education, add "Student Performance Trends" and "Course Completion Rates."

**Hint:** The key is in the prompt structure. Simply change the section headings and descriptions in the prompt, and Gemini will adapt the analysis accordingly.

## 🔗 Next Steps

In the next module, you will explore real-world industry case studies — seeing how businesses in real estate, retail, food service, and education are using Gemini to solve actual problems. You will also build a mini AI-powered business tool tailored to your own industry.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2"><p>1. What is the biggest advantage of using AI for data analysis?</p><label><input type="radio" name="q1" value="0"> A. AI never makes calculation errors</label><label><input type="radio" name="q1" value="1"> B. AI can work with unlimited data sizes</label><label><input type="radio" name="q1" value="2"> C. You can ask questions in plain English without knowing formulas or SQL</label><label><input type="radio" name="q1" value="3"> D. AI creates more colorful charts than Excel</label><div class="quiz-explain">The biggest advantage is accessibility — anyone can ask a question in plain English and get an answer, regardless of their technical skills. You do not need to know formulas, pivot tables, or programming.</div></div>

<div class="quiz-q" data-answer="0"><p>2. What is "descriptive analysis"?</p><label><input type="radio" name="q2" value="0"> A. Analysis that answers "What happened?" using historical data</label><label><input type="radio" name="q2" value="1"> B. Analysis that predicts future outcomes</label><label><input type="radio" name="q2" value="2"> C. Analysis that describes the structure of a database</label><label><input type="radio" name="q2" value="3"> D. Analysis that writes descriptions of products</label><div class="quiz-explain">Descriptive analysis looks backward at what happened — total sales, averages, counts, and comparisons. It is the most basic and most common type of data analysis.</div></div>

<div class="quiz-q" data-answer="3"><p>3. Which data format is described as "the most universal" for working with Gemini?</p><label><input type="radio" name="q3" value="0"> A. PDF documents</label><label><input type="radio" name="q3" value="1"> B. PowerPoint slides</label><label><input type="radio" name="q3" value="2"> C. Word documents</label><label><input type="radio" name="q3" value="3"> D. CSV (Comma-Separated Values)</label><div class="quiz-explain">CSV is the simplest and most universal data format — it is plain text with commas separating columns. Almost every spreadsheet, database, and analytics tool can export CSV, making it the easiest format to work with.</div></div>

<div class="quiz-q" data-answer="1"><p>4. In the data analysis analogy, what is Gemini compared to?</p><label><input type="radio" name="q4" value="0"> A. A calculator that runs formulas</label><label><input type="radio" name="q4" value="1"> B. A smart colleague who reads reports and answers your questions instantly</label><label><input type="radio" name="q4" value="2"> C. A database that stores your data</label><label><input type="radio" name="q4" value="3"> D. A printer that formats reports nicely</label><div class="quiz-explain">Gemini is like having a smart analyst colleague who can read any report, understand the data, and answer questions in plain language — without needing time to build spreadsheets or write queries.</div></div>

<div class="quiz-q" data-answer="2"><p>5. What type of analysis answers "What should we do next?"</p><label><input type="radio" name="q5" value="0"> A. Descriptive analysis</label><label><input type="radio" name="q5" value="1"> B. Diagnostic analysis</label><label><input type="radio" name="q5" value="2"> C. Prescriptive analysis</label><label><input type="radio" name="q5" value="3"> D. Predictive analysis</label><div class="quiz-explain">Prescriptive analysis goes beyond describing what happened or predicting what will happen — it recommends specific actions to take. It is the most actionable type of analysis.</div></div>

<div class="quiz-q" data-answer="0"><p>6. Why does the report generator include an "Executive Summary" section?</p><label><input type="radio" name="q6" value="0"> A. Because busy decision-makers need a quick overview before reading details</label><label><input type="radio" name="q6" value="1"> B. Because Gemini requires it for formatting</label><label><input type="radio" name="q6" value="2"> C. Because it makes the report look longer</label><label><input type="radio" name="q6" value="3"> D. Because search engines rank reports with summaries higher</label><div class="quiz-explain">The Executive Summary exists for busy stakeholders who may not have time to read the full report. It gives them the key findings in 3-4 sentences so they can decide if they need to dive deeper.</div></div>

<div class="quiz-q" data-answer="1"><p>7. What is the easiest way to include data in a Gemini API prompt?</p><label><input type="radio" name="q7" value="0"> A. Upload a .xlsx file directly to the prompt</label><label><input type="radio" name="q7" value="1"> B. Paste the data as CSV text directly in the prompt string</label><label><input type="radio" name="q7" value="2"> C. Connect Gemini to your database with a SQL query</label><label><input type="radio" name="q7" value="3"> D. Send the data as a separate API request first</label><div class="quiz-explain">The simplest approach is to include CSV data directly in your prompt as text. Gemini can read and understand the rows and columns without any special file handling.</div></div>

<div class="quiz-q" data-answer="3"><p>8. What should you always verify when using AI for data analysis?</p><label><input type="radio" name="q8" value="0"> A. That the data file is under 1 MB</label><label><input type="radio" name="q8" value="1"> B. That you asked the question in formal English</label><label><input type="radio" name="q8" value="2"> C. That you used the most expensive model</label><label><input type="radio" name="q8" value="3"> D. That the AI's calculations and conclusions are accurate by spot-checking key numbers</label><div class="quiz-explain">AI can make mistakes with calculations or misinterpret data. Always spot-check important numbers and conclusions. Use a spreadsheet to verify key calculations before relying on AI-generated analysis for business decisions.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
