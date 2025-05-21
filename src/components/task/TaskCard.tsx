"use client";
import { ItemCard } from "@ui/ItemCard";
import { useTasks } from "hooks/useTasks";
import { getStatusClass, StatusLabels } from "@lib/constants";
import type { Task } from "@lib/types";

export const TaskCard = ({
  task,
  projectId,
}: {
  task: Task;
  projectId: string;
}) => {
  const { remove } = useTasks(projectId);
  const onDelete = () => {
    if (window.confirm(`Task "${task.title}" wirklich löschen?`))
      remove.mutate(task.id);
  };

  return (
    <ItemCard
      title={task.title}
      description={task.description}
      dueDate={task.dueDate}
      statusBadge={
        <span
          className={`inline-block px-2 py-0.5 text-xs rounded ${getStatusClass(
            task.status
          )}`}
        >
          {StatusLabels[task.status]}
        </span>
      }
      onDelete={onDelete}
    />
  );
};
