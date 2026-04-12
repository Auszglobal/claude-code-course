# Module 7.1: Building AI Customer Service with Gemini

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Build an AI-powered FAQ auto-responder using the Gemini API
- Set up email triage and routing that categorizes incoming messages automatically
- Perform sentiment analysis on customer feedback to detect happy vs. unhappy customers
- Create a basic chatbot that handles common customer queries
- Design an auto-reply system that responds to frequently asked questions

## 📖 Theory

### Why AI for Customer Service?

Imagine you run a small online store. Every day, you get 50 emails asking the same questions: "Where's my order?", "How do I return an item?", "Do you ship to Canada?" You spend hours typing the same answers over and over.

Now imagine having a super-smart assistant who reads every email, understands what the customer needs, and drafts a perfect reply in seconds. That is exactly what Gemini can do for your customer service.

### The Three Pillars of AI Customer Service

**1. Understanding (What does the customer want?)**
Gemini reads the customer's message and figures out the intent. Is it a complaint? A question about shipping? A product inquiry? This is called **intent classification** — sorting messages into buckets.

**2. Feeling (How does the customer feel?)**
This is **sentiment analysis**. Gemini can tell whether a customer is frustrated, neutral, or happy. Think of it like reading the "emotional temperature" of a message. A message saying "I've been waiting THREE WEEKS" has very different energy from "Just checking on my order, no rush!"

**3. Responding (What should we say back?)**
Once Gemini knows the intent and sentiment, it can generate an appropriate response — polite and apologetic for angry customers, cheerful and helpful for general questions.

### How Email Triage Works

Email triage is like a hospital emergency room. When patients arrive, a nurse quickly assesses each person and sends them to the right department. AI email triage does the same thing:

- **Urgent complaints** go to a senior support agent immediately
- **Billing questions** go to the finance team
- **Technical issues** go to the tech support team
- **General questions** get an automated reply right away

### The FAQ Auto-Responder Concept

An FAQ auto-responder works like a very smart search engine for your support knowledge base. Instead of making customers search through a help page, the AI:

1. Reads the customer's question in natural language
2. Matches it to the closest answer in your FAQ database
3. Generates a personalized response (not a copy-paste template)

## 💻 Code Example 1: FAQ Auto-Responder

This script takes a customer question and finds the best answer from your FAQ database. You can run this in Google AI Studio or in a Python file on your computer.

```python
# faq_responder.py
# An AI-powered FAQ auto-responder using Gemini

import google.generativeai as genai

# Set up your API key (replace with your actual key)
genai.configure(api_key="YOUR_API_KEY")

# Initialize the Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")

# Your FAQ database — add your real questions and answers here
faq_database = """
FREQUENTLY ASKED QUESTIONS:

Q: What are your shipping times?
A: Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.

Q: How do I return an item?
A: You can return any item within 30 days. Go to our website, click "Returns", enter your order number, and print the free return label.

Q: Do you ship internationally?
A: Yes! We ship to Canada, UK, Australia, and most of Europe. International shipping takes 10-14 business days.

Q: How do I track my order?
A: After your order ships, you'll receive an email with a tracking number. Click the link in that email or visit our website and enter your order number.

Q: What payment methods do you accept?
A: We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.

Q: Can I change my order after placing it?
A: You can modify your order within 1 hour of placing it. After that, please contact support and we'll do our best to help.
"""

def answer_customer_question(customer_message):
    """Takes a customer question and generates a helpful reply."""

    # Build the prompt — tell Gemini its role and give it the FAQ data
    prompt = f"""You are a friendly customer service assistant for an online store.
A customer has sent this message:

"{customer_message}"

Using ONLY the information in the FAQ below, write a helpful, warm reply.
If the question is not covered in the FAQ, politely say you'll connect them
with a human agent.

{faq_database}

Reply in a conversational, friendly tone. Keep it under 100 words.
Sign off as "The Support Team"."""

    # Send to Gemini and get the response
    response = model.generate_content(prompt)
    return response.text

# Test with sample customer questions
questions = [
    "Hey, I ordered something last week. How can I see where it is?",
    "Do you guys deliver to Australia?",
    "I want to send back a jacket I bought. What do I do?",
    "Can I pay with Bitcoin?"
]

# Run each question through the auto-responder
for question in questions:
    print(f"CUSTOMER: {question}")
    print(f"AI REPLY: {answer_customer_question(question)}")
    print("-" * 60)
```

### Expected Output:

```
CUSTOMER: Hey, I ordered something last week. How can I see where it is?
AI REPLY: Hi there! Great question. Once your order ships, you'll get
an email with a tracking number — just click the link in that email to
see exactly where your package is. You can also visit our website and
enter your order number to track it. Hope it arrives soon!
— The Support Team
------------------------------------------------------------
CUSTOMER: Do you guys deliver to Australia?
AI REPLY: Yes, we do! We ship to Australia and it typically takes
10-14 business days to arrive. Happy shopping!
— The Support Team
------------------------------------------------------------
```

## 💻 Code Example 2: Sentiment Analysis and Email Triage

This example reads customer emails, detects the sentiment (positive, negative, neutral), classifies the topic, and assigns a priority level.

```python
# email_triage.py
# Automatically categorize and prioritize customer emails

import google.generativeai as genai
import json

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

def triage_email(email_text):
    """Analyze a customer email and return category, sentiment, priority."""

    prompt = f"""Analyze this customer email and return a JSON object with:
- "category": one of [billing, shipping, returns, product_question, complaint, compliment, other]
- "sentiment": one of [positive, neutral, negative, very_negative]
- "priority": one of [low, medium, high, urgent]
- "suggested_action": a brief description of what to do next
- "auto_reply_ok": true if a standard auto-reply is appropriate, false if a human should handle this
- "summary": a one-sentence summary

Customer email:
"{email_text}"

Return ONLY valid JSON, no other text."""

    response = model.generate_content(prompt)

    # Parse the JSON response from Gemini
    try:
        result = json.loads(response.text.strip().strip("```json").strip("```"))
    except json.JSONDecodeError:
        result = {"error": "Could not parse response", "raw": response.text}

    return result

# Sample customer emails to test
emails = [
    {
        "from": "sarah@email.com",
        "subject": "WHERE IS MY ORDER???",
        "body": "I ordered a laptop 3 WEEKS ago and it still hasn't arrived. "
                "This is the third time I've emailed. I want a refund NOW or "
                "I'm reporting you to consumer protection. Order #12345."
    },
    {
        "from": "mike@email.com",
        "subject": "Quick question about returns",
        "body": "Hi there! I bought a shirt last week but it's a bit too "
                "small. Am I still within the return window? Thanks!"
    },
    {
        "from": "lisa@email.com",
        "subject": "Amazing service!",
        "body": "Just wanted to say thank you! My order arrived early and "
                "the packaging was beautiful. I'll definitely be ordering again. "
                "You guys are the best!"
    }
]

# Process each email
for email in emails:
    print(f"FROM: {email['from']}")
    print(f"SUBJECT: {email['subject']}")

    result = triage_email(email['body'])

    print(f"CATEGORY: {result.get('category', 'unknown')}")
    print(f"SENTIMENT: {result.get('sentiment', 'unknown')}")
    print(f"PRIORITY: {result.get('priority', 'unknown')}")
    print(f"AUTO-REPLY OK: {result.get('auto_reply_ok', 'unknown')}")
    print(f"ACTION: {result.get('suggested_action', 'unknown')}")
    print(f"SUMMARY: {result.get('summary', 'unknown')}")
    print("=" * 60)
```

### Expected Output:

```
FROM: sarah@email.com
SUBJECT: WHERE IS MY ORDER???
CATEGORY: complaint
SENTIMENT: very_negative
PRIORITY: urgent
AUTO-REPLY OK: false
ACTION: Escalate to senior agent immediately. Look up order #12345 and provide tracking info or process refund.
SUMMARY: Customer is extremely frustrated about a 3-week delayed laptop order and is demanding a refund.
============================================================
FROM: mike@email.com
SUBJECT: Quick question about returns
CATEGORY: returns
SENTIMENT: positive
PRIORITY: low
AUTO-REPLY OK: true
ACTION: Send standard return policy information with link to initiate return.
SUMMARY: Customer asking about return window for a shirt that doesn't fit.
============================================================
FROM: lisa@email.com
SUBJECT: Amazing service!
CATEGORY: compliment
SENTIMENT: positive
PRIORITY: low
AUTO-REPLY OK: true
ACTION: Send thank-you reply and consider adding a loyalty discount.
SUMMARY: Happy customer praising fast delivery and packaging quality.
============================================================
```

## ✍️ Hands-On Exercises

### Exercise 1: Build Your Own FAQ Bot
Think of a business you know well (your job, a hobby shop, a restaurant). Write at least 8 FAQ entries for that business. Then modify the Code Example 1 script to use your FAQ database. Test it with 5 questions a real customer might ask.

**Hint:** The more detailed your FAQ answers are, the better Gemini's responses will be. Include specific details like hours, prices, and policies.

### Exercise 2: Customer Feedback Analyzer
Collect 5 real product reviews from Amazon or Google Reviews. Run each one through the sentiment analysis system from Code Example 2. See if you agree with the AI's assessment. Try modifying the prompt to also extract "key_issues" as a list.

**Hint:** Add `"key_issues": a list of specific problems or praises mentioned` to the JSON prompt.

## 🔗 Next Steps

In the next module, you will learn how to use Gemini to create a complete social media content pipeline — from brainstorming ideas to writing captions to generating images. You will build a system that creates an entire week of posts in minutes.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2"><p>1. What is "intent classification" in customer service AI?</p><label><input type="radio" name="q1" value="0"> A. Translating customer messages into another language</label><label><input type="radio" name="q1" value="1"> B. Counting how many emails arrive per day</label><label><input type="radio" name="q1" value="2"> C. Figuring out what the customer wants or needs from their message</label><label><input type="radio" name="q1" value="3"> D. Checking if the customer's email address is valid</label><div class="quiz-explain">Intent classification means understanding the purpose behind a customer's message — are they asking about shipping, making a complaint, requesting a return, etc.</div></div>

<div class="quiz-q" data-answer="1"><p>2. What does sentiment analysis measure?</p><label><input type="radio" name="q2" value="0"> A. How long a customer's email is</label><label><input type="radio" name="q2" value="1"> B. The emotional tone of a message (positive, negative, neutral)</label><label><input type="radio" name="q2" value="2"> C. The number of spelling errors in a message</label><label><input type="radio" name="q2" value="3"> D. How many times the customer has contacted support</label><div class="quiz-explain">Sentiment analysis detects the emotional tone — it tells you whether a customer is happy, frustrated, neutral, or angry based on the words and phrasing they use.</div></div>

<div class="quiz-q" data-answer="3"><p>3. In the email triage analogy, what is AI email triage compared to?</p><label><input type="radio" name="q3" value="0"> A. A library sorting system</label><label><input type="radio" name="q3" value="1"> B. A restaurant kitchen</label><label><input type="radio" name="q3" value="2"> C. A school classroom</label><label><input type="radio" name="q3" value="3"> D. A hospital emergency room where patients are assessed and sent to the right department</label><div class="quiz-explain">Email triage works like an ER — a nurse (the AI) quickly assesses each patient (email) and routes them to the right department based on urgency and type.</div></div>

<div class="quiz-q" data-answer="0"><p>4. In Code Example 1, why do we include the FAQ database directly in the prompt?</p><label><input type="radio" name="q4" value="0"> A. So Gemini can reference accurate, specific information when answering</label><label><input type="radio" name="q4" value="1"> B. Because Gemini cannot access the internet</label><label><input type="radio" name="q4" value="2"> C. To make the response slower and more careful</label><label><input type="radio" name="q4" value="3"> D. Because the FAQ database is too small to store separately</label><div class="quiz-explain">Including the FAQ in the prompt gives Gemini the exact information it needs to answer accurately. This way, responses are based on your real policies, not general knowledge.</div></div>

<div class="quiz-q" data-answer="2"><p>5. When should an email NOT receive an auto-reply?</p><label><input type="radio" name="q5" value="0"> A. When the customer asks about shipping</label><label><input type="radio" name="q5" value="1"> B. When the email is short</label><label><input type="radio" name="q5" value="2"> C. When the customer is very upset and threatening action</label><label><input type="radio" name="q5" value="3"> D. When the customer says thank you</label><div class="quiz-explain">Very negative, urgent situations need a human touch. An automated reply to an angry customer demanding a refund could make things worse. These should be escalated to a real person.</div></div>

<div class="quiz-q" data-answer="1"><p>6. What format does Code Example 2 ask Gemini to return its analysis in?</p><label><input type="radio" name="q6" value="0"> A. Plain English paragraph</label><label><input type="radio" name="q6" value="1"> B. JSON (structured data with keys and values)</label><label><input type="radio" name="q6" value="2"> C. HTML table</label><label><input type="radio" name="q6" value="3"> D. CSV spreadsheet format</label><div class="quiz-explain">The script asks Gemini to return valid JSON, which is easy for our Python code to parse and use programmatically. JSON gives us structured, predictable output.</div></div>

<div class="quiz-q" data-answer="3"><p>7. What is one advantage of AI customer service over purely human support?</p><label><input type="radio" name="q7" value="0"> A. AI never makes mistakes</label><label><input type="radio" name="q7" value="1"> B. AI can feel empathy for customers</label><label><input type="radio" name="q7" value="2"> C. AI is always cheaper than hiring anyone</label><label><input type="radio" name="q7" value="3"> D. AI can respond instantly to common questions 24/7</label><div class="quiz-explain">AI excels at handling repetitive, common questions instantly at any time of day. It still makes mistakes and cannot truly feel empathy, so human agents remain important for complex cases.</div></div>

<div class="quiz-q" data-answer="0"><p>8. What should your FAQ auto-responder do when it cannot find a matching answer?</p><label><input type="radio" name="q8" value="0"> A. Politely tell the customer it will connect them with a human agent</label><label><input type="radio" name="q8" value="1"> B. Make up an answer based on general knowledge</label><label><input type="radio" name="q8" value="2"> C. Ignore the message entirely</label><label><input type="radio" name="q8" value="3"> D. Ask the customer to rephrase their question</label><div class="quiz-explain">When the AI does not have a confident answer, the safest approach is to acknowledge the question and hand off to a human. Making up answers risks giving incorrect information.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
