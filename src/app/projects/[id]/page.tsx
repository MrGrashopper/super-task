"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { TaskBoard } from "@task";
import { useProject } from "@hooks";
import { useTasks } from "@hooks";
import { Edit2, Lightbulb } from "lucide-react";
import { FullPageLoader, StatusBadge, UIButton } from "@components/ui";
import { EntityForm } from "@components/EntityForm";
import type { FormData } from "@lib/types";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: project,
    isLoading: projectLoading,
    isError,
    update: updateProject,
  } = useProject(id);
  const { data: tasks = [] } = useTasks(id);

  const [isEditing, setIsEditing] = useState(false);

  if (projectLoading) return <FullPageLoader />;
  if (!id || isError || !project)
    return <div className="p-4">Projekt nicht gefunden</div>;

  const defaultValues: FormData = {
    title: project.title,
    description: project.description,
    dueDate: project.dueDate.slice(0, 10),
    status: project.status,
  };

  const handleSave = (vals: FormData) => {
    updateProject.mutate(vals, {
      onSuccess: () => setIsEditing(false),
    });
  };

  const emptyBoard = tasks.length === 0;

  return (
    <>
      <main className="px-6 pt-6 pb-4 flex flex-col min-h-[calc(100vh-theme(spacing.16))] space-y-6">
        <div className="container mx-auto">
          <div className="flex items-center">
            <h2 className="font-main text-2xl text-gray-600 mr-2">
              {project.title}
            </h2>
            <div className="ml-auto flex items-center space-x-2">
              <StatusBadge
                status={project.status}
                variant="default"
                editable
                onChange={(newStatus) =>
                  updateProject.mutate({ status: newStatus })
                }
                text="Projektstatus aktualisieren"
              />
              <UIButton
                variant="icon"
                onClick={() => setIsEditing(true)}
                tooltip="Projekt bearbeiten"
              >
                <Edit2
                  size={22}
                  className="transition text-gray-400 hover:text-gray-600"
                />
              </UIButton>
            </div>
          </div>
          <h3 className="text-xl text-gray-400 text-sm">
            {project.description}
          </h3>
        </div>

        <TaskBoard projectId={id} />

        <div className="mt-auto container mx-auto flex justify-center items-center space-x-2">
          <Lightbulb size={22} className="text-yellow-400" />
          <p className="text-sm text-gray-600 text-center">
            {emptyBoard
              ? 'Klicke auf das "+" Symbol, um eine neue Aufgabe hinzuzufügen.'
              : "Halte eine Karte gedrückt und ziehe sie in eine andere Spalte um den Status zu ändern."}
          </p>
        </div>
      </main>

      {isEditing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <EntityForm
            headline="Projekt bearbeiten"
            defaultValues={defaultValues}
            onSubmit={handleSave}
            onClose={() => setIsEditing(false)}
          />
        </div>
      )}
    </>
  );
};

export default ProjectPage;
