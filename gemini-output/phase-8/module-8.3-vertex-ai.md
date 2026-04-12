# Module 8.3: Google Cloud Vertex AI

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Understand what Vertex AI is and how it differs from Google AI Studio
- Know when to use Vertex AI versus the standard Gemini API
- Understand model tuning and fine-tuning concepts
- Grasp enterprise security and compliance features
- Compare pricing between different Gemini access methods
- Make an informed decision about which platform fits your needs

## 📖 Theory

### What Is Vertex AI?

Think of Google AI Studio as a cozy home kitchen. It is great for cooking meals, experimenting with recipes, and feeding your family. Now think of Vertex AI as a professional commercial kitchen in a restaurant. It has industrial equipment, food safety certifications, multiple stations for different chefs, and can serve hundreds of customers at once.

Both kitchens can make the same food (use the same Gemini models). The difference is in scale, control, safety certifications, and professional features.

**Google AI Studio** is:
- Free or low-cost to start
- Quick to set up (just an API key)
- Great for personal projects, prototypes, and small apps
- Limited customization

**Vertex AI** is:
- Part of Google Cloud Platform (GCP)
- Enterprise-grade with security, compliance, and governance
- Supports model tuning and custom training
- Has monitoring, logging, and deployment pipelines
- Designed for production applications serving many users

### When Should You Use Vertex AI?

Here is a simple decision guide:

**Stick with AI Studio / Standard API if:**
- You are building a personal project or prototype
- Your app has a small number of users (under 100)
- You do not handle sensitive data (medical, financial, personal)
- You want the simplest setup possible
- Budget is very limited

**Move to Vertex AI if:**
- You are building for a business with real customers
- You handle sensitive or regulated data
- You need guaranteed uptime and performance
- You want to customize (fine-tune) the model for your specific use case
- Your company requires audit trails and access controls
- You need to deploy across multiple regions

### Model Tuning: Making Gemini Your Own

Out of the box, Gemini is a general-purpose model. It is like hiring a talented generalist. **Model tuning** is the process of training Gemini on your specific data so it becomes a specialist in your domain.

There are two levels of customization:

**1. Prompt Tuning (Lighter)**
You give the model examples of ideal input-output pairs, and it learns your preferred style and format. It is like giving a new employee a handbook of "here is how we do things."

- Easier and cheaper
- No coding required (can be done in the Vertex AI console)
- Good for style, tone, and format adjustments
- Typically needs 50-500 examples

**2. Fine-Tuning (Deeper)**
You retrain parts of the model on your specific dataset. This is like sending that employee to a specialized training course.

- More powerful customization
- Requires more data (hundreds to thousands of examples)
- More expensive and time-consuming
- Best for domain-specific terminology, reasoning patterns, or specialized tasks

### Example: When Tuning Makes Sense

Imagine you run a legal firm. Gemini is good at general text, but it does not know your specific legal templates, your writing style, or the specific clauses your firm prefers in contracts.

With fine-tuning, you could train Gemini on:
- 500 contracts your firm has written
- 200 legal memos in your preferred format
- 100 client communications in your firm's tone

After tuning, Gemini would draft contracts that sound like they came from your senior partner, not a generic AI.

### Enterprise Security and Compliance

For businesses handling sensitive data, security is not optional. Vertex AI provides several layers of protection:

**Data Privacy:**
- Your data never leaves your Google Cloud project
- Google does not use your data to train its models
- Data is encrypted at rest and in transit
- You control data residency (which country/region stores your data)

**Access Control:**
- IAM (Identity and Access Management) — control who can access what
- Service accounts with minimal permissions
- Audit logs — every API call is recorded
- VPC Service Controls — restrict data to your private network

**Compliance Certifications:**
- SOC 1, SOC 2, SOC 3 (security controls)
- ISO 27001 (information security)
- HIPAA (healthcare data in the US)
- GDPR compliant (European data protection)
- FedRAMP (US government)

Think of it this way: AI Studio is like keeping documents on your personal laptop. Vertex AI is like keeping them in a bank vault with guards, cameras, access logs, and insurance.

### Pricing Comparison

Understanding the cost difference helps you make smart decisions:

**Google AI Studio / Standard Gemini API:**
- Free tier available (limited requests per minute)
- Pay-per-use pricing (per 1,000 tokens processed)
- No minimum commitment
- Gemini 2.0 Flash: approximately $0.10 per million input tokens

**Vertex AI:**
- Pay-per-use (similar token pricing, sometimes slightly different rates)
- Additional costs for: compute resources, storage, networking
- Provisioned throughput available (guaranteed capacity at a fixed rate)
- Volume discounts for large-scale usage
- Fine-tuning has separate training costs

**Rule of thumb:** For small to medium projects (under $100/month in API costs), the standard API is usually more cost-effective. For large-scale production (thousands of daily users), Vertex AI's provisioned throughput and enterprise features often provide better value.

## 💻 Code Example 1: Using Gemini Through Vertex AI

This example shows how to use Gemini through the Vertex AI SDK instead of the standard API. The model is the same, but the setup and authentication are different.

```python
# vertex_ai_setup.py
# Using Gemini through Google Cloud Vertex AI

# First, install the Vertex AI SDK:
# pip install google-cloud-aiplatform

import vertexai
from vertexai.generative_models import GenerativeModel, Part

# Initialize Vertex AI with your project details
# You need a Google Cloud project with Vertex AI API enabled
vertexai.init(
    project="your-gcp-project-id",  # Your Google Cloud project ID
    location="us-central1"           # The region (choose one close to your users)
)

# Create the model — same Gemini, different access path
model = GenerativeModel("gemini-2.0-flash")

# Basic text generation — works the same as the standard API
response = model.generate_content(
    "Explain the difference between machine learning and deep learning "
    "in simple terms suitable for a business executive."
)
print("BASIC RESPONSE:")
print(response.text)

# ---- Vertex AI specific features ----

# Feature 1: Safety settings with fine-grained control
from vertexai.generative_models import HarmCategory, HarmBlockThreshold

model_with_safety = GenerativeModel(
    "gemini-2.0-flash",
    safety_settings={
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
)

# Feature 2: System instructions for consistent behavior
model_with_system = GenerativeModel(
    "gemini-2.0-flash",
    system_instruction="You are a helpful customer service agent for TechCorp. "
                       "Always be polite and professional. Never discuss competitor "
                       "products. If you don't know the answer, direct the customer "
                       "to support@techcorp.com."
)

response = model_with_system.generate_content(
    "How does your product compare to the competition?"
)
print("\nSYSTEM INSTRUCTION RESPONSE:")
print(response.text)

# Feature 3: Generation config for precise control
from vertexai.generative_models import GenerationConfig

config = GenerationConfig(
    temperature=0.2,       # Low creativity — more factual and consistent
    top_p=0.8,             # Focused responses
    top_k=40,              # Consider top 40 token choices
    max_output_tokens=500, # Limit response length
    candidate_count=1      # Generate one response
)

response = model.generate_content(
    "List the top 3 benefits of cloud computing for small businesses.",
    generation_config=config
)
print("\nCONFIGURED RESPONSE:")
print(response.text)
```

### Expected Output:

```
BASIC RESPONSE:
Think of it this way: Machine Learning (ML) is like teaching a
computer to recognize patterns by showing it lots of examples.
Deep Learning is a specific type of ML that uses "neural networks"
— inspired by how the human brain works — to handle more complex
tasks like understanding images or human speech...

SYSTEM INSTRUCTION RESPONSE:
Thank you for your interest in our products! While I'm not able to
discuss specific competitor comparisons, I'd love to tell you about
what makes TechCorp special. Our products are designed with...
If you'd like a detailed feature overview, please reach out to
support@techcorp.com and our team will be happy to help!

CONFIGURED RESPONSE:
1. **Cost Savings**: Cloud computing eliminates the need to buy and
   maintain expensive servers. You pay only for what you use.
2. **Scalability**: Easily scale up during busy periods and scale
   down when demand is lower, without buying new hardware.
3. **Remote Access**: Your team can access files and applications
   from anywhere with an internet connection.
```

## 💻 Code Example 2: Monitoring and Logging in Vertex AI

This example demonstrates how to set up monitoring for your AI application — tracking usage, performance, and costs.

```python
# vertex_monitoring.py
# Monitor your Vertex AI usage and performance

import vertexai
from vertexai.generative_models import GenerativeModel
import time
import json

vertexai.init(project="your-gcp-project-id", location="us-central1")

model = GenerativeModel("gemini-2.0-flash")

# Build a simple monitoring wrapper
class MonitoredModel:
    """Wraps a Gemini model with monitoring and logging."""

    def __init__(self, model):
        self.model = model
        self.request_log = []    # Track all requests
        self.total_requests = 0
        self.total_input_tokens = 0
        self.total_output_tokens = 0
        self.total_latency_ms = 0

    def generate(self, prompt, **kwargs):
        """Generate content with monitoring."""

        # Record start time
        start_time = time.time()
        self.total_requests += 1

        try:
            # Make the API call
            response = self.model.generate_content(prompt, **kwargs)

            # Calculate latency
            latency_ms = (time.time() - start_time) * 1000

            # Extract token usage from response metadata
            usage = response.usage_metadata
            input_tokens = usage.prompt_token_count
            output_tokens = usage.candidates_token_count

            # Update totals
            self.total_input_tokens += input_tokens
            self.total_output_tokens += output_tokens
            self.total_latency_ms += latency_ms

            # Log this request
            log_entry = {
                "request_number": self.total_requests,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                "prompt_preview": prompt[:80] + "..." if len(prompt) > 80 else prompt,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "latency_ms": round(latency_ms, 1),
                "status": "success"
            }
            self.request_log.append(log_entry)

            return response

        except Exception as e:
            latency_ms = (time.time() - start_time) * 1000
            self.request_log.append({
                "request_number": self.total_requests,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                "status": "error",
                "error": str(e),
                "latency_ms": round(latency_ms, 1)
            })
            raise

    def get_stats(self):
        """Return usage statistics."""
        avg_latency = (self.total_latency_ms / self.total_requests
                       if self.total_requests > 0 else 0)

        # Estimate cost (approximate rates for Gemini 2.0 Flash)
        input_cost = (self.total_input_tokens / 1_000_000) * 0.10
        output_cost = (self.total_output_tokens / 1_000_000) * 0.40
        total_cost = input_cost + output_cost

        return {
            "total_requests": self.total_requests,
            "total_input_tokens": self.total_input_tokens,
            "total_output_tokens": self.total_output_tokens,
            "average_latency_ms": round(avg_latency, 1),
            "estimated_cost_usd": round(total_cost, 4),
            "errors": sum(1 for log in self.request_log if log["status"] == "error")
        }

    def print_dashboard(self):
        """Print a monitoring dashboard."""
        stats = self.get_stats()
        print("\n" + "=" * 55)
        print("     VERTEX AI MONITORING DASHBOARD")
        print("=" * 55)
        print(f"  Total Requests:      {stats['total_requests']}")
        print(f"  Input Tokens:        {stats['total_input_tokens']:,}")
        print(f"  Output Tokens:       {stats['total_output_tokens']:,}")
        print(f"  Avg Latency:         {stats['average_latency_ms']} ms")
        print(f"  Errors:              {stats['errors']}")
        print(f"  Estimated Cost:      ${stats['estimated_cost_usd']:.4f}")
        print("=" * 55)

        print("\n  Request Log:")
        for log in self.request_log[-5:]:  # Show last 5 requests
            status_icon = "OK" if log["status"] == "success" else "ERR"
            print(f"  [{status_icon}] #{log['request_number']} | "
                  f"{log.get('input_tokens', '?')} in / "
                  f"{log.get('output_tokens', '?')} out | "
                  f"{log['latency_ms']}ms")


# ---- Use the monitored model ----
monitored = MonitoredModel(model)

# Make several requests
prompts = [
    "What is cloud computing in one paragraph?",
    "List 5 benefits of using AI in business.",
    "Write a short product description for wireless headphones.",
    "Explain what an API is to a non-technical person.",
]

for prompt in prompts:
    response = monitored.generate(prompt)
    print(f"Prompt: {prompt[:50]}...")
    print(f"Response: {response.text[:100]}...\n")

# Show the monitoring dashboard
monitored.print_dashboard()
```

### Expected Output:

```
Prompt: What is cloud computing in one paragraph?...
Response: Cloud computing is the delivery of computing services — including servers, storage, databases...

Prompt: List 5 benefits of using AI in business....
Response: 1. Automation of repetitive tasks, freeing up employee time for strategic work...

Prompt: Write a short product description for wireless h...
Response: Experience pure audio freedom with our premium wireless headphones...

Prompt: Explain what an API is to a non-technical person...
Response: An API is like a waiter in a restaurant. You (the customer) tell the waiter...

=======================================================
     VERTEX AI MONITORING DASHBOARD
=======================================================
  Total Requests:      4
  Input Tokens:        156
  Output Tokens:       612
  Avg Latency:         823.4 ms
  Errors:              0
  Estimated Cost:      $0.0003
=======================================================

  Request Log:
  [OK] #1 | 28 in / 145 out | 756.2ms
  [OK] #2 | 34 in / 178 out | 891.3ms
  [OK] #3 | 42 in / 156 out | 812.7ms
  [OK] #4 | 52 in / 133 out | 833.5ms
```

## ✍️ Hands-On Exercises

### Exercise 1: Build Your Decision Matrix
Create a spreadsheet or document comparing AI Studio vs Vertex AI for a project you are interested in. Evaluate both options across: cost, setup complexity, security features, scalability, and customization options. Based on your analysis, which would you choose and why?

**Hint:** Consider your current needs AND where you might be in 6-12 months. Sometimes starting with AI Studio and planning a migration to Vertex AI later is the smartest approach.

### Exercise 2: Design a Fine-Tuning Dataset
Choose a specific task you want Gemini to be better at (e.g., writing emails in your company's tone, classifying support tickets in your categories, generating product descriptions in your brand style). Create 20 example input-output pairs that you would use for fine-tuning. Think about what makes a great example vs. a poor one.

**Hint:** Great fine-tuning examples are diverse (covering different scenarios), high-quality (representing the output you actually want), and consistent (following the same format and style). Do not just create 20 variations of the same example.

## 🔗 Next Steps

In the next module, you will learn how to bring Gemini to mobile apps — using Gemini Nano for on-device AI on Android, building cross-platform apps with Flutter, and understanding when to use on-device vs. cloud processing.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1"><p>1. What is the best analogy for the difference between AI Studio and Vertex AI?</p><label><input type="radio" name="q1" value="0"> A. A bicycle vs. a car</label><label><input type="radio" name="q1" value="1"> B. A home kitchen vs. a professional commercial kitchen</label><label><input type="radio" name="q1" value="2"> C. A book vs. a movie</label><label><input type="radio" name="q1" value="3"> D. A phone vs. a computer</label><div class="quiz-explain">Both a home kitchen and a commercial kitchen can make the same food (use the same models), but the commercial kitchen has industrial equipment, certifications, and capacity to serve many customers — just like Vertex AI has enterprise features for production use.</div></div>

<div class="quiz-q" data-answer="0"><p>2. When should a small startup typically use the standard Gemini API instead of Vertex AI?</p><label><input type="radio" name="q2" value="0"> A. When building prototypes with limited budget and few users</label><label><input type="radio" name="q2" value="1"> B. When handling sensitive medical data</label><label><input type="radio" name="q2" value="2"> C. When serving thousands of customers daily</label><label><input type="radio" name="q2" value="3"> D. When they need compliance certifications</label><div class="quiz-explain">The standard API is ideal for early-stage projects: it is quick to set up, has a free tier, and works well for prototypes and small user bases. Vertex AI becomes necessary as you scale and need enterprise features.</div></div>

<div class="quiz-q" data-answer="2"><p>3. What is the difference between "prompt tuning" and "fine-tuning"?</p><label><input type="radio" name="q3" value="0"> A. They are exactly the same thing</label><label><input type="radio" name="q3" value="1"> B. Prompt tuning changes the model permanently; fine-tuning is temporary</label><label><input type="radio" name="q3" value="2"> C. Prompt tuning adjusts style with examples; fine-tuning retrains parts of the model more deeply</label><label><input type="radio" name="q3" value="3"> D. Fine-tuning is free; prompt tuning costs extra</label><div class="quiz-explain">Prompt tuning is lighter — you provide examples and the model learns your preferred style. Fine-tuning is deeper — it retrains parts of the model on your data, allowing it to learn domain-specific knowledge and patterns.</div></div>

<div class="quiz-q" data-answer="3"><p>4. Which compliance certification is specifically for healthcare data in the US?</p><label><input type="radio" name="q4" value="0"> A. SOC 2</label><label><input type="radio" name="q4" value="1"> B. GDPR</label><label><input type="radio" name="q4" value="2"> C. ISO 27001</label><label><input type="radio" name="q4" value="3"> D. HIPAA</label><div class="quiz-explain">HIPAA (Health Insurance Portability and Accountability Act) is the US regulation for protecting sensitive healthcare data. If your application handles medical information, HIPAA compliance is mandatory.</div></div>

<div class="quiz-q" data-answer="1"><p>5. What does "data residency" mean in Vertex AI?</p><label><input type="radio" name="q5" value="0"> A. How long data is stored before deletion</label><label><input type="radio" name="q5" value="1"> B. The ability to control which country or region your data is stored in</label><label><input type="radio" name="q5" value="2"> C. Whether data is stored in the cloud or on your local computer</label><label><input type="radio" name="q5" value="3"> D. The format in which data is stored</label><div class="quiz-explain">Data residency means you control the geographic location where your data is processed and stored. This is crucial for businesses that must comply with regulations requiring data to stay within specific countries or regions (like GDPR in Europe).</div></div>

<div class="quiz-q" data-answer="0"><p>6. How many examples are typically needed for prompt tuning?</p><label><input type="radio" name="q6" value="0"> A. 50 to 500 examples</label><label><input type="radio" name="q6" value="1"> B. Just 1 or 2 examples</label><label><input type="radio" name="q6" value="2"> C. At least 100,000 examples</label><label><input type="radio" name="q6" value="3"> D. No examples are needed</label><div class="quiz-explain">Prompt tuning typically requires 50 to 500 high-quality examples. This is enough for the model to learn your preferred style, format, and patterns without requiring the massive datasets that deeper fine-tuning needs.</div></div>

<div class="quiz-q" data-answer="2"><p>7. What is the purpose of the monitoring dashboard in Code Example 2?</p><label><input type="radio" name="q7" value="0"> A. To make the application look more professional</label><label><input type="radio" name="q7" value="1"> B. To slow down API requests for safety</label><label><input type="radio" name="q7" value="2"> C. To track usage, costs, performance, and errors so you can optimize your application</label><label><input type="radio" name="q7" value="3"> D. To comply with Google's API requirements</label><div class="quiz-explain">Monitoring helps you understand how your application uses the API — how many tokens you consume, how fast responses are, what errors occur, and what it costs. This information is essential for optimizing performance and managing budgets.</div></div>

<div class="quiz-q" data-answer="3"><p>8. Why does Google state that "your data is never used to train its models" on Vertex AI?</p><label><input type="radio" name="q8" value="0"> A. Because they have enough training data already</label><label><input type="radio" name="q8" value="1"> B. Because it would make the model worse</label><label><input type="radio" name="q8" value="2"> C. Because training on customer data is technically impossible</label><label><input type="radio" name="q8" value="3"> D. To assure businesses that their sensitive and proprietary data remains private and secure</label><div class="quiz-explain">This is a critical enterprise promise. Businesses need to know that their trade secrets, customer data, and proprietary information will not be absorbed into a public AI model. Without this guarantee, many companies would not use the service.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
