"use client";

import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { StatusLabels } from "@lib/constants";
import type { Subtask } from "@lib/types";
import { SubtaskForm } from "./SubtaskForm";

type Props = {
  subtask: Subtask;
  onUpdate: (id: string, data: Partial<Subtask>) => void;
  onDelete: (id: string) => void;
};

const SubtaskItem = ({ subtask, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);

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
        }}
        onCancel={() => setEditing(false)}
        submitLabel="Änderung speichern"
      />
    );
  }

  return (
    <div className="bg-gray-50 p-3 rounded flex justify-between items-start">
      <div>
        <h4 className="font-medium">{subtask.title}</h4>
        {subtask.description && (
          <p className="text-sm text-gray-600">{subtask.description}</p>
        )}
        <div className="mt-1 text-xs text-gray-500">
          {new Date(subtask.dueDate).toLocaleDateString("de-DE")} •{" "}
          {StatusLabels[subtask.status]}
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => setEditing(true)} aria-label="Bearbeiten">
          <Edit2 size={16} />
        </button>
        <button onClick={handleDelete} aria-label="Löschen">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SubtaskItem;
