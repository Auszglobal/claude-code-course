# Module 4.2: Introduction to API Integration

## 🎯 Learning Objectives
- After completing this lesson, you will be able to...
  - Understand what an API is and how it works
  - Know what JSON is and read basic JSON format
  - Use Claude Code to write programs that call APIs
  - Build a weather lookup tool
  - Build a random quote display

## 📖 Theory

### What Is an API?

**API** (Application Programming Interface) sounds complicated, but the concept is actually quite simple.

Imagine you're at a restaurant:
- You (the program) are sitting at a table and want a steak
- The **waiter (API)** takes your order
- The waiter delivers the order to the **kitchen (server)**
- The kitchen prepares the food, and the waiter brings the **steak (data)** to your table

You don't need to know how the kitchen works, and you don't need to go to the kitchen yourself. You just tell the waiter what you want, and the waiter handles the rest.

**An API is that waiter** — it's the communication bridge between your program and an external service.

### What Is JSON?

When an API returns data, it typically uses a format called **JSON**. Think of JSON as a **structured form**:

```json
{
  "city": "Sydney",
  "temperature": 28,
  "weather": "Sunny",
  "humidity": 65
}
```

See? It's like filling out a form:
- The left side is the **field name** (wrapped in quotes)
- The right side is the **field value**
- Curly braces `{}` wrap the entire form
- Each line is separated by a comma

### Common Free APIs

Here are some free APIs that don't require registration, perfect for practice:

| API | Purpose | URL |
|-----|------|------|
| wttr.in | Weather information | `https://wttr.in` |
| quotable.io | Random quotes | `https://api.quotable.io` |
| dog.ceo | Random dog pictures | `https://dog.ceo/api` |
| jsonplaceholder | Fake data for practice | `https://jsonplaceholder.typicode.com` |

---

## 💻 Code Example 1: Build a Weather Lookup Tool

Let's use Claude Code to build a small tool that can look up the weather for any city.

First, create a project folder:

```bash
mkdir weather-checker
cd weather-checker
```

Start Claude Code and enter:

```
Help me build a weather lookup tool in Python with these requirements:
1. Use the wttr.in API (no API key needed)
2. Let the user enter a city name
3. Display the city's: current temperature, weather conditions, humidity
4. Output should be nicely formatted and easy to read
5. Show a friendly error message if the city name is invalid
6. Add detailed comments in the code
```

Claude Code will generate a program similar to this:

```python
# weather.py — Weather lookup tool
import requests  # Library for making web requests
import json      # Library for handling JSON data

def get_weather(city):
    """Look up weather information for a given city"""
    # Build the API URL (like telling the waiter what you want)
    url = f"https://wttr.in/{city}?format=j1"

    try:
        # Send a request to the API (like handing your order to the waiter)
        response = requests.get(url, timeout=10)

        # Check if it was successful (did the waiter come back?)
        if response.status_code == 200:
            # Parse the JSON response (open the plate the waiter brought)
            data = response.json()

            # Extract the information we need
            current = data["current_condition"][0]
            temp = current["temp_C"]           # Current temperature (Celsius)
            desc = current["weatherDesc"][0]["value"]  # Weather description
            humidity = current["humidity"]     # Humidity percentage
            feels_like = current["FeelsLikeC"] # Feels-like temperature

            # Display the results nicely
            print(f"\n{'='*40}")
            print(f"  Current Weather in {city}")
            print(f"{'='*40}")
            print(f"  Temperature:   {temp}°C")
            print(f"  Feels Like:    {feels_like}°C")
            print(f"  Conditions:    {desc}")
            print(f"  Humidity:      {humidity}%")
            print(f"{'='*40}\n")
        else:
            print(f"Could not find weather info for '{city}'. Please check the city name.")

    except requests.exceptions.ConnectionError:
        print("Unable to connect to the internet. Please check your network connection.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Main program
if __name__ == "__main__":
    print("Weather Lookup Tool")
    print("-" * 20)
    city = input("Enter a city name: ")       # Wait for user input
    get_weather(city)                          # Call the lookup function
```

### Expected Output:

Run the program:

```bash
python weather.py
```

📸 [What you should see]
```
┌──────────────────────────────────────┐
│ Weather Lookup Tool                   │
│ --------------------                  │
│ Enter a city name: Sydney             │
│                                       │
│ ========================================│
│   Current Weather in Sydney            │
│ ========================================│
│   Temperature:   22°C                  │
│   Feels Like:    20°C                  │
│   Conditions:    Partly cloudy         │
│   Humidity:      65%                   │
│ ========================================│
└──────────────────────────────────────┘
```

> **Note**: Before running, make sure you have the `requests` package installed. If not, run `pip install requests` in the terminal.

---

## 💻 Code Example 2: Random Quote Display

Next, let's build a small program that shows random quotes. Enter in Claude Code:

```
Help me build a random quote display in Python with these requirements:
1. Use the https://dummyjson.com/quotes/random API
2. Each time it runs, show one random quote and its author
3. Add a loop: press Enter to see the next quote, type q to quit
4. Output should have a nice border
5. Add detailed comments in the code
```

Claude Code will generate a program similar to this:

```python
# quotes.py — Random quote display
import requests  # For making web requests

def get_random_quote():
    """Fetch a random quote from the API"""
    # API endpoint (the waiter's window)
    url = "https://dummyjson.com/quotes/random"

    try:
        # Send a request to the API
        response = requests.get(url, timeout=10)

        if response.status_code == 200:
            # Parse the returned JSON data
            data = response.json()

            quote = data["quote"]    # The quote text
            author = data["author"]  # The author's name

            return quote, author
        else:
            return None, None

    except Exception:
        return None, None

def display_quote(quote, author):
    """Display a quote in a nice format"""
    # Calculate border width (quote length + some padding)
    width = min(max(len(quote), len(author) + 4), 60)

    print()
    print("+" + "-" * (width + 2) + "+")

    # If the quote is long, wrap it across multiple lines
    words = quote.split()
    line = " "
    for word in words:
        if len(line) + len(word) + 1 <= width:
            line += word + " "
        else:
            print(f"| {line:<{width}} |")
            line = " " + word + " "
    if line.strip():
        print(f"| {line:<{width}} |")

    print("|" + " " * (width + 2) + "|")
    attribution = f"  -- {author}"
    print(f"| {attribution:<{width}} |")
    print("+" + "-" * (width + 2) + "+")
    print()

# Main program
if __name__ == "__main__":
    print("=== Random Quote Display ===")
    print("Press Enter for the next quote, type q to quit\n")

    while True:
        # Fetch a random quote
        quote, author = get_random_quote()

        if quote:
            display_quote(quote, author)
        else:
            print("Unable to fetch a quote. Please check your internet connection.")

        # Wait for user input
        user_input = input("Continue? (Enter/q) ")
        if user_input.lower() == "q":
            print("Thanks for using this tool. Goodbye!")
            break
```

### Expected Output:

```bash
python quotes.py
```

📸 [What you should see]
```
┌──────────────────────────────────────────────────────┐
│ === Random Quote Display ===                           │
│ Press Enter for the next quote, type q to quit         │
│                                                        │
│ +--------------------------------------------------+  │
│ |  The only way to do great work is to love what    |  │
│ |  you do.                                          |  │
│ |                                                   |  │
│ |   -- Steve Jobs                                   |  │
│ +--------------------------------------------------+  │
│                                                        │
│ Continue? (Enter/q)                                    │
└──────────────────────────────────────────────────────┘
```

---

## ✍️ Hands-on Exercises

### Exercise 1: Dog Picture Generator

Use the Dog CEO API (`https://dog.ceo/api/breeds/image/random`) to build a program:
1. Ask Claude Code to create a Python script
2. Each time it runs, fetch a random dog picture URL
3. Display the URL in the terminal and try to automatically open it in the browser

> **Tip**: Tell Claude Code "Use the `webbrowser` module to automatically open the image link"

### Exercise 2: Add an API to Your Website

Go back to the personal website you built in Module 4.1 and ask Claude Code to add a feature:
1. Add a "Quote of the Day" section at the bottom of the website
2. Use JavaScript's `fetch` function to call the quote API
3. Automatically display a random quote each time the page loads
4. Add a "Get Another" button

> **Tip**: Tell Claude Code "Add a quote of the day section to index.html, using JavaScript fetch to call the dummyjson.com quotes API"

---

## ❓ Quiz (3 Questions)

**1. What is the best analogy for an API?**

A. A cookbook — teaches you how to cook
B. A waiter — takes your request and brings back results from the kitchen
C. A warehouse — stores all the data
D. A printer — prints out data

Answer: B — An API is like a restaurant waiter. You don't need to know how the kitchen (server) works — you just place your order through the waiter (API) and receive the dish (data) you wanted.

---

**2. In the following JSON, what is the value of "temperature"?**
```json
{
  "city": "Sydney",
  "temperature": 28,
  "weather": "Sunny"
}
```

A. "Sydney"
B. 28
C. "Sunny"
D. "temperature"

Answer: B — In JSON, the left side of the colon is the field name (key), and the right side is the value. The "temperature" field has a value of 28.

---

**3. If an API request fails (e.g., the internet is disconnected), how should the program handle it?**

A. Just crash — no handling needed
B. Show a friendly error message so the user knows what went wrong
C. Retry infinitely until it succeeds
D. Delete all files and start over

Answer: B — Good programs should use try/except to handle potential errors and show friendly messages. Infinite retries can cause the program to hang, and crashing outright gives users a terrible experience.

---

## 🔗 Next Steps

Great job! You've learned how to connect your programs to external services to fetch data. In the next module, **4.3: Data Processing and Analysis**, we'll learn how to work with and analyze data files — such as reading CSV spreadsheets, organizing data, and even generating charts. This is an extremely practical skill that's useful regardless of your industry!
