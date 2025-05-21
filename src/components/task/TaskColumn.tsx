"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import type { Task, Status } from "@lib/types";

type Props = {
  projectId: string;
  columnStatus: Status /* ← neu */;
  label: string;
  tasks: Task[];
};

export const TaskColumn = ({
  projectId,
  columnStatus,
  label,
  tasks,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
          <TaskForm
            projectId={projectId}
            columnStatus={columnStatus} /* ← an TaskForm weiterreichen */
            onClose={() => setOpen(false)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div
          role="button"
          onClick={() => setOpen(true)}
          className="bg-white rounded-lg shadow-sm p-2 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
        >
          <h4 className="font-medium">{label}</h4>
          <Plus size={16} className="text-gray-500" />
        </div>

        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} projectId={projectId} />
        ))}
      </div>
    </>
  );
};
