"use client";
import React from "react";
import { useTaskDetail } from "hooks/useTaskDetail";
import { TaskDetailForm } from "./TaskDetailForm";
import { useSubtasks } from "hooks/useSubtasks";
import { SubtaskList } from "./SubtaskList";

type Props = {
  taskId: string;
  onClose: () => void;
};

export const TaskDetailSidebar = ({ taskId, onClose }: Props) => {
  const { data: task, isLoading } = useTaskDetail(taskId);
  const { data: subtasks = [], add, update, remove } = useSubtasks(taskId);

  if (isLoading) return <div className="p-4">Lade…</div>;
  if (!task) return <div className="p-4">Aufgabe nicht gefunden</div>;

  return (
    <aside
      className={`
        fixed inset-y-0 right-0 bg-white shadow-lg
        w-full sm:w-80 md:w-96 lg:w-4/5 xl:w-3/5 flex flex-col
      `}
    >
      <header className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          aria-label="Schließen"
        >
          ×
        </button>
      </header>

      <div className="p-4 overflow-y-auto flex-1 space-y-6">
        <section className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Aufgabe bearbeiten
          </h3>
          <TaskDetailForm
            initial={task}
            onSubmit={(vals) => update.mutate({ id: taskId, data: vals })}
          />
        </section>

        <section className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Unteraufgaben
          </h3>
          <SubtaskList
            subtasks={subtasks}
            onAdd={(vals) => add.mutate(vals)}
            onUpdate={(id, data) => update.mutate({ id, data })}
            onDelete={(id) => remove.mutate(id)}
          />
        </section>
      </div>
    </aside>
  );
};
