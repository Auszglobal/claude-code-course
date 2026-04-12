# Module 1.2: Google AI Studio — Your Free AI Playground

## 🎯 Learning Objectives
- Understand what Google AI Studio is and why it is useful
- Create a Google account (if you do not have one) and access AI Studio
- Navigate the AI Studio interface confidently
- Write and send your first prompt in AI Studio
- Use System Instructions to control how Gemini behaves

## 📖 Theory

### What is Google AI Studio?

If the Gemini app (gemini.google.com) is like texting a smart friend, then **Google AI Studio** is like having a full control panel for that friend's brain.

**Google AI Studio** is a free, web-based tool from Google that lets you:
- Test different Gemini models side by side
- Adjust settings like creativity and response length
- Write System Instructions (rules that Gemini follows for every response)
- Upload files, images, and documents for Gemini to analyze
- Get an API key (which you will need later to build your own apps)

Think of it like this: the Gemini app is the **steering wheel** — simple and easy. AI Studio is the **full dashboard** with speedometer, fuel gauge, GPS, and all the controls. Same car, but now you can see and adjust everything.

### Why Use AI Studio Instead of the Gemini App?

| Gemini App | AI Studio |
|-----------|-----------|
| Simple chat interface | Full control panel |
| One model at a time | Compare models side by side |
| Limited settings | Temperature, token limits, safety settings |
| No API access | Generate API keys |
| Great for quick questions | Great for building and testing |

For learning and experimentation, AI Studio is your best friend. It is completely free and does not require a credit card.

### What Are System Instructions?

Imagine you are hiring someone for a job. Before they start working, you give them a job description: "You are a friendly customer service agent. Always be polite. Keep answers short. If you do not know something, say so."

**System Instructions** work the same way. They are rules you give Gemini *before* the conversation starts. Gemini will follow these rules for every response in that session.

Examples:
- "You are a patient math tutor. Explain everything step by step."
- "You are a professional email writer. Keep all emails under 100 words."
- "You are a Spanish language teacher. Correct my grammar and explain mistakes."

System Instructions are one of the most powerful features in AI Studio — they transform Gemini from a general-purpose assistant into a specialized tool.

## 💻 Code Example 1: Your First Prompt in AI Studio

No code needed for this one — just your web browser!

```
Step 1: Open your browser and go to https://aistudio.google.com

Step 2: Sign in with your Google account
        - If you do not have one, click "Create account" (it is free)
        - Any Gmail address works perfectly

Step 3: You will see the AI Studio home page. Look for "Create new prompt"
        or the main text area.

Step 4: You should see a large text area. This is where you type your prompt.
        Type the following:

        "I am brand new to AI. Explain in 3 simple sentences what a
         'language model' is. Use an analogy a child would understand."

Step 5: Click the "Run" button (or press Ctrl+Enter / Cmd+Enter)

Step 6: Watch the response appear on the right side of the screen!
```

### Expected Output:

📸 [What you should see on screen]
```
┌─────────────────────────────────────────────────────────┐
│  Google AI Studio                                       │
│                                                         │
│  Model: Gemini Pro           Temperature: 1.0           │
│                                                         │
│  ┌─ Your Prompt ──────────────────────────────────┐     │
│  │ I am brand new to AI. Explain in 3 simple      │     │
│  │ sentences what a 'language model' is...         │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─ Response ─────────────────────────────────────┐     │
│  │ Imagine a really smart parrot that has read     │     │
│  │ every book in the world. When you ask it a      │     │
│  │ question, it figures out the best words to      │     │
│  │ string together based on everything it has      │     │
│  │ read. That's basically what a language model    │     │
│  │ does — it predicts the most helpful next        │     │
│  │ words based on patterns it learned!             │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

Your exact response will be different — and that is perfectly normal! AI responses vary each time.

## 💻 Code Example 2: Using System Instructions

Now let us unlock the real power of AI Studio — System Instructions.

```
Step 1: In AI Studio, look for "System Instructions" — it is usually a text
        box above or beside the main prompt area. (It may say "System
        instructions (optional)" — click to expand it.)

Step 2: In the System Instructions box, type:

        "You are a pirate captain named Captain Gemini. You speak in pirate
         language. You are helpful but always stay in character. End every
         response with a pirate catchphrase."

Step 3: Now in the main prompt area, type:

        "What is the weather usually like in London?"

Step 4: Click "Run" and enjoy the response!

Step 5: Try a follow-up prompt:

        "How do I bake chocolate chip cookies?"

        Notice how Gemini stays in character for EVERY response!
```

### Expected Output:

Something like:
> "Arrr, ye be askin' about London, eh? Well, matey, that landlubber city be known fer its grey skies and rainy days, it be! Ye'll want yer raincoat more often than yer sunhat, I tell ye. The temperatures be mild — not too hot, not too cold — perfect fer sailin' the Thames! Now hoist the mainsail and set course fer adventure! Yo ho ho! 🏴‍☠️"

The key insight: the System Instructions changed how Gemini responds to *everything*, not just one question. This is incredibly useful for building specialized assistants.

### Exploring the Interface

Here is a quick tour of the important elements in AI Studio:

```
┌─────────────────────────────────────────────────────────────┐
│  [1] Model Selector     — Choose Flash, Pro, or Ultra       │
│  [2] System Instructions — Set the AI's personality/rules   │
│  [3] Prompt Area        — Where you type your questions      │
│  [4] Run Button         — Send your prompt to Gemini        │
│  [5] Response Panel     — Where the answer appears           │
│  [6] Settings Panel     — Temperature, max tokens, etc.     │
│  [7] Get API Key        — Generate a key for code projects  │
│  [8] Save/Load          — Save your prompts as projects     │
└─────────────────────────────────────────────────────────────┘
```

Key settings to know about (right panel):
- **Temperature** (0.0 to 2.0): Controls creativity. Low = focused and consistent. High = creative and varied. Think of it like a "creativity dial."
- **Max Output Tokens**: How long the response can be. More tokens = longer answers.
- **Safety Settings**: Controls what content Gemini will and will not generate.

## ✍️ Hands-On Exercises

### Exercise 1: Build a Study Buddy
Use System Instructions to create a study helper:

1. Set the System Instructions to: "You are a patient study buddy. When someone asks a question, first check if they understand the basics. If they seem confused, start from the fundamentals. Use bullet points and simple language. After explaining, ask a follow-up question to check understanding."
2. Ask it: "Can you help me understand how the internet works?"
3. Follow up based on its questions — have a real back-and-forth conversation!

**Tip**: The System Instructions shape the entire conversation. Try changing them and notice how dramatically different the responses become.

### Exercise 2: Compare Models
This is one of AI Studio's superpowers — testing different models:

1. Open a prompt and select **Gemini Flash** from the model dropdown
2. Ask: "Write a short story about a robot who discovers music for the first time. Keep it under 200 words."
3. Copy the response somewhere (a text file or notepad)
4. Change the model to **Gemini Pro** and run the exact same prompt
5. Compare both stories — which one is more creative? More detailed?

**Tip**: Flash is faster but Pro often produces richer, more nuanced content. Neither is "better" — they are designed for different use cases.

## 🔗 Next Steps

You now know how to use Google AI Studio — the control center for Gemini. In **Module 1.3**, we will take the next big step: getting an **API key** and making your first **programmatic call** to Gemini. This is where you go from clicking buttons to writing code that talks to AI automatically. Do not worry — we will go step by step!

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2">
<p>1. What is Google AI Studio?</p>
<label><input type="radio" name="q1" value="0"> A paid software you install on your computer</label>
<label><input type="radio" name="q1" value="1"> A mobile app for Android phones only</label>
<label><input type="radio" name="q1" value="2"> A free web-based tool for testing and configuring Gemini models</label>
<label><input type="radio" name="q1" value="3"> A video game made by Google</label>
<div class="quiz-explain">Google AI Studio is a free, web-based tool that gives you advanced control over Gemini models, including settings, system instructions, and API key generation.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. What are System Instructions?</p>
<label><input type="radio" name="q2" value="0"> Error messages from the system</label>
<label><input type="radio" name="q2" value="1"> Rules you set before a conversation that Gemini follows for every response</label>
<label><input type="radio" name="q2" value="2"> Instructions for installing software</label>
<label><input type="radio" name="q2" value="3"> A programming language</label>
<div class="quiz-explain">System Instructions are rules or a personality you define before the conversation begins. Gemini follows these instructions for every response in that session — like giving an employee a job description before they start work.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>3. What does the Temperature setting control?</p>
<label><input type="radio" name="q3" value="0"> How creative or varied the responses are</label>
<label><input type="radio" name="q3" value="1"> How fast the AI responds</label>
<label><input type="radio" name="q3" value="2"> The color theme of the interface</label>
<label><input type="radio" name="q3" value="3"> The physical temperature of Google's servers</label>
<div class="quiz-explain">Temperature controls the creativity and randomness of responses. A low temperature (like 0.2) produces focused, consistent answers. A high temperature (like 1.5) produces more creative and varied responses.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. Do you need a credit card to use Google AI Studio?</p>
<label><input type="radio" name="q4" value="0"> Yes, it costs $20/month</label>
<label><input type="radio" name="q4" value="1"> Yes, but only for the first month</label>
<label><input type="radio" name="q4" value="2"> Yes, you need to enter payment details to register</label>
<label><input type="radio" name="q4" value="3"> No, it is completely free with a Google account</label>
<div class="quiz-explain">Google AI Studio is completely free. You only need a Google account (like Gmail) to access it. No credit card or payment information is required.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>5. What is the difference between AI Studio and the Gemini app (gemini.google.com)?</p>
<label><input type="radio" name="q5" value="0"> They are exactly the same thing</label>
<label><input type="radio" name="q5" value="1"> AI Studio gives you more control — model selection, system instructions, settings, and API keys</label>
<label><input type="radio" name="q5" value="2"> The Gemini app has more features than AI Studio</label>
<label><input type="radio" name="q5" value="3"> AI Studio only works on Google Chrome</label>
<div class="quiz-explain">AI Studio is the full control panel — it lets you choose models, set system instructions, adjust temperature and other settings, and generate API keys. The Gemini app is simpler and designed for quick conversations.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. You want Gemini to always respond as a friendly math tutor. Where do you put this instruction?</p>
<label><input type="radio" name="q6" value="0"> In the main prompt area with your math question</label>
<label><input type="radio" name="q6" value="1"> In the Temperature setting</label>
<label><input type="radio" name="q6" value="2"> In the System Instructions box</label>
<label><input type="radio" name="q6" value="3"> In the model selector dropdown</label>
<div class="quiz-explain">System Instructions are the right place for defining a persistent role or personality. Anything you put there applies to every response in the conversation, making it perfect for turning Gemini into a specialized tutor.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>7. What does "Max Output Tokens" control?</p>
<label><input type="radio" name="q7" value="0"> The maximum length of Gemini's response</label>
<label><input type="radio" name="q7" value="1"> The maximum number of questions you can ask</label>
<label><input type="radio" name="q7" value="2"> The number of images you can upload</label>
<label><input type="radio" name="q7" value="3"> How many users can access the tool at once</label>
<div class="quiz-explain">Max Output Tokens sets a limit on how long Gemini's response can be. More tokens allow for longer, more detailed answers. Fewer tokens result in shorter, more concise responses.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>8. You run the same prompt twice in AI Studio and get slightly different responses. Why?</p>
<label><input type="radio" name="q8" value="0"> The AI is broken</label>
<label><input type="radio" name="q8" value="1"> Your internet connection changed the result</label>
<label><input type="radio" name="q8" value="2"> This is normal — AI responses have natural variation, controlled by the Temperature setting</label>
<label><input type="radio" name="q8" value="3"> Someone else is using the same account</label>
<div class="quiz-explain">It is completely normal for AI responses to vary between runs. The Temperature setting controls how much variation occurs. At Temperature 0, responses are more consistent. At higher temperatures, there is more randomness and creativity.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
