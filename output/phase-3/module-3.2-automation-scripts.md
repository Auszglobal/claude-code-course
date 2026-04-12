# Module 3.2: Introduction to Automation Scripts

## 🎯 Learning Objectives
- After completing this lesson, you will be able to:
  - Understand what a script is and why automation matters
  - Ask Claude Code to write simple Python scripts for you
  - Run scripts through Claude Code and observe the results
  - Build a script that automatically organizes files
  - Build a script that automatically renames photos

## 📖 Theory

### What Is a Script?

A script is like a **recipe**.

Imagine you make the same breakfast every morning: fry an egg, toast some bread, pour a coffee. If you write down the steps as a recipe, anyone can follow it and make the same breakfast.

A script is a "recipe" written for computers — a series of instructions executed in order. You write it once, and the computer can repeat it endlessly without making mistakes or cutting corners.

### Why Automate?

| Doing It Manually | Automating with a Script |
|--------|-------------|
| Renaming 100 photos one by one | Rename them all with a single command |
| Manually organizing your downloads folder every day | A script automatically sorts all new files |
| Copying and pasting data one by one | A script reads and processes data automatically |
| Spending 30 minutes on repetitive work | Running the script takes 1 second |

**Key concept**: You don't need to write the script yourself! You just need to tell Claude Code what you want to automate, and it will write the script for you.

### What Is Python?

Python is a programming language that is especially well-suited for writing automation scripts because:
- Its syntax is simple and close to English
- It has a huge library of ready-made tools
- It can run on almost any computer

You don't need to learn Python to use it — Claude Code will write it for you. You just need to tell it what you want to do.

### Confirm Python Is Installed

Before getting started, confirm that Python is installed on your computer:

**Windows (Git Bash):**
```bash
python --version
```

**Mac/Linux:**
```bash
python3 --version
```

📸 [What you should see]
```
┌─────────────────────────────┐
│ Python 3.11.5               │
└─────────────────────────────┘
```

If you see a version number (3.8 or above is fine), you're all set. If not, refer to the installation guide on the Python website (python.org).

## 💻 Code Example 1: Automatically Organize a Downloads Folder

Let's ask Claude Code to write a script that automatically sorts files into different folders by type.

First, set up the practice environment:

```bash
# Create a practice directory with simulated files
mkdir -p ~/claude-practice/auto-organizer/downloads
cd ~/claude-practice/auto-organizer/downloads

# Create various test files
touch report.pdf budget.xlsx presentation.pptx
touch vacation.jpg selfie.png screenshot.bmp
touch song.mp3 podcast.wav
touch video.mp4 clip.mov
touch notes.txt readme.md data.csv
touch archive.zip backup.tar.gz
```

Start Claude Code:

```bash
cd ~/claude-practice/auto-organizer
claude
```

Tell Claude Code:

```
Please write a Python script called organize.py that automatically organizes files in the downloads/ folder.

Rules:
- Images (.jpg, .png, .bmp, .gif) go to downloads/Images/
- Documents (.pdf, .docx, .xlsx, .pptx, .txt, .md, .csv) go to downloads/Documents/
- Music (.mp3, .wav, .flac) go to downloads/Music/
- Videos (.mp4, .mov, .avi) go to downloads/Videos/
- Archives (.zip, .tar.gz, .rar) go to downloads/Archives/
- Everything else goes to downloads/Other/

The script should:
1. Automatically create subfolders if they don't exist
2. Show where each file is being moved
3. Display a summary at the end
```

Claude Code will generate a script similar to this:

```python
# organize.py — Automatically organize a downloads folder
import os       # OS functions (handling files and folders)
import shutil   # File moving functions

# Define file classification rules (like a lookup table)
FILE_CATEGORIES = {
    'Images': ['.jpg', '.jpeg', '.png', '.bmp', '.gif'],
    'Documents': ['.pdf', '.docx', '.xlsx', '.pptx', '.txt', '.md', '.csv'],
    'Music': ['.mp3', '.wav', '.flac'],
    'Videos': ['.mp4', '.mov', '.avi'],
    'Archives': ['.zip', '.tar.gz', '.rar'],
}

def organize_folder(folder_path):
    """Organize all files in the specified folder"""
    moved_count = {}  # Track how many files moved per category

    # Loop through every file in the folder
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        # Skip folders, only process files
        if os.path.isdir(file_path):
            continue

        # Get the file extension (e.g., .pdf)
        _, ext = os.path.splitext(filename)
        ext = ext.lower()  # Normalize to lowercase

        # Determine which category this file belongs to
        category = 'Other'  # Default category
        for cat_name, extensions in FILE_CATEGORIES.items():
            if ext in extensions:
                category = cat_name
                break

        # Create the destination folder if it doesn't exist
        dest_folder = os.path.join(folder_path, category)
        os.makedirs(dest_folder, exist_ok=True)

        # Move the file
        dest_path = os.path.join(dest_folder, filename)
        shutil.move(file_path, dest_path)
        print(f"  {filename} -> {category}/")

        # Update the count
        moved_count[category] = moved_count.get(category, 0) + 1

    # Display a summary
    print("\n--- Organization Complete ---")
    total = 0
    for category, count in sorted(moved_count.items()):
        print(f"  {category}: {count} files")
        total += count
    print(f"  Total: {total} files organized")

# Run the organizer
if __name__ == '__main__':
    downloads_path = os.path.join(os.path.dirname(__file__), 'downloads')
    print(f"Organizing: {downloads_path}\n")
    organize_folder(downloads_path)
```

### Expected Output:

Ask Claude Code to run the script:

```
Please run organize.py
```

📸 [What you should see]
```
┌──────────────────────────────────────┐
│ Organizing: /home/user/.../downloads │
│                                      │
│   report.pdf -> Documents/           │
│   budget.xlsx -> Documents/          │
│   presentation.pptx -> Documents/    │
│   vacation.jpg -> Images/            │
│   selfie.png -> Images/              │
│   screenshot.bmp -> Images/          │
│   song.mp3 -> Music/                 │
│   podcast.wav -> Music/              │
│   video.mp4 -> Videos/               │
│   clip.mov -> Videos/                │
│   notes.txt -> Documents/            │
│   readme.md -> Documents/            │
│   data.csv -> Documents/             │
│   archive.zip -> Archives/           │
│   backup.tar.gz -> Other/            │
│                                      │
│ --- Organization Complete ---        │
│   Archives: 1 files                  │
│   Documents: 6 files                 │
│   Images: 3 files                    │
│   Music: 2 files                     │
│   Other: 1 files                     │
│   Videos: 2 files                    │
│   Total: 15 files organized          │
└──────────────────────────────────────┘
```

## 💻 Code Example 2: Automatically Rename Photos by Date

Many people have photos with meaningless names like `IMG_0001.jpg` or `DSC_1234.jpg`. Let's write a script to rename photos based on their modification date.

Set up the practice environment:

```bash
mkdir -p ~/claude-practice/photo-renamer/photos
cd ~/claude-practice/photo-renamer
```

Start Claude Code:

```bash
cd ~/claude-practice/photo-renamer
claude
```

Tell Claude Code:

```
Please write a Python script called rename_photos.py that renames images in the photos/ folder
based on each file's last modified date.

Naming format: YYYY-MM-DD_001.jpg, YYYY-MM-DD_002.jpg

For example, the first photo from March 15, 2024 would be named 2024-03-15_001.jpg

Requirements:
1. A --preview mode to preview the rename results without actually renaming
2. A --execute mode to actually perform the renames after confirmation
3. Show a clear "before -> after" comparison table
4. Also create some dummy image files for testing
```

Claude Code will generate the script and create the test files. The core logic will look roughly like this:

```python
# rename_photos.py — Rename photos by date
import os
import sys
from datetime import datetime

def get_file_date(filepath):
    """Get the last modified date of a file"""
    timestamp = os.path.getmtime(filepath)          # Get modification timestamp
    return datetime.fromtimestamp(timestamp)          # Convert to date format

def rename_photos(folder, execute=False):
    """Rename photo files"""
    # Supported image formats
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.gif'}

    # Collect all image files
    photos = []
    for filename in sorted(os.listdir(folder)):
        _, ext = os.path.splitext(filename)
        if ext.lower() in image_extensions:
            filepath = os.path.join(folder, filename)
            photos.append((filename, filepath, get_file_date(filepath)))

    # Sort by date
    photos.sort(key=lambda x: x[2])

    # Generate new names
    date_counter = {}  # Counter for each date
    renames = []

    for old_name, filepath, file_date in photos:
        date_str = file_date.strftime('%Y-%m-%d')    # Format the date
        _, ext = os.path.splitext(old_name)

        # Calculate the sequence number for this date
        date_counter[date_str] = date_counter.get(date_str, 0) + 1
        seq = date_counter[date_str]

        new_name = f"{date_str}_{seq:03d}{ext.lower()}"  # e.g., 2024-03-15_001.jpg
        renames.append((old_name, new_name, filepath))

    # Display preview
    print("Photo Rename Preview:")
    print("-" * 50)
    for old_name, new_name, _ in renames:
        status = "[WILL EXECUTE]" if execute else "[PREVIEW]"
        print(f"  {status} {old_name} -> {new_name}")

    # If in execute mode, actually rename
    if execute:
        for old_name, new_name, filepath in renames:
            new_path = os.path.join(folder, new_name)
            os.rename(filepath, new_path)
        print(f"\nSuccessfully renamed {len(renames)} photos!")
    else:
        print(f"\nPreview mode: {len(renames)} photos pending rename")
        print("Once confirmed, add the --execute flag to perform the rename")

if __name__ == '__main__':
    photos_folder = os.path.join(os.path.dirname(__file__), 'photos')
    execute_mode = '--execute' in sys.argv
    rename_photos(photos_folder, execute=execute_mode)
```

### Expected Output:

Preview first:
```
Please run python rename_photos.py --preview
```

📸 [What you should see]
```
┌─────────────────────────────────────────────────┐
│ Photo Rename Preview:                            │
│ ──────────────────────────────────────────        │
│   [PREVIEW] IMG_0001.jpg -> 2026-04-11_001.jpg   │
│   [PREVIEW] DSC_1234.jpg -> 2026-04-11_002.jpg   │
│   [PREVIEW] photo.png -> 2026-04-11_003.png      │
│                                                   │
│ Preview mode: 3 photos pending rename             │
│ Once confirmed, add the --execute flag to         │
│ perform the rename                                │
└─────────────────────────────────────────────────┘
```

## 📖 Different Ways to Run a Script

There are several ways to run a script:

### Method 1: Ask Claude Code to Run It
```
Please run organize.py
```
Claude Code will execute the script in the terminal and you can see the output in real time.

### Method 2: Run It Yourself in the Terminal

**Windows (Git Bash):**
```bash
python organize.py
```

**Mac/Linux:**
```bash
python3 organize.py
```

### Method 3: Ask Claude Code to Fix and Rerun
```
Run organize.py, and if there are any errors, automatically fix them and rerun
```
This is the most hands-off approach — if the script has any issues, Claude Code will automatically fix them for you.

## ✍️ Hands-on Exercises

### Exercise 1: Build a Word Count Script

Ask Claude Code to write a script that:
- Reads a `.txt` file
- Counts: total words, total lines, and how many words are in the longest line
- Displays the results

After starting Claude Code, say:

```
Please write a Python script called word_counter.py that reads a text file,
then displays the total word count, total line count, and the word count of
the longest line. Also create a sample.txt file for testing.
```

**Tip**: If the script throws an error, don't panic! Just paste the error message to Claude Code and it will fix it for you.

### Exercise 2: Batch Create Folders

Ask Claude Code to write a script that batch-creates folders for all 12 months of the year:
```
2026-01-January/
2026-02-February/
2026-03-March/
...
2026-12-December/
```

Tell Claude Code:
```
Please write a script called create_monthly_folders.py that creates
folders for January through December 2026 in the current directory,
using the format YYYY-MM-MonthName.
```

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="1">
<p>1. What is the best analogy for a script?</p>
<label><input type="radio" name="q1" value="0"> A novel</label>
<label><input type="radio" name="q1" value="1"> A recipe — a set of instructions executed step by step</label>
<label><input type="radio" name="q1" value="2"> A photograph</label>
<label><input type="radio" name="q1" value="3"> A folder</label>
<div class="quiz-explain">A script is like a recipe — a series of ordered instructions. You write it once, and the computer can execute it repeatedly.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>2. When using Claude Code to write automation scripts, do you need to learn Python first?</p>
<label><input type="radio" name="q2" value="0"> Yes, you must master Python before starting</label>
<label><input type="radio" name="q2" value="1"> No, you just need to describe what you want in natural language</label>
<label><input type="radio" name="q2" value="2"> You need at least three years of programming experience</label>
<label><input type="radio" name="q2" value="3"> Only Mac users can use Python</label>
<div class="quiz-explain">This is the power of Claude Code. You just need to describe the task you want to automate in plain English, and Claude Code will generate the script. You can learn gradually as you go.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. Why should the photo renaming script have a "preview mode"?</p>
<label><input type="radio" name="q3" value="0"> Because computers run too fast</label>
<label><input type="radio" name="q3" value="1"> Because preview mode lets you verify the results are correct before executing, avoiding mistakes</label>
<label><input type="radio" name="q3" value="2"> Because Python requires a preview</label>
<label><input type="radio" name="q3" value="3"> Because image files are large</label>
<div class="quiz-explain">Preview mode is an important safety measure. Reviewing the results before executing a batch operation helps you avoid unexpected errors. This is a great programming habit.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>4. You want to automatically sort 200 downloaded files by type every day. What is the best approach?</p>
<label><input type="radio" name="q4" value="0"> Sort them manually every day — it only takes an hour</label>
<label><input type="radio" name="q4" value="1"> Delete all the files and re-download them into the right folders</label>
<label><input type="radio" name="q4" value="2"> Ask Claude Code to write a script that automatically classifies files by extension, then run it whenever needed</label>
<label><input type="radio" name="q4" value="3"> Hire someone to organise them for you</label>
<div class="quiz-explain">This is exactly the kind of repetitive task that automation scripts are designed for. A script that sorts files by extension can be written once and run thousands of times. What takes an hour manually takes only a second with a script.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. What does the Python module <code>shutil</code> help with in the file organiser script?</p>
<label><input type="radio" name="q5" value="0"> Moving files from one location to another</label>
<label><input type="radio" name="q5" value="1"> Connecting to the internet</label>
<label><input type="radio" name="q5" value="2"> Displaying images</label>
<label><input type="radio" name="q5" value="3"> Running other scripts</label>
<div class="quiz-explain"><code>shutil</code> (short for "shell utilities") provides functions for high-level file operations like moving, copying, and deleting files. In the organiser script, <code>shutil.move()</code> is used to move each file into its correct category folder.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>6. A script encounters an error when it runs. What is the easiest way to fix it using Claude Code?</p>
<label><input type="radio" name="q6" value="0"> Rewrite the entire script from scratch</label>
<label><input type="radio" name="q6" value="1"> Copy the error message and paste it to Claude Code — ask it to fix the problem and rerun</label>
<label><input type="radio" name="q6" value="2"> Delete Python and reinstall</label>
<label><input type="radio" name="q6" value="3"> Ignore the error and hope it goes away</label>
<div class="quiz-explain">The easiest approach is to share the error message with Claude Code. You can even say "Run the script, and if there are errors, automatically fix them and rerun." Claude Code will read the error, understand the problem, fix the code, and try again.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>7. In the photo renaming script, what does <code>{seq:03d}</code> mean in <code>f"{date_str}_{seq:03d}"</code>?</p>
<label><input type="radio" name="q7" value="0"> The sequence number is always 3</label>
<label><input type="radio" name="q7" value="1"> The file name has 3 characters</label>
<label><input type="radio" name="q7" value="2"> The date has 3 parts</label>
<label><input type="radio" name="q7" value="3"> The sequence number is zero-padded to 3 digits (e.g., 001, 002, 010)</label>
<div class="quiz-explain"><code>:03d</code> is a formatting instruction that pads the number with zeros to fill 3 digits. So 1 becomes 001, 10 becomes 010, and 100 stays as 100. This ensures files sort correctly in alphabetical order.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. What is the main advantage of asking Claude Code to write a script instead of performing the task manually?</p>
<label><input type="radio" name="q8" value="0"> The script can be reused unlimited times, saving you from repeating the same work</label>
<label><input type="radio" name="q8" value="1"> Scripts are always faster to write than doing the task once manually</label>
<label><input type="radio" name="q8" value="2"> Scripts never have any errors</label>
<label><input type="radio" name="q8" value="3"> You need a script to use Claude Code</label>
<div class="quiz-explain">The biggest advantage of scripts is reusability. You invest time once to create the script, and then it can run the same task reliably and consistently forever. For tasks you do repeatedly — like organising downloads or renaming photos — this saves enormous amounts of time.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

In the next module, **3.3: Debugging and Fixing Errors**, you'll learn how to handle situations when your program encounters errors. Don't worry — errors are completely normal! The important thing is knowing how to share the error message with Claude Code so it can quickly find and fix the problem.
