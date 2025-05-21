"use client";
import { Plus } from "lucide-react";
import { SortableContext } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import type { Task } from "@lib/types";

export const TaskColumn = ({ id, tasks }: { id: string; tasks: Task[] }) => (
  <div className="min-w-[280px] w-72 flex-shrink-0 bg-gray-100 rounded p-2">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-medium">{id}</h4>
      <button>
        <Plus size={16} />
      </button>
    </div>
    <SortableContext items={tasks.map((t) => t.id)}>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </SortableContext>
  </div>
);
