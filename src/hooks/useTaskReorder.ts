"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, Status } from "@lib/types";

export const useTaskReorder = (projectId: string) => {
  const qc = useQueryClient();

  return useMutation<
    void,
    Error,
    { status: Status; newOrder: { id: string; order: number }[] },
    { previous?: Task[] }
  >({
    mutationFn: ({ status, newOrder }) =>
      fetch("/api/tasks/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, status, newOrder }),
      }).then((r) => {
        if (!r.ok) throw new Error("Reorder failed");
      }),

    onMutate: async ({ status, newOrder }) => {
      await qc.cancelQueries({ queryKey: ["tasks", projectId] });
      const previous = qc.getQueryData<Task[]>(["tasks", projectId]) ?? [];

      qc.setQueryData<Task[]>(["tasks", projectId], (tasks = []) => {
        const updated = tasks.map((t) => {
          const match = newOrder.find((o) => o.id === t.id);
          return match ? { ...t, order: match.order } : t;
        });

        return [
          ...updated.filter((t) => t.status !== status),
          ...updated
            .filter((t) => t.status === status)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        ];
      });

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
