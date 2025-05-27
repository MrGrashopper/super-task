"use client";
import React from "react";
import { EmptyState, UIButton } from "@components/ui";
import { Lightbulb, PlusCircle } from "lucide-react";
import { ProjectOverview } from "./ProjectOverview";
import type { Project } from "@lib/types";

type Props = {
  projects: Project[];
  onAdd: () => void;
  onEdit: (project: Project) => void;
};

export const Dashboard = ({ projects, onAdd, onEdit }: Props) => (
  <main className="flex-1 flex flex-col container mx-auto px-6 pt-6 pb-4">
    {projects.length > 0 ? (
      <>
        <div className="flex justify-between items-center mb-12 mt-2">
          <h1 className="font-main text-2xl">Projektübersicht</h1>
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              <UIButton onClick={onAdd}>Neues Projekt</UIButton>
            </div>
            <div className="sm:hidden">
              <UIButton onClick={onAdd} variant="icon">
                <PlusCircle
                  size={32}
                  className="text-gray-600"
                  strokeWidth={1}
                />
              </UIButton>
            </div>
          </div>
        </div>
        <ProjectOverview projects={projects} onEdit={onEdit} />
        <div className="mt-auto container mx-auto flex justify-center items-center space-x-2">
          <Lightbulb size={22} className="text-yellow-400" />
          <p className="text-sm text-gray-600 text-center">
            Um das Aufgaben-Board zu öffnen, klicke auf ein Projekt.
          </p>
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          title="Starte dein erstes Projekt!"
          description="Leg noch heute los und behalte alle Aufgaben im Blick."
          buttonLabel="Neues Projekt anlegen"
          onButtonClick={onAdd}
        />
      </div>
    )}
  </main>
);
export default Dashboard;
