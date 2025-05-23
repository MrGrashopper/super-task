"use client";

import React from "react";
import { useTaskDetail } from "hooks/useTaskDetail";
import { useTasks } from "hooks/useTasks";
import { useSubtasks } from "hooks/useSubtasks";
import { TaskDetailForm } from "./TaskDetailForm";
import { SubtaskList } from "./SubtaskList";
import { UIButton } from "@components/ui";
import { FullPageLoader } from "@components/ui";

type Props = {
  taskId: string;
  onClose: () => void;
};

export const TaskDetailSidebar = ({ taskId, onClose }: Props) => {
  const { data: task, isLoading } = useTaskDetail(taskId);
  const { update: updateTask } = useTasks(task?.projectId ?? "");
  const {
    data: subtasks = [],
    add: addSubtask,
    update: updateSubtask,
    remove: removeSubtask,
  } = useSubtasks(taskId);

  const formId = `task-detail-form-${taskId}`;

  if (isLoading) return <FullPageLoader />;
  if (!task)
    return <div className="p-4">Aufgabe konnte nicht geladen werden.</div>;

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
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

      <div className="p-4 overflow-y-auto flex-1 space-mt-6">
        <section className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Aufgabe bearbeiten
          </h3>
          <TaskDetailForm
            formId={formId}
            initial={task}
            onSubmit={(vals) =>
              updateTask.mutate(
                { id: taskId, data: vals },
                { onSuccess: () => onClose() }
              )
            }
          />
        </section>

        <section className="bg-white border border-gray-200 p-4 mx-4 rounded-b-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Teilaufgaben
          </h3>
          <SubtaskList
            subtasks={subtasks}
            onAdd={(v) => addSubtask.mutate(v)}
            onUpdate={(id, data) => updateSubtask.mutate({ id, data })}
            onDelete={(id) => removeSubtask.mutate(id)}
          />
        </section>
        <section className="mt-4">
          <div className="p-4 flex justify-end space-x-2">
            <UIButton type="button" variant="abort" onClick={onClose}>
              Abbrechen
            </UIButton>
            <UIButton type="submit" form={formId}>
              Speichern
            </UIButton>
          </div>
        </section>
      </div>
    </aside>
  );
};
