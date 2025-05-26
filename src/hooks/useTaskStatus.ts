"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Status, Task } from "@lib/types";

export const useTaskStatusUpdate = (projectId: string) => {
  const qc = useQueryClient();
  const tasksKey = ["projects", projectId, "tasks"] as const;

  return useMutation<
    void,
    Error,
    { id: string; status: Status },
    { previous?: Task[] }
  >({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`/api/projects/${projectId}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Status update failed");
    },

    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: tasksKey });
      const previous = qc.getQueryData<Task[]>(tasksKey) ?? [];

      qc.setQueryData<Task[]>(tasksKey, (tasks = []) =>
        tasks.map((t) => (t.id === id ? { ...t, status } : t))
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(tasksKey, ctx.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: tasksKey });
    },
  });
};
