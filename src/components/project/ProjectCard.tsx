"use client";

import React from "react";
import { ItemCard } from "@ui/ItemCard";
import { useProjects } from "@hooks";
import type { Project } from "@lib/types";
import { Folder, FolderTree } from "lucide-react";
import { StatusBadge, Tooltip } from "@components/ui";

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
        statusBadge={<StatusBadge status={project.status} variant="small" />}
        editable
        onEdit={() => onEdit(project)}
        onDelete={onDelete}
        href={`/projects/${project.id}`}
      >
        <div className="mt-4">
          <div className="flex items-center space-x-4 text-gray-600 justify-end">
            <div className="relative inline-block group cursor-pointer">
              <div className="flex items-center space-x-1">
                <div>{tasksCount}</div>
                <Folder size={16} />
              </div>
              <Tooltip>Aufgaben</Tooltip>
            </div>
            <div className="relative inline-block group cursor-pointer">
              <div className="flex items-center space-x-1">
                <div>{subtasksCount}</div>
                <FolderTree size={16} />
              </div>
              <Tooltip>Teilaufgaben</Tooltip>
            </div>
          </div>
        </div>
      </ItemCard>
    </div>
  );
};
