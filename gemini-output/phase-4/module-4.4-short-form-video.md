# Module 4.4: Short-Form Video Content with Gemini

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Write short-form video scripts (Reels, TikTok, Shorts) using Gemini prompts
- Generate visual storyboards that map out each scene of a short video
- Build a 7-day content calendar with Gemini for consistent posting
- Adapt a single content idea into multiple platform-specific formats

---

## 📖 Theory

### Why Short-Form Video Matters

Short-form video is the fastest-growing content format on the internet. Platforms like TikTok, Instagram Reels, and YouTube Shorts all favor videos between 15 and 90 seconds. Think of short-form video like an elevator pitch — you have a tiny window to grab attention, deliver value, and leave people wanting more.

Creating one short video is easy. Creating one every day is exhausting. That is where Gemini comes in. Instead of staring at a blank page, you can use Gemini to generate scripts, plan shots, and map out an entire week of content in minutes.

### Anatomy of a Great Short-Form Video

Every successful short video follows a simple structure:

| Section | Duration | Purpose |
|---------|----------|---------|
| **Hook** | 0-3 seconds | Stop the scroll. Ask a question or show something unexpected. |
| **Body** | 3-50 seconds | Deliver the tip, story, or value. |
| **CTA (Call to Action)** | Last 3-5 seconds | Tell the viewer what to do next: follow, comment, save. |

Think of it like a sandwich: the hook is the top bun that makes people pick it up, the body is the filling, and the CTA is the bottom bun that holds everything together.

### Platform Differences

Each platform has slightly different rules:

- **TikTok**: Trending sounds matter. Casual tone works best. 30-60 seconds is the sweet spot.
- **Instagram Reels**: Polished visuals perform well. Hashtags help with discovery. 15-30 seconds for maximum reach.
- **YouTube Shorts**: Vertical video, under 60 seconds. The first frame acts as your thumbnail.

Gemini can help you adapt one idea for all three platforms by adjusting tone, length, and format.

---

## 💻 Code Example 1: Script Generator for Short-Form Video

This script takes a topic and generates a complete short-form video script with hook, body, and call to action.

```python
# module_4_4_script_generator.py
# Generates a short-form video script from a topic

import google.generativeai as genai

# Set up your API key
genai.configure(api_key="YOUR_API_KEY")

# Choose the model
model = genai.GenerativeModel("gemini-2.0-flash")

# Define your video topic and target platform
topic = "3 Google Sheets tricks most people don't know"
platform = "Instagram Reels"

# Build the prompt
prompt = f"""Create a short-form video script for {platform}.

Topic: {topic}

Format the script exactly like this:
HOOK (0-3 seconds): [What the creator says/does to grab attention]
SCENE 1 (3-15 seconds): [First tip with visual description]
SCENE 2 (15-30 seconds): [Second tip with visual description]
SCENE 3 (30-45 seconds): [Third tip with visual description]
CTA (45-50 seconds): [Call to action]

For each scene, include:
- What the creator SAYS (voiceover or on-camera)
- What the viewer SEES (screen recording, text overlay, etc.)
- Any text overlay suggestions

Keep the language casual and energetic. Total length under 60 seconds."""

# Generate the script
response = model.generate_content(prompt)
print(response.text)
```

### Expected Output:

```
HOOK (0-3 seconds):
SAYS: "Stop using Google Sheets the hard way."
SEES: Creator pointing at camera, text overlay: "3 TRICKS YOU NEED"

SCENE 1 (3-15 seconds):
SAYS: "Trick one — double-click the fill handle to auto-fill an entire column."
SEES: Screen recording showing a cell being double-clicked, column fills instantly.
TEXT OVERLAY: "Trick #1: Auto-Fill"

SCENE 2 (15-30 seconds):
SAYS: "Trick two — press Ctrl-Shift-V to paste without formatting."
SEES: Side-by-side of messy paste vs clean paste.
TEXT OVERLAY: "Trick #2: Clean Paste"

SCENE 3 (30-45 seconds):
SAYS: "Trick three — type slash in any cell to search functions."
SEES: Screen recording of slash menu appearing with search.
TEXT OVERLAY: "Trick #3: Slash Search"

CTA (45-50 seconds):
SAYS: "Follow for more Sheets tips. Which trick was new to you?"
SEES: Creator on camera, pointing up to the follow button.
TEXT OVERLAY: "FOLLOW for more"
```

---

## 💻 Code Example 2: 7-Day Content Calendar Generator

This script builds a full week of content ideas with scripts, hashtags, and posting times.

```python
# module_4_4_content_calendar.py
# Generates a 7-day short-form video content calendar

import google.generativeai as genai
import json

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

# Define your niche and audience
niche = "productivity tips for remote workers"
audience = "professionals aged 25-40 who work from home"
platforms = "TikTok, Instagram Reels, and YouTube Shorts"

prompt = f"""Create a 7-day short-form video content calendar.

Niche: {niche}
Target audience: {audience}
Platforms: {platforms}

For each day, provide:
1. **Day**: (Monday through Sunday)
2. **Content Pillar**: (Educational, Entertaining, Inspirational, or Behind-the-Scenes)
3. **Video Title**: (catchy, under 10 words)
4. **Hook**: (the first 3 seconds — what grabs attention)
5. **Key Message**: (the main takeaway in one sentence)
6. **Hashtags**: (5 relevant hashtags)
7. **Best Posting Time**: (with timezone note)
8. **Platform Priority**: (which platform to post on first)

Mix content pillars throughout the week. Do not post the same type two days in a row.

Return the result as valid JSON with a "calendar" array."""

response = model.generate_content(prompt)

# Parse and display the calendar
try:
    calendar = json.loads(response.text)
    for day in calendar["calendar"]:
        print(f"\n{'='*50}")
        print(f"📅 {day['Day']} — {day['Content Pillar']}")
        print(f"🎬 {day['Video Title']}")
        print(f"🪝 Hook: {day['Hook']}")
        print(f"💡 Key Message: {day['Key Message']}")
        print(f"# {' '.join(day['Hashtags'])}")
        print(f"⏰ Post at: {day['Best Posting Time']}")
        print(f"📱 Platform: {day['Platform Priority']}")
except json.JSONDecodeError:
    # If Gemini returns markdown-wrapped JSON, print raw text
    print(response.text)
```

### Expected Output:

```
==================================================
📅 Monday — Educational
🎬 The 2-Minute Rule Changed My Mornings
🪝 Hook: "I was wasting 2 hours every morning until I tried this."
💡 Key Message: Start tasks that take under 2 minutes immediately.
# #productivity #remotework #morningroutine #wfh #tipsandtricks
⏰ Post at: 7:30 AM (audience timezone)
📱 Platform: TikTok

==================================================
📅 Tuesday — Entertaining
🎬 Remote Worker vs Office Worker
🪝 Hook: "POV: Your boss asks if you're available for a meeting."
💡 Key Message: Remote work has unique funny moments everyone relates to.
# #remoteworklife #wfhlife #workfromhome #relatable #officehumor
⏰ Post at: 12:00 PM (audience timezone)
📱 Platform: Instagram Reels
...
```

---

## ✍️ Hands-On Exercises

### Exercise 1: Create a Storyboard Prompt

Write a Gemini prompt that turns a video script into a visual storyboard. Your storyboard should include:
- A numbered list of 6-8 shots for a 30-second video
- Camera angle for each shot (close-up, wide, screen recording)
- Duration of each shot in seconds
- Any text overlays or graphics

**Hint:** Start your prompt with "Act as a video storyboard artist" and provide a sample script for Gemini to work with.

### Exercise 2: Multi-Platform Adapter

Take one video idea (for example, "5 keyboard shortcuts everyone should know") and write a prompt that asks Gemini to create three versions:
- A 15-second Instagram Reel (fast-paced, text-heavy)
- A 45-second TikTok (casual voiceover, trending format)
- A 55-second YouTube Short (more detail, educational tone)

Compare the three outputs. Notice how the hook, pacing, and CTA change for each platform.

---

## 🔗 Next Steps

In Phase 5, we move beyond content creation into **automation and integration**. You will learn how to connect Gemini to external tools and APIs so it can take action — not just generate text. Get ready to build workflows that run on their own.

---

## Mini Project: 7-Day Content Calendar for Your Brand

**Time:** 15-20 minutes

Pick a real topic you care about (your job, a hobby, a side project). Use the content calendar script from Code Example 2 to generate a full week of short-form video ideas. Then:

1. Pick your best 3 days from the calendar
2. Use the script generator from Code Example 1 to write full scripts for those 3 videos
3. For each script, add one line describing the background music mood (upbeat, chill, dramatic)
4. Save everything in a single document — this is your ready-to-film content plan

**Bonus:** Ask Gemini to suggest trending audio styles for each video based on current platform trends.

---

<div class="module-quiz">
<h3>Module Quiz</h3>
<div class="quiz-q" data-answer="1"><p>1. What is the recommended duration for the "hook" in a short-form video?</p><label><input type="radio" name="q1" value="0"> 10-15 seconds</label><label><input type="radio" name="q1" value="1"> 0-3 seconds</label><label><input type="radio" name="q1" value="2"> 30 seconds</label><label><input type="radio" name="q1" value="3"> The entire video</label><div class="quiz-explain">The hook should be 0-3 seconds. You need to grab the viewer's attention immediately before they scroll past your video.</div></div>
<div class="quiz-q" data-answer="2"><p>2. What does CTA stand for in video content?</p><label><input type="radio" name="q2" value="0"> Content Timing Adjustment</label><label><input type="radio" name="q2" value="1"> Creative Text Addition</label><label><input type="radio" name="q2" value="2"> Call to Action</label><label><input type="radio" name="q2" value="3"> Camera Tracking Angle</label><div class="quiz-explain">CTA stands for Call to Action — it tells the viewer what to do next, like follow, comment, or save the video.</div></div>
<div class="quiz-q" data-answer="0"><p>3. Which platform benefits most from trending sounds?</p><label><input type="radio" name="q3" value="0"> TikTok</label><label><input type="radio" name="q3" value="1"> YouTube Shorts</label><label><input type="radio" name="q3" value="2"> LinkedIn</label><label><input type="radio" name="q3" value="3"> Email newsletters</label><div class="quiz-explain">TikTok's algorithm heavily favors videos that use trending sounds, making them a key factor in reach and discoverability.</div></div>
<div class="quiz-q" data-answer="3"><p>4. Why should you mix content pillars throughout the week?</p><label><input type="radio" name="q4" value="0"> It saves money on production</label><label><input type="radio" name="q4" value="1"> Platforms require it in their terms of service</label><label><input type="radio" name="q4" value="2"> It makes the code run faster</label><label><input type="radio" name="q4" value="3"> It keeps your audience engaged and prevents repetition</label><div class="quiz-explain">Mixing content types (educational, entertaining, inspirational, behind-the-scenes) keeps your feed interesting and prevents your audience from getting bored with the same format every day.</div></div>
<div class="quiz-q" data-answer="1"><p>5. What is the ideal length for an Instagram Reel to maximize reach?</p><label><input type="radio" name="q5" value="0"> 3-5 seconds</label><label><input type="radio" name="q5" value="1"> 15-30 seconds</label><label><input type="radio" name="q5" value="2"> 2-3 minutes</label><label><input type="radio" name="q5" value="3"> 10 minutes</label><div class="quiz-explain">Instagram Reels perform best at 15-30 seconds. Short enough to keep attention, long enough to deliver value.</div></div>
<div class="quiz-q" data-answer="2"><p>6. In the script generator, what format does the prompt use to structure the output?</p><label><input type="radio" name="q6" value="0"> Free-form paragraphs</label><label><input type="radio" name="q6" value="1"> CSV table</label><label><input type="radio" name="q6" value="2"> Labeled sections (HOOK, SCENE 1, SCENE 2, etc.)</label><label><input type="radio" name="q6" value="3"> Python dictionary</label><div class="quiz-explain">The prompt uses labeled sections like HOOK, SCENE 1, SCENE 2, SCENE 3, and CTA to give Gemini a clear structure to follow, making the output easy to read and use.</div></div>
<div class="quiz-q" data-answer="0"><p>7. What is a storyboard used for in video production?</p><label><input type="radio" name="q7" value="0"> Mapping out each scene visually before filming</label><label><input type="radio" name="q7" value="1"> Editing the final video</label><label><input type="radio" name="q7" value="2"> Publishing the video to social media</label><label><input type="radio" name="q7" value="3"> Tracking video analytics</label><div class="quiz-explain">A storyboard maps out each scene before you start filming. It includes shot descriptions, camera angles, and durations so you know exactly what to record.</div></div>
<div class="quiz-q" data-answer="3"><p>8. In the content calendar code, why is there a try-except block around json.loads?</p><label><input type="radio" name="q8" value="0"> To make the code run faster</label><label><input type="radio" name="q8" value="1"> Because Gemini always returns invalid JSON</label><label><input type="radio" name="q8" value="2"> To handle API key errors</label><label><input type="radio" name="q8" value="3"> Because Gemini might wrap JSON in markdown formatting, causing a parse error</label><div class="quiz-explain">Gemini sometimes wraps JSON output in markdown code blocks. The try-except catches this and falls back to printing the raw text so the program does not crash.</div></div>
<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
