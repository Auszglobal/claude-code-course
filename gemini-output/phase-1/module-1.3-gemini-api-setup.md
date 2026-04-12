# Module 1.3: Gemini API Setup — Your First Code Connection

## 🎯 Learning Objectives
- Understand what an API is and why you need one
- Get your free Gemini API key from Google AI Studio
- Install Python and the Google Generative AI SDK on your computer
- Write and run your first API call to Gemini (a "Hello World" program)
- Understand the structure of an API response

## 📖 Theory

### What is an API?

Imagine a restaurant. You (the customer) sit at a table and want food from the kitchen. You do not walk into the kitchen yourself — instead, you tell the **waiter** what you want, and the waiter brings it back to you.

An **API** (Application Programming Interface) works exactly the same way:
- **You** = your code (the program you write)
- **The kitchen** = Google's Gemini servers (where the AI brain lives)
- **The waiter** = the API (it carries your request to Gemini and brings back the answer)

Without an API, your code has no way to talk to Gemini. The API is the bridge.

### What is an API Key?

An API key is like a **VIP badge** that proves you have permission to use the service. When your code sends a request to Gemini, it includes this key so Google knows it is you and not a random stranger.

Important rules about API keys:
- **Keep it secret**: Never share your API key publicly (do not post it on social media or GitHub)
- **It is free**: The Gemini API key has a generous free tier
- **One key is enough**: You only need one key for all your projects

### Why Python?

We will use Python for our code examples because:
- It is the most beginner-friendly programming language
- It reads almost like English
- Google provides an official Python library for Gemini
- It is the most popular language for AI and data science

Do not worry if you have never written code before — we will walk through every single step.

## 💻 Code Example 1: Getting Your API Key and First Call

### Part A: Get Your API Key

```
Step 1: Go to https://aistudio.google.com

Step 2: Sign in with your Google account

Step 3: Look for "Get API Key" in the left sidebar or top menu

Step 4: Click "Create API Key"

Step 5: Choose "Create API key in new project" (this is fine for learning)

Step 6: Your API key will appear — it looks something like this:
        AIzaSyA1B2c3D4e5F6g7H8i9J0kLmNoPqRsTuVw

Step 7: COPY this key and save it somewhere safe
        (a text file on your desktop, a password manager, etc.)

        IMPORTANT: Do not share this key with anyone!
```

### Part B: Install Python

**On Mac:**
```bash
# Open Terminal (press Cmd+Space, type "Terminal", press Enter)

# Check if Python is already installed:
python3 --version

# If you see "Python 3.x.x", you are good! Skip to Part C.
# If not, install it by going to https://www.python.org/downloads/
# Download the latest version and run the installer.
```

**On Windows:**
```bash
# Open Command Prompt (press Windows key, type "cmd", press Enter)

# Check if Python is already installed:
python --version

# If you see "Python 3.x.x", you are good! Skip to Part C.
# If not:
# 1. Go to https://www.python.org/downloads/
# 2. Download the latest version
# 3. Run the installer
# 4. IMPORTANT: Check the box that says "Add Python to PATH"!
# 5. Click "Install Now"
```

### Part C: Install the Google Generative AI Library

```bash
# This command downloads Google's official Gemini library for Python
# Run this in your Terminal (Mac) or Command Prompt (Windows):

pip install google-generativeai
```

### Expected Output:
```
Collecting google-generativeai
  Downloading google_generativeai-0.8.x-py3-none-any.whl
Installing collected packages: google-generativeai
Successfully installed google-generativeai-0.8.x
```

If you see "Successfully installed" — you are ready!

### Part D: Write Your First Gemini Program

Create a new file called `hello_gemini.py`. You can use any text editor (Notepad on Windows, TextEdit on Mac, or VS Code if you have it).

```python
# hello_gemini.py
# Your very first program that talks to Google Gemini!

# Step 1: Import the Gemini library (like opening a toolbox)
import google.generativeai as genai

# Step 2: Set your API key (replace with YOUR actual key)
# IMPORTANT: In real projects, never put your key directly in code.
# We will learn safer methods later. For now, this is fine for learning.
genai.configure(api_key="YOUR_API_KEY_HERE")

# Step 3: Choose which Gemini model to use
# "gemini-2.0-flash" is fast, free, and great for learning
model = genai.GenerativeModel("gemini-2.0-flash")

# Step 4: Send a prompt to Gemini and get a response
response = model.generate_content("Say hello and tell me one fun fact about space!")

# Step 5: Print the response
print(response.text)
```

**To run this program:**
```bash
# Navigate to the folder where you saved the file, then:
python3 hello_gemini.py      # Mac
python hello_gemini.py       # Windows
```

### Expected Output:
```
Hello! Here's a fun fact about space: A day on Venus is longer than a year
on Venus! It takes Venus 243 Earth days to rotate once on its axis, but
only 225 Earth days to orbit the Sun. So a single day is longer than an
entire year! 🌍✨
```

Your response will be different (AI is creative!) but you should see a friendly greeting and a space fact.

**Congratulations!** You just made a computer program talk to one of the most powerful AI systems in the world. That is genuinely impressive.

## 💻 Code Example 2: Understanding the Response Object

The response from Gemini contains more than just text. Let us explore it.

```python
# explore_response.py
# Let's peek inside the response object to understand what Gemini sends back

import google.generativeai as genai

# Configure your API key
genai.configure(api_key="YOUR_API_KEY_HERE")

# Create the model
model = genai.GenerativeModel("gemini-2.0-flash")

# Send a prompt
response = model.generate_content("What are the 3 primary colors? Keep it brief.")

# --- Explore the response ---

# 1. The main text response (what you usually want)
print("=== Response Text ===")
print(response.text)
print()

# 2. How many tokens were used (tokens ≈ word fragments)
#    This tells you how "expensive" the request was
print("=== Token Usage ===")
print(f"Prompt tokens (what you sent):     {response.usage_metadata.prompt_token_count}")
print(f"Response tokens (what Gemini sent): {response.usage_metadata.candidates_token_count}")
print(f"Total tokens used:                  {response.usage_metadata.total_token_count}")
print()

# 3. The finish reason — why did Gemini stop writing?
print("=== Finish Reason ===")
print(f"Finish reason: {response.candidates[0].finish_reason}")
# "STOP" means Gemini finished naturally
# "MAX_TOKENS" means it hit the length limit
# "SAFETY" means it stopped due to safety filters
```

### Expected Output:
```
=== Response Text ===
The three primary colors are red, blue, and yellow. These colors cannot be
created by mixing other colors together, but they can be mixed to create
all other colors.

=== Token Usage ===
Prompt tokens (what you sent):     12
Response tokens (what Gemini sent): 35
Total tokens used:                  47

=== Finish Reason ===
Finish reason: FinishReason.STOP
```

### What Do Tokens Mean?

Tokens are the "currency" of AI APIs. Think of them like minutes on a phone plan:
- Every word you send costs tokens (roughly 1 token per word, sometimes more)
- Every word Gemini sends back also costs tokens
- The free tier gives you plenty of tokens per day
- Keeping prompts concise saves tokens (and money, if you ever use the paid tier)

A rough guide: **1,000 tokens is approximately 750 words**.

## ✍️ Hands-On Exercises

### Exercise 1: Personalized Greeting
Modify the `hello_gemini.py` program to:
1. Ask Gemini to greet you by name (replace "Say hello" with "Say hello to [your name]")
2. Ask for a fun fact about your favorite country instead of space
3. Run it three times and notice how the responses are different each time

**Tip**: Just change the text inside the quotes in `generate_content()`. The rest of the code stays the same!

### Exercise 2: Token Detective
Write a program that sends three different prompts and compares token usage:
1. A short prompt: "Say hi" (about 2 tokens)
2. A medium prompt: "Explain what gravity is in 50 words" (about 10 tokens)
3. A long prompt: "Write a detailed explanation of how rainbows form, including the physics of light refraction, the role of water droplets, and why we see specific colors in a specific order" (about 35 tokens)

Print the token counts for each. What pattern do you notice?

**Tip**: You can copy the `explore_response.py` code and just change the prompt text three times. Longer prompts tend to generate longer responses, using more tokens.

## 🔗 Next Steps

You have officially written code that communicates with Google Gemini. In **Module 1.4**, we will explore the **Gemini CLI** — a command-line tool that lets you interact with Gemini directly from your terminal, similar to Claude Code. This is a powerful way to use AI without writing Python scripts every time.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is an API?</p>
<label><input type="radio" name="q1" value="0"> A type of programming language</label>
<label><input type="radio" name="q1" value="1"> A bridge that lets your code communicate with a service like Gemini</label>
<label><input type="radio" name="q1" value="2"> A web browser plugin</label>
<label><input type="radio" name="q1" value="3"> An operating system made by Google</label>
<div class="quiz-explain">An API (Application Programming Interface) is a bridge between your code and a service. Like a waiter carrying your order to the kitchen and bringing food back, the API carries your prompt to Gemini and returns the response.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>2. Why should you keep your API key secret?</p>
<label><input type="radio" name="q2" value="0"> It will stop working if anyone else sees it</label>
<label><input type="radio" name="q2" value="1"> Google will delete your account</label>
<label><input type="radio" name="q2" value="2"> It does not matter — API keys are public information</label>
<label><input type="radio" name="q2" value="3"> Someone could use it to make requests that count against your usage limits or cost you money</label>
<div class="quiz-explain">If someone gets your API key, they can make requests using your account. This could use up your free tier limits or, if you are on a paid plan, cost you money. Always keep API keys private.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. What command installs the Google Generative AI Python library?</p>
<label><input type="radio" name="q3" value="0"> pip install google-generativeai</label>
<label><input type="radio" name="q3" value="1"> npm install gemini</label>
<label><input type="radio" name="q3" value="2"> apt-get install gemini-python</label>
<label><input type="radio" name="q3" value="3"> download google-gemini</label>
<div class="quiz-explain">The command "pip install google-generativeai" downloads and installs Google's official Python library for interacting with Gemini models. pip is Python's package manager.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>4. In the code example, what does "gemini-2.0-flash" refer to?</p>
<label><input type="radio" name="q4" value="0"> The version of Python being used</label>
<label><input type="radio" name="q4" value="1"> The name of your project</label>
<label><input type="radio" name="q4" value="2"> The specific Gemini model being used — a fast, free model good for learning</label>
<label><input type="radio" name="q4" value="3"> The speed of your internet connection</label>
<div class="quiz-explain">"gemini-2.0-flash" is the model identifier. It tells Google which Gemini model to use for your request. Flash is the fast, free tier model that is perfect for learning and everyday tasks.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What are tokens in the context of AI APIs?</p>
<label><input type="radio" name="q5" value="0"> Physical coins you pay Google with</label>
<label><input type="radio" name="q5" value="1"> Units that measure the size of your input and output — roughly 1 token per word</label>
<label><input type="radio" name="q5" value="2"> A type of security password</label>
<label><input type="radio" name="q5" value="3"> Error codes from the API</label>
<div class="quiz-explain">Tokens are the basic units AI models use to measure text. Roughly 1,000 tokens equals about 750 words. Both your input (prompt) and Gemini's output (response) consume tokens, which count toward your usage limits.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. What does a finish reason of "STOP" mean?</p>
<label><input type="radio" name="q6" value="0"> Gemini finished its response naturally — it said everything it wanted to say</label>
<label><input type="radio" name="q6" value="1"> An error occurred and the response was cut off</label>
<label><input type="radio" name="q6" value="2"> The API key expired</label>
<label><input type="radio" name="q6" value="3"> The user pressed a stop button</label>
<div class="quiz-explain">A finish reason of "STOP" means Gemini completed its response naturally. It said everything it needed to say and stopped on its own. Other reasons like "MAX_TOKENS" or "SAFETY" indicate the response was cut short for other reasons.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. When installing Python on Windows, what important step should you NOT forget?</p>
<label><input type="radio" name="q7" value="0"> Choosing the dark theme</label>
<label><input type="radio" name="q7" value="1"> Setting your username</label>
<label><input type="radio" name="q7" value="2"> Installing it on a USB drive</label>
<label><input type="radio" name="q7" value="3"> Checking the "Add Python to PATH" checkbox</label>
<div class="quiz-explain">When installing Python on Windows, you must check the "Add Python to PATH" box. This allows you to run Python from the Command Prompt. Without it, your computer will not know where to find Python when you type "python" in the terminal.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. What does the line "genai.configure(api_key=...)" do?</p>
<label><input type="radio" name="q8" value="0"> It creates a new Gemini model</label>
<label><input type="radio" name="q8" value="1"> It sends a prompt to Gemini</label>
<label><input type="radio" name="q8" value="2"> It tells the library your API key so it can authenticate your requests</label>
<label><input type="radio" name="q8" value="3"> It downloads the latest version of Gemini</label>
<div class="quiz-explain">The configure() function sets your API key for the library. This is like showing your VIP badge — it authenticates you with Google's servers so they know you have permission to use the Gemini API.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
