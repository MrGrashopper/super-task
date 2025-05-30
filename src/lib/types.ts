export type Status = "Open" | "InProgress" | "Done";

export type Subtask = {
  id: string;
  taskId: string;
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
  order: number;
  subtasks: Subtask[];
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
  tasks: Task[];
};

export type FormData = {
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
};
