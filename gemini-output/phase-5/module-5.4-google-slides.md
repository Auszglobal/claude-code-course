# Module 5.4: Gemini in Google Slides — Presentations, Speaker Notes, and Pitch Decks

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Use Gemini to auto-generate presentation slides from a topic or outline
- Create and refine speaker notes for each slide
- Generate background images and visual suggestions using Gemini
- Build a pitch deck end-to-end with AI assistance
- Automate slide creation using the Google Slides API with Gemini content

## 📖 Theory

Creating presentations is one of those tasks that everyone has to do but few people enjoy. You know the drill: stare at a blank slide, struggle with bullet points, hunt for stock images, and then realize you still need speaker notes. Gemini in Google Slides tackles every one of those pain points.

### How Gemini Works in Slides

Gemini integrates into Google Slides through the side panel and inline creation tools:

- **"Help me create"** — Describe your presentation topic and Gemini generates a complete slide deck with titles, content, and layout suggestions.
- **Image generation** — Ask Gemini to create custom background images, icons, or illustrations that match your theme.
- **Speaker notes** — Highlight a slide and ask Gemini to write speaker notes explaining the key talking points.
- **Content refinement** — Select text on any slide and ask Gemini to simplify it, make it punchier, or add supporting details.

### The Anatomy of a Good AI-Generated Presentation

A great presentation isn't just a wall of text on slides. Gemini understands presentation principles:

- **Short headlines** that capture the main idea (not full sentences)
- **3-5 bullet points per slide** to keep things scannable
- **Visual variety** using different slide layouts (title slides, two-column, image + text)
- **A narrative arc** that flows from problem to solution to next steps

Think of Gemini as a presentation designer who reads your brain. You describe the story you want to tell, and it handles the structure.

## 💻 Code Example 1: Building a Presentation with Gemini in Google Slides

This walkthrough uses the built-in Gemini features in the Slides editor.

**Step 1: Start a new presentation**

```
1. Go to slides.google.com
2. Click "Blank presentation" or choose a template
3. Click the Gemini sparkle icon (✨) in the toolbar
```

**Step 2: Generate a full slide deck**

In the Gemini panel, enter:

```
Prompt: "Create a 10-slide presentation about launching a mobile app
for a local coffee shop. Include:
- Title slide with a catchy headline
- Problem statement (why the app is needed)
- Solution overview
- Key features (ordering, loyalty rewards, store locator)
- Market opportunity
- Business model
- Timeline and milestones
- Team slide
- Financial projections
- Call to action / next steps"
```

Gemini generates all 10 slides with appropriate layouts, titles, and bullet point content.

**Step 3: Generate a custom image**

Click on the title slide, open Gemini, and type:

```
Prompt: "Generate an image of a cozy coffee shop with a smartphone
showing a mobile ordering app on the counter. Warm lighting, modern
interior."
```

Gemini creates an image and offers to insert it as the slide background.

**Step 4: Add speaker notes**

Click on the "Key Features" slide, then ask Gemini:

```
Prompt: "Write speaker notes for this slide. I need to present for
about 2 minutes on this slide. Explain each feature with a real-world
example — like how Starbucks uses mobile ordering to reduce wait times."
```

Gemini adds detailed notes below the slide that you can reference during your presentation.

**Step 5: Refine a slide**

Select the bullet points on the "Market Opportunity" slide:

```
Prompt: "These bullet points are too wordy. Rewrite them to be
punchy and under 8 words each. Add a relevant statistic to each point."
```

### Expected Output:

A complete 10-slide deck appears with professional layouts. Each slide has a clear title, concise content, and logical flow. Speaker notes appear in the notes section below each slide, and the generated image appears as a high-quality background on the title slide.

## 💻 Code Example 2: Automated Pitch Deck Generator with Slides API and Gemini

This script generates a startup pitch deck by combining Gemini content with the Slides API.

```python
# pitch_deck_generator.py
# Generate a pitch deck using Gemini + Google Slides API
# Prerequisites: pip install google-auth google-auth-oauthlib google-api-python-client google-genai

import google.genai as genai
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

# --- Configuration ---
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
TOKEN_FILE = "token.json"

# Initialize clients
client = genai.Client(api_key=GEMINI_API_KEY)
creds = Credentials.from_authorized_user_file(TOKEN_FILE)
slides_service = build("slides", "v1", credentials=creds)

# Step 1: Generate slide content with Gemini
slide_topics = [
    "Title slide for 'GreenRoute' — an app that optimizes delivery routes to reduce carbon emissions",
    "Problem: Last-mile delivery accounts for 30% of urban emissions",
    "Solution: AI-powered route optimization that cuts emissions by 40%",
    "Market size: $200B logistics industry, growing 8% annually",
    "Business model: SaaS subscription for delivery companies, $500/month per fleet",
    "Call to action: Seeking $2M seed funding to launch in 3 cities"
]

slide_contents = []
for topic in slide_topics:
    prompt = f"""Create content for a pitch deck slide about: {topic}
    Return ONLY:
    - A short title (under 8 words)
    - 3-4 bullet points (under 12 words each)
    - One line of speaker notes (2-3 sentences)
    Format: TITLE: ... | BULLETS: ... | NOTES: ..."""

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    slide_contents.append(response.text)

# Step 2: Create a new presentation
presentation = slides_service.presentations().create(
    body={"title": "GreenRoute — Pitch Deck"}
).execute()

pres_id = presentation["presentationId"]
print(f"Created: https://docs.google.com/presentation/d/{pres_id}")

# Step 3: Add slides with content
requests = []
for i, content in enumerate(slide_contents):
    # Parse the Gemini output
    parts = content.split("|")
    title = parts[0].replace("TITLE:", "").strip() if len(parts) > 0 else f"Slide {i+1}"
    bullets = parts[1].replace("BULLETS:", "").strip() if len(parts) > 1 else ""
    notes = parts[2].replace("NOTES:", "").strip() if len(parts) > 2 else ""

    # Create a new slide with a TITLE_AND_BODY layout
    requests.append({
        "createSlide": {
            "objectId": f"slide_{i}",
            "slideLayoutReference": {"predefinedLayout": "TITLE_AND_BODY"},
            "placeholderIdMappings": [
                {"layoutPlaceholder": {"type": "TITLE"}, "objectId": f"title_{i}"},
                {"layoutPlaceholder": {"type": "BODY"}, "objectId": f"body_{i}"}
            ]
        }
    })

    # Insert title text
    requests.append({
        "insertText": {
            "objectId": f"title_{i}",
            "text": title
        }
    })

    # Insert body text (bullet points)
    requests.append({
        "insertText": {
            "objectId": f"body_{i}",
            "text": bullets
        }
    })

# Apply all slide creation requests
slides_service.presentations().batchUpdate(
    presentationId=pres_id,
    body={"requests": requests}
).execute()

print(f"Added {len(slide_contents)} slides to the pitch deck.")
```

### Expected Output:

```
Created: https://docs.google.com/presentation/d/1xYzAbCdEfGhIjKlMnOpQrStUvWx
Added 6 slides to the pitch deck.
```

Opening the link reveals a 6-slide pitch deck with titles and bullet points on each slide, ready for visual polish in the Slides editor.

## ✍️ Hands-On Exercises

**Exercise 1: The 5-Minute Pitch Deck**
Use Gemini in Google Slides to create a pitch deck for an imaginary product — a smart water bottle that tracks hydration. Give Gemini a single prompt describing the product, target market, and key features. Time yourself: can you go from blank presentation to a complete 8-slide deck in under 5 minutes? After generating, spend 5 more minutes refining the content and adding speaker notes.

> Hint: Be specific in your initial prompt. The more context you give Gemini, the better the first draft.

**Exercise 2: Speaker Notes Coach**
Take any existing presentation you've created before (school project, work meeting, anything). For each slide, ask Gemini to generate 2-minute speaker notes. Then read the notes aloud and time yourself. Are they too long? Too short? Ask Gemini to adjust: "Make these notes fit exactly 90 seconds of speaking time."

## 🔗 Next Steps

You now know how to use Gemini across Gmail, Docs, Sheets, and Slides — the core of Google Workspace. But what if you want all of these to work together automatically? In **Module 5.5: Google Apps Script + Gemini API**, you'll learn how to connect everything with custom automation scripts that run on a schedule.

---

<div id="quiz-container">
<h3>Knowledge Check — Module 5.4</h3>
<form id="quiz-form">

<p><strong>1. What is the "Help me create" feature in Google Slides?</strong></p>
<label><input type="radio" name="q1" value="A"> A. A tool that converts Docs to Slides automatically</label><br>
<label><input type="radio" name="q1" value="B" data-answer> B. A Gemini feature that generates slide decks from a text description</label><br>
<label><input type="radio" name="q1" value="C"> C. A template gallery with pre-made presentations</label><br>
<label><input type="radio" name="q1" value="D"> D. An animation tool for slide transitions</label>
<div class="quiz-explain" style="display:none;">"Help me create" lets you describe your presentation topic and Gemini generates a full slide deck with layouts, content, and structure.</div>

<p><strong>2. How many bullet points per slide does the module recommend?</strong></p>
<label><input type="radio" name="q2" value="A"> A. 1-2</label><br>
<label><input type="radio" name="q2" value="B" data-answer> B. 3-5</label><br>
<label><input type="radio" name="q2" value="C"> C. 7-10</label><br>
<label><input type="radio" name="q2" value="D"> D. As many as needed to cover the topic</label>
<div class="quiz-explain" style="display:none;">The module recommends 3-5 bullet points per slide to keep content scannable. Overloading slides makes them hard to follow during a presentation.</div>

<p><strong>3. What can Gemini generate as a visual element for slides?</strong></p>
<label><input type="radio" name="q3" value="A"> A. Only text and bullet points</label><br>
<label><input type="radio" name="q3" value="B"> B. Only charts imported from Sheets</label><br>
<label><input type="radio" name="q3" value="C" data-answer> C. Custom images, backgrounds, and illustrations</label><br>
<label><input type="radio" name="q3" value="D"> D. Animated GIFs only</label>
<div class="quiz-explain" style="display:none;">Gemini can generate custom images, backgrounds, and illustrations based on text descriptions, which can be inserted directly into slides.</div>

<p><strong>4. In the code example, what slide layout is used for each generated slide?</strong></p>
<label><input type="radio" name="q4" value="A"> A. BLANK</label><br>
<label><input type="radio" name="q4" value="B"> B. SECTION_HEADER</label><br>
<label><input type="radio" name="q4" value="C" data-answer> C. TITLE_AND_BODY</label><br>
<label><input type="radio" name="q4" value="D"> D. TITLE_ONLY</label>
<div class="quiz-explain" style="display:none;">The script uses "TITLE_AND_BODY" layout, which provides a title placeholder at the top and a body placeholder for bullet points below.</div>

<p><strong>5. What is the purpose of "placeholderIdMappings" in the createSlide request?</strong></p>
<label><input type="radio" name="q5" value="A"> A. It maps colors to slide themes</label><br>
<label><input type="radio" name="q5" value="B" data-answer> B. It assigns custom IDs to slide placeholders so you can insert text into them</label><br>
<label><input type="radio" name="q5" value="C"> C. It links slides to external data sources</label><br>
<label><input type="radio" name="q5" value="D"> D. It creates animations for each placeholder</label>
<div class="quiz-explain" style="display:none;">placeholderIdMappings assigns your chosen object IDs to the layout's placeholders (TITLE, BODY), so you can reference them later when inserting text.</div>

<p><strong>6. What's the best practice for writing speaker notes with Gemini?</strong></p>
<label><input type="radio" name="q6" value="A"> A. Just read the bullet points on the slide aloud</label><br>
<label><input type="radio" name="q6" value="B"> B. Write a full essay for each slide</label><br>
<label><input type="radio" name="q6" value="C" data-answer> C. Specify the speaking time and ask Gemini to include examples and talking points</label><br>
<label><input type="radio" name="q6" value="D"> D. Don't use speaker notes — memorize everything instead</label>
<div class="quiz-explain" style="display:none;">Telling Gemini the target speaking time (e.g., "2 minutes per slide") and asking for examples helps produce notes that are practical and well-paced.</div>

<p><strong>7. Why does the code example generate content slide-by-slide rather than all at once?</strong></p>
<label><input type="radio" name="q7" value="A"> A. The Gemini API can only process one sentence at a time</label><br>
<label><input type="radio" name="q7" value="B" data-answer> B. It gives more control over each slide's content and makes parsing easier</label><br>
<label><input type="radio" name="q7" value="C"> C. Google Slides API requires slides to be created one at a time</label><br>
<label><input type="radio" name="q7" value="D"> D. To avoid rate limits on the Slides API</label>
<div class="quiz-explain" style="display:none;">Generating content per slide gives you precise control over each slide's title, bullets, and notes. It also makes it easier to parse Gemini's output into structured data.</div>

<p><strong>8. After Gemini generates a full slide deck, what should you do next?</strong></p>
<label><input type="radio" name="q8" value="A"> A. Present it immediately without reviewing</label><br>
<label><input type="radio" name="q8" value="B"> B. Delete it and start over manually</label><br>
<label><input type="radio" name="q8" value="C" data-answer> C. Review the content, refine wording, adjust visuals, and add your personal touch</label><br>
<label><input type="radio" name="q8" value="D"> D. Export it as a PDF and email it without changes</label>
<div class="quiz-explain" style="display:none;">AI-generated presentations are a great starting point, but you should always review and refine the content, adjust visuals, and add personal anecdotes or data to make it yours.</div>

</form>
<button id="quiz-submit" onclick="checkQuiz()">Submit Answers</button>
<div id="quiz-result"></div>
</div>

<script>
function checkQuiz() {
    const form = document.getElementById('quiz-form');
    let score = 0;
    const total = 8;
    for (let i = 1; i <= total; i++) {
        const selected = form.querySelector(`input[name="q${i}"]:checked`);
        const explain = form.querySelectorAll('.quiz-explain')[i - 1];
        if (selected && selected.hasAttribute('data-answer')) {
            score++;
            selected.parentElement.style.color = 'green';
        } else if (selected) {
            selected.parentElement.style.color = 'red';
        }
        explain.style.display = 'block';
    }
    document.getElementById('quiz-result').innerHTML =
        `<strong>Your Score: ${score}/${total}</strong> — ${score >= 6 ? 'Great job!' : 'Review the explanations and try again.'}`;
}
</script>
