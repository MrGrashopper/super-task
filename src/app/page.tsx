"use client";

import React, { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Dashboard } from "@/components/project/Dashboard";
import { Modal } from "@/components/ui/Modal";
import { ProjectForm } from "@/components/project/ProjectForm";

const Page = () => {
  const { data: projects = [], isLoading, isError } = useProjects();
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  if (isLoading) return <LoadingState text="Lade Projekte…" />;
  if (isError) return <ErrorState text="Fehler beim Laden der Projekte." />;

  return (
    <>
      <Modal open={open} onClose={closeForm}>
        <ProjectForm onClose={closeForm} />
      </Modal>

      {projects.length === 0 ? (
        <EmptyState
          title="Jetzt loslegen"
          description="Lege dein erstes Projekt an, um loszulegen und deine Aufgaben zu organisieren."
          buttonLabel="Projekt hinzufügen"
          onButtonClick={openForm}
        />
      ) : (
        <Dashboard projects={projects} onAddClick={openForm} />
      )}
    </>
  );
};

export default Page;
