"use client";

import React from "react";
import type { Subtask } from "@lib/types";
import { getStatusClass, StatusLabels } from "@lib/constants";

type Props = { subtasks: Subtask[] };

export const SubtaskList = ({ subtasks }: Props) => {
  if (subtasks.length === 0) {
    return <div className="text-gray-500">Keine Unteraufgaben.</div>;
  }

  return (
    <>
      {subtasks.map((sub) => (
        <div key={sub.id} className="pl-4 border-l border-gray-200 mt-4">
          <div className="flex items-center text-sm mb-1">
            <span>{sub.title}</span>
            <div className="flex items-center space-x-2 ml-auto">
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs ${getStatusClass(
                  sub.status
                )}`}
              >
                {StatusLabels[sub.status]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
