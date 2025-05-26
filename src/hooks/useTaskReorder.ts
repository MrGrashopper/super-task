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
      fetch(`/api/projects/${projectId}/tasks/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, newOrder }),
      }).then((r) => {
        if (!r.ok) throw new Error("Reorder failed");
      }),

    onMutate: async ({ status, newOrder }) => {
      await qc.cancelQueries({ queryKey: ["projects", projectId, "tasks"] });
      const previous =
        qc.getQueryData<Task[]>(["projects", projectId, "tasks"]) ?? [];

      qc.setQueryData<Task[]>(
        ["projects", projectId, "tasks"],
        (tasks = []) => {
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
        }
      );

      return { previous };
    },

    onError: (_e, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(["projects", projectId, "tasks"], ctx.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks"] });
    },
  });
};
