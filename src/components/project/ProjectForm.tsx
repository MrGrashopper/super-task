"use client";
import { useProjects } from "hooks/useProjects";
import { EntityForm } from "@components/EntityForm";
import type { FormData, Status } from "@lib/types";

export const ProjectForm = ({ onClose }: { onClose: () => void }) => {
  const { add } = useProjects();
  const defaultValues = {
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "Open" as Status,
  };
  const handleSave = (v: FormData) =>
    add.mutate(
      { ...v, dueDate: new Date(v.dueDate).toISOString() },
      { onSuccess: onClose }
    );

  return (
    <EntityForm
      headline="Neues Projekt"
      defaultValues={defaultValues}
      onSubmit={handleSave}
      onClose={onClose}
    />
  );
};
