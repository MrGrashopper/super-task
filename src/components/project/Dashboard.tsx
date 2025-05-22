"use client";

import React from "react";
import { UIButton } from "../ui/Button";
import { PlusCircle } from "lucide-react";
import { ProjectOverview } from "@project";
import { Project } from "@lib/types";

type Props = {
  projects: Project[];
  onAddClick: () => void;
};

export const Dashboard = ({ projects, onAddClick }: Props) => (
  <main className="container mx-auto px-6 py-6 space-y-6">
    <div className="flex justify-between items-center mb-12">
      <h1 className="font-main text-2xl">Projektübersicht</h1>
      <div className="flex items-center space-x-2">
        <div className="hidden sm:block">
          <UIButton onClick={onAddClick}>Neues Projekt</UIButton>
        </div>
        <div className="sm:hidden">
          <UIButton onClick={onAddClick} variant="icon">
            <PlusCircle size={24} className="text-gray-700" />
          </UIButton>
        </div>
      </div>
    </div>
    <ProjectOverview projects={projects} />
  </main>
);
