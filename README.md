# 🤖 Chatbot Application

A modern AI-powered chatbot built with **Next.js**, integrated with **Google API** for AI capabilities and **AG Grid** for advanced data table rendering.

---

## 🚀 Features

- 💬 Interactive Chatbot Interface
- 🧠 Google API Integration (LLM / AI responses)
- 📊 AG Grid integration for dynamic and high-performance tables
- ⚡ Built with Next.js (App Router)
- 🎨 Styled using Tailwind CSS
- 🔐 Environment-based configuration
- 🧹 ESLint configured

---
## 📸 Screenshots

![Home Page Screenshot](https://github.com/NishantSingh2964/Chatbot/blob/main/public/Screenshot%202026-02-11%20112324.png)

---

## 🏗️ Project Structure

├── app/ # Next.js App Router

├── public/ # Static assets

├── .env.local.example # Environment variable template

├── eslint.config.mjs # ESLint configuration

├── list-models.js # Script to list available Google models

├── next.config.ts # Next.js configuration

├── tailwind.config.js # Tailwind CSS config

├── postcss.config.mjs # PostCSS config

├── tsconfig.json # TypeScript configuration

├── package.json # Dependencies and scripts

└── README.md # Project documentation


---

## 🛠️ Tech Stack

- **Framework:** Next.js (React + TypeScript)
- **Styling:** Tailwind CSS
- **AI Integration:** Google API
- **Data Grid:** AG Grid
- **Linting:** ESLint

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/NishantSingh2964/Chatbot.git

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview


# Navigate into the folder
cd Chatbot

# Install dependencies
npm install

```
## **📊 AG Grid Integration**
- Column sorting
- Filtering
- Pagination
- High-performance rendering
- Dynamic data binding

  ## **🧠 Google API Integration**
  **Flow:**
1. User submits a message
2. Backend sends request to Google API 
3. Response is processed
4. Data is optionally formatted into table structure
5. Response displayed in chat UI (or AG Grid if structured)

## **📦 Available Scripts**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## **🧩 Future Improvements**
- Streaming AI responses
- Chat history persistence (Database integration)
- User authentication
- Role-based access control
- Dark mode toggle





