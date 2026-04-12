# Module 4.2: Video Analysis with Gemini

## 🎯 Learning Objectives

By the end of this module, you will be able to:

- Upload video files to Gemini for analysis using the File API
- Ask Gemini to summarize the content of a video in plain language
- Extract key moments and timestamps from longer videos
- Use Gemini to transcribe spoken dialogue and translate it into other languages
- Understand the supported video formats, size limits, and processing considerations

---

## 📖 Theory

### Why Video Analysis Matters

Video is everywhere — marketing clips, meeting recordings, educational lectures, surveillance footage, social media content. But video is one of the hardest media types to search, skim, or organize. You cannot Ctrl+F a video the way you can a document.

This is where Gemini's multimodal capabilities change the game. Gemini can "watch" a video and understand what is happening visually and audibly. You can then ask it questions, request summaries, pull out specific moments, or generate transcripts — all through simple text prompts.

Think of it like having an assistant who watches your videos for you and gives you a detailed report.

### How Gemini Processes Video

When you upload a video to Gemini, here is what happens behind the scenes:

1. **Upload** — The video file is sent to Google's servers via the File API. This gives you a file reference you can use in prompts.
2. **Frame sampling** — Gemini does not process every single frame. It intelligently samples frames throughout the video to understand the visual content.
3. **Audio processing** — If the video has an audio track, Gemini processes the spoken words and sounds as well.
4. **Multimodal understanding** — Gemini combines visual and audio information to build a comprehensive understanding of the video content.
5. **Query response** — When you ask a question about the video, Gemini draws on this understanding to give you an answer.

### Supported Formats and Limits

| Specification | Details |
|--------------|---------|
| **Supported formats** | MP4, MOV, AVI, MKV, WEBM, FLV, MPEG, 3GPP |
| **Maximum file size** | 2 GB |
| **Maximum duration** | ~1 hour (longer videos may be truncated) |
| **Audio support** | Yes — spoken dialogue is understood |
| **Processing time** | Varies by length; a 5-minute video typically takes 15-30 seconds to process |

### What Can You Ask About a Video?

The range of questions you can ask is remarkably broad:

- **Summarization**: "Give me a 3-sentence summary of this video."
- **Key moments**: "List the main topics discussed with their timestamps."
- **Object/scene detection**: "What objects appear in this video?"
- **Action recognition**: "What is the person doing at the 2-minute mark?"
- **Transcription**: "Transcribe all spoken dialogue."
- **Translation**: "Translate the dialogue into Spanish."
- **Sentiment**: "What is the overall mood or tone of this video?"
- **Comparison**: Upload two videos and ask "What are the differences between these?"

---

## 💻 Code Example 1: Upload and Summarize a Video

Let's start with the most common use case — uploading a video and getting a summary.

```python
# module_4_2_video_summary.py
# Upload a video to Gemini and get a comprehensive summary

import google.generativeai as genai
import time

# Configure your API key
genai.configure(api_key="YOUR_API_KEY")

# Step 1: Upload the video file using the File API
# This sends the file to Google's servers for processing
print("Uploading video file...")
video_file = genai.upload_file(
    path="my_presentation.mp4",    # Path to your local video file
    display_name="Team Presentation"
)

print(f"Upload complete. File URI: {video_file.uri}")
print(f"File name: {video_file.name}")

# Step 2: Wait for the file to be processed
# Gemini needs time to analyze the video frames and audio
print("Waiting for video processing...")
while video_file.state.name == "PROCESSING":
    time.sleep(5)
    video_file = genai.get_file(video_file.name)  # Refresh status
    print(f"  Status: {video_file.state.name}")

if video_file.state.name == "FAILED":
    print("Video processing failed. Check the file format and try again.")
    exit()

print("Video is ready for analysis!\n")

# Step 3: Use Gemini to analyze the video
model = genai.GenerativeModel("gemini-2.0-flash")

# Ask for a structured summary
response = model.generate_content([
    video_file,    # Pass the uploaded file reference
    """Please analyze this video and provide:

    1. **Overview**: A 2-3 sentence summary of what the video is about.
    2. **Key Topics**: List the main topics or sections covered.
    3. **Key Takeaways**: What are the 3 most important points?
    4. **Speakers**: Describe who appears in the video (if applicable).
    5. **Tone**: Is it formal, casual, educational, entertaining?
    """
])

print("=== VIDEO ANALYSIS ===")
print(response.text)

# Clean up: delete the uploaded file when done (optional)
genai.delete_file(video_file.name)
print("\nUploaded file deleted from server.")
```

### Expected Output

```
Uploading video file...
Upload complete. File URI: https://generativelanguage.googleapis.com/v1/files/abc123
File name: files/abc123

Waiting for video processing...
  Status: PROCESSING
  Status: PROCESSING
  Status: ACTIVE
Video is ready for analysis!

=== VIDEO ANALYSIS ===
1. **Overview**: This is a 12-minute team presentation about the Q1 marketing
   strategy. The presenter walks through campaign performance data and outlines
   plans for the upcoming quarter.

2. **Key Topics**:
   - Q1 campaign results and ROI metrics
   - Social media engagement analysis
   - Proposed Q2 budget allocation
   - New partnership opportunities

3. **Key Takeaways**:
   - Instagram campaigns outperformed all other channels by 40%
   - The team recommends doubling the video content budget
   - Three new brand partnerships are in negotiation

4. **Speakers**: One primary speaker (woman in business attire) presenting
   slides, with occasional questions from off-camera team members.

5. **Tone**: Professional and data-driven, with a collaborative discussion style.

Uploaded file deleted from server.
```

---

## 💻 Code Example 2: Key Moments, Transcription, and Translation

Now let's extract timestamps, transcribe dialogue, and translate content — all from a single video.

```python
# module_4_2_advanced_analysis.py
# Extract key moments, transcribe, and translate video content

import google.generativeai as genai
import time
import json

genai.configure(api_key="YOUR_API_KEY")

# Upload the video
print("Uploading video...")
video_file = genai.upload_file(
    path="cooking_tutorial.mp4",
    display_name="Pasta Recipe Tutorial"
)

# Wait for processing
while video_file.state.name == "PROCESSING":
    time.sleep(5)
    video_file = genai.get_file(video_file.name)

print("Video ready!\n")

model = genai.GenerativeModel("gemini-2.0-flash")

# --- Task 1: Extract Key Moments with Timestamps ---
print("=" * 50)
print("TASK 1: KEY MOMENTS")
print("=" * 50)

moments_response = model.generate_content([
    video_file,
    """Identify the key moments in this video. For each moment, provide:
    - Approximate timestamp (MM:SS format)
    - A short title (5-8 words)
    - A one-sentence description

    Format as a numbered list. These should work as chapter markers
    for someone who wants to skip to a specific section."""
])

print(moments_response.text)

# --- Task 2: Full Transcription ---
print("\n" + "=" * 50)
print("TASK 2: TRANSCRIPTION")
print("=" * 50)

transcript_response = model.generate_content([
    video_file,
    """Transcribe all spoken dialogue in this video.
    Format it with timestamps at the start of each new paragraph
    or when the speaker changes. Use this format:

    [MM:SS] Speaker: "Dialogue..."

    Include all spoken words, filler words can be omitted for clarity."""
])

print(transcript_response.text)

# Save the transcript to a file for later use
with open("transcript.txt", "w", encoding="utf-8") as f:
    f.write(transcript_response.text)
print("\nTranscript saved to transcript.txt")

# --- Task 3: Translation ---
print("\n" + "=" * 50)
print("TASK 3: TRANSLATION (English to Spanish)")
print("=" * 50)

translation_response = model.generate_content([
    video_file,
    """Transcribe and translate all spoken dialogue in this video
    into Spanish. Keep the timestamp format:

    [MM:SS] Hablante: "Translated dialogue..."

    Maintain the same meaning and tone as the original."""
])

print(translation_response.text)

# Save the translation
with open("transcript_spanish.txt", "w", encoding="utf-8") as f:
    f.write(translation_response.text)
print("\nSpanish translation saved to transcript_spanish.txt")

# --- Task 4: Visual Scene Description (for accessibility) ---
print("\n" + "=" * 50)
print("TASK 4: VISUAL DESCRIPTION (Accessibility)")
print("=" * 50)

accessibility_response = model.generate_content([
    video_file,
    """Create an audio description script for this video to make it
    accessible for visually impaired viewers. Describe:
    - What is shown on screen (ingredients, actions, settings)
    - Any text or graphics that appear
    - Important visual cues that complement the spoken content

    Format with timestamps. Keep descriptions concise but informative."""
])

print(accessibility_response.text)

# Clean up
genai.delete_file(video_file.name)
print("\nAll tasks complete. Uploaded file cleaned up.")
```

### Expected Output

```
TASK 1: KEY MOMENTS
1. [00:00] Introduction and ingredient overview — The host introduces
   today's recipe and shows all ingredients laid out on the counter.
2. [01:15] Preparing the pasta dough — Flour is mounded on the counter,
   eggs are cracked into the well, and the dough is kneaded.
3. [04:30] Making the sauce from scratch — Tomatoes, garlic, and basil
   are combined in a saucepan over medium heat.
4. [07:00] Rolling and cutting the pasta — The dough is rolled thin and
   cut into fettuccine strips using a pasta machine.
5. [09:20] Cooking and plating — Pasta is boiled, combined with sauce,
   and plated with a garnish of fresh basil.
6. [10:45] Final tasting and tips — The host tastes the dish and shares
   storage and reheating suggestions.

TASK 2: TRANSCRIPTION
[00:00] Host: "Hey everyone, welcome back to the kitchen! Today we are
making fresh pasta completely from scratch..."
...

TASK 3: TRANSLATION (English to Spanish)
[00:00] Presentador: "Hola a todos, bienvenidos de nuevo a la cocina!
Hoy vamos a hacer pasta fresca completamente desde cero..."
...
```

---

## ✍️ Hands-On Exercises

### Exercise 1: Analyze a Meeting Recording

Record a short video (2-3 minutes) of yourself talking about your plans for the week, or use any meeting recording you have. Upload it to Gemini and ask for:
- A bullet-point summary
- Action items mentioned
- The overall tone of the discussion

**Hint**: You can record yourself with your phone or webcam. Even a simple selfie video of you talking works perfectly for this exercise.

### Exercise 2: Multi-Language Transcription

Find a short video clip on your computer in any language (or record one in your native language). Upload it to Gemini and ask it to:
1. Detect what language is being spoken
2. Transcribe the dialogue in the original language
3. Translate it into English

Compare the transcription accuracy with what you know was said. How well did Gemini handle accents, background noise, or fast speech?

---

## ❓ Quiz

<div id="quiz" style="background:#f9f9f9;padding:20px;border-radius:10px;max-width:700px;">

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>1. What is the first step before you can analyze a video with Gemini?</strong></p>
<label><input type="radio" name="q1" data-answer="false"> A. Convert the video to GIF format</label><br>
<label><input type="radio" name="q1" data-answer="true"> B. Upload the video using the File API</label><br>
<label><input type="radio" name="q1" data-answer="false"> C. Extract the audio track separately</label><br>
<label><input type="radio" name="q1" data-answer="false"> D. Compress the video to under 10 MB</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">You must upload the video file to Google's servers via the File API. This gives you a file reference that you can then include in your prompts to Gemini.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>2. What is the maximum file size for video uploads to Gemini?</strong></p>
<label><input type="radio" name="q2" data-answer="false"> A. 500 MB</label><br>
<label><input type="radio" name="q2" data-answer="true"> B. 2 GB</label><br>
<label><input type="radio" name="q2" data-answer="false"> C. 100 MB</label><br>
<label><input type="radio" name="q2" data-answer="false"> D. 5 GB</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">The Gemini File API supports video uploads up to 2 GB. For very large files, consider trimming or compressing before upload.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>3. How does Gemini handle the visual content of a video?</strong></p>
<label><input type="radio" name="q3" data-answer="false"> A. It processes every single frame at full resolution</label><br>
<label><input type="radio" name="q3" data-answer="true"> B. It intelligently samples frames throughout the video</label><br>
<label><input type="radio" name="q3" data-answer="false"> C. It only reads the audio and ignores the visuals</label><br>
<label><input type="radio" name="q3" data-answer="false"> D. It converts the video to a series of screenshots first</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Gemini samples frames at intervals throughout the video rather than processing every frame. This is efficient while still capturing the visual content comprehensively.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>4. What does a file state of "PROCESSING" mean?</strong></p>
<label><input type="radio" name="q4" data-answer="false"> A. The file upload failed</label><br>
<label><input type="radio" name="q4" data-answer="false"> B. The file is being downloaded to your computer</label><br>
<label><input type="radio" name="q4" data-answer="true"> C. Gemini is still analyzing the video and it is not ready for queries yet</label><br>
<label><input type="radio" name="q4" data-answer="false"> D. The video format is not supported</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">PROCESSING means Gemini is still analyzing the video content. You need to wait until the state changes to ACTIVE before you can ask questions about the video.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>5. Which of these is something Gemini CANNOT do with a video?</strong></p>
<label><input type="radio" name="q5" data-answer="false"> A. Summarize the content</label><br>
<label><input type="radio" name="q5" data-answer="false"> B. Transcribe spoken dialogue</label><br>
<label><input type="radio" name="q5" data-answer="true"> C. Edit or modify the original video file</label><br>
<label><input type="radio" name="q5" data-answer="false"> D. Identify objects in the scene</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Gemini can analyze and describe video content, but it cannot edit, trim, or modify the video file itself. For editing, you would need video editing software.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>6. You upload a video in Japanese and want an English transcript. What should you ask Gemini?</strong></p>
<label><input type="radio" name="q6" data-answer="false"> A. You cannot — Gemini only works with English audio</label><br>
<label><input type="radio" name="q6" data-answer="false"> B. Upload the audio separately and use Google Translate</label><br>
<label><input type="radio" name="q6" data-answer="true"> C. Ask Gemini to transcribe and translate the dialogue into English in one prompt</label><br>
<label><input type="radio" name="q6" data-answer="false"> D. Convert the video to English first using another tool</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Gemini is multilingual and can transcribe audio in one language and translate it to another in a single request. No extra tools needed.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>7. Why should you call `genai.delete_file()` after you are done with a video?</strong></p>
<label><input type="radio" name="q7" data-answer="false"> A. It is required or the analysis will not complete</label><br>
<label><input type="radio" name="q7" data-answer="true"> B. To clean up server storage and follow good resource management practices</label><br>
<label><input type="radio" name="q7" data-answer="false"> C. To receive the final analysis results</label><br>
<label><input type="radio" name="q7" data-answer="false"> D. Gemini will charge you per hour the file is stored</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Deleting the file after use is good practice for resource management. Uploaded files do expire automatically, but explicit cleanup is a professional habit.</div>
</div>

<div class="quiz-question" style="margin-bottom:15px;">
<p><strong>8. What is a practical use case for the "key moments with timestamps" feature?</strong></p>
<label><input type="radio" name="q8" data-answer="false"> A. Making the video play faster</label><br>
<label><input type="radio" name="q8" data-answer="false"> B. Adding special effects to the video</label><br>
<label><input type="radio" name="q8" data-answer="true"> C. Automatically creating chapter markers for a YouTube video</label><br>
<label><input type="radio" name="q8" data-answer="false"> D. Compressing the video file size</label>
<div class="quiz-explain" style="display:none;margin-top:5px;color:#555;">Extracting key moments with timestamps is perfect for generating YouTube chapter markers, meeting notes with jump-to points, or a table of contents for long educational videos.</div>
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

Now that you can analyze any video with Gemini, the next module takes this to a very practical place. In **Module 4.3: YouTube Integration**, you will learn how to combine video analysis with YouTube-specific workflows — automatically generating chapter markers, optimized descriptions, SEO tags, and even thumbnail concepts for your YouTube content.
