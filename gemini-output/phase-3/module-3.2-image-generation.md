# Module 3.2: Image Generation with Imagen 3

## 🎯 Learning Objectives
- Generate images from text descriptions using Gemini's Imagen 3 model
- Write effective image prompts that produce the results you envision
- Control image style (photorealistic, illustration, watercolor, 3D, and more)
- Understand aspect ratios, resolutions, and when to use each

## 📖 Theory

### From Words to Pictures

Imagine you could describe a scene to the world's most talented artist, and in seconds they would hand you a finished painting. That is essentially what image generation does — you write a description (called a **prompt**), and the AI creates an image that matches your words.

Google's **Imagen 3** is the image generation model that powers Gemini's creative capabilities. It is one of the most advanced text-to-image systems available, producing high-quality images across many different styles.

### How Does Text-to-Image Work?

At a very high level:

1. **You write a prompt**: "A cozy coffee shop on a rainy evening, warm light glowing from the windows"
2. **The AI interprets your words**: It understands "coffee shop," "rainy," "evening," and "warm light"
3. **It generates pixels**: Starting from random noise, the model gradually refines the image until it matches your description
4. **You get a finished image**: Usually in just a few seconds

Think of it like sculpting from a block of marble — the AI starts with chaos (noise) and chisels away until it reveals the image hidden in your words.

### The Art of Prompt Writing

The biggest difference between a mediocre AI image and a stunning one is the **prompt**. Here is a simple formula:

```
[Subject] + [Setting/Background] + [Style] + [Mood/Lighting] + [Details]
```

**Weak prompt**: "A cat"
**Strong prompt**: "A fluffy orange tabby cat sitting on a windowsill, looking outside at falling snow, soft warm indoor lighting, photorealistic, shallow depth of field, cozy winter atmosphere"

The more detail you provide, the more control you have over the result.

### Image Styles You Can Request

| Style | Description | Good For |
|-------|-------------|----------|
| Photorealistic | Looks like a real photograph | Product mockups, realistic scenes |
| Illustration | Hand-drawn or digital art style | Blog graphics, children's content |
| 3D Render | Computer-generated 3D look | Product design, tech visuals |
| Watercolor | Soft, painterly appearance | Artistic projects, invitations |
| Flat Design | Clean, minimal vector look | Icons, infographics, UI mockups |
| Oil Painting | Rich, textured classic art | Decorative art, portraits |
| Anime/Manga | Japanese animation style | Entertainment, character design |
| Pixel Art | Retro 8-bit game style | Gaming content, nostalgic designs |

## 💻 Code Example 1: Your First Generated Image

**In Google AI Studio (no code needed):**

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Select the **Gemini 2.0 Flash** model (or newer with image generation)
3. Type a prompt that asks for an image
4. The generated image will appear in the response

```
Prompt:
"Generate an image of a friendly robot teacher standing in front of 
a whiteboard in a colorful classroom. The robot is holding a pointer 
and smiling. Pixar-style 3D illustration, bright cheerful lighting."
```

**Using the Gemini API with Python:**

```python
from google import genai
from google.genai import types
from pathlib import Path

# Set up the client
client = genai.Client(api_key="YOUR_API_KEY_HERE")

# Generate an image with a detailed prompt
response = client.models.generate_content(
    model="gemini-2.0-flash-exp",           # Model with image generation
    contents="Generate an image: A cozy bookstore cafe with warm "
             "string lights, wooden shelves filled with colorful books, "
             "a steaming cup of coffee on a small round table, "
             "watercolor illustration style, soft warm tones",
    config=types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"]  # Allow image output
    )
)

# Save the generated image
for part in response.candidates[0].content.parts:
    if part.inline_data is not None:               # This part is an image
        image_bytes = part.inline_data.data         # Get the raw image data
        Path("bookstore_cafe.png").write_bytes(image_bytes)  # Save to file
        print("Image saved as bookstore_cafe.png!")
    elif part.text is not None:                     # This part is text
        print("Gemini says:", part.text)
```

### Expected Output:
```
Image saved as bookstore_cafe.png!
```
A watercolor-style illustration of a cozy bookstore with warm lighting, bookshelves, and a coffee cup will be saved to your computer.

## 💻 Code Example 2: Controlling Style, Aspect Ratio, and Generating Multiple Variations

```python
from google import genai
from google.genai import types
from pathlib import Path

client = genai.Client(api_key="YOUR_API_KEY_HERE")

# Define different styles for the same subject
styles = {
    "photorealistic": "photorealistic, DSLR photo, natural lighting, "
                      "sharp focus, 85mm lens",
    "watercolor":     "watercolor painting, soft edges, visible brush "
                      "strokes, muted pastel palette",
    "3d_render":      "3D render, Pixar-style, smooth surfaces, "
                      "bright studio lighting, vibrant colors",
    "flat_design":    "flat vector illustration, minimal, clean lines, "
                      "bold solid colors, no shadows"
}

# The subject stays the same — only the style changes
subject = "a red bicycle parked against a stone wall with ivy"

for style_name, style_description in styles.items():
    # Build the full prompt: subject + style
    full_prompt = f"Generate an image: {subject}, {style_description}"
    
    print(f"Generating {style_name} version...")
    
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp",
        contents=full_prompt,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"]
        )
    )
    
    # Save each variation with the style name in the filename
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            filename = f"bicycle_{style_name}.png"
            Path(filename).write_bytes(part.inline_data.data)
            print(f"  Saved: {filename}")

print("\nAll 4 style variations generated!")
```

### Expected Output:
```
Generating photorealistic version...
  Saved: bicycle_photorealistic.png
Generating watercolor version...
  Saved: bicycle_watercolor.png
Generating 3d_render version...
  Saved: bicycle_3d_render.png
Generating flat_design version...
  Saved: bicycle_flat_design.png

All 4 style variations generated!
```

### Aspect Ratio Tips

When generating images, you can specify the aspect ratio in your prompt:

| Ratio | Dimensions | Best For |
|-------|-----------|----------|
| 1:1 (Square) | 1024 x 1024 | Instagram posts, profile pictures |
| 16:9 (Wide) | 1536 x 864 | YouTube thumbnails, presentations |
| 9:16 (Tall) | 864 x 1536 | Phone wallpapers, Stories, Reels |
| 4:3 (Standard) | 1024 x 768 | Blog images, general web use |
| 3:2 (Photo) | 1536 x 1024 | Photography-style images |

Add the aspect ratio to your prompt: "...wide format, 16:9 aspect ratio" or configure it via the API's image generation settings when available.

## ✍️ Hands-On Exercises

### Exercise 1: Style Explorer
Generate the **same scene** in 4 different styles. Use this scene:

> "A lighthouse on a rocky cliff overlooking the ocean at sunset"

Try these styles:
1. Photorealistic photograph
2. Watercolor painting
3. Japanese woodblock print
4. Neon cyberpunk illustration

Compare the results. Which style surprised you the most?

**Hint**: Be specific about lighting and atmosphere. "Golden hour sunset with dramatic orange and purple clouds" gives much better results than just "sunset."

### Exercise 2: The Perfect Prompt
Start with a vague prompt and refine it through 5 iterations:
1. "A house" (very vague)
2. "A Victorian house" (add type)
3. "A Victorian house with a garden" (add setting)
4. "A Victorian house with a rose garden, morning fog" (add mood)
5. "A Victorian house with a rose garden, morning fog, photorealistic, golden hour light, birds flying overhead" (add style and details)

Save each result and see how the image improves with each iteration.

**Hint**: This exercise teaches you the most important image generation skill — prompt refinement. Most professionals go through 5-10 iterations to get exactly what they want.

## 🔗 Next Steps

You now know how to create images from scratch. But what if you want to modify an existing image — like removing an unwanted object, changing the background, or transforming a photo into a painting? In Module 3.3, you will learn **image editing** with Gemini, where you combine your understanding and generation skills to transform existing images.

---

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="C">
<p>1. What is the name of Google's image generation model?</p>
<label><input type="radio" name="q1" value="0"> A. DALL-E 3</label>
<label><input type="radio" name="q1" value="1"> B. Midjourney</label>
<label><input type="radio" name="q1" value="2"> C. Imagen 3</label>
<label><input type="radio" name="q1" value="3"> D. Stable Diffusion</label>
<div class="quiz-explain">Imagen 3 is Google's text-to-image model that powers image generation in Gemini. DALL-E is by OpenAI, Midjourney is independent, and Stable Diffusion is by Stability AI.</div>
</div>

<div class="quiz-q" data-answer="D">
<p>2. Which prompt would likely produce the best image result?</p>
<label><input type="radio" name="q2" value="0"> A. "A dog"</label>
<label><input type="radio" name="q2" value="1"> B. "A cute dog outside"</label>
<label><input type="radio" name="q2" value="2"> C. "A dog in a park, nice weather"</label>
<label><input type="radio" name="q2" value="3"> D. "A golden retriever puppy playing in autumn leaves, Central Park, soft afternoon light, photorealistic, shallow depth of field"</label>
<div class="quiz-explain">The most detailed prompt gives the AI the most information to work with. Specifying the breed, action, setting, lighting, and style produces a much more precise and high-quality result.</div>
</div>

<div class="quiz-q" data-answer="B">
<p>3. What is the recommended formula for writing image prompts?</p>
<label><input type="radio" name="q3" value="0"> A. Style + Color + Size</label>
<label><input type="radio" name="q3" value="1"> B. Subject + Setting + Style + Mood/Lighting + Details</label>
<label><input type="radio" name="q3" value="2"> C. Title + Description + Tags</label>
<label><input type="radio" name="q3" value="3"> D. Who + What + When + Where + Why</label>
<div class="quiz-explain">The Subject + Setting + Style + Mood/Lighting + Details formula covers all the key elements the AI needs to generate a well-composed, stylistically appropriate image.</div>
</div>

<div class="quiz-q" data-answer="A">
<p>4. What aspect ratio is best for Instagram posts?</p>
<label><input type="radio" name="q4" value="0"> A. 1:1 (Square)</label>
<label><input type="radio" name="q4" value="1"> B. 16:9 (Wide)</label>
<label><input type="radio" name="q4" value="2"> C. 9:16 (Tall)</label>
<label><input type="radio" name="q4" value="3"> D. 3:2 (Photo)</label>
<div class="quiz-explain">Instagram's classic post format is square (1:1). While Instagram now supports other ratios, 1:1 remains the standard for feed posts and looks best in the grid view.</div>
</div>

<div class="quiz-q" data-answer="C">
<p>5. How does text-to-image generation work at a high level?</p>
<label><input type="radio" name="q5" value="0"> A. It searches the internet for matching photos and downloads them</label>
<label><input type="radio" name="q5" value="1"> B. It combines pieces of existing photographs together</label>
<label><input type="radio" name="q5" value="2"> C. It starts from random noise and gradually refines it into an image matching the prompt</label>
<label><input type="radio" name="q5" value="3"> D. A human artist draws the image in real time based on your request</label>
<div class="quiz-explain">Image generation models start with random noise (like TV static) and iteratively refine it, guided by the text prompt, until a coherent image emerges — similar to sculpting from a block of marble.</div>
</div>

<div class="quiz-q" data-answer="B">
<p>6. In the Python code example, what does `response_modalities=["TEXT", "IMAGE"]` do?</p>
<label><input type="radio" name="q6" value="0"> A. It converts text into an image automatically</label>
<label><input type="radio" name="q6" value="1"> B. It tells Gemini that the response can include both text and images</label>
<label><input type="radio" name="q6" value="2"> C. It forces Gemini to return only images, no text</label>
<label><input type="radio" name="q6" value="3"> D. It uploads both text and images to the model</label>
<div class="quiz-explain">Setting response_modalities to ["TEXT", "IMAGE"] tells Gemini that it is allowed to include both text and generated images in its response. Without this setting, it might only return text.</div>
</div>

<div class="quiz-q" data-answer="D">
<p>7. Which image style would be most appropriate for a children's storybook?</p>
<label><input type="radio" name="q7" value="0"> A. Photorealistic</label>
<label><input type="radio" name="q7" value="1"> B. Neon cyberpunk</label>
<label><input type="radio" name="q7" value="2"> C. Technical blueprint</label>
<label><input type="radio" name="q7" value="3"> D. Illustration or watercolor</label>
<div class="quiz-explain">Children's books traditionally use illustration or watercolor styles because they are warm, inviting, and age-appropriate. Photorealistic or technical styles would be too sterile for this audience.</div>
</div>

<div class="quiz-q" data-answer="A">
<p>8. Why is prompt refinement (iterating multiple times) important?</p>
<label><input type="radio" name="q8" value="0"> A. Because most professionals need 5-10 iterations to get the exact result they want</label>
<label><input type="radio" name="q8" value="1"> B. Because the AI requires at least 5 attempts to start working</label>
<label><input type="radio" name="q8" value="2"> C. Because each iteration makes the image resolution higher</label>
<label><input type="radio" name="q8" value="3"> D. Because you need to train the AI on your preferences first</label>
<div class="quiz-explain">Even experienced AI artists rarely get the perfect image on the first try. Each iteration lets you add more detail, adjust the style, or fix issues — gradually converging on exactly what you envision.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
