"use client";

import React, { useState } from "react";
import { useProjects } from "@hooks";
import { Modal } from "@components/ui";
import { Dashboard } from "@components/project/Dashboard";
import { ProjectForm } from "@components/project/ProjectForm";
import type { Project, FormData } from "@lib/types";

type Props = {
  projects: Project[];
};

const ProjectsClient = ({ projects: initialProjects }: Props) => {
  const { data: projects = initialProjects, update: updateProject } =
    useProjects({ initialData: initialProjects });

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const openNew = () => setCreating(true);
  const closeNew = () => setCreating(false);

  const openEdit = (proj: Project) => setEditing(proj);
  const closeEdit = () => setEditing(null);

  const handleUpdate = (vals: FormData) => {
    if (!editing) return;
    updateProject.mutate(
      {
        id: editing.id,
        data: { ...vals, dueDate: new Date(vals.dueDate).toISOString() },
      },
      { onSuccess: closeEdit }
    );
  };

  return (
    <>
      <Modal open={creating} onClose={closeNew}>
        <ProjectForm onClose={closeNew} />
      </Modal>

      <Modal open={!!editing} onClose={closeEdit}>
        {editing && (
          <ProjectForm
            onClose={closeEdit}
            initialValues={{
              title: editing.title,
              description: editing.description,
              dueDate: editing.dueDate.slice(0, 10),
              status: editing.status,
            }}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>

      <Dashboard
        projects={Array.isArray(projects) ? projects : initialProjects}
        onAdd={openNew}
        onEdit={openEdit}
      />
    </>
  );
};
export default ProjectsClient;
