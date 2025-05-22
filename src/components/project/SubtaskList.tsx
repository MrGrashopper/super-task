"use client";

import React from "react";
import type { Subtask } from "@lib/types";

type Props = { subtasks: Subtask[] };

export const SubtaskList = ({ subtasks }: Props) => {
  if (subtasks.length === 0) {
    return <div className="text-gray-500">Keine Subtasks.</div>;
  }
  return (
    <>
      {subtasks.map((sub) => (
        <div
          key={sub.id}
          className="flex justify-between items-center text-sm mb-1"
        >
          <span>{sub.title}</span>
          <span>{new Date(sub.dueDate).toLocaleDateString("de-DE")}</span>
        </div>
      ))}
    </>
  );
};
