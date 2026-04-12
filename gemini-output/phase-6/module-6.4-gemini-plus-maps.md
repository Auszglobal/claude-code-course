# Module 6.4: Gemini + Google Maps — AI Travel Planner

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Combine Gemini AI with the Google Maps Platform to build smart location features
- Use natural language queries like "find coffee shops near Sydney Opera House" to search places
- Build an AI travel planner that creates itineraries with real map data
- Generate restaurant recommendations with ratings, reviews, and directions

---

## 📖 Theory

### Why Combine Gemini with Google Maps?

Google Maps knows where things are. Gemini knows how to think and write. When you combine them, you get an AI that can answer questions like "Plan a 3-day trip to Melbourne with kid-friendly activities near my hotel" — and give you real places with real addresses, not made-up ones.

Think of it like this: Google Maps is a giant phone book of every place on Earth. Gemini is a smart travel agent who can read that phone book and plan your perfect trip. Alone, the phone book is just data. Alone, the travel agent might guess wrong. Together, they are powerful.

### How It Works

The flow is straightforward:

1. The user asks a question in plain English (e.g., "find coffee shops near the Sydney Opera House")
2. Your code sends a Places API request to Google Maps to get real location data
3. The location data (names, ratings, addresses) is passed to Gemini as context
4. Gemini uses that real data to write a helpful, human-friendly response

This means Gemini never invents fake restaurants or wrong addresses. It only works with verified data from Google Maps.

### Key APIs You Will Use

| API | What It Does |
|-----|-------------|
| **Places API (Nearby Search)** | Finds places near a location by type (restaurant, cafe, hotel) |
| **Geocoding API** | Converts an address or landmark name into latitude/longitude |
| **Place Details** | Gets reviews, phone numbers, opening hours for a specific place |

You already learned these APIs in Modules 6.1-6.3. Now we combine them with Gemini to make them conversational.

---

## 💻 Code Example 1: Natural Language Place Search

This script lets you type a question in plain English and get real place recommendations powered by Google Maps data.

```python
# module_6_4_place_search.py
# Natural language place search using Gemini + Google Maps

import google.generativeai as genai
import requests

# Set up API keys
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def geocode(place_name):
    """Convert a place name to latitude and longitude."""
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": place_name, "key": MAPS_API_KEY}
    response = requests.get(url, params=params)
    data = response.json()
    if data["results"]:
        loc = data["results"][0]["geometry"]["location"]
        return loc["lat"], loc["lng"]
    return None, None

def find_nearby_places(lat, lng, place_type, radius=1000):
    """Find places of a given type near a location."""
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{lat},{lng}",
        "radius": radius,
        "type": place_type,
        "key": MAPS_API_KEY
    }
    response = requests.get(url, params=params)
    results = response.json().get("results", [])
    # Return the top 5 results with key info
    places = []
    for place in results[:5]:
        places.append({
            "name": place.get("name"),
            "rating": place.get("rating", "N/A"),
            "address": place.get("vicinity", "N/A"),
            "total_ratings": place.get("user_ratings_total", 0),
            "open_now": place.get("opening_hours", {}).get("open_now", "Unknown")
        })
    return places

# --- Main flow ---

# The user's natural language query
user_query = "Find coffee shops near the Sydney Opera House"

# Step 1: Ask Gemini to extract the landmark and place type
extract_prompt = f"""From this query, extract two things:
1. The landmark or location name
2. The type of place being searched for (use Google Maps types like: cafe, restaurant, hotel, park, museum)

Query: "{user_query}"

Reply in exactly this format:
LOCATION: <location name>
TYPE: <place type>"""

extraction = model.generate_content(extract_prompt)
print("Gemini extracted:", extraction.text)

# Step 2: Parse Gemini's response (simple string parsing)
lines = extraction.text.strip().split("\n")
location = lines[0].split("LOCATION:")[-1].strip()
place_type = lines[1].split("TYPE:")[-1].strip()

# Step 3: Geocode the location and search nearby places
lat, lng = geocode(location)
places = find_nearby_places(lat, lng, place_type)

# Step 4: Ask Gemini to write a friendly recommendation
recommend_prompt = f"""The user asked: "{user_query}"

Here are real places from Google Maps near {location}:

{places}

Write a friendly, helpful response recommending these places.
For each place, mention its name, rating, and address.
Highlight the top-rated one. Keep it conversational."""

recommendation = model.generate_content(recommend_prompt)
print("\n" + recommendation.text)
```

### Expected Output:

```
Gemini extracted:
LOCATION: Sydney Opera House
TYPE: cafe

Great news — there are some lovely coffee spots right near the Opera House!

Here are my top picks:

1. **Opera Bar** (4.3 stars) — Bennelong Point, Sydney
   Right on the waterfront with stunning harbour views. Perfect for a flat white
   with a view.

2. **Foreshore Cafe** (4.1 stars) — Circular Quay West
   Casual spot just a short walk away. Great for a quick grab-and-go coffee.

3. **The Fine Food Store** (4.4 stars) — Circular Quay
   The highest-rated option nearby! Known for specialty brews and pastries.

I would start with The Fine Food Store if you want the best coffee,
or Opera Bar if the view matters more than the brew.
```

---

## 💻 Code Example 2: AI Travel Itinerary Planner

This script builds a full day-by-day travel itinerary using real places from Google Maps.

```python
# module_6_4_travel_planner.py
# AI travel planner using Gemini + Google Maps data

import google.generativeai as genai
import requests
import json

GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def search_places(location, place_type, radius=2000):
    """Search for places near a location (geocodes first, then searches)."""
    # Geocode the location
    geo_url = "https://maps.googleapis.com/maps/api/geocode/json"
    geo_resp = requests.get(geo_url, params={"address": location, "key": MAPS_API_KEY})
    geo_data = geo_resp.json()
    if not geo_data["results"]:
        return []
    loc = geo_data["results"][0]["geometry"]["location"]

    # Search nearby places
    places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{loc['lat']},{loc['lng']}",
        "radius": radius,
        "type": place_type,
        "key": MAPS_API_KEY
    }
    resp = requests.get(places_url, params=params)
    results = resp.json().get("results", [])
    return [
        {"name": p["name"], "rating": p.get("rating", "N/A"),
         "address": p.get("vicinity", "")}
        for p in results[:5]
    ]

# --- Main flow ---

destination = "Melbourne, Australia"
trip_days = 3

# Gather real places for different categories
categories = {
    "restaurant": search_places(destination, "restaurant"),
    "museum": search_places(destination, "museum"),
    "park": search_places(destination, "park"),
    "cafe": search_places(destination, "cafe")
}

# Build the prompt with real data
prompt = f"""Create a {trip_days}-day travel itinerary for {destination}.

Use ONLY these real places from Google Maps (do not invent any):

Restaurants: {json.dumps(categories['restaurant'], indent=2)}
Museums: {json.dumps(categories['museum'], indent=2)}
Parks: {json.dumps(categories['park'], indent=2)}
Cafes: {json.dumps(categories['cafe'], indent=2)}

For each day, include:
- Morning activity (with place name and address)
- Lunch spot (with rating)
- Afternoon activity
- Dinner recommendation

Add a brief travel tip for each day. Keep it friendly and practical."""

response = model.generate_content(prompt)
print(response.text)
```

### Expected Output:

```
🗓️ 3-Day Melbourne Itinerary

--- Day 1: Culture & Coffee ---
☕ Morning: Start at Patricia Coffee Brewers (4.6 stars, Little Bourke St)
   — Melbourne's famous standing-room-only espresso bar. Order a flat white.
🍽️ Lunch: Chin Chin (4.2 stars, Flinders Lane) — Try the pad thai.
🎨 Afternoon: National Gallery of Victoria (4.7 stars, St Kilda Rd)
   — Free entry to the permanent collection. Allow 2-3 hours.
🍽️ Dinner: Tipo 00 (4.5 stars, Little Bourke St) — Book ahead!

Travel tip: Get a Myki card at the airport for public transport.

--- Day 2: Parks & Laneways ---
...
```

---

## ✍️ Hands-On Exercises

### Exercise 1: Restaurant Recommender

Modify Code Example 1 to build a restaurant recommender. The user should be able to type something like "Find Italian restaurants near Times Square" and get back a list of real restaurants with Gemini's personal recommendation of which one to try first.

**Hint:** Change the `place_type` to `"restaurant"` and add the keyword `"Italian"` to the Places API search using the `keyword` parameter.

### Exercise 2: Multi-Stop Trip

Extend Code Example 2 to handle a trip with multiple cities. For example, a 5-day trip that covers Sydney (2 days) and Melbourne (3 days). Search for places in both cities and ask Gemini to include travel time between them.

**Hint:** Call `search_places()` for each city separately, then combine all the data into one big prompt. Ask Gemini to put the travel day in the middle of the itinerary.

---

## 🔗 Next Steps

In the next module, you will apply these same Google Maps skills to business problems — building store locators, optimizing delivery routes, and mapping out competitors. The techniques shift from travel planning to real-world business intelligence.

---

<div class="module-quiz">
<h3>Module Quiz</h3>
<div class="quiz-q" data-answer="2"><p>1. Why do we combine Gemini with Google Maps instead of using Gemini alone?</p><label><input type="radio" name="q1" value="0"> Gemini cannot understand location-related questions</label><label><input type="radio" name="q1" value="1"> Google Maps is required for Gemini to work</label><label><input type="radio" name="q1" value="2"> Gemini might invent fake places, but Maps provides verified real data</label><label><input type="radio" name="q1" value="3"> It is cheaper to use both APIs together</label><div class="quiz-explain">Gemini can hallucinate place names and addresses. By feeding it verified data from Google Maps, every recommendation refers to a real place with a real address and real ratings.</div></div>
<div class="quiz-q" data-answer="1"><p>2. What does the Geocoding API do?</p><label><input type="radio" name="q2" value="0"> Finds restaurants near a location</label><label><input type="radio" name="q2" value="1"> Converts a place name or address into latitude and longitude coordinates</label><label><input type="radio" name="q2" value="2"> Generates a travel itinerary</label><label><input type="radio" name="q2" value="3"> Displays a map in the browser</label><div class="quiz-explain">The Geocoding API takes a human-readable address like "Sydney Opera House" and returns its precise latitude and longitude, which other APIs need to search for nearby places.</div></div>
<div class="quiz-q" data-answer="0"><p>3. In Code Example 1, what is Gemini's first job before the Maps API is called?</p><label><input type="radio" name="q3" value="0"> Extract the landmark name and place type from the user's natural language query</label><label><input type="radio" name="q3" value="1"> Generate a list of fake restaurants</label><label><input type="radio" name="q3" value="2"> Draw a map of the area</label><label><input type="radio" name="q3" value="3"> Translate the query into another language</label><div class="quiz-explain">Gemini first parses the user's plain English query to extract the location ("Sydney Opera House") and the type of place ("cafe"). These structured values are then used to call the Maps API.</div></div>
<div class="quiz-q" data-answer="3"><p>4. What does the "radius" parameter control in the Nearby Search API?</p><label><input type="radio" name="q4" value="0"> The number of results returned</label><label><input type="radio" name="q4" value="1"> The rating threshold for results</label><label><input type="radio" name="q4" value="2"> The speed of the API response</label><label><input type="radio" name="q4" value="3"> How far from the center point (in meters) to search for places</label><div class="quiz-explain">The radius parameter defines the search area in meters around the center point. A radius of 1000 means the API will look for places within 1 kilometer of the specified location.</div></div>
<div class="quiz-q" data-answer="1"><p>5. Why does the travel planner search for multiple categories (restaurant, museum, park, cafe)?</p><label><input type="radio" name="q5" value="0"> The API only allows one type per call so you must make separate calls</label><label><input type="radio" name="q5" value="1"> To give Gemini a variety of real places to build a well-rounded itinerary</label><label><input type="radio" name="q5" value="2"> To increase the API usage and test rate limits</label><label><input type="radio" name="q5" value="3"> Because Gemini requires at least 4 categories to generate a response</label><div class="quiz-explain">A good travel itinerary includes different types of activities. By searching for restaurants, museums, parks, and cafes separately, we give Gemini a diverse pool of real places to create a balanced day-by-day plan.</div></div>
<div class="quiz-q" data-answer="2"><p>6. What would happen if you passed an empty places list to Gemini's recommendation prompt?</p><label><input type="radio" name="q6" value="0"> Gemini would crash with an error</label><label><input type="radio" name="q6" value="1"> The API would refund your credits</label><label><input type="radio" name="q6" value="2"> Gemini would likely invent fake places since it has no real data to work with</label><label><input type="radio" name="q6" value="3"> Gemini would ask you to try a different location</label><div class="quiz-explain">Without real data as context, Gemini falls back on its training data and may generate plausible-sounding but fake place names and addresses. Always check that your Maps API returned results before passing them to Gemini.</div></div>
<div class="quiz-q" data-answer="0"><p>7. In the natural language flow, what is the correct order of operations?</p><label><input type="radio" name="q7" value="0"> Gemini extracts info → Geocode location → Search nearby places → Gemini writes recommendation</label><label><input type="radio" name="q7" value="1"> Search nearby places → Geocode → Gemini extracts → Gemini writes</label><label><input type="radio" name="q7" value="2"> Gemini writes recommendation → Geocode → Search places → Display</label><label><input type="radio" name="q7" value="3"> Geocode → Gemini extracts → Gemini writes → Search places</label><div class="quiz-explain">The flow is: (1) Gemini parses the user's question to get the location and place type, (2) the Geocoding API converts the location to coordinates, (3) the Places API finds nearby results, and (4) Gemini writes a friendly recommendation using the real data.</div></div>
<div class="quiz-q" data-answer="2"><p>8. Which Google Maps API would you use to get opening hours and phone numbers for a specific place?</p><label><input type="radio" name="q8" value="0"> Geocoding API</label><label><input type="radio" name="q8" value="1"> Nearby Search API</label><label><input type="radio" name="q8" value="2"> Place Details API</label><label><input type="radio" name="q8" value="3"> Directions API</label><div class="quiz-explain">The Place Details API returns rich information about a single place, including reviews, phone numbers, opening hours, website, and photos. Nearby Search gives you a list of places, but Place Details gives you the full profile of one place.</div></div>
<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
