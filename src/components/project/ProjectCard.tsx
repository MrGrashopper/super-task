"use client";
import { ItemCard } from "@ui/ItemCard";
import { useProjects } from "hooks/useProjects";
import { getStatusClass, StatusLabels } from "@lib/constants";
import type { Project } from "@lib/types";
import { TaskList } from "./TaskList";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { remove } = useProjects();
  const onDelete = () => {
    if (window.confirm(`Projekt "${project.title}" wirklich löschen?`))
      remove.mutate(project.id);
  };

  return (
    <div className="break-inside-avoid mb-6">
      <ItemCard
        title={project.title}
        description={project.description}
        dueDate={project.dueDate}
        statusBadge={
          <span
            className={`inline-block px-2 py-1 rounded ${getStatusClass(
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
          <h3 className="font-medium text-gray-600">Aufgaben</h3>
          <TaskList tasks={project.tasks} />
        </div>
      </ItemCard>
    </div>
  );
};
