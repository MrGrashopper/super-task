"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { getStatusClass, StatusLabels } from "@/lib/constants";
import { TaskList } from "./TaskList";
import type { Project } from "@/lib/types";

type Props = { project: Project };

export const ProjectCard = ({ project }: Props) => {
  const { remove } = useProjects();
  const handleDelete = () => {
    if (window.confirm(`Projekt "${project.title}" wirklich löschen?`)) {
      remove.mutate(project.id);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          Fällig: {new Date(project.dueDate).toLocaleDateString("de-DE")}
        </span>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 transition"
          aria-label="Projekt löschen"
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div className="border border-gray-200 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-600">
          {project.title}
        </h2>
        <p className="mt-2 text-gray-600">{project.description}</p>
        <div className="mt-3">
          <span
            className={`inline-block px-2 py-1 rounded ${getStatusClass(
              project.status
            )}`}
          >
            {StatusLabels[project.status]}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-gray-600">Aufgaben</h3>
          <TaskList tasks={project.tasks} />
        </div>
      </div>
    </div>
  );
};
