"use client";

import React, { useState, useEffect } from "react";
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
import { arrayMove } from "@dnd-kit/sortable";
import { StatusLabels } from "@lib/constants";
import type { Status, Task } from "@lib/types";
import { useTasks } from "@hooks";

import { useTaskReorder } from "@hooks";
import { TaskColumn } from "./TaskColumn";
import { TaskCard } from "./TaskCard";
import { TaskDetailSidebar } from "./TaskDetailSidebar";
import { useTaskStatusUpdate } from "@hooks";

export const TaskBoard = ({ projectId }: { projectId: string }) => {
  const { data: tasks = [] } = useTasks(projectId);

  const updateStatusMutation = useTaskStatusUpdate(projectId);
  const reorderMutation = useTaskReorder(projectId);

  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (
      !reorderMutation.isPending &&
      !updateStatusMutation.isPending &&
      activeId === null
    ) {
      setLocalTasks(tasks);
    }
  }, [
    tasks,
    activeId,
    reorderMutation.isPending,
    updateStatusMutation.isPending,
  ]);

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
    if (!over) {
      setActiveId(null);
      return;
    }

    const oldStatus = active.data.current?.status as Status;
    const newStatus = over.data.current?.status as Status;

    if (newStatus && newStatus !== oldStatus) {
      setLocalTasks((all) =>
        all.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t))
      );
      updateStatusMutation.mutate({
        id: active.id as string,
        status: newStatus,
      });
      setActiveId(null);
      return;
    }

    if (newStatus === oldStatus) {
      const col = localTasks.filter((t) => t.status === oldStatus);
      const oldIndex = col.findIndex((t) => t.id === active.id);
      const newIndex = col.findIndex((t) => t.id === over.id);
      const newOrder = arrayMove(col, oldIndex, newIndex).map((t, i) => ({
        id: t.id,
        order: i,
      }));

      setLocalTasks((all) => {
        const updated = all.map((t) => {
          const o = newOrder.find((x) => x.id === t.id);
          return o ? { ...t, order: o.order } : t;
        });
        return [
          ...updated.filter((t) => t.status !== oldStatus),
          ...updated
            .filter((t) => t.status === oldStatus)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        ];
      });

      reorderMutation.mutate({ status: oldStatus, newOrder });
    }

    setActiveId(null);
  };

  const activeTask = localTasks.find((t) => t.id === activeId);
  const statuses = Object.keys(StatusLabels) as Status[];

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
              projectId={projectId}
              columnStatus={status}
              label={StatusLabels[status]}
              tasks={localTasks.filter((t) => t.status === status)}
              onTaskClick={setSelectedId}
            />
          ))}
        </div>
      </div>

      {selectedId && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setSelectedId(null)}
        >
          <TaskDetailSidebar
            taskId={selectedId}
            onClose={() => setSelectedId(null)}
          />
        </div>
      )}

      <DragOverlay dropAnimation={{ duration: 200, easing: "ease-out" }}>
        {activeTask && (
          <div className="min-w-[16rem] w-full">
            <TaskCard projectId={projectId} task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};
