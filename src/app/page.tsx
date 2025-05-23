"use client";

import React, { useState } from "react";
import { ErrorState } from "@components/ui";
import { EmptyState } from "@components/ui";
import { Dashboard } from "@components/project/Dashboard";
import { Modal } from "@components/ui";
import { ProjectForm } from "@components/project/ProjectForm";
import { useProjects } from "hooks/useProjects";
import { FullPageLoader } from "@components/ui";

const Page = () => {
  const { data: projects = [], isLoading, isError } = useProjects();
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  if (isLoading) return <FullPageLoader />;
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
          buttonLabel="Neues Projekt anlegen"
          onButtonClick={openForm}
        />
      ) : (
        <Dashboard projects={projects} onAddClick={openForm} />
      )}
    </>
  );
};

export default Page;
