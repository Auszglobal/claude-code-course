# Module 6.5: Business Location Intelligence with Gemini + Maps

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Build an AI-powered store locator that finds the nearest business locations
- Use Gemini to optimize delivery routes across multiple stops
- Map competitor locations and generate strategic analysis
- Create a complete "AI Store Finder" as a mini project

---

## 📖 Theory

### From Travel to Business

In the previous module, you used Gemini + Maps to plan vacations. Now we apply the same tools to solve real business problems. Every company that has physical locations — stores, warehouses, restaurants, service areas — needs to answer location questions every day.

Think of it like this: a travel planner asks "What is fun to do nearby?" A business planner asks "Where should I open my next store?" or "What is the fastest route to deliver 10 packages?" Same tools, different questions.

### Three Business Use Cases

**1. Store Locators** — Help customers find your nearest location. When someone searches "hardware stores near me," your app uses Google Maps to find your branches and Gemini to write a helpful response with directions and opening hours.

**2. Delivery Route Optimization** — If a driver has 8 deliveries to make, what order should they visit them? Google Maps calculates driving times between every pair of stops. Gemini analyzes the data and suggests the most efficient route.

**3. Competitor Mapping** — Want to open a new cafe? Search Google Maps for all existing cafes in an area, pull their ratings and review counts, and let Gemini find the gap — the neighborhood with high demand but few options.

### How Route Optimization Works

Finding the best route through multiple stops is called the "Traveling Salesman Problem." For a small number of stops (under 25), the Google Maps Directions API can handle it directly with `optimizeWaypoints=true`. For more stops, you can use Gemini to analyze distance data and suggest groupings.

---

## 💻 Code Example 1: AI Store Locator

This script takes a customer's location and finds the nearest stores, then uses Gemini to write a friendly response with directions.

```python
# module_6_5_store_locator.py
# AI-powered store locator using Gemini + Google Maps

import google.generativeai as genai
import requests

GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def find_stores(customer_location, store_type, brand_keyword=None, radius=5000):
    """Find stores near a customer's location."""
    # Step 1: Geocode the customer's location
    geo_url = "https://maps.googleapis.com/maps/api/geocode/json"
    geo_resp = requests.get(geo_url, params={
        "address": customer_location, "key": MAPS_API_KEY
    })
    loc = geo_resp.json()["results"][0]["geometry"]["location"]

    # Step 2: Search for nearby stores
    places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{loc['lat']},{loc['lng']}",
        "radius": radius,
        "type": store_type,
        "key": MAPS_API_KEY
    }
    if brand_keyword:
        params["keyword"] = brand_keyword  # Filter by brand name

    resp = requests.get(places_url, params=params)
    results = resp.json().get("results", [])

    stores = []
    for store in results[:5]:
        stores.append({
            "name": store["name"],
            "address": store.get("vicinity", "N/A"),
            "rating": store.get("rating", "N/A"),
            "reviews": store.get("user_ratings_total", 0),
            "open_now": store.get("opening_hours", {}).get("open_now", "Unknown")
        })
    return stores

# --- Main flow ---

customer = "Bondi Beach, Sydney"
stores = find_stores(customer, "store", brand_keyword="Woolworths")

# Ask Gemini to write a helpful store locator response
prompt = f"""A customer near {customer} is looking for Woolworths stores.

Here are the nearest locations from Google Maps:
{stores}

Write a short, helpful response that:
1. Lists each store with its address, rating, and whether it is open now
2. Recommends the best option (highest rated or closest)
3. Mentions approximate walking or driving distance if possible
Keep it friendly and concise — like a helpful store assistant."""

response = model.generate_content(prompt)
print(response.text)
```

### Expected Output:

```
Here are the Woolworths stores closest to Bondi Beach:

1. **Woolworths Bondi Beach** — 76 Hall St, Bondi Beach
   Rating: 3.9 stars (820 reviews) | Currently: OPEN
   — This is your closest option, just a short walk from the beach.

2. **Woolworths Bondi Junction** — 500 Oxford St, Bondi Junction
   Rating: 4.0 stars (1,240 reviews) | Currently: OPEN
   — Slightly better rated and inside the Westfield shopping center.

3. **Woolworths Rose Bay** — 745 New South Head Rd
   Rating: 3.8 stars (430 reviews) | Currently: OPEN

My recommendation: Head to Woolworths Bondi Beach if you want the
closest option. If you do not mind a 10-minute bus ride, Bondi Junction
has a larger store with a better selection.
```

---

## 💻 Code Example 2: Competitor Analysis Map

This script searches for competitors in an area and uses Gemini to analyze the competitive landscape.

```python
# module_6_5_competitor_analysis.py
# Map competitors and analyze gaps using Gemini + Google Maps

import google.generativeai as genai
import requests
import json

GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def search_competitors(area, business_type, radius=3000):
    """Find all businesses of a type in an area."""
    # Geocode the area
    geo_url = "https://maps.googleapis.com/maps/api/geocode/json"
    geo_resp = requests.get(geo_url, params={"address": area, "key": MAPS_API_KEY})
    loc = geo_resp.json()["results"][0]["geometry"]["location"]

    # Search for businesses
    places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{loc['lat']},{loc['lng']}",
        "radius": radius,
        "type": business_type,
        "key": MAPS_API_KEY
    }
    resp = requests.get(places_url, params=params)
    results = resp.json().get("results", [])

    competitors = []
    for place in results[:10]:
        competitors.append({
            "name": place["name"],
            "rating": place.get("rating", "N/A"),
            "reviews": place.get("user_ratings_total", 0),
            "address": place.get("vicinity", "N/A"),
            "price_level": place.get("price_level", "N/A")
        })
    return competitors

# --- Main flow ---

area = "Surry Hills, Sydney"
business_type = "cafe"

competitors = search_competitors(area, business_type)
print(f"Found {len(competitors)} cafes in {area}\n")

# Ask Gemini for competitive analysis
prompt = f"""You are a business analyst. A client wants to open a new cafe
in {area}. Here are the existing cafes from Google Maps:

{json.dumps(competitors, indent=2)}

Provide a brief competitive analysis:
1. How saturated is this market? (count and density)
2. What is the average rating? Are customers generally happy?
3. Are there any gaps? (e.g., low-rated competitors you could beat)
4. Final recommendation: should the client open here? Why or why not?

Keep it practical and under 200 words."""

response = model.generate_content(prompt)
print(response.text)
```

### Expected Output:

```
Competitive Analysis: Cafes in Surry Hills, Sydney

**Market Saturation:** High. There are 10 cafes within a 3km radius,
making this a competitive area. Surry Hills is already known as a
coffee destination.

**Average Rating:** 4.2 stars across all 10 cafes. Most have 200+
reviews, indicating established customer bases.

**Gaps Identified:**
- Two cafes have ratings below 3.8 — their customers might switch
  to a better option.
- No cafe in the dataset mentions specialty tea or health drinks.
- Price levels are mostly moderate (level 2). There may be room
  for a premium or budget option.

**Recommendation:** Proceed with caution. The market is crowded but
the presence of low-rated competitors means there is room for a
higher-quality entrant. Differentiate on something specific —
specialty drinks, unique food menu, or better ambiance — rather
than trying to be another generic cafe.
```

---

## ✍️ Hands-On Exercises

### Exercise 1: Delivery Route Planner

Write a script that takes a list of 5 delivery addresses, uses the Google Maps Directions API to get driving times between them, and asks Gemini to suggest the most efficient order. Use the Directions API with `optimizeWaypoints=true`.

**Hint:** The Directions API endpoint is `https://maps.googleapis.com/maps/api/directions/json`. Pass multiple stops using the `waypoints` parameter with `optimize:true|` prefix.

### Exercise 2: Multi-Area Competitor Comparison

Extend Code Example 2 to compare two neighborhoods. Search for cafes in both Surry Hills and Newtown (Sydney), then ask Gemini which area has more opportunity for a new business based on competitor count, average rating, and review volume.

**Hint:** Call `search_competitors()` for each area and combine both results into one prompt. Ask Gemini to compare them side by side.

---

## 🔗 Next Steps

You have now mastered combining Gemini with Google Maps for both travel and business use cases. In Phase 7, we shift focus to **data and analytics** — using Gemini to analyze spreadsheets, generate charts, and build dashboards. The skills you learned here (API chaining, structured prompts, real-data grounding) will carry over directly.

---

## Mini Project: Build an AI Store Finder

**Time:** 20-30 minutes

Build a complete store finder that a customer could actually use. Combine what you learned in Code Examples 1 and 2:

1. Ask the user for their location (city, suburb, or address)
2. Ask what type of store they are looking for (grocery, pharmacy, hardware, etc.)
3. Search Google Maps for the nearest 5 stores of that type
4. Pass the results to Gemini to write a friendly recommendation
5. Add a "competitor check" — also search for the top-rated alternative in the same category and let Gemini compare them

**Bonus:** Add a follow-up question where the user can ask "Which one has the best reviews?" and Gemini answers based on the stored data.

---

<div class="module-quiz">
<h3>Module Quiz</h3>
<div class="quiz-q" data-answer="1"><p>1. What is a store locator?</p><label><input type="radio" name="q1" value="0"> A tool that tracks store inventory</label><label><input type="radio" name="q1" value="1"> A feature that helps customers find the nearest business location</label><label><input type="radio" name="q1" value="2"> A database of all stores in a country</label><label><input type="radio" name="q1" value="3"> A Google Maps feature that is only available on mobile</label><div class="quiz-explain">A store locator takes a customer's location and shows them the nearest branches of a business, usually with addresses, ratings, and directions. It is one of the most common uses of Google Maps in business apps.</div></div>
<div class="quiz-q" data-answer="3"><p>2. What does the "keyword" parameter do in the Places API Nearby Search?</p><label><input type="radio" name="q2" value="0"> It changes the radius of the search</label><label><input type="radio" name="q2" value="1"> It sorts results by rating</label><label><input type="radio" name="q2" value="2"> It limits results to a specific price level</label><label><input type="radio" name="q2" value="3"> It filters results to match a specific brand or term</label><div class="quiz-explain">The keyword parameter lets you narrow results. For example, searching type "store" with keyword "Woolworths" returns only Woolworths stores, not every store in the area.</div></div>
<div class="quiz-q" data-answer="0"><p>3. What is the "Traveling Salesman Problem"?</p><label><input type="radio" name="q3" value="0"> Finding the most efficient route to visit multiple stops</label><label><input type="radio" name="q3" value="1"> Calculating the distance between two points on a map</label><label><input type="radio" name="q3" value="2"> Searching for the nearest store to a customer</label><label><input type="radio" name="q3" value="3"> Converting addresses to latitude and longitude</label><div class="quiz-explain">The Traveling Salesman Problem asks: given multiple stops, what is the shortest or fastest route that visits all of them? This is the core challenge in delivery route optimization.</div></div>
<div class="quiz-q" data-answer="2"><p>4. In competitor analysis, what does a low rating on an existing business suggest?</p><label><input type="radio" name="q4" value="0"> The area has no demand for that business type</label><label><input type="radio" name="q4" value="1"> You should avoid opening in that area</label><label><input type="radio" name="q4" value="2"> There may be an opportunity to capture unhappy customers with a better offering</label><label><input type="radio" name="q4" value="3"> The Google Maps data is incorrect</label><div class="quiz-explain">Low-rated competitors indicate that customers in the area need that service but are not satisfied with current options. This is a potential opportunity for a new business that offers better quality.</div></div>
<div class="quiz-q" data-answer="1"><p>5. What does "optimizeWaypoints=true" do in the Google Maps Directions API?</p><label><input type="radio" name="q5" value="0"> It makes the API response faster</label><label><input type="radio" name="q5" value="1"> It reorders the stops to find the most efficient route</label><label><input type="radio" name="q5" value="2"> It adds more waypoints automatically</label><label><input type="radio" name="q5" value="3"> It calculates walking distance instead of driving</label><div class="quiz-explain">When you set optimizeWaypoints to true, the Directions API rearranges the intermediate stops to minimize total travel time. This is how you solve basic delivery route optimization.</div></div>
<div class="quiz-q" data-answer="0"><p>6. Why does the store locator geocode the customer's location before searching?</p><label><input type="radio" name="q6" value="0"> The Nearby Search API requires latitude and longitude, not a text address</label><label><input type="radio" name="q6" value="1"> Geocoding makes the search results more accurate</label><label><input type="radio" name="q6" value="2"> It is required by Google's terms of service</label><label><input type="radio" name="q6" value="3"> Gemini cannot process text addresses</label><div class="quiz-explain">The Places API Nearby Search endpoint requires a latitude/longitude coordinate as the center point. Geocoding converts a human-readable address like "Bondi Beach" into the coordinates the API needs.</div></div>
<div class="quiz-q" data-answer="3"><p>7. What does "price_level" represent in Google Maps place data?</p><label><input type="radio" name="q7" value="0"> The exact price of the most popular item</label><label><input type="radio" name="q7" value="1"> The monthly rent of the business location</label><label><input type="radio" name="q7" value="2"> How many competitors are in the area</label><label><input type="radio" name="q7" value="3"> A relative indicator of how expensive the business is (0 = free, 4 = very expensive)</label><div class="quiz-explain">Price level is a value from 0 to 4 that Google assigns based on reviews and available data. It gives a rough sense of cost: 0 is free, 1 is inexpensive, 2 is moderate, 3 is expensive, and 4 is very expensive.</div></div>
<div class="quiz-q" data-answer="2"><p>8. What is the main advantage of using Gemini to analyze competitor data instead of just listing it?</p><label><input type="radio" name="q8" value="0"> Gemini can access private business financial data</label><label><input type="radio" name="q8" value="1"> Gemini makes the Maps API calls faster</label><label><input type="radio" name="q8" value="2"> Gemini can identify patterns, gaps, and actionable insights from raw data</label><label><input type="radio" name="q8" value="3"> The Maps API does not return useful data on its own</label><div class="quiz-explain">A raw list of competitors with ratings is just data. Gemini turns it into analysis: it spots trends, identifies weaknesses in the competition, and provides a recommendation. This saves hours of manual analysis.</div></div>
<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
