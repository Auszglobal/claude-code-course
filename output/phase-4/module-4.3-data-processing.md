# Module 4.3: Data Processing and Analysis

## 🎯 Learning Objectives
- After completing this lesson, you will be able to...
  - Understand common data file formats: CSV, JSON, Excel
  - Use Claude Code to read and parse various data files
  - Perform basic operations on data: filtering, sorting, statistics
  - Generate simple charts with Python
  - Produce a summary report from raw data

## 📖 Theory

### Common Data File Formats

You encounter data every day, you just might not realize it: bank statements, shopping lists, grade sheets — these are all data. In the digital world, data is typically stored in the following file formats:

#### CSV (Comma-Separated Values)

Think of it as an **Excel spreadsheet saved as plain text**. Each row is a record, and each field is separated by a comma.

```
Name,Age,City
Alex,25,Sydney
Sarah,30,Melbourne
Tom,28,Brisbane
```

It's like using commas instead of grid lines. CSV is the most common and universal data format — almost any software can read it.

#### JSON (JavaScript Object Notation)

We already saw JSON in Module 4.2. It's like a **form with a hierarchical structure**:

```json
[
  {"Name": "Alex", "Age": 25, "City": "Sydney"},
  {"Name": "Sarah", "Age": 30, "City": "Melbourne"}
]
```

JSON is especially good for data with nested structures (e.g., a person with multiple addresses).

#### Excel (.xlsx)

This is the familiar **Microsoft Excel spreadsheet**. It can have multiple worksheets (Sheets), formatting, formulas, and more. It's the most feature-rich format, but files are larger and more complex.

> **A simple analogy**: If data is water, then CSV is a plastic cup (simple and lightweight), JSON is a thermos (structured with protection), and Excel is a kettle (full-featured but heavier).

---

## 💻 Code Example 1: Analyzing Sales Data from a CSV

Let's learn through a practical example. First, create the project:

```bash
mkdir data-analysis
cd data-analysis
```

Start Claude Code and ask it to create some sample data:

```
Help me create a sales_data.csv file with the following columns:
- date (dates from January to June 2024)
- product (product names: Laptop, Phone, Tablet, Headphones, Charger)
- quantity (random integers between 1-50)
- price (reasonable prices matching each product)
- region (regions: North, Central, South, East)
Generate 100 rows of simulated data.
```

Next, ask Claude Code to analyze the data:

```
Help me analyze sales_data.csv with Python. I want to know:
1. What is the total revenue
2. Which product sold the most (by quantity)
3. Which region has the highest revenue
4. The monthly sales trend
Use pandas for processing, and add detailed comments.
```

Claude Code will generate an analysis script similar to this:

```python
# analyze_sales.py — Sales data analysis tool
import pandas as pd  # pandas is Python's most powerful data analysis library

# ===== Step 1: Read the data =====
# As simple as opening an Excel file
df = pd.read_csv("sales_data.csv")

# Calculate the revenue for each transaction
df["total"] = df["quantity"] * df["price"]  # quantity x unit price = revenue

# Preview the data (show first 5 rows)
print("=== Data Preview (first 5 rows) ===")
print(df.head())
print(f"\nTotal of {len(df)} records\n")

# ===== Step 2: Basic statistics =====
total_revenue = df["total"].sum()  # Sum all revenue
print(f"=== Total Revenue ===")
print(f"${total_revenue:,.0f}\n")

# ===== Step 3: Product sales ranking by quantity =====
product_qty = df.groupby("product")["quantity"].sum()  # Group by product, sum quantities
product_qty = product_qty.sort_values(ascending=False)  # Sort descending

print("=== Product Sales Ranking ===")
for product, qty in product_qty.items():
    print(f"  {product}: {qty} units")

# ===== Step 4: Revenue by region =====
region_sales = df.groupby("region")["total"].sum()  # Group by region, sum revenue
region_sales = region_sales.sort_values(ascending=False)

print("\n=== Revenue by Region ===")
for region, sales in region_sales.items():
    print(f"  {region}: ${sales:,.0f}")

# ===== Step 5: Monthly trend =====
df["month"] = pd.to_datetime(df["date"]).dt.month  # Extract month from date
monthly = df.groupby("month")["total"].sum()        # Sum by month

print("\n=== Monthly Sales Trend ===")
for month, sales in monthly.items():
    # Simple bar chart representation
    bar = "#" * int(sales / monthly.max() * 30)  # Proportionally scaled
    print(f"  Month {month}: ${sales:>10,.0f} {bar}")
```

### Expected Output:

```bash
# Install pandas first (if you haven't already)
pip install pandas

# Run the analysis script
python analyze_sales.py
```

📸 [What you should see]
```
┌──────────────────────────────────────────────┐
│ === Data Preview (first 5 rows) ===           │
│   date     product  quantity  price  total    │
│ 2024-01-05  Laptop    3      25000  75000    │
│ 2024-01-08  Phone     12      8000  96000    │
│ ...                                           │
│                                               │
│ Total of 100 records                          │
│                                               │
│ === Total Revenue ===                         │
│ $5,234,000                                    │
│                                               │
│ === Product Sales Ranking ===                 │
│   Headphones: 245 units                       │
│   Charger: 198 units                          │
│   Phone: 167 units                            │
│   Tablet: 142 units                           │
│   Laptop: 98 units                            │
│                                               │
│ === Monthly Sales Trend ===                   │
│   Month 1: $  820,000 ####################    │
│   Month 2: $  750,000 ##################      │
│   Month 3: $  910,000 #######################  │
│   ...                                          │
└──────────────────────────────────────────────┘
```

---

## 💻 Code Example 2: Generating Charts for Visualization

Numbers are great, but charts are more intuitive! Let's ask Claude Code to add charting capabilities:

```
Building on analyze_sales.py, use matplotlib to generate the following charts,
all saved as PNG images:
1. A bar chart of product sales by quantity
2. A pie chart of revenue by region
3. A line chart of monthly sales trend
Chart titles and labels should be in English, with a good color scheme.
Save them to a charts/ folder.
```

Claude Code will generate a charting script:

```python
# create_charts.py — Sales data chart generator
import pandas as pd
import matplotlib.pyplot as plt       # Charting library
import os

# Create charts folder (if it doesn't exist)
os.makedirs("charts", exist_ok=True)

# Read the data
df = pd.read_csv("sales_data.csv")
df["total"] = df["quantity"] * df["price"]

# ===== Chart 1: Product Sales Bar Chart =====
product_qty = df.groupby("product")["quantity"].sum().sort_values(ascending=True)

plt.figure(figsize=(10, 6))                    # Set chart size
colors = ["#00b4a6", "#1a1a2e", "#e76f51", "#2a9d8f", "#264653"]
product_qty.plot(kind="barh", color=colors)    # Horizontal bar chart
plt.title("Sales by Product", fontsize=16)
plt.xlabel("Quantity Sold (units)")
plt.tight_layout()                              # Auto-adjust margins
plt.savefig("charts/product_sales.png", dpi=150)  # Save as image
plt.close()
print("Generated: charts/product_sales.png")

# ===== Chart 2: Regional Revenue Pie Chart =====
region_sales = df.groupby("region")["total"].sum()

plt.figure(figsize=(8, 8))
region_sales.plot(kind="pie", autopct="%1.1f%%", colors=colors)
plt.title("Revenue Share by Region", fontsize=16)
plt.ylabel("")                                  # Hide default y-axis label
plt.tight_layout()
plt.savefig("charts/region_pie.png", dpi=150)
plt.close()
print("Generated: charts/region_pie.png")

# ===== Chart 3: Monthly Trend Line Chart =====
df["month"] = pd.to_datetime(df["date"]).dt.month
monthly = df.groupby("month")["total"].sum()

plt.figure(figsize=(10, 6))
monthly.plot(kind="line", marker="o", color="#00b4a6", linewidth=2)
plt.title("Monthly Sales Trend", fontsize=16)
plt.xlabel("Month")
plt.ylabel("Revenue ($)")
plt.grid(True, alpha=0.3)                       # Add light grid lines
plt.xticks(range(1, 7), ["Jan", "Feb", "Mar", "Apr", "May", "Jun"])
plt.tight_layout()
plt.savefig("charts/monthly_trend.png", dpi=150)
plt.close()
print("Generated: charts/monthly_trend.png")

print("\nAll charts have been saved to the charts/ folder!")
```

### Expected Output:

```bash
# Install matplotlib (if you haven't already)
pip install matplotlib

# Run the chart script
python create_charts.py
```

📸 [What you should see]
```
┌──────────────────────────────────────────┐
│ Generated: charts/product_sales.png       │
│ Generated: charts/region_pie.png          │
│ Generated: charts/monthly_trend.png       │
│                                           │
│ All charts have been saved to the         │
│ charts/ folder!                           │
└──────────────────────────────────────────┘
```

The resulting file structure:

```
data-analysis/
├── sales_data.csv          # Raw data
├── analyze_sales.py        # Analysis script
├── create_charts.py        # Charting script
└── charts/
    ├── product_sales.png   # Product sales bar chart
    ├── region_pie.png      # Regional pie chart
    └── monthly_trend.png   # Monthly trend line chart
```

You can double-click those PNG images in your file explorer to view the charts.

---

## ✍️ Hands-on Exercises

### Exercise 1: Analyze Your Own Data

1. Ask Claude Code to create some simulated data on a topic that interests you (e.g., reading logs, exercise data, daily expenses)
2. Include at least 50 rows and 4 columns
3. Use pandas to analyze it and find at least 3 interesting insights
4. Generate at least one chart

> **Tip**: For example, you could say "Create a CSV of daily exercise records for 2024, including date, exercise type, duration, and calories burned, then analyze which exercise is done most often and the average monthly exercise time"

### Exercise 2: Generate a Summary Report from a JSON File

1. Ask Claude Code to create a JSON file of student grades (10 students, 5 subjects)
2. Write a Python script to read the JSON and produce:
   - Each student's average score
   - The highest and lowest scores for each subject
   - Class rankings
3. Output the results as a neatly formatted text report

> **Tip**: Tell Claude Code "Read students.json, calculate various statistics, then use print to output a neatly formatted report"

---

## ❓ Quiz (3 Questions)

**1. What characterizes a CSV file?**

A. It can only be opened with Microsoft Excel
B. It's a plain text file that uses commas to separate fields
C. It's an image format
D. It requires special software to create

Answer: B — CSV (Comma-Separated Values) is a plain text file that uses commas to separate fields. It can be read by any text editor, Excel, Google Sheets, or programming language — making it the most universal data format.

---

**2. In pandas, what does `df.groupby("product")["quantity"].sum()` do?**

A. Deletes all product data
B. Groups the data by product name, then calculates the total quantity for each group
C. Concatenates all product names together
D. Randomly shuffles the data

Answer: B — `groupby("product")` splits the data into groups by product name (like sorting a deck of cards by suit), then `["quantity"].sum()` calculates the total of the quantity field for each group.

---

**3. Why do you need to configure fonts when generating charts with matplotlib?**

A. Custom fonts make charts look prettier
B. Without configuring the right font, non-ASCII characters on charts may show as garbled text or boxes
C. The default font can't display numbers
D. matplotlib only supports one specific font

Answer: B — matplotlib's default font may not include all characters needed for your locale. If chart titles or labels appear as boxes or garbled text, you can fix this by setting `rcParams["font.sans-serif"]` to specify a font that includes the characters you need.

---

## 🔗 Next Steps

You can now read data, analyze it, and even generate beautiful charts! In the final module, **4.4: Deployment and Publishing**, we'll learn how to publish your website or project to the internet so anyone in the world can see your work. This is the last step in turning your learning into real accomplishments!
