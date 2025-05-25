"use client";

import React from "react";
import { EntityForm } from "@components/EntityForm";
import { useProjects } from "@hooks";
import type { FormData } from "@lib/types";

type Props = {
  onClose: () => void;
  initialValues?: FormData;
  onSubmit?: (vals: FormData) => void;
};

export const ProjectForm = ({ onClose, initialValues, onSubmit }: Props) => {
  const { add } = useProjects();

  const handleSave = onSubmit
    ? onSubmit
    : (vals: FormData) =>
        add.mutate(
          {
            ...vals,
            dueDate: new Date(vals.dueDate).toISOString(),
            tasks: [],
          },
          { onSuccess: onClose }
        );

  return (
    <EntityForm
      headline={initialValues ? "Projekt bearbeiten" : "Neues Projekt"}
      defaultValues={
        initialValues ?? {
          title: "",
          description: "",
          dueDate: new Date().toISOString().slice(0, 10),
          status: "Open",
        }
      }
      onSubmit={(vals) => {
        const payload: FormData = {
          ...vals,
          dueDate: new Date(vals.dueDate).toISOString(),
        };
        handleSave(payload);
      }}
      onClose={onClose}
    />
  );
};
