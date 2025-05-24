<!--
  🚀 Super-Task – A minimal project & task management tool
-->

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-%23000000.svg?logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Prisma-%2344EEDD.svg?logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/React-%2361DAFB.svg?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white" alt="TypeScript"/>
</p>

# Super-Task

A lightweight single-page application for creating and managing projects, tasks and subtasks.  
All data persists beyond browser sessions.

---

## 🔥 Features

- 📁 Create, edit & delete **projects**  
- 📝 Create, edit & delete **tasks** with title, description, due date & status  
- ✅ Create, edit & delete **subtasks** per task  
- 🗂 Kanban-style board with drag & drop to change status  
- 💾 Persistence via SQLite/PostgreSQL & Prisma  
- 🎨 Responsive design with Tailwind CSS  

---

## ⚙️ Requirements

- Node.js ≥ 18  
- Yarn or npm  

---

## 🗄️ Database & Prisma

This project ships with SQLite by default.

1. Run your initial migration:  
   ```bash
   npx prisma migrate dev --name init
   npx prisma studio
   ```

## 🚀 Installation

```bash
git clone https://github.com/your-username/super-task.git
cd super-task
yarn install
# or
# npm install
