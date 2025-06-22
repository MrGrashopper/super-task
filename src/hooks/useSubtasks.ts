import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Subtask, Task } from "@lib/types";

interface Context {
  prevSubs: Subtask[];
  prevTasks: Task[];
}

export const useSubtasks = (projectId: string, taskId: string) => {
  const qc = useQueryClient();

  const query = useQuery<Subtask[], Error>({
    queryKey: ["subtasks", projectId, taskId],
    queryFn: async () => {
      const res = await fetch(
        `/api/projects/${projectId}/tasks/${taskId}/subtasks`
      );
      if (!res.ok) {
        throw new Error("Unteraufgaben konnten nicht geladen werden");
      }
      return res.json();
    },
  });

  const add = useMutation<
    Subtask,
    Error,
    Omit<Subtask, "id" | "taskId">,
    Context
  >({
    mutationFn: (newSubtask) =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}/subtasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubtask),
      }).then((r) => r.json()),
    onMutate: async (newSubtask) => {
      await qc.cancelQueries({ queryKey: ["subtasks", projectId, taskId] });
      await qc.cancelQueries({ queryKey: ["projects", projectId, "tasks"] });
      const prevSubs =
        qc.getQueryData<Subtask[]>(["subtasks", projectId, taskId]) ?? [];
      const prevTasks =
        qc.getQueryData<Task[]>(["projects", projectId, "tasks"]) ?? [];
      const optimistic: Subtask = {
        ...newSubtask,
        id: `tmp-${Date.now()}`,
        taskId,
      };
      qc.setQueryData<Subtask[]>(
        ["subtasks", projectId, taskId],
        [...prevSubs, optimistic]
      );
      qc.setQueryData<Task[]>(
        ["projects", projectId, "tasks"],
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, subtasks: [...t.subtasks, optimistic] } : t
        )
      );
      return { prevSubs, prevTasks };
    },
    onError: (_err, _newSub, ctx) => {
      if (ctx) {
        qc.setQueryData(["subtasks", projectId, taskId], ctx.prevSubs);
        qc.setQueryData(["projects", projectId, "tasks"], ctx.prevTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["subtasks", projectId, taskId] });
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks"] });
    },
  });

  const update = useMutation<
    Subtask,
    Error,
    { id: string; data: Partial<Omit<Subtask, "id" | "taskId">> },
    Context
  >({
    mutationFn: ({ id, data }) =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}/subtasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ["subtasks", projectId, taskId] });
      await qc.cancelQueries({ queryKey: ["projects", projectId, "tasks"] });
      const prevSubs =
        qc.getQueryData<Subtask[]>(["subtasks", projectId, taskId]) ?? [];
      const prevTasks =
        qc.getQueryData<Task[]>(["projects", projectId, "tasks"]) ?? [];
      qc.setQueryData<Subtask[]>(
        ["subtasks", projectId, taskId],
        prevSubs.map((s) => (s.id === id ? { ...s, ...data } : s))
      );
      qc.setQueryData<Task[]>(
        ["projects", projectId, "tasks"],
        prevTasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.map((s) =>
                  s.id === id ? { ...s, ...data } : s
                ),
              }
            : t
        )
      );
      return { prevSubs, prevTasks };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx) {
        qc.setQueryData(["subtasks", projectId, taskId], ctx.prevSubs);
        qc.setQueryData(["projects", projectId, "tasks"], ctx.prevTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["subtasks", projectId, taskId] });
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks"] });
    },
  });

  const remove = useMutation<void, Error, string, Context>({
    mutationFn: (id) =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}/subtasks/${id}`, {
        method: "DELETE",
      }).then((r) => {
        if (!r.ok) throw new Error("Löschen fehlgeschlagen");
      }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["subtasks", projectId, taskId] });
      await qc.cancelQueries({ queryKey: ["projects", projectId, "tasks"] });
      const prevSubs =
        qc.getQueryData<Subtask[]>(["subtasks", projectId, taskId]) ?? [];
      const prevTasks =
        qc.getQueryData<Task[]>(["projects", projectId, "tasks"]) ?? [];
      qc.setQueryData<Subtask[]>(
        ["subtasks", projectId, taskId],
        prevSubs.filter((s) => s.id !== id)
      );
      qc.setQueryData<Task[]>(
        ["projects", projectId, "tasks"],
        prevTasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.filter((s) => s.id !== id),
              }
            : t
        )
      );
      return { prevSubs, prevTasks };
    },
    onError: (_err, _id, ctx) => {
      if (ctx) {
        qc.setQueryData(["subtasks", projectId, taskId], ctx.prevSubs);
        qc.setQueryData(["projects", projectId, "tasks"], ctx.prevTasks);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["subtasks", projectId, taskId] });
      qc.invalidateQueries({ queryKey: ["projects", projectId, "tasks"] });
    },
  });

  return {
    ...query,
    add,
    update,
    remove,
  };
};
