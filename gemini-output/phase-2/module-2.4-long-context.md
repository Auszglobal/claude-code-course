# Module 2.4: The 2-Million-Token Context Window — Gemini's Superpower

## 🎯 Learning Objectives
- Understand what a "context window" is and why size matters
- Know that Gemini offers up to 2 million tokens — far more than most AI models
- Upload large documents to Gemini and get meaningful summaries
- Use Gemini to analyze entire codebases at once
- Understand practical use cases for long-context AI

## 📖 Theory

### What is a Context Window?

Imagine you are having a conversation with a friend, but your friend can only remember the last 5 minutes of the conversation. If you talked about your vacation 10 minutes ago, they have already forgotten it. That would make deep conversations pretty frustrating, right?

A **context window** is the AI equivalent of memory during a conversation. It is the total amount of text the AI can "see" and remember at one time — including everything you have sent it AND everything it has responded with.

Context windows are measured in **tokens** (roughly 1 token = 0.75 words):

| Model | Context Window | Roughly Equals |
|-------|---------------|----------------|
| ChatGPT (GPT-4o) | ~128,000 tokens | ~96,000 words (a long novel) |
| Claude 3.5 | ~200,000 tokens | ~150,000 words |
| Gemini 1.5 Pro | **2,000,000 tokens** | **~1,500,000 words (10+ novels!)** |
| Gemini 2.0 Flash | **1,000,000 tokens** | **~750,000 words** |

Gemini's context window is **10 to 15 times larger** than most competitors. This is not a small improvement — it is a fundamentally different capability.

### Why Does a Large Context Window Matter?

Think about these real-world scenarios:

**Without a large context window** (other AI tools):
- "Summarize this document" — but the document is too long, so you have to split it into chunks, summarize each chunk separately, then somehow combine the summaries. Information gets lost.

**With Gemini's 2M context window**:
- "Here is an entire 500-page book. Summarize it." — Done. Gemini reads the whole thing at once.

This is like the difference between:
- Reading a mystery novel one page at a time, forgetting previous pages (small context)
- Reading the entire mystery novel and remembering every detail (large context)

### What Can You Do with 2 Million Tokens?

Here are some mind-blowing use cases:

| Use Case | What You Upload | What You Ask |
|----------|----------------|--------------|
| **Book analysis** | An entire novel (60,000-100,000 words) | "What are the main themes? How does the protagonist change?" |
| **Research synthesis** | 10-20 academic papers | "What do these papers agree on? Where do they contradict?" |
| **Codebase understanding** | An entire software project (thousands of lines) | "How does the authentication system work? Find potential security issues." |
| **Legal review** | A long contract or policy document | "Summarize the key obligations and flag any unusual clauses." |
| **Meeting notes** | A year's worth of meeting transcripts | "What decisions were made about Project X across all meetings?" |
| **Video analysis** | A 1-hour video | "Summarize the key points. At what timestamp does the speaker discuss AI?" |

### How It Works Technically

When you upload a document to Gemini, it gets converted into tokens. Gemini holds all these tokens in memory simultaneously. This means:
- It can reference page 1 while answering a question about page 500
- It can find connections between ideas that are far apart in the document
- It does not lose context or "forget" earlier parts of the conversation

This is genuinely revolutionary. Before Gemini, working with very long documents required complex "chunking" strategies and often produced incomplete or inconsistent results.

## 💻 Code Example 1: Uploading and Analyzing a Document

Let us upload a text file to Gemini and analyze it.

```python
# analyze_document.py
# Upload a document to Gemini and ask questions about it

import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY_HERE")

# Use a model with a large context window
model = genai.GenerativeModel("gemini-2.0-flash")

# --- Method 1: Analyze text directly (for smaller documents) ---

# Let's create a sample document (in real use, you'd read from a file)
sample_document = """
QUARTERLY BUSINESS REPORT — Q3 2025
Company: TechNova Solutions

EXECUTIVE SUMMARY
Revenue grew 23% year-over-year to $4.2M. Customer acquisition cost
decreased by 15% due to improved marketing automation. The new AI-powered
product line accounted for 35% of total revenue, up from 12% in Q2.
Employee satisfaction score improved to 8.1/10 from 7.3/10.

KEY METRICS
- Revenue: $4.2M (up 23% YoY)
- Customers: 1,247 (up 18% from Q2)
- Churn rate: 3.2% (down from 4.8% in Q2)
- Average deal size: $3,368
- Net Promoter Score: 72 (up from 65)

PRODUCT UPDATES
1. AI Assistant Pro launched in July — exceeded targets by 40%
2. Cloud Migration Tool v2.0 released — 95% customer satisfaction
3. Data Analytics Dashboard redesigned — page load time reduced by 60%

CHALLENGES
1. Hiring for senior engineering roles remains difficult (3 positions open 60+ days)
2. Two enterprise clients delayed renewals pending budget approval
3. Server costs increased 18% due to AI compute requirements

OUTLOOK
Q4 pipeline is strong at $5.1M. The holiday season typically sees slower
enterprise sales but stronger SMB activity. Planning to launch 2 new
products in Q4.
"""

# Ask Gemini to analyze the document
prompt = f"""Here is a quarterly business report. Please provide:
1. A 3-sentence executive summary for a busy CEO
2. The top 3 most important metrics and why they matter
3. The biggest risk facing the company
4. One actionable recommendation

Document:
{sample_document}
"""

response = model.generate_content(prompt)
print(response.text)
```

### Expected Output:
```
**1. Executive Summary for CEO:**
TechNova had an excellent Q3 with 23% revenue growth to $4.2M, driven
primarily by the new AI product line which now represents over a third of
revenue. Customer metrics are strong with 18% growth and improving
retention. The main concern is rising AI compute costs and difficulty
hiring senior engineers.

**2. Top 3 Most Important Metrics:**
- Revenue growth (23% YoY): Shows the core business is accelerating,
  not just maintaining.
- AI product revenue share (35%, up from 12%): This dramatic shift
  indicates the company is successfully pivoting to AI — the future
  growth engine.
- Churn rate (3.2%, down from 4.8%): Improving retention means
  customers are finding lasting value, which compounds revenue growth.

**3. Biggest Risk:**
Rising AI compute costs (up 18%) combined with the AI product line
growing to 35% of revenue creates a potential margin squeeze. If compute
costs continue growing faster than revenue, profitability could erode
even as top-line numbers look healthy.

**4. Actionable Recommendation:**
Prioritize negotiating volume discounts or reserved capacity with cloud
providers immediately. As AI products become the majority of revenue,
controlling compute costs will be critical for maintaining healthy margins.
```

## 💻 Code Example 2: Analyzing an Entire Codebase

This is where the large context window truly shines — feeding an entire codebase to Gemini.

```python
# analyze_codebase.py
# Upload multiple code files and have Gemini analyze the whole project

import google.generativeai as genai
import os

genai.configure(api_key="YOUR_API_KEY_HERE")
model = genai.GenerativeModel("gemini-2.0-flash")

def read_project_files(directory, extensions=(".py", ".js", ".html", ".css")):
    """Read all code files from a directory and combine them into one string."""
    all_code = []
    
    for root, dirs, files in os.walk(directory):
        # Skip hidden directories and common non-essential folders
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in 
                   ['node_modules', '__pycache__', 'venv', '.git']]
        
        for filename in sorted(files):
            if any(filename.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, filename)
                relative_path = os.path.relpath(filepath, directory)
                
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    # Format each file with clear separators
                    all_code.append(f"\n{'='*60}")
                    all_code.append(f"FILE: {relative_path}")
                    all_code.append(f"{'='*60}")
                    all_code.append(content)
                except Exception as e:
                    all_code.append(f"\n[Could not read {relative_path}: {e}]")
    
    return "\n".join(all_code)

# --- Example usage ---

# Point this to any project folder on your computer
project_dir = "./my-project"  # Change this to your project path!

# Check if the directory exists
if os.path.exists(project_dir):
    print(f"Reading files from: {project_dir}")
    codebase = read_project_files(project_dir)
    
    # Count tokens (approximate)
    word_count = len(codebase.split())
    print(f"Total words: {word_count:,}")
    print(f"Approximate tokens: {int(word_count * 1.3):,}")
    print("Sending to Gemini for analysis...\n")
    
    # Ask Gemini to analyze the entire codebase
    prompt = f"""You are a senior software engineer reviewing a codebase.
    
Please analyze the following code and provide:

1. **Architecture Overview**: How is the project structured? What are the main components?
2. **Code Quality**: Rate the code quality (1-10) and explain why.
3. **Potential Bugs**: Identify any bugs or error-prone patterns.
4. **Security Concerns**: Flag any security issues.
5. **Improvement Suggestions**: List your top 5 recommendations.

Here is the complete codebase:

{codebase}
"""
    
    response = model.generate_content(prompt)
    print(response.text)
else:
    print(f"Directory not found: {project_dir}")
    print("Create a project folder with some code files, or change the path!")
    print("\nHere's a demo with a small inline example instead:\n")
    
    # Demo with inline code
    demo_code = """
    FILE: app.py
    from flask import Flask, request
    import sqlite3
    
    app = Flask(__name__)
    
    @app.route('/search')
    def search():
        query = request.args.get('q')
        conn = sqlite3.connect('data.db')
        # WARNING: This is intentionally vulnerable for the demo
        results = conn.execute(f"SELECT * FROM items WHERE name LIKE '%{query}%'")
        return str(results.fetchall())
    """
    
    response = model.generate_content(
        f"Review this code for security issues and bugs:\n{demo_code}"
    )
    print(response.text)
```

### Expected Output (for the demo security example):
```
**CRITICAL SECURITY ISSUE: SQL Injection Vulnerability**

The code on this line is extremely dangerous:
    results = conn.execute(f"SELECT * FROM items WHERE name LIKE '%{query}%'")

The user input (`query`) is inserted directly into the SQL string without
any sanitization. An attacker could input something like:
    ' OR '1'='1' --
This would return ALL records in the database, or worse, an attacker could
use UNION queries to extract sensitive data or DROP TABLE to delete data.

**Fix:**
Use parameterized queries instead:
    results = conn.execute(
        "SELECT * FROM items WHERE name LIKE ?",
        (f"%{query}%",)
    )

**Additional Issues:**
1. No connection closing (use `with` statement or `conn.close()`)
2. No error handling for database connection failures
3. No input validation or length limits on the query parameter
4. Returning raw database results to the user exposes internal structure
```

### Tips for Working with Long Documents

```python
# Practical tips when using Gemini's long context window:

# Tip 1: Use the File API for large files (more efficient)
# Instead of pasting text, upload the file directly:
uploaded_file = genai.upload_file("path/to/large_document.pdf")
response = model.generate_content([
    "Summarize the key findings in this research paper.",
    uploaded_file
])

# Tip 2: Be specific in your questions
# BAD:  "What does this document say?"
# GOOD: "What does this document say about climate change impacts on
#        agriculture in Southeast Asia? List specific statistics mentioned."

# Tip 3: Ask for page/section references
# "When you cite information, reference the section or page it came from."

# Tip 4: Use structured output requests
# "Create a table comparing all products mentioned in this document,
#  with columns for: name, price, target audience, and key features."
```

## ✍️ Hands-On Exercises

### Exercise 1: Summarize a Long Text
Find a long article, blog post, or document (aim for 2,000+ words). You can use:
- A Wikipedia article (copy the text)
- A research paper (download the PDF)
- A long blog post
- A chapter from a free ebook (e.g., from Project Gutenberg)

Upload it to Gemini (via AI Studio or the API) and ask:
1. "Summarize this in 5 bullet points"
2. "What is the most surprising claim in this text?"
3. "If I only had 30 seconds to explain this to someone, what would I say?"

**Tip**: Try the same document with different summary requests. Notice how Gemini can pull out completely different information depending on what you ask for. This demonstrates that it truly understands the full document.

### Exercise 2: Codebase Analyzer
If you have any coding project on your computer (even a small one from earlier exercises in this course), use the `analyze_codebase.py` script to feed it to Gemini.

If you do not have a project, create a small one:
1. Create a folder called `my-test-project`
2. Put 3-4 Python files in it (you can use the expense tracker from Module 2.3!)
3. Run the codebase analyzer

Ask these follow-up questions:
- "Which file is the most complex? Why?"
- "If I wanted to add a new feature to export data as CSV, which file should I modify?"
- "Write unit tests for the most critical functions"

**Tip**: The more files you provide, the more impressive the analysis becomes. Gemini can find connections and patterns across files that would take a human reviewer much longer to spot.

## 🔗 Next Steps

Congratulations — you have completed Phase 2! You now know how to:
- Write effective prompts with advanced techniques (Module 2.1)
- Use Gemini Code Assist for real-time coding help (Module 2.2)
- Build real programs with Gemini's help (Module 2.3)
- Leverage the massive 2M context window for document and code analysis (Module 2.4)

You have gone from "What is Gemini?" to "I can build and analyze real projects with AI." That is a tremendous leap. The skills you have learned — prompting, debugging, code review, document analysis — are the same skills that professionals use every day. Keep experimenting, keep building, and keep asking Gemini to explain things you do not understand. The more you practice, the more powerful these tools become.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. How large is Gemini 1.5 Pro's context window?</p>
<label><input type="radio" name="q1" value="0"> 32,000 tokens</label>
<label><input type="radio" name="q1" value="1"> 128,000 tokens</label>
<label><input type="radio" name="q1" value="2"> 2,000,000 tokens (2 million)</label>
<label><input type="radio" name="q1" value="3"> 10,000,000 tokens</label>
<div class="quiz-explain">Gemini 1.5 Pro has a context window of 2 million tokens, which is approximately 1.5 million words. This is 10-15 times larger than most competing AI models and enables analyzing entire books or codebases at once.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. What is a "context window" in simple terms?</p>
<label><input type="radio" name="q2" value="0"> A pop-up window in the user interface</label>
<label><input type="radio" name="q2" value="1"> The total amount of text the AI can see and remember at one time during a conversation</label>
<label><input type="radio" name="q2" value="2"> A window on your computer screen</label>
<label><input type="radio" name="q2" value="3"> The number of conversations you can have per day</label>
<div class="quiz-explain">A context window is the AI's "working memory" — the total amount of text it can process at once, including everything you send and everything it responds with. A larger context window means the AI can handle longer documents and conversations.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. Roughly how many words equal 1,000 tokens?</p>
<label><input type="radio" name="q3" value="0"> About 750 words</label>
<label><input type="radio" name="q3" value="1"> Exactly 1,000 words</label>
<label><input type="radio" name="q3" value="2"> About 100 words</label>
<label><input type="radio" name="q3" value="3"> About 5,000 words</label>
<div class="quiz-explain">Approximately 1,000 tokens equals about 750 words. Tokens are word fragments — some short words are one token, while longer or uncommon words may be split into multiple tokens. This ratio is a useful rule of thumb.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. What is the main advantage of a 2M context window over a 128K context window?</p>
<label><input type="radio" name="q4" value="0"> It makes the AI respond faster</label>
<label><input type="radio" name="q4" value="1"> It makes the AI more creative</label>
<label><input type="radio" name="q4" value="2"> It costs less money</label>
<label><input type="radio" name="q4" value="3"> You can analyze entire books, codebases, or dozens of documents at once without splitting them</label>
<div class="quiz-explain">A 2M context window lets you upload vastly larger amounts of text at once — entire novels, complete codebases, or dozens of research papers. With smaller windows, you would need to split documents into chunks and lose context between them.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What is SQL injection (the vulnerability found in Code Example 2)?</p>
<label><input type="radio" name="q5" value="0"> A way to make databases run faster</label>
<label><input type="radio" name="q5" value="1"> An attack where malicious user input manipulates database queries to access or destroy data</label>
<label><input type="radio" name="q5" value="2"> A method for importing data into SQL databases</label>
<label><input type="radio" name="q5" value="3"> A type of database backup procedure</label>
<div class="quiz-explain">SQL injection is a security vulnerability where user input is inserted directly into SQL queries without sanitization. Attackers can craft special input strings that modify the query to access unauthorized data, delete tables, or extract sensitive information. The fix is to use parameterized queries.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. What is the best way to get specific answers when analyzing a long document?</p>
<label><input type="radio" name="q6" value="0"> Ask very vague questions like "What does this say?"</label>
<label><input type="radio" name="q6" value="1"> Only upload one page at a time</label>
<label><input type="radio" name="q6" value="2"> Ask specific, targeted questions and request references to sections or pages</label>
<label><input type="radio" name="q6" value="3"> Use the smallest possible model</label>
<div class="quiz-explain">Specific, targeted questions produce much better results than vague ones. Asking Gemini to reference specific sections or pages helps you verify the information. For example, "What does section 3 say about revenue growth?" is much better than "What does this document say?"</div>
</div>

<div class="quiz-q" data-answer="0">
<p>7. What does genai.upload_file() do?</p>
<label><input type="radio" name="q7" value="0"> Uploads a file to Google's servers so Gemini can analyze it efficiently</label>
<label><input type="radio" name="q7" value="1"> Saves a file to your local computer</label>
<label><input type="radio" name="q7" value="2"> Shares a file with other users</label>
<label><input type="radio" name="q7" value="3"> Converts a file to a different format</label>
<div class="quiz-explain">genai.upload_file() uploads a file (like a PDF, image, or text file) to Google's servers using the File API. This is more efficient than pasting the content directly into your prompt, especially for large files, and supports file types like PDFs that cannot be pasted as text.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>8. Which of these tasks would benefit MOST from a 2-million-token context window?</p>
<label><input type="radio" name="q8" value="0"> Asking "What is 2 + 2?"</label>
<label><input type="radio" name="q8" value="1"> Translating a single sentence to Spanish</label>
<label><input type="radio" name="q8" value="2"> Generating a 3-line poem</label>
<label><input type="radio" name="q8" value="3"> Comparing themes across 15 research papers uploaded simultaneously</label>
<div class="quiz-explain">Comparing themes across 15 research papers requires the AI to hold all papers in memory simultaneously and find connections between them. This is exactly the kind of task where a 2M context window shines — smaller context windows could not fit all 15 papers at once.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
