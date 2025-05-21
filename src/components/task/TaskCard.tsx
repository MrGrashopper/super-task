"use client";
import { Trash2 } from "lucide-react";
import { useProjects } from "hooks/useProjects";
import type { Task } from "@lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskCard = ({ task }: { task: Task }) => {
  const { remove } = useProjects();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id, data: { status: task.status } });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="bg-white rounded p-2 shadow mb-2 cursor-grab"
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between">
        <span className="font-semibold">{task.title}</span>
        <button onClick={() => remove.mutate(task.id)}>
          <Trash2 size={14} />
        </button>
      </div>
      <p className="text-xs text-gray-500">{task.description}</p>
    </div>
  );
};
