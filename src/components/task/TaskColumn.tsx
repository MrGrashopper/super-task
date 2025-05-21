"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import type { Task, Status } from "@lib/types";

type Props = {
  projectId: string;
  columnStatus: Status;
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

  const { setNodeRef, isOver } = useDroppable({
    id: columnStatus,
    data: { status: columnStatus },
  });

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
          <TaskForm
            projectId={projectId}
            columnStatus={columnStatus}
            onClose={() => setOpen(false)}
          />
        </div>
      )}

      <div
        ref={setNodeRef}
        className="`flex flex-col self-start w-72 flex-shrink-0"
      >
        <div
          role="button"
          onClick={() => setOpen(true)}
          className="bg-white rounded-lg shadow-sm mb-4 p-2 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
        >
          <h4 className="font-medium">{label}</h4>
          <Plus size={16} className="text-gray-500" />
        </div>
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {tasks.length === 0 && (
              <div
                className={`rounded-lg border-2 border-dashed min-h-[96px] flex items-center justify-center
              ${
                isOver
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-gray-300 text-gray-400"
              }
            `}
              >
                Noch keine Tasks – hierher ziehen
              </div>
            )}

            {tasks.map((t) => (
              <SortableTask key={t.id} id={t.id} status={columnStatus}>
                <TaskCard task={t} projectId={projectId} />
              </SortableTask>
            ))}
          </div>
        </SortableContext>
      </div>
    </>
  );
};
