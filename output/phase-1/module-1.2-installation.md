# Module 1.2: Installing Claude Code

## Learning Objectives
- After completing this lesson, you will be able to:
  - Understand what Node.js is and why you need it
  - Successfully install Node.js on Windows or Mac
  - Obtain an Anthropic API Key
  - Install Claude Code using npm
  - Verify the installation was successful

---

## Theory

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

## Code Example 1: Installing Node.js

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

## Code Example 2: Getting an API Key and Installing Claude Code

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

## Hands-On Practice

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

## Quiz (3 Questions)

**1. What role does Node.js play in the Claude Code installation process?**

A. It's a browser plugin
B. It's the runtime environment that allows Claude Code to run on your computer
C. It's a programming language
D. It's Anthropic's server software

Answer: B -- Node.js is the JavaScript runtime environment. Claude Code is written in JavaScript, so it needs Node.js to run. Just like a game console needs a power source.

---

**2. What is the purpose of an API Key?**

A. To speed up your internet connection
B. To identify the user and authorise access to Anthropic's AI services
C. To install Node.js
D. To log in to your computer

Answer: B -- An API Key is like a membership card. It lets Anthropic know who is using the service and bills accordingly.

---

**3. When installing Claude Code, what does the `-g` in `npm install -g` mean?**

A. Stands for "good" (a good installation mode)
B. Stands for "global" (installs globally so it can be used from any folder)
C. Stands for "generate" (auto-generates config files)
D. Stands for "git" (links to a Git repository)

Answer: B -- `-g` stands for global, meaning it installs to a shared location on your entire computer, so you can use the `claude` command from any folder. Without `-g`, it would only work in the folder where it was installed.

---

## Next Steps

Congratulations on completing the installation! Your computer is now set up and ready to go.

In the next module, **1.3: Your First Command**, we'll officially launch Claude Code, learn its interface, and have it help you complete your first task -- creating a simple text file. This will be your first step interacting with an AI assistant!
