# Module 1.4: Gemini CLI — AI in Your Terminal

## 🎯 Learning Objectives
- Understand what Gemini CLI is and how it differs from the API and web app
- Install Gemini CLI on your computer using npm
- Run your first command and have a conversation in the terminal
- Understand the permission system and safety features
- Know when to use the CLI versus the web app versus the API

## 📖 Theory

### What is a CLI?

A **CLI** (Command Line Interface) is a way to interact with your computer by typing text commands instead of clicking buttons. If you have ever seen a movie where a hacker types green text on a black screen — that is a CLI (though real ones are much less dramatic!).

Think of it this way:
- **Gemini web app** = ordering food at a restaurant (point at the menu, talk to a waiter)
- **Gemini API** = calling the restaurant and placing an order by phone (you write code to do it)
- **Gemini CLI** = having the chef come to your kitchen (AI right in your terminal, no browser needed)

### What is Gemini CLI?

**Gemini CLI** is Google's official command-line tool that brings Gemini directly into your terminal. It is similar in concept to **Claude Code** (Anthropic's CLI tool) — it lets you:

- Chat with Gemini without opening a browser
- Ask Gemini to read, edit, and create files on your computer
- Get coding help right where you write code
- Automate tasks by combining Gemini with other terminal commands

It is open-source (anyone can see the code) and free to use with your Google account.

### Why Use the CLI?

| Scenario | Best Tool |
|----------|-----------|
| Quick question while browsing | Gemini web app |
| Building an app that uses AI | Gemini API (Python) |
| Coding help while in the terminal | **Gemini CLI** |
| Reading/editing files with AI | **Gemini CLI** |
| Automating workflows | **Gemini CLI** or API |

The CLI is especially powerful for developers and anyone who works in the terminal regularly. But even if you are a beginner, it is a great way to experience the "AI assistant" workflow.

### The Permission System

Gemini CLI has a built-in safety system. Before it does anything potentially impactful on your computer (like editing a file, running a command, or accessing the internet), it will **ask for your permission first**.

This is like a guard at your front door:
- "Gemini wants to read the file `report.txt`. Allow?" [Yes / No]
- "Gemini wants to run the command `ls -la`. Allow?" [Yes / No]

You are always in control. Gemini CLI will never make changes without your explicit approval.

## 💻 Code Example 1: Installing and Running Gemini CLI

### Step 1: Install Node.js (Required)

Gemini CLI is built with JavaScript and requires **Node.js** to run. Let us install it first.

**On Mac:**
```bash
# Open Terminal (Cmd+Space, type "Terminal", press Enter)

# Check if Node.js is already installed:
node --version

# If you see "v18.x.x" or higher, skip to Step 2!
# If not, install it:
# Option A: Download from https://nodejs.org (click the LTS version)
# Option B: If you have Homebrew:
brew install node
```

**On Windows:**
```bash
# Open Command Prompt (Windows key, type "cmd", press Enter)

# Check if Node.js is already installed:
node --version

# If you see "v18.x.x" or higher, skip to Step 2!
# If not:
# Go to https://nodejs.org
# Download the LTS version
# Run the installer (accept all defaults)
# Close and reopen Command Prompt
```

### Step 2: Install Gemini CLI

```bash
# This command installs Gemini CLI globally on your computer
# Run this in your Terminal (Mac) or Command Prompt (Windows):

npm install -g @anthropic-ai/claude-code  # This is for Claude Code
# For Gemini CLI:
npm install -g @google/gemini-cli
```

### Expected Output:
```
added 150 packages in 30s

3 packages are looking for funding
  run `npm fund` for details
```

### Step 3: Authenticate with Your Google Account

```bash
# Start Gemini CLI for the first time:
gemini

# The first time you run it, it will ask you to sign in.
# It will open a browser window for Google authentication.
# Sign in with your Google account and grant permissions.
```

### Expected Output:
📸 [What you should see]
```
┌─────────────────────────────────────────┐
│                                         │
│   Welcome to Gemini CLI!                │
│                                         │
│   Authenticating...                     │
│   ✓ Signed in as yourname@gmail.com     │
│                                         │
│   Using model: gemini-2.0-flash         │
│   Type your message or /help            │
│                                         │
│   >                                     │
│                                         │
└─────────────────────────────────────────┘
```

### Step 4: Your First Conversation

```bash
# Once you see the > prompt, type:
> What is the meaning of life? Keep it to 2 sentences.

# Gemini will respond right in your terminal!
# Try a follow-up:
> Now explain that like I am five years old.

# To exit:
> /quit
# or press Ctrl+C
```

### Expected Output:
```
> What is the meaning of life? Keep it to 2 sentences.

The meaning of life is deeply personal and varies for everyone, but many
philosophers agree it involves finding purpose, building connections with
others, and contributing something meaningful to the world. Ultimately,
it is about the journey of discovering what matters most to you.

> Now explain that like I am five years old.

Life is like a big adventure where you get to find what makes you happy
and share it with the people you love! The best part is playing, learning
new things, and being kind to others.
```

## 💻 Code Example 2: Working with Files

One of the most powerful features of Gemini CLI is its ability to work with files on your computer.

### Reading a File

```bash
# First, let's create a sample file to work with.
# In your terminal (outside of Gemini CLI), create a test file:

echo "Shopping list: milk, eggs, bread, butter, apples, chicken, rice, pasta, tomatoes, cheese" > shopping.txt

# Now start Gemini CLI:
gemini

# Ask Gemini to work with the file:
> Read the file shopping.txt and organize the items by category
  (dairy, produce, grains, protein)
```

### Expected Output:
```
I'll read the file shopping.txt for you.

[Permission request: Read file "shopping.txt"? (y/n)]

> y

Here are your shopping items organized by category:

**Dairy:**
- Milk
- Butter
- Cheese

**Produce:**
- Apples
- Tomatoes

**Grains:**
- Bread
- Rice
- Pasta

**Protein:**
- Eggs
- Chicken
```

Notice how Gemini asked for **permission** before reading your file. This is the safety system in action!

### Creating a File

```bash
# Still in Gemini CLI:
> Create a file called meal-plan.txt with a 3-day meal plan using the
  items from my shopping list

# Gemini will ask permission to create the file:
[Permission request: Create file "meal-plan.txt"? (y/n)]

> y

# Gemini creates the file and shows you the content!
```

### Useful CLI Commands

```bash
# Inside Gemini CLI, these special commands are available:

/help           # Show all available commands
/quit           # Exit Gemini CLI
/model          # Change the Gemini model being used
/clear          # Clear the conversation history
/compact        # Summarize conversation to save context space
```

## ✍️ Hands-On Exercises

### Exercise 1: Terminal Tour Guide
Start Gemini CLI and have it teach you terminal commands:

1. Ask: "I am a complete beginner. Teach me the 5 most useful terminal commands. For each one, explain what it does and give me an example."
2. Try each command that Gemini suggests (outside of Gemini CLI, in a regular terminal)
3. Go back into Gemini CLI and ask: "I tried the commands. Now teach me 5 more!"

**Tip**: If you are nervous about running terminal commands, ask Gemini first: "Is this command safe to run? What exactly will it do?" Gemini CLI's permission system also protects you.

### Exercise 2: File Organizer
Create a few test files and let Gemini help you organize them:

1. In your terminal, create a test folder and some files:
```bash
mkdir test-project
echo "This is my notes file" > test-project/notes.txt
echo "Buy groceries, call dentist, finish homework" > test-project/todo.txt
echo "print('hello world')" > test-project/script.py
```

2. Start Gemini CLI and ask: "Look at the files in the test-project folder and suggest a better organization system. Then create a README.md file explaining what each file does."

3. Check the files Gemini created. Did it do a good job?

**Tip**: Gemini will ask permission before reading or creating each file. Say yes and watch how it works through the problem step by step.

## 🔗 Next Steps

Congratulations — you have completed Phase 1! You now know how to:
- Use Gemini in the browser (Module 1.1)
- Control it with AI Studio (Module 1.2)
- Call it from Python code (Module 1.3)
- Use it from the terminal with CLI (Module 1.4)

In **Phase 2**, we will dive into the real skills: **prompting techniques**, **code assistance**, **writing actual programs with Gemini**, and the mind-blowing **2-million-token context window**. The fun is just getting started!

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What is a CLI?</p>
<label><input type="radio" name="q1" value="0"> A type of programming language</label>
<label><input type="radio" name="q1" value="1"> A graphical design tool</label>
<label><input type="radio" name="q1" value="2"> A way to interact with your computer by typing text commands</label>
<label><input type="radio" name="q1" value="3"> A cloud storage service</label>
<div class="quiz-explain">CLI stands for Command Line Interface — it is a text-based way to interact with your computer by typing commands instead of clicking buttons. It is like having a conversation with your computer through text.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. What do you need installed before you can install Gemini CLI?</p>
<label><input type="radio" name="q2" value="0"> Python 3</label>
<label><input type="radio" name="q2" value="1"> Node.js</label>
<label><input type="radio" name="q2" value="2"> Visual Studio Code</label>
<label><input type="radio" name="q2" value="3"> Docker</label>
<div class="quiz-explain">Gemini CLI is built with JavaScript and requires Node.js to run. You need to install Node.js (version 18 or higher) before installing Gemini CLI with npm.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. What command installs Gemini CLI?</p>
<label><input type="radio" name="q3" value="0"> npm install -g @google/gemini-cli</label>
<label><input type="radio" name="q3" value="1"> pip install gemini-cli</label>
<label><input type="radio" name="q3" value="2"> brew install gemini</label>
<label><input type="radio" name="q3" value="3"> apt-get install gemini-cli</label>
<div class="quiz-explain">Gemini CLI is installed via npm (Node Package Manager) with the command "npm install -g @google/gemini-cli". The -g flag installs it globally so you can use it from any directory.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. What happens when Gemini CLI wants to read or edit a file on your computer?</p>
<label><input type="radio" name="q4" value="0"> It does it immediately without telling you</label>
<label><input type="radio" name="q4" value="1"> It crashes and shows an error</label>
<label><input type="radio" name="q4" value="2"> It sends the file to Google's servers automatically</label>
<label><input type="radio" name="q4" value="3"> It asks for your permission first before taking any action</label>
<div class="quiz-explain">Gemini CLI has a built-in permission system. Before it reads, edits, creates, or deletes any file on your computer, it will ask for your explicit permission. You are always in control.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. When would you choose Gemini CLI over the Gemini web app?</p>
<label><input type="radio" name="q5" value="0"> When you want to upload images</label>
<label><input type="radio" name="q5" value="1"> When you want AI help while coding in the terminal and working with files</label>
<label><input type="radio" name="q5" value="2"> When you want to use Gemini Ultra</label>
<label><input type="radio" name="q5" value="3"> When your internet is slow</label>
<div class="quiz-explain">Gemini CLI shines when you are already working in the terminal — it can read and edit files, run commands, help with coding, and automate tasks without switching to a browser window.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. How do you exit Gemini CLI?</p>
<label><input type="radio" name="q6" value="0"> Close the browser window</label>
<label><input type="radio" name="q6" value="1"> Press the power button on your computer</label>
<label><input type="radio" name="q6" value="2"> Type /quit or press Ctrl+C</label>
<label><input type="radio" name="q6" value="3"> Uninstall the program</label>
<div class="quiz-explain">You can exit Gemini CLI by typing the /quit command or pressing Ctrl+C in your terminal. These are standard ways to exit command-line programs.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>7. How do you authenticate Gemini CLI the first time?</p>
<label><input type="radio" name="q7" value="0"> It opens a browser window for Google sign-in</label>
<label><input type="radio" name="q7" value="1"> You type your password in the terminal</label>
<label><input type="radio" name="q7" value="2"> You paste an API key into a config file</label>
<label><input type="radio" name="q7" value="3"> No authentication is needed</label>
<div class="quiz-explain">When you run Gemini CLI for the first time, it opens a browser window where you sign in with your Google account. This links the CLI to your account securely without you needing to type your password in the terminal.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>8. Which of these is NOT a valid Gemini CLI command?</p>
<label><input type="radio" name="q8" value="0"> /help</label>
<label><input type="radio" name="q8" value="1"> /quit</label>
<label><input type="radio" name="q8" value="2"> /clear</label>
<label><input type="radio" name="q8" value="3"> /delete-all-files</label>
<div class="quiz-explain">/delete-all-files is not a Gemini CLI command (and thankfully so!). The valid built-in commands include /help, /quit, /clear, /model, and /compact. Gemini CLI's permission system would prevent destructive actions even if attempted.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
