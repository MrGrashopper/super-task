"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useTasks } from "hooks/useTasks";
import { TaskColumn } from "./TaskColumn";
import { StatusLabels } from "@lib/constants";
import { Status } from "@lib/types";

export const TaskBoard = ({ projectId }: { projectId: string }) => {
  const { data: tasks = [], update } = useTasks(projectId);
  const states = Object.keys(StatusLabels) as Status[];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    if (active.data.current?.status !== over.id)
      update.mutate({
        id: active.id as string,
        data: { status: over.id as Status },
      });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={states} strategy={rectSortingStrategy}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((status) => (
            <TaskColumn
              key={status}
              columnStatus={status}
              projectId={projectId}
              label={StatusLabels[status]}
              tasks={tasks.filter((t) => t.status === status)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
