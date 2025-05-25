import React from "react";
import { UIButton } from "@components/ui";
import { PlusCircle } from "lucide-react";
import { ProjectOverview } from "./ProjectOverview";
import type { Project } from "@lib/types";

type Props = {
  projects: Project[];
  onAdd: () => void;
  onEdit: (project: Project) => void;
};

export const Dashboard = ({ projects, onAdd, onEdit }: Props) => (
  <main className="container mx-auto px-6 py-6 space-y-6">
    <div className="flex justify-between items-center mb-12">
      <h1 className="font-main text-2xl">Projektübersicht</h1>
      <div className="flex items-center space-x-2">
        <div className="hidden sm:block">
          <UIButton onClick={onAdd}>Neues Projekt</UIButton>
        </div>
        <div className="sm:hidden">
          <UIButton onClick={onAdd} variant="icon">
            <PlusCircle size={32} className="text-gray-600" strokeWidth={1} />
          </UIButton>
        </div>
      </div>
    </div>
    <ProjectOverview projects={projects} onEdit={onEdit} />
  </main>
);
