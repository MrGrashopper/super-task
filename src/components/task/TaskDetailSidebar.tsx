"use client";

import React, { useState } from "react";
import { useTaskDetail } from "@hooks/useTaskDetail";
import { useTasks } from "@hooks";
import { useSubtasks } from "@hooks";
import { TaskDetailForm } from "./TaskDetailForm";
import { SubtaskList } from "./SubtaskList";
import { UIButton } from "@components/ui";
import { FullPageLoader } from "@components/ui";
import { X } from "lucide-react";

type Props = {
  projectId: string;
  taskId: string;
  onClose: () => void;
};

export const TaskDetailSidebar = ({ projectId, taskId, onClose }: Props) => {
  const [subtaskFormOpen, setSubtaskFormOpen] = useState(false);
  const { data: task, isLoading } = useTaskDetail(projectId, taskId);
  const { update: updateTask } = useTasks(projectId);
  const {
    data: subtasks = [],
    add: addSubtask,
    update: updateSubtask,
    remove: removeSubtask,
  } = useSubtasks(projectId, taskId);

  const formId = `task-detail-form-${taskId}`;

  if (isLoading) return <FullPageLoader />;
  if (!task)
    return <div className="p-4">Aufgabe konnte nicht geladen werden.</div>;

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className={`
        fixed inset-y-0 right-0 bg-white shadow-lg
        w-full sm:w-4/5 xl:w-3/5 flex flex-col
      `}
    >
      <header className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
        <UIButton
          type="button"
          variant="icon"
          onClick={onClose}
          aria-label="Schließen"
          className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
        >
          <X size={24} />
        </UIButton>
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
            Unteraufgaben
          </h3>
          <SubtaskList
            subtasks={subtasks}
            onAdd={(v) => addSubtask.mutate(v)}
            onUpdate={(id, data) => updateSubtask.mutate({ id, data })}
            onDelete={(id) => removeSubtask.mutate(id)}
            onFormToggle={setSubtaskFormOpen}
          />
        </section>
        <section className="mt-4">
          <div className="p-4 flex justify-end space-x-2">
            {!subtaskFormOpen && (
              <>
                <UIButton type="button" variant="abort" onClick={onClose}>
                  Abbrechen
                </UIButton>
                <UIButton type="submit" form={formId}>
                  Speichern
                </UIButton>
              </>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
};
