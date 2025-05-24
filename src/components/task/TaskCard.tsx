"use client";

import React from "react";
import { ItemCard, StatusBadge } from "@ui";
import { useTasks } from "@hooks";
import { getStatusClass, StatusLabels } from "@lib/constants";
import type { Task } from "@lib/types";
import { FolderTree } from "lucide-react";

type Props = {
  task: Task;
  projectId: string;
};

export const TaskCard = ({ task, projectId }: Props) => {
  const { remove } = useTasks(projectId);
  const onDelete = () => {
    if (window.confirm(`Task "${task.title}" wirklich löschen?`)) {
      remove.mutate(task.id);
    }
  };

  return (
    <ItemCard
      title={task.title}
      description={task.description}
      dueDate={task.dueDate}
      statusBadge={
        <StatusBadge
          status={task.status}
          className={getStatusClass(task.status)}
          variant="small"
        />
      }
      onDelete={onDelete}
    >
      <div className="flex items-center space-x-1 justify-end">
        <span>{task.subtasks.length}</span>
        <FolderTree size={16} />
      </div>
    </ItemCard>
  );
};
