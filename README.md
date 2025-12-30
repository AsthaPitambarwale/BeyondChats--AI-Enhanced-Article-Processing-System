# AI-Enhanced Article Processing System

A full-stack application that ingests articles, processes them using an LLM-powered Node.js bot, and displays results in a modern React frontend with filtering and detailed views.

## 🧠 Project Overview

This project consists of **three phases**:

1. **Backend (Laravel API)**
   Stores articles, exposes REST APIs, and tracks AI-processed status.
2. **LLM Bot (Node.js)**
   Fetches unprocessed articles, enhances them using AI logic (mock/LLM), and updates the backend.
3. **Frontend (React + Vite)**
   Displays articles, supports filtering (Pending / Processed), and shows detailed article views.

## 🗂 Project Structure

```
beyondchats-assignment/
│
├── backend-laravel/        # Laravel API
│   ├── app/
│   │   ├── Models/Article.php
│   │   └── Http/Controllers/ArticleController.php
│   ├── database/migrations/
│   │   └── 0001_01_01_000001_create_articles_table.php
│   ├── routes/api.php
│   └── .env
│
├── node-llm-bot/           # Node.js LLM Processor
│   ├── index.js
│   ├── services/laravelApi.js
│   └── .env
│
├── frontend-react/         # React Frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ArticleDetail.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── src/index.css
│
└── README.md
```

## 🧩 Phase 1 – Backend (Laravel API)

### Features

* Article storage
* AI processing flags
* Reference tracking
* RESTful APIs

### Database Schema (articles table)

| Column     | Type       | Description          |
| ---------- | ---------- | -------------------- |
| id         | bigint     | Primary key          |
| title      | string     | Article title        |
| content    | longText   | Article content      |
| source_url | string     | Original article URL |
| is_updated | boolean    | AI processed flag    |
| references | json       | AI references        |
| timestamps | timestamps | Created / Updated    |

### API Endpoints

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| GET    | `/api/articles`               | List all articles       |
| GET    | `/api/articles?updated=true`  | Only processed articles |
| GET    | `/api/articles?updated=false` | Only pending articles   |
| GET    | `/api/articles/{id}`          | Single article detail   |
| POST   | `/api/articles`               | Create article          |

### Backend Setup

```bash
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Backend runs on:

```
http://127.0.0.1:8000
```

## 🤖 Phase 2 – Node LLM Bot

### Purpose

* Fetches **pending articles**
* Enhances content using LLM / mock logic
* Updates article as **processed**

### Flow

```
Laravel API → Node Bot → AI Processing → Laravel Update
```

### Setup

```bash
cd node-llm-bot
npm install
cp .env.example .env
node index.js
```

Expected output:

```
🤖 LLM Bot started
Processed article ID: X
```

> The bot safely skips already processed articles.

## 🎨 Phase 3 – Frontend (React + Vite)

### Features

* Article list view
* Filter by status (All / Pending / Processed)
* Article detail page
* References display
* Modern dark UI

### Frontend Setup

```bash
cd frontend-react
npm install
npm install react-router-dom
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

## 🧪 How to Test the Entire System

### 1️⃣ Create an Article (Backend)

curl -X POST http://127.0.0.1:8000/api/articles ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"What is BeyondChats?\",\"content\":\"Explain BeyondChats AI platform\",\"is_updated\":false}"
 uplaod in same format using cURL in terminal.

### 2️⃣ Verify Frontend (Pending)

* Open frontend
* Article appears as **Pending**
* Filter → Pending works

### 3️⃣ Run Node Bot

```bash
cd node-llm-bot
node index.js
```

### 4️⃣ Verify Processed State

* Refresh frontend
* Article now appears under **Processed**
* Status updated
* Click **View Details**
* See enhanced content + references

## 🧠 How the System Works (End-to-End)

1. Article is added via API or scraper
2. Stored in DB as `is_updated = false`
3. Node bot fetches pending articles
4. AI logic enhances content & adds references
5. Backend updates article
6. Frontend reflects changes in real time

## 🛠 Tech Stack

* **Backend:** Laravel 12, PHP 8.2
* **Bot:** Node.js 20, Axios
* **Frontend:** React, Vite, React Router
* **Database:** MySQL / SQLite
* **Styling:** Custom CSS (Dark UI)

## ✅ Current Status

✔ Backend APIs working
✔ Node LLM Bot processing correctly
✔ Frontend filters & detail page working
✔ Assignment-ready UI
✔ Clean architecture

## 🚀 Possible Enhancements

* Real OpenAI / Gemini integration
* Authentication
* Live WebSocket updates
* Admin dashboard
* Pagination & search

## 👤 Author

**BeyondChats Assignment Submission**
By: Astha Pitambarwale

---

