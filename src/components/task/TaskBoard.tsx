"use client";
import React from "react";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { useTasks } from "hooks/useTasks";
import { TaskColumn } from "./TaskColumn";
import { StatusLabels } from "@lib/constants";
import type { Status } from "@lib/types";

export const TaskBoard = ({ projectId }: { projectId: string }) => {
  const { data: tasks = [], update } = useTasks(projectId);
  const statuses = Object.keys(StatusLabels) as Status[];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const newStatus = over.data.current?.status as Status | undefined;
    if (!newStatus) return;

    if (active.data.current?.status !== newStatus) {
      update.mutate(
        { id: active.id as string, data: { status: newStatus } },
        {
          onSuccess: () =>
            console.log("✅ DB-Update ok, Query wird invaldiert"),
          onError: (e) => console.error("❌ Patch fehlgeschlagen", e),
        }
      );
    }

    if (active.data.current?.status !== newStatus) {
      update.mutate({
        id: active.id as string,
        data: { status: newStatus },
      });
    }
  };

  return (
    <DndContext collisionDetection={pointerWithin} onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto items-start py-2">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            projectId={projectId}
            columnStatus={status}
            label={StatusLabels[status]}
            tasks={tasks.filter((t) => t.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
};
