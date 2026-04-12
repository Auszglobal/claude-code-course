# Module 8.2: Building a RAG System with Gemini

## 🎯 Learning Objectives

After completing this module, you will be able to:

- Understand what RAG (Retrieval Augmented Generation) is and why it matters
- Explain why Gemini needs RAG to answer questions about your private data
- Break documents into chunks and create embeddings
- Understand how vector search finds relevant information
- Build a Q&A bot that answers questions from your own company documents

## 📖 Theory

### The Problem: Gemini Does Not Know Your Business

Gemini is incredibly smart, but it has a fundamental limitation: it only knows what it was trained on. It does not know your company's HR policies, your product documentation, your internal procedures, or your customer data.

If an employee asks "What is our vacation policy?" — Gemini has no idea. It might guess based on common policies, but that guess could be completely wrong and even dangerous for your business.

### The Solution: RAG (Retrieval Augmented Generation)

**RAG** stands for **Retrieval Augmented Generation**. Let us break that down:

- **Retrieval** — Find the relevant information from your documents
- **Augmented** — Add that information to the AI's context
- **Generation** — Let the AI generate an answer using that information

Think of it this way. Imagine a brilliant consultant who knows nothing about your company. Before answering any question, the consultant:

1. Goes to your filing cabinet (your documents)
2. Pulls out the most relevant folders (retrieval)
3. Reads the relevant sections (augmentation)
4. Gives you a clear answer based on what they just read (generation)

That is RAG. The AI does not need to memorize your entire document library. It just needs to find and read the right documents before answering.

### How RAG Works: The Pipeline

**Step 1: Prepare Your Documents (One-Time Setup)**

Take all your documents (PDFs, Word files, web pages, etc.) and break them into smaller pieces called **chunks**. A chunk is typically a paragraph or a few paragraphs — small enough to be specific but large enough to contain a complete thought.

Why chunk? Because if someone asks about vacation policy, you do not want to send your entire 200-page employee handbook to Gemini. You just want the 2-3 paragraphs about vacation.

**Step 2: Create Embeddings (One-Time Setup)**

An **embedding** is like a secret code that captures the meaning of text as a list of numbers. Think of it like GPS coordinates for ideas:

- "annual leave policy" might become [0.82, 0.15, 0.67, ...]
- "vacation days and time off" might become [0.81, 0.14, 0.68, ...]
- "coffee machine instructions" might become [0.12, 0.89, 0.03, ...]

Notice how the first two are very close in numbers (because they mean similar things), while the third is completely different. This is how the system knows which chunks are relevant to a question.

**Step 3: Search (Every Time a Question Is Asked)**

When a user asks a question, the system:
1. Converts the question into an embedding
2. Compares it to all the document chunk embeddings
3. Finds the closest matches (the most relevant chunks)

This is called **vector search** or **semantic search** — searching by meaning rather than by exact word matching.

**Step 4: Generate Answer**

The relevant chunks are added to the prompt, and Gemini generates an answer based on that specific information.

### Why Not Just Put Everything in the Prompt?

Great question! Gemini has a context window (the amount of text it can process at once). Even though modern models have very large context windows, putting millions of words in every prompt would be:

- **Slow** — more text means slower responses
- **Expensive** — you pay per token (word piece) processed
- **Less accurate** — too much irrelevant information can confuse the AI

RAG is like a librarian who brings you exactly the books you need, instead of dumping the entire library on your desk.

## 💻 Code Example 1: Simple RAG System

This builds a complete Q&A system that answers questions from your documents. We will use Gemini's embedding model to create the vector representations.

```python
# rag_system.py
# Build a Q&A bot that answers from your own documents

import google.generativeai as genai
import numpy as np

genai.configure(api_key="YOUR_API_KEY")

# Models we will use
embedding_model = "models/text-embedding-004"  # For creating embeddings
chat_model = genai.GenerativeModel("gemini-2.0-flash")  # For generating answers

# ---- STEP 1: Your document content ----
# In a real system, you would load these from files
# For now, we simulate a company knowledge base

documents = [
    {
        "title": "Vacation Policy",
        "content": "All full-time employees receive 20 days of annual leave per year. "
                   "Leave accrues at 1.67 days per month from your start date. Unused "
                   "leave can be carried over to the next year, up to a maximum of 10 days. "
                   "Leave requests must be submitted at least 2 weeks in advance through "
                   "the HR portal. Manager approval is required for any leave over 5 "
                   "consecutive days."
    },
    {
        "title": "Remote Work Policy",
        "content": "Employees may work remotely up to 3 days per week. Remote work days "
                   "must be agreed upon with your manager. You must be available during "
                   "core hours (10 AM - 3 PM) on remote days. A stable internet connection "
                   "is required. All remote workers must attend the weekly team meeting "
                   "in person on Wednesdays."
    },
    {
        "title": "Expense Reimbursement",
        "content": "Business expenses over $50 require pre-approval from your manager. "
                   "Submit expense reports within 30 days of the expense through the "
                   "finance portal. Receipts are required for all expenses over $25. "
                   "Meals during business travel are capped at $60 per day. Mileage "
                   "is reimbursed at $0.67 per kilometer."
    },
    {
        "title": "Health Benefits",
        "content": "The company provides comprehensive health insurance for all full-time "
                   "employees and their dependents. Coverage includes medical, dental, and "
                   "vision. The company pays 80% of premiums. Employees can choose between "
                   "three plans: Basic, Standard, and Premium. Open enrollment is in November "
                   "each year. New employees can enroll within 30 days of their start date."
    },
    {
        "title": "Performance Reviews",
        "content": "Performance reviews are conducted twice yearly: mid-year (June) and "
                   "year-end (December). Self-assessments are due one week before the review "
                   "meeting. Reviews cover goal achievement, skills development, and cultural "
                   "contribution. Ratings range from 1 (needs improvement) to 5 (exceptional). "
                   "A rating of 4 or above qualifies for the annual bonus pool."
    },
    {
        "title": "IT Security Policy",
        "content": "All employees must use two-factor authentication (2FA) for company accounts. "
                   "Passwords must be at least 12 characters with a mix of uppercase, lowercase, "
                   "numbers, and symbols. Never share your passwords or credentials. Report any "
                   "suspicious emails to security@company.com. Company devices must have full-disk "
                   "encryption enabled. Personal USB drives are not permitted on company computers."
    }
]

# ---- STEP 2: Chunk and embed documents ----

def create_chunks(documents):
    """Break documents into chunks (here each document is already a chunk)."""
    chunks = []
    for doc in documents:
        chunks.append({
            "title": doc["title"],
            "content": doc["content"],
            "text": f"{doc['title']}: {doc['content']}"  # Combined for embedding
        })
    return chunks

def create_embeddings(chunks):
    """Create vector embeddings for each chunk using Gemini."""
    texts = [chunk["text"] for chunk in chunks]

    # Gemini's embedding API can process multiple texts at once
    result = genai.embed_content(
        model=embedding_model,
        content=texts,
        task_type="retrieval_document"  # Optimized for document search
    )

    # Attach embeddings to chunks
    for i, chunk in enumerate(chunks):
        chunk["embedding"] = result["embedding"][i]

    return chunks

# ---- STEP 3: Search function ----

def find_relevant_chunks(question, chunks, top_k=2):
    """Find the most relevant chunks for a given question."""

    # Create embedding for the question
    question_embedding = genai.embed_content(
        model=embedding_model,
        content=question,
        task_type="retrieval_query"  # Optimized for search queries
    )["embedding"]

    # Calculate similarity between question and each chunk
    similarities = []
    for chunk in chunks:
        # Cosine similarity — measures how similar two vectors are
        q_vec = np.array(question_embedding)
        c_vec = np.array(chunk["embedding"])
        similarity = np.dot(q_vec, c_vec) / (np.linalg.norm(q_vec) * np.linalg.norm(c_vec))
        similarities.append((similarity, chunk))

    # Sort by similarity (highest first) and return top results
    similarities.sort(key=lambda x: x[0], reverse=True)
    return [(sim, chunk) for sim, chunk in similarities[:top_k]]

# ---- STEP 4: Generate answer ----

def ask_question(question, chunks):
    """Answer a question using RAG."""

    # Find relevant documents
    relevant = find_relevant_chunks(question, chunks, top_k=2)

    # Build context from relevant chunks
    context = ""
    print(f"\n  [Retrieved documents:]")
    for similarity, chunk in relevant:
        context += f"\n--- {chunk['title']} ---\n{chunk['content']}\n"
        print(f"    - {chunk['title']} (relevance: {similarity:.3f})")

    # Generate answer using Gemini with the retrieved context
    prompt = f"""You are a helpful HR assistant. Answer the employee's question
using ONLY the information provided in the context below. If the answer is not
in the context, say "I don't have information about that in our policies."

CONTEXT:
{context}

EMPLOYEE QUESTION: {question}

Provide a clear, helpful answer. Quote specific numbers or rules from the policy."""

    response = chat_model.generate_content(prompt)
    return response.text


# ---- Run the system ----

print("Setting up knowledge base...")
chunks = create_chunks(documents)
chunks = create_embeddings(chunks)
print(f"Indexed {len(chunks)} document chunks.\n")

# Test with questions
questions = [
    "How many vacation days do I get per year?",
    "Can I work from home on Fridays?",
    "How do I submit an expense report?",
    "What rating do I need for a bonus?"
]

for question in questions:
    print(f"QUESTION: {question}")
    answer = ask_question(question, chunks)
    print(f"ANSWER: {answer}")
    print("=" * 60)
```

### Expected Output:

```
Setting up knowledge base...
Indexed 6 document chunks.

QUESTION: How many vacation days do I get per year?

  [Retrieved documents:]
    - Vacation Policy (relevance: 0.892)
    - Health Benefits (relevance: 0.534)

ANSWER: As a full-time employee, you receive 20 days of annual
leave per year. This accrues at 1.67 days per month from your
start date. You can carry over up to 10 unused days to the next
year. Remember to submit leave requests at least 2 weeks in
advance through the HR portal.
============================================================

QUESTION: Can I work from home on Fridays?

  [Retrieved documents:]
    - Remote Work Policy (relevance: 0.901)
    - IT Security Policy (relevance: 0.487)

ANSWER: Yes, you can work from home on Fridays! Our policy allows
up to 3 remote days per week, and which days you work from home
should be agreed upon with your manager. Just keep in mind that
Wednesdays are mandatory in-office days for the weekly team
meeting. On remote days, you need to be available during core
hours (10 AM - 3 PM).
============================================================
```

## 💻 Code Example 2: Enhanced RAG with Source Citations

This improved version adds source citations, confidence scoring, and handles questions that fall outside the knowledge base.

```python
# rag_enhanced.py
# Enhanced RAG system with citations and confidence scoring

import google.generativeai as genai
import numpy as np
import json

genai.configure(api_key="YOUR_API_KEY")

embedding_model = "models/text-embedding-004"
chat_model = genai.GenerativeModel("gemini-2.0-flash")

# Reuse the same document setup and embedding code from Example 1
# (In a real project, the embeddings would be stored in a vector database)

def answer_with_citations(question, chunks):
    """Answer a question with source citations and confidence score."""

    # Find relevant chunks
    relevant = find_relevant_chunks(question, chunks, top_k=3)

    # Check confidence — if best match is below threshold, we may not have the answer
    best_score = relevant[0][0] if relevant else 0
    confidence = "high" if best_score > 0.8 else "medium" if best_score > 0.6 else "low"

    # Build context with numbered sources
    context_parts = []
    sources = []
    for i, (similarity, chunk) in enumerate(relevant, 1):
        if similarity > 0.5:  # Only include reasonably relevant chunks
            context_parts.append(f"[Source {i}: {chunk['title']}]\n{chunk['content']}")
            sources.append({"id": i, "title": chunk["title"], "relevance": round(similarity, 3)})

    context = "\n\n".join(context_parts)

    prompt = f"""You are an HR assistant that provides accurate answers with source citations.

CONTEXT DOCUMENTS:
{context}

QUESTION: {question}

Instructions:
1. Answer the question using ONLY information from the provided context
2. After each fact, cite the source in brackets like [Source 1]
3. If the answer is not in the context, say so clearly
4. Return your response as JSON:
{{
    "answer": "your answer with [Source N] citations",
    "sources_used": [1, 2],
    "confidence": "{confidence}",
    "follow_up": "a suggested follow-up question or action"
}}

Return ONLY valid JSON."""

    response = chat_model.generate_content(prompt)

    try:
        result = json.loads(response.text.strip().strip("```json").strip("```"))
    except json.JSONDecodeError:
        result = {"answer": response.text, "confidence": confidence}

    result["available_sources"] = sources
    return result


# Usage example
print("QUESTION: How do I get reimbursed for a business lunch?")
result = answer_with_citations("How do I get reimbursed for a business lunch?", chunks)

print(f"\nANSWER: {result.get('answer', 'N/A')}")
print(f"\nCONFIDENCE: {result.get('confidence', 'N/A')}")
print(f"\nSOURCES USED: {result.get('sources_used', [])}")
print(f"AVAILABLE SOURCES:")
for src in result.get('available_sources', []):
    print(f"  [{src['id']}] {src['title']} (relevance: {src['relevance']})")
print(f"\nFOLLOW-UP: {result.get('follow_up', 'N/A')}")
```

### Expected Output:

```
QUESTION: How do I get reimbursed for a business lunch?

ANSWER: To get reimbursed for a business lunch, submit your expense
report through the finance portal within 30 days of the expense
[Source 1]. You will need a receipt for any expense over $25
[Source 1]. Note that meals during business travel are capped at
$60 per day [Source 1]. If the lunch costs more than $50, you will
need pre-approval from your manager before the expense [Source 1].

CONFIDENCE: high

SOURCES USED: [1]
AVAILABLE SOURCES:
  [1] Expense Reimbursement (relevance: 0.891)
  [2] Performance Reviews (relevance: 0.423)

FOLLOW-UP: Would you like to know how to access the finance portal
to submit your expense report?
```

## ✍️ Hands-On Exercises

### Exercise 1: Build a RAG for Your Own Documents
Gather 5-10 documents relevant to you (could be study notes, recipes, project documentation, or any text content). Replace the sample documents in Code Example 1 with your content. Test the system with 5 questions and evaluate whether it retrieves the right chunks and generates accurate answers.

**Hint:** If the system retrieves the wrong documents, try making your chunks more specific. A chunk that is too long (covering multiple topics) is harder to match accurately than several focused chunks.

### Exercise 2: Improve Chunk Quality
Take one long document (at least 500 words) and experiment with different chunking strategies: (a) split by paragraph, (b) split by heading/section, (c) use overlapping chunks where each chunk includes the last 2 sentences of the previous chunk. Compare which strategy gives the best retrieval results.

**Hint:** Overlapping chunks help because important context sometimes spans chunk boundaries. Try a 2-sentence overlap and see if answer quality improves for questions about information near section transitions.

## 🔗 Next Steps

In the next module, you will explore Google Cloud's Vertex AI platform — the enterprise-grade version of Gemini. You will learn when to use Vertex AI instead of AI Studio, how to fine-tune models, and how enterprise security and pricing work.

<div class="module-quiz">
<h3>Module Quiz</h3>

<div class="quiz-q" data-answer="2"><p>1. What does RAG stand for?</p><label><input type="radio" name="q1" value="0"> A. Random Answer Generator</label><label><input type="radio" name="q1" value="1"> B. Rapid AI Growth</label><label><input type="radio" name="q1" value="2"> C. Retrieval Augmented Generation</label><label><input type="radio" name="q1" value="3"> D. Recursive Algorithm Gateway</label><div class="quiz-explain">RAG stands for Retrieval Augmented Generation — retrieving relevant documents, augmenting the AI's context with that information, and generating an answer based on it.</div></div>

<div class="quiz-q" data-answer="1"><p>2. Why does Gemini need RAG to answer questions about your company?</p><label><input type="radio" name="q2" value="0"> A. Gemini is too slow without RAG</label><label><input type="radio" name="q2" value="1"> B. Gemini was not trained on your private company data and does not know your policies</label><label><input type="radio" name="q2" value="2"> C. RAG is required by Google's terms of service</label><label><input type="radio" name="q2" value="3"> D. Gemini cannot read text without RAG</label><div class="quiz-explain">Gemini is trained on public data and has a knowledge cutoff date. It has no way of knowing your specific company policies, internal documents, or private data. RAG bridges this gap by feeding it the right information at query time.</div></div>

<div class="quiz-q" data-answer="0"><p>3. What is an "embedding" in the context of RAG?</p><label><input type="radio" name="q3" value="0"> A. A list of numbers that captures the meaning of text, like GPS coordinates for ideas</label><label><input type="radio" name="q3" value="1"> B. An image inserted into a document</label><label><input type="radio" name="q3" value="2"> C. A compressed version of a file</label><label><input type="radio" name="q3" value="3"> D. A link between two web pages</label><div class="quiz-explain">An embedding converts text into a list of numbers (a vector) that represents its meaning. Similar texts have similar numbers, allowing the system to find relevant documents by comparing these number patterns.</div></div>

<div class="quiz-q" data-answer="3"><p>4. Why do we chunk documents instead of using them whole?</p><label><input type="radio" name="q4" value="0"> A. Because Gemini can only read short texts</label><label><input type="radio" name="q4" value="1"> B. Because chunking makes documents easier to read for humans</label><label><input type="radio" name="q4" value="2"> C. Because whole documents are too expensive to store</label><label><input type="radio" name="q4" value="3"> D. To send only the relevant paragraphs to Gemini, saving time, cost, and improving accuracy</label><div class="quiz-explain">Chunking ensures you send only the specific, relevant information to Gemini rather than entire documents. This is faster, cheaper (fewer tokens), and more accurate because there is less irrelevant information to distract the AI.</div></div>

<div class="quiz-q" data-answer="1"><p>5. What is "vector search" or "semantic search"?</p><label><input type="radio" name="q5" value="0"> A. Searching for exact keyword matches in documents</label><label><input type="radio" name="q5" value="1"> B. Finding documents by comparing the meaning of the query to the meaning of each chunk</label><label><input type="radio" name="q5" value="2"> C. Searching through images using AI vision</label><label><input type="radio" name="q5" value="3"> D. A type of Google search</label><div class="quiz-explain">Vector search compares the meaning (embedding) of your question to the meanings of all document chunks. Unlike keyword search, it understands that "vacation days" and "annual leave" mean the same thing, even though they use different words.</div></div>

<div class="quiz-q" data-answer="2"><p>6. In the RAG analogy, what role does Gemini play?</p><label><input type="radio" name="q6" value="0"> A. The filing cabinet that stores all documents</label><label><input type="radio" name="q6" value="1"> B. The employee asking the question</label><label><input type="radio" name="q6" value="2"> C. The brilliant consultant who reads the retrieved documents and gives a clear answer</label><label><input type="radio" name="q6" value="3"> D. The delivery person who carries documents between offices</label><div class="quiz-explain">In the analogy, Gemini is the brilliant consultant who knows nothing about your company but can read the relevant documents (retrieved by the RAG system) and give you a clear, accurate answer based on what they contain.</div></div>

<div class="quiz-q" data-answer="0"><p>7. What does the "confidence score" in Code Example 2 indicate?</p><label><input type="radio" name="q7" value="0"> A. How well the retrieved documents match the question — higher means more relevant</label><label><input type="radio" name="q7" value="1"> B. How fast the system responded</label><label><input type="radio" name="q7" value="2"> C. How many tokens were used</label><label><input type="radio" name="q7" value="3"> D. How many documents are in the knowledge base</label><div class="quiz-explain">The confidence score reflects how similar the best matching document chunk is to the question. A high score (above 0.8) means the system found very relevant information and the answer is likely accurate. A low score means the answer may be unreliable.</div></div>

<div class="quiz-q" data-answer="3"><p>8. Why is adding source citations important in a RAG system?</p><label><input type="radio" name="q8" value="0"> A. It makes the response look more professional</label><label><input type="radio" name="q8" value="1"> B. Google requires citations for all API responses</label><label><input type="radio" name="q8" value="2"> C. It increases the accuracy of the answer</label><label><input type="radio" name="q8" value="3"> D. It lets users verify the information and builds trust in the system</label><div class="quiz-explain">Citations allow users to check the original source document and verify that the AI's answer is correct. This builds trust, allows for accountability, and helps catch any AI misinterpretations of the source material.</div></div>

<button class="quiz-submit">Submit Answers</button>
<div class="quiz-result"></div>
</div>
