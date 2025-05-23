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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StatusLabels } from "@lib/constants";
import type { Status, Task } from "@lib/types";
import { useTasks } from "hooks/useTasks";
import { TaskColumn } from "./TaskColumn";
import { TaskCard } from "./TaskCard";
import { TaskDetailSidebar } from "./TaskDetailSidebar";

export const TaskBoard = ({ projectId }: { projectId: string }) => {
  const qc = useQueryClient();
  const { data: tasks = [], update } = useTasks(projectId);
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const updateStatusMutation = update;

  const reorderMutation = useMutation<
    void,
    Error,
    {
      projectId: string;
      status: Status;
      newOrder: { id: string; order: number }[];
    }
  >({
    mutationFn: ({ projectId, status, newOrder }) =>
      fetch("/api/tasks/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, status, newOrder }),
      }).then((r) => {
        if (!r.ok) throw new Error("Reorder failed");
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });

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
        data: { status: newStatus },
      });
      setActiveId(null);
      return;
    }

    if (newStatus === oldStatus) {
      const columnTasks = localTasks.filter((t) => t.status === oldStatus);
      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);
      const newOrder = arrayMove(columnTasks, oldIndex, newIndex).map(
        (t, idx) => ({ id: t.id, order: idx })
      );

      setLocalTasks((all) => {
        const updated = all.map((t) => {
          const o = newOrder.find((x) => x.id === t.id);
          return o ? { ...t, order: o.order } : t;
        });
        const left = updated.filter((t) => t.status !== oldStatus);
        const right = updated
          .filter((t) => t.status === oldStatus)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        return [...left, ...right];
      });

      reorderMutation.mutate({ projectId, status: oldStatus, newOrder });
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
              onTaskClick={setSelectedTask}
            />
          ))}
        </div>
      </div>

      {selectedTask && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setSelectedTask(null)}
        >
          <TaskDetailSidebar
            taskId={selectedTask}
            onClose={() => setSelectedTask(null)}
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
