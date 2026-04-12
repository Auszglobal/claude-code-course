# Module 8.3: Vertex AI — Google Cloud's Enterprise AI Platform

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Understand what Vertex AI is and how it differs from Google AI Studio
- Know when to choose Vertex AI over the free-tier Gemini API
- Explain model tuning and fine-tuning at a high level
- Understand enterprise security features like VPC Service Controls and IAM
- Compare pricing between AI Studio and Vertex AI to make informed decisions

## 📖 Theory

### What Is Vertex AI?

Think of Google AI Studio as a food truck. It is quick, convenient, and great for trying things out. You walk up, order, and get your food fast. But if you are running a restaurant chain that serves thousands of customers every day, you need a full commercial kitchen with health inspections, inventory management, and staff controls.

**Vertex AI** is that commercial kitchen. It is Google Cloud's fully managed machine learning platform that lets businesses build, deploy, and scale AI applications with enterprise-grade security, monitoring, and compliance.

Vertex AI is not a different AI model. It gives you access to the same Gemini models you already know, but wrapped in a layer of tools designed for serious production use.

### AI Studio vs. Vertex AI: When to Use Which

| Feature | Google AI Studio | Vertex AI |
|---|---|---|
| **Best for** | Learning, prototyping, personal projects | Production apps, business use |
| **Setup** | Just an API key | Google Cloud project + service account |
| **Security** | API key only | IAM roles, VPC, audit logs |
| **Data residency** | No control | Choose your region |
| **Model tuning** | Limited | Full tuning and fine-tuning |
| **Monitoring** | Basic | Full dashboards, logging, alerts |
| **SLA** | None | Enterprise SLA available |
| **Cost** | Free tier + pay-per-use | Pay-per-use (slightly higher, but with guarantees) |

**Rule of thumb:** If you are learning or building a side project, use AI Studio. If your company is building a product that handles customer data, use Vertex AI.

### Model Tuning and Fine-Tuning

Imagine you hired a brilliant new employee. They are very smart (that is the base Gemini model), but they do not know anything about your specific company. You have two ways to bring them up to speed:

1. **Prompt tuning** — You give them a detailed instruction manual every time they start work. This is like adding instructions to your system prompt. It is fast and costs nothing extra, but you are limited by the prompt size.

2. **Fine-tuning (supervised tuning)** — You send them through a training program with hundreds of examples of how your company does things. After training, they just "know" the right way to respond without needing the manual. This is what Vertex AI fine-tuning does — you provide training examples, and Gemini learns your specific patterns.

Fine-tuning on Vertex AI works like this:

- You prepare a dataset of example prompts and ideal responses (at least 10, ideally hundreds)
- Vertex AI creates a tuned version of the model
- The tuned model responds in your company's style, using your terminology, following your rules
- You get a private endpoint that only your application can access

### Enterprise Security Features

When a company puts AI into production, security becomes critical. Vertex AI provides several layers of protection:

- **IAM (Identity and Access Management)** — Controls who can do what. For example, developers can use the model but cannot delete it. Managers can view usage reports. Only admins can change settings.

- **VPC Service Controls** — Creates a security boundary around your AI resources. Think of it as building a fence around your AI so data cannot leak out to the public internet.

- **Data residency** — You choose which Google Cloud region stores and processes your data. If your company operates in the EU and must comply with GDPR, you can ensure all data stays in European data centers.

- **Audit logs** — Every API call, every model access, every configuration change is logged. If something goes wrong, you can trace exactly what happened.

- **Customer-Managed Encryption Keys (CMEK)** — By default, Google encrypts your data. With CMEK, you bring your own encryption keys, giving you full control over data access.

### Pricing Comparison

Vertex AI pricing is based on **tokens** (pieces of text), just like AI Studio, but the rates and structure differ:

| Model | AI Studio (per 1M tokens) | Vertex AI (per 1M tokens) |
|---|---|---|
| Gemini 2.0 Flash Input | $0.10 | $0.10 |
| Gemini 2.0 Flash Output | $0.40 | $0.40 |
| Gemini 2.5 Pro Input | $1.25 | $1.25 |
| Gemini 2.5 Pro Output | $10.00 | $10.00 |

The per-token pricing is often the same, but Vertex AI adds value through:
- **Provisioned throughput** — Reserve capacity so your app never hits rate limits during traffic spikes
- **Batch predictions** — Process large volumes of data at a 50% discount
- **Enterprise support** — Guaranteed response times if something breaks

The real cost difference is in the Google Cloud infrastructure (compute, storage, networking) you use alongside Vertex AI.

## 💻 Code Example 1: Setting Up Vertex AI in Python

This example shows how to connect to Gemini through Vertex AI instead of AI Studio. Notice the authentication uses a service account rather than a simple API key.

```python
# vertex_ai_setup.py
# Connecting to Gemini through Vertex AI

# Step 1: Install the Vertex AI SDK (run this in your terminal)
# pip install google-cloud-aiplatform

import vertexai
from vertexai.generative_models import GenerativeModel

# Step 2: Initialize Vertex AI with your project details
# Replace these with your actual Google Cloud project info
PROJECT_ID = "my-company-project"   # Your Google Cloud project ID
REGION = "us-central1"              # The region closest to your users

vertexai.init(
    project=PROJECT_ID,
    location=REGION
)

# Step 3: Create a model instance (same Gemini, different access path)
model = GenerativeModel("gemini-2.0-flash")

# Step 4: Send a simple prompt
response = model.generate_content(
    "Explain what cloud computing is in two sentences."
)

print("Vertex AI Response:")
print(response.text)

# Step 5: Use with system instructions (just like AI Studio)
model_with_instructions = GenerativeModel(
    "gemini-2.0-flash",
    system_instruction="You are a helpful customer support agent for "
                       "a software company called TechCo. Always be polite "
                       "and refer customers to support.techco.com for "
                       "complex issues."
)

support_response = model_with_instructions.generate_content(
    "My account is locked and I cannot log in."
)

print("\nCustomer Support Response:")
print(support_response.text)
```

### Expected Output:

```
Vertex AI Response:
Cloud computing is the delivery of computing services like storage,
servers, and software over the internet, so you do not need to own
physical hardware. It lets businesses and individuals access powerful
resources on demand and pay only for what they use.

Customer Support Response:
I am sorry to hear you are having trouble logging in! I recommend
visiting support.techco.com where our team can verify your identity
and unlock your account right away. Is there anything else I can
help you with?
```

## 💻 Code Example 2: Preparing a Fine-Tuning Dataset

This example shows how to prepare a training dataset and start a fine-tuning job on Vertex AI. Fine-tuning teaches the model your specific style and patterns.

```python
# fine_tuning_prep.py
# Preparing data and launching a fine-tuning job on Vertex AI

import vertexai
from vertexai.generative_models import GenerativeModel
from vertexai.tuning import sft  # sft = supervised fine-tuning
import json

# Initialize Vertex AI
vertexai.init(project="my-company-project", location="us-central1")

# Step 1: Prepare training data
# Each example shows the model an input and the ideal output
# The format is JSONL (one JSON object per line)
training_examples = [
    {
        "messages": [
            {"role": "user", "content": "What is your return policy?"},
            {"role": "model", "content": "Great question! At ShopSmart, "
             "we offer a 30-day hassle-free return policy. Simply bring "
             "your item and receipt to any store, or start a return at "
             "shopsmart.com/returns. Need help with a specific return?"}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "Do you ship internationally?"},
            {"role": "model", "content": "We sure do! ShopSmart ships "
             "to over 50 countries. Standard international shipping "
             "takes 7-14 business days. You can check shipping rates "
             "for your country at shopsmart.com/shipping. Anything "
             "else I can help with?"}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "I got the wrong item."},
            {"role": "model", "content": "Oh no, I am really sorry about "
             "that! Let me help fix this right away. Please visit "
             "shopsmart.com/returns and select 'Wrong Item Received.' "
             "We will send you a prepaid return label and ship the "
             "correct item with express delivery at no extra cost!"}
        ]
    }
    # In practice, you need at least 10 examples.
    # 100-500 examples produce much better results.
]

# Step 2: Save as JSONL file
with open("training_data.jsonl", "w") as f:
    for example in training_examples:
        f.write(json.dumps(example) + "\n")

print("Training data saved to training_data.jsonl")
print(f"Number of examples: {len(training_examples)}")

# Step 3: Upload to Google Cloud Storage (GCS)
# In practice, run this command in your terminal:
# gsutil cp training_data.jsonl gs://my-bucket/tuning/training_data.jsonl

# Step 4: Start the fine-tuning job
# Note: This costs money and takes time (minutes to hours)
# Uncomment the lines below when you are ready to run it for real

# tuning_job = sft.train(
#     source_model="gemini-2.0-flash",
#     train_dataset="gs://my-bucket/tuning/training_data.jsonl",
#     tuned_model_display_name="shopsmart-support-bot-v1",
#     epochs=3,  # How many times to review the training data
# )
#
# print(f"Tuning job started: {tuning_job.resource_name}")
# print("This may take 30 minutes to a few hours.")

# Step 5: Use the tuned model (after tuning completes)
# tuned_model = GenerativeModel(tuning_job.tuned_model_endpoint_name)
# response = tuned_model.generate_content("Where is my order?")
# print(response.text)

print("\n--- What happens after tuning ---")
print("1. Vertex AI trains a custom version of Gemini on your data")
print("2. You get a private model endpoint (a URL only you can access)")
print("3. The tuned model responds in your company's style automatically")
print("4. No need to put examples in the prompt every time")
```

### Expected Output:

```
Training data saved to training_data.jsonl
Number of examples: 3

--- What happens after tuning ---
1. Vertex AI trains a custom version of Gemini on your data
2. You get a private model endpoint (a URL only you can access)
3. The tuned model responds in your company's style automatically
4. No need to put examples in the prompt every time
```

## ✍️ Hands-On Exercises

### Exercise 1: Choose the Right Platform

Read each scenario below and decide whether you would recommend **AI Studio** or **Vertex AI**. Write down your answer and reasoning.

1. A university student building a homework helper chatbot for personal use.
2. A hospital building an AI that reads patient notes and must comply with health data regulations.
3. A startup with 3 people prototyping a new product idea in a weekend hackathon.
4. A bank deploying an AI fraud detection system that processes millions of transactions.

**Hint:** Think about the security requirements, the scale, and whether the data is sensitive.

### Exercise 2: Design a Training Dataset

Pick a business you know (a coffee shop, a gym, a bookstore) and write 5 training examples in the same format as Code Example 2. Each example should have a realistic customer question and an ideal response in that business's voice and style.

**Hint:** Think about the most common questions customers ask and how the business would want them answered. Include specific details like the business name, policies, and website.

## 🔗 Next Steps

In the next module, you will learn how to bring Gemini to mobile devices. You will explore Gemini Nano for on-device AI on Android and build a simple AI chat app using Flutter and the Gemini API.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2"><p>1. What is the best analogy for the difference between AI Studio and Vertex AI?</p><label><input type="radio" name="q1" value="0"> A. A bicycle vs. a car</label><label><input type="radio" name="q1" value="1"> B. A phone vs. a computer</label><label><input type="radio" name="q1" value="2"> C. A food truck vs. a commercial kitchen</label><label><input type="radio" name="q1" value="3"> D. A book vs. a movie</label><div class="quiz-explain">AI Studio is like a food truck: quick, convenient, and great for small-scale use. Vertex AI is like a commercial kitchen: built for production with proper controls, monitoring, and scalability for serious business use.</div></div>

<div class="quiz-q" data-answer="1"><p>2. What does fine-tuning a model do?</p><label><input type="radio" name="q2" value="0"> A. Makes the model run faster</label><label><input type="radio" name="q2" value="1"> B. Trains the model on your specific examples so it learns your style and patterns</label><label><input type="radio" name="q2" value="2"> C. Reduces the cost of every API call</label><label><input type="radio" name="q2" value="3"> D. Gives the model access to the internet</label><div class="quiz-explain">Fine-tuning takes the base Gemini model and trains it on your examples. After tuning, the model "knows" your company's style, terminology, and rules without you needing to include examples in every prompt.</div></div>

<div class="quiz-q" data-answer="0"><p>3. What is VPC Service Controls in Vertex AI?</p><label><input type="radio" name="q3" value="0"> A. A security boundary that prevents data from leaking to the public internet</label><label><input type="radio" name="q3" value="1"> B. A tool for making the model respond faster</label><label><input type="radio" name="q3" value="2"> C. A billing feature that controls costs</label><label><input type="radio" name="q3" value="3"> D. A way to share models with other companies</label><div class="quiz-explain">VPC Service Controls create a security perimeter around your AI resources. Think of it as a fence that keeps your data inside your organization's boundary, preventing unauthorized access or accidental data leaks.</div></div>

<div class="quiz-q" data-answer="3"><p>4. How does Vertex AI authentication differ from AI Studio?</p><label><input type="radio" name="q4" value="0"> A. Vertex AI does not require any authentication</label><label><input type="radio" name="q4" value="1"> B. Both use the same simple API key</label><label><input type="radio" name="q4" value="2"> C. Vertex AI uses a username and password</label><label><input type="radio" name="q4" value="3"> D. Vertex AI uses service accounts and IAM roles instead of a simple API key</label><div class="quiz-explain">AI Studio uses a simple API key for access. Vertex AI uses Google Cloud's IAM system with service accounts, allowing fine-grained control over who can do what — like letting developers use the model but only admins change its settings.</div></div>

<div class="quiz-q" data-answer="2"><p>5. What is the minimum number of training examples recommended for fine-tuning?</p><label><input type="radio" name="q5" value="0"> A. 1</label><label><input type="radio" name="q5" value="1"> B. 5</label><label><input type="radio" name="q5" value="2"> C. At least 10, but 100-500 produce much better results</label><label><input type="radio" name="q5" value="3"> D. Exactly 1,000</label><div class="quiz-explain">Vertex AI requires at least 10 examples for fine-tuning, but more is better. Having 100 to 500 well-crafted examples gives the model enough patterns to learn your specific style and requirements effectively.</div></div>

<div class="quiz-q" data-answer="1"><p>6. What does "data residency" mean in Vertex AI?</p><label><input type="radio" name="q6" value="0"> A. Data is stored on your personal computer</label><label><input type="radio" name="q6" value="1"> B. You choose which geographic region stores and processes your data</label><label><input type="radio" name="q6" value="2"> C. Data is automatically deleted after 30 days</label><label><input type="radio" name="q6" value="3"> D. Data is shared across all Google Cloud regions for speed</label><div class="quiz-explain">Data residency lets you choose where your data lives. If your company must comply with regulations like GDPR in Europe, you can ensure all data stays in European data centers and is never processed elsewhere.</div></div>

<div class="quiz-q" data-answer="0"><p>7. What is "provisioned throughput" in Vertex AI?</p><label><input type="radio" name="q7" value="0"> A. Reserving capacity so your app never hits rate limits during traffic spikes</label><label><input type="radio" name="q7" value="1"> B. A way to make the model smarter</label><label><input type="radio" name="q7" value="2"> C. Free API calls included in every plan</label><label><input type="radio" name="q7" value="3"> D. A feature that compresses data to save storage</label><div class="quiz-explain">Provisioned throughput means you reserve a certain amount of processing capacity in advance. This guarantees your application can handle high traffic without being slowed down or blocked by rate limits, which is critical for production apps.</div></div>

<div class="quiz-q" data-answer="3"><p>8. Which scenario is the best fit for Vertex AI instead of AI Studio?</p><label><input type="radio" name="q8" value="0"> A. A student experimenting with AI for a school project</label><label><input type="radio" name="q8" value="1"> B. A developer testing a new prompt idea</label><label><input type="radio" name="q8" value="2"> C. A hobbyist building a personal recipe generator</label><label><input type="radio" name="q8" value="3"> D. A bank deploying AI fraud detection that processes millions of transactions with strict compliance requirements</label><div class="quiz-explain">Vertex AI is designed for enterprise production use. A bank processing millions of transactions needs the security (IAM, VPC, audit logs), compliance (data residency), scalability (provisioned throughput), and reliability (SLA) that only Vertex AI provides.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
