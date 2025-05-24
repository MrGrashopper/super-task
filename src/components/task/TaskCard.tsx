"use client";

import React from "react";
import { ItemCard, StatusBadge, Tooltip } from "@ui";
import { useTasks } from "@hooks";
import { getStatusClass } from "@lib/constants";
import type { Task } from "@lib/types";
import { FolderTree } from "lucide-react";

type Props = {
  task: Task;
  projectId: string;
  onEdit?: (id: string) => void;
};

export const TaskCard = ({ task, projectId, onEdit }: Props) => {
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
      editable
      onEdit={onEdit}
      statusBadge={
        <StatusBadge
          status={task.status}
          className={getStatusClass(task.status)}
          variant="small"
        />
      }
      onDelete={onDelete}
    >
      <div className="flex items-center justify-end">
        <div className="relative inline-flex items-center space-x-1 group cursor-pointer">
          <span>{task.subtasks.length}</span>
          <FolderTree size={16} />
          <Tooltip>Unteraufgaben</Tooltip>
        </div>
      </div>
    </ItemCard>
  );
};
