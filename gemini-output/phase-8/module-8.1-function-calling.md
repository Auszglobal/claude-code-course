# Module 8.1: Function Calling in Gemini

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Understand what function calling is and why it matters
- Define tools and functions that Gemini can use
- Connect Gemini to real-world APIs and external services
- Build a weather bot that calls a live API based on user questions
- Handle errors and validate function inputs properly

## 📖 Theory

### What Is Function Calling?

Imagine you have a very smart friend who knows a lot about the world but is stuck in a room with no internet, no phone, and no access to the outside world. They can answer general questions brilliantly, but if you ask "What is the weather right now in Tokyo?" — they have no way to find out.

**Function calling** gives your smart friend a phone. You tell them: "Here are some tools you can use. If someone asks about the weather, you can call this weather service. If someone asks about a stock price, you can call this financial data service."

Now your friend can:
1. Hear the question ("What is the weather in Tokyo?")
2. Decide which tool to use (the weather service)
3. Tell you what to look up (city: "Tokyo")
4. Read the result and give a natural answer ("It is currently 22 degrees and sunny in Tokyo!")

That is function calling in a nutshell. Gemini is the smart friend. Functions are the tools you give it access to. Your code is the bridge that actually executes the function and sends the result back.

### Why Does This Matter?

Without function calling, Gemini can only work with information in its training data (which has a cutoff date) and whatever you put in the prompt. With function calling, Gemini can:

- **Check live data** — weather, stock prices, sports scores
- **Search databases** — look up customer records, product inventory
- **Perform actions** — send emails, create calendar events, place orders
- **Access APIs** — connect to any web service with an API

This transforms Gemini from a "chatbot that knows stuff" into an **AI agent that can actually do things** in the real world.

### How Function Calling Works (Step by Step)

The process has four key steps, like a relay race:

1. **You define the functions** — You tell Gemini what tools are available, what they do, and what parameters they need. This is like giving someone a menu of services.

2. **The user asks a question** — "What is the weather in Sydney?"

3. **Gemini decides to call a function** — Instead of guessing, Gemini says "I need to call the get_weather function with city='Sydney'." It does not actually call the function — it tells your code to call it.

4. **Your code executes and returns the result** — Your code calls the real weather API, gets the data, and sends it back to Gemini. Gemini then writes a natural language response using that data.

The key insight: **Gemini never calls the function directly.** It tells your code which function to call and with what parameters. Your code is always in control, which is important for security and reliability.

### Defining Functions: The Schema

When you define a function for Gemini, you need to describe it using a structured format (a "schema"). Think of it like writing a job description:

- **Name** — What is the function called? (e.g., `get_weather`)
- **Description** — What does it do? (e.g., "Gets current weather for a city")
- **Parameters** — What inputs does it need? (e.g., `city` as a string, `units` as "celsius" or "fahrenheit")
- **Required parameters** — Which inputs are mandatory?

The clearer your function descriptions, the better Gemini will be at deciding when and how to use them.

## 💻 Code Example 1: Weather Bot with Function Calling

This example creates a weather bot. Gemini analyzes the user's question, decides it needs weather data, and tells your code to fetch it.

```python
# weather_bot.py
# A weather bot using Gemini's function calling feature

import google.generativeai as genai
import json
import requests  # For calling the real weather API

genai.configure(api_key="YOUR_GEMINI_API_KEY")

# Step 1: Define the function that Gemini can call
# This is the "menu of services" we give to Gemini
get_weather_function = genai.protos.FunctionDeclaration(
    name="get_current_weather",
    description="Gets the current weather conditions for a specified city. "
                "Use this when the user asks about weather, temperature, "
                "or climate conditions in any location.",
    parameters=genai.protos.Schema(
        type=genai.protos.Type.OBJECT,
        properties={
            "city": genai.protos.Schema(
                type=genai.protos.Type.STRING,
                description="The city name, e.g., 'Sydney', 'London', 'Tokyo'"
            ),
            "country_code": genai.protos.Schema(
                type=genai.protos.Type.STRING,
                description="Optional ISO country code, e.g., 'AU', 'GB', 'JP'"
            )
        },
        required=["city"]
    )
)

# Bundle the function into a "tool" for Gemini
weather_tool = genai.protos.Tool(
    function_declarations=[get_weather_function]
)

# Create the model with the tool enabled
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    tools=[weather_tool]
)

# Step 2: The real function that fetches weather data
# In production, use a real API like OpenWeatherMap (free tier available)
def fetch_weather(city, country_code=None):
    """Fetch real weather data from an API."""

    # For this demo, we simulate the API response
    # In real use, replace this with an actual API call:
    # url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}"
    # response = requests.get(url)
    # return response.json()

    simulated_data = {
        "Sydney": {"temp": 24, "condition": "Partly Cloudy", "humidity": 65, "wind": "15 km/h NE"},
        "London": {"temp": 12, "condition": "Rainy", "humidity": 85, "wind": "20 km/h W"},
        "Tokyo": {"temp": 18, "condition": "Clear", "humidity": 50, "wind": "10 km/h SE"},
    }

    city_data = simulated_data.get(city, {
        "temp": 20, "condition": "Unknown", "humidity": 50, "wind": "N/A"
    })

    return {
        "city": city,
        "temperature_celsius": city_data["temp"],
        "condition": city_data["condition"],
        "humidity": f"{city_data['humidity']}%",
        "wind": city_data["wind"]
    }

# Step 3: Chat loop that handles function calls
def chat_with_weather_bot(user_message):
    """Send a message and handle any function calls Gemini requests."""

    chat = model.start_chat()
    response = chat.send_message(user_message)

    # Check if Gemini wants to call a function
    if response.candidates[0].content.parts[0].function_call:
        function_call = response.candidates[0].content.parts[0].function_call

        # Extract the function name and arguments
        func_name = function_call.name
        func_args = dict(function_call.args)

        print(f"  [Gemini requested: {func_name}({func_args})]")

        # Execute the actual function
        if func_name == "get_current_weather":
            weather_data = fetch_weather(
                city=func_args.get("city", "Unknown"),
                country_code=func_args.get("country_code")
            )

            # Send the result back to Gemini
            response = chat.send_message(
                genai.protos.Content(
                    parts=[genai.protos.Part(
                        function_response=genai.protos.FunctionResponse(
                            name=func_name,
                            response={"result": weather_data}
                        )
                    )]
                )
            )

    return response.text

# Test the weather bot
questions = [
    "What's the weather like in Sydney right now?",
    "Is it raining in London?",
    "I'm planning a trip to Tokyo. Should I bring a jacket?"
]

for question in questions:
    print(f"\nYOU: {question}")
    answer = chat_with_weather_bot(question)
    print(f"BOT: {answer}")
    print("-" * 50)
```

### Expected Output:

```
YOU: What's the weather like in Sydney right now?
  [Gemini requested: get_current_weather({'city': 'Sydney', 'country_code': 'AU'})]
BOT: Right now in Sydney, it's 24°C and partly cloudy. The humidity
is at 65% with a northeast wind at 15 km/h. It's a lovely day —
perfect for getting outside!
--------------------------------------------------

YOU: Is it raining in London?
  [Gemini requested: get_current_weather({'city': 'London', 'country_code': 'GB'})]
BOT: Yes, it is currently raining in London. The temperature is 12°C
with high humidity at 85%. You'll definitely want to grab an umbrella
if you're heading out!
--------------------------------------------------

YOU: I'm planning a trip to Tokyo. Should I bring a jacket?
  [Gemini requested: get_current_weather({'city': 'Tokyo', 'country_code': 'JP'})]
BOT: Tokyo is currently at 18°C with clear skies. It's pleasant but
might be a bit cool in the evening, so a light jacket would be a
smart choice! The wind is gentle at 10 km/h.
--------------------------------------------------
```

## 💻 Code Example 2: Multi-Function Agent with Error Handling

This example gives Gemini multiple tools — weather, unit conversion, and a calculator — and includes proper error handling.

```python
# multi_tool_agent.py
# An AI agent with multiple tools and error handling

import google.generativeai as genai
import json

genai.configure(api_key="YOUR_API_KEY")

# Define multiple functions Gemini can use

# Tool 1: Currency converter
currency_function = genai.protos.FunctionDeclaration(
    name="convert_currency",
    description="Converts an amount from one currency to another. "
                "Use when the user asks about exchange rates or currency conversion.",
    parameters=genai.protos.Schema(
        type=genai.protos.Type.OBJECT,
        properties={
            "amount": genai.protos.Schema(
                type=genai.protos.Type.NUMBER,
                description="The amount to convert"
            ),
            "from_currency": genai.protos.Schema(
                type=genai.protos.Type.STRING,
                description="Source currency code (e.g., 'USD', 'EUR', 'AUD')"
            ),
            "to_currency": genai.protos.Schema(
                type=genai.protos.Type.STRING,
                description="Target currency code (e.g., 'USD', 'EUR', 'AUD')"
            )
        },
        required=["amount", "from_currency", "to_currency"]
    )
)

# Tool 2: Calculator
calculator_function = genai.protos.FunctionDeclaration(
    name="calculate",
    description="Performs mathematical calculations. Use for any math question "
                "including percentages, tips, tax calculations, etc.",
    parameters=genai.protos.Schema(
        type=genai.protos.Type.OBJECT,
        properties={
            "expression": genai.protos.Schema(
                type=genai.protos.Type.STRING,
                description="The math expression to evaluate (e.g., '150 * 0.15')"
            ),
            "context": genai.protos.Schema(
                type=genai.protos.Type.STRING,
                description="What the calculation is for (e.g., 'tip calculation')"
            )
        },
        required=["expression"]
    )
)

# Bundle all tools
all_tools = genai.protos.Tool(
    function_declarations=[currency_function, calculator_function]
)

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    tools=[all_tools],
    system_instruction="You are a helpful assistant with access to currency "
                       "conversion and calculation tools. Always use tools for "
                       "precise answers rather than guessing. Be friendly and clear."
)

# Implement the actual functions with error handling
def execute_function(func_name, func_args):
    """Execute a function by name with error handling."""

    try:
        if func_name == "convert_currency":
            # Simulated exchange rates (use a real API in production)
            rates = {
                ("USD", "EUR"): 0.92, ("EUR", "USD"): 1.09,
                ("USD", "GBP"): 0.79, ("GBP", "USD"): 1.27,
                ("USD", "AUD"): 1.53, ("AUD", "USD"): 0.65,
                ("EUR", "GBP"): 0.86, ("GBP", "EUR"): 1.16,
                ("AUD", "EUR"): 0.60, ("EUR", "AUD"): 1.67,
            }

            amount = func_args["amount"]
            from_curr = func_args["from_currency"].upper()
            to_curr = func_args["to_currency"].upper()

            # Validate inputs
            if amount <= 0:
                return {"error": "Amount must be positive"}

            if from_curr == to_curr:
                return {"result": amount, "rate": 1.0, "note": "Same currency"}

            rate = rates.get((from_curr, to_curr))
            if rate is None:
                return {"error": f"Exchange rate for {from_curr} to {to_curr} not available"}

            converted = round(amount * rate, 2)
            return {
                "original": f"{amount} {from_curr}",
                "converted": f"{converted} {to_curr}",
                "rate": rate,
                "note": f"1 {from_curr} = {rate} {to_curr}"
            }

        elif func_name == "calculate":
            expression = func_args["expression"]

            # Safety check: only allow safe math characters
            allowed_chars = set("0123456789+-*/().% ")
            if not all(c in allowed_chars for c in expression):
                return {"error": "Expression contains invalid characters"}

            # Convert percentage to decimal for calculation
            expr_clean = expression.replace("%", "/100")
            result = eval(expr_clean)  # Safe because we validated the input
            return {
                "expression": expression,
                "result": round(result, 2),
                "context": func_args.get("context", "calculation")
            }

        else:
            return {"error": f"Unknown function: {func_name}"}

    except Exception as e:
        return {"error": f"Function execution failed: {str(e)}"}


def ask_agent(user_message):
    """Send a message to the multi-tool agent."""

    chat = model.start_chat()
    response = chat.send_message(user_message)

    # Handle function calls (there might be multiple)
    while response.candidates[0].content.parts[0].function_call:
        function_call = response.candidates[0].content.parts[0].function_call
        func_name = function_call.name
        func_args = dict(function_call.args)

        print(f"  [Tool: {func_name}({func_args})]")

        # Execute and get result
        result = execute_function(func_name, func_args)

        # Send result back to Gemini
        response = chat.send_message(
            genai.protos.Content(
                parts=[genai.protos.Part(
                    function_response=genai.protos.FunctionResponse(
                        name=func_name,
                        response={"result": result}
                    )
                )]
            )
        )

    return response.text

# Test with various questions
test_questions = [
    "How much is 500 US dollars in euros?",
    "I have a dinner bill of $85. How much is a 18% tip?",
    "I'm traveling from Australia to the UK. How much is 2000 AUD in British pounds?",
]

for q in test_questions:
    print(f"\nYOU: {q}")
    answer = ask_agent(q)
    print(f"AGENT: {answer}")
    print("-" * 50)
```

### Expected Output:

```
YOU: How much is 500 US dollars in euros?
  [Tool: convert_currency({'amount': 500, 'from_currency': 'USD', 'to_currency': 'EUR'})]
AGENT: 500 US dollars is approximately 460 euros. The current
exchange rate is 1 USD = 0.92 EUR.
--------------------------------------------------

YOU: I have a dinner bill of $85. How much is a 18% tip?
  [Tool: calculate({'expression': '85 * 0.18', 'context': 'tip calculation'})]
AGENT: An 18% tip on an $85 dinner bill comes to $15.30. That
would make your total bill $100.30. Enjoy your meal!
--------------------------------------------------
```

## ✍️ Hands-On Exercises

### Exercise 1: Add a New Tool
Add a third function to the multi-tool agent — a "time zone converter" that tells you what time it is in different cities. Define the function declaration, implement the actual logic (you can use simulated data with UTC offsets), and test it with questions like "What time is it in Tokyo if it's 3 PM in New York?"

**Hint:** Your function declaration needs a clear description so Gemini knows when to use it. Include parameters like `source_city`, `source_time`, and `target_city`.

### Exercise 2: Build a Restaurant Booking Bot
Create a function-calling bot that can check restaurant availability, make reservations, and get menu information. Define three functions: `check_availability(restaurant, date, party_size)`, `make_reservation(restaurant, date, time, party_size, name)`, and `get_menu(restaurant)`. Use simulated data for responses.

**Hint:** Start by defining all three function declarations, then implement each function with simulated data (a dictionary of restaurants with available times and menus).

## 🔗 Next Steps

In the next module, you will learn about RAG (Retrieval Augmented Generation) — a powerful technique that lets Gemini answer questions using your own documents and data. This is how you build a Q&A system for your company's knowledge base.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1"><p>1. What is the best analogy for function calling?</p><label><input type="radio" name="q1" value="0"> A. Teaching AI to write better</label><label><input type="radio" name="q1" value="1"> B. Giving a smart friend a phone so they can look up real-world information</label><label><input type="radio" name="q1" value="2"> C. Making the AI run faster</label><label><input type="radio" name="q1" value="3"> D. Storing data in a database</label><div class="quiz-explain">Function calling is like giving a phone to someone stuck in a room. Gemini is very knowledgeable but cannot access live data on its own. Functions give it the ability to reach out and get real-time information.</div></div>

<div class="quiz-q" data-answer="3"><p>2. Does Gemini directly execute functions when using function calling?</p><label><input type="radio" name="q2" value="0"> A. Yes, Gemini calls the API directly</label><label><input type="radio" name="q2" value="1"> B. Yes, but only for Google services</label><label><input type="radio" name="q2" value="2"> C. Yes, Gemini runs the Python code internally</label><label><input type="radio" name="q2" value="3"> D. No — Gemini tells your code which function to call and with what parameters</label><div class="quiz-explain">This is a critical concept: Gemini never executes functions directly. It generates a function call request, and your code is responsible for actually executing it. This keeps you in control and ensures security.</div></div>

<div class="quiz-q" data-answer="0"><p>3. What are the four steps of the function calling process?</p><label><input type="radio" name="q3" value="0"> A. Define functions, user asks question, Gemini requests function call, code executes and returns result</label><label><input type="radio" name="q3" value="1"> B. Write code, compile, run, debug</label><label><input type="radio" name="q3" value="2"> C. Input, process, output, store</label><label><input type="radio" name="q3" value="3"> D. Plan, design, build, test</label><div class="quiz-explain">The four steps are: (1) define the available functions, (2) the user asks a question, (3) Gemini decides which function to call and with what arguments, (4) your code executes the function and returns the result to Gemini.</div></div>

<div class="quiz-q" data-answer="2"><p>4. What must you include when defining a function for Gemini?</p><label><input type="radio" name="q4" value="0"> A. Only the function name</label><label><input type="radio" name="q4" value="1"> B. Only the parameters it accepts</label><label><input type="radio" name="q4" value="2"> C. Name, description, parameters (with types), and which parameters are required</label><label><input type="radio" name="q4" value="3"> D. The complete source code of the function</label><div class="quiz-explain">A function declaration needs a clear name, description (so Gemini knows when to use it), parameter definitions with their types and descriptions, and information about which parameters are required vs. optional.</div></div>

<div class="quiz-q" data-answer="1"><p>5. Why is error handling important in function calling?</p><label><input type="radio" name="q5" value="0"> A. Gemini crashes without error handling</label><label><input type="radio" name="q5" value="1"> B. External APIs can fail, and your bot needs to respond gracefully instead of crashing</label><label><input type="radio" name="q5" value="2"> C. Google requires it for billing purposes</label><label><input type="radio" name="q5" value="3"> D. Error handling makes the code run faster</label><div class="quiz-explain">When you call external APIs, many things can go wrong: the API might be down, the data might be missing, or the request might be invalid. Error handling ensures your bot responds gracefully instead of crashing.</div></div>

<div class="quiz-q" data-answer="0"><p>6. In Code Example 2, why does the calculator function validate input characters?</p><label><input type="radio" name="q6" value="0"> A. To prevent malicious code from being executed through the eval() function</label><label><input type="radio" name="q6" value="1"> B. To make the calculations more accurate</label><label><input type="radio" name="q6" value="2"> C. Because Gemini only understands certain characters</label><label><input type="radio" name="q6" value="3"> D. To reduce the API response time</label><div class="quiz-explain">The eval() function executes any Python code, which is a security risk. By checking that only math characters (numbers, operators, parentheses) are present, we prevent anyone from injecting harmful code like file deletions or data theft.</div></div>

<div class="quiz-q" data-answer="2"><p>7. What happens if Gemini receives a question that does not require any function call?</p><label><input type="radio" name="q7" value="0"> A. It calls a random function anyway</label><label><input type="radio" name="q7" value="1"> B. It returns an error</label><label><input type="radio" name="q7" value="2"> C. It responds normally with text, without requesting any function call</label><label><input type="radio" name="q7" value="3"> D. It asks the user to rephrase the question</label><div class="quiz-explain">Gemini is smart enough to know when it needs a tool and when it does not. If you ask "How are you?" it will just respond with text. It only requests function calls when the question requires real-time or external data.</div></div>

<div class="quiz-q" data-answer="3"><p>8. What makes a good function description in the schema?</p><label><input type="radio" name="q8" value="0"> A. Keeping it as short as possible — one or two words</label><label><input type="radio" name="q8" value="1"> B. Writing it in JSON format</label><label><input type="radio" name="q8" value="2"> C. Including the source code of the function</label><label><input type="radio" name="q8" value="3"> D. Clearly explaining what the function does and when to use it</label><div class="quiz-explain">The description helps Gemini decide when to use each function. A clear description like "Gets current weather conditions for a city. Use when the user asks about weather, temperature, or climate" is much better than just "weather function."</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
