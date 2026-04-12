# Module 2.4: Gemini's Long Context Window

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Explain what a "context window" is and why Gemini's 2-million-token limit matters
- Upload large documents (PDFs, codebases, text files) to Gemini for analysis
- Summarize books, research papers, and lengthy reports in seconds
- Analyze entire codebases by feeding them into a single conversation
- Understand the practical limits and best strategies for using long context

## 📖 Theory

### What Is a Context Window?

Every AI model has a "context window" -- the amount of text it can see and think about at one time. Think of it like a desk. A small desk only fits a few pages, so if you need to reference a 300-page manual, you have to keep swapping pages in and out. A huge desk lets you spread the entire manual out and see everything at once.

Most AI models have a desk that fits around 8,000 to 128,000 tokens (roughly 6,000 to 96,000 words). Gemini 1.5 Pro and Gemini 2.0 offer a **2-million-token context window** -- that is roughly **1.5 million words**, or about **15 average-length novels** all visible at once.

### Why Does This Matter?

With a small context window, you have to chop your documents into tiny pieces and feed them in one at a time. This means the AI often misses connections between sections. With Gemini's massive context window, you can upload an entire codebase, a full legal contract, or a 500-page technical manual and ask questions about any part of it. The AI sees the whole picture, not just fragments.

### Tokens Explained Simply

A **token** is roughly 3/4 of a word in English. Here are some benchmarks:

| Content | Approximate Tokens |
|---|---|
| A tweet (280 characters) | ~70 tokens |
| A one-page document | ~300 tokens |
| A 10-page report | ~3,000 tokens |
| A 300-page novel | ~90,000 tokens |
| An entire codebase (medium project) | ~200,000-500,000 tokens |
| Gemini's full capacity | 2,000,000 tokens |

So even a large codebase with hundreds of files typically fits within Gemini's context window with plenty of room to spare.

### What Can You Do with 2 Million Tokens?

Here are some practical use cases:

- **Summarize an entire book** -- Upload a full novel or textbook and ask for chapter-by-chapter summaries.
- **Analyze legal documents** -- Feed in a 100-page contract and ask "What are the termination clauses?"
- **Code review at scale** -- Upload your entire project and ask "Find all security vulnerabilities."
- **Research synthesis** -- Upload 10 research papers and ask "What do these papers agree and disagree on?"
- **Meeting transcript analysis** -- Upload hours of meeting transcripts and extract action items.

## 💻 Code Example 1: Uploading and Summarizing a Large Document

### Method 1: Using Google AI Studio (Web Interface)

Google AI Studio (aistudio.google.com) is the easiest way to work with large files.

**Step 1:** Go to [aistudio.google.com](https://aistudio.google.com) and sign in.

**Step 2:** Click **"Create New Prompt"** and select a Gemini model with the 1M or 2M context window.

**Step 3:** Click the **paperclip icon** (or drag and drop) to upload your file. Supported formats include:
- PDF documents
- Plain text files (.txt)
- Code files (.py, .js, .html, etc.)
- CSV and JSON data files

**Step 4:** Once uploaded, you will see the token count displayed. Now type your prompt:

```
Please provide:
1. A one-paragraph executive summary of this document
2. The 5 most important key points
3. Any action items or recommendations mentioned
4. Questions that this document leaves unanswered
```

```
Expected result (for a hypothetical 50-page annual report):
┌──────────────────────────────────────────────────────────┐
│ Token count: 14,832 / 2,000,000                         │
│                                                          │
│ Executive Summary:                                       │
│ The 2024 annual report shows 23% revenue growth...       │
│                                                          │
│ Key Points:                                              │
│ 1. Revenue reached $4.2B, up from $3.4B...               │
│ 2. New market expansion into Southeast Asia...           │
│ 3. R&D spending increased by 31%...                      │
│ ...                                                      │
└──────────────────────────────────────────────────────────┘
```

### Method 2: Using the Gemini API with Python

For more control, you can use the API. First, install the library:

```bash
pip install google-genai
```

Then create a script:

```python
# summarize_document.py -- Upload and summarize a large file with Gemini

from google import genai

# Initialize the client with your API key
client = genai.Client(api_key="YOUR_API_KEY_HERE")

# Read the document
with open("large_report.txt", "r") as f:
    document_text = f.read()

# Count approximate tokens (rough estimate: 1 token ≈ 4 characters)
approx_tokens = len(document_text) // 4
print(f"Document size: ~{approx_tokens:,} tokens")

# Send to Gemini with the document as context
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=[
        f"Here is a document I need analyzed:\n\n{document_text}\n\n"
        "Please provide:\n"
        "1. A one-paragraph summary\n"
        "2. The 5 most important takeaways\n"
        "3. Any data points or statistics mentioned\n"
        "4. Suggested follow-up questions"
    ]
)

print(response.text)
```

```
Expected output:
Document size: ~15,200 tokens

1. Summary:
This report covers the Q3 performance of...

2. Key Takeaways:
   - Customer acquisition cost decreased by 18%...
   ...
```

## 💻 Code Example 2: Analyzing an Entire Codebase

One of the most powerful uses of long context is feeding Gemini an entire project and asking questions about it.

### Step 1: Combine Your Codebase into One File

Use this Python script to bundle your project files:

```python
# bundle_codebase.py -- Combine all code files into one text file for Gemini

import os

def bundle_project(project_dir, output_file, extensions=None):
    """
    Combine all code files in a project into a single text file.

    Args:
        project_dir: Path to your project folder.
        output_file: Where to save the combined file.
        extensions: List of file extensions to include (e.g., ['.py', '.js']).
    """
    if extensions is None:
        extensions = ['.py', '.js', '.ts', '.html', '.css', '.json', '.md']

    # Folders to skip (you almost never want to include these)
    skip_dirs = {'node_modules', '.git', '__pycache__', 'venv', '.env', 'dist'}

    all_content = []
    file_count = 0

    for root, dirs, files in os.walk(project_dir):
        # Remove skip directories so os.walk does not enter them
        dirs[:] = [d for d in dirs if d not in skip_dirs]

        for filename in sorted(files):
            if any(filename.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, filename)
                relative_path = os.path.relpath(file_path, project_dir)

                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()

                    all_content.append(f"\n{'='*60}")
                    all_content.append(f"FILE: {relative_path}")
                    all_content.append(f"{'='*60}\n")
                    all_content.append(content)
                    file_count += 1
                except (UnicodeDecodeError, PermissionError):
                    pass  # Skip binary or inaccessible files

    combined = "\n".join(all_content)

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(combined)

    # Report stats
    approx_tokens = len(combined) // 4
    print(f"Bundled {file_count} files")
    print(f"Total size: {len(combined):,} characters (~{approx_tokens:,} tokens)")
    print(f"Saved to: {output_file}")

    if approx_tokens > 2_000_000:
        print("WARNING: This exceeds Gemini's 2M token limit!")
        print("Consider filtering to fewer file types or specific directories.")

# Example usage
bundle_project(
    project_dir="./my-web-app",
    output_file="codebase_bundle.txt",
    extensions=[".py", ".js", ".html", ".css"]
)
```

```
Expected output:
Bundled 47 files
Total size: 125,400 characters (~31,350 tokens)
Saved to: codebase_bundle.txt
```

### Step 2: Upload and Ask Questions

Upload `codebase_bundle.txt` to Google AI Studio, then ask:

```
I have uploaded my entire web application codebase. Please:

1. Describe the overall architecture and how the files relate to each other.
2. Identify any potential security issues (SQL injection, XSS, hardcoded
   secrets, etc.).
3. Find any functions that are defined but never called (dead code).
4. Suggest the top 3 refactoring improvements for code quality.
```

Gemini can cross-reference files, trace function calls across modules, and spot patterns that would take a human reviewer hours to find.

### Tips for Working with Large Context

| Tip | Why It Helps |
|---|---|
| Put your question AFTER the document | Gemini pays more attention to the end of the context |
| Be specific in your questions | "Find security bugs" works better than "Review this" |
| Ask for structured output | Request bullet points, tables, or numbered lists |
| Upload multiple related files | Gemini can find connections between documents |
| Check the token counter | Stay under the limit to avoid truncation |

## ✍️ Hands-On Exercises

### Exercise 1: Summarize Something Real

Find a long document you actually need to read -- a terms of service agreement, a textbook chapter, a research paper, or a long article. Upload it to Google AI Studio and ask Gemini to:

1. Summarize it in 3 sentences.
2. List the 5 most surprising or important facts.
3. Explain it as if you were telling a friend.

Compare Gemini's summary with the original. Did it miss anything important? Did it get anything wrong?

**Hint:** Academic papers on Google Scholar or long Wikipedia articles are great free sources to test with.

### Exercise 2: Codebase Explorer

If you have any code project (even a small one), use the bundling script from Code Example 2 to combine it into one file. Upload it to Gemini and ask:

1. "Explain what this project does in simple terms."
2. "What would happen if I deleted [specific file]?"
3. "Write documentation for the main functions."

If you do not have a project of your own, clone a small open-source project from GitHub and try it with that.

**Hint:** Try `git clone https://github.com/pallets/flask` for a well-structured Python project.

## ❓ Quiz

<div id="quiz">

<div class="quiz-question" data-answer="B">
<p><strong>1.</strong> Approximately how many words can fit in Gemini's 2-million-token context window?</p>
<label><input type="radio" name="q1" value="A"> A. About 200,000 words</label>
<label><input type="radio" name="q1" value="B"> B. About 1.5 million words</label>
<label><input type="radio" name="q1" value="C"> C. About 2 million words</label>
<label><input type="radio" name="q1" value="D"> D. About 500,000 words</label>
<div class="quiz-explain" style="display:none;">B -- One token is roughly 3/4 of a word, so 2 million tokens equals approximately 1.5 million words.</div>
</div>

<div class="quiz-question" data-answer="C">
<p><strong>2.</strong> What is the "desk" analogy used to explain?</p>
<label><input type="radio" name="q2" value="A"> A. How fast Gemini processes information</label>
<label><input type="radio" name="q2" value="B"> B. The cost of using the Gemini API</label>
<label><input type="radio" name="q2" value="C"> C. The context window -- how much text the AI can see at once</label>
<label><input type="radio" name="q2" value="D"> D. The number of conversations you can have simultaneously</label>
<div class="quiz-explain" style="display:none;">C -- A bigger desk lets you spread out more documents at once. Similarly, a bigger context window lets the AI see more of your text simultaneously.</div>
</div>

<div class="quiz-question" data-answer="A">
<p><strong>3.</strong> Why does the bundling script skip <code>node_modules</code> and <code>.git</code> folders?</p>
<label><input type="radio" name="q3" value="A"> A. They contain thousands of files that are not your code and would waste tokens</label>
<label><input type="radio" name="q3" value="B"> B. Gemini cannot read JavaScript dependency files</label>
<label><input type="radio" name="q3" value="C"> C. Those folders are encrypted and cannot be opened</label>
<label><input type="radio" name="q3" value="D"> D. Google's terms of service prohibit uploading them</label>
<div class="quiz-explain" style="display:none;">A -- node_modules can contain hundreds of thousands of files from third-party libraries, and .git stores version history. Including them would fill up your token budget with irrelevant content.</div>
</div>

<div class="quiz-question" data-answer="D">
<p><strong>4.</strong> What is the recommended placement for your question when working with a large document?</p>
<label><input type="radio" name="q4" value="A"> A. At the very beginning, before the document</label>
<label><input type="radio" name="q4" value="B"> B. Embedded in the middle of the document</label>
<label><input type="radio" name="q4" value="C"> C. In a separate conversation</label>
<label><input type="radio" name="q4" value="D"> D. After the document, at the end of the prompt</label>
<div class="quiz-explain" style="display:none;">D -- Placing your instructions after the document ensures Gemini pays attention to your specific request. Models tend to give more weight to the end of the context.</div>
</div>

<div class="quiz-question" data-answer="B">
<p><strong>5.</strong> Which of the following is NOT a practical use of long context?</p>
<label><input type="radio" name="q5" value="A"> A. Summarizing a 300-page novel</label>
<label><input type="radio" name="q5" value="B"> B. Training Gemini to permanently remember your preferences</label>
<label><input type="radio" name="q5" value="C"> C. Finding security vulnerabilities across a codebase</label>
<label><input type="radio" name="q5" value="D"> D. Comparing themes across multiple research papers</label>
<div class="quiz-explain" style="display:none;">B -- Long context lets Gemini see more text in a single conversation, but it does not permanently change the model. Each new conversation starts fresh.</div>
</div>

<div class="quiz-question" data-answer="A">
<p><strong>6.</strong> Approximately how many tokens does a 300-page novel use?</p>
<label><input type="radio" name="q6" value="A"> A. About 90,000 tokens</label>
<label><input type="radio" name="q6" value="B"> B. About 300,000 tokens</label>
<label><input type="radio" name="q6" value="C"> C. About 2,000,000 tokens</label>
<label><input type="radio" name="q6" value="D"> D. About 10,000 tokens</label>
<div class="quiz-explain" style="display:none;">A -- A typical 300-page novel contains roughly 75,000-90,000 words, which translates to about 90,000 tokens. This is well within Gemini's capacity.</div>
</div>

<div class="quiz-question" data-answer="C">
<p><strong>7.</strong> What file formats can you upload to Google AI Studio?</p>
<label><input type="radio" name="q7" value="A"> A. Only .txt files</label>
<label><input type="radio" name="q7" value="B"> B. Only PDF documents</label>
<label><input type="radio" name="q7" value="C"> C. PDFs, text files, code files, CSVs, and more</label>
<label><input type="radio" name="q7" value="D"> D. Only files under 1 page in length</label>
<div class="quiz-explain" style="display:none;">C -- Google AI Studio supports a wide variety of formats including PDF, plain text, code files (.py, .js, etc.), CSV, JSON, and others.</div>
</div>

<div class="quiz-question" data-answer="D">
<p><strong>8.</strong> What happens if your content exceeds the 2-million-token limit?</p>
<label><input type="radio" name="q8" value="A"> A. Gemini automatically compresses the content</label>
<label><input type="radio" name="q8" value="B"> B. The content is split across multiple AI instances</label>
<label><input type="radio" name="q8" value="C"> C. Gemini processes it but takes much longer</label>
<label><input type="radio" name="q8" value="D"> D. The content may be truncated, and you should filter to fewer files</label>
<div class="quiz-explain" style="display:none;">D -- If you exceed the limit, content at the edges may be cut off. The solution is to be selective about what you upload -- focus on the most relevant files and directories.</div>
</div>

<button class="quiz-submit" onclick="checkQuiz()">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

You have now unlocked one of Gemini's most distinctive superpowers -- the ability to reason over massive amounts of text at once. In **Phase 3**, we will shift from text and code to the visual world. Get ready to explore Gemini's image generation, editing, and design capabilities, starting with creating stunning visuals from simple text descriptions.
