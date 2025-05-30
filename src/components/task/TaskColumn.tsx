"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import type { Task, Status } from "@lib/types";
import { UIButton } from "@components/ui";

type Props = {
  projectId: string;
  columnStatus: Status;
  label: string;
  tasks: Task[];
  onTaskClick: (id: string) => void;
};

export const TaskColumn = ({
  projectId,
  columnStatus,
  label,
  tasks,
  onTaskClick,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: columnStatus,
    data: { status: columnStatus },
  });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [sourceStatus, setSourceStatus] = useState<Status | null>(null);

  useDndMonitor({
    onDragStart: ({ active }) => {
      setDraggingId(active.id as string);
      setSourceStatus(active.data.current?.status as Status);
    },
    onDragEnd: () => {
      setDraggingId(null);
      setSourceStatus(null);
    },
    onDragCancel: () => {
      setDraggingId(null);
      setSourceStatus(null);
    },
  });

  const list: (Task | "placeholder")[] =
    draggingId && sourceStatus !== columnStatus
      ? [...tasks, "placeholder"]
      : [...tasks];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-40">
          <TaskForm
            projectId={projectId}
            columnStatus={columnStatus}
            nextOrder={tasks.length}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
      <div ref={setNodeRef} className="flex flex-col min-w-[16rem] w-full">
        <div className="bg-white rounded-lg shadow-sm mb-4 p-2 flex justify-between items-center">
          <h4 className="font-medium ml-2">{label}</h4>
          <UIButton
            onClick={() => setOpen(true)}
            variant="icon"
            tooltip="Aufgabe anlegen"
          >
            <Plus size={16} className="text-gray-500" />
          </UIButton>
        </div>
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col space-y-2">
            {tasks.length === 0 && (
              <div
                className={`rounded-lg border-2 border-dashed min-h-[96px] flex items-center justify-center ${
                  isOver
                    ? "border-blue-300 text-blue-400 bg-blue-50"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                Aufgabe anlegen oder hier ablegen
              </div>
            )}
            {list.map((item, i) =>
              item === "placeholder" ? (
                tasks.length > 0 && (
                  <div
                    key={`ph-${i}`}
                    className="h-12 flex items-center justify-center rounded border-2 border-dashed border-blue-300 bg-blue-50"
                  >
                    <Plus size={20} strokeWidth={2} className="text-blue-400" />
                  </div>
                )
              ) : (
                <SortableTask key={item.id} id={item.id} status={columnStatus}>
                  <div
                    role="button"
                    onClick={() => onTaskClick(item.id)}
                    className="cursor-pointer"
                  >
                    <TaskCard
                      task={item}
                      projectId={projectId}
                      onEdit={() => onTaskClick(item.id)}
                    />
                  </div>
                </SortableTask>
              )
            )}
          </div>
        </SortableContext>
      </div>
    </>
  );
};
