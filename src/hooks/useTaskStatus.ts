"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Status, Task } from "@lib/types";

export const useTaskStatusUpdate = (projectId: string) => {
  const qc = useQueryClient();

  return useMutation<
    void,
    Error,
    { id: string; status: Status },
    { previous?: Task[] }
  >({
    mutationFn: ({ id, status }) =>
      fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }).then((r) => {
        if (!r.ok) throw new Error("Status update failed");
      }),

    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ["tasks", projectId] });
      const previous = qc.getQueryData<Task[]>(["tasks", projectId]) ?? [];

      qc.setQueryData<Task[]>(["tasks", projectId], (tasks = []) =>
        tasks.map((t) => (t.id === id ? { ...t, status } : t))
      );

      return { previous };
    },

    onError: (_e, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(["tasks", projectId], ctx.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });
};
