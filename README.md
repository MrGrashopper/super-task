<p align="center">
  <img src="https://img.shields.io/badge/Next.js-%23000000.svg?logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Prisma-%2344EEDD.svg?logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/React-%2361DAFB.svg?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/DND_Kit-%234F46E5.svg?logo=dnd-kit&logoColor=white" alt="DND Kit"/>
  <img src="https://img.shields.io/badge/%40tanstack--react--query-%23526EF0.svg?logo=reactquery&logoColor=white" alt="TanStack Query"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/React_Hook_Form-%2316BEB4.svg?logo=reacthookform&logoColor=white" alt="React Hook Form"/>
  <img src="https://img.shields.io/badge/Zod-%232C1F4A.svg?logo=zod&logoColor=white" alt="Zod"/>
</p>

# Super-Task

A lightweight single-page app for creating and managing projects, tasks and subtasks.  
Data persists beyond browser sessions via SQLite (default).

![Super-Task Logo](public/superTask.png)

---

## 🔥 Features

- Create / edit / delete **projects**  
- Create / edit / delete **tasks** (title, description, due date, status)  
- Create / edit / delete **subtasks** per task  
- Kanban-style **drag & drop** board  
- **Responsive UI** with Tailwind CSS  

---

## ⚙️ Requirements

- Node.js ≥ 18  
- Yarn or npm  

---

## 🚀 Quick Start

1. **Clone the repo**  
   ```bash
   git clone https://github.com/MrGrashopper/super-task.git
   cd super-task
   ```

2. **Install dependencies**  
   ```bash
   yarn install
   ```

3. **Migrate the database & open Prisma Studio**  
   ```bash
    npx prisma migrate dev --name init
    npx prisma studio
   ```

4. **Start the development server**  
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Open the app in your browser**  
   ```bash
   http://localhost:3000
   ```

6. **Optional: Reset the database**  
   ```bash
   npx prisma migrate reset
   ```
---