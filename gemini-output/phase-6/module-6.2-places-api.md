# Module 6.2: Places API — Finding Restaurants, Shops & Attractions

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Understand what the Places API does and when to use it
- Search for nearby businesses and points of interest by type or keyword
- Retrieve detailed place information including reviews, photos, and opening hours
- Build a local business finder that displays results on a map
- Handle Places API responses and display them in a user-friendly way

---

## 📖 Theory

### What Is the Places API?

Imagine you are visiting a new city and you pull out your phone to search "coffee shops near me." Within seconds, Google shows you a list of cafes with ratings, photos, and distances. That magic is powered by the **Places API**.

The Places API is like having a super-knowledgeable local friend who knows every business in town — their address, phone number, when they open and close, what people say about them, and even photos of the place.

### Three Main Things You Can Do

| Feature | What It Does | Real-World Example |
|---------|-------------|-------------------|
| **Nearby Search** | Find places within a radius of a location | "Show me pizza places within 1 km" |
| **Text Search** | Find places matching a text query | "Best sushi in Melbourne" |
| **Place Details** | Get full info about a specific place | Hours, reviews, photos for one restaurant |

### How Places Are Identified

Every place in Google's database has a unique **Place ID** — a string like `ChIJN1t_tDeuEmsRUsoyG83frY4`. Think of it like a social security number for locations. Once you have a Place ID, you can always look up that exact place again, even if its name changes.

### Types of Places

Google categorizes places into dozens of types. Here are some common ones:

- `restaurant`, `cafe`, `bar`, `bakery`
- `hospital`, `pharmacy`, `dentist`
- `school`, `university`, `library`
- `park`, `gym`, `movie_theater`
- `gas_station`, `parking`, `atm`
- `hotel`, `tourist_attraction`, `museum`

You can search by one or more types to narrow your results.

### Pricing Note

Places API calls cost more than basic map loads. With your $200 monthly credit:

- **Nearby Search / Text Search:** ~$32 per 1,000 requests (about 6,250 free searches/month)
- **Place Details:** $17 per 1,000 requests (about 11,700 free lookups/month)
- **Place Photos:** $7 per 1,000 requests (about 28,500 free photos/month)

For learning, this is plenty. Just avoid running searches in an infinite loop!

---

## 💻 Code Example 1: Nearby Restaurant Finder

Let's build a page that finds restaurants near a given location and shows them on the map with info windows.

Save this as `restaurant-finder.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurant Finder</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; }

        .container {
            display: flex;
            height: 100vh;
        }

        /* Sidebar for the results list */
        #sidebar {
            width: 350px;
            overflow-y: auto;
            padding: 16px;
            background: #f8f9fa;
            border-right: 2px solid #ddd;
        }

        #sidebar h2 {
            color: #4285F4;
            margin-bottom: 12px;
        }

        /* Each restaurant card in the sidebar */
        .place-card {
            background: white;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: box-shadow 0.2s;
        }

        .place-card:hover {
            box-shadow: 0 3px 8px rgba(0,0,0,0.2);
        }

        .place-card h3 {
            font-size: 14px;
            margin-bottom: 4px;
        }

        .place-card .rating {
            color: #f4b400;
            font-size: 13px;
        }

        .place-card .address {
            color: #777;
            font-size: 12px;
            margin-top: 4px;
        }

        .place-card .status {
            font-size: 12px;
            font-weight: bold;
            margin-top: 4px;
        }

        .status.open { color: #0f9d58; }
        .status.closed { color: #db4437; }

        /* The map takes up the remaining space */
        #map {
            flex: 1;
            height: 100%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="sidebar">
            <h2>Nearby Restaurants</h2>
            <p id="loading">Searching for restaurants...</p>
            <div id="results"></div>
        </div>
        <div id="map"></div>
    </div>

    <script>
        let map;
        let infoWindow;
        let service;

        function initMap() {
            // Center the map on a location (Melbourne, Australia)
            const center = { lat: -37.8136, lng: 144.9631 };

            // Create the map
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 14,
                center: center,
            });

            // Create a PlacesService object — this talks to the Places API
            service = new google.maps.places.PlacesService(map);

            // Create a reusable InfoWindow
            infoWindow = new google.maps.InfoWindow();

            // Define our search: restaurants within 1000 meters
            const request = {
                location: center,       // Where to search from
                radius: 1000,           // Search radius in meters
                type: "restaurant",     // What type of place
            };

            // Execute the nearby search
            service.nearbySearch(request, handleResults);
        }

        // This function is called when the Places API returns results
        function handleResults(results, status) {
            const loading = document.getElementById("loading");
            const resultsDiv = document.getElementById("results");

            // Check if the search was successful
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                loading.textContent = "No restaurants found nearby. Try a different location!";
                return;
            }

            // Hide the loading message
            loading.style.display = "none";

            // Loop through each result and display it
            results.forEach((place, index) => {
                // Create a marker on the map
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                    // Use numbered labels so you can match sidebar to map
                    label: String(index + 1),
                });

                // Create a card in the sidebar
                const card = document.createElement("div");
                card.className = "place-card";

                // Build star rating display
                const stars = place.rating
                    ? "⭐".repeat(Math.round(place.rating)) + ` ${place.rating}`
                    : "No rating";

                // Check if the place is currently open
                const isOpen = place.opening_hours?.isOpen?.();
                const statusText = isOpen === true
                    ? '<span class="status open">Open Now</span>'
                    : isOpen === false
                        ? '<span class="status closed">Closed</span>'
                        : '<span class="status">Hours unknown</span>';

                card.innerHTML = `
                    <h3>${index + 1}. ${place.name}</h3>
                    <div class="rating">${stars} (${place.user_ratings_total || 0} reviews)</div>
                    <div class="address">${place.vicinity || "Address not available"}</div>
                    ${statusText}
                `;

                // When you click the card, pan the map to that marker
                card.addEventListener("click", () => {
                    map.panTo(place.geometry.location);
                    map.setZoom(16);
                    infoWindow.setContent(`
                        <strong>${place.name}</strong><br>
                        Rating: ${place.rating || "N/A"}<br>
                        ${place.vicinity || ""}
                    `);
                    infoWindow.open(map, marker);
                });

                // Same thing when clicking the marker itself
                marker.addListener("click", () => {
                    infoWindow.setContent(`
                        <strong>${place.name}</strong><br>
                        Rating: ${place.rating || "N/A"}<br>
                        ${place.vicinity || ""}
                    `);
                    infoWindow.open(map, marker);
                });

                resultsDiv.appendChild(card);
            });
        }
    </script>

    <!-- Load Maps API with the Places library -->
    <script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap"
        async defer
    ></script>
</body>
</html>
```

### Expected Output

```
📸 [What you should see]
┌────────────────────┬─────────────────────────────┐
│  Nearby Restaurants│                             │
│                    │                             │
│ 1. Tipo 00        │     [Interactive Map]       │
│ ⭐⭐⭐⭐ 4.5 (832) │      with numbered pins     │
│ 361 Little Bourke  │      1️⃣ 2️⃣ 3️⃣ etc.          │
│ Open Now           │                             │
│                    │                             │
│ 2. Chin Chin      │                             │
│ ⭐⭐⭐⭐ 4.2 (2100) │                             │
│ 125 Flinders Lane  │                             │
│ Open Now           │                             │
│                    │                             │
│ 3. ...more cards  │                             │
│                    │                             │
└────────────────────┴─────────────────────────────┘
```

---

## 💻 Code Example 2: Place Details — Deep Dive into a Business

Once you find a place, you often want the full story — reviews, photos, phone number, website. The **Place Details** request gives you everything.

Save this as `place-details.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Place Details Viewer</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 0 16px; }
        h1 { color: #4285F4; }
        #map { height: 300px; border-radius: 12px; margin: 16px 0; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
        .info-item { background: #f8f9fa; padding: 12px; border-radius: 8px; }
        .info-item label { font-weight: bold; color: #555; display: block; margin-bottom: 4px; }
        .photos { display: flex; gap: 8px; overflow-x: auto; margin: 16px 0; }
        .photos img { height: 150px; border-radius: 8px; object-fit: cover; }
        .review { border-left: 3px solid #4285F4; padding: 12px; margin: 12px 0; background: #f8f9fa; border-radius: 0 8px 8px 0; }
        .review .author { font-weight: bold; color: #333; }
        .review .rating { color: #f4b400; }
        .review .text { color: #555; margin-top: 8px; line-height: 1.5; }
        .hours { list-style: none; padding: 0; }
        .hours li { padding: 4px 0; border-bottom: 1px solid #eee; }
    </style>
</head>
<body>
    <h1 id="place-name">Loading place details...</h1>
    <div id="map"></div>
    <div id="details"></div>

    <script>
        function initMap() {
            // We will look up the Sydney Opera House by its Place ID
            const placeId = "ChIJ3S-JXmauEmsRUcIaWtf4MzE";

            // Create a small map
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 16,
                center: { lat: -33.8568, lng: 151.2153 },
            });

            // Create the Places Service
            const service = new google.maps.places.PlacesService(map);

            // Request detailed information about this place
            // We specify which fields we want to save on API costs
            const request = {
                placeId: placeId,
                fields: [
                    "name",              // Business name
                    "formatted_address", // Full street address
                    "formatted_phone_number",  // Phone number
                    "website",           // Website URL
                    "rating",            // Average star rating
                    "user_ratings_total",// Total number of reviews
                    "opening_hours",     // Weekly hours
                    "photos",            // Place photos
                    "reviews",           // User reviews
                    "geometry",          // Location coordinates
                    "price_level",       // $ to $$$$
                    "types",             // Category types
                ]
            };

            service.getDetails(request, (place, status) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    document.getElementById("place-name").textContent = "Could not load place details.";
                    return;
                }

                // Update the page title
                document.getElementById("place-name").textContent = place.name;

                // Add a marker at the place location
                new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                });

                // Center map on the place
                map.setCenter(place.geometry.location);

                // Build the details HTML
                let html = "";

                // Basic info grid
                html += '<div class="info-grid">';
                html += `<div class="info-item">
                    <label>Address</label>${place.formatted_address || "N/A"}
                </div>`;
                html += `<div class="info-item">
                    <label>Phone</label>${place.formatted_phone_number || "N/A"}
                </div>`;
                html += `<div class="info-item">
                    <label>Rating</label>
                    ${"⭐".repeat(Math.round(place.rating || 0))} ${place.rating || "N/A"}
                    (${place.user_ratings_total || 0} reviews)
                </div>`;
                html += `<div class="info-item">
                    <label>Website</label>
                    ${place.website
                        ? `<a href="${place.website}" target="_blank">Visit website</a>`
                        : "N/A"}
                </div>`;
                html += "</div>";

                // Opening hours
                if (place.opening_hours?.weekday_text) {
                    html += "<h2>Opening Hours</h2>";
                    html += '<ul class="hours">';
                    place.opening_hours.weekday_text.forEach(day => {
                        html += `<li>${day}</li>`;
                    });
                    html += "</ul>";
                }

                // Photos (show first 5)
                if (place.photos?.length > 0) {
                    html += "<h2>Photos</h2>";
                    html += '<div class="photos">';
                    place.photos.slice(0, 5).forEach(photo => {
                        // getUrl() generates a URL for the photo at specified max dimensions
                        const url = photo.getUrl({ maxWidth: 300, maxHeight: 200 });
                        html += `<img src="${url}" alt="Photo of ${place.name}">`;
                    });
                    html += "</div>";
                }

                // Reviews (show first 3)
                if (place.reviews?.length > 0) {
                    html += "<h2>Recent Reviews</h2>";
                    place.reviews.slice(0, 3).forEach(review => {
                        html += `
                            <div class="review">
                                <span class="author">${review.author_name}</span>
                                <span class="rating">${"⭐".repeat(review.rating)}</span>
                                <span style="color:#999;font-size:12px;">
                                    ${review.relative_time_description}
                                </span>
                                <p class="text">${review.text}</p>
                            </div>
                        `;
                    });
                }

                document.getElementById("details").innerHTML = html;
            });
        }
    </script>

    <script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap"
        async defer
    ></script>
</body>
</html>
```

### Expected Output

```
📸 [What you should see]
┌──────────────────────────────────────────────┐
│  Sydney Opera House                          │
│  ┌──────────────────────────────────────┐    │
│  │       [Small map with pin]            │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Address: Bennelong Point, Sydney NSW 2000   │
│  Phone: (02) 9250 7111                       │
│  Rating: ⭐⭐⭐⭐⭐ 4.7 (43,219 reviews)       │
│  Website: Visit website                      │
│                                              │
│  Opening Hours                               │
│  Monday: 9:00 AM – 5:00 PM                  │
│  Tuesday: 9:00 AM – 5:00 PM                 │
│  ...                                         │
│                                              │
│  Photos                                      │
│  [photo1] [photo2] [photo3] [photo4]         │
│                                              │
│  Recent Reviews                              │
│  │ John S. ⭐⭐⭐⭐⭐ 2 weeks ago              │
│  │ Absolutely stunning architecture...       │
│                                              │
└──────────────────────────────────────────────┘
```

---

## ✍️ Hands-On Exercises

### Exercise 1: Cafe Finder

Modify Code Example 1 to search for `"cafe"` instead of `"restaurant"`. Center the map on your own city. Add a search radius control — try 500m, 1000m, and 2000m and see how the results change.

**Hints:**
- Change `type: "restaurant"` to `type: "cafe"`
- Update the `center` coordinates to your city
- Try adding `keyword: "specialty coffee"` to the request to narrow results

### Exercise 2: Multi-Type Search

Create a page with buttons for different place types: "Restaurants," "Cafes," "Parks," "Gyms." When the user clicks a button, clear the old markers and search for the new type. Display a different marker color or label for each type.

**Hints:**
- Keep an array of current markers so you can remove them: `markers.forEach(m => m.setMap(null))`
- Call `service.nearbySearch()` with a new request each time a button is clicked
- Use `google.maps.marker.PinElement` or custom icon URLs for different colors

---

## ❓ Quiz

<div id="quiz">

**Question 1:** What is a Place ID?

<input type="radio" name="q1" value="a"> A. The street address of a business<br>
<input type="radio" name="q1" value="b" data-answer> B. A unique identifier string that Google assigns to every place in its database<br>
<input type="radio" name="q1" value="c"> C. The phone number of a restaurant<br>
<input type="radio" name="q1" value="d"> D. The latitude and longitude combined<br>

<div class="quiz-explain" style="display:none;">A Place ID is a unique string (like "ChIJN1t_tDeuEmsRUsoyG83frY4") that permanently identifies a specific place. You can use it to look up that exact place at any time.</div>

---

**Question 2:** In a Nearby Search request, what does the `radius` parameter specify?

<input type="radio" name="q2" value="a"> A. The number of results to return<br>
<input type="radio" name="q2" value="b"> B. The size of each marker on the map<br>
<input type="radio" name="q2" value="c" data-answer> C. The distance in meters from the center point to search within<br>
<input type="radio" name="q2" value="d"> D. The minimum star rating of results<br>

<div class="quiz-explain" style="display:none;">The radius is measured in meters from the center location. A radius of 1000 means the API searches within 1 kilometer in every direction from the center point.</div>

---

**Question 3:** Why do we specify individual `fields` in a Place Details request?

<input type="radio" name="q3" value="a"> A. Because some fields are secret<br>
<input type="radio" name="q3" value="b" data-answer> B. Because each field costs money — requesting only what you need saves on API costs<br>
<input type="radio" name="q3" value="c"> C. Because the API can only return 3 fields at a time<br>
<input type="radio" name="q3" value="d"> D. Because different fields require different API keys<br>

<div class="quiz-explain" style="display:none;">Google charges based on which fields you request. Basic fields are cheapest, contact fields cost more, and atmosphere fields (reviews, photos) cost the most. Only request what you actually need.</div>

---

**Question 4:** Which library must you load alongside the Maps JavaScript API to use the Places service?

<input type="radio" name="q4" value="a"> A. directions<br>
<input type="radio" name="q4" value="b"> B. geometry<br>
<input type="radio" name="q4" value="c" data-answer> C. places<br>
<input type="radio" name="q4" value="d"> D. visualization<br>

<div class="quiz-explain" style="display:none;">You must add "&libraries=places" to the API script URL. Without loading the places library, the PlacesService class is not available.</div>

---

**Question 5:** What does `place.opening_hours?.isOpen?.()` check?

<input type="radio" name="q5" value="a"> A. If the place has been permanently closed<br>
<input type="radio" name="q5" value="b" data-answer> B. If the place is currently open right now based on its listed hours<br>
<input type="radio" name="q5" value="c"> C. If the place accepts reservations<br>
<input type="radio" name="q5" value="d"> D. If the place has a website<br>

<div class="quiz-explain" style="display:none;">The isOpen() method checks the current time against the place's listed opening hours and returns true (open), false (closed), or undefined (hours not available). The ?. is optional chaining to avoid errors if the data is missing.</div>

---

**Question 6:** How many Place Photos does Google typically return for a popular place?

<input type="radio" name="q6" value="a"> A. Exactly 1<br>
<input type="radio" name="q6" value="b"> B. Exactly 5<br>
<input type="radio" name="q6" value="c" data-answer> C. Up to 10<br>
<input type="radio" name="q6" value="d"> D. Unlimited<br>

<div class="quiz-explain" style="display:none;">The Place Details response includes up to 10 photos. You then use the getUrl() method on each photo object to generate an actual image URL at your desired dimensions.</div>

---

**Question 7:** What is the difference between Nearby Search and Text Search?

<input type="radio" name="q7" value="a"> A. Nearby Search is free but Text Search costs money<br>
<input type="radio" name="q7" value="b"> B. Text Search returns more results<br>
<input type="radio" name="q7" value="c" data-answer> C. Nearby Search requires a location + radius; Text Search uses a free-form text query<br>
<input type="radio" name="q7" value="d"> D. There is no difference<br>

<div class="quiz-explain" style="display:none;">Nearby Search needs a center point and radius to search around. Text Search accepts queries like "best sushi in Melbourne" and Google figures out the location from the text. Text Search is more flexible but slightly more expensive.</div>

---

**Question 8:** How do you get the image URL from a photo object returned by Place Details?

<input type="radio" name="q8" value="a"> A. Access the `photo.url` property directly<br>
<input type="radio" name="q8" value="b" data-answer> B. Call `photo.getUrl({ maxWidth: 300 })` to generate a URL at a specific size<br>
<input type="radio" name="q8" value="c"> C. Make a separate API call with the photo's ID<br>
<input type="radio" name="q8" value="d"> D. Photos are returned as base64 encoded strings<br>

<div class="quiz-explain" style="display:none;">Photo objects do not contain a direct URL. Instead, you call getUrl() with size parameters (maxWidth and/or maxHeight), and it returns a URL you can use in an img tag. This lets you request images at the exact size you need.</div>

<button class="quiz-submit" onclick="checkQuiz()">Submit Answers</button>
<div class="quiz-result"></div>

<script>
function checkQuiz() {
    let score = 0;
    const total = 8;
    for (let i = 1; i <= total; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correct = document.querySelector(`input[name="q${i}"][data-answer]`);
        const explain = document.querySelectorAll('.quiz-explain')[i - 1];
        if (selected) {
            if (selected === correct) {
                score++;
                explain.style.display = 'block';
                explain.style.color = 'green';
            } else {
                explain.style.display = 'block';
                explain.style.color = 'red';
            }
        }
    }
    document.querySelector('.quiz-result').innerHTML =
        `You scored <strong>${score}</strong> out of <strong>${total}</strong>! ${score >= 6 ? '🎉 Great job!' : 'Keep learning — you will get there!'}`;
}
</script>

</div>

---

## 🔗 Next Steps

You now know how to find places and get their details. But what if you need to convert addresses into map coordinates, or calculate the best driving route between two points? In **Module 6.3: Geocoding & Routes**, you will learn address-to-coordinate conversion, route planning with the Directions API, and calculating travel times with the Distance Matrix. These are the tools that power every navigation app you have ever used!
