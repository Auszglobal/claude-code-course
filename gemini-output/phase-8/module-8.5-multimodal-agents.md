# Module 8.5: Multimodal Agents — The Future of AI

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Understand what multimodal AI agents are and why they matter
  - Build agents that combine vision, text, and code generation
  - Implement multi-step reasoning with tool use
  - Design agent workflows for real business problems
  - Know what's coming next in the AI agent landscape

## 📖 Theory

### What Is a Multimodal Agent?

Think of a regular AI chatbot as someone who can only talk on the phone — they hear you, they respond with words. A **multimodal agent** is like having a colleague who can:

- **See** — analyse images, screenshots, documents
- **Read** — understand text, PDFs, spreadsheets
- **Write** — generate reports, emails, code
- **Act** — call APIs, run tools, make decisions
- **Remember** — maintain context across multiple steps

The key word is **agent**. Unlike a simple chatbot that responds once, an agent **plans**, **decides**, and **executes** multiple steps to complete a goal.

### Why Multimodal Matters

Most real-world tasks aren't just text. A product manager needs to:
1. Look at a screenshot of a bug (vision)
2. Read the error logs (text)
3. Write a fix (code)
4. Test it (tool use)
5. Update the ticket (action)

A multimodal agent handles all of this in one workflow.

### The Agent Loop

Every AI agent follows the same pattern:

```
┌─────────────┐
│ 1. Perceive  │ ← Read input (text, image, data)
├─────────────┤
│ 2. Think     │ ← Reason about what to do
├─────────────┤
│ 3. Act       │ ← Call a tool or generate output
├─────────────┤
│ 4. Observe   │ ← Check the result
├─────────────┤
│ 5. Repeat    │ ← Continue until task is done
└─────────────┘
```

## 💻 Code Example 1: Product Image Analyser

This agent takes a product photo and generates a complete listing:

```python
import google.generativeai as genai
from PIL import Image

# Configure Gemini
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

# Load a product image
image = Image.open("product.jpg")

# Step 1: Analyse the image
analysis = model.generate_content([
    "You are a product listing expert. Analyse this product image and provide:",
    "1. Product name and category",
    "2. Key features (bullet points)",
    "3. Suggested price range",
    "4. SEO-friendly title (under 80 chars)",
    "5. Product description (150 words)",
    image
])

print("=== Product Analysis ===")
print(analysis.text)

# Step 2: Generate social media captions
captions = model.generate_content([
    "Based on this product image, write 3 social media captions:",
    "1. Instagram (with emojis and hashtags)",
    "2. Facebook (professional tone)",
    "3. Twitter/X (under 280 characters)",
    image
])

print("\n=== Social Media Captions ===")
print(captions.text)
```

### Expected Output:
```
=== Product Analysis ===
Product: Wireless Bluetooth Earbuds
Category: Electronics > Audio
Features:
- Active noise cancellation
- 30-hour battery life
- IPX5 water resistant
...

=== Social Media Captions ===
Instagram: 🎵 Sound meets style! These wireless earbuds...
```

## 💻 Code Example 2: Multi-Step Research Agent

This agent researches a topic using multiple tools:

```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

# Define tools the agent can use
def search_web(query):
    """Simulate a web search"""
    return f"Search results for: {query} — [3 relevant articles found]"

def save_to_file(filename, content):
    """Save research to a file"""
    with open(filename, "w") as f:
        f.write(content)
    return f"Saved to {filename}"

def get_current_date():
    """Get today's date"""
    from datetime import date
    return str(date.today())

# Create the agent with tools
model = genai.GenerativeModel(
    "gemini-2.0-flash",
    tools=[search_web, save_to_file, get_current_date]
)
chat = model.start_chat()

# Give the agent a complex task
response = chat.send_message(
    "Research the latest trends in AI for small businesses. "
    "Search for recent articles, summarise the top 3 trends, "
    "and save a report to 'ai-trends-report.md' with today's date."
)

# The agent will:
# 1. Call get_current_date() to get today's date
# 2. Call search_web("AI trends small business 2026")
# 3. Analyse the results
# 4. Call save_to_file() to save the report

print(response.text)
```

## ✍️ Hands-On Exercises

### Exercise 1: Build a Receipt Scanner
1. Take a photo of a receipt (or find one online)
2. Use Gemini to extract: store name, date, items, total, tax
3. Output the data as a structured JSON object
4. Bonus: calculate if the tax amount is correct

### Exercise 2: Design a Customer Support Agent
1. Plan an agent that can:
   - Read a customer complaint email
   - Look up their order (simulated function)
   - Draft an appropriate response
   - Categorise the issue (refund/exchange/info)
2. Write the function definitions and agent prompt
3. Test with 3 different customer scenarios

## 🔗 Next Steps

Congratulations — you've completed the entire Google Gemini Complete Guide! You've learned:
- **Phase 1-2**: Gemini basics, API, CLI, prompting, coding
- **Phase 3-4**: Image generation/editing, video creation
- **Phase 5**: Google Workspace automation
- **Phase 6**: Google Maps integration
- **Phase 7**: Business applications
- **Phase 8**: Advanced — function calling, RAG, Vertex AI, mobile, and agents

You now have the skills to build AI-powered solutions for almost any problem. The next step is to **pick a real project** and build it. Start small, iterate, and keep learning as the technology evolves.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What makes a multimodal agent different from a regular chatbot?</p>
<label><input type="radio" name="q1" value="0"> It uses a newer model</label>
<label><input type="radio" name="q1" value="1"> It can only process images</label>
<label><input type="radio" name="q1" value="2"> It can see, read, write, act, and plan across multiple steps</label>
<label><input type="radio" name="q1" value="3"> It works faster</label>
<div class="quiz-explain">A multimodal agent combines vision, text, code, and tool use in a multi-step reasoning loop — far beyond simple question-and-answer.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. What is the correct order of the Agent Loop?</p>
<label><input type="radio" name="q2" value="0"> Act → Think → Perceive → Observe</label>
<label><input type="radio" name="q2" value="1"> Perceive → Think → Act → Observe → Repeat</label>
<label><input type="radio" name="q2" value="2"> Think → Act → Perceive → Report</label>
<label><input type="radio" name="q2" value="3"> Observe → Act → Think → Repeat</label>
<div class="quiz-explain">The agent loop is: Perceive (read input), Think (reason), Act (use tools), Observe (check results), Repeat until done.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>3. In the product analyser example, what does the agent generate from a single image?</p>
<label><input type="radio" name="q3" value="0"> Only a product name</label>
<label><input type="radio" name="q3" value="1"> Only social media captions</label>
<label><input type="radio" name="q3" value="2"> Only a price estimate</label>
<label><input type="radio" name="q3" value="3"> Product analysis, description, price range, SEO title, and social captions</label>
<div class="quiz-explain">The multimodal agent extracts comprehensive product information from a single image — name, features, pricing, SEO title, description, and social media content.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. What is Function Calling used for in agents?</p>
<label><input type="radio" name="q4" value="0"> Letting the AI decide when to use external tools and APIs</label>
<label><input type="radio" name="q4" value="1"> Calling Python functions faster</label>
<label><input type="radio" name="q4" value="2"> Replacing the AI model with code</label>
<label><input type="radio" name="q4" value="3"> Debugging function errors</label>
<div class="quiz-explain">Function Calling lets the AI model decide when to invoke external tools (web search, file operations, APIs) as part of its reasoning process.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>5. Why is "multimodal" important for real-world tasks?</p>
<label><input type="radio" name="q5" value="0"> It makes AI cheaper to run</label>
<label><input type="radio" name="q5" value="1"> It only works with Google products</label>
<label><input type="radio" name="q5" value="2"> Most real tasks involve multiple types of data — text, images, and actions</label>
<label><input type="radio" name="q5" value="3"> It replaces the need for human workers</label>
<div class="quiz-explain">Real-world problems rarely involve just text. A bug report has screenshots, logs have text, and fixes require code — multimodal handles all of these together.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. In the research agent example, how many tools does it use?</p>
<label><input type="radio" name="q6" value="0"> 1 (search only)</label>
<label><input type="radio" name="q6" value="1"> 3 (search, save file, get date)</label>
<label><input type="radio" name="q6" value="2"> 5</label>
<label><input type="radio" name="q6" value="3"> 0 (no tools)</label>
<div class="quiz-explain">The research agent has three tools: search_web, save_to_file, and get_current_date. Gemini decides which to call and when.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>7. What model is recommended for multimodal agent tasks?</p>
<label><input type="radio" name="q7" value="0"> Gemini 2.0 Flash (fast, multimodal, supports tools)</label>
<label><input type="radio" name="q7" value="1"> GPT-3.5</label>
<label><input type="radio" name="q7" value="2"> DALL-E</label>
<label><input type="radio" name="q7" value="3"> Gemini 1.0 Nano</label>
<div class="quiz-explain">Gemini 2.0 Flash is fast, supports multimodal input (text + images), and has built-in function calling — ideal for agent workflows.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>8. What should you do after completing this course?</p>
<label><input type="radio" name="q8" value="0"> Wait for the next version of Gemini</label>
<label><input type="radio" name="q8" value="1"> Memorise all the API parameters</label>
<label><input type="radio" name="q8" value="2"> Re-read every module again</label>
<label><input type="radio" name="q8" value="3"> Pick a real project, start small, iterate, and keep learning</label>
<div class="quiz-explain">The best way to solidify your skills is to build something real. Start with a small project, apply what you've learned, and grow from there.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
