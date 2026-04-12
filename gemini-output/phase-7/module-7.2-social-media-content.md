# Module 7.2: Social Media Content Creation with Gemini

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Build a content creation pipeline that goes from idea to finished post
- Write platform-specific captions for Instagram, Facebook, and LinkedIn
- Generate matching images using Google's Imagen model
- Research and generate effective hashtags for your posts
- Create a weekly content calendar using Gemini
- Produce a full week of social media content in minutes

## 📖 Theory

### The Content Creation Problem

If you run a business or manage a brand, you know the pain: social media demands constant content. Instagram wants eye-catching images with punchy captions. LinkedIn wants professional thought-leadership posts. Facebook wants engaging stories. And every platform has its own style, tone, and best practices.

Creating content for even one platform takes time. Doing it for three or four? That is a full-time job. This is where Gemini becomes your creative partner.

### The Content Pipeline

Think of content creation like a factory assembly line. Raw materials go in one end, and finished products come out the other:

1. **Ideation** — Brainstorm topics and themes (raw materials)
2. **Copywriting** — Write the actual captions and text (shaping)
3. **Visual Creation** — Generate or select matching images (painting)
4. **Optimization** — Add hashtags, adjust for each platform (quality control)
5. **Scheduling** — Organize posts into a calendar (shipping)

Gemini can help with every single step.

### Platform Differences Matter

Each social media platform has its own personality. Imagine you are telling the same story at three different events:

- **Instagram** — A casual party. You are visual, fun, and use emojis. Captions are short to medium. Hashtags are essential (up to 30, though 5-15 well-chosen ones work best).
- **LinkedIn** — A professional conference. You share insights, data, and lessons learned. Tone is polished but personable. Hashtags are minimal (3-5).
- **Facebook** — A neighborhood gathering. You are conversational and community-oriented. Medium-length posts with questions to encourage comments. Hashtags are optional.

### The Power of Imagen

Google's **Imagen** model (accessible through the Gemini API) generates images from text descriptions. Instead of spending hours searching stock photo sites, you describe what you want: "A cozy coffee shop with warm lighting and a laptop on a wooden table" — and Imagen creates it for you. This means every post can have a unique, on-brand image.

### Hashtag Strategy

Hashtags are like signposts that help people find your content. Good hashtag strategy uses a mix:

- **Broad hashtags** (#marketing, #business) — huge audience but lots of competition
- **Niche hashtags** (#smallbusinesstips, #digitalmarketingtips) — smaller but more targeted audience
- **Branded hashtags** (#YourBrandName) — builds your community
- **Trending hashtags** — ride the wave of current conversations

## 💻 Code Example 1: Multi-Platform Post Generator

This script takes a single topic and generates tailored captions for Instagram, Facebook, and LinkedIn — each with the right tone, length, and hashtags.

```python
# social_media_generator.py
# Generate platform-specific social media posts using Gemini

import google.generativeai as genai
import json

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

def generate_social_posts(topic, brand_name, brand_voice):
    """Generate posts for Instagram, Facebook, and LinkedIn from one topic."""

    prompt = f"""You are a social media content strategist for "{brand_name}".
Brand voice: {brand_voice}

Create social media posts about this topic: "{topic}"

Return a JSON object with these keys:
{{
    "instagram": {{
        "caption": "Instagram caption (150-250 words, casual, use emojis, end with a call to action)",
        "hashtags": "10-15 relevant hashtags as a string",
        "image_prompt": "A detailed description for AI image generation (Imagen), describe the visual style, colors, mood"
    }},
    "facebook": {{
        "caption": "Facebook post (100-200 words, conversational, ask a question to encourage comments)",
        "hashtags": "3-5 hashtags as a string"
    }},
    "linkedin": {{
        "caption": "LinkedIn post (150-300 words, professional but personable, share an insight or lesson, use line breaks for readability)",
        "hashtags": "3-5 professional hashtags as a string"
    }}
}}

Return ONLY valid JSON."""

    response = model.generate_content(prompt)

    try:
        result = json.loads(response.text.strip().strip("```json").strip("```"))
    except json.JSONDecodeError:
        result = {"error": "Could not parse response", "raw": response.text}

    return result

# Example: Generate posts for a coffee shop
posts = generate_social_posts(
    topic="We just launched our new cold brew summer collection with 3 unique flavors",
    brand_name="Sunrise Coffee Co.",
    brand_voice="Warm, friendly, community-focused. We love coffee and our customers."
)

# Display the results
for platform in ["instagram", "facebook", "linkedin"]:
    if platform in posts:
        print(f"\n{'='*60}")
        print(f"  {platform.upper()}")
        print(f"{'='*60}")
        print(f"\nCAPTION:\n{posts[platform]['caption']}")
        print(f"\nHASHTAGS: {posts[platform].get('hashtags', 'N/A')}")
        if 'image_prompt' in posts[platform]:
            print(f"\nIMAGE PROMPT: {posts[platform]['image_prompt']}")
```

### Expected Output:

```
============================================================
  INSTAGRAM
============================================================

CAPTION:
Summer just got a whole lot cooler! ☀️🧊

We're SO excited to announce our NEW Cold Brew Summer Collection!
Three delicious flavors crafted with love:

🍋 Citrus Sunshine — bright and zesty
🫐 Berry Bliss — sweet and refreshing
🥥 Coconut Dream — smooth and tropical

Each one is slow-brewed for 18 hours for that rich, smooth taste
you love — served ice-cold and perfect for hot days.

Available starting this Saturday at all Sunrise locations!

Which flavor are you trying first? Drop a 🍋, 🫐, or 🥥 below! 👇

HASHTAGS: #coldbrew #summercoffee #icedcoffee #newmenu #coffeelover
#coldbrewcoffee #summervibes #sunrisecoffee #coffeeshop #localcoffee
#coffeeaddict #refreshing #summerdrinks #coffeecommunity

IMAGE PROMPT: Three beautiful iced cold brew drinks in clear glasses
on a sunlit wooden table, each a different color — golden citrus,
deep purple berry, creamy white coconut — with fresh fruit garnishes,
warm summer light, bokeh background of a cozy cafe patio
============================================================
```

## 💻 Code Example 2: Weekly Content Calendar Generator

This script creates a full week of content ideas organized into a calendar, with specific topics, post types, and best times to post.

```python
# content_calendar.py
# Generate a full week of social media content ideas

import google.generativeai as genai
import json

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

def generate_weekly_calendar(business_type, goals, upcoming_events=""):
    """Create a 7-day content calendar with post ideas for each day."""

    prompt = f"""Create a 7-day social media content calendar for a {business_type}.

Business goals: {goals}
Upcoming events or promotions: {upcoming_events if upcoming_events else "None specified"}

For each day (Monday through Sunday), provide:
- "day": the day name
- "platform": which platform to focus on (rotate between Instagram, Facebook, LinkedIn)
- "content_type": the type of post (e.g., photo, carousel, story, reel idea, text post)
- "topic": specific topic or idea
- "caption_draft": a short draft caption (50-100 words)
- "best_time": suggested posting time
- "goal": what this post aims to achieve (engagement, awareness, sales, etc.)

Return as a JSON object with a "calendar" array of 7 day objects.
Return ONLY valid JSON."""

    response = model.generate_content(prompt)

    try:
        result = json.loads(response.text.strip().strip("```json").strip("```"))
    except json.JSONDecodeError:
        result = {"error": "Could not parse", "raw": response.text}

    return result

# Generate a calendar for a fitness studio
calendar = generate_weekly_calendar(
    business_type="boutique fitness studio offering yoga, pilates, and HIIT classes",
    goals="Increase class bookings by 20%, build community engagement, attract new members",
    upcoming_events="Summer Shape-Up Challenge starting next month, Free trial week for new members"
)

# Display the calendar in a readable format
if "calendar" in calendar:
    print("=" * 70)
    print("     WEEKLY SOCIAL MEDIA CONTENT CALENDAR")
    print("=" * 70)

    for day in calendar["calendar"]:
        print(f"\n--- {day['day'].upper()} ---")
        print(f"  Platform:     {day.get('platform', 'N/A')}")
        print(f"  Content Type: {day.get('content_type', 'N/A')}")
        print(f"  Topic:        {day.get('topic', 'N/A')}")
        print(f"  Best Time:    {day.get('best_time', 'N/A')}")
        print(f"  Goal:         {day.get('goal', 'N/A')}")
        print(f"  Draft Caption:")
        # Wrap the caption for readability
        caption = day.get('caption_draft', 'N/A')
        print(f"    {caption}")

    print("\n" + "=" * 70)
    print(f"  Total posts planned: {len(calendar['calendar'])}")
    print("=" * 70)
else:
    print("Error generating calendar:")
    print(calendar)
```

### Expected Output:

```
======================================================================
     WEEKLY SOCIAL MEDIA CONTENT CALENDAR
======================================================================

--- MONDAY ---
  Platform:     Instagram
  Content Type: Carousel (3-5 slides)
  Topic:        "5 Benefits of Morning Yoga You Didn't Know"
  Best Time:    7:00 AM
  Goal:         Education + awareness
  Draft Caption:
    Rise and shine! Did you know morning yoga can boost your
    metabolism, improve focus, AND reduce stress? Swipe through
    to see 5 science-backed benefits. Ready to try? Our 6 AM
    Sunrise Yoga class has spots open this week!

--- TUESDAY ---
  Platform:     Facebook
  Content Type: Video / Reel
  Topic:        Member spotlight — transformation story
  Best Time:    12:00 PM
  Goal:         Community engagement + social proof
  ...
```

## ✍️ Hands-On Exercises

### Exercise 1: Your Brand's Content Week
Choose a real or imaginary business. Define its brand voice in one sentence (e.g., "Playful, bold, and eco-conscious"). Then use the multi-platform post generator to create posts for three different topics. Review the outputs and edit them to match your style perfectly.

**Hint:** The brand voice you provide makes a huge difference. Try running the same topic with different voices — "Corporate and professional" vs. "Fun and quirky" — and compare the results.

### Exercise 2: Hashtag Research Assistant
Modify the post generator to also include a "hashtag_analysis" field that rates each suggested hashtag as "broad", "niche", or "branded" and explains why it was chosen. This helps you understand the strategy behind hashtag selection.

**Hint:** Add this to your JSON structure: `"hashtag_analysis": [{"tag": "#example", "type": "niche", "reason": "..."}]`

## 🔗 Next Steps

In the next module, you will learn how to use Gemini for SEO content creation — writing blog posts that rank well on Google. You will master keyword research, content structuring, and optimization techniques all powered by AI.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1"><p>1. What is the correct order of the content creation pipeline?</p><label><input type="radio" name="q1" value="0"> A. Schedule, Write, Ideate, Optimize, Design</label><label><input type="radio" name="q1" value="1"> B. Ideation, Copywriting, Visual Creation, Optimization, Scheduling</label><label><input type="radio" name="q1" value="2"> C. Visual Creation, Ideation, Scheduling, Copywriting, Optimization</label><label><input type="radio" name="q1" value="3"> D. Optimization, Copywriting, Ideation, Visual Creation, Scheduling</label><div class="quiz-explain">The pipeline flows logically: first brainstorm ideas, then write the copy, create visuals, optimize with hashtags and tweaks, and finally schedule the posts.</div></div>

<div class="quiz-q" data-answer="2"><p>2. How should an Instagram caption differ from a LinkedIn post?</p><label><input type="radio" name="q2" value="0"> A. Instagram should be longer and more formal</label><label><input type="radio" name="q2" value="1"> B. They should be identical to maintain brand consistency</label><label><input type="radio" name="q2" value="2"> C. Instagram is casual with emojis; LinkedIn is professional and insight-driven</label><label><input type="radio" name="q2" value="3"> D. LinkedIn should use more hashtags than Instagram</label><div class="quiz-explain">Each platform has its own culture. Instagram favors casual, visual, emoji-rich content, while LinkedIn rewards professional insights and thought leadership.</div></div>

<div class="quiz-q" data-answer="3"><p>3. What is Google's Imagen model used for?</p><label><input type="radio" name="q3" value="0"> A. Translating text between languages</label><label><input type="radio" name="q3" value="1"> B. Analyzing website traffic data</label><label><input type="radio" name="q3" value="2"> C. Editing video content automatically</label><label><input type="radio" name="q3" value="3"> D. Generating images from text descriptions</label><div class="quiz-explain">Imagen is Google's text-to-image model. You describe what you want in words, and it creates a matching image — perfect for creating unique social media visuals.</div></div>

<div class="quiz-q" data-answer="0"><p>4. What is a "niche hashtag"?</p><label><input type="radio" name="q4" value="0"> A. A hashtag targeting a specific, smaller audience (like #smallbusinesstips)</label><label><input type="radio" name="q4" value="1"> B. A hashtag that is trending worldwide</label><label><input type="radio" name="q4" value="2"> C. A hashtag with your brand name in it</label><label><input type="radio" name="q4" value="3"> D. A hashtag that nobody uses</label><div class="quiz-explain">Niche hashtags target specific communities. They have less competition than broad hashtags like #marketing, so your content is more likely to be seen by people who care about your topic.</div></div>

<div class="quiz-q" data-answer="1"><p>5. Why does the code ask Gemini to return JSON instead of plain text?</p><label><input type="radio" name="q5" value="0"> A. JSON looks prettier when printed</label><label><input type="radio" name="q5" value="1"> B. JSON is structured data that code can easily parse and use programmatically</label><label><input type="radio" name="q5" value="2"> C. Gemini only works with JSON format</label><label><input type="radio" name="q5" value="3"> D. JSON uses less storage space</label><div class="quiz-explain">JSON gives us predictable, structured output with clear keys and values. This makes it easy for our code to extract specific pieces (like just the Instagram caption) and use them in other parts of a program.</div></div>

<div class="quiz-q" data-answer="2"><p>6. What is the recommended number of hashtags for a LinkedIn post?</p><label><input type="radio" name="q6" value="0"> A. 20-30 hashtags</label><label><input type="radio" name="q6" value="1"> B. 10-15 hashtags</label><label><input type="radio" name="q6" value="2"> C. 3-5 hashtags</label><label><input type="radio" name="q6" value="3"> D. No hashtags at all</label><div class="quiz-explain">LinkedIn is a professional platform where too many hashtags looks spammy. 3-5 well-chosen, relevant hashtags is the sweet spot for professional content.</div></div>

<div class="quiz-q" data-answer="0"><p>7. In the content calendar example, why do we rotate platforms across the week?</p><label><input type="radio" name="q7" value="0"> A. To maintain a consistent presence across all platforms without burnout</label><label><input type="radio" name="q7" value="1"> B. Because you can only post on each platform once per week</label><label><input type="radio" name="q7" value="2"> C. Because Gemini can only generate content for one platform at a time</label><label><input type="radio" name="q7" value="3"> D. To confuse competitors about your strategy</label><div class="quiz-explain">Rotating platforms ensures you stay active everywhere without overwhelming yourself. It also lets you tailor content to each platform's strengths on different days.</div></div>

<div class="quiz-q" data-answer="3"><p>8. What role does "brand voice" play in the content generation prompt?</p><label><input type="radio" name="q8" value="0"> A. It makes the AI respond faster</label><label><input type="radio" name="q8" value="1"> B. It is optional and does not affect output quality</label><label><input type="radio" name="q8" value="2"> C. It limits Gemini to only using certain words</label><label><input type="radio" name="q8" value="3"> D. It guides the tone and style of the generated content to match your brand personality</label><div class="quiz-explain">Brand voice is one of the most important inputs. It tells Gemini how to "sound" — whether your brand is playful, serious, luxurious, or down-to-earth — ensuring all content feels authentically yours.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
