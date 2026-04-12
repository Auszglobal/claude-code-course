# Module 7.5: Industry Case Studies and Mini Project

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Apply Gemini to real-world business scenarios in multiple industries
- Build AI tools for real estate, retail, food and beverage, and education
- Understand how to adapt AI prompts for different industry needs
- Design an AI-powered business tool tailored to your own industry
- Complete a mini project that combines everything from Phase 7

## 📖 Theory

### AI Is Not One-Size-Fits-All

Every industry has unique challenges, terminology, and workflows. A real estate agent needs help writing property descriptions and analyzing market data. A restaurant owner needs help with menu design and responding to reviews. A teacher needs help creating quizzes and lesson plans.

The beautiful thing about Gemini is that it adapts to any domain. You do not need a specialized "real estate AI" or "education AI." You just need to give Gemini the right context and instructions for your specific industry.

Think of Gemini like a brilliant new employee. On their first day, they know nothing about your specific business. But give them a detailed briefing — your industry, your customers, your products, your challenges — and they quickly become productive.

### The Context-Prompt Pattern

For industry-specific applications, we use what is called the **Context-Prompt Pattern**:

1. **System Context** — Tell Gemini who it is (e.g., "You are an experienced real estate copywriter")
2. **Domain Knowledge** — Provide industry-specific data, templates, or guidelines
3. **Specific Task** — Give clear instructions for what you need
4. **Output Format** — Specify exactly how you want the result formatted

This pattern works for any industry. The only thing that changes is the content you put into each step.

### Why Industry-Specific Prompts Matter

Generic prompts give generic results. Compare these two approaches:

**Generic:** "Write a description for a house."
**Industry-specific:** "You are a luxury real estate copywriter in Melbourne. Write a property listing for a 4-bedroom Victorian terrace in Fitzroy with original period features, renovated kitchen with marble countertops, north-facing garden, and off-street parking. Target audience: young professional couples. Highlight lifestyle and neighborhood appeal."

The second prompt produces dramatically better results because it gives Gemini the context an industry professional would have.

## 💻 Code Example 1: Multi-Industry AI Assistant

This script demonstrates four different industry applications, showing how the same Gemini model adapts to completely different business contexts.

```python
# industry_ai_assistant.py
# Industry-specific AI tools using Gemini

import google.generativeai as genai
import json

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

# ---- REAL ESTATE ----
def generate_property_listing(property_details):
    """Create a compelling property listing description."""

    prompt = f"""You are an experienced real estate copywriter who creates
listings that sell properties fast.

Property details:
{property_details}

Write:
1. A compelling headline (under 10 words)
2. A property description (150-200 words) that:
   - Opens with the strongest selling point
   - Paints a picture of the lifestyle
   - Highlights unique features
   - Mentions the neighborhood appeal
   - Ends with a call to action
3. A list of 5 key feature bullet points
4. A suggested price positioning statement

Tone: Professional but warm. Make the reader imagine living there."""

    response = model.generate_content(prompt)
    return response.text

# ---- RETAIL ----
def generate_product_descriptions(products):
    """Create compelling product descriptions for an online store."""

    prompt = f"""You are an e-commerce copywriter who writes product descriptions
that convert browsers into buyers.

Products to describe:
{products}

For each product, write:
1. A catchy product title (under 8 words)
2. A short description (50-80 words) focusing on benefits, not just features
3. Three bullet points highlighting key selling points
4. A "Perfect for..." line suggesting who should buy this

Tone: Enthusiastic but trustworthy. Use sensory language."""

    response = model.generate_content(prompt)
    return response.text

# ---- FOOD & BEVERAGE ----
def create_menu_and_respond_to_review(menu_item_info, review_text):
    """Create a menu description and respond to a customer review."""

    prompt = f"""You are a restaurant marketing specialist.

TASK 1 - MENU DESCRIPTION:
Create an appetizing menu description for:
{menu_item_info}
Write a description (30-50 words) that makes the reader hungry.
Include flavor descriptors and presentation details.

TASK 2 - REVIEW RESPONSE:
A customer left this review:
"{review_text}"

Write a professional, empathetic response (50-80 words) that:
- Thanks them for their feedback
- Addresses any concerns specifically
- Invites them back
- Sounds human, not robotic

Clearly label TASK 1 and TASK 2 in your response."""

    response = model.generate_content(prompt)
    return response.text

# ---- EDUCATION ----
def generate_lesson_materials(topic, grade_level):
    """Create educational materials including quiz questions and study guide."""

    prompt = f"""You are an experienced educator creating learning materials.

Topic: {topic}
Level: {grade_level}

Create:
1. A brief lesson overview (3-4 sentences explaining the topic simply)
2. Five key vocabulary terms with simple definitions
3. A "Did You Know?" fun fact related to the topic
4. Three quiz questions (multiple choice, A-D) with correct answers marked
5. A homework assignment suggestion that involves real-world application

Make everything age-appropriate and engaging. Use clear, simple language."""

    response = model.generate_content(prompt)
    return response.text


# ---- DEMO: Run all four industry tools ----

print("=" * 65)
print("  REAL ESTATE: Property Listing")
print("=" * 65)
result = generate_property_listing("""
Type: 3-bedroom apartment
Location: Bondi Beach, Sydney
Size: 120 sqm + 15 sqm balcony
Features: Ocean views from living room and master bedroom,
open-plan kitchen with stone benchtops, ducted air conditioning,
secure parking for 2 cars, rooftop pool in the building
Condition: Fully renovated 2023
""")
print(result)

print("\n" + "=" * 65)
print("  RETAIL: Product Descriptions")
print("=" * 65)
result = generate_product_descriptions("""
1. Wireless noise-cancelling headphones, 40-hour battery, premium leather earpads
2. Organic bamboo water bottle, 750ml, double-wall insulated, keeps drinks cold 24 hours
3. Portable solar phone charger, 20000mAh, waterproof, charges 2 devices at once
""")
print(result)

print("\n" + "=" * 65)
print("  FOOD & BEVERAGE: Menu + Review Response")
print("=" * 65)
result = create_menu_and_respond_to_review(
    menu_item_info="Pan-seared barramundi with roasted sweet potato, "
                   "broccolini, and a lemon butter sauce. Price: $34",
    review_text="The food was amazing but we waited 45 minutes for our main "
                "course. The waiter was apologetic but it really spoiled the "
                "evening. 3 stars."
)
print(result)

print("\n" + "=" * 65)
print("  EDUCATION: Lesson Materials")
print("=" * 65)
result = generate_lesson_materials(
    topic="Photosynthesis — how plants make their own food",
    grade_level="Grade 5 (age 10-11)"
)
print(result)
```

### Expected Output:

```
=================================================================
  REAL ESTATE: Property Listing
=================================================================

**Wake Up to Ocean Views in Bondi Beach**

Imagine starting every morning with the sparkling Pacific Ocean
stretching out before you. This stunning 3-bedroom apartment in the
heart of Bondi Beach has been completely renovated in 2023, offering
modern luxury with one of Sydney's most coveted views...

Key Features:
• Panoramic ocean views from living areas and master bedroom
• Brand new kitchen with premium stone benchtops
• Generous 15 sqm entertaining balcony
• Secure parking for two vehicles
• Resort-style rooftop pool

...

=================================================================
  FOOD & BEVERAGE: Menu + Review Response
=================================================================

TASK 1 - MENU DESCRIPTION:
**Pan-Seared Barramundi** — $34
Crispy-skinned barramundi, pan-seared to golden perfection,
resting on a bed of caramelized roasted sweet potato and
tender broccolini. Finished with a velvety lemon butter sauce
that brings every element together beautifully.

TASK 2 - REVIEW RESPONSE:
Thank you so much for your kind words about our food — we are
thrilled you enjoyed it! We sincerely apologize for the long
wait on your mains. That is not the experience we aim for, and
we are addressing this with our kitchen team. We would love the
chance to make it up to you — please reach out to us directly
for a complimentary appetizer on your next visit. We hope to
see you again soon!
```

## 💻 Code Example 2: Mini Project — AI-Powered Business Tool Builder

This is your Phase 7 capstone project. The script helps you design and build a complete AI business tool for any industry by walking you through the process step by step.

```python
# business_tool_builder.py
# Mini Project: Build a custom AI business tool for your industry

import google.generativeai as genai
import json

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

def design_business_tool(industry, main_problem, sample_input):
    """Design and build a complete AI business tool."""

    # Step 1: Analyze the business need
    analysis_prompt = f"""You are a business consultant specializing in AI solutions.

Industry: {industry}
Main problem to solve: {main_problem}
Sample input data: {sample_input}

Analyze this and return a JSON object:
{{
    "tool_name": "a catchy name for this AI tool",
    "problem_statement": "1-2 sentence description of the problem",
    "solution_approach": "how AI can solve this in 2-3 sentences",
    "input_format": "what data the user needs to provide",
    "output_format": "what the tool produces",
    "key_features": ["feature 1", "feature 2", "feature 3"],
    "time_saved": "estimated time saved per use vs manual work"
}}

Return ONLY valid JSON."""

    analysis_response = model.generate_content(analysis_prompt)
    try:
        analysis = json.loads(
            analysis_response.text.strip().strip("```json").strip("```")
        )
    except json.JSONDecodeError:
        analysis = {"tool_name": "Custom AI Tool", "key_features": []}

    # Step 2: Generate the actual tool output using the sample input
    tool_prompt = f"""You are an AI tool called "{analysis.get('tool_name', 'AI Tool')}".
Your job: {analysis.get('solution_approach', main_problem)}

The user has provided this input:
{sample_input}

Now produce a complete, professional output that solves their problem.
Be thorough, specific, and actionable. Format the output clearly with
headings and sections. This should look like a professional deliverable
they can use immediately."""

    tool_response = model.generate_content(tool_prompt)

    return analysis, tool_response.text

# ---- Example: Build a tool for a small hotel ----

print("=" * 65)
print("  MINI PROJECT: AI Business Tool Builder")
print("=" * 65)

analysis, output = design_business_tool(
    industry="Boutique Hotel / Hospitality",
    main_problem="We spend 2 hours every day responding to booking inquiries, "
                 "writing guest welcome emails, and creating personalized "
                 "activity recommendations for guests based on their preferences.",
    sample_input="""
    Guest: Sarah and Tom Johnson
    Check-in: March 15, 2025
    Check-out: March 20, 2025 (5 nights)
    Room: Deluxe Ocean Suite
    Occasion: Wedding anniversary
    Preferences: They enjoy wine tasting, hiking, local cuisine,
    and spa treatments. They have mentioned they prefer quiet
    restaurants over loud ones. First time visiting the area.
    Special requests: Late check-out if possible, champagne on arrival.
    """
)

print("\n--- TOOL ANALYSIS ---")
print(f"Tool Name: {analysis.get('tool_name', 'N/A')}")
print(f"Problem: {analysis.get('problem_statement', 'N/A')}")
print(f"Solution: {analysis.get('solution_approach', 'N/A')}")
print(f"Time Saved: {analysis.get('time_saved', 'N/A')}")
print(f"Key Features:")
for feature in analysis.get('key_features', []):
    print(f"  - {feature}")

print("\n--- TOOL OUTPUT ---")
print(output)
```

### Expected Output:

```
=================================================================
  MINI PROJECT: AI Business Tool Builder
=================================================================

--- TOOL ANALYSIS ---
Tool Name: GuestGenius — Personalized Hospitality AI
Problem: Hotel staff spend 2+ hours daily on repetitive guest communications
Solution: AI analyzes guest profiles and preferences to auto-generate
personalized welcome emails, activity itineraries, and booking responses
Time Saved: ~90 minutes per guest interaction (from 2 hours to ~30 min review)
Key Features:
  - Personalized welcome emails with guest name and occasion
  - Custom activity itineraries based on stated preferences
  - Smart restaurant recommendations matching guest style

--- TOOL OUTPUT ---

# Welcome Package for Sarah & Tom Johnson
## Anniversary Celebration — March 15-20, 2025

### Welcome Email Draft

Dear Sarah and Tom,

Happy anniversary! We are absolutely delighted to welcome you to
[Hotel Name] for this special celebration. Your Deluxe Ocean Suite
is being prepared with extra care, and a bottle of champagne will
be chilled and waiting for your arrival.

We have also prepared a personalized itinerary based on your interests...

### Personalized 5-Day Itinerary

**Day 1 (March 15) — Arrival & Celebration**
- Late afternoon check-in to your Ocean Suite
- Champagne and chocolate-covered strawberries waiting
- Evening: Quiet anniversary dinner at La Terrazza (intimate
  Italian restaurant, ocean views, excellent wine list)
  Reservation: 7:30 PM for 2, window table requested

**Day 2 (March 16) — Wine & Wellness**
- Morning: Couples spa treatment (hot stone massage, 90 min)
- Afternoon: Private wine tasting tour at Valley View Vineyard
  (boutique winery, known for Pinot Noir, quiet tasting room)
- Evening: Chef's tasting menu at The Olive Garden (local cuisine)
...
```

## ✍️ Hands-On Exercises

### Exercise 1: Your Industry Tool
Think about your own job or a business you know well. What repetitive task takes the most time? Build a tool using the business_tool_builder pattern. Define your industry, the problem, and provide real sample input. Evaluate whether the output is good enough to use in practice.

**Hint:** The more specific and detailed your sample input is, the better the output will be. Include real data, real names, real constraints — just change any sensitive information.

### Exercise 2: Industry Comparison
Pick two very different industries (e.g., healthcare and retail). For each one, create a simple AI assistant function that solves one common problem. Compare how different the prompts need to be for different industries, even though the underlying code structure is the same.

**Hint:** Focus on how the system context (who the AI pretends to be) and domain knowledge (industry-specific rules and vocabulary) change between industries, while the code pattern stays identical.

## 🔗 Next Steps

Congratulations on completing Phase 7! You have learned how to apply Gemini to real business problems across customer service, social media, SEO, data analysis, and multiple industries. In Phase 8, you will dive into advanced development topics — function calling, RAG systems, Vertex AI, mobile apps, and building multimodal agents.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1"><p>1. What is the "Context-Prompt Pattern" used for?</p><label><input type="radio" name="q1" value="0"> A. A way to organize your code files in folders</label><label><input type="radio" name="q1" value="1"> B. A structured approach to giving Gemini industry-specific instructions for better results</label><label><input type="radio" name="q1" value="2"> C. A Google Cloud billing configuration</label><label><input type="radio" name="q1" value="3"> D. A method for encrypting sensitive business data</label><div class="quiz-explain">The Context-Prompt Pattern structures your prompt into four parts — system context, domain knowledge, specific task, and output format — to give Gemini the industry-specific information it needs for high-quality results.</div></div>

<div class="quiz-q" data-answer="3"><p>2. Why do industry-specific prompts produce better results than generic ones?</p><label><input type="radio" name="q2" value="0"> A. They use more advanced API features</label><label><input type="radio" name="q2" value="1"> B. They cost more tokens, so Gemini tries harder</label><label><input type="radio" name="q2" value="2"> C. They are written in technical language that Gemini prefers</label><label><input type="radio" name="q2" value="3"> D. They give Gemini the same context a human expert would have, leading to more relevant output</label><div class="quiz-explain">Just like a human writer produces better work with a detailed brief, Gemini generates more relevant, accurate, and useful content when given specific context about the industry, audience, and requirements.</div></div>

<div class="quiz-q" data-answer="0"><p>3. In the real estate example, what makes a good property listing opening?</p><label><input type="radio" name="q3" value="0"> A. Leading with the strongest selling point and painting a lifestyle picture</label><label><input type="radio" name="q3" value="1"> B. Starting with the exact square footage and price</label><label><input type="radio" name="q3" value="2"> C. Listing all technical specifications first</label><label><input type="radio" name="q3" value="3"> D. Starting with the history of the building</label><div class="quiz-explain">Great property listings open with the most compelling feature — often a lifestyle benefit like "Wake up to ocean views" — because buyers connect emotionally before they look at specifications.</div></div>

<div class="quiz-q" data-answer="2"><p>4. When responding to a negative restaurant review, what should you always include?</p><label><input type="radio" name="q4" value="0"> A. A discount code to buy their forgiveness</label><label><input type="radio" name="q4" value="1"> B. An explanation of why the problem was the customer's fault</label><label><input type="radio" name="q4" value="2"> C. An acknowledgment of the specific issue, an apology, and an invitation to return</label><label><input type="radio" name="q4" value="3"> D. A request to delete the review</label><div class="quiz-explain">Professional review responses acknowledge the specific complaint (showing you read it), apologize sincerely, explain what you are doing about it, and invite the customer back. This shows other readers that you care about customer experience.</div></div>

<div class="quiz-q" data-answer="1"><p>5. What is the analogy used for Gemini's adaptability to different industries?</p><label><input type="radio" name="q5" value="0"> A. A Swiss army knife with many blades</label><label><input type="radio" name="q5" value="1"> B. A brilliant new employee who needs a detailed briefing about your business</label><label><input type="radio" name="q5" value="2"> C. A self-driving car that navigates any road</label><label><input type="radio" name="q5" value="3"> D. A universal translator that speaks all languages</label><div class="quiz-explain">Gemini is compared to a brilliant new employee who is smart and capable but needs you to provide the industry context, company details, and specific requirements before they can produce great work.</div></div>

<div class="quiz-q" data-answer="0"><p>6. In the education example, why does the prompt specify "age-appropriate and engaging"?</p><label><input type="radio" name="q6" value="0"> A. Because materials must match the students' comprehension level and hold their attention</label><label><input type="radio" name="q6" value="1"> B. Because Gemini only generates content for children by default</label><label><input type="radio" name="q6" value="2"> C. Because educational content must follow a legal regulation</label><label><input type="radio" name="q6" value="3"> D. Because the API requires this phrase to work correctly</label><div class="quiz-explain">Educational content must match the target age group. A Grade 5 lesson should use language and examples that 10-11 year olds can understand and find interesting. Without this instruction, the AI might produce content that is too advanced or too boring.</div></div>

<div class="quiz-q" data-answer="3"><p>7. What is the estimated time savings of the hotel AI tool in the mini project?</p><label><input type="radio" name="q7" value="0"> A. 10 minutes per guest</label><label><input type="radio" name="q7" value="1"> B. 30 minutes per day total</label><label><input type="radio" name="q7" value="2"> C. No time saved — it is the same speed as manual work</label><label><input type="radio" name="q7" value="3"> D. About 90 minutes per guest interaction</label><div class="quiz-explain">The tool analysis estimated reducing guest communication time from about 2 hours to about 30 minutes of review, saving roughly 90 minutes per guest interaction — time that can be spent on other hospitality tasks.</div></div>

<div class="quiz-q" data-answer="2"><p>8. What stays the same when building AI tools for different industries?</p><label><input type="radio" name="q8" value="0"> A. The prompt content and industry terminology</label><label><input type="radio" name="q8" value="1"> B. The sample data and expected output format</label><label><input type="radio" name="q8" value="2"> C. The code structure and pattern — only the prompt content changes</label><label><input type="radio" name="q8" value="3"> D. Nothing — every industry needs completely different code</label><div class="quiz-explain">The underlying code pattern (set up model, build prompt, call API, process response) is identical across industries. What changes is the content of the prompt — the context, domain knowledge, and task description. This is the power of the Context-Prompt Pattern.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
