"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  pointerWithin,
  DragOverlay,
} from "@dnd-kit/core";
import { StatusLabels } from "@lib/constants";
import type { Status } from "@lib/types";
import { useTasks } from "hooks/useTasks";
import { TaskColumn } from "./TaskColumn";
import { TaskCard } from "./TaskCard";

export const TaskBoard = ({ projectId }: { projectId: string }) => {
  const { data: tasks = [], update } = useTasks(projectId);
  const statuses = Object.keys(StatusLabels) as Status[];

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const newStatus =
      (over.data.current?.status as Status | undefined) ??
      (statuses.includes(over.id as Status) ? (over.id as Status) : undefined);
    const oldStatus = active.data.current?.status as Status;

    if (newStatus && newStatus !== oldStatus) {
      update.mutate({ id: active.id as string, data: { status: newStatus } });
    }
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto items-start py-2">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            columnStatus={status}
            projectId={projectId}
            label={StatusLabels[status]}
            tasks={tasks.filter((t) => t.status === status)}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask && (
          <div className="w-72">
            <TaskCard projectId={projectId} task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};
