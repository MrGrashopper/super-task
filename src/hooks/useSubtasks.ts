import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Subtask } from "@lib/types";

export const useSubtasks = (projectId: string, taskId: string) => {
  const qc = useQueryClient();

  const query = useQuery<Subtask[], Error>({
    queryKey: ["subtasks", projectId, taskId],
    queryFn: () =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}/subtasks`).then((r) => {
        if (!r.ok) throw new Error("Teilaufgaben nicht geladen");
        return r.json();
      }),
  });

  const add = useMutation<Subtask, Error, Omit<Subtask, "id" | "taskId">>({
    mutationFn: (newSubtask) =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}/subtasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubtask),
      }).then((r) => r.json()),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["subtasks", projectId, taskId] }),
  });

  const update = useMutation<
    Subtask,
    Error,
    { id: string; data: Partial<Omit<Subtask, "id" | "taskId">> }
  >({
    mutationFn: ({ id, data }) =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}/subtasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["subtasks", projectId, taskId] }),
  });

  const remove = useMutation<void, Error, string>({
    mutationFn: (id) =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}/subtasks/${id}`, {
        method: "DELETE",
      }).then(() => {}),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["subtasks", projectId, taskId] }),
  });

  return { ...query, add, update, remove };
};
