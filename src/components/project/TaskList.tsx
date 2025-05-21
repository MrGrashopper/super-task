"use client";

import React from "react";
import type { Task } from "@lib/types";
import { getStatusClass } from "@lib/constants";
import { SubtaskList } from "./SubtaskList";

type Props = { tasks: Task[] };

export const TaskList = ({ tasks }: Props) => {
  if (tasks.length === 0) {
    return <div className="pl-4 text-gray-500">Keine Aufgaben.</div>;
  }
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="pl-4 border-l mb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{task.title}</span>
            <span className="text-xs">
              {new Date(task.dueDate).toLocaleDateString("de-DE")}
            </span>
          </div>
          <div className="mt-1">
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs ${getStatusClass(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
          <div className="mt-2">
            <SubtaskList subtasks={task.subtasks} />
          </div>
        </div>
      ))}
    </>
  );
};
