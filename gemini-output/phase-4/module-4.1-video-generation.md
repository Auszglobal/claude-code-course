# Module 4.1: Video Generation with Veo 2

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Understand what Veo 2 is and how it generates video from text prompts
- Write effective video prompts that specify scene, camera movement, and visual style
- Generate short video clips using the Gemini API with Veo 2
- Recognize the current limitations, supported formats, and best practices for AI video generation
- Iterate on your prompts to get closer to the video you envision

---

## 📖 Theory

### What Is Veo 2?

Veo 2 is Google DeepMind's text-to-video generation model, accessible through the Gemini API. Think of it like an incredibly fast film crew that lives inside the cloud — you describe a scene in plain English, and Veo 2 produces a short video clip that matches your description. No cameras, no actors, no editing software required.

### How Does Text-to-Video Work?

At a high level, Veo 2 has been trained on massive amounts of video data. It learned the visual patterns of how objects move, how light behaves, how cameras pan and zoom, and how different artistic styles look on screen. When you send it a text prompt, the model "imagines" a video frame by frame, producing a coherent clip that matches your description.

It is similar to how image generators like DALL-E or Imagen work, but extended into the time dimension — every frame needs to be consistent with the ones before and after it.

### Anatomy of a Great Video Prompt

A strong video prompt has several components:

| Component | What It Describes | Example |
|-----------|------------------|---------|
| **Subject** | The main focus of the video | "A golden retriever puppy" |
| **Action** | What is happening | "running through a meadow" |
| **Scene/Setting** | The environment | "in a sunlit alpine meadow with wildflowers" |
| **Camera Movement** | How the virtual camera behaves | "tracking shot following from the side" |
| **Style/Mood** | The visual aesthetic | "cinematic, warm color grading, shallow depth of field" |
| **Lighting** | How the scene is lit | "golden hour sunlight with long shadows" |

Combining these elements gives Veo 2 enough context to produce a compelling clip. Vague prompts like "a dog outside" will give you generic results, while detailed prompts give you control.

### Supported Formats and Specifications

As of early 2026, Veo 2 through the Gemini API supports:

- **Output resolutions**: 720p and 1080p
- **Aspect ratios**: 16:9 (landscape), 9:16 (portrait/vertical), 1:1 (square)
- **Duration**: Clips up to approximately 8 seconds
- **Output format**: MP4 (H.264 codec)
- **Frame rate**: 24 fps by default

### Key Limitations to Know

Before diving in, set your expectations:

1. **Short clips only** — You are generating moments, not movies. Think of each generation as one "shot" in film terminology.
2. **No audio** — Veo 2 generates silent video. You will need to add music or sound effects separately.
3. **Hands and text are tricky** — Like image generators, Veo 2 can struggle with realistic human hands and readable text in scenes.
4. **Consistency across clips** — If you generate two separate clips, the same character may look slightly different in each. There is no built-in character consistency (yet).
5. **Content policies** — Veo 2 will refuse to generate harmful, violent, or explicit content. It follows Google's responsible AI guidelines.
6. **Generation time** — Video generation takes significantly longer than image generation. Expect 1-3 minutes per clip.

---

## 💻 Code Example 1: Your First Video Generation

Let's generate a simple video clip with a straightforward prompt.

```python
# module_4_1_first_video.py
# Generate a simple video clip using Veo 2 through the Gemini API

import google.generativeai as genai
import time

# Configure your API key
genai.configure(api_key="YOUR_API_KEY")

# Use the Veo 2 model for video generation
model = genai.GenerativeModel("veo-2")

# Write a clear, descriptive prompt
prompt = (
    "A calm ocean wave rolling onto a sandy beach at sunset. "
    "The camera is low to the ground, capturing the water spreading across the sand. "
    "Warm golden light, cinematic look, slow motion."
)

print("Submitting video generation request...")
print(f"Prompt: {prompt}\n")

# Generate the video — this returns an operation you can poll
operation = model.generate_video(prompt=prompt)

# Video generation takes time — poll until complete
print("Generating video (this may take 1-3 minutes)...")
while not operation.done:
    time.sleep(10)
    print("  Still working...")

# Once done, retrieve the result
result = operation.result()

# The result contains a video object with a URI or bytes
video = result.videos[0]

# Save the video to a local file
with open("beach_sunset.mp4", "wb") as f:
    f.write(video.video_bytes)

print("Video saved as beach_sunset.mp4")
print(f"Duration: {video.duration_seconds} seconds")
print(f"Resolution: {video.width}x{video.height}")
```

### Expected Output

```
Submitting video generation request...
Prompt: A calm ocean wave rolling onto a sandy beach at sunset. The camera is low to the ground, capturing the water spreading across the sand. Warm golden light, cinematic look, slow motion.

Generating video (this may take 1-3 minutes)...
  Still working...
  Still working...
  Still working...
Video saved as beach_sunset.mp4
Duration: 8 seconds
Resolution: 1920x1080
```

You will find a file called `beach_sunset.mp4` in your working directory. Open it in any video player to see your AI-generated clip.

---

## 💻 Code Example 2: Advanced Prompt Engineering with Parameters

Now let's explore how to use generation parameters to control aspect ratio and style, and how to iterate on prompts.

```python
# module_4_1_advanced_video.py
# Generate multiple video variations with different settings

import google.generativeai as genai
import time

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("veo-2")

# Define a collection of prompts with different styles and settings
video_requests = [
    {
        "name": "drone_cityscape",
        "prompt": (
            "Aerial drone shot flying over a futuristic city at night. "
            "Neon lights reflecting off glass skyscrapers. "
            "Smooth forward camera movement, cyberpunk aesthetic, "
            "rain-slicked streets visible below, volumetric fog."
        ),
        "aspect_ratio": "16:9",   # Landscape — great for YouTube
        "description": "Cinematic landscape shot"
    },
    {
        "name": "coffee_vertical",
        "prompt": (
            "Close-up of espresso being poured into a white ceramic cup. "
            "Steam rising in soft swirls. Shallow depth of field, "
            "warm cafe lighting, the camera slowly pulls back to reveal "
            "a cozy coffee shop interior. Aesthetic, Instagram style."
        ),
        "aspect_ratio": "9:16",   # Vertical — perfect for Reels/TikTok
        "description": "Vertical format for social media"
    },
    {
        "name": "nature_square",
        "prompt": (
            "Time-lapse of a flower blooming in a garden. "
            "The petals unfold slowly and gracefully. "
            "Soft natural light, macro photography style, "
            "bokeh background with green foliage."
        ),
        "aspect_ratio": "1:1",    # Square — ideal for Instagram posts
        "description": "Square format for Instagram feed"
    }
]

# Generate each video
for req in video_requests:
    print(f"\n--- Generating: {req['description']} ---")
    print(f"Prompt: {req['prompt'][:80]}...")
    print(f"Aspect ratio: {req['aspect_ratio']}")

    # Submit the generation request with configuration
    operation = model.generate_video(
        prompt=req["prompt"],
        config={
            "aspect_ratio": req["aspect_ratio"],
            "number_of_videos": 1,         # Generate 1 variation
            "duration_seconds": 8,         # Maximum duration
            "enhance_prompt": True,        # Let the model refine your prompt
        }
    )

    # Wait for completion
    while not operation.done:
        time.sleep(10)

    result = operation.result()
    video = result.videos[0]

    # Save to file
    filename = f"{req['name']}.mp4"
    with open(filename, "wb") as f:
        f.write(video.video_bytes)

    print(f"Saved: {filename}")

    # If enhance_prompt was used, show what the model actually used
    if hasattr(result, 'enhanced_prompt'):
        print(f"Enhanced prompt: {result.enhanced_prompt[:100]}...")

print("\nAll videos generated successfully!")
```

### Expected Output

```
--- Generating: Cinematic landscape shot ---
Prompt: Aerial drone shot flying over a futuristic city at night. Neon lights re...
Aspect ratio: 16:9
Saved: drone_cityscape.mp4

--- Generating: Vertical format for social media ---
Prompt: Close-up of espresso being poured into a white ceramic cup. Steam rising ...
Aspect ratio: 9:16
Saved: coffee_vertical.mp4

--- Generating: Square format for Instagram feed ---
Prompt: Time-lapse of a flower blooming in a garden. The petals unfold slowly and...
Aspect ratio: 1:1
Saved: nature_square.mp4

All videos generated successfully!
```

### Prompt Iteration Tips

If your first result is not what you expected, try these adjustments:

- **Too static?** Add explicit camera movement: "slow dolly forward," "orbit around the subject," "tracking shot."
- **Wrong mood?** Be more specific about lighting and color: "moody blue tones," "overexposed dreamy look," "high contrast noir."
- **Wrong framing?** Specify the shot type: "extreme close-up," "wide establishing shot," "medium shot from waist up."
- **Too chaotic?** Simplify. Remove competing elements. One clear subject with one clear action works best.

---

## ✍️ Hands-On Exercises

### Exercise 1: Write Three Video Prompts

Without running any code, practice writing video prompts. For each of the following scenarios, write a complete prompt that includes subject, action, setting, camera movement, and style:

1. A product advertisement for a pair of running shoes
2. A relaxing background video for a lo-fi music stream
3. An intro clip for a cooking YouTube channel

**Hint**: Refer to the "Anatomy of a Great Video Prompt" table above. Try to include at least 4 of the 6 components for each prompt.

### Exercise 2: Generate and Compare

Pick one of the prompts you wrote in Exercise 1. Generate it twice — once with `enhance_prompt: True` and once with `enhance_prompt: False`. Compare the results. Which version better matched what you had in mind? This exercise helps you understand when to let the model help versus when to maintain precise control.

---

## ❓ Quiz

<div id="quiz" style="background:#f9f9f9;padding:20px;border-radius:10px;max-width:700px;">

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>1. What is the maximum clip duration Veo 2 can generate through the Gemini API?</strong></p>
<label><input type="radio" name="q1" data-answer="false"> A. 30 seconds</label><br>
<label><input type="radio" name="q1" data-answer="false"> B. 60 seconds</label><br>
<label><input type="radio" name="q1" data-answer="true"> C. Approximately 8 seconds</label><br>
<label><input type="radio" name="q1" data-answer="false"> D. 2 minutes</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Veo 2 currently generates clips up to about 8 seconds. Think of each generation as one "shot" rather than a full scene.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>2. Which of the following is NOT a supported aspect ratio for Veo 2?</strong></p>
<label><input type="radio" name="q2" data-answer="false"> A. 16:9</label><br>
<label><input type="radio" name="q2" data-answer="false"> B. 9:16</label><br>
<label><input type="radio" name="q2" data-answer="true"> C. 21:9</label><br>
<label><input type="radio" name="q2" data-answer="false"> D. 1:1</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Veo 2 supports 16:9 (landscape), 9:16 (portrait), and 1:1 (square). Ultra-wide 21:9 is not currently supported.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>3. What does Veo 2 NOT include in its generated output?</strong></p>
<label><input type="radio" name="q3" data-answer="false"> A. Motion</label><br>
<label><input type="radio" name="q3" data-answer="true"> B. Audio</label><br>
<label><input type="radio" name="q3" data-answer="false"> C. Color</label><br>
<label><input type="radio" name="q3" data-answer="false"> D. Camera movement</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Veo 2 generates silent video only. You need to add music, voiceover, or sound effects separately using other tools.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>4. Which component of a video prompt controls the virtual "cinematography"?</strong></p>
<label><input type="radio" name="q4" data-answer="false"> A. Subject</label><br>
<label><input type="radio" name="q4" data-answer="false"> B. Action</label><br>
<label><input type="radio" name="q4" data-answer="true"> C. Camera movement</label><br>
<label><input type="radio" name="q4" data-answer="false"> D. Style/Mood</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Camera movement (e.g., "tracking shot," "slow dolly forward," "orbit") controls how the virtual camera behaves, which is the essence of cinematography.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>5. What does the `enhance_prompt` parameter do?</strong></p>
<label><input type="radio" name="q5" data-answer="false"> A. Increases the video resolution to 4K</label><br>
<label><input type="radio" name="q5" data-answer="false"> B. Adds audio to the generated video</label><br>
<label><input type="radio" name="q5" data-answer="true"> C. Lets the model refine and expand your prompt for better results</label><br>
<label><input type="radio" name="q5" data-answer="false"> D. Doubles the video duration</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">When enhance_prompt is True, Veo 2 takes your original prompt and adds detail to improve the visual quality and coherence of the output.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>6. Your generated video looks too static and boring. What should you try?</strong></p>
<label><input type="radio" name="q6" data-answer="false"> A. Use a shorter prompt</label><br>
<label><input type="radio" name="q6" data-answer="true"> B. Add explicit camera movement instructions like "slow dolly forward"</label><br>
<label><input type="radio" name="q6" data-answer="false"> C. Change the aspect ratio to 1:1</label><br>
<label><input type="radio" name="q6" data-answer="false"> D. Remove the style description</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Adding explicit camera movement directions (dolly, pan, orbit, tracking) is the best way to add dynamism to a static-looking generation.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>7. Which aspect ratio would you choose for a TikTok video?</strong></p>
<label><input type="radio" name="q7" data-answer="false"> A. 16:9</label><br>
<label><input type="radio" name="q7" data-answer="true"> B. 9:16</label><br>
<label><input type="radio" name="q7" data-answer="false"> C. 1:1</label><br>
<label><input type="radio" name="q7" data-answer="false"> D. 4:3</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">TikTok uses vertical video, which is 9:16 aspect ratio. This fills the entire phone screen when held upright.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>8. What is a known limitation when generating videos of people with Veo 2?</strong></p>
<label><input type="radio" name="q8" data-answer="false"> A. It cannot generate people at all</label><br>
<label><input type="radio" name="q8" data-answer="false"> B. People always appear in black and white</label><br>
<label><input type="radio" name="q8" data-answer="true"> C. Hands and fine details like text can look unrealistic</label><br>
<label><input type="radio" name="q8" data-answer="false"> D. People can only be shown from behind</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Like image generators, Veo 2 can struggle with realistic human hands and legible text. These are common artifacts in current AI video generation.</div>
</div>

<button class="quiz-submit" onclick="
  let score = 0;
  let total = 8;
  for(let i = 1; i <= total; i++){
    const selected = document.querySelector('input[name=q'+i+']:checked');
    if(selected && selected.dataset.answer === 'true') score++;
  }
  document.querySelectorAll('.quiz-explain').forEach(el => el.style.display='block');
  document.getElementById('quiz-result').innerHTML = '<strong>Score: '+score+'/'+total+'</strong> '+(score>=6?'Great job!':'Review the sections above and try again.');
" style="background:#4285f4;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;font-size:16px;margin-top:10px;">Submit Answers</button>

<div id="quiz-result" style="margin-top:15px;font-size:18px;"></div>
</div>

---

## 🔗 Next Steps

You have learned how to generate video clips from text prompts using Veo 2. In the next module, **Module 4.2: Video Analysis with Gemini**, we will flip the process around — instead of creating videos, you will learn how to upload existing videos to Gemini and have it analyze, summarize, and extract key moments from your footage. This is incredibly powerful for anyone working with video content at scale.
