import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@lib/types";

export const useTasks = (projectId: string) => {
  const qc = useQueryClient();

  const query = useQuery<Task[], Error>({
    queryKey: ["projects", projectId, "tasks"],
    queryFn: () =>
      fetch(`/api/projects/${projectId}/tasks`).then((r) => {
        if (!r.ok) throw new Error("Tasks konnten nicht geladen werden");
        return r.json();
      }),
  });

  const add = useMutation<
    Task,
    Error,
    Omit<Task, "id" | "subtasks" | "projectId">
  >({
    mutationFn: (newTask) =>
      fetch(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }).then((r) => {
        if (!r.ok) throw new Error("Task konnte nicht angelegt werden");
        return r.json();
      }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks"] }),
  });

  const update = useMutation<
    Task,
    Error,
    { id: string; data: Partial<Task> },
    { previousTasks?: Task[]; previousTask?: Task }
  >({
    mutationFn: ({ id, data }) =>
      fetch(`/api/projects/${projectId}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) throw new Error("Task-Update fehlgeschlagen");
        return r.json();
      }),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ["projects", projectId, "tasks"] });
      await qc.cancelQueries({
        queryKey: ["projects", projectId, "tasks", id],
      });
      const previousTasks = qc.getQueryData<Task[]>([
        "projects",
        projectId,
        "tasks",
      ]);
      const previousTask = qc.getQueryData<Task>([
        "projects",
        projectId,
        "tasks",
        id,
      ]);
      qc.setQueryData<Task[]>(["projects", projectId, "tasks"], (old = []) =>
        old.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
      qc.setQueryData<Task>(["projects", projectId, "tasks", id], (old) =>
        old ? { ...old, ...data } : old!
      );
      return { previousTasks, previousTask };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousTasks) {
        qc.setQueryData(["projects", projectId, "tasks"], ctx.previousTasks);
      }
      if (ctx?.previousTask) {
        qc.setQueryData(
          ["projects", projectId, "tasks", ctx.previousTask.id],
          ctx.previousTask
        );
      }
    },
    onSettled: (_res, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks"] });
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks", id] });
    },
  });

  const remove = useMutation<void, Error, string>({
    mutationFn: (id) =>
      fetch(`/api/projects/${projectId}/tasks/${id}`, {
        method: "DELETE",
      }).then((r) => {
        if (!r.ok) throw new Error("Task-Löschung fehlgeschlagen");
      }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks"] }),
  });

  return { ...query, add, update, remove };
};
