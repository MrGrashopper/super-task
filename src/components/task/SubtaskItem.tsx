"use client";

import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import type { Subtask } from "@lib/types";
import { SubtaskForm } from "./SubtaskForm";
import { StatusBadge, UIButton } from "@components/ui";

type Props = {
  subtask: Subtask;
  onUpdate: (id: string, data: Partial<Subtask>) => void;
  onDelete: (id: string) => void;
  onFormToggle: (open: boolean) => void;
};

export const SubtaskItem = ({
  subtask,
  onUpdate,
  onDelete,
  onFormToggle,
}: Props) => {
  const [editing, setEditing] = useState(false);

  const openEdit = () => {
    setEditing(true);
    onFormToggle(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Unteraufgabe „${subtask.title}“ wirklich löschen?`)) {
      onDelete(subtask.id);
    }
  };

  if (editing) {
    return (
      <SubtaskForm
        initial={{
          title: subtask.title,
          description: subtask.description,
          dueDate: subtask.dueDate.slice(0, 10),
          status: subtask.status,
        }}
        onSubmit={(vals) => {
          onUpdate(subtask.id, vals);
          setEditing(false);
          onFormToggle(false);
        }}
        onCancel={() => setEditing(false)}
        submitLabel="Speichern"
      />
    );
  }

  return (
    <div className="bg-gray-50 p-3 rounded flex justify-between items-start">
      <div>
        <StatusBadge
          status={subtask.status}
          variant="small"
          editable
          onChange={(status) => onUpdate(subtask.id, { status })}
          className="mb-2"
          text="Teilaufgabe Status aktualisieren"
        />
        <h4>{subtask.title}</h4>
        {subtask.description && (
          <p className="text-sm text-gray-600">{subtask.description}</p>
        )}
        <div className="mt-1 text-xs text-gray-500 flex items-center justify-between">
          <div>{new Date(subtask.dueDate).toLocaleDateString("de-DE")}</div>
        </div>
      </div>

      <div className="flex justify-end">
        <UIButton
          variant="icon"
          onClick={openEdit}
          aria-label="Bearbeiten"
          tooltip="Bearbeiten"
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <Edit2 size={16} />
        </UIButton>
        <UIButton
          variant="icon"
          tooltip="Löschen"
          onClick={handleDelete}
          aria-label="Löschen"
          className="text-gray-400 hover:text-red-600 transition"
        >
          <Trash2 size={16} />
        </UIButton>
      </div>
    </div>
  );
};
