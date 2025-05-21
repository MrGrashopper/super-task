"use client";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useTasks } from "hooks/useTasks";
import { TaskColumn } from "./TaskColumn";
import { Status } from "@lib/types";

export const TaskBoard = ({ projectId }: { projectId: string }) => {
  const { data: tasks = [], update } = useTasks(projectId);

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
      <div className="flex gap-4 overflow-x-auto lg:overflow-visible">
        <SortableContext
          items={["Open", "InProgress", "Done"]}
          strategy={rectSortingStrategy}
        >
          {["Open", "InProgress", "Done"].map((s) => (
            <TaskColumn
              key={s}
              id={s}
              tasks={tasks.filter((t) => t.status === s)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};
