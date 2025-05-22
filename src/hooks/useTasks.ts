import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@lib/types";

export const useTasks = (projectId: string) => {
  const qc = useQueryClient();

  const query = useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: () =>
      fetch(`/api/projects/${projectId}/tasks`).then((r) => r.json()),
  });

  const add = useMutation<
    Task,
    Error,
    Omit<Task, "id" | "subtasks" | "projectId">
  >({
    mutationFn: (t) =>
      fetch(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });

  const update = useMutation<
    Task,
    Error,
    { id: string; data: Partial<Task> },
    { previousTasks?: Task[]; previousTask?: Task }
  >({
    mutationFn: ({ id, data }) =>
      fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ["tasks", projectId] });
      await qc.cancelQueries({ queryKey: ["task", id] });
      const previousTasks = qc.getQueryData<Task[]>(["tasks", projectId]);
      const previousTask = qc.getQueryData<Task>(["task", id]);
      qc.setQueryData<Task[]>(
        ["tasks", projectId],
        (old) => old?.map((t) => (t.id === id ? { ...t, ...data } : t)) ?? []
      );
      qc.setQueryData<Task>(["task", id], (old) =>
        old ? { ...old, ...data } : old!
      );
      return { previousTasks, previousTask };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        qc.setQueryData(["tasks", projectId], context.previousTasks);
      }
      if (context?.previousTask) {
        qc.setQueryData(
          ["task", context.previousTask.id],
          context.previousTask
        );
      }
    },
    onSettled: (_res, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ["tasks", projectId] });
      qc.invalidateQueries({ queryKey: ["task", id] });
    },
  });

  const remove = useMutation<void, Error, string>({
    mutationFn: (id) =>
      fetch(`/api/tasks/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });

  return { ...query, add, update, remove };
};
