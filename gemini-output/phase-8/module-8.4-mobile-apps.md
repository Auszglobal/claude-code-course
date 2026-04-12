# Module 8.4: Gemini on Mobile — On-Device AI and Building Chat Apps

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Understand what Gemini Nano is and how on-device AI works on Android
- Explain the trade-offs between on-device and cloud-based AI
- Set up a Flutter project that connects to the Gemini API
- Build a simple AI chat app with message history
- Decide when to use on-device AI vs. cloud AI for mobile apps

## 📖 Theory

### What Is Gemini Nano?

You already know Gemini Pro and Gemini Flash — powerful models that run on Google's servers in the cloud. When your app sends a question, it travels over the internet to Google's data center, gets processed, and the answer travels back. This works great when you have a good internet connection.

But what about when you are on a plane, in a subway, or in an area with poor cell service?

**Gemini Nano** is a smaller version of Gemini designed to run directly on your phone. It does not need the internet at all. The model lives inside the device itself, just like the calculator app on your phone does not need Wi-Fi to add numbers.

Think of it this way: Gemini Pro is like calling an expert on the phone (powerful, but you need a connection). Gemini Nano is like having a knowledgeable friend sitting right next to you (less powerful, but always available and instant).

### On-Device vs. Cloud: The Trade-Offs

| Factor | On-Device (Gemini Nano) | Cloud (Gemini Pro/Flash) |
|---|---|---|
| **Internet required** | No | Yes |
| **Speed** | Very fast (no network delay) | Depends on connection |
| **Privacy** | Data never leaves the phone | Data sent to Google's servers |
| **Capabilities** | Basic text tasks, summarization | Full power: images, long text, code |
| **Model size** | Small (fits on a phone) | Large (runs on powerful servers) |
| **Cost** | Free (no API calls) | Pay per API call |
| **Availability** | Pixel 8+ and select Samsung devices | Any device with internet |

**When to use on-device AI:**
- Summarizing text or messages quickly
- Smart Reply suggestions (like in Gmail)
- Autocomplete and text rewriting
- Sensitive data that should not leave the device (personal notes, health info)

**When to use cloud AI:**
- Analyzing images or documents
- Long, complex conversations
- Code generation or debugging
- Tasks that need the most powerful model

### Flutter + Gemini: Building Mobile AI Apps

**Flutter** is Google's toolkit for building mobile apps that work on both Android and iPhone from a single codebase. Instead of writing one app in Java for Android and another in Swift for iPhone, you write it once in a language called Dart and Flutter compiles it for both platforms.

Flutter and Gemini work together beautifully because Google provides an official package (`google_generative_ai`) that makes it easy to call the Gemini API from a Flutter app. The pattern is the same as what you learned in earlier modules — send a prompt, get a response — but wrapped in a mobile-friendly interface.

### How a Chat App Works

A chat app has a simple loop:

1. The user types a message
2. The app sends the message (plus conversation history) to Gemini
3. Gemini sends back a response
4. The app displays the response in a chat bubble
5. Both messages get added to the history
6. Repeat

The conversation history is important because it gives Gemini context. Without it, every message would be treated as a brand new conversation, and the AI would not remember what you just talked about.

## 💻 Code Example 1: Simple Gemini Chat in Flutter

This example creates a minimal chat screen that sends messages to Gemini and displays responses. It runs on both Android and iOS.

```dart
// main.dart
// A simple AI chat app using Flutter and Gemini

import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

// Step 1: Set up your API key
// In production, use environment variables — never hardcode keys!
const String apiKey = 'YOUR_GEMINI_API_KEY';

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
        colorSchemeSeed: Colors.blue,   // App color theme
        useMaterial3: true,             // Modern Material Design
      ),
      home: const ChatScreen(),         // Our chat screen
    );
  }
}

// The chat screen where messages appear
class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  // The Gemini model we will talk to
  final model = GenerativeModel(
    model: 'gemini-2.0-flash',
    apiKey: apiKey,
    systemInstruction: Content.text(
      'You are a friendly and helpful assistant in a mobile app. '
      'Keep responses concise since users are on their phones. '
      'Use short paragraphs and simple language.'
    ),
  );

  // Chat session keeps track of conversation history automatically
  late final ChatSession chat;

  // List of messages to display on screen
  final List<ChatMessage> messages = [];

  // Controller for the text input field
  final TextEditingController textController = TextEditingController();

  // Track whether we are waiting for a response
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    chat = model.startChat();  // Start a new conversation
  }

  // Send a message to Gemini and get a response
  Future<void> sendMessage(String text) async {
    if (text.trim().isEmpty) return;  // Ignore empty messages

    // Add the user's message to the screen
    setState(() {
      messages.add(ChatMessage(text: text, isUser: true));
      isLoading = true;
    });
    textController.clear();

    try {
      // Send to Gemini and wait for the response
      final response = await chat.sendMessage(Content.text(text));
      final reply = response.text ?? 'Sorry, I could not generate a response.';

      // Add Gemini's response to the screen
      setState(() {
        messages.add(ChatMessage(text: reply, isUser: false));
        isLoading = false;
      });
    } catch (error) {
      // Handle errors gracefully
      setState(() {
        messages.add(ChatMessage(
          text: 'Oops! Something went wrong. Please try again.',
          isUser: false,
        ));
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Gemini Chat')),
      body: Column(
        children: [
          // The message list (scrollable)
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final msg = messages[index];
                return MessageBubble(message: msg);
              },
            ),
          ),
          // Loading indicator while waiting for Gemini
          if (isLoading) const LinearProgressIndicator(),
          // The text input area at the bottom
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: textController,
                    decoration: const InputDecoration(
                      hintText: 'Type a message...',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: sendMessage,
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: () => sendMessage(textController.text),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Data class to hold a single chat message
class ChatMessage {
  final String text;
  final bool isUser;  // true = user message, false = AI message

  ChatMessage({required this.text, required this.isUser});
}

// Widget that displays a single message bubble
class MessageBubble extends StatelessWidget {
  final ChatMessage message;

  const MessageBubble({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: message.isUser
          ? Alignment.centerRight    // User messages on the right
          : Alignment.centerLeft,    // AI messages on the left
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 12),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: message.isUser ? Colors.blue[100] : Colors.grey[200],
          borderRadius: BorderRadius.circular(16),
        ),
        constraints: const BoxConstraints(maxWidth: 280),
        child: Text(message.text),
      ),
    );
  }
}
```

### Expected Output:

When you run this app on your phone or emulator, you will see a clean chat interface:

```
📸 [You should see a screen like this]
┌──────────────────────────────┐
│  Gemini Chat                 │
├──────────────────────────────┤
│                              │
│        ┌──────────────┐      │
│        │ Hi! What can  │     │
│        │ you help with?│     │
│        └──────────────┘      │
│                              │
│  ┌──────────────────┐        │
│  │ What is the       │       │
│  │ capital of France?│       │
│  └──────────────────┘        │
│                              │
│        ┌──────────────┐      │
│        │ The capital of│     │
│        │ France is     │     │
│        │ Paris!        │     │
│        └──────────────┘      │
│                              │
│ ┌─────────────────────┐ [>] │
│ │ Type a message...   │      │
│ └─────────────────────┘      │
└──────────────────────────────┘
```

## 💻 Code Example 2: On-Device AI with Gemini Nano on Android

This example shows how to use Gemini Nano through Android's AICore service. The key difference is that no internet connection is needed — everything runs locally on the phone.

```kotlin
// MainActivity.kt
// Using Gemini Nano on-device through Android AICore

// Step 0: Add these to your app's build.gradle.kts file:
// implementation("com.google.ai.edge.aicore:aicore:0.0.3")

package com.example.ondeviceai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.google.ai.edge.aicore.GenerativeModel
import com.google.ai.edge.aicore.generationConfig
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            OnDeviceAIScreen()
        }
    }
}

@Composable
fun OnDeviceAIScreen() {
    // Set up the on-device model (no API key needed!)
    val generativeModel = remember {
        GenerativeModel(
            generationConfig = generationConfig {
                temperature = 0.7f   // Controls creativity (0 = focused, 1 = creative)
                topK = 16            // Limits word choices for more focused output
                maxOutputTokens = 256 // Keep responses short for on-device use
            }
        )
    }

    // State variables to track UI
    var inputText by remember { mutableStateOf("") }
    var outputText by remember { mutableStateOf("Tap 'Summarize' to try on-device AI!") }
    var isProcessing by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp)
    ) {
        Text(
            text = "On-Device AI (No Internet Needed)",
            style = MaterialTheme.typography.headlineSmall
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Text input area
        OutlinedTextField(
            value = inputText,
            onValueChange = { inputText = it },
            label = { Text("Paste text to summarize") },
            modifier = Modifier.fillMaxWidth().height(200.dp),
            maxLines = 10
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Summarize button
        Button(
            onClick = {
                scope.launch {
                    isProcessing = true
                    try {
                        // This runs entirely on the device — no internet!
                        val response = generativeModel.generateContent(
                            "Summarize the following text in 2-3 sentences: $inputText"
                        )
                        outputText = response.text ?: "Could not generate summary."
                    } catch (e: Exception) {
                        outputText = "Error: ${e.message}. " +
                            "Make sure your device supports Gemini Nano " +
                            "(Pixel 8 or newer)."
                    }
                    isProcessing = false
                }
            },
            enabled = inputText.isNotBlank() && !isProcessing,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (isProcessing) "Processing..." else "Summarize (On-Device)")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Output area
        Card(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = outputText,
                modifier = Modifier.padding(16.dp),
                style = MaterialTheme.typography.bodyLarge
            )
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Info text
        Text(
            text = "This runs entirely on your device. " +
                   "Your text is never sent to any server.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.outline
        )
    }
}
```

### Expected Output:

When you paste a long news article and tap "Summarize," the app processes it locally:

```
📸 [You should see a screen like this]
┌──────────────────────────────┐
│ On-Device AI (No Internet)   │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ The European Space Agency│ │
│ │ announced today that its │ │
│ │ Mars rover has discovered│ │
│ │ evidence of ancient water│ │
│ │ channels beneath the     │ │
│ │ surface of Mars...       │ │
│ └──────────────────────────┘ │
│                              │
│ [  Summarize (On-Device)   ] │
│                              │
│ ┌──────────────────────────┐ │
│ │ ESA's Mars rover found   │ │
│ │ signs of ancient water   │ │
│ │ channels underground.    │ │
│ │ This suggests Mars once  │ │
│ │ had conditions that could│ │
│ │ support life.            │ │
│ └──────────────────────────┘ │
│                              │
│ This runs entirely on your   │
│ device. Your text is never   │
│ sent to any server.          │
└──────────────────────────────┘
```

The key thing to notice: there is no API key, no network call, and no loading spinner waiting for a server. The response appears almost instantly because the AI is running right on the phone.

## ✍️ Hands-On Exercises

### Exercise 1: Set Up a Flutter Project

Install Flutter on your computer and create a new project. You do not need to build the full chat app yet — just get Flutter running and displaying a "Hello, Gemini!" message on an emulator or your phone.

Steps to follow:
1. Visit flutter.dev and follow the installation guide for your operating system
2. Run `flutter doctor` to check everything is set up
3. Run `flutter create gemini_chat` to create a new project
4. Run `flutter run` to see the default app on your emulator
5. Change the text on the screen to "Hello, Gemini!" and hot-reload to see the change

**Hint:** Flutter's hot reload feature lets you see changes instantly without restarting the app. Just save the file and the app updates on your phone or emulator in under a second.

### Exercise 2: Add Features to the Chat App

Take Code Example 1 and add these two features. Try one at a time.

1. **Message timestamps** — Show the time each message was sent (e.g., "2:30 PM") below each chat bubble.
2. **Clear conversation** — Add a button in the app bar that clears all messages and starts a fresh conversation with Gemini.

**Hint:** For timestamps, use `DateTime.now()` when creating each `ChatMessage` and format it with `TimeOfDay.fromDateTime(dateTime).format(context)`. For clearing the conversation, create a new `ChatSession` with `model.startChat()` and clear the messages list.

## 🔗 Next Steps

In the next module, you will bring everything together by building multimodal agents — AI systems that combine image understanding, text processing, and code generation to solve complex multi-step tasks. You will build a product analyzer agent as a mini project and review everything you have learned in the course.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1"><p>1. What is Gemini Nano?</p><label><input type="radio" name="q1" value="0"> A. A cheaper version of Gemini that uses less data</label><label><input type="radio" name="q1" value="1"> B. A smaller version of Gemini designed to run directly on mobile devices without internet</label><label><input type="radio" name="q1" value="2"> C. A Gemini model that only works on Pixel phones</label><label><input type="radio" name="q1" value="3"> D. A web browser plugin for Gemini</label><div class="quiz-explain">Gemini Nano is a compact version of the Gemini model optimized to run directly on mobile devices. It processes everything locally on the phone, requiring no internet connection. It is available on supported devices like Pixel 8 and newer Samsung phones.</div></div>

<div class="quiz-q" data-answer="0"><p>2. What is the biggest advantage of on-device AI over cloud AI?</p><label><input type="radio" name="q2" value="0"> A. It works without an internet connection and data never leaves the device</label><label><input type="radio" name="q2" value="1"> B. It is always smarter than cloud AI</label><label><input type="radio" name="q2" value="2"> C. It is free and cloud AI always costs money</label><label><input type="radio" name="q2" value="3"> D. It can process images better than cloud AI</label><div class="quiz-explain">On-device AI has two major advantages: it works offline (no internet needed) and it is private (your data never leaves your phone). This makes it ideal for sensitive information and situations with poor connectivity.</div></div>

<div class="quiz-q" data-answer="2"><p>3. What is Flutter?</p><label><input type="radio" name="q3" value="0"> A. A programming language created by Apple</label><label><input type="radio" name="q3" value="1"> B. A database for storing chat messages</label><label><input type="radio" name="q3" value="2"> C. Google's toolkit for building apps that work on both Android and iOS from one codebase</label><label><input type="radio" name="q3" value="3"> D. A testing framework for mobile apps</label><div class="quiz-explain">Flutter is Google's UI toolkit that lets you write one codebase in the Dart language and compile it into native apps for Android, iOS, web, and desktop. This saves time because you do not need to build separate apps for each platform.</div></div>

<div class="quiz-q" data-answer="3"><p>4. Why is conversation history important in a chat app?</p><label><input type="radio" name="q4" value="0"> A. It makes the app look professional</label><label><input type="radio" name="q4" value="1"> B. It is required by the Gemini API to function</label><label><input type="radio" name="q4" value="2"> C. It reduces the cost of API calls</label><label><input type="radio" name="q4" value="3"> D. It gives Gemini context so it remembers what you talked about earlier</label><div class="quiz-explain">Without conversation history, every message would be treated as a completely new conversation. Gemini would not remember your name, your previous questions, or any context. History lets the AI provide relevant, contextual responses.</div></div>

<div class="quiz-q" data-answer="1"><p>5. In the Flutter chat app, what does `ChatSession` do?</p><label><input type="radio" name="q5" value="0"> A. It encrypts the messages for security</label><label><input type="radio" name="q5" value="1"> B. It automatically manages conversation history so you do not have to track it manually</label><label><input type="radio" name="q5" value="2"> C. It connects to the phone's camera</label><label><input type="radio" name="q5" value="3"> D. It saves messages to a local database</label><div class="quiz-explain">ChatSession is a convenience feature of the Gemini SDK. It automatically keeps track of all the messages sent back and forth, so each new message includes the full conversation context without you needing to manage a history array yourself.</div></div>

<div class="quiz-q" data-answer="0"><p>6. Which task is best suited for Gemini Nano (on-device) instead of cloud AI?</p><label><input type="radio" name="q6" value="0"> A. Summarizing private medical notes on a patient's phone</label><label><input type="radio" name="q6" value="1"> B. Analyzing a 50-page PDF document</label><label><input type="radio" name="q6" value="2"> C. Generating complex Python code</label><label><input type="radio" name="q6" value="3"> D. Having a long conversation with detailed follow-up questions</label><div class="quiz-explain">Medical notes are sensitive personal data that should not be sent to external servers. Gemini Nano processes everything on the device, so the data never leaves the phone. The task (summarization) is also well within Nano's capabilities.</div></div>

<div class="quiz-q" data-answer="2"><p>7. What happens if you try to use Gemini Nano on an unsupported phone?</p><label><input type="radio" name="q7" value="0"> A. It automatically falls back to cloud AI</label><label><input type="radio" name="q7" value="1"> B. The phone downloads the model from the internet</label><label><input type="radio" name="q7" value="2"> C. It throws an error because the model is not available on that device</label><label><input type="radio" name="q7" value="3"> D. It works but much more slowly</label><div class="quiz-explain">Gemini Nano requires specific hardware (like the Tensor G3 chip in Pixel 8). If the device does not have the required hardware and software support, the AICore service will not be available and an error will occur. Your app should handle this gracefully.</div></div>

<div class="quiz-q" data-answer="3"><p>8. Why does the Flutter code example use `setState()` when adding messages?</p><label><input type="radio" name="q8" value="0"> A. To save the message to the database</label><label><input type="radio" name="q8" value="1"> B. To send the message to Gemini</label><label><input type="radio" name="q8" value="2"> C. To encrypt the message</label><label><input type="radio" name="q8" value="3"> D. To tell Flutter the data has changed so it redraws the screen with the new message</label><div class="quiz-explain">In Flutter, the UI only updates when you call setState(). If you just add a message to the list without setState(), the data changes but the screen does not redraw, so the user would not see the new message. setState() triggers a rebuild of the widget.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
