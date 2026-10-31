# 🐾 Tails & Tales — AI-Powered Pet Diary

A full-stack pet diary application that combines traditional CRUD functionality with AI-powered features such as semantic search, Title generation, and translation.

Built with a modern PERN-style architecture and extended with embeddings-based retrieval.
## Demo
![tails_tales](./client/public/tails-tales.gif)

## ✨ Features
### 📝 Core Diary Features
- Create, view, edit, and delete diary entries
- Edit titles and content directly on the detail page with Save and Cancel controls
- Restore saved content on cancel and preserve drafts when an update fails

### 📅 Calendar & Browsing
- Browse months and select a date to filter diary entries
- Highlight dates with diary entries, with distinct styles for today and the selected date
- Use **Today** to return to the current month and select today's entries
- Use **All dates** to clear the date filter while preserving any active search
- Combine date filtering with semantic search results
- View the calendar beside entry cards on desktop, with a stacked layout on smaller screens

### 🤖 AI Features
- ✨ AI Title Suggestion
- 🌐 Content Translation
- 🔍 Semantic Search (NEW 🚀)
    - Search diary entries by meaning, not keywords
    - Uses embeddings + cosine similarity
    
### Embedding Pipeline
- Generate embeddings when creating entries
- Regenerate embeddings on the server when updating entries, using the submitted content instead of client-supplied vectors
- Backfill embeddings for existing data
- MiniLM-based embedding model

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Context API + Hooks
### Backend
- Node.js + Express
### AI 
- Python
- Embeddings via MiniLM
- Cosine similarity for ranking
### Database
- PostgreSQL + pgvector


## 🔍 Semantic Search Flow
1. User enters search query
2. Query is converted into embedding
3. Compare with stored embeddings (cosine similarity)
4. Return top 6 most relevant entries

## 📊 Search Evaluation

An offline evaluation compares MiniLM semantic retrieval with a default TF-IDF keyword baseline using **51 synthetic English diary entries and 46 labeled queries**. Both methods search diary content and return the top six results. JavaScript generates semantic rankings using the application's embedding function; Python generates the TF-IDF baseline and analyzes both runs.

| Metric      | Semantic search | TF-IDF baseline |
| ----------- | --------------- | --------------- |
| Recall@6    | 0.9500          | 0.8750          |
| MRR@6       | 0.8217          | 0.7417          |
| Precision@6 | 0.1750          | 0.1625          |

Metrics are averaged over **40 answerable queries**. Semantic search improves Recall@6 by **7.5 percentage points** on this dataset. The six no-answer queries are excluded; abstention performance has not been measured.

Error analysis shows complementary behavior: semantic retrieval finds relevant entries for four queries that TF-IDF misses, while TF-IDF retrieves a homecoming greeting missed by semantic search. Both methods miss a query about not wanting to play with a favorite toy.

These results describe a small synthetic development dataset with provisional relevance labels, not a held-out benchmark or real-user performance. Evaluation runs in memory without PostgreSQL and does not test database filtering.

Generate a comparison report from the saved results using Python 3 (no extra dependencies):

```bash
python3 evaluation/run.py --from-saved
```

Reports are written to `evaluation/reports/report.md` and `report.json`. CI publishes the comparison in Actions Summary and uploads it as an artifact. After installing the evaluation dependencies, run `python3 evaluation/run.py` to regenerate both methods; full evaluation is also available through the CI workflow’s manual trigger. Saved-results analysis does not test current model behavior.

See the [evaluation README](./evaluation/README.md) for data, relevance criteria, dependencies, commands to regenerate results, and detailed failure analysis.

## 📦 API Endpoints
### Entries
>GET /api/entries/:id   
>PUT /api/entries/:id → update an entry and regenerate its embedding\
>DELETE /api/entries/:id

### Pet Entries
>GET /api/pets/:petId/entries  
>POST /api/pets/:petId/entries

### AI
>POST /api/ai/title → generate title suggestions    
>POST /api/ai/translate → translate content    
>POST /api/ai/search → semantic search


## 🎯 Future Improvements
- 🔜 Chat with your diary (RAG-based Q&A)
- 🔜 Emotion / mood analytics dashboard
- 🔜 Image generation for diary covers
- 🔜 Better ranking (re-ranking / hybrid search)

## 💡 Key Learnings
- Designing AI features on top of CRUD apps
- Working with embeddings + vector databases
- Error handling with handler


## 👤 Author

Shu Wang 
[Github](https://github.com/shuwangs)
[LinkedIn](https://www.linkedin.com/in/shuuwang/)


## How to start

### 1. Clone repository

```shell
git clone https://github.com/shuwangs/tails_tales.git
cd tails_tales
```

### 2. Install PostgreSQL

Make sure PostgreSQL (version 14 or later) is installed and running.
### 3. Install pgvector extension
Refer to the pgvector documentation for more details:
https://github.com/pgvector/pgvector
#### For macOS and Linux
```bash
cd /tmp
git clone --branch v0.8.2 https://github.com/pgvector/pgvector.git
cd pgvector
make
make install # may need sudo
```

#### For Windows
```bash
set "PGROOT=C:\Program Files\PostgreSQL\18"
cd %TEMP%
git clone --branch v0.8.2 https://github.com/pgvector/pgvector.git
cd pgvector
nmake /F Makefile.win
nmake /F Makefile.win install
```

### 4. Create database
```bash
createdb pet_diary_db
```
Or replace `pet_diary_db` with your preferred database name.

### 5 . Run Schema
```bash
psql -d pet_diary -f server/db/schema.sql
```
### 6.env file
```bash
cp .env.exmple .env
```

Update the .env with your Database Username, Gemini API key and Google Cloud Key
### 7. setup client and server dependencies
make sure you are in server folder
```bash
cd server
npm install
npm run dev
```
Switch to client folder
```bash
cd client
npm install
npm run dev
```
