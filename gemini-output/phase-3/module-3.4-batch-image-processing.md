# Module 3.4: Batch Image Processing

## 🎯 Learning Objectives
- Process multiple images automatically using the Gemini API in a loop
- Build a product photography automation pipeline that standardizes backgrounds and styling
- Generate batches of social media images for Instagram, Facebook, and other platforms
- Add watermarks and branding elements to images programmatically

## 📖 Theory

### Why Batch Processing Matters

Imagine you run a small online store with 50 products. You need professional-looking photos of each one with a clean white background. Doing that one-by-one in Google AI Studio would take hours. But with a simple Python script, you can feed all 50 images through Gemini in minutes and get back 50 polished product photos.

**Batch processing** means applying the same operation (or set of operations) to many files automatically. Think of it like a factory assembly line: instead of hand-crafting each item, you set up the machine once and let it run.

### Real-World Batch Use Cases

| Use Case | What You Automate | Time Saved |
|----------|------------------|------------|
| E-commerce product photos | Remove backgrounds, add white backdrop | Hours per catalog update |
| Social media content | Generate branded posts for the week | 3-5 hours per week |
| Real estate listings | Enhance lighting and colors for all property photos | 1-2 hours per listing |
| Event photography | Apply consistent style/filter to hundreds of photos | An entire day of editing |
| Marketing campaigns | Create variations of ads for different platforms | Days of designer time |

### The Batch Processing Pattern

Every batch processing script follows the same basic pattern:

```
1. COLLECT — Gather all the images you want to process
2. LOOP — Go through each image one at a time
3. PROCESS — Send it to Gemini with your editing instructions
4. SAVE — Save the result with a clear filename
5. REPORT — Log what was done so you can review the results
```

This is one of the most powerful patterns in AI automation. Once you set it up, you can reuse it forever.

### Rate Limits and Best Practices

When processing many images through an API, you need to be mindful of:

- **Rate limits**: APIs limit how many requests you can make per minute. The free tier of the Gemini API allows roughly 10-15 requests per minute for image tasks.
- **Error handling**: Sometimes a request fails (network issues, server busy). Your script should handle this gracefully.
- **Cost awareness**: While Google AI Studio is free for experiments, high-volume production use may incur costs.
- **File organization**: With dozens of output files, good naming and folder structure is essential.

## 💻 Code Example 1: Product Photography Automation

This script takes a folder of raw product photos and creates professional e-commerce images with clean backgrounds.

```python
from google import genai
from google.genai import types
from pathlib import Path
import time                           # For adding delays between requests

client = genai.Client(api_key="YOUR_API_KEY_HERE")

# Set up folders
input_folder = Path("raw_products")       # Folder with original product photos
output_folder = Path("processed_products") # Folder for the cleaned-up versions
output_folder.mkdir(exist_ok=True)         # Create output folder if needed

# The editing instruction — same for every product
PRODUCT_PROMPT = (
    "Edit this image: Keep the product (the main subject) exactly as it is. "
    "Remove the existing background entirely. Replace it with a clean, "
    "pure white studio background with a soft, natural shadow beneath "
    "the product. Make it look like a professional Amazon/Shopify product "
    "listing photo. Ensure the product fills about 80% of the frame."
)

# Find all image files in the input folder
image_files = list(input_folder.glob("*.jpg")) + list(input_folder.glob("*.png"))
total = len(image_files)

print(f"Found {total} product images to process.\n")

# Process each image
for index, image_path in enumerate(image_files, start=1):
    print(f"[{index}/{total}] Processing: {image_path.name}...")
    
    try:
        # Read the image and send it to Gemini
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=[
                types.Part.from_bytes(
                    data=image_path.read_bytes(),
                    mime_type="image/jpeg"
                ),
                PRODUCT_PROMPT
            ],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"]
            )
        )
        
        # Save the processed image
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                # Name the output file with a "_clean" suffix
                output_name = f"{image_path.stem}_clean.png"
                output_path = output_folder / output_name
                output_path.write_bytes(part.inline_data.data)
                print(f"  ✓ Saved: {output_path}")
                break
        else:
            print(f"  ⚠ No image returned for {image_path.name}")
    
    except Exception as error:
        # If something goes wrong, log it and continue with the next image
        print(f"  ✗ Error: {error}")
    
    # Wait 5 seconds between requests to respect rate limits
    if index < total:
        time.sleep(5)

print(f"\nDone! Processed {total} images. Check the '{output_folder}' folder.")
```

### Expected Output:
```
Found 5 product images to process.

[1/5] Processing: red_sneakers.jpg...
  ✓ Saved: processed_products/red_sneakers_clean.png
[2/5] Processing: leather_wallet.jpg...
  ✓ Saved: processed_products/leather_wallet_clean.png
[3/5] Processing: coffee_mug.jpg...
  ✓ Saved: processed_products/coffee_mug_clean.png
[4/5] Processing: wireless_earbuds.jpg...
  ✓ Saved: processed_products/wireless_earbuds_clean.png
[5/5] Processing: sunglasses.jpg...
  ✓ Saved: processed_products/sunglasses_clean.png

Done! Processed 5 images. Check the 'processed_products' folder.
```

## 💻 Code Example 2: Social Media Image Generation and Watermarking

This script generates a week's worth of branded social media content.

```python
from google import genai
from google.genai import types
from pathlib import Path
import time

client = genai.Client(api_key="YOUR_API_KEY_HERE")

# Create output folder for social media content
social_folder = Path("social_media_posts")
social_folder.mkdir(exist_ok=True)

# Define your brand settings
BRAND_NAME = "Sunrise Coffee Co."
BRAND_COLORS = "warm orange, deep brown, cream white"
BRAND_STYLE = "cozy, inviting, artisanal, warm lighting, shallow depth of field"

# Plan a week of Instagram posts — each with a different theme
weekly_posts = [
    {
        "day": "Monday",
        "theme": "Morning Motivation",
        "prompt": f"A steaming cup of latte art on a rustic wooden table, "
                  f"early morning sunlight streaming through a window, "
                  f"a small notebook and pen beside the cup, "
                  f"color palette: {BRAND_COLORS}, {BRAND_STYLE}, "
                  f"square format 1:1 aspect ratio, Instagram post"
    },
    {
        "day": "Tuesday",
        "theme": "Behind the Scenes",
        "prompt": f"A barista carefully pouring steamed milk into a coffee cup, "
                  f"creating latte art, close-up shot of hands and cup only, "
                  f"warm cafe lighting, espresso machine softly blurred in background, "
                  f"color palette: {BRAND_COLORS}, {BRAND_STYLE}, "
                  f"square format 1:1 aspect ratio"
    },
    {
        "day": "Wednesday",
        "theme": "Product Feature",
        "prompt": f"A beautifully arranged flat lay of coffee beans, a ceramic pour-over "
                  f"dripper, a bag of artisanal coffee with a simple kraft paper label, "
                  f"and dried flowers, shot from directly above on a cream linen cloth, "
                  f"color palette: {BRAND_COLORS}, {BRAND_STYLE}, "
                  f"square format 1:1 aspect ratio"
    },
    {
        "day": "Thursday",
        "theme": "Customer Lifestyle",
        "prompt": f"A person reading a book in a cozy cafe corner, holding a large "
                  f"cappuccino, warm ambient lighting, bookshelf in the background, "
                  f"plants on the windowsill, feeling of comfort and relaxation, "
                  f"color palette: {BRAND_COLORS}, {BRAND_STYLE}, "
                  f"square format 1:1 aspect ratio"
    },
    {
        "day": "Friday",
        "theme": "Weekend Vibes",
        "prompt": f"An iced coffee in a tall glass with cream swirling inside, "
                  f"outdoor cafe table with sunlight and leaf shadows, "
                  f"a pastry on a small plate beside the glass, summer feeling, "
                  f"color palette: {BRAND_COLORS}, {BRAND_STYLE}, "
                  f"square format 1:1 aspect ratio"
    }
]

print(f"Generating {len(weekly_posts)} social media posts for {BRAND_NAME}\n")

for post in weekly_posts:
    print(f"  {post['day']} — {post['theme']}...")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=f"Generate an image: {post['prompt']}",
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"]
            )
        )
        
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                day_lower = post["day"].lower()
                filename = f"{day_lower}_{post['theme'].lower().replace(' ', '_')}.png"
                filepath = social_folder / filename
                filepath.write_bytes(part.inline_data.data)
                print(f"    ✓ Saved: {filepath}")
                break
    
    except Exception as error:
        print(f"    ✗ Error: {error}")
    
    time.sleep(5)  # Respect rate limits

# --- PART 2: Adding a watermark to all generated images ---
print("\nNow adding watermarks to all generated images...\n")

# Get all images we just created
generated_images = list(social_folder.glob("*.png"))

watermarked_folder = social_folder / "watermarked"
watermarked_folder.mkdir(exist_ok=True)

WATERMARK_PROMPT = (
    f"Edit this image: Add a small, semi-transparent watermark that says "
    f"'{BRAND_NAME}' in the bottom-right corner. Use a clean, modern "
    f"sans-serif font in white with about 40% opacity so it is visible "
    f"but does not distract from the image. Keep everything else unchanged."
)

for img_path in generated_images:
    print(f"  Watermarking: {img_path.name}...")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=[
                types.Part.from_bytes(
                    data=img_path.read_bytes(),
                    mime_type="image/png"
                ),
                WATERMARK_PROMPT
            ],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"]
            )
        )
        
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                watermarked_path = watermarked_folder / f"wm_{img_path.name}"
                watermarked_path.write_bytes(part.inline_data.data)
                print(f"    ✓ Saved: {watermarked_path}")
                break
    
    except Exception as error:
        print(f"    ✗ Error: {error}")
    
    time.sleep(5)

print("\nAll done! Your weekly social media content is ready.")
```

### Expected Output:
```
Generating 5 social media posts for Sunrise Coffee Co.

  Monday — Morning Motivation...
    ✓ Saved: social_media_posts/monday_morning_motivation.png
  Tuesday — Behind the Scenes...
    ✓ Saved: social_media_posts/tuesday_behind_the_scenes.png
  Wednesday — Product Feature...
    ✓ Saved: social_media_posts/wednesday_product_feature.png
  Thursday — Customer Lifestyle...
    ✓ Saved: social_media_posts/thursday_customer_lifestyle.png
  Friday — Weekend Vibes...
    ✓ Saved: social_media_posts/friday_weekend_vibes.png

Now adding watermarks to all generated images...

  Watermarking: monday_morning_motivation.png...
    ✓ Saved: social_media_posts/watermarked/wm_monday_morning_motivation.png
  ...

All done! Your weekly social media content is ready.
```

## ✍️ Hands-On Exercises

### Exercise 1: Your First Batch Pipeline
Create a simple batch script that does the following:
1. Create a folder called `my_photos` and put 3-5 of your own photos in it
2. Write a script (or use Google AI Studio manually) that applies the **same style** to all of them — for example, convert all photos to watercolor paintings
3. Save the results in a folder called `my_photos_watercolor`

**Hint**: Start by copying Code Example 1 and changing the `PRODUCT_PROMPT` to your style transfer instruction. Change the folder names to match your setup.

### Exercise 2: Multi-Platform Content Creator
Take one product photo and create versions optimized for three platforms:
1. **Instagram Post**: Square (1:1), vibrant colors, lifestyle background
2. **Facebook Cover**: Wide (16:9), clean and professional
3. **Pinterest Pin**: Tall (2:3), eye-catching with text overlay space at top

Use a different prompt for each platform, adjusting the aspect ratio and style.

**Hint**: For each platform, include the aspect ratio in your prompt (e.g., "wide format, 16:9 aspect ratio") and adjust the styling to match that platform's aesthetic. Instagram tends to be more colorful, LinkedIn more professional, Pinterest more eye-catching.

## 🔗 Next Steps

You have mastered batch image processing for products and social media. In Module 3.5, you will take your skills to the next level with **logo and brand design** — using Gemini to create logos, generate brand color palettes, design business cards, and build a cohesive visual identity for any project or business.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="C">
<p>1. What is "batch processing" in the context of image editing?</p>
<label><input type="radio" name="q1" value="0"> A. Editing one image very thoroughly</label>
<label><input type="radio" name="q1" value="1"> B. Uploading images to cloud storage</label>
<label><input type="radio" name="q1" value="2"> C. Applying the same operation to many images automatically</label>
<label><input type="radio" name="q1" value="3"> D. Combining multiple images into one collage</label>
<div class="quiz-explain">Batch processing means automating repetitive tasks across many files. Instead of manually editing each image one by one, you set up a script that processes them all with the same instructions.</div>
</div>

<div class="quiz-q" data-answer="A">
<p>2. Why do we add `time.sleep(5)` between API requests in the batch script?</p>
<label><input type="radio" name="q2" value="0"> A. To respect API rate limits and avoid being blocked</label>
<label><input type="radio" name="q2" value="1"> B. To give Gemini time to think</label>
<label><input type="radio" name="q2" value="2"> C. To make the script look more professional</label>
<label><input type="radio" name="q2" value="3"> D. To ensure images are saved in the correct order</label>
<div class="quiz-explain">APIs have rate limits — they restrict how many requests you can make per minute. Adding a short delay between requests prevents your script from hitting those limits and getting temporarily blocked.</div>
</div>

<div class="quiz-q" data-answer="B">
<p>3. What does `output_folder.mkdir(exist_ok=True)` do in the Python script?</p>
<label><input type="radio" name="q3" value="0"> A. Deletes the folder if it exists</label>
<label><input type="radio" name="q3" value="1"> B. Creates the folder if it does not exist, or does nothing if it already exists</label>
<label><input type="radio" name="q3" value="2"> C. Checks if the folder has any images in it</label>
<label><input type="radio" name="q3" value="3"> D. Renames the folder to add a timestamp</label>
<div class="quiz-explain">The `mkdir(exist_ok=True)` command creates the directory if it does not exist. The `exist_ok=True` part means "don't throw an error if the folder is already there" — it just quietly moves on.</div>
</div>

<div class="quiz-q" data-answer="D">
<p>4. In the product photography script, what does `image_path.stem` return?</p>
<label><input type="radio" name="q4" value="0"> A. The full file path including directory</label>
<label><input type="radio" name="q4" value="1"> B. The file extension (e.g., .jpg)</label>
<label><input type="radio" name="q4" value="2"> C. The file size in bytes</label>
<label><input type="radio" name="q4" value="3"> D. The filename without the extension (e.g., "red_sneakers" from "red_sneakers.jpg")</label>
<div class="quiz-explain">The `.stem` property of a Path object returns just the filename without the extension. This is useful for creating new filenames based on the original (like adding "_clean" before a new extension).</div>
</div>

<div class="quiz-q" data-answer="A">
<p>5. Why is error handling (try/except) important in batch processing scripts?</p>
<label><input type="radio" name="q5" value="0"> A. One failed image should not stop the entire batch from processing</label>
<label><input type="radio" name="q5" value="1"> B. It makes the script run faster</label>
<label><input type="radio" name="q5" value="2"> C. It is required by the Gemini API</label>
<label><input type="radio" name="q5" value="3"> D. It prevents images from being saved to the wrong folder</label>
<div class="quiz-explain">Without error handling, a single failed request (network timeout, corrupted image, etc.) would crash the entire script. With try/except, the script logs the error and continues processing the remaining images.</div>
</div>

<div class="quiz-q" data-answer="C">
<p>6. What aspect ratio should you use for a Pinterest Pin image?</p>
<label><input type="radio" name="q6" value="0"> A. 1:1 (Square)</label>
<label><input type="radio" name="q6" value="1"> B. 16:9 (Wide)</label>
<label><input type="radio" name="q6" value="2"> C. 2:3 (Tall)</label>
<label><input type="radio" name="q6" value="3"> D. 4:3 (Standard)</label>
<div class="quiz-explain">Pinterest displays content in a vertical feed, so tall images (2:3 ratio) take up more visual space and perform better. They also leave room for text overlays at the top or bottom.</div>
</div>

<div class="quiz-q" data-answer="B">
<p>7. What is the correct order for the batch processing pattern?</p>
<label><input type="radio" name="q7" value="0"> A. Process → Collect → Save → Loop → Report</label>
<label><input type="radio" name="q7" value="1"> B. Collect → Loop → Process → Save → Report</label>
<label><input type="radio" name="q7" value="2"> C. Report → Collect → Process → Save → Loop</label>
<label><input type="radio" name="q7" value="3"> D. Save → Process → Loop → Collect → Report</label>
<div class="quiz-explain">The correct pattern is: Collect all images first, then Loop through each one, Process it with the AI, Save the result, and finally Report what was done. This ensures organized, systematic processing.</div>
</div>

<div class="quiz-q" data-answer="D">
<p>8. What is the main benefit of defining brand settings (colors, style) as variables at the top of the script?</p>
<label><input type="radio" name="q8" value="0"> A. It makes the AI generate images faster</label>
<label><input type="radio" name="q8" value="1"> B. It reduces the cost of API calls</label>
<label><input type="radio" name="q8" value="2"> C. It is required by the Gemini API</label>
<label><input type="radio" name="q8" value="3"> D. You can change the branding once and it updates all prompts automatically</label>
<div class="quiz-explain">By defining brand settings as variables, you create a single source of truth. If the brand colors or style change, you only need to update one line at the top of the script instead of modifying every individual prompt.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
