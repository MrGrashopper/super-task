"use client";
import { useTasks } from "@hooks";
import { EntityForm } from "@components/EntityForm";
import type { FormData, Status } from "@lib/types";

type Props = {
  projectId: string;
  onClose: () => void;
  columnStatus: Status;
  nextOrder: number;
};

export const TaskForm = ({
  projectId,
  onClose,
  columnStatus,
  nextOrder,
}: Props) => {
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
        dueDate: new Date(v.dueDate).toISOString(),
        order: nextOrder,
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
