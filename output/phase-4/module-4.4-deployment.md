# Module 4.4: Deployment and Publishing

## 🎯 Learning Objectives
- After completing this lesson, you will be able to...
  - Understand what "deployment" is and why it's needed
  - Know the free website hosting platforms: GitHub Pages, Vercel, Netlify
  - Use Claude Code to prepare your project for deployment
  - Deploy a website to GitHub Pages step by step
  - Get a real URL you can share with friends

## 📖 Theory

### What Is Deployment?

Up until now, the websites you've built can only be seen on your own computer. It's like painting a beautiful picture but keeping it in a drawer — only you can appreciate it.

**Deployment is like hanging your painting in a gallery** so everyone can see it.

Specifically, deployment means uploading your website files to a **computer that's on 24/7 and connected to the internet** (a server), so that anyone who enters your URL can see your website.

### Local vs Online

| | Local (Your Computer) | Online (After Deployment) |
|---|---|---|
| Who can see it | Only you | Anyone in the world |
| URL | `file:///C:/Users/.../index.html` | `https://yourname.github.io` |
| Needs to be on? | Your computer must be running | The server runs 24/7 |
| Cost | Free | Can be free! |

### Comparing Free Hosting Platforms

Great news: there are many free platforms that can host your website!

| Platform | Features | Best For | Free URL Format |
|------|------|------|-------------|
| **GitHub Pages** | Perfect Git integration, most widely used | Personal websites, portfolios | `username.github.io/repo` |
| **Vercel** | One-click deploy, fast | React/Next.js projects | `project.vercel.app` |
| **Netlify** | Drag-and-drop upload, super simple | Any static website | `project.netlify.app` |

In this lesson, we'll use **GitHub Pages** because:
1. It's completely free
2. You already know how to use Git (learned in Phase 3!)
3. It's one of the most common methods in the industry

---

## 💻 Code Example 1: Preparing Your Project and Deploying to GitHub Pages

We'll deploy the personal website from Module 4.1 to the internet. Follow these steps one by one:

### Step 1: Make Sure You Have a GitHub Account

If you don't have a GitHub account yet, go to [github.com](https://github.com) and sign up for one. Remember your username — you'll need it shortly.

### Step 2: Verify Your Git Configuration

In the terminal, confirm your Git is set up:

```bash
# Check that Git has your name and email configured
git config --global user.name
git config --global user.email
```

If they haven't been set, configure them first:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 3: Let Claude Code Prepare the Deployment

Navigate to your website project folder and start Claude Code:

```bash
cd my-portfolio
claude
```

Enter in Claude Code:

```
Help me prepare this website project for deployment to GitHub Pages:
1. Make sure index.html is in the project root directory
2. Check that all file paths are correct (relative paths)
3. Add a simple README.md explaining what this project is
4. Initialize Git and create the first commit
```

### Expected Output:

📸 [What you should see]
```
┌────────────────────────────────────────────────────┐
│ I've completed the following preparation:            │
│                                                      │
│ ✓ Confirmed index.html is in the root directory      │
│ ✓ All CSS/JS paths use relative paths                │
│ ✓ Created README.md                                  │
│ ✓ Ran git init                                       │
│ ✓ Created the first commit                           │
│                                                      │
│ Next, you need to create a new repository on GitHub. │
└────────────────────────────────────────────────────┘
```

### Step 4: Create a New Repository on GitHub

1. Open your browser and go to [github.com/new](https://github.com/new)
2. Enter the repository name: `my-portfolio`
3. Select **Public** — the free version of GitHub Pages requires public repos
4. **Do not** check "Add a README file" (we already have one)
5. Click **Create repository**

GitHub will display some instructions. We'll complete the next steps in Claude Code:

### Step 5: Push to GitHub and Enable GitHub Pages

Enter in Claude Code:

```
Help me push this project to GitHub. The remote URL is:
https://github.com/your-username/my-portfolio.git

Then tell me how to enable GitHub Pages on GitHub.
```

Claude Code will run commands similar to these:

```bash
# Connect to the repository on GitHub (tell Git where your repo lives)
git remote add origin https://github.com/your-username/my-portfolio.git

# Push (upload) your code to GitHub
git branch -M main
git push -u origin main
```

### Step 6: Enable GitHub Pages

1. Open your repository page on GitHub
2. Click **Settings**
3. Find **Pages** in the left sidebar
4. Under "Source," select **Deploy from a branch**
5. Choose **main** branch, **/ (root)** folder
6. Click **Save**

📸 [What you should see]
```
┌────────────────────────────────────────────────────┐
│ GitHub Pages                                        │
│                                                      │
│ Your site is live at:                                │
│ https://your-username.github.io/my-portfolio/        │
│                                                      │
│ 🎉 That's your website URL! Anyone can visit it!    │
└────────────────────────────────────────────────────┘
```

> **Note**: GitHub Pages deployment takes a few minutes. If you open the URL immediately and see a 404 error, wait 2-3 minutes and try again.

---

## 💻 Code Example 2: Updating a Deployed Website

After deployment, you'll likely want to make changes to your website. The process is very simple:

### Modify → Commit → Push

Make changes to your website in Claude Code:

```
Add a "Recently Updated" section to my website's homepage,
showing today's date and a message: "This website is regularly updated. Come back often!"
```

After the changes are made, let Claude Code help you deploy the update:

```
Help me commit and push the changes I just made to GitHub,
with the commit message "Add recently updated section"
```

Claude Code will run:

```bash
# Add modified files to the staging area
git add index.html styles.css

# Create a commit (like saving your progress)
git commit -m "Add recently updated section"

# Push to GitHub (update the online version)
git push origin main
```

### Expected Output:

📸 [What you should see]
```
┌────────────────────────────────────────────────┐
│ [main abc1234] Add recently updated section      │
│  2 files changed, 15 insertions(+), 2 deletions │
│                                                  │
│ To https://github.com/your-username/my-portfolio │
│    def5678..abc1234  main -> main                │
│                                                  │
│ Update pushed! Wait 1-2 minutes, then            │
│ refresh your website to see the changes.         │
└────────────────────────────────────────────────┘
```

### The Complete Update Workflow

Remember this simple cycle — this is what real developers do every day:

```
Modify code → git add → git commit → git push → Wait a few minutes → Website updated!
```

With Claude Code, you can even do it in one sentence:

```
Commit and push all changes to GitHub
```

---

## ✍️ Hands-on Exercises

### Exercise 1: Deploy Your Personal Website

1. If you don't have a GitHub account yet, sign up for one
2. Go back to the personal website from Module 4.1 (or build a new one)
3. Follow the steps in this module to deploy it to GitHub Pages
4. Share your website URL with a friend and ask them to check it out

> **Tip**: If you run into problems, paste the error message into Claude Code and it will help you resolve it! For example: "I got the following error when running git push: [paste error message], please help me fix it"

### Exercise 2: Build a Project Showcase Page

1. Create a new website specifically to showcase all the projects you completed during this course
2. Include the following content:
   - Course name and a brief description
   - Each completed project (Module 4.1's website, 4.2's API tool, 4.3's data analysis)
   - A short description and what you learned from each project
3. Deploy to GitHub Pages with the URL `your-username.github.io/my-learning-journey`

> **Tip**: Tell Claude Code "Help me build a learning journey showcase website with 3 project introduction cards, each card having a title, description, and a link button"

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. Why do you need to "deploy" a website?</p>
<label><input type="radio" name="q1" value="0"> To make the website run faster</label>
<label><input type="radio" name="q1" value="1"> So others can access it through a URL, rather than it only being visible on your own computer</label>
<label><input type="radio" name="q1" value="2"> To give the website a better design</label>
<label><input type="radio" name="q1" value="3"> To protect the website from hackers</label>
<div class="quiz-explain">Deployment means putting your website files on a server that runs 24/7. This way, anyone who enters your URL can see your website. Without deployment, the website only exists on your computer.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. After modifying a deployed website, what is the correct update process?</p>
<label><input type="radio" name="q2" value="0"> Delete the GitHub repository and create a new one</label>
<label><input type="radio" name="q2" value="1"> git add, git commit, git push, then wait a few minutes for it to automatically update</label>
<label><input type="radio" name="q2" value="2"> Edit all files directly on the GitHub website</label>
<label><input type="radio" name="q2" value="3"> You need to repurchase a domain name</label>
<div class="quiz-explain">Just commit your changes to Git and push to GitHub. GitHub Pages will automatically detect the update and redeploy your website. It usually takes only 1-3 minutes.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. Which of the following is NOT a free website hosting platform?</p>
<label><input type="radio" name="q3" value="0"> GitHub Pages</label>
<label><input type="radio" name="q3" value="1"> Netlify</label>
<label><input type="radio" name="q3" value="2"> Adobe Photoshop</label>
<label><input type="radio" name="q3" value="3"> Vercel</label>
<div class="quiz-explain">Adobe Photoshop is image editing software, not a website hosting platform. GitHub Pages, Netlify, and Vercel are all platforms that can host static websites for free.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>4. What does <code>git push -u origin main</code> do?</p>
<label><input type="radio" name="q4" value="0"> Uploads your local code to GitHub and sets up tracking between your local main branch and the remote</label>
<label><input type="radio" name="q4" value="1"> Downloads code from GitHub to your computer</label>
<label><input type="radio" name="q4" value="2"> Deletes the remote repository</label>
<label><input type="radio" name="q4" value="3"> Creates a new branch called "origin"</label>
<div class="quiz-explain"><code>git push</code> uploads your commits to GitHub. The <code>-u</code> flag sets up tracking so future pushes only need <code>git push</code> without specifying the remote and branch. <code>origin</code> is the remote name, and <code>main</code> is the branch.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>5. You deployed your website but see a 404 error when visiting the URL. What is the most likely cause?</p>
<label><input type="radio" name="q5" value="0"> Your internet connection is too slow</label>
<label><input type="radio" name="q5" value="1"> GitHub Pages doesn't support your browser</label>
<label><input type="radio" name="q5" value="2"> You need to pay for a GitHub premium account</label>
<label><input type="radio" name="q5" value="3"> GitHub Pages deployment takes a few minutes — wait 2-3 minutes and try again</label>
<div class="quiz-explain">After enabling GitHub Pages or pushing an update, there's a delay of 1-3 minutes before the site goes live. If you see a 404 immediately after deployment, simply wait and refresh. If it persists, check that index.html is in the correct directory.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. Why must a GitHub Pages repository be set to "Public" on the free plan?</p>
<label><input type="radio" name="q6" value="0"> Because private repositories don't support HTML files</label>
<label><input type="radio" name="q6" value="1"> Because the free version of GitHub Pages only works with public repositories</label>
<label><input type="radio" name="q6" value="2"> Because public repositories load faster</label>
<label><input type="radio" name="q6" value="3"> Because Git doesn't work with private repositories</label>
<div class="quiz-explain">GitHub's free tier only enables GitHub Pages for public repositories. To use GitHub Pages with a private repository, you need a paid GitHub plan (Pro, Team, or Enterprise).</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. What is the correct order of the deployment update workflow?</p>
<label><input type="radio" name="q7" value="0"> git push → git commit → git add → wait</label>
<label><input type="radio" name="q7" value="1"> git commit → git add → git push → wait</label>
<label><input type="radio" name="q7" value="2"> git add → git commit → git push → wait for auto-update</label>
<label><input type="radio" name="q7" value="3"> git push → wait → git add → git commit</label>
<div class="quiz-explain">The correct workflow is: (1) <code>git add</code> to stage your changes, (2) <code>git commit</code> to save them with a message, (3) <code>git push</code> to upload to GitHub, then (4) wait 1-3 minutes for GitHub Pages to rebuild.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>8. What advantage does Netlify's drag-and-drop deployment have over GitHub Pages?</p>
<label><input type="radio" name="q8" value="0"> It supports more programming languages</label>
<label><input type="radio" name="q8" value="1"> You can deploy by simply dragging a folder into the browser — no Git knowledge required</label>
<label><input type="radio" name="q8" value="2"> It provides a faster internet connection</label>
<label><input type="radio" name="q8" value="3"> It costs less than GitHub Pages</label>
<div class="quiz-explain">Netlify allows you to deploy by dragging your project folder directly into the Netlify dashboard in your browser. This is much simpler for beginners who haven't learned Git yet. GitHub Pages requires Git commands.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Congratulations on completing all of Phase 4! Let's review what you learned in this phase:

- **Module 4.1**: Built a complete website from scratch
- **Module 4.2**: Connected to APIs to fetch real external data
- **Module 4.3**: Processed and analyzed data, generated charts
- **Module 4.4**: Deployed your work to the internet for the world to see

You've gone from a complete beginner who knew nothing about programming to someone who can build websites, call APIs, analyze data, and deploy to production. That's incredible progress!

In the upcoming **Phase 5: Advanced Applications and Automation**, we'll enter even more exciting territory — learning how to use Claude Code to build automated workflows, extend capabilities with MCP, and create your own AI assistant. Ready? Let's keep going!
