-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Open'
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Open',
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subtask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Open',
    CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
