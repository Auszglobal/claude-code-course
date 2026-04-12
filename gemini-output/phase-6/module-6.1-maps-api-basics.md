# Module 6.1: Google Maps API Basics

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Understand what the Google Maps Platform is and what it offers
- Create and configure a Google Maps API key
- Embed an interactive map into a web page
- Customize your map with markers, colors, and styles
- Understand Google Maps pricing and how to stay within the free tier

---

## 📖 Theory

### What Is the Google Maps Platform?

You already use Google Maps every day — searching for directions, finding restaurants, or checking traffic. The **Google Maps Platform** lets developers put that same power into their own apps and websites.

Think of it like this: Google Maps on your phone is the "finished dish" at a restaurant. The Google Maps Platform is the kitchen — it gives you access to all the ingredients (maps, directions, places, street view) so you can cook up your own creations.

### The Three Pillars of Google Maps Platform

Google organizes its mapping tools into three main categories:

| Pillar | What It Does | Example Use |
|--------|-------------|-------------|
| **Maps** | Display interactive maps | Embed a map on your website |
| **Routes** | Calculate directions and distances | Show driving directions between two cities |
| **Places** | Search for businesses and points of interest | Find nearby coffee shops |

In this module, we focus on the **Maps** pillar — the foundation everything else builds on.

### API Keys: Your Access Pass

To use any Google Maps service, you need an **API key**. This is a unique string of characters that identifies your project to Google. Think of it like a library card — the library (Google) needs to know who is borrowing books (making API requests) so it can keep track.

Your API key:
- Tells Google which project is making requests
- Lets Google track your usage for billing
- Can be restricted to prevent unauthorized use

### Pricing: The Free Tier

Here is great news for beginners: Google gives you **$200 of free credit every month**. For most learning and small projects, you will never pay a penny. Here is what that covers:

| API | Free Requests/Month | Cost After Free Tier |
|-----|---------------------|---------------------|
| Maps JavaScript API | ~28,000 map loads | $7.00 per 1,000 |
| Static Maps API | ~28,000 images | $2.00 per 1,000 |
| Geocoding API | ~28,000 requests | $5.00 per 1,000 |
| Places API | ~5,700 requests | $17-35 per 1,000 |

For learning purposes, you will use a tiny fraction of this. Just make sure to set up billing alerts (we will show you how) so there are never surprises.

---

## 💻 Code Example 1: Your First Embedded Map

Let's put an interactive Google Maps right into a web page. This is the "Hello World" of maps programming.

### Step 1: Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services > Library**
4. Search for "Maps JavaScript API" and click **Enable**
5. Go to **APIs & Services > Credentials**
6. Click **Create Credentials > API Key**
7. Copy your new API key

**Important:** Restrict your API key! Click on the key, then under "Application restrictions," select "HTTP referrers" and add your website domain. For local testing, add `http://localhost:*`.

### Step 2: Create the HTML File

Save this as `my-first-map.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Google Map</title>
    <style>
        /* Make the map fill the whole page */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        /* The map container needs a specific height */
        #map {
            height: 80%;
            width: 100%;
        }

        /* A simple header above the map */
        .header {
            height: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #4285F4;
            color: white;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>My First Google Map</h1>
    </div>

    <!-- This div is where the map will appear -->
    <div id="map"></div>

    <script>
        // This function runs when the Maps API finishes loading
        function initMap() {
            // Set the center of the map (Sydney, Australia)
            const sydney = { lat: -33.8688, lng: 151.2093 };

            // Create the map object and attach it to the #map div
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,          // Zoom level (1 = whole world, 20 = street level)
                center: sydney,    // Where the map is centered
                mapTypeId: "roadmap"  // Options: roadmap, satellite, hybrid, terrain
            });

            // Add a marker (pin) at the center
            const marker = new google.maps.Marker({
                position: sydney,
                map: map,
                title: "Sydney, Australia"  // Tooltip when you hover
            });
        }
    </script>

    <!-- Load the Google Maps JavaScript API -->
    <!-- Replace YOUR_API_KEY with your actual key -->
    <script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
        async
        defer
    ></script>
</body>
</html>
```

### Expected Output

When you open this file in your browser, you should see:

```
📸 [What you should see]
┌──────────────────────────────────────────┐
│        My First Google Map               │
│   (white text on blue background)        │
├──────────────────────────────────────────┤
│                                          │
│    [Interactive Google Map of Sydney]    │
│         📍 Pin at city center            │
│                                          │
│    You can drag, zoom, and click!        │
│                                          │
└──────────────────────────────────────────┘
```

You can drag the map, zoom in and out with the scroll wheel, and hover over the marker to see "Sydney, Australia."

---

## 💻 Code Example 2: Customized Map with Multiple Markers and Info Windows

Now let's build something more useful — a map showing several tourist attractions with clickable info windows.

Save this as `tourist-map.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sydney Tourist Map</title>
    <style>
        html, body { height: 100%; margin: 0; padding: 0; }
        #map { height: 100%; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>

    <script>
        function initMap() {
            // Create the map centered on Sydney
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 13,
                center: { lat: -33.8568, lng: 151.2153 },
                // Custom map style — muted colors to make markers stand out
                styles: [
                    {
                        featureType: "water",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#a3ccff" }]  // Light blue water
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#e8f0e8" }]  // Light green land
                    },
                    {
                        featureType: "poi",           // Points of interest
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]  // Hide default POI labels
                    }
                ]
            });

            // Array of tourist attractions
            // Each has a name, position, and description
            const attractions = [
                {
                    name: "Sydney Opera House",
                    position: { lat: -33.8568, lng: 151.2153 },
                    description: "Iconic performing arts venue and UNESCO World Heritage Site. " +
                                 "Designed by Jorn Utzon, opened in 1973."
                },
                {
                    name: "Sydney Harbour Bridge",
                    position: { lat: -33.8523, lng: 151.2108 },
                    description: "The world's largest steel arch bridge. " +
                                 "You can walk across it or climb to the top!"
                },
                {
                    name: "Bondi Beach",
                    position: { lat: -33.8908, lng: 151.2743 },
                    description: "Australia's most famous beach. " +
                                 "Perfect for surfing, swimming, or just relaxing."
                },
                {
                    name: "Taronga Zoo",
                    position: { lat: -33.8434, lng: 151.2411 },
                    description: "Home to over 4,000 animals with stunning harbour views. " +
                                 "Take the ferry for the best experience!"
                },
                {
                    name: "Royal Botanic Garden",
                    position: { lat: -33.8642, lng: 151.2166 },
                    description: "Beautiful 30-hectare garden right next to the Opera House. " +
                                 "Free entry, open every day."
                }
            ];

            // Create a single InfoWindow object (we reuse it for all markers)
            const infoWindow = new google.maps.InfoWindow();

            // Loop through each attraction and create a marker
            attractions.forEach((attraction, index) => {
                // Create a marker for this attraction
                const marker = new google.maps.Marker({
                    position: attraction.position,
                    map: map,
                    title: attraction.name,
                    // Animate markers dropping onto the map one by one
                    animation: google.maps.Animation.DROP,
                });

                // Build the HTML content for the info window
                const content = `
                    <div style="max-width: 250px; font-family: Arial, sans-serif;">
                        <h3 style="color: #4285F4; margin: 0 0 8px 0;">
                            ${attraction.name}
                        </h3>
                        <p style="color: #555; margin: 0; line-height: 1.5;">
                            ${attraction.description}
                        </p>
                    </div>
                `;

                // When the user clicks a marker, show the info window
                marker.addListener("click", () => {
                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);

                    // Smoothly pan the map to center on the clicked marker
                    map.panTo(attraction.position);
                });
            });
        }
    </script>

    <!-- Replace YOUR_API_KEY with your actual key -->
    <script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
        async
        defer
    ></script>
</body>
</html>
```

### Expected Output

```
📸 [What you should see]
┌──────────────────────────────────────────┐
│                                          │
│    [Custom-styled map of Sydney]         │
│    Light blue water, soft green land     │
│                                          │
│    📍 Sydney Opera House                 │
│    📍 Sydney Harbour Bridge              │
│    📍 Bondi Beach                        │
│    📍 Taronga Zoo                        │
│    📍 Royal Botanic Garden               │
│                                          │
│    Click any pin to see a popup with     │
│    the attraction name and description   │
│                                          │
└──────────────────────────────────────────┘
```

Clicking on any marker opens a neat info window with the name and description. The map smoothly pans to center on whichever marker you click.

---

## ✍️ Hands-On Exercises

### Exercise 1: Map Your City

Create a map centered on **your** city or town. Add at least 3 markers for places you like (your favorite restaurant, a park, your school or workplace). Each marker should have an info window with a short description.

**Hints:**
- Use Google Maps to find the latitude/longitude of places (right-click on any spot and the coordinates appear)
- Change the `zoom` level to fit all your markers on screen
- Try different `mapTypeId` values: `"satellite"`, `"hybrid"`, `"terrain"`

### Exercise 2: Style Experiment

Using the [Google Maps Styling Wizard](https://mapstyle.withgoogle.com/), create a custom color scheme for your map. The wizard generates the JSON styles array for you — just paste it into the `styles` property.

**Try making:**
- A dark-themed "night mode" map
- A map with bright, colorful water
- A minimalist map with most labels hidden

---

## ❓ Quiz

<div id="quiz">

**Question 1:** What do you need to use Google Maps on your own website?

<input type="radio" name="q1" value="a"> A. A Google email address only<br>
<input type="radio" name="q1" value="b"> B. An API key from Google Cloud Console<br>
<input type="radio" name="q1" value="c"> C. A paid Google Maps subscription<br>
<input type="radio" name="q1" value="d" data-answer> D. Both A and B<br>

<div class="quiz-explain" style="display:none;">You need a Google account (Gmail) to access Google Cloud Console, and then you create an API key from there. No paid subscription is required — the free tier covers most learning needs.</div>

---

**Question 2:** How much free credit does Google give you each month for Maps APIs?

<input type="radio" name="q2" value="a"> A. $50<br>
<input type="radio" name="q2" value="b" data-answer> B. $200<br>
<input type="radio" name="q2" value="c"> C. $500<br>
<input type="radio" name="q2" value="d"> D. There is no free tier<br>

<div class="quiz-explain" style="display:none;">Google provides $200 of free Maps Platform credit every month. For learning and small projects, this is more than enough.</div>

---

**Question 3:** What does the `zoom` property control when creating a map?

<input type="radio" name="q3" value="a"> A. The speed of map loading<br>
<input type="radio" name="q3" value="b"> B. The brightness of the map<br>
<input type="radio" name="q3" value="c" data-answer> C. How close or far the view is (street level vs. world view)<br>
<input type="radio" name="q3" value="d"> D. The number of markers displayed<br>

<div class="quiz-explain" style="display:none;">Zoom level 1 shows the whole world, while zoom level 20 shows individual buildings. Level 12-14 is good for viewing a city.</div>

---

**Question 4:** What is the purpose of restricting your API key?

<input type="radio" name="q4" value="a"> A. To make the map load faster<br>
<input type="radio" name="q4" value="b" data-answer> B. To prevent unauthorized people from using your key and running up charges<br>
<input type="radio" name="q4" value="c"> C. To unlock premium map features<br>
<input type="radio" name="q4" value="d"> D. To change the map language<br>

<div class="quiz-explain" style="display:none;">If someone steals your unrestricted API key, they could use it on their own website and you would be billed. Restricting it to your domain prevents this.</div>

---

**Question 5:** Which `mapTypeId` shows satellite imagery with road labels overlaid?

<input type="radio" name="q5" value="a"> A. roadmap<br>
<input type="radio" name="q5" value="b"> B. satellite<br>
<input type="radio" name="q5" value="c" data-answer> C. hybrid<br>
<input type="radio" name="q5" value="d"> D. terrain<br>

<div class="quiz-explain" style="display:none;">"hybrid" combines satellite photos with the labels and roads you see in "roadmap" mode. "satellite" shows the imagery without labels.</div>

---

**Question 6:** What happens when you click a marker that has a click listener attached?

<input type="radio" name="q6" value="a"> A. The marker disappears<br>
<input type="radio" name="q6" value="b"> B. The map zooms in automatically<br>
<input type="radio" name="q6" value="c" data-answer> C. The function you defined in the listener runs (e.g., opening an info window)<br>
<input type="radio" name="q6" value="d"> D. The page reloads<br>

<div class="quiz-explain" style="display:none;">Event listeners let you define what happens when a user interacts with map elements. In our example, clicking a marker opens an InfoWindow popup.</div>

---

**Question 7:** Why do we reuse a single InfoWindow object instead of creating one per marker?

<input type="radio" name="q7" value="a" data-answer> A. So only one info window is open at a time — clicking a new marker closes the old one<br>
<input type="radio" name="q7" value="b"> B. Google only allows one InfoWindow per page<br>
<input type="radio" name="q7" value="c"> C. It changes the color of the info window<br>
<input type="radio" name="q7" value="d"> D. It is required by the API<br>

<div class="quiz-explain" style="display:none;">By reusing one InfoWindow and calling setContent() + open() each time, the previous popup automatically closes. This keeps the map clean and readable.</div>

---

**Question 8:** What does the `styles` property on a map allow you to do?

<input type="radio" name="q8" value="a"> A. Add animation effects to markers<br>
<input type="radio" name="q8" value="b"> B. Change the size of the map<br>
<input type="radio" name="q8" value="c" data-answer> C. Customize colors and visibility of map features like water, roads, and labels<br>
<input type="radio" name="q8" value="d"> D. Load maps from a different provider<br>

<div class="quiz-explain" style="display:none;">The styles array lets you control the appearance of nearly every map feature — water color, road color, label visibility, and more. Google provides a Styling Wizard to help generate these styles visually.</div>

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
                selected.parentElement && (explain.style.display = 'block');
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

Now that you can create and customize maps, you are ready to search for real places on those maps. In **Module 6.2: Places API**, you will learn how to find restaurants, shops, and attractions near any location — and display detailed information like reviews, photos, and opening hours. Your maps are about to get a lot more useful!
