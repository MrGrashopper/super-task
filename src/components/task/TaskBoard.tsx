"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { StatusLabels } from "@lib/constants";
import type { Status } from "@lib/types";
import { useTasks } from "hooks/useTasks";
import { TaskColumn } from "./TaskColumn";
import { TaskCard } from "./TaskCard";
import { TaskDetailSidebar } from "./TaskDetailSidebar";

export const TaskBoard = ({ projectId }: { projectId: string }) => {
  const { data: tasks = [], update } = useTasks(projectId);
  const statuses = Object.keys(StatusLabels) as Status[];
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(TouchSensor)
  );

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
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="container mx-auto py-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              columnStatus={status}
              projectId={projectId}
              label={StatusLabels[status]}
              tasks={tasks.filter((t) => t.status === status)}
              onTaskClick={setSelectedTask}
            />
          ))}
        </div>
      </div>

      {selectedTask && (
        <TaskDetailSidebar
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      <DragOverlay dropAnimation={null}>
        {activeTask && (
          <div className="min-w-[16rem] w-full">
            <TaskCard projectId={projectId} task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};
