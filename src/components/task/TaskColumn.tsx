"use client";
import React from "react";
import { Plus } from "lucide-react";
import type { Task } from "@lib/types";
import { TaskCard } from "./TaskCard";

type Props = { label: string; tasks: Task[] };

export const TaskColumn = ({ label, tasks }: Props) => (
  <div className="bg-gray-100 rounded p-2">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-medium">{label}</h4>
      <button>
        <Plus size={16} />
      </button>
    </div>
    {tasks.map((t) => (
      <TaskCard key={t.id} task={t} />
    ))}
  </div>
);
