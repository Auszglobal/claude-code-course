# Module 2.3: Searching and Navigating the Codebase -- Finding What You Need in a Sea of Files

## Learning Objectives
- After completing this lesson, you will be able to:
  - Use filename search (Glob) to find specific types of files
  - Use content search (Grep) to find specific text within files
  - Understand why search skills are so important in real projects
  - Combine "search + read" workflows
  - Have Claude Code quickly locate information in large projects

## Theory

### Why Do You Need Search?

Imagine you've moved into a huge house with 200 rooms. You know your passport is "in a drawer in some room," but you can't remember exactly where.

You have two options:
1. **Search room by room** -- could take hours
2. **Ask the butler on the intercom** -- the butler knows where everything is and can tell you in seconds

Claude Code is your "butler." Real projects can have hundreds or even thousands of files, making manual searching nearly impossible. But Claude Code can find anything for you in an instant.

### Two Types of Search

| Search Method | Tool Name | Search Target | Analogy |
|---------------|-----------|---------------|---------|
| Search by filename | **Glob** | File names and locations | Looking up a book in the library catalogue |
| Search by content | **Grep** | Text inside files | Searching for a keyword across all the books' contents |

### Glob -- Search by Filename

Glob uses "wildcard patterns" to match filenames. This sounds technical, but it's actually very simple:

| Pattern | Meaning | Example |
|---------|---------|---------|
| `*` | Any characters (anything) | `*.txt` = all .txt files |
| `**` | Any level of subfolders | `**/*.txt` = .txt files in all folders |
| `?` | Any single character | `file?.txt` = file1.txt, fileA.txt |

Think of `*` as a "wildcard." `*.txt` means "the name can be anything, as long as it ends with .txt."

### Grep -- Search by Content

Grep searches for specific text inside all files.

Analogy: you're searching an entire bookshelf for the word "Claude." Grep will tell you:

- "Found it on line 15 of chapter1.txt"
- "Found it on line 3 of notes.txt"
- "Found it on line 42 of readme.md"

You don't need to flip through page by page -- Grep does it instantly.

## Code Example 1: Building Practice Files

To practise the search feature, let's first create a project with multiple files. After launching Claude Code, type:

```
Please create the following file structure in the current folder (a simulated recipe website project):

recipes/
├── breakfast/
│   ├── pancakes.txt        (content: Pancake recipe, ingredients include eggs, flour, milk)
│   ├── omelette.txt        (content: Omelette recipe, ingredients include eggs, cheese, mushrooms)
│   └── smoothie.txt        (content: Fruit smoothie recipe, ingredients include banana, milk, honey)
├── lunch/
│   ├── sandwich.txt        (content: Sandwich recipe, ingredients include bread, ham, cheese)
│   └── salad.txt           (content: Salad recipe, ingredients include lettuce, tomato, olive oil)
├── dinner/
│   ├── pasta.txt           (content: Pasta recipe, ingredients include noodles, tomato sauce, garlic)
│   └── stir-fry.txt        (content: Fried rice recipe, ingredients include rice, eggs, soy sauce)
└── README.md               (content: Recipe collection description)
```

### Expected Output:

Claude Code will create these folders and files one by one. When finished, your project will have a complete recipe file structure.

[What you should see]
```
+----------------------------------------------+
| Claude Code                                  |
|                                              |
| Created directory: recipes/breakfast/        |
| Created directory: recipes/lunch/            |
| Created directory: recipes/dinner/           |
| Created file: recipes/breakfast/pancakes.txt |
| Created file: recipes/breakfast/omelette.txt |
| ... (other files)                            |
|                                              |
| Created 3 directories and 8 files in total.  |
+----------------------------------------------+
```

### Searching by Filename (Glob)

Now let's do some searching! Type:

```
Please find all .txt files in the recipes folder
```

### Expected Output:

Claude Code will list all matching files:

```
Found 7 .txt files:
- recipes/breakfast/pancakes.txt
- recipes/breakfast/omelette.txt
- recipes/breakfast/smoothie.txt
- recipes/lunch/sandwich.txt
- recipes/lunch/salad.txt
- recipes/dinner/pasta.txt
- recipes/dinner/stir-fry.txt
```

You can also search more precisely:

```
Please find all files in the breakfast folder
```

This time it will only show the 3 files in the breakfast folder.

## Code Example 2: Content Search + Combined Workflows

### Searching by Content (Grep)

Now let's search inside the files. Type:

```
Please search the recipes folder for all recipes that contain "eggs"
```

### Expected Output:

```
Found "eggs" in the following files:
- recipes/breakfast/pancakes.txt (line X)
- recipes/breakfast/omelette.txt (line X)
- recipes/dinner/stir-fry.txt   (line X)
```

Claude Code not only tells you which files contain "eggs," but also which line it appears on.

### Combining Search + Read Workflows

Searching is just the first step. After finding the files, you'll usually want to see their actual contents. Try:

```
Please find all recipes that contain "milk," then show me their full contents
```

### Expected Output:

Claude Code will first search, find the matching files, then automatically read and display each file's contents. This is the "search + read" combo -- very practical!

[What you should see]
```
+----------------------------------------------+
| Search results: found 2 files containing     |
| "milk"                                       |
|                                              |
| === recipes/breakfast/pancakes.txt ===       |
| Pancake Recipe                               |
| Ingredients: eggs, flour, milk, sugar,       |
| butter                                       |
| ...                                          |
|                                              |
| === recipes/breakfast/smoothie.txt ===       |
| Fruit Smoothie Recipe                        |
| Ingredients: banana, milk, honey, ice        |
| ...                                          |
+----------------------------------------------+
```

### More Advanced Searches

You can even describe more complex search needs in natural language:

```
Please find all recipes that don't require cooking (cold dishes)
```

Claude Code will search through all recipe files, analyse the contents, and tell you which ones are cold dishes (such as salad and smoothie).

This is the power of Claude Code -- it doesn't just perform mechanical searches, it can **understand** your question.

## Hands-On Practice

### Exercise 1: Search Challenge

Using the recipe project created above, ask Claude Code to help you with the following searches:

1. Find all recipes that contain "cheese"
2. Find all filenames in the dinner folder
3. Find which recipe mentions "tomato"

> Tip: You can describe what you're looking for in natural language. For example: "Which recipes use cheese?" Claude Code will automatically choose the appropriate search method.

### Exercise 2: Search + Edit Workflow

Complete the following steps:

1. Search for all recipes that contain "eggs"
2. Pick one and ask Claude Code to read the full contents
3. Ask Claude Code to modify that recipe by adding cooking time and step-by-step instructions

This exercise simulates a real workflow: find a file first, read it, then modify it.

> Tip: You can do it step by step, or tell Claude Code all three steps at once. For example: "Find the recipes that use eggs, read the contents of pancakes.txt, then add cooking steps for me."

## Quiz (3 Questions)

1. If you want to find all `.txt` files in a project, which search method should you use?
   A. Grep -- because you need to search file contents
   B. Glob -- because you need to search by filename pattern
   C. Read -- because you need to read the files
   D. Edit -- because you need to edit the files

   Answer: B -- Glob is used for searching by filename pattern. `*.txt` is a Glob pattern meaning "all files ending in .txt." Grep is for searching inside file contents, not filenames.

2. What does `**` mean in a Glob pattern?
   A. Search twice
   B. Only search the current directory
   C. Match any level of subfolders
   D. Search hidden files

   Answer: C -- `**` is a special wildcard that represents "any level of subfolders." For example, `**/*.txt` will search for .txt files in the current folder and all subfolders, sub-subfolders, no matter how deeply nested they are.

3. When you tell Claude Code "Find all files that contain the word 'password'," what tool will it use?
   A. Glob -- because it's searching files
   B. Read -- because it needs to read the contents
   C. Grep -- because it's searching for specific text within file contents
   D. Write -- because it needs to write the search results

   Answer: C -- When you want to search for specific text within file **contents**, Claude Code uses Grep. Glob can only search by filename (e.g., all .txt files) but can't search what's written inside files. Grep goes through every line of every file and finds where your specified text appears.

## Next Steps

You've now mastered the skill of quickly finding anything in a project! Search + read + edit -- these three skills combined form the core of Claude Code's everyday workflow.

In the next module, **2.4: Git Basics and Version Control**, we'll learn how to use Git to save your work progress. Think of Git as the "save game" feature -- you can go back to any previous version at any time. Never worry about breaking things again!
