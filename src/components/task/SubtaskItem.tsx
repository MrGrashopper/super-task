"use client";

import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { getStatusClass, StatusLabels } from "@lib/constants";
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
        <div
          className={`px-2 py-1 mb-2 rounded justify-end text-xs ${getStatusClass(
            subtask.status
          )}`}
        >
          {StatusLabels[subtask.status]}
        </div>
        <h4>{subtask.title}</h4>
        {subtask.description && (
          <p className="text-sm text-gray-600">{subtask.description}</p>
        )}
        <div className="mt-1 text-xs text-gray-500 flex items-center justify-between">
          <span>{new Date(subtask.dueDate).toLocaleDateString("de-DE")}</span>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={() => setEditing(true)} aria-label="Bearbeiten">
          <Edit2
            size={16}
            className="text-gray-400 hover:text-gray-600 transition"
          />
        </button>
        <button onClick={handleDelete} aria-label="Löschen">
          <Trash2
            size={16}
            className="text-gray-400 hover:text-red-600 transition"
          />
        </button>
      </div>
    </div>
  );
};

export default SubtaskItem;
