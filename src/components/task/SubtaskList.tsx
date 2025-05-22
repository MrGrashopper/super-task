"use client";
import { useState } from "react";
import type { Subtask } from "@lib/types";
import SubtaskItem from "./SubtaskItem";
import { SubtaskForm } from "./SubtaskForm";

type Props = {
  subtasks: Subtask[];
  onAdd: (v: Omit<Subtask, "id" | "taskId">) => void;
  onUpdate: (id: string, data: Partial<Subtask>) => void;
  onDelete: (id: string) => void;
};

export const SubtaskList = ({ subtasks, onAdd, onUpdate, onDelete }: Props) => {
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-4">
      {subtasks.map((s) => (
        <SubtaskItem
          key={s.id}
          subtask={s}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}

      {adding ? (
        <SubtaskForm
          initial={{
            title: "",
            description: "",
            dueDate: new Date().toISOString().slice(0, 10),
            status: "Open",
          }}
          onSubmit={(v) => {
            onAdd(v);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="cursor-pointer text-gray-400 hover:text-gray-800"
        >
          + Neue Unteraufgabe
        </button>
      )}
    </div>
  );
};
