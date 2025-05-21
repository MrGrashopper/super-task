"use client";
import { useTasks } from "hooks/useTasks";
import { EntityForm } from "@components/EntityForm";
import type { FormData, Status } from "@lib/types";

export const TaskForm = ({
  projectId,
  onClose,
  columnStatus,
}: {
  projectId: string;
  onClose: () => void;
  columnStatus: Status;
}) => {
  const { add } = useTasks(projectId);

  const defaultValues: FormData = {
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: columnStatus,
  };

  const handleSave = (v: FormData) =>
    add.mutate(
      {
        ...v,
        status: columnStatus,
        dueDate: new Date(v.dueDate).toISOString(),
      },
      { onSuccess: onClose }
    );

  return (
    <EntityForm
      headline="Neue Aufgabe"
      defaultValues={defaultValues}
      onSubmit={handleSave}
      onClose={onClose}
    />
  );
};
