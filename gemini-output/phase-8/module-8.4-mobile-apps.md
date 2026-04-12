# Module 8.4: Gemini on Mobile — Building AI-Powered Apps

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Understand how Gemini works on mobile devices (Android and iOS)
- Know the difference between on-device AI (Gemini Nano) and cloud-based AI
- Set up Flutter with the Gemini API for cross-platform mobile development
- Build a simple AI chat assistant for mobile
- Decide when to use on-device processing vs. cloud processing
- Design a mobile-first AI experience

## 📖 Theory

### AI in Your Pocket

Your smartphone is already full of AI — autocorrect predicts your next word, your camera enhances photos automatically, and voice assistants respond to your commands. But until recently, most of this AI was limited and pre-programmed.

With Gemini, you can build mobile apps that have a genuine conversation, understand images you photograph, summarize long documents, and create content — all from a phone. This opens up entirely new kinds of apps.

### Two Ways to Run Gemini on Mobile

There are two fundamentally different approaches, like two different ways to get food:

**1. Cloud-Based (The Restaurant)**
Your app sends the user's question to Google's servers over the internet. Google's powerful computers run Gemini, generate the answer, and send it back to your phone.

- **Pros:** Full Gemini power, access to the latest model, handles complex tasks
- **Cons:** Requires internet connection, has latency (takes a moment), costs money per request
- **Best for:** Complex questions, long content generation, image analysis, tasks needing the most capable model

**2. On-Device with Gemini Nano (Home Cooking)**
A smaller version of Gemini called **Gemini Nano** runs directly on the phone's chip. No internet needed. No data leaves the device.

- **Pros:** Works offline, instant responses, complete privacy (data never leaves the phone), free (no API costs)
- **Cons:** Less capable than the full model, limited to specific tasks, only available on certain devices (Pixel 8+, Samsung Galaxy S24+)
- **Best for:** Quick text suggestions, summarization, smart reply, simple classification tasks

### What Is Flutter?

**Flutter** is Google's toolkit for building apps that run on both Android and iOS from a single codebase. Think of it like writing one recipe that works in both an oven and a microwave — you write the code once and it runs on both platforms.

For our purposes, Flutter is the easiest way to build a cross-platform mobile app that uses the Gemini API. You do not need to learn separate programming languages for Android (Kotlin) and iOS (Swift).

### Designing Mobile AI Experiences

Mobile AI apps are different from desktop apps. Here are key principles:

**1. Speed matters more than perfection.** Mobile users are impatient. Show a loading indicator. Stream responses word by word if possible. Make the app feel responsive.

**2. Typing is hard on phones.** Offer quick-reply buttons, voice input, and suggested prompts. Do not make users type long instructions.

**3. Context is limited.** Phone screens are small. Keep AI responses concise. Offer "expand" options for users who want more detail.

**4. Offline matters.** People use phones on subways, in elevators, and in areas with poor signal. Consider what your app can do without internet.

**5. Battery and data usage.** Heavy API calls drain battery and use mobile data. Cache responses when possible and avoid unnecessary API calls.

## 💻 Code Example 1: Mobile AI Chat with Flutter and Gemini

This example shows a complete Flutter app with a Gemini-powered chat interface. Even if you are new to Flutter, the comments explain each section.

```dart
// main.dart
// A simple AI chat app using Flutter and the Gemini API

// First, add these to your pubspec.yaml:
// dependencies:
//   flutter:
//     sdk: flutter
//   google_generative_ai: ^0.4.0

import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

void main() {
  runApp(const GeminiChatApp());
}

// The main app widget
class GeminiChatApp extends StatelessWidget {
  const GeminiChatApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gemini Chat',
      theme: ThemeData(
        colorSchemeSeed: Colors.blue,
        useMaterial3: true,
      ),
      home: const ChatScreen(),
    );
  }
}

// The chat screen where messages are displayed
class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  // Replace with your actual API key
  static const apiKey = 'YOUR_API_KEY';

  // Set up the Gemini model
  late final GenerativeModel _model;
  late final ChatSession _chat;

  // Store chat messages for display
  final List<ChatMessage> _messages = [];

  // Controller for the text input field
  final TextEditingController _textController = TextEditingController();

  // Track whether AI is currently generating a response
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    // Initialize the model with a system instruction
    _model = GenerativeModel(
      model: 'gemini-2.0-flash',
      apiKey: apiKey,
      systemInstruction: Content.text(
        'You are a friendly, helpful assistant in a mobile chat app. '
        'Keep responses concise (under 150 words) since this is a phone screen. '
        'Use simple language. Be warm and encouraging.'
      ),
    );
    _chat = _model.startChat();
  }

  // Send a message and get AI response
  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty) return;

    // Add user message to the chat
    setState(() {
      _messages.add(ChatMessage(text: text, isUser: true));
      _isLoading = true;
    });
    _textController.clear();

    try {
      // Send to Gemini and get response
      final response = await _chat.sendMessage(Content.text(text));
      final aiText = response.text ?? 'Sorry, I could not generate a response.';

      setState(() {
        _messages.add(ChatMessage(text: aiText, isUser: false));
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _messages.add(ChatMessage(
          text: 'Oops! Something went wrong. Please check your internet connection.',
          isUser: false,
        ));
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gemini Chat'),
        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
      ),
      body: Column(
        children: [
          // Chat messages list
          Expanded(
            child: _messages.isEmpty
                ? const Center(
                    child: Text(
                      'Say hello to start chatting!',
                      style: TextStyle(color: Colors.grey),
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(8.0),
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      final message = _messages[index];
                      return MessageBubble(message: message);
                    },
                  ),
          ),

          // Loading indicator
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Row(
                children: [
                  SizedBox(width: 16),
                  SizedBox(
                    width: 20, height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  ),
                  SizedBox(width: 8),
                  Text('Thinking...', style: TextStyle(color: Colors.grey)),
                ],
              ),
            ),

          // Quick reply suggestions
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Row(
              children: [
                _quickReplyButton('Tell me a fun fact'),
                _quickReplyButton('Help me write an email'),
                _quickReplyButton('Explain something simply'),
              ],
            ),
          ),

          // Text input area
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _textController,
                    decoration: const InputDecoration(
                      hintText: 'Type your message...',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: _sendMessage,
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: () => _sendMessage(_textController.text),
                  icon: const Icon(Icons.send),
                  color: Theme.of(context).colorScheme.primary,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Helper to create quick reply buttons
  Widget _quickReplyButton(String text) {
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: ActionChip(
        label: Text(text),
        onPressed: () => _sendMessage(text),
      ),
    );
  }
}

// Data class for chat messages
class ChatMessage {
  final String text;
  final bool isUser;

  ChatMessage({required this.text, required this.isUser});
}

// Widget to display a single message bubble
class MessageBubble extends StatelessWidget {
  final ChatMessage message;

  const MessageBubble({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: message.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4.0),
        padding: const EdgeInsets.all(12.0),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.75,
        ),
        decoration: BoxDecoration(
          color: message.isUser
              ? Theme.of(context).colorScheme.primaryContainer
              : Theme.of(context).colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(message.text),
      ),
    );
  }
}
```

### Expected Output:

```
📸 [You should see on your phone]
┌─────────────────────────────────────┐
│  Gemini Chat                    ☰   │
├─────────────────────────────────────┤
│                                     │
│              Say hello to           │
│           start chatting!           │
│                                     │
│  ┌─────────────────────────┐        │
│  │ Hi! What can you help   │  (You) │
│  │ me with today?          │        │
│  └─────────────────────────┘        │
│                                     │
│  ┌─────────────────────────┐        │
│  │ Hey there! I'd love to  │  (AI)  │
│  │ help! I can explain     │        │
│  │ things simply, help     │        │
│  │ with writing, answer    │        │
│  │ questions, or just chat.│        │
│  │ What's on your mind?    │        │
│  └─────────────────────────┘        │
│                                     │
│ [Tell me a fun fact] [Help me...]   │
│                                     │
│ ┌──────────────────────────┐  ┌──┐  │
│ │ Type your message...     │  │➤ │  │
│ └──────────────────────────┘  └──┘  │
└─────────────────────────────────────┘
```

## 💻 Code Example 2: On-Device vs. Cloud Decision Engine

This Python example demonstrates how to build a smart routing system that decides whether to handle a request on-device (fast, free, offline) or send it to the cloud (powerful, full Gemini).

```python
# mobile_routing.py
# Smart routing: decide between on-device and cloud AI processing

import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")
cloud_model = genai.GenerativeModel("gemini-2.0-flash")

# Simulated on-device model (in real Android, this would use Gemini Nano)
class OnDeviceModel:
    """Simulates Gemini Nano's on-device capabilities."""

    def __init__(self):
        # On-device model handles simple, fast tasks
        self.supported_tasks = [
            "smart_reply",       # Quick message responses
            "summarize_short",   # Summarize short text (under 500 words)
            "classify",          # Simple text classification
            "autocomplete",      # Text completion/suggestion
        ]

    def can_handle(self, task_type):
        """Check if this task can be handled on-device."""
        return task_type in self.supported_tasks

    def process(self, task_type, text):
        """Process a task on-device (simulated)."""
        if task_type == "smart_reply":
            # Generate quick reply suggestions
            return {
                "replies": [
                    "Sounds good!",
                    "Thanks, I'll check it out.",
                    "Let me get back to you on that."
                ],
                "processing_time_ms": 15,  # Very fast — on-device
                "cost": 0.0  # Free — no API call
            }
        elif task_type == "summarize_short":
            words = text.split()
            summary = " ".join(words[:20]) + "..."
            return {
                "summary": summary,
                "processing_time_ms": 50,
                "cost": 0.0
            }
        elif task_type == "classify":
            # Simple sentiment detection
            positive_words = ["great", "love", "awesome", "thanks", "good", "happy"]
            negative_words = ["bad", "terrible", "hate", "awful", "angry", "disappointed"]
            text_lower = text.lower()
            pos = sum(1 for w in positive_words if w in text_lower)
            neg = sum(1 for w in negative_words if w in text_lower)
            sentiment = "positive" if pos > neg else "negative" if neg > pos else "neutral"
            return {
                "classification": sentiment,
                "processing_time_ms": 10,
                "cost": 0.0
            }
        return {"error": "Unsupported task"}


class SmartRouter:
    """Routes requests between on-device and cloud processing."""

    def __init__(self):
        self.on_device = OnDeviceModel()
        self.cloud = cloud_model
        self.stats = {"on_device": 0, "cloud": 0, "total_saved": 0.0}

    def classify_task(self, user_input):
        """Determine the best processing strategy for a request."""

        input_length = len(user_input.split())

        # Rules for routing
        if input_length < 10 and "?" not in user_input:
            return "smart_reply", "on_device"
        elif input_length < 50 and any(word in user_input.lower()
                for word in ["summarize", "summary", "tldr", "shorten"]):
            return "summarize_short", "on_device"
        elif input_length < 20 and any(word in user_input.lower()
                for word in ["sentiment", "classify", "mood", "feeling"]):
            return "classify", "on_device"
        else:
            return "complex", "cloud"

    def process(self, user_input):
        """Process a request using the best available method."""

        task_type, destination = self.classify_task(user_input)

        print(f"  [Router: {destination.upper()} — task: {task_type}]")

        if destination == "on_device":
            result = self.on_device.process(task_type, user_input)
            self.stats["on_device"] += 1
            # Estimate how much cloud processing would have cost
            self.stats["total_saved"] += 0.0001  # Approximate cost saved
            return result

        else:
            # Send to cloud Gemini
            self.stats["cloud"] += 1
            response = self.cloud.generate_content(user_input)
            return {
                "response": response.text,
                "processing_time_ms": 800,  # Typical cloud latency
                "cost": 0.0001  # Approximate cost
            }

    def print_stats(self):
        """Show routing statistics."""
        total = self.stats["on_device"] + self.stats["cloud"]
        on_pct = (self.stats["on_device"] / total * 100) if total > 0 else 0
        print(f"\n--- Routing Statistics ---")
        print(f"On-device: {self.stats['on_device']} ({on_pct:.0f}%)")
        print(f"Cloud:     {self.stats['cloud']} ({100-on_pct:.0f}%)")
        print(f"Est. cost saved: ${self.stats['total_saved']:.4f}")


# ---- Test the smart router ----
router = SmartRouter()

test_inputs = [
    "Thanks for the update!",               # Simple — on-device smart reply
    "Classify the sentiment: I love this product, it's amazing!",  # On-device
    "Summarize: The meeting covered quarterly results and plans.",  # On-device
    "Write a detailed marketing plan for launching a new product "
    "in the Australian market, including target demographics, "
    "channels, budget allocation, and timeline.",  # Complex — cloud
    "What are the key differences between machine learning and "
    "traditional programming? Give examples.",    # Complex — cloud
]

for user_input in test_inputs:
    print(f"\nINPUT: {user_input[:60]}{'...' if len(user_input) > 60 else ''}")
    result = router.process(user_input)

    if "replies" in result:
        print(f"QUICK REPLIES: {result['replies']}")
    elif "classification" in result:
        print(f"RESULT: {result['classification']}")
    elif "summary" in result:
        print(f"SUMMARY: {result['summary']}")
    elif "response" in result:
        print(f"RESPONSE: {result['response'][:120]}...")

    print(f"TIME: {result.get('processing_time_ms', '?')}ms | "
          f"COST: ${result.get('cost', 0):.4f}")
    print("-" * 55)

router.print_stats()
```

### Expected Output:

```
INPUT: Thanks for the update!
  [Router: ON_DEVICE — task: smart_reply]
QUICK REPLIES: ['Sounds good!', "Thanks, I'll check it out.", "Let me get back to you on that."]
TIME: 15ms | COST: $0.0000
-------------------------------------------------------

INPUT: Classify the sentiment: I love this product, it's amazing!
  [Router: ON_DEVICE — task: classify]
RESULT: positive
TIME: 10ms | COST: $0.0000
-------------------------------------------------------

INPUT: Summarize: The meeting covered quarterly results and plans.
  [Router: ON_DEVICE — task: summarize_short]
SUMMARY: Summarize: The meeting covered quarterly results and plans....
TIME: 50ms | COST: $0.0000
-------------------------------------------------------

INPUT: Write a detailed marketing plan for launching a new produc...
  [Router: CLOUD — task: complex]
RESPONSE: ## Marketing Plan: Product Launch in Australia ...
TIME: 800ms | COST: $0.0001
-------------------------------------------------------

INPUT: What are the key differences between machine learning and ...
  [Router: CLOUD — task: complex]
RESPONSE: Great question! Here are the key differences ...
TIME: 800ms | COST: $0.0001
-------------------------------------------------------

--- Routing Statistics ---
On-device: 3 (60%)
Cloud:     2 (40%)
Est. cost saved: $0.0003
```

## ✍️ Hands-On Exercises

### Exercise 1: Design Your Mobile AI App
Sketch out (on paper or in a notes app) a mobile AI app you would like to build. Define: (a) What problem does it solve? (b) Which features need cloud Gemini vs. on-device? (c) What happens when there is no internet? (d) What quick-reply buttons or shortcuts would you include? Write out the user journey from opening the app to completing their task.

**Hint:** The best mobile AI apps solve a specific problem exceptionally well, rather than trying to do everything. Think about one task that takes too long on your phone today.

### Exercise 2: Build a Mobile-Optimized Prompt
Take any complex prompt you have written in previous modules and rewrite it for mobile. The output should be concise (under 150 words), use bullet points for scannability, and include a "Learn more" option. Test both versions and compare readability on a small screen.

**Hint:** Read your AI's response on your actual phone screen. If you have to scroll more than 3 times, the response is too long for mobile.

## 🔗 Next Steps

In the final module of this course, you will bring everything together by building multimodal AI agents — systems that can see images, read text, write code, and use tools all in one workflow. You will also get a complete course summary and guidance for your continued learning journey.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2"><p>1. What is the key difference between cloud Gemini and Gemini Nano on-device?</p><label><input type="radio" name="q1" value="0"> A. Gemini Nano is more powerful than cloud Gemini</label><label><input type="radio" name="q1" value="1"> B. Cloud Gemini works offline; Gemini Nano needs internet</label><label><input type="radio" name="q1" value="2"> C. Gemini Nano runs on the phone itself (fast, offline, free); cloud Gemini runs on Google's servers (powerful, needs internet)</label><label><input type="radio" name="q1" value="3"> D. They are identical in capabilities</label><div class="quiz-explain">Gemini Nano is a smaller model that runs directly on the phone — it is faster and works offline but less capable. Cloud Gemini is the full model running on Google's powerful servers, but requires an internet connection.</div></div>

<div class="quiz-q" data-answer="0"><p>2. What is Flutter?</p><label><input type="radio" name="q2" value="0"> A. Google's toolkit for building apps that work on both Android and iOS from one codebase</label><label><input type="radio" name="q2" value="1"> B. A programming language created by Apple</label><label><input type="radio" name="q2" value="2"> C. A database for storing mobile app data</label><label><input type="radio" name="q2" value="3"> D. A cloud hosting service for mobile apps</label><div class="quiz-explain">Flutter is Google's UI toolkit that lets you write code once and deploy it on both Android and iOS. This saves time and money compared to building separate apps for each platform.</div></div>

<div class="quiz-q" data-answer="1"><p>3. Why is response conciseness especially important for mobile AI?</p><label><input type="radio" name="q3" value="0"> A. Because mobile phones have less memory</label><label><input type="radio" name="q3" value="1"> B. Because phone screens are small and users are often multitasking or on the go</label><label><input type="radio" name="q3" value="2"> C. Because the Gemini API limits mobile responses</label><label><input type="radio" name="q3" value="3"> D. Because mobile data plans charge per word</label><div class="quiz-explain">Small screens and on-the-go usage mean mobile users want quick, scannable answers. A 500-word response that works great on a desktop feels overwhelming on a phone screen.</div></div>

<div class="quiz-q" data-answer="3"><p>4. Which devices currently support Gemini Nano on-device?</p><label><input type="radio" name="q4" value="0"> A. All Android phones</label><label><input type="radio" name="q4" value="1"> B. Only iPhones</label><label><input type="radio" name="q4" value="2"> C. Any phone with Wi-Fi</label><label><input type="radio" name="q4" value="3"> D. Select premium devices like Pixel 8+ and Samsung Galaxy S24+</label><div class="quiz-explain">Gemini Nano requires specific hardware capabilities (a powerful enough processor) and is currently available only on premium devices like Google Pixel 8 and newer, and Samsung Galaxy S24 and newer.</div></div>

<div class="quiz-q" data-answer="0"><p>5. In the smart router example, what percentage of requests were handled on-device?</p><label><input type="radio" name="q5" value="0"> A. 60% — three out of five requests</label><label><input type="radio" name="q5" value="1"> B. 100% — all requests</label><label><input type="radio" name="q5" value="2"> C. 40% — two out of five requests</label><label><input type="radio" name="q5" value="3"> D. 0% — all went to cloud</label><div class="quiz-explain">Three of the five test requests (simple reply, sentiment classification, short summarization) were handled on-device, while two complex requests went to the cloud. This 60/40 split shows how many common tasks can be handled locally.</div></div>

<div class="quiz-q" data-answer="2"><p>6. Why do mobile AI apps include "quick reply" buttons?</p><label><input type="radio" name="q6" value="0"> A. Because the Gemini API requires them</label><label><input type="radio" name="q6" value="1"> B. To fill empty space on the screen</label><label><input type="radio" name="q6" value="2"> C. Because typing on a phone is slow and difficult, so preset options improve the experience</label><label><input type="radio" name="q6" value="3"> D. To limit what the AI can respond to</label><div class="quiz-explain">Typing on a phone keyboard is slower and more error-prone than on a desktop. Quick reply buttons let users tap once instead of typing a full message, making the app faster and more pleasant to use.</div></div>

<div class="quiz-q" data-answer="1"><p>7. What is the main advantage of on-device AI processing for privacy?</p><label><input type="radio" name="q7" value="0"> A. On-device AI is encrypted</label><label><input type="radio" name="q7" value="1"> B. Data never leaves the phone — it is processed locally and nothing is sent to external servers</label><label><input type="radio" name="q7" value="2"> C. Google cannot see what model you are using</label><label><input type="radio" name="q7" value="3"> D. On-device AI deletes all data after processing</label><div class="quiz-explain">The strongest privacy guarantee is that data never leaves the device. With on-device processing, your personal messages, photos, and documents are analyzed right on your phone — no external server ever sees them.</div></div>

<div class="quiz-q" data-answer="3"><p>8. What should a mobile AI app do when there is no internet connection?</p><label><input type="radio" name="q8" value="0"> A. Show an error and close the app</label><label><input type="radio" name="q8" value="1"> B. Pretend to work and give random responses</label><label><input type="radio" name="q8" value="2"> C. Ask the user to find Wi-Fi</label><label><input type="radio" name="q8" value="3"> D. Fall back to on-device capabilities for basic tasks and clearly tell the user which features need internet</label><div class="quiz-explain">Good mobile apps degrade gracefully. They should use on-device AI for what they can, clearly communicate which features require internet, and queue complex requests to process once connectivity returns.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
