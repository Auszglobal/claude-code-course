# Module 9.3: Database Operations

## 🎯 Learning Objectives
- After completing this lesson you will be able to:
  - Create and query SQLite databases using Claude Code
  - Connect to PostgreSQL databases for production work
  - Understand database migrations and version control
  - Apply safety practices when working with production data
  - Use Claude Code to generate schemas, queries, and seed data

## 📖 Theory

### Why Databases Matter

Almost every real application needs a database. A to-do app stores tasks. An e-commerce site stores products and orders. A booking system stores reservations and customer details.

Think of a database as a **digital filing cabinet** with strict organisation:
- Each **table** is a drawer (e.g., "users", "orders", "products")
- Each **row** is a file folder in that drawer (one user, one order)
- Each **column** is a label on the folder (name, email, date)

### Two Types of Databases

| | SQLite | PostgreSQL |
|---|---|---|
| **What it is** | A single file on your computer | A server running separately |
| **Setup** | Zero — just create a .db file | Install and configure a server |
| **Best for** | Small apps, prototypes, scripts | Production web apps, team projects |
| **Concurrency** | Limited (one writer at a time) | Excellent (many simultaneous users) |
| **Analogy** | A notebook on your desk | A library with a librarian |

### How Claude Code Helps with Databases

Claude Code can handle the entire database workflow:

```
Design Schema → Create Tables → Write Queries → Generate Seed Data → Debug Issues
```

You describe what you need in plain English, and Claude writes the SQL or ORM code.

## 💻 Code Example 1: SQLite with Claude Code

### Creating a database:

```bash
> Create a SQLite database called "tasks.db" with two tables:
  - users: id, name, email, created_at
  - tasks: id, title, description, status, user_id (foreign key), due_date
  Write a Python script to set it up.
```

[What you should see]
```
+--------------------------------------------------+
| Claude creates setup_db.py:                      |
|                                                  |
| import sqlite3                                   |
|                                                  |
| conn = sqlite3.connect('tasks.db')               |
| cursor = conn.cursor()                           |
|                                                  |
| cursor.execute('''                               |
|   CREATE TABLE IF NOT EXISTS users (             |
|     id INTEGER PRIMARY KEY AUTOINCREMENT,        |
|     name TEXT NOT NULL,                          |
|     email TEXT UNIQUE NOT NULL,                  |
|     created_at TIMESTAMP DEFAULT CURRENT_...     |
|   )                                              |
| ''')                                             |
|                                                  |
| cursor.execute('''                               |
|   CREATE TABLE IF NOT EXISTS tasks (             |
|     id INTEGER PRIMARY KEY AUTOINCREMENT,        |
|     title TEXT NOT NULL,                         |
|     description TEXT,                            |
|     status TEXT DEFAULT 'pending',               |
|     user_id INTEGER REFERENCES users(id),        |
|     due_date DATE                                |
|   )                                              |
| ''')                                             |
|                                                  |
| conn.commit()                                    |
| conn.close()                                     |
+--------------------------------------------------+
```

### Querying the database:

```bash
> Write a Python function that returns all overdue tasks 
  with the user's name and email. Join the tasks and users tables.
```

Claude writes a query with a JOIN, date comparison, and proper parameter binding.

## 💻 Code Example 2: PostgreSQL with Claude Code

### Connecting to a remote database:

```bash
> Write a Python script to connect to our PostgreSQL database at 
  db.example.com:5432, database name "myapp", using credentials 
  from environment variables. List all tables.
```

[What you should see]
```
+--------------------------------------------------+
| Claude creates db_check.py:                      |
|                                                  |
| import os                                        |
| import psycopg2                                  |
|                                                  |
| conn = psycopg2.connect(                         |
|     host=os.environ['DB_HOST'],                  |
|     port=os.environ.get('DB_PORT', 5432),        |
|     dbname=os.environ['DB_NAME'],                |
|     user=os.environ['DB_USER'],                  |
|     password=os.environ['DB_PASSWORD']            |
| )                                                |
|                                                  |
| cursor = conn.cursor()                           |
| cursor.execute("""                               |
|     SELECT table_name                            |
|     FROM information_schema.tables               |
|     WHERE table_schema = 'public'                |
| """)                                             |
|                                                  |
| for table in cursor.fetchall():                  |
|     print(table[0])                              |
|                                                  |
| conn.close()                                     |
+--------------------------------------------------+
```

### Using Django ORM:

```bash
> Show me how to query all orders from the last 30 days 
  with total revenue, grouped by product category, 
  using our Django Order model.
```

Claude uses Django's ORM with `annotate`, `aggregate`, and `values` instead of raw SQL:

```python
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta

Order.objects.filter(
    created_at__gte=timezone.now() - timedelta(days=30)
).values('product__category').annotate(
    total_revenue=Sum('amount')
).order_by('-total_revenue')
```

## 💻 Supplementary Example: Database Migrations

### What Are Migrations?

Migrations are **version control for your database schema**. Just like git tracks changes to your code, migrations track changes to your database structure.

```
Migration 001: Create users table
Migration 002: Add email column to users
Migration 003: Create orders table
Migration 004: Add index on orders.created_at
```

### Django Migrations with Claude Code:

```bash
# Ask Claude to add a field
> Add a "phone_number" field to the User model in models.py. 
  Make it optional and max 20 characters.

# After Claude edits models.py, create the migration
> Run: python manage.py makemigrations

# Apply it
> Run: python manage.py migrate
```

### Database Safety Rules

| Rule | Why |
|------|-----|
| **Always backup before destructive operations** | DROP TABLE is irreversible |
| **Never run DELETE without WHERE** | `DELETE FROM users` deletes ALL users |
| **Use transactions for multi-step operations** | If step 2 fails, step 1 rolls back |
| **Never hardcode credentials** | Use environment variables or .env files |
| **Test migrations on a copy first** | A bad migration can corrupt production data |
| **Never commit database files to git** | .db files are binary and don't diff well |

### Common Claude Code Database Prompts:

| What You Need | Prompt |
|---------------|--------|
| See the schema | "Show me the schema of tasks.db" |
| Add a column | "Add an email column to the users table in models.py and create a migration" |
| Complex query | "Query all customers who placed more than 3 orders in the last month" |
| Seed data | "Generate a Python script to create 100 realistic test users" |
| Optimise | "This query is slow — add appropriate indexes" |
| Debug | "This query returns empty results but the data exists. Help me find why" |

## ✍️ Hands-On Exercisess

### Exercise 1: Build a SQLite Database
1. Ask Claude Code to create a SQLite database for a simple blog with three tables: authors, posts, and comments
2. Ask Claude to write a seed script that creates 5 authors, 20 posts, and 50 comments
3. Ask Claude to write queries for:
   - The author with the most posts
   - All posts with more than 3 comments
   - The most recent 10 comments with post titles and author names
4. Run the scripts and verify the results

> Tip: Start simple — get the schema right before adding complex queries. It's easier to iterate on queries when you have real test data in the database.

### Exercise 2: Database Exploration
1. If you have an existing project with a database, ask Claude Code: "What tables exist in this database? Show me the schema for each."
2. Ask Claude to explain the relationships between tables
3. Ask for a complex query you've been meaning to write
4. Review the SQL Claude generates — does it use proper JOINs, indexes, and WHERE clauses?

> Tip: Claude Code is excellent at writing complex SQL queries that would take a long time to write manually. Describe what you want in plain English and let Claude handle the SQL syntax.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="0">
<p>1. What is the main difference between SQLite and PostgreSQL?</p>
<label><input type="radio" name="q1" value="0"> SQLite is a file-based database requiring no server; PostgreSQL is a server-based database for production use</label>
<label><input type="radio" name="q1" value="1"> SQLite only works on Windows; PostgreSQL only works on Linux</label>
<label><input type="radio" name="q1" value="2"> SQLite uses Python; PostgreSQL uses Java</label>
<label><input type="radio" name="q1" value="3"> SQLite is faster than PostgreSQL in all cases</label>
<div class="quiz-explain">SQLite stores data in a single file and requires no server setup, making it great for small apps and prototypes. PostgreSQL runs as a separate server, handles many concurrent users, and is the standard for production web applications.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>2. What are database migrations?</p>
<label><input type="radio" name="q2" value="0"> Moving data from one database to another</label>
<label><input type="radio" name="q2" value="1"> Backing up the database to a remote server</label>
<label><input type="radio" name="q2" value="2"> Version-controlled changes to the database schema, like git for your database structure</label>
<label><input type="radio" name="q2" value="3"> Converting SQL queries to Python code</label>
<div class="quiz-explain">Migrations track changes to your database structure over time — adding tables, adding columns, creating indexes. Like git commits for code, each migration represents a specific change that can be applied or rolled back.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>3. Why should you never hardcode database credentials in your code?</p>
<label><input type="radio" name="q3" value="0"> It makes the code run slower</label>
<label><input type="radio" name="q3" value="1"> Credentials in code can be accidentally committed to git and exposed publicly</label>
<label><input type="radio" name="q3" value="2"> Python doesn't support hardcoded database strings</label>
<label><input type="radio" name="q3" value="3"> Hardcoded credentials only work on one computer</label>
<div class="quiz-explain">Hardcoded credentials in source code are a major security risk. If the code is pushed to GitHub (even a private repo), the credentials are exposed. Always use environment variables or .env files, and never commit those to git.</div>
</div>

<div class="quiz-q" data-answer="3">
<p>4. What does the <code>REFERENCES users(id)</code> clause do when creating a tasks table?</p>
<label><input type="radio" name="q4" value="0"> It copies all data from the users table</label>
<label><input type="radio" name="q4" value="1"> It deletes the user when a task is created</label>
<label><input type="radio" name="q4" value="2"> It makes the tasks table read-only</label>
<label><input type="radio" name="q4" value="3"> It creates a foreign key relationship, ensuring each task is linked to a valid user</label>
<div class="quiz-explain">A foreign key (REFERENCES) creates a relationship between tables. It ensures that every user_id in the tasks table must match an existing id in the users table, maintaining data integrity and preventing orphaned records.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>5. Why should you use transactions for multi-step database operations?</p>
<label><input type="radio" name="q5" value="0"> If any step fails, the entire operation rolls back to its original state, preventing partial/corrupt data</label>
<label><input type="radio" name="q5" value="1"> Transactions make queries run faster</label>
<label><input type="radio" name="q5" value="2"> Transactions are required by Python</label>
<label><input type="radio" name="q5" value="3"> Transactions automatically back up the database</label>
<div class="quiz-explain">Transactions ensure atomicity — either all steps succeed or none do. Without transactions, if step 2 of 3 fails, you're left with partially applied changes that can corrupt your data.</div>
</div>

<div class="quiz-q" data-answer="2">
<p>6. You want to find all overdue tasks with their owner's name. Which SQL concept do you need?</p>
<label><input type="radio" name="q6" value="0"> INSERT — to add new records</label>
<label><input type="radio" name="q6" value="1"> DELETE — to remove old tasks</label>
<label><input type="radio" name="q6" value="2"> JOIN — to combine data from the tasks and users tables</label>
<label><input type="radio" name="q6" value="3"> CREATE TABLE — to make a new table</label>
<div class="quiz-explain">A JOIN combines rows from two or more tables based on a related column (like user_id). To get tasks with user names, you JOIN the tasks table with the users table on the user_id/id columns.</div>
</div>

<div class="quiz-q" data-answer="1">
<p>7. Why should you never commit .db files to Git?</p>
<label><input type="radio" name="q7" value="0"> Git doesn't support binary files at all</label>
<label><input type="radio" name="q7" value="1"> Database files are binary and don't diff well — they bloat the repository and can't be meaningfully reviewed</label>
<label><input type="radio" name="q7" value="2"> .db files contain viruses</label>
<label><input type="radio" name="q7" value="3"> They would overwrite other team members' local databases</label>
<div class="quiz-explain">SQLite .db files are binary, so Git can't show meaningful diffs. Every change creates a full copy in git history, quickly bloating the repository. Instead, commit the schema (migration files) and use scripts to generate test data.</div>
</div>

<div class="quiz-q" data-answer="0">
<p>8. What Django ORM method would you use to group orders by category and calculate total revenue?</p>
<label><input type="radio" name="q8" value="0"> <code>.values('category').annotate(total=Sum('amount'))</code></label>
<label><input type="radio" name="q8" value="1"> <code>.filter(category).count()</code></label>
<label><input type="radio" name="q8" value="2"> <code>.select_related('category').all()</code></label>
<label><input type="radio" name="q8" value="3"> <code>.order_by('category').first()</code></label>
<div class="quiz-explain"><code>.values('category')</code> groups by category (like SQL GROUP BY), and <code>.annotate(total=Sum('amount'))</code> calculates the sum for each group. This is the Django ORM equivalent of <code>SELECT category, SUM(amount) FROM orders GROUP BY category</code>.</div>
</div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>

## 🔗 Next Steps

Now you can work with databases confidently. In the next module, **9.4: Headless Mode & CI/CD Pipelines**, we'll learn how to run Claude Code without a human at the keyboard — perfect for automation, code review bots, and continuous integration.
