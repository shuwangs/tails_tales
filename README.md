# 🐾 Tails & Tales — AI-Powered Pet Diary

A full-stack pet diary application that combines traditional CRUD functionality with AI-powered features such as semantic search, content generation, and translation.

Built with a modern PERN-style architecture and extended with embeddings-based retrieval.
## Demo
![tails_tales](./client/public/tails_tales.gif)

## ✨ Features
### 📝 Core Diary Features
- Create, and delete and view diary entries

### 🤖 AI Features
- ✨ AI Title Suggestion
- 🌐 Content Translation
- 🔍 Semantic Search (NEW 🚀)
    - Search diary entries by meaning, not keywords
    - Uses embeddings + cosine similarity
    
### Embedding Pipeline
- Generate embeddings when creating entries
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
- Embeddings via MiniLM
-Cosine similarity for ranking
### Database
- PostgreSQL + pgvector


## 🔍 Semantic Search Flow
1. User enters search query
2. Query is converted into embedding
3. Compare with stored embeddings (cosine similarity)
4. Return top 6 most relevant entries

## 📦 API Endpoints
### Entries
>GET /api/entries/:id   
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
