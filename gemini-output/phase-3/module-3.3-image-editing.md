# Module 3.3: Image Editing with Gemini

## 🎯 Learning Objectives
- Edit existing images using natural language instructions with Gemini
- Remove or add objects in images without manual photo editing skills
- Change backgrounds, colors, and apply style transfers (e.g., turn a photo into a painting)
- Build a before/after editing workflow for practical image transformation tasks

## 📖 Theory

### Editing Images with Words

Imagine walking into a photo studio and telling the editor, "Can you remove that person in the background, change the wall color to blue, and make it look like an oil painting?" Traditionally, this would require hours of work in Photoshop by a skilled designer. With Gemini, you can do it by simply describing what you want.

**AI image editing** works by combining two superpowers:
1. **Image understanding**: Gemini "sees" what is in your photo
2. **Image generation**: Gemini creates the modified version based on your instructions

When you upload an image and say "remove the car from the background," Gemini understands where the car is, figures out what should be behind it (grass? road? sky?), and fills in the gap seamlessly. This process is sometimes called **inpainting** — painting in the missing parts.

### Types of Edits You Can Make

| Edit Type | What It Does | Example |
|-----------|-------------|---------|
| **Object Removal** | Delete unwanted items from a photo | Remove a trash can from a street photo |
| **Object Addition** | Add new elements to a scene | Add a vase of flowers on a table |
| **Background Change** | Replace the entire background | Put a product on a marble countertop |
| **Color Change** | Modify colors of specific elements | Change a red car to blue |
| **Style Transfer** | Convert the artistic style | Make a photo look like a Van Gogh painting |
| **Enhancement** | Improve quality and aesthetics | Make a dull photo more vibrant |
| **Text Addition** | Add text or signage to images | Put a "SALE" sign on a storefront |

### The Key Principle: Be Specific

The golden rule of AI image editing is the same as image generation — **specificity wins**. Compare:

- **Vague**: "Fix the background"
- **Specific**: "Replace the cluttered office background with a clean, blurred gradient of soft blue and white, keeping the person in focus"

The more precisely you describe what you want changed and what the result should look like, the better your output will be.

## 💻 Code Example 1: Removing and Adding Objects

### Removing an Unwanted Object

```python
from google import genai
from google.genai import types
from pathlib import Path

client = genai.Client(api_key="YOUR_API_KEY_HERE")

# Load the original image
original = Path("beach_photo.jpg")  # A beach photo with a trash can

response = client.models.generate_content(
    model="gemini-2.0-flash-exp",
    contents=[
        types.Part.from_bytes(
            data=original.read_bytes(),
            mime_type="image/jpeg"
        ),
        # Give clear, specific editing instructions
        "Edit this image: Remove the trash can on the right side. "
        "Fill the area naturally with sand and ocean to match the "
        "surrounding beach scene. Keep everything else exactly the same."
    ],
    config=types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"]  # We want an image back
    )
)

# Save the edited image
for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        Path("beach_photo_clean.png").write_bytes(part.inline_data.data)
        print("Edited image saved! The trash can has been removed.")
    elif part.text is not None:
        print("Gemini notes:", part.text)
```

### Adding an Object

```python
# Using the same setup as above, now ADD something to an image
room_image = Path("living_room.jpg")  # A photo of a living room

response = client.models.generate_content(
    model="gemini-2.0-flash-exp",
    contents=[
        types.Part.from_bytes(
            data=room_image.read_bytes(),
            mime_type="image/jpeg"
        ),
        "Edit this image: Add a large potted monstera plant in the "
        "empty corner on the left side of the room. The plant should "
        "be in a white ceramic pot and look natural in the scene, "
        "matching the existing lighting and shadows."
    ],
    config=types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"]
    )
)

for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        Path("living_room_with_plant.png").write_bytes(part.inline_data.data)
        print("Plant added to the living room!")
```

### Expected Output:
```
Edited image saved! The trash can has been removed.
Plant added to the living room!
```

You will have two new images: one with the trash can seamlessly removed, and one with a realistic-looking plant added to the room.

## 💻 Code Example 2: Background Change and Style Transfer

### Changing the Background

```python
from google import genai
from google.genai import types
from pathlib import Path

client = genai.Client(api_key="YOUR_API_KEY_HERE")

# Load a product photo with a messy background
product_photo = Path("product_original.jpg")

response = client.models.generate_content(
    model="gemini-2.0-flash-exp",
    contents=[
        types.Part.from_bytes(
            data=product_photo.read_bytes(),
            mime_type="image/jpeg"
        ),
        "Edit this image: Keep the product (the main subject) exactly "
        "as it is, but replace the entire background with a clean, "
        "white studio backdrop with soft shadows underneath the product. "
        "Make it look like a professional e-commerce product photo."
    ],
    config=types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"]
    )
)

for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        Path("product_white_bg.png").write_bytes(part.inline_data.data)
        print("Professional product photo created!")
```

### Style Transfer: Photo to Painting

```python
# Transform a photograph into different artistic styles
photo = Path("city_street.jpg")  # Any photograph you have

# Define the style transformations to try
style_transfers = {
    "oil_painting":  "Transform this photo into a rich oil painting in "
                     "the style of the Impressionist masters. Add visible "
                     "brush strokes, warm golden tones, and a dreamy "
                     "atmospheric quality. Keep the composition the same.",
    
    "watercolor":    "Transform this photo into a delicate watercolor "
                     "painting. Use soft, translucent washes of color "
                     "with white areas showing through. Slightly blurred "
                     "edges. Gentle, ethereal feeling.",
    
    "comic_book":    "Transform this photo into a bold comic book "
                     "illustration. Use strong black outlines, flat "
                     "colors, halftone dot shading, and dramatic contrast. "
                     "Pop art style with vibrant colors.",
    
    "pencil_sketch": "Transform this photo into a detailed pencil sketch. "
                     "Black and white only, with careful cross-hatching "
                     "for shadows and fine line work for details. "
                     "Artist sketchbook quality."
}

for style_name, style_prompt in style_transfers.items():
    print(f"Creating {style_name} version...")
    
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp",
        contents=[
            types.Part.from_bytes(
                data=photo.read_bytes(),
                mime_type="image/jpeg"
            ),
            style_prompt                # The style transfer instruction
        ],
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"]
        )
    )
    
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            filename = f"city_{style_name}.png"
            Path(filename).write_bytes(part.inline_data.data)
            print(f"  Saved: {filename}")

print("\nAll style transfers complete!")
```

### Expected Output:
```
Creating oil_painting version...
  Saved: city_oil_painting.png
Creating watercolor version...
  Saved: city_watercolor.png
Creating comic_book version...
  Saved: city_comic_book.png
Creating pencil_sketch version...
  Saved: city_pencil_sketch.png

All style transfers complete!
```

### Before/After Workflow Best Practices

When editing images professionally, follow this workflow:

1. **Keep the original** — Never overwrite your source image
2. **Start with one edit** — Make one change at a time for best results
3. **Review and iterate** — If the edit is not perfect, refine your prompt
4. **Layer edits** — For complex changes, do them in stages (first fix background, then adjust colors, then add elements)
5. **Name files clearly** — Use names like `product_v1_bg_removed.png`, `product_v2_color_adjusted.png`

## ✍️ Hands-On Exercises

### Exercise 1: Photo Cleanup
Find a photo you have taken that has something you wish was not there (a photobomber, a distracting sign, an unwanted object). Upload it to Google AI Studio and try three different removal prompts:

1. A simple prompt: "Remove the [object]"
2. A medium prompt: "Remove the [object] and fill the area naturally"
3. A detailed prompt: "Remove the [object] on the [location]. Replace it with [specific description] that matches the surrounding [context]. Maintain the same lighting and perspective."

Compare which prompt gives the cleanest result.

**Hint**: If the object is complex or overlaps with important parts of the image, you may need to describe very precisely what should appear in its place.

### Exercise 2: Product Photo Transformer
Take a photo of any everyday object (a cup, a shoe, a book) with your phone:
1. First, change the background to a professional white studio backdrop
2. Then, change it to a rustic wooden table with plants
3. Finally, transform the entire image into a watercolor illustration

Notice how the same product looks completely different depending on the styling.

**Hint**: When changing backgrounds, always include "keep the main subject exactly as it is" in your prompt to prevent the AI from accidentally modifying your product.

## 🔗 Next Steps

You have learned to edit images one at a time, but what if you need to process dozens or even hundreds of images? In Module 3.4, you will learn **batch image processing** — how to automate image tasks at scale, from product photography pipelines to social media content generation.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="B">
<p>1. What is "inpainting" in the context of AI image editing?</p>
<label><input type="radio" name="q1" value="0"> A. Painting an image from scratch</label>
<label><input type="radio" name="q1" value="1"> B. Filling in removed or missing areas of an image to look natural</label>
<label><input type="radio" name="q1" value="2"> C. Converting a painting into a photograph</label>
<label><input type="radio" name="q1" value="3"> D. Adding a watermark to an image</label>
<div class="quiz-explain">Inpainting is the process of filling in parts of an image that have been removed or are missing. The AI generates content for those areas that blends seamlessly with the surrounding image.</div>
</div>

<div class="quiz-q" data-answer="A">
<p>2. What two AI capabilities combine to make image editing possible?</p>
<label><input type="radio" name="q2" value="0"> A. Image understanding and image generation</label>
<label><input type="radio" name="q2" value="1"> B. Speech recognition and text generation</label>
<label><input type="radio" name="q2" value="2"> C. Web scraping and data analysis</label>
<label><input type="radio" name="q2" value="3"> D. File compression and decompression</label>
<div class="quiz-explain">AI image editing combines understanding (the AI "sees" what is in the photo) with generation (the AI creates the modified version). Without both, editing would not be possible.</div>
</div>

<div class="quiz-q" data-answer="D">
<p>3. What does "style transfer" mean?</p>
<label><input type="radio" name="q3" value="0"> A. Transferring an image from one device to another</label>
<label><input type="radio" name="q3" value="1"> B. Copying the text from an image</label>
<label><input type="radio" name="q3" value="2"> C. Moving files between folders</label>
<label><input type="radio" name="q3" value="3"> D. Converting the artistic style of an image (e.g., photo to oil painting)</label>
<div class="quiz-explain">Style transfer takes the content of one image and renders it in a different artistic style — for example, making a photograph look like a watercolor painting or a comic book illustration.</div>
</div>

<div class="quiz-q" data-answer="C">
<p>4. When editing product photos, why should you include "keep the main subject exactly as it is" in your prompt?</p>
<label><input type="radio" name="q4" value="0"> A. To make the image load faster</label>
<label><input type="radio" name="q4" value="1"> B. To reduce the file size</label>
<label><input type="radio" name="q4" value="2"> C. To prevent the AI from accidentally modifying the product</label>
<label><input type="radio" name="q4" value="3"> D. To ensure the image has a higher resolution</label>
<div class="quiz-explain">Without explicit instructions to preserve the subject, the AI might subtly alter the product's shape, color, or details while making other changes. Being explicit about what NOT to change is just as important as describing what to change.</div>
</div>

<div class="quiz-q" data-answer="B">
<p>5. What is the recommended approach for complex image edits?</p>
<label><input type="radio" name="q5" value="0"> A. Put all changes in one single long prompt</label>
<label><input type="radio" name="q5" value="1"> B. Make changes in stages, one at a time, reviewing each result</label>
<label><input type="radio" name="q5" value="2"> C. Use the shortest possible prompt for the fastest results</label>
<label><input type="radio" name="q5" value="3"> D. Only edit images that are already close to what you want</label>
<div class="quiz-explain">Layering edits one at a time gives you more control and lets you review each change before moving on. Trying to make too many changes at once can produce unpredictable results.</div>
</div>

<div class="quiz-q" data-answer="A">
<p>6. Which of these is a good file naming practice when editing images?</p>
<label><input type="radio" name="q6" value="0"> A. product_v2_bg_removed.png</label>
<label><input type="radio" name="q6" value="1"> B. image.png</label>
<label><input type="radio" name="q6" value="2"> C. final_final_v3_REAL.png</label>
<label><input type="radio" name="q6" value="3"> D. abc123.png</label>
<div class="quiz-explain">Clear, descriptive filenames that include the version and the edit performed help you track your changes and find the right version later. Generic names like "image.png" make it impossible to tell versions apart.</div>
</div>

<div class="quiz-q" data-answer="D">
<p>7. Which edit type would you use to make a real estate photo look more inviting?</p>
<label><input type="radio" name="q7" value="0"> A. Object removal only</label>
<label><input type="radio" name="q7" value="1"> B. Style transfer to comic book</label>
<label><input type="radio" name="q7" value="2"> C. Convert to pencil sketch</label>
<label><input type="radio" name="q7" value="3"> D. Enhancement (improve lighting, colors, and vibrancy)</label>
<div class="quiz-explain">Real estate photos benefit most from enhancement — improving lighting, making colors more vibrant, and creating a warm, inviting atmosphere. Artistic style transfers would make the listing look less realistic.</div>
</div>

<div class="quiz-q" data-answer="C">
<p>8. Why should you never overwrite your original image file?</p>
<label><input type="radio" name="q8" value="0"> A. It is illegal to modify original photographs</label>
<label><input type="radio" name="q8" value="1"> B. Edited images are always lower quality than originals</label>
<label><input type="radio" name="q8" value="2"> C. You may need the original for comparison, re-editing, or undo</label>
<label><input type="radio" name="q8" value="3"> D. The AI requires the original file to remain unchanged</label>
<div class="quiz-explain">Always keep your originals because you might want to start over, compare before/after, or apply different edits later. Once an original is overwritten, those options are gone forever.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
