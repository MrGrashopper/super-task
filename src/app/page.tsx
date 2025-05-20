"use client";

import React, { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { getStatusClass } from "@/lib/constants";
import type { Project, Task, Subtask } from "@/lib/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectForm } from "@/components/ProjectForm";
import { UIButton } from "@/components/ui/Button";

const Page = () => {
  const { data: projects = [], isLoading, isError } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const handleAddClick = () => setShowForm(true);

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
          <ProjectForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {isLoading ? (
        <div className="p-4">Lade Projekte…</div>
      ) : isError ? (
        <div className="p-4 text-red-600">Fehler beim Laden der Projekte.</div>
      ) : projects.length === 0 ? (
        <EmptyState
          title="Noch keine Projekte"
          description="Lege dein erstes Projekt an, um loszulegen und deine Aufgaben zu organisieren."
          buttonLabel="Projekt hinzufügen"
          onButtonClick={handleAddClick}
        />
      ) : (
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Projektübersicht</h1>
            <UIButton onClick={handleAddClick}>Projekt hinzufügen</UIButton>
          </div>
          {projects.map((project: Project) => (
            <div key={project.id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <span className="text-sm">
                  {new Date(project.dueDate).toLocaleDateString("de-DE")}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{project.description}</p>
              <div className="mt-3">
                <span
                  className={`inline-block px-2 py-1 rounded ${getStatusClass(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>
              <div className="mt-4 space-y-4">
                <h3 className="font-medium">Tasks</h3>
                {project.tasks.length === 0 ? (
                  <div className="pl-4 text-gray-500">Keine Tasks.</div>
                ) : (
                  project.tasks.map((task: Task) => (
                    <div key={task.id} className="pl-4 border-l">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{task.title}</span>
                        <span className="text-xs">
                          {new Date(task.dueDate).toLocaleDateString("de-DE")}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs ${getStatusClass(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="mt-2 space-y-2 pl-4">
                        {task.subtasks.length === 0 ? (
                          <div className="text-gray-500">Keine Subtasks.</div>
                        ) : (
                          task.subtasks.map((sub: Subtask) => (
                            <div
                              key={sub.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <span>{sub.title}</span>
                              <span>
                                {new Date(sub.dueDate).toLocaleDateString(
                                  "de-DE"
                                )}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </main>
      )}
    </>
  );
};

export default Page;
