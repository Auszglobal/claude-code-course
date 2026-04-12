# Module 2.1: Prompting Techniques — Getting the Best Out of Gemini

## 🎯 Learning Objectives
- Understand what System Instructions are and how to use them effectively
- Master few-shot prompting (teaching Gemini by example)
- Use chain-of-thought prompting to get better reasoning
- Control Gemini's output using temperature and other parameters
- Write prompts that consistently produce high-quality results

## 📖 Theory

### Why Prompting Matters

Imagine you asked someone "Make me food." You might get a sandwich, a five-course meal, or a bowl of cereal. But if you said "Make me a grilled cheese sandwich with cheddar on sourdough bread, golden brown on both sides" — you would get exactly what you wanted.

**Prompting** is the skill of communicating clearly with AI. The better your prompt, the better the response. This is not about "tricking" the AI — it is about being a clear communicator.

The good news? Once you learn a few simple techniques, you will see dramatic improvements in Gemini's responses. Let us learn the four most important ones.

### Technique 1: System Instructions

We touched on System Instructions in Module 1.2, but let us go deeper. System Instructions are the **foundation** of every great Gemini interaction.

Think of System Instructions as a **job contract**. Before an employee starts work, you give them:
- Their role ("You are a customer service representative")
- Rules to follow ("Always be polite, keep answers under 100 words")
- Things to avoid ("Never discuss competitor products")
- How to handle edge cases ("If you do not know, say 'Let me find out for you'")

System Instructions work the same way for Gemini.

### Technique 2: Few-Shot Prompting

"Few-shot" means giving Gemini a few examples of what you want before asking it to do the real task. Humans learn this way too — if I show you three examples of haiku poems and then ask you to write one, you will do much better than if I just said "write a haiku."

### Technique 3: Chain of Thought

"Chain of thought" means asking Gemini to show its reasoning step by step, rather than jumping straight to the answer. This is like asking a math student to "show their work" — it leads to more accurate and reliable results.

### Technique 4: Temperature and Parameters

Temperature controls the "creativity dial" of Gemini:
- **Temperature 0.0**: Very focused, deterministic. Same prompt gives similar answers each time. Good for factual questions, code, math.
- **Temperature 1.0**: Balanced creativity. Good default for most tasks.
- **Temperature 2.0**: Very creative and unpredictable. Good for brainstorming, creative writing, generating varied ideas.

Other important parameters:
- **Max Output Tokens**: Limits how long the response can be.
- **Top-P**: Another way to control randomness (usually leave at default).
- **Top-K**: Limits the word choices Gemini considers (usually leave at default).
- **Stop Sequences**: Words or phrases that tell Gemini to stop generating.

## 💻 Code Example 1: Few-Shot Prompting in Practice

Let us see the dramatic difference few-shot prompting makes.

```python
# few_shot_demo.py
# Demonstrating the power of few-shot prompting

import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY_HERE")
model = genai.GenerativeModel("gemini-2.0-flash")

# --- WITHOUT few-shot (zero-shot) ---
print("=== Without Examples (Zero-Shot) ===")
zero_shot_prompt = "Convert this product review to structured data: 'The laptop is amazing! Great battery life but the keyboard is a bit small. Paid $999.'"

response = model.generate_content(zero_shot_prompt)
print(response.text)
print()

# --- WITH few-shot (giving examples first) ---
print("=== With Examples (Few-Shot) ===")
few_shot_prompt = """Convert product reviews to structured data. Follow this exact format:

Example 1:
Review: "Love this phone! Camera is incredible, but it gets hot during gaming. Cost me $799."
Output:
- Product: Phone
- Sentiment: Positive
- Pros: Incredible camera
- Cons: Gets hot during gaming
- Price: $799
- Rating: 4/5

Example 2:
Review: "Terrible headphones. Sound quality is okay but they broke after 2 weeks. Waste of $50."
Output:
- Product: Headphones
- Sentiment: Negative
- Pros: Okay sound quality
- Cons: Broke after 2 weeks
- Price: $50
- Rating: 1/5

Now convert this review:
Review: "The laptop is amazing! Great battery life but the keyboard is a bit small. Paid $999."
Output:"""

response = model.generate_content(few_shot_prompt)
print(response.text)
```

### Expected Output:

```
=== Without Examples (Zero-Shot) ===
Here's the structured data from the review:

Product: Laptop
Overall sentiment: Positive
Battery life: Excellent
Keyboard: Small (negative point)
Price: $999

=== With Examples (Few-Shot) ===
- Product: Laptop
- Sentiment: Positive
- Pros: Great battery life
- Cons: Keyboard is a bit small
- Price: $999
- Rating: 4/5
```

Notice the difference! The zero-shot response is unstructured and inconsistent. The few-shot response follows the exact format you showed it. When you need consistent, structured output, few-shot prompting is your best tool.

## 💻 Code Example 2: Chain of Thought + System Instructions

```python
# chain_of_thought.py
# Using System Instructions and chain-of-thought for better reasoning

import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY_HERE")

# --- System Instructions to set the behavior ---
system_instruction = """You are a logical problem-solving assistant.

Rules:
1. Always think step by step before giving a final answer
2. Show your reasoning process clearly
3. Label each step with "Step 1:", "Step 2:", etc.
4. After all steps, give a clear "Final Answer:" line
5. If a problem is ambiguous, state your assumptions"""

# Create model WITH System Instructions
model = genai.GenerativeModel(
    "gemini-2.0-flash",
    system_instruction=system_instruction  # This sets the job contract!
)

# --- Chain-of-Thought Prompt ---
prompt = """A store sells apples for $2 each. If you buy 5 or more, you get a 20% discount
on the total. Tax is 8%. How much do you pay for 7 apples?"""

print("=== Chain-of-Thought with System Instructions ===")
response = model.generate_content(prompt)
print(response.text)
print()

# --- Compare: Same problem WITHOUT chain-of-thought ---
simple_model = genai.GenerativeModel("gemini-2.0-flash")
simple_prompt = "7 apples at $2 each, 20% discount for 5+, 8% tax. Total?"

print("=== Without Chain-of-Thought ===")
response2 = simple_model.generate_content(simple_prompt)
print(response2.text)
```

### Expected Output:

```
=== Chain-of-Thought with System Instructions ===
Step 1: Calculate the base price
7 apples × $2 each = $14.00

Step 2: Check if the discount applies
We are buying 7 apples, which is more than 5, so the 20% discount applies.

Step 3: Apply the 20% discount
20% of $14.00 = $2.80
$14.00 - $2.80 = $11.20

Step 4: Calculate the 8% tax
8% of $11.20 = $0.896, rounded to $0.90

Step 5: Calculate the final total
$11.20 + $0.90 = $12.10

Final Answer: You pay $12.10 for 7 apples.

=== Without Chain-of-Thought ===
$12.10
```

Both get the right answer, but the chain-of-thought version shows its work. This matters because:
1. You can verify each step is correct
2. If there is an error, you can see exactly where it went wrong
3. For harder problems, chain-of-thought is significantly more accurate

### Controlling Temperature

```python
# temperature_demo.py
# See how temperature affects creativity

import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY_HERE")

prompt = "Write a one-sentence description of a sunset."

# Low temperature — focused and predictable
model_low = genai.GenerativeModel(
    "gemini-2.0-flash",
    generation_config=genai.GenerationConfig(temperature=0.1)
)

# High temperature — creative and varied
model_high = genai.GenerativeModel(
    "gemini-2.0-flash",
    generation_config=genai.GenerationConfig(temperature=1.8)
)

print("=== Low Temperature (0.1) — Focused ===")
for i in range(3):
    response = model_low.generate_content(prompt)
    print(f"  Run {i+1}: {response.text.strip()}")

print()
print("=== High Temperature (1.8) — Creative ===")
for i in range(3):
    response = model_high.generate_content(prompt)
    print(f"  Run {i+1}: {response.text.strip()}")
```

### Expected Output:
```
=== Low Temperature (0.1) — Focused ===
  Run 1: The sun dipped below the horizon, painting the sky in shades of orange and pink.
  Run 2: The sun dipped below the horizon, painting the sky in warm shades of orange and pink.
  Run 3: The sun dipped below the horizon, casting warm shades of orange and pink across the sky.

=== High Temperature (1.8) — Creative ===
  Run 1: The horizon swallowed the sun like a golden coin dropped into a velvet purse.
  Run 2: Crimson fire bled across the clouds as day exhaled its final, shimmering breath.
  Run 3: The sky became an artist's abandoned palette, smeared with reckless beauty.
```

See the pattern? Low temperature gives similar results each time. High temperature gives wildly different, more creative results.

## ✍️ Hands-On Exercises

### Exercise 1: Build a Consistent Formatter
Create a few-shot prompt that converts informal meeting notes into professional summaries. Give Gemini 2 examples, then have it convert a third set of notes.

Example informal notes you might use:
> "Met with Sarah about Q3 targets. She wants to increase sales by 15%. Need to hire 2 more people. Budget approved. Follow up next Tuesday."

Your few-shot examples should show Gemini the exact format you want (maybe with headers like "Date:", "Attendees:", "Key Decisions:", "Action Items:").

**Tip**: The more detailed and consistent your examples are, the more reliable the output will be. Two good examples are usually enough, but three is even better.

### Exercise 2: Temperature Experiment
Write a script that asks Gemini the same question at five different temperatures (0.0, 0.5, 1.0, 1.5, 2.0). Use a creative prompt like "Invent a name for a new ice cream flavor and describe it."

Run each temperature twice and take notes:
- At what temperature do the results start getting really creative?
- At what temperature do the results start getting weird or nonsensical?
- Which temperature gives your favorite results?

**Tip**: The "sweet spot" for most creative tasks is between 0.7 and 1.2. Below that is too predictable; above that can get chaotic.

## 🔗 Next Steps

You now have four powerful prompting techniques in your toolkit. In **Module 2.2**, we will apply these skills to a real-world tool: **Gemini Code Assist** in VS Code. You will learn how to get AI-powered coding help directly in your code editor — autocomplete, explanations, and more.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is "few-shot prompting"?</p>
<label><input type="radio" name="q1" value="0"> Giving Gemini a very short prompt</label>
<label><input type="radio" name="q1" value="1"> Providing Gemini with examples of the desired output before the real task</label>
<label><input type="radio" name="q1" value="2"> Asking Gemini to respond in fewer words</label>
<label><input type="radio" name="q1" value="3"> Running the same prompt multiple times</label>
<div class="quiz-explain">Few-shot prompting means giving Gemini a few examples of what you want (input-output pairs) before asking it to perform the real task. This teaches Gemini the exact format and style you expect.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>2. What does a temperature of 0.0 produce?</p>
<label><input type="radio" name="q2" value="0"> Very focused, consistent responses — similar output each time</label>
<label><input type="radio" name="q2" value="1"> Very creative, unpredictable responses</label>
<label><input type="radio" name="q2" value="2"> No response at all</label>
<label><input type="radio" name="q2" value="3"> Error messages</label>
<div class="quiz-explain">Temperature 0.0 (or close to it) makes Gemini very deterministic and focused. It picks the most likely words each time, resulting in consistent, predictable responses. This is ideal for factual questions, math, and code.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>3. What is "chain-of-thought" prompting?</p>
<label><input type="radio" name="q3" value="0"> Asking multiple unrelated questions in one prompt</label>
<label><input type="radio" name="q3" value="1"> Connecting multiple Gemini models together</label>
<label><input type="radio" name="q3" value="2"> Asking Gemini to show its reasoning step by step before the final answer</label>
<label><input type="radio" name="q3" value="3"> Chaining API calls one after another</label>
<div class="quiz-explain">Chain-of-thought prompting asks Gemini to think step by step and show its reasoning before reaching a conclusion. This leads to more accurate results, especially for math, logic, and complex reasoning tasks.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. Where do System Instructions go?</p>
<label><input type="radio" name="q4" value="0"> At the end of your prompt</label>
<label><input type="radio" name="q4" value="1"> In a separate file on your computer</label>
<label><input type="radio" name="q4" value="2"> In the response from Gemini</label>
<label><input type="radio" name="q4" value="3"> In a special field BEFORE the conversation, defining rules for all responses</label>
<div class="quiz-explain">System Instructions are set before the conversation begins, in a dedicated field (in AI Studio) or parameter (in code). They define rules, personality, and constraints that Gemini follows for every response in that session.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. You want Gemini to generate creative story ideas. What temperature should you use?</p>
<label><input type="radio" name="q5" value="0"> 0.0 — for maximum accuracy</label>
<label><input type="radio" name="q5" value="1"> 1.0 to 1.5 — for a balance of creativity and coherence</label>
<label><input type="radio" name="q5" value="2"> It does not matter — temperature has no effect on creativity</label>
<label><input type="radio" name="q5" value="3"> -1.0 — negative temperatures boost creativity</label>
<div class="quiz-explain">For creative tasks like generating story ideas, a temperature between 1.0 and 1.5 gives a good balance of creativity and coherence. Going too high (1.8+) can produce nonsensical output.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>6. How many examples do you typically need for effective few-shot prompting?</p>
<label><input type="radio" name="q6" value="0"> 2-3 clear, consistent examples are usually enough</label>
<label><input type="radio" name="q6" value="1"> At least 100 examples for the AI to learn</label>
<label><input type="radio" name="q6" value="2"> Exactly 1 example is always sufficient</label>
<label><input type="radio" name="q6" value="3"> You need to train a new model from scratch</label>
<div class="quiz-explain">Two to three clear, well-formatted examples are usually enough for Gemini to understand the pattern you want. The key is that the examples should be consistent in format and demonstrate exactly what you expect.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>7. What is the advantage of chain-of-thought prompting for math problems?</p>
<label><input type="radio" name="q7" value="0"> It makes the AI calculate faster</label>
<label><input type="radio" name="q7" value="1"> It reduces the number of tokens used</label>
<label><input type="radio" name="q7" value="2"> You can verify each step and catch errors — and the AI is more accurate</label>
<label><input type="radio" name="q7" value="3"> It is only useful for simple addition problems</label>
<div class="quiz-explain">Chain-of-thought prompting forces the AI to show its work step by step. This makes the AI more accurate (reasoning step by step reduces errors) and lets you verify each step to catch any mistakes.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>8. Which parameter controls the maximum length of Gemini's response?</p>
<label><input type="radio" name="q8" value="0"> Temperature</label>
<label><input type="radio" name="q8" value="1"> Max Output Tokens</label>
<label><input type="radio" name="q8" value="2"> Top-K</label>
<label><input type="radio" name="q8" value="3"> Stop Sequences</label>
<div class="quiz-explain">Max Output Tokens directly controls the maximum length of Gemini's response. If set to 100 tokens (roughly 75 words), Gemini will stop generating after reaching that limit, even if it has more to say.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
