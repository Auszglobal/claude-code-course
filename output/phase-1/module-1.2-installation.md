# Module 1.2: Installing Claude Code

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Understand what Node.js is and why you need it
  - Successfully install Node.js on Windows or Mac
  - Obtain an Anthropic API Key
  - Install Claude Code using npm
  - Verify the installation was successful

---

## 📖 Theory

### What Is Node.js? Why Do You Need It?

Imagine you bought a brand-new game console (Claude Code), but you need to plug it into a power source (Node.js) before you can turn it on.

**Node.js** is the "engine" for Claude Code. Claude Code is written in JavaScript, and Node.js is the environment that lets JavaScript run on your computer. Without Node.js, Claude Code is like a game console without power -- it can't do anything.

### What Is an API Key?

An **API Key** (Application Programming Interface Key) is like a membership card.

Imagine going to a premium gym:
- You first need to **register as a member** (create an Anthropic account)
- The gym gives you a **membership card** (API Key)
- You **swipe your card** every time you enter (Claude Code uses the API Key every time it connects)
- The gym **charges you based on usage** (API usage billing)

An API Key is a long string of characters that lets Anthropic know "you are the one using this service."

### What Is npm?

**npm** (Node Package Manager) is the built-in "app store" that comes with Node.js. Just like the App Store or Google Play on your phone, npm lets you install various tools with a single command, including Claude Code.

---

## 💻 Code Example 1: Installing Node.js

### Windows Installation Steps

**Step 1: Download Node.js**

1. Open your browser and go to [https://nodejs.org](https://nodejs.org)
2. You'll see two green download buttons
3. Click the one on the left labelled **LTS** (Long-Term Support) -- this is the most stable version

[What you should see]
```
+------------------------------------------+
|         nodejs.org                        |
|                                          |
|   +----------+    +----------+           |
|   |  22.x.x  |    |  23.x.x  |           |
|   |   LTS    |    | Current  |           |
|   | Recommended|  |  Latest  |           |
|   +----------+    +----------+           |
|                                          |
|   <- Click this one!                     |
+------------------------------------------+
```

**Step 2: Run the Installer**

1. Open the downloaded `.msi` file
2. Click **Next** through each step
3. Check **"Automatically install the necessary tools"**
4. Click **Install**
5. Wait for the installation to complete, then click **Finish**

**Step 3: Verify the Installation**

Open the Command Prompt (press `Win + R`, type `cmd`, press Enter):

```bash
# Check the Node.js version (confirms successful installation)
node --version
```

### Expected Output:
```
v22.14.0
```
(The version number may differ -- as long as it shows `v18` or higher, you're fine)

Then check npm:
```bash
# Check the npm version
npm --version
```

### Expected Output:
```
10.9.2
```

### Mac Installation Steps

**Method 1: Download from the Website (Easiest)**

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version `.pkg` file
3. Open the downloaded file and follow the prompts to complete installation

**Method 2: Using Homebrew (if you already have Homebrew)**

Open Terminal:
```bash
# Install Node.js using Homebrew
brew install node
```

**Verify the Installation** (open Terminal):
```bash
# Check the Node.js version
node --version

# Check the npm version
npm --version
```

---

## 💻 Code Example 2: Getting an API Key and Installing Claude Code

### Step 1: Create an Anthropic Account and Get an API Key

1. Open your browser and go to [https://console.anthropic.com](https://console.anthropic.com)
2. Click **Sign Up** to create an account (you can use a Google account or email)
3. After logging in, click **API Keys** in the left sidebar
4. Click **Create Key**
5. Give this key a name, for example `my-claude-code`
6. Click **Create**

[What you should see]
```
+------------------------------------------+
|  API Keys                                |
|                                          |
|  Name: my-claude-code                    |
|  Key:  sk-ant-api03-xxxxxxxxxxxxxxx...   |
|                                          |
|  Warning: Copy this key immediately!     |
|  You won't be able to see it again!      |
+------------------------------------------+
```

> **Important**: The API Key is only shown once! Copy it immediately and save it somewhere secure (such as a password manager). If you forget it, you'll have to delete the old one and create a new one.

> **Billing Note**: Using the API incurs charges. Anthropic provides free credits to get you started, but keep an eye on your usage. You can check your current usage and billing at console.anthropic.com.

### Step 2: Install Claude Code

Open the terminal (Command Prompt or PowerShell on Windows, Terminal on Mac):

```bash
# Install Claude Code globally using npm (-g means global install, so you can use it from anywhere)
npm install -g @anthropic-ai/claude-code
```

[What you should see]
```
+----------------------------------------------+
| added 1 package in 15s                       |
|                                              |
| 1 package is looking for funding             |
|   run `npm fund` for details                 |
+----------------------------------------------+
```

> **Windows Note**: If you get a "permission denied" error, run the Command Prompt **as Administrator** (right-click -> Run as administrator).
>
> **Mac Note**: If you get a permission error, add `sudo` before the command:
> ```bash
> sudo npm install -g @anthropic-ai/claude-code
> ```

### Step 3: Verify Claude Code Installation

```bash
# Check if Claude Code was installed successfully
claude --version
```

### Expected Output:
```
1.0.x (or a newer version number)
```

### Step 4: Set Up Your API Key

The first time you launch Claude Code, it will automatically ask you to enter your API Key:

```bash
# Launch Claude Code
claude
```

[What you should see]
```
+------------------------------------------+
|  Welcome to Claude Code!                 |
|                                          |
|  Please enter your API key:              |
|  > sk-ant-api03-________________         |
|                                          |
|  (Paste the API Key you copied earlier)  |
+------------------------------------------+
```

Paste your API Key (note: nothing will appear on screen after pasting -- this is a normal security feature), then press Enter.

If you see a welcome message and a prompt, congratulations -- the installation was successful!

---

## ✍️ Hands-On Exercises

### Exercise 1: Complete the Full Installation Process
Follow the steps above to complete the following on your computer:
1. Install Node.js
2. Verify the Node.js and npm versions
3. Create an Anthropic account and get an API Key
4. Install Claude Code
5. Verify the Claude Code version

> Tip: If you get stuck on any step, don't panic. The most common issue is "permission denied" -- on Windows, remember to run as administrator; on Mac, remember to use `sudo`.

### Exercise 2: Record Your Version Information
Run the following three commands in the terminal and record the results:
```bash
node --version
npm --version
claude --version
```
Write down these three version numbers in a notebook -- they may come in handy for troubleshooting later.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What role does Node.js play in the Claude Code installation process?</p>
<label><input type="radio" name="q1" value="0"> It's a browser plugin</label>
<label><input type="radio" name="q1" value="1"> It's the runtime environment that allows Claude Code to run on your computer</label>
<label><input type="radio" name="q1" value="2"> It's a programming language</label>
<label><input type="radio" name="q1" value="3"> It's Anthropic's server software</label>
<div class="quiz-explain">Node.js is the JavaScript runtime environment. Claude Code is written in JavaScript, so it needs Node.js to run. Just like a game console needs a power source.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. What is the purpose of an API Key?</p>
<label><input type="radio" name="q2" value="0"> To speed up your internet connection</label>
<label><input type="radio" name="q2" value="1"> To identify the user and authorise access to Anthropic's AI services</label>
<label><input type="radio" name="q2" value="2"> To install Node.js</label>
<label><input type="radio" name="q2" value="3"> To log in to your computer</label>
<div class="quiz-explain">An API Key is like a membership card. It lets Anthropic know who is using the service and bills accordingly.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. When installing Claude Code, what does the <code>-g</code> in <code>npm install -g</code> mean?</p>
<label><input type="radio" name="q3" value="0"> Stands for "good" (a good installation mode)</label>
<label><input type="radio" name="q3" value="1"> Stands for "global" (installs globally so it can be used from any folder)</label>
<label><input type="radio" name="q3" value="2"> Stands for "generate" (auto-generates config files)</label>
<label><input type="radio" name="q3" value="3"> Stands for "git" (links to a Git repository)</label>
<div class="quiz-explain"><code>-g</code> stands for global, meaning it installs to a shared location on your entire computer, so you can use the <code>claude</code> command from any folder. Without <code>-g</code>, it would only work in the folder where it was installed.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>4. Which version of Node.js should you download for the most stable experience?</p>
<label><input type="radio" name="q4" value="0"> The "Current" version (latest features)</label>
<label><input type="radio" name="q4" value="1"> The oldest version available</label>
<label><input type="radio" name="q4" value="2"> The LTS (Long-Term Support) version</label>
<label><input type="radio" name="q4" value="3"> Any version — it doesn't matter</label>
<div class="quiz-explain">LTS stands for Long-Term Support, which means this version receives ongoing bug fixes and security updates. It is the most stable and recommended choice, especially for beginners.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. After installing Node.js, how can you verify the installation was successful?</p>
<label><input type="radio" name="q5" value="0"> Run <code>node --version</code> in the terminal and check that a version number appears</label>
<label><input type="radio" name="q5" value="1"> Open the Node.js website and click "Verify"</label>
<label><input type="radio" name="q5" value="2"> Restart your computer and look for a Node.js icon on the desktop</label>
<label><input type="radio" name="q5" value="3"> Send an email to Anthropic support</label>
<div class="quiz-explain">Running <code>node --version</code> in the terminal is the standard way to confirm Node.js is installed. If it shows a version number like v22.14.0, the installation was successful.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>6. Why doesn't anything appear on screen when you paste your API Key into Claude Code?</p>
<label><input type="radio" name="q6" value="0"> Because Claude Code is broken</label>
<label><input type="radio" name="q6" value="1"> Because you pasted it incorrectly</label>
<label><input type="radio" name="q6" value="2"> Because your API Key has expired</label>
<label><input type="radio" name="q6" value="3"> Because it is a security feature — sensitive input is hidden to prevent others from seeing it</label>
<div class="quiz-explain">This is a standard security feature in terminals. When entering passwords or API keys, the characters are intentionally hidden so that someone looking over your shoulder cannot see your sensitive information. Just paste and press Enter.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>7. On a Mac, if you get a "permission denied" error when installing Claude Code, what should you try?</p>
<label><input type="radio" name="q7" value="0"> Delete Node.js and reinstall</label>
<label><input type="radio" name="q7" value="1"> Add <code>sudo</code> before the install command</label>
<label><input type="radio" name="q7" value="2"> Switch to a Windows computer</label>
<label><input type="radio" name="q7" value="3"> Close the terminal and open a browser instead</label>
<div class="quiz-explain">On Mac, <code>sudo</code> gives the command administrator-level permissions. Running <code>sudo npm install -g @anthropic-ai/claude-code</code> solves most permission issues. On Windows, you would run the Command Prompt as Administrator instead.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. What is npm?</p>
<label><input type="radio" name="q8" value="0"> A package manager that comes with Node.js, like an app store for installing tools</label>
<label><input type="radio" name="q8" value="1"> A programming language</label>
<label><input type="radio" name="q8" value="2"> A type of API Key</label>
<label><input type="radio" name="q8" value="3"> A text editor</label>
<div class="quiz-explain">npm (Node Package Manager) is the built-in "app store" that comes with Node.js. Just as you install apps from the App Store on your phone, you use npm to install tools like Claude Code with a single command.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Congratulations on completing the installation! Your computer is now set up and ready to go.

In the next module, **1.3: Your First Command**, we'll officially launch Claude Code, learn its interface, and have it help you complete your first task -- creating a simple text file. This will be your first step interacting with an AI assistant!
