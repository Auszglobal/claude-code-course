# Module 6.3: Geocoding & Routes — Addresses, Coordinates & Directions

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Convert street addresses into latitude/longitude coordinates (geocoding)
- Convert coordinates back into human-readable addresses (reverse geocoding)
- Calculate driving, walking, and transit routes between locations using the Directions API
- Use the Distance Matrix API to compare travel times between multiple origins and destinations
- Build a practical route planner with step-by-step navigation instructions

---

## 📖 Theory

### What Is Geocoding?

Every location on Earth can be described in two ways:

1. **Human-friendly:** "221B Baker Street, London" — easy for us to read
2. **Computer-friendly:** `{ lat: 51.5238, lng: -0.1585 }` — easy for maps to plot

**Geocoding** is the process of converting between these two formats. Think of it like a translator who speaks both "address language" and "coordinate language."

| Direction | Name | What It Does | Example |
|-----------|------|-------------|---------|
| Address → Coordinates | **Geocoding** | Turns a street address into lat/lng | "Sydney Opera House" → (-33.856, 151.215) |
| Coordinates → Address | **Reverse Geocoding** | Turns lat/lng into a street address | (-33.856, 151.215) → "Bennelong Point, Sydney" |

### Why Is Geocoding Useful?

- **Plotting user-entered addresses on a map:** A user types "10 Downing Street" and you show it on a map
- **Finding what is near a user:** Get the user's GPS coordinates, reverse geocode to find their suburb
- **Data analysis:** Convert a spreadsheet of addresses into mappable coordinates

### The Directions API

The Directions API is the engine behind every "get directions" feature you have ever used. Give it a starting point and destination, and it returns:

- The best route (or multiple alternatives)
- Step-by-step navigation instructions
- Total distance and estimated travel time
- A polyline (line on the map) showing the route

It supports four travel modes:

| Mode | Description | Best For |
|------|------------|----------|
| `DRIVING` | Car routes with traffic awareness | Delivery planning, road trips |
| `WALKING` | Pedestrian-friendly paths | Tourist walking tours |
| `BICYCLING` | Bike-friendly routes | Cycling apps |
| `TRANSIT` | Public transport (bus, train, subway) | Commuter tools |

### The Distance Matrix API

What if you need to compare travel times between multiple locations at once? For example: "Which of these 5 warehouses is closest to the customer?" The Distance Matrix API answers this efficiently.

Instead of making 5 separate Directions requests, you send one Distance Matrix request with multiple origins and/or destinations. It returns a table of distances and travel times.

Think of it like a mileage chart you might see at the back of a road atlas — a grid showing the distance between every pair of cities.

---

## 💻 Code Example 1: Address Geocoder with Map

Let's build a tool where you type any address and it shows you exactly where it is on the map.

Save this as `geocoder.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Address Geocoder</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }

        .search-bar {
            display: flex;
            padding: 16px;
            background: #4285F4;
            gap: 8px;
        }

        .search-bar input {
            flex: 1;
            padding: 12px 16px;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            outline: none;
        }

        .search-bar button {
            padding: 12px 24px;
            font-size: 16px;
            background: #0f9d58;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }

        .search-bar button:hover { background: #0b8043; }

        #map { height: 60vh; }

        #result-panel {
            padding: 16px;
            background: #f8f9fa;
            min-height: 100px;
        }

        .result-card {
            background: white;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-top: 8px;
        }

        .result-card h3 { color: #4285F4; margin: 0 0 8px 0; }
        .result-card p { margin: 4px 0; color: #555; }
        .coord { font-family: monospace; background: #e8f0fe; padding: 2px 6px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="search-bar">
        <input type="text" id="address-input" placeholder="Enter any address... (e.g., Eiffel Tower, Paris)"
               onkeydown="if(event.key === 'Enter') geocodeAddress()">
        <button onclick="geocodeAddress()">Search</button>
    </div>

    <div id="map"></div>

    <div id="result-panel">
        <h2>Geocoding Results</h2>
        <p style="color: #999;">Enter an address above to see its coordinates and location details.</p>
        <div id="results"></div>
    </div>

    <script>
        let map;
        let geocoder;
        let marker;

        function initMap() {
            // Start with a world view
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 2,
                center: { lat: 20, lng: 0 },
            });

            // Create the Geocoder service
            geocoder = new google.maps.Geocoder();
        }

        function geocodeAddress() {
            const address = document.getElementById("address-input").value.trim();
            if (!address) return;

            // Send the address to the Geocoding API
            geocoder.geocode({ address: address }, (results, status) => {
                const resultsDiv = document.getElementById("results");

                if (status !== "OK" || results.length === 0) {
                    resultsDiv.innerHTML = `
                        <div class="result-card">
                            <h3>Address not found</h3>
                            <p>Try a more specific address, or check for typos.</p>
                        </div>`;
                    return;
                }

                // Get the first (best) result
                const place = results[0];
                const location = place.geometry.location;

                // Remove old marker if it exists
                if (marker) marker.setMap(null);

                // Add a new marker at the geocoded location
                marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: place.formatted_address,
                    animation: google.maps.Animation.DROP,
                });

                // Zoom the map to the result
                map.setCenter(location);
                map.setZoom(15);

                // Extract address components (city, state, country, etc.)
                const components = {};
                place.address_components.forEach(comp => {
                    comp.types.forEach(type => {
                        components[type] = comp.long_name;
                    });
                });

                // Display the results
                resultsDiv.innerHTML = `
                    <div class="result-card">
                        <h3>${place.formatted_address}</h3>
                        <p><strong>Latitude:</strong> <span class="coord">${location.lat().toFixed(6)}</span></p>
                        <p><strong>Longitude:</strong> <span class="coord">${location.lng().toFixed(6)}</span></p>
                        <p><strong>Location Type:</strong> ${place.geometry.location_type}</p>
                        <p><strong>City:</strong> ${components.locality || components.administrative_area_level_2 || "N/A"}</p>
                        <p><strong>State/Region:</strong> ${components.administrative_area_level_1 || "N/A"}</p>
                        <p><strong>Country:</strong> ${components.country || "N/A"}</p>
                        <p><strong>Postal Code:</strong> ${components.postal_code || "N/A"}</p>
                        <p><strong>Place ID:</strong> <span class="coord">${place.place_id}</span></p>
                    </div>`;
            });
        }
    </script>

    <script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
        async defer
    ></script>
</body>
</html>
```

### Expected Output

When you type "Eiffel Tower, Paris" and click Search:

```
📸 [What you should see]
┌──────────────────────────────────────────────┐
│  [Eiffel Tower, Paris____________] [Search]  │
├──────────────────────────────────────────────┤
│                                              │
│        [Map zoomed in on Paris with          │
│         a pin at the Eiffel Tower]           │
│                                              │
├──────────────────────────────────────────────┤
│  Geocoding Results                           │
│  ┌──────────────────────────────────────┐    │
│  │ Champ de Mars, 5 Av. Anatole France │    │
│  │ Latitude:  48.858370                 │    │
│  │ Longitude: 2.294481                  │    │
│  │ City: Paris                          │    │
│  │ Country: France                      │    │
│  │ Postal Code: 75007                   │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

---

## 💻 Code Example 2: Route Planner with Distance Matrix

Now let's build a route planner that shows driving directions between two addresses and calculates travel times for multiple destinations.

Save this as `route-planner.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Route Planner</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; }

        .controls {
            padding: 16px;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            align-items: flex-end;
        }

        .field { display: flex; flex-direction: column; }
        .field label { font-size: 12px; color: #666; margin-bottom: 4px; font-weight: bold; }
        .field input, .field select {
            padding: 10px 14px;
            font-size: 14px;
            border: 2px solid #ddd;
            border-radius: 8px;
            min-width: 200px;
        }

        .field input:focus, .field select:focus {
            border-color: #4285F4;
            outline: none;
        }

        button.route-btn {
            padding: 10px 24px;
            background: #4285F4;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            align-self: flex-end;
        }

        button.route-btn:hover { background: #3367d6; }

        .content { display: flex; height: calc(100vh - 80px); }
        #map { flex: 1; }

        #directions-panel {
            width: 350px;
            overflow-y: auto;
            padding: 16px;
            background: #f8f9fa;
            font-size: 14px;
        }

        #directions-panel h3 { color: #4285F4; }

        .summary-card {
            background: white;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .summary-card .big-number {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        /* Style the directions steps that Google generates */
        #directions-panel .adp-directions { font-size: 13px; }
    </style>
</head>
<body>
    <div class="controls">
        <div class="field">
            <label>FROM</label>
            <input type="text" id="origin" placeholder="Starting address" value="Melbourne Central, VIC">
        </div>
        <div class="field">
            <label>TO</label>
            <input type="text" id="destination" placeholder="Destination address" value="St Kilda Beach, VIC">
        </div>
        <div class="field">
            <label>TRAVEL MODE</label>
            <select id="travel-mode">
                <option value="DRIVING">Driving</option>
                <option value="WALKING">Walking</option>
                <option value="BICYCLING">Cycling</option>
                <option value="TRANSIT">Public Transit</option>
            </select>
        </div>
        <button class="route-btn" onclick="calculateRoute()">Get Directions</button>
    </div>

    <div class="content">
        <div id="map"></div>
        <div id="directions-panel">
            <h3>Route Details</h3>
            <p style="color: #999;">Enter origin and destination, then click "Get Directions."</p>
            <div id="route-summary"></div>
            <div id="directions-steps"></div>
        </div>
    </div>

    <script>
        let map;
        let directionsService;
        let directionsRenderer;

        function initMap() {
            // Create the map centered on Melbourne
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: { lat: -37.8136, lng: 144.9631 },
            });

            // DirectionsService calculates routes
            directionsService = new google.maps.DirectionsService();

            // DirectionsRenderer draws the route on the map
            directionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                panel: document.getElementById("directions-steps"), // Where to render text directions
            });
        }

        function calculateRoute() {
            const origin = document.getElementById("origin").value;
            const destination = document.getElementById("destination").value;
            const travelMode = document.getElementById("travel-mode").value;

            if (!origin || !destination) {
                alert("Please enter both an origin and destination.");
                return;
            }

            // Build the directions request
            const request = {
                origin: origin,               // Can be an address string
                destination: destination,      // Can be an address string
                travelMode: google.maps.TravelMode[travelMode],
                provideRouteAlternatives: true,  // Ask for alternative routes
                unitSystem: google.maps.UnitSystem.METRIC,
            };

            // Request the route from Google
            directionsService.route(request, (result, status) => {
                if (status !== "OK") {
                    document.getElementById("route-summary").innerHTML = `
                        <div class="summary-card">
                            <p>Could not calculate route: ${status}</p>
                            <p>Try checking the addresses or selecting a different travel mode.</p>
                        </div>`;
                    return;
                }

                // Draw the route on the map
                directionsRenderer.setDirections(result);

                // Get the main route details
                const route = result.routes[0];
                const leg = route.legs[0]; // First (and only) leg for a simple A-to-B route

                // Display the summary
                let summaryHTML = `
                    <div class="summary-card">
                        <p><strong>From:</strong> ${leg.start_address}</p>
                        <p><strong>To:</strong> ${leg.end_address}</p>
                        <div style="display:flex; gap:24px; margin-top:12px;">
                            <div>
                                <div class="big-number">${leg.duration.text}</div>
                                <div style="color:#666;">Travel time</div>
                            </div>
                            <div>
                                <div class="big-number">${leg.distance.text}</div>
                                <div style="color:#666;">Distance</div>
                            </div>
                        </div>
                    </div>`;

                // Show alternative routes if available
                if (result.routes.length > 1) {
                    summaryHTML += '<h4 style="color:#666;">Alternative Routes</h4>';
                    result.routes.slice(1).forEach((altRoute, i) => {
                        const altLeg = altRoute.legs[0];
                        summaryHTML += `
                            <div class="summary-card" style="padding:8px 12px;">
                                <p><strong>Route ${i + 2}:</strong>
                                ${altLeg.duration.text} — ${altLeg.distance.text}
                                via ${altRoute.summary}</p>
                            </div>`;
                    });
                }

                document.getElementById("route-summary").innerHTML = summaryHTML;
            });

            // Also run a Distance Matrix request to show comparison
            calculateDistanceMatrix(origin, destination, travelMode);
        }

        function calculateDistanceMatrix(origin, destination, travelMode) {
            const distanceService = new google.maps.DistanceMatrixService();

            // Compare driving time to multiple destinations at once
            distanceService.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode[travelMode],
            }, (response, status) => {
                if (status !== "OK") return;

                // The response contains a rows array (one per origin)
                // Each row has an elements array (one per destination)
                const element = response.rows[0].elements[0];

                if (element.status === "OK") {
                    console.log("Distance Matrix result:");
                    console.log(`  Distance: ${element.distance.text}`);
                    console.log(`  Duration: ${element.duration.text}`);
                }
            });
        }
    </script>

    <script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
        async defer
    ></script>
</body>
</html>
```

### Expected Output

After entering "Melbourne Central, VIC" to "St Kilda Beach, VIC" with Driving mode:

```
📸 [What you should see]
┌──────────────────────────────────────────────────────────────┐
│ FROM: Melbourne Central  TO: St Kilda Beach  [DRIVING] [Go] │
├────────────────────────────────┬─────────────────────────────┤
│                                │ Route Details               │
│                                │                             │
│   [Map showing blue route     │ From: Melbourne Central     │
│    line from city center      │ To: St Kilda Beach          │
│    down to St Kilda Beach]    │                             │
│                                │ 18 mins    8.2 km           │
│   A ──── route ──── B         │                             │
│                                │ Alternative Routes          │
│                                │ Route 2: 22 mins via Kings │
│                                │                             │
│                                │ Step 1: Head south on...   │
│                                │ Step 2: Turn left onto...  │
│                                │ Step 3: Continue on...     │
│                                │ ...                        │
└────────────────────────────────┴─────────────────────────────┘
```

---

## ✍️ Hands-On Exercises

### Exercise 1: Reverse Geocoder

Build a page where clicking anywhere on the map reverse geocodes that location and shows the address. Use `map.addListener("click", ...)` to detect clicks, then call `geocoder.geocode({ location: clickedLatLng })`.

**Hints:**
- The click event gives you `event.latLng` with the coordinates
- Reverse geocoding returns multiple results — the first is usually the most specific
- Display the result in an InfoWindow at the clicked location

### Exercise 2: Multi-Stop Road Trip Planner

Extend the route planner to support waypoints (stops along the way). Add 2-3 intermediate stop inputs. The Directions API supports a `waypoints` array.

**Hints:**
- Add `waypoints: [{ location: "Address", stopover: true }]` to the request
- Set `optimizeWaypoints: true` to let Google find the best order
- Display the total trip time (sum all `leg.duration` values)

---

## ❓ Quiz

<div id="quiz">

**Question 1:** What is geocoding?

<input type="radio" name="q1" value="a" data-answer> A. Converting a street address into latitude/longitude coordinates<br>
<input type="radio" name="q1" value="b"> B. Drawing a route on a map<br>
<input type="radio" name="q1" value="c"> C. Finding nearby restaurants<br>
<input type="radio" name="q1" value="d"> D. Creating a new Google account<br>

<div class="quiz-explain" style="display:none;">Geocoding is the process of converting human-readable addresses (like "10 Downing Street, London") into geographic coordinates (latitude and longitude) that can be plotted on a map.</div>

---

**Question 2:** What is reverse geocoding?

<input type="radio" name="q2" value="a"> A. Geocoding in reverse alphabetical order<br>
<input type="radio" name="q2" value="b" data-answer> B. Converting coordinates (lat/lng) back into a human-readable address<br>
<input type="radio" name="q2" value="c"> C. Deleting a geocoded address<br>
<input type="radio" name="q2" value="d"> D. Searching for addresses that no longer exist<br>

<div class="quiz-explain" style="display:none;">Reverse geocoding is the opposite of geocoding. You provide latitude and longitude, and the API returns the nearest address. This is useful when you have GPS coordinates and need to display a readable location.</div>

---

**Question 3:** Which travel mode would you use to find a public bus/train route?

<input type="radio" name="q3" value="a"> A. DRIVING<br>
<input type="radio" name="q3" value="b"> B. WALKING<br>
<input type="radio" name="q3" value="c"> C. BICYCLING<br>
<input type="radio" name="q3" value="d" data-answer> D. TRANSIT<br>

<div class="quiz-explain" style="display:none;">TRANSIT mode returns routes using public transportation including buses, trains, subways, trams, and ferries. It includes information about departure times, transfers, and walking segments to/from stops.</div>

---

**Question 4:** What does the `provideRouteAlternatives` option do?

<input type="radio" name="q4" value="a"> A. It provides directions in multiple languages<br>
<input type="radio" name="q4" value="b" data-answer> B. It asks Google to return multiple different route options, not just the fastest one<br>
<input type="radio" name="q4" value="c"> C. It calculates the route for different vehicle types<br>
<input type="radio" name="q4" value="d"> D. It shows routes that avoid highways<br>

<div class="quiz-explain" style="display:none;">When set to true, the Directions API returns up to 3 alternative routes in addition to the primary route. Each has its own distance, duration, and step-by-step instructions. This lets users choose their preferred route.</div>

---

**Question 5:** What is a "leg" in a Directions API response?

<input type="radio" name="q5" value="a"> A. A unit of measurement for distance<br>
<input type="radio" name="q5" value="b" data-answer> B. A portion of the route between two waypoints (or origin/destination)<br>
<input type="radio" name="q5" value="c"> C. The walking portion of a transit route<br>
<input type="radio" name="q5" value="d"> D. The speed limit on a road segment<br>

<div class="quiz-explain" style="display:none;">A leg represents the journey between two consecutive points. A simple A-to-B route has one leg. If you add waypoint C in the middle, you get two legs: A→C and C→B. Each leg has its own distance, duration, and steps.</div>

---

**Question 6:** What advantage does the Distance Matrix API have over making multiple Directions requests?

<input type="radio" name="q6" value="a"> A. It draws routes on the map<br>
<input type="radio" name="q6" value="b"> B. It provides step-by-step instructions<br>
<input type="radio" name="q6" value="c" data-answer> C. It efficiently compares travel times between multiple origins and destinations in a single request<br>
<input type="radio" name="q6" value="d"> D. It is completely free with no usage limits<br>

<div class="quiz-explain" style="display:none;">The Distance Matrix API can calculate distances and travel times for many origin-destination pairs in one API call. For example, comparing 3 warehouses to 10 customers would need 30 Directions requests but just 1 Distance Matrix request.</div>

---

**Question 7:** What does `geometry.location_type` tell you in a geocoding result?

<input type="radio" name="q7" value="a"> A. Whether the location is indoors or outdoors<br>
<input type="radio" name="q7" value="b" data-answer> B. How precise the geocoding result is (exact rooftop, approximate, range, center)<br>
<input type="radio" name="q7" value="c"> C. The type of building at that location<br>
<input type="radio" name="q7" value="d"> D. The time zone of the location<br>

<div class="quiz-explain" style="display:none;">location_type indicates precision: ROOFTOP is exact, RANGE_INTERPOLATED is estimated between two points, GEOMETRIC_CENTER is the center of a region (like a park), and APPROXIMATE is a rough estimate. This helps you know how accurate the result is.</div>

---

**Question 8:** What does `optimizeWaypoints: true` do when you have multiple stops?

<input type="radio" name="q8" value="a"> A. It removes unnecessary stops<br>
<input type="radio" name="q8" value="b"> B. It finds the cheapest gas stations along the route<br>
<input type="radio" name="q8" value="c" data-answer> C. It reorders the waypoints to minimize total travel time<br>
<input type="radio" name="q8" value="d"> D. It adds additional stops for rest breaks<br>

<div class="quiz-explain" style="display:none;">When you set optimizeWaypoints to true, Google rearranges the order of your intermediate stops to find the most efficient route. The origin and destination stay fixed, but the stops in between may be reordered. The response includes a waypoint_order array showing the optimized sequence.</div>

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

You now have a solid foundation in maps, places, geocoding, and routing. But what happens when you combine all of this with **artificial intelligence**? In **Module 6.4: Gemini AI + Maps**, you will learn how to use Google's Gemini AI to understand natural language location queries, build an AI travel planner, and create smart restaurant recommendation systems. This is where things get really exciting!
