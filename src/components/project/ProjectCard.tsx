"use client";
import { ItemCard } from "@ui/ItemCard";
import { useProjects } from "hooks/useProjects";
import { getStatusClass, StatusLabels } from "@lib/constants";
import type { Project } from "@lib/types";
import { Folder, FolderTree } from "lucide-react";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { remove } = useProjects();
  const onDelete = () => {
    if (window.confirm(`Projekt "${project.title}" wirklich löschen?`))
      remove.mutate(project.id);
  };
  const tasksLength = project.tasks.length;
  const subtasksLength = project.tasks.reduce(
    (acc, task) => acc + task.subtasks.length,
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
        onDelete={onDelete}
        href={`/projects/${project.id}`}
      >
        <div className="mt-4">
          <div className="flex items-center space-x-4 text-gray-600 justify-end">
            <div className="flex items-center space-x-1">
              <span>{tasksLength}</span>
              <Folder size={16} />
            </div>
            <div className="flex items-center space-x-1">
              <span>{subtasksLength}</span>
              <FolderTree size={16} />
            </div>
          </div>
        </div>
      </ItemCard>
    </div>
  );
};
