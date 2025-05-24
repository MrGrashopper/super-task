"use client";

import React from "react";
import { ItemCard } from "@ui/ItemCard";
import { useProjects } from "@hooks";
import { getStatusClass, StatusLabels } from "@lib/constants";
import type { Project } from "@lib/types";
import { Folder, FolderTree } from "lucide-react";

type Props = {
  project: Project;
  onEdit: (project: Project) => void;
};

export const ProjectCard = ({ project, onEdit }: Props) => {
  const { remove } = useProjects();

  const onDelete = () => {
    if (window.confirm(`Projekt "${project.title}" wirklich löschen?`)) {
      remove.mutate(project.id);
    }
  };

  const tasksCount = project.tasks.length;
  const subtasksCount = project.tasks.reduce(
    (sum, t) => sum + t.subtasks.length,
    0
  );

  return (
    <div className="break-inside-avoid mb-6">
      <ItemCard
        title={project.title}
        description={project.description}
        dueDate={project.dueDate}
        statusBadge={
          <span
            className={`inline-block px-2 py-1 text-xs rounded ${getStatusClass(
              project.status
            )}`}
          >
            {StatusLabels[project.status]}
          </span>
        }
        onEdit={() => onEdit(project)}
        onDelete={onDelete}
        href={`/projects/${project.id}`}
      >
        <div className="mt-4">
          <div className="flex items-center space-x-4 text-gray-600 justify-end">
            <div className="flex items-center space-x-1">
              <span>{tasksCount}</span>
              <Folder size={16} />
            </div>
            <div className="flex items-center space-x-1">
              <span>{subtasksCount}</span>
              <FolderTree size={16} />
            </div>
          </div>
        </div>
      </ItemCard>
    </div>
  );
};
